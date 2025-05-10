
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UpcomingActivity from "../widgets/UpcomingActivity";
import { MoodType } from "@/types/user/base";

interface Activity {
  id: string;
  title: string;
  duration: string;
  type: "reading" | "practice" | "review" | "quiz";
  progress?: number;
  link?: string;
}

// Get personalized recommendations based on mood
const getRecommendationsForMood = (mood?: MoodType): Activity[] => {
  const defaultActivities = [
    { id: '1', title: 'Read Chapter 3: Kinematics', duration: '20 min', type: 'reading' as const },
    { id: '2', title: 'Practice Equations Quiz', duration: '15 min', type: 'practice' as const },
    { id: '3', title: 'Review Flashcards: Chemical Bonding', duration: '10 min', type: 'review' as const }
  ];

  if (!mood) return defaultActivities;

  switch (mood) {
    case MoodType.Tired:
      return [
        { id: '1', title: 'Quick Review: Key Concepts', duration: '10 min', type: 'review' as const },
        { id: '2', title: 'Interactive Exercise: Visual Learning', duration: '15 min', type: 'practice' as const }
      ];
    case MoodType.Stressed:
      return [
        { id: '1', title: 'Guided Relaxation & Focus', duration: '5 min', type: 'practice' as const },
        { id: '2', title: 'Simple Practice Quiz', duration: '10 min', type: 'quiz' as const }
      ];
    case MoodType.Happy:
    case MoodType.Focused:
      return [
        { id: '1', title: 'Advanced Problem Set: Calculus', duration: '30 min', type: 'practice' as const },
        { id: '2', title: 'Detailed Chapter Reading', duration: '25 min', type: 'reading' as const }
      ];
    case MoodType.Motivated:
      return [
        { id: '1', title: 'Complete Mock Test', duration: '45 min', type: 'quiz' as const },
        { id: '2', title: 'Advanced Problems: Physics', duration: '30 min', type: 'practice' as const }
      ];
    default:
      return defaultActivities;
  }
};

interface TodaysPlanSectionProps {
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ currentMood }) => {
  const dailyProgress = 42;
  const activities = getRecommendationsForMood(currentMood);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>Today's Study Plan</CardTitle>
        <CardDescription>
          Your personalized study schedule for today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="font-medium">Daily Progress</span>
                <span className="ml-auto text-xs text-muted-foreground">{dailyProgress}%</span>
              </div>
              <Progress value={dailyProgress} />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-base">Recommended Next Steps</h3>
              <Button variant="ghost" className="h-8 text-xs px-2">View Full Plan</Button>
            </div>
            
            {activities.map(activity => (
              <UpcomingActivity 
                key={activity.id}
                title={activity.title}
                duration={activity.duration}
                type={activity.type}
                link={activity.link}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
