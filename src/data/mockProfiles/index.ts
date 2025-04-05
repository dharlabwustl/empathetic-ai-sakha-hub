
import { mockStudentProfile } from './studentProfile';
import { mockEmployeeProfile } from './employeeProfile';
import { mockDoctorProfile } from './doctorProfile';
import { mockFounderProfile } from './founderProfile';
import { UserRole, UserProfileType } from '@/types/user';

export const getMockProfileByRole = (role: UserRole): UserProfileType => {
  switch (role) {
    case "Student":
      return mockStudentProfile;
    case "Employee":
      return mockEmployeeProfile;
    case "Doctor":
      return mockDoctorProfile;
    case "Founder":
      return mockFounderProfile;
    default:
      return mockStudentProfile;
  }
};

export {
  mockStudentProfile,
  mockEmployeeProfile,
  mockDoctorProfile,
  mockFounderProfile
};
