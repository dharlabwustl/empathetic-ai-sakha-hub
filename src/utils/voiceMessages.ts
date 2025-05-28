
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
    text: "PREPZR isn't just another study app. We use advanced AI to understand your emotions, learning patterns, and adapt in real-time.",
    pauseAfter: 2500
  },
  {
    text: "Whether you're preparing for NEET, JEE, or any competitive exam, we create personalized study plans that evolve with you.",
    pauseAfter: 2000
  },
  {
    text: "Our smart features include adaptive flashcards, interactive concept mastery, and real-time exam readiness tracking.",
    pauseAfter: 2500
  },
  {
    text: "Ready to start your free 7-day trial? Just say 'free trial' or click the signup button.",
    pauseAfter: 2000
  },
  {
    text: "Want to test your current preparation level? Try our exam readiness analyzer.",
    pauseAfter: 2000
  },
  {
    text: "Looking for scholarship opportunities? We have special tests to help you get early advantages.",
    pauseAfter: 2500
  },
  {
    text: "Your journey with PREPZR starts with smart onboarding, then dynamic daily plans that adapt to your progress.",
    pauseAfter: 2000
  },
  {
    text: "Master concepts through interactive learning, practice recall with spaced repetition, and track your exam readiness daily.",
    pauseAfter: 1500
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
    text: "Your personalized learning journey begins now with smart onboarding to understand your goals and learning style.",
    pauseAfter: 2000
  },
  {
    text: "I'll help you create dynamic study plans, track your mood and progress, and provide daily adaptive recommendations.",
    pauseAfter: 2500
  },
  {
    text: "Together, we'll master every concept, practice effective recall, and ensure you're exam-ready when it matters most.",
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
    text: "Your dashboard shows real-time analytics, mood tracking, and personalized study recommendations.",
    pauseAfter: 2500
  },
  {
    text: "The overview tab displays your progress across all subjects with smart KPIs and performance trends.",
    pauseAfter: 2000
  },
  {
    text: "Concept cards help you master individual topics with interactive learning and progress tracking.",
    pauseAfter: 2500
  },
  {
    text: "Flashcards use spaced repetition to improve your recall and memory retention.",
    pauseAfter: 2000
  },
  {
    text: "Practice exams simulate real test conditions and provide detailed performance analysis.",
    pauseAfter: 2500
  },
  {
    text: "Your study plan adapts daily based on your progress, mood, and performance patterns.",
    pauseAfter: 2000
  },
  {
    text: "Use voice commands anytime by clicking the microphone. I'm always here to help guide your learning.",
    pauseAfter: 1500
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
    text: "I can see the excellent progress you're making across your subjects.",
    pauseAfter: 2000
  },
  {
    text: "Your daily consistency is building the foundation for outstanding exam performance.",
    pauseAfter: 2500
  },
  {
    text: "Today's smart suggestions are ready based on your recent activity and learning patterns.",
    pauseAfter: 2000
  },
  {
    text: "Remember, small daily improvements lead to remarkable results. Keep up the fantastic work!",
    pauseAfter: 1500
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
