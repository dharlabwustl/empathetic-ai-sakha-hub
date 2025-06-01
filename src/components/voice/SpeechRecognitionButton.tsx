
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from 'lucide-react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useNavigate } from 'react-router-dom';

interface SpeechRecognitionButtonProps {
  position?: 'homepage' | 'dashboard';
  onCommand?: (command: string) => void;
  className?: string;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({ 
  position = 'homepage', 
  onCommand,
  className = ''
}) => {
  const navigate = useNavigate();
  const [hasPermission, setHasPermission] = useState(false);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Processing voice command:', lowerCommand);

    // Homepage specific commands - more enthusiastic and detailed
    if (position === 'homepage') {
      if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('tell me about prepzr') || lowerCommand.includes('about this platform')) {
        speakMessage('PREPZR is India\'s revolutionary AI-powered exam preparation platform that\'s changing how students study for NEET, JEE, and other competitive exams. Unlike traditional coaching institutes, we use artificial intelligence to understand your unique learning style, emotional state, and academic progress. Our platform adapts in real-time, creating hyper-personalized study plans that evolve with your needs. We\'re the first platform to integrate emotional intelligence with academic learning, ensuring you stay motivated and confident throughout your exam preparation journey.');
        return;
      }

      if (lowerCommand.includes('features') || lowerCommand.includes('what can you do') || lowerCommand.includes('capabilities')) {
        speakMessage('PREPZR offers game-changing features that traditional edtech platforms can\'t match. Our AI creates personalized study plans that adapt to your mood and learning pace. We provide interactive flashcards that use spaced repetition algorithms, comprehensive practice exams with detailed analytics, real-time performance tracking, mood-based study recommendations, and 24/7 AI tutoring support. Plus, our scholarship opportunities can help fund your medical or engineering education. We\'re not just another learning app - we\'re your intelligent study companion that grows with you.');
        return;
      }

      if (lowerCommand.includes('free trial') || lowerCommand.includes('trial') || lowerCommand.includes('try free')) {
        speakMessage('Absolutely! You can start your 7-day premium trial right now with zero commitment. You\'ll get full access to our AI-powered study plans, personalized flashcards, unlimited practice exams, detailed analytics, and one-on-one AI tutoring. No credit card required to start. This trial will show you exactly how PREPZR can transform your exam preparation and boost your scores significantly.');
        return;
      }

      if (lowerCommand.includes('exam readiness') || lowerCommand.includes('scholarship test') || lowerCommand.includes('analyze') || lowerCommand.includes('assessment')) {
        window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
        speakMessage('Excellent choice! I\'m opening our comprehensive exam readiness analyzer. This AI-powered assessment evaluates your current preparation level across all subjects, identifies knowledge gaps, and creates a personalized roadmap for improvement. Plus, high scorers qualify for our scholarship programs that can cover up to 100% of your education costs. Let\'s see how ready you are for your target exam!');
        return;
      }

      if (lowerCommand.includes('signup') || lowerCommand.includes('sign up') || lowerCommand.includes('register') || lowerCommand.includes('join')) {
        navigate('/signup');
        speakMessage('Perfect! I\'m taking you to our signup page where you can create your personalized PREPZR account. Once registered, you\'ll get immediate access to your AI-powered dashboard, personalized study recommendations, and can start your free trial. Join thousands of successful students who\'ve already transformed their exam preparation with PREPZR.');
        return;
      }

      if (lowerCommand.includes('benefits') || lowerCommand.includes('why prepzr') || lowerCommand.includes('advantages')) {
        speakMessage('PREPZR revolutionizes exam preparation in ways traditional coaching institutes simply can\'t match. We save you valuable time with AI-powered personalized learning that adapts to your pace. Our emotional intelligence features reduce exam stress and anxiety. We build strong study habits through gamification and streak tracking. Our content is 100% aligned with latest NEET and JEE syllabi. You get instant doubt resolution with AI tutoring, comprehensive performance analytics, and flexible learning that fits your schedule. Plus, our scholarship opportunities can fund your entire education. We\'re not just preparing you for exams - we\'re preparing you for success.');
        return;
      }

      if (lowerCommand.includes('pricing') || lowerCommand.includes('cost') || lowerCommand.includes('subscription') || lowerCommand.includes('plans')) {
        speakMessage('PREPZR offers incredibly affordable plans designed for every student\'s budget. Our basic plan starts at just 299 rupees per month - less than what you\'d spend on a single coaching class! Our premium plan at 599 rupees monthly includes everything: unlimited AI tutoring, personalized study plans, practice exams, detailed analytics, and priority support. Compare this to coaching institutes that charge 50,000 to 2 lakhs annually, and you\'ll see PREPZR delivers better results at a fraction of the cost. Plus, scholarship opportunities can make education completely free!');
        return;
      }

      if (lowerCommand.includes('coaching') || lowerCommand.includes('institute') || lowerCommand.includes('compare') || lowerCommand.includes('better than')) {
        speakMessage('Unlike traditional coaching institutes that use one-size-fits-all approaches, PREPZR provides truly personalized education. While coaching institutes have fixed schedules and limited teacher attention, our AI gives you 24/7 personalized tutoring. We cost 90% less than premium coaching institutes but deliver better results through adaptive learning. You can study at your own pace, access unlimited practice materials, and get instant feedback. Plus, we track your emotional well-being, something no coaching institute does. PREPZR is the future of exam preparation - smarter, more affordable, and more effective.');
        return;
      }

      if (lowerCommand.includes('take break') || lowerCommand.includes('break time')) {
        speakMessage('Smart thinking! Even while exploring PREPZR, it\'s important to take mindful breaks. Research shows that taking 10-15 minute breaks enhances learning and retention. Since you\'re interested in PREPZR, why not use this break to imagine your future medical or engineering career? When you\'re ready, come back and explore our free trial or take the scholarship assessment. Your dreams are closer than you think!');
        return;
      }
    }

