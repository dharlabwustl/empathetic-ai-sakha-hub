
// Re-export everything from the individual files
// Note: We're being selective about exports from base.ts to avoid ambiguity
export type { 
  UserBasicInfo, 
  Goal,
  PersonalityType,
  UserProfileType
} from './base';
export { 
  UserRoleEnum, 
  SubscriptionTypeEnum,
  MoodType
} from './base';

// Export specific profile types from their respective files
export * from './exam';
export * from './student';
export * from './professional';
export * from './onboarding';

