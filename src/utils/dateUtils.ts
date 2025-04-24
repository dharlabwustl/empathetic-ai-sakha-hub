
/**
 * Format date to display in a user-friendly format
 * @param date - Date object or string to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format time to display in a user-friendly format
 * @param date - Date object to format
 * @returns Formatted time string
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

/**
 * Get relative time (e.g. "2 days ago", "just now")
 * @param date - Date to compare
 * @returns Relative time string
 */
export const getRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSecs < 60) {
    return 'just now';
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateObj);
  }
};

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns Boolean indicating if date is today
 */
export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Get dates for current week (Sunday to Saturday)
 * @returns Object with weekStartDate and weekEndDate
 */
export const getCurrentWeekDates = (): { weekStartDate: Date, weekEndDate: Date } => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday
  
  // Calculate start of week (Sunday)
  const weekStartDate = new Date(now);
  weekStartDate.setDate(now.getDate() - dayOfWeek);
  weekStartDate.setHours(0, 0, 0, 0);
  
  // Calculate end of week (Saturday)
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 6);
  weekEndDate.setHours(23, 59, 59, 999);
  
  return { weekStartDate, weekEndDate };
};
