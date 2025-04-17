
import { UserProfileType, UserRole } from "@/types/user";
import { mockStudentProfile } from "./studentProfile";
import { mockEmployeeProfile } from "./employeeProfile";
import { mockDoctorProfile } from "./doctorProfile";
import { mockFounderProfile } from "./founderProfile";

// Helper function to get profile by role
export function getMockProfileByRole(role: UserRole): UserProfileType {
  switch (role) {
    case "student":
      return mockStudentProfile;
    case "employee":
      return mockEmployeeProfile;
    case "doctor":
      return mockDoctorProfile;
    case "founder":
      return mockFounderProfile;
    default:
      return mockStudentProfile; // Default to student profile
  }
}

// Export all profiles
export const mockProfiles = {
  student: mockStudentProfile,
  employee: mockEmployeeProfile,
  doctor: mockDoctorProfile,
  founder: mockFounderProfile
};

export * from "./studentProfile";
export * from "./employeeProfile";
export * from "./doctorProfile";
export * from "./founderProfile";
