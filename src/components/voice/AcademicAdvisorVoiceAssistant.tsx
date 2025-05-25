
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, GraduationCap, BookOpen } from 'lucide-react';

interface AcademicAdvisorVoiceAssistantProps {
  userName?: string;
  currentGoal?: string;
  isEnabled?: boolean;
}

const AcademicAdvisorVoiceAssistant: React.FC<AcademicAdvisorVoiceAssistantProps> = ({
  userName = 'Student',
  currentGoal = 'Academic Success',
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');

  // Voice commands specific to academic advising
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Study plan guidance commands
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule') || lowerCommand.includes('planning')) {
      speak(`For effective study planning: First assess your current knowledge, set specific goals, allocate time for each subject based on difficulty and importance, include regular review sessions, and maintain flexibility for adjustments. A good study plan balances depth and breadth.`);
    }
    
    // Time management commands
    else if (lowerCommand.includes('time management') || lowerCommand.includes('organize time') || lowerCommand.includes('schedule')) {
      speak(`Time management tips: Use the Pomodoro technique for focused study, prioritize high-impact activities, set realistic daily goals, include breaks in your schedule, and track your progress. Remember, consistency beats intensity.`);
    }
    
    // Subject prioritization commands
    else if (lowerCommand.includes('prioritize') || lowerCommand.includes('which subject') || lowerCommand.includes('focus on')) {
      speak(`Subject prioritization strategy: Focus on your weakest areas first, allocate more time to high-weightage topics, maintain strong subjects with regular review, and balance new learning with revision. Consider your exam timeline when setting priorities.`);
    }
    
    // Goal setting commands
    else if (lowerCommand.includes('goal') || lowerCommand.includes('target') || lowerCommand.includes('objective')) {
      speak(`For ${currentGoal}, set SMART goals: Specific, Measurable, Achievable, Relevant, and Time-bound. Break large goals into smaller milestones, track your progress regularly, and adjust your strategy based on performance.`);
    }
    
    // Study techniques commands
    else if (lowerCommand.includes('study technique') || lowerCommand.includes('how to study') || lowerCommand.includes('learning method')) {
      speak(`Effective study techniques: Active recall, spaced repetition, elaborative interrogation, self-explanation, and interleaved practice. Use multiple learning modalities, take notes by hand, teach concepts to others, and practice retrieval frequently.`);
    }
    
    // Exam preparation commands
    else if (lowerCommand.includes('exam preparation') || lowerCommand.includes('test prep') || lowerCommand.includes('exam strategy')) {
      speak(`Exam preparation strategy: Start early with a structured plan, focus on understanding over memorization, practice with past papers, identify and work on weak areas, maintain good health habits, and develop test-taking strategies.`);
    }
    
    // Motivation and mindset commands
    else if (lowerCommand.includes('motivation') || lowerCommand.includes('confidence') || lowerCommand.includes('mindset')) {
      speak(`${userName}, maintaining motivation is crucial! Set small, achievable daily goals, celebrate progress, maintain a growth mindset, connect with your deeper purpose, and remember that setbacks are part of learning. You're capable of achieving ${currentGoal}!`);
    }
    
    // Study resources commands
    else if (lowerCommand.includes('resources') || lowerCommand.includes('materials') || lowerCommand.includes('books')) {
      speak(`Choose quality study resources: Use standard textbooks for concepts, supplement with online resources, practice with previous years' papers, join study groups for discussion, and leverage technology tools for efficient learning.`);
    }
    
    // Stress management commands
    else if (lowerCommand.includes('stress') || lowerCommand.includes('anxiety') || lowerCommand.includes('overwhelmed')) {
      speak(`Managing study stress: Take regular breaks, maintain a healthy sleep schedule, exercise regularly, practice deep breathing or meditation, talk to someone about your concerns, and remember that some stress is normal and can be motivating.`);
    }
    
    // Progress tracking commands
    else if (lowerCommand.includes('progress') || lowerCommand.includes('track') || lowerCommand.includes('improvement')) {
      speak(`Track your progress effectively: Set weekly and monthly milestones, use practice tests to measure improvement, maintain a study journal, regularly review and adjust your plan, and celebrate achievements along the way.`);
    }
    
    // Career guidance commands
    else if (lowerCommand.includes('career') || lowerCommand.includes('future') || lowerCommand.includes('path')) {
      speak(`Career planning advice: Research your field of interest thoroughly, understand the requirements and pathways, develop relevant skills beyond academics, gain practical experience through internships or projects, and network with professionals in your field.`);
    }
    
    // Study environment commands
    else if (lowerCommand.includes('study environment') || lowerCommand.includes('where to study') || lowerCommand.includes('setup')) {
      speak(`Create an optimal study environment: Choose a quiet, well-lit space, minimize distractions, organize your materials, maintain comfortable temperature, use ergonomic furniture, and personalize your space to stay motivated.`);
    }
    
    // Help commands
    else if (lowerCommand.includes('help') || lowerCommand.includes('advice') || lowerCommand.includes('guidance')) {
      speak(`I'm your academic advisor! I can help with study planning, time management, goal setting, exam strategies, motivation, and career guidance. What specific area would you like guidance on today?`);
    }
    
    // Default response
    else {
      speak(`Hello ${userName}! I'm here to provide academic guidance for your ${currentGoal} journey. I can help with study planning, time management, exam strategies, motivation, and more. What would you like to discuss?`);
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
      const greeting = `Hello ${userName}! I'm your academic advisor, here to help you succeed in your ${currentGoal} journey. I can provide guidance on study planning, time management, and exam strategies. How can I help you today?`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [isEnabled, userName, currentGoal]);

  if (!isEnabled) return null;

  return (
    <Card className="fixed bottom-4 left-4 w-80 z-50 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            <h3 className="font-semibold text-sm">Academic Advisor</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            AI Counselor
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="text-xs text-gray-600 bg-gray-100 dark:bg-gray-800 p-2 rounded">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>Goal: {currentGoal}</span>
            </div>
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
              You: "{lastCommand}"
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Try: "Study plan help", "Time management", "Exam strategies", "Motivation"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicAdvisorVoiceAssistant;
