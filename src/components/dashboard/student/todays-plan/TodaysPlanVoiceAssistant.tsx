
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { motion } from 'framer-motion';

interface TodaysPlanVoiceAssistantProps {
  planData: TodaysPlanData | null;
  userName?: string;
  isEnabled?: boolean;
}

const TodaysPlanVoiceAssistant: React.FC<TodaysPlanVoiceAssistantProps> = ({
  planData,
  userName = 'Student',
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Voice commands specific to today's plan
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Progress-related commands
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      if (planData) {
        const percentage = Math.round((planData.completedTasks / planData.totalTasks) * 100);
        speak(`You've completed ${planData.completedTasks} out of ${planData.totalTasks} tasks today. That's ${percentage}% progress! ${
          percentage > 70 ? 'Excellent work!' : percentage > 50 ? 'Good progress, keep it up!' : 'You can do this! Let\'s tackle the next task.'
        }`);
      }
    }
    
    // Task-specific commands
    else if (lowerCommand.includes('what\'s next') || lowerCommand.includes('next task')) {
      if (planData) {
        const pendingConcepts = planData.concepts.filter(c => c.status === 'pending');
        const pendingFlashcards = planData.flashcards.filter(f => f.status === 'pending');
        const pendingExams = planData.practiceExams.filter(p => p.status === 'pending');
        
        if (pendingConcepts.length > 0) {
          speak(`Your next task is studying ${pendingConcepts[0].title} in ${pendingConcepts[0].subject}. It should take about ${pendingConcepts[0].duration} minutes.`);
        } else if (pendingFlashcards.length > 0) {
          speak(`Next up is flashcard review: ${pendingFlashcards[0].title}. This will take ${pendingFlashcards[0].duration} minutes.`);
        } else if (pendingExams.length > 0) {
          speak(`Time for practice! ${pendingExams[0].title} is ready for you. Estimated time: ${pendingExams[0].duration} minutes.`);
        } else {
          speak(`Amazing! You've completed all your tasks for today. Time to celebrate!`);
        }
      }
    }
    
    // Backlog commands
    else if (lowerCommand.includes('backlog') || lowerCommand.includes('overdue')) {
      if (planData?.backlogTasks && planData.backlogTasks.length > 0) {
        speak(`You have ${planData.backlogTasks.length} tasks in your backlog. The oldest one is ${planData.backlogTasks[0].title}, which is ${planData.backlogTasks[0].daysOverdue} days overdue. Shall we tackle it first?`);
      } else {
        speak(`Great news! You have no backlog tasks. Your study schedule is up to date!`);
      }
    }
    
    // Time-related commands
    else if (lowerCommand.includes('time left') || lowerCommand.includes('how much time')) {
      if (planData) {
        const completedTime = Math.round((planData.completedTasks / planData.totalTasks) * planData.timeAllocation.total);
        const remainingTime = planData.timeAllocation.total - completedTime;
        speak(`You have approximately ${remainingTime} minutes of study time remaining today. That's about ${Math.round(remainingTime / 60)} hours.`);
      }
    }
    
    // Motivation commands
    else if (lowerCommand.includes('motivate') || lowerCommand.includes('encourage')) {
      const motivationalMessages = [
        `${userName}, you're doing fantastic! Every task you complete brings you closer to your ${planData?.examGoal || 'goal'}.`,
        `Remember why you started this journey. Your future self will thank you for the effort you're putting in today!`,
        `Success is the sum of small efforts repeated day in and day out. You're building that success right now!`,
        `Your ${planData?.streak || 0} day study streak shows your commitment. Let's keep that momentum going!`
      ];
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      speak(randomMessage);
    }
    
    // Study strategy commands
    else if (lowerCommand.includes('strategy') || lowerCommand.includes('how should i study')) {
      const currentHour = new Date().getHours();
      let suggestion = '';
      
      if (currentHour < 12) {
        suggestion = `It's morning - perfect time for concept learning! Your brain is fresh and ready to absorb new information. Start with your most challenging topics.`;
      } else if (currentHour < 17) {
        suggestion = `Afternoon is great for practice problems and flashcards. Your brain is active and ready for problem-solving.`;
      } else {
        suggestion = `Evening is ideal for revision and light practice. Review what you've learned today to reinforce your memory.`;
      }
      
      speak(suggestion);
    }
    
    // Default response
    else {
      speak(`I'm here to help with your study plan! You can ask me about your progress, next tasks, backlog, or time remaining. How can I assist you today?`);
    }
  };

  // Text-to-speech function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  // Speech recognition
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript;
        handleVoiceCommand(command);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isEnabled) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${isExpanded ? 'w-80' : 'w-auto'} bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white border-0 shadow-2xl transition-all duration-300`}>
        {isExpanded ? (
          <>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Study Assistant
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsExpanded(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={isListening ? "secondary" : "outline"}
                    onClick={startListening}
                    disabled={isSpeaking}
                    className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} border-white/30`}
                  >
                    {isListening ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />}
                    {isListening ? 'Listening...' : 'Ask me'}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={isSpeaking ? stopSpeaking : () => {}}
                    disabled={!isSpeaking}
                    className="bg-white/20 hover:bg-white/30 border-white/30"
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                
                {lastCommand && (
                  <div className="text-xs bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                    <p className="font-medium opacity-90">You said:</p>
                    <p className="opacity-80">"{lastCommand}"</p>
                  </div>
                )}
                
                <div className="text-xs opacity-80">
                  <p className="font-medium mb-2">Try saying:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• "What's my progress?"</li>
                    <li>• "What's next?"</li>
                    <li>• "How much time left?"</li>
                    <li>• "Motivate me"</li>
                    <li>• "Check my backlog"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-4">
            <Button
              onClick={() => setIsExpanded(true)}
              className="bg-transparent hover:bg-white/20 text-white border-white/30 transition-all duration-200"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Study Assistant
            </Button>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default TodaysPlanVoiceAssistant;
