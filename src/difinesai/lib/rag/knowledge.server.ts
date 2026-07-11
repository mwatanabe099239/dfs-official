import "server-only";

import { randomUUID } from "node:crypto";

import { getSupabaseAdmin, replaceDocumentsForSource } from "./supabase.server";
import { ingestMarkdownSource } from "./ingest.server";
import { composeArticleMarkdown } from "./markdown.server";

export type KnowledgeArticle = {
  id: string;
  slug: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type SaveKnowledgeArticleResult = {
  article: KnowledgeArticle;
  chunkCount: number;
};

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\.md$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listKnowledgeArticles(): Promise<KnowledgeArticle[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("knowledge_articles")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    throw new Error(`Failed to list knowledge articles: ${error.message}`);
  }

  return (data ?? []) as KnowledgeArticle[];
}

export async function getKnowledgeArticle(slug: string): Promise<KnowledgeArticle | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("knowledge_articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch knowledge article: ${error.message}`);
  }

  return (data as KnowledgeArticle | null) ?? null;
}

export async function saveKnowledgeArticle(
  slug: string,
  title: string,
  content: string,
): Promise<SaveKnowledgeArticleResult> {
  return persistKnowledgeArticle(slugify(slug), title, content);
}

export async function updateKnowledgeArticle(
  slug: string,
  title: string,
  content: string,
): Promise<SaveKnowledgeArticleResult> {
  return persistKnowledgeArticle(slug.trim(), title, content);
}

async function persistKnowledgeArticle(
  slug: string,
  title: string,
  content: string,
): Promise<SaveKnowledgeArticleResult> {
  const exactSlug = slug.trim();
  const trimmedTitle = title.trim();
  const canonicalContent = composeArticleMarkdown(trimmedTitle, content);

  if (!exactSlug) {
    throw new Error("A valid slug is required.");
  }
  if (!trimmedTitle) {
    throw new Error("Title is required.");
  }
  if (!canonicalContent.trim()) {
    throw new Error("Content is required.");
  }

  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const { error: saveError } = await supabase.from("knowledge_articles").upsert(
    {
      slug: exactSlug,
      title: trimmedTitle,
      content: canonicalContent,
      updated_at: now,
    },
    { onConflict: "slug" },
  );

  if (saveError) {
    throw new Error(`Failed to save knowledge article: ${saveError.message}`);
  }

  const savedArticle = await getKnowledgeArticle(exactSlug);
  if (!savedArticle) {
    throw new Error("Article was saved but could not be loaded for indexing.");
  }

  const chunkCount = await ingestMarkdownSource(exactSlug, savedArticle.content);

  return {
    article: savedArticle,
    chunkCount,
  };
}

export async function createKnowledgeArticle(
  title: string,
  content: string,
): Promise<SaveKnowledgeArticleResult> {
  return persistKnowledgeArticle(randomUUID(), title, content);
}

export async function deleteKnowledgeArticle(
  slug: string,
): Promise<{ slug: string; title: string }> {
  const exactSlug = slug.trim();
  const article = await getKnowledgeArticle(exactSlug);
  if (!article) {
    throw new Error("Knowledge article not found.");
  }

  await replaceDocumentsForSource(exactSlug, []);

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("knowledge_articles").delete().eq("slug", exactSlug);

  if (error) {
    throw new Error(`Failed to delete knowledge article: ${error.message}`);
  }

  return { slug: exactSlug, title: article.title };
}
