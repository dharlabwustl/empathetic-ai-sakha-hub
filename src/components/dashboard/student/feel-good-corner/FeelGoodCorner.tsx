
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HeartPulse } from 'lucide-react';
import BreathingExercises from './BreathingExercises';
import MindfulnessTab from './MindfulnessTab';
import VideosTab from './VideosTab';
import QuotesTab from './QuotesTab';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MoodType } from '@/types/user/base';
import { MoodSelectionDialog } from '../mood-tracking/MoodSelectionDialog';
import { useToast } from '@/hooks/use-toast';

const FeelGoodCorner = () => {
  const [activeTab, setActiveTab] = useState('breathing');
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>();
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load current mood from localStorage
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const data = JSON.parse(userData);
        if (data.mood) {
          setCurrentMood(data.mood as MoodType);
        }
      }
    } catch (error) {
      console.error("Error loading user mood:", error);
    }
    
    // If user came here when stressed, offer to change mood after exercises
    const params = new URLSearchParams(window.location.search);
    if (params.get('mood') === 'stressed') {
      setTimeout(() => {
        setShowMoodDialog(true);
      }, 15000); // Wait 15 seconds before suggesting mood change
    }
  }, []);

  const handleMoodChange = (newMood: MoodType) => {
    setCurrentMood(newMood);
    
    // Save to localStorage
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const data = JSON.parse(userData);
        data.mood = newMood;
        localStorage.setItem('userData', JSON.stringify(data));
      } else {
        localStorage.setItem('userData', JSON.stringify({ mood: newMood }));
      }
    } catch (error) {
      console.error("Error saving mood:", error);
    }
    
    // Show toast confirmation
    toast({
      title: "Mood Updated",
      description: `Your mood has been set to ${newMood.toLowerCase()}.`,
    });
    
    // Close dialog
    setShowMoodDialog(false);
    
    // Trigger custom event for other components to react to
    const moodChangeEvent = new CustomEvent('mood-changed', { 
      detail: { mood: newMood, timestamp: new Date().toISOString() } 
    });
    document.dispatchEvent(moodChangeEvent);
  };

  const handleGoBack = () => {
    navigate('/dashboard/student');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={handleGoBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-pink-500" />
            Feel Good Corner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to your personal space for relaxation and mental wellness. 
            These activities can help reduce stress and improve your focus for studying.
          </p>
          
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium">Currently feeling: </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowMoodDialog(true)}
            >
              {currentMood || "Not set"} 
              <span className="ml-2">Change</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="breathing" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="breathing">Breathing</TabsTrigger>
          <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breathing">
          <BreathingExercises />
        </TabsContent>
        
        <TabsContent value="mindfulness">
          <MindfulnessTab />
        </TabsContent>
        
        <TabsContent value="videos">
          <VideosTab />
        </TabsContent>
        
        <TabsContent value="quotes">
          <QuotesTab mood={currentMood} />
        </TabsContent>
      </Tabs>
      
      <MoodSelectionDialog
        isOpen={showMoodDialog}
        onClose={() => setShowMoodDialog(false)}
        selectedMood={currentMood}
        onSelectMood={handleMoodChange}
      />
    </div>
  );
};

export default FeelGoodCorner;
