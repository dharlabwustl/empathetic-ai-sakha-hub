
import { MoodType } from '@/types/user/base';

// Mood to emoji mapping
export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return "😊";
  
  switch (mood) {
    case MoodType.HAPPY:
      return "😊";
    case MoodType.MOTIVATED:
      return "🚀";
    case MoodType.FOCUSED:
      return "🎯";
    case MoodType.NEUTRAL:
      return "😐";
    case MoodType.TIRED:
      return "😴";
    case MoodType.ANXIOUS:
      return "😰";
    case MoodType.STRESSED:
      return "😤";
    case MoodType.SAD:
      return "😢";
    case MoodType.CALM:
      return "😌";
    case MoodType.CONFUSED:
      return "😕";
    case MoodType.CURIOUS:
      return "🤔";
    case MoodType.OKAY:
      return "🙂";
    case MoodType.OVERWHELMED:
      return "😵";
    default:
      return "😊";
  }
};

// Mood to label mapping
export const getMoodLabel = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Happy";
    case MoodType.MOTIVATED:
      return "Motivated";
    case MoodType.FOCUSED:
      return "Focused";
    case MoodType.NEUTRAL:
      return "Neutral";
    case MoodType.TIRED:
      return "Tired";
    case MoodType.ANXIOUS:
      return "Anxious";
    case MoodType.STRESSED:
      return "Stressed";
    case MoodType.SAD:
      return "Sad";
    case MoodType.CALM:
      return "Calm";
    case MoodType.CONFUSED:
      return "Confused";
    case MoodType.CURIOUS:
      return "Curious";
    case MoodType.OKAY:
      return "Okay";
    case MoodType.OVERWHELMED:
      return "Overwhelmed";
    default:
      return "Unknown";
  }
};

// Get study recommendation based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Great mood for tackling challenging topics! Consider working on complex concepts.";
    case MoodType.MOTIVATED:
      return "Perfect time to set ambitious goals and dive into intensive study sessions.";
    case MoodType.FOCUSED:
      return "Excellent focus! This is ideal for deep work and concentration-heavy tasks.";
    case MoodType.TIRED:
      return "Consider light review or taking a short break. Avoid new complex topics.";
    case MoodType.STRESSED:
      return "Break tasks into smaller chunks. Try some breathing exercises before studying.";
    case MoodType.ANXIOUS:
      return "Focus on familiar topics to build confidence. Practice mindfulness techniques.";
    case MoodType.SAD:
      return "Gentle study approach recommended. Choose enjoyable subjects or creative methods.";
    case MoodType.CALM:
      return "Perfect state for thoughtful analysis and connecting concepts together.";
    case MoodType.CONFUSED:
      return "Good time to revisit fundamentals and seek alternative explanations.";
    case MoodType.CURIOUS:
      return "Explore new topics and follow your interests. Great for discovery learning.";
    case MoodType.OVERWHELMED:
      return "Focus on just one small topic. Prioritize and simplify your study plan.";
    case MoodType.NEUTRAL:
    case MoodType.OKAY:
      return "Steady progress mode. Mix review with learning new concepts.";
    default:
      return "Maintain a balanced study approach.";
  }
};

// Get daily plan adjustments based on mood
export const getDailyPlanAdjustments = (mood: MoodType) => {
  switch (mood) {
    case MoodType.MOTIVATED:
    case MoodType.FOCUSED:
      return {
        studySessionLength: 90, // minutes
        breakFrequency: 25, // every 25 minutes
        difficultyLevel: 'challenging',
        recommendedTopics: ['new concepts', 'complex problems', 'practice tests'],
        studyTechniques: ['deep work', 'problem solving', 'concept mapping']
      };
    case MoodType.TIRED:
    case MoodType.STRESSED:
      return {
        studySessionLength: 30,
        breakFrequency: 15,
        difficultyLevel: 'easy',
        recommendedTopics: ['review', 'flashcards', 'light reading'],
        studyTechniques: ['spaced repetition', 'visual aids', 'audio learning']
      };
    case MoodType.ANXIOUS:
    case MoodType.OVERWHELMED:
      return {
        studySessionLength: 45,
        breakFrequency: 20,
        difficultyLevel: 'moderate',
        recommendedTopics: ['familiar subjects', 'confidence building', 'past achievements review'],
        studyTechniques: ['guided practice', 'step-by-step learning', 'positive reinforcement']
      };
    case MoodType.HAPPY:
    case MoodType.CALM:
      return {
        studySessionLength: 60,
        breakFrequency: 30,
        difficultyLevel: 'balanced',
        recommendedTopics: ['mixed practice', 'creative learning', 'collaborative study'],
        studyTechniques: ['varied approaches', 'discussion', 'teaching others']
      };
    default:
      return {
        studySessionLength: 60,
        breakFrequency: 25,
        difficultyLevel: 'moderate',
        recommendedTopics: ['regular curriculum', 'planned topics'],
        studyTechniques: ['standard methods', 'note-taking', 'practice problems']
      };
  }
};

