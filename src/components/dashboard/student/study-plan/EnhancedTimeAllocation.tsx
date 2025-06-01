
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, AlertTriangle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface EnhancedTimeAllocationProps {
  subjects: StudyPlanSubject[];
  weeklyTotal: number;
  onSave: (allocations: StudyPlanSubject[]) => void;
}

const EnhancedTimeAllocation: React.FC<EnhancedTimeAllocationProps> = ({
  subjects: initialSubjects,
  weeklyTotal,
  onSave
}) => {
  const [subjects, setSubjects] = useState(initialSubjects);
  
  const totalAllocated = subjects.reduce((sum, subject) => sum + subject.hoursPerWeek, 0);
  const remaining = weeklyTotal - totalAllocated;

  const updateSubjectHours = (subjectId: string, hours: number) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, hoursPerWeek: hours, weeklyHours: hours }
        : subject
    ));
  };

  const getRecommendedHours = (subject: StudyPlanSubject) => {
    if (subject.isWeakSubject) return Math.ceil(weeklyTotal * 0.4); // 40% for weak subjects
    if (subject.proficiency === 'strong') return Math.ceil(weeklyTotal * 0.25); // 25% for strong
    return Math.ceil(weeklyTotal * 0.3); // 30% for medium
  };

  const applyRecommendations = () => {
    const newSubjects = subjects.map(subject => ({
      ...subject,
      hoursPerWeek: getRecommendedHours(subject),
      weeklyHours: getRecommendedHours(subject)
    }));
    setSubjects(newSubjects);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Time Allocation for NEET 2026
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={applyRecommendations}>
                Apply AI Recommendations
              </Button>
              <Button onClick={() => onSave(subjects)}>
                Save Changes
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Total: {totalAllocated}/{weeklyTotal} hours</span>
            <span className={remaining < 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
              {remaining >= 0 ? `${remaining}h remaining` : `${Math.abs(remaining)}h over limit`}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjects.map((subject) => (
              <div key={subject.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: subject.color }}
                    />
                    <div>
                      <h4 className="font-medium">{subject.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {subject.isWeakSubject && (
                          <Badge variant="destructive" className="text-xs">Weak Subject</Badge>
                        )}
                        <Badge 
                          variant={subject.proficiency === 'strong' ? 'default' : 'secondary'} 
                          className="text-xs"
                        >
                          {subject.proficiency}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Recommended: {getRecommendedHours(subject)}h
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">{subject.hoursPerWeek}h</div>
                    <div className="text-xs text-muted-foreground">per week</div>
                  </div>
                </div>
                
                <Slider
                  value={[subject.hoursPerWeek]}
                  onValueChange={(value) => updateSubjectHours(subject.id, value[0])}
                  max={25}
                  min={3}
                  step={1}
                  className="w-full"
                />
                
                {/* Topic breakdown */}
                {subject.topics && (
                  <div className="ml-4 space-y-2">
                    <h5 className="text-sm font-medium text-muted-foreground">Topic Distribution:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subject.topics.map((topic) => {
                        const topicHours = Math.round((topic.hoursAllocated || 0) / 10);
                        return (
                          <div key={topic.id} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded">
                            <span className="truncate">{topic.name}</span>
                            <div className="flex items-center gap-2 ml-2">
                              <span className="font-medium">{topicHours}h</span>
                              <Badge 
                                variant={topic.status === 'completed' ? 'default' : 
                                        topic.status === 'in-progress' ? 'secondary' : 'outline'} 
                                className="text-xs"
                              >
                                {topic.progressPercent}%
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Summary Section */}
            <div className="border-t pt-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Target className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-medium">Weekly Target</div>
                  <div className="text-xl font-bold text-blue-600">{weeklyTotal}h</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-1 text-green-600" />
                  <div className="text-sm font-medium">Allocated</div>
                  <div className="text-xl font-bold text-green-600">{totalAllocated}h</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-orange-600" />
                  <div className="text-sm font-medium">Weak Subjects</div>
                  <div className="text-xl font-bold text-orange-600">
                    {subjects.filter(s => s.isWeakSubject).length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTimeAllocation;
