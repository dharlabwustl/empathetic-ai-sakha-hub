
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: "Welcome",
    dashboard: "Dashboard",
    todaysPlan: "Today's Plan",
    conceptCards: "Concept Cards",
    flashcards: "Flashcards",
    practiceExam: "Practice Exam",
    academicAdvisor: "Academic Advisor",
    feelGoodCorner: "Feel Good Corner",
    studyPlan: "Study Plan",
    formulas: "Formulas",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    greeting: "Welcome to PREPZR! I'm Sakha AI, your study companion.",
    dashboardGreeting: "Welcome back! I'm here to help you with your studies.",
  },
  hi: {
    welcome: "स्वागत",
    dashboard: "डैशबोर्ड",
    todaysPlan: "आज की योजना",
    conceptCards: "अवधारणा कार्ड",
    flashcards: "फ्लैशकार्ड",
    practiceExam: "अभ्यास परीक्षा",
    academicAdvisor: "शैक्षिक सलाहकार",
    feelGoodCorner: "अच्छा महसूस कॉर्नर",
    studyPlan: "अध्ययन योजना",
    formulas: "सूत्र",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    greeting: "PREPZR में आपका स्वागत है! मैं साक्षा AI हूं, आपका अध्ययन साथी।",
    dashboardGreeting: "वापसी पर स्वागत! मैं आपकी पढ़ाई में मदद के लिए यहां हूं।",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
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
