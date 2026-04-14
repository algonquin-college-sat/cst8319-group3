import React, { createContext, useState } from 'react';
import type { ReactNode } from './LanguageUtils';
import type { LanguageContextType } from './LanguageUtils';
import { t as translate, getField as getFieldHelper } from './LanguageUtils';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t: (en, fr) => translate(language, en, fr),
        getField: (obj, fieldBase) => getFieldHelper(language, obj, fieldBase),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext }; // Only export context, not the hook