"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import {
  Plus,
  Sparkles,
  Compass,
  Coins,
  Bot,
  BarChart3,
  HelpCircle,
  Sun,
  FileText,
  BookOpen,
  FileCheck2,
  Database,
  Globe2,
  TrendingUp,
  Users,
  Lock,
  Send,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Workflow,
  Megaphone,
  PanelLeft,
  PanelRight,
} from "lucide-react";

import {
  AssistantBubbleSkeleton,
  AssistantReplySkeleton,
  ChatHistorySkeleton,
  SidebarConversationsSkeleton,
} from "../../../src/difinesai/components/consultant/ChatSkeletons";
import { ChatMessageActions } from "../../../src/difinesai/components/consultant/ChatMessageActions";
import { ConversationGroupItem } from "../../../src/difinesai/components/consultant/ConversationGroupItem";
import { Logo } from "../../../src/difinesai/components/difines/Logo";
import { ThemeToggle } from "../../../src/difinesai/components/difines/theme-toggle";
import {
  ConsultantChatProvider,
  mapStoredMessagesToUi,
  useConsultantChat,
} from "../../../src/difinesai/components/consultant/ConsultantChatProvider";
import { fetchChatMessages } from "../../../src/difinesai/lib/api/chat.functions";
import {
  formatConversationTime,
  groupConversationsByDate,
} from "../../../src/difinesai/lib/chat/date-groups";
import { Sheet, SheetContent, SheetTitle } from "../../../src/difinesai/components/ui/sheet";
import { useT, LanguageSwitcher } from "../../../src/difinesai/i18n/I18nProvider";
import { INTL_LOCALE_TAGS, type Locale } from "../../../src/difinesai/i18n/translations";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export default function ConsultantPage() {
  const { locale } = useT();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  useEffect(() => {
    setLeftOpen(isLg);
    setRightOpen(isLg);
  }, [isLg]);

  return (
    <ConsultantChatProvider locale={locale}>
      <div className="flex h-[100dvh] overflow-hidden bg-background text-foreground">
        <Sidebar open={leftOpen} onOpenChange={setLeftOpen} isLg={isLg} />
        <main className="flex min-w-0 flex-1">
          <ChatColumn
            leftOpen={leftOpen}
            rightOpen={rightOpen}
            onToggleLeft={() => setLeftOpen((open) => !open)}
            onToggleRight={() => setRightOpen((open) => !open)}
          />
          <RightPanel open={rightOpen} onOpenChange={setRightOpen} isLg={isLg} />
        </main>
      </div>
    </ConsultantChatProvider>
  );
}

