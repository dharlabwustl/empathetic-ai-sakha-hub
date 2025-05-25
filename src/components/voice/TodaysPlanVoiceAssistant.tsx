
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageCircle,
  Bot,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanVoiceAssistantProps {
  planData: TodaysPlanData | null;
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
  const [isMinimized, setIsMinimized] = useState(true);
  const [lastMessage, setLastMessage] = useState<string>('');

  // Voice synthesis setup
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  // Voice recognition setup
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        setIsListening(false);
        console.error('Speech recognition error:', event.error);
      };
      
      recognition.start();
    }
  };

  // Handle voice commands
  const handleVoiceCommand = (command: string) => {
    let response = '';
    
    if (command.includes('progress') || command.includes('how am i doing')) {
      const completionRate = planData ? Math.round((planData.completedTasks / planData.totalTasks) * 100) : 0;
      response = `You've completed ${planData?.completedTasks || 0} out of ${planData?.totalTasks || 0} tasks today, that's ${completionRate}% progress. `;
      
      if (completionRate >= 70) {
        response += 'Excellent work! You\'re almost done for the day.';
      } else if (completionRate >= 40) {
        response += 'Good progress! Keep going, you\'re doing great.';
      } else {
        response += 'Let\'s get started! I recommend beginning with a concept to build momentum.';
      }
    }
    
    else if (command.includes('backlog') || command.includes('overdue')) {
      const backlogCount = planData?.backlogTasks?.length || 0;
      const overdueCount = planData?.backlogTasks?.filter(task => task.status === 'overdue').length || 0;
      
      if (backlogCount === 0) {
        response = 'Great news! You have no pending backlog tasks. You\'re all caught up!';
      } else {
        response = `You have ${backlogCount} tasks in your backlog, with ${overdueCount} overdue tasks. `;
        response += 'I recommend tackling the overdue tasks first to get back on track.';
      }
    }
    
    else if (command.includes('next') || command.includes('what should i do')) {
      const incompleteTasks = [
        ...(planData?.concepts.filter(c => c.status !== 'completed') || []),
        ...(planData?.flashcards.filter(f => f.status !== 'completed') || []),
        ...(planData?.practiceExams.filter(p => p.status !== 'completed') || [])
      ];
      
      if (incompleteTasks.length > 0) {
        const nextTask = incompleteTasks[0];
        response = `I suggest you work on "${nextTask.title}" next. It's estimated to take ${nextTask.duration} minutes.`;
      } else {
        response = 'Congratulations! You\'ve completed all your tasks for today. Great job!';
      }
    }
    
    else if (command.includes('time') || command.includes('schedule')) {
      const totalTime = planData?.timeAllocation.total || 0;
      const completedTime = Math.round(totalTime * ((planData?.completedTasks || 0) / (planData?.totalTasks || 1)) * 100) / 100;
      response = `Your total study plan is ${totalTime} minutes. You've completed approximately ${completedTime} minutes so far.`;
    }
    
    else if (command.includes('streak')) {
      const streak = planData?.streak || 0;
      response = `You're on a ${streak} day study streak! `;
      if (streak >= 7) {
        response += 'That\'s a full week! Amazing dedication.';
      } else if (streak >= 3) {
        response += 'Great consistency! Keep it up.';
      } else {
        response += 'Every day counts! You\'re building a great habit.';
      }
    }
    
    else if (command.includes('motivate') || command.includes('motivation')) {
      const motivationalMessages = [
        `${userName}, you're doing amazing! Every step forward is progress.`,
        'Remember, consistency beats perfection. You\'re building great study habits!',
        'Your future self will thank you for the effort you\'re putting in today.',
        'Learning is a journey, not a destination. Enjoy the process!',
        'You\'re not just studying, you\'re investing in your dreams.'
      ];
      response = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    }
    
    else {
      response = 'I can help you with your study plan! Try asking about your progress, backlog tasks, what to do next, or your study streak.';
    }
    
    setLastMessage(response);
    speak(response);
  };

  // Auto-minimize after inactivity
  useEffect(() => {
    if (!isMinimized) {
      const timer = setTimeout(() => {
        setIsMinimized(true);
      }, 30000); // Auto-minimize after 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isMinimized, isListening, isSpeaking]);

  if (!isEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl"
        >
          <Bot className="h-8 w-8 text-white" />
        </Button>
      ) : (
        <Card className="w-80 bg-white dark:bg-gray-800 shadow-2xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-purple-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Study Assistant</h3>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {lastMessage && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {lastMessage}
                </p>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Button
                onClick={startListening}
                disabled={isListening || isSpeaking}
                className={`flex-1 ${
                  isListening 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white`}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Listening...
                  </>
                ) : isSpeaking ? (
                  <>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Speaking...
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Ask Me
                  </>
                )}
              </Button>
              
              <Badge variant="outline" className="text-xs">
                Voice Ready
              </Badge>
            </div>
            
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Try: "How's my progress?", "What's next?", "Check my backlog"
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TodaysPlanVoiceAssistant;
