import { MoodType } from '@/types/user/base';
import { VoiceSettings } from '@/types/voice';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 1.0,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-US',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

// Language options for voice assistant
export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-IN', label: 'English (Indian)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'hi-IN', label: 'Hindi' }
];

// Fix pronunciation issues for specific words
export const fixPronunciation = (text: string): string => {
  // Fix PREPZR pronunciation to sound like "prep-zer"
  return text.replace(/PREPZR/g, "prep-zer");
};

// Find the best voice for a given language
export const findBestVoice = (language: string = 'en-US'): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  
  const voices = window.speechSynthesis.getVoices();
  
  // First try to find exact language match
  let voice = voices.find(v => v.lang === language);
  
  // If no exact match, try to find a voice that starts with the language code
  if (!voice) {
    const langPrefix = language.split('-')[0];
    voice = voices.find(v => v.lang.startsWith(langPrefix));
  }
  
  // If still no match, return first available voice or null
  return voice || voices[0] || null;
};

// Helper function to speak a message with given settings
export const speakMessage = (message: string, settings?: VoiceSettings): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // Dispatch custom event for tracking speech status
  const startEvent = new CustomEvent('voice-speaking-started', {
    detail: { message }
  });
  document.dispatchEvent(startEvent);

  // Fix pronunciation
  const processedMessage = fixPronunciation(message);
  
  const utterance = new SpeechSynthesisUtterance(processedMessage);
  
  // Apply voice settings
  if (settings) {
    utterance.volume = settings.volume;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.lang = settings.language;
    
    // Find and set appropriate voice if available
    if (window.speechSynthesis.getVoices().length > 0) {
      // If user has selected a voice, use it
      if (settings.voice) {
        utterance.voice = settings.voice;
      } else {
        // Otherwise find best voice for selected language
        const bestVoice = findBestVoice(settings.language);
        if (bestVoice) utterance.voice = bestVoice;
      }
    }
  }
  
  // Handle speech end event
  utterance.onend = () => {
    const endEvent = new CustomEvent('voice-speaking-ended');
    document.dispatchEvent(endEvent);
  };
  
  // Speak the message
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  window.speechSynthesis.speak(utterance);
};

