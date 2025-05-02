
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import JokesPanel from "./JokesPanel";
import MusicPlayer from "./MusicPlayer";
import MotivationalQuotes from "./MotivationalQuotes";

const FeelGoodCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("jokes");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Feel Good Corner</h2>
        <p className="text-muted-foreground">Take a break and recharge with jokes, music, and inspiration</p>
      </div>
      
      <Card className="overflow-hidden">
        <Tabs defaultValue="jokes" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="jokes" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Student Jokes
              </TabsTrigger>
              <TabsTrigger 
                value="music" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Mood Music
              </TabsTrigger>
              <TabsTrigger 
                value="motivation" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
              >
                Inspirational Quotes
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="jokes" className="m-0">
            <JokesPanel />
          </TabsContent>
          
          <TabsContent value="music" className="m-0">
            <MusicPlayer />
          </TabsContent>
          
          <TabsContent value="motivation" className="m-0">
            <MotivationalQuotes />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default FeelGoodCorner;
