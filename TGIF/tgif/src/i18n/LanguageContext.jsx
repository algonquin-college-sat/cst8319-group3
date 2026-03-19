import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getDict, t as translate } from "./i18n";

const LanguageContext = createContext(null);

const STORAGE_KEY = "tgif_language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "EN" || saved === "FR") setLanguage(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
  }, [language]);

  const dict = useMemo(() => getDict(language), [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key, fallback) => translate(dict, key, fallback),
    }),
    [language, dict]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

