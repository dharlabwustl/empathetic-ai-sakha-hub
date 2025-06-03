
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, TrendingUp, Calendar, BookOpen, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AcademicAdvisorView = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      title: "Focus on Chemistry",
      description: "Your Chemistry scores need improvement. Consider spending 2 extra hours weekly.",
      priority: "high",
      action: "Adjust study plan"
    },
    {
      title: "Maintain Biology Strength",
      description: "You're doing great in Biology. Keep up the current momentum.",
      priority: "medium",
      action: "Continue current approach"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Advisor</h1>
          <p className="text-gray-600">AI-powered guidance for your NEET preparation</p>
        </div>
        <Button onClick={() => navigate('/dashboard/student/study-plan/adaptive')}>
          <Calendar className="h-4 w-4 mr-2" />
          View Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{rec.title}</h3>
                    <Badge variant={rec.priority === 'high' ? 'destructive' : 'default'}>
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <Button size="sm" variant="outline">
                    {rec.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Overall Progress</span>
                <span className="font-bold text-green-600">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Study Streak</span>
                <span className="font-bold text-blue-600">12 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Weak Areas</span>
                <span className="font-bold text-orange-600">2 topics</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcademicAdvisorView;
