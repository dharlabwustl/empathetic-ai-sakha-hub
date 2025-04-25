
/**
 * Format a date as a string in the format "Apr 25"
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format date as "April 25, 2025"
 */
export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Get a date range for the current week
 * Returns an object with start and end dates
 */
export function getCurrentWeekDates(): { start: Date; end: Date } {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Calculate the date of Sunday (start of week)
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - dayOfWeek);
  
  // Calculate the date of Saturday (end of week)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  
  return { start: startDate, end: endDate };
}

/**
 * Format a date range as a string like "Apr 21-27"
 */
export function formatDateRange(start: Date, end: Date): string {
  const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
  
  if (startMonth === endMonth) {
    // Same month, format as "Apr 21-27"
    return `${startMonth} ${start.getDate()}-${end.getDate()}`;
  } else {
    // Different months, format as "Apr 28-May 4"
    return `${startMonth} ${start.getDate()}-${endMonth} ${end.getDate()}`;
  }
}

/**
 * Get the number of days between two dates
 */
export function getDaysBetween(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
  return diffDays;
}
