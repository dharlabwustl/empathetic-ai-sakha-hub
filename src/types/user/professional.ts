
import { UserProfileType } from './base';

export interface DoctorProfile extends UserProfileType {
  specialization: string;
  institution: string;
  patientsHelped: number;
  yearsOfExperience: number;
  publications: number;
  certifications: string[];
}

export interface EmployeeProfile extends UserProfileType {
  jobTitle: string;
  industry: string;
  company: string;
  department: string;
  projectsCompleted: number;
  skillsAcquired: string[];
}

export interface FounderProfile extends UserProfileType {
  startupName: string;
  startupStage: string;
  industry: string;
  teamSize: number;
  funding: string;
  challenges: string[];
}
