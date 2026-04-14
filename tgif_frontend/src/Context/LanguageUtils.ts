import type { ReactNode } from 'react';

export type Language = 'en' | 'fr';

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (en: string, fr: string) => string;
  getField: <T extends object>(obj: T, fieldBase: string) => string;
}

// Helper to translate a string based on language
export const t = (language: Language, en: string, fr: string): string => {
  return language === 'en' ? en : fr;
};

// Get field from object based on language
export const getField = <T extends object>(
  language: Language,
  obj: T,
  fieldBase: string
): string => {
  const key = `${fieldBase}_${language}` as keyof T;
  const fallbackKey = `${fieldBase}_en` as keyof T;

  return (obj[key] as string) || (obj[fallbackKey] as string) || '';
};

export type { ReactNode };