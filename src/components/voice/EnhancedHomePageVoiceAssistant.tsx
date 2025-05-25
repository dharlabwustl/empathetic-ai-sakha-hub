
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface VoiceAssistantType {
  id: string;
  name: string;
  voiceType: 'female' | 'male';
  personality: string;
}

const assistantTypes: VoiceAssistantType[] = [
  { id: 'sakha-mentor', name: 'Sakha AI Mentor', voiceType: 'female', personality: 'encouraging' },
  { id: 'study-coach', name: 'Study Coach', voiceType: 'male', personality: 'professional' },
  { id: 'learning-buddy', name: 'Learning Buddy', voiceType: 'female', personality: 'friendly' }
];

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState('sakha-mentor');
  const [volume, setVolume] = useState(0.8);
  const [rate, setRate] = useState(1.0);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentAssistant = assistantTypes.find(a => a.id === selectedAssistant) || assistantTypes[0];

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  const speakMessage = (text: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
    if (!isEnabled || isMuted || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    const correctedText = text.replace(/PREPZR/g, 'Prep-ZR').replace(/prepzr/gi, 'Prep-ZR');
    const utterance = new SpeechSynthesisUtterance(correctedText);

    // Configure voice settings
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.lang = language;

    // Try to find a suitable voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith(language.split('-')[0]) && 
      voice.name.toLowerCase().includes(currentAssistant.voiceType === 'female' ? 'female' : 'male')
    ) || voices.find(voice => voice.lang.startsWith(language.split('-')[0])) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getHomePageGreeting = () => {
    const greetings = {
      'sakha-mentor': `🎉 Hello and welcome to PREPZR! I'm Sakha AI, your intelligent exam preparation mentor. 

PREPZR is India's first emotionally aware, hyper-personalized adaptive exam preparation platform that revolutionizes how you study.

We're not just another learning platform - we're your AI-powered study companion that understands your emotions, adapts to your learning style, and creates personalized study paths just for you.

Whether you're preparing for JEE, NEET, UPSC, or any competitive exam, PREPZR offers:
- Emotionally intelligent study plans that adapt based on your mood and energy levels
- AI-powered concept cards with interactive learning
- Smart flashcards with spaced repetition
- Practice exams with detailed analytics
- Formula lab for hands-on calculations
- Academic advisor for strategic guidance
- Daily personalized plans that evolve with your progress

Ready to experience the future of exam preparation? Try our free exam readiness analyzer to see how PREPZR can transform your study journey. You can also sign up for a free trial to explore all our premium features.

How can I assist you today?`,

      'study-coach': `Welcome to PREPZR, India's most advanced exam preparation platform. I'm your Study Coach, here to guide you through a revolutionary learning experience.

PREPZR combines artificial intelligence with emotional intelligence to create the most effective study system for competitive exam aspirants in India.

Our platform offers comprehensive preparation tools including adaptive study plans, interactive concept learning, intelligent flashcards, practice exams, and personalized academic guidance.

Would you like to start with our free exam readiness analysis or explore our features through a free trial?`,

      'learning-buddy': `Hey there! Welcome to PREPZR! I'm your Learning Buddy, and I'm super excited to help you ace your exams!

PREPZR is like having a super-smart study friend who knows exactly what you need to succeed. We make exam prep fun, engaging, and incredibly effective with our AI-powered platform.

Ready to discover why thousands of students choose PREPZR for their exam success? Let's explore together!`
    };

    return greetings[selectedAssistant as keyof typeof greetings] || greetings['sakha-mentor'];
  };

  // Initial greeting when page loads
  useEffect(() => {
    if (!isHomePage || hasGreeted || !isEnabled || isMuted) return;

    const greetingTimer = setTimeout(() => {
      const greeting = getHomePageGreeting();
      speakMessage(greeting, 'high');
      setHasGreeted(true);
    }, 2000);

    return () => clearTimeout(greetingTimer);
  }, [isHomePage, hasGreeted, isEnabled, isMuted, selectedAssistant]);

  // Intelligent interventions
  useEffect(() => {
    if (!isHomePage || !isEnabled || isMuted || !hasGreeted) return;

    const interventions = [
      {
        delay: 45000, // 45 seconds
        message: "I notice you're exploring PREPZR. Would you like me to explain how our emotionally intelligent study system can help you achieve better results with less stress?"
      },
      {
        delay: 90000, // 1.5 minutes
        message: "Ready to see how PREPZR is different? Try our free exam readiness analyzer - it takes just 2 minutes and shows you exactly where you stand and how to improve!"
      },
      {
        delay: 150000, // 2.5 minutes
        message: "Still here? That's great! Many students find our approach revolutionary. You can start with a free trial to experience all premium features, or sign up to begin your personalized learning journey today!"
      }
    ];

    const timers = interventions.map(intervention => 
      setTimeout(() => {
        if (document.visibilityState === 'visible' && isHomePage) {
          speakMessage(intervention.message, 'medium');
        }
      }, intervention.delay)
    );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isHomePage, hasGreeted, isEnabled, isMuted]);

  // Cleanup on page change
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location.pathname]);

  // Reset greeting when assistant changes
  useEffect(() => {
    setHasGreeted(false);
  }, [selectedAssistant]);

  if (!isHomePage) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetTrigger asChild>
          <Button
            className={`h-16 w-16 rounded-full shadow-lg transition-all duration-300 ${
              isSpeaking 
                ? 'bg-gradient-to-r from-green-500 to-blue-500 animate-pulse' 
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
            }`}
            size="icon"
          >
            {isMuted ? <VolumeX className="h-7 w-7 text-white" /> : <Volume2 className="h-7 w-7 text-white" />}
          </Button>
        </SheetTrigger>
        
        <SheetContent side="left" className="w-96">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Voice Assistant Settings
            </SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Current Assistant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-medium">{currentAssistant.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {currentAssistant.voiceType} • {currentAssistant.personality}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Choose Assistant</label>
                  <Select value={selectedAssistant} onValueChange={setSelectedAssistant}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {assistantTypes.map(assistant => (
                        <SelectItem key={assistant.id} value={assistant.id}>
                          {assistant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Voice Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Voice Assistant</label>
                  <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Mute Voice</label>
                  <Switch checked={isMuted} onCheckedChange={setIsMuted} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm">Volume: {Math.round(volume * 100)}%</label>
                  <Slider
                    value={[volume]}
                    onValueChange={([value]) => setVolume(value)}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm">Speech Rate: {rate.toFixed(1)}x</label>
                  <Slider
                    value={[rate]}
                    onValueChange={([value]) => setRate(value)}
                    min={0.5}
                    max={2}
                    step={0.1}
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => speakMessage("Hello! This is a voice test from PREPZR.", 'high')} 
                    disabled={!isEnabled || isMuted}
                    className="flex-1"
                    variant="outline"
                  >
                    Test Voice
                  </Button>
                  <Button 
                    onClick={stopSpeaking}
                    disabled={!isSpeaking}
                    variant="outline"
                  >
                    Stop
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EnhancedHomePageVoiceAssistant;
