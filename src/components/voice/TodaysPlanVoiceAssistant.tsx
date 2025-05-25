
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, Calendar, Clock, Target } from 'lucide-react';

interface TodaysPlanVoiceAssistantProps {
  planData: any;
  userName?: string;
  isEnabled: boolean;
}

const TodaysPlanVoiceAssistant: React.FC<TodaysPlanVoiceAssistantProps> = ({
  planData,
  userName = "Student",
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
        setCurrentMessage('Listening...');
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
    setCurrentMessage(`You said: "${command}"`);
    
    let response = '';
    
    if (command.includes('progress') || command.includes('how am i doing')) {
      const progress = planData?.overallProgress || 35;
      response = `You're doing great, ${userName}! You've completed ${progress}% of today's plan. Keep up the excellent work!`;
    } else if (command.includes('next task') || command.includes('what should i do')) {
      response = `Your next recommended task is to review Newton's Laws of Motion. It should take about 30 minutes. Would you like me to help you get started?`;
    } else if (command.includes('time') || command.includes('schedule')) {
      response = `You've spent 45 minutes studying today. Your target is 3 hours, so you have 2 hours and 15 minutes remaining. You're on track!`;
    } else if (command.includes('break') || command.includes('tired')) {
      response = `It sounds like you need a break! You've been studying hard. Try taking a 10-minute break, maybe do some stretching or grab a healthy snack.`;
    } else if (command.includes('help') || command.includes('stuck')) {
      response = `I'm here to help! You can ask me about your progress, next tasks, study tips, or if you need motivation. What specific area would you like help with?`;
    } else if (command.includes('motivation') || command.includes('encourage')) {
      response = `You're doing amazing, ${userName}! Remember, every concept you master brings you closer to your goals. Your consistency is your superpower!`;
    } else {
      response = `I understand you're asking about "${command}". I can help you with your study progress, next tasks, scheduling, or provide motivation. What would you like to know?`;
    }
    
    speak(response);
  };

  const getTodaysSummary = () => {
    const completedTasks = planData?.completedTasks || 3;
    const totalTasks = planData?.totalTasks || 8;
    const timeSpent = planData?.timeSpent || 45;
    
    return `Good to see you, ${userName}! Today you've completed ${completedTasks} out of ${totalTasks} tasks and studied for ${timeSpent} minutes. You're making excellent progress!`;
  };

  const quickActions = [
    {
      label: 'Progress Update',
      action: () => speak(getTodaysSummary())
    },
    {
      label: 'Next Task',
      action: () => speak('Your next task is to review Newton\'s Laws of Motion. It\'s a medium difficulty concept that should take about 30 minutes.')
    },
    {
      label: 'Motivation',
      action: () => speak(`You're doing fantastic, ${userName}! Your dedication to learning is inspiring. Remember, every small step counts towards your big goals!`)
    },
    {
      label: 'Study Tips',
      action: () => speak('Here\'s a study tip: Use the Feynman Technique! Try explaining the concept you just learned in simple terms as if teaching a friend. This helps identify gaps in understanding.')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:from-purple-950/30 dark:to-blue-950/30 border-2 border-purple-100 dark:border-purple-900/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                  Today's Plan Assistant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  AI-powered study companion for your daily goals
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
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isListening ? 'Listening...' : 'Ask Assistant'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => speak(getTodaysSummary())}
              disabled={isSpeaking}
              className="flex items-center gap-2"
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              Today's Summary
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
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Quick Actions:</h4>
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

export default TodaysPlanVoiceAssistant;
