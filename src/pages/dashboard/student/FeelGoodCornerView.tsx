
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import DailyAffirmations from '@/components/dashboard/student/feel-good-corner/DailyAffirmations';
import ChatTab from '@/components/dashboard/student/feel-good-corner/ChatTab';
import DailyTeasers from '@/components/dashboard/student/feel-good-corner/DailyTeasers';
import GratitudeJournal from '@/components/dashboard/student/feel-good-corner/GratitudeJournal';
import DoodleTab from '@/components/dashboard/student/feel-good-corner/DoodleTab';
import MoodMusicPlayer from '@/components/dashboard/student/feel-good-corner/MoodMusicPlayer';
import JokesTab from '@/components/dashboard/student/feel-good-corner/JokesTab';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Pencil, Heart, Smile, MessageSquare, Image } from 'lucide-react';

const FeelGoodCornerView = () => {
  const [activeTab, setActiveTab] = useState("affirmations");
  const { toast } = useToast();
  
  const handleLikeActivity = () => {
    toast({
      title: "Thank you!",
      description: "We're glad you enjoyed this activity.",
    });
  };
  
  const placeholderContent = (title: string) => (
    <Card className="bg-white">
      <CardContent className="p-6 text-center space-y-4">
        <h3 className="text-xl font-medium">Coming Soon: {title}</h3>
        <p className="text-muted-foreground">This feature will be available soon. Check back later!</p>
        <Button onClick={() => toast({ title: `${title} Activity`, description: "We'll notify you when this activity is ready." })}>
          Get Notified
        </Button>
      </CardContent>
    </Card>
  );
  
  // Daily winner for teasers 
  const dailyWinner = {
    name: "Ananya Sharma",
    avatar: "/avatars/01.png", 
    content: "Physics Teaser"
  };

  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break and boost your mood"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Welcome to the Feel Good Corner! This is your personal space to take a break from 
          studying and engage in activities that will help you relax, recharge, and maintain 
          a positive mindset. Try out different activities to see what works best for you.
        </p>
        
        <Tabs 
          defaultValue="affirmations" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            <TabsTrigger value="affirmations" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Affirmations</span>
            </TabsTrigger>
            <TabsTrigger value="chill-chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chill Chat</span>
            </TabsTrigger>
            <TabsTrigger value="teasers" className="flex items-center gap-2">
              <Smile className="h-4 w-4" />
              <span className="hidden sm:inline">Brain Teasers</span>
            </TabsTrigger>
            <TabsTrigger value="gratitude" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Gratitude</span>
            </TabsTrigger>
            <TabsTrigger value="doodling" className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              <span className="hidden sm:inline">Doodling</span>
            </TabsTrigger>
            <TabsTrigger value="mood-music" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span className="hidden sm:inline">Mood Music</span>
            </TabsTrigger>
            <TabsTrigger value="jokes" className="flex items-center gap-2">
              <Smile className="h-4 w-4" />
              <span className="hidden sm:inline">Jokes</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="affirmations" className="space-y-4 pt-2">
            <DailyAffirmations onLike={handleLikeActivity} />
          </TabsContent>
          
          <TabsContent value="chill-chat" className="space-y-4 pt-2">
            <ChatTab initialMessages={[
              { text: "Hi there! I'm Sakha in chill mode. How can I brighten your day?", isUser: false }
            ]} />
          </TabsContent>
          
          <TabsContent value="teasers" className="space-y-4 pt-2">
            <DailyTeasers onLike={handleLikeActivity} dailyWinner={dailyWinner} />
          </TabsContent>
          
          <TabsContent value="gratitude" className="space-y-4 pt-2">
            <GratitudeJournal onLike={handleLikeActivity} />
          </TabsContent>
          
          <TabsContent value="doodling" className="space-y-4 pt-2">
            <DoodleTab />
          </TabsContent>
          
          <TabsContent value="mood-music" className="space-y-4 pt-2">
            <MoodMusicPlayer onLike={handleLikeActivity} />
          </TabsContent>
          
          <TabsContent value="jokes" className="space-y-4 pt-2">
            <JokesTab />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerView;
