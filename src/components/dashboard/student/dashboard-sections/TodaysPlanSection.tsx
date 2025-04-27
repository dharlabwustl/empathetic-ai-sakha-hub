
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, BookOpen, Calendar, Check, Clock, AlertCircle, BookCheck } from 'lucide-react';
import { MoodType } from '@/types/student/todaysPlan';
import { cn } from '@/lib/utils';

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
        concepts: [...defaultPlan.todaysFocus.concepts, "Bonus: Advanced Topic"],
        message: "You're in a great mood! Added a bonus advanced topic to challenge you.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 1.1
      };
    case 'focused':
      return {
        ...defaultPlan,
        message: "You're focused today! Fast-track mode activated with additional flashcards.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 1.1
      };
    case 'tired':
      return {
        ...defaultPlan,
        concepts: defaultPlan.todaysFocus.concepts.slice(0, 2),
        message: "Taking it easy today. Simplified plan with just the essential concepts.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 0.7
      };
    case 'stressed':
      return {
        ...defaultPlan,
        concepts: defaultPlan.todaysFocus.concepts.slice(0, 1),
        message: "Stress-relief mode: Just 1 simple concept and quick flashcards today.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 0.5
      };
    case 'anxious':
      return {
        ...defaultPlan,
        concepts: defaultPlan.todaysFocus.concepts.slice(0, 1),
        message: "Anxiety management mode: Focusing on simple topics to build confidence.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 0.6
      };
    default:
      return {
        ...defaultPlan,
        message: "Your plan has been adjusted based on your current mood."
      };
  }
};

export default function TodaysPlanSection({ studyPlan, currentMood }: TodaysPlanSectionProps) {
  const adaptedPlan = getMoodBasedPlan(currentMood, studyPlan);

  return (
    <Card className="h-full border-t-4 border-t-violet-500">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-violet-600" />
          Today's Study Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Today's Focus:</span>
            <Badge variant="outline" className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
              {studyPlan.todaysFocus.subject}
            </Badge>
          </div>
          
          {/* Mood-based message */}
          {currentMood && adaptedPlan.message && (
            <div className={`p-3 rounded-lg ${
              currentMood === 'happy' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              currentMood === 'focused' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              currentMood === 'tired' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
              currentMood === 'stressed' ? 'bg-red-50 text-red-700 border border-red-200' :
              currentMood === 'anxious' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
              'bg-purple-50 text-purple-700 border border-purple-200'
            } mb-3`}>
              <p className="text-sm">{adaptedPlan.message}</p>
            </div>
          )}
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 space-y-3">
            <div>
              <p className="text-sm font-medium mb-1 flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-blue-500" /> 
                Concepts
              </p>
              <div className="flex flex-wrap gap-1">
                {(adaptedPlan.concepts || studyPlan.todaysFocus.concepts).map((concept: string, i: number) => (
                  <Link to={`/dashboard/student/concepts/${encodeURIComponent(concept.toLowerCase().replace(/\s+/g, '-'))}`} key={i}>
                    <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700 hover:bg-blue-100 transition-colors cursor-pointer">
                      {concept}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-amber-500" />
                <p className="text-sm font-medium">Flashcards:</p>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700">
                {currentMood === 'focused' ? studyPlan.todaysFocus.flashcardsCount + 5 : 
                 (currentMood === 'tired' || currentMood === 'stressed' || currentMood === 'anxious') ? Math.max(5, Math.floor(studyPlan.todaysFocus.flashcardsCount / 2)) : 
                 studyPlan.todaysFocus.flashcardsCount}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-1 text-purple-500" />
                <p className="text-sm font-medium">Practice Exam:</p>
              </div>
              <Badge variant="outline" className={`${
                (currentMood === 'tired' || currentMood === 'stressed' || currentMood === 'anxious') ? 
                "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700" :
                studyPlan.todaysFocus.hasPracticeExam ? 
                "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700" :
                "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
              }`}>
                {(currentMood === 'tired' || currentMood === 'stressed' || currentMood === 'anxious') ? 
                "Optional" : studyPlan.todaysFocus.hasPracticeExam ? "Yes" : "No"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-indigo-500" />
                <p className="text-sm font-medium">Estimated Time:</p>
              </div>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-700">
                {currentMood ? 
                  `${Math.floor(adaptedPlan.estimatedTime / 60)}h ${Math.round(adaptedPlan.estimatedTime % 60)}m` : 
                  `${Math.floor(studyPlan.todaysFocus.estimatedTime / 60)}h ${studyPlan.todaysFocus.estimatedTime % 60}m`}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button variant="default" className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-purple-600">
          <Check className="h-4 w-4 mr-1" /> Start Study
        </Button>
        <Link to="/dashboard/student/today" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full">
            <Calendar className="h-4 w-4 mr-1" /> Full Plan Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
