import { Gift, ArrowRight } from "lucide-react";

export function PromoBar() {
  return (
    <div className="bg-promo/50 border-b border-primary-soft/50">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 min-h-12 py-2 flex flex-col sm:flex-row items-center justify-center sm:justify-evenly gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[15px] text-foreground/90 text-center sm:text-left">
          <Gift className="sm:w-5 sm:h-5 w-4 h-4 text-primary shrink-0" />
          <span>DFSChainの知識を深めて、未来のWeb3を一緒に創りましょう！</span>
        </div>
        <a
          href="/academy/courses"
          className="inline-flex items-center gap-2 text-[12px] sm:text-[15px] font-medium text-primary hover:underline shrink-0"
        >
          今すぐ学ぶ <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
