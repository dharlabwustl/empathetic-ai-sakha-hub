
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const WeeklySchedule: React.FC = () => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const schedule = {
    'Monday': [
      { time: '6:00-8:00', subject: 'Physics', topic: 'Mechanics', type: 'study', color: '#8B5CF6' },
      { time: '16:00-18:00', subject: 'Chemistry', topic: 'Physical Chemistry', type: 'study', color: '#10B981' },
      { time: '19:00-20:00', subject: 'Biology', topic: 'Revision', type: 'revision', color: '#F59E0B' }
    ],
    'Tuesday': [
      { time: '6:00-8:00', subject: 'Biology', topic: 'Zoology', type: 'study', color: '#F59E0B' },
      { time: '16:00-18:00', subject: 'Physics', topic: 'Thermodynamics', type: 'study', color: '#8B5CF6' },
      { time: '20:00-21:00', subject: 'Chemistry', topic: 'Practice', type: 'practice', color: '#10B981' }
    ],
    'Wednesday': [
      { time: '6:00-8:00', subject: 'Chemistry', topic: 'Organic Chemistry', type: 'study', color: '#10B981' },
      { time: '16:00-18:00', subject: 'Biology', topic: 'Human Physiology', type: 'study', color: '#F59E0B' },
      { time: '19:00-20:00', subject: 'Physics', topic: 'Problem Solving', type: 'practice', color: '#8B5CF6' }
    ],
    'Thursday': [
      { time: '6:00-8:00', subject: 'Physics', topic: 'Electromagnetism', type: 'study', color: '#8B5CF6' },
      { time: '16:00-18:00', subject: 'Chemistry', topic: 'Inorganic Chemistry', type: 'study', color: '#10B981' },
      { time: '20:00-21:00', subject: 'Biology', topic: 'Mock Test', type: 'test', color: '#F59E0B' }
    ],
    'Friday': [
      { time: '6:00-8:00', subject: 'Biology', topic: 'Botany Revision', type: 'revision', color: '#F59E0B' },
      { time: '16:00-18:00', subject: 'Physics', topic: 'Optics', type: 'study', color: '#8B5CF6' },
      { time: '19:00-20:00', subject: 'Chemistry', topic: 'Revision', type: 'revision', color: '#10B981' }
    ],
    'Saturday': [
      { time: '9:00-12:00', subject: 'Mock Test', topic: 'Full NEET Mock', type: 'test', color: '#6B7280' },
      { time: '16:00-18:00', subject: 'Weak Areas', topic: 'Chemistry Focus', type: 'study', color: '#EF4444' }
    ],
    'Sunday': [
      { time: '10:00-12:00', subject: 'Revision', topic: 'Previous Week Topics', type: 'revision', color: '#8B5CF6' },
      { time: '16:00-17:00', subject: 'Planning', topic: 'Next Week Prep', type: 'planning', color: '#6B7280' }
    ]
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return <BookOpen className="h-3 w-3" />;
      case 'practice': return <Clock className="h-3 w-3" />;
      case 'test': return <Calendar className="h-3 w-3" />;
      default: return <BookOpen className="h-3 w-3" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      'study': 'default',
      'practice': 'secondary',
      'revision': 'outline',
      'test': 'destructive',
      'planning': 'secondary'
    } as const;
    
    return <Badge variant={variants[type as keyof typeof variants] || 'default'} className="text-xs">
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            NEET 2026 Weekly Schedule
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Optimized study schedule for Physics, Chemistry, and Biology
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {weekDays.map((day) => (
              <Card key={day} className="border-l-4" style={{ borderLeftColor: day === 'Sunday' ? '#EF4444' : '#3B82F6' }}>
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-center">{day}</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  {schedule[day as keyof typeof schedule]?.map((session, index) => (
                    <div key={index} className="p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">{session.time}</span>
                        {getTypeBadge(session.type)}
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: session.color }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">{session.subject}</div>
                          <div className="text-xs text-gray-600 truncate">{session.topic}</div>
                        </div>
                        {getTypeIcon(session.type)}
                      </div>
                    </div>
                  )) || (
                    <div className="text-center text-sm text-gray-500 py-4">
                      No sessions scheduled
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklySchedule;
