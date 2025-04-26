
import { BaseUserProfile, UserRole, SubscriptionType } from "./base";

export interface DoctorProfile extends BaseUserProfile {
  role: UserRole.Doctor;
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
}

export interface LawyerProfile extends BaseUserProfile {
  role: UserRole.Lawyer;
  specialization: string;
  firmName?: string;
  barAssociation: string;
  yearsOfPractice: number;
  casesHandled?: number;
  notableAchievements?: string[];
  publications?: string[];
}

export interface EngineerProfile extends BaseUserProfile {
  role: UserRole.Engineer;
  discipline: string;
  company?: string;
  projects?: string[];
  technologies: string[];
  certifications?: string[];
  patents?: number;
  publications?: string[];
}

export interface ProfessionalProfile extends BaseUserProfile {
  role: UserRole.Professional;
  industry: string;
  company?: string;
  position: string;
  yearsOfExperience: number;
  skills: string[];
  certifications?: string[];
}

export interface BusinessownerProfile extends BaseUserProfile {
  role: UserRole.Businessowner;
  businessName: string;
  industry: string;
  companySize: string;
  yearsInBusiness: number;
  location?: string;
  annualRevenue?: string;
}

export interface FounderProfile extends BaseUserProfile {
  role: UserRole.Founder;
  startupName: string;
  industry: string;
  fundingStage: string;
  teamSize: number;
  foundedYear: number;
  mission?: string;
}
