
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
};

const morningMessages = [
  "Good morning!",
  "Rise and shine!",
  "Hello, morning person!",
  "Top of the morning to you!",
  "Morning! Ready to learn?"
];

const afternoonMessages = [
  "Good afternoon!",
  "Having a productive day?",
  "Afternoon greetings!",
  "Hello there!",
  "Hope your day is going well!"
];

const eveningMessages = [
  "Good evening!",
  "Evening greetings!",
  "Hello there!",
  "Winding down for the day?",
  "Evening study session?"
];

const nightMessages = [
  "Working late?",
  "Night owl mode!",
  "Burning the midnight oil?",
  "Good evening!",
  "Late night study session?"
];

export const generateWelcomeMessage = (name?: string): string => {
  const timeOfDay = getTimeOfDay();
  let messages;
  
  switch (timeOfDay) {
    case 'morning':
      messages = morningMessages;
      break;
    case 'afternoon':
      messages = afternoonMessages;
      break;
    case 'evening':
      messages = eveningMessages;
      break;
    case 'night':
      messages = nightMessages;
      break;
  }
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  return name ? `${randomMessage} ${name}` : randomMessage;
};

export default {
  generateWelcomeMessage
};
