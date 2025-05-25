
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, GraduationCap, Star, Target } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface AcademicAdvisorVoiceAssistantProps {
  userName?: string;
  currentGoal?: string;
  isEnabled?: boolean;
}

const AcademicAdvisorVoiceAssistant: React.FC<AcademicAdvisorVoiceAssistantProps> = ({
  userName = "Student",
  currentGoal = "Academic Excellence",
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
    
    if (lowerCommand.includes('study plan') || lowerCommand.includes('how to study')) {
      speakMessage(`For your ${currentGoal}, I recommend a structured approach: Set clear daily goals, use spaced repetition for better retention, take regular breaks, and focus on understanding concepts rather than memorizing. Mix different study methods like reading, practice, and teaching others.`);
      return;
    }
    
    if (lowerCommand.includes('time management') || lowerCommand.includes('schedule')) {
      speakMessage(`Effective time management is crucial! Create a weekly schedule with dedicated study blocks. Use the Pomodoro technique - 25 minutes focused study, 5 minute breaks. Prioritize difficult subjects when your energy is highest.`);
      return;
    }
    
    if (lowerCommand.includes('motivation') || lowerCommand.includes('stay focused')) {
      speakMessage(`Remember why you started this journey! ${currentGoal} is within your reach. Set small, achievable milestones. Celebrate your progress. Surround yourself with positive influences and remember that every expert was once a beginner.`);
      return;
    }
    
    if (lowerCommand.includes('exam strategy') || lowerCommand.includes('test taking')) {
      speakMessage(`Smart exam strategies: Read all questions first to plan your time. Start with questions you know well to build confidence. For difficult questions, eliminate wrong answers first. Always review your answers if time permits.`);
      return;
    }
    
    if (lowerCommand.includes('stress') || lowerCommand.includes('anxiety')) {
      speakMessage(`It's normal to feel stressed about academics. Practice deep breathing, get adequate sleep, exercise regularly, and maintain a balanced diet. Remember that some stress can be motivating, but too much hinders performance. Talk to someone if you're overwhelmed.`);
      return;
    }
    
    if (lowerCommand.includes('goal setting') || lowerCommand.includes('targets')) {
      speakMessage(`Let's refine your goals for ${currentGoal}! Use SMART goals - Specific, Measurable, Achievable, Relevant, and Time-bound. Break long-term goals into smaller weekly and daily targets. Track your progress regularly.`);
      return;
    }
    
    // Default response
    speakMessage(`I'm your academic advisor, here to guide you toward ${currentGoal}! I can help with study planning, time management, motivation, exam strategies, and goal setting. What would you like guidance on?`);
  };
  
  const suggestions = [
    "Create a study plan",
    "Time management tips",
    "Keep me motivated",
    "Exam strategies",
    "Set better goals"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-orange-200 bg-orange-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-orange-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Academic Advisor</span>
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
                className={`${isListening ? 'bg-orange-500 hover:bg-orange-600' : 'border-orange-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="border-orange-200"
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-orange-100 p-2 rounded-md text-sm">
                <p className="font-semibold text-orange-800">You said:</p>
                <p className="text-orange-700">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-orange-600 mb-2 flex items-center gap-1">
                <Star className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-orange-700 hover:bg-orange-100"
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
              className="w-full text-orange-700 hover:bg-orange-100"
            >
              <Target className="h-4 w-4 mr-2" />
              Academic Guide
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AcademicAdvisorVoiceAssistant;
