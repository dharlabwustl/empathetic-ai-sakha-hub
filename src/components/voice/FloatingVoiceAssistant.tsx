
import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Mic, MicOff, X, Settings, Globe, BookOpen, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { LANGUAGE_OPTIONS, speakMessage, getTimeBasedGreeting } from '@/components/dashboard/student/voice/voiceUtils';
import { MoodType } from '@/types/user/base';

interface FloatingVoiceAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigationCommand?: (route: string) => void;
  onMoodCommand?: (mood: string) => void;
  onStudyRecommendation?: () => void;
  userName?: string;
  currentMood?: MoodType | string;
  pronouncePrepzr?: boolean;
  language?: string;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  isOpen = false,
  onClose,
  onNavigationCommand,
  onMoodCommand,
  onStudyRecommendation,
  userName = 'Student',
  currentMood,
  pronouncePrepzr = true,
  language = 'hi-IN' // Default to Hindi
}) => {
  const { toast } = useToast();
  const [showAssistant, setShowAssistant] = useState(isOpen);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [muted, setMuted] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState(0.8);
  const [voiceRate, setVoiceRate] = useState(0.9);
  const [voicePitch, setVoicePitch] = useState(1.0);
  const [currentLanguage, setCurrentLanguage] = useState<string>(language);
  const [activeTab, setActiveTab] = useState<string>('commands');
  const [commonCommands, setCommonCommands] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // @ts-ignore - standard isn't fully supported in TS yet
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = currentLanguage;
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        processCommand(transcript);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive"
        });
      };
      
      setRecognition(recognitionInstance);
    }
  }, [currentLanguage, toast]);

  // Set up common commands based on current language
  useEffect(() => {
    if (currentLanguage === 'hi-IN') {
      setCommonCommands([
        "मैं आज खुश महसूस कर रहा हूं",
        "मुझे अध्ययन योजना दिखाओ",
        "नए फ्लैशकार्ड बनाओ",
        "कॉन्सेप्ट कार्ड्स खोलें",
        "मुझे नीट परीक्षा के लिए तैयार करने में मदद करें",
        "आज मैं क्या पढ़ूँ?"
      ]);
    } else {
      setCommonCommands([
        "I'm feeling happy today",
        "Show my study plan",
        "Create new flashcards",
        "Open concept cards",
        "Help me prepare for NEET",
        "What should I study today?"
      ]);
    }
  }, [currentLanguage]);

  // Set up speaking event listeners
  useEffect(() => {
    const handleSpeakingStarted = () => setIsSpeaking(true);
    const handleSpeakingEnded = () => setIsSpeaking(false);
    
    document.addEventListener('voice-speaking-started', handleSpeakingStarted);
    document.addEventListener('voice-speaking-ended', handleSpeakingEnded);
    
    return () => {
      document.removeEventListener('voice-speaking-started', handleSpeakingStarted);
      document.removeEventListener('voice-speaking-ended', handleSpeakingEnded);
    };
  }, []);

  // Handle start listening
  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.lang = currentLanguage;
        recognition.start();
        setIsListening(true);
        
        // Provide audio feedback based on language
        if (!muted) {
          const message = currentLanguage === 'hi-IN' 
            ? "मैं सुन रहा हूं, कृपया बोलें..." 
            : "I'm listening, please speak...";
            
          const utterance = new SpeechSynthesisUtterance(message);
          utterance.lang = currentLanguage;
          utterance.volume = voiceVolume;
          utterance.rate = voiceRate;
          utterance.pitch = voicePitch;
          window.speechSynthesis.speak(utterance);
        }
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  }, [recognition, currentLanguage, muted, voiceVolume, voiceRate, voicePitch]);

  // Handle stop listening
  const stopListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
    setIsListening(false);
  }, [recognition]);

  // Process voice commands
  const processCommand = useCallback((command: string) => {
    if (!command) return;
    
    const lowerCommand = command.toLowerCase();
    console.log("Processing command:", lowerCommand);
    
    // Process mood commands
    if (lowerCommand.includes('feeling') || 
        lowerCommand.includes('mood') || 
        lowerCommand.includes('महसूस') || 
        lowerCommand.includes('मूड')) {
      
      // Extract mood keywords
      const moodKeywords = [
        { en: ['happy', 'good', 'great', 'excellent'], hi: ['खुश', 'अच्छा', 'बढ़िया'], mood: 'HAPPY' },
        { en: ['tired', 'exhausted', 'sleepy'], hi: ['थका', 'थकान'], mood: 'TIRED' },
        { en: ['motivated', 'inspired', 'determined'], hi: ['प्रेरित', 'उत्साहित'], mood: 'MOTIVATED' },
        { en: ['focused', 'concentrating'], hi: ['फोकस', 'एकाग्र'], mood: 'FOCUSED' },
        { en: ['stressed', 'tense'], hi: ['तनाव', 'परेशान'], mood: 'STRESSED' },
        { en: ['anxious', 'worried', 'nervous'], hi: ['चिंतित', 'घबराहट'], mood: 'ANXIOUS' },
        { en: ['confused', 'unsure'], hi: ['भ्रमित', 'असमंजस'], mood: 'CONFUSED' }
      ];
      
      let detectedMood = '';
      
      // Check if command contains any mood keywords
      for (const moodSet of moodKeywords) {
        if (currentLanguage.startsWith('hi') && 
            moodSet.hi.some(word => lowerCommand.includes(word))) {
          detectedMood = moodSet.mood;
          break;
        } else if (currentLanguage.startsWith('en') && 
                  moodSet.en.some(word => lowerCommand.includes(word))) {
          detectedMood = moodSet.mood;
          break;
        }
      }
      
      if (detectedMood && onMoodCommand) {
        onMoodCommand(detectedMood);
        
        // Provide feedback based on language
        const feedback = currentLanguage === 'hi-IN'
          ? `आपका मूड ${detectedMood} के रूप में दर्ज किया गया है।`
          : `Your mood has been recorded as ${detectedMood}.`;
          
        if (!muted) {
          const utterance = new SpeechSynthesisUtterance(feedback);
          utterance.lang = currentLanguage;
          utterance.volume = voiceVolume;
          utterance.rate = voiceRate;
          utterance.pitch = voicePitch;
          window.speechSynthesis.speak(utterance);
        }
        
        toast({
          title: "Mood Updated",
          description: feedback
        });
      }
      return;
    }
    
    // Navigation commands
    const navigationMapping = [
      { keywords: {
          en: ['dashboard', 'home', 'main page'], 
          hi: ['डैशबोर्ड', 'होम', 'मुख्य पेज']
        }, 
        route: '/dashboard/student' 
      },
      { keywords: {
          en: ['concept', 'concepts', 'cards'], 
          hi: ['कॉन्सेप्ट', 'कार्ड', 'अवधारणा']
        }, 
        route: '/dashboard/student/concepts' 
      },
      { keywords: {
          en: ['flash', 'flashcard', 'flashcards'], 
          hi: ['फ्लैश', 'फ्लैशकार्ड']
        }, 
        route: '/dashboard/student/flashcards' 
      },
      { keywords: {
          en: ['practice', 'exam', 'test'], 
          hi: ['प्रैक्टिस', 'परीक्षा', 'टेस्ट']
        }, 
        route: '/dashboard/student/practice' 
      }
    ];
    
    for (const nav of navigationMapping) {
      const matchingKeywords = currentLanguage.startsWith('hi')
        ? nav.keywords.hi
        : nav.keywords.en;
        
      if (matchingKeywords.some(keyword => lowerCommand.includes(keyword))) {
        if (onNavigationCommand) {
          onNavigationCommand(nav.route);
        }
        return;
      }
    }
    
    // Study recommendation command
    if ((currentLanguage.startsWith('hi') && 
         (lowerCommand.includes('अध्ययन') || 
          lowerCommand.includes('पढ़ना') || 
          lowerCommand.includes('सिफारिश'))) ||
        (currentLanguage.startsWith('en') && 
         (lowerCommand.includes('study') || 
          lowerCommand.includes('recommendation') ||
          lowerCommand.includes('what should i')))) {
      
      if (onStudyRecommendation) {
        onStudyRecommendation();
      } else {
        // Fallback if no recommendation handler
        const message = currentLanguage === 'hi-IN'
          ? "मैं आपको आज के लिए कुछ महत्वपूर्ण विषय सुझा सकता हूं। आज फिजिक्स में किनेमैटिक्स या बायोलॉजी में सेल बायोलॉजी पर ध्यान केंद्रित करने का प्रयास करें।"
          : "I can suggest some key topics for today. Try focusing on kinematics in physics or cell biology in your biology study today.";
          
        if (!muted) {
          const utterance = new SpeechSynthesisUtterance(message);
          utterance.lang = currentLanguage;
          utterance.volume = voiceVolume;
          utterance.rate = voiceRate;
          utterance.pitch = voicePitch;
          window.speechSynthesis.speak(utterance);
        }
      }
      return;
    }
    
    // If no command matched
    const noMatchMessage = currentLanguage === 'hi-IN'
      ? "मुझे आपका कमांड समझ नहीं आया। कृपया फिर से प्रयास करें।"
      : "I didn't understand that command. Please try again.";
      
    if (!muted) {
      const utterance = new SpeechSynthesisUtterance(noMatchMessage);
      utterance.lang = currentLanguage;
      utterance.volume = voiceVolume;
      utterance.rate = voiceRate;
      utterance.pitch = voicePitch;
      window.speechSynthesis.speak(utterance);
    }
    
    toast({
      title: "Command Not Recognized",
      description: noMatchMessage,
      variant: "destructive"
    });
    
  }, [currentLanguage, muted, onMoodCommand, onNavigationCommand, onStudyRecommendation, toast, voicePitch, voiceRate, voiceVolume]);

  // Toggle mute
  const handleToggleMute = () => {
    setMuted(!muted);
    
    if (muted) { // We're unmuting
      const message = currentLanguage === 'hi-IN'
        ? "आवाज़ चालू की गई है"
        : "Voice is now unmuted";
        
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = currentLanguage;
      utterance.volume = voiceVolume;
      utterance.rate = voiceRate;
      utterance.pitch = voicePitch;
      window.speechSynthesis.speak(utterance);
    } else {
      // Cancel any ongoing speech if muting
      window.speechSynthesis.cancel();
    }
  };

  // Change language
  const handleLanguageChange = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
    
    if (!muted) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Provide feedback in the new language
      let message = "";
      
      if (newLanguage === 'hi-IN') {
        message = "भाषा हिंदी में बदल दी गई है";
      } else if (newLanguage === 'en-IN') {
        message = "Language changed to Indian English";
      } else if (newLanguage === 'en-US') {
        message = "Language changed to American English";
      } else if (newLanguage === 'en-GB') {
        message = "Language changed to British English";
      }
      
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = newLanguage;
      utterance.volume = voiceVolume;
      utterance.rate = voiceRate;
      utterance.pitch = voicePitch;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speak a demo greeting
  const speakGreeting = () => {
    if (muted) {
      toast({
        title: "Voice is muted",
        description: "Unmute voice to hear greetings",
        variant: "warning"
      });
      return;
    }
    
    const greeting = getTimeBasedGreeting(currentLanguage);
    const name = userName || 'Student';
    
    let message = "";
    
    if (currentLanguage === 'hi-IN') {
      message = `${greeting} ${name}! मैं प्रेप ज़र वॉइस अस्सिस्टेंट हूँ। मैं आपके नीट परीक्षा की तैयारी में मदद कर सकता हूँ।`;
    } else {
      message = `${greeting} ${name}! I'm your Prep zer voice assistant. I can help you with your NEET exam preparation.`;
    }
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = currentLanguage;
    utterance.volume = voiceVolume;
    utterance.rate = voiceRate;
    utterance.pitch = voicePitch;
    window.speechSynthesis.speak(utterance);
  };

  // Speak a study tip
  const speakStudyTip = () => {
    if (muted) {
      toast({
        title: "Voice is muted",
        description: "Unmute voice to hear study tips",
        variant: "warning"
      });
      return;
    }
    
    const tips = {
      'hi-IN': [
        "नीट परीक्षा में सफलता के लिए, रोज़ अध्ययन की एक नियमित दिनचर्या बनाएं।",
        "अपने खुद के नोट्स बनाएं और उनका नियमित रूप से अभ्यास करें।",
        "सवालों का अभ्यास करने से अवधारणाओं को याद रखने में मदद मिलती है।",
        "पढ़ाई के समय फोन और सोशल मीडिया से दूर रहें।",
        "अच्छी नींद और स्वस्थ आहार आपकी पढ़ाई के लिए महत्वपूर्ण हैं।"
      ],
      'en-IN': [
        "For NEET success, create a regular daily study routine.",
        "Make your own notes and practice them regularly.",
        "Practicing questions helps remember concepts better.",
        "Stay away from phone and social media during study time.",
        "Good sleep and healthy diet are important for your studies."
      ],
      'en-US': [
        "For NEET success, create a regular daily study routine.",
        "Make your own notes and practice them regularly.",
        "Practicing questions helps remember concepts better.",
        "Stay away from phone and social media during study time.",
        "Good sleep and healthy diet are important for your studies."
      ],
      'en-GB': [
        "For NEET success, create a regular daily study routine.",
        "Make your own notes and practice them regularly.",
        "Practicing questions helps remember concepts better.",
        "Stay away from phone and social media during study time.",
        "Good sleep and healthy diet are important for your studies."
      ]
    };
    
    // Select a random tip based on current language
    const langTips = tips[currentLanguage as keyof typeof tips] || tips['en-US'];
    const randomTip = langTips[Math.floor(Math.random() * langTips.length)];
    
    const utterance = new SpeechSynthesisUtterance(randomTip);
    utterance.lang = currentLanguage;
    utterance.volume = voiceVolume;
    utterance.rate = voiceRate;
    utterance.pitch = voicePitch;
    window.speechSynthesis.speak(utterance);
    
    toast({
      title: "Study Tip",
      description: randomTip
    });
  };

  // Try a command suggestion
  const tryCommandSuggestion = (command: string) => {
    setTranscript(command);
    processCommand(command);
  };

  // Handle close
  const handleClose = () => {
    stopListening();
    setShowAssistant(false);
    if (onClose) onClose();
  };

  if (!showAssistant) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-900 shadow-lg rounded-lg w-80 border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center space-x-2">
          {isSpeaking ? (
            <Volume2 className="h-5 w-5 text-blue-600 animate-pulse" />
          ) : isListening ? (
            <Mic className="h-5 w-5 text-red-600 animate-pulse" />
          ) : (
            <Volume2 className="h-5 w-5 text-gray-600" />
          )}
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            {currentLanguage === 'hi-IN' ? 'वॉइस असिस्टेंट' : 'Voice Assistant'}
          </h3>
          <Badge variant="outline" className="px-2 py-0 h-5 flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {LANGUAGE_OPTIONS.find(lang => lang.value === currentLanguage)?.label || currentLanguage}
          </Badge>
        </div>
        <button 
          onClick={handleClose} 
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {/* Tabs */}
      <div className="p-3">
        <Tabs defaultValue="commands" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="commands" className="text-xs">
              {currentLanguage === 'hi-IN' ? 'आदेश' : 'Commands'}
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs">
              {currentLanguage === 'hi-IN' ? 'सेटिंग' : 'Settings'}
            </TabsTrigger>
            <TabsTrigger value="help" className="text-xs">
              {currentLanguage === 'hi-IN' ? 'मदद' : 'Help'}
            </TabsTrigger>
          </TabsList>
          
          {/* Commands Tab */}
          <TabsContent value="commands" className="space-y-3">
            {/* Voice Controls */}
            <div className="flex items-center justify-between">
              <Button 
                onClick={isListening ? stopListening : startListening}
                variant={isListening ? "destructive" : "default"}
                className="w-full"
                disabled={isSpeaking}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    {currentLanguage === 'hi-IN' ? 'सुनना बंद करें' : 'Stop Listening'}
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    {currentLanguage === 'hi-IN' ? 'सुनना शुरू करें' : 'Start Listening'}
                  </>
                )}
              </Button>
            </div>
            
            {/* Transcript Display */}
            {transcript && (
              <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {currentLanguage === 'hi-IN' ? 'आपने कहा:' : 'You said:'}
                </p>
                <p className="text-sm">{transcript}</p>
              </div>
            )}
            
            {/* Common Commands */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {currentLanguage === 'hi-IN' ? 'आज़माने के लिए कमांड:' : 'Try these commands:'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {commonCommands.slice(0, 4).map((command, i) => (
                  <Button 
                    key={i}
                    variant="ghost" 
                    size="sm" 
                    onClick={() => tryCommandSuggestion(command)}
                    className="h-auto py-1 px-2 justify-start text-left"
                  >
                    <span className="text-xs line-clamp-2">{command}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button 
                onClick={speakGreeting} 
                variant="outline" 
                size="sm" 
                className="flex-1"
                disabled={isSpeaking}
              >
                {currentLanguage === 'hi-IN' ? 'अभिवादन' : 'Greeting'}
              </Button>
              <Button 
                onClick={speakStudyTip} 
                variant="outline" 
                size="sm" 
                className="flex-1"
                disabled={isSpeaking}
              >
                <BookOpen className="h-3 w-3 mr-1" />
                {currentLanguage === 'hi-IN' ? 'अध्ययन टिप' : 'Study Tip'}
              </Button>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            {/* Language Selection */}
            <div className="space-y-2">
              <p className="text-xs font-medium">
                {currentLanguage === 'hi-IN' ? 'भाषा' : 'Language'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <Button
                    key={lang.value}
                    variant={currentLanguage === lang.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLanguageChange(lang.value)}
                    className="justify-start"
                  >
                    <Globe className="h-3 w-3 mr-2" />
                    {lang.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Mute Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-medium">
                  {currentLanguage === 'hi-IN' ? 'आवाज़' : 'Voice'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {muted 
                    ? (currentLanguage === 'hi-IN' ? 'अभी म्यूट है' : 'Currently muted')
                    : (currentLanguage === 'hi-IN' ? 'सक्रिय' : 'Active')}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleMute}
              >
                {muted ? (
                  <>
                    <Volume2 className="h-4 w-4 mr-1" />
                    {currentLanguage === 'hi-IN' ? 'अनम्यूट करें' : 'Unmute'}
                  </>
                ) : (
                  <>
                    <VolumeX className="h-4 w-4 mr-1" />
                    {currentLanguage === 'hi-IN' ? 'म्यूट करें' : 'Mute'}
                  </>
                )}
              </Button>
            </div>
            
            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">
                  {currentLanguage === 'hi-IN' ? 'वॉल्यूम' : 'Volume'}: {Math.round(voiceVolume * 100)}%
                </p>
              </div>
              <Slider
                value={[voiceVolume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={([value]) => setVoiceVolume(value)}
              />
            </div>
            
            {/* Rate Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">
                  {currentLanguage === 'hi-IN' ? 'गति' : 'Speed'}: {voiceRate.toFixed(1)}x
                </p>
              </div>
              <Slider
                value={[voiceRate]}
                min={0.5}
                max={1.5}
                step={0.1}
                onValueChange={([value]) => setVoiceRate(value)}
              />
            </div>
            
            {/* Pitch Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">
                  {currentLanguage === 'hi-IN' ? 'पिच' : 'Pitch'}: {voicePitch.toFixed(1)}
                </p>
              </div>
              <Slider
                value={[voicePitch]}
                min={0.8}
                max={1.2}
                step={0.1}
                onValueChange={([value]) => setVoicePitch(value)}
              />
            </div>
          </TabsContent>
          
          {/* Help Tab */}
          <TabsContent value="help" className="space-y-3">
            <div>
              <p className="text-xs font-medium mb-2">
                {currentLanguage === 'hi-IN' ? 'कमांड के उदाहरण:' : 'Example commands:'}
              </p>
              <ul className="text-xs space-y-2">
                <li className="flex items-start">
                  <Zap className="h-3 w-3 mr-1 mt-0.5 text-amber-500" />
                  {currentLanguage === 'hi-IN' 
                    ? '"मैं आज प्रेरित महसूस कर रहा हूं" (मूड अपडेट करने के लिए)' 
                    : '"I feel motivated today" (to update mood)'}
                </li>
                <li className="flex items-start">
                  <Zap className="h-3 w-3 mr-1 mt-0.5 text-amber-500" />
                  {currentLanguage === 'hi-IN' 
                    ? '"कॉन्सेप्ट कार्ड्स दिखाओ" (नेविगेशन के लिए)' 
                    : '"Show concept cards" (for navigation)'}
                </li>
                <li className="flex items-start">
                  <Zap className="h-3 w-3 mr-1 mt-0.5 text-amber-500" />
                  {currentLanguage === 'hi-IN' 
                    ? '"आज मुझे क्या पढ़ना चाहिए?" (अध्ययन सिफारिशें)' 
                    : '"What should I study today?" (for study recommendations)'}
                </li>
              </ul>
            </div>
            
            <div>
              <p className="text-xs font-medium mb-2">
                {currentLanguage === 'hi-IN' ? 'वॉइस सेटिंग्स:' : 'Voice settings:'}
              </p>
              <ul className="text-xs space-y-1">
                <li>• {currentLanguage === 'hi-IN' ? 'भाषा: हिंदी (डिफ़ॉल्ट)' : 'Language: Hindi (default)'}</li>
                <li>• {currentLanguage === 'hi-IN' ? 'अन्य भाषाएँ: अंग्रेज़ी (भारतीय, अमेरिकी, ब्रिटिश)' : 'Other languages: English (Indian, US, UK)'}</li>
                <li>• {currentLanguage === 'hi-IN' ? 'वॉल्यूम, गति, और पिच को समायोजित करने के लिए सेटिंग्स टैब का उपयोग करें' : 'Use the settings tab to adjust volume, rate, and pitch'}</li>
              </ul>
            </div>
            
            <div className="pt-2">
              <Button variant="default" size="sm" className="w-full" onClick={speakGreeting}>
                <Settings className="h-4 w-4 mr-2" />
                {currentLanguage === 'hi-IN' ? 'वॉइस टेस्ट करें' : 'Test Voice'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FloatingVoiceAssistant;
