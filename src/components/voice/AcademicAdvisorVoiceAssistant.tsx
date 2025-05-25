
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, GraduationCap, Target, TrendingUp, Volume2, VolumeX } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface AcademicAdvisorVoiceAssistantProps {
  currentGoal?: string;
  academicLevel?: string;
  isEnabled?: boolean;
  userName?: string;
}

const AcademicAdvisorVoiceAssistant: React.FC<AcademicAdvisorVoiceAssistantProps> = ({
  currentGoal = "NEET",
  academicLevel = "Class 12",
  isEnabled = true,
  userName = "Student"
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
    
    if (lowerCommand.includes('study plan') || lowerCommand.includes('planning')) {
      speakMessage(`For ${currentGoal} preparation, I recommend a structured approach: Focus 40% on Physics, 30% on Chemistry, and 30% on Biology. Allocate daily time for theory, numericals, and revision. Would you like a detailed weekly breakdown?`);
      return;
    }
    
    if (lowerCommand.includes('time management') || lowerCommand.includes('schedule')) {
      speakMessage(`Effective time management for ${currentGoal}: Study in 90-minute blocks with 15-minute breaks. Morning for complex topics, evening for revision. Track your progress weekly and adjust as needed.`);
      return;
    }
    
    if (lowerCommand.includes('weak subjects') || lowerCommand.includes('improvement')) {
      speakMessage(`To improve weak subjects: Identify specific topics causing difficulty, use multiple learning methods, practice more problems, and don't hesitate to seek help. Consistent daily practice shows better results than cramming.`);
      return;
    }
    
    if (lowerCommand.includes('exam strategy') || lowerCommand.includes('test taking')) {
      speakMessage(`${currentGoal} exam strategy: Read questions carefully, attempt easy ones first, manage time per section, avoid negative marking pitfalls, and review answers if time permits. Practice with mock tests regularly.`);
      return;
    }
    
    if (lowerCommand.includes('motivation') || lowerCommand.includes('stressed') || lowerCommand.includes('overwhelmed')) {
      speakMessage(`It's normal to feel overwhelmed during ${currentGoal} preparation. Remember your goals, celebrate small wins, maintain a healthy routine, and connect with supportive peers. Every expert was once a beginner. You've got this, ${userName}!`);
      return;
    }
    
    if (lowerCommand.includes('resources') || lowerCommand.includes('books') || lowerCommand.includes('materials')) {
      speakMessage(`For ${currentGoal} preparation: Use NCERT as base, reference books for practice, online platforms for concepts, and previous year papers for patterns. Quality over quantity - master fewer resources completely.`);
      return;
    }
    
    if (lowerCommand.includes('revision') || lowerCommand.includes('review')) {
      speakMessage(`Effective revision strategy: Review daily what you learned, weekly topic summaries, monthly subject overviews. Use active recall, flashcards, and teach concepts to others. Spaced repetition works better than massed practice.`);
      return;
    }
    
    if (lowerCommand.includes('career') || lowerCommand.includes('after exam') || lowerCommand.includes('future')) {
      speakMessage(`After ${currentGoal}, you'll have excellent opportunities in medical sciences, research, healthcare, and related fields. Focus on your preparation now, but it's good to explore your interests for informed choices later.`);
      return;
    }
    
    // Default response
    speakMessage(`I'm your academic advisor for ${currentGoal} preparation. I can help with study planning, time management, exam strategies, motivation, and academic guidance. What would you like to discuss?`);
  };
  
  const suggestions = [
    "Help with study planning",
    "Time management tips",
    "Exam strategies",
    "I need motivation",
    "Revision techniques"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-green-200 bg-green-50 dark:bg-green-900/20`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-green-800 dark:text-green-200">
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
            <div className="text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-800/50 p-2 rounded">
              <div className="flex justify-between">
                <span>Goal: <strong>{currentGoal}</strong></span>
                <span>{academicLevel}</span>
              </div>
            </div>
            
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
                {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-md text-sm">
                <p className="font-semibold text-green-800 dark:text-green-200">You said:</p>
                <p className="text-green-700 dark:text-green-300">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-green-600 dark:text-green-400 mb-2 flex items-center gap-1">
                <Target className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/50"
                    onClick={() => processVoiceCommand(suggestion)}
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
              className="w-full text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/50"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Academic Guidance
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AcademicAdvisorVoiceAssistant;