// Database of smart suggestions for different contexts
export const SMART_SUGGESTIONS = {
  // Exam-specific tips
  examTips: {
    NEET: [
      "For NEET preparation, practice at least 50 MCQs daily across Physics, Chemistry, and Biology.",
      "NEET Biology carries maximum weightage with 90 questions. Make sure to master NCERT texts thoroughly.",
      "For NEET Chemistry, focus on Physical Chemistry calculations and Organic Chemistry reactions.",
      "In NEET Physics, mechanics and electricity questions appear frequently. Master these concepts first.",
      "In the NEET exam, there's no negative marking for unattempted questions, but -1 for incorrect answers."
    ],
    "IIT-JEE": [
      "For JEE, practice solving complex problems within time constraints to improve speed and accuracy.",
      "Focus on building a strong foundation in Mathematics as it forms the backbone of JEE preparation.",
      "In JEE Advanced, questions often combine multiple concepts. Practice integrated problem solving.",
      "Physical Chemistry and Organic Chemistry have high weightage in JEE. Focus on reaction mechanisms.",
      "Vector algebra and calculus consistently appear in JEE Mathematics. Master these topics early."
    ],
    UPSC: [
      "For UPSC, reading newspapers daily helps build current affairs knowledge essential for the exam.",
      "Create concise notes for revision as the UPSC syllabus is vast and requires multiple revisions.",
      "Practice answer writing for UPSC Mains by timing yourself to improve articulation and presentation.",
      "For UPSC, focus on Indian polity, economics, geography, and history as they have high weightage.",
      "Develop a multidisciplinary approach for UPSC, connecting topics across subjects for better understanding."
    ],
    General: [
      "Space your study sessions. Distributed practice is more effective than cramming.",
      "Use the Feynman Technique: explain concepts in simple terms to identify gaps in your understanding.",
      "Take regular breaks using the Pomodoro Technique - 25 minutes of focus followed by a 5-minute break.",
      "Create mind maps to visualize connections between related concepts.",
      "Self-testing through practice questions is more effective than passive re-reading of notes."
    ]
  },
  
  // Memory and recall improvement tips
  recallTips: [
    "Use spaced repetition to review concepts at increasing intervals for better long-term memory.",
    "Create associations between new information and things you already know to improve recall.",
    "Teach the concept to someone else or explain it out loud to strengthen your understanding.",
    "Use mnemonic devices like acronyms or memory palaces for remembering complex information.",
    "Writing by hand activates different parts of your brain than typing, improving memory retention.",
    "Convert abstract concepts into visual representations to leverage visual memory.",
    "Connect new information to personal experiences to make it more meaningful and memorable.",
    "Summarize key points in your own words immediately after learning to reinforce understanding.",
    "Regular physical exercise improves brain function and memory consolidation.",
    "Get adequate sleep as memory consolidation happens during deep sleep phases."
  ],
  
  // Subject-specific strategies
  subjectTips: {
    Physics: [
      "In Physics, solve numerical problems regularly to build intuition about formulas and concepts.",
      "Create concept maps to visualize relationships between different physics principles.",
      "For mechanics problems, always draw a free body diagram to visualize forces acting on objects.",
      "Remember that most physics concepts build on earlier ones - ensure your fundamentals are strong.",
      "Practice deriving equations rather than memorizing them to understand the underlying principles."
    ],
    Chemistry: [
      "In Organic Chemistry, focus on reaction mechanisms rather than memorizing individual reactions.",
      "For Physical Chemistry, practice numerical problems regularly to build problem-solving skills.",
      "Create flowcharts for classification of organic compounds and their reactions.",
      "Use color-coding in your notes to distinguish between different types of reactions or concepts.",
      "When studying periodic trends, understand the underlying electron configuration principles."
    ],
    Biology: [
      "Create diagrams and flowcharts for complex biological processes like photosynthesis or respiration.",
      "Use flashcards for terminology, taxonomic classifications, and anatomical structures.",
      "Connect biological concepts to real-world examples to improve understanding and recall.",
      "Focus on understanding cellular processes at the molecular level rather than rote memorization.",
      "Practice drawing and labeling diagrams regularly for better visual memory."
    ],
    Mathematics: [
      "Practice is key in mathematics. Solve a variety of problems for each concept.",
      "Focus on understanding the derivation of formulas rather than memorizing them.",
      "When stuck on a problem, try working backward from the solution or use alternative approaches.",
      "Keep a log of common mistakes you make to avoid repeating them in future problems.",
      "Master the fundamentals before moving to advanced topics, as mathematics builds hierarchically."
    ]
  },
  
  // Mood-based study strategies
  moodBasedTips: {
    [MoodType.Anxious]: [
      "If you're feeling anxious, try the 4-7-8 breathing technique before continuing your study session.",
      "Break down your study material into smaller, manageable chunks when feeling overwhelmed.",
      "Set realistic goals for your anxious days - even small progress is still progress.",
      "Try body scanning meditation for 5 minutes when anxiety interferes with your concentration.",
      "Remember that test anxiety is common - practice under exam-like conditions to build confidence."
    ],
    [MoodType.Tired]: [
      "When tired, focus on reviewing familiar content rather than learning new concepts.",
      "Take a 15-minute power nap to refresh your mind before continuing studies.",
      "Switch to a different subject or activity to maintain engagement when feeling fatigued.",
      "Ensure proper hydration and consider a light healthy snack to boost your energy.",
      "Try a quick 5-minute physical activity to increase blood flow and reduce fatigue."
    ],
    [MoodType.Focused]: [
      "While you're focused, tackle your most challenging topics or complex problems.",
      "Use this focused state to create summary notes that will help during future reviews.",
      "Set slightly more ambitious goals during your focused study sessions.",
      "Consider using the Pomodoro technique to maintain this focused state for longer.",
      "Document your current study approach to replicate these focused conditions in future sessions."
    ],
    [MoodType.Motivated]: [
      "Channel your motivation into creating a detailed study plan for the coming days.",
      "Set challenging but achievable goals to maintain your momentum.",
      "Try teaching difficult concepts to someone else while you're feeling motivated.",
      "Use this motivated state to push through topics you've been avoiding.",
      "Record a motivational message to your future self for days when motivation is low."
    ],
    [MoodType.Stressed]: [
      "When stressed, focus on understanding rather than memorizing to reduce pressure.",
      "Take structured breaks with mindfulness exercises to reduce stress levels.",
      "Consider adjusting your study environment to create a calmer atmosphere.",
      "Identify specific stress triggers and address them directly in your study routine.",
      "Focus on progress rather than perfection to reduce unnecessary pressure."
    ],
    [MoodType.Sad]: [
      "Start with subjects you enjoy when feeling sad to build positive momentum.",
      "Consider studying in a brighter environment or with background music to improve mood.",
      "Set smaller, achievable goals to create wins that can boost your mood.",
      "Connect with study partners or online communities for social support.",
      "Practice gratitude journaling about your learning progress before studying."
    ]
  },
  
  // Time management strategies
  timeManagement: [
    "Use the 80/20 principle - identify the 20% of topics that will give you 80% of results.",
    "Schedule specific subjects for times of day when your energy levels match the subject difficulty.",
    "Block digital distractions during study sessions using apps or browser extensions.",
    "Create a reverse calendar from your exam date to plan your preparation timeline.",
    "Set smaller deadlines leading up to major exams to prevent last-minute cramming.",
    "Try timeboxing - allocate fixed time periods to specific tasks and move on when time is up.",
    "Use interleaving - alternate between different subjects or topics for more effective learning.",
    "Review your productivity regularly and adjust your study schedule based on performance data."
  ],
  
  // Exam-day strategies
  examDayTips: [
    "Read the full question paper first and plan your time allocation for each section.",
    "Start with questions you're confident about to build momentum and reduce anxiety.",
    "For multiple-choice questions, eliminate obviously wrong answers before selecting the best option.",
    "Double-check your calculations and review your answers if time permits.",
    "For essay questions, create a quick outline before writing to organize your thoughts.",
    "Watch the clock and leave time to transfer answers to the official answer sheet if needed.",
    "If stuck on a question, mark it and move on rather than wasting valuable time.",
    "Take deep breaths if feeling anxious during the exam to regulate your nervous system."
  ],
  
  // General study motivation
  motivationalQuotes: [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The difference between ordinary and extraordinary is that little 'extra'.",
    "Don't watch the clock; do what it does. Keep going.",
    "Your future is created by what you do today, not tomorrow.",
    "The expert in anything was once a beginner.",
    "The only way to learn is by doing. There is no substitute for hard work.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Don't wish it were easier. Wish you were better.",
    "Learning is never done without errors and defeat.",
    "The best way to predict your future is to create it."
  ]
};

