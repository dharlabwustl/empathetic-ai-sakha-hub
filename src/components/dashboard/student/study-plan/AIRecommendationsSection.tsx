
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Target, TrendingUp, Lightbulb } from "lucide-react";

const AIRecommendationsSection = () => {
  const recommendations = [
    {
      type: "Subject Focus",
      title: "Increase Chemistry Study Time",
      description: "Based on your recent test scores, consider increasing Chemistry study time by 30 minutes daily.",
      priority: "High",
      icon: <Target className="h-4 w-4" />
    },
    {
      type: "Time Allocation",
      title: "Morning Sessions for Physics",
      description: "Your concentration seems highest in the morning. Consider moving Physics to morning sessions.",
      priority: "Medium",
      icon: <Clock className="h-4 w-4" />
    },
    {
      type: "Revision Strategy",
      title: "Spaced Repetition for Biology",
      description: "Implement spaced repetition for Biology topics you completed 2 weeks ago.",
      priority: "High",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  const weeklyUpdates = [
    "This week, focus 40% more time on Organic Chemistry",
    "Schedule 2 mock tests for Physics to improve speed",
    "Review Cell Biology topics from last month"
  ];

  const personalizedTips = [
    "Your performance improves by 23% when studying in the evening",
    "Taking breaks every 45 minutes increases your retention rate",
    "You tend to perform better on topics studied on weekdays vs weekends"
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            🤖 AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {rec.icon}
                  <Badge variant="outline" className="text-xs">
                    {rec.type}
                  </Badge>
                </div>
                <Badge className={getPriorityColor(rec.priority)}>
                  {rec.priority}
                </Badge>
              </div>
              <h4 className="font-medium mb-2">{rec.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Apply Suggestion
                </Button>
                <Button size="sm" variant="outline">
                  Not Now
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Weekly Strategy Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weeklyUpdates.map((update, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-sm">{update}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Personalized Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {personalizedTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personalized Revision Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">3 days</div>
              <div className="text-sm text-gray-600">Physics Topics</div>
              <div className="text-xs text-gray-500 mt-1">Based on difficulty</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">5 days</div>
              <div className="text-sm text-gray-600">Chemistry Topics</div>
              <div className="text-xs text-gray-500 mt-1">Based on performance</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">7 days</div>
              <div className="text-sm text-gray-600">Biology Topics</div>
              <div className="text-xs text-gray-500 mt-1">Based on confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendationsSection;
