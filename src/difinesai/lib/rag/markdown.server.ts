export function normalizeMarkdown(markdown: string): string {
  return markdown.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

export function composeArticleMarkdown(title: string, content: string): string {
  const normalized = normalizeMarkdown(content).trim();
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return normalized;
  }

  const firstLine = normalized.split("\n")[0] ?? "";
  if (/^#\s+/.test(firstLine)) {
    return normalized;
  }

  return normalized ? `# ${trimmedTitle}\n\n${normalized}` : `# ${trimmedTitle}`;
}
