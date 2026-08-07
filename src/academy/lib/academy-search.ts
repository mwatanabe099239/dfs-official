export type AcademySearchHit = {
  type: "qa" | "article" | "course";
  id: number;
  title: string;
  snippet: string;
  href: string;
  tag?: string;
};
