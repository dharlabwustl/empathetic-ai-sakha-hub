
import { UserProfileType } from './base';

export interface EmployeeProfile extends Omit<UserProfileType, 'role'> {
  role: "employee";
  jobTitle: string;
  workExperience: number;
  skills: string[];
  company?: string;
  industry?: string;
  careerGoal: string;
  projectsCompleted: number;
  trainingCompleted: number;
  experienceLevel?: string;
  skillsToGrow?: string[];
  productivityScore?: number;
}

export interface DoctorProfile extends Omit<UserProfileType, 'role'> {
  role: "doctor";
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
  researchPhase?: string;
  publicationsCount?: number;
}

export interface FounderProfile extends Omit<UserProfileType, 'role'> {
  role: "founder";
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
  mvpCompletion?: number;
  pitchDeckStatus?: number;
}
