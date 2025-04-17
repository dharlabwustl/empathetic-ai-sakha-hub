import { UserProfileType, UserRole } from "@/types/user/base";
import { mockStudentProfile } from "./studentProfile";

export const getMockProfileByRole = (role: UserRole): UserProfileType => {
  switch (role) {
    case "student":
      return mockStudentProfile;
    // Add other role cases as needed
    default:
      return mockStudentProfile; // Default to student profile for now
  }
};
