
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Calendar, CheckCircle, Clock } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanVoiceAssistantProps {
  planData?: TodaysPlanData | null;
  userName?: string;
  isEnabled?: boolean;
}

const TodaysPlanVoiceAssistant: React.FC<TodaysPlanVoiceAssistantProps> = ({
  planData,
  userName = "Student",
  isEnabled = true
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const {
    voiceSettings,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript
  } = useVoiceAnnouncer({ userName });
  
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      const completedTasks = planData?.completedTasks || 0;
      const totalTasks = planData?.totalTasks || 0;
      const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      
      speakMessage(`You've completed ${completedTasks} out of ${totalTasks} tasks today. That's ${percentage}% progress. ${percentage >= 70 ? 'Excellent work!' : percentage >= 50 ? 'Good progress, keep going!' : 'You can do this, stay focused!'}`);
      return;
    }
    
    if (lowerCommand.includes('what tasks') || lowerCommand.includes('what should i do')) {
      const pendingConcepts = planData?.concepts?.filter(c => c.status === 'pending')?.length || 0;
      const pendingFlashcards = planData?.flashcards?.filter(f => f.status === 'pending')?.length || 0;
      const pendingExams = planData?.practiceExams?.filter(p => p.status === 'pending')?.length || 0;
      
      speakMessage(`You have ${pendingConcepts} concepts to study, ${pendingFlashcards} flashcard sets to review, and ${pendingExams} practice exams pending. I recommend starting with concepts first.`);
      return;
    }
    
    if (lowerCommand.includes('backlog') || lowerCommand.includes('overdue')) {
      const backlogCount = planData?.backlogTasks?.length || 0;
      if (backlogCount > 0) {
        speakMessage(`You have ${backlogCount} overdue tasks in your backlog. Consider tackling these first to catch up on your studies.`);
      } else {
        speakMessage("Great! You don't have any overdue tasks. You're staying on track with your studies.");
      }
      return;
    }
    
    if (lowerCommand.includes('time') || lowerCommand.includes('how long')) {
      const totalTime = planData?.timeAllocation?.total || 0;
      speakMessage(`Your total study time planned for today is ${totalTime} minutes. Remember to take breaks between study sessions for better retention.`);
      return;
    }
    
    if (lowerCommand.includes('streak') || lowerCommand.includes('consecutive days')) {
      const streak = planData?.streak || 0;
      speakMessage(`You're on a ${streak} day study streak! ${streak >= 7 ? 'Amazing consistency!' : streak >= 3 ? 'Keep it up!' : 'Great start, build on this momentum!'}`);
      return;
    }
    
    if (lowerCommand.includes('suggestions') || lowerCommand.includes('what do you recommend')) {
      speakMessage("Based on your progress, I suggest focusing on pending concepts first, then reviewing flashcards, and finishing with practice exams. Take short breaks between different types of activities.");
      return;
    }
    
    // Default response
    speakMessage("I can help you track your progress, manage tasks, handle backlogs, and provide study recommendations for today's plan.");
  };
  
  const suggestions = [
    "How am I doing today?",
    "What tasks should I do?",
    "Check my backlog",
    "What do you recommend?",
    "How's my streak?"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-indigo-200 bg-indigo-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-indigo-800">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Today's Plan Assistant</span>
          </div>
          {expanded && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {expanded ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-indigo-500 hover:bg-indigo-600' : 'border-indigo-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="border-indigo-200"
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-indigo-100 p-2 rounded-md text-sm">
                <p className="font-semibold text-indigo-800">You said:</p>
                <p className="text-indigo-700">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-indigo-600 mb-2 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-indigo-700 hover:bg-indigo-100"
                    onClick={() => {
                      processVoiceCommand(suggestion);
                    }}
                  >
                    "{suggestion}"
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(true)}
              className="w-full text-indigo-700 hover:bg-indigo-100"
            >
              <Clock className="h-4 w-4 mr-2" />
              Plan Assistant
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysPlanVoiceAssistant;
