
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";
import { getMoodVoiceCommands } from '@/components/dashboard/student/mood-tracking/moodUtils';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface VoiceStudyAssistantProps {
  userName?: string;
  onMoodCommand?: (mood: string) => void;
  onStudyPlanCommand?: () => void;
  onTaskCommand?: (action: string, task?: string) => void;
}

const VoiceStudyAssistant: React.FC<VoiceStudyAssistantProps> = ({
  userName,
  onMoodCommand,
  onStudyPlanCommand,
  onTaskCommand
}) => {
  const [expanded, setExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    testVoice,
    voiceInitialized
  } = useVoiceAnnouncer({ 
    userName,
    // Properly set pronunciation for PREPZR
    initialSettings: {
      pronounceDictionary: {
        "PREPZR": "Prep-zer",
        "PrepZR": "Prep-zer",
        "Prepzr": "Prep-zer",
        "prepzr": "Prep-zer"
      }
    }
  });
  
  // Initialize suggestions
  useEffect(() => {
    // Combine different types of voice commands
    const moodCommands = getMoodVoiceCommands();
    const studyCommands = [
      "Show my study plan",
      "Open formula lab",
      "What should I study today?",
      "How much time do I have for physics?",
      "Create new flashcard",
      "Take me to concepts page",
      "Open the tutor",
      "Show my notifications",
    ];
    
    const taskCommands = [
      "Mark task as complete",
      "Add new task",
      "What are my pending tasks?",
      "Remind me to review chemistry at 5pm",
      "Go to feel good corner",
    ];
    
    // Navigation commands
    const navigationCommands = [
      "Go to dashboard",
      "Go to study plan",
      "Show my flashcards",
      "Open formula lab",
      "Go to profile",
      "Show practice exams",
      "Go to academic advisor",
    ];
    
    // Randomize and limit suggestions
    const allCommands = [...moodCommands, ...studyCommands, ...taskCommands, ...navigationCommands];
    const shuffled = allCommands.sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 6));
  }, []);
  
  // Process transcript when it changes
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Helpful function to provide verbal and visual feedback
    const provideFeedback = (message: string, action?: () => void) => {
      speakMessage(message);
      
      toast({
        title: "Voice Assistant",
        description: message,
        duration: 3000,
      });
      
      if (action) {
        setTimeout(action, 1000);
      }
    };
    
    // Navigation commands
    if (handleNavigationCommand(lowerCommand, provideFeedback)) {
      return;
    }
    
    // Mood related commands
    if (lowerCommand.includes('feeling') || lowerCommand.includes('mood')) {
      handleMoodCommand(lowerCommand);
      return;
    }
    
    // Study plan related commands
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
      if (onStudyPlanCommand) {
        provideFeedback("Opening your study plan now", () => {
          onStudyPlanCommand();
        });
      }
      return;
    }
    
    // Task related commands
    if (lowerCommand.includes('task') || lowerCommand.includes('complete') || lowerCommand.includes('add')) {
      handleTaskCommand(lowerCommand);
      return;
    }
    
    // Help command
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      provideFeedback("I can help you navigate the platform, manage your moods, access your study plan, manage tasks, and more. Try asking me to go to a specific page, log your mood, or show your study plan.");
      return;
    }
    
    // Formula lab related commands
    if (lowerCommand.includes('formula lab')) {
      provideFeedback("Opening the formula lab. You can practice with interactive formulas here.", () => {
        navigate("/dashboard/student/formula-practice-lab");
      });
      return;
    }
    
    // If no command recognized, provide helpful feedback instead of "I don't understand"
    provideFeedback("I'm not sure what you'd like to do. You can try asking me to navigate to a page, log your mood, or show your study plan. Say 'help' for more options.");
  };
  
  // Handle navigation commands
  const handleNavigationCommand = (command: string, feedbackFn: (message: string, action?: () => void) => void): boolean => {
    const navigationMappings = [
      { keywords: ['dashboard', 'home', 'main page'], path: '/dashboard/student', message: "Taking you to the dashboard" },
      { keywords: ['concept', 'concepts'], path: '/dashboard/student/concepts', message: "Opening concepts page" },
      { keywords: ['flashcard', 'flashcards', 'cards'], path: '/dashboard/student/flashcards', message: "Going to flashcards" },
      { keywords: ['tutor', 'assistant', 'ai tutor'], path: '/dashboard/student/tutor', message: "Opening your AI tutor" },
      { keywords: ['formula', 'lab', 'formula lab'], path: '/dashboard/student/formula-practice-lab', message: "Opening the formula lab" },
      { keywords: ['profile', 'account', 'my profile'], path: '/dashboard/student/profile', message: "Opening your profile" },
      { keywords: ['exam', 'practice exam', 'test'], path: '/dashboard/student/practice-exam', message: "Going to practice exams" },
      { keywords: ['feel good', 'relax', 'corner'], path: '/dashboard/student/feel-good-corner', message: "Taking you to the Feel Good Corner" },
      { keywords: ['notification', 'alerts', 'notices'], path: '/dashboard/student/notifications', message: "Checking your notifications" },
      { keywords: ['study plan', 'schedule', 'planner'], path: '/dashboard/student/study-plan', message: "Opening your study plan" },
      { keywords: ['academic', 'advisor'], path: '/dashboard/student/academic', message: "Opening your academic advisor" },
      { keywords: ['syllabus'], path: '/dashboard/student/syllabus', message: "Opening the syllabus page" },
    ];
    
    for (const mapping of navigationMappings) {
      if (mapping.keywords.some(keyword => command.includes(keyword))) {
        feedbackFn(mapping.message, () => {
          navigate(mapping.path);
        });
        return true;
      }
    }
    
    // Handle general navigation commands
    if (command.includes('go to') || command.includes('navigate to') || command.includes('open') || command.includes('show')) {
      // Extract the destination
      let destination = '';
      
      if (command.includes('go to')) {
        destination = command.split('go to')[1].trim();
      } else if (command.includes('navigate to')) {
        destination = command.split('navigate to')[1].trim();
      } else if (command.includes('open')) {
        destination = command.split('open')[1].trim();
      } else if (command.includes('show')) {
        destination = command.split('show')[1].trim();
      }
      
      if (destination) {
        // Try to interpret the destination
        for (const mapping of navigationMappings) {
          if (mapping.keywords.some(keyword => destination.includes(keyword))) {
            feedbackFn(`Taking you to ${destination}`, () => {
              navigate(mapping.path);
            });
            return true;
          }
        }
        
        // If we couldn't match a specific destination
        feedbackFn(`I'm not sure how to navigate to ${destination}. Try saying a specific page name like "Go to dashboard" or "Open flashcards".`);
        return true;
      }
    }
    
    return false;
  };
  
  const handleMoodCommand = (command: string) => {
    // Extract mood from command if present
    const moodKeywords = [
      { words: ['happy', 'glad', 'great'], mood: 'happy' },
      { words: ['tired', 'exhausted', 'sleepy'], mood: 'tired' },
      { words: ['stressed', 'overwhelmed'], mood: 'stressed' },
      { words: ['motivated', 'determined'], mood: 'motivated' },
      { words: ['confused'], mood: 'confused' },
      { words: ['anxious', 'nervous', 'worried'], mood: 'anxious' },
      { words: ['focused', 'concentrating'], mood: 'focused' },
      { words: ['neutral', 'okay', 'fine'], mood: 'neutral' },
      { words: ['sad', 'unhappy', 'down'], mood: 'sad' },
    ];
    
    // Check if any mood keywords are in the command
    for (const { words, mood } of moodKeywords) {
      if (words.some(word => command.includes(word))) {
        if (onMoodCommand) {
          // Provide personalized responses based on mood
          let response = `I'll log that you're feeling ${mood} today.`;
          
          // Add mood-specific recommendations
          switch (mood) {
            case 'tired':
              response += " Since you're tired, I recommend focusing on revision today rather than learning new concepts.";
              break;
            case 'motivated':
              response += " Great to hear you're motivated! This is a perfect time to tackle challenging topics.";
              break;
            case 'stressed':
              response += " I understand you're feeling stressed. Let's focus on manageable tasks and include some breaks in your study plan.";
              break;
            case 'focused':
              response += " Excellent! When you're focused, it's a great time for deep learning and problem-solving.";
              break;
            case 'anxious':
              response += " I'll adjust your study plan to include shorter sessions with more frequent breaks to help manage anxiety.";
              break;
          }
          
          speakMessage(response);
          
          toast({
            title: `Mood set to ${mood}`,
            description: "Your study recommendations have been updated.",
            duration: 5000,
          });
          
          onMoodCommand(mood);
          return;
        }
      }
    }
    
    // If asking about mood but not specifying
    if (onMoodCommand) {
      speakMessage("Would you like to log how you're feeling? You can say things like 'I'm feeling tired' or 'I'm motivated today'.");
    }
  };
  
  const handleTaskCommand = (command: string) => {
    if (!onTaskCommand) return;
    
    if (command.includes('complete') || command.includes('done') || command.includes('finished')) {
      // Extract task name if present
      const taskMatch = command.match(/(?:complete|done|finished|mark)\s+(?:the\s+)?(?:task\s+)?(.+?)(?:\s+as\s+done|\s+as\s+complete|$)/i);
      const taskName = taskMatch ? taskMatch[1] : undefined;
      
      speakMessage(taskName 
        ? `Marking task "${taskName}" as complete` 
        : "Which task would you like to mark as complete?");
        
      onTaskCommand('complete', taskName);
      return;
    }
    
    if (command.includes('add') || command.includes('new task') || command.includes('create task')) {
      // Extract task details if present
      const taskMatch = command.match(/(?:add|create|new)\s+(?:a\s+)?(?:task\s+)?(?:to\s+)?(.*?)(?:\s+for|$)/i);
      const taskName = taskMatch ? taskMatch[1] : undefined;
      
      speakMessage(taskName 
        ? `Adding new task: "${taskName}"` 
        : "What task would you like to add?");
        
      onTaskCommand('add', taskName);
      return;
    }
    
    if (command.includes('pending') || command.includes('remaining') || command.includes('what task')) {
      speakMessage("Let me check your pending tasks.");
      onTaskCommand('list');
      return;
    }
  };
  
  const handleTrySuggestion = (suggestion: string) => {
    speakMessage(suggestion);
    processVoiceCommand(suggestion);
    
    toast({
      title: "Voice command executed",
      description: suggestion,
    });
  };
  
  const testPronunciation = () => {
    speakMessage("Hi, I'm your Prep-zer voice assistant. I can help you navigate through your studies.", true);
  };
  
  if (!isVoiceSupported) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center">
          <span>Voice Assistant</span>
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
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-muted p-2 rounded-md text-sm">
                <p className="font-semibold">You said:</p>
                <p>{transcript}</p>
              </div>
            )}
            
            <div className="flex justify-center my-1">
              <Button variant="ghost" size="sm" onClick={testPronunciation} className="text-xs">
                Test PREPZR Pronunciation
              </Button>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left"
                    onClick={() => handleTrySuggestion(suggestion)}
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
              className="w-full"
            >
              <Mic className="h-4 w-4 mr-2" />
              Use Voice Commands
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceStudyAssistant;
