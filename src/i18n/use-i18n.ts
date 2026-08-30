import { createContext, useContext } from "react";
import { en, type Content } from "./en";
import { de } from "./de";

export type Lang = "en" | "de";

export const DICTS: Record<Lang, Content> = { en, de };
export const STORAGE_KEY = "danileau_lang";

/** Saved choice wins; otherwise the browser decides. Storage can throw in a
 *  locked-down browser, so every access is guarded. */
export const detectLang = (): Lang => {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "de") return saved;
  } catch {
    /* private mode, or site data blocked */
  }
  return navigator.language?.toLowerCase().startsWith("de") ? "de" : "en";
};

export type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  c: Content;
};

export const LangContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
  c: en,
});

export const useI18n = () => useContext(LangContext);

/** Fills `{name}` placeholders. */
export const t = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
