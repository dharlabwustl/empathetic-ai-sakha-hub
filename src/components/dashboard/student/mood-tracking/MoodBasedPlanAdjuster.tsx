
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen, Target } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { getMoodBasedStudyPlan, getStudyRecommendationForMood } from './moodUtils';

interface MoodBasedPlanAdjusterProps {
  currentMood?: MoodType;
}

const MoodBasedPlanAdjuster: React.FC<MoodBasedPlanAdjusterProps> = ({ currentMood }) => {
  const [studyPlan, setStudyPlan] = useState<Record<string, number>>({});
  const [recommendation, setRecommendation] = useState<string>('');

  useEffect(() => {
    if (currentMood) {
      const newPlan = getMoodBasedStudyPlan(currentMood);
      const newRecommendation = getStudyRecommendationForMood(currentMood);
      
      setStudyPlan(newPlan);
      setRecommendation(newRecommendation);
      
      // Store in localStorage for other components to use
      localStorage.setItem('current_study_plan', JSON.stringify(newPlan));
    }
  }, [currentMood]);

  if (!currentMood || Object.keys(studyPlan).length === 0) {
    return null;
  }

  const totalTime = Object.values(studyPlan).reduce((sum, time) => sum + time, 0);

  const subjects = [
    { name: 'Physics', time: studyPlan.physics, color: 'blue' },
    { name: 'Chemistry', time: studyPlan.chemistry, color: 'green' },
    { name: 'Biology', time: studyPlan.biology, color: 'purple' },
    { name: 'Mathematics', time: studyPlan.mathematics, color: 'orange' }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Mood-Adapted Study Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            {recommendation}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Study Time</span>
            <Badge variant="outline" className="bg-white">
              <Clock className="h-3 w-3 mr-1" />
              {totalTime} mins
            </Badge>
          </div>

          {subjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{subject.name}</span>
                <span className="text-xs text-muted-foreground">{subject.time} mins</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-${subject.color}-500 h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${(subject.time / totalTime) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="h-3 w-3" />
            <span>Plan automatically adjusted based on your current mood</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodBasedPlanAdjuster;
