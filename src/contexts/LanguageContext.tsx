
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.studyPlan': 'Study Plan',
    'dashboard.todaysPlan': "Today's Plan",
    'dashboard.concepts': 'Concepts',
    'dashboard.flashcards': 'Flashcards',
    'dashboard.practiceExam': 'Practice Exam',
    'dashboard.academic': 'Academic Advisor',
    'dashboard.tutor': 'AI Tutor',
    'dashboard.profile': 'Profile',
    
    // Study Plan
    'studyPlan.title': 'Study Plan',
    'studyPlan.adaptiveTitle': 'Dynamic & Adaptive Study Plan',
    'studyPlan.neetStrategy': 'NEET 2026 Strategy',
    'studyPlan.viewPlan': 'View Plan',
    'studyPlan.physics': 'Physics',
    'studyPlan.chemistry': 'Chemistry',
    'studyPlan.biology': 'Biology',
    'studyPlan.examDate': 'Exam Date',
    'studyPlan.daysLeft': 'Days Left',
    'studyPlan.weeklyHours': 'Weekly Hours',
    'studyPlan.progress': 'Progress',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.loading': 'Loading...',
    'common.language': 'Language',
    'common.english': 'English',
    'common.hindi': 'हिंदी',
    
    // Home Page
    'home.title': 'PREPZR - Your AI Learning Companion',
    'home.subtitle': 'Personalized NEET preparation with AI-powered study plans',
    'home.getStarted': 'Get Started',
    'home.learnMore': 'Learn More',
    'home.features': 'Features',
    'home.aboutUs': 'About Us',
    'home.contact': 'Contact'
  },
  hi: {
    // Dashboard
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'dashboard.studyPlan': 'अध्ययन योजना',
    'dashboard.todaysPlan': 'आज की योजना',
    'dashboard.concepts': 'अवधारणाएं',
    'dashboard.flashcards': 'फ्लैशकार्ड',
    'dashboard.practiceExam': 'अभ्यास परीक्षा',
    'dashboard.academic': 'शैक्षणिक सलाहकार',
    'dashboard.tutor': 'AI शिक्षक',
    'dashboard.profile': 'प्रोफ़ाइल',
    
    // Study Plan
    'studyPlan.title': 'अध्ययन योजना',
    'studyPlan.adaptiveTitle': 'गतिशील और अनुकूली अध्ययन योजना',
    'studyPlan.neetStrategy': 'NEET 2026 रणनीति',
    'studyPlan.viewPlan': 'योजना देखें',
    'studyPlan.physics': 'भौतिकी',
    'studyPlan.chemistry': 'रसायन',
    'studyPlan.biology': 'जीव विज्ञान',
    'studyPlan.examDate': 'परीक्षा तिथि',
    'studyPlan.daysLeft': 'दिन शेष',
    'studyPlan.weeklyHours': 'साप्ताहिक घंटे',
    'studyPlan.progress': 'प्रगति',
    
    // Common
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.loading': 'लोड हो रहा है...',
    'common.language': 'भाषा',
    'common.english': 'English',
    'common.hindi': 'हिंदी',
    
    // Home Page
    'home.title': 'PREPZR - आपका AI शिक्षा साथी',
    'home.subtitle': 'AI-संचालित अध्ययन योजनाओं के साथ व्यक्तिगत NEET तैयारी',
    'home.getStarted': 'शुरू करें',
    'home.learnMore': 'और जानें',
    'home.features': 'सुविधाएं',
    'home.aboutUs': 'हमारे बारे में',
    'home.contact': 'संपर्क'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'hi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
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
