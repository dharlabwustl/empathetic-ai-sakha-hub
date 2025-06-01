
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface StudyTimelineProps {
  subjects: StudyPlanSubject[];
  examDate: string;
}

const StudyTimeline: React.FC<StudyTimelineProps> = ({ subjects, examDate }) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
  
  const generateTimeline = () => {
    const exam = new Date(examDate);
    const now = new Date();
    const totalWeeks = Math.ceil((exam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 7));
    
    const timeline = [];
    
    for (let i = 0; i < Math.min(totalWeeks, 24); i++) {
      const weekStart = new Date(now.getTime() + (i * 7 * 24 * 60 * 60 * 1000));
      const weekEnd = new Date(weekStart.getTime() + (6 * 24 * 60 * 60 * 1000));
      
      timeline.push({
        week: i + 1,
        startDate: weekStart,
        endDate: weekEnd,
        subjects: subjects.map(subject => ({
          ...subject,
          plannedHours: subject.hoursPerWeek,
          topics: subject.topics?.slice(0, 2) || []
        }))
      });
    }
    
    return timeline;
  };

  const timeline = generateTimeline();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Study Timeline
            </CardTitle>
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
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeline.slice(0, viewMode === 'weekly' ? 4 : 12).map((week) => (
              <Card key={week.week} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">Week {week.week}</h4>
                      <p className="text-sm text-muted-foreground">
                        {week.startDate.toLocaleDateString()} - {week.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Total Hours</div>
                      <div className="font-semibold">
                        {week.subjects.reduce((sum, s) => sum + s.plannedHours, 0)}h
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {week.subjects.map((subject) => (
                      <div key={subject.id} className="p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: subject.color }}
                          />
                          <span className="font-medium text-sm">{subject.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {subject.plannedHours}h
                          </Badge>
                        </div>
                        
                        <div className="space-y-1">
                          {subject.topics.map((topic) => (
                            <div key={topic.id} className="flex items-center gap-1 text-xs">
                              <BookOpen className="h-3 w-3" />
                              <span className="truncate">{topic.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {timeline.length > (viewMode === 'weekly' ? 4 : 12) && (
            <div className="text-center pt-4">
              <Button variant="outline">
                View Complete Timeline ({timeline.length} weeks)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTimeline;
