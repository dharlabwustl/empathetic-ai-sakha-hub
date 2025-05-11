import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Smile, AlertTriangle, Zap, Battery, Sun } from 'lucide-react';
import MoodTimeline from '../mood-tracking/MoodTimeline';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';
import { getCurrentMoodFromLocalStorage, storeMoodInLocalStorage } from '../mood-tracking/moodUtils';
import { VideoList } from './VideoList';
import { MeditationList } from './MeditationList';

interface FeelGoodCornerProps {
  onMoodChange?: (mood: MoodType) => void;
}

const FeelGoodCorner: React.FC<FeelGoodCornerProps> = ({ onMoodChange }) => {
  const [mood, setMood] = useState<MoodType | undefined>(undefined);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('videos');

  useEffect(() => {
    const savedMood = getCurrentMoodFromLocalStorage();
    if (savedMood) {
      setMood(savedMood);
    }
  }, []);

  const handleMoodChange = (newMood: MoodType) => {
    setMood(newMood);
    if (onMoodChange) {
      onMoodChange(newMood);
    }
  };

  const moodOptions = [
    { value: MoodType.HAPPY, label: 'Happy', icon: <Smile className="h-4 w-4" /> },
    { value: MoodType.STRESSED, label: 'Stressed', icon: <AlertTriangle className="h-4 w-4" /> },
    { value: MoodType.MOTIVATED, label: 'Motivated', icon: <Zap className="h-4 w-4" /> },
    { value: MoodType.TIRED, label: 'Tired', icon: <Battery className="h-4 w-4" /> }
  ];

  const moodColorClasses = {
    [MoodType.HAPPY]: "bg-green-100 text-green-800",
    [MoodType.STRESSED]: "bg-red-100 text-red-800",
    [MoodType.MOTIVATED]: "bg-yellow-100 text-yellow-800",
    [MoodType.TIRED]: "bg-orange-100 text-orange-800"
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {moodOptions.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className={`flex-1 ${mood === option.value ? 'bg-blue-50 text-blue-800' : ''}`}
                onClick={() => {
                  handleMoodChange(option.value);
                  storeMoodInLocalStorage(option.value);
                  toast({
                    title: `Mood set to ${option.label}`,
                    description: `We're here to support you.`,
                  });
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Mood Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <MoodTimeline />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relax and Recharge</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="videos" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="meditations">Meditations</TabsTrigger>
            </TabsList>
            <TabsContent value="videos">
              <VideoList />
            </TabsContent>
            <TabsContent value="meditations">
              <MeditationList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeelGoodCorner;
