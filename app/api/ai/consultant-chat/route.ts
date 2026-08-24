import { createGroq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateText,
  streamText,
  type UIMessage,
} from "ai";
import { z } from "zod";

import { getServerConfig, syncServerEnvToProcess } from "../../../../src/difinesai/lib/config.server";
import { embedQuery } from "../../../../src/difinesai/lib/rag/embeddings.server";
import {
  getChatGroupForSession,
  maybeUpdateGroupTitleFromFirstMessage,
  saveChatMessage,
} from "../../../../src/difinesai/lib/rag/chat.server";
import {
  buildSystemPromptWithContext,
  getNoContextMessage,
} from "../../../../src/difinesai/lib/rag/prompt.server";
import { matchDocuments } from "../../../../src/difinesai/lib/rag/supabase.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CHAT_MODEL = "openai/gpt-oss-120b";

const MAX_MESSAGE_LENGTH = 2000;
const MIN_SIMILARITY = 0.45;

const chatRequestSchema = z.object({
  messages: z.array(z.unknown()).min(1),
  locale: z.enum(["en", "ja", "ko"]).optional(),
  groupId: z.string().uuid(),
  sessionId: z.string().min(1),
});

function getLatestUserQuestion(messages: UIMessage[]): string | null {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== "user") continue;

    const text = message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n")
      .trim();

    if (text) return text;
  }

  return null;
}

function jsonError(message: string, status = 500) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Reliable UI stream that always shows text (avoids empty gpt-oss reasoning-only replies). */
async function replyAsUiStream(
  text: string,
  persistAssistantReply: (text: string) => Promise<void>,
) {
  const reply = text.trim();
  await persistAssistantReply(reply);

  const stream = createUIMessageStream({
    execute({ writer }) {
      const id = crypto.randomUUID();
      writer.write({ type: "start" });
      writer.write({ type: "text-start", id });
      writer.write({ type: "text-delta", id, delta: reply });
      writer.write({ type: "text-end", id });
      writer.write({ type: "finish" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function POST(request: Request) {
  try {
    syncServerEnvToProcess();
    const config = getServerConfig();

    if (!config.groqApiKey) {
      return jsonError("GROQ_API_KEY is not configured.");
    }
    if (!config.googleGenerativeAiApiKey) {
      return jsonError("GOOGLE_GENERATIVE_AI_API_KEY is not configured.");
    }
    if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
      return jsonError("Supabase credentials are not configured.");
    }

    const groq = createGroq({ apiKey: config.groqApiKey });
    const model = groq(CHAT_MODEL);

    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Invalid request body.", 400);
    }

    const messages = parsed.data.messages as UIMessage[];
    const locale = parsed.data.locale ?? "en";
    const { groupId, sessionId } = parsed.data;
    const latestQuestion = getLatestUserQuestion(messages);

    if (!latestQuestion) {
      return jsonError("A non-empty user message is required.", 400);
    }

    if (latestQuestion.length > MAX_MESSAGE_LENGTH) {
      return jsonError(`Messages must be ${MAX_MESSAGE_LENGTH} characters or fewer.`, 400);
    }

    const chatGroup = await getChatGroupForSession(groupId, sessionId);
    if (!chatGroup) {
      return jsonError("Chat group not found.", 404);
    }

    try {
      await saveChatMessage(groupId, "user", latestQuestion);
      await maybeUpdateGroupTitleFromFirstMessage(groupId, latestQuestion);
    } catch {
      return jsonError("Failed to save your message.");
    }

    const persistAssistantReply = async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      await saveChatMessage(groupId, "assistant", trimmed);
    };

    let queryEmbedding: number[];
    try {
      queryEmbedding = await embedQuery(latestQuestion);
    } catch {
      return jsonError("Failed to generate query embedding.");
    }

    let matchedDocuments;
    try {
      matchedDocuments = await matchDocuments(queryEmbedding, 5);
    } catch {
      return jsonError("Knowledge base search failed.");
    }

    const relevantDocuments = matchedDocuments.filter(
      (doc) => doc.similarity >= MIN_SIMILARITY,
    );

    // No KB hits: return a fixed first-party refusal (do not call the model —
    // gpt-oss often returns empty visible text on refusal prompts).
    if (relevantDocuments.length === 0) {
      return await replyAsUiStream(getNoContextMessage(locale), persistAssistantReply);
    }

    const systemPrompt = buildSystemPromptWithContext(relevantDocuments, locale);
    const modelMessages = await convertToModelMessages(messages);

    try {
      const { text } = await generateText({
        model,
        system: systemPrompt,
        messages: modelMessages,
        maxOutputTokens: 2048,
        temperature: 0.2,
      });

      const reply = text.trim() || getNoContextMessage(locale);
      return await replyAsUiStream(reply, persistAssistantReply);
    } catch {
      // Fall back to streaming once; if that also fails, return the safe refusal.
      try {
        const result = streamText({
          model,
          system: systemPrompt,
          messages: modelMessages,
          onFinish: async ({ text }) => {
            await persistAssistantReply(text.trim() || getNoContextMessage(locale));
          },
        });
        return result.toUIMessageStreamResponse();
      } catch {
        return await replyAsUiStream(getNoContextMessage(locale), persistAssistantReply);
      }
    }
  } catch (error) {
    console.error(error);
    return jsonError("Unexpected server error.");
  }
}
