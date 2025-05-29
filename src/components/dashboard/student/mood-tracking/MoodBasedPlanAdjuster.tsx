
import React, { useEffect } from 'react';
import { MoodType } from '@/types/user/base';
import { updateStudyTimeAllocationsByMood } from './moodUtils';
import { useToast } from '@/hooks/use-toast';

interface MoodBasedPlanAdjusterProps {
  currentMood?: MoodType;
  onPlanAdjusted?: (adjustments: any) => void;
}

export const MoodBasedPlanAdjuster: React.FC<MoodBasedPlanAdjusterProps> = ({
  currentMood,
  onPlanAdjusted
}) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!currentMood) return;

    // Update study time allocations based on mood
    updateStudyTimeAllocationsByMood(currentMood);

    // Get the adjusted allocations
    const adjustedAllocations = JSON.parse(
      localStorage.getItem('moodBasedTimeAllocations') || '{}'
    );

    // Apply plan adjustments based on mood
    const planAdjustments = getMoodBasedPlanAdjustments(currentMood);
    
    if (onPlanAdjusted) {
      onPlanAdjusted({
        timeAllocations: adjustedAllocations,
        planAdjustments
      });
    }

    // Show toast notification about plan adjustment
    if (planAdjustments.showNotification) {
      toast({
        title: "Daily Plan Adjusted",
        description: planAdjustments.message,
        duration: 4000,
      });
    }
  }, [currentMood, onPlanAdjusted, toast]);

  return null; // This is a logic-only component
};

// Helper function to get mood-based plan adjustments
const getMoodBasedPlanAdjustments = (mood: MoodType) => {
  const adjustments: Record<MoodType, any> = {
    [MoodType.HAPPY]: {
      message: "You're feeling great! Added more challenging concepts to your plan.",
      priority: ['concepts', 'practiceExams'],
      showNotification: true,
      difficulty: 'increase'
    },
    [MoodType.MOTIVATED]: {
      message: "High motivation detected! Increased study intensity.",
      priority: ['concepts', 'practiceExams'],
      showNotification: true,
      difficulty: 'increase'
    },
    [MoodType.FOCUSED]: {
      message: "Great focus! Perfect time for deep learning sessions.",
      priority: ['concepts'],
      showNotification: true,
      difficulty: 'maintain'
    },
    [MoodType.TIRED]: {
      message: "Taking it easy today with more review and flashcards.",
      priority: ['flashcards', 'revision'],
      showNotification: true,
      difficulty: 'decrease'
    },
    [MoodType.STRESSED]: {
      message: "Adjusted your plan for a calmer study session.",
      priority: ['revision', 'flashcards'],
      showNotification: true,
      difficulty: 'decrease'
    },
    [MoodType.CONFUSED]: {
      message: "Focus on clarifying concepts with extra revision time.",
      priority: ['revision'],
      showNotification: true,
      difficulty: 'decrease'
    },
    [MoodType.CURIOUS]: {
      message: "Explore new concepts! Added extra learning time.",
      priority: ['concepts'],
      showNotification: true,
      difficulty: 'maintain'
    },
    [MoodType.ANXIOUS]: {
      message: "Gentle study plan with familiar topics to build confidence.",
      priority: ['revision', 'flashcards'],
      showNotification: true,
      difficulty: 'decrease'
    },
    [MoodType.OVERWHELMED]: {
      message: "Simplified your plan into smaller, manageable chunks.",
      priority: ['flashcards'],
      showNotification: true,
      difficulty: 'decrease'
    },
    [MoodType.SAD]: {
      message: "Light study day with engaging activities.",
      priority: ['flashcards'],
      showNotification: true,
      difficulty: 'decrease'
    },
    [MoodType.NEUTRAL]: {
      message: "Balanced study plan maintained.",
      priority: ['concepts', 'flashcards', 'practiceExams'],
      showNotification: false,
      difficulty: 'maintain'
    },
    [MoodType.OKAY]: {
      message: "Steady progress with your regular study plan.",
      priority: ['concepts', 'flashcards'],
      showNotification: false,
      difficulty: 'maintain'
    }
  };

  return adjustments[mood] || adjustments[MoodType.NEUTRAL];
};

export default MoodBasedPlanAdjuster;
