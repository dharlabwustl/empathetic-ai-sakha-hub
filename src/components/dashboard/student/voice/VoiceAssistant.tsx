
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, Settings, X, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import { storeMoodInLocalStorage } from '../mood-tracking/moodUtils';

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  isOpen,
  onClose,
  userName = 'Student'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastUserCommand, setLastUserCommand] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const recognition = useRef<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // @ts-ignore - TypeScript doesn't know about webkit prefixed APIs
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = true;

      recognition.current.onstart = () => {
        setIsListening(true);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };

      recognition.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setTranscript(transcript);
        
        if (event.results[0].isFinal) {
          processCommand(transcript);
        }
      };

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition.current?.abort();
      setIsListening(false);
    } else {
      try {
        recognition.current?.start();
        setTranscript('');
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const speakResponse = (text: string) => {
    if (isMuted || !text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang === 'en-US' && voice.name.includes('Female')
    ) || voices.find(voice => 
      voice.lang === 'en-US'
    ) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const processCommand = (command: string) => {
    setIsProcessing(true);
    setLastUserCommand(command);
    const lowerCommand = command.toLowerCase().trim();
    
    // Process commands based on keywords
    let response = '';
    
    // Navigation commands
    if (lowerCommand.includes('go to') || lowerCommand.includes('navigate to') || lowerCommand.includes('open')) {
      if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
        response = "Opening your dashboard";
        navigate('/dashboard/student');
      } else if (lowerCommand.includes('today') || lowerCommand.includes('plan') || lowerCommand.includes("today's plan")) {
        response = "Opening your today's study plan";
        navigate('/dashboard/student/today');
      } else if (lowerCommand.includes('concept') || lowerCommand.includes('concepts')) {
        response = "Opening concept cards";
        navigate('/dashboard/student/concepts');
      } else if (lowerCommand.includes('formula') || lowerCommand.includes('lab')) {
        response = "Opening formula practice lab";
        navigate('/dashboard/student/formula-practice');
      } else if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card')) {
        response = "Opening flashcards";
        navigate('/dashboard/student/flashcards');
      } else if (lowerCommand.includes('exam') || lowerCommand.includes('practice exam')) {
        response = "Opening practice exams";
        navigate('/dashboard/student/practice-exam');
      } else if (lowerCommand.includes('profile')) {
        response = "Opening your profile";
        navigate('/dashboard/student/profile');
      } else if (lowerCommand.includes('feel good') || lowerCommand.includes('mood boost')) {
        response = "Opening the feel good corner";
        navigate('/dashboard/student/feel-good-corner');
      } else {
        response = "I'm not sure where you want to go. Try saying 'go to dashboard' or 'open today's plan'";
      }
    } 
    // Mood logging commands
    else if (lowerCommand.includes('mood') || lowerCommand.includes('feeling')) {
      if (lowerCommand.includes('happy') || lowerCommand.includes('good') || lowerCommand.includes('great')) {
        response = "I've logged your mood as happy";
        storeMoodInLocalStorage(MoodType.HAPPY);
        toast({ title: "Mood updated", description: "Your mood has been set to Happy" });
      } else if (lowerCommand.includes('motivated') || lowerCommand.includes('energetic')) {
        response = "I've logged your mood as motivated";
        storeMoodInLocalStorage(MoodType.MOTIVATED);
        toast({ title: "Mood updated", description: "Your mood has been set to Motivated" });
      } else if (lowerCommand.includes('focused') || lowerCommand.includes('concentrating')) {
        response = "I've logged your mood as focused";
        storeMoodInLocalStorage(MoodType.FOCUSED);
        toast({ title: "Mood updated", description: "Your mood has been set to Focused" });
      } else if (lowerCommand.includes('tired') || lowerCommand.includes('exhausted') || lowerCommand.includes('sleepy')) {
        response = "I've logged your mood as tired";
        storeMoodInLocalStorage(MoodType.TIRED);
        toast({ title: "Mood updated", description: "Your mood has been set to Tired" });
      } else if (lowerCommand.includes('stressed') || lowerCommand.includes('pressure')) {
        response = "I've logged your mood as stressed";
        storeMoodInLocalStorage(MoodType.STRESSED);
        toast({ title: "Mood updated", description: "Your mood has been set to Stressed" });
      } else if (lowerCommand.includes('confused') || lowerCommand.includes('unsure')) {
        response = "I've logged your mood as confused";
        storeMoodInLocalStorage(MoodType.CONFUSED);
        toast({ title: "Mood updated", description: "Your mood has been set to Confused" });
      } else if (lowerCommand.includes('anxious') || lowerCommand.includes('worried')) {
        response = "I've logged your mood as anxious";
        storeMoodInLocalStorage(MoodType.ANXIOUS);
        toast({ title: "Mood updated", description: "Your mood has been set to Anxious" });
      } else if (lowerCommand.includes('neutral') || lowerCommand.includes('okay') || lowerCommand.includes('fine')) {
        response = "I've logged your mood as neutral";
        storeMoodInLocalStorage(MoodType.NEUTRAL);
        toast({ title: "Mood updated", description: "Your mood has been set to Neutral" });
      } else if (lowerCommand.includes('sad') || lowerCommand.includes('down') || lowerCommand.includes('unhappy')) {
        response = "I've logged your mood as sad";
        storeMoodInLocalStorage(MoodType.SAD);
        toast({ title: "Mood updated", description: "Your mood has been set to Sad" });
      } else {
        response = "I couldn't determine your mood. Try saying 'I'm feeling happy' or 'log my mood as motivated'";
      }
    }
    // Study plan commands
    else if (lowerCommand.includes('study') || lowerCommand.includes('plan')) {
      if (lowerCommand.includes('today') || lowerCommand.includes("today's")) {
        response = "Opening today's study plan";
        navigate('/dashboard/student/today');
      } else if (lowerCommand.includes('create') || lowerCommand.includes('new') || lowerCommand.includes('make')) {
        response = "Let's create a new study plan. Opening the study plan creator.";
        navigate('/dashboard/student/create-study-plan');
      } else if (lowerCommand.includes('edit') || lowerCommand.includes('modify') || lowerCommand.includes('change')) {
        response = "Opening your study plan settings";
        navigate('/dashboard/student/study-settings');
      } else {
        response = "I can help with study plans. Try saying 'show me today's study plan' or 'create a new study plan'";
      }
    }
    // Task and reminder commands
    else if (lowerCommand.includes('task') || lowerCommand.includes('reminder') || lowerCommand.includes('remind')) {
      if (lowerCommand.includes('create') || lowerCommand.includes('add') || lowerCommand.includes('new')) {
        response = "Adding a new reminder to your tasks";
        toast({ 
          title: "Reminder Created", 
          description: "I've added a reminder based on your request" 
        });
      } else if (lowerCommand.includes('show') || lowerCommand.includes('list') || lowerCommand.includes('view')) {
        response = "Here are your upcoming tasks and reminders";
        navigate('/dashboard/student/tasks');
      } else if (lowerCommand.includes('complete') || lowerCommand.includes('done') || lowerCommand.includes('finished')) {
        response = "Great job completing your task!";
        toast({ 
          title: "Task Completed", 
          description: "I've marked this task as complete" 
        });
      } else {
        response = "I can help with tasks and reminders. Try saying 'add a new reminder' or 'show my tasks'";
      }
    }
    // Help commands
    else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      response = "I can help you navigate the app, log your mood, manage study plans, set reminders, and answer questions about your studies. Try saying 'go to dashboard', 'I'm feeling happy', or 'show today's plan'";
    }
    // Fallback
    else {
      response = `I heard you say "${command}", but I'm not sure how to help with that. Try asking for help to see what I can do.`;
    }
    
    setAssistantResponse(response);
    speakResponse(response);
    setIsProcessing(false);
  };

  // When component opens, greet the user
  useEffect(() => {
    if (isOpen) {
      const greeting = `Hi ${userName}! How can I help with your studies today?`;
      setAssistantResponse(greeting);
      speakResponse(greeting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, userName]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 md:w-96">
      <Card className="border-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Prepzr Voice Assistant</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 h-32 overflow-y-auto">
            {assistantResponse ? (
              <div>
                <p className="text-sm font-semibold">Assistant:</p>
                <p className="text-sm">{assistantResponse}</p>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Ask me to help with your studies, navigate the app, or log your mood...
              </p>
            )}
            
            {lastUserCommand && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-xs text-muted-foreground">You said:</p>
                <p className="text-xs italic">{lastUserCommand}</p>
              </div>
            )}
          </div>
          
          {isListening && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
              <p className="text-sm font-medium">Listening...</p>
              <p className="text-xs italic">{transcript || "Say something..."}</p>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {isProcessing ? "Processing..." : "Ready for commands"}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleMute}
                className={isMuted ? "text-red-500" : ""}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button 
                onClick={toggleListening}
                size="sm"
                variant={isListening ? "destructive" : "default"}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-1" /> Stop
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-1" /> Listen
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col space-y-2 pt-0">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" size="sm" className="text-xs h-auto py-1" onClick={() => processCommand("Show today's plan")}>
              Today's Plan
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-auto py-1" onClick={() => processCommand("Log my mood")}>
              Log Mood
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-auto py-1" onClick={() => processCommand("Open concepts")}>
              Concepts
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-auto py-1" onClick={() => processCommand("Open formula lab")}>
              Formula Lab
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            You can ask me to navigate, log your mood, or manage your study plans
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
