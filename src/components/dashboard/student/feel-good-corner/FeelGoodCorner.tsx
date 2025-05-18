
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MoodType } from '@/types/user/base';
import MotivationalQuotesSection from './MotivationalQuotesSection';
import MoodBoostersSection from './MoodBoostersSection';
import StudyBreakActivitiesSection from './StudyBreakActivitiesSection';
import MoodTracker from '../MoodTracker';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from '@/hooks/use-toast';

const FeelGoodCorner: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('quotes');
  const [currentMood, setCurrentMood] = useState<MoodType>(MoodType.OKAY);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Animation classes for mood transition
  const getMoodAnimationClass = () => {
    if (!showAnimation) return '';
    if (currentMood === MoodType.HAPPY || currentMood === MoodType.MOTIVATED) {
      return 'mood-boost-animation';
    }
    return '';
  };
  
  // Function to update user's mood
  const handleMoodChange = (newMood: MoodType) => {
    setCurrentMood(newMood);
    setShowAnimation(true);
    
    // Reset animation after it completes
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    
    // Show toast notification
    toast({
      title: "Mood updated! 🌈",
      description: `We've noted how you're feeling. Here are some resources to help.`,
    });
  };
  
  // Get appropriate help based on mood
  const getMoodBasedHelp = () => {
    switch (currentMood) {
      case MoodType.HAPPY:
        return "Maintain your positive energy with these activities!";
      case MoodType.STRESSED:
        return "Let's help you manage that stress with some calming techniques.";
      case MoodType.ANXIOUS:
        return "Try these anxiety-reducing activities to help you feel better.";
      case MoodType.TIRED:
        return "Here are some energizing activities for when you're feeling low on energy.";
      default:
        return "How can we help boost your mood today?";
    }
  };

  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a moment for yourself"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className={`space-y-6 ${getMoodAnimationClass()}`}>
        {/* Current mood and mood selector */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              How are you feeling today?
              <Badge variant="outline" className="ml-2">Beta</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Your mood affects your studying. Let's track it to help personalize your experience.
              </p>
              
              <MoodTracker currentMood={currentMood} onMoodChange={handleMoodChange} />
              
              <div className="bg-muted/30 p-4 rounded-md mt-4">
                <h3 className="font-medium mb-2">Personalized recommendation</h3>
                <p className="text-sm">{getMoodBasedHelp()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="quotes">Motivational Quotes</TabsTrigger>
              <TabsTrigger value="boosters">Mood Boosters</TabsTrigger>
              <TabsTrigger value="breaks">Study Breaks</TabsTrigger>
            </TabsList>
            
            <Button variant="ghost" size="sm" className="gap-1">
              <span className="hidden sm:inline">New</span> Random
            </Button>
          </div>
          
          <TabsContent value="quotes" className="mt-0">
            <MotivationalQuotesSection currentMood={currentMood} />
          </TabsContent>
          
          <TabsContent value="boosters" className="mt-0">
            <MoodBoostersSection currentMood={currentMood} />
          </TabsContent>
          
          <TabsContent value="breaks" className="mt-0">
            <StudyBreakActivitiesSection currentMood={currentMood} />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCorner;
