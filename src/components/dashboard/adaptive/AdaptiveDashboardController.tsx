
import React, { useMemo } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import ComprehensiveAdaptiveDashboard from './ComprehensiveAdaptiveDashboard';

interface AdaptiveDashboardControllerProps {
  userProfile: UserProfileBase;
  preferences?: any;
  onMoodChange?: (mood: MoodType) => void;
  [key: string]: any;
}

const AdaptiveDashboardController: React.FC<AdaptiveDashboardControllerProps> = ({
  userProfile,
  preferences,
  onMoodChange,
  ...otherProps
}) => {
  // Calculate exam proximity based on exam date
  const examProximity = useMemo(() => {
    if (!userProfile.examDate) return 'relaxed';
    
    const examDate = new Date(userProfile.examDate);
    const today = new Date();
    const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 7) return 'critical';
    if (daysLeft <= 30) return 'urgent';
    if (daysLeft <= 90) return 'moderate';
    return 'relaxed';
  }, [userProfile.examDate]);

  // Determine learning style from profile
  const learningStyle = useMemo(() => {
    return userProfile.learningStyle || preferences?.learningStyle || 'visual';
  }, [userProfile.learningStyle, preferences]);

  // Get current mood
  const currentMood = useMemo(() => {
    return userProfile.currentMood || userProfile.mood || preferences?.currentMood;
  }, [userProfile.currentMood, userProfile.mood, preferences]);

  return (
    <ComprehensiveAdaptiveDashboard
      userProfile={userProfile}
      examProximity={examProximity}
      learningStyle={learningStyle}
      currentMood={currentMood}
      onMoodChange={onMoodChange}
      {...otherProps}
    />
  );
};

export default AdaptiveDashboardController;
