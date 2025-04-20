
import mockStudentProfile from "./studentProfile";

// Export the mockStudentProfile correctly
export {
  mockStudentProfile
};

// Add the helper function for getting mock profiles by role
export const getMockProfileByRole = (role: string) => {
  switch(role) {
    case 'student':
      return mockStudentProfile;
    default:
      return mockStudentProfile; // Fallback to student profile for now
  }
};