    // Dashboard specific commands - more personalized and detailed
    if (position === 'dashboard') {
      if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
        navigate('/dashboard/student');
        speakMessage('Welcome back to your personalized command center! Your dashboard shows your complete progress overview, study streaks, and AI-recommended next actions based on your performance patterns.');
        return;
      }

      if (lowerCommand.includes('concepts') || lowerCommand.includes('learn') || lowerCommand.includes('study materials')) {
        navigate('/dashboard/student/concepts');
        speakMessage('Opening your concepts library with AI-curated content. Each concept is personalized based on your learning style and comes with interactive examples, practice questions, and difficulty progression.');
        return;
      }

      if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card') || lowerCommand.includes('revision')) {
        navigate('/dashboard/student/flashcards');
        speakMessage('Loading your intelligent flashcard system powered by spaced repetition algorithms. These cards adapt to your memory patterns and focus on concepts you need to reinforce most.');
        return;
      }

      if (lowerCommand.includes('practice exam') || lowerCommand.includes('test') || lowerCommand.includes('mock test')) {
        navigate('/dashboard/student/practice-exam');
        speakMessage('Opening your practice exam suite with AI-generated questions that match real exam patterns. Each test provides detailed analytics and identifies specific areas for improvement.');
        return;
      }

      if (lowerCommand.includes('formula lab') || lowerCommand.includes('formulas')) {
        navigate('/dashboard/student/formula-lab');
        speakMessage('Launching the interactive Formula Lab where you can practice and master essential formulas with visual aids and real-world applications.');
        return;
      }

      if (lowerCommand.includes('profile') || lowerCommand.includes('settings')) {
        navigate('/dashboard/student/profile');
        speakMessage('Opening your profile settings where you can customize learning preferences, update goals, and manage your subscription benefits.');
        return;
      }

      if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule') || lowerCommand.includes('plan')) {
        speakMessage('Your AI-powered study plan adapts daily based on your progress, mood, and performance analytics. It ensures optimal learning efficiency and exam readiness progression.');
        return;
      }

      if (lowerCommand.includes('how am i doing') || lowerCommand.includes('progress') || lowerCommand.includes('performance')) {
        speakMessage('Your progress analytics show comprehensive insights including subject-wise advancement, concept mastery levels, practice exam scores, study consistency, and predicted exam readiness. You\'re building strong foundations for success!');
        return;
      }
    }

    // Common commands for both positions
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      const helpMessage = position === 'homepage' 
        ? 'I\'m your PREPZR AI assistant, here to help you discover how our revolutionary platform can transform your exam preparation. I can explain our features, guide you through free trials, discuss pricing and benefits, help with signup, or analyze your exam readiness. I can also compare us with traditional coaching institutes and show you scholarship opportunities. What aspect of PREPZR interests you most?'
        : 'I\'m your personalized PREPZR AI assistant, designed to optimize your study experience. I can navigate you to different sections, provide detailed progress insights, suggest study strategies, help with concept reviews, manage your study schedule, and answer questions about your preparation journey. I understand your learning patterns and can provide contextual guidance. How can I enhance your study session today?';
      speakMessage(helpMessage);
      return;
    }

    // Default response with position-specific context
    const defaultMessage = position === 'homepage'
      ? `I heard you say: ${command}. I\'m your PREPZR AI assistant, excited to help you explore India\'s most advanced exam preparation platform. I can tell you about our revolutionary features, help you start a free trial, explain our scholarship programs, or assist with signup. We\'re here to transform your exam preparation journey - what would you like to discover about PREPZR?`
      : `I heard you say: ${command}. I\'m your PREPZR AI study companion, here to optimize your learning experience. I can help you navigate your dashboard, analyze your progress, suggest study strategies, or provide specific guidance for concepts, flashcards, and practice exams. How can I help you achieve your exam goals today?`;
    
    speakMessage(defaultMessage);
    
    if (onCommand) {
      onCommand(command);
    }
  };

  const {
    voiceSettings,
    isVoiceSupported,
    isListening,
    startListening,
    stopListening,
    speakMessage,
    transcript
  } = useVoiceAnnouncer({ 
    userName: position === 'homepage' ? 'Visitor' : 'Student', 
    autoStart: false,
    onCommand: handleVoiceCommand
  });

  // Request microphone permission
  useEffect(() => {
    const requestPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        console.error('Microphone permission denied:', error);
        setHasPermission(false);
      }
    };

    if (isVoiceSupported) {
      requestPermission();
    }
  }, [isVoiceSupported]);

  const handleClick = () => {
    if (!hasPermission) {
      speakMessage('Please allow microphone access to use voice commands');
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
      // Position-specific greeting
      const hasSpokenGreeting = sessionStorage.getItem(`voice_button_greeted_${position}`);
      if (!hasSpokenGreeting) {
        const greeting = position === 'homepage' 
          ? 'Hello! I\'m your PREPZR AI assistant, ready to help you discover how our revolutionary platform can transform your exam preparation. I can explain our features, help you start a free trial, or guide you through our scholarship opportunities. What would you like to explore?'
          : 'Hi! I\'m your PREPZR AI study companion. I\'m listening and ready to help optimize your learning experience. I can navigate you through sections, provide progress insights, or offer personalized study guidance. How can I assist you today?';
        speakMessage(greeting);
        sessionStorage.setItem(`voice_button_greeted_${position}`, 'true');
      }
    }
  };

  if (!isVoiceSupported || !hasPermission) {
    return null;
  }

  return (
    <Button
      onClick={handleClick}
      variant={isListening ? "default" : "outline"}
      size="lg"
      className={`${className} ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
          : 'bg-white/90 hover:bg-white border-2 border-blue-600 text-blue-600'
      } rounded-full p-4 shadow-lg backdrop-blur-sm transition-all duration-300`}
    >
      {isListening ? (
        <MicOff className="h-6 w-6" />
      ) : (
        <Mic className="h-6 w-6" />
      )}
      <span className="sr-only">
        {isListening ? 'Stop listening' : 'Start voice command'}
      </span>
    </Button>
  );
};

export default SpeechRecognitionButton;
