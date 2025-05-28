
export interface VoiceMessage {
  text: string;
  pauseAfter?: number; // milliseconds
  emphasis?: boolean;
}

export const createIntelligentBreak = (duration: number = 2000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

// Homepage voice messages with intelligent breaks
export const homepageWelcomeMessages: VoiceMessage[] = [
  {
    text: "Welcome to PREPZR!",
    pauseAfter: 1500,
    emphasis: true
  },
  {
    text: "I'm your AI companion, here to guide you through the world's first emotionally aware exam preparation platform.",
    pauseAfter: 2000
  },
  {
    text: "Ready to start your free 7-day trial? Just say 'free trial' or click the signup button.",
    pauseAfter: 2000
  },
  {
    text: "I'm here to help you succeed. What would you like to explore first?",
    pauseAfter: 0
  }
];

// Post-signup congratulations
export const signupCongratulationMessages = (userName: string): VoiceMessage[] => [
  {
    text: `Congratulations ${userName}! Welcome to the PREPZR family!`,
    pauseAfter: 2000,
    emphasis: true
  },
  {
    text: "You've just taken the most important step towards exam success.",
    pauseAfter: 1500
  },
  {
    text: "Let's begin your transformation journey!",
    pauseAfter: 0
  }
];

// First-time dashboard user guidance
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
    text: "Ready to start your first study session? I recommend beginning with the concept cards!",
    pauseAfter: 0
  }
];

// Returning user encouragement
export const returningUserMessages = (userName: string): VoiceMessage[] => [
  {
    text: `Great to see you back, ${userName}!`,
    pauseAfter: 1500,
    emphasis: true
  },
  {
    text: "Your dedication to consistent learning is impressive and exactly what leads to exam success.",
    pauseAfter: 2000
  },
  {
    text: "What would you like to focus on in today's study session?",
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
