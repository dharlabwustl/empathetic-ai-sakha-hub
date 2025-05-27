
import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HomepageVoiceAssistantProps {
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const HomepageVoiceAssistant: React.FC<HomepageVoiceAssistantProps> = ({
  language = 'en-US',
  onNavigationCommand
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTextMode, setIsTextMode] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language;

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleCommand(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [language]);

  const speakMessage = (message: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
      speech.lang = language;
      speech.rate = 0.9;
      speech.pitch = 1.0;
      speech.volume = 0.8;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.toLowerCase().includes('female') || !voice.name.toLowerCase().includes('male'))
      );
      
      if (preferredVoice) {
        speech.voice = preferredVoice;
      }

      window.speechSynthesis.speak(speech);
    }
  };

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Homepage AI processing command:', lowerCommand);

    // Welcome and introduction commands
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi') || lowerCommand.includes('hey')) {
      speakMessage('Hello! Welcome to PREP-zer, India\'s most advanced AI-powered exam preparation platform. I\'m your intelligent voice assistant ready to help you discover how PREP-zer can transform your exam preparation journey!');
      return;
    }

    if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('about prepzr') || lowerCommand.includes('introduce')) {
      speakMessage('PREP-zer is India\'s revolutionary AI-powered exam preparation platform, specifically designed for competitive exams like NEET, JEE, and other entrance tests. We use cutting-edge artificial intelligence to create personalized learning paths that adapt to your unique learning style and pace.');
      return;
    }

    // Features and capabilities
    if (lowerCommand.includes('feature') || lowerCommand.includes('what does') || lowerCommand.includes('capabilities')) {
      speakMessage('PREP-zer offers game-changing features: AI-powered personalized study plans that adapt in real-time, interactive concept cards with multimedia content, smart flashcards using spaced repetition, comprehensive practice exams with detailed analytics, formula lab for hands-on practice, real-time exam readiness analysis, and exclusive scholarship opportunities worth up to 10 lakh rupees!');
      return;
    }

    // Free trial and pricing
    if (lowerCommand.includes('free') || lowerCommand.includes('trial') || lowerCommand.includes('cost') || lowerCommand.includes('price')) {
      speakMessage('Absolutely! PREP-zer offers a comprehensive free trial where you can experience our AI-powered features, take sample tests, and explore your personalized study dashboard. Our premium plans start at just 199 rupees per month - incredibly affordable compared to traditional coaching institutes!');
      return;
    }

    // Exam readiness and analysis
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('analysis') || lowerCommand.includes('assessment')) {
      speakMessage('Our cutting-edge exam readiness analyzer uses advanced AI algorithms to evaluate your preparation across all subjects, identifying strengths and weaknesses while providing a comprehensive readiness score with actionable insights for improvement. It\'s like having a personal exam coach!');
      return;
    }

    // Scholarship opportunities
    if (lowerCommand.includes('scholarship') || lowerCommand.includes('prize') || lowerCommand.includes('reward')) {
      speakMessage('PREP-zer offers exclusive scholarship tests with prizes up to 10 lakh rupees! These merit-based opportunities reward your hard work while significantly reducing education costs - a unique advantage you won\'t find with other platforms or coaching institutes.');
      return;
    }

    // Comparison with coaching institutes
    if (lowerCommand.includes('coaching') || lowerCommand.includes('institute') || lowerCommand.includes('better') || lowerCommand.includes('advantage')) {
      speakMessage('PREP-zer outperforms traditional coaching through 24/7 personalized learning, adaptive AI technology that understands your learning patterns, instant doubt resolution, detailed performance analytics, and all at a fraction of coaching costs without rigid schedules or travel hassles.');
      return;
    }

    // Comparison with other edtech platforms
    if (lowerCommand.includes('edtech') || lowerCommand.includes('competition') || lowerCommand.includes('different') || lowerCommand.includes('unique')) {
      speakMessage('Unlike generic edtech platforms, PREP-zer provides truly personalized AI-driven learning paths that adapt to your performance, advanced exam readiness analysis with predictive insights, interactive formula labs, and exclusive scholarship opportunities - creating a comprehensive ecosystem for exam success.');
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
      speakMessage('Our flexible subscription plans are designed for every budget! From our comprehensive free tier to premium plans with advanced AI features - find the perfect fit for your preparation needs and budget.');
      return;
    }

    // Why PREPZR
    if (lowerCommand.includes('why prepzr') || lowerCommand.includes('benefits') || lowerCommand.includes('advantages')) {
      speakMessage('PREP-zer combines cutting-edge AI technology, personalized learning experiences, comprehensive analytics, exclusive scholarship opportunities, and affordable pricing to deliver superior exam preparation results compared to traditional methods.');
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
      speakMessage('I\'m here to guide you through everything PREP-zer offers! Ask me about our revolutionary features, free trial opportunities, scholarship tests worth up to 10 lakh rupees, affordable pricing, or how we outperform traditional coaching. What interests you most?');
      return;
    }

    // Default response
    speakMessage('Welcome to PREP-zer! I can tell you about our revolutionary AI-powered features, free trial opportunities, scholarship tests worth up to 10 lakh rupees, affordable pricing, or how we outperform traditional coaching. What would you like to explore first?');
  };

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleCommand(textInput);
      setTextInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTextSubmit();
    }
  };

  // Initial greeting for homepage visitors
  useEffect(() => {
    const hasGreeted = sessionStorage.getItem('homepage_voice_greeted');
    if (!hasGreeted) {
      setTimeout(() => {
        speakMessage('Hello! Welcome to PREP-zer, India\'s most advanced exam preparation platform! I\'m your intelligent AI assistant here to introduce you to our revolutionary features and help you discover how we can transform your exam preparation journey. What would you like to know about PREP-zer?');
        sessionStorage.setItem('homepage_voice_greeted', 'true');
      }, 2000);
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-2">
        {/* Text input mode */}
        {isTextMode && (
          <div className="bg-white rounded-lg shadow-lg p-4 w-80 border">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold">Text AI Assistant</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about PREPZR..."
                className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={handleTextSubmit} size="sm" className="bg-blue-600 hover:bg-blue-700">
                Send
              </Button>
            </div>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setIsTextMode(!isTextMode)}
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={() => setIsMuted(!isMuted)}
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <Button
            onClick={toggleListening}
            variant={isListening ? "destructive" : "default"}
            size="sm"
            className={`shadow-lg ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomepageVoiceAssistant;
