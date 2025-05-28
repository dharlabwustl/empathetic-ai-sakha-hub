
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface TopicBreakdownCardProps {
  subject: StudyPlanSubject;
}

const TopicBreakdownCard: React.FC<TopicBreakdownCardProps> = ({ subject }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const completedTopics = subject.topics?.filter(topic => topic.completed).length || 0;
  const totalTopics = subject.topics?.length || 0;
  const completionPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  return (
    <Card className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: subject.color }}
                />
                <CardTitle className="text-lg">{subject.name}</CardTitle>
                <Badge variant="outline" className={getPriorityColor(subject.priority)}>
                  {subject.priority} priority
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {completedTopics}/{totalTopics} topics
                </span>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
            <div className="mt-2">
              <Progress value={completionPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{subject.proficiency} proficiency</span>
                <span>{Math.round(completionPercentage)}% complete</span>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {subject.topics?.map((topic, index) => (
                <div 
                  key={topic.id} 
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(topic.status || 'pending')}
                    <div>
                      <div className="font-medium">{topic.name}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            topic.difficulty === 'hard' ? 'bg-red-50 text-red-700' :
                            topic.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-green-50 text-green-700'
                          }`}
                        >
                          {topic.difficulty}
                        </Badge>
                        {topic.priority && (
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(topic.priority)}`}>
                            {topic.priority}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={topic.completed ? "outline" : "default"}
                    size="sm"
                    className="text-xs"
                  >
                    {topic.completed ? "Review" : "Start"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default TopicBreakdownCard;
