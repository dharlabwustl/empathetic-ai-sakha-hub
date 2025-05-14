
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Bookmark, CheckCircle } from "lucide-react";

const MindfulnessTab = () => {
  const mindfulnessActivities = [
    {
      id: '1',
      title: 'Deep Breathing Exercise',
      duration: '5 min',
      description: 'A guided breathing exercise to help you calm your mind and reduce anxiety.',
      completed: true,
      bookmarked: true,
    },
    {
      id: '2',
      title: 'Exam Day Visualization',
      duration: '10 min',
      description: 'Visualize yourself succeeding on your exam day with confidence and clarity.',
      completed: false,
      bookmarked: false,
    },
    {
      id: '3',
      title: 'Quick Stress Relief',
      duration: '3 min',
      description: 'A short mindfulness practice for moments when you feel overwhelmed.',
      completed: false,
      bookmarked: true,
    }
  ];
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Take short breaks for mindfulness to improve focus and reduce exam anxiety.
      </p>
      
      {mindfulnessActivities.map((activity) => (
        <Card key={activity.id} className="overflow-hidden border-gray-200 hover:border-indigo-200 dark:border-gray-700 dark:hover:border-indigo-900 transition-colors">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                {activity.title}
                {activity.completed && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </CardTitle>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{activity.duration}</span>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-full ${activity.bookmarked ? 'text-amber-500' : ''}`}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              {activity.description}
            </p>
            <Button className="w-full" size="sm">
              <Play className="h-4 w-4 mr-2" /> Start Session
            </Button>
          </CardContent>
        </Card>
      ))}
      
      <div className="text-center pt-2">
        <Button variant="outline" className="w-full">
          Explore More Activities
        </Button>
      </div>
    </div>
  );
};

export default MindfulnessTab;
