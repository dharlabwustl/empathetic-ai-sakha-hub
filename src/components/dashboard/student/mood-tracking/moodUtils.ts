
import { MoodType } from '@/types/user/base';

export const getMoodSuggestion = (mood: MoodType): string => {
  const suggestions: Record<MoodType, string> = {
    [MoodType.Happy]: "Great! Channel your positive energy into tackling challenging topics. You're more likely to retain complex information when you're in a good mood.",
    
    [MoodType.Focused]: "Excellent time for deep work. Take advantage of your focus by working on problem-solving or complex subjects that need your full attention.",
    
    [MoodType.Motivated]: "Your motivation is high! This is the perfect time to tackle difficult subjects or work ahead on your study plan.",
    
    [MoodType.Tired]: "Consider a shorter study session with more breaks. Focus on review rather than new material, and try to incorporate more active learning techniques.",
    
    [MoodType.Stressed]: "Start with a brief mindfulness exercise. Then focus on easier topics or reviewing familiar material to build confidence before moving to challenging content.",
    
    [MoodType.Confused]: "Let's focus on foundational concepts today. Try different learning methods like videos or diagrams to help clarify difficult topics.",
    
    [MoodType.Anxious]: "Break down your study session into smaller, more manageable chunks with frequent short breaks. Focus on review rather than new material.",
    
    [MoodType.Neutral]: "A balanced approach works well today. Mix review with new material and include a variety of subjects to maintain engagement.",
    
    [MoodType.Okay]: "You're in a steady state for learning. Balance new concepts with review and maintain regular breaks to sustain your energy.",
    
    [MoodType.Overwhelmed]: "Let's simplify today's plan. Focus on just 1-2 key topics, break them into smaller chunks, and celebrate each small win.",
    
    [MoodType.Curious]: "Great time to explore new concepts! Take advantage of your curiosity by diving into topics you're genuinely interested in.",
    
    [MoodType.Sad]: "Light review sessions might be best today. Be gentle with yourself, focus on small wins, and consider subjects you enjoy to lift your spirits.",
    
    [MoodType.Calm]: "Your calm state is perfect for methodical learning. This is a good time for detailed review and connecting ideas across subjects.",
    
    [MoodType.Bored]: "Try changing your study environment or approach. Gamify your learning or try a different format like videos, interactive quizzes, or group study."
  };
  
  return suggestions[mood] || "Select your current mood to receive personalized study suggestions.";
};

export const getMoodBasedTasks = (mood: MoodType, tasks: any[]): any[] => {
  if (!tasks || tasks.length === 0) return [];
  
  // Filter and prioritize tasks based on mood
  switch(mood) {
    case MoodType.Tired:
    case MoodType.Stressed:
    case MoodType.Anxious:
    case MoodType.Sad:
      // For low energy/negative moods, prioritize easier tasks and review
      return tasks
        .filter(t => t.difficulty !== 'high')
        .sort((a, b) => {
          // Prioritize review tasks first
          if (a.type === 'revision' && b.type !== 'revision') return -1;
          if (a.type !== 'revision' && b.type === 'revision') return 1;
          // Then by difficulty (easier first)
          if (a.difficulty === 'low' && b.difficulty !== 'low') return -1;
          if (a.difficulty !== 'low' && b.difficulty === 'low') return 1;
          return 0;
        })
        .slice(0, Math.min(tasks.length, 3)); // Reduce number of tasks
      
    case MoodType.Happy:
    case MoodType.Motivated:
    case MoodType.Curious:
      // For positive moods, include challenging tasks and new material
      return tasks
        .sort((a, b) => {
          // Prioritize new concepts
          if (a.type === 'concept' && b.type !== 'concept') return -1;
          if (a.type !== 'concept' && b.type === 'concept') return 1;
          // Then by difficulty (harder first)
          if (a.difficulty === 'high' && b.difficulty !== 'high') return -1;
          if (a.difficulty !== 'high' && b.difficulty === 'high') return 1;
          return 0;
        })
        .slice(0, Math.min(tasks.length, 5)); // Include more tasks
      
    case MoodType.Focused:
      // For focused mood, prioritize problem-solving and practice
      return tasks
        .sort((a, b) => {
          // Prioritize practice tasks
          if (a.type === 'practice' && b.type !== 'practice') return -1;
          if (a.type !== 'practice' && b.type === 'practice') return 1;
          // Then by difficulty (challenging first)
          if (a.difficulty === 'high' && b.difficulty !== 'high') return -1;
          if (a.difficulty !== 'high' && b.difficulty === 'high') return 1;
          return 0;
        })
        .slice(0, Math.min(tasks.length, 5));
      
    case MoodType.Overwhelmed:
      // For overwhelmed mood, drastically reduce tasks and focus on basics
      return tasks
        .filter(t => t.difficulty === 'low')
        .sort((a, b) => {
          // Prioritize fundamental concepts
          if (a.isFoundational && !b.isFoundational) return -1;
          if (!a.isFoundational && b.isFoundational) return 1;
          return 0;
        })
        .slice(0, Math.min(tasks.length, 2)); // Very few tasks
    
    case MoodType.Bored:
    case MoodType.Calm:
      // For bored or calm mood, provide variety and engaging content
      return tasks
        .sort((a, b) => {
          // Prioritize interactive content first
          if (a.isInteractive && !b.isInteractive) return -1;
          if (!a.isInteractive && b.isInteractive) return 1;
          return Math.random() - 0.5; // Randomize the rest to add variety
        })
        .slice(0, Math.min(tasks.length, 4));
      
    default:
      // For neutral/okay moods, balanced approach
      return tasks.slice(0, Math.min(tasks.length, 4)); // Standard number of tasks
  }
};
