import { VoiceSettings } from '@/types/voice';

// Default voice settings
export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  volume: 1.0,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-IN',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

// Language options for the voice assistant
export const LANGUAGE_OPTIONS = [
  { value: 'en-IN', label: 'English (Indian)' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' }
];

// Find the best matching voice based on language
export const findBestVoice = (language: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  if (!voices || voices.length === 0) {
    console.log('No voices available');
    return null;
  }

  // First, try to find an exact match for the language
  let matchingVoice = voices.find(v => v.lang === language);
  
  // If no exact match, try to find a voice that starts with the language code
  if (!matchingVoice) {
    const langPrefix = language.split('-')[0];
    matchingVoice = voices.find(v => v.lang.startsWith(`${langPrefix}-`));
  }
  
  // If still no match, use any voice
  if (!matchingVoice) {
    console.log(`No matching voice found for ${language}, using default voice`);
    return voices[0]; // Default to first available voice
  }
  
  return matchingVoice;
};

// This function is part of voiceUtils.ts - I'm just updating this function
// to fix the PREPZR pronunciation issue

export const fixPronunciation = (text: string, language: string): string => {
  let fixedText = text;
  
  // Special handling for "PREPZR" pronunciation - spoken as "Prep-zer" /prep-zər/
  // Add a slight pause between "Prep" and "zer" for clearer pronunciation
  fixedText = fixedText.replace(/PREPZR/gi, 'Prep-zer');
  
  if (language.startsWith('en')) {
    // Fix English pronunciations
    fixedText = fixedText
      .replace(/NEET/gi, 'neet')
      .replace(/JEE/gi, 'J E E')
      .replace(/AI/g, 'A I');
  } else if (language === 'hi-IN') {
    // Fix Hindi pronunciations if needed
    fixedText = fixedText
      .replace(/PREPZR/gi, 'प्रेप ज़र')
      .replace(/NEET/gi, 'नीट')
      .replace(/JEE/gi, 'जे ई ई');
  }
  
  return fixedText;
};

// This function modifies how a message is spoken with proper pronunciation and event handling
export const speakMessage = (message: string, settingsOrForceFlag: VoiceSettings | boolean = DEFAULT_VOICE_SETTINGS): void => {
  if (!message || message.trim() === '') return;
  
  // Handle case when second parameter is just a boolean (force flag)
  let settings: VoiceSettings = DEFAULT_VOICE_SETTINGS;
  let forceSpeak = false;
  
  if (typeof settingsOrForceFlag === 'boolean') {
    forceSpeak = settingsOrForceFlag;
  } else {
    settings = settingsOrForceFlag;
  }
  
  // Check if speech synthesis is available
  if (!window.speechSynthesis) {
    console.error('Speech synthesis not supported');
    return;
  }
  
  // Don't speak if voice is disabled and not forced
  if (!settings.enabled && !forceSpeak) return;
  if (settings.muted && !forceSpeak) return;
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance();
  
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Fix pronunciation based on language
  const fixedMessage = fixPronunciation(message, settings.language);
  
  // Set utterance properties
  utterance.text = fixedMessage;
  utterance.volume = settings.volume;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  utterance.lang = settings.language;
  
  // Get available voices and set the best matching one
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = settings.voice || findBestVoice(settings.language, voices);
  
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  
  // Dispatch an event when speech starts
  const startEvent = new CustomEvent('voice-speaking-started', { 
    detail: { message: fixedMessage }
  });
  
  document.dispatchEvent(startEvent);
  document.body.classList.add('voice-speaking');
  
  // Speak the utterance
  utterance.onend = () => {
    document.dispatchEvent(new Event('voice-speaking-ended'));
    document.body.classList.remove('voice-speaking');
  };
  
  window.speechSynthesis.speak(utterance);
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
      return `${timeGreeting}${name}! प्रेप-ज़र में आपका स्वागत है। मैं आपका आवाज़ सहायक हूँ। मैं आपको प्लेटफॉर्म में नेविगेट करने, प्रश्नों का उत्तर देने और अध्ययन सुझाव प्रदान करने में मदद कर सकता हूँ।`;
    }
    
    // General greeting in Hindi
    return `${timeGreeting}${name}! मैं आज आपकी पढ़ाई में कैसे मदद कर सकता हूँ?`;
  } else {
    // English greeting
    let timeGreeting = "Hello";
    
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 17) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";
    
    const name = userName ? `, ${userName}` : '';
    
    if (isFirstTime) {
      return `${timeGreeting}${name}! Welcome to Prep-zer. I'm your voice assistant. I can help you navigate the platform, answer questions, and provide study recommendations.`;
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
    // English version
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
    // English version
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
    if (lowerQuery.includes('अंग्रेजी में बोलो') || lowerQuery.includes('इंग्लिश में') || lowerQuery.includes('अंग्रेजी में')) {
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
    // English commands
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

// Additional function to handle concept-specific voice commands
export const processConceptVoiceCommand = (
  query: string,
  options: {
    readAloud?: () => void,
    saveNotes?: () => void, 
    openFlashcards?: () => void,
    openPracticeExam?: () => void,
  } = {}
): string | null => {
  const lowerQuery = query.toLowerCase();
  
  // Read aloud commands
  if (lowerQuery.includes('read') || 
      lowerQuery.includes('read aloud') || 
      lowerQuery.includes('read to me') || 
      lowerQuery.includes('speak the content')) {
    if (options.readAloud) options.readAloud();
    return "Reading the concept content aloud for you.";
  }
  
  // Save notes commands
  if (lowerQuery.includes('save') || 
      lowerQuery.includes('save my notes') || 
      lowerQuery.includes('save notes')) {
    if (options.saveNotes) options.saveNotes();
    return "Your notes have been saved.";
  }
  
  // Flashcard practice commands
  if (lowerQuery.includes('flashcard') || 
      lowerQuery.includes('practice cards') || 
      lowerQuery.includes('study cards')) {
    if (options.openFlashcards) options.openFlashcards();
    return "Opening flashcards for this concept.";
  }
  
  // Practice exam commands
  if (lowerQuery.includes('test') || 
      lowerQuery.includes('exam') || 
      lowerQuery.includes('practice test') || 
      lowerQuery.includes('take the quiz')) {
    if (options.openPracticeExam) options.openPracticeExam();
    return "Starting a practice exam for this concept.";
  }
  
  // No matching command found
  return null;
};
