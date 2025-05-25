
export * from './base';
export * from './conceptCard';
export * from './studyPlan';

// Define standard event types for clarity in components
export type MouseClickEvent = React.MouseEvent<HTMLElement, MouseEvent>;

// Export UserProfileType from base for backwards compatibility
export type { UserProfileType } from './base';
