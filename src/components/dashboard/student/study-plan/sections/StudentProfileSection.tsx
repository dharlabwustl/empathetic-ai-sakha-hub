
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Target, Calendar, Clock, BookOpen, Brain } from 'lucide-react';

export const StudentProfileSection = () => {
  const studentProfile = {
    name: "Priya Sharma",
    examTarget: "NEET 2026",
    currentRank: "Top 15%",
    studyStreak: 45,
    totalStudyHours: 580,
    averageDaily: 4.2,
    subjects: [
      { name: "Physics", proficiency: 65, trend: "improving" },
      { name: "Chemistry", proficiency: 45, trend: "stable" },
      { name: "Biology", proficiency: 78, trend: "excellent" }
    ]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Student Profile & Learning Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Overview */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    PS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{studentProfile.name}</h3>
                  <p className="text-sm text-gray-600">NEET 2026 Aspirant</p>
                  <Badge variant="outline" className="mt-1">
                    {studentProfile.currentRank}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-medium">Study Streak</div>
                  <div className="text-lg font-bold text-blue-600">{studentProfile.studyStreak} days</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <div className="text-sm font-medium">Total Hours</div>
                  <div className="text-lg font-bold text-green-600">{studentProfile.totalStudyHours}h</div>
                </div>
              </div>
            </div>

            {/* Subject Proficiency */}
            <div className="space-y-4">
              <h4 className="font-medium">Subject Proficiency</h4>
              {studentProfile.subjects.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{subject.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{subject.proficiency}%</span>
                      <Badge 
                        variant={subject.trend === 'excellent' ? 'default' : 
                                subject.trend === 'improving' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {subject.trend}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={subject.proficiency} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Learning Insights */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600" />
              Learning Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Best Study Time:</strong> Evening (6-9 PM)
              </div>
              <div>
                <strong>Learning Style:</strong> Visual + Practical
              </div>
              <div>
                <strong>Avg Daily Hours:</strong> {studentProfile.averageDaily}h
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
