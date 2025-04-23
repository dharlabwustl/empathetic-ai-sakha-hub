
/**
 * Format date string to a readable format
 * @param dateString - ISO date string or any valid date string
 * @returns Formatted date string (e.g., "Apr 23, 2023")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Calculate days remaining until a given date
 * @param endDateString - ISO date string of the end date
 * @returns Number of days remaining, or 0 if the date is in the past
 */
export const daysRemaining = (endDateString: string): number => {
  if (!endDateString) return 0;
  
  try {
    const endDate = new Date(endDateString);
    const today = new Date();
    
    // Reset time to compare just the dates
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  } catch (error) {
    console.error('Error calculating days remaining:', error);
    return 0;
  }
};
