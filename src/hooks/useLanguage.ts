
import { useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.todaysPlan': "Today's Plan",
    'nav.concepts': 'Concept Cards',
    'nav.flashcards': 'Flashcards',
    'nav.practiceExam': 'Practice Exam',
    'nav.academicAdvisor': 'Academic Advisor',
    'nav.feelGoodCorner': 'Feel Good Corner',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.examReadiness': 'Exam Readiness',
    'dashboard.studyStreak': 'Study Streak',
    'dashboard.conceptsLearned': 'Concepts Learned',
    'dashboard.practiceScore': 'Practice Score',
    
    // Today's Plan
    'todaysPlan.title': "Today's Study Plan",
    'todaysPlan.subtitle': 'Your personalized daily study schedule',
    'todaysPlan.dailyProgress': 'Daily Progress',
    'todaysPlan.smartSuggestions': 'Smart Suggestions',
    'todaysPlan.taskBreakdown': 'Task Breakdown',
    
    // Voice Assistant
    'voice.greeting.new': 'Welcome to PREPZR! I am Sakha AI, your intelligent study companion.',
    'voice.greeting.returning': 'Welcome back! Ready to continue your learning journey today?',
    'voice.smartSuggestion': 'Based on your progress, I suggest focusing on',
    'voice.taskComplete': 'Great job completing that task!',
    
    // Smart Suggestions
    'suggestions.focusWeakAreas': 'Focus on weak areas',
    'suggestions.reviewConcepts': 'Review key concepts',
    'suggestions.practiceTests': 'Take practice tests',
    'suggestions.breakTime': 'Take a study break',
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.todaysPlan': 'आज की योजना',
    'nav.concepts': 'अवधारणा कार्ड',
    'nav.flashcards': 'फ्लैशकार्ड',
    'nav.practiceExam': 'अभ्यास परीक्षा',
    'nav.academicAdvisor': 'शैक्षणिक सलाहकार',
    'nav.feelGoodCorner': 'फील गुड कॉर्नर',
    
    // Dashboard
    'dashboard.welcome': 'वापस स्वागत है',
    'dashboard.examReadiness': 'परीक्षा तैयारी',
    'dashboard.studyStreak': 'अध्ययन श्रृंखला',
    'dashboard.conceptsLearned': 'सीखी गई अवधारणाएं',
    'dashboard.practiceScore': 'अभ्यास स्कोर',
    
    // Today's Plan
    'todaysPlan.title': 'आज की अध्ययन योजना',
    'todaysPlan.subtitle': 'आपका व्यक्तिगत दैनिक अध्ययन कार्यक्रम',
    'todaysPlan.dailyProgress': 'दैनिक प्रगति',
    'todaysPlan.smartSuggestions': 'स्मार्ट सुझाव',
    'todaysPlan.taskBreakdown': 'कार्य विभाजन',
    
    // Voice Assistant
    'voice.greeting.new': 'PREPZR में आपका स्वागत है! मैं सखा AI हूं, आपका बुद्धिमान अध्ययन साथी।',
    'voice.greeting.returning': 'वापस स्वागत है! आज अपनी सीखने की यात्रा जारी रखने के लिए तैयार हैं?',
    'voice.smartSuggestion': 'आपकी प्रगति के आधार पर, मैं सुझाता हूं कि ध्यान दें',
    'voice.taskComplete': 'उस कार्य को पूरा करने के लिए बधाई!',
    
    // Smart Suggestions
    'suggestions.focusWeakAreas': 'कमजोर क्षेत्रों पर ध्यान दें',
    'suggestions.reviewConcepts': 'मुख्य अवधारणाओं की समीक्षा करें',
    'suggestions.practiceTests': 'अभ्यास परीक्षाएं लें',
    'suggestions.breakTime': 'अध्ययन विराम लें',
  }
};

export const useLanguage = () => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('userLanguage', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return {
    language,
    setLanguage,
    t
  };
};
