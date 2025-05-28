
export interface VoiceMessage {
  text: string;
  pauseAfter?: number; // milliseconds
  emphasis?: boolean;
}

export const createIntelligentBreak = (duration: number = 2000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

// Homepage voice messages with intelligent breaks - shorter and more engaging
export const homepageWelcomeMessages: VoiceMessage[] = [
  {
    text: "Welcome to PREPZR!",
    pauseAfter: 1500,
    emphasis: true
  },
  {
    text: "I'm your AI companion for the world's first emotionally aware exam preparation platform.",
    pauseAfter: 2500
  },
  {
    text: "PREPZR uses advanced AI to understand your emotions and learning patterns, adapting in real-time.",
    pauseAfter: 2000
  },
  {
    text: "We create personalized study plans for NEET, JEE, and other competitive exams that evolve with you.",
    pauseAfter: 2500
  },
  {
    text: "Ready to start your free 7-day trial? You can also test your exam readiness or explore scholarship opportunities.",
    pauseAfter: 2000
  },
  {
    text: "Your journey includes smart onboarding, dynamic daily plans, concept mastery, and exam readiness tracking.",
    pauseAfter: 0
  }
];

// Assistance offer messages
export const assistanceOfferMessages: VoiceMessage[] = [
  {
    text: "I'm here to help! You can ask me about PREPZR features, start your free trial, or test your exam readiness.",
    pauseAfter: 0
  }
];

// Post-signup congratulations - shorter and more focused
export const signupCongratulationMessages = (userName: string): VoiceMessage[] => [
  {
    text: `Congratulations ${userName}! Welcome to the PREPZR family!`,
    pauseAfter: 2000,
    emphasis: true
  },
  {
    text: "You've taken the most important step towards exam success.",
    pauseAfter: 1500
  },
  {
    text: "Your personalized learning journey begins with smart onboarding to understand your goals.",
    pauseAfter: 2000
  },
  {
    text: "I'll help you create dynamic study plans and provide daily adaptive recommendations.",
    pauseAfter: 1500
  },
  {
    text: "Let's begin your transformation journey!",
    pauseAfter: 0
  }
];

// First-time dashboard user guidance - more concise
export const firstTimeDashboardMessages = (userName: string): VoiceMessage[] => [
  {
    text: `Welcome to your PREPZR dashboard, ${userName}!`,
    pauseAfter: 1500,
    emphasis: true
  },
  {
    text: "This is your command center for exam preparation excellence.",
    pauseAfter: 2000
  },
  {
    text: "Your dashboard shows real-time analytics, mood tracking, and personalized study recommendations.",
    pauseAfter: 2500
  },
  {
    text: "Explore concept cards for topic mastery, flashcards for memory retention, and practice exams for test preparation.",
    pauseAfter: 2000
  },
  {
    text: "Use voice commands anytime by clicking the microphone. I'm always here to help guide your learning.",
    pauseAfter: 1500
  },
  {
    text: "Ready to start your first study session?",
    pauseAfter: 0
  }
];

// Returning user encouragement - brief and motivating
export const returningUserMessages = (userName: string): VoiceMessage[] = [
  {
    text: `Great to see you back, ${userName}!`,
    pauseAfter: 1500,
    emphasis: true
  },
  {
    text: "Your dedication to consistent learning is impressive and leads to exam success.",
    pauseAfter: 2000
  },
  {
    text: "Today's smart suggestions are ready based on your recent progress.",
    pauseAfter: 2000
  },
  {
    text: "Remember, small daily improvements lead to remarkable results. Keep up the fantastic work!",
    pauseAfter: 0
  }
];

export const speakMessagesWithBreaks = async (
  messages: VoiceMessage[],
  voiceConfig: any,
  onStart?: () => void,
  onComplete?: () => void
): Promise<void> => {
  if (onStart) onStart();
  
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    
    // Create speech with emphasis if needed
    const speech = new SpeechSynthesisUtterance();
    speech.text = message.text;
    speech.lang = voiceConfig.language || 'en-US';
    speech.rate = message.emphasis ? 0.85 : 0.95;
    speech.pitch = message.emphasis ? 1.2 : 1.1;
    speech.volume = 0.8;
    
    if (voiceConfig.voice) {
      speech.voice = voiceConfig.voice;
    }
    
    // Speak the message
    await new Promise<void>((resolve) => {
      speech.onend = () => resolve();
      window.speechSynthesis.speak(speech);
    });
    
    // Intelligent pause after message
    if (message.pauseAfter && message.pauseAfter > 0) {
      await createIntelligentBreak(message.pauseAfter);
    }
  }
  
  if (onComplete) onComplete();
};
