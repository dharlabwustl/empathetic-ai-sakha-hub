
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, ArrowUpRight, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  progress: number;
  masteryLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  lastPracticed?: string;
}

interface TopicsListProps {
  topics: Topic[];
  title?: string;
  limit?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const TopicsList: React.FC<TopicsListProps> = ({
  topics = [],
  title = "Topics In Progress",
  limit = 5,
  showViewAll = true,
  onViewAll
}) => {
  const [filter, setFilter] = useState<'all' | 'inProgress' | 'completed'>('inProgress');
  
  // If no topics provided, use mock data
  const displayTopics = topics.length > 0 ? topics : [
    {
      id: "topic1",
      name: "Newton's Laws of Motion",
      completed: false,
      progress: 75,
      masteryLevel: 'intermediate',
      lastPracticed: '2 days ago'
    },
    {
      id: "topic2",
      name: "Chemical Bonding",
      completed: true,
      progress: 100,
      masteryLevel: 'advanced',
      lastPracticed: '1 week ago'
    },
    {
      id: "topic3",
      name: "Calculus: Integration Methods",
      completed: false,
      progress: 50,
      masteryLevel: 'beginner',
      lastPracticed: 'yesterday'
    },
    {
      id: "topic4",
      name: "Organic Chemistry: Functional Groups",
      completed: false,
      progress: 30,
      masteryLevel: 'beginner',
      lastPracticed: '3 days ago'
    }
  ];
  
  // Filter topics based on the selected filter
  const filteredTopics = displayTopics.filter(topic => {
    if (filter === 'all') return true;
    if (filter === 'completed') return topic.completed;
    return !topic.completed;
  });
  
  // Limit the number of topics to display
  const limitedTopics = filteredTopics.slice(0, limit);
  
  // Get badge color based on mastery level
  const getBadgeColor = (masteryLevel: string) => {
    switch (masteryLevel) {
      case 'beginner':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'intermediate':
        return "bg-green-100 text-green-800 border-green-200";
      case 'advanced':
        return "bg-purple-100 text-purple-800 border-purple-200";
      case 'expert':
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button 
              size="sm" 
              variant={filter === 'all' ? "default" : "ghost"} 
              className="text-xs h-7"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              size="sm" 
              variant={filter === 'inProgress' ? "default" : "ghost"} 
              className="text-xs h-7"
              onClick={() => setFilter('inProgress')}
            >
              In Progress
            </Button>
            <Button 
              size="sm" 
              variant={filter === 'completed' ? "default" : "ghost"} 
              className="text-xs h-7"
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {limitedTopics.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No topics found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {limitedTopics.map((topic) => (
              <div key={topic.id} className="border rounded-md p-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{topic.name}</h3>
                  {topic.masteryLevel && (
                    <Badge variant="outline" className={getBadgeColor(topic.masteryLevel)}>
                      {topic.masteryLevel.charAt(0).toUpperCase() + topic.masteryLevel.slice(1)}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Progress value={topic.progress} className="flex-1 h-2" />
                  <span className="text-sm font-medium">
                    {topic.progress}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    {topic.lastPracticed && (
                      <>
                        <span>Last practiced: {topic.lastPracticed}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    {topic.completed ? (
                      <Button size="sm" variant="ghost" className="h-8">
                        <Check className="h-4 w-4 mr-1 text-green-500" />
                        Complete
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="h-8">
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {showViewAll && filteredTopics.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-3 text-sm" 
            onClick={onViewAll}
          >
            View all topics
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TopicsList;
