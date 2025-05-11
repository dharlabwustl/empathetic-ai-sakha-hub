
import { useState, useEffect } from 'react';
import { MoodType } from '@/types/user/base';
import { useToast } from './use-toast';
import { getMoodRecommendation, storeMoodInLocalStorage, getCurrentMoodFromLocalStorage } from '@/components/dashboard/student/mood-tracking/moodUtils';

interface StudyRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'revision' | 'practice' | 'break' | 'new-concept';
}

// Map of mood types to recommended study approaches
const moodToStudyRecommendations: Record<MoodType, StudyRecommendation[]> = {
  [MoodType.HAPPY]: [
    { 
      title: 'Tackle challenging topics', 
      description: 'Your positive mood makes this an excellent time to work on difficult concepts.',
      priority: 'high',
      type: 'new-concept'
    },
    {
      title: 'Group study session',
      description: 'Share your positive energy in a collaborative study session.',
      priority: 'medium',
      type: 'practice'
    }
  ],
  [MoodType.MOTIVATED]: [
    { 
      title: 'Set ambitious goals', 
      description: 'Channel your motivation into achieving significant milestones.',
      priority: 'high',
      type: 'new-concept'
    },
    {
      title: 'Extended practice session',
      description: 'Use your motivation to tackle a longer practice session.',
      priority: 'high',
      type: 'practice'
    }
  ],
  [MoodType.FOCUSED]: [
    { 
      title: 'Deep work session', 
      description: 'Leverage your focus for concentrated study on complex topics.',
      priority: 'high',
      type: 'new-concept'
    },
    {
      title: 'Detailed note-taking',
      description: 'Create comprehensive notes while your focus is strong.',
      priority: 'medium',
      type: 'revision'
    }
  ],
  [MoodType.TIRED]: [
    { 
      title: 'Light review session', 
      description: 'Review familiar concepts that don\'t require intense concentration.',
      priority: 'medium',
      type: 'revision'
    },
    {
      title: 'Short study break',
      description: 'Consider a 15-30 minute power nap before continuing.',
      priority: 'high',
      type: 'break'
    }
  ],
  [MoodType.STRESSED]: [
    { 
      title: 'Structured revision', 
      description: 'Break down revision into small, manageable chunks.',
      priority: 'medium',
      type: 'revision'
    },
    {
      title: 'Breathing exercises',
      description: 'Try 5 minutes of deep breathing before continuing studies.',
      priority: 'high',
      type: 'break'
    }
  ],
  [MoodType.CONFUSED]: [
    { 
      title: 'Revisit fundamentals', 
      description: 'Go back to the basic concepts to build a solid foundation.',
      priority: 'high',
      type: 'revision'
    },
    {
      title: 'Seek explanations',
      description: 'Use the AI tutor to get alternative explanations of difficult concepts.',
      priority: 'high',
      type: 'practice'
    }
  ],
  [MoodType.ANXIOUS]: [
    { 
      title: 'Structured review', 
      description: 'Focus on what you know well to build confidence.',
      priority: 'high',
      type: 'revision'
    },
    {
      title: 'Grounding exercises',
      description: 'Try the 5-4-3-2-1 sensory exercise before studying.',
      priority: 'high',
      type: 'break'
    }
  ],
  [MoodType.NEUTRAL]: [
    { 
      title: 'Balanced study session', 
      description: 'Mix review with learning new concepts.',
      priority: 'medium',
      type: 'new-concept'
    },
    {
      title: 'Progress assessment',
      description: 'Take time to evaluate your progress and adjust your study plan.',
      priority: 'medium',
      type: 'practice'
    }
  ],
  [MoodType.OKAY]: [
    { 
      title: 'Steady progress', 
      description: 'Work consistently through your planned study materials.',
      priority: 'medium',
      type: 'revision'
    },
    {
      title: 'Topic consolidation',
      description: 'Create mind maps or summaries of what you\'ve learned recently.',
      priority: 'medium',
      type: 'practice'
    }
  ],
  [MoodType.OVERWHELMED]: [
    { 
      title: 'Single-topic focus', 
      description: 'Pick just one small topic to work on right now.',
      priority: 'high',
      type: 'revision'
    },
    {
      title: 'Priority reassessment',
      description: 'Review and adjust your study priorities for the week.',
      priority: 'high',
      type: 'break'
    }
  ],
  [MoodType.CURIOUS]: [
    { 
      title: 'Explore new topics', 
      description: 'Follow your curiosity to discover connected concepts.',
      priority: 'high',
      type: 'new-concept'
    },
    {
      title: 'Deep dive research',
      description: 'Investigate interesting topics beyond your curriculum.',
      priority: 'medium',
      type: 'practice'
    }
  ],
  [MoodType.SAD]: [
    { 
      title: 'Light engagement', 
      description: 'Work on enjoyable aspects of your subjects.',
      priority: 'medium',
      type: 'revision'
    },
    {
      title: 'Creative study approach',
      description: 'Try a different study method like visual learning or audio recordings.',
      priority: 'low',
      type: 'practice'
    }
  ],
  [MoodType.CALM]: [
    { 
      title: 'Thoughtful analysis', 
      description: 'Use this peaceful state for deeper understanding of concepts.',
      priority: 'high',
      type: 'new-concept'
    },
    {
      title: 'Reflective learning',
      description: 'Connect concepts and create a broader understanding of your subjects.',
      priority: 'medium',
      type: 'revision'
    }
  ]
};