// Function to get contextually relevant suggestions based on current activity
export const getSmartSuggestion = (
  context: {
    activity?: 'studying' | 'exam_prep' | 'revision' | 'break' | 'practice_test';
    subject?: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics' | 'General';
    examType?: 'NEET' | 'IIT-JEE' | 'UPSC' | 'General';
    mood?: MoodType;
    timeUntilExam?: number; // days
    currentStreak?: number; // consecutive days studied
    lastActivity?: string;
  }
): string => {
  const suggestions: string[] = [];
  
  // Add exam-specific tips
  if (context.examType) {
    const examTips = context.examType === 'NEET' || context.examType === 'IIT-JEE' || context.examType === 'UPSC' 
      ? SMART_SUGGESTIONS.examTips[context.examType]
      : SMART_SUGGESTIONS.examTips.General;
      
    suggestions.push(...examTips);
  }
  
  // Add mood-based tips if mood is provided
  if (context.mood && SMART_SUGGESTIONS.moodBasedTips[context.mood]) {
    suggestions.push(...SMART_SUGGESTIONS.moodBasedTips[context.mood]);
  }
  
  // Add subject-specific tips if subject is provided
  if (context.subject && context.subject in SMART_SUGGESTIONS.subjectTips) {
    suggestions.push(...SMART_SUGGESTIONS.subjectTips[context.subject as keyof typeof SMART_SUGGESTIONS.subjectTips]);
  }
  
  // Add recall tips for revision activities
  if (context.activity === 'revision') {
    suggestions.push(...SMART_SUGGESTIONS.recallTips);
  }
  
  // Add exam day tips for practice tests or if exam is very soon
  if (context.activity === 'practice_test' || (context.timeUntilExam && context.timeUntilExam <= 7)) {
    suggestions.push(...SMART_SUGGESTIONS.examDayTips);
  }
  
  // Add time management tips
  suggestions.push(...SMART_SUGGESTIONS.timeManagement);
  
  // Add motivational quotes, especially for maintaining streaks
  if (context.currentStreak && context.currentStreak > 3) {
    suggestions.push(...SMART_SUGGESTIONS.motivationalQuotes);
  }
  
  // Return a random suggestion from the compiled list
  return suggestions.length > 0 
    ? suggestions[Math.floor(Math.random() * suggestions.length)]
    : "Keep up your consistent study habits to achieve your exam goals!";
};

