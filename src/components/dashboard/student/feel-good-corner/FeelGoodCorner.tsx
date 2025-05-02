import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, Share, Award, MessageSquare, PenTool, Smile, Coffee } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserProfileBase } from '@/types/user/base';

// Existing components
import DoodlingBoard from './DoodlingBoard';
import QuoteOfTheDay from './QuoteOfTheDay';
import BreathingExercise from './BreathingExercise';
import StressReliefTips from './StressReliefTips';
import MotivationalVideos from './MotivationalVideos';

// New components
import JokesTab from './JokesTab';
import DailyTeasersTab from './DailyTeasersTab';
import ChillChatTab from './ChillChatTab';

interface FeelGoodCornerProps {
  userProfile?: UserProfileBase;
}

const FeelGoodCorner: React.FC<FeelGoodCornerProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('quotes');

  const dailyWinners = {
    doodling: {
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=23',
      title: 'Cosmic Dreams',
      description: 'An artistic expression of space and time',
    },
    teaser: {
      name: 'Rahul Kapoor',
      avatar: 'https://i.pravatar.cc/150?img=32',
      title: 'Math Puzzle Master',
      description: 'Solved today\'s teaser in record time!',
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Feel Good Corner</CardTitle>
          <CardDescription>
            Take a break and recharge your mind with these fun activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-9 gap-1">
              <TabsTrigger value="quotes" className="text-xs md:text-sm">Quotes</TabsTrigger>
              <TabsTrigger value="doodle" className="text-xs md:text-sm">Doodling</TabsTrigger>
              <TabsTrigger value="breathing" className="text-xs md:text-sm">Breathing</TabsTrigger>
              <TabsTrigger value="stress" className="text-xs md:text-sm">Stress Relief</TabsTrigger>
              <TabsTrigger value="videos" className="text-xs md:text-sm">Videos</TabsTrigger>
              <TabsTrigger value="teasers" className="text-xs md:text-sm">Daily Teasers</TabsTrigger>
              <TabsTrigger value="jokes" className="text-xs md:text-sm">Jokes</TabsTrigger>
              <TabsTrigger value="chill" className="text-xs md:text-sm">Chill Chat</TabsTrigger>
              <TabsTrigger value="winners" className="text-xs md:text-sm">Winners</TabsTrigger>
            </TabsList>

            <TabsContent value="quotes">
              <QuoteOfTheDay />
            </TabsContent>

            <TabsContent value="doodle">
              <div className="mb-4 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-sm">Today's Doodling Winner: {dailyWinners.doodling.name}</p>
                    <p className="text-xs text-muted-foreground">{dailyWinners.doodling.title} - {dailyWinners.doodling.description}</p>
                  </div>
                </div>
              </div>
              <DoodlingBoard />
            </TabsContent>

            <TabsContent value="breathing">
              <BreathingExercise />
            </TabsContent>

            <TabsContent value="stress">
              <StressReliefTips />
            </TabsContent>

            <TabsContent value="videos">
              <MotivationalVideos />
            </TabsContent>

            <TabsContent value="teasers">
              <DailyTeasersTab winner={dailyWinners.teaser} />
            </TabsContent>

            <TabsContent value="jokes">
              <JokesTab userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="chill">
              <ChillChatTab userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="winners">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Daily Recognition</h3>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-amber-200">
                        <AvatarImage src={dailyWinners.doodling.avatar} />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{dailyWinners.doodling.name}</h4>
                          <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">Doodling Winner</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{dailyWinners.doodling.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm">{dailyWinners.doodling.description}</p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-blue-200">
                        <AvatarImage src={dailyWinners.teaser.avatar} />
                        <AvatarFallback>RK</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">{dailyWinners.teaser.name}</h4>
                          <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Teaser Winner</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{dailyWinners.teaser.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm">{dailyWinners.teaser.description}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeelGoodCorner;
