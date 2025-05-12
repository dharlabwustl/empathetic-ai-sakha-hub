import { VoiceSettings } from '@/types/voice';
import { MoodType } from '@/types/user/base';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  muted: false,
  volume: 1,
  rate: 1,
  pitch: 1,
  voice: '',
  language: 'en-US'
};

// Language options for the voice assistant
export const LANGUAGE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-IN', label: 'English (India)' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'es-ES', label: 'Spanish' },
  { value: 'fr-FR', label: 'French' },
  { value: 'de-DE', label: 'German' },
  { value: 'ja-JP', label: 'Japanese' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'ru-RU', label: 'Russian' },
];

// Find the best voice for the current language
export const findBestVoice = (
  language: string,
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null => {
  // Try to find an exact match
  const exactMatch = voices.find((voice) => voice.lang === language);
  if (exactMatch) return exactMatch;

  // Try to find a voice that starts with the language code
  const languageCode = language.split('-')[0];
  const languageMatch = voices.find((voice) => voice.lang.startsWith(languageCode));
  if (languageMatch) return languageMatch;

  // If no match, return null or a default voice
  return voices.length > 0 ? voices[0] : null;
};

// Fix pronunciation of specific words, especially the product name
export const fixPronunciation = (text: string): string => {
  // Handle PREPZR pronunciation specifically
  let fixedText = text.replace(/PREPZR/g, '<break time="0.2s"/> Prep <break time="0.15s"/> zer <break time="0.2s"/>');
  fixedText = fixedText.replace(/prepzr/gi, '<break time="0.2s"/> Prep <break time="0.15s"/> zer <break time="0.2s"/>');
  
  // Handle other difficult pronunciations
  fixedText = fixedText.replace(/(\b[A-Z]{3,}\b)/g, (match) => {
    return match.split('').join(' ');
  });

  return fixedText;
};

// Speak message using speech synthesis
export const speakMessage = (
  message: string,
  settings: VoiceSettings
): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Create an event to track when speaking starts
  const speakingStartedEvent = new CustomEvent('voice-speaking-started', {
    detail: { message }
  });
  document.dispatchEvent(speakingStartedEvent);

  // Add class to body for visual indicator
  document.body.classList.add('voice-speaking');

  // Fix pronunciations in the message
  const processedMessage = fixPronunciation(message);

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(processedMessage);
  
  // Apply settings
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;

  // Get available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Find appropriate voice
  let selectedVoice;
  if (settings.voice) {
    selectedVoice = voices.find(v => v.name === settings.voice);
  }
  
  if (!selectedVoice) {
    selectedVoice = findBestVoice(settings.language, voices);
  }
  
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Handle speech ending
  utterance.onend = () => {
    document.body.classList.remove('voice-speaking');
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };

  // Handle speech error
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    document.body.classList.remove('voice-speaking');
    document.dispatchEvent(new Event('voice-speaking-ended'));
  };

  // Start speaking
  window.speechSynthesis.speak(utterance);
};

// Get mood-based study recommendations
export const getMoodStudyRecommendation = (mood: MoodType): string => {
  switch (mood) {
    case MoodType.HAPPY:
      return "Your positive mood is perfect for tackling challenging topics. Let's make the most of your energy!";
    case MoodType.MOTIVATED:
      return "You're motivated! This is an excellent time for focused study sessions or trying difficult problems.";
    case MoodType.FOCUSED:
      return "With your focused state of mind, I recommend deep-diving into complex concepts or formula practice.";
    case MoodType.TIRED:
      return "You seem tired. Consider a short review session with flashcards or watching video explanations instead of intense problem-solving.";
    case MoodType.STRESSED:
      return "I notice you're stressed. Let's try some lighter review sessions or organizing your study materials rather than tackling new topics.";
    case MoodType.CONFUSED:
      return "When feeling confused, it's best to revisit fundamentals or use the AI tutor to clarify concepts you're struggling with.";
    case MoodType.ANXIOUS:
      return "With anxiety, short study sessions with frequent breaks might help. Focus on reviewing familiar material to build confidence.";
    case MoodType.NEUTRAL:
      return "A balanced mood is good for steady progress. This is a good time for regular study activities in your plan.";
    case MoodType.OKAY:
      return "You're feeling okay, which is a good state for consistent study. Follow your regular study plan today.";
    case MoodType.OVERWHELMED:
      return "When overwhelmed, break down your study into smaller chunks. Focus on one topic at a time and celebrate small victories.";
    case MoodType.CURIOUS:
      return "Your curiosity is a powerful learning tool! Explore new topics or dive deeper into interesting concepts while maintaining this mood.";
    case MoodType.SAD:
      return "On days when you're feeling down, gentle review of familiar topics or organizing your notes might be better than tackling challenging new material.";
    default:
      return "I can help you optimize your studying based on how you're feeling. Consider logging your mood to get personalized recommendations.";
  }
};

