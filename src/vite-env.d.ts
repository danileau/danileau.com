/// <reference types="vite/client" />

declare module "virtual:notes" {
  import type { Note } from "@/content/notes";
  export const notesEn: Note[];
  export const notesDe: Note[];
}
