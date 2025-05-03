
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, Brain, Heart, Music, Coffee, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FeelGoodCorner = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Feel Good Corner</h1>
        <p className="text-muted-foreground">Take a break and recharge your mind</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>Mental Wellbeing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Quick Mindfulness Exercise</h3>
                <p className="text-sm text-muted-foreground mb-4">Take 3 minutes to clear your mind</p>
                <Button variant="outline" className="w-full">Start Exercise</Button>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Positive Affirmations</h3>
                <p className="text-sm text-muted-foreground mb-4">Boost your confidence with positive thoughts</p>
                <Button variant="outline" className="w-full">View Affirmations</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span>Motivation Boost</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Success Stories</h3>
                <p className="text-sm text-muted-foreground mb-4">Read about NEET success journeys</p>
                <Button variant="outline" className="w-full">Read Stories</Button>
              </div>
              
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Motivational Quotes</h3>
                <p className="text-sm text-muted-foreground mb-4">Daily inspiration to keep you going</p>
                <Button variant="outline" className="w-full">View Quotes</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                  <Music className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-medium">Study Music</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Curated playlists to enhance your focus</p>
              <Button variant="secondary" className="w-full">Browse Playlists</Button>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <Coffee className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-medium">Quick Breaks</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">5-minute activities to refresh your mind</p>
              <Button variant="secondary" className="w-full">Try Activity</Button>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-full">
                  <Smile className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="font-medium">Mood Tracker</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Track your mood and get personalized tips</p>
              <Button variant="secondary" className="w-full">Check In Now</Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      <section>
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Need personalized help?</h3>
                <p className="text-muted-foreground">Our AI tutor is available 24/7 to assist with your study needs</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white" size="lg">
                Talk to AI Tutor <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FeelGoodCorner;
