
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, TranslationSet } from '@/lib/translations';

type Language = 'en' | 'hi' | 'kn';

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationSet;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
