import { Skeleton } from "../ui/skeleton";

export function SidebarConversationsSkeleton() {
  return (
    <div className="mt-4 space-y-2 px-3">
      <Skeleton className="h-3 w-12" />
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-8 w-full rounded-lg" />
      ))}
    </div>
  );
}

export function ChatHistorySkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-end gap-2">
        <Skeleton className="mt-2 h-2.5 w-10" />
        <Skeleton className="h-10 w-[min(280px,70%)] rounded-2xl rounded-tr-sm" />
        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
      </div>
      <div className="flex items-start gap-3">
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
        <div className="w-full max-w-[600px] space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2.5 w-12" />
          </div>
          <div className="space-y-2 rounded-2xl rounded-tl-sm border-gradient bg-card p-4 shadow-sm">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssistantReplySkeleton({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-black text-primary-foreground">
        AI
      </div>
      <div className="max-w-[600px]">
        <div className="flex items-center gap-2">
          <div className="text-[13px] font-bold text-foreground">{label}</div>
          <Skeleton className="h-2.5 w-12" />
        </div>
        <div className="mt-2 space-y-2 rounded-2xl rounded-tl-sm border-gradient bg-card p-4 shadow-sm">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[92%]" />
          <Skeleton className="h-3 w-[78%]" />
        </div>
      </div>
    </div>
  );
}

export function AssistantBubbleSkeleton() {
  return (
    <div className="mt-2 space-y-2 rounded-2xl rounded-tl-sm border-gradient bg-card p-4 shadow-sm">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-[92%]" />
      <Skeleton className="h-3 w-[78%]" />
    </div>
  );
}
