
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { MoodType } from '@/types/user/base';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onComplete: () => void;
  mood?: MoodType;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood }) => {
  const [showMoodQuestion, setShowMoodQuestion] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(mood);

  useEffect(() => {
    // After logo animation, show the mood question
    const timer = setTimeout(() => {
      setShowMoodQuestion(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Pre-define moods with emojis
  const moods: { type: MoodType; emoji: string; label: string }[] = [
    { type: 'motivated', emoji: '💪', label: 'Motivated' },
    { type: 'happy', emoji: '😊', label: 'Happy' },
    { type: 'focused', emoji: '🧠', label: 'Focused' },
    { type: 'neutral', emoji: '😐', label: 'Neutral' },
    { type: 'stressed', emoji: '😥', label: 'Stressed' },
    { type: 'tired', emoji: '😴', label: 'Tired' },
  ];
  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    
    // Save mood to localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
    
    // Allow a brief moment to see the selection
    setTimeout(() => {
      onComplete();
    }, 500);
  };
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-gray-900 dark:to-indigo-950 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <PrepzrLogo width={100} height={100} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-3xl font-bold text-blue-600 dark:text-blue-400"
        >
          PREPZR
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-2 text-sm text-gray-600 dark:text-gray-400"
        >
          Your personalized exam preparation partner
        </motion.div>
      </motion.div>
      
      {showMoodQuestion && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <h2 className="text-xl font-medium mb-3">How are you feeling today?</h2>
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {moods.map((mood) => (
              <Button
                key={mood.type}
                variant={selectedMood === mood.type ? "default" : "outline"}
                className={`flex flex-col items-center px-3 py-4 h-auto ${selectedMood === mood.type ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => handleMoodSelect(mood.type)}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Button 
              variant="ghost" 
              onClick={onComplete}
              className="text-sm text-gray-500"
            >
              Skip for now
            </Button>
          </motion.div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 text-center text-sm text-gray-600 dark:text-gray-400"
      >
        © {new Date().getFullYear()} PREPZR. All rights reserved.
      </motion.div>
    </div>
  );
};

export default SplashScreen;