// Get mood-based theme class
export const getMoodThemeClass = (mood?: MoodType): string => {
  if (!mood) return '';
  return `mood-${mood.toLowerCase()}`;
};

// Apply mood theme to dashboard
export const applyMoodTheme = (mood: MoodType) => {
  // Remove existing mood classes
  document.body.className = document.body.className.replace(/mood-\w+/g, '');
  
  // Add new mood class
  const themeClass = getMoodThemeClass(mood);
  if (themeClass) {
    document.body.classList.add(themeClass);
  }
  
  // Store theme preference
  localStorage.setItem('dashboard_mood_theme', mood);
};

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      parsedData.moodTimestamp = new Date().toISOString();
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ 
        mood, 
        moodTimestamp: new Date().toISOString() 
      }));
    }
    
    // Store mood history
    const moodHistory = localStorage.getItem("moodHistory");
    const history = moodHistory ? JSON.parse(moodHistory) : [];
    history.push({
      mood,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 30 entries
    if (history.length > 30) {
      history.splice(0, history.length - 30);
    }
    
    localStorage.setItem("moodHistory", JSON.stringify(history));
    
    // Update daily plan based on mood
    updateDailyPlanBasedOnMood(mood);
    
    // Apply theme
    applyMoodTheme(mood);
    
  } catch (error) {
    console.error("Error storing mood in localStorage:", error);
  }
};

// Update daily plan based on mood
export const updateDailyPlanBasedOnMood = (mood: MoodType): void => {
  try {
    const adjustments = getDailyPlanAdjustments(mood);
    localStorage.setItem('mood_daily_plan_adjustments', JSON.stringify(adjustments));
    
    // Trigger custom event for components to react to plan changes
    const planUpdateEvent = new CustomEvent('daily-plan-updated', { 
      detail: { 
        mood, 
        adjustments,
        timestamp: new Date().toISOString()
      } 
    });
    document.dispatchEvent(planUpdateEvent);
  } catch (error) {
    console.error("Error updating daily plan:", error);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.mood as MoodType;
    }
  } catch (error) {
    console.error("Error retrieving mood from localStorage:", error);
  }
  return undefined;
};

// Analyze mood trends
export const analyzeMoodTrends = () => {
  try {
    const moodHistory = localStorage.getItem("moodHistory");
    if (!moodHistory) return { stressSignals: false, improved: false };
    
    const history = JSON.parse(moodHistory);
    const recent = history.slice(-7); // Last 7 entries
    
    const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED];
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CALM];
    
    const stressCount = recent.filter(entry => 
      stressfulMoods.includes(entry.mood)
    ).length;
    
    const positiveCount = recent.filter(entry => 
      positiveMoods.includes(entry.mood)
    ).length;
    
    return {
      stressSignals: stressCount >= 3,
      improved: positiveCount >= 4
    };
  } catch (error) {
    console.error("Error analyzing mood trends:", error);
    return { stressSignals: false, improved: false };
  }
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType): void => {
  try {
    const baseAllocations = {
      "Physics": 60,
      "Chemistry": 60,
      "Biology": 60,
      "Mathematics": 60
    };
    
    let adjustedAllocations = { ...baseAllocations };
    
    switch (mood) {
      case MoodType.FOCUSED:
      case MoodType.MOTIVATED:
        adjustedAllocations = {
          "Physics": 75,
          "Chemistry": 75,
          "Biology": 50,
          "Mathematics": 60
        };
        break;
      case MoodType.TIRED:
      case MoodType.STRESSED:
        adjustedAllocations = {
          "Physics": 40,
          "Chemistry": 45,
          "Biology": 70,
          "Mathematics": 45
        };
        break;
      case MoodType.CONFUSED:
        adjustedAllocations = {
          "Physics": 50,
          "Chemistry": 50,
          "Biology": 65,
          "Mathematics": 75
        };
        break;
      default:
        adjustedAllocations = baseAllocations;
    }
    
    localStorage.setItem('study_time_allocations', JSON.stringify(adjustedAllocations));
  } catch (error) {
    console.error("Error updating study time allocations:", error);
  }
};

// Get mood recommendation for daily plan
export const getMoodRecommendation = (mood: MoodType): string => {
  return getStudyRecommendationForMood(mood);
};
