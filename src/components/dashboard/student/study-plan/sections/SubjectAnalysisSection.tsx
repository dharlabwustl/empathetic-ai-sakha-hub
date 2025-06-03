
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export const SubjectAnalysisSection = () => {
  const subjectData = [
    {
      name: "Physics",
      progress: 65,
      weakTopics: ["Thermodynamics", "Electromagnetism"],
      strongTopics: ["Mechanics", "Optics"],
      timeSpent: 180,
      accuracy: 72,
      recommendation: "Focus on problem-solving practice"
    },
    {
      name: "Chemistry", 
      progress: 45,
      weakTopics: ["Organic Chemistry", "Chemical Bonding"],
      strongTopics: ["Periodic Table"],
      timeSpent: 150,
      accuracy: 58,
      recommendation: "Increase study time by 30%"
    },
    {
      name: "Biology",
      progress: 78,
      weakTopics: ["Genetics"],
      strongTopics: ["Cell Biology", "Ecology", "Plant Physiology"],
      timeSpent: 200,
      accuracy: 85,
      recommendation: "Maintain current pace"
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "text-green-600";
    if (progress >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Subject-wise Analysis & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjectData.map((subject, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{subject.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getProgressColor(subject.progress)}`}>
                        {subject.progress}%
                      </span>
                      <Badge variant={subject.progress >= 70 ? "default" : subject.progress >= 50 ? "secondary" : "destructive"}>
                        {subject.progress >= 70 ? "Strong" : subject.progress >= 50 ? "Average" : "Needs Focus"}
                      </Badge>
                    </div>
                  </div>

                  <Progress value={subject.progress} className="mb-4" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Time Spent</div>
                      <div className="font-bold text-blue-600">{subject.timeSpent}h</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Accuracy</div>
                      <div className="font-bold text-green-600">{subject.accuracy}%</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600">Rank</div>
                      <div className="font-bold text-purple-600">#{index + 1}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-red-600 mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        Weak Topics
                      </h4>
                      <div className="space-y-1">
                        {subject.weakTopics.map((topic, i) => (
                          <Badge key={i} variant="destructive" className="mr-1 mb-1 text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-600 mb-2 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Strong Topics
                      </h4>
                      <div className="space-y-1">
                        {subject.strongTopics.map((topic, i) => (
                          <Badge key={i} variant="default" className="mr-1 mb-1 text-xs bg-green-100 text-green-700">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-1 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      AI Recommendation
                    </h4>
                    <p className="text-sm text-yellow-700">{subject.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
