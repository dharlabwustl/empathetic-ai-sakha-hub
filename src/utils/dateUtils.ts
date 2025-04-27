
/**
 * Formats a date string into a human-readable format (e.g. "April 15, 2025")
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid date";
    
    // Format date as "Month Day, Year"
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

/**
 * Calculates the number of days between a date and today
 * @param dateString - ISO date string
 * @returns Number of days difference (positive if in future, negative if in past)
 */
export const calculateDaysDifference = (dateString: string): number => {
  if (!dateString) return 0;
  
  try {
    const date = new Date(dateString);
    const today = new Date();
    
    // Strip time components to compare dates only
    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Calculate difference in milliseconds and convert to days
    const diffInMs = dateWithoutTime.getTime() - todayWithoutTime.getTime();
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error("Error calculating date difference:", error);
    return 0;
  }
};

/**
 * Format time from a date object (e.g. "8:45 PM")
 * @param date - Date object
 * @returns Formatted time string
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Formats a date into relative time string (e.g. "2 hours ago", "yesterday")
 * @param dateString - ISO date string
 * @returns Relative time string
 */
export const formatRelativeTime = (dateString: string): string => {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 172800) {
      return "yesterday";
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2419200) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 29030400) {
      const months = Math.floor(diffInSeconds / 2419200);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 29030400);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "some time ago";
  }
};
