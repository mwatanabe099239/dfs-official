import { z } from "zod";

import { syncServerEnvToProcess } from "../../../../../../src/difinesai/lib/config.server";
import { listChatGroups } from "../../../../../../src/difinesai/lib/rag/chat.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({ sessionId: z.string().min(1) });

export async function POST(request: Request) {
  syncServerEnvToProcess();
  try {
    const parsed = schema.parse(await request.json());
    const groups = await listChatGroups(parsed.sessionId);
    return Response.json(groups);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list chat groups.";
    return Response.json({ error: message }, { status: 500 });
  }
}
