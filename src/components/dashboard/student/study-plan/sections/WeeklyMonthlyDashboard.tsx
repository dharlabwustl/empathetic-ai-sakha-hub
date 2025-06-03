
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Target, TrendingUp, Book, AlertCircle } from 'lucide-react';

export const WeeklyMonthlyDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const weeklyData = {
    physics: { progress: 45, topics: 12, completed: 5 },
    chemistry: { progress: 35, topics: 10, completed: 3 },
    biology: { progress: 60, topics: 15, completed: 9 }
  };

  const mockTests = [
    {
      id: 1,
      name: 'Physics Mock Test #3',
      date: '2024-06-08',
      syllabus: ['Mechanics', 'Thermodynamics'],
      score: 85,
      accuracy: 78
    },
    {
      id: 2,
      name: 'Chemistry Mock Test #2',
      date: '2024-06-10',
      syllabus: ['Organic Chemistry'],
      score: null,
      accuracy: null
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly & Monthly Dashboard
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('weekly')}
            >
              Weekly View
            </Button>
            <Button
              variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('monthly')}
            >
              Monthly View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Syllabus Progress */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Book className="h-4 w-4" />
                Syllabus Progress by Subject
              </h3>
              {Object.entries(weeklyData).map(([subject, data]) => (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize font-medium">{subject}</span>
                    <span className="text-sm text-gray-600">{data.progress}%</span>
                  </div>
                  <Progress value={data.progress} className="h-2" />
                  <div className="text-xs text-gray-600">
                    {data.completed}/{data.topics} topics completed
                  </div>
                </div>
              ))}
            </div>

            {/* Revision Tracker */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Revision Tracker
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border">
                  <div>
                    <div className="font-medium">Mechanics</div>
                    <div className="text-sm text-gray-600">Last revised: 2 days ago</div>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-700">Due</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border">
                  <div>
                    <div className="font-medium">Organic Chemistry</div>
                    <div className="text-sm text-gray-600">Last revised: 5 days ago</div>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Overdue</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border">
                  <div>
                    <div className="font-medium">Botany</div>
                    <div className="text-sm text-gray-600">Last revised: 1 day ago</div>
                  </div>
                  <Badge variant="outline">Recent</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Test Planner */}
          <div className="mt-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Mock Test Planner
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTests.map((test) => (
                <Card key={test.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{test.name}</h4>
                      {test.score ? (
                        <Badge variant="default" className="bg-green-100 text-green-700">
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Upcoming</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {new Date(test.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm mb-2">
                      <strong>Syllabus:</strong> {test.syllabus.join(', ')}
                    </div>
                    {test.score && (
                      <div className="flex gap-4 text-sm">
                        <span><strong>Score:</strong> {test.score}%</span>
                        <span><strong>Accuracy:</strong> {test.accuracy}%</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom Reminders */}
          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              Custom Reminders & Alerts
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Physics revision due in 2 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Chemistry mock test tomorrow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Weekly progress review scheduled</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
