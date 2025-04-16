
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user';
import { Fire, Sparkles, Smile, Cloud, HeartPulse, Input } from 'lucide-react';

interface MotivationCardProps {
  currentMood?: MoodType;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ currentMood = 'neutral' }) => {
  // Define content based on mood
  let message, icon, elements, theme, animation;
  
  switch (currentMood) {
    case 'motivated':
      message = "You're on fire today! Let's channel this energy into something amazing.";
      icon = <Fire className="h-8 w-8 text-orange-500" />;
      elements = (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Mini Goal</label>
            <div className="flex gap-2">
              <Input placeholder="What would you like to accomplish?" className="border-orange-200" />
              <Button size="sm">Set</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="outline" className="bg-gradient-to-r from-orange-400 to-amber-500 text-white border-none">
              🔥 Power Mode Activated
            </Button>
          </div>
        </div>
      );
      theme = "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-100";
      animation = (
        <motion.div 
          className="absolute top-0 right-0 h-full w-1/2 opacity-20 pointer-events-none"
          animate={{ 
            background: ["linear-gradient(0deg, rgba(251,146,60,0) 0%, rgba(251,146,60,0.3) 50%, rgba(251,146,60,0) 100%)", 
                         "linear-gradient(180deg, rgba(251,146,60,0) 0%, rgba(251,146,60,0.3) 50%, rgba(251,146,60,0) 100%)"],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      );
      break;
      
    case 'curious':
      message = "Curiosity is your superpower. Want to explore something new?";
      icon = <Sparkles className="h-8 w-8 text-blue-400" />;
      elements = (
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-1">Today's Wonder Box</h4>
            <p className="text-sm">Learn about quantum computing and its applications</p>
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-400 to-indigo-400">
            Ask Sakha Anything
          </Button>
        </div>
      );
      theme = "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-100";
      animation = (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(191,219,254,0.5) 0%, transparent 10%)" }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
      );
      break;
      
    case 'neutral':
      message = "It's okay to just be. Small steps still count.";
      icon = <Smile className="h-8 w-8 text-gray-500" />;
      elements = (
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Pick 1 small task
          </Button>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-1">Gratitude Prompt</h4>
            <p className="text-sm">What's one nice thing that happened recently?</p>
          </div>
        </div>
      );
      theme = "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 border-gray-200";
      break;
      
    case 'tired':
      message = "Rest is part of growth. Take it slow, you're doing just fine.";
      icon = <Cloud className="h-8 w-8 text-sky-400" />;
      elements = (
        <div className="space-y-3">
          <Button variant="outline" className="w-full bg-sky-50 dark:bg-sky-900/20 border-sky-100">
            2-min breathing recharge
          </Button>
          <Button variant="ghost" className="w-full text-sky-600">
            Mark a light task for today
          </Button>
        </div>
      );
      theme = "bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/30 border-sky-100";
      animation = (
        <motion.div 
          className="absolute right-0 bottom-0 w-32 h-32 opacity-20 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(186,230,253,1) 0%, transparent 70%)" }}
          animate={{ y: [10, -10] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 4 }}
        />
      );
      break;
      
    case 'stressed':
      message = "It's okay to feel overwhelmed. Let's take a moment together.";
      icon = <HeartPulse className="h-8 w-8 text-purple-500" />;
      elements = (
        <div className="space-y-3">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-1">4-7-8 Guided Breathing</h4>
            <p className="text-sm">Inhale for 4, hold for 7, exhale for 8 counts</p>
          </div>
          <Button variant="outline" className="w-full">
            Write what's bothering you
          </Button>
        </div>
      );
      theme = "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-purple-100";
      animation = (
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-10 pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
      );
      break;
      
    default:
      message = "Welcome to your personalized dashboard!";
      icon = <Smile className="h-8 w-8 text-gray-500" />;
      elements = (
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Get Started
          </Button>
        </div>
      );
      theme = "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 border-gray-200";
  }

  return (
    <Card className={`relative overflow-hidden ${theme}`}>
      {animation && animation}
      <CardContent className="p-4 sm:p-6 z-10 relative">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {currentMood === 'motivated' ? (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text"
                >
                  Motivated Mood
                </motion.span>
              ) : (
                `${currentMood?.charAt(0).toUpperCase()}${currentMood?.slice(1)} Mood`
              )}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
            {elements}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
