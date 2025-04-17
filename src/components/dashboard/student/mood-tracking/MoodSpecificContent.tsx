
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";
import { getMoodToastContent } from "./moodUtils";

interface MoodSpecificContentProps {
  currentMood: MoodType;
}

const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({ currentMood }) => {
  // Get content based on mood
  const { message } = getMoodToastContent(currentMood);
  
  // Mood-specific recommendations
  const getMoodRecommendations = () => {
    switch (currentMood) {
      case 'happy':
        return {
          actions: ["Take on challenging problems", "Help peers with difficult concepts", "Try advanced topics"],
          resources: ["Advanced problem sets", "Research papers", "Competition prep materials"]
        };
      case 'motivated':
        return {
          actions: ["Create a study schedule", "Set specific goals", "Track your progress"],
          resources: ["Productivity templates", "Goal-setting guides", "Progress trackers"]
        };
      case 'curious':
        return {
          actions: ["Explore new topics", "Connect concepts across subjects", "Ask deeper questions"],
          resources: ["Interdisciplinary readings", "Exploratory videos", "Discussion forums"]
        };
      case 'focused':
        return {
          actions: ["Deep work session", "Complete challenging assignments", "Practice exam questions"],
          resources: ["Pomodoro timer", "Distraction blockers", "Practice exams"]
        };
      case 'okay':
      case 'neutral':
        return {
          actions: ["Review recent material", "Organize notes", "Practice medium-difficulty problems"],
          resources: ["Note templates", "Flashcards", "Review guides"]
        };
      case 'tired':
        return {
          actions: ["Take a short break", "Try easier topics", "Use active learning methods"],
          resources: ["Short video lessons", "Easy practice problems", "Guided tutorials"]
        };
      case 'stressed':
      case 'overwhelmed':
        return {
          actions: ["Break tasks into smaller steps", "Focus on one concept at a time", "Use relaxation techniques"],
          resources: ["Stress management guides", "Breathing exercises", "Simplified study sheets"]
        };
      case 'sad':
        return {
          actions: ["Take a wellness break", "Try a different subject", "Connect with a study buddy"],
          resources: ["Mood-lifting activities", "Inspirational student stories", "Community forums"]
        };
      default:
        return {
          actions: ["Review your study plan", "Practice with interactive materials", "Take a quick assessment"],
          resources: ["Study guides", "Interactive quizzes", "Video lessons"]
        };
    }
  };
  
  const { actions, resources } = getMoodRecommendations();
  
  return (
    <Card className={`mt-4 border-t-4 border-t-${getMoodColor(currentMood)}-500`}>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-2">Based on your {message.toLowerCase().replace("you're feeling ", "")}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-medium text-sm text-gray-600 mb-2">Recommended Actions</h4>
            <ul className="list-disc pl-5 space-y-1">
              {actions.map((action, index) => (
                <li key={index} className="text-sm">{action}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-600 mb-2">Helpful Resources</h4>
            <ul className="list-disc pl-5 space-y-1">
              {resources.map((resource, index) => (
                <li key={index} className="text-sm">{resource}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">View All Recommendations</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get color based on mood
const getMoodColor = (mood: MoodType): string => {
  switch (mood) {
    case 'happy':
    case 'motivated':
      return 'green';
    case 'curious':
    case 'focused':
      return 'blue';
    case 'okay':
    case 'neutral':
      return 'yellow';
    case 'tired':
      return 'orange';
    case 'stressed':
    case 'overwhelmed':
    case 'sad':
      return 'red';
    default:
      return 'blue';
  }
};

export default MoodSpecificContent;
