
# Features Directory

This directory organizes the application by feature domains rather than by technical concerns. Each feature folder contains all the necessary components, hooks, utilities, and types for that specific feature.

## Directory Structure

- **`concepts/`**: All concept-related functionality
- **`flashcards/`**: Flashcard components and logic
- **`formula/`**: Formula practice lab features
- **`practice-exams/`**: Practice exam functionality

## Benefits of Feature-based Organization

1. **Easier to navigate**: Developers can find all related code in one place
2. **Better encapsulation**: Features are isolated from each other
3. **Improved maintainability**: Changes to one feature don't affect others
4. **Clearer dependencies**: Dependencies between features are explicit

## Adding a New Feature

When adding a new feature:

1. Create a new directory under `features/`
2. Include a routes.tsx file to define all routes for this feature
3. Export and import these routes in the main routing structure
4. Keep components, hooks, and other resources specific to this feature within its directory
