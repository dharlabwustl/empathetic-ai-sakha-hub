
import { MoodType } from '@/types/user/base';

export const getMoodEmoji = (mood: MoodType): string => {
  const moodEmojis: Record<MoodType, string> = {
    [MoodType.Happy]: '😊',
    [MoodType.Motivated]: '💪',
    [MoodType.Focused]: '🎯',
    [MoodType.Calm]: '😌',
    [MoodType.Tired]: '😴',
    [MoodType.Confused]: '🤔',
    [MoodType.Anxious]: '😰',
    [MoodType.Stressed]: '😫',
    [MoodType.Overwhelmed]: '🤯',
    [MoodType.Neutral]: '😐',
    [MoodType.Okay]: '👍',
    [MoodType.Sad]: '😢',
    [MoodType.Curious]: '🤔'
  };
  return moodEmojis[mood] || '😐';
};

export const getMoodLabel = (mood: MoodType): string => {
  const moodLabels: Record<MoodType, string> = {
    [MoodType.Happy]: 'Happy',
    [MoodType.Motivated]: 'Motivated',
    [MoodType.Focused]: 'Focused',
    [MoodType.Calm]: 'Calm',
    [MoodType.Tired]: 'Tired',
    [MoodType.Confused]: 'Confused',
    [MoodType.Anxious]: 'Anxious',
    [MoodType.Stressed]: 'Stressed',
    [MoodType.Overwhelmed]: 'Overwhelmed',
    [MoodType.Neutral]: 'Neutral',
    [MoodType.Okay]: 'Okay',
    [MoodType.Sad]: 'Sad',
    [MoodType.Curious]: 'Curious'
  };
  return moodLabels[mood] || 'Unknown';
};

export const getMoodColor = (mood: MoodType): string => {
  const moodColors: Record<MoodType, string> = {
    [MoodType.Happy]: 'bg-yellow-100 text-yellow-800',
    [MoodType.Motivated]: 'bg-green-100 text-green-800',
    [MoodType.Focused]: 'bg-blue-100 text-blue-800',
    [MoodType.Calm]: 'bg-teal-100 text-teal-800',
    [MoodType.Tired]: 'bg-orange-100 text-orange-800',
    [MoodType.Confused]: 'bg-purple-100 text-purple-800',
    [MoodType.Anxious]: 'bg-red-100 text-red-800',
    [MoodType.Stressed]: 'bg-red-100 text-red-800',
    [MoodType.Overwhelmed]: 'bg-red-100 text-red-800',
    [MoodType.Neutral]: 'bg-gray-100 text-gray-800',
    [MoodType.Okay]: 'bg-emerald-100 text-emerald-800',
    [MoodType.Sad]: 'bg-indigo-100 text-indigo-800',
    [MoodType.Curious]: 'bg-violet-100 text-violet-800'
  };
  return moodColors[mood] || 'bg-gray-100 text-gray-800';
};

export const getStudyRecommendationForMood = (mood: MoodType): string => {
  const recommendations: Record<MoodType, string> = {
    [MoodType.Happy]: 'Great time for challenging topics and practice tests!',
    [MoodType.Motivated]: 'Perfect for starting new chapters or difficult concepts.',
    [MoodType.Focused]: 'Ideal for deep study sessions and problem solving.',
    [MoodType.Calm]: 'Good for revision and concept consolidation.',
    [MoodType.Tired]: 'Consider light revision or visual learning materials.',
    [MoodType.Confused]: 'Take a break or review fundamentals.',
    [MoodType.Anxious]: 'Try relaxation exercises before studying.',
    [MoodType.Stressed]: 'Focus on easier topics or take a study break.',
    [MoodType.Overwhelmed]: 'Break down tasks into smaller chunks.',
    [MoodType.Neutral]: 'Standard study session recommended.',
    [MoodType.Okay]: 'Suitable for moderate study activities.',
    [MoodType.Sad]: 'Consider motivational content or group study.',
    [MoodType.Curious]: 'Explore new topics and expand knowledge.'
  };
  return recommendations[mood] || 'Continue with your regular study plan.';
};

export const analyzeMoodTrends = (moodHistory: Array<{ mood: MoodType; timestamp: Date }>) => {
  if (moodHistory.length === 0) return { 
    trend: 'stable', 
    dominant: MoodType.Neutral,
    stressSignals: [],
    improved: false
  };
  
  const recentMoods = moodHistory.slice(-7); // Last 7 entries
  const moodCounts: Partial<Record<MoodType, number>> = {};
  
  recentMoods.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
    (moodCounts[a as MoodType] || 0) > (moodCounts[b as MoodType] || 0) ? a : b
  ) as MoodType;
  
  const stressSignals = recentMoods.filter(entry => 
    [MoodType.Stressed, MoodType.Anxious, MoodType.Overwhelmed].includes(entry.mood)
  );
  
  const improved = recentMoods.length >= 2 && 
    [MoodType.Happy, MoodType.Motivated, MoodType.Focused].includes(recentMoods[recentMoods.length - 1].mood);
  
  return { 
    trend: 'improving', 
    dominant: dominantMood,
    stressSignals: stressSignals.map(s => s.mood),
    improved
  };
};

export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  const allocations: Record<MoodType, { focus: number; break: number; difficulty: 'easy' | 'medium' | 'hard' }> = {
    [MoodType.Happy]: { focus: 90, break: 10, difficulty: 'medium' },
    [MoodType.Motivated]: { focus: 85, break: 15, difficulty: 'hard' },
    [MoodType.Focused]: { focus: 95, break: 5, difficulty: 'hard' },
    [MoodType.Calm]: { focus: 80, break: 20, difficulty: 'medium' },
    [MoodType.Tired]: { focus: 60, break: 40, difficulty: 'easy' },
    [MoodType.Confused]: { focus: 70, break: 30, difficulty: 'easy' },
    [MoodType.Anxious]: { focus: 50, break: 50, difficulty: 'easy' },
    [MoodType.Stressed]: { focus: 55, break: 45, difficulty: 'easy' },
    [MoodType.Overwhelmed]: { focus: 45, break: 55, difficulty: 'easy' },
    [MoodType.Neutral]: { focus: 75, break: 25, difficulty: 'medium' },
    [MoodType.Okay]: { focus: 75, break: 25, difficulty: 'medium' },
    [MoodType.Sad]: { focus: 65, break: 35, difficulty: 'easy' },
    [MoodType.Curious]: { focus: 85, break: 15, difficulty: 'medium' }
  };
  
  return allocations[mood] || allocations[MoodType.Neutral];
};
