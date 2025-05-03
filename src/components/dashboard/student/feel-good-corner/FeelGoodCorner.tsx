
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Smile, Music, Coffee, Youtube } from 'lucide-react';

const FeelGoodCorner = () => {
  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break and recharge your mind"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
    >
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/40 rounded-xl">
          <h2 className="text-xl font-bold mb-2">Welcome to your Feel Good Corner!</h2>
          <p className="text-muted-foreground">
            This is your personal space to relax, recharge, and take care of your mental wellbeing.
            Take a moment to unwind with these mood-boosting activities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 dark:bg-green-800/30 p-2 rounded-full">
                  <Music className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold">Relaxing Music</h3>
              </div>
              <p className="text-muted-foreground mb-4">Listen to calming, focus-enhancing music to help you relax or study better.</p>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600">Open Music Player</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-violet-100 dark:bg-violet-800/30 p-2 rounded-full">
                  <Smile className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold">Quick Meditation</h3>
              </div>
              <p className="text-muted-foreground mb-4">Take 5 minutes to clear your mind with a guided meditation exercise.</p>
              <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600">Start Meditation</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-100 dark:bg-amber-800/30 p-2 rounded-full">
                  <Coffee className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold">Study Break Timer</h3>
              </div>
              <p className="text-muted-foreground mb-4">Set a timer for your study sessions and breaks to maintain productivity.</p>
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600">Set Timer</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 dark:bg-red-800/30 p-2 rounded-full">
                  <Youtube className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold">Motivational Videos</h3>
              </div>
              <p className="text-muted-foreground mb-4">Watch short, inspiring videos to boost your motivation and focus.</p>
              <Button className="w-full bg-gradient-to-r from-red-500 to-rose-600">Watch Now</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-800/30 p-2 rounded-full">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Talk to Sakha</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Feeling stressed or overwhelmed? Talk to our AI companion Sakha about how you're feeling.
              She can provide supportive advice tailored to your needs.
            </p>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600">Chat with Sakha</Button>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCorner;
