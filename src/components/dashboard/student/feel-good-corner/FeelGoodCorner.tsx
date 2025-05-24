import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MoodSelection from './MoodSelection';
import ActivitiesTab from './ActivitiesTab';
import MusicTab from './MusicTab';
import QuotesTab from './QuotesTab';
import JokesTab from './JokesTab';

const FeelGoodCorner = () => {
  const [currentMood, setCurrentMood] = useState<string>('okay');
  
  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood);
  };
  
  const moods = [
    { value: 'happy', label: '😊 Happy' },
    { value: 'stressed', label: '😰 Stressed' },
    { value: 'motivated', label: '💪 Motivated' },
    { value: 'tired', label: '😴 Tired' },
  ];

  return (
    <div className="space-y-4">
      <MoodSelection 
        moods={moods}
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
      />
      
      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="w-full -ml-2 grid grid-cols-4">
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
          <TabsTrigger value="jokes">Jokes</TabsTrigger>
        </TabsList>
        <TabsContent value="activities">
          <ActivitiesTab mood={currentMood} />
        </TabsContent>
        <TabsContent value="music">
          <MusicTab mood={currentMood} />
        </TabsContent>
        <TabsContent value="quotes">
          <QuotesTab mood={currentMood} />
        </TabsContent>
        <TabsContent value="jokes">
          <JokesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeelGoodCorner;
