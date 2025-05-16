
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import FloatingVoiceAssistant from './FloatingVoiceAssistant';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  currentPage?: string;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName,
  currentMood,
  onMoodChange,
  currentPage
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [lastVisitedPage, setLastVisitedPage] = useState<string | null>(null);
  
  const { 
    speakMessage, 
    isVoiceSupported,
    voiceSettings,
    toggleMute
  } = useVoiceAnnouncer({
    userName,
    mood: currentMood,
    isFirstTimeUser: isFirstLoad,
    initialSettings: { language: 'en-IN' } // Default to Indian English
  });

  // Track page changes to provide contextual help
  useEffect(() => {
    if (currentPage && currentPage !== lastVisitedPage && voiceSettings.enabled && !voiceSettings.muted) {
      setLastVisitedPage(currentPage);
      
      // Wait a bit before speaking to not interrupt other audio
      const timer = setTimeout(() => {
        // Page-specific welcome messages
        const pageMessages: Record<string, string> = {
          'dashboard': `Here's your dashboard overview showing your study progress and today's plan.`,
          'concepts': `Welcome to the concepts section. Here you can explore detailed concept cards for your subjects.`,
          'flashcards': `In the flashcards area, you can practice with spaced repetition to strengthen your memory.`,
          'practice-exam': `You can take practice exams here to assess your preparation level.`,
          'analytics': `Your performance analytics show your progress and areas that need attention.`,
          'feel-good-corner': `The Feel Good Corner is designed to help you manage stress and stay motivated.`,
          'academic': `Your academic advisor provides personalized guidance based on your progress.`,
          'todays-plan': `Here's your study plan for today, optimized for maximum learning.`
        };
        
        // Speak appropriate message based on page
        if (pageMessages[currentPage]) {
          speakMessage(pageMessages[currentPage]);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentPage, lastVisitedPage, voiceSettings.enabled, voiceSettings.muted, speakMessage]);

  useEffect(() => {
    // Check if this is the first time loading the page in this session
    const hasSeenVoiceGreeting = sessionStorage.getItem('hasSeenVoiceGreeting');
    if (!hasSeenVoiceGreeting && isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted) {
      // Delay the welcome message to make sure the page is loaded
      const timer = setTimeout(() => {
        const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
        const greeting = isFirstTimeUser 
          ? `Namaste ${userName || 'there'}! I'm your PREPZR voice assistant. I can help you navigate the platform and provide study suggestions for your NEET or JEE preparation. Click the microphone icon whenever you need my assistance.`
          : `Welcome back, ${userName || 'there'}! I'm here to help with your studies today. I can provide subject-specific guidance for Physics, Chemistry, Biology and other subjects. Click the microphone if you need assistance.`;
        
        speakMessage(greeting);
        sessionStorage.setItem('hasSeenVoiceGreeting', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    setIsFirstLoad(false);
  }, [isVoiceSupported, userName, speakMessage, voiceSettings.enabled, voiceSettings.muted]);

  const handleMoodCommand = (moodString: string) => {
    let newMood: MoodType | undefined;
    
    // Convert string to MoodType enum
    switch (moodString.toUpperCase()) {
      case 'HAPPY': newMood = MoodType.HAPPY; break;
      case 'MOTIVATED': newMood = MoodType.MOTIVATED; break;
      case 'FOCUSED': newMood = MoodType.FOCUSED; break;
      case 'TIRED': newMood = MoodType.TIRED; break;
      case 'STRESSED': newMood = MoodType.STRESSED; break;
      case 'ANXIOUS': newMood = MoodType.ANXIOUS; break;
      case 'OVERWHELMED': newMood = MoodType.OVERWHELMED; break;
      case 'CONFUSED': newMood = MoodType.CONFUSED; break;
      case 'CURIOUS': newMood = MoodType.CURIOUS; break;
      case 'CALM': newMood = MoodType.CALM; break;
      case 'NEUTRAL': newMood = MoodType.NEUTRAL; break;
      default: return; // Invalid mood
    }
    
    if (newMood && onMoodChange) {
      onMoodChange(newMood);
      toast({
        title: "Mood Updated",
        description: `Your mood has been updated to ${moodString}`,
      });
      
      // Provide mood-specific advice
      const moodResponses: Record<MoodType, string> = {
        [MoodType.HAPPY]: "That's great! Your positive mood is perfect for tackling challenging topics.",
        [MoodType.MOTIVATED]: "Excellent! Let's maximize your motivation with some focused study sessions.",
        [MoodType.FOCUSED]: "Perfect! I'll help you maintain your focus with minimal interruptions.",
        [MoodType.TIRED]: "I understand. Let's focus on lighter topics and take breaks when needed.",
        [MoodType.STRESSED]: "Let's manage that stress. Short study sessions with breaks might help today.",
        [MoodType.ANXIOUS]: "It's normal to feel anxious. Let's start with reviewing familiar topics to build confidence.",
        [MoodType.OVERWHELMED]: "I'll help you break things down into manageable parts to reduce that overwhelmed feeling.",
        [MoodType.CONFUSED]: "Let's clarify those confusing topics one by one. We'll start with the fundamentals.",
        [MoodType.CURIOUS]: "Great! Your curiosity will help you explore new concepts more effectively.",
        [MoodType.CALM]: "Your calm state is perfect for deep learning and difficult topics.",
        [MoodType.NEUTRAL]: "I'll help you find engaging content to make your study session productive."
      };
      
      speakMessage(moodResponses[newMood] || "I've recorded your mood change.");
    }
  };

  const handleNavigationCommand = (route: string) => {
    if (route) {
      speakMessage(`Taking you to ${route.replace('/', '')}`);
      navigate(route);
      toast({
        title: "Navigating",
        description: `Taking you to ${route}`,
      });
    }
  };
  
  const handleSubjectCommand = (subject: string) => {
    // Respond with subject-specific guidance
    const subjectInfo: Record<string, string> = {
      'physics': "For Physics preparation, focus on understanding concepts and practicing numerical problems. Make sure to master topics like mechanics, thermodynamics, and optics which carry significant weightage in NEET and JEE.",
      'chemistry': "In Chemistry, balance your time between Physical, Organic and Inorganic sections. Use flashcards for reactions and periodic table properties.",
      'biology': "For Biology, focus on understanding diagrams, processes and terminology. Create mind maps for complex topics and practice previous years' questions.",
      'botany': "In Botany, pay special attention to plant physiology, reproduction and genetics. Regular revision of diagrams is essential.",
      'zoology': "For Zoology preparation, human physiology and evolution carry significant weightage. Create comparative charts for different biological systems."
    };
    
    if (subjectInfo[subject.toLowerCase()]) {
      speakMessage(subjectInfo[subject.toLowerCase()]);
      toast({
        title: `${subject.toUpperCase()} Study Tips`,
        description: "I've provided some study guidance for this subject",
      });
    }
  };

  return (
    <FloatingVoiceAssistant
      userName={userName}
      currentMood={currentMood ? currentMood.toString() : undefined}
      onMoodCommand={handleMoodCommand}
      onNavigationCommand={handleNavigationCommand}
      onSubjectCommand={handleSubjectCommand}
      pronouncePrepzr={true}
      currentPage={currentPage}
    />
  );
};

export default DashboardVoiceAssistant;
