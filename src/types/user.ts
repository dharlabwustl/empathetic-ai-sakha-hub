
// This file re-exports all user-related types from the new modular structure
// We need to ensure UserRole and other key types are exported correctly

// Export everything from the modular index
export * from './user/index';

// Note: We've removed the duplicate exports that were causing the conflict
