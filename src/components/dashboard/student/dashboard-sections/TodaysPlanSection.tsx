
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Brain, Calendar, BookText, Lightbulb, ArrowRight } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { Badge } from '@/components/ui/badge';
import { getSmartSuggestion } from '@/components/dashboard/student/voice/voiceUtils';

interface TodaysPlanSectionProps {
  studyPlan: any;
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ 
  studyPlan,
  currentMood 
}) => {
  const navigate = useNavigate();
  
  // Render appropriate message based on mood
  const getMoodBasedMessage = () => {
    switch(currentMood) {
      case MoodType.Tired:
      case MoodType.Stressed:
        return "Your plan has been adjusted for today based on your mood. Focus on lighter review tasks.";
      case MoodType.Focused:
      case MoodType.Motivated:
        return "Great energy today! Your plan includes some challenging concepts to leverage your focus.";
      default:
        return "Your personalized study plan for today is ready.";
    }
  };

  // Get a smart study suggestion based on current context
  const getStudySuggestion = () => {
    const examType = studyPlan?.goalTitle || 'NEET';
    
    // Format the context object for the smart suggestion
    const context = {
      examType: examType as 'NEET' | 'IIT-JEE' | 'UPSC' | 'General',
      mood: currentMood,
      activity: 'studying' as const
    };
    
    return getSmartSuggestion(context);
  };

  // New function - simulated learning path based on today's plan
  const getLearningJourneySteps = () => {
    return [
      {
        type: 'concept',
        title: 'Cellular Respiration',
        description: 'Learn the core concept',
        path: '/dashboard/student/concepts/cellular-respiration/study'
      },
      {
        type: 'flashcard',
        title: 'Cellular Respiration Flashcards',
        description: 'Reinforce your knowledge',
        path: '/dashboard/student/flashcards/cellular-respiration/practice'
      },
      {
        type: 'practice',
        title: 'Biology Practice Quiz',
        description: 'Test your understanding',
        path: '/dashboard/student/practice-exam/biology-daily/start'
      }
    ];
  };

  const handleContinueLearning = () => {
    // Redirect to the first step in the learning journey
    const steps = getLearningJourneySteps();
    if (steps.length > 0) {
      navigate(steps[0].path);
    } else {
      navigate('/dashboard/student/today');
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-violet-600" />
            Today's Study Plan
          </CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
            <BadgeCheck className="h-3 w-3 mr-1" />
            Personalized
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {getMoodBasedMessage()}
          </p>
          
          {/* Quick Summary */}
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-800/50">
            <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Quick Summary</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Tasks for today:</span>
                <span className="font-medium">5</span>
              </li>
              <li className="flex justify-between">
                <span>Estimated time:</span>
                <span className="font-medium">2h 15m</span>
              </li>
              <li className="flex justify-between">
                <span>Priority subject:</span>
                <span className="font-medium">Biology</span>
              </li>
            </ul>
          </div>

          {/* Learning Journey Section - New section for seamless experience */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50">
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-3">Learning Journey</h4>
            <div className="space-y-3">
              {getLearningJourneySteps().map((step, index) => (
                <div key={index} className="flex items-start gap-3 relative">
                  {index > 0 && (
                    <div className="absolute top-0 left-5 h-full w-0.5 -mt-3 bg-blue-200 dark:bg-blue-800/50"></div>
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === 0 ? 'bg-blue-100 text-blue-600 dark:bg-blue-800/50 dark:text-blue-300' : 
                    index === 1 ? 'bg-purple-100 text-purple-600 dark:bg-purple-800/50 dark:text-purple-300' : 
                    'bg-green-100 text-green-600 dark:bg-green-800/50 dark:text-green-300'
                  }`}>
                    {step.type === 'concept' && <BookText className="h-5 w-5" />}
                    {step.type === 'flashcard' && <Brain className="h-5 w-5" />}
                    {step.type === 'practice' && <BadgeCheck className="h-5 w-5" />}
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">{step.title}</h5>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-3 text-xs sm:text-sm flex items-center justify-center gap-2"
              onClick={handleContinueLearning}
            >
              <span>Start Learning Journey</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Smart study suggestion */}
          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/50">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Smart Tip</h5>
                <p className="text-xs text-amber-700 dark:text-amber-200">{getStudySuggestion()}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate('/dashboard/student/today')}
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center gap-2"
            >
              <BookText className="h-4 w-4" />
              <span>View Full Study Plan</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
