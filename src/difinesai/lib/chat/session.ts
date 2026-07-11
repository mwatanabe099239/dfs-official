const SESSION_STORAGE_KEY = "difines.chat.session";

export function getOrCreateChatSessionId(): string {
  if (typeof window === "undefined") {
    return "server";
  }

  try {
    const existing = localStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    localStorage.setItem(SESSION_STORAGE_KEY, id);
    return id;
  } catch {
    return `session-${Date.now()}`;
  }
}
