
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MoodSelector from '@/components/dashboard/student/mood-tracking/MoodSelector';
import MoodTracker from '@/components/dashboard/student/mood-tracking/MoodTracker';
import MoodInsights from '@/components/dashboard/student/mood-tracking/MoodInsights';
import MindfulnessTab from './MindfulnessTab';
import MotivationTab from './MotivationTab';
import MusicTab from './MusicTab';
import VideosTab from './VideosTab';
import { MoodType } from '@/types/user/base'; 
import { storeMoodInLocalStorage } from '@/components/dashboard/student/mood-tracking/moodUtils';
import { toast } from '@/hooks/use-toast';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';

const FeelGoodCorner = () => {
  const [currentTab, setCurrentTab] = useState('mood');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  
  // Voice announcements
  const { speakMessage } = useVoiceAnnouncer();

  // Handle mood change
  const handleMoodChange = (newMood: MoodType) => {
    // Store the mood
    setCurrentMood(newMood);
    storeMoodInLocalStorage(newMood);
    
    // Provide a toast notification
    toast({
      title: "Mood updated",
      description: `Your mood has been recorded as ${newMood.toLowerCase()}`
    });
    
    // Speak a message based on mood
    const moodMessages = {
      [MoodType.HAPPY]: "Great to hear you're feeling happy! This is a perfect time to tackle challenging topics.",
      [MoodType.TIRED]: "I understand you're feeling tired. Let me suggest some lighter study activities.",
      [MoodType.STRESSED]: "I see you're feeling stressed. Taking short breaks can help. Why not try a quick mindfulness exercise?",
      [MoodType.MOTIVATED]: "Wonderful! Your motivation will help you make great progress today.",
      [MoodType.CONFUSED]: "It's okay to feel confused sometimes. Let's break things down into smaller steps.",
      [MoodType.ANXIOUS]: "I notice you're feeling anxious. Deep breathing can help. Would you like to try some mindfulness exercises?",
      [MoodType.OKAY]: "Feeling okay is a good baseline. Let's work on building some positive momentum.",
      [MoodType.OVERWHELMED]: "I understand you're feeling overwhelmed. Let's prioritize and take things one step at a time.",
      [MoodType.FOCUSED]: "Excellent! When you're focused, it's a great time for deep work on complex topics.",
      [MoodType.CURIOUS]: "Your curiosity will help you explore new concepts effectively today.",
      [MoodType.NEUTRAL]: "A neutral mood is a good foundation. Let's find something to get you engaged.",
      [MoodType.SAD]: "I'm sorry you're feeling sad. Taking care of your wellbeing is important. The Feel Good Corner has resources that might help."
    };
    
    speakMessage(moodMessages[newMood] || `Thank you for sharing how you feel.`);
    
    // Switch to appropriate tab based on mood
    if (newMood === MoodType.TIRED || newMood === MoodType.STRESSED) {
      setCurrentTab('mindfulness');
    } else if (newMood === MoodType.SAD || newMood === MoodType.ANXIOUS) {
      setCurrentTab('motivation');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Feel Good Corner</h1>
      <p className="text-muted-foreground mb-6">
        Track your mood, find motivation, and take care of your mental wellbeing
      </p>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="mood">Mood Tracker</TabsTrigger>
          <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
          <TabsTrigger value="motivation">Motivation</TabsTrigger>
          <TabsTrigger value="music">Study Music</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mood" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <MoodSelector onMoodSelect={handleMoodChange} currentMood={currentMood} />
            </div>
            <div className="lg:col-span-2">
              <MoodTracker />
            </div>
          </div>
          <MoodInsights />
        </TabsContent>
        
        <TabsContent value="mindfulness">
          <MindfulnessTab currentMood={currentMood} />
        </TabsContent>
        
        <TabsContent value="motivation">
          <MotivationTab currentMood={currentMood} />
        </TabsContent>
        
        <TabsContent value="music">
          <MusicTab />
        </TabsContent>
        
        <TabsContent value="videos">
          <VideosTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeelGoodCorner;
