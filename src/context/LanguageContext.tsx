'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../translations';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', dir: 'ltr' },
];

interface LanguageContextType {
  language: string;
  changeLanguage: (langCode: string) => void;
  t: (key: string, fallback?: string) => string;
  currentLanguage: Language;
  languages: Language[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return saved || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      // Set document direction for RTL languages
      const lang = languages.find(l => l.code === language);
      if (document && document.documentElement) {
        document.documentElement.dir = lang?.dir || 'ltr';
        document.documentElement.lang = language;
      }
    }
  }, [language]);

  const t = (key: string, fallback: string = ''): string => {
    const keys = key.split('.');
    
    // Try current language first
    let value: any = translations[language as keyof typeof translations];
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

  const changeLanguage = (langCode: string) => {
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

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

