
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';

interface FloatingVoiceAnnouncerProps {
  isOpen?: boolean;
  onClose?: () => void;
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}

interface Message {
  text: string;
  type: 'system' | 'user' | 'assistant';
  timestamp: Date;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({ 
  isOpen = true, 
  onClose, 
  position = 'bottom-right' 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: 'How can I help you today?', type: 'assistant', timestamp: new Date() }
  ]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Position styles
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-left': 'top-4 left-4',
  };

  // Mock speech recognition
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setIsListening(false);
        
        // Simulate receiving transcript and processing
        const mockPromptsAndResponses: Record<string, string> = {
          "how are you": "I'm doing well! How can I assist you with your studies today?",
          "what should i study": "Based on your recent performance, I'd recommend focusing on organic chemistry reactions for about 45 minutes.",
          "i'm feeling tired": "I understand. Maybe take a 15-minute break before continuing with a lighter topic like vocabulary review.",
          "help me with math": "I'd be happy to help with math! Which specific concept are you working on?",
        };
        
        const lowerTranscript = transcript.toLowerCase();
        let foundResponse = false;
        
        for (const [prompt, response] of Object.entries(mockPromptsAndResponses)) {
          if (lowerTranscript.includes(prompt)) {
            setMessages(prev => [
              ...prev, 
              { text: transcript, type: 'user', timestamp: new Date() },
              { text: response, type: 'assistant', timestamp: new Date() }
            ]);
            foundResponse = true;
            break;
          }
        }
        
        if (!foundResponse) {
          // Process mood detection
          const detectedMood = detectMoodFromTranscript(lowerTranscript);
          if (detectedMood) {
            setMessages(prev => [
              ...prev, 
              { text: transcript, type: 'user', timestamp: new Date() },
              { text: getMoodResponse(detectedMood), type: 'assistant', timestamp: new Date() }
            ]);
          } else {
            setMessages(prev => [
              ...prev, 
              { text: transcript, type: 'user', timestamp: new Date() },
              { text: "I'm not sure how to help with that. Could you try rephrasing?", type: 'assistant', timestamp: new Date() }
            ]);
          }
        }
        
        setTranscript('');
        
        // Start speaking the response
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3000);
        
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isListening, transcript]);
  
  // Mock speaking animation
  useEffect(() => {
    if (isSpeaking && !isPaused) {
      const timer = setInterval(() => {
        // Pulse animation logic would go here
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [isSpeaking, isPaused]);

  const handleStartListening = () => {
    setIsListening(true);
    
    // Simulate user speaking/typing
    const mockPhrases = [
      "I'm feeling really stressed about my exams tomorrow",
      "Can you help me organize my study schedule?",
      "I don't understand this chemistry concept",
      "What should I focus on today?",
      "I'm feeling tired but need to study"
    ];
    
    setTranscript(mockPhrases[Math.floor(Math.random() * mockPhrases.length)]);
  };

  const detectMoodFromTranscript = (text: string): MoodType | null => {
    const moodPatterns: Record<string, MoodType> = {
      "stress": MoodType.STRESSED,
      "worried": MoodType.ANXIOUS,
      "anxious": MoodType.ANXIOUS,
      "nervous": MoodType.ANXIOUS,
      "happy": MoodType.HAPPY,
      "great": MoodType.HAPPY,
      "excited": MoodType.HAPPY,
      "motivated": MoodType.MOTIVATED,
      "ready": MoodType.MOTIVATED,
      "focused": MoodType.FOCUSED,
      "concentrate": MoodType.FOCUSED,
      "tired": MoodType.TIRED,
      "exhausted": MoodType.TIRED,
      "sleepy": MoodType.TIRED,
      "confused": MoodType.CONFUSED,
      "don't understand": MoodType.CONFUSED,
      "lost": MoodType.CONFUSED,
      "neutral": MoodType.NEUTRAL,
      "fine": MoodType.NEUTRAL,
      "okay": MoodType.OKAY,
      "alright": MoodType.OKAY,
      "so so": MoodType.OKAY,
      "overwhelmed": MoodType.OVERWHELMED,
      "swamped": MoodType.OVERWHELMED,
      "curious": MoodType.CURIOUS,
      "interested": MoodType.CURIOUS,
      "sad": MoodType.SAD,
      "upset": MoodType.SAD,
      "down": MoodType.SAD
    };
    
    for (const [pattern, mood] of Object.entries(moodPatterns)) {
      if (text.includes(pattern)) {
        return mood;
      }
    }
    
    return null;
  };
  
  const getMoodResponse = (mood: MoodType): string => {
    const responses: Record<MoodType, string[]> = {
      [MoodType.HAPPY]: [
        "I'm glad you're feeling happy! It's a great state of mind for productive learning.",
        "Great to hear you're in a positive mood! Let's make the most of it."
      ],
      [MoodType.MOTIVATED]: [
        "Your motivation is inspiring! Let's channel that energy into your studies.",
        "That's the spirit! Motivation is key to achieving your academic goals."
      ],
      [MoodType.FOCUSED]: [
        "Being focused is excellent for deep learning. Let's maintain that concentration.",
        "Your focus will help you grasp complex concepts more easily."
      ],
      [MoodType.TIRED]: [
        "I understand you're feeling tired. Would you like some strategies for effective studying while conserving energy?",
        "When you're tired, shorter, more focused study sessions with breaks can be more effective."
      ],
      [MoodType.CONFUSED]: [
        "It's okay to feel confused. Let's break down the concepts step by step.",
        "Confusion is often part of the learning process. Let's tackle this together."
      ],
      [MoodType.ANXIOUS]: [
        "I understand anxiety can be challenging. Deep breathing exercises might help before we start studying.",
        "It's normal to feel anxious, especially before exams. Let's work on some techniques to manage that."
      ],
      [MoodType.STRESSED]: [
        "Stress can affect your learning. Let's first take a moment to organize your priorities.",
        "I hear that you're stressed. Let's break your work into smaller, manageable tasks."
      ],
      [MoodType.NEUTRAL]: [
        "A neutral mindset can be good for objective learning. Let's get started.",
        "Ready to begin? Let's make the most of your study session."
      ],
      [MoodType.OKAY]: [
        "Feeling okay is a good baseline. Let's see if we can bring some enthusiasm to your studies.",
        "Let's work together to make your study session productive and maybe even enjoyable."
      ],
      [MoodType.OVERWHELMED]: [
        "Feeling overwhelmed is common. Let's prioritize and tackle one thing at a time.",
        "When everything seems too much, breaking it down into small steps can help."
      ],
      [MoodType.CURIOUS]: [
        "Curiosity is a powerful learning tool! Let's explore the topics you're interested in.",
        "I love when students are curious! What aspects would you like to dive deeper into?"
      ],
      [MoodType.SAD]: [
        "I'm sorry to hear you're feeling down. Would you like to talk about it or would you prefer a distraction?",
        "Sometimes studying can actually help lift your mood. Shall we start with something you enjoy?"
      ],
      [MoodType.CALM]: [
        "A calm mind is great for absorbing information. Let's make the most of this state.",
        "Your calm demeanor will help with comprehension. Ready to begin?"
      ]
    };
    
    const moodResponses = responses[mood] || ["I'm here to help with your studies. What would you like to focus on?"];
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  };

  // Show tooltip briefly when component mounts
  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`fixed ${positionStyles[position]} z-50`}
        >
          <Card className="w-[320px] shadow-lg border-primary/10">
            <CardContent className="p-0">
              {/* Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`} />
                  <h3 className="font-medium">Voice Assistant</h3>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7" 
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  {onClose && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={onClose}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Messages area */}
              <div className="max-h-[300px] overflow-y-auto p-3 space-y-3">
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`rounded-lg px-3 py-2 max-w-[85%] ${
                        msg.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input area */}
              <div className="border-t p-3 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {isListening 
                    ? 'Listening...' 
                    : isSpeaking 
                      ? 'Speaking...' 
                      : 'Press the mic to speak'
                  }
                </div>
                <div className="relative">
                  <AnimatePresence>
                    {showTooltip && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full mb-2 right-0 bg-black text-white text-xs p-2 rounded whitespace-nowrap"
                      >
                        Try asking about your schedule!
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <Button
                    className={`rounded-full w-10 h-10 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={handleStartListening}
                    disabled={isListening}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingVoiceAnnouncer;
