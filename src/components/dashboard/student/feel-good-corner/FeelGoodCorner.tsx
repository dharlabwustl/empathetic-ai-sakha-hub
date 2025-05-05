import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import { Confetti } from "@/components/ui/confetti"
import { MoodType } from '@/types/user/base';
import { getMoodEmoji } from '@/components/dashboard/student/mood-tracking/moodUtils';
import VideosTab from './VideosTab';
import JokesTab from './JokesTab';
import AffirmationsTab from './AffirmationsTab';

const FeelGoodCorner: React.FC = () => {
  const { toast } = useToast()
  const [showConfetti, setShowConfetti] = React.useState(false)
  const [mood, setMood] = useState<MoodType>(MoodType.Okay);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false)
      }, 4000)
    }
  }, [showConfetti])

  const handleMoodChange = (newMood: MoodType) => {
    setMood(newMood);
    toast({
      title: "Mood Updated",
      description: `You are feeling ${newMood}`,
    })
  };

  const moods = [
    { label: MoodType.Happy, value: MoodType.Happy },
    { label: MoodType.Stressed, value: MoodType.Stressed },
    { label: MoodType.Motivated, value: MoodType.Motivated },
    { label: MoodType.Tired, value: MoodType.Tired }
  ];

  return (
    <Card className="w-full">
      <Confetti isVisible={showConfetti} />
      <CardHeader>
        <CardTitle>Feel Good Corner {getMoodEmoji(mood)}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="videos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="jokes">Jokes</TabsTrigger>
            <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
          </TabsList>
          <TabsContent value="videos">
            <VideosTab />
          </TabsContent>
          <TabsContent value="jokes">
            <JokesTab />
          </TabsContent>
          <TabsContent value="affirmations">
            <AffirmationsTab />
          </TabsContent>
        </Tabs>
        <div className="flex justify-center mt-4">
          <Button onClick={() => setShowConfetti(true)}>Boost My Mood</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeelGoodCorner;
