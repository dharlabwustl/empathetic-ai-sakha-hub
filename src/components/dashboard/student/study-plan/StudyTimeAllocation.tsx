
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { StudyPlanSubject } from '@/types/user/studyPlan';
import { Clock, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface StudyTimeAllocationProps {
  weeklyTotal: number;
  onSave: (allocations: StudyPlanSubject[]) => void;
}

const StudyTimeAllocation: React.FC<StudyTimeAllocationProps> = ({ weeklyTotal, onSave }) => {
  const [subjects, setSubjects] = useState<StudyPlanSubject[]>([
    {
      id: 'physics',
      name: 'Physics',
      color: '#8B5CF6',
      hoursPerWeek: 15,
      weeklyHours: 15,
      progress: 45,
      priority: 'high',
      proficiency: 'medium',
      completed: false,
      isWeakSubject: false,
      topics: [
        { id: 'mechanics', name: 'Mechanics', completed: false, status: 'in-progress', hoursAllocated: 4 },
        { id: 'thermodynamics', name: 'Thermodynamics', completed: false, status: 'not-started', hoursAllocated: 3 },
        { id: 'electromagnetism', name: 'Electromagnetism', completed: false, status: 'not-started', hoursAllocated: 4 },
        { id: 'optics', name: 'Optics', completed: false, status: 'not-started', hoursAllocated: 2 },
        { id: 'modern-physics', name: 'Modern Physics', completed: false, status: 'not-started', hoursAllocated: 2 }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      color: '#10B981',
      hoursPerWeek: 12,
      weeklyHours: 12,
      progress: 35,
      priority: 'medium',
      proficiency: 'weak',
      completed: false,
      isWeakSubject: true,
      topics: [
        { id: 'physical-chemistry', name: 'Physical Chemistry', completed: false, status: 'in-progress', hoursAllocated: 4 },
        { id: 'organic-chemistry', name: 'Organic Chemistry', completed: false, status: 'not-started', hoursAllocated: 4 },
        { id: 'inorganic-chemistry', name: 'Inorganic Chemistry', completed: false, status: 'not-started', hoursAllocated: 4 }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      color: '#F59E0B',
      hoursPerWeek: 13,
      weeklyHours: 13,
      progress: 60,
      priority: 'high',
      proficiency: 'strong',
      completed: false,
      isWeakSubject: false,
      topics: [
        { id: 'botany', name: 'Botany', completed: true, status: 'completed', hoursAllocated: 6 },
        { id: 'zoology', name: 'Zoology', completed: false, status: 'in-progress', hoursAllocated: 4 },
        { id: 'human-physiology', name: 'Human Physiology', completed: false, status: 'not-started', hoursAllocated: 3 }
      ]
    }
  ]);

  const totalAllocated = subjects.reduce((sum, subject) => sum + subject.hoursPerWeek, 0);

  const updateSubjectHours = (subjectId: string, hours: number) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, hoursPerWeek: hours, weeklyHours: hours }
        : subject
    ));
  };

  const getSubjectStatusBadge = (subject: StudyPlanSubject) => {
    if (subject.isWeakSubject) {
      return <Badge variant="destructive" className="text-xs">Weak Subject</Badge>;
    }
    if (subject.proficiency === 'strong') {
      return <Badge variant="default" className="text-xs bg-green-100 text-green-700">Strong Subject</Badge>;
    }
    return <Badge variant="secondary" className="text-xs">Medium</Badge>;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Weekly Time Allocation for NEET 2026
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Exam Date: May 3, 2026 • Total Weekly Hours: {totalAllocated}/{weeklyTotal}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjects.map((subject) => (
              <div key={subject.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: subject.color }}
                    />
                    <div>
                      <h4 className="font-medium">{subject.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {getSubjectStatusBadge(subject)}
                        <span className={`text-xs ${getPriorityColor(subject.priority)}`}>
                          {subject.priority.toUpperCase()} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{subject.hoursPerWeek}h/week</div>
                    <div className="text-xs text-muted-foreground">
                      Progress: {subject.progress}%
                    </div>
                  </div>
                </div>
                
                <Slider
                  value={[subject.hoursPerWeek]}
                  onValueChange={(value) => updateSubjectHours(subject.id, value[0])}
                  max={25}
                  min={5}
                  step={1}
                  className="w-full"
                />
                
                {/* Topic breakdown */}
                {subject.topics && (
                  <div className="ml-4 space-y-2">
                    <h5 className="text-sm font-medium text-muted-foreground">Topics:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subject.topics.map((topic) => (
                        <div key={topic.id} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                          <span>{topic.name}</span>
                          <div className="flex items-center gap-2">
                            <span>{topic.hoursAllocated}h</span>
                            <Badge 
                              variant={topic.status === 'completed' ? 'default' : topic.status === 'in-progress' ? 'secondary' : 'outline'} 
                              className="text-xs"
                            >
                              {topic.status?.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Summary */}
            <div className="border-t pt-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Target className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-medium">Total Allocated</div>
                  <div className="text-lg font-bold text-blue-600">{totalAllocated}h</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <div className="text-sm font-medium">Days to NEET</div>
                  <div className="text-lg font-bold text-green-600">
                    {Math.ceil((new Date('2026-05-03').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                  <div className="text-sm font-medium">Weak Subjects</div>
                  <div className="text-lg font-bold text-orange-600">
                    {subjects.filter(s => s.isWeakSubject).length}
                  </div>
                </div>
              </div>
            </div>
            
            <Button onClick={() => onSave(subjects)} className="w-full">
              Save Time Allocation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTimeAllocation;
