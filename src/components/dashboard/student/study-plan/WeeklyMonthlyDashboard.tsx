
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Target, Clock, Bell } from "lucide-react";

const WeeklyMonthlyDashboard = () => {
  const [view, setView] = useState("weekly");

  const syllabusProgress = [
    { subject: "Physics", progress: 65, topics: 45, completed: 29 },
    { subject: "Chemistry", progress: 72, topics: 38, completed: 27 },
    { subject: "Biology", progress: 58, topics: 52, completed: 30 }
  ];

  const upcomingTests = [
    {
      name: "Physics Mock Test #3",
      date: "2024-01-20",
      syllabus: "Mechanics, Thermodynamics",
      type: "Mock Test"
    },
    {
      name: "Chemistry Unit Test",
      date: "2024-01-22",
      syllabus: "Organic Chemistry",
      type: "Unit Test"
    }
  ];

  const revisionTracker = [
    { topic: "Newton's Laws", subject: "Physics", lastRevised: "2024-01-10", due: "2024-01-17" },
    { topic: "Atomic Structure", subject: "Chemistry", lastRevised: "2024-01-12", due: "2024-01-19" },
    { topic: "Cell Biology", subject: "Biology", lastRevised: "2024-01-14", due: "2024-01-21" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            📆 Weekly & Monthly Dashboard
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant={view === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("weekly")}
            >
              Weekly View
            </Button>
            <Button 
              variant={view === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("monthly")}
            >
              Monthly View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(2024, 0, i - 6);
              const isToday = date.toDateString() === new Date().toDateString();
              const hasStudy = Math.random() > 0.3;
              
              return (
                <div
                  key={i}
                  className={`
                    aspect-square p-2 border rounded-lg cursor-pointer transition-colors
                    ${isToday ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-50'}
                    ${hasStudy ? 'bg-green-50 border-green-200' : ''}
                  `}
                >
                  <div className="text-sm">{date.getDate()}</div>
                  {hasStudy && (
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Syllabus Progress (by Subject)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {syllabusProgress.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.subject}</span>
                  <span className="text-sm text-gray-600">
                    {subject.completed}/{subject.topics} topics
                  </span>
                </div>
                <Progress value={subject.progress} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{subject.progress}% complete</span>
                  <span>{subject.topics - subject.completed} remaining</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revision Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {revisionTracker.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{item.topic}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {item.subject}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Due: {new Date(item.due).toLocaleDateString()}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Last revised: {new Date(item.lastRevised).toLocaleDateString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mock Test Planner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTests.map((test, index) => (
              <div key={index} className="p-4 border rounded-lg bg-blue-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">{test.name}</div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {test.type}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  📅 {new Date(test.date).toLocaleDateString()}
                </div>
                <div className="text-sm">
                  <strong>Syllabus:</strong> {test.syllabus}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Custom Reminders/Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-orange-50">
              <Bell className="h-5 w-5 text-orange-600" />
              <div>
                <div className="font-medium">Physics revision due</div>
                <div className="text-sm text-gray-600">Newton's Laws - Due in 2 days</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-red-50">
              <Bell className="h-5 w-5 text-red-600" />
              <div>
                <div className="font-medium">Mock test tomorrow</div>
                <div className="text-sm text-gray-600">Physics Mock Test #3</div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Add New Reminder
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyMonthlyDashboard;