function PanelToggle({
  onClick,
  label,
  children,
  className = "",
}: {
  onClick: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border-gradient border-gradient-hover text-muted-foreground transition hover:bg-surface hover:text-foreground ${className}`}
    >
      {children}
    </button>
  );
}

function ComingSoonBadge({ className = "" }: { className?: string }) {
  const { t } = useT();

  return (
    <span
      className={`ml-auto shrink-0 rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted-foreground ${className}`}
    >
      {t("Coming soon")}
    </span>
  );
}

function SidebarBody({
  onOpenChange,
  closeOnSelect = false,
}: {
  onOpenChange: (open: boolean) => void;
  closeOnSelect?: boolean;
}) {
  const router = useRouter();
  const { t } = useT();
  const { groups, activeGroupId, setActiveGroupId, createGroup, removeGroup, isBootstrapping } =
    useConsultantChat();

  type NavItem = {
    icon: typeof Sparkles;
    l: string;
    active?: boolean;
    to?: string;
    comingSoon?: boolean;
  };

  const nav: NavItem[] = [
    { icon: Sparkles, l: "AI Consultant", active: true, to: "/ai/consultant" },
    { icon: Compass, l: "DFS Chain Explorer", comingSoon: true },
    { icon: Coins, l: "Token Tools", comingSoon: true },
    { icon: Bot, l: "AI Agents", comingSoon: true },
    { icon: BarChart3, l: "Analytics", comingSoon: true },
  ];

  const grouped = groupConversationsByDate(groups);

  return (
    <div className="flex h-full w-[260px] flex-col">
      <div className="flex items-center justify-between gap-2 px-5 py-5">
        <div
          className="flex min-w-0 cursor-pointer items-center gap-2"
          onClick={() => router.push("/ai")}
        >
          <Logo className="h-9" />
        </div>
        <PanelToggle onClick={() => onOpenChange(false)} label={t("Collapse sidebar")}>
          <ChevronLeft className="h-4 w-4" />
        </PanelToggle>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={() => void createGroup()}
          className="flex w-full items-center justify-between rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_6px_16px_-6px_rgb(53_149_94/0.6)]"
        >
          <span className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> {t("New Conversation")}
          </span>
          <span className="hidden rounded bg-card/20 px-1.5 py-0.5 text-[10px] font-bold sm:inline">
            ⌘K
          </span>
        </button>
      </div>

      <nav className="scrollbar-pro mt-4 min-h-0 flex-1 overflow-y-auto px-3">
        <div className="space-y-0.5">
          {nav.map((n) => {
            const itemClassName = `flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium ${
              n.active
                ? "bg-primary/10 text-primary"
                : n.comingSoon
                  ? "cursor-default text-muted-foreground/80"
                  : "text-muted-foreground hover:bg-surface"
            }`;
            const content = (
              <>
                <n.icon className="h-4 w-4 shrink-0" />
                <span className="min-w-0 truncate">{t(n.l)}</span>
                {n.comingSoon ? <ComingSoonBadge /> : null}
              </>
            );

            if (n.comingSoon) {
              return (
                <div key={n.l} className={itemClassName} aria-disabled="true">
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={n.l}
                href={n.to!}
                className={itemClassName}
                onClick={() => {
                  if (closeOnSelect) onOpenChange(false);
                }}
              >
                {content}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between px-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {t("Recent Conversations")}
          </div>
          <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
        </div>

        {isBootstrapping ? (
          <SidebarConversationsSkeleton />
        ) : grouped.length === 0 ? (
          <div className="mt-4 px-3 text-[12px] text-muted-foreground">
            {t("No conversations yet")}
          </div>
        ) : (
          grouped.map((section) => (
            <div key={section.label} className="mt-2">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {t(section.label)}
              </div>
              <div className="mt-1 space-y-0.5">
                {section.items.map((group) => (
                  <ConversationGroupItem
                    key={group.id}
                    group={group}
                    isActive={activeGroupId === group.id}
                    onSelect={() => {
                      setActiveGroupId(group.id);
                      if (closeOnSelect) onOpenChange(false);
                    }}
                    onRemove={() => void removeGroup(group.id)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </nav>
    </div>
  );
}

function Sidebar({
  open,
  onOpenChange,
  isLg,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLg: boolean;
}) {
  const { t } = useT();

  return (
    <>
      <aside
        className={`hidden h-[100dvh] shrink-0 flex-col overflow-hidden bg-card transition-[width] duration-200 ease-in-out lg:flex ${
          open ? "w-[260px] border-r-gradient" : "w-0"
        }`}
      >
        <SidebarBody onOpenChange={onOpenChange} />
      </aside>

      <Sheet open={open && !isLg} onOpenChange={onOpenChange}>
        <SheetContent
          side="left"
          hideCloseButton
          className="z-[60] flex h-full w-[280px] max-w-[85vw] flex-col !fixed border-0 bg-card p-0 sm:max-w-[280px]"
        >
          <SheetTitle className="sr-only">{t("Navigation sidebar")}</SheetTitle>
          <div className="flex h-full min-h-0 flex-col border-r-gradient">
            <SidebarBody onOpenChange={onOpenChange} closeOnSelect />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function getMessageTime(message: UIMessage, locale: Locale): string {
  const createdAt = (message.metadata as { createdAt?: string } | undefined)?.createdAt;
  if (createdAt) {
    return formatConversationTime(createdAt, locale);
  }

  return new Intl.DateTimeFormat(INTL_LOCALE_TAGS[locale], {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

function ChatColumn({
  leftOpen,
  rightOpen,
  onToggleLeft,
  onToggleRight,
}: {
  leftOpen: boolean;
  rightOpen: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
}) {
  const { t, locale } = useT();
  const { sessionId, activeGroupId, createGroup, refreshGroups, isBootstrapping } =
    useConsultantChat();
  const [input, setInput] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [chatId, setChatId] = useState<string>(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suppressHistoryLoadRef = useRef(false);
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/ai/consultant-chat",
      }),
    [],
  );

  const { messages, setMessages, sendMessage, status, error } = useChat({
    id: chatId,
    transport,
    onFinish: () => {
      void refreshGroups();
    },
  });

  const isGenerating = status === "submitted" || status === "streaming";
  const lastMessage = messages[messages.length - 1];
  const showStandaloneAssistantSkeleton = status === "submitted" && lastMessage?.role === "user";
  const suggestions = [
    { icon: Sparkles, t: "How to launch a token on DFS Chain?" },
    { icon: HelpCircle, t: "What are the benefits of DFS Chain?" },
    { icon: Sun, t: "How does DFS Chain consensus work?" },
    { icon: Lock, t: "How to stake DFS tokens?" },
    { icon: Sparkles, t: "What is DFS Scan?" },
    { icon: HelpCircle, t: "Explain DFS tokenomics" },
  ];

  useEffect(() => {
    if (!activeGroupId || suppressHistoryLoadRef.current) return;
    setChatId(activeGroupId);
  }, [activeGroupId]);

  useEffect(() => {
    if (isBootstrapping) return;

    if (!activeGroupId) {
      setMessages([]);
      return;
    }

    if (suppressHistoryLoadRef.current) {
      suppressHistoryLoadRef.current = false;
      return;
    }

    if (isGenerating) return;

    let cancelled = false;

    (async () => {
      setIsLoadingHistory(true);
      try {
        const rows = await fetchChatMessages({
          data: { sessionId, groupId: activeGroupId },
        });
        if (!cancelled) {
          setMessages(mapStoredMessagesToUi(rows));
        }
      } catch {
        if (!cancelled) setMessages([]);
      } finally {
        if (!cancelled) setIsLoadingHistory(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeGroupId, isBootstrapping, isGenerating, sessionId, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating, isLoadingHistory, showStandaloneAssistantSkeleton]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isGenerating) return;

    let groupId = activeGroupId;
    if (!groupId) {
      suppressHistoryLoadRef.current = true;
      const newGroupId = await createGroup();
      groupId = newGroupId;
      flushSync(() => {
        setChatId(newGroupId);
      });
    }

    setInput("");
    await sendMessage({ text: trimmed }, { body: { locale, groupId, sessionId } });
  };

  return (
    <section className="flex h-dvh min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-card">
      <header className="shrink-0 border-b-gradient px-4 py-3 sm:px-6 lg:px-7 lg:py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              {!leftOpen && (
                <PanelToggle
                  onClick={onToggleLeft}
                  label={t("Expand sidebar")}
                  className="hidden lg:grid"
                >
                  <PanelLeft className="h-4 w-4" />
                </PanelToggle>
              )}
              <Link
                href="/ai"
                aria-label={t("DFS AI Consultant")}
                className="inline-flex shrink-0 items-center rounded-sm outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <img
                  src="/ai/logo_white.png"
                  alt={t("DFS AI Consultant")}
                  className="h-7 w-auto max-w-[210px] object-contain sm:h-8 dark:hidden"
                />
                <img
                  src="/ai/logo.png"
                  alt={t("DFS AI Consultant")}
                  className="hidden h-7 w-auto max-w-[210px] object-contain sm:h-8 dark:inline-block"
                />
              </Link>
              <span className="hidden shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10.5px] font-bold text-primary sm:inline-flex">
                <Sparkles className="h-3 w-3" /> {t("Powered by DIFINES RAG")}
              </span>
            </div>
            <p className="mt-1 hidden text-[12.5px] text-muted-foreground sm:block">
              {t("Your intelligent assistant for DFS Chain, Web3 business and AI solutions.")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <PanelToggle onClick={onToggleRight} label={t("Open panel")} className="lg:hidden">
              <PanelRight className="h-4 w-4" />
            </PanelToggle>
            {!rightOpen && (
              <PanelToggle
                onClick={onToggleRight}
                label={t("Expand panel")}
                className="hidden lg:grid"
              >
                <PanelRight className="h-4 w-4" />
              </PanelToggle>
            )}
            <LanguageSwitcher className="hidden sm:flex" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="scrollbar-pro min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-7">
        {isLoadingHistory ? (
          <ChatHistorySkeleton />
        ) : messages.length === 0 && !error && !isGenerating ? (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-7 w-7" />
            </div>
            <p className="mt-4 max-w-md text-[15px] font-bold text-foreground">
              {t("Ask anything about our consulting services")}
            </p>
            <p className="mt-2 max-w-md text-[13px] text-muted-foreground">
              {t("Answers are grounded in the DIFINES consultant knowledge base.")}
            </p>
          </div>
        ) : null}

        {!isLoadingHistory && error && (
          <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-[13px] text-destructive">
            {t("Something went wrong while generating a response. Please try again.")}
            {error.message ? ` (${error.message})` : ""}
          </div>
        )}

        {!isLoadingHistory && (messages.length > 0 || showStandaloneAssistantSkeleton) && (
          <div className="space-y-6">
            {messages.map((message, index) => {
              const text = message.parts
                .filter((part) => part.type === "text")
                .map((part) => part.text)
                .join("\n");
              const isStreamingAssistant =
                isGenerating &&
                message.role === "assistant" &&
                index === messages.length - 1 &&
                !text;
              const time = getMessageTime(message, locale);

              if (message.role === "user") {
                if (!text) return null;
                return (
                  <div key={message.id} className="flex items-start justify-end gap-1.5 sm:gap-2">
                    <span className="mt-2 hidden text-[10px] text-muted-foreground sm:inline">
                      {time}
                    </span>
                    <div className="max-w-[88%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-[13px] text-primary-foreground sm:max-w-[460px] sm:px-4">
                      {text}
                    </div>
                    <div className="hidden h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-lime-400 sm:block" />
                  </div>
                );
              }

              if (!text && !isStreamingAssistant) return null;

              return (
                <div key={message.id} className="flex items-start gap-2.5 sm:gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-black text-primary-foreground sm:h-9 sm:w-9 sm:text-[11px]">
                    AI
                  </div>
                  <div className="min-w-0 max-w-full flex-1 sm:max-w-[600px] sm:flex-none">
                    <div className="flex items-center gap-2">
                      <div className="text-[13px] font-bold text-foreground">
                        {t("DFS AI Consultant")}
                      </div>
                      {!isStreamingAssistant && (
                        <div className="text-[10px] text-muted-foreground">{time}</div>
                      )}
                    </div>
                    {text ? (
                      <div className="mt-2 rounded-2xl rounded-tl-sm border-gradient bg-card p-4 text-[13px] leading-relaxed text-foreground shadow-sm whitespace-pre-wrap">
                        {text}
                        <ChatMessageActions text={text} />
                      </div>
                    ) : (
                      <AssistantBubbleSkeleton />
                    )}
                  </div>
                </div>
              );
            })}

            {showStandaloneAssistantSkeleton && (
              <AssistantReplySkeleton label={t("DFS AI Consultant")} />
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 border-t-gradient bg-card px-4 py-2 sm:px-6 lg:px-7">
        <div className="scrollbar-pro flex items-center gap-2 overflow-x-auto pb-1.5">
          <span className="shrink-0 text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
            {t("Ask")}
          </span>
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              disabled={isGenerating || isLoadingHistory}
              onClick={() => void handleSend(t(s.t))}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-gradient border-gradient-hover bg-card px-3 py-1 text-[11.5px] font-medium whitespace-nowrap text-muted-foreground transition hover:text-foreground disabled:opacity-50"
            >
              <s.icon className="h-3 w-3" /> {t(s.t)}
            </button>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t-gradient bg-card px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-7 lg:pb-4">
        <form
          className="rounded-2xl border-gradient bg-card p-2.5 shadow-sm sm:p-3"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSend(input);
          }}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isGenerating || isLoadingHistory}
            placeholder={t("Ask anything about DFS Chain, Web3, business, AI…")}
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground disabled:opacity-60"
          />
          <div className="mt-2 flex items-center justify-end gap-2 sm:mt-2.5">
            <button
              type="submit"
              disabled={isGenerating || isLoadingHistory || !input.trim()}
              className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[0_6px_14px_-4px_rgb(53_149_94/0.6)] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function RightPanelBody({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const { t } = useT();
  const actions = [
    { icon: Sparkles, t: "Create tokenomics" },
    { icon: Workflow, t: "Design fundraising plan" },
    { icon: Users, t: "AI automation plan" },
    { icon: Megaphone, t: "Web3 marketing strategy" },
    { icon: BarChart3, t: "Analyze project" },
  ];
  const sources = [
    { icon: FileText, t: "DFS Chain Whitepaper", tag: "PDF", date: "May 18, 2024", pct: 98 },
    { icon: BookOpen, t: "DFS Chain Documentation", tag: "Docs", date: "May 20, 2024", pct: 95 },
    {
      icon: FileCheck2,
      t: "DFS Token Creation Guide",
      tag: "Guide",
      date: "May 19, 2024",
      pct: 93,
    },
    {
      icon: Database,
      t: "DFS Scan Data",
      tag: "Live Data",
      date: "Real-time blockchain data",
      pct: 91,
    },
    { icon: Globe2, t: "Ecosystem & Projects", tag: "Web", date: "May 17, 2024", pct: 90 },
  ];
  const stats = [
    { t: "Total Transactions", v: "12.45M", d: "+12.5%", icon: TrendingUp },
    { t: "Active Addresses", v: "256.8K", d: "+8.3%", icon: Users },
    { t: "DFS Price", v: "$0.0587", d: "+6.21%", icon: TrendingUp },
    { t: "Total Value Locked", v: "$24.6M", d: "+15.7%", icon: TrendingUp },
  ];

  return (
    <div className="scrollbar-pro h-full w-full overflow-y-auto p-4 sm:w-[340px] sm:p-5">
      <div className="flex items-center justify-end pb-3">
        <PanelToggle onClick={() => onOpenChange(false)} label={t("Collapse panel")}>
          <ChevronRight className="h-4 w-4" />
        </PanelToggle>
      </div>
      <div className="rounded-2xl border-gradient bg-card p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-[13px] font-bold">
            <span className="truncate">{t("Suggested Actions")}</span>
            <ComingSoonBadge className="ml-0" />
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {actions.map((a, i) => (
            <div
              key={i}
              className="flex w-full items-center justify-between rounded-lg border-gradient bg-card px-3 py-2 text-left text-[12px] font-semibold text-muted-foreground/80"
              aria-disabled="true"
            >
              <span className="inline-flex min-w-0 items-center gap-2">
                <a.icon className="h-3.5 w-3.5 shrink-0 text-primary/70" /> {t(a.t)}
              </span>
              <ComingSoonBadge className="ml-2" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border-gradient bg-card p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5 text-[13px] font-bold">
            <span className="truncate">{t("Knowledge Sources")}</span>
            <ComingSoonBadge className="ml-0" />
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {sources.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-xl border-gradient p-2.5">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="flex items-center gap-1.5">
                  <div className="truncate text-[12px] font-bold">{t(s.t)}</div>
                  <span className="rounded bg-surface px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                    {s.tag}
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {t("Last updated:")} {t(s.date)}
                </div>
              </div>
              <div className="shrink-0 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                {s.pct}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border-gradient bg-card p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-[13px] font-bold">
            <span className="truncate">{t("DFS Chain Overview")}</span>
            <ComingSoonBadge className="ml-0" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl border-gradient p-2.5">
              <div className="text-[10.5px] text-muted-foreground">{t(s.t)}</div>
              <div className="mt-0.5 flex items-center justify-between">
                <div className="text-[15px] font-black">{s.v}</div>
                <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <s.icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="text-[10px] font-bold text-emerald-600">{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border-gradient bg-card p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 text-[13px] font-bold">
            <span className="truncate">{t("Network Status")}</span>
            <ComingSoonBadge className="ml-0" />
          </div>
          <span className="text-[10.5px] font-bold text-emerald-600">{t("Operational")}</span>
        </div>
        <div className="mt-3 space-y-2 text-[12px]">
          {["DFS Chain Network", "RPC Nodes", "DFS Scan API"].map((x) => (
            <div
              key={x}
              className="flex items-center justify-between border-t-gradient pt-2 first:pt-0 [&:first-child]:after:hidden"
            >
              <span>{t(x)}</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {t("Healthy")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RightPanel({
  open,
  onOpenChange,
  isLg,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLg: boolean;
}) {
  const { t } = useT();

  return (
    <>
      <aside
        className={`hidden h-dvh shrink-0 overflow-hidden bg-surface transition-[width] duration-200 ease-in-out lg:block ${
          open ? "w-[340px] border-l-gradient" : "w-0"
        }`}
      >
        <RightPanelBody onOpenChange={onOpenChange} />
      </aside>

      <Sheet open={open && !isLg} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          hideCloseButton
          className="z-[60] flex h-full w-[min(100vw-2rem,340px)] flex-col fixed! border-0 bg-surface p-0 sm:max-w-[340px]"
        >
          <SheetTitle className="sr-only">{t("Consultant tools panel")}</SheetTitle>
          <div className="flex h-full min-h-0 flex-col border-l-gradient">
            <RightPanelBody onOpenChange={onOpenChange} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
