
export interface StudentData {
  id: string;
  name: string;
  email: string;
  joinedDate: Date | string;
  registrationDate?: Date | string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  examType?: string;
  subjects?: string[];
  examPrep?: string;
  lastActive?: Date | string;
  progress?: number;
  
  // Existing additional fields
  phoneNumber?: string;
  completedOnboarding?: boolean;
  goals?: string[];
  studyHours?: number;
  subjectsSelected?: string[];
  moodScore?: number;
  engagementScore?: number;
  
  // Adding the missing properties
  targetScore?: number;
  avatarUrl?: string;
  
  // Mood-related properties
  currentMood?: MoodType;
  moodHistory?: MoodHistoryEntry[];
  energyLevel?: number; // 1-10 scale for energy level
  consecutiveLowMoodDays?: number; // Track consecutive low mood days
}

// New types for mood tracking
export interface MoodHistoryEntry {
  mood: MoodType;
  timestamp: string;
  note?: string;
}

export type MoodType = 'motivated' | 'curious' | 'neutral' | 'tired' | 'stressed' | 'focused' | 'happy' | 'okay' | 'overwhelmed' | 'sad';
