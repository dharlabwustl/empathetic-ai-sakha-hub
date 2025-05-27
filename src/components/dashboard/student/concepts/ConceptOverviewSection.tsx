
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, Clock, Target, TrendingUp, Lightbulb, Star, Award } from 'lucide-react';

interface SubjectProgress {
  name: string;
  completed: number;
  total: number;
  studyTime: number;
  efficiency: number;
  color: string;
  weakTopics: string[];
  strongTopics: string[];
}

interface ConceptOverviewSectionProps {
  className?: string;
}

const ConceptOverviewSection: React.FC<ConceptOverviewSectionProps> = ({ className }) => {
  const neetSubjects: SubjectProgress[] = [
    {
      name: 'Physics',
      completed: 45,
      total: 62,
      studyTime: 120,
      efficiency: 85,
      color: 'blue',
      weakTopics: ['Thermodynamics', 'Optics'],
      strongTopics: ['Mechanics', 'Electromagnetism']
    },
    {
      name: 'Chemistry',
      completed: 38,
      total: 58,
      studyTime: 95,
      efficiency: 78,
      color: 'green',
      weakTopics: ['Organic Reactions', 'Coordination'],
      strongTopics: ['Atomic Structure', 'Chemical Bonding']
    },
    {
      name: 'Biology',
      completed: 52,
      total: 71,
      studyTime: 140,
      efficiency: 92,
      color: 'purple',
      weakTopics: ['Genetics', 'Evolution'],
      strongTopics: ['Cell Biology', 'Human Physiology']
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getProgressColor = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const totalCompleted = neetSubjects.reduce((sum, subject) => sum + subject.completed, 0);
  const totalConcepts = neetSubjects.reduce((sum, subject) => sum + subject.total, 0);
  const averageEfficiency = Math.round(neetSubjects.reduce((sum, subject) => sum + subject.efficiency, 0) / neetSubjects.length);
  const totalStudyTime = neetSubjects.reduce((sum, subject) => sum + subject.studyTime, 0);

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="h-7 w-7 text-blue-600" />
            NEET Concepts Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Master concepts across Physics, Chemistry, and Biology</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {Math.round((totalCompleted / totalConcepts) * 100)}% Complete
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {averageEfficiency}% Efficiency
          </Badge>
        </div>
      </div>

      {/* Enhanced Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-full shadow-sm">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Total Concepts</p>
                <p className="text-2xl font-bold text-blue-800">{totalCompleted}/{totalConcepts}</p>
                <p className="text-xs text-blue-600">+5 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-full shadow-sm">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-600">Study Time</p>
                <p className="text-2xl font-bold text-green-800">{totalStudyTime}h</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-full shadow-sm">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-600">Avg Efficiency</p>
                <p className="text-2xl font-bold text-purple-800">{averageEfficiency}%</p>
                <p className="text-xs text-purple-600">↑ 12% vs last week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-full shadow-sm">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-600">Weekly Goal</p>
                <p className="text-2xl font-bold text-orange-800">85%</p>
                <p className="text-xs text-orange-600">On track</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Subject-wise Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {neetSubjects.map((subject) => (
          <Card key={subject.name} className={`${getColorClasses(subject.color)} border-2 shadow-lg hover:shadow-xl transition-shadow duration-200`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-6 w-6" />
                  <span className="text-lg">{subject.name}</span>
                </div>
                <Award className="h-5 w-5 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enhanced Progress with percentage */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Concepts Mastered</span>
                  <span className="font-bold">{subject.completed}/{subject.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                  <div 
                    className={`h-3 rounded-full ${getProgressColor(subject.color)} transition-all duration-500`}
                    style={{ width: `${(subject.completed / subject.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-center font-medium">
                  {Math.round((subject.completed / subject.total) * 100)}% Complete
                </p>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center bg-white/70 p-2 rounded-lg">
                  <p className="text-xs text-gray-600">Study Time</p>
                  <p className="font-bold text-lg">{subject.studyTime}h</p>
                </div>
                <div className="text-center bg-white/70 p-2 rounded-lg">
                  <p className="text-xs text-gray-600">Efficiency</p>
                  <p className="font-bold text-lg">{subject.efficiency}%</p>
                </div>
              </div>

              {/* Strong & Weak Topics */}
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-green-700 mb-1">Strong Topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {subject.strongTopics.map((topic, idx) => (
                      <Badge key={idx} variant="outline" className="bg-green-100 text-green-700 border-green-300 text-xs">
                        <Star className="h-2 w-2 mr-1" />
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-red-700 mb-1">Focus Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {subject.weakTopics.map((topic, idx) => (
                      <Badge key={idx} variant="outline" className="bg-red-100 text-red-700 border-red-300 text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Action Button */}
              <Button size="sm" className="w-full mt-4 shadow-sm hover:shadow-md transition-shadow">
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced AI Suggestions */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Lightbulb className="h-6 w-6" />
            Smart AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-red-600" />
                <p className="text-sm font-medium text-gray-800">Priority Focus</p>
              </div>
              <p className="text-sm text-gray-600">Physics Mechanics needs attention - 60% completion rate</p>
              <Button size="sm" variant="outline" className="mt-2 w-full">Focus Now</Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-gray-800">Quick Revision</p>
              </div>
              <p className="text-sm text-gray-600">Chemistry Organic Reactions - last studied 5 days ago</p>
              <Button size="sm" variant="outline" className="mt-2 w-full">Revise</Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <p className="text-sm font-medium text-gray-800">Strength Building</p>
              </div>
              <p className="text-sm text-gray-600">Biology Physiology is your forte - advance to complex topics</p>
              <Button size="sm" variant="outline" className="mt-2 w-full">Advance</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptOverviewSection;
