
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, X, CircleDot } from "lucide-react";

const AdaptiveStudyPlanTable = () => {
  const [studyPlan] = useState([
    {
      date: "2024-01-15",
      subject: "Physics",
      topics: ["Newton's Laws", "Motion"],
      hours: 3,
      timeOfStudy: "Evening",
      focusLevel: "High",
      status: "Done"
    },
    {
      date: "2024-01-16",
      subject: "Chemistry",
      topics: ["Atomic Structure", "Periodic Table"],
      hours: 2.5,
      timeOfStudy: "Morning",
      focusLevel: "Medium",
      status: "Done"
    },
    {
      date: "2024-01-17",
      subject: "Biology",
      topics: ["Cell Structure", "Photosynthesis"],
      hours: 2,
      timeOfStudy: "Evening",
      focusLevel: "Low",
      status: "Pending"
    },
    {
      date: "2024-01-18",
      subject: "Physics",
      topics: ["Thermodynamics", "Heat Transfer"],
      hours: 3,
      timeOfStudy: "Evening",
      focusLevel: "High",
      status: "Pending"
    },
    {
      date: "2024-01-19",
      subject: "Chemistry",
      topics: ["Chemical Bonding", "Molecular Structure"],
      hours: 2.5,
      timeOfStudy: "Morning",
      focusLevel: "Medium",
      status: "Skipped"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Skipped":
        return <X className="h-4 w-4 text-red-600" />;
      case "Pending":
        return <CircleDot className="h-4 w-4 text-orange-600" />;
      default:
        return <CircleDot className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800";
      case "Skipped":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFocusColor = (level: string) => {
    switch (level) {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          📅 Adaptive Study Plan Table (Dynamic Grid)
        </CardTitle>
        <p className="text-sm text-gray-600">
          Auto-adjusts based on learning performance and mood tracking
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Subject</th>
                <th className="text-left p-3 font-medium">Topics Planned</th>
                <th className="text-left p-3 font-medium">Study Hours</th>
                <th className="text-left p-3 font-medium">Time of Study</th>
                <th className="text-left p-3 font-medium">Focus Level</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studyPlan.map((plan, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      {new Date(plan.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      {plan.subject}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      {plan.topics.map((topic, idx) => (
                        <div key={idx} className="text-sm text-gray-600">
                          • {topic}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      {plan.hours}h
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant="outline">{plan.timeOfStudy}</Badge>
                  </td>
                  <td className="p-3">
                    <Badge className={getFocusColor(plan.focusLevel)}>
                      {plan.focusLevel}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(plan.status)}
                      <Badge className={getStatusColor(plan.status)}>
                        {plan.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-3">
                    {plan.status === "Pending" && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-xs">
                          Complete
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          Skip
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing next 7 days of study plan
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous Week
            </Button>
            <Button variant="outline" size="sm">
              Next Week
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" size="sm">
              Generate New Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptiveStudyPlanTable;