// Voice commands for mood setting
export const getMoodVoiceCommands = (): string[] => [
  "I'm feeling happy today",
  "Log my mood as tired",
  "I'm stressed about my exam",
  "Set my mood to motivated",
  "I'm feeling anxious about studying",
  "Change my mood to focused",
];

// Store mood in localStorage
export const storeMoodInLocalStorage = (mood: MoodType): void => {
  try {
    // Save current mood
    localStorage.setItem('current_mood', mood);
    
    // Add to mood history
    const now = new Date();
    const moodEntry = {
      mood,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString()
    };
    
    const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
    moodHistory.unshift(moodEntry); // Add to beginning
    
    // Keep last 30 entries only
    if (moodHistory.length > 30) {
      moodHistory.pop();
    }
    
    localStorage.setItem('mood_history', JSON.stringify(moodHistory));
  } catch (error) {
    console.error('Error storing mood in localStorage:', error);
  }
};

// Get current mood from localStorage
export const getCurrentMoodFromLocalStorage = (): MoodType | undefined => {
  try {
    const mood = localStorage.getItem('current_mood');
    return mood as MoodType | undefined;
  } catch (error) {
    console.error('Error retrieving mood from localStorage:', error);
    return undefined;
  }
};

// Analyze mood trends from history
export const analyzeMoodTrends = () => {
  try {
    const moodHistory = JSON.parse(localStorage.getItem('mood_history') || '[]');
    
    if (moodHistory.length < 3) {
      return { stressSignals: false, improved: false };
    }
    
    // Check for stress patterns
    const stressfulMoods = [MoodType.STRESSED, MoodType.ANXIOUS, MoodType.OVERWHELMED, MoodType.SAD];
    const recentMoods = moodHistory.slice(0, 3);
    const stressCount = recentMoods.filter(entry => stressfulMoods.includes(entry.mood)).length;
    
    // Check for mood improvement
    const positiveMoods = [MoodType.HAPPY, MoodType.MOTIVATED, MoodType.FOCUSED, MoodType.CURIOUS];
    const latestMood = moodHistory[0].mood;
    const previousMoods = moodHistory.slice(1, 4).map(entry => entry.mood);
    
    const wasNegative = previousMoods.some(mood => stressfulMoods.includes(mood));
    const nowPositive = positiveMoods.includes(latestMood);
    
    return {
      stressSignals: stressCount >= 2,
      improved: wasNegative && nowPositive
    };
  } catch (error) {
    console.error('Error analyzing mood trends:', error);
    return { stressSignals: false, improved: false };
  }
};

// Update study time allocations based on mood
export const updateStudyTimeAllocationsByMood = (mood: MoodType) => {
  try {
    // Default allocations (in percentages)
    let allocations = {
      newConcepts: 30,
      practice: 30,
      revision: 25,
      breaks: 15
    };
    
    // Adjust based on mood
    switch (mood) {
      case MoodType.HAPPY:
      case MoodType.MOTIVATED:
      case MoodType.FOCUSED:
        // Productive moods - more new concepts and practice
        allocations = {
          newConcepts: 40,
          practice: 35,
          revision: 15,
          breaks: 10
        };
        break;
        
      case MoodType.TIRED:
      case MoodType.STRESSED:
      case MoodType.ANXIOUS:
      case MoodType.OVERWHELMED:
      case MoodType.SAD:
        // Challenging moods - more revision and breaks
        allocations = {
          newConcepts: 10,
          practice: 20,
          revision: 40,
          breaks: 30
        };
        break;
        
      case MoodType.NEUTRAL:
      case MoodType.OKAY:
      case MoodType.CURIOUS:
        // Balanced moods - standard allocation
        allocations = {
          newConcepts: 30,
          practice: 30,
          revision: 25,
          breaks: 15
        };
        break;
    }
    
    localStorage.setItem('study_time_allocations', JSON.stringify(allocations));
    return allocations;
  } catch (error) {
    console.error('Error updating study time allocations:', error);
    return null;
  }
};

// Get study recommendation based on mood
export const getStudyRecommendationForMood = (mood: MoodType): string => {
  return getMoodStudyRecommendation(mood);
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
    if (lowerQuery.includes('अंग्रेजी में बोलो') || lowerQuery.includes('इंग्ल���श में') || lowerQuery.includes('अंग्रेजी में')) {
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
