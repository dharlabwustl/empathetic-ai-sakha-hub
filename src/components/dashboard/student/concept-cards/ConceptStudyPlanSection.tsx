
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, BookOpen, CheckCircle, Calendar } from "lucide-react";

interface ConceptStudyPlanSectionProps {
  conceptTitle: string;
}

const ConceptStudyPlanSection: React.FC<ConceptStudyPlanSectionProps> = ({ conceptTitle }) => {
  // Mock data - in a real app this would be fetched from the API
  const studyPlanData = {
    weeklyProgress: 68,
    totalConcepts: 15,
    completedConcepts: 9,
    timeSpent: "4.5 hrs",
    targetDate: "May 15, 2025",
    schedule: [
      { day: "Today", concepts: 2, completed: 1 },
      { day: "Tomorrow", concepts: 3, completed: 0 },
      { day: "May 1", concepts: 2, completed: 0 },
      { day: "May 2", concepts: 2, completed: 0 },
      { day: "May 3", concepts: 0, completed: 0 },
      { day: "May 4", concepts: 1, completed: 0 },
    ]
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-600" />
        Study Plan Progress
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Progress Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">Overall Completion</span>
                  <span>{studyPlanData.weeklyProgress}%</span>
                </div>
                <Progress value={studyPlanData.weeklyProgress} className="h-2" />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-3 flex-1">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Concepts</div>
                    <div className="font-semibold">
                      {studyPlanData.completedConcepts} / {studyPlanData.totalConcepts}
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-3 flex items-center gap-3 flex-1">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Time Spent</div>
                    <div className="font-semibold">{studyPlanData.timeSpent}</div>
                  </div>
                </div>
                
                <div className="bg-emerald-50 rounded-lg p-3 flex items-center gap-3 flex-1">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <CalendarDays className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Target Date</div>
                    <div className="font-semibold">{studyPlanData.targetDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Schedule */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studyPlanData.schedule.map((day, index) => (
                <div key={index} className={`flex justify-between items-center p-2 rounded-lg ${day.day === "Today" ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"}`}>
                  <div className="text-sm font-medium">{day.day}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`
                      ${day.completed === day.concepts && day.concepts > 0 ? 'bg-green-50 text-green-600 border-green-200' : ''}
                      ${day.completed < day.concepts ? 'bg-orange-50 text-orange-600 border-orange-200' : ''}
                      ${day.concepts === 0 ? 'bg-gray-50 text-gray-600 border-gray-200' : ''}
                    `}>
                      {day.completed}/{day.concepts} {day.concepts === 1 ? 'concept' : 'concepts'}
                    </Badge>
                    {day.completed === day.concepts && day.concepts > 0 && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConceptStudyPlanSection;
