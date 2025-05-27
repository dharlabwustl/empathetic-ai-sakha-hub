
import React, { useEffect } from 'react';

interface HomepageVoiceAssistantProps {
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const HomepageVoiceAssistant: React.FC<HomepageVoiceAssistantProps> = ({
  language = 'en-US',
  onNavigationCommand
}) => {
  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
      speech.lang = language;
      speech.rate = 0.9;
      speech.pitch = 1.0;
      speech.volume = 0.8;

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.toLowerCase().includes('female') || !voice.name.toLowerCase().includes('male'))
      );
      
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }

      window.speechSynthesis.speak(speech);
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Homepage AI processing command:', lowerCommand);

    // Introduction and features
    if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('about prepzr') || lowerCommand.includes('introduce')) {
      speakMessage('PREP-zer is India\'s most advanced AI-powered exam preparation platform, revolutionizing how students prepare for competitive exams like NEET, JEE, and other entrance tests with personalized learning paths.');
      return;
    }

    if (lowerCommand.includes('feature') || lowerCommand.includes('what does') || lowerCommand.includes('capabilities')) {
      speakMessage('PREP-zer offers revolutionary features: AI-powered personalized study plans, interactive concept cards, smart flashcards, comprehensive practice exams, formula lab, real-time exam readiness analysis, and exclusive scholarship opportunities worth up to 10 lakh rupees!');
      return;
    }

    // Free trial and pricing
    if (lowerCommand.includes('free') || lowerCommand.includes('trial') || lowerCommand.includes('cost') || lowerCommand.includes('price')) {
      speakMessage('Absolutely! PREP-zer offers a comprehensive free trial where you can experience our AI-powered features, take sample tests, and explore your personalized study dashboard. Premium plans start at just 199 rupees per month - far more affordable than traditional coaching!');
      return;
    }

    // Exam readiness and analysis
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('analysis') || lowerCommand.includes('assessment')) {
      speakMessage('Our cutting-edge exam readiness analyzer uses AI to evaluate your preparation across all subjects, identifying strengths and weaknesses while providing a comprehensive readiness score with actionable insights for improvement.');
      return;
    }

    // Scholarship opportunities
    if (lowerCommand.includes('scholarship') || lowerCommand.includes('prize') || lowerCommand.includes('reward')) {
      speakMessage('PREP-zer offers exclusive scholarship tests with prizes up to 10 lakh rupees! These merit-based opportunities reward your hard work while significantly reducing education costs - a unique advantage you won\'t find elsewhere.');
      return;
    }

    // Comparison with coaching institutes
    if (lowerCommand.includes('coaching') || lowerCommand.includes('institute') || lowerCommand.includes('better') || lowerCommand.includes('advantage')) {
      speakMessage('PREP-zer outperforms traditional coaching through 24/7 personalized learning, adaptive AI technology, instant doubt resolution, and detailed analytics - all at a fraction of coaching costs without rigid schedules or travel hassles.');
      return;
    }

    // Comparison with other edtech platforms
    if (lowerCommand.includes('edtech') || lowerCommand.includes('competition') || lowerCommand.includes('different') || lowerCommand.includes('unique')) {
      speakMessage('Unlike generic edtech platforms, PREP-zer provides truly personalized AI-driven learning paths, advanced exam readiness analysis, interactive formula labs, and exclusive scholarship opportunities - creating a comprehensive ecosystem for exam success.');
      return;
    }

    // Signup and getting started
    if (lowerCommand.includes('signup') || lowerCommand.includes('register') || lowerCommand.includes('start') || lowerCommand.includes('join')) {
      if (onNavigationCommand) {
        onNavigationCommand('/register');
      }
      speakMessage('Excellent decision! I\'m redirecting you to our quick signup process. Create your free account in under 2 minutes and immediately access our AI-powered study tools to begin your success journey!');
      return;
    }

    // Subscription plans
    if (lowerCommand.includes('subscription') || lowerCommand.includes('plan') || lowerCommand.includes('pricing') || lowerCommand.includes('package')) {
      if (onNavigationCommand) {
        onNavigationCommand('/pricing');
      }
      speakMessage('Our flexible subscription plans are designed for every budget! From our comprehensive free tier to premium plans with advanced features - find the perfect fit for your preparation needs and budget.');
      return;
    }

    // Why PREPZR
    if (lowerCommand.includes('why prepzr') || lowerCommand.includes('benefits') || lowerCommand.includes('advantages')) {
      speakMessage('PREP-zer combines cutting-edge AI technology, personalized learning, comprehensive analytics, scholarship opportunities, and affordable pricing to deliver superior exam preparation results compared to traditional methods.');
      return;
    }

    // Demo or explore
    if (lowerCommand.includes('demo') || lowerCommand.includes('explore') || lowerCommand.includes('show me')) {
      if (onNavigationCommand) {
        onNavigationCommand('/demo');
      }
      speakMessage('Perfect! Let me show you PREP-zer in action. You\'ll see how our AI creates personalized study plans, tracks progress, and optimizes learning for maximum exam success.');
      return;
    }

    // Help and guidance
    if (lowerCommand.includes('help') || lowerCommand.includes('guide') || lowerCommand.includes('support')) {
      speakMessage('I\'m here to guide you through everything PREP-zer offers! Ask me about our features, free trial, scholarship tests, pricing, or how we compare to coaching institutes. What interests you most?');
      return;
    }

    // Default response
    speakMessage('Welcome to PREP-zer! I can tell you about our revolutionary AI-powered features, free trial opportunities, scholarship tests worth up to 10 lakh rupees, affordable pricing, or how we outperform traditional coaching. What would you like to explore first?');
  };

  // Initial greeting for homepage visitors
  useEffect(() => {
    const hasGreeted = sessionStorage.getItem('homepage_voice_greeted');
    if (!hasGreeted) {
      setTimeout(() => {
        speakMessage('Hello! Welcome to PREP-zer, India\'s most advanced exam preparation platform! I\'m here to introduce you to our revolutionary AI-powered features and help you discover how we can transform your exam preparation journey. What would you like to know about PREP-zer?');
        sessionStorage.setItem('homepage_voice_greeted', 'true');
      }, 2000);
    }
  }, []);

  return null; // Background service component
};

export default HomepageVoiceAssistant;
