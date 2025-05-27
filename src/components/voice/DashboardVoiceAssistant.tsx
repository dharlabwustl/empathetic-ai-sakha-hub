
import React, { useEffect } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useNavigate } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface DashboardVoiceAssistantProps {
  userName?: string;
  language?: string;
  userMood?: MoodType;
  userProgress?: {
    overallProgress: number;
    physicsProgress: number;
    chemistryProgress: number;
    biologyProgress: number;
    examReadinessScore: number;
  };
  studyStreak?: number;
  lastActivity?: string;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  userMood,
  userProgress = {
    overallProgress: 68,
    physicsProgress: 56,
    chemistryProgress: 69,
    biologyProgress: 72,
    examReadinessScore: 78
  },
  studyStreak = 5,
  lastActivity = 'completed Physics concepts'
}) => {
  const navigate = useNavigate();

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('PREPZR AI processing dashboard command:', lowerCommand);

    // Dashboard navigation commands with detailed context
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      navigate('/dashboard/student');
      speakMessage(`Welcome back to your personalized dashboard, ${userName}. Your current overall progress is ${userProgress.overallProgress}% and you're maintaining a ${studyStreak}-day study streak!`);
      return;
    }

    if (lowerCommand.includes('concepts') || lowerCommand.includes('learn concepts')) {
      navigate('/dashboard/student/concepts');
      const weakestSubject = userProgress.physicsProgress < userProgress.chemistryProgress && userProgress.physicsProgress < userProgress.biologyProgress ? 'Physics' : 
                            userProgress.chemistryProgress < userProgress.biologyProgress ? 'Chemistry' : 'Biology';
      speakMessage(`Opening your concepts section, ${userName}. Based on your progress, I recommend focusing on ${weakestSubject} concepts today. You're currently at ${userProgress.physicsProgress}% in Physics, ${userProgress.chemistryProgress}% in Chemistry, and ${userProgress.biologyProgress}% in Biology.`);
      return;
    }

    if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card') || lowerCommand.includes('cards') || lowerCommand.includes('revision')) {
      navigate('/dashboard/student/flashcards');
      speakMessage(`Perfect choice for quick revision, ${userName}! Your flashcard sessions have been improving your retention rates. I'll open your personalized flashcard decks that adapt to your learning pace and focus on areas where you need more practice.`);
      return;
    }

    if (lowerCommand.includes('practice exam') || lowerCommand.includes('test') || lowerCommand.includes('exam') || lowerCommand.includes('mock test')) {
      navigate('/dashboard/student/practice-exam');
      speakMessage(`Excellent! Time to test your knowledge with our AI-powered practice exams, ${userName}. Based on your exam readiness score of ${userProgress.examReadinessScore}%, I'll recommend exams that match your current preparation level and help identify areas for improvement.`);
      return;
    }

    if (lowerCommand.includes('formula lab') || lowerCommand.includes('formulas') || lowerCommand.includes('equations')) {
      navigate('/dashboard/student/formula-lab');
      speakMessage(`Opening the interactive Formula Lab, ${userName}! This is where you can practice and master all the essential formulas for Physics, Chemistry, and Biology. The lab adapts to show you formulas based on your current study topics.`);
      return;
    }

    if (lowerCommand.includes('profile') || lowerCommand.includes('settings') || lowerCommand.includes('account')) {
      navigate('/dashboard/student/profile');
      speakMessage(`Opening your profile settings, ${userName}. Here you can customize your learning preferences, update your study goals, and manage your subscription plan.`);
      return;
    }

    if (lowerCommand.includes('analytics') || lowerCommand.includes('performance') || lowerCommand.includes('statistics')) {
      navigate('/dashboard/student/analytics');
      speakMessage(`Let me show you your detailed performance analytics, ${userName}. You can track your progress trends, identify improvement areas, and see how you're performing compared to your study goals.`);
      return;
    }

    // Study guidance commands with personalization
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule') || lowerCommand.includes('today plan')) {
      const moodBasedGuidance = userMood === MoodType.ANXIOUS 
        ? `I notice you might be feeling anxious today, ${userName}. Let's start with easier topics to build confidence.`
        : userMood === MoodType.TIRED 
        ? `You seem tired today, ${userName}. I'll suggest shorter study sessions with more breaks.`
        : userMood === MoodType.MOTIVATED 
        ? `I can sense your motivation today, ${userName}! Perfect time to tackle challenging concepts.`
        : '';
      
      speakMessage(`${moodBasedGuidance} Based on your ${userProgress.overallProgress}% overall progress and recent ${lastActivity}, I recommend focusing on strengthening your weaker areas while maintaining momentum in your strong subjects. Would you like me to show your personalized study plan?`);
      return;
    }

    if (lowerCommand.includes('how am i doing') || lowerCommand.includes('progress') || lowerCommand.includes('performance report')) {
      speakMessage(`Great question, ${userName}! Your performance is impressive. You're at ${userProgress.overallProgress}% overall progress with a ${studyStreak}-day study streak. Your strongest subject is ${userProgress.biologyProgress > userProgress.chemistryProgress && userProgress.biologyProgress > userProgress.physicsProgress ? 'Biology' : userProgress.chemistryProgress > userProgress.physicsProgress ? 'Chemistry' : 'Physics'} at ${Math.max(userProgress.physicsProgress, userProgress.chemistryProgress, userProgress.biologyProgress)}%. Your exam readiness score of ${userProgress.examReadinessScore}% shows you're well-prepared. Keep up this excellent momentum!`);
      return;
    }

    if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage me') || lowerCommand.includes('inspire me')) {
      const personalizedMotivation = userMood === MoodType.ANXIOUS 
        ? `${userName}, I understand exam preparation can feel overwhelming, but you're making remarkable progress. Your ${userProgress.examReadinessScore}% readiness score proves you're on the right track. Take it one concept at a time, and remember - every NEET topper felt anxious at some point. Your dedication will pay off!`
        : userMood === MoodType.TIRED
        ? `${userName}, even on tired days, you're showing up for your dreams. That's what separates achievers from dreamers. Your ${studyStreak}-day streak shows incredible consistency. Rest when needed, but remember - you're closer to your NEET goal than ever before!`
        : `${userName}, your dedication is inspiring! With ${userProgress.overallProgress}% progress and ${studyStreak} consecutive study days, you're building the foundation for NEET success. Your consistency and hard work will transform your medical career dreams into reality. Keep pushing forward!`;
      
      speakMessage(personalizedMotivation);
      return;
    }

    if (lowerCommand.includes('what should i study') || lowerCommand.includes('recommend') || lowerCommand.includes('suggest topics')) {
      const recommendation = userProgress.physicsProgress < 60 
        ? 'Physics concepts, especially Mechanics and Thermodynamics'
        : userProgress.chemistryProgress < 70 
        ? 'Chemistry topics, particularly Organic Chemistry reactions'
        : 'Biology concepts to strengthen your already good foundation';
      
      speakMessage(`Based on your current progress analysis, ${userName}, I recommend focusing on ${recommendation}. This will give you the maximum improvement in your overall score. Would you like me to open the specific study materials for this subject?`);
      return;
    }

    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do') || lowerCommand.includes('commands')) {
      speakMessage(`Hi ${userName}! I'm PREPZR AI, your personalized study companion. I can help you navigate to concepts, flashcards, practice exams, and formula lab. I can analyze your progress currently at ${userProgress.overallProgress}%, provide study recommendations, motivate you based on your mood, suggest break times, and answer questions about your NEET preparation strategy. I know all your dashboard sections and can guide you smoothly. What would you like to explore?`);
      return;
    }

    // Subject-specific navigation with progress context
    if (lowerCommand.includes('physics')) {
      navigate('/dashboard/student/concepts?subject=physics');
      speakMessage(`Opening Physics concepts, ${userName}. You're currently at ${userProgress.physicsProgress}% progress in Physics. I recommend focusing on areas like Mechanics, Electrodynamics, and Modern Physics to boost your score.`);
      return;
    }

    if (lowerCommand.includes('chemistry')) {
      navigate('/dashboard/student/concepts?subject=chemistry');
      speakMessage(`Opening Chemistry concepts, ${userName}. Your Chemistry progress is ${userProgress.chemistryProgress}%. Let's explore Organic, Inorganic, and Physical Chemistry concepts that are frequently tested in NEET.`);
      return;
    }

    if (lowerCommand.includes('biology')) {
      navigate('/dashboard/student/concepts?subject=biology');
      speakMessage(`Opening Biology concepts, ${userName}. You're doing well with ${userProgress.biologyProgress}% progress in Biology. Let's dive into Human Physiology, Plant Biology, and Genetics - the high-weightage topics in NEET.`);
      return;
    }

    // Default response with personalization
    speakMessage(`I heard you say: "${command}", ${userName}. I'm PREPZR AI, your intelligent study companion specialized for NEET preparation. With your current ${userProgress.overallProgress}% progress and ${studyStreak}-day study streak, you're on an excellent path. I can help you navigate sections, check detailed progress, provide personalized study guidance, or answer specific questions about your preparation. How can I assist you today?`);
  };

  const {
    speakMessage,
    isVoiceSupported,
    voiceInitialized
  } = useVoiceAnnouncer({
    userName,
    autoStart: false,
    onCommand: handleVoiceCommand
  });

  // Personalized greeting when component mounts - only once per session
  useEffect(() => {
    if (isVoiceSupported && voiceInitialized) {
      const sessionKey = 'prepzr_dashboard_voice_greeted';
      const hasGreeted = sessionStorage.getItem(sessionKey);
      
      if (!hasGreeted) {
        setTimeout(() => {
          const moodContext = userMood === MoodType.ANXIOUS 
            ? "I sense you might be feeling a bit anxious today. That's perfectly normal for dedicated NEET aspirants. Let's take this step by step and build your confidence." 
            : userMood === MoodType.MOTIVATED 
            ? "I can feel your motivation today - that's the energy that transforms dreams into reality!" 
            : userMood === MoodType.TIRED
            ? "Even on tired days, you're showing up for your dreams. That consistency is what separates achievers from dreamers."
            : "Your dedication to NEET preparation is commendable.";
          
          const progressContext = userProgress.overallProgress >= 70 
            ? `With ${userProgress.overallProgress}% overall progress, you're in the top tier of NEET preparation.`
            : userProgress.overallProgress >= 50 
            ? `Your ${userProgress.overallProgress}% progress shows steady advancement toward your NEET goals.`
            : `At ${userProgress.overallProgress}% progress, you're building a strong foundation for NEET success.`;
          
          const greeting = `Welcome back, ${userName}! I'm PREPZR AI, your personalized study companion. ${moodContext} ${progressContext} Your ${studyStreak}-day study streak demonstrates remarkable consistency. I'm here to guide you through concepts, flashcards, practice exams, formula lab, and provide intelligent study recommendations. How can I support your NEET preparation journey today?`;
          
          speakMessage(greeting);
          sessionStorage.setItem(sessionKey, 'true');
        }, 2000);
      }
    }
  }, [isVoiceSupported, voiceInitialized, userName, userMood, userProgress, studyStreak, speakMessage]);

  return null; // This is a background service component
};

export default DashboardVoiceAssistant;
