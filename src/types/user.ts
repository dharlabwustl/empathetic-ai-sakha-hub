
// This file re-exports all user-related types from the new modular structure
// We need to ensure UserRole and other key types are exported correctly

export * from './user/index';

// Direct exports for backward compatibility to ensure critical types are available
export { UserRole, UserRoleEnum, SubscriptionType, SubscriptionTypeEnum, MoodType } from './user/base';