// Function to announce a smart suggestion based on current context
export const announceSmartSuggestion = (
  context: {
    activity?: 'studying' | 'exam_prep' | 'revision' | 'break' | 'practice_test';
    subject?: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics' | 'General';
    examType?: 'NEET' | 'IIT-JEE' | 'UPSC' | 'General';
    mood?: MoodType;
    timeUntilExam?: number; // days
    currentStreak?: number; // consecutive days studied
    lastActivity?: string;
  },
  settings?: VoiceSettings
): string => {
  const suggestion = getSmartSuggestion(context);
  
  // Speak the suggestion
  speakMessage(suggestion, settings || DEFAULT_VOICE_SETTINGS);
  
  return suggestion;
};

// Get appropriate greeting based on time of day, user's name, and mood
export const getGreeting = (userName?: string, mood?: string, isFirstTime?: boolean): string => {
  const hour = new Date().getHours();
  const language = localStorage.getItem('voiceAssistantLanguage') || 'en-IN';
  
  if (language === 'hi-IN') {
    let timeGreeting = "नमस्ते";
    
    if (hour < 12) timeGreeting = "सुप्रभात";
    else if (hour < 17) timeGreeting = "शुभ दोपहर";
    else timeGreeting = "शुभ संध्या";
    
    const name = userName ? `, ${userName}` : '';
    
    if (isFirstTime) {
      return `${timeGreeting}${name}! PREPZR में आपका स्वागत है। मैं आपका आवाज़ सहायक हूँ। मैं आपको प्लेटफॉर्म में नेविगेट करने, प्रश्नों का उत्तर देने और अध्ययन सुझाव प्रदान करने में मदद कर सकता हूँ।`;
    }
    
    // General greeting in Hindi
    return `${timeGreeting}${name}! मैं आज आपकी पढ़ाई में कैसे मदद कर सकता हूँ?`;
  } else {
    // English greeting (keep existing code)
    let timeGreeting = "Hello";
    
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 17) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    
    const name = userName ? `, ${userName}` : '';
    
    if (isFirstTime) {
      return `${timeGreeting}${name}! Welcome to PREPZR. I'm your voice assistant. I can help you navigate the platform, answer questions, and provide study recommendations.`;
    }
    
    // General greeting
    return `${timeGreeting}${name}! How can I help you with your studies today?`;
  }
};

