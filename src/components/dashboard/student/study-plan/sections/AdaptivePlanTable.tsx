
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, BookOpen, Target } from 'lucide-react';

export const AdaptivePlanTable = () => {
  const weeklyPlan = [
    {
      day: "Monday",
      subjects: [
        { name: "Physics", topic: "Mechanics", duration: "2h", status: "completed" },
        { name: "Chemistry", topic: "Atomic Structure", duration: "1.5h", status: "pending" }
      ]
    },
    {
      day: "Tuesday", 
      subjects: [
        { name: "Biology", topic: "Cell Biology", duration: "2h", status: "in-progress" },
        { name: "Physics", topic: "Thermodynamics", duration: "1h", status: "pending" }
      ]
    },
    {
      day: "Wednesday",
      subjects: [
        { name: "Chemistry", topic: "Chemical Bonding", duration: "2.5h", status: "pending" },
        { name: "Biology", topic: "Genetics", duration: "1h", status: "pending" }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Adaptive Weekly Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyPlan.map((day, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {day.day}
                  </h3>
                  <div className="space-y-2">
                    {day.subjects.map((subject, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="font-medium">{subject.name}</p>
                            <p className="text-sm text-gray-600">{subject.topic}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="h-3 w-3" />
                            {subject.duration}
                          </div>
                          {getStatusBadge(subject.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Target className="h-4 w-4 mr-2" />
              Optimize Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
