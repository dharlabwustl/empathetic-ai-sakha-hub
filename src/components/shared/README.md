
# Shared Components Library

This directory contains reusable UI components that are used across multiple features in the application. These components are designed to be generic, customizable, and maintain consistent styling.

## Directory Structure

- **`actions/`**: Interactive elements like buttons and links
- **`card/`**: Card-based layouts and containers
- **`labels/`**: Text display components like badges, tags, and labels
- **`sections/`**: Layout components for page sections

## Usage Guidelines

1. **Component Naming**: Use descriptive names that indicate the purpose
2. **Props Interface**: Define clear props interfaces with JSDoc comments
3. **Default Props**: Set sensible defaults for optional props
4. **Variants**: Use variants for different visual styles rather than creating new components

## Example

```tsx
import { ProgressCard } from '@/components/shared/card/ProgressCard';
import { DifficultyBadge } from '@/components/shared/labels/DifficultyBadge';
import { StudyButton } from '@/components/shared/actions/StudyButton';

const MyComponent = () => {
  return (
    <ProgressCard progress={75}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium">Component Title</h3>
        <DifficultyBadge level="medium" />
      </div>
      
      <StudyButton label="Continue Learning" />
    </ProgressCard>
  );
};
```
