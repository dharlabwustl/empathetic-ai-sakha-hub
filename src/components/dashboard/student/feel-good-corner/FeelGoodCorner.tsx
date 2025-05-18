
import React, { useState } from 'react';
import SharedPageLayout from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BreathingExerciseTab from './BreathingExerciseTab';
import QuotesTab from './QuotesTab';
import VideosTab from './VideosTab';
import GamesTab from './GamesTab';
import MindfulnessTab from './MindfulnessTab';
import { MoodType } from '@/types/user/base';
import { useToast } from "@/hooks/use-toast";
import { storeMoodInLocalStorage } from '@/components/dashboard/student/mood-tracking/moodUtils';

const FeelGoodCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState('breathing');
  const { toast } = useToast();
  
  // Function to handle mood improvement
  const handleMoodImproved = (moodFrom: MoodType, moodTo: MoodType) => {
    // Store new mood
    storeMoodInLocalStorage(moodTo);
    
    // Show toast to acknowledge mood improvement
    toast({
      title: "Mood Updated!",
      description: `Great job! Your mood improved from ${moodFrom.toLowerCase()} to ${moodTo.toLowerCase()}.`,
      duration: 5000,
    });
  };
  
  // Suggested content based on user's current mood
  const getSuggestedContent = (currentMood: MoodType) => {
    switch (currentMood) {
      case MoodType.STRESSED:
      case MoodType.ANXIOUS:
      case MoodType.OVERWHELMED:
        return {
          tab: 'breathing',
          message: 'Try a breathing exercise to help calm your mind'
        };
      case MoodType.TIRED:
        return {
          tab: 'videos',
          message: 'A short motivational video might help energize you'
        };
      case MoodType.SAD:
      case MoodType.CONFUSED:
        return {
          tab: 'quotes',
          message: 'Some inspirational quotes might lift your spirits'
        };
      default:
        return {
          tab: 'games',
          message: 'Take a short mental break with a quick game'
        };
    }
  };
  
  // Example mood improvement scenarios
  const moodImprovementScenarios = [
    {
      from: MoodType.STRESSED,
      to: MoodType.CALM,
      activity: 'breathing exercise'
    },
    {
      from: MoodType.TIRED,
      to: MoodType.MOTIVATED,
      activity: 'motivational video'
    },
    {
      from: MoodType.SAD,
      to: MoodType.HAPPY,
      activity: 'quotes'
    },
    {
      from: MoodType.ANXIOUS,
      to: MoodType.CALM,
      activity: 'mindfulness session'
    }
  ];
  
  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break and boost your mood"
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Mood improvement suggestion */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Welcome to Your Feel Good Corner</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Taking regular breaks improves study efficiency. Choose an activity to refresh your mind.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab as any}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breathing" className="focus:outline-none">
            <BreathingExerciseTab onMoodImproved={() => handleMoodImproved(MoodType.STRESSED, MoodType.CALM)} />
          </TabsContent>
          
          <TabsContent value="mindfulness" className="focus:outline-none">
            <MindfulnessTab onMoodImproved={() => handleMoodImproved(MoodType.ANXIOUS, MoodType.CALM)} />
          </TabsContent>
          
          <TabsContent value="quotes" className="focus:outline-none">
            <QuotesTab onMoodImproved={() => handleMoodImproved(MoodType.SAD, MoodType.HAPPY)} />
          </TabsContent>
          
          <TabsContent value="videos" className="focus:outline-none">
            <VideosTab onMoodImproved={() => handleMoodImproved(MoodType.TIRED, MoodType.MOTIVATED)} />
          </TabsContent>
          
          <TabsContent value="games" className="focus:outline-none">
            <GamesTab />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCorner;
