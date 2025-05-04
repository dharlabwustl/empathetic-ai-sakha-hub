
import { MoodType } from "@/types/user/base";

// Default settings for voice
export const DEFAULT_VOICE_SETTINGS = {
  enabled: true,
  muted: false,
  volume: 0.8,
  rate: 1.0,
  pitch: 1.0,
  voice: null,
  language: 'en-US'
};

// Language options
export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'Hindi' }
];

// Fix pronunciation for technical terms and names
export const fixPronunciation = (text: string) => {
  // Replace known difficult-to-pronounce terms
  return text
    .replace(/PREPZR/g, 'prep-zee-are')
    .replace(/NEET/g, 'neet')
    .replace(/JEE/g, 'J E E')
    .replace(/UPSC/g, 'U P S C');
};

// Find the best voice for the current language
export const findBestVoice = (language: string): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // First try to find a perfect match for the language
  let match = voices.find(v => v.lang === language);
  
  // If no perfect match, try partial match
  if (!match) {
    const langPrefix = language.split('-')[0];
    match = voices.find(v => v.lang.startsWith(`${langPrefix}-`));
  }
  
  // Default to any English voice if no match
  if (!match && language !== 'en-US') {
    match = voices.find(v => v.lang.startsWith('en-'));
  }
  
  // If still no match, just get the first voice
  return match || voices[0] || null;
};

// Function to speak a message
export const speakMessage = (text: string, settings = DEFAULT_VOICE_SETTINGS) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // Stop any ongoing speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(fixPronunciation(text));
  
  // Apply settings
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  
  // Find the best voice for the language
  const voice = settings.voice || findBestVoice(settings.language);
  if (voice) {
    utterance.voice = voice;
  }
  
  // Set the language
  utterance.lang = settings.language;
  
  // Add event listeners for speaking status
  utterance.onstart = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-started', { detail: { message: text } }));
    document.body.classList.add('voice-speaking');
  };
  
  utterance.onend = () => {
    document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
    document.body.classList.remove('voice-speaking');
  };
  
  // Start speaking
  window.speechSynthesis.speak(utterance);
};

// Function to get time-appropriate greeting
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

// Function to generate personalized greeting 
export const getGreeting = (
  name: string = "student", 
  mood?: string, 
  isFirstTimeUser: boolean = false
): string => {
  const timeGreeting = getTimeBasedGreeting();
  
  if (isFirstTimeUser) {
    return `${timeGreeting} and welcome to PREPZR, ${name}! I'm your AI assistant and I'm here to help you navigate through our platform. PREPZR is designed to help you excel in your exams with personalized study plans, concept cards, and practice tests. Feel free to ask me about any feature or if you need help with your studies.`;
  }
  
  // Regular greeting for returning users
  const baseGreeting = `${timeGreeting}, ${name}! `;
  
  if (mood === "Motivated") {
    return `${baseGreeting}I see you're feeling motivated today! That's great. Let's make the most of your study session.`;
  } else if (mood === "Tired") {
    return `${baseGreeting}I notice you're feeling tired. Would you like me to suggest a shorter, more focused study session today?`;
  } else if (mood === "Confused") {
    return `${baseGreeting}I see you're feeling a bit confused. Let me help you find the right resources to clear things up.`;
  } else if (mood === "Stressed") {
    return `${baseGreeting}I can see you're feeling stressed. Remember to take breaks, and let's focus on priorities today.`;
  }
  
  return `${baseGreeting}How may I assist you with your studies today?`;
};

// Function to get motivational messages
export const getMotivationalMessage = (): string => {
  const messages = [
    "Remember, consistency is key to success in your exam preparation.",
    "Small progress each day adds up to big results.",
    "Your hard work today will pay off tomorrow.",
    "Every hour of focused study brings you closer to your goal.",
    "Don't compare your progress with others. Focus on your own journey.",
    "Believe in yourself. You've got this!",
    "Today's effort determines tomorrow's results.",
    "Success comes from persistence and determination.",
    "The harder you work, the luckier you get in exams.",
    "Your future is created by what you do today, not tomorrow."
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

// Knowledge base for voice assistant about different features
export const featureDescriptions: Record<string, string> = {
  dashboard: "The dashboard gives you an overview of your study progress, upcoming tasks, and personalized recommendations.",
  
  today: "Today's Plan shows your scheduled study sessions, practice tests, and assignments for today.",
  
  tutor: "The 24/7 AI Tutor can answer your questions on any subject, explain concepts, and help solve problems at any time.",
  
  academic: "The Academic Advisor helps you create and manage study plans based on your exam goals and learning preferences.",
  
  concepts: "Concept Cards provide detailed explanations of key topics across all subjects in your curriculum.",
  
  flashcards: "Flashcards help you memorize important facts and information through spaced repetition and active recall.",
  
  "practice-exam": "Practice Exams let you test your knowledge with timed tests that simulate real exam conditions.",
  
  "feel-good-corner": "The Feel Good Corner offers stress-relief activities, motivational content, and mental health resources.",
  
  notifications: "Notifications keep you updated about upcoming deadlines, new content, and important reminders.",
  
  "study-plan": "Study Plans help you organize your preparation with subject-wise schedules and track your progress over time.",
  
  profile: "Your Profile page lets you update your personal information, preferences, and account settings.",
  
  // Additional detailed descriptions for enhanced understanding
  "subject-physics": "Physics covers mechanics, thermodynamics, electromagnetism, optics, and modern physics. You can find practice problems and concept explanations in the Concept Cards section.",
  
  "subject-chemistry": "Chemistry includes organic, inorganic, and physical chemistry. You'll find reaction mechanisms, periodic table patterns, and chemical calculations in the related resources.",
  
  "subject-biology": "Biology covers cell biology, human physiology, genetics, ecology, and more. Detailed diagrams and explanations are available in the Concept Cards section.",
  
  "subject-mathematics": "Mathematics includes algebra, calculus, trigonometry, coordinate geometry, and statistics. Practice problems with step-by-step solutions are available in the Practice section.",
  
  "tools-calculator": "The scientific calculator can be accessed from the Tools menu and includes all functions needed for your exam calculations.",
  
  "tools-formula-sheet": "The formula sheet contains all important equations and formulas for quick reference during your study sessions.",
  
  "tools-periodic-table": "The interactive periodic table provides detailed information about elements and their properties.",
};

// Additional information about exam goals
export const examGoalInfo: Record<string, string> = {
  "NEET": "NEET (National Eligibility cum Entrance Test) is for admission to medical colleges in India. Focus on Biology (50%), Chemistry (25%), and Physics (25%).",
  
  "JEE": "JEE (Joint Entrance Examination) is for admission to engineering colleges in India. Focus on Mathematics, Physics, and Chemistry equally.",
  
  "UPSC": "UPSC Civil Services Examination has three stages: Prelims, Mains, and Interview. Focus on General Studies, Current Affairs, and optional subjects.",
  
  "CAT": "Common Admission Test (CAT) is for admission to top management institutes. Focus on Quantitative Aptitude, Verbal Ability, and Logical Reasoning.",
  
  "GATE": "Graduate Aptitude Test in Engineering (GATE) is for admission to postgraduate engineering programs. Focus on your engineering discipline and general aptitude."
};

// Function to get information about a specific feature
export const getFeatureInfo = (featureId: string): string => {
  // First check if it's a subject-specific query
  if (featureId.startsWith("subject-")) {
    const info = featureDescriptions[featureId.toLowerCase()];
    if (info) return info;
  }
  
  // Check if it's an exam goal query
  if (featureId.toUpperCase() in examGoalInfo) {
    return examGoalInfo[featureId.toUpperCase()];
  }
  
  // Check regular features
  const info = featureDescriptions[featureId.toLowerCase()];
  if (info) {
    return info;
  }
  
  return "I don't have specific information about this feature, but I can help you navigate through it or answer any questions you have.";
};

// Study plan explanations
export const studyPlanTips: Record<string, string> = {
  "create": "To create a study plan, go to Academic Advisor and click 'Create New Plan'. You'll define subjects, prioritize topics, and set your study schedule.",
  
  "view": "You can view your active study plans in the Academic Advisor section. Click on any plan card to see detailed information and progress.",
  
  "update": "To update your study plan, open the plan details and click 'Edit Plan'. You can modify subjects, hours, and priorities.",
  
  "track": "Progress tracking happens automatically as you complete study sessions and practice tests. Check your dashboard for a visual representation.",
  
  "optimize": "PREPZR will suggest optimizations to your study plan based on your performance in practice tests and time spent on different topics."
};

// Handle voice commands and questions
export const handleVoiceCommand = (command: string): string => {
  const lowerCommand = command.toLowerCase();
  
  // Navigation commands
  if (lowerCommand.includes("go to") || lowerCommand.includes("open") || lowerCommand.includes("show") || lowerCommand.includes("navigate")) {
    for (const [feature, description] of Object.entries(featureDescriptions)) {
      if (lowerCommand.includes(feature)) {
        return `Opening the ${feature} page. ${description}`;
      }
    }
  }
  
  // Information requests about features
  if (lowerCommand.includes("what is") || lowerCommand.includes("tell me about") || lowerCommand.includes("explain")) {
    // Check if asking about subjects
    if (lowerCommand.includes("physics") || lowerCommand.includes("chemistry") || lowerCommand.includes("biology") || lowerCommand.includes("mathematics") || lowerCommand.includes("math")) {
      for (const subject of ["physics", "chemistry", "biology", "mathematics"]) {
        if (lowerCommand.includes(subject)) {
          return getFeatureInfo(`subject-${subject}`);
        }
      }
    }
    
    // Check if asking about exam goals
    for (const exam of Object.keys(examGoalInfo)) {
      if (lowerCommand.includes(exam.toLowerCase())) {
        return examGoalInfo[exam];
      }
    }
    
    // Check if asking about features
    for (const [feature, description] of Object.entries(featureDescriptions)) {
      if (lowerCommand.includes(feature)) {
        return description;
      }
    }
  }
  
  // Study plan related questions
  if (lowerCommand.includes("study plan") || lowerCommand.includes("academic advisor")) {
    for (const [action, tip] of Object.entries(studyPlanTips)) {
      if (lowerCommand.includes(action)) {
        return tip;
      }
    }
    
    return "The Academic Advisor section helps you create and manage personalized study plans based on your exam goals, strengths, and weaknesses. Would you like to know more about creating or updating your study plan?";
  }
  
  // Help requests
  if (lowerCommand.includes("help") || lowerCommand.includes("how to")) {
    if (lowerCommand.includes("study plan") || lowerCommand.includes("create plan")) {
      return "To create a study plan, go to the Academic Advisor section and click on 'Create New Plan'. You'll be guided through steps to set up a personalized study schedule.";
    }
    
    if (lowerCommand.includes("practice") || lowerCommand.includes("exam")) {
      return "To take a practice exam, navigate to the Practice Exams section, select an exam from the available options, and click 'Start Exam'.";
    }
    
    if (lowerCommand.includes("flashcard")) {
      return "To use flashcards, go to the Flashcards section, select a deck, and begin your practice session. You can mark cards as known or unknown to track your progress.";
    }
    
    if (lowerCommand.includes("concept") || lowerCommand.includes("card")) {
      return "Concept Cards provide detailed explanations of key topics. Navigate to the Concept Cards section, browse by subject or search for a specific topic, and click on a card to view its content.";
    }
    
    return "I'm here to help! You can ask me about any feature in PREPZR, how to use specific tools, or get information about your study plan and progress.";
  }
  
  // Default response
  return "I'm here to help you navigate through PREPZR and assist with your studies. You can ask me about any feature or how to perform specific tasks.";
};
