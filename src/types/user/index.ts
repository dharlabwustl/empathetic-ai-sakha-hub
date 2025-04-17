
// Re-export everything from the individual files
// Use specific exports to avoid duplicate exports and satisfy isolatedModules
export { 
  UserRoleEnum,
  SubscriptionTypeEnum
} from './base';

// Use export type for types
export type { 
  UserRole,
  MoodType,
  PersonalityType,
  UserBasicInfo,
  SubscriptionType,
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
