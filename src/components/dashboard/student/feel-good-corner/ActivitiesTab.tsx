
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActivitiesTabProps {
  mood: string;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ mood }) => {
  const activities = [
    { title: "5-Minute Meditation", description: "Clear your mind with a quick meditation session", duration: "5 min" },
    { title: "Study Break Walk", description: "Take a refreshing walk to boost energy", duration: "10 min" },
    { title: "Quick Workout", description: "Get your blood flowing with light exercises", duration: "15 min" },
    { title: "Breathing Exercise", description: "Practice deep breathing to reduce stress", duration: "3 min" }
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {activities.map((activity, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{activity.title}</CardTitle>
            <CardDescription>{activity.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{activity.duration}</span>
              <Button size="sm">Start</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ActivitiesTab;
