import type { Locale } from "../../i18n/translations";

import type { MatchedDocument } from "./supabase.server";

const GLOBAL_FALLBACK_FORMAT: Record<Locale, string> = {
  en: `This topic is not covered in our current knowledge base.

I'll search for relevant information using broader AI capabilities.

Here is what I found from the global search:`,
  ja: `このトピックは現在のナレッジベースには含まれていません。

より広いAI知識を用いて関連情報を検索します。

グローバル検索からの回答は以下のとおりです。`,
  ko: `이 주제는 현재 지식 베이스에 포함되어 있지 않습니다.

더 넓은 AI 지식을 사용하여 관련 정보를 검색하겠습니다.

글로벌 검색 결과는 다음과 같습니다.`,
};

export const CONSULTANT_SYSTEM_PROMPT_WITH_GLOBAL_FALLBACK = `You are a helpful consultant assistant for this website.
Answer the user's question using the provided context from the knowledge base when it is sufficient.
If the context does not contain enough information to answer the question, do not say that you lack information. Instead, follow the global search response format below and answer using your general AI knowledge.
When answering from general knowledge, be helpful and professional. If you are uncertain, say so clearly.
Keep answers clear, concise, and professional.`;

const CONSULTANT_SYSTEM_PROMPT_RAG_ONLY = `You are a helpful consultant assistant for this website.
Answer the user's question using only the provided context from the knowledge base.
If the context does not contain enough information, say that you do not have enough information yet.
Do not invent facts.
Keep answers clear, concise, and professional.`;

const LANGUAGE_INSTRUCTIONS: Record<Locale, string> = {
  en: `Respond in English.
The knowledge base context may be written in English.
Prefer the provided context when it is sufficient. If the user writes in another language, still answer in English unless they explicitly ask otherwise.`,
  ja: `Respond in Japanese (日本語).
The knowledge base context may be written in English — translate and explain it faithfully in Japanese.
Prefer the provided context when it is sufficient.
If the user writes in Japanese or English, always answer in Japanese.`,
  ko: `Respond in Korean (한국어).
The knowledge base context may be written in English — translate and explain it faithfully in Korean.
Prefer the provided context when it is sufficient.
If the user writes in Korean, Japanese, or English, always answer in Korean.`,
};

const GLOBAL_LANGUAGE_INSTRUCTIONS: Record<Locale, string> = {
  en: `Respond in English. If the user writes in another language, still answer in English unless they explicitly ask otherwise.`,
  ja: `Respond in Japanese (日本語). If the user writes in Japanese or English, always answer in Japanese.`,
  ko: `Respond in Korean (한국어). If the user writes in another language, still answer in Korean unless they explicitly ask otherwise.`,
};

const NO_CONTEXT_MESSAGES: Record<Locale, string> = {
  en: "I do not have enough information in the knowledge base to answer that yet.",
  ja: "ナレッジベースにその質問に答えるための十分な情報がまだありません。",
  ko: "지식 베이스에 해당 질문에 답할 충분한 정보가 아직 없습니다.",
};

export function getGlobalFallbackFormat(locale: Locale): string {
  return GLOBAL_FALLBACK_FORMAT[locale];
}

export function getNoContextMessage(locale: Locale): string {
  return NO_CONTEXT_MESSAGES[locale];
}

export function buildGlobalFallbackSystemPrompt(locale: Locale = "en"): string {
  const languageBlock = GLOBAL_LANGUAGE_INSTRUCTIONS[locale];
  const formatBlock = getGlobalFallbackFormat(locale);

  return `You are a helpful consultant assistant for this website.
The user's question is not covered by the knowledge base. Answer using your general AI knowledge.

Structure your reply exactly as follows. Use these lines verbatim at the start, then add a blank line before your answer:

${formatBlock}

After the blank line, provide a clear, accurate, and professional answer to the user's question.
If you are uncertain about any detail, say so clearly.

${languageBlock}`;
}

export function buildSystemPromptWithContext(
  documents: MatchedDocument[],
  locale: Locale = "en",
  globalSearchEnabled = false,
): string {
  const languageBlock = LANGUAGE_INSTRUCTIONS[locale];
  const systemPrompt = globalSearchEnabled
    ? CONSULTANT_SYSTEM_PROMPT_WITH_GLOBAL_FALLBACK
    : CONSULTANT_SYSTEM_PROMPT_RAG_ONLY;

  if (documents.length === 0) {
    return `${systemPrompt}\n\n${languageBlock}`;
  }

  const context = documents
    .map(
      (doc, index) =>
        `[Source ${index + 1}: ${doc.source} | relevance: ${(doc.similarity * 100).toFixed(1)}%]\n${doc.content}`,
    )
    .join("\n\n---\n\n");

  if (!globalSearchEnabled) {
    return `${systemPrompt}

${languageBlock}

Knowledge base context:
${context}`;
  }

  const formatBlock = getGlobalFallbackFormat(locale);

  return `${systemPrompt}

${languageBlock}

If the knowledge base context below is insufficient, start your reply with these lines verbatim, add a blank line, then answer from general AI knowledge:

${formatBlock}

Knowledge base context:
${context}`;
}
