
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Settings, X, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedHomePageVoiceAssistantProps {
  language?: string;
}

const EnhancedHomePageVoiceAssistant: React.FC<EnhancedHomePageVoiceAssistantProps> = ({
  language = "en-US"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [announcerType, setAnnouncerType] = useState("friendly");
  const [voiceGender, setVoiceGender] = useState("female");
  const [hasGreeted, setHasGreeted] = useState(false);

  // Auto-greet when component mounts
  useEffect(() => {
    if (!hasGreeted && !isMuted) {
      const timer = setTimeout(() => {
        speakMessage("Welcome to PREPZR! I'm your AI study companion. Click on me to explore our features and start your exam preparation journey!");
        setHasGreeted(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, isMuted]);

  const speakMessage = (message: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = message.replace(/PREPZR/gi, 'PREP-ZER');
      speech.lang = language;
      speech.volume = volume / 100;
      speech.rate = 0.85 + (speed / 100) * 0.3;
      speech.pitch = 0.8 + (pitch / 100) * 0.4;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = voices.filter(voice => {
        if (voiceGender === "female") {
          return voice.name.toLowerCase().includes("female") || 
                 voice.name.toLowerCase().includes("zira") ||
                 voice.name.toLowerCase().includes("aria") ||
                 !voice.name.toLowerCase().includes("male");
        } else {
          return voice.name.toLowerCase().includes("male");
        }
      });
      
      if (preferredVoices.length > 0) {
        speech.voice = preferredVoices[0];
      }
      
      window.speechSynthesis.speak(speech);
    }
  };

  const getAnnouncerPersonality = () => {
    switch (announcerType) {
      case "friendly":
        return "I'm your friendly study companion, ready to help you succeed!";
      case "motivational":
        return "Let's crush those exam goals together! You've got this!";
      case "professional":
        return "I'm here to provide professional guidance for your academic journey.";
      case "encouraging":
        return "Every step you take brings you closer to success. I believe in you!";
      default:
        return "I'm here to help you with your studies!";
    }
  };

  const handleVoiceTest = () => {
    speakMessage(getAnnouncerPersonality());
  };

  return (
    <>
      {/* Floating Voice Assistant Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl"
          size="lg"
        >
          <Volume2 className="h-6 w-6" />
          <motion.div
            className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>
      </motion.div>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Voice Assistant</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSettings(!showSettings)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    PREPZR Home Assistant
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Quick Controls */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={isMuted ? "destructive" : "outline"}
                      onClick={() => setIsMuted(!isMuted)}
                      className="flex items-center gap-2"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      {isMuted ? "Unmute" : "Mute"}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={handleVoiceTest}
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Test Voice
                    </Button>
                  </div>

                  {/* Settings Panel */}
                  {showSettings && (
                    <motion.div
                      className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Announcer Type</Label>
                          <Select value={announcerType} onValueChange={setAnnouncerType}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="motivational">Motivational</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="encouraging">Encouraging</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Voice Gender</Label>
                          <Select value={voiceGender} onValueChange={setVoiceGender}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="male">Male</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <div className="flex justify-between">
                            <Label className="text-sm">Volume: {volume}%</Label>
                          </div>
                          <Slider
                            value={[volume]}
                            onValueChange={(values) => setVolume(values[0])}
                            max={100}
                            step={1}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between">
                            <Label className="text-sm">Speed: {speed}%</Label>
                          </div>
                          <Slider
                            value={[speed]}
                            onValueChange={(values) => setSpeed(values[0])}
                            max={100}
                            step={1}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between">
                            <Label className="text-sm">Pitch: {pitch}%</Label>
                          </div>
                          <Slider
                            value={[pitch]}
                            onValueChange={(values) => setPitch(values[0])}
                            max={100}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Quick Actions</Label>
                    <div className="grid grid-cols-1 gap-2">
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => speakMessage("PREPZR offers AI-powered personalized study plans, interactive learning, and comprehensive analytics to transform your exam preparation experience.")}
                      >
                        Tell me about PREPZR
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => speakMessage("Our key features include personalized study plans, concept cards, flashcards, practice exams, academic advisor, progress tracking, and smart analytics.")}
                      >
                        What are the features?
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => speakMessage("Ready to start your exam preparation journey? Sign up now to access your personalized dashboard and begin studying smarter with PREPZR!")}
                      >
                        How to get started?
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedHomePageVoiceAssistant;
