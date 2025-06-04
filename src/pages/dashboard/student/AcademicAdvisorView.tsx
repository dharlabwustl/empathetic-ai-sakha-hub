
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Award, 
  AlertCircle,
  CheckCircle,
  Star,
  Brain,
  Zap
} from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const AcademicAdvisorView = () => {
  const navigate = useNavigate();
  const [currentGoal, setCurrentGoal] = useState("NEET 2026");

  const advisorRecommendations = [
    {
      id: 1,
      type: "urgent",
      title: "Physics - Mechanics Weakness Detected",
      description: "Your recent test scores show you're struggling with rotational dynamics. Let's focus on this area.",
      action: "Start Practice",
      priority: "high",
      estimatedTime: "2 hours",
      icon: AlertCircle,
      color: "text-red-600"
    },
    {
      id: 2,
      type: "suggestion",
      title: "Chemistry Organic - Perfect Timing",
      description: "You've mastered basic organic chemistry. Now is the perfect time to tackle reaction mechanisms.",
      action: "Continue Learning",
      priority: "medium",
      estimatedTime: "1.5 hours",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      id: 3,
      type: "milestone",
      title: "Biology - Chapter Complete!",
      description: "Congratulations! You've successfully completed the Respiratory System chapter with 85% accuracy.",
      action: "Review & Strengthen",
      priority: "low",
      estimatedTime: "45 mins",
      icon: CheckCircle,
      color: "text-blue-600"
    }
  ];

  const studyStrategy = {
    weeklyTarget: 40,
    completedHours: 28,
    remainingDays: 245,
    strongSubjects: ["Biology", "Chemistry"],
    improvementAreas: ["Physics - Mechanics", "Chemistry - Physical"],
    nextMilestone: "Complete Physics Waves & Oscillations",
    recommendedDailyHours: 6
  };

  const handleViewStudyPlan = () => {
    navigate('/dashboard/student/study-plan');
  };

  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Your personalized academic guidance and strategic insights"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Current Goal Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-blue-800">Current Goal: {currentGoal}</CardTitle>
                <CardDescription className="text-blue-600">
                  Stay focused and follow your personalized study strategy
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-800">{studyStrategy.remainingDays}</div>
                <div className="text-sm text-blue-600">Days Remaining</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <Clock className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <div className="font-semibold">{studyStrategy.completedHours}h / {studyStrategy.weeklyTarget}h</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <Target className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="font-semibold">{studyStrategy.recommendedDailyHours}h</div>
                <div className="text-sm text-gray-600">Daily Target</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="font-semibold">78%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Advisor Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Advisor Recommendations
            </CardTitle>
            <CardDescription>
              Personalized suggestions based on your learning patterns and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {advisorRecommendations.map((recommendation) => (
                <div key={recommendation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <recommendation.icon className={`h-5 w-5 mt-1 ${recommendation.color}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{recommendation.title}</h3>
                          <Badge variant={recommendation.priority === 'high' ? 'destructive' : recommendation.priority === 'medium' ? 'default' : 'secondary'}>
                            {recommendation.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{recommendation.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {recommendation.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="ml-4">
                      {recommendation.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Study Strategy Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Strong Subjects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyStrategy.strongSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{subject}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Excellent
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                Improvement Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyStrategy.improvementAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{area}</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      Focus Needed
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">Next Milestone</h3>
                  <p className="text-gray-600">{studyStrategy.nextMilestone}</p>
                </div>
                <Button onClick={handleViewStudyPlan}>
                  View Plan
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-semibold">Take Practice Test</div>
                    <div className="text-sm text-gray-600">Assess your current level</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-semibold">Review Weak Areas</div>
                    <div className="text-sm text-gray-600">Focus on improvement areas</div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
