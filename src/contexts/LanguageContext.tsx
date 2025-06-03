
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    studyPlan: 'Study Plan',
    concepts: 'Concepts',
    practiceExam: 'Practice Exam',
    profile: 'Profile',
    logout: 'Logout',
    language: 'Language',
    viewPlan: 'View Plan',
    optimize: 'Optimize',
    neetStrategy: 'NEET 2026 Strategy'
  },
  hi: {
    welcome: 'स्वागत है',
    dashboard: 'डैशबोर्ड',
    studyPlan: 'अध्ययन योजना',
    concepts: 'अवधारणाएं',
    practiceExam: 'अभ्यास परीक्षा',
    profile: 'प्रोफाइल',
    logout: 'लॉग आउट',
    language: 'भाषा',
    viewPlan: 'योजना देखें',
    optimize: 'अनुकूलित करें',
    neetStrategy: 'NEET 2026 रणनीति'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred_language') as 'en' | 'hi';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    localStorage.setItem('preferred_language', lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
