
import React, { createContext, useContext } from 'react';
import { useVoiceAnnouncer } from './useVoiceAnnouncer';

// Re-export all utilities from their respective files
export { 
  getVoiceSettings, 
  saveVoiceSettings, 
  speakMessage, 
  getGreeting,
  type VoiceSettings, 
  defaultVoiceSettings 
} from './voiceUtils';

// Voice announcer context
const VoiceAnnouncerContext = createContext<ReturnType<typeof useVoiceAnnouncer> | undefined>(undefined);

export const VoiceAnnouncerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const voiceAnnouncer = useVoiceAnnouncer();
  
  return (
    <VoiceAnnouncerContext.Provider value={voiceAnnouncer}>
      {children}
    </VoiceAnnouncerContext.Provider>
  );
};

export const useVoiceAnnouncerContext = () => {
  const context = useContext(VoiceAnnouncerContext);
  if (!context) {
    throw new Error('useVoiceAnnouncerContext must be used within a VoiceAnnouncerProvider');
  }
  return context;
};

// Helper functions for task announcement - shorter and more focused
export const getTaskAnnouncement = (count: number) => {
  if (count === 0) return "No tasks scheduled for today.";
  return `${count} task${count === 1 ? '' : 's'} scheduled today.`;
};

export const getReminderAnnouncement = (subject: string, time: string) => {
  return `Reminder: ${subject} session at ${time}.`;
};

// Study recommendation functions - focused on exam goals
export const getExamFocusedRecommendation = (examName: string): string => {
  const recommendations = [
    `For ${examName}, reviewing flashcards now could increase your recall by 30%.`,
    `Taking a practice exam is the best way to prepare for ${examName}.`,
    `Your ${examName} preparation needs more focus on concept mastery.`,
    `Based on your progress, I recommend focusing on weak areas for ${examName}.`
  ];
  return recommendations[Math.floor(Math.random() * recommendations.length)];
};

// Study strategy recommendations based on context
export const getStudyStrategyTip = (): string => {
  const tips = [
    "Active recall is more effective than re-reading. Try flashcards for better retention.",
    "Consider taking a practice exam to identify knowledge gaps.",
    "Review challenging concepts before tackling new material.",
    "Split difficult topics into 25-minute focused sessions with short breaks."
  ];
  return tips[Math.floor(Math.random() * tips.length)];
};

// Export additional helper functions
export { 
  getIdleTimeResponse, 
  getFirstTimeUserGuidance, 
  getDailyProgressUpdate,
  getSubjectProgressUpdate 
} from './messageGenerators';
