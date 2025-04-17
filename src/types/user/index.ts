
// Re-export everything from the individual files
export type { 
  UserBasicInfo, 
  Goal,
  PersonalityType,
  UserProfileType
} from './base';

// Export enums that can be used as values
export { 
  UserRoleEnum, 
  SubscriptionTypeEnum,
  MoodType
} from './base';

// Export user role and subscription types properly
export type { UserRole, SubscriptionType } from './base';

// Export specific profile types from their respective files
export * from './exam';
export * from './student';
export * from './professional';
export * from './onboarding';
