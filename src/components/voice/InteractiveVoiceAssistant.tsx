
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Keyboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  assistantName?: string;
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = 'User',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  className = '',
  assistantName = 'PREPZR AI'
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [textInput, setTextInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState<Array<{type: 'user' | 'assistant', message: string}>>([]);
  const recognitionRef = useRef<any>(null);
  const hasGreetedRef = useRef(false);

  useEffect(() => {
    // Enhanced context-aware greeting
    if (!hasGreetedRef.current && !isMuted) {
      setTimeout(() => {
        const currentPage = window.location.pathname;
        let contextualGreeting = '';
        
        if (currentPage === '/') {
          contextualGreeting = `Welcome to PREPZR, India's first AI-powered exam preparation platform! I'm PREPZR AI, your intelligent study companion. I can help you explore our revolutionary features, start your free trial, understand our scholarship opportunities, or guide you through signup. Our platform adapts to your learning style and emotional state to maximize your exam success. What aspect of PREPZR would you like to discover?`;
        } else if (currentPage.includes('/dashboard/student')) {
          if (currentPage.includes('/concepts')) {
            contextualGreeting = `Welcome to your personalized Concepts section, ${userName}! I can help you navigate through different subjects, find specific topics based on your progress, suggest concepts that need attention, or guide you to complementary study materials. Your AI-curated content adapts to your learning pace. What concept area would you like to explore today?`;
          } else if (currentPage.includes('/practice-exam')) {
            contextualGreeting = `You're in your Practice Exams section, ${userName}! I can help you select exams based on your readiness level, explain detailed analytics from previous attempts, suggest optimal test-taking strategies, or guide you to subject-specific mock tests. Ready to challenge yourself and track your improvement?`;
          } else if (currentPage.includes('/flashcards')) {
            contextualGreeting = `Welcome to your intelligent Flashcards section, ${userName}! I can help you find subject-specific card decks, explain spaced repetition scheduling, track your revision progress, or suggest cards that need immediate attention. Your flashcard system adapts to your memory patterns for maximum retention efficiency.`;
          } else if (currentPage.includes('/formula-lab')) {
            contextualGreeting = `You're in the interactive Formula Lab, ${userName}! I can help you practice specific formulas, understand derivations, find formulas by topic or difficulty, or guide you through applications with real-world examples. Let's master those essential equations together!`;
          } else {
            contextualGreeting = `Welcome back to your PREPZR dashboard, ${userName}! I can see your complete study progress, help you navigate to any section, provide personalized study recommendations based on your performance patterns, explain your analytics, or suggest optimal next actions. I'm here to optimize your entire learning journey.`;
          }
        } else {
          contextualGreeting = `Hello ${userName}! I'm PREPZR AI, your intelligent study companion specialized for exam preparation. I understand your current context and can provide targeted guidance, navigation assistance, study recommendations, and detailed explanations about any PREPZR feature.`;
        }
        
        speakMessage(contextualGreeting);
        setConversationHistory([{type: 'assistant', message: contextualGreeting}]);
        hasGreetedRef.current = true;
      }, 2000);
    }
  }, [userName, isMuted]);

  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/gi, 'Prep-Zer').replace(/Prepzr/gi, 'Prep-Zer').replace(/prepzr/gi, 'prep-zer');
    speech.lang = language;
    speech.rate = 0.9;
    speech.pitch = 1.0;
    speech.volume = 0.8;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoices = voices.filter(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('zira') ||
      !voice.name.toLowerCase().includes('male')
    );
    
    if (femaleVoices.length > 0) {
      speech.voice = femaleVoices[0];
    }

    window.speechSynthesis.speak(speech);
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleCommand(textInput.trim());
      setConversationHistory(prev => [...prev, {type: 'user', message: textInput.trim()}]);
      setTextInput('');
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition Unavailable",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = language;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      speakMessage("I'm listening. How can I help you?");
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleCommand(transcript);
      setConversationHistory(prev => [...prev, {type: 'user', message: transcript}]);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
      speakMessage("Sorry, I couldn't understand that. Please try again.");
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleCommand = (command: string) => {
    console.log('PREPZR AI processing command:', command);
    const lowerCommand = command.toLowerCase();
    let response = '';

    // Enhanced navigation commands with detailed context
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      onNavigationCommand?.('/dashboard/student');
      response = `Navigating to your personalized dashboard where you can see your complete progress overview, study streaks, performance analytics, and AI-recommended next actions based on your learning patterns.`;
    } else if (lowerCommand.includes('concepts') || lowerCommand.includes('learn')) {
      onNavigationCommand?.('/dashboard/student/concepts');
      response = `Opening your Concepts section with AI-curated study materials. Each concept adapts to your learning style and includes interactive examples, practice questions, and difficulty progression based on your mastery level.`;
    } else if (lowerCommand.includes('flashcard') || lowerCommand.includes('cards') || lowerCommand.includes('revision')) {
      onNavigationCommand?.('/dashboard/student/flashcards');
      response = `Loading your intelligent flashcard system powered by spaced repetition algorithms. These cards adapt to your memory patterns and prioritize concepts you need to reinforce most for optimal retention.`;
    } else if (lowerCommand.includes('practice exam') || lowerCommand.includes('test') || lowerCommand.includes('exam')) {
      onNavigationCommand?.('/dashboard/student/practice-exam');
      response = `Opening your practice exam suite with AI-generated questions that mirror real exam patterns. Each test provides comprehensive analytics and identifies specific improvement areas with targeted recommendations.`;
    } else if (lowerCommand.includes('formula lab') || lowerCommand.includes('formulas')) {
      onNavigationCommand?.('/dashboard/student/formula-lab');
      response = `Launching the interactive Formula Lab where you can practice essential formulas with visual aids, step-by-step derivations, and real-world applications for better understanding and retention.`;
    } else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      response = `Hi ${userName}! I'm PREPZR AI, your intelligent study companion with comprehensive capabilities. I can navigate you through all dashboard sections, provide detailed progress analysis, suggest personalized study strategies, explain concepts, help with practice exam strategies, manage your study schedule, track learning analytics, provide motivation based on your progress, and answer specific questions about PREPZR features. I understand context and adapt my guidance to your current needs. What specific area would you like assistance with?`;
    } else if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      response = `Based on your learning analytics, I can see your study patterns, concept mastery levels, and progress trends. Your consistency is building strong foundations for exam success. Would you like detailed insights about specific subjects or overall performance metrics?`;
    } else if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
      response = `Your AI-powered study plan dynamically adapts based on your progress, performance analytics, and learning patterns. It optimizes your time allocation across subjects and ensures steady advancement toward your exam goals. Would you like to review today's recommendations?`;
    } else {
      response = `I heard "${command}". I'm PREPZR AI, your comprehensive study companion. I can help with navigation, progress tracking, study guidance, concept explanations, exam strategies, and personalized recommendations. I understand your learning context and provide targeted assistance. How can I support your exam preparation today?`;
    }

    speakMessage(response);
    setConversationHistory(prev => [...prev, {type: 'assistant', message: response}]);
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 ${className}`}>
      {isExpanded ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border p-4 w-96 mb-4 max-h-96 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm">PREPZR AI Assistant</h3>
              <div className="flex gap-1">
                <Button
                  variant={inputMode === 'voice' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setInputMode('voice')}
                  className="h-6 w-6 p-0"
                >
                  <Mic className="h-3 w-3" />
                </Button>
                <Button
                  variant={inputMode === 'text' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setInputMode('text')}
                  className="h-6 w-6 p-0"
                >
                  <Keyboard className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          
          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto mb-3 space-y-2 text-sm">
            {conversationHistory.slice(-4).map((entry, index) => (
              <div key={index} className={`p-2 rounded ${entry.type === 'user' ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'}`}>
                <div className="font-medium text-xs">{entry.type === 'user' ? userName : 'PREPZR AI'}</div>
                <div>{entry.message}</div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            {inputMode === 'voice' ? (
              <div className="flex gap-2">
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                  className="flex-1"
                >
                  {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isListening ? 'Stop' : 'Talk'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                  className="flex-1 text-sm"
                />
                <Button size="sm" onClick={handleTextSubmit}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p className="font-medium mb-1">Try saying or typing:</p>
              <ul className="space-y-1">
                <li>"Show my progress details"</li>
                <li>"Open practice exams"</li>
                <li>"What should I study today?"</li>
                <li>"Explain my analytics"</li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
      
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
      >
        <div className="text-center">
          <div className="text-xs font-bold">AI</div>
        </div>
      </Button>
    </div>
  );
};

export default InteractiveVoiceAssistant;
