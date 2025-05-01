
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, Music, Pencil, Image, ThumbsUp, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import DoodleBoard from './DoodleBoard';
import MoodMusicPlayer from './MoodMusicPlayer';
import DailyAffirmations from './DailyAffirmations';
import GratitudeJournal from './GratitudeJournal';
import MoodAnalyzer from './MoodAnalyzer';

const FeelGoodCorner: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("doodle");
  const [userParticipation, setUserParticipation] = useState<Record<string, number>>({
    "doodle": 23,
    "music": 15,
    "affirmations": 32,
    "gratitude": 8,
  });
  
  const handleLike = (activity: string) => {
    setUserParticipation(prev => ({
      ...prev,
      [activity]: prev[activity] + 1
    }));
    
    toast({
      title: "Thanks for participating!",
      description: "Your appreciation has been recorded.",
    });
  };
  
  const dailyWinner = "doodle";
  
  return (
    <SharedPageLayout 
      title="Feel Good Corner" 
      subtitle="Take a break, relax your mind, and boost your mood"
      showBackButton
      backButtonUrl="/dashboard/student"
    >
      <div className="mb-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/20 dark:to-blue-900/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center">
                  <Heart className="h-6 w-6 mr-2 text-pink-500" />
                  Feel Good Tools
                </CardTitle>
                <CardDescription>
                  Engage with these activities to improve your mood and productivity
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 flex items-center">
                  <Award className="h-3.5 w-3.5 mr-1" />
                  <span>Daily Winner: {dailyWinner === 'doodle' ? 'Doodle Board' : dailyWinner}</span>
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  <span>78 Active Users</span>
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger value="doodle" className="data-[state=active]:bg-pink-100 dark:data-[state=active]:bg-pink-900/20 rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 px-4 py-2 h-11">
                  <div className="flex items-center">
                    <Pencil className="h-4 w-4 mr-2" />
                    <span>Doodle Board</span>
                    <Badge variant="outline" className="ml-2 bg-pink-50 text-pink-800">{userParticipation.doodle}</Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="music" className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/20 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 px-4 py-2 h-11">
                  <div className="flex items-center">
                    <Music className="h-4 w-4 mr-2" />
                    <span>Mood Music</span>
                    <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-800">{userParticipation.music}</Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="affirmations" className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/20 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 px-4 py-2 h-11">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    <span>Daily Affirmations</span>
                    <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-800">{userParticipation.affirmations}</Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="gratitude" className="data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/20 rounded-none border-b-2 border-transparent data-[state=active]:border-green-500 px-4 py-2 h-11">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    <span>Gratitude Journal</span>
                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-800">{userParticipation.gratitude}</Badge>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="doodle" className="p-0">
                <div className="p-4">
                  <DoodleBoard />
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={() => handleLike('doodle')} className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Like This Activity
                    </Button>
                    <Button onClick={() => setActiveTab('analyzer')}>
                      <Image className="h-4 w-4 mr-2" />
                      Analyze My Doodle
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="music" className="p-4">
                <MoodMusicPlayer onLike={() => handleLike('music')} />
              </TabsContent>
              
              <TabsContent value="affirmations" className="p-4">
                <DailyAffirmations onLike={() => handleLike('affirmations')} />
              </TabsContent>
              
              <TabsContent value="gratitude" className="p-4">
                <GratitudeJournal onLike={() => handleLike('gratitude')} />
              </TabsContent>
              
              <TabsContent value="analyzer" className="p-4">
                <MoodAnalyzer onBack={() => setActiveTab('doodle')} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCorner;
