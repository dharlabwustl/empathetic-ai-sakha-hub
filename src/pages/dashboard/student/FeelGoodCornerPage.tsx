
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Lightbulb, Quote, Smile, HeartHandshake, BookOpen } from 'lucide-react';
import JokesTab from '@/components/dashboard/student/feel-good-corner/JokesTab';
import VideosTab from '@/components/dashboard/student/feel-good-corner/VideosTab';
import TeasersTab from '@/components/dashboard/student/feel-good-corner/TeasersTab';
import DoodleTab from '@/components/dashboard/student/feel-good-corner/DoodleTab';
import ChatTab from '@/components/dashboard/student/feel-good-corner/ChatTab';
import MoodBasedSuggestions from '@/components/dashboard/student/dashboard-sections/MoodBasedSuggestions';
import { MoodType } from '@/types/student/todaysPlan';

// Collection of daily inspirational quotes
const inspirationalQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "The best way to predict your future is to create it.",
    author: "Abraham Lincoln"
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  },
  {
    text: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    author: "Christian D. Larson"
  }
];

// Collection of motivational videos
const motivationalContent = [
  {
    title: "Overcoming Study Fatigue",
    description: "Quick tips to regain your focus and energy during long study sessions",
    icon: "💪",
    linkText: "View Techniques"
  },
  {
    title: "Mindfulness Meditation",
    description: "5-minute meditation to clear your mind and reduce exam anxiety",
    icon: "🧘‍♂️",
    linkText: "Start Meditation"
  },
  {
    title: "Success Stories",
    description: "Hear from students who overcame challenges to achieve their goals",
    icon: "🏆",
    linkText: "Watch Stories"
  },
  {
    title: "Study Motivation",
    description: "Quick motivation boost to keep you going when things get tough",
    icon: "🚀",
    linkText: "Get Motivated"
  },
  {
    title: "Stress Management",
    description: "Effective techniques to manage stress during exam preparation",
    icon: "😌",
    linkText: "Learn Techniques"
  }
];

const FeelGoodCornerPage = () => {
  const [activeTab, setActiveTab] = useState("jokes");
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [dailyQuote, setDailyQuote] = useState(inspirationalQuotes[0]);
  const [moodHistory, setMoodHistory] = useState<{date: string, mood: MoodType}[]>([]);

  // Load mood from local storage or set a default
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
    }

    // Set a random daily quote based on date
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const quoteIndex = dayOfYear % inspirationalQuotes.length;
    setDailyQuote(inspirationalQuotes[quoteIndex]);

    // Mock mood history
    setMoodHistory([
      {date: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], mood: 'focused'},
      {date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], mood: 'tired'},
      {date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], mood: 'happy'},
      {date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], mood: 'stressed'},
      {date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], mood: 'anxious'},
      {date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], mood: 'motivated'},
    ]);
  }, []);

  const handleMoodChange = (mood: MoodType) => {
    setCurrentMood(mood);
    // Save to local storage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({mood}));
    }

    // Update mood history
    const today = new Date().toISOString().split('T')[0];
    setMoodHistory(prev => {
      const filtered = prev.filter(entry => entry.date !== today);
      return [...filtered, {date: today, mood}];
    });
  };

  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break, recharge, and boost your mood"
    >
      <div className="space-y-6">
        {/* Daily Inspiration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 shadow-md overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Quote className="h-5 w-5 text-violet-500" />
                <CardTitle className="text-lg font-medium">Today's Inspiration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-violet-200 pl-4 italic">
                "{dailyQuote.text}"
                <footer className="mt-2 text-sm text-muted-foreground">
                  — {dailyQuote.author}
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mood Based Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Current Mood Card */}
          <Card className="md:col-span-1 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Smile className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg font-medium">Your Mood</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["happy", "focused", "motivated", "tired", "stressed", "anxious", "okay"].map((mood) => (
                    <Badge 
                      key={mood}
                      variant={currentMood === mood ? "default" : "outline"}
                      className={`cursor-pointer px-3 py-1 ${currentMood === mood ? "bg-blue-500" : "hover:bg-blue-100"}`}
                      onClick={() => handleMoodChange(mood as MoodType)}
                    >
                      {getMoodEmoji(mood as MoodType)} {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </Badge>
                  ))}
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Your Mood History:</h4>
                  <div className="flex justify-between">
                    {moodHistory.slice(-7).map((entry, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <span title={entry.mood} className="text-lg">
                          {getMoodEmoji(entry.mood)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(entry.date)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood Based Suggestions */}
          <Card className="md:col-span-2 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-rose-500" />
                <CardTitle className="text-lg font-medium">Mood-Based Suggestions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <MoodBasedSuggestions currentMood={currentMood} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivational Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-lg font-medium">Motivational Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {motivationalContent.map((content, index) => (
                  <Card key={index} className="bg-amber-50/50 hover:bg-amber-50 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-4xl mb-2">{content.icon}</div>
                      <h3 className="text-base font-semibold mb-1">{content.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{content.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        {content.linkText}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-md">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-5 gap-2">
                <TabsTrigger value="jokes">Jokes</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="teasers">Brain Teasers</TabsTrigger>
                <TabsTrigger value="doodle">Doodle</TabsTrigger>
                <TabsTrigger value="sakha">Sakha Chat</TabsTrigger>
              </TabsList>
              
              <TabsContent value="jokes" className="space-y-4">
                <JokesTab />
              </TabsContent>
              
              <TabsContent value="videos" className="space-y-4">
                <VideosTab />
              </TabsContent>
              
              <TabsContent value="teasers" className="space-y-4">
                <TeasersTab />
              </TabsContent>
              
              <TabsContent value="doodle" className="space-y-4">
                <DoodleTab />
              </TabsContent>
              
              <TabsContent value="sakha" className="space-y-4">
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Sakha Chill Mode Chat</h3>
                    <p className="text-muted-foreground">
                      Chat with your AI friend Sakha in chill mode to discuss anything non-academic.
                    </p>
                  </div>
                  
                  <ChatTab />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

// Helper function to get emoji for mood
const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case 'happy': return '😊';
    case 'focused': return '🧠';
    case 'motivated': return '💪';
    case 'tired': return '😴';
    case 'stressed': return '😰';
    case 'anxious': return '😟';
    case 'okay': return '😐';
    default: return '❓';
  }
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.getDate().toString();
};

export default FeelGoodCornerPage;
