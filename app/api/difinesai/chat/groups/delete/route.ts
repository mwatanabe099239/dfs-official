import { z } from "zod";

import { syncServerEnvToProcess } from "../../../../../../src/difinesai/lib/config.server";
import { deleteChatGroup } from "../../../../../../src/difinesai/lib/rag/chat.server";

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
    await deleteChatGroup(parsed.groupId, parsed.sessionId);
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete chat group.";
    return Response.json({ error: message }, { status: 500 });
  }
}
