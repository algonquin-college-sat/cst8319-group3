import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (en: string, fr: string) => string;
  getField: <T extends object>(obj: T, fieldBase: string) => string;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const t = (en: string, fr: string): string => {
    return language === 'en' ? en : fr;
  };

  // Get field from API response object based on language
  // e.g., getField(event, 'title') returns event.title_en or event.title_fr
 const getField = <T extends object>(obj: T, fieldBase: string): string => {
  const key = `${fieldBase}_${language}` as keyof T;
  const fallbackKey = `${fieldBase}_en` as keyof T;

  return (obj[key] as string) || (obj[fallbackKey] as string) || '';
};

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, getField }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};