
import { UserProfileType } from "@/types/user";
import { UserRoleEnum } from "@/types/user/base";
import { mockStudentProfile } from "./studentProfile";
import { mockEmployeeProfile } from "./employeeProfile";
import { mockDoctorProfile } from "./doctorProfile";
import { mockFounderProfile } from "./founderProfile";

// Helper function to get profile by role
export function getMockProfileByRole(role: UserRoleEnum): UserProfileType {
  switch (role) {
    case UserRoleEnum.Student:
      return mockStudentProfile;
    case UserRoleEnum.Employee:
      return mockEmployeeProfile;
    case UserRoleEnum.Doctor:
      return mockDoctorProfile;
    case UserRoleEnum.Founder:
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
