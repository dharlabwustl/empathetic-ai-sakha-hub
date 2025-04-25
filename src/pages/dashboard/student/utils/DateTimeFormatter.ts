
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};
