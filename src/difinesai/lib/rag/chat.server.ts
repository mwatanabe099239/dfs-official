import "server-only";

import type { Locale } from "../../i18n/translations";

import { getSupabaseAdmin } from "./supabase.server";

export type ChatGroupRow = {
  id: string;
  session_id: string;
  title: string;
  locale: Locale;
  created_at: string;
  updated_at: string;
};

export type ChatMessageRow = {
  id: string;
  group_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

const DEFAULT_TITLE = "New Conversation";
const TITLE_MAX_LENGTH = 48;

function truncateTitle(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= TITLE_MAX_LENGTH) return trimmed;
  return `${trimmed.slice(0, TITLE_MAX_LENGTH - 1)}…`;
}

export async function listChatGroups(sessionId: string): Promise<ChatGroupRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("chat_groups")
    .select("*")
    .eq("session_id", sessionId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to list chat groups: ${error.message}`);
  }

  return (data ?? []) as ChatGroupRow[];
}

export async function createChatGroup(
  sessionId: string,
  locale: Locale = "en",
): Promise<ChatGroupRow> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("chat_groups")
    .insert({
      session_id: sessionId,
      title: DEFAULT_TITLE,
      locale,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to create chat group: ${error.message}`);
  }

  return data as ChatGroupRow;
}

export async function getChatGroupForSession(
  groupId: string,
  sessionId: string,
): Promise<ChatGroupRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("chat_groups")
    .select("*")
    .eq("id", groupId)
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch chat group: ${error.message}`);
  }

  return (data as ChatGroupRow | null) ?? null;
}

export async function deleteChatGroup(groupId: string, sessionId: string): Promise<void> {
  const group = await getChatGroupForSession(groupId, sessionId);
  if (!group) {
    throw new Error("Chat group not found.");
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("chat_groups").delete().eq("id", groupId);

  if (error) {
    throw new Error(`Failed to delete chat group: ${error.message}`);
  }
}

export async function listChatMessages(groupId: string): Promise<ChatMessageRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("group_id", groupId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to list chat messages: ${error.message}`);
  }

  return (data ?? []) as ChatMessageRow[];
}

export async function saveChatMessage(
  groupId: string,
  role: "user" | "assistant",
  content: string,
): Promise<ChatMessageRow> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("chat_messages")
    .insert({
      group_id: groupId,
      role,
      content,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to save chat message: ${error.message}`);
  }

  const now = new Date().toISOString();
  await supabase.from("chat_groups").update({ updated_at: now }).eq("id", groupId);

  return data as ChatMessageRow;
}

export async function maybeUpdateGroupTitleFromFirstMessage(
  groupId: string,
  userMessage: string,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("chat_groups")
    .select("title")
    .eq("id", groupId)
    .single();

  if (error || !data) return;

  if (data.title !== DEFAULT_TITLE) return;

  await supabase
    .from("chat_groups")
    .update({
      title: truncateTitle(userMessage),
      updated_at: new Date().toISOString(),
    })
    .eq("id", groupId);
}
