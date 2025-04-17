
// Re-export everything from the individual files
export * from './base';

// We need to be more selective with these exports to avoid name conflicts
export type {
  // Export from student.ts but not the StudentProfile (already in base.ts)
  SubjectProgress,
  TopicProgress,
  QuizScore,
  StudyHoursData,
  StudyStreak
} from './student';

export type {
  // Export from professional.ts but not the profiles (already in base.ts)
} from './professional';

export * from './exam';
export * from './onboarding';
