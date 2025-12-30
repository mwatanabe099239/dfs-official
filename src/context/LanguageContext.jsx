import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', dir: 'ltr' },
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Set document direction for RTL languages
    const lang = languages.find(l => l.code === language);
    document.documentElement.dir = lang?.dir || 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key, fallback = '') => {
    const keys = key.split('.');
    
    // Try current language first
    let value = translations[language];
    let found = true;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        found = false;
        break;
      }
    }
    
    if (found && value !== undefined && value !== null) {
      return value;
    }
    
    // Fallback to English
    if (language !== 'en') {
      value = translations['en'];
      found = true;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          found = false;
          break;
        }
      }
      
      if (found && value !== undefined && value !== null) {
        return value;
      }
    }
    
    return fallback || key;
  };

  const changeLanguage = (langCode) => {
    if (languages.find(l => l.code === langCode)) {
      setLanguage(langCode);
    }
  };

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage, 
      t, 
      currentLanguage,
      languages,
      isRTL: currentLanguage.dir === 'rtl'
    }}>
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

