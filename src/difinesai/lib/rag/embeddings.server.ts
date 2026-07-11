import "server-only";

import { google } from "@ai-sdk/google";
import { embed, embedMany } from "ai";

import { getServerConfig } from "../config.server";

const EMBEDDING_MODEL = google.textEmbeddingModel("gemini-embedding-001");
const EMBEDDING_DIMENSIONS = 768;
const GOOGLE_BATCH_LIMIT = 100;

function assertGoogleApiKey() {
  const { googleGenerativeAiApiKey } = getServerConfig();
  if (!googleGenerativeAiApiKey) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not configured.");
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = googleGenerativeAiApiKey;
  }
}

export async function embedQuery(text: string): Promise<number[]> {
  assertGoogleApiKey();
  const { embedding } = await embed({
    model: EMBEDDING_MODEL,
    value: text.replaceAll("\n", " "),
    providerOptions: {
      google: {
        taskType: "RETRIEVAL_QUERY",
        outputDimensionality: EMBEDDING_DIMENSIONS,
      },
    },
  });
  return embedding;
}

export async function embedDocuments(values: string[]): Promise<number[][]> {
  assertGoogleApiKey();
  const embeddings: number[][] = [];

  for (let i = 0; i < values.length; i += GOOGLE_BATCH_LIMIT) {
    const batch = values.slice(i, i + GOOGLE_BATCH_LIMIT);
    const { embeddings: batchEmbeddings } = await embedMany({
      model: EMBEDDING_MODEL,
      values: batch,
      providerOptions: {
        google: {
          taskType: "RETRIEVAL_DOCUMENT",
          outputDimensionality: EMBEDDING_DIMENSIONS,
        },
      },
    });
    embeddings.push(...batchEmbeddings);
  }

  return embeddings;
}
