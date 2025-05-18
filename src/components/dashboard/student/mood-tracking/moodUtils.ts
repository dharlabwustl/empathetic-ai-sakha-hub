
import { MoodType } from "@/types/user/base";

// Function to get the appropriate emoji for each mood
export const getMoodEmoji = (mood: MoodType | undefined): string => {
  if (!mood) return "😐"; // Default neutral emoji if no mood is provided
  
  switch (mood) {
    case MoodType.HAPPY:
      return "😊";
    case MoodType.FOCUSED:
      return "🧠";
    case MoodType.MOTIVATED:
      return "💪";
    case MoodType.TIRED:
      return "😴";
    case MoodType.STRESSED:
      return "😰";
    case MoodType.CONFUSED:
      return "🤔";
    case MoodType.ANXIOUS:
      return "😨";
    case MoodType.NEUTRAL:
      return "😐";
    case MoodType.OKAY:
      return "👍";
    case MoodType.OVERWHELMED:
      return "🥴";
    case MoodType.CURIOUS:
      return "🧐";
    case MoodType.SAD:
      return "😢";
    case MoodType.CALM:
      return "😌";
    default:
      return "😐"; // Fallback to neutral
  }
};

// Function to get a mood description based on the mood type
export const getMoodDescription = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "You're in a positive state of mind";
    case MoodType.FOCUSED:
      return "You're concentrating well on your tasks";
    case MoodType.MOTIVATED:
      return "You're feeling driven to achieve your goals";
    case MoodType.TIRED:
      return "You might need some rest";
    case MoodType.STRESSED:
      return "You're feeling pressure from your workload";
    case MoodType.CONFUSED:
      return "You're struggling to understand something";
    case MoodType.ANXIOUS:
      return "You're feeling worried or nervous";
    case MoodType.NEUTRAL:
      return "You're feeling balanced";
    case MoodType.OKAY:
      return "You're doing alright";
    case MoodType.OVERWHELMED:
      return "You might be taking on too much";
    case MoodType.CURIOUS:
      return "You're interested in learning more";
    case MoodType.SAD:
      return "You're feeling down";
    case MoodType.CALM:
      return "You're feeling peaceful and relaxed";
    default:
      return "Unknown mood";
  }
};

// Function to get mood color
export const getMoodColor = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "bg-green-100 text-green-800 border-green-200";
    case MoodType.FOCUSED:
      return "bg-blue-100 text-blue-800 border-blue-200";
    case MoodType.MOTIVATED:
      return "bg-purple-100 text-purple-800 border-purple-200";
    case MoodType.TIRED:
      return "bg-gray-100 text-gray-800 border-gray-200";
    case MoodType.STRESSED:
      return "bg-red-100 text-red-800 border-red-200";
    case MoodType.CONFUSED:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case MoodType.ANXIOUS:
      return "bg-orange-100 text-orange-800 border-orange-200";
    case MoodType.NEUTRAL:
      return "bg-gray-100 text-gray-800 border-gray-200";
    case MoodType.OKAY:
      return "bg-teal-100 text-teal-800 border-teal-200";
    case MoodType.OVERWHELMED:
      return "bg-pink-100 text-pink-800 border-pink-200";
    case MoodType.CURIOUS:
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case MoodType.SAD:
      return "bg-blue-100 text-blue-800 border-blue-200";
    case MoodType.CALM:
      return "bg-sky-100 text-sky-800 border-sky-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// Function to get recommendations based on mood
export const getMoodRecommendation = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great! Use this positive energy to tackle challenging topics.";
    case MoodType.FOCUSED:
      return "Perfect time to work on complex concepts that require deep thinking.";
    case MoodType.MOTIVATED:
      return "Try setting some ambitious study goals while your motivation is high!";
    case MoodType.TIRED:
      return "Consider taking a short break or switching to a lighter subject.";
    case MoodType.STRESSED:
      return "Take a few deep breaths and break your tasks into smaller steps.";
    case MoodType.CONFUSED:
      return "Try reviewing the fundamentals or reaching out to a tutor for help.";
    case MoodType.ANXIOUS:
      return "Practice some quick relaxation techniques before continuing your studies.";
    case MoodType.NEUTRAL:
      return "Good time to organize your study plan or review key concepts.";
    case MoodType.OKAY:
      return "You're in a balanced state - good for steady, consistent progress.";
    case MoodType.OVERWHELMED:
      return "Take a step back and prioritize your most important tasks first.";
    case MoodType.CURIOUS:
      return "Great time to explore new topics or dive deeper into interesting concepts.";
    case MoodType.SAD:
      return "Consider a short break with something you enjoy before returning to studies.";
    case MoodType.CALM:
      return "Take advantage of this peaceful state for focused, mindful studying.";
    default:
      return "Set specific goals for your study session today.";
  }
};

