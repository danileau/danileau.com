import { useI18n } from "@/i18n/use-i18n";
import { notesEn } from "./notes.en";
import { notesDe } from "./notes.de";
import type { Note } from "./notes";

/** The slug is language-independent, so toggling the language on a note keeps
 *  you on the same note rather than dropping you at a 404. */
export const useNotes = (): Note[] => {
  const { lang } = useI18n();
  return lang === "de" ? notesDe : notesEn;
};

export const useNote = (slug?: string): Note | undefined =>
  useNotes().find((n) => n.slug === slug);
