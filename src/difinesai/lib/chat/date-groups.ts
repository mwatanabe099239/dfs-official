import { INTL_LOCALE_TAGS, type Locale } from "../../i18n/translations";
import type { ChatGroupRow } from "../rag/chat.server";

export type ConversationDateGroup = {
  label: "Today" | "Yesterday" | "Earlier";
  items: ChatGroupRow[];
};

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function groupConversationsByDate(groups: ChatGroupRow[]): ConversationDateGroup[] {
  const today = startOfDay(new Date());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const buckets: ConversationDateGroup[] = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Earlier", items: [] },
  ];

  for (const group of groups) {
    const updated = startOfDay(new Date(group.updated_at));
    if (updated.getTime() === today.getTime()) {
      buckets[0].items.push(group);
    } else if (updated.getTime() === yesterday.getTime()) {
      buckets[1].items.push(group);
    } else {
      buckets[2].items.push(group);
    }
  }

  return buckets.filter((bucket) => bucket.items.length > 0);
}

export function formatConversationTime(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(INTL_LOCALE_TAGS[locale], {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoDate));
}