// Get announcement for pending tasks and reminders
export const getReminderAnnouncement = (pendingTasks: Array<{title: string, due?: string}> = []): string => {
  const language = localStorage.getItem('voiceAssistantLanguage') || 'en-IN';
  
  if (language === 'hi-IN') {
    if (pendingTasks.length === 0) {
      return "आज आपका कोई बकाया कार्य नहीं है। अपने काम पर नज़र रखने के लिए बहुत अच्छा!";
    }
    
    const taskCount = pendingTasks.length;
    let announcement = `आपके पास ${taskCount} बकाया कार्य ${taskCount === 1 ? 'है' : 'हैं'}। `;
    
    if (taskCount <= 3) {
      // List the tasks if there are only a few
      announcement += "इनमें शामिल हैं: ";
      pendingTasks.forEach((task, index) => {
        if (index > 0) {
          announcement += (index === taskCount - 1) ? " और " : ", ";
        }
        announcement += task.title;
        if (task.due) {
          announcement += ` जिसकी नियत तारीख ${task.due} है`;
        }
      });
    } else {
      // Just mention the first couple if there are many
      announcement += `जिनमें ${pendingTasks[0].title} और ${pendingTasks[1].title}, और अन्य शामिल हैं।`;
    }
    
    return announcement;
  } else {
    // English version (keep existing code)
    if (pendingTasks.length === 0) {
      return "You have no pending tasks for today. Great job staying on top of your work!";
    }
    
    const taskCount = pendingTasks.length;
    let announcement = `You have ${taskCount} ${taskCount === 1 ? 'task' : 'tasks'} pending. `;
    
    if (taskCount <= 3) {
      // List the tasks if there are only a few
      announcement += "These include: ";
      pendingTasks.forEach((task, index) => {
        if (index > 0) {
          announcement += (index === taskCount - 1) ? " and " : ", ";
        }
        announcement += task.title;
        if (task.due) {
          announcement += ` due ${task.due}`;
        }
      });
    } else {
      // Just mention the first couple if there are many
      announcement += `Including ${pendingTasks[0].title} and ${pendingTasks[1].title}, among others.`;
    }
    
    return announcement;
  }
};

// Get motivational message based on context
export const getMotivationalMessage = (examGoal?: string): string => {
  const language = localStorage.getItem('voiceAssistantLanguage') || 'en-IN';
  
  if (language === 'hi-IN') {
    const messages = [
      "याद रखें, लगातार अध्ययन सफलता की ओर ले जाता है। आप बहुत अच्छा कर रहे हैं!",
      "छोटे दैनिक सुधार समय के साथ उत्कृष्ट परिणाम लाते हैं।",
      "हर अध्ययन सत्र आपको अपने लक्ष्य के एक कदम और करीब लाता है।",
      "सफलता छोटे प्रयासों का योग है जो दिन-प्रतिदिन दोहराए जाते हैं।",
      "आपका भविष्य का स्वरूप आज आप जो कड़ी मेहनत कर रहे हैं उसके लिए आपका धन्यवाद करेगा।"
    ];
    
    // Exam-specific motivational messages in Hindi
    const examSpecificMessages: Record<string, string[]> = {
      'NEET': [
        "अपनी NEET की तैयारी पर ध्यान केंद्रित रखें। आपकी मेहनत रंग लाएगी!",
        "NEET परीक्षा के लिए लगातार अभ्यास की आवश्यकता है। आप सही रास्ते पर हैं!",
        "आपकी NEET की यात्रा एक स्प्रिंट नहीं, मैराथन है। प्रतिदिन अपने ज्ञान को बढ़ाते रहें।"
      ],
      'JEE': [
        "JEE की तैयारी के लिए दृढ़ता की आवश्यकता है। आप इसे कर सकते हैं!",
        "हर JEE समस्या जिसे आप हल करते हैं, आपकी समझ को मजबूत बनाती है।",
        "आपकी JEE सफलता की कहानी हर अध्ययन सत्र के साथ लिखी जा रही है।"
      ]
    };
    
    // If we have an exam goal and specific messages for it, include them in the possible messages
    let possibleMessages = [...messages];
    if (examGoal && examSpecificMessages[examGoal]) {
      possibleMessages = [...possibleMessages, ...examSpecificMessages[examGoal]];
    }
    
    // Return a random message
    return possibleMessages[Math.floor(Math.random() * possibleMessages.length)];
  } else {
    // English version (keep existing code)
    const messages = [
      "Remember, consistent study leads to success. You're doing great!",
      "Small daily improvements lead to outstanding results over time.",
      "Every study session brings you one step closer to your goal.",
      "Success is the sum of small efforts repeated day in and day out.",
      "Your future self will thank you for the hard work you're putting in today."
    ];
    
    // Exam-specific motivational messages
    const examSpecificMessages: Record<string, string[]> = {
      'NEET': [
        "Stay focused on your NEET preparation. Your dedication will pay off!",
        "The NEET exam requires consistent practice. You're on the right track!",
        "Your NEET journey is a marathon, not a sprint. Keep building your knowledge daily."
      ],
      'JEE': [
        "JEE preparation demands persistence. You've got this!",
        "Every JEE problem you solve strengthens your understanding.",
        "Your JEE success story is being written with every study session."
      ]
    };
    
    // If we have an exam goal and specific messages for it, include them in the possible messages
    let possibleMessages = [...messages];
    if (examGoal && examSpecificMessages[examGoal]) {
      possibleMessages = [...possibleMessages, ...examSpecificMessages[examGoal]];
    }
    
    // Return a random message
    return possibleMessages[Math.floor(Math.random() * possibleMessages.length)];
  }
};

