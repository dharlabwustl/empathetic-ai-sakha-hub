import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Lightbulb, Quote, Smile } from 'lucide-react';
import JokesTab from '@/components/dashboard/student/feel-good-corner/JokesTab';
import VideosTab from '@/components/dashboard/student/feel-good-corner/VideosTab';
import TeasersTab from '@/components/dashboard/student/feel-good-corner/TeasersTab';
import DoodleTab from '@/components/dashboard/student/feel-good-corner/DoodleTab';
import ChatTab from '@/components/dashboard/student/feel-good-corner/ChatTab';
import MoodBasedSuggestions from '@/components/dashboard/student/dashboard-sections/MoodBasedSuggestions';

const FeelGoodCornerPage = () => {
  const [activeTab, setActiveTab] = useState("jokes");
  const [dailyQuote] = useState({
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  });

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
          <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
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
        >
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Smile className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg font-medium">Mood Tracker & Suggestions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <MoodBasedSuggestions />
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
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
                  
                  <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-muted-foreground">Sakha Chat feature will be coming soon!</p>
                    <p className="text-sm mt-2">Talk about movies, music, sports, or just have a friendly conversation</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerPage;