// Save current mood to localStorage with study plan adjustments
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  // Store the current mood
  localStorage.setItem("current_mood", mood);
  
  // Also save to mood history
  try {
    const timestamp = new Date().toISOString();
    const newMoodEntry = { mood, timestamp };
    
    // Get existing history or create new one
    const existingHistory = localStorage.getItem("mood_history");
    const moodHistory = existingHistory ? JSON.parse(existingHistory) : [];
    
    // Add new entry at the beginning
    moodHistory.unshift(newMoodEntry);
    
    // Keep only the last 50 entries to prevent localStorage from getting too large
    const trimmedHistory = moodHistory.slice(0, 50);
    
    localStorage.setItem("mood_history", JSON.stringify(trimmedHistory));
    
    // Update study time allocations based on mood
    updateStudyTimeAllocationsByMood(mood);
    
  } catch (error) {
    console.error("Error storing mood history:", error);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const savedMood = localStorage.getItem("current_mood");
  return savedMood ? (savedMood as MoodType) : undefined;
};

// Get mood history from localStorage
export const getMoodHistoryFromLocalStorage = (): Array<{mood: MoodType, timestamp: string}> => {
  try {
    const history = localStorage.getItem("mood_history");
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error retrieving mood history:", error);
    return [];
  }
};

// Calculate mood trends from history
export const calculateMoodTrends = () => {
  const history = getMoodHistoryFromLocalStorage();
  
  // Not enough data for trends
  if (history.length < 5) {
    return {
      dominantMood: undefined,
      weeklyVariation: "stable",
      recentTrend: "neutral"
    };
  }
  
  // Count occurrences of each mood
  const moodCounts: Record<string, number> = {};
  history.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });
  
  // Find dominant mood
  let dominantMood: MoodType | undefined;
  let maxCount = 0;
  
  Object.entries(moodCounts).forEach(([mood, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantMood = mood as MoodType;
    }
  });
  
  // Calculate weekly variation
  const recentFiveMoods = history.slice(0, 5).map(entry => entry.mood);
  const uniqueRecentMoods = new Set(recentFiveMoods).size;
  
  let weeklyVariation = "stable";
  if (uniqueRecentMoods >= 4) {
    weeklyVariation = "highly variable";
  } else if (uniqueRecentMoods === 3) {
    weeklyVariation = "moderately variable";
  }
  
  // Calculate recent trend
  const positiveEnergyMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CALM];
  const negativeEnergyMoods = [MoodType.TIRED, MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED, MoodType.SAD];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  recentFiveMoods.forEach(mood => {
    if (positiveEnergyMoods.includes(mood as MoodType)) positiveCount++;
    if (negativeEnergyMoods.includes(mood as MoodType)) negativeCount++;
  });
  
  let recentTrend = "neutral";
  if (positiveCount >= 3) {
    recentTrend = "positive";
  } else if (negativeCount >= 3) {
    recentTrend = "negative";
  }
  
  return {
    dominantMood,
    weeklyVariation,
    recentTrend,
  };
};

// Group moods into categories for analysis
export const getMoodCategories = () => {
  return {
    positive: [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CALM],
    neutral: [MoodType.NEUTRAL, MoodType.OKAY, MoodType.CURIOUS],
    negative: [MoodType.TIRED, MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED, MoodType.SAD, MoodType.CONFUSED]
  };
};

// Get a list of all available moods with their details
export const getAllMoodsWithDetails = () => {
  const allMoods = Object.values(MoodType);
  return allMoods.map(mood => ({
    type: mood,
    emoji: getMoodEmoji(mood as MoodType),
    description: getMoodDescription(mood as MoodType),
    color: getMoodColor(mood as MoodType),
    recommendation: getMoodRecommendation(mood as MoodType)
  }));
};

// Function to get study recommendations based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Your positive mood is perfect for tackling challenging topics or starting new concepts.";
    case MoodType.FOCUSED:
      return "Take advantage of your focus by working on complex problems or detailed review.";
    case MoodType.MOTIVATED:
      return "Channel your motivation into making progress on your most important goals.";
    case MoodType.TIRED:
      return "Consider lighter review tasks or take a short power nap before studying.";
    case MoodType.STRESSED:
      return "Try breaking down your work into smaller tasks and take regular short breaks.";
    case MoodType.CONFUSED:
      return "Focus on clarifying basic concepts before moving to more complex topics.";
    case MoodType.ANXIOUS:
      return "Start with something familiar to build confidence before tackling challenging material.";
    case MoodType.NEUTRAL:
      return "This balanced state is good for methodical progress through your study plan.";
    case MoodType.OKAY:
      return "Maintain steady progress with regular breaks to sustain your energy.";
    case MoodType.OVERWHELMED:
      return "Prioritize one small task at a time and celebrate small wins.";
    case MoodType.CURIOUS:
      return "Explore new topics or dive deeper into areas that spark your interest.";
    case MoodType.SAD:
      return "Start with subjects you enjoy to boost your mood before tackling harder topics.";
    case MoodType.CALM:
      return "Your calm state is ideal for deep learning and reflection on complex concepts.";
    default:
      return "Focus on your most important tasks for today.";
  }
};

