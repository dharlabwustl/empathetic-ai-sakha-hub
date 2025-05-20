
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { MoodType } from '@/types/user/base';
import JokesTab from './feel-good-corner/JokesTab';
import VideosTab from './feel-good-corner/VideosTab';
import ChillChatPanel from './feel-good-corner/ChillChatPanel';
import DailyTeasers from './feel-good-corner/DailyTeasers';
import DoodleBoard from './feel-good-corner/DoodleBoard';
import MoodMusicPlayer from './feel-good-corner/MoodMusicPlayer';
import { useIsMobile } from '@/hooks/use-mobile';

const FeelGoodCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState('jokes');
  const [currentMood, setCurrentMood] = useState<MoodType>(MoodType.OKAY);
  const isMobile = useIsMobile();

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
  };

  const handleLikeJoke = (jokeId: number) => {
    // Implementation for liking jokes
    console.log(`Liked joke with ID: ${jokeId}`);
  };

  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break and boost your mood"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm p-3 md:p-6">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Mood Booster</h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            Taking short breaks improves focus and retention. Choose an activity below to recharge.
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid ${isMobile ? 'grid-cols-3 gap-1 mb-3' : 'grid-cols-5 mb-6'}`}>
            <TabsTrigger value="jokes" className="text-xs md:text-sm">Jokes</TabsTrigger>
            <TabsTrigger value="videos" className="text-xs md:text-sm">Videos</TabsTrigger>
            <TabsTrigger value="chat" className="text-xs md:text-sm">Chat</TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger value="doodle" className="text-xs md:text-sm">Doodle</TabsTrigger>
                <TabsTrigger value="music" className="text-xs md:text-sm">Music</TabsTrigger>
              </>
            )}
            {isMobile && (
              <TabsTrigger value="more" className="text-xs md:text-sm">More</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="jokes">
            <JokesTab onLike={handleLikeJoke} />
          </TabsContent>
          
          <TabsContent value="videos">
            <VideosTab />
          </TabsContent>
          
          <TabsContent value="chat">
            <ChillChatPanel onLike={handleLikeJoke} />
          </TabsContent>
          
          <TabsContent value="doodle">
            <DoodleBoard />
          </TabsContent>
          
          <TabsContent value="music">
            <MoodMusicPlayer currentMood={currentMood} onMoodChange={handleMoodChange} />
          </TabsContent>
          
          {isMobile && (
            <TabsContent value="more" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center cursor-pointer"
                  onClick={() => setActiveTab('doodle')}
                >
                  <h3 className="font-medium">Doodle Board</h3>
                  <p className="text-xs mt-1">Draw to relax your mind</p>
                </div>
                <div 
                  className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center cursor-pointer"
                  onClick={() => setActiveTab('music')}
                >
                  <h3 className="font-medium">Music Player</h3>
                  <p className="text-xs mt-1">Listen to mood boosters</p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCorner;
