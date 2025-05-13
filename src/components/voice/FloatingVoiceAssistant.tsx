
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Settings, Globe, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VoiceSettings } from '@/types/voice';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { DEFAULT_VOICE_SETTINGS } from '@/components/dashboard/student/voice/voiceUtils';

interface FloatingVoiceAssistantProps {
    isOpen?: boolean;
    onClose?: () => void;
    userName?: string;
    currentMood?: string;
    onMoodCommand?: (mood: string) => void;
    onNavigationCommand?: (route: string) => void;
    pronouncePrepzr?: boolean;
    defaultLanguage?: string;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
    isOpen = false,
    onClose,
    userName,
    currentMood,
    onMoodCommand,
    onNavigationCommand,
    pronouncePrepzr = false,
    defaultLanguage = 'en-US'
}) => {
    const { toast } = useToast();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState<any>(null);
    const [showPopover, setShowPopover] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [expanded, setExpanded] = useState(isOpen);
    const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
        ...DEFAULT_VOICE_SETTINGS,
        language: defaultLanguage,
    });
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);

    // Language options with support for Hindi
    const languageOptions = [
        { value: 'en-US', label: 'English (US)' },
        { value: 'en-GB', label: 'English (UK)' },
        { value: 'en-IN', label: 'English (India)' },
        { value: 'hi-IN', label: 'Hindi' },
        { value: 'es-ES', label: 'Spanish' },
        { value: 'fr-FR', label: 'French' },
        { value: 'de-DE', label: 'German' },
    ];

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
        recognitionInstance.lang = defaultLanguage || 'en-US';

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
            console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
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
                    voice: matchedVoice,
                    language: parsedSettings.language || defaultLanguage || 'en-US'
                });
            } catch (e) {
                console.error('Error parsing voice settings:', e);
            }
        }

        // Set expanded state based on isOpen prop
        setExpanded(isOpen);
        
        return () => {
            if (recognitionInstance) {
                try {
                    recognitionInstance.stop();
                } catch (e) {
                    // Ignore errors when stopping recognition
                }
            }
        };
    }, [toast, defaultLanguage, isOpen]);

    // Update when isOpen changes
    useEffect(() => {
        setExpanded(isOpen);
    }, [isOpen]);

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
        else if (command.includes('sign up') || command.includes('create account')) {
            speakResponse("Taking you to the sign up page");
            onNavigationCommand && onNavigationCommand('/signup');
        }
        else if (command.includes('free trial') || command.includes('try for free')) {
            speakResponse("You can try PREPZR for free by signing up for an account");
            onNavigationCommand && onNavigationCommand('/signup');
        }
        else if (command.includes('exam readiness') || command.includes('check readiness')) {
            speakResponse("Let's check your exam readiness with our analyzer");
            document.dispatchEvent(new CustomEvent('open-exam-analyzer'));
        }
        else if (command.includes('explain prepzr') || command.includes('what is prepzr')) {
            speakResponse("Prep-zer is an AI-powered exam preparation platform that helps students prepare for competitive exams with personalized study plans, concept cards, interactive flashcards, and more.");
        }
        else if (command.includes('why choose prepzr') || command.includes('advantages')) {
            speakResponse("Prep-zer offers personalized learning paths, AI-powered tutoring, interactive study materials, and real-time performance tracking. Our approach adapts to your learning style and helps you achieve better results in less time.");
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
            speakResponse("I can help you navigate the app, track your mood, explain PREPZR's features, assist with signing up, and provide study suggestions. Try asking me to check your exam readiness or explain why PREPZR is the best choice for your exam preparation.");
        }
        // Pronunciation of PREPZR
        else if (pronouncePrepzr && (command.includes('say prepzr') || command.includes('pronounce prepzr'))) {
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
            recognition.lang = voiceSettings.language;
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
        utterance.lang = voiceSettings.language;
        
        // Use selected voice if available
        if (voiceSettings.voice) {
            utterance.voice = voiceSettings.voice;
        } else {
            // Try to find best voice for selected language
            const voices = speechSynthesis.getVoices();
            const voicesForLanguage = voices.filter(voice => voice.lang === voiceSettings.language);
            if (voicesForLanguage.length > 0) {
                utterance.voice = voicesForLanguage[0];
            }
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
        utterance1.lang = utterance2.lang = voiceSettings.language;
        
        // Use selected voice if available
        if (voiceSettings.voice) {
            utterance1.voice = utterance2.voice = voiceSettings.voice;
        } else {
            // Try to find best voice for selected language
            const voices = speechSynthesis.getVoices();
            const voicesForLanguage = voices.filter(voice => voice.lang.startsWith(voiceSettings.language.split('-')[0]));
            if (voicesForLanguage.length > 0) {
                utterance1.voice = utterance2.voice = voicesForLanguage[0];
            }
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
        localStorage.setItem('voiceSettings', JSON.stringify({
            ...newSettings,
            voice: null // Voice object can't be serialized
        }));

        // If language changed, update recognition language
        if (setting === 'language' && recognition) {
            recognition.lang = value;
        }
    };

    // Handle voice selection
    const handleVoiceChange = (voiceURI: string) => {
        const selectedVoice = availableVoices.find(voice => voice.voiceURI === voiceURI) || null;
        handleSettingsChange('voice', selectedVoice);
    };

    // Format the transcript for display
    const formattedTranscript = transcript.trim() || "Listening...";

    // Handle close button
    const handleClose = () => {
        setExpanded(false);
        if (onClose) onClose();
    };

    // Get voices for selected language
    const getVoicesForCurrentLanguage = () => {
        const languagePrefix = voiceSettings.language.split('-')[0];
        return availableVoices.filter(voice => 
            voice.lang.startsWith(languagePrefix)
        );
    };

    // Handle language change
    const handleLanguageChange = (lang: string) => {
        handleSettingsChange('language', lang);
        
        // Find appropriate voice for this language
        const voices = speechSynthesis.getVoices();
        const voicesForLanguage = voices.filter(voice => voice.lang.startsWith(lang.split('-')[0]));
        if (voicesForLanguage.length > 0) {
            handleSettingsChange('voice', voicesForLanguage[0]);
        }
    };

    if (!expanded) {
        return (
            <div className="fixed bottom-24 right-6 md:bottom-16 md:right-6 z-40">
                <Button
                    variant="default"
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-xl bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setExpanded(true)}
                >
                    <Mic className="h-6 w-6 text-white" />
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="fixed bottom-24 right-6 md:bottom-16 md:right-6 z-40 flex flex-col items-end gap-3">
                {/* Main Card */}
                <Card className="w-80 shadow-lg border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium flex items-center">
                                <Globe className="h-4 w-4 mr-2" /> 
                                Voice Assistant
                            </h3>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleClose}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Transcript display */}
                        {showTranscript && (
                            <div className="bg-muted p-2 rounded-md mb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium">
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
                                <p className="text-sm font-medium">
                                    {formattedTranscript}
                                </p>
                            </div>
                        )}

                        {/* Language Selection */}
                        <div className="mb-4">
                            <Label htmlFor="voice-language" className="text-xs block mb-1.5">Language</Label>
                            <Select 
                                value={voiceSettings.language} 
                                onValueChange={handleLanguageChange}
                            >
                                <SelectTrigger id="voice-language" className="w-full">
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languageOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Voice Selection */}
                        <div className="mb-4">
                            <Label htmlFor="voice-selection" className="text-xs block mb-1.5">Voice</Label>
                            <Select 
                                value={voiceSettings.voice?.voiceURI || ''} 
                                onValueChange={handleVoiceChange}
                            >
                                <SelectTrigger id="voice-selection" className="w-full">
                                    <SelectValue placeholder="Default Voice" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Default Voice</SelectItem>
                                    {getVoicesForCurrentLanguage().map(voice => (
                                        <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                                            {voice.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Voice Settings */}
                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="voice-volume" className="text-xs">Volume</Label>
                                    <span className="text-xs">{Math.round(voiceSettings.volume * 100)}%</span>
                                </div>
                                <Slider
                                    id="voice-volume"
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    value={[voiceSettings.volume]}
                                    onValueChange={([value]) => handleSettingsChange('volume', value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="voice-rate" className="text-xs">Speed</Label>
                                    <span className="text-xs">{voiceSettings.rate.toFixed(1)}x</span>
                                </div>
                                <Slider
                                    id="voice-rate"
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                    value={[voiceSettings.rate]}
                                    onValueChange={([value]) => handleSettingsChange('rate', value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="voice-pitch" className="text-xs">Pitch</Label>
                                    <span className="text-xs">{voiceSettings.pitch.toFixed(1)}</span>
                                </div>
                                <Slider
                                    id="voice-pitch"
                                    min={0.5}
                                    max={2}
                                    step={0.1}
                                    value={[voiceSettings.pitch]}
                                    onValueChange={([value]) => handleSettingsChange('pitch', value)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between pt-1">
                                <Label htmlFor="voice-muted" className="text-xs">Mute Voice</Label>
                                <Switch 
                                    id="voice-muted"
                                    checked={voiceSettings.muted}
                                    onCheckedChange={(checked) => handleSettingsChange('muted', checked)}
                                />
                            </div>
                        </div>

                        {/* Listen Button */}
                        <div className="mt-6 flex justify-center">
                            <Button
                                variant={isListening ? "destructive" : "default"}
                                onClick={toggleListening}
                                className="w-full"
                            >
                                {isListening ? (
                                    <>
                                        <MicOff className="h-4 w-4 mr-2" />
                                        Stop Listening
                                    </>
                                ) : (
                                    <>
                                        <Mic className="h-4 w-4 mr-2" />
                                        Start Listening
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default FloatingVoiceAssistant;
