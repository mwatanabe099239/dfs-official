import { normalizeMarkdown } from "./markdown.server";

const MAX_CHUNK_LENGTH = 900;
const MIN_CHUNK_LENGTH = 80;

export type TextChunk = {
  content: string;
  metadata: {
    heading?: string;
    headingLevel?: number;
    chunkIndex: number;
  };
};

type MarkdownSection = {
  heading: string;
  headingLevel: number;
  body: string;
};

function splitMarkdownSections(markdown: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  const lines = normalizeMarkdown(markdown).split("\n");
  let currentHeading = "Introduction";
  let currentHeadingLevel = 0;
  let currentBody: string[] = [];

  const flush = () => {
    const body = currentBody.join("\n").trim();
    if (body) {
      sections.push({
        heading: currentHeading,
        headingLevel: currentHeadingLevel,
        body,
      });
    }
    currentBody = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flush();
      currentHeading = headingMatch[2].trim();
      currentHeadingLevel = headingMatch[1].length;
      continue;
    }
    currentBody.push(line);
  }

  flush();
  return sections;
}

function formatSectionChunk(section: MarkdownSection, body: string): string {
  if (section.heading === "Introduction" || section.headingLevel === 0) {
    return body;
  }

  const headingPrefix = `${"#".repeat(section.headingLevel)} ${section.heading}`;
  return `${headingPrefix}\n\n${body}`;
}

function splitLongText(text: string, maxLength: number): string[] {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let buffer = "";

  const pushBuffer = (force = false) => {
    const trimmed = buffer.trim();
    if (!trimmed) {
      buffer = "";
      return;
    }

    if (force || trimmed.length >= MIN_CHUNK_LENGTH) {
      chunks.push(trimmed);
      buffer = "";
    }
  };

  for (const paragraph of paragraphs) {
    if (paragraph.length > maxLength) {
      pushBuffer(true);
      const sentences = paragraph.split(/(?<=[.!?])\s+/);
      let sentenceBuffer = "";
      for (const sentence of sentences) {
        if (`${sentenceBuffer} ${sentence}`.trim().length > maxLength) {
          if (sentenceBuffer.trim()) chunks.push(sentenceBuffer.trim());
          sentenceBuffer = sentence;
        } else {
          sentenceBuffer = sentenceBuffer ? `${sentenceBuffer} ${sentence}` : sentence;
        }
      }
      if (sentenceBuffer.trim()) chunks.push(sentenceBuffer.trim());
      continue;
    }

    const next = buffer ? `${buffer}\n\n${paragraph}` : paragraph;
    if (next.length > maxLength) {
      pushBuffer(true);
      buffer = paragraph;
    } else {
      buffer = next;
    }
  }

  pushBuffer(true);
  return chunks;
}

export function chunkMarkdown(markdown: string): TextChunk[] {
  const sections = splitMarkdownSections(markdown);
  const chunks: TextChunk[] = [];

  for (const section of sections) {
    const sectionChunks = splitLongText(section.body, MAX_CHUNK_LENGTH);
    sectionChunks.forEach((body, chunkIndex) => {
      chunks.push({
        content: formatSectionChunk(section, body),
        metadata: {
          heading: section.heading,
          headingLevel: section.headingLevel,
          chunkIndex,
        },
      });
    });
  }

  return chunks;
}
