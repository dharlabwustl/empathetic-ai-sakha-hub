
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, BookOpen, Brain, FileText, CheckCircle, Lightbulb, Target, Clock, Zap, TrendingUp } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { SubjectTasksBreakdown } from './SubjectTasksBreakdown';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ 
  planData, 
  onConceptClick,
  isMobile 
}) => {
  if (!planData) return null;
  
  // Smart suggestions based on completion and time
  const getSmartSuggestions = () => {
    const completionRate = (planData.completedTasks / planData.totalTasks) * 100;
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay(); // 0 = Sunday, 6 = Saturday
    const suggestions = [];

    // Time-based suggestions
    if (completionRate < 30 && currentHour < 12) {
      suggestions.push({
        icon: <Zap className="h-4 w-4 text-yellow-500" />,
        text: "Morning energy is perfect for tackling difficult concepts",
        action: "Start with Hard concepts",
        priority: "high"
      });
    }

    if (currentHour > 18 && completionRate < 50) {
      suggestions.push({
        icon: <Clock className="h-4 w-4 text-orange-500" />,
        text: "Evening study works best with quick reviews and flashcards",
        action: "Review Flashcards",
        priority: "high"
      });
    }

    // Progress-based suggestions
    if (completionRate > 70) {
      suggestions.push({
        icon: <Target className="h-4 w-4 text-green-500" />,
        text: "Great progress! Consider taking a practice test to validate learning",
        action: "Take Practice Test",
        priority: "medium"
      });
    }

    if (completionRate < 20 && currentHour > 10) {
      suggestions.push({
        icon: <TrendingUp className="h-4 w-4 text-red-500" />,
        text: "Let's break the ice with a quick 15-minute concept review",
        action: "Quick Start Session",
        priority: "high"
      });
    }

    // Day-based suggestions
    if (currentDay === 0 || currentDay === 6) { // Weekend
      suggestions.push({
        icon: <Brain className="h-4 w-4 text-purple-500" />,
        text: "Weekends are great for deep concept understanding and practice",
        action: "Deep Study Mode",
        priority: "medium"
      });
    }

    // Streak and consistency suggestions
    if (planData.streak > 3) {
      suggestions.push({
        icon: <Lightbulb className="h-4 w-4 text-blue-500" />,
        text: "Your consistency is impressive! Try exploring advanced topics today",
        action: "Explore Advanced",
        priority: "low"
      });
    }

    // Default fallback
    if (suggestions.length === 0) {
      suggestions.push({
        icon: <Lightbulb className="h-4 w-4 text-blue-500" />,
        text: "Break down large tasks into smaller 15-minute focused sessions",
        action: "Use Pomodoro Technique",
        priority: "medium"
      });
    }

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  };

  const smartSuggestions = getSmartSuggestions();
  
  const renderConceptCard = (concept: any) => {
    return (
      <Card 
        key={concept.id} 
        className="border-l-4 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        style={{ 
          borderLeftColor: 
            concept.difficulty === 'Easy' ? '#22c55e' : 
            concept.difficulty === 'Medium' ? '#f59e0b' : 
            '#ef4444' 
        }}
        onClick={() => onConceptClick(concept.id)}
      >
        <CardContent className={`p-4 ${isMobile ? 'p-3' : ''}`}>
          <div className="flex items-start justify-between mb-2">
            <Badge variant={concept.status === 'completed' ? "outline" : "default"} className="mb-2">
              {concept.status === 'completed' ? "Completed" : "Pending"}
            </Badge>
            <Badge variant="outline" className={
              concept.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
              concept.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-red-50 text-red-700 border-red-200'
            }>
              {concept.difficulty}
            </Badge>
          </div>
          
          <h3 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'} mb-1`}>
            {concept.title}
          </h3>
          
          <div className="mt-2 space-y-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Book className="h-4 w-4" />
              <span>{concept.subject}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{concept.topic}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                {concept.duration} min
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-8">
      {/* Single Main Progress Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Today's Plan Progress</h2>
            <p className="text-gray-600 dark:text-gray-300">Track your daily learning goals and achievements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Tasks Completed</h3>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-blue-600">{planData.completedTasks}</span>
                <span className="text-gray-500 text-lg">/ {planData.totalTasks}</span>
                <span className="text-sm text-gray-400">tasks</span>
              </div>
              <Progress 
                value={(planData.completedTasks / planData.totalTasks) * 100} 
                className="h-3"
              />
              <div className="text-sm text-gray-600">
                {Math.round((planData.completedTasks / planData.totalTasks) * 100)}% Complete
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Time Allocation</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Concepts</span>
                  </div>
                  <span className="text-sm font-medium">{planData.timeAllocation.concepts}m</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Flashcards</span>
                  </div>
                  <span className="text-sm font-medium">{planData.timeAllocation.flashcards}m</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Practice</span>
                  </div>
                  <span className="text-sm font-medium">{planData.timeAllocation.practiceExams}m</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Total Time:</span>
                  <span className="text-sm font-bold text-blue-600">{planData.timeAllocation.total} min</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Study Streak</h3>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-orange-500">{planData.streak}</span>
                <span className="text-gray-500">days</span>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Download Today's Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-violet-600" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Smart Suggestions to Complete Tasks</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Personalized recommendations to help you stay on track and complete your daily goals efficiently.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {smartSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  suggestion.priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                  suggestion.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                  'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  {suggestion.icon}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {suggestion.text}
                    </p>
                    <Button size="sm" variant="outline" className="text-xs">
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Today's Concepts Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planData.concepts && planData.concepts.length > 0 ? (
            planData.concepts.map(renderConceptCard)
          ) : (
            <Card className="col-span-full">
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No concepts scheduled for today</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Subject Tasks Breakdown */}
      <SubjectTasksBreakdown />
    </div>
  );
};

export default NewTodaysPlanView;
