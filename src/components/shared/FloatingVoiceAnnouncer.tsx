
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Info, X, Volume2, Brain, Calendar } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface FloatingVoiceAnnouncerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({
  isOpen,
  onClose
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  
  // Get current path for context-aware responses
  const currentPath = window.location.pathname;
  
  // On component mount, try to get saved mood from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.mood) {
          setCurrentMood(parsedData.mood as MoodType);
        }
      } catch (error) {
        console.error('Error parsing user data for mood:', error);
      }
    }
    
    // Listen for mood change events
    const handleMoodChangeEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.mood) {
        setCurrentMood(customEvent.detail.mood);
      }
    };
    
    document.addEventListener('mood-changed', handleMoodChangeEvent);
    
    return () => {
      document.removeEventListener('mood-changed', handleMoodChangeEvent);
    };
  }, []);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Process the query based on context and current mood
      const processedResponse = await processUserQuery(inputValue, currentPath, currentMood);
      setResponse(processedResponse);
      // Here we would add actual speech synthesis
      speakResponse(processedResponse, isMuted);
    } catch (error) {
      console.error('Error processing voice query:', error);
      setResponse("I'm sorry, I couldn't process your request at this time.");
    } finally {
      setIsProcessing(false);
      setInputValue('');
    }
  };
  
  // Process user query based on context
  const processUserQuery = async (query: string, path: string, mood?: MoodType): Promise<string> => {
    // Simple context-based response system
    const lowerQuery = query.toLowerCase();
    
    // Mood-specific responses
    if (mood) {
      if ((mood === MoodType.TIRED || mood === MoodType.STRESSED) && 
          (lowerQuery.includes('study') || lowerQuery.includes('plan'))) {
        return `Since you're feeling ${mood.toLowerCase()}, I recommend focusing on light review tasks today. Consider taking short breaks every 25 minutes to maintain your energy.`;
      }
      
      if ((mood === MoodType.FOCUSED || mood === MoodType.MOTIVATED) && 
          (lowerQuery.includes('study') || lowerQuery.includes('plan'))) {
        return `Great to see you feeling ${mood.toLowerCase()}! This is an excellent time to tackle more challenging concepts. Your study plan has been optimized to take advantage of your current state.`;
      }
    }
    
    // Path-specific responses
    if (path.includes('/dashboard/student')) {
      if (lowerQuery.includes('next session') || lowerQuery.includes('next task')) {
        return "Your next session is Physics Practice Test at 4:00 PM today. Would you like me to take you to that page?";
      }
      
      if (lowerQuery.includes('progress') || lowerQuery.includes('how am i doing')) {
        return "You're making steady progress. This week, you've completed 5 concept cards and practiced 30 flashcards. Your exam readiness score is currently at 68%.";
      }
      
      if (lowerQuery.includes('mood') || lowerQuery.includes('feeling')) {
        return "Your current mood affects your study recommendations. You can update your mood by clicking the mood button in the top navigation bar.";
      }
    }
    
    if (path.includes('/concepts')) {
      return "You're in the Concepts section. Here you can explore key topics for your exam, take quizzes, and practice with formulas. Would you like recommendations for which concepts to study first?";
    }
    
    if (path.includes('/flashcards')) {
      return "You're in the Flashcards section. Spaced repetition with flashcards is one of the most effective ways to memorize important facts. Would you like me to explain how to get the most out of them?";
    }
    
    // Default responses for common queries
    if (lowerQuery.includes('help')) {
      return "I can help you navigate the platform, explain features, provide study tips, or answer questions about your progress. What would you like to know?";
    }
    
    if (lowerQuery.includes('study plan') || lowerQuery.includes('schedule')) {
      return "Your study plan is customized based on your target exam, available study time, and current knowledge level. You can view your full study plan by clicking on 'Study Plan' in the navigation or adjust it in the Academic Advisor section.";
    }
    
    return "I'm here to help with your studies. You can ask me about your study plan, progress, specific subjects, or how to use any feature in PREPZR.";
  };
  
  // Function to speak response (would be implemented with actual speech synthesis)
  const speakResponse = (text: string, isMuted: boolean) => {
    if (isMuted) return;
    
    // Actual implementation would use Web Speech API or a third-party service
    console.log('Speaking:', text);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 shadow-lg">
      <Card className="border border-violet-200 dark:border-violet-800">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-3 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <h3 className="font-medium">PREPZR Assistant</h3>
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={toggleMute}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-3 max-h-60 overflow-y-auto bg-white dark:bg-gray-950">
          {response ? (
            <div className="text-sm mb-3">{response}</div>
          ) : (
            <div className="flex items-start gap-2 text-sm mb-3">
              <Info className="h-4 w-4 mt-1 text-violet-500 flex-shrink-0" />
              <p>
                How can I help you today? Ask me about your study plan, next tasks, or how to use PREPZR features.
                {currentMood && (
                  <span className="block mt-1 text-violet-600">
                    I notice you're feeling <strong>{currentMood.toLowerCase()}</strong>. I can adjust recommendations based on your current mood.
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              disabled={isProcessing}
            />
            <Button 
              type="submit" 
              size="sm"
              disabled={isProcessing}
              className="bg-violet-600 hover:bg-violet-700"
            >
              {isProcessing ? 
                <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div> : 
                <Mic className="h-4 w-4" />
              }
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
