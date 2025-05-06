import { MoodType } from "@/types/user/base";
import moodThemes from "./MoodTheme";

// Save the current mood to localStorage
export const storeMoodInLocalStorage = (mood: MoodType) => {
  localStorage.setItem('current_mood', mood);
  
  // Also store in mood history
  const moodHistory = getMoodHistoryFromLocalStorage();
  moodHistory.push({
    mood,
    timestamp: new Date().toISOString()
  });
  
  // Keep only last 30 days of mood data
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const filteredHistory = moodHistory.filter(entry => 
    new Date(entry.timestamp) >= thirtyDaysAgo
  );
  
  localStorage.setItem('mood_history', JSON.stringify(filteredHistory));
};

// Get the current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  const mood = localStorage.getItem('current_mood') as MoodType;
  return mood || undefined;
};

// Get mood history from localStorage
export interface MoodHistoryEntry {
  mood: MoodType;
  timestamp: string;
}

export const getMoodHistoryFromLocalStorage = (): MoodHistoryEntry[] => {
  const moodHistory = localStorage.getItem('mood_history');
  return moodHistory ? JSON.parse(moodHistory) : [];
};

// Get emoji for a mood
export const getMoodEmoji = (mood: MoodType): string => {
  return moodThemes[mood]?.emoji || '😐';
};

// Get color for a mood
export const getMoodColor = (mood: MoodType): string => {
  return moodThemes[mood]?.colors.primary || '#6b7280';
};

// Get message for a mood
export const getMoodMessage = (mood: MoodType): string => {
  return moodThemes[mood]?.message || "How are you feeling today?";
};

// Get study tip for a mood
export const getMoodStudyTip = (mood: MoodType): string => {
  return moodThemes[mood]?.studyTip || "Adjust your study approach based on how you're feeling.";
};

// Function to announce a mood-appropriate message based on the test score
export const announceTestResultsFeedback = (
  score: number, 
  totalQuestions: number, 
  mood?: MoodType
): string => {
  const percentage = (score / totalQuestions) * 100;
  let message = '';
  
  // Base message on the test score
  if (percentage >= 90) {
    message = "Excellent work! Your dedication to studying is really paying off.";
  } else if (percentage >= 75) {
    message = "Great job! You've shown solid understanding. Review the few questions you missed.";
  } else if (percentage >= 60) {
    message = "Good effort! This test has helped identify areas to focus your studies on.";
  } else if (percentage >= 40) {
    message = "Your effort is valuable. Let's use these results to improve your understanding.";
  } else {
    message = "Remember, every test is a learning opportunity. Let's use these results to create a focused study plan.";
  }
  
  // Add mood-specific encouragement
  if (mood) {
    switch (mood) {
      case MoodType.Anxious:
        message += " Remember that test results are just feedback, not a judgment. You're making progress!";
        break;
      case MoodType.Tired:
        message += " Taking breaks is important. After you rest, we can review these concepts together.";
        break;
      case MoodType.Motivated:
        message += " Your motivation is inspiring! Let's keep this energy going for your next study session.";
        break;
      case MoodType.Focused:
        message += " Your ability to focus will help you master these concepts quickly.";
        break;
      case MoodType.Stressed:
        message += " Let's break down these topics into smaller pieces to make them more manageable.";
        break;
      case MoodType.Sad:
        message += " Learning has ups and downs. Keep going - each study session builds your knowledge.";
        break;
    }
  }
  
  // Actually speak the message
  speakMessage(message, {
    enabled: true,
    volume: 1.0,
    pitch: 1.0,
    rate: 1.0,
    voice: null,
    language: 'en-US',
    autoGreet: false,
    muted: false
  });
  
  return message;
};

// Function to announce flashcard feedback
export const announceFlashcardFeedback = (
  correct: number, 
  total: number, 
  mood?: MoodType
): string => {
  const percentage = (correct / total) * 100;
  let message = '';
  
  // Base message on the flashcard performance
  if (percentage >= 90) {
    message = "Excellent recall! You've mastered these cards.";
  } else if (percentage >= 70) {
    message = "Good job! You're making solid progress with these flashcards.";
  } else if (percentage >= 50) {
    message = "You're doing well. With a bit more practice, you'll master these concepts.";
  } else {
    message = "Each review helps build your memory, even on cards you missed. The brain learns through repetition!";
  }
  
  // Add mood-specific encouragement
  if (mood) {
    switch (mood) {
      case MoodType.Anxious:
        message += " Memory improves with relaxed practice. Take a deep breath and be proud of your effort.";
        break;
      case MoodType.Tired:
        message += " Even when tired, your brain is building connections. A quick review before sleep can help retention.";
        break;
      case MoodType.Motivated:
        message += " Your motivation is showing in your efforts. Keep this momentum going!";
        break;
      case MoodType.Focused:
        message += " Your focus helps you absorb information efficiently. Great job staying engaged!";
        break;
      case MoodType.Stressed:
        message += " Flashcards are a great way to study when feeling stressed. Small, manageable chunks build confidence.";
        break;
      case MoodType.Sad:
        message += " Small wins in learning can boost your mood. Each card you master is a step forward!";
        break;
    }
  }
  
  // Actually speak the message
  speakMessage(message, {
    enabled: true,
    volume: 1.0,
    pitch: 1.0,
    rate: 1.0,
    voice: null,
    language: 'en-US',
    autoGreet: false,
    muted: false
  });
  
  return message;
};

// Function to announce test start encouragement
export const announceTestEncouragement = (
  examName?: string, 
  mood?: MoodType
): string => {
  let message = `You're well-prepared for this ${examName || 'test'}. Trust your knowledge and take your time.`;
  
  // Add mood-specific encouragement
  if (mood) {
    switch (mood) {
      case MoodType.Anxious:
        message = `It's normal to feel anxious before a ${examName || 'test'}. Remember, you've prepared for this! Take a deep breath before each question.`;
        break;
      case MoodType.Tired:
        message = `Even when tired, your brain knows more than you think. Read each question carefully for this ${examName || 'test'}.`;
        break;
      case MoodType.Motivated:
        message = `Your motivation will help you excel in this ${examName || 'test'}! Channel that energy into careful reading of each question.`;
        break;
      case MoodType.Focused:
        message = `Your focused mindset is perfect for this ${examName || 'test'}. One question at a time, you've got this!`;
        break;
      case MoodType.Stressed:
        message = `I know this ${examName || 'test'} feels important, but remember to breathe. You know more than you think you do!`;
        break;
      case MoodType.Sad:
        message = `Taking this ${examName || 'test'} is an accomplishment in itself. Be proud of showing up and doing your best today.`;
        break;
    }
  }
  
  // Actually speak the message
  speakMessage(message, {
    enabled: true,
    volume: 1.0,
    pitch: 1.0,
    rate: 1.0,
    voice: null,
    language: 'en-US',
    autoGreet: false,
    muted: false
  });
  
  return message;
};
