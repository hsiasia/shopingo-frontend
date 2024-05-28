import React, { createContext, useContext, useState } from 'react';
import translations from './translations.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  const translate = (key) => {
    return translations[key] ? translations[key][language] : key;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
