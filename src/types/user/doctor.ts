
import { UserProfileType, UserRole } from "./base";

export interface DoctorProfile extends UserProfileType {
  role: UserRole.Doctor;
  hospitalName?: string;
  department?: string;
  yearsOfExperience?: number;
  patients?: number;
  consultationHours?: string;
  availableDays?: string[];
  certifications?: string[];
  specialization?: string; // Added for mock profile
}
