
import { UserProfileType } from './base';

export interface EmployeeProfile extends UserProfileType {
  department?: string;
  position?: string;
  employeeId?: string;
  hireDate?: string;
  manager?: string;
  teamMembers?: string[];
  skills?: {
    name: string;
    level: "beginner" | "intermediate" | "advanced" | "expert";
  }[];
  projects?: {
    id: string;
    name: string;
    role: string;
    startDate: string;
    endDate?: string;
    status: "active" | "completed" | "on-hold";
  }[];
  performanceMetrics?: {
    year: number;
    quarter: number;
    ratings: {
      productivity: number;
      quality: number;
      teamwork: number;
      leadership: number;
      overall: number;
    };
  }[];
}
