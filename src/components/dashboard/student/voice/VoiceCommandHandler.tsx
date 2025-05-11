
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { parseVoiceCommand, getMoodFromText, getStudyProgressInfo, getNextTaskInfo } from './voiceUtils';
import { MoodType } from '@/types/user/base';

interface VoiceCommandHandlerProps {
  onMoodChange?: (mood: MoodType) => void;
  currentMood?: MoodType;
}

const VoiceCommandHandler: React.FC<VoiceCommandHandlerProps> = ({ 
  onMoodChange,
  currentMood
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    transcript, 
    isListening, 
    startListening, 
    stopListening, 
    speakMessage,
    voiceSettings
  } = useVoiceAnnouncer();
  
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [lastHandledTranscript, setLastHandledTranscript] = useState<string>('');
  
  // Process transcript when it changes
  useEffect(() => {
    if (transcript && transcript !== lastHandledTranscript) {
      handleVoiceCommand(transcript);
      setLastHandledTranscript(transcript);
    }
  }, [transcript]);
  
  // Helper function to log and toast commands
  const logCommand = (message: string) => {
    setCommandHistory(prev => [...prev.slice(-9), message]);
    toast({
      title: "Voice Command",
      description: message,
    });
  };
  
  // Main function to handle voice commands
  const handleVoiceCommand = (text: string) => {
    // Check for mood in the transcript
    const detectedMood = getMoodFromText(text);
    if (detectedMood && onMoodChange) {
      onMoodChange(detectedMood);
      logCommand(`Mood set to ${detectedMood.toLowerCase()}`);
      speakMessage(`I've updated your mood to ${detectedMood.toLowerCase()}. ${getStudyRecommendationByMood(detectedMood)}`);
      return;
    }
    
    // Parse for navigation or action commands
    const command = parseVoiceCommand(text);
    if (!command) {
      // No specific command found
      return;
    }
    
    // Handle based on command category
    switch (command.category) {
      case 'NAVIGATE':
        handleNavigationCommand(command.command);
        break;
      case 'ACTION':
        handleActionCommand(command.command);
        break;
      case 'QUERY':
        handleQueryCommand(command.command);
        break;
      default:
        // Unknown command category
        break;
    }
  };
  
  // Handle navigation commands
  const handleNavigationCommand = (command: string) => {
    let path = '';
    let confirmMessage = '';
    
    switch (command) {
      case 'HOME':
        path = '/';
        confirmMessage = 'Navigating to the home page';
        break;
      case 'DASHBOARD':
        path = '/dashboard/student';
        confirmMessage = 'Opening your dashboard';
        break;
      case 'STUDY_PLAN':
        path = '/dashboard/student/plan';
        confirmMessage = 'Going to your study plan';
        break;
      case 'TODAY_PLAN':
        path = '/dashboard/student/today';
        confirmMessage = 'Opening today\'s study plan';
        break;
      case 'CONCEPTS':
        path = '/dashboard/student/concepts';
        confirmMessage = 'Showing your concepts';
        break;
      case 'FLASHCARDS':
        path = '/dashboard/student/flashcards';
        confirmMessage = 'Opening flashcards';
        break;
      case 'FORMULA_LAB':
        path = '/dashboard/student/formula-lab';
        confirmMessage = 'Taking you to the formula lab';
        break;
      case 'PROFILE':
        path = '/dashboard/student/profile';
        confirmMessage = 'Opening your profile';
        break;
      case 'SETTINGS':
        path = '/dashboard/student/settings';
        confirmMessage = 'Going to settings';
        break;
      default:
        return;
    }
    
    // Log and navigate
    logCommand(confirmMessage);
    speakMessage(confirmMessage);
    navigate(path);
  };
  
  // Handle action commands
  const handleActionCommand = (command: string) => {
    switch (command) {
      case 'START_STUDY':
        speakMessage("Let's begin your study session. What subject would you like to focus on today?");
        logCommand("Starting study session");
        break;
      case 'TAKE_BREAK':
        speakMessage("Taking a break is important. I'll remind you in 15 minutes to resume studying.");
        logCommand("Starting a 15-minute break");
        // In a real app, we would set a timer here
        setTimeout(() => {
          speakMessage("Your break time is over. Ready to get back to studying?");
        }, 15 * 60 * 1000);
        break;
      case 'RESUME_STUDY':
        speakMessage("Welcome back! Let's continue where you left off.");
        logCommand("Resuming study session");
        break;
      case 'FINISH_STUDY':
        speakMessage("Great job on today's study session! Your progress has been saved.");
        logCommand("Ending study session");
        break;
      case 'LOG_MOOD':
        if (onMoodChange) {
          speakMessage("How are you feeling today? You can say 'I feel happy', 'I feel tired', or similar.");
          logCommand("Prompting for mood");
        } else {
          speakMessage("I'm sorry, mood logging is not available right now.");
        }
        break;
      case 'START_TIMER':
        speakMessage("Starting a 25-minute study timer. I'll notify you when it's time for a break.");
        logCommand("Starting 25-minute Pomodoro timer");
        // In a real app, we would set a timer here
        break;
      case 'HELP':
        speakMessage("I can help you navigate, start study sessions, track progress, and more. Try saying 'show my progress', 'go to flashcards', or 'what's next'.");
        logCommand("Showing voice command help");
        break;
      default:
        break;
    }
  };
  
  // Handle query commands
  const handleQueryCommand = (command: string) => {
    switch (command) {
      case 'PROGRESS':
        const progressMessage = getStudyProgressInfo();
        speakMessage(progressMessage);
        logCommand("Showing study progress");
        break;
      case 'NEXT_TASK':
        const taskMessage = getNextTaskInfo();
        speakMessage(taskMessage);
        logCommand("Showing next task");
        break;
      case 'STUDY_STREAK':
        speakMessage("You're currently on a 3-day study streak. Keep it up!");
        logCommand("Showing study streak");
        break;
      case 'DAILY_GOAL':
        speakMessage("You've completed 60% of your daily study goal. You need approximately 40 more minutes to reach your target.");
        logCommand("Showing daily goal progress");
        break;
      case 'STUDY_TIME':
        speakMessage("Today you've studied for 1 hour and 20 minutes in total.");
        logCommand("Showing today's study time");
        break;
      case 'WEAK_AREAS':
        speakMessage("Based on your recent performance, your challenging areas are Organic Chemistry and Vector Calculus. Would you like to focus on these today?");
        logCommand("Showing weak areas");
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="hidden">
      {/* This is an invisible component that handles voice commands */}
    </div>
  );
};

export default VoiceCommandHandler;
