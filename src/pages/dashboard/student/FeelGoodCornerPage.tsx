
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Smile, 
  Music, 
  Coffee, 
  Flower, 
  Sun, 
  Star,
  Zap,
  Sparkles,
  Rainbow
} from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const FeelGoodCornerPage = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');

  const motivationalQuotes = [
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "motivation"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "passion"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
      category: "confidence"
    }
  ];

  const activities = [
    {
      title: "Quick Meditation",
      description: "5-minute guided breathing exercise",
      icon: Flower,
      duration: "5 min",
      type: "relaxation"
    },
    {
      title: "Energizing Music",
      description: "Upbeat playlist to boost your mood",
      icon: Music,
      duration: "15 min",
      type: "energy"
    },
    {
      title: "Positive Affirmations",
      description: "Daily affirmations for confidence",
      icon: Star,
      duration: "3 min",
      type: "mindset"
    },
    {
      title: "Study Break Games",
      description: "Fun mini-games for mental refresh",
      icon: Zap,
      duration: "10 min",
      type: "fun"
    }
  ];

  const moodOptions = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-100 text-yellow-800" },
    { emoji: "😔", label: "Sad", color: "bg-blue-100 text-blue-800" },
    { emoji: "😰", label: "Stressed", color: "bg-red-100 text-red-800" },
    { emoji: "😴", label: "Tired", color: "bg-gray-100 text-gray-800" },
    { emoji: "🤔", label: "Confused", color: "bg-purple-100 text-purple-800" },
    { emoji: "💪", label: "Motivated", color: "bg-green-100 text-green-800" }
  ];

  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a moment to recharge and boost your mood"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Mood Tracker */}
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              How are you feeling today?
            </CardTitle>
            <CardDescription>
              Track your mood and get personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {moodOptions.map((mood) => (
                <Button
                  key={mood.label}
                  variant={selectedMood === mood.label ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => setSelectedMood(mood.label)}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </Button>
              ))}
            </div>
            {selectedMood && (
              <div className="mt-4 p-3 bg-white rounded-lg border">
                <p className="text-sm text-gray-600">
                  Thanks for sharing! Based on your mood, we've prepared some activities that might help.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activities">Feel Good Activities</TabsTrigger>
            <TabsTrigger value="quotes">Daily Inspiration</TabsTrigger>
            <TabsTrigger value="achievements">Celebrate Wins</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                          <activity.icon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{activity.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {activity.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">{activity.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full">Start Activity</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4">
            <div className="space-y-4">
              {motivationalQuotes.map((quote, index) => (
                <Card key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Sparkles className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                      <div>
                        <blockquote className="text-lg font-medium text-gray-800 mb-2">
                          "{quote.text}"
                        </blockquote>
                        <cite className="text-sm text-gray-600">— {quote.author}</cite>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rainbow className="h-5 w-5 text-purple-600" />
                  Your Recent Achievements
                </CardTitle>
                <CardDescription>
                  Celebrate your progress and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Star className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Completed 5 concept cards today!</p>
                      <p className="text-sm text-gray-600">Great job staying consistent</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Zap className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">7-day study streak!</p>
                      <p className="text-sm text-gray-600">You're building great habits</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Heart className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Improved Physics score by 15%</p>
                      <p className="text-sm text-gray-600">Hard work is paying off!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerPage;