// Function to adjust study time allocations based on mood
export const adjustStudyTimeForMood = (mood: MoodType): Record<string, number> => {
  // Default allocations (in minutes)
  const baseAllocations = {
    "Physics": 60,
    "Chemistry": 60,
    "Biology": 60,
    "Mathematics": 60
  };
  
  // Adjust based on mood
  switch (mood) {
    case MoodType.FOCUSED:
    case MoodType.MOTIVATED:
      // Increase challenging subjects
      return {
        "Physics": 75,
        "Chemistry": 75,
        "Biology": 50,
        "Mathematics": 60
      };
    case MoodType.TIRED:
    case MoodType.STRESSED:
      // Reduce overall time, focus on easier subjects
      return {
        "Physics": 40,
        "Chemistry": 45,
        "Biology": 70,
        "Mathematics": 45
      };
    case MoodType.CONFUSED:
      // Focus more on fundamentals
      return {
        "Physics": 50,
        "Chemistry": 50,
        "Biology": 65,
        "Mathematics": 75
      };
    case MoodType.HAPPY:
    case MoodType.CALM:
      // Balanced approach
      return baseAllocations;
    default:
      return baseAllocations;
  }
};

export const useMoodStudyIntegration = () => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(getCurrentMoodFromLocalStorage());
  const [studyRecommendations, setStudyRecommendations] = useState<StudyRecommendation[]>([]);
  const [timeAllocations, setTimeAllocations] = useState<Record<string, number>>({});
  const { toast } = useToast();

  // Update recommendations when mood changes
  useEffect(() => {
    if (currentMood) {
      // Get recommendations for current mood
      const recommendations = moodToStudyRecommendations[currentMood] || [];
      setStudyRecommendations(recommendations);
      
      // Update time allocations
      const newAllocations = adjustStudyTimeForMood(currentMood);
      setTimeAllocations(newAllocations);
      
      // Store updated allocations
      localStorage.setItem('study_time_allocations', JSON.stringify(newAllocations));
    }
  }, [currentMood]);

  // Handle mood change
  const handleMoodChange = (newMood: MoodType) => {
    setCurrentMood(newMood);
    storeMoodInLocalStorage(newMood);
    
    // Show study recommendation toast
    const recommendation = getMoodRecommendation(newMood);
    toast({
      title: `Mood updated: ${newMood}`,
      description: recommendation,
      duration: 5000
    });
  };

  // Get currently stored time allocations
  const getTimeAllocations = (): Record<string, number> => {
    try {
      const storedAllocations = localStorage.getItem('study_time_allocations');
      if (storedAllocations) {
        return JSON.parse(storedAllocations);
      }
    } catch (error) {
      console.error("Error retrieving time allocations:", error);
    }
    
    // Return default allocations if none found
    return {
      "Physics": 60,
      "Chemistry": 60,
      "Biology": 60,
      "Mathematics": 60
    };
  };

  // Update time allocation for a specific subject
  const updateTimeAllocation = (subject: string, minutes: number) => {
    const current = getTimeAllocations();
    const updated = { ...current, [subject]: minutes };
    localStorage.setItem('study_time_allocations', JSON.stringify(updated));
    setTimeAllocations(updated);
    
    toast({
      title: "Study time updated",
      description: `${subject} time set to ${minutes} minutes`,
      duration: 3000
    });
    
    return updated;
  };

  return {
    currentMood,
    handleMoodChange,
    studyRecommendations,
    timeAllocations,
    getTimeAllocations,
    updateTimeAllocation
  };
};

export default useMoodStudyIntegration;
