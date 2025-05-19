
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Mic, X, VolumeX, Volume2, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FloatingVoiceAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigationCommand?: (route: string) => void;
  language?: string;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({ 
  isOpen = false, 
  onClose, 
  onNavigationCommand,
  language = 'en-IN'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    volume: 80,
    speed: 1.0,
    pitch: 1.0,
    language: language,
    enabled: true
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [responseText, setResponseText] = useState('');
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const startListening = () => {
    setIsListening(true);
    setRecognizedText('');
    setResponseText('');
    
    // Simulate voice recognition after 2 seconds
    setTimeout(() => {
      setRecognizedText('How do I access my study plan?');
      
      // Simulate assistant response after another second
      setTimeout(() => {
        setResponseText('You can access your study plan from the dashboard by clicking on "Today\'s Plan" in the sidebar menu or using the shortcut on your dashboard overview.');
        setIsListening(false);
      }, 1500);
    }, 2000);
  };
  
  const stopListening = () => {
    setIsListening(false);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVoiceSettings({...voiceSettings, volume: value[0]});
  };
  
  const handleSpeedChange = (value: number[]) => {
    setVoiceSettings({...voiceSettings, speed: value[0]});
  };
  
  const handlePitchChange = (value: number[]) => {
    setVoiceSettings({...voiceSettings, pitch: value[0]});
  };
  
  const handleLanguageChange = (value: string) => {
    setVoiceSettings({...voiceSettings, language: value});
  };
  
  const handleToggleVoice = (checked: boolean) => {
    setVoiceSettings({...voiceSettings, enabled: checked});
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
          <span className="ml-2 font-medium">Voice Assistant</span>
        </motion.button>
      )}
      
      {/* Voice Assistant Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <Mic className="mr-2 h-5 w-5" />
                  PREPZR Voice Assistant
                </h2>
                <div className="flex gap-2">
                  <button
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings size={18} />
                  </button>
                  <button
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                    onClick={onClose}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              {/* Settings Panel (Conditional) */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="voice-enabled" className="font-medium">Voice Response</Label>
                        <Switch 
                          id="voice-enabled" 
                          checked={voiceSettings.enabled} 
                          onCheckedChange={handleToggleVoice}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <Label htmlFor="voice-volume" className="text-sm">Volume</Label>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{voiceSettings.volume}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            onClick={toggleMute}
                          >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                          </button>
                          <Slider 
                            id="voice-volume"
                            value={[voiceSettings.volume]} 
                            min={0} 
                            max={100} 
                            step={1}
                            onValueChange={handleVolumeChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="voice-language" className="text-sm block mb-1">Language</Label>
                        <Select value={voiceSettings.language} onValueChange={handleLanguageChange}>
                          <SelectTrigger id="voice-language">
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en-IN">English (India)</SelectItem>
                            <SelectItem value="en-US">English (US)</SelectItem>
                            <SelectItem value="en-GB">English (UK)</SelectItem>
                            <SelectItem value="hi-IN">Hindi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <button
                          className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                          onClick={() => setShowAdvanced(!showAdvanced)}
                        >
                          Advanced Settings 
                          {showAdvanced ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                        </button>
                        
                        <AnimatePresence>
                          {showAdvanced && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pt-3 space-y-3"
                            >
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <Label htmlFor="voice-speed" className="text-sm">Speed</Label>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{voiceSettings.speed.toFixed(1)}x</span>
                                </div>
                                <Slider 
                                  id="voice-speed"
                                  value={[voiceSettings.speed]} 
                                  min={0.5} 
                                  max={2} 
                                  step={0.1} 
                                  onValueChange={handleSpeedChange}
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <Label htmlFor="voice-pitch" className="text-sm">Pitch</Label>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{voiceSettings.pitch.toFixed(1)}</span>
                                </div>
                                <Slider 
                                  id="voice-pitch"
                                  value={[voiceSettings.pitch]} 
                                  min={0.5} 
                                  max={2} 
                                  step={0.1} 
                                  onValueChange={handlePitchChange}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Main Content Area */}
              <div className="p-4 h-[300px] flex flex-col">
                <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                  {isListening ? (
                    <div className="space-y-4 w-full">
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="absolute -inset-2">
                            <motion.div 
                              className="w-16 h-16 rounded-full bg-purple-500/20 dark:bg-purple-600/20" 
                              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                repeatType: "loop" 
                              }}
                            />
                          </div>
                          <motion.div 
                            className="relative w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
                            animate={{ 
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ 
                              duration: 0.5, 
                              repeat: Infinity,
                              repeatType: "reverse" 
                            }}
                          >
                            <Mic className="h-6 w-6 text-white" />
                          </motion.div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 animate-pulse">Listening...</p>
                      {recognizedText && (
                        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/50 p-3 mt-2">
                          <p className="text-sm text-gray-800 dark:text-gray-200">{recognizedText}</p>
                        </Card>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4 w-full">
                      {responseText ? (
                        <>
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" x2="12" y1="19" y2="22"></line>
                              </svg>
                            </div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Response</h3>
                          </div>
                          <Card className="bg-gray-50 dark:bg-gray-800 p-3 mt-2">
                            <p className="text-sm text-gray-800 dark:text-gray-200">{responseText}</p>
                          </Card>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto flex items-center justify-center shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                              <line x1="12" x2="12" y1="19" y2="22"></line>
                            </svg>
                          </div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-200">How can I help you today?</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tap the button below and ask me about your study plan, exams, or any PREPZR feature.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Action Button */}
                <div className="mt-auto pt-4">
                  <Button
                    className={`w-full py-6 ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                    }`}
                    onClick={toggleListening}
                  >
                    {isListening ? (
                      <>
                        <X className="mr-2 h-4 w-4" /> Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" /> Start Voice Assistant
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingVoiceAssistant;
