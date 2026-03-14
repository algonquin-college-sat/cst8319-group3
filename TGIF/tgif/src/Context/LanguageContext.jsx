import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
    };

    const t = (en, fr) => {
        return language === 'en' ? en : fr;
    };

    const getField = (obj, fieldBase) => {
        const key = `${fieldBase}_${language}`;
        const fallbackKey = `${fieldBase}_en`;

        return obj[key] || obj[fallbackKey] || '';
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, getField }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }

    return context;
};