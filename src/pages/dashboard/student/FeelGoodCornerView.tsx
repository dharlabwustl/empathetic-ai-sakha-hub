
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Coffee, BookOpen, Headphones, Film, Sun } from 'lucide-react';

const FeelGoodCornerView: React.FC = () => {
  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break and recharge your mind"
      showBackButton={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                Self-Care Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start text-left">
                <Coffee className="mr-2 h-4 w-4" /> Quick Mindfulness Break (2 min)
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <Sun className="mr-2 h-4 w-4" /> Guided Breathing Exercise (5 min)
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <Headphones className="mr-2 h-4 w-4" /> Relaxing Study Music
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <Film className="mr-2 h-4 w-4" /> Inspirational Short Video
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <BookOpen className="mr-2 h-4 w-4" /> Quick Study Motivation Tips
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Daily Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-900/30 dark:to-blue-900/30 p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">Success is not final, failure is not fatal: It is the courage to continue that counts.</h3>
                <p className="text-muted-foreground">— Winston Churchill</p>
                
                <div className="mt-8 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Remember that consistent effort over time leads to success. Take breaks when needed, but always return with renewed focus and determination.
                  </p>
                  
                  <Button className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600">
                    Get a New Quote
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Your Progress Streaks</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">7</div>
                    <div className="text-xs text-muted-foreground">Days studying</div>
                  </div>
                  <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">12</div>
                    <div className="text-xs text-muted-foreground">Hours this week</div>
                  </div>
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">85%</div>
                    <div className="text-xs text-muted-foreground">Topics mastered</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerView;
