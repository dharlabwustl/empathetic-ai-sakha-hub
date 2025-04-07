export type UserRole = "Student" | "Employee" | "Doctor" | "Founder";

export type SubscriptionType = "Free" | "Basic" | "Premium";

export type MoodType = "Happy" | "Okay" | "Sad" | "Focused" | "Tired" | "Overwhelmed" | "Motivated";

// Use string type for ExamGoal to resolve type issues
export type ExamGoal = 
  | "IIT JEE"
  | "NEET"
  | "MBA"
  | "CUET UG"
  | "UPSC"
  | "CLAT"
  | "BANK PO";

// Keep the detailed exam goal type as a separate interface
export interface ExamGoalDetails {
  id: string;
  name: string;
  description: string;
  commonExamDate: string;
  recommendedHours: number;
  subjects?: string[];
}

export type PersonalityType = 
  | "Analytical"
  | "Creative"
  | "Practical"
  | "Social"
  | "Strategic Thinker"
  | "Empathetic Learner"
  | "Creative Builder"
  | "Collaborative Leader"
  | "Analytical Problem Solver";

export interface UserProfileType {
  id: string;
  name: string;
  phoneNumber: string;
  role: UserRole;
  personalityType?: PersonalityType;
  goals?: Goal[];
  areasOfInterest?: Interest[];
  subscription: SubscriptionType;
  joinDate: string;
  lastActive: string;
  examPreparation?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
}

export interface Interest {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface StudentProfile extends UserProfileType {
  educationLevel: string;
  subjects: string[];
  studyStreak: number;
  quizzesTaken: number;
  flashcardsCreated: number;
  examPreparation: string;
  studyHoursToday: number;
  subjectsCovered: number;
  quizPerformance: number;
  mood: MoodType;
  syllabusCoverage: number;
  strongSubjects: string[];
  weakSubjects: string[];
  age?: number;
  location?: string;
  grade?: string;
}

export interface EmployeeProfile extends UserProfileType {
  jobTitle: string;
  workExperience: number;
  skills: string[];
  company?: string;
  industry?: string;
  careerGoal: string;
  projectsCompleted: number;
  trainingCompleted: number;
  experienceLevel?: string;
  skillsToGrow?: string[]; // Adding this property
}

export interface DoctorProfile extends UserProfileType {
  specialization: string;
  qualifications: string[];
  researchInterests: string[];
  publications: number;
  institution?: string;
  yearsOfPractice: number;
  certifications: string[];
  researchTopic?: string;
  thesisTitle?: string;
  clinicalInterest?: string;
  researchPhase?: string; // Adding this property
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
  startupStage?: string;
  startupGoal?: string;
  mvpCompletion?: number; // Adding this property
}

export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  lastWeekProgress: number;
  color: string;
  topics: TopicProgress[];
  quizScores: QuizScore[];
  studyHours: StudyHoursData[];
}

export interface TopicProgress {
  id: string;
  name: string;
  completed: boolean;
  masteryLevel: number;
  lastPracticed?: string;
}

export interface QuizScore {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  timeTaken: number;
}

export interface StudyHoursData {
  date: string;
  hours: number;
}

export interface StudyStreak {
  current: number;
  longest: number;
  thisWeek: number[];
  lastMonth: number[];
}

export interface OnboardingData {
  role: UserRole;
  age?: number;
  grade?: string;
  location?: string;
  examGoal?: string; // Changed from ExamGoal to string
  jobTitle?: string;
  experience?: string;
  industry?: string;
  skills?: string[];
  specialization?: string;
  institution?: string;
  researchTopic?: string;
  startupStage?: string;
  teamSize?: number;
  startupGoal?: string;
  personalityType?: PersonalityType;
  mood?: MoodType;
  sleepSchedule?: string;
  focusHours?: number;
  stressManagement?: string;
  breakRoutine?: string;
  interests?: string[];
  name?: string;
  phoneNumber?: string;
}

export interface StudyPlanSettings {
  examDate: string;
  dailyStudyHours: number;
  strongSubjects: string[];
  weakSubjects: string[];
  studyPace: "Aggressive" | "Balanced" | "Relaxed";
  preferredStudyTime: "Morning" | "Afternoon" | "Evening" | "Night";
}
