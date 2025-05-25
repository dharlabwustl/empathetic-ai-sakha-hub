
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, GraduationCap } from 'lucide-react';

interface AcademicAdvisorVoiceAssistantProps {
  studentName?: string;
  examGoal?: string;
  currentGrade?: string;
  isEnabled?: boolean;
}

const AcademicAdvisorVoiceAssistant: React.FC<AcademicAdvisorVoiceAssistantProps> = ({
  studentName = 'Student',
  examGoal = 'NEET',
  currentGrade = '12th',
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  // Voice commands specific to academic advisory
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Study plan commands
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
      speak(`For ${examGoal} preparation, I recommend a structured study plan. Focus on your weak subjects first, maintain consistency, and include regular revision. Balance is key - don't neglect any subject completely.`);
    }
    
    // Career guidance commands
    else if (lowerCommand.includes('career') || lowerCommand.includes('future')) {
      speak(`${examGoal} opens doors to many exciting career paths in medicine and healthcare. Consider your interests - research, clinical practice, specializations, or even medical technology. Each path has unique opportunities.`);
    }
    
    // Subject advice commands
    else if (lowerCommand.includes('subject') || lowerCommand.includes('physics') || lowerCommand.includes('chemistry') || lowerCommand.includes('biology')) {
      speak(`Each subject in ${examGoal} requires different strategies. Physics needs concept clarity and problem practice. Chemistry balances theory with numerical problems. Biology requires memory techniques and visual learning.`);
    }
    
    // Time management commands
    else if (lowerCommand.includes('time') || lowerCommand.includes('manage')) {
      speak(`Time management is crucial for ${examGoal} success. Use the Pomodoro technique, prioritize difficult topics, take regular breaks, and maintain a daily routine. Quality study time is better than quantity.`);
    }
    
    // Motivation and stress commands
    else if (lowerCommand.includes('stress') || lowerCommand.includes('pressure') || lowerCommand.includes('motivate')) {
      speak(`${studentName}, exam stress is normal, but manageable. Take deep breaths, maintain perspective, and remember your goals. Regular exercise, good sleep, and healthy eating support your mental well-being.`);
    }
    
    // Goal setting commands
    else if (lowerCommand.includes('goal') || lowerCommand.includes('target')) {
      speak(`Setting clear, achievable goals is important. Break your ${examGoal} preparation into monthly, weekly, and daily targets. Celebrate small wins and adjust goals as needed. Progress, not perfection!`);
    }
    
    // Study techniques commands
    else if (lowerCommand.includes('technique') || lowerCommand.includes('method')) {
      speak(`Effective study techniques for ${examGoal}: Active recall, spaced repetition, concept mapping, and practice tests. Mix different methods to keep learning engaging and effective.`);
    }
    
    // Exam strategy commands
    else if (lowerCommand.includes('exam strategy') || lowerCommand.includes('test taking')) {
      speak(`For ${examGoal} exam strategy: Read questions carefully, manage time per section, attempt easier questions first, and don't get stuck on difficult ones. Practice with mock tests regularly.`);
    }
    
    // College and admission commands
    else if (lowerCommand.includes('college') || lowerCommand.includes('admission')) {
      speak(`${examGoal} preparation also means thinking about college choices. Research different medical colleges, understand their cut-offs, and have backup options. Focus on your preparation while staying informed.`);
    }
    
    // Default response
    else {
      speak(`Hello ${studentName}! I'm your academic advisor for ${examGoal} preparation. I can help with study plans, career guidance, subject strategies, time management, and motivation. What would you like to discuss today?`);
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

  // Auto-greet when component mounts
  useEffect(() => {
    if (isEnabled) {
      const greeting = `Hello ${studentName}! I'm your academic advisor for ${examGoal} preparation. I'm here to guide you through your academic journey and help you achieve your goals. How can I assist you today?`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [studentName, examGoal, isEnabled]);

  if (!isEnabled) return null;

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-amber-600" />
            <h3 className="font-semibold text-sm">Academic Advisor</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            Career Guide
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Student: <span className="font-medium text-amber-600">{studentName}</span>
            <br />
            Goal: <span className="font-medium text-amber-600">{examGoal}</span>
          </div>
          
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={isListening ? "default" : "outline"}
              onClick={startListening}
              disabled={isSpeaking}
              className="flex-1"
            >
              {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              {isListening ? 'Listening...' : 'Ask me'}
            </Button>
            
            <Button
              size="sm"
              variant={isSpeaking ? "default" : "outline"}
              onClick={isSpeaking ? stopSpeaking : () => {}}
              disabled={!isSpeaking}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          
          {lastCommand && (
            <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              Last: "{lastCommand}"
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Try: "Study plan advice", "Career guidance", "Time management", "Exam strategy"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicAdvisorVoiceAssistant;
