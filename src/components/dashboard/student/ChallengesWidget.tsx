import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DailyChallenges from '@/components/shared/DailyChallenges';
import { Award, ArrowRight, TrendingUp, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

interface ChallengesWidgetProps {
  className?: string;
}

const ChallengesWidget: React.FC<ChallengesWidgetProps> = ({ className }) => {
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  
  const userStats = {
    completedChallenges: 12,
    currentStreak: 5,
    longestStreak: 14,
    totalPoints: 850
  };
  
  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg">Challenges & Streaks</CardTitle>
            </div>
            <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="flex items-center gap-1"
              >
                <Flame className="h-3.5 w-3.5 text-amber-600 mr-1" />
                {userStats.currentStreak} day streak
              </motion.div>
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          <div className="flex justify-between mb-4 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Completed</p>
              <p className="text-xl font-semibold">{userStats.completedChallenges}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Longest Streak</p>
              <p className="text-xl font-semibold">{userStats.longestStreak} days</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Points</p>
              <p className="text-xl font-semibold flex items-center justify-center">
                {userStats.totalPoints} XP
                <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
              </p>
            </div>
          </div>
          
          <DailyChallenges variant="compact" maxItems={1} />
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button 
            variant="link" 
            className="flex items-center gap-1 w-full justify-center"
            onClick={() => setShowAllChallenges(true)}
          >
            View All Challenges
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      {/* Full Challenges Dialog */}
      <Dialog open={showAllChallenges} onOpenChange={setShowAllChallenges}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Daily & Weekly Challenges</DialogTitle>
            <DialogDescription>
              Complete challenges to earn points and build consistent study habits
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {/* User stats section */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-semibold text-blue-600">{userStats.currentStreak} days</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Longest Streak</p>
                  <p className="text-2xl font-semibold text-purple-600">{userStats.longestStreak} days</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-semibold text-amber-600">{userStats.completedChallenges}</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total XP</p>
                  <p className="text-2xl font-semibold text-green-600">{userStats.totalPoints} XP</p>
                </div>
              </Card>
            </div>
            
            {/* All challenges */}
            <DailyChallenges variant="full" maxItems={6} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChallengesWidget;
