
# Routes Directory

This directory centralizes all routing configuration for the application, making it easier to understand the application structure at a high level.

## Files

- **`index.tsx`**: Main router configuration that combines all route groups
- **`studentRoutes.tsx`**: Routes specific to the student dashboard
- Other route groups can be added as needed

## Route Organization

Routes are organized hierarchically:

1. **Top-level routes** in `index.tsx` (public pages, authentication)
2. **Feature area routes** in separate files (student, admin)
3. **Feature-specific routes** in the respective feature folders

## Adding New Routes

When adding new routes:

1. For a new feature area, create a new route file in this directory
2. For a new route within an existing feature, add it to the feature's routes file
3. Make sure to import and include the new routes in the parent route file

## Best Practices

- Use lazy loading for route components to improve initial load performance
- Keep route paths consistent and descriptive
- Use route parameters (:id) for dynamic content
- Consider using nested routes for related views
