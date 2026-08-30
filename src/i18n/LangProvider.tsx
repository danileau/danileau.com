import { useEffect, useState, type ReactNode } from "react";
import {
  DICTS,
  LangContext,
  STORAGE_KEY,
  detectLang,
  type I18nContextValue,
  type Lang,
} from "./use-i18n";

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(detectLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* the page still works, the choice just will not survive a reload */
    }
  }, [lang]);

  const value: I18nContextValue = {
    lang,
    setLang,
    toggle: () => setLang((l) => (l === "en" ? "de" : "en")),
    c: DICTS[lang],
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};
