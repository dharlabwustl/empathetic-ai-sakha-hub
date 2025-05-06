
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smile, Music, Film, HeartHandshake, Heart, MessageCircle, BookOpen, Trophy } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import MoodSelector from '../mood-tracking/MoodSelector';
import { storeMoodInLocalStorage } from '../mood-tracking/moodUtils';
import MotivationalQuotes from './MotivationalQuotes';
import MusicTab from './MusicTab';
import VideosTab from './VideosTab';
import SuccessStoriesTab from './SuccessStoriesTab';

const FeelGoodCorner = () => {
  const [activeTab, setActiveTab] = useState('quotes');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const { speakMessage } = useVoiceAnnouncer();
  
  useEffect(() => {
    // Load saved mood from localStorage
    const savedMood = localStorage.getItem('current_mood') as MoodType | null;
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []);
  
  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    storeMoodInLocalStorage(mood);
    
    // Provide a voice response to the mood change
    let message = '';
    
    switch (mood) {
      case MoodType.Happy:
        message = "That's great to hear you're happy! A positive mood enhances learning. Let's make the most of it today.";
        break;
      case MoodType.Stressed:
        message = "I understand you're feeling stressed. Taking short breaks and deep breaths can help. Remember, you're doing great!";
        break;
      case MoodType.Motivated:
        message = "Wonderful! Your motivation will help you achieve your goals today. Let's channel that energy into focused study.";
        break;
      case MoodType.Tired:
        message = "It's okay to feel tired sometimes. Consider a short power nap or a refreshing walk. Your well-being matters.";
        break;
      case MoodType.Focused:
        message = "You're in the zone! This is a great time for deep work and tackling challenging concepts.";
        break;
      default:
        message = "Thank you for sharing how you feel. I'm here to support your learning journey.";
    }
    
    speakMessage(message);
  };
  
  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Feel Good Corner</h1>
          <p className="text-muted-foreground">Take a break and boost your motivation</p>
        </div>
        
        <MoodSelector currentMood={currentMood} onMoodChange={handleMoodChange} />
      </div>
      
      <Card className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Heart className="text-rose-500" size={20} />
            Mental Wellness Check-in
          </CardTitle>
          <CardDescription>Take a moment to prioritize your mental health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Remember that your well-being is just as important as your studies. If you're feeling overwhelmed, take a break, talk to someone, or try some of the activities below.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
                <MessageCircle size={14} className="mr-1" /> 
                Talk to someone
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300">
                <BookOpen size={14} className="mr-1" /> 
                Mindfulness
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300">
                <Trophy size={14} className="mr-1" /> 
                Celebrate small wins
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="quotes" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 h-auto">
          <TabsTrigger value="quotes" className="py-2">
            <Smile className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Quotes</span>
          </TabsTrigger>
          <TabsTrigger value="music" className="py-2">
            <Music className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Music</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="py-2">
            <Film className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="stories" className="py-2">
            <HeartHandshake className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Success Stories</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="quotes">
          <MotivationalQuotes currentMood={currentMood} />
        </TabsContent>
        
        <TabsContent value="music">
          <MusicTab currentMood={currentMood} />
        </TabsContent>
        
        <TabsContent value="videos">
          <VideosTab currentMood={currentMood} />
        </TabsContent>
        
        <TabsContent value="stories">
          <SuccessStoriesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeelGoodCorner;