// Process user voice input and provide appropriate response
export const processUserQuery = (
  query: string,
  navigate: any,
  options: {
    startTest?: () => void,
    showFlashcards?: () => void,
    examGoal?: string
  } = {}
): string => {
  const lowerQuery = query.toLowerCase();
  const language = localStorage.getItem('voiceAssistantLanguage') || 'en-IN';
  
  if (language === 'hi-IN') {
    // Handle navigation commands in Hindi
    if (lowerQuery.includes('डैशबोर्ड') || lowerQuery.includes('होम')) {
      if (navigate) navigate('/dashboard/student');
      return "आपको स्टूडेंट डैशबोर्ड पर ले जा रहा हूँ।";
    }
    
    if (lowerQuery.includes('अध्ययन योजना') || lowerQuery.includes('शेड्यूल')) {
      if (navigate) navigate('/dashboard/student/study-plan');
      return "आपकी अध्ययन योजना खोल रहा हूँ।";
    }
    
    if (lowerQuery.includes('अभ्यास') || lowerQuery.includes('परीक्षा') || lowerQuery.includes('टेस्ट')) {
      if (options.startTest) {
        options.startTest();
        return "अभी एक अभ्यास परीक्षा शुरू कर रहा हूँ।";
      }
      if (navigate) navigate('/dashboard/student/practice');
      return "अभ्यास परीक्षा अनुभाग खोल रहा हूँ।";
    }
    
    if (lowerQuery.includes('फ्लैशकार्ड')) {
      if (options.showFlashcards) {
        options.showFlashcards();
        return "आपके फ्लैशकार्ड खोल रहा हूँ।";
      }
      if (navigate) navigate('/dashboard/student/flashcards');
      return "आपको अपने फ्लैशकार्ड पर ले जा रहा हूँ।";
    }
    
    if (lowerQuery.includes('प्रोफ़ाइल') || lowerQuery.includes('अकाउंट') || lowerQuery.includes('सेटिंग्स')) {
      if (navigate) navigate('/dashboard/student/profile');
      return "आपकी प्रोफ़ाइल सेटिंग्स खोल रहा हूँ।";
    }
    
    // Handle voice control commands in Hindi
    if (lowerQuery.includes('म्यूट') || lowerQuery.includes('बंद करो') || lowerQuery.includes('चुप रहो')) {
      return "MUTE_COMMAND";
    }
    
    if (lowerQuery.includes('अनम्यूट') || lowerQuery.includes('बात करो') || lowerQuery.includes('फिर से बोलो')) {
      return "UNMUTE_COMMAND";
    }
    
    // Handle language switch commands
    if (lowerQuery.includes('अंग्रेजी में बोलो') || lowerQuery.includes('इ��ग्लिश में') || lowerQuery.includes('अंग्रेजी में')) {
      return "I'll speak English now. How can I help you with your studies?";
    }
    
    // Handle informational queries in Hindi
    if (lowerQuery.includes('मदद') || lowerQuery.includes('आप क्या कर सकते हो')) {
      return "मैं आपको डैशबोर्ड में नेविगेट करने, आपकी अध्ययन सामग्री तक पहुंचने, अभ्यास परीक्षा शुरू करने, आपके शेड्यूल की जांच करने और प्रेरणात्मक सहायता प्रदान करने में मदद कर सकता हूं। बस मुझसे पूछें कि आपको क्या चाहिए!";
    }
    
    if (lowerQuery.includes('प्रेरणा') || lowerQuery.includes('मोटिवेशन')) {
      return getMotivationalMessage(options.examGoal);
    }
    
    // Study groups related commands in Hindi
    if (lowerQuery.includes('अध्ययन समूह') || lowerQuery.includes('स्टडी ग्रुप')) {
      if (navigate) navigate('/dashboard/student/study-groups');
      return "आपको अध्ययन समूह पृष्ठ पर ले जा रहा हूँ।";
    }
    
    if (lowerQuery.includes('दैनिक चुनौती') || lowerQuery.includes('डेली चैलेंज')) {
      if (navigate) navigate('/dashboard/student/daily-challenge');
      return "आपको दैनिक चुनौती पृष्ठ पर ले जा रहा हूँ।";
    }
    
    // Default response in Hindi
    return "मैंने ठीक से नहीं समझा। आप मुझसे विभिन्न खंडों पर नेविगेट करने, अभ्यास परीक्षा शुरू करने या अध्ययन योजना में मदद करने के लिए कह सकते हैं।";
  } else {
    // English commands (keep existing code)
    // Handle navigation commands
    if (lowerQuery.includes('dashboard') || lowerQuery.includes('home')) {
      if (navigate) navigate('/dashboard/student');
      return "Taking you to the student dashboard.";
    }
    
    if (lowerQuery.includes('study plan') || lowerQuery.includes('schedule')) {
      if (navigate) navigate('/dashboard/student/study-plan');
      return "Opening your study plan now.";
    }
    
    if (lowerQuery.includes('practice') || lowerQuery.includes('test') || lowerQuery.includes('exam')) {
      if (options.startTest) {
        options.startTest();
        return "Starting a practice test for you now.";
      }
      if (navigate) navigate('/dashboard/student/practice');
      return "Opening the practice test section.";
    }
    
    if (lowerQuery.includes('flashcard') || lowerQuery.includes('flash card')) {
      if (options.showFlashcards) {
        options.showFlashcards();
        return "Opening your flashcards now.";
      }
      if (navigate) navigate('/dashboard/student/flashcards');
      return "Taking you to your flashcards.";
    }
    
    if (lowerQuery.includes('profile') || lowerQuery.includes('account') || lowerQuery.includes('settings')) {
      if (navigate) navigate('/dashboard/student/profile');
      return "Opening your profile settings.";
    }
    
    // Handle voice control commands
    if (lowerQuery.includes('mute') || lowerQuery.includes('stop talking') || lowerQuery.includes('be quiet')) {
      return "MUTE_COMMAND";
    }
    
    if (lowerQuery.includes('unmute') || lowerQuery.includes('start talking') || lowerQuery.includes('speak again')) {
      return "UNMUTE_COMMAND";
    }
    
    // Handle language switch commands
    if (lowerQuery.includes('speak hindi') || lowerQuery.includes('hindi mode') || lowerQuery.includes('in hindi')) {
      return "मैं अब हिंदी में बात करूंगा। मैं आपकी किस प्रकार सहायता कर सकता हूँ?";
    }
    
    // Handle informational queries
    if (lowerQuery.includes('help') || lowerQuery.includes('what can you do')) {
      return "I can help you navigate the dashboard, access your study materials, open practice tests, check your schedule, and provide motivational support. Just ask me what you need!";
    }
    
    if (lowerQuery.includes('motivation') || lowerQuery.includes('motivate me')) {
      return getMotivationalMessage(options.examGoal);
    }
    
    // Study groups related commands
    if (lowerQuery.includes('study group') || lowerQuery.includes('study groups')) {
      if (navigate) navigate('/dashboard/student/study-groups');
      return "Taking you to the study groups page.";
    }
    
    if (lowerQuery.includes('daily challenge') || lowerQuery.includes('challenge')) {
      if (navigate) navigate('/dashboard/student/daily-challenge');
      return "Taking you to the daily challenge page.";
    }
    
    // Default response if nothing specific matched
    return "I didn't quite catch that. You can ask me to navigate to different sections, start a practice test, or help with your study plan.";
  }
};
