
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, GraduationCap } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface AdvisorVoiceAssistantProps {
  studentProfile?: any;
  currentGoal?: string;
  userName?: string;
  onScheduleSession?: () => void;
  onGetAdvice?: (topic: string) => void;
  onViewProgress?: () => void;
  isEnabled?: boolean;
}

const AdvisorVoiceAssistant: React.FC<AdvisorVoiceAssistantProps> = ({
  studentProfile,
  currentGoal,
  userName,
  onScheduleSession,
  onGetAdvice,
  onViewProgress,
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
    
    // Advice seeking commands
    if (lowerCommand.includes('advice') || lowerCommand.includes('help me') || lowerCommand.includes('guidance')) {
      if (lowerCommand.includes('study') || lowerCommand.includes('studying')) {
        if (onGetAdvice) onGetAdvice('study');
        speakMessage("I can help you create an effective study plan based on your goals and current progress. Let me analyze your performance patterns.");
      } else if (lowerCommand.includes('career') || lowerCommand.includes('future')) {
        if (onGetAdvice) onGetAdvice('career');
        speakMessage("Career guidance is important for your academic journey. Based on your current goal and interests, I can suggest relevant career paths.");
      } else if (lowerCommand.includes('exam') || lowerCommand.includes('test')) {
        if (onGetAdvice) onGetAdvice('exam');
        speakMessage("Exam preparation strategies vary by subject and exam type. Let me provide personalized tips for your upcoming exams.");
      } else {
        speakMessage("I can provide advice on study strategies, career planning, exam preparation, and academic goal setting. What specific area would you like guidance on?");
      }
      return;
    }
    
    // Progress and performance commands
    if (lowerCommand.includes('progress') || lowerCommand.includes('performance') || lowerCommand.includes('how am i doing')) {
      if (onViewProgress) {
        onViewProgress();
        speakMessage("Let me show you your academic progress and performance metrics. I'll analyze your strengths and areas for improvement.");
      }
      return;
    }
    
    // Session scheduling commands
    if (lowerCommand.includes('schedule') || lowerCommand.includes('appointment') || lowerCommand.includes('session')) {
      if (onScheduleSession) {
        onScheduleSession();
        speakMessage("I'll help you schedule a one-on-one advisory session. We can discuss your goals and create a personalized action plan.");
      }
      return;
    }
    
    // Goal-related commands
    if (lowerCommand.includes('goal') || lowerCommand.includes('target')) {
      speakMessage(`Your current goal is ${currentGoal}. I can help you break this down into manageable milestones and create a timeline for achievement.`);
      return;
    }
    
    // Subject-specific advice
    if (lowerCommand.includes('physics') || lowerCommand.includes('chemistry') || lowerCommand.includes('math') || lowerCommand.includes('biology')) {
      const subject = lowerCommand.includes('physics') ? 'Physics' : 
                    lowerCommand.includes('chemistry') ? 'Chemistry' :
                    lowerCommand.includes('math') ? 'Mathematics' : 'Biology';
      speakMessage(`For ${subject}, I recommend focusing on conceptual understanding first, then practicing numerical problems. Would you like specific study strategies for this subject?`);
      return;
    }
    
    // Time management commands
    if (lowerCommand.includes('time') || lowerCommand.includes('schedule') || lowerCommand.includes('manage')) {
      speakMessage("Effective time management is crucial for academic success. I can help you create a balanced study schedule that includes breaks and revision time.");
      return;
    }
    
    // Motivation and stress commands
    if (lowerCommand.includes('motivated') || lowerCommand.includes('stress') || lowerCommand.includes('overwhelmed')) {
      speakMessage("It's normal to feel overwhelmed sometimes. Let's work on strategies to maintain motivation and manage academic stress effectively.");
      return;
    }
    
    // Default response
    speakMessage(`I'm your academic advisor AI. I can help with study planning, career guidance, progress tracking, and academic strategy. How can I assist you today?`);
  };
  
  const quickCommands = [
    "Give me study advice",
    "How is my progress?",
    "Schedule a session",
    "Help with time management",
    "Career guidance"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 fixed bottom-4 right-4 z-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center">
          <span className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-indigo-600" />
            Academic Advisor
          </span>
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
            <div className="text-xs text-center text-gray-600">
              Your AI Academic Advisor
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Listen'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
              >
                <Speaker className="h-4 w-4" />
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-muted p-2 rounded-md text-xs">
                <p className="font-semibold">You said:</p>
                <p>{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
              <div className="space-y-1">
                {quickCommands.slice(0, 3).map((command, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left w-full"
                    onClick={() => processVoiceCommand(command)}
                  >
                    "{command}"
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
              className="w-full"
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Ask Advisor
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvisorVoiceAssistant;
