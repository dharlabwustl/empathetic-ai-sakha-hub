
import { mockStudentProfile } from "./studentProfile";
import { employeeProfile } from "./employeeProfile";
import doctorProfile from "./doctorProfile";
import { mockFounderProfile } from "./founderProfile";
import { UserRole, UserProfileType } from "@/types/user/base";

export const getMockProfileByRole = (role: UserRole): UserProfileType => {
  switch (role) {
    case UserRole.Student:
      return mockStudentProfile as UserProfileType;
    case UserRole.Employee:
      return employeeProfile as UserProfileType;
    case UserRole.Doctor:
      return doctorProfile as UserProfileType;
    case UserRole.Founder:
      return mockFounderProfile as UserProfileType;
    default:
      return mockStudentProfile as UserProfileType;
  }
};
