
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Target, BarChart3 } from "lucide-react";

const PerformanceTrackerSection = () => {
  const testScores = [
    { subject: "Physics", topic: "Mechanics", score: 85, accuracy: 78, avgTime: "2.3 min" },
    { subject: "Chemistry", topic: "Organic", score: 72, accuracy: 65, avgTime: "3.1 min" },
    { subject: "Biology", topic: "Genetics", score: 91, accuracy: 89, avgTime: "1.8 min" }
  ];

  const difficultyHeatmap = [
    { topic: "Thermodynamics", difficulty: "High", performance: 65 },
    { topic: "Atomic Structure", difficulty: "Medium", performance: 78 },
    { topic: "Cell Biology", difficulty: "Low", performance: 92 },
    { topic: "Optics", difficulty: "High", performance: 58 },
    { topic: "Coordination", difficulty: "Medium", performance: 71 }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 65) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            📈 Performance Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Subject</th>
                  <th className="text-left p-3 font-medium">Topic</th>
                  <th className="text-left p-3 font-medium">Test Score</th>
                  <th className="text-left p-3 font-medium">Accuracy %</th>
                  <th className="text-left p-3 font-medium">Avg Time/Question</th>
                  <th className="text-left p-3 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {testScores.map((score, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {score.subject}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium">{score.topic}</td>
                    <td className="p-3">
                      <span className={`text-lg font-bold ${getPerformanceColor(score.score)}`}>
                        {score.score}%
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Progress value={score.accuracy} className="w-20 h-2" />
                        <span className="text-sm">{score.accuracy}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {score.avgTime}
                      </div>
                    </td>
                    <td className="p-3">
                      <TrendingUp className={`h-4 w-4 ${getPerformanceColor(score.score)}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            Difficulty Heatmap
          </CardTitle>
          <p className="text-sm text-gray-600">
            Auto-adjustment of study topics & timing based on performance
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {difficultyHeatmap.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">{item.topic}</h4>
                  <Badge className={getDifficultyColor(item.difficulty)}>
                    {item.difficulty}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Performance</span>
                    <span className={getPerformanceColor(item.performance)}>
                      {item.performance}%
                    </span>
                  </div>
                  <Progress value={item.performance} className="h-2" />
                </div>
                {item.performance < 70 && (
                  <div className="mt-3 p-2 bg-orange-50 rounded text-xs text-orange-800">
                    ⚡ Needs more focus - increasing study time automatically
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Overall Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">78%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">2.4</div>
              <div className="text-sm text-gray-600">Avg Minutes/Question</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600">Tests Completed</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Strongest Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Cell Biology</span>
              <span className="text-sm font-medium text-green-600">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Genetics</span>
              <span className="text-sm font-medium text-green-600">89%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Mechanics</span>
              <span className="text-sm font-medium text-green-600">85%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Optics</span>
              <span className="text-sm font-medium text-red-600">58%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Organic Chemistry</span>
              <span className="text-sm font-medium text-red-600">65%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Thermodynamics</span>
              <span className="text-sm font-medium text-red-600">65%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceTrackerSection;
