import { z } from "zod";

import { syncServerEnvToProcess } from "../../../../../../src/difinesai/lib/config.server";
import {
  getChatGroupForSession,
  listChatMessages,
} from "../../../../../../src/difinesai/lib/rag/chat.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  sessionId: z.string().min(1),
  groupId: z.string().uuid(),
});

export async function POST(request: Request) {
  syncServerEnvToProcess();
  try {
    const parsed = schema.parse(await request.json());
    const group = await getChatGroupForSession(parsed.groupId, parsed.sessionId);
    if (!group) {
      return Response.json({ error: "Chat group not found." }, { status: 404 });
    }
    const messages = await listChatMessages(parsed.groupId);
    return Response.json(messages);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list chat messages.";
    return Response.json({ error: message }, { status: 500 });
  }
}
