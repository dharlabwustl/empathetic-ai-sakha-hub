
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, GraduationCap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface AcademicAdvisorVoiceAssistantProps {
  userName?: string;
  examGoal?: string;
  isEnabled?: boolean;
}

const AcademicAdvisorVoiceAssistant: React.FC<AcademicAdvisorVoiceAssistantProps> = ({
  userName = 'Student',
  examGoal = 'NEET',
  isEnabled = true
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Context-aware voice commands for academic advisory
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    setLastCommand(command);

    // Study plan guidance
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
      speak(`For your ${examGoal} preparation, I recommend a structured study plan: Allocate 60% time to weak subjects, 30% to moderate subjects, and 10% to strong subjects. Create daily, weekly, and monthly goals. Would you like me to help you create a personalized schedule?`);
    }
    
    // Subject priority advice
    else if (lowerCommand.includes('priority') || lowerCommand.includes('which subject')) {
      speak(`For ${examGoal} success: Physics requires strong problem-solving skills, Chemistry needs concept clarity and formula practice, Biology demands extensive memorization. Focus on your weakest area first, but maintain balance across all subjects.`);
    }
    
    // Time management
    else if (lowerCommand.includes('time') || lowerCommand.includes('manage time')) {
      speak(`Effective time management for ${examGoal}: Use the Pomodoro technique - 25 minutes focused study, 5 minutes break. Plan your day the night before, tackle difficult subjects when you're most alert, and avoid multitasking.`);
    }
    
    // Exam strategy
    else if (lowerCommand.includes('exam strategy') || lowerCommand.includes('how to attempt')) {
      speak(`${examGoal} exam strategy: Start with questions you're confident about, manage time wisely - don't spend too much on any single question, use elimination method for multiple choice, and always review your answers if time permits.`);
    }
    
    // Stress management
    else if (lowerCommand.includes('stress') || lowerCommand.includes('anxiety') || lowerCommand.includes('nervous')) {
      speak(`${userName}, exam stress is normal! Try these techniques: Practice deep breathing, maintain a regular sleep schedule, exercise daily, take regular breaks, and remember that preparation reduces anxiety. You're working hard, and that will pay off!`);
    }
    
    // Study techniques
    else if (lowerCommand.includes('study technique') || lowerCommand.includes('how to study')) {
      speak(`Effective study techniques for ${examGoal}: Use active recall instead of passive reading, create mind maps for complex topics, teach concepts to others, practice previous year questions regularly, and review frequently to strengthen memory.`);
    }
    
    // Weak areas improvement
    else if (lowerCommand.includes('weak') || lowerCommand.includes('struggling')) {
      speak(`To improve weak areas: Identify specific topics causing difficulty, start with basics before advancing, practice more problems in weak areas, seek help from teachers or peers, and don't avoid difficult topics - tackle them systematically.`);
    }
    
    // Motivation and goals
    else if (lowerCommand.includes('motivate') || lowerCommand.includes('goal')) {
      speak(`${userName}, remember why you started this ${examGoal} journey! Your hard work today shapes your future. Every hour of study, every problem solved, every concept learned brings you closer to your dream. Stay focused and believe in yourself!`);
    }
    
    // Revision strategy
    else if (lowerCommand.includes('revision') || lowerCommand.includes('review')) {
      speak(`For effective revision: Follow the 1-3-7-21 rule - review after 1 day, 3 days, 7 days, and 21 days. Create summary notes, use flashcards for quick recall, and practice mock tests regularly to identify gaps in knowledge.`);
    }
    
    // Career guidance
    else if (lowerCommand.includes('career') || lowerCommand.includes('after exam')) {
      speak(`${examGoal} opens many career paths! Focus on your preparation now, but also research different fields to understand your interests. Good performance in ${examGoal} provides flexibility in choosing your future specialization.`);
    }
    
    // Daily routine
    else if (lowerCommand.includes('routine') || lowerCommand.includes('daily schedule')) {
      speak(`A good daily routine for ${examGoal}: Wake up early, start with your toughest subject, take regular breaks, include physical activity, maintain consistent meal times, and ensure 7-8 hours of sleep. Consistency is key!`);
    }
    
    // Mock test strategy
    else if (lowerCommand.includes('mock test') || lowerCommand.includes('practice test')) {
      speak(`Mock tests are crucial for ${examGoal} success! Take them in exam-like conditions, analyze your performance thoroughly, identify time management issues, and work on weak areas. Treat each mock test as a learning opportunity.`);
    }
    
    // Default response
    else {
      speak(`Hello ${userName}! I'm your academic advisor for ${examGoal} preparation. I can help you with study planning, time management, exam strategies, stress management, and career guidance. What would you like to discuss today?`);
    }
  };

  // Text-to-speech function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
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
      const greeting = `Hello ${userName}! I'm your academic advisor for ${examGoal} preparation. I'm here to help you with study planning, exam strategies, and achieving your goals. How can I assist you today?`;
      setTimeout(() => speak(greeting), 1000);
    }
  }, [userName, examGoal, isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${isExpanded ? 'w-80' : 'w-auto'} bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white border-0 shadow-2xl transition-all duration-300`}>
        {isExpanded ? (
          <>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Advisor
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsExpanded(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </CardTitle>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs w-fit">
                {examGoal} Preparation
              </Badge>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={isListening ? "secondary" : "outline"}
                    onClick={startListening}
                    disabled={isSpeaking}
                    className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} border-white/30`}
                  >
                    {isListening ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />}
                    {isListening ? 'Listening...' : 'Ask me'}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={isSpeaking ? stopSpeaking : () => {}}
                    disabled={!isSpeaking}
                    className="bg-white/20 hover:bg-white/30 border-white/30"
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                
                {lastCommand && (
                  <div className="text-xs bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                    <p className="font-medium opacity-90">You asked:</p>
                    <p className="opacity-80">"{lastCommand}"</p>
                  </div>
                )}
                
                <div className="text-xs opacity-80">
                  <p className="font-medium mb-2">Ask me about:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• "Create study plan"</li>
                    <li>• "Time management tips"</li>
                    <li>• "Exam strategy"</li>
                    <li>• "Handle exam stress"</li>
                    <li>• "Revision techniques"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-4">
            <Button
              onClick={() => setIsExpanded(true)}
              className="bg-transparent hover:bg-white/20 text-white border-white/30 transition-all duration-200"
            >
              <GraduationCap className="h-5 w-5 mr-2" />
              Academic Advisor
            </Button>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default AcademicAdvisorVoiceAssistant;
