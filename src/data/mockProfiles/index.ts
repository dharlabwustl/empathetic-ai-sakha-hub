
import { UserProfileType, UserRoleEnum } from "@/types/user/base";
import { mockStudentProfile } from "./studentProfile";

export const getMockProfileByRole = (role: UserRoleEnum): UserProfileType => {
  switch (role) {
    case UserRoleEnum.Student:
      return mockStudentProfile;
    // Add other role cases as needed
    default:
      return mockStudentProfile; // Default to student profile for now
  }
};
