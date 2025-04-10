
export type UserRole = "Student" | "Employee" | "Doctor" | "Founder";
export type SubscriptionType = "Free" | "Basic" | "Premium" | "Enterprise";
export type MoodType = "Happy" | "Okay" | "Tired" | "Overwhelmed" | "Focused" | "Sad";
export type InterestLevel = "Beginner" | "Intermediate" | "Advanced";

export interface UserProfileType {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  imageUrl?: string;
  userType?: string;
  subscription: SubscriptionType;
  goals: Goal[];
  bio?: string;
  progress?: number;
  level?: number;
  points?: number;
  streakDays?: number;
  completedLessons?: number;
  personalityType?: string; // Personality type like "Strategic Thinker"
  focusDuration?: string; // E.g., "45 minutes with 15-minute breaks"
  studyPreference?: string; // E.g., "Visual learning with practical applications"
  mood?: {
    current: MoodType;
    history: Array<{ date: Date; mood: MoodType }>;
  };
  studyHabits?: {
    preferredTime?: string;
    focusDuration?: number;
    breakFrequency?: number;
  };
  
  // Added properties for compatibility with existing components
  role: UserRole;
  joinDate: string;
  lastActive: string;
  areasOfInterest: Array<{
    id: string;
    name: string;
    level: InterestLevel;
  }>;
  
  // Student-specific properties
  educationLevel?: string;
  examPreparation?: string;
  subjects?: string[];
  studyStreak?: number;
  quizzesTaken?: number;
  flashcardsCreated?: number;
  studyHoursToday?: number;
  subjectsCovered?: number;
  quizPerformance?: number;
  syllabusCoverage?: number;
  strongSubjects?: string[];
  weakSubjects?: string[];
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  dueDate?: string;
  progress: number;
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastStudied?: Date;
  totalTopics?: number;
  completedTopics?: number;
  expectedMastery?: string;
  
  // Added properties for compatibility
  lastWeekProgress?: number;
  color?: string;
  topics?: Array<{
    id: string;
    name: string;
    completed: boolean;
    masteryLevel: number;
    lastPracticed?: string;
  }>;
  quizScores?: Array<{
    id: string;
    title: string;
    score: number;
    maxScore: number;
    date: string;
    timeTaken: number;
  }>;
  studyHours?: Array<{
    date: string;
    hours: number;
  }>;
}

export interface StudyStreak {
  current?: number;
  longest?: number;
  lastUpdated: Date;
  
  // Added properties for compatibility
  thisWeek?: number[];
  lastMonth?: number[];
}

// Extended user profile interfaces
export interface StudentProfile extends UserProfileType {
  educationLevel: string;
  examPreparation: string;
  subjects: string[];
  studyStreak: number;
  quizzesTaken: number;
  flashcardsCreated: number;
  studyHoursToday: number;
  subjectsCovered: number;
  quizPerformance: number;
  syllabusCoverage: number;
  strongSubjects: string[];
  weakSubjects: string[];
  // Replace string mood with same structure as in UserProfileType
  mood: {
    current: MoodType;
    history: Array<{ date: Date; mood: MoodType }>;
  };
  phoneNumber?: string;
}

export interface EmployeeProfile extends UserProfileType {
  jobTitle: string;
  workExperience: number;
  skills: string[];
  company: string;
  industry: string;
  careerGoal: string;
  projectsCompleted: number;
  trainingCompleted: number;
  experienceLevel: string;
  skillsToGrow: string[];
  productivityScore: number;
  phoneNumber?: string;
}

export interface DoctorProfile extends UserProfileType {
  specialization: string;
  qualifications: string[];
  researchInterests: string[];
  publications: number;
  institution: string;
  yearsOfPractice: number;
  certifications: string[];
  researchTopic: string;
  thesisTitle: string;
  clinicalInterest: string;
  researchPhase: string;
  phoneNumber?: string;
}

export interface FounderProfile extends UserProfileType {
  startupName: string;
  industry: string;
  foundingYear: string;
  teamSize: number;
  funding: string;
  stage: string;
  mvpStatus: number;
  pitchDeckReady: boolean;
  startupStage: string;
  startupGoal: string;
  mvpCompletion: number;
  pitchDeckStatus: number;
  phoneNumber?: string;
}
