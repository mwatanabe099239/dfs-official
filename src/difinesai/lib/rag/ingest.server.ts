import "server-only";

import { chunkMarkdown } from "./chunking.server";
import { normalizeMarkdown } from "./markdown.server";
import { embedDocuments } from "./embeddings.server";
import { replaceDocumentsForSource } from "./supabase.server";

export async function ingestMarkdownSource(source: string, content: string): Promise<number> {
  const normalizedContent = normalizeMarkdown(content);
  const chunks = chunkMarkdown(normalizedContent);
  if (chunks.length === 0) {
    await replaceDocumentsForSource(source, []);
    return 0;
  }

  const embeddings = await embedDocuments(chunks.map((chunk) => chunk.content));

  await replaceDocumentsForSource(
    source,
    chunks.map((chunk, index) => ({
      source,
      content: chunk.content,
      metadata: {
        ...chunk.metadata,
        file: source,
      },
      embedding: embeddings[index],
    })),
  );

  return chunks.length;
}
