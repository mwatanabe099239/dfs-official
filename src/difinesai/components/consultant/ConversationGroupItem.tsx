"use client";

import { MoreVertical, Share2, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useT } from "../../i18n/I18nProvider";
import { formatConversationTime } from "../../lib/chat/date-groups";
import type { ChatGroupRow } from "../../lib/rag/chat.server";

export function ConversationGroupItem({
  group,
  isActive,
  onSelect,
  onRemove,
}: {
  group: ChatGroupRow;
  isActive: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const { t, locale } = useT();

  return (
    <div
      className={`group/item flex items-center rounded-lg ${
        isActive ? "bg-primary/10" : "hover:bg-surface"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`flex min-w-0 flex-1 items-center justify-between px-3 py-1.5 text-left text-[12px] ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <span className="truncate">{group.title}</span>
        <span className="ml-2 shrink-0 text-[10px] text-muted-foreground">
          {formatConversationTime(group.updated_at, locale)}
        </span>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            onClick={(event) => event.stopPropagation()}
            className="mr-1 grid h-6 w-6 shrink-0 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground"
            aria-label={t("Conversation options")}
          >
            <MoreVertical className="h-3.5 w-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[9rem]">
          <DropdownMenuItem disabled className="text-[12px]">
            <Share2 className="h-3.5 w-3.5" />
            {t("Share")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-[12px] text-destructive focus:text-destructive"
            onSelect={() => onRemove()}
          >
            <Trash2 className="h-3.5 w-3.5" />
            {t("Remove")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
