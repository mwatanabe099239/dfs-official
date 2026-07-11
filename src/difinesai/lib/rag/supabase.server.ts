import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getServerConfig } from "../config.server";

export type MatchedDocument = {
  id: string;
  source: string;
  content: string;
  metadata: Record<string, unknown>;
  similarity: number;
};

export type DocumentInsert = {
  source: string;
  content: string;
  metadata: Record<string, unknown>;
  embedding: number[];
};

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  const { supabaseUrl, supabaseServiceRoleKey } = getServerConfig();

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.");
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseClient;
}

export async function matchDocuments(
  queryEmbedding: number[],
  matchCount = 5,
): Promise<MatchedDocument[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_count: matchCount,
  });

  if (error) {
    throw new Error(`Supabase search failed: ${error.message}`);
  }

  return (data ?? []) as MatchedDocument[];
}

export async function replaceDocumentsForSource(
  source: string,
  documents: DocumentInsert[],
): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error: deleteError } = await supabase.from("documents").delete().eq("source", source);
  if (deleteError) {
    throw new Error(`Failed to clear existing documents for ${source}: ${deleteError.message}`);
  }

  if (documents.length === 0) return;

  const { error: insertError } = await supabase.from("documents").insert(
    documents.map((doc) => ({
      source: doc.source,
      content: doc.content,
      metadata: doc.metadata,
      embedding: doc.embedding,
      updated_at: new Date().toISOString(),
    })),
  );

  if (insertError) {
    throw new Error(`Failed to insert documents for ${source}: ${insertError.message}`);
  }
}
