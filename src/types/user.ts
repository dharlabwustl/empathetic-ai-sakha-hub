
// This file re-exports all user-related types from the new modular structure
// We need to ensure UserRole and other key types are exported correctly

export * from './user/index';

// Direct exports for backward compatibility to ensure critical types are available
export type { UserRole, SubscriptionType, MoodType } from './user/base';
export { UserRoleEnum as UserRole, SubscriptionTypeEnum as SubscriptionType } from './user/base';

