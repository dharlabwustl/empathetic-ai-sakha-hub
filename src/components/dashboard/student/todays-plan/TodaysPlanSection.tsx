
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Brain } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface TodaysPlanSectionProps {
  studyPlan: any; // Replace with proper type
  currentMood?: MoodType;
}

const getMoodBasedPlan = (mood: MoodType | undefined, defaultPlan: any) => {
  if (!mood) return defaultPlan;

  switch (mood) {
    case 'happy':
      return {
        ...defaultPlan,
        concepts: [...defaultPlan.concepts, { title: 'Bonus: Advanced Topic', difficulty: 'hard' }]
      };
    case 'focused':
      return {
        ...defaultPlan,
        targetProgress: defaultPlan.targetProgress * 1.1
      };
    case 'tired':
      return {
        ...defaultPlan,
        concepts: defaultPlan.concepts.filter((c: any) => c.difficulty !== 'hard'),
        focusOn: 'flashcards'
      };
    case 'anxious':
      return {
        ...defaultPlan,
        concepts: defaultPlan.concepts.filter((c: any) => c.difficulty === 'easy').slice(0, 1)
      };
    case 'stressed':
      return {
        ...defaultPlan,
        focusOn: 'quick-revision',
        timeLimit: 15
      };
    default:
      return defaultPlan;
  }
};

export default function TodaysPlanSection({ studyPlan, currentMood }: TodaysPlanSectionProps) {
  const adaptedPlan = getMoodBasedPlan(currentMood, studyPlan);

  return (
    <Card className="h-full border-t-4 border-t-violet-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-violet-600" />
          Today's Focus
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan content based on mood */}
        <div className="space-y-4">
          {/* Mood-specific message */}
          {currentMood && (
            <div className={`p-3 rounded-lg ${
              currentMood === 'happy' ? 'bg-green-50' :
              currentMood === 'focused' ? 'bg-blue-50' :
              currentMood === 'tired' ? 'bg-amber-50' :
              currentMood === 'anxious' ? 'bg-purple-50' :
              'bg-red-50'
            }`}>
              <p className="text-sm">
                {getMoodBasedPlan(currentMood, {}).message || 
                 "Your plan has been adjusted based on your current mood."}
              </p>
            </div>
          )}

          {/* Tasks list */}
          <div className="space-y-3">
            {adaptedPlan.concepts.map((concept: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{concept.title}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {concept.difficulty}
                </Badge>
              </div>
            ))}
          </div>

          {/* Time allocation */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Estimated time:</span>
            </div>
            <span>{adaptedPlan.timeLimit || 30} minutes</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button size="sm" className="flex-1">
            <Check className="h-4 w-4 mr-1" />
            Start Now
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Customize Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
