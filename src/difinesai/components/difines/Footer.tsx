import { Twitter, Github, Send, MessageCircle } from "lucide-react";

import { Logo } from "./Logo";

const SOCIALS = [
  { icon: Twitter, label: "X" },
  { icon: MessageCircle, label: "Discord" },
  { icon: Send, label: "Telegram" },
  { icon: Github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <Logo />
        <p className="text-sm text-muted-foreground">© 2026 DIFINES. All rights reserved.</p>
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border-gradient border-gradient-hover text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
