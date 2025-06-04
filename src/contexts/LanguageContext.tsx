
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Dashboard
    dashboard: 'Dashboard',
    welcome: 'Welcome',
    todaysPlan: "Today's Plan",
    concepts: 'Concepts',
    flashcards: 'Flashcards',
    practiceExam: 'Practice Exam',
    studyPlan: 'Study Plan',
    progress: 'Progress',
    profile: 'Profile',
    settings: 'Settings',
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    complete: 'Complete',
    start: 'Start',
    // Study Plan
    adaptiveStudyPlan: 'Adaptive Study Plan',
    viewPlan: 'View Plan',
    // Voice greetings
    welcomeMessage: 'Welcome to Prepzr',
    congratulations: 'Congratulations',
    signupComplete: 'Signup completed successfully',
  },
  hi: {
    // Dashboard
    dashboard: 'डैशबोर्ड',
    welcome: 'स्वागत है',
    todaysPlan: 'आज की योजना',
    concepts: 'अवधारणाएं',
    flashcards: 'फ्लैशकार्ड',
    practiceExam: 'अभ्यास परीक्षा',
    studyPlan: 'अध्ययन योजना',
    progress: 'प्रगति',
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्स',
    // Common
    loading: 'लोड हो रहा है...',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    continue: 'जारी रखें',
    back: 'वापस',
    next: 'अगला',
    complete: 'पूर्ण',
    start: 'शुरू करें',
    // Study Plan
    adaptiveStudyPlan: 'अनुकूली अध्ययन योजना',
    viewPlan: 'योजना देखें',
    // Voice greetings
    welcomeMessage: 'प्रेपज़र में आपका स्वागत है',
    congratulations: 'बधाई हो',
    signupComplete: 'साइनअप सफलतापूर्वक पूरा हुआ',
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
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
