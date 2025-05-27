
import React, { useEffect } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useNavigate } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface DashboardVoiceAssistantProps {
  userName?: string;
  language?: string;
  userMood?: MoodType;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  userMood
}) => {
  const navigate = useNavigate();

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('PREPZR AI processing dashboard command:', lowerCommand);

    // Dashboard navigation commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      navigate('/dashboard/student');
      speakMessage('Navigating to your dashboard');
      return;
    }

    if (lowerCommand.includes('concepts') || lowerCommand.includes('learn concepts')) {
      navigate('/dashboard/student/concepts');
      speakMessage('Opening concepts section. Here you can study all your NEET topics in detail.');
      return;
    }

    if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card') || lowerCommand.includes('cards')) {
      navigate('/dashboard/student/flashcards');
      speakMessage('Opening flashcards section. Perfect for quick revision and memory reinforcement.');
      return;
    }

    if (lowerCommand.includes('practice exam') || lowerCommand.includes('test') || lowerCommand.includes('exam')) {
      navigate('/dashboard/student/practice-exam');
      speakMessage('Opening practice exams. Time to test your knowledge with NEET mock tests!');
      return;
    }

    if (lowerCommand.includes('profile') || lowerCommand.includes('settings')) {
      navigate('/dashboard/student/profile');
      speakMessage('Opening your profile settings');
      return;
    }

    // Study assistance commands
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
      speakMessage(`Based on your current progress and ${userMood ? 'mood' : 'study pattern'}, I recommend focusing on your weaker subjects today. Would you like me to show your personalized study plan?`);
      return;
    }

    if (lowerCommand.includes('how am i doing') || lowerCommand.includes('progress') || lowerCommand.includes('performance')) {
      speakMessage(`Great question, ${userName}! Based on your recent activity, you're making excellent progress. You've completed 68% of your Physics concepts and your practice exam scores are steadily improving. Your dedication is paying off - keep up the fantastic work!`);
      return;
    }

    if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage me')) {
      const motivationalMessage = userMood === MoodType.ANXIOUS 
        ? `${userName}, I understand you might be feeling anxious, but remember - you're already on the right path. Every concept you learn, every question you practice brings you closer to your NEET goal. Take it one step at a time, and believe in yourself!`
        : `${userName}, you're doing amazing! Your commitment to preparation shows real dedication. Remember, every NEET topper started exactly where you are now. Stay focused, stay consistent, and success will follow!`;
      speakMessage(motivationalMessage);
      return;
    }

    if (lowerCommand.includes('break') || lowerCommand.includes('rest')) {
      speakMessage(`Smart thinking, ${userName}! Taking breaks is crucial for effective learning. Research shows that 15-20 minute breaks every hour help improve retention. How about a quick walk or some deep breathing exercises?`);
      return;
    }

    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakMessage(`Hi ${userName}! I'm PREPZR AI, your intelligent study companion. I can help you navigate to different sections like concepts, flashcards, and practice exams. I can also check your progress, provide study motivation, suggest breaks, and answer questions about your NEET preparation. What would you like to do?`);
      return;
    }

    // Subject-specific commands
    if (lowerCommand.includes('physics')) {
      navigate('/dashboard/student/concepts?subject=physics');
      speakMessage('Opening Physics concepts. Let\'s dive into the fundamental laws of nature!');
      return;
    }

    if (lowerCommand.includes('chemistry')) {
      navigate('/dashboard/student/concepts?subject=chemistry');
      speakMessage('Opening Chemistry concepts. Time to explore the molecular world!');
      return;
    }

    if (lowerCommand.includes('biology')) {
      navigate('/dashboard/student/concepts?subject=biology');
      speakMessage('Opening Biology concepts. Let\'s understand the science of life!');
      return;
    }

    // Default response
    speakMessage(`I heard you say: "${command}". I'm PREPZR AI, here to help with your NEET preparation. You can ask me to navigate to different sections, check your progress, or get study guidance. How can I assist you today?`);
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

  // Initial greeting when component mounts (only once per session)
  useEffect(() => {
    if (isVoiceSupported && voiceInitialized) {
      const hasGreeted = sessionStorage.getItem('prepzr_voice_greeted');
      if (!hasGreeted) {
        setTimeout(() => {
          const moodMessage = userMood === MoodType.ANXIOUS 
            ? "I notice you might be feeling a bit anxious today. That's completely normal! Let's take this step by step." 
            : userMood === MoodType.MOTIVATED 
            ? "I can sense your motivation today - that's the spirit we love to see!" 
            : "";
          
          // Fix pronunciation of PREPZR by breaking it down phonetically
          const greeting = `Welcome back, ${userName}! I'm your PREP ZR AI assistant, ready to support your NEET preparation journey. ${moodMessage} How can I help you study effectively today?`;
          speakMessage(greeting);
          sessionStorage.setItem('prepzr_voice_greeted', 'true');
        }, 2000);
      }
    }
  }, [isVoiceSupported, voiceInitialized, userName, userMood, speakMessage]);

  return null; // This is a background service component
};

export default DashboardVoiceAssistant;
