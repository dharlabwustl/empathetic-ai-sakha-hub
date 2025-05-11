
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker } from "lucide-react";
import { useVoiceAnnouncer } from "@/hooks/useVoiceAnnouncer";
import { getMoodVoiceCommands } from '@/components/dashboard/student/mood-tracking/moodUtils';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from "@/types/user/base";
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
  } = useVoiceAnnouncer({ userName });
  
  const { toast } = useToast();
  
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
    ];
    
    const navigationCommands = [
      "Take me to dashboard",
      "Show my concept cards",
      "Go to flashcards",
      "Open formula practice",
      "Show my profile",
      "Take me to exam syllabus"
    ];
    
    const taskCommands = [
      "Mark task as complete",
      "Add new task",
      "What are my pending tasks?",
      "Remind me to review chemistry at 5pm",
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
    
    // Navigation related commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      speakMessage("Taking you to the dashboard");
      navigate('/dashboard/student');
      return;
    }
    
    if (lowerCommand.includes('concept') || lowerCommand.includes('cards')) {
      speakMessage("Opening concept cards section");
      navigate('/dashboard/student/concepts');
      return;
    }
    
    if (lowerCommand.includes('flashcard')) {
      speakMessage("Taking you to the flashcards section");
      navigate('/dashboard/student/flashcards');
      return;
    }
    
    if (lowerCommand.includes('formula') || lowerCommand.includes('formulas')) {
      speakMessage("Opening the formula practice lab");
      navigate('/dashboard/student/formula-practice');
      return;
    }
    
    if (lowerCommand.includes('profile') || lowerCommand.includes('settings')) {
      speakMessage("Taking you to your profile settings");
      navigate('/dashboard/student/profile');
      return;
    }
    
    if (lowerCommand.includes('syllabus') || lowerCommand.includes('exam syllabus')) {
      speakMessage("Opening exam syllabus section");
      navigate('/dashboard/student/syllabus');
      return;
    }
    
    if (lowerCommand.includes('tutor') || lowerCommand.includes('ai tutor')) {
      speakMessage("Connecting you to your AI tutor");
      navigate('/dashboard/student/tutor');
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
        speakMessage("Opening your study plan now");
        onStudyPlanCommand();
      }
      return;
    }
    
    // Task related commands
    if (lowerCommand.includes('task') || lowerCommand.includes('complete') || lowerCommand.includes('add')) {
      handleTaskCommand(lowerCommand);
      return;
    }
    
    // Help commands
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakMessage("I can help you navigate through Prep-zer, update your mood, manage your study plan, and more. Try asking me to take you to a specific section, or tell me how you're feeling today.");
      return;
    }
    
    // If no command recognized
    speakMessage("I'm not sure how to help with that. Try asking about your mood, study plan, or say 'help' to learn what I can do.");
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
      { words: ['neutral', 'okay', 'fine'], mood: 'neutral' }
    ];
    
    // Check if any mood keywords are in the command
    for (const { words, mood } of moodKeywords) {
      if (words.some(word => command.includes(word))) {
        if (onMoodCommand) {
          // Enhanced acknowledgment with personalized study recommendations based on mood
          let acknowledgment = "";
          let recommendation = "";
          
          switch(mood) {
            case 'happy':
              acknowledgment = `Great to hear you're feeling happy today, ${userName || 'there'}!`;
              recommendation = "This is a perfect time to tackle challenging concepts or try a practice test.";
              break;
            case 'tired':
              acknowledgment = `I understand you're feeling tired, ${userName || 'there'}.`;
              recommendation = "Let's focus on light revision or watching video explanations today. Take regular breaks!";
              break;
            case 'stressed':
              acknowledgment = `I notice you're feeling stressed, ${userName || 'there'}.`;
              recommendation = "Let's work on breathing exercises first, then focus on reviewing familiar concepts to build confidence.";
              break;
            case 'motivated':
              acknowledgment = `Fantastic! You're feeling motivated, ${userName || 'there'}!`;
              recommendation = "This is the perfect time to tackle your most challenging topics or complete a full practice exam.";
              break;
            case 'confused':
              acknowledgment = `It's okay to feel confused sometimes, ${userName || 'there'}.`;
              recommendation = "Let's focus on fundamental concepts and take things step by step today.";
              break;
            case 'anxious':
              acknowledgment = `I understand you're feeling anxious, ${userName || 'there'}.`;
              recommendation = "Let's start with some quick wins - reviewing concepts you already know well, then gradually approach newer material.";
              break;
            case 'focused':
              acknowledgment = `You're in a focused state, ${userName || 'there'}. That's excellent!`;
              recommendation = "This is the perfect time for deep learning sessions on complex topics.";
              break;
            case 'neutral':
              acknowledgment = `Feeling neutral today, ${userName || 'there'}? That's okay.`;
              recommendation = "Let's start with something interesting to build some momentum in your study session.";
              break;
            default:
              acknowledgment = `I've logged that you're feeling ${mood} today.`;
              recommendation = "I'll adjust your study suggestions accordingly.";
          }
          
          // Speak the acknowledgment and recommendation
          speakMessage(`${acknowledgment} ${recommendation}`);
          
          // Update mood in the app
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
  
  if (!isVoiceSupported) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 shadow-md hover:shadow-lg border-blue-100 dark:border-blue-900/50`}>
      <CardHeader className="p-3 pb-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-lg">
        <CardTitle className="text-sm flex justify-between items-center">
          <span className="text-blue-700 dark:text-blue-300 font-medium">Voice Assistant</span>
          {expanded && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(false)}
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
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
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : ''} transition-colors`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="transition-colors"
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
            
            <div>
              <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
              className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
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
