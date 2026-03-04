import { useContext } from 'react';
import type { LanguageContextType } from './LanguageUtils';
import { LanguageContext } from './LanguageProvider';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};