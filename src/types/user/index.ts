
// Re-export everything from the individual files
// Use specific exports to avoid duplicate exports
export {
  UserRole,
  UserRoleEnum,
  MoodType,
  PersonalityType,
  UserBasicInfo,
  SubscriptionType,
  SubscriptionTypeEnum,
  Goal,
  StudentProfile,
  ParentProfile,
  TeacherProfile,
  AdminProfile,
  EmployeeProfile,
  DoctorProfile,
  FounderProfile,
  UserProfile,
  UserProfileType
} from './base';

export * from './exam';
export * from './student';
export * from './professional';
export * from './onboarding';
