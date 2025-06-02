
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const AdaptivePlanTable = () => {
  const [planData, setPlanData] = useState([
    {
      id: 1,
      date: '2024-06-03',
      subject: 'Physics',
      topics: ['Mechanics - Newton\'s Laws', 'Work & Energy'],
      studyHours: 2.5,
      timeOfStudy: 'Evening',
      focusLevel: 'High',
      status: 'Done'
    },
    {
      id: 2,
      date: '2024-06-04',
      subject: 'Chemistry',
      topics: ['Organic Chemistry - Hydrocarbons'],
      studyHours: 2,
      timeOfStudy: 'Evening',
      focusLevel: 'Medium',
      status: 'Pending'
    },
    {
      id: 3,
      date: '2024-06-05',
      subject: 'Biology',
      topics: ['Cell Biology', 'Photosynthesis'],
      studyHours: 3,
      timeOfStudy: 'Evening',
      focusLevel: 'High',
      status: 'Pending'
    },
    {
      id: 4,
      date: '2024-06-06',
      subject: 'Physics',
      topics: ['Thermodynamics - Laws'],
      studyHours: 2,
      timeOfStudy: 'Evening',
      focusLevel: 'Medium',
      status: 'Skipped'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Skipped':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Done': 'default',
      'Skipped': 'destructive',
      'Pending': 'secondary'
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] as any} className="text-xs">
        {status}
      </Badge>
    );
  };

  const getFocusLevelColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'Low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const updatePlanItem = (id: number, field: string, value: string) => {
    setPlanData(planData.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Adaptive Study Plan Table (Dynamic Grid)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Subject</th>
                  <th className="text-left p-3 font-medium">Topics Planned</th>
                  <th className="text-left p-3 font-medium">Study Hours</th>
                  <th className="text-left p-3 font-medium">Time of Study</th>
                  <th className="text-left p-3 font-medium">Focus Level</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {planData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant="outline" 
                        className={`
                          ${item.subject === 'Physics' ? 'border-purple-300 text-purple-700' : ''}
                          ${item.subject === 'Chemistry' ? 'border-green-300 text-green-700' : ''}
                          ${item.subject === 'Biology' ? 'border-yellow-300 text-yellow-700' : ''}
                        `}
                      >
                        {item.subject}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        {item.topics.map((topic, index) => (
                          <div key={index} className="text-sm text-gray-700">
                            • {topic}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">{item.studyHours}h</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Select 
                        value={item.timeOfStudy} 
                        onValueChange={(value) => updatePlanItem(item.id, 'timeOfStudy', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Morning">Morning</SelectItem>
                          <SelectItem value="Afternoon">Afternoon</SelectItem>
                          <SelectItem value="Evening">Evening</SelectItem>
                          <SelectItem value="Night">Night</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3">
                      <Select 
                        value={item.focusLevel} 
                        onValueChange={(value) => updatePlanItem(item.id, 'focusLevel', value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <Select 
                          value={item.status} 
                          onValueChange={(value) => updatePlanItem(item.id, 'status', value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Done">Done</SelectItem>
                            <SelectItem value="Skipped">Skipped</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Auto-Adjustment Features</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>• Plan automatically adjusts based on your learning performance</p>
              <p>• Weak subjects get more time allocation</p>
              <p>• Skipped topics are rescheduled with higher priority</p>
              <p>• Study hours adapt to your completion patterns</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
