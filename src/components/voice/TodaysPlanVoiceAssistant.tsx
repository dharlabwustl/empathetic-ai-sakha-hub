
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Calendar, CheckCircle, Target } from "lucide-react";
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
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      const completedTasks = planData?.concepts?.filter((c: any) => c.status === 'completed')?.length || 0;
      const totalTasks = planData?.concepts?.length || 0;
      speakMessage(`You've completed ${completedTasks} out of ${totalTasks} tasks today. Great progress!`);
      return;
    }
    
    if (lowerCommand.includes('next task') || lowerCommand.includes('what should i do next')) {
      const nextTask = planData?.concepts?.find((c: any) => c.status !== 'completed');
      if (nextTask) {
        speakMessage(`Your next task is to study ${nextTask.title} in ${nextTask.subject}. It should take about ${nextTask.duration} minutes.`);
      } else {
        speakMessage("Congratulations! You've completed all tasks for today.");
      }
      return;
    }
    
    if (lowerCommand.includes('break') || lowerCommand.includes('take a break')) {
      speakMessage("Taking breaks is important for effective learning. Try the Pomodoro technique: 25 minutes study, 5 minute break. You've earned it!");
      return;
    }
    
    if (lowerCommand.includes('backlog') || lowerCommand.includes('pending tasks')) {
      const backlogCount = planData?.backlogTasks?.length || 0;
      if (backlogCount > 0) {
        speakMessage(`You have ${backlogCount} tasks in your backlog. Consider tackling them when you have extra time or energy.`);
      } else {
        speakMessage("Great news! You have no pending tasks in your backlog.");
      }
      return;
    }
    
    if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage me')) {
      speakMessage("You're doing amazing! Every task you complete brings you closer to your goals. Remember, consistency beats perfection. Keep going!");
      return;
    }
    
    if (lowerCommand.includes('time management') || lowerCommand.includes('schedule')) {
      speakMessage("Focus on your most challenging subjects when you're most alert. Use time-blocking to allocate specific periods for each task. You can do this!");
      return;
    }
    
    // Default response
    speakMessage("I can help you track your progress, suggest next tasks, provide motivation, or give time management tips. What would you like to know?");
  };
  
  const suggestions = [
    "How am I doing?",
    "What's my next task?",
    "I need motivation",
    "Time management tips",
    "Backlog status"
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
              <CheckCircle className="h-4 w-4 mr-2" />
              Plan Assistant
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysPlanVoiceAssistant;
