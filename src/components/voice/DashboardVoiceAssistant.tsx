
import React, { useState, useEffect } from 'react';
import VoiceAnnouncer from '@/components/dashboard/student/voice/VoiceAnnouncer';
import VoiceStudyAssistant from '@/components/dashboard/student/voice/VoiceStudyAssistant';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName,
  currentMood,
  onMoodChange
}) => {
  const { toast } = useToast();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [showFloatingAssistant, setShowFloatingAssistant] = useState(false);
  
  // Check if this is the first time user
  useEffect(() => {
    const newUserSignup = localStorage.getItem('new_user_signup') === 'true';
    const hasSeenVoice = localStorage.getItem('dashboardVoiceAssistantSeen') === 'true';
    
    setIsFirstTimeUser(newUserSignup && !hasSeenVoice);
    
    // Mark as seen
    if (newUserSignup && !hasSeenVoice) {
      localStorage.setItem('dashboardVoiceAssistantSeen', 'true');
    }
  }, []);
  
  // Handle mood command from voice assistant
  const handleMoodCommand = (mood: string) => {
    if (!onMoodChange) return;
    
    // Convert string mood to MoodType enum
    const moodMap: { [key: string]: MoodType } = {
      'happy': MoodType.HAPPY,
      'motivated': MoodType.MOTIVATED,
      'stressed': MoodType.STRESSED,
      'tired': MoodType.TIRED,
      'confused': MoodType.CONFUSED,
      'anxious': MoodType.ANXIOUS
    };
    
    if (mood in moodMap) {
      onMoodChange(moodMap[mood]);
      
      toast({
        title: "Mood Updated",
        description: `Your mood has been set to ${mood}`,
      });
    }
  };
  
  // Handle study plan command
  const handleStudyPlanCommand = () => {
    // Dispatch an event to open study plan
    const event = new CustomEvent('open-study-plan');
    document.dispatchEvent(event);
    
    toast({
      title: "Opening Study Plan",
      description: "Your personalized study plan is now open",
    });
  };
  
  // Handle task management commands
  const handleTaskCommand = (action: string, task?: string) => {
    switch (action) {
      case 'complete':
        toast({
          title: "Task Completed",
          description: task ? `Marked "${task}" as complete` : "Please specify which task to complete",
        });
        break;
      case 'add':
        toast({
          title: "Task Added",
          description: task ? `Added new task: "${task}"` : "Please specify the task to add",
        });
        break;
      case 'list':
        toast({
          title: "Tasks Retrieved",
          description: "Showing your pending tasks",
        });
        break;
      default:
        break;
    }
  };
  
  return (
    <>
      {/* Top bar voice controls */}
      <VoiceAnnouncer 
        userName={userName}
        mood={currentMood}
        isFirstTimeUser={isFirstTimeUser}
        examGoal="NEET"
      />
      
      {/* Floating study assistant that can be minimized */}
      <div className="fixed right-4 bottom-4 z-40">
        <VoiceStudyAssistant 
          userName={userName}
          onMoodCommand={handleMoodCommand}
          onStudyPlanCommand={handleStudyPlanCommand}
          onTaskCommand={handleTaskCommand}
        />
      </div>
    </>
  );
};

export default DashboardVoiceAssistant;
