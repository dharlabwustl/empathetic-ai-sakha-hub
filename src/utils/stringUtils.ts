
/**
 * Gets the initials from a name string.
 * 
 * @param name The full name to extract initials from
 * @returns The initials (first letter of first name and first letter of last name)
 */
export function getInitials(name: string): string {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
