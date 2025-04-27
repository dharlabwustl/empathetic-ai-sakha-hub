
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TopicsList = () => {
  // Mock data for topics
  const topics = [
    { id: '1', name: 'Newton\'s Laws of Motion', progress: 85, status: 'Mastered' },
    { id: '2', name: 'Chemical Bonding', progress: 60, status: 'In Progress' },
    { id: '3', name: 'Calculus: Integration', progress: 45, status: 'In Progress' },
    { id: '4', name: 'DNA & RNA Structure', progress: 30, status: 'Started' }
  ];

  return (
    <div className="space-y-4">
      {topics.map(topic => (
        <Card key={topic.id}>
          <CardHeader className="py-3">
            <CardTitle className="text-base font-medium">{topic.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">{topic.status}</span>
              <span className="text-sm font-medium">{topic.progress}%</span>
            </div>
            <Progress value={topic.progress} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopicsList;
