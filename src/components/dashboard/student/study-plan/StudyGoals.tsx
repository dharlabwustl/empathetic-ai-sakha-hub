
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Calendar, Clock, Trophy } from 'lucide-react';

const StudyGoals: React.FC = () => {
  const examDate = new Date('2026-05-03');
  const daysLeft = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const goals = [
    {
      id: 1,
      title: "Complete NEET 2026 Syllabus",
      description: "Cover all topics across Physics, Chemistry, and Biology",
      progress: 47,
      target: "100%",
      deadline: "April 15, 2026"
    },
    {
      id: 2,
      title: "Master Weak Areas",
      description: "Focus on Chemistry and improve from weak to medium proficiency",
      progress: 65,
      target: "Medium+",
      deadline: "March 1, 2026"
    },
    {
      id: 3,
      title: "Mock Test Performance",
      description: "Achieve consistent 600+ scores in mock tests",
      progress: 78,
      target: "600+",
      deadline: "Monthly"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            NEET 2026 Study Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Days Remaining</p>
              <p className="text-2xl font-bold text-blue-600">{daysLeft}</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600">Study Hours/Week</p>
              <p className="text-2xl font-bold text-green-600">42</p>
            </div>
            <div className="text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600">Target Score</p>
              <p className="text-2xl font-bold text-purple-600">650+</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {goals.map((goal) => (
        <Card key={goal.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
              </div>
              <Badge variant="outline">
                Target: {goal.target}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Deadline: {goal.deadline}</span>
                <span>{goal.progress}% Complete</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudyGoals;
