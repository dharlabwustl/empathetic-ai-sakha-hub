
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Calendar, Target, RotateCcw } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface TodaysPlanVoiceAssistantProps {
  planData?: any;
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
    
    if (lowerCommand.includes('what should i study') || lowerCommand.includes('what\'s next')) {
      const nextTask = planData?.concepts?.[0] || planData?.flashcards?.[0] || planData?.practiceExams?.[0];
      if (nextTask) {
        speakMessage(`Your next task is ${nextTask.title}. It should take about ${nextTask.duration} minutes to complete.`);
      } else {
        speakMessage("Great job! You've completed all your tasks for today. Consider reviewing some concepts or taking a break.");
      }
      return;
    }
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      const totalTasks = (planData?.concepts?.length || 0) + (planData?.flashcards?.length || 0) + (planData?.practiceExams?.length || 0);
      const completedTasks = planData?.completedTasks || 0;
      const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      
      speakMessage(`You've completed ${completedTasks} out of ${totalTasks} tasks today. That's ${progressPercent}% progress. Keep up the great work!`);
      return;
    }
    
    if (lowerCommand.includes('backlog') || lowerCommand.includes('pending tasks')) {
      const backlogCount = planData?.backlogTasks?.length || 0;
      if (backlogCount > 0) {
        speakMessage(`You have ${backlogCount} tasks in your backlog. I recommend tackling the oldest ones first to stay on track.`);
      } else {
        speakMessage("Excellent! You have no pending tasks in your backlog. You're staying on top of your studies.");
      }
      return;
    }
    
    if (lowerCommand.includes('time') || lowerCommand.includes('how long')) {
      const totalTime = planData?.totalTime || planData?.estimatedTime || 0;
      speakMessage(`Your study plan for today is estimated to take ${totalTime} minutes. Remember to take breaks every 25-30 minutes.`);
      return;
    }
    
    if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage me')) {
      speakMessage("You're doing amazing! Every concept you master brings you closer to your goals. Stay focused, take breaks when needed, and remember that consistent effort leads to success.");
      return;
    }
    
    if (lowerCommand.includes('break') || lowerCommand.includes('rest')) {
      speakMessage("Taking breaks is crucial for effective learning. Try the Pomodoro technique: 25 minutes of study followed by a 5-minute break. Your brain will thank you!");
      return;
    }
    
    // Default response
    speakMessage("I can help you with your study plan, check your progress, manage your backlog, or provide motivation. What would you like to know?");
  };
  
  const suggestions = [
    "What should I study next?",
    "How am I doing?",
    "Check my backlog",
    "How much time left?",
    "Motivate me"
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
            <span>Plan Assistant</span>
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
                <Target className="h-3 w-3" />
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
              <RotateCcw className="h-4 w-4 mr-2" />
              Plan Assistant
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysPlanVoiceAssistant;
