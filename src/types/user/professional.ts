
// Adding the missing Professional user interfaces to ensure proper typing for all user profiles
import { BaseUserProfile, GoalType } from './base';
import { Goal } from '../user';

export interface ProfessionalProfile extends BaseUserProfile {
  // Common professional fields
  profileCompleted?: boolean;
  achievements?: string[];
  skills?: string[];
  languages?: string[];
  education?: Education[];
  certifications?: string[];
  goals?: Goal[]; // Added goals property
}

export interface EmployeeProfile extends ProfessionalProfile {
  jobTitle: string;
  industry: string;
  company: string;
  department: string;
  projectsCompleted: number;
  skillsAcquired: string[];
}

export interface DoctorProfile extends ProfessionalProfile {
  specialization: string;
  institution: string;
  patientsHelped: number;
  yearsOfExperience: number;
  publications: number;
  certifications: string[];
}

export interface FounderProfile extends ProfessionalProfile {
  startupName: string;
  startupStage: string;
  industry: string;
  teamSize: number;
  funding: string;
  challenges: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  description?: string;
}
