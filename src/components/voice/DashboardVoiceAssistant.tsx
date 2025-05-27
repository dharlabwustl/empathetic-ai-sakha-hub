
import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardVoiceAssistantProps {
  userName: string;
  language?: string;
  userPerformance?: {
    examReadiness: number;
    completedTasks: number;
    totalTasks: number;
    streak: number;
  };
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName,
  language = 'en-US',
  userPerformance
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTextMode, setIsTextMode] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

    // Check if user is returning
    const lastVisit = localStorage.getItem('lastDashboardVisit');
    if (lastVisit) {
      setIsReturningUser(true);
    }
    localStorage.setItem('lastDashboardVisit', new Date().toISOString());
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

  const getContextualGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = '';
    
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 17) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    if (isReturningUser && userPerformance) {
      const progressMessage = userPerformance.examReadiness > 70 
        ? 'You\'re performing excellently with a strong exam readiness score!'
        : userPerformance.examReadiness > 50
        ? 'You\'re making good progress! Let\'s boost your exam readiness further.'
        : 'I\'m here to help you accelerate your preparation and improve your exam readiness.';
      
      return `${timeGreeting}, ${userName}! Welcome back to your study dashboard. ${progressMessage}`;
    }
    
    return `${timeGreeting}, ${userName}! Welcome to your personalized PREP-zer study dashboard. I\'m your AI study companion ready to guide you through your preparation journey.`;
  };

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    console.log('Dashboard AI processing command:', lowerCommand);

    // Welcome and greetings
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi') || lowerCommand.includes('hey')) {
      speakMessage(getContextualGreeting());
      return;
    }

    // Study plan navigation
    if (lowerCommand.includes('study plan') || lowerCommand.includes('learning path')) {
      navigate('/dashboard/student/study-plan');
      speakMessage(`Opening your personalized study plan, ${userName}. Here you'll find your AI-generated learning path optimized for your exam preparation.`);
      return;
    }

    // Academic advisor
    if (lowerCommand.includes('academic advisor') || lowerCommand.includes('advisor') || lowerCommand.includes('mentor')) {
      navigate('/dashboard/student/academic-advisor');
      speakMessage('Connecting you with your AI academic advisor. Get personalized guidance, study strategies, and expert recommendations tailored to your preparation needs.');
      return;
    }

    // Today's plan
    if (lowerCommand.includes('today') || lowerCommand.includes('daily plan') || lowerCommand.includes('today\'s plan')) {
      navigate('/dashboard/student/todays-plan');
      speakMessage('Opening your today\'s plan. Here you\'ll find your personalized daily tasks, study schedule, and priority items for optimal preparation.');
      return;
    }

    // Concept cards
    if (lowerCommand.includes('concept') || lowerCommand.includes('concepts')) {
      navigate('/dashboard/student/concepts');
      speakMessage('Navigating to your concept cards. Master key topics through our interactive, AI-powered concept learning system with multimedia content and personalized explanations.');
      return;
    }

    // Flashcards
    if (lowerCommand.includes('flashcard') || lowerCommand.includes('flashcards')) {
      navigate('/dashboard/student/flashcards');
      speakMessage('Opening your smart flashcards. Use spaced repetition and AI-powered review scheduling to efficiently memorize important formulas, definitions, and key concepts.');
      return;
    }

    // Practice exams
    if (lowerCommand.includes('practice exam') || lowerCommand.includes('mock test') || lowerCommand.includes('practice test')) {
      navigate('/dashboard/student/practice-exams');
      speakMessage('Taking you to practice exams. Test your knowledge with realistic exam simulations, detailed analytics, and performance insights to track your preparation progress.');
      return;
    }

    // Formula practice
    if (lowerCommand.includes('formula') || lowerCommand.includes('formula lab')) {
      navigate('/dashboard/student/formula-lab');
      speakMessage('Opening the formula lab. Practice with interactive formulas, step-by-step derivations, and hands-on problem solving to master mathematical concepts.');
      return;
    }

    // Exam readiness
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness score')) {
      navigate('/dashboard/student/exam-readiness');
      speakMessage('Checking your exam readiness analysis. Get comprehensive insights into your preparation level, subject-wise performance, and actionable recommendations for improvement.');
      return;
    }

    // Pending tasks and backlogs
    if (lowerCommand.includes('pending') || lowerCommand.includes('backlog') || lowerCommand.includes('incomplete')) {
      navigate('/dashboard/student/todays-plan');
      speakMessage('Showing your pending tasks and backlogs. Let\'s get you caught up with incomplete assignments and overdue study materials to keep your preparation on track.');
      return;
    }

    // Performance and analytics
    if (lowerCommand.includes('performance') || lowerCommand.includes('analytics') || lowerCommand.includes('progress')) {
      navigate('/dashboard/student/analytics');
      speakMessage('Opening your performance analytics. Review detailed insights into your study patterns, improvement trends, and predictive analysis for exam success.');
      return;
    }

    // Motivation and encouragement
    if (lowerCommand.includes('motivate') || lowerCommand.includes('encourage') || lowerCommand.includes('boost')) {
      const motivationalMessage = userPerformance?.streak 
        ? `Amazing! You're on a ${userPerformance.streak}-day study streak, ${userName}! Your consistency is building the foundation for exam success. Keep this momentum going!`
        : `You're capable of achieving greatness, ${userName}! Every study session brings you closer to your goals. Your dedication today shapes your success tomorrow!`;
      
      speakMessage(motivationalMessage);
      return;
    }

    // Study suggestions
    if (lowerCommand.includes('suggest') || lowerCommand.includes('recommend') || lowerCommand.includes('what should')) {
      const suggestion = userPerformance?.examReadiness && userPerformance.examReadiness < 60
        ? 'Based on your current progress, I recommend focusing on practice exams to identify weak areas, then using concept cards to strengthen those topics.'
        : 'You\'re doing well! I suggest maintaining your study routine with regular practice tests and reviewing flashcards for concept reinforcement.';
      
      speakMessage(suggestion);
      return;
    }

    // Complete tasks
    if (lowerCommand.includes('complete') || lowerCommand.includes('finish') || lowerCommand.includes('mark done')) {
      speakMessage('I can help you mark tasks as complete. Please navigate to your today\'s plan or specific study section to update task status.');
      return;
    }

    // Syllabus and curriculum
    if (lowerCommand.includes('syllabus') || lowerCommand.includes('curriculum')) {
      navigate('/dashboard/student/syllabus');
      speakMessage('Opening your exam syllabus. Track your coverage across all topics, monitor completion percentages, and ensure comprehensive preparation for your target exam.');
      return;
    }

    // Settings and profile
    if (lowerCommand.includes('setting') || lowerCommand.includes('profile') || lowerCommand.includes('account')) {
      navigate('/dashboard/student/profile');
      speakMessage('Opening your profile settings. Customize your learning preferences, update personal information, and configure your study environment.');
      return;
    }

    // Help and guidance
    if (lowerCommand.includes('help') || lowerCommand.includes('guide') || lowerCommand.includes('support')) {
      speakMessage(`I'm here to help you navigate your dashboard, ${userName}! I can guide you to study plans, concept cards, practice exams, flashcards, exam readiness analysis, and much more. What specific area would you like to explore?`);
      return;
    }

    // Default response with personalized guidance
    const defaultResponse = isReturningUser && userPerformance
      ? `How can I help with your preparation today, ${userName}? You can ask me to open your study plan, check today's tasks, start practice exams, review concepts, or get study suggestions. Your current exam readiness is ${userPerformance.examReadiness}% - let's work on improving it together!`
      : `Welcome to your study dashboard, ${userName}! I can help you navigate to your study plan, today's tasks, concept cards, flashcards, practice exams, formula lab, or check your exam readiness. What would you like to explore first?`;
    
    speakMessage(defaultResponse);
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

  // Context-aware initial greeting
  useEffect(() => {
    const hasGreeted = sessionStorage.getItem(`dashboard_voice_greeted_${userName}`);
    if (!hasGreeted) {
      setTimeout(() => {
        speakMessage(getContextualGreeting() + ' How can I assist with your studies today?');
        sessionStorage.setItem(`dashboard_voice_greeted_${userName}`, 'true');
      }, 2000);
    }
  }, [userName, isReturningUser]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-2">
        {/* Text input mode */}
        {isTextMode && (
          <div className="bg-white rounded-lg shadow-lg p-4 w-80 border">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold">Study AI Assistant</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your studies..."
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

export default DashboardVoiceAssistant;
