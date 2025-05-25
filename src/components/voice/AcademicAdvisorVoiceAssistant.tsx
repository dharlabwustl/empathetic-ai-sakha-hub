
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, GraduationCap, BookOpen, Calendar } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface AcademicAdvisorVoiceAssistantProps {
  userName?: string;
  isEnabled?: boolean;
  userGoals?: any[];
}

const AcademicAdvisorVoiceAssistant: React.FC<AcademicAdvisorVoiceAssistantProps> = ({
  userName = "Student",
  isEnabled = true,
  userGoals = []
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
    
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
      speakMessage("For an effective study plan, balance your weak and strong subjects. Allocate more time to challenging topics while maintaining your strengths. Include regular breaks and revision sessions.");
      return;
    }
    
    if (lowerCommand.includes('time management') || lowerCommand.includes('organize time')) {
      speakMessage("Use the Pomodoro technique: 25 minutes focused study, 5 minute break. Schedule your hardest subjects when you're most alert. Track your time to identify improvement areas.");
      return;
    }
    
    if (lowerCommand.includes('exam strategy') || lowerCommand.includes('exam preparation')) {
      speakMessage("Start with a comprehensive syllabus review. Practice previous year papers regularly. Focus on understanding concepts rather than memorization. Create a revision timetable for the final weeks.");
      return;
    }
    
    if (lowerCommand.includes('weak subjects') || lowerCommand.includes('struggling with')) {
      speakMessage("Identify specific topics within weak subjects that need attention. Use multiple learning methods: videos, practice problems, group study. Don't hesitate to seek help from teachers or peers.");
      return;
    }
    
    if (lowerCommand.includes('motivation') || lowerCommand.includes('feeling discouraged')) {
      speakMessage("Remember your goals and why they matter to you. Celebrate small victories and progress. Surround yourself with positive influences. Take care of your physical and mental health.");
      return;
    }
    
    if (lowerCommand.includes('study tips') || lowerCommand.includes('how to study better')) {
      speakMessage("Active learning is key: summarize in your own words, teach concepts to others, create mind maps. Use spaced repetition for better retention. Find your optimal study environment.");
      return;
    }
    
    if (lowerCommand.includes('goal setting') || lowerCommand.includes('set goals')) {
      speakMessage("Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound. Break long-term goals into smaller milestones. Review and adjust your goals regularly based on progress.");
      return;
    }
    
    // Default response
    speakMessage("I'm here to help with study planning, time management, exam strategies, and academic guidance. What specific area would you like advice on?");
  };
  
  const suggestions = [
    "Help me plan my studies",
    "Time management tips",
    "Exam strategies",
    "I'm struggling with subjects",
    "Need motivation"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-green-200 bg-green-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-green-800">
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
                className={`${isListening ? 'bg-green-500 hover:bg-green-600' : 'border-green-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="border-green-200"
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-green-100 p-2 rounded-md text-sm">
                <p className="font-semibold text-green-800">You said:</p>
                <p className="text-green-700">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-green-600 mb-2 flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-green-700 hover:bg-green-100"
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
              className="w-full text-green-700 hover:bg-green-100"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Academic Guidance
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AcademicAdvisorVoiceAssistant;
