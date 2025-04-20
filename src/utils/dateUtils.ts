
import { format, differenceInDays, isToday, isYesterday, isThisWeek, isThisMonth } from 'date-fns';

// Format Utilities
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMM d, yyyy');
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMM d, yyyy h:mm a');
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'h:mm a');
};

// Time Difference Utilities
export const calculateDaysAgo = (timestamp: string | Date): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  
  const days = differenceInDays(new Date(), date);
  if (isThisWeek(date)) return `${days} days ago`;
  if (isThisMonth(date)) return format(date, 'MMM d');
  
  return format(date, 'MMM d, yyyy');
};

// Date Validation Utilities
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// Date Calculation Utilities
export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};

export const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Relative Time Utilities
export const getRelativeTimeString = (date: Date): string => {
  const now = new Date();
  const diffInDays = differenceInDays(now, date);

  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (isThisMonth(date)) return format(date, 'MMM d');
  
  return format(date, 'MMM d, yyyy');
};

