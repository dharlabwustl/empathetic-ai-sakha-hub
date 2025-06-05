
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Target, Clock, BarChart3, Award } from 'lucide-react';

export const PerformanceTrackerSection = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const performanceData = {
    physics: {
      testScores: [75, 82, 78, 85, 90],
      accuracy: 78,
      avgTimePerQuestion: 2.5,
      improvement: 15
    },
    chemistry: {
      testScores: [65, 70, 68, 75, 80],
      accuracy: 72,
      avgTimePerQuestion: 3.2,
      improvement: 15
    },
    biology: {
      testScores: [85, 88, 92, 90, 95],
      accuracy: 88,
      avgTimePerQuestion: 2.1,
      improvement: 10
    }
  };

  const difficultyHeatmap = [
    { topic: 'Mechanics', difficulty: 'medium', score: 85 },
    { topic: 'Thermodynamics', difficulty: 'hard', score: 65 },
    { topic: 'Organic Chemistry', difficulty: 'hard', score: 60 },
    { topic: 'Genetics', difficulty: 'easy', score: 95 },
    { topic: 'Ecology', difficulty: 'medium', score: 88 }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Tracker
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {Object.entries(performanceData).map(([subject, data]) => (
              <Card key={subject} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium capitalize">{subject}</h3>
                    <Badge variant="outline" className="text-xs">
                      +{data.improvement}%
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Latest Score</span>
                        <span className="font-medium">{data.testScores[data.testScores.length - 1]}%</span>
                      </div>
                      <Progress value={data.testScores[data.testScores.length - 1]} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-600">Accuracy</div>
                        <div className="font-medium">{data.accuracy}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Avg Time</div>
                        <div className="font-medium">{data.avgTimePerQuestion}m</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Test Scores Trend */}
          <div className="mb-6">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Test Scores Trend
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {performanceData.physics.testScores.map((score, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-600 mb-1">Test {index + 1}</div>
                  <div className="bg-blue-100 rounded-lg p-2">
                    <div className="font-medium text-sm">{score}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Heatmap */}
          <div className="mb-6">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Difficulty Heatmap
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {difficultyHeatmap.map((topic, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{topic.topic}</h4>
                    <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                      {topic.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="font-medium">{topic.score}%</span>
                  </div>
                  <Progress value={topic.score} className="h-1 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Auto-adjustment Insights */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-green-600" />
              Auto-adjustment Insights
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Study time for Thermodynamics increased by 20% due to low scores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Biology study sessions optimized for morning hours based on performance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Revision frequency increased for Organic Chemistry topics</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
