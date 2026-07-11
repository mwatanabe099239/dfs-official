"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UIMessage } from "ai";

import { createNewChatGroup, fetchChatGroups, removeChatGroup } from "../../lib/api/chat.functions";
import { getOrCreateChatSessionId } from "../../lib/chat/session";
import type { Locale } from "../../i18n/translations";
import type { ChatGroupRow } from "../../lib/rag/chat.server";

type ConsultantChatContextValue = {
  sessionId: string;
  groups: ChatGroupRow[];
  activeGroupId: string | null;
  isBootstrapping: boolean;
  setActiveGroupId: (groupId: string | null) => void;
  createGroup: () => Promise<string>;
  removeGroup: (groupId: string) => Promise<void>;
  refreshGroups: () => Promise<ChatGroupRow[]>;
};

const ConsultantChatContext = createContext<ConsultantChatContextValue | null>(null);

export function ConsultantChatProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const [sessionId] = useState(() => getOrCreateChatSessionId());
  const [groups, setGroups] = useState<ChatGroupRow[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const refreshGroups = useCallback(async () => {
    const next = await fetchChatGroups({ data: { sessionId } });
    setGroups(next);
    return next;
  }, [sessionId]);

  const createGroup = useCallback(async () => {
    const group = await createNewChatGroup({ data: { sessionId, locale } });
    setActiveGroupId(group.id);
    await refreshGroups();
    return group.id;
  }, [sessionId, locale, refreshGroups]);

  const removeGroup = useCallback(
    async (groupId: string) => {
      await removeChatGroup({ data: { sessionId, groupId } });
      const next = await refreshGroups();
      setActiveGroupId((current) => {
        if (current !== groupId) return current;
        return next[0]?.id ?? null;
      });
    },
    [sessionId, refreshGroups],
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const next = await fetchChatGroups({ data: { sessionId } });
        if (cancelled) return;
        setGroups(next);
        if (next.length > 0) {
          setActiveGroupId(next[0].id);
        }
      } finally {
        if (!cancelled) setIsBootstrapping(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const value = useMemo(
    () => ({
      sessionId,
      groups,
      activeGroupId,
      isBootstrapping,
      setActiveGroupId,
      createGroup,
      removeGroup,
      refreshGroups,
    }),
    [sessionId, groups, activeGroupId, isBootstrapping, createGroup, removeGroup, refreshGroups],
  );

  return (
    <ConsultantChatContext.Provider value={value}>{children}</ConsultantChatContext.Provider>
  );
}

export function useConsultantChat() {
  const ctx = useContext(ConsultantChatContext);
  if (!ctx) {
    throw new Error("useConsultantChat must be used within ConsultantChatProvider");
  }
  return ctx;
}

export function mapStoredMessagesToUi(messages: Array<{
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}>): UIMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role,
    parts: [{ type: "text" as const, text: message.content }],
    metadata: { createdAt: message.created_at },
  }));
}
