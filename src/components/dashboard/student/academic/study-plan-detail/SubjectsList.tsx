
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface SubjectsListProps {
  subjects: StudyPlanSubject[];
}

const SubjectsList: React.FC<SubjectsListProps> = ({ subjects }) => {
  // Sort subjects by progress (highest to lowest)
  const sortedSubjects = [...subjects].sort((a, b) => b.progress - a.progress);
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Subjects Overview</h3>
      
      <div className="space-y-4">
        {sortedSubjects.map((subject) => (
          <Card key={subject.name} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                  <h4 className="font-medium text-lg">{subject.name}</h4>
                  <Badge 
                    variant={
                      subject.proficiency === 'strong' ? 'default' : 
                      subject.proficiency === 'moderate' ? 'secondary' : 'outline'
                    }
                    className="ml-2"
                  >
                    {subject.proficiency}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{subject.progress}%</span>
                </div>
              </div>
              
              <Progress 
                value={subject.progress} 
                className="h-2 mb-4" 
              />
              
              {subject.topics && subject.topics.length > 0 ? (
                <div>
                  <h5 className="text-sm font-medium mb-2">Topics</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {subject.topics.map((topic) => (
                      <div 
                        key={topic.id} 
                        className={`
                          p-3 rounded-md border 
                          ${topic.status === 'completed' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 
                            topic.status === 'in_progress' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 
                            'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}
                        `}
                      >
                        <div className="text-sm font-medium">{topic.name}</div>
                        <div className="flex items-center justify-between mt-1">
                          <Badge 
                            variant="outline" 
                            className={`
                              text-xs
                              ${topic.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                                topic.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 
                                'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}
                            `}
                          >
                            {topic.status === 'in_progress' ? 'In Progress' : 
                             topic.status === 'completed' ? 'Completed' : 
                             'Not Started'}
                          </Badge>
                          
                          {topic.priority && (
                            <Badge 
                              variant="outline" 
                              className={`
                                text-xs ml-1
                                ${topic.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 
                                  topic.priority === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' : 
                                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'}
                              `}
                            >
                              {topic.priority}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No topics added yet.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectsList;
