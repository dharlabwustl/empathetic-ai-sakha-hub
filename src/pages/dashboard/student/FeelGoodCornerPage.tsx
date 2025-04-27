
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import JokesTab from '@/components/dashboard/student/feel-good-corner/JokesTab';
import VideosTab from '@/components/dashboard/student/feel-good-corner/VideosTab';
import TeasersTab from '@/components/dashboard/student/feel-good-corner/TeasersTab';
import DoodleTab from '@/components/dashboard/student/feel-good-corner/DoodleTab';

const FeelGoodCornerPage = () => {
  const [activeTab, setActiveTab] = useState("jokes");

  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break, recharge, and boost your mood"
    >
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 gap-2">
            <TabsTrigger value="jokes">Jokes</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="teasers">Brain Teasers</TabsTrigger>
            <TabsTrigger value="doodle">Doodle</TabsTrigger>
            <TabsTrigger value="sakha">Sakha Chat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jokes" className="space-y-4">
            <JokesTab />
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-4">
            <VideosTab />
          </TabsContent>
          
          <TabsContent value="teasers" className="space-y-4">
            <TeasersTab />
          </TabsContent>
          
          <TabsContent value="doodle" className="space-y-4">
            <DoodleTab />
          </TabsContent>
          
          <TabsContent value="sakha" className="space-y-4">
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Sakha Chill Mode Chat</h3>
                <p className="text-muted-foreground">
                  Chat with your AI friend Sakha in chill mode to discuss anything non-academic.
                </p>
              </div>
              
              <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-muted-foreground">Sakha Chat feature will be coming soon!</p>
                <p className="text-sm mt-2">Talk about movies, music, sports, or just have a friendly conversation</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerPage;
