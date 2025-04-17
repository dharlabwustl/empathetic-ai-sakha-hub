
import { UserBasicInfo, UserRole } from "./base";

// Define professional user profiles with specific roles
export interface DoctorProfile extends UserBasicInfo {
  role: "doctor";
  specialization?: string;
  institution?: string;
  research?: string;
  subscription?: string;
  goals?: any[];
  examPreparation?: string;
}

export interface EmployeeProfile extends UserBasicInfo {
  role: "employee";
  jobRole?: string;
  seniorityLevel?: string;
  domain?: string;
  subscription?: string;
  goals?: any[];
  jobTitle?: string;
  industry?: string;
  examPreparation?: string;
}

export interface FounderProfile extends UserBasicInfo {
  role: "founder";
  startupStage?: string;
  teamSize?: number;
  industry?: string;
  subscription?: string;
  goals?: any[];
  startupName?: string;
  examPreparation?: string;
}
