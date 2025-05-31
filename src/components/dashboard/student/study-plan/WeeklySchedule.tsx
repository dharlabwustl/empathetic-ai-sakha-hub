
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from 'lucide-react';

const WeeklySchedule: React.FC = () => {
  const schedule = [
    {
      day: 'Monday',
      sessions: [
        { time: '6:00-8:00 AM', subject: 'Physics', topic: 'Mechanics', color: '#3b82f6' },
        { time: '4:00-6:00 PM', subject: 'Chemistry', topic: 'Organic', color: '#10b981' },
        { time: '7:00-8:00 PM', subject: 'Biology', topic: 'Botany', color: '#8b5cf6' }
      ]
    },
    {
      day: 'Tuesday',
      sessions: [
        { time: '6:00-8:00 AM', subject: 'Chemistry', topic: 'Physical', color: '#10b981' },
        { time: '4:00-6:00 PM', subject: 'Physics', topic: 'Thermodynamics', color: '#3b82f6' },
        { time: '7:00-8:00 PM', subject: 'Biology', topic: 'Zoology', color: '#8b5cf6' }
      ]
    },
    {
      day: 'Wednesday',
      sessions: [
        { time: '6:00-8:00 AM', subject: 'Biology', topic: 'Human Physiology', color: '#8b5cf6' },
        { time: '4:00-6:00 PM', subject: 'Chemistry', topic: 'Inorganic', color: '#10b981' },
        { time: '7:00-8:00 PM', subject: 'Physics', topic: 'Electromagnetism', color: '#3b82f6' }
      ]
    },
    {
      day: 'Thursday',
      sessions: [
        { time: '6:00-8:00 AM', subject: 'Physics', topic: 'Modern Physics', color: '#3b82f6' },
        { time: '4:00-6:00 PM', subject: 'Biology', topic: 'Genetics', color: '#8b5cf6' },
        { time: '7:00-8:00 PM', subject: 'Chemistry', topic: 'Organic', color: '#10b981' }
      ]
    },
    {
      day: 'Friday',
      sessions: [
        { time: '6:00-8:00 AM', subject: 'Chemistry', topic: 'Physical', color: '#10b981' },
        { time: '4:00-6:00 PM', subject: 'Physics', topic: 'Optics', color: '#3b82f6' },
        { time: '7:00-8:00 PM', subject: 'Biology', topic: 'Ecology', color: '#8b5cf6' }
      ]
    },
    {
      day: 'Saturday',
      sessions: [
        { time: '9:00-12:00 PM', subject: 'Mock Test', topic: 'Full Length Test', color: '#f59e0b' },
        { time: '2:00-4:00 PM', subject: 'Revision', topic: 'Weak Areas', color: '#ef4444' }
      ]
    },
    {
      day: 'Sunday',
      sessions: [
        { time: '10:00-12:00 PM', subject: 'Review', topic: 'Previous Week', color: '#6b7280' },
        { time: '2:00-3:00 PM', subject: 'Planning', topic: 'Next Week', color: '#6b7280' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            NEET 2026 Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedule.map((day) => (
              <div key={day.day} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">{day.day}</h3>
                <div className="space-y-2">
                  {day.sessions.map((session, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                      style={{ backgroundColor: `${session.color}10` }}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          style={{ backgroundColor: session.color, color: 'white' }}
                        >
                          {session.subject}
                        </Badge>
                        <span className="text-sm text-gray-600">{session.topic}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklySchedule;
