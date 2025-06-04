
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  BookOpen, 
  Target,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

export const WeeklyMonthlyDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');

  const weeklyStats = {
    totalHours: 28,
    targetHours: 35,
    completedTopics: 12,
    pendingTopics: 8,
    subjects: ['Physics', 'Chemistry', 'Biology']
  };

  const monthlyProgress = {
    Physics: 65,
    Chemistry: 72,
    Biology: 80
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Weekly & Monthly Dashboard</h2>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('weekly')}
          >
            Weekly
          </Button>
          <Button 
            variant={viewMode === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('monthly')}
          >
            Monthly
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Study Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {viewMode === 'weekly' ? (
            <Card>
              <CardHeader>
                <CardTitle>This Week's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Study Hours</span>
                  <span className="text-sm text-gray-600">
                    {weeklyStats.totalHours} / {weeklyStats.targetHours}h
                  </span>
                </div>
                <Progress value={(weeklyStats.totalHours / weeklyStats.targetHours) * 100} />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-green-600">{weeklyStats.completedTopics}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-orange-600">{weeklyStats.pendingTopics}</div>
                    <div className="text-xs text-gray-600">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(monthlyProgress).map(([subject, progress]) => (
                  <div key={subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{subject}</span>
                      <Badge variant="outline">{progress}%</Badge>
                    </div>
                    <Progress value={progress} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