// Analyze mood trends to provide insights
export const analyzeMoodTrends = () => {
  const history = getMoodHistoryFromLocalStorage();
  
  // Not enough data for analysis
  if (history.length < 3) {
    return {
      stressSignals: false,
      improved: false,
      consistent: true,
      recommendation: "Keep logging your mood to get personalized insights."
    };
  }
  
  const recentMoods = history.slice(0, 5);
  const categories = getMoodCategories();
  
  // Check for stress signals
  const stressCount = recentMoods.filter(entry => 
    categories.negative.includes(entry.mood)
  ).length;
  
  const stressSignals = stressCount >= 3;
  
  // Check for improvement
  const oldestTwo = recentMoods.slice(3, 5);
  const newestTwo = recentMoods.slice(0, 2);
  
  const oldestNegative = oldestTwo.filter(entry => 
    categories.negative.includes(entry.mood)
  ).length;
  
  const newestPositive = newestTwo.filter(entry => 
    categories.positive.includes(entry.mood)
  ).length;
  
  const improved = oldestNegative > 0 && newestPositive === newestTwo.length;
  
  // Check for consistency
  const moodTypes = new Set(recentMoods.map(entry => entry.mood));
  const consistent = moodTypes.size <= 2;
  
  return {
    stressSignals,
    improved,
    consistent,
    recommendation: stressSignals 
      ? "Consider taking a break or using stress-reduction techniques."
      : improved
      ? "Great progress! Your mood is improving."
      : consistent
      ? "Your mood has been consistent lately."
      : "Your mood has been variable. Try to identify what affects it."
  };
};

// Get label for mood
export const getMoodLabel = (mood: MoodType): string => {
  return mood.toString().charAt(0).toUpperCase() + mood.toString().slice(1).toLowerCase();
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  try {
    // Get current allocations or create default
    const currentAllocations = localStorage.getItem("study_time_allocations");
    let allocations = currentAllocations ? JSON.parse(currentAllocations) : {
      theory: 30,      // minutes per day
      practice: 30,    // minutes per day
      revision: 30,    // minutes per day
      breaks: 15,      // minutes per day
      difficulty: "medium" // can be easy, medium, hard
    };
    
    // Adjust based on mood
    switch(mood) {
      case MoodType.HAPPY:
      case MoodType.MOTIVATED:
        // More productive moods - increase practice and challenge
        allocations.theory = 30;
        allocations.practice = 45;
        allocations.revision = 20;
        allocations.breaks = 10;
        allocations.difficulty = "hard";
        break;
        
      case MoodType.FOCUSED:
      case MoodType.CALM:
        // Deep-work moods - more theory and deep learning
        allocations.theory = 45; 
        allocations.practice = 30;
        allocations.revision = 20;
        allocations.breaks = 15;
        allocations.difficulty = "medium";
        break;
        
      case MoodType.TIRED:
      case MoodType.STRESSED:
      case MoodType.OVERWHELMED:
        // Low-energy moods - more breaks, less challenging content
        allocations.theory = 20;
        allocations.practice = 20;
        allocations.revision = 40;
        allocations.breaks = 30;
        allocations.difficulty = "easy";
        break;
        
      case MoodType.ANXIOUS:
      case MoodType.SAD:
        // Emotional moods - focus on revision to build confidence
        allocations.theory = 20;
        allocations.practice = 25;
        allocations.revision = 35; 
        allocations.breaks = 25;
        allocations.difficulty = "easy";
        break;
        
      case MoodType.CURIOUS:
        // Explorative mood - more theory and new concepts
        allocations.theory = 50;
        allocations.practice = 25;
        allocations.revision = 15;
        allocations.breaks = 15; 
        allocations.difficulty = "medium";
        break;
        
      default:
        // Neutral, Okay - balanced approach
        allocations.theory = 30;
        allocations.practice = 30;
        allocations.revision = 30;
        allocations.breaks = 15;
        allocations.difficulty = "medium";
        break;
    }
    
    // Save updated allocations with timestamp
    allocations.lastUpdated = new Date().toISOString();
    allocations.basedOnMood = mood;
    localStorage.setItem("study_time_allocations", JSON.stringify(allocations));
    
    console.log(`Study time allocations updated based on ${mood} mood:`, allocations);
    
  } catch (error) {
    console.error("Error updating study time allocations:", error);
  }
};

// Get current study time allocations
export const getStudyTimeAllocations = () => {
  try {
    const allocations = localStorage.getItem("study_time_allocations");
    return allocations ? JSON.parse(allocations) : null;
  } catch (error) {
    console.error("Error retrieving study time allocations:", error);
    return null;
  }
};
