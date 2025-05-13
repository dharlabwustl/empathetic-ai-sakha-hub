
// Create the file
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { VoiceSettings } from '@/types/voice';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface FloatingVoiceAssistantProps {
    userName?: string;
    currentMood?: string;
    onMoodCommand?: (mood: string) => void;
    onNavigationCommand?: (route: string) => void;
    pronouncePrepzr?: boolean;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
    userName,
    currentMood,
    onMoodCommand,
    onNavigationCommand,
    pronouncePrepzr = false
}) => {
    const { toast } = useToast();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState<any>(null);
    const [showPopover, setShowPopover] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
        volume: 1,
        rate: 1,
        pitch: 1,
        language: 'en-US',
        enabled: true,
        muted: false,
        voice: null,
        autoGreet: true
    });
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);

    // Initialize speech recognition
    useEffect(() => {
        // Check if browser supports speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast({
                title: "Speech Recognition Not Supported",
                description: "Your browser doesn't support speech recognition. Try using Chrome.",
                variant: "destructive"
            });
            return;
        }

        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onstart = () => {
            setIsListening(true);
            setIsTranscribing(true);
        };

        recognitionInstance.onresult = (event: any) => {
            const currentTranscript = Array.from(event.results)
                .map((result: any) => result[0].transcript)
                .join('');
            
            setTranscript(currentTranscript);
            processVoiceCommand(currentTranscript);
        };

        recognitionInstance.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            setIsTranscribing(false);
        };

        recognitionInstance.onend = () => {
            setIsListening(false);
            setIsTranscribing(false);
        };

        setRecognition(recognitionInstance);

        // Load available voices
        const loadVoices = () => {
            const voices = speechSynthesis.getVoices();
            setAvailableVoices(voices);
        };

        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
        
        loadVoices();

        // Load saved voice settings from localStorage
        const savedSettings = localStorage.getItem('voiceSettings');
        if (savedSettings) {
            try {
                const parsedSettings = JSON.parse(savedSettings);
                // Voice can't be serialized, so we need to find it again
                const voiceURI = parsedSettings.voice?.voiceURI;
                const matchedVoice = voiceURI 
                    ? speechSynthesis.getVoices().find(v => v.voiceURI === voiceURI) 
                    : null;
                
                setVoiceSettings({
                    ...parsedSettings,
                    voice: matchedVoice
                });
            } catch (e) {
                console.error('Error parsing voice settings:', e);
            }
        }
        
        return () => {
            if (recognitionInstance) {
                recognitionInstance.stop();
            }
        };
    }, [toast]);

    // Process voice commands
    const processVoiceCommand = (text: string) => {
        const command = text.toLowerCase().trim();
        
        // Navigation commands
        if (command.includes('go to dashboard') || command.includes('open dashboard')) {
            speakResponse("Opening dashboard");
            onNavigationCommand && onNavigationCommand('/dashboard/student');
        }
        else if (command.includes('go to concepts') || command.includes('show concepts')) {
            speakResponse("Opening concept cards");
            onNavigationCommand && onNavigationCommand('/dashboard/student/concepts');
        }
        else if (command.includes('go to flashcards') || command.includes('show flashcards')) {
            speakResponse("Opening flashcards");
            onNavigationCommand && onNavigationCommand('/dashboard/student/flashcards');
        }
        else if (command.includes('go to practice') || command.includes('open practice')) {
            speakResponse("Opening practice exams");
            onNavigationCommand && onNavigationCommand('/dashboard/student/practice-exam');
        }
        // Mood tracking
        else if (command.includes('i feel good') || command.includes('feeling good')) {
            speakResponse("Great to hear you're feeling good! I've updated your mood.");
            onMoodCommand && onMoodCommand('MOTIVATED');
        }
        else if (command.includes('i feel tired') || command.includes('feeling tired')) {
            speakResponse("I understand you're feeling tired. I'll suggest lighter tasks. Your mood has been updated.");
            onMoodCommand && onMoodCommand('TIRED');
        }
        else if (command.includes('i feel anxious') || command.includes('feeling anxious')) {
            speakResponse("I understand you're feeling anxious. Taking deep breaths might help. Your mood has been updated.");
            onMoodCommand && onMoodCommand('ANXIOUS');
        }
        // Help command
        else if (command.includes('what can you do') || command.includes('help me')) {
            speakResponse("I can help you navigate the app, track your mood, and provide study suggestions. Try asking me to go to dashboard, concepts, or update your mood.");
        }
        // Pronunciation of PREPZR
        else if (pronouncePrepzr && command.includes('say prepzr') || command.includes('pronounce prepzr')) {
            speakWithPause("Prep", "zer", 100);
        }
        // Greeting
        else if (command.includes('hello') || command.includes('hi there')) {
            const greeting = userName ? `Hello ${userName}! How can I help you today?` : "Hello! How can I help you today?";
            speakResponse(greeting);
        }
        // Stop listening
        else if (command.includes('stop listening') || command.includes('stop recording')) {
            stopListening();
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const startListening = () => {
        if (!recognition) return;
        
        try {
            recognition.start();
            setShowTranscript(true);
            toast({
                title: "Voice Assistant Activated",
                description: "I'm listening. What can I help you with?",
            });
        } catch (error) {
            console.error("Error starting recognition:", error);
        }
    };

    const stopListening = () => {
        if (!recognition) return;
        
        try {
            recognition.stop();
            setIsListening(false);
            setIsTranscribing(false);
            
            // Delay hiding the transcript
            setTimeout(() => {
                setShowTranscript(false);
            }, 3000);
        } catch (error) {
            console.error("Error stopping recognition:", error);
        }
    };

    const speakResponse = (text: string) => {
        if (!voiceSettings.enabled || voiceSettings.muted) return;
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Apply voice settings
        utterance.volume = voiceSettings.volume;
        utterance.rate = voiceSettings.rate;
        utterance.pitch = voiceSettings.pitch;
        
        // Use selected voice if available
        if (voiceSettings.voice) {
            utterance.voice = voiceSettings.voice;
        }
        
        window.speechSynthesis.speak(utterance);
    };

    // Special pronunciation for PREPZR with pause
    const speakWithPause = (firstPart: string, secondPart: string, pauseDuration: number) => {
        if (!voiceSettings.enabled || voiceSettings.muted) return;
        
        const utterance1 = new SpeechSynthesisUtterance(firstPart);
        const utterance2 = new SpeechSynthesisUtterance(secondPart);
        
        // Apply voice settings
        utterance1.volume = utterance2.volume = voiceSettings.volume;
        utterance1.rate = utterance2.rate = voiceSettings.rate;
        utterance1.pitch = utterance2.pitch = voiceSettings.pitch;
        
        // Use selected voice if available
        if (voiceSettings.voice) {
            utterance1.voice = utterance2.voice = voiceSettings.voice;
        }
        
        utterance1.onend = () => {
            setTimeout(() => {
                window.speechSynthesis.speak(utterance2);
            }, pauseDuration);
        };
        
        window.speechSynthesis.speak(utterance1);
    };

    // Handle voice settings changes
    const handleSettingsChange = (setting: keyof VoiceSettings, value: any) => {
        const newSettings = { ...voiceSettings, [setting]: value };
        setVoiceSettings(newSettings);
        
        // Save to localStorage
        localStorage.setItem('voiceSettings', JSON.stringify(newSettings));
    };

    // Handle voice selection
    const handleVoiceChange = (voiceURI: string) => {
        const selectedVoice = availableVoices.find(voice => voice.voiceURI === voiceURI) || null;
        handleSettingsChange('voice', selectedVoice);
    };

    // Format the transcript for display
    const formattedTranscript = transcript.trim() || "Listening...";

    return (
        <>
            <div className="fixed bottom-24 right-6 md:bottom-16 md:right-6 z-40 flex flex-col items-end gap-3">
                {/* Transcript display */}
                {showTranscript && (
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg max-w-xs md:max-w-md transition-all duration-300 mb-2 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {isTranscribing ? "Listening..." : "Heard:"}
                            </span>
                            {isTranscribing && (
                                <span className="flex items-center">
                                    <span className="animate-pulse mr-1 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                                    <span className="animate-pulse delay-75 mr-1 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                                    <span className="animate-pulse delay-150 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                            {formattedTranscript}
                        </p>
                    </div>
                )}
                
                {/* Voice assistant button */}
                <div className="flex items-center space-x-2">
                    {/* Settings popover */}
                    <Popover open={showSettings} onOpenChange={setShowSettings}>
                        <PopoverTrigger asChild>
                            <Button 
                                variant="outline" 
                                size="icon"
                                className="rounded-full shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="space-y-4">
                                <h4 className="font-medium text-sm">Voice Assistant Settings</h4>
                                
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="voice-enabled" className="flex-1">Enable Voice Assistant</Label>
                                        <Switch 
                                            id="voice-enabled"
                                            checked={voiceSettings.enabled}
                                            onCheckedChange={(checked) => handleSettingsChange('enabled', checked)}
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="voice-muted" className="flex-1">Mute Voice Responses</Label>
                                        <Switch 
                                            id="voice-muted"
                                            checked={voiceSettings.muted}
                                            onCheckedChange={(checked) => handleSettingsChange('muted', checked)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="voice-volume">Volume</Label>
                                    <Slider
                                        id="voice-volume"
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        value={[voiceSettings.volume]}
                                        onValueChange={([value]) => handleSettingsChange('volume', value)}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="voice-rate">Speech Rate</Label>
                                    <Slider
                                        id="voice-rate"
                                        min={0.5}
                                        max={2}
                                        step={0.1}
                                        value={[voiceSettings.rate]}
                                        onValueChange={([value]) => handleSettingsChange('rate', value)}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="voice-pitch">Pitch</Label>
                                    <Slider
                                        id="voice-pitch"
                                        min={0.5}
                                        max={2}
                                        step={0.1}
                                        value={[voiceSettings.pitch]}
                                        onValueChange={([value]) => handleSettingsChange('pitch', value)}
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="voice-selection">Voice</Label>
                                    <select 
                                        id="voice-selection"
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                        value={voiceSettings.voice?.voiceURI}
                                        onChange={(e) => handleVoiceChange(e.target.value)}
                                    >
                                        <option value="">Default</option>
                                        {availableVoices
                                            .filter(voice => voice.lang.startsWith('en-'))
                                            .map(voice => (
                                                <option key={voice.voiceURI} value={voice.voiceURI}>
                                                    {voice.name} ({voice.lang})
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                
                                <div className="pt-2">
                                    <Alert>
                                        <AlertTitle>Voice Commands</AlertTitle>
                                        <AlertDescription className="text-xs space-y-1">
                                            <p>- "Go to dashboard" - Navigate to dashboard</p>
                                            <p>- "Show concepts" - Open concept cards</p>
                                            <p>- "I feel tired" - Update your mood</p>
                                            <p>- "What can you do?" - Get help</p>
                                            {pronouncePrepzr && <p>- "Say PREPZR" - Hear pronunciation</p>}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Main voice button */}
                    <Button
                        variant="default"
                        size="icon"
                        className={`h-12 w-12 rounded-full shadow-xl flex items-center justify-center ${
                            isListening 
                                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                        onClick={toggleListening}
                    >
                        {isListening ? (
                            <MicOff className="h-6 w-6 text-white" />
                        ) : (
                            <Mic className="h-6 w-6 text-white" />
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default FloatingVoiceAssistant;
