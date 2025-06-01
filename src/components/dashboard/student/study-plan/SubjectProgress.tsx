
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Clock } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface SubjectProgressProps {
  subjects: StudyPlanSubject[];
}

const SubjectProgress: React.FC<SubjectProgressProps> = ({ subjects }) => {
  return (
    <div className="space-y-6">
      {subjects.map((subject) => (
        <Card key={subject.id} className="border-l-4" style={{ borderLeftColor: subject.color }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: subject.color }}
                />
                {subject.name}
              </CardTitle>
              <div className="flex gap-2">
                {subject.isWeakSubject && (
                  <Badge variant="destructive" className="text-xs">Needs Focus</Badge>
                )}
                <Badge variant={subject.proficiency === 'strong' ? 'default' : 'secondary'} className="text-xs">
                  {subject.proficiency.charAt(0).toUpperCase() + subject.proficiency.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Overall Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-3" />
              </div>
              
              {/* Weekly Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                  <div className="text-xs font-medium">Weekly Hours</div>
                  <div className="text-lg font-bold text-blue-600">{subject.weeklyHours}h</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Target className="h-4 w-4 mx-auto mb-1 text-green-600" />
                  <div className="text-xs font-medium">Priority</div>
                  <div className="text-lg font-bold text-green-600 capitalize">{subject.priority}</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <TrendingUp className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                  <div className="text-xs font-medium">Topics</div>
                  <div className="text-lg font-bold text-purple-600">
                    {subject.topics?.filter(t => t.completed).length || 0}/{subject.topics?.length || 0}
                  </div>
                </div>
              </div>
              
              {/* Topic Progress */}
              {subject.topics && (
                <div>
                  <h4 className="font-medium mb-3">Topic Progress</h4>
                  <div className="space-y-3">
                    {subject.topics.map((topic) => (
                      <div key={topic.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{topic.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={topic.status === 'completed' ? 'default' : 
                                      topic.status === 'in-progress' ? 'secondary' : 'outline'} 
                              className="text-xs"
                            >
                              {topic.status?.replace('-', ' ')}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {topic.progressPercent || 0}%
                            </span>
                          </div>
                        </div>
                        <Progress value={topic.progressPercent || 0} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Allocated: {topic.hoursAllocated || 0}h</span>
                          <span>
                            {topic.priority && (
                              <Badge variant="outline" className="text-xs">
                                {topic.priority} priority
                              </Badge>
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubjectProgress;
