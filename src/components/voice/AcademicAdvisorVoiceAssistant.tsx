
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, GraduationCap, BookOpen, Target } from 'lucide-react';

interface AcademicAdvisorVoiceAssistantProps {
  studentName?: string;
  isEnabled: boolean;
}

const AcademicAdvisorVoiceAssistant: React.FC<AcademicAdvisorVoiceAssistantProps> = ({
  studentName = "Student",
  isEnabled
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.lang = 'en-US';
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setCurrentMessage('Listening for your academic question...');
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setCurrentMessage('Sorry, I couldn\'t hear you clearly.');
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  const handleVoiceCommand = (command: string) => {
    setCurrentMessage(`You asked: "${command}"`);
    
    let response = '';
    
    if (command.includes('study plan') || command.includes('schedule')) {
      response = `${studentName}, I recommend creating a balanced study schedule with 2-3 hour focused blocks, regular breaks, and review sessions. Prioritize your weak subjects while maintaining strong ones.`;
    } else if (command.includes('time management') || command.includes('organize')) {
      response = `Great question! Use the Pomodoro technique: 25 minutes focused study, 5-minute break. Plan your day the night before and stick to priorities. Quality over quantity!`;
    } else if (command.includes('motivation') || command.includes('encourage')) {
      response = `${studentName}, remember that every expert was once a beginner. Your consistent effort today builds the expertise of tomorrow. Small daily improvements lead to stunning results!`;
    } else if (command.includes('exam strategy') || command.includes('preparation')) {
      response = `For exam success: 1) Create a revision timetable, 2) Practice with mock tests, 3) Focus on understanding concepts, not just memorizing, 4) Get adequate sleep before exams.`;
    } else if (command.includes('weak subject') || command.includes('struggling')) {
      response = `Don't worry about struggling subjects! Break them into smaller topics, spend extra time on fundamentals, seek help when needed, and practice regularly. Persistence pays off.`;
    } else if (command.includes('stress') || command.includes('pressure')) {
      response = `Academic stress is normal, but manageable. Take regular breaks, practice deep breathing, exercise, maintain a social support system, and remember - your worth isn't defined by grades alone.`;
    } else if (command.includes('goal') || command.includes('target')) {
      response = `Set SMART goals: Specific, Measurable, Achievable, Relevant, and Time-bound. Break big goals into smaller milestones and celebrate each achievement along the way.`;
    } else {
      response = `I'm your academic advisor, ${studentName}! I can help with study planning, time management, exam strategies, motivation, and academic guidance. What specific challenge would you like to discuss?`;
    }
    
    speak(response);
  };

  const quickActions = [
    {
      label: 'Study Planning',
      action: () => speak(`Let's create an effective study plan! Focus on understanding concepts deeply, schedule regular review sessions, and balance all subjects based on your exam weightage.`)
    },
    {
      label: 'Time Management',
      action: () => speak('Effective time management: Use time-blocking, eliminate distractions during study hours, take breaks, and maintain a consistent sleep schedule for optimal brain function.')
    },
    {
      label: 'Exam Strategy',
      action: () => speak('Winning exam strategy: Master the syllabus systematically, practice with previous years\' papers, improve speed and accuracy, and develop smart test-taking techniques.')
    },
    {
      label: 'Motivation Boost',
      action: () => speak(`${studentName}, you have incredible potential! Every challenge is an opportunity to grow stronger. Trust the process, stay consistent, and believe in yourself. Success is inevitable!`)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 border-2 border-indigo-100 dark:border-indigo-900/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">
                  Academic Advisor Assistant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get personalized academic guidance and planning
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              onClick={startListening}
              disabled={isListening || isSpeaking || !isEnabled}
              className={`flex items-center gap-2 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isListening ? 'Listening...' : 'Ask Advisor'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => speak(`Hello ${studentName}! I'm your academic advisor assistant. I'm here to help you with study planning, time management, exam strategies, and academic guidance. How can I assist you today?`)}
              disabled={isSpeaking}
              className="flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Introduction
            </Button>
          </div>

          {currentMessage && (
            <div className="mb-4 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">{currentMessage}</p>
            </div>
          )}

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Quick Guidance:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={action.action}
                      disabled={isSpeaking}
                      className="text-left justify-start"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AcademicAdvisorVoiceAssistant;
