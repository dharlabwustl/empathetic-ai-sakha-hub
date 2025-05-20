
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SharedPageLayout } from '../SharedPageLayout';
import { MoodType } from '@/types/user/base';
import JokesTab from './JokesTab';
import VideosTab from './VideosTab';
import ChillChatPanel from './ChillChatPanel';
import DailyTeasers from './DailyTeasers';
import DoodleBoard from './DoodleBoard';
import MoodMusicPlayer from './MoodMusicPlayer';

const FeelGoodCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState('jokes');
  const [currentMood, setCurrentMood] = useState<MoodType>(MoodType.OKAY);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  const moodsWithContent = [
    MoodType.HAPPY,
    MoodType.STRESSED,
    MoodType.MOTIVATED,
    MoodType.TIRED
  ];

  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break and boost your mood"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Mood Booster</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Taking short breaks improves focus and retention. Choose an activity below to recharge.
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="jokes">Jokes</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="chat">Chill Chat</TabsTrigger>
            <TabsTrigger value="doodle">Doodle</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jokes">
            <JokesTab />
          </TabsContent>
          
          <TabsContent value="videos">
            <VideosTab />
          </TabsContent>
          
          <TabsContent value="chat">
            <ChillChatPanel />
          </TabsContent>
          
          <TabsContent value="doodle">
            <DoodleBoard />
          </TabsContent>
          
          <TabsContent value="music">
            <MoodMusicPlayer currentMood={currentMood} />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCorner;
