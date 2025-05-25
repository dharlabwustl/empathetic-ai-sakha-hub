
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Calendar, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanVoiceAssistantProps {
  planData: TodaysPlanData | null;
  userName?: string;
  isEnabled?: boolean;
}

const TodaysPlanVoiceAssistant: React.FC<TodaysPlanVoiceAssistantProps> = ({
  planData,
  userName = "Student",
  isEnabled = true
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');

  const speakMessage = (message: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = message.replace(/PREPZR/gi, 'PREP-ZER');
      speech.lang = 'en-IN';
      speech.volume = 0.8;
      speech.rate = 0.9;
      speech.pitch = 1.1;
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('zira') ||
        !voice.name.toLowerCase().includes('male')
      );
      
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }
      
      window.speechSynthesis.speak(speech);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('progress') || lowerCommand.includes('how am i doing')) {
      const totalTasks = planData ? 
        planData.concepts.length + planData.flashcards.length + planData.practiceExams.length : 0;
      const completedTasks = planData ? 
        planData.concepts.filter(c => c.status === 'completed').length +
        planData.flashcards.filter(f => f.status === 'completed').length +
        planData.practiceExams.filter(p => p.status === 'completed').length : 0;
      
      speakMessage(`You've completed ${completedTasks} out of ${totalTasks} tasks today. Great progress, ${userName}!`);
      return;
    }
    
    if (lowerCommand.includes('next task') || lowerCommand.includes('what\'s next')) {
      const nextTask = planData?.concepts.find(c => c.status === 'pending') ||
                      planData?.flashcards.find(f => f.status === 'pending') ||
                      planData?.practiceExams.find(p => p.status === 'pending');
      
      if (nextTask) {
        speakMessage(`Your next task is: ${nextTask.title}. This should take about ${nextTask.duration} minutes.`);
      } else {
        speakMessage(`Excellent work! You've completed all your tasks for today.`);
      }
      return;
    }
    
    if (lowerCommand.includes('help') || lowerCommand.includes('assistance')) {
      speakMessage(`I'm here to help you with your study plan. You can ask me about your progress, next tasks, or get study tips. What would you like to know?`);
      return;
    }
    
    if (lowerCommand.includes('motivate') || lowerCommand.includes('encourage')) {
      speakMessage(`You're doing amazing, ${userName}! Every task you complete brings you closer to your exam goals. Keep up the excellent work!`);
      return;
    }
    
    speakMessage(`I can help you with your today's plan. Try asking about your progress, next tasks, or say "motivate me" for encouragement!`);
  };

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      speakMessage(`Hi ${userName}, I'm listening. What would you like to know about your study plan?`);
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        processVoiceCommand("progress");
      }, 3000);
    }
  };

  const suggestions = [
    "How is my progress today?",
    "What's my next task?",
    "Motivate me",
    "I need help"
  ];

  if (!isEnabled) return null;

  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-blue-200 bg-blue-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-blue-800">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Study Plan Assistant</span>
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
                onClick={handleToggleListening}
                className={`${isListening ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="border-blue-200"
              >
                {isMuted ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                {isMuted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-blue-100 p-2 rounded-md text-sm">
                <p className="font-semibold text-blue-800">You said:</p>
                <p className="text-blue-700">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-blue-600 mb-2">Try saying:</p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-blue-700 hover:bg-blue-100"
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
              className="w-full text-blue-700 hover:bg-blue-100"
            >
              <Play className="h-4 w-4 mr-2" />
              Study Assistant
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysPlanVoiceAssistant;
