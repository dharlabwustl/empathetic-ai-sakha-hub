
export * from './base';
export * from './conceptCard';
export * from './studyPlan';

// Define standard event types for clarity in components
export type MouseClickEvent = React.MouseEvent<HTMLElement, MouseEvent>;

// Export UserProfileType for backward compatibility
export type { UserProfile as UserProfileType } from './base';
