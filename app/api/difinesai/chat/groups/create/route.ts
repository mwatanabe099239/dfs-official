import { z } from "zod";

import { syncServerEnvToProcess } from "../../../../../../src/difinesai/lib/config.server";
import { createChatGroup } from "../../../../../../src/difinesai/lib/rag/chat.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  sessionId: z.string().min(1),
  locale: z.enum(["en", "ja", "ko"]).optional(),
});

export async function POST(request: Request) {
  syncServerEnvToProcess();
  try {
    const parsed = schema.parse(await request.json());
    const group = await createChatGroup(parsed.sessionId, parsed.locale ?? "en");
    return Response.json(group);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create chat group.";
    return Response.json({ error: message }, { status: 500 });
  }
}
