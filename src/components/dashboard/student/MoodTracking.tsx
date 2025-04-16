
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Smile, Flame, BookOpen, Coffee, Brain, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { MoodType } from "@/types/user/base";

interface MoodTrackingProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodTracking: React.FC<MoodTrackingProps> = ({ currentMood, onMoodChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType>(currentMood);
  const { toast } = useToast();

  // Apply theme changes based on mood
  useEffect(() => {
    if (!currentMood) return;
    
    // Apply CSS classes based on mood
    document.body.classList.remove(
      'mood-motivated', 'mood-curious', 'mood-neutral', 'mood-tired', 'mood-stressed',
      'mood-focused', 'mood-happy', 'mood-okay', 'mood-overwhelmed', 'mood-sad'
    );
    document.body.classList.add(`mood-${currentMood}`);
    
    // Store mood in localStorage for persistence
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = currentMood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood: currentMood }));
    }
  }, [currentMood]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    
    if (onMoodChange) {
      onMoodChange(mood);
    }
    
    // Show appropriate message based on mood
    let message = "";
    let description = "";
    
    switch (mood) {
      case 'motivated':
        message = "You're on fire today!";
        description = "Let's channel this energy into something amazing.";
        break;
      case 'curious':
        message = "Curiosity is your superpower.";
        description = "Want to explore something new?";
        break;
      case 'neutral':
        message = "It's okay to just be.";
        description = "Small steps still count.";
        break;
      case 'tired':
        message = "Rest is part of growth.";
        description = "Take it slow, you're doing just fine.";
        break;
      case 'stressed':
        message = "It's okay to feel overwhelmed.";
        description = "Let's take a moment together.";
        break;
      case 'focused':
        message = "Your concentration is impressive!";
        description = "Let's make the most of this clarity.";
        break;
      default:
        message = "Thanks for sharing how you feel.";
        description = "We'll tailor your experience accordingly.";
    }
    
    toast({
      title: message,
      description: description,
    });
    
    setIsOpen(false);
  };
  
  // Get mood-specific UI elements
  const renderMoodSpecificElements = () => {
    if (!currentMood) return null;
    
    switch (currentMood) {
      case 'motivated':
        return (
          <div className="p-4 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="flex items-center mb-4">
              <Flame className="h-5 w-5 text-orange-500 mr-2" />
              <h3 className="font-semibold text-orange-700 dark:text-orange-300">Power Mode Activated!</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">What's your mini goal today?</label>
                <input 
                  className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
                  placeholder="I want to complete..."
                />
              </div>
              <div className="animate-pulse">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-200 text-orange-800 dark:bg-orange-800/50 dark:text-orange-200">
                  <Flame className="h-3 w-3 mr-1" /> Power Mode Activated
                </span>
              </div>
            </div>
          </div>
        );
      
      case 'curious':
        return (
          <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-4">
              <Brain className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">Today's Wonder Box</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm">
                <p className="text-sm">Curious about quantum physics? Try our quick intro quiz!</p>
              </div>
              <Button variant="outline" className="w-full text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 dark:hover:bg-blue-900/60">
                Ask Sakha Anything
              </Button>
            </div>
          </div>
        );
        
      case 'neutral':
        return (
          <div className="p-4 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Small Steps Count</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Pick 1 small task to complete today</label>
                <select className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80">
                  <option>Review chapter 3 notes</option>
                  <option>Watch one concept explanation video</option>
                  <option>Try 5 practice problems</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">What's one nice thing that happened recently?</label>
                <input 
                  className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
                  placeholder="I'm grateful for..."
                />
              </div>
            </div>
          </div>
        );
        
      case 'tired':
        return (
          <div className="p-4 bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 rounded-lg border border-sky-200 dark:border-sky-800">
            <div className="flex items-center mb-4">
              <Coffee className="h-5 w-5 text-sky-500 mr-2" />
              <h3 className="font-semibold text-sky-700 dark:text-sky-300">Rest and Recharge</h3>
            </div>
            <div className="space-y-4">
              <Button variant="outline" className="w-full text-sm bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/40 dark:hover:bg-sky-900/60">
                2-min Relaxation Break
              </Button>
              <div>
                <label className="text-sm font-medium">Light task option (optional)</label>
                <select className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80">
                  <option>Browse a light concept refresher</option>
                  <option>Review completed flashcards</option>
                  <option>Skip for today - that's okay too!</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 'stressed':
        return (
          <div className="p-4 bg-gradient-to-r from-lavender-100 to-blue-100 dark:from-lavender-900/30 dark:to-blue-900/30 rounded-lg border border-lavender-200 dark:border-lavender-800">
            <div className="flex items-center mb-4">
              <HeartPulse className="h-5 w-5 text-lavender-500 mr-2" />
              <h3 className="font-semibold text-lavender-700 dark:text-lavender-300">Let's Take a Moment</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm">
                <p className="text-sm font-medium mb-2">4-7-8 Breathing:</p>
                <p className="text-xs">Breathe in for 4 seconds, hold for 7, exhale for 8</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
                  <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Write what's bothering you (private journal)</label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
                  placeholder="I feel stressed because..."
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline" 
        className="flex items-center gap-2"
      >
        <Smile size={18} />
        <span>Log Today's Mood</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How are you feeling today?</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-5 gap-4 py-4">
            <MoodOption 
              mood="motivated" 
              label="Motivated" 
              icon={<Flame className="h-6 w-6 text-orange-500" />} 
              color="bg-orange-100 border-orange-300 hover:bg-orange-200"
              selected={selectedMood === 'motivated'}
              onSelect={() => handleMoodSelect('motivated')}
            />
            <MoodOption 
              mood="curious" 
              label="Curious" 
              icon={<Brain className="h-6 w-6 text-blue-500" />} 
              color="bg-blue-100 border-blue-300 hover:bg-blue-200"
              selected={selectedMood === 'curious'}
              onSelect={() => handleMoodSelect('curious')}
            />
            <MoodOption 
              mood="neutral" 
              label="Neutral" 
              icon={<Smile className="h-6 w-6 text-gray-500" />} 
              color="bg-gray-100 border-gray-300 hover:bg-gray-200"
              selected={selectedMood === 'neutral'}
              onSelect={() => handleMoodSelect('neutral')}
            />
            <MoodOption 
              mood="tired" 
              label="Tired" 
              icon={<Coffee className="h-6 w-6 text-sky-500" />} 
              color="bg-sky-100 border-sky-300 hover:bg-sky-200"
              selected={selectedMood === 'tired'}
              onSelect={() => handleMoodSelect('tired')}
            />
            <MoodOption 
              mood="stressed" 
              label="Stressed" 
              icon={<HeartPulse className="h-6 w-6 text-purple-500" />} 
              color="bg-purple-100 border-purple-300 hover:bg-purple-200"
              selected={selectedMood === 'stressed'}
              onSelect={() => handleMoodSelect('stressed')}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      {currentMood && renderMoodSpecificElements()}
    </>
  );
};

interface MoodOptionProps {
  mood: MoodType;
  label: string;
  icon: React.ReactNode;
  color: string;
  selected: boolean;
  onSelect: () => void;
}

const MoodOption: React.FC<MoodOptionProps> = ({ 
  mood, label, icon, color, selected, onSelect 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border-2 ${color} ${
        selected ? 'ring-2 ring-offset-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      {icon}
      <span className="text-xs mt-2 font-medium">{label}</span>
    </motion.div>
  );
};

export default MoodTracking;
