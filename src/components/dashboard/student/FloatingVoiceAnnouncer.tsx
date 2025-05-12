import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMoodEmoji } from './mood-tracking/moodUtils';

interface FloatingVoiceAnnouncerProps {
  userName: string;
  onMoodChange?: (mood: MoodType) => void;
}

const FloatingVoiceAnnouncer = ({ userName, onMoodChange }: FloatingVoiceAnnouncerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight / 2 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [listeningForMood, setListeningForMood] = useState(false);
  const [processingVoice, setProcessingVoice] = useState(false);
  const [latestCommand, setLatestCommand] = useState("");
  const dragRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    voiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    testVoice,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    voiceInitialized
  } = useVoiceAnnouncer({
    userName,
    isFirstTimeUser: false
  });

  useEffect(() => {
    // When transcript changes and we're listening for commands or mood
    if (transcript && (isListening || listeningForMood) && !isSpeaking) {
      if (listeningForMood) {
        handleMoodDetection(transcript);
      } else {
        handleVoiceCommand(transcript);
      }
      setLatestCommand(transcript);
    }
  }, [transcript, isListening, listeningForMood]);

  // Ensure the floating button stays on screen when window resizes
  useEffect(() => {
    const handleResize = () => {
      setPosition(prevPos => ({
        x: Math.min(prevPos.x, window.innerWidth - 80),
        y: Math.min(prevPos.y, window.innerHeight - 80)
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current) {
      setIsDragging(true);
      const rect = dragRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep the button within the window bounds
      const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - 80));
      const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - 80));
      
      setPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Toggle the expanded state of the voice assistant
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      speakMessage(`Hello ${userName}, how can I help you today?`);
    }
  };

  // Start listening for voice commands
  const handleStartListening = () => {
    setListeningForMood(false);
    speakMessage("I'm listening...");
    setTimeout(() => {
      startListening();
    }, 1000);
  };

  // Start listening specifically for mood updates
  const handleMoodListening = () => {
    setListeningForMood(true);
    speakMessage("How are you feeling today?");
    setTimeout(() => {
      startListening();
    }, 1000);
  };

  // Process the mood from voice transcript
  const handleMoodDetection = (text: string) => {
    const cleanText = text.toLowerCase().trim();
    setProcessingVoice(true);
    
    // Map common mood expressions to MoodType values
    const moodMap = {
      "happy": MoodType.HAPPY,
      "good": MoodType.HAPPY,
      "great": MoodType.HAPPY,
      "excellent": MoodType.HAPPY,
      "amazing": MoodType.HAPPY,
      "focused": MoodType.FOCUSED,
      "concentrating": MoodType.FOCUSED,
      "in the zone": MoodType.FOCUSED,
      "motivated": MoodType.MOTIVATED,
      "driven": MoodType.MOTIVATED,
      "inspired": MoodType.MOTIVATED,
      "determined": MoodType.MOTIVATED,
      "tired": MoodType.TIRED,
      "exhausted": MoodType.TIRED,
      "sleepy": MoodType.TIRED,
      "fatigued": MoodType.TIRED,
      "stressed": MoodType.STRESSED,
      "pressured": MoodType.STRESSED,
      "overwhelmed": MoodType.STRESSED,
      "confused": MoodType.CONFUSED,
      "unsure": MoodType.CONFUSED,
      "lost": MoodType.CONFUSED,
      "perplexed": MoodType.CONFUSED,
      "anxious": MoodType.ANXIOUS,
      "nervous": MoodType.ANXIOUS,
      "worried": MoodType.ANXIOUS,
      "uneasy": MoodType.ANXIOUS,
      "neutral": MoodType.NEUTRAL,
      "okay": MoodType.OKAY,
      "fine": MoodType.OKAY,
      "alright": MoodType.OKAY,
      "so so": MoodType.OKAY,
      "overwhelmed": MoodType.OVERWHELMED,
      "swamped": MoodType.OVERWHELMED,
      "curious": MoodType.CURIOUS,
      "interested": MoodType.CURIOUS,
      "inquisitive": MoodType.CURIOUS,
      "sad": MoodType.SAD,
      "down": MoodType.SAD,
      "unhappy": MoodType.SAD,
      "blue": MoodType.SAD
    };
    
    // Find the matching mood
    let detectedMood: MoodType | null = null;
    Object.entries(moodMap).forEach(([keyword, mood]) => {
      if (cleanText.includes(keyword)) {
        detectedMood = mood;
      }
    });
    
    if (detectedMood && onMoodChange) {
      onMoodChange(detectedMood);
      const emoji = getMoodEmoji(detectedMood);
      speakMessage(`I'll set your mood to ${detectedMood.toLowerCase()}. ${emoji}`);
      toast({
        title: "Mood Updated",
        description: `Your mood has been set to ${detectedMood.toLowerCase()} ${emoji}`,
      });
    } else {
      speakMessage("I'm sorry, I didn't recognize that mood. Please try again or use the mood selector buttons.");
    }
    
    setProcessingVoice(false);
    setListeningForMood(false);
  };

  // Process voice commands
  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase().trim();
    setProcessingVoice(true);
    
    console.log("Processing voice command:", command);
    
    // Navigation commands
    if (command.includes("go to dashboard") || command.includes("show dashboard")) {
      navigate("/dashboard/student");
      speakMessage("Navigating to dashboard");
    } 
    else if (command.includes("go to study plan") || command.includes("show study plan")) {
      navigate("/dashboard/student/study-plan");
      speakMessage("Opening study plan");
    } 
    else if (command.includes("show concepts") || command.includes("go to concepts")) {
      navigate("/dashboard/student/concepts");
      speakMessage("Opening concept cards");
    } 
    else if (command.includes("show flashcards") || command.includes("go to flashcards")) {
      navigate("/dashboard/student/flashcards");
      speakMessage("Opening flashcards");
    } 
    else if (command.includes("practice exam") || command.includes("go to practice exam")) {
      navigate("/dashboard/student/practice-exam");
      speakMessage("Opening practice exams");
    } 
    else if (command.includes("tutor") || command.includes("go to tutor")) {
      navigate("/dashboard/student/tutor");
      speakMessage("Opening AI tutor");
    }
    else if (command.includes("update mood") || command.includes("change mood")) {
      handleMoodListening();
      return; // Early return to keep listening
    }
    else if (command.includes("what can you do") || command.includes("help")) {
      speakMessage("I can help you navigate the app, update your mood, explain features, and assist with your studies. Try commands like 'go to dashboard', 'update my mood', 'explain concepts', or 'tell me about my study plan'.");
    }
    // Feature explanation commands
    else if (command.includes("explain") || command.includes("tell me about")) {
      if (command.includes("concept")) {
        speakMessage("Concept cards help you master key concepts through interactive learning. Each concept has learning materials, practice questions, formula labs, and assessments.");
      }
      else if (command.includes("study plan") || command.includes("time allocation")) {
        speakMessage("The study plan helps you organize your learning schedule. You can allocate time to different subjects based on your priorities and track your progress.");
      }
      else if (command.includes("mood tracking")) {
        speakMessage("Mood tracking helps us understand how you're feeling and adapt your learning experience accordingly. You can update your mood anytime using voice commands or the mood selector.");
      }
      else if (command.includes("surrounding influence")) {
        speakMessage("The surrounding influence meter tracks factors that affect your learning, like peer influence, environmental distractions, and your study confidence. These insights help optimize your learning experience.");
      }
      else if (command.includes("flashcard")) {
        speakMessage("Flashcards help you memorize key information through spaced repetition. You can create your own cards or use our recommended sets.");
      }
      else if (command.includes("formula lab")) {
        speakMessage("Formula labs let you practice and master mathematical and scientific formulas interactively. You can see step-by-step solutions and get hints when needed.");
      }
      else {
        speakMessage("I'm not sure about that feature. Try asking about concepts, study plans, mood tracking, surrounding influences, flashcards, or formula labs.");
      }
    }
    // Logout command
    else if (command.includes("log out") || command.includes("logout") || command.includes("sign out")) {
      speakMessage("Logging you out");
      setTimeout(() => {
        window.location.href = "/logout";
      }, 1500);
    }
    else {
      speakMessage("I didn't understand that command. Try asking for help to see what I can do.");
    }
    
    setProcessingVoice(false);
  };

  // Determine content based on current page
  const getContextualHelp = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard/student/concepts')) {
      return {
        title: "Concept Cards",
        tips: [
          "Say 'explain this concept' for details",
          "Ask 'show formula lab' to practice formulas",
          "Try 'next concept' to browse concepts"
        ]
      };
    } 
    else if (path.includes('/dashboard/student/study-plan')) {
      return {
        title: "Study Plan",
        tips: [
          "Say 'adjust time for physics' to modify allocation",
          "Ask 'what are my goals' to review your targets",
          "Try 'show my weekly schedule' to see your plan"
        ]
      };
    }
    else if (path.includes('/dashboard/student/flashcards')) {
      return {
        title: "Flashcards",
        tips: [
          "Say 'flip card' to see the answer",
          "Say 'next card' to move forward",
          "Say 'mark as known' to track your progress"
        ]
      };
    }
    else if (path.includes('/dashboard/student/formula-practice')) {
      return {
        title: "Formula Practice",
        tips: [
          "Say 'show hint' for help with the problem",
          "Ask 'explain steps' for a detailed solution",
          "Say 'next formula' to practice something else"
        ]
      };
    }
    else if (path.includes('/dashboard/student/practice-exam')) {
      return {
        title: "Practice Exams",
        tips: [
          "Say 'read question' to have the question read aloud",
          "Ask 'how much time left' for time updates",
          "Say 'submit answer' when you're ready"
        ]
      };
    }
    else {
      return {
        title: "Voice Assistant",
        tips: [
          "Say 'go to concepts' to navigate",
          "Try 'update my mood' to track how you feel",
          "Ask 'what can you do' for more commands"
        ]
      };
    }
  };
  
  const contextualHelp = getContextualHelp();
  
  return (
    <div
      ref={dragRef}
      className={`fixed z-50 transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {isExpanded ? (
        <Card className="w-72 shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Voice Assistant</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={toggleExpanded}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1">{contextualHelp.title} Commands</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {contextualHelp.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
              
              {latestCommand && (
                <div className="bg-secondary/50 p-2 rounded-md text-xs">
                  <p className="font-medium">Last heard:</p>
                  <p className="italic">"{latestCommand}"</p>
                </div>
              )}
              
              <div className="flex gap-2 justify-between">
                <Button 
                  variant="outline" 
                  className={`flex-1 ${isListening ? 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400' : ''}`}
                  onClick={isListening ? stopListening : handleStartListening}
                  disabled={!voiceSettings.enabled || isSpeaking || processingVoice}
                >
                  {isListening ? <MicOff className="mr-1 h-4 w-4" /> : <Mic className="mr-1 h-4 w-4" />}
                  {isListening ? "Stop" : "Listen"}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleMoodListening}
                  disabled={!voiceSettings.enabled || isListening || isSpeaking || processingVoice}
                >
                  Update Mood
                </Button>
              </div>
              
              <div className="flex gap-2 justify-between">
                <Button 
                  variant={voiceSettings.enabled ? "default" : "secondary"}
                  size="sm"
                  className="flex-1"
                  onClick={toggleVoiceEnabled}
                >
                  {voiceSettings.enabled ? "Voice On" : "Voice Off"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => toggleMute()}
                >
                  {voiceSettings.muted ? "Unmute" : "Mute"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full h-12 w-12 shadow-md bg-white dark:bg-gray-800 ${isSpeaking ? 'ring-2 ring-blue-400 ring-opacity-75 animate-pulse' : ''} ${isListening ? 'ring-2 ring-red-400 ring-opacity-75 animate-pulse' : ''}`}
          onClick={toggleExpanded}
          title="Voice Assistant"
        >
          <Volume2 className={`${isSpeaking ? 'text-blue-500' : isListening ? 'text-red-500' : ''}`} />
        </Button>
      )}
    </div>
  );
};

export default FloatingVoiceAnnouncer;
