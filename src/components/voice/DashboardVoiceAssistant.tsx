
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface DashboardVoiceAssistantProps {
  userName?: string;
  language?: string;
  userMood?: MoodType;
  isReturningUser?: boolean;
  lastActivity?: string;
  examReadinessScore?: number;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  userMood,
  isReturningUser = false,
  lastActivity,
  examReadinessScore = 0
}) => {
  const navigate = useNavigate();

  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
      speech.lang = language;
      speech.rate = 0.9;
      speech.pitch = 1.0;
      speech.volume = 0.8;

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.toLowerCase().includes('female') || !voice.name.toLowerCase().includes('male'))
      );
      
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }

      window.speechSynthesis.speak(speech);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Dashboard AI processing command:', lowerCommand);

    // Navigation commands
    if (lowerCommand.includes('study plan') || lowerCommand.includes('academic advisor')) {
      navigate('/dashboard/student');
      speakMessage(`${userName}, here's your personalized study plan crafted specifically for your exam goals and learning style.`);
      return;
    }

    if (lowerCommand.includes('today') || lowerCommand.includes('daily plan') || lowerCommand.includes('tasks')) {
      navigate('/dashboard/student/todays-plan');
      speakMessage(`Let's review your daily learning agenda, ${userName}. Your tasks are optimized based on your progress and exam timeline.`);
      return;
    }

    if (lowerCommand.includes('concept') || lowerCommand.includes('study material')) {
      navigate('/dashboard/student/concepts');
      speakMessage('Your concept library contains comprehensive materials organized by subjects and difficulty. Perfect for deep learning and understanding.');
      return;
    }

    if (lowerCommand.includes('flashcard') || lowerCommand.includes('quick review')) {
      navigate('/dashboard/student/flashcards');
      speakMessage('Flashcard sessions boost memory retention significantly. Your personalized deck focuses on high-yield content for maximum impact.');
      return;
    }

    if (lowerCommand.includes('practice') || lowerCommand.includes('exam') || lowerCommand.includes('test')) {
      navigate('/dashboard/student/practice-exam');
      speakMessage('Practice testing is proven to enhance performance. Your mock exams simulate real exam conditions for better preparation.');
      return;
    }

    if (lowerCommand.includes('formula') || lowerCommand.includes('lab')) {
      speakMessage('Formula lab provides interactive practice with equations and calculations across Physics, Chemistry, and Mathematics for hands-on learning.');
      return;
    }

    // Performance and motivation
    if (lowerCommand.includes('readiness') || lowerCommand.includes('performance') || lowerCommand.includes('score')) {
      const encouragement = examReadinessScore > 70 
        ? `Outstanding work, ${userName}! Your ${examReadinessScore}% readiness score shows excellent preparation momentum.`
        : examReadinessScore > 50
        ? `Good progress, ${userName}! Your ${examReadinessScore}% readiness indicates solid foundation - let's push for even better results.`
        : `${userName}, your preparation journey is building momentum. Focus on consistent daily practice to boost your readiness score.`;
      
      speakMessage(encouragement);
      return;
    }

    if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage')) {
      const motivationalMsg = isReturningUser
        ? `${userName}, your commitment to daily learning is impressive! Each session strengthens your knowledge and builds exam confidence. Excellence is a habit you're developing beautifully.`
        : `${userName}, starting your PREP-zer journey shows great determination! With our personalized approach and your dedication, success is absolutely within reach.`;
      
      speakMessage(motivationalMsg);
      return;
    }

    // Pending tasks and backlogs
    if (lowerCommand.includes('pending') || lowerCommand.includes('backlog') || lowerCommand.includes('incomplete')) {
      speakMessage(`${userName}, staying current with your study schedule maximizes learning efficiency. I can help prioritize your pending tasks for optimal progress.`);
      return;
    }

    // Mood-based responses
    if (lowerCommand.includes('feeling') || lowerCommand.includes('mood')) {
      if (userMood === MoodType.STRESSED) {
        speakMessage(`${userName}, I understand exam preparation can feel overwhelming. Take deep breaths, break tasks into smaller chunks, and remember - consistent small steps lead to big victories.`);
      } else if (userMood === MoodType.MOTIVATED) {
        speakMessage(`${userName}, your motivation is powerful fuel for success! Channel this energy into focused study sessions and watch your readiness score soar.`);
      } else {
        speakMessage(`${userName}, maintaining emotional balance during preparation is crucial. I'm here to support your learning journey every step of the way.`);
      }
      return;
    }

    // Study guidance and tips
    if (lowerCommand.includes('study tips') || lowerCommand.includes('guidance')) {
      speakMessage(`${userName}, effective study combines active recall, spaced repetition, and practice testing. Your PREP-zer dashboard provides all these evidence-based learning techniques.`);
      return;
    }

    // Help and navigation
    if (lowerCommand.includes('help') || lowerCommand.includes('guide')) {
      speakMessage(`${userName}, I'm your intelligent study companion! I can guide you through study plans, daily tasks, concept learning, flashcard reviews, practice exams, formula practice, and performance analytics. What specific area interests you?`);
      return;
    }

    // Default response for unrecognized commands
    speakMessage(`${userName}, I'm here to enhance your learning experience! You can ask about study plans, today's tasks, concept reviews, practice tests, performance tracking, or study guidance. How can I support your preparation today?`);
  };

  // Initial greeting for returning users
  useEffect(() => {
    const hasGreeted = sessionStorage.getItem('dashboard_voice_greeted');
    if (!hasGreeted && isReturningUser) {
      setTimeout(() => {
        const performanceMsg = examReadinessScore > 60 
          ? `Your ${examReadinessScore}% exam readiness shows excellent progress! `
          : '';
        
        const greeting = `Welcome back, ${userName}! ${performanceMsg}I'm ready to guide your study session. ${lastActivity ? `Last time you were ${lastActivity}. ` : ''}Let's continue building your success story - what would you like to focus on today?`;
        speakMessage(greeting);
        sessionStorage.setItem('dashboard_voice_greeted', 'true');
      }, 3000);
    }
  }, [userName, isReturningUser, lastActivity, examReadinessScore]);

  return null; // Background service component
};

export default DashboardVoiceAssistant;
