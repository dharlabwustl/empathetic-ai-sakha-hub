
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, Lightbulb, Music } from "lucide-react";
import MoodSelection from './MoodSelection';
import ActivitiesTab from './ActivitiesTab';
import QuotesTab from './QuotesTab';
import ChatTab from './ChatTab';

const FeelGoodCorner: React.FC = () => {
  const [currentMood, setCurrentMood] = useState('okay');
  
  const moods = [
    { value: 'happy', label: '😊 Happy' },
    { value: 'okay', label: '😐 Okay' },
    { value: 'tired', label: '😴 Tired' },
    { value: 'stressed', label: '😰 Stressed' },
    { value: 'sad', label: '😢 Sad' },
    { value: 'motivated', label: '💪 Motivated' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            Feel Good Corner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MoodSelection 
            moods={moods}
            currentMood={currentMood}
            onMoodChange={setCurrentMood}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="quotes" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Quotes
          </TabsTrigger>
          <TabsTrigger value="music" className="flex items-center gap-2">
            <Music className="w-4 h-4" />
            Music
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <ActivitiesTab mood={currentMood} />
        </TabsContent>

        <TabsContent value="quotes">
          <QuotesTab />
        </TabsContent>

        <TabsContent value="music">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500">Music recommendations coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <ChatTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeelGoodCorner;
