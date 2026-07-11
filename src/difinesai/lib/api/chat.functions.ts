"use client";

import type { ChatGroupRow, ChatMessageRow } from "../rag/chat.server";
import type { Locale } from "../../i18n/translations";

async function jsonPost<TBody, TResult>(url: string, body: TBody): Promise<TResult> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : undefined;

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && "error" in payload && payload.error) ||
      `Request failed with status ${response.status}`;
    throw new Error(String(message));
  }

  return payload as TResult;
}

export async function fetchChatGroups(args: {
  data: { sessionId: string };
}): Promise<ChatGroupRow[]> {
  return jsonPost("/api/difinesai/chat/groups/list", args.data);
}

export async function createNewChatGroup(args: {
  data: { sessionId: string; locale?: Locale };
}): Promise<ChatGroupRow> {
  return jsonPost("/api/difinesai/chat/groups/create", args.data);
}

export async function fetchChatMessages(args: {
  data: { sessionId: string; groupId: string };
}): Promise<ChatMessageRow[]> {
  return jsonPost("/api/difinesai/chat/messages/list", args.data);
}

export async function removeChatGroup(args: {
  data: { sessionId: string; groupId: string };
}): Promise<void> {
  await jsonPost("/api/difinesai/chat/groups/delete", args.data);
}
