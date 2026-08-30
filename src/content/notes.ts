/**
 * Notes — the writing part of the site.
 *
 * Content is data, not JSX, so the same structure carries both languages and a
 * translation cannot quietly diverge from the layout. Inline markup is
 * deliberately tiny: **bold**, *italic* and `mono`, handled by <Prose>.
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; num: string; text: string }
  | { t: "note"; tone: "warn" | "fix"; title: string; paras: string[] }
  | { t: "quote"; text: string }
  | { t: "pull"; lines: string[] };

export type Note = {
  slug: string;
  no: string;
  title: string;
  standfirst: string;
  topic: string;
  date: string;
  blocks: Block[];
};
