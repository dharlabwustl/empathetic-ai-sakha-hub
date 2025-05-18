
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, Clock, Sparkles, 
  ListFilter, Grid2X2, List 
} from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface PlanHeaderProps {
  planData: any;
  activeView: string;
  setActiveView: (view: string) => void;
  currentMood?: MoodType;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({ 
  planData, 
  activeView,
  setActiveView,
  currentMood
}) => {
  if (!planData) return null;
  
  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Get time estimate in hours and minutes
  const getTotalTime = () => {
    if (!planData.totalMinutes) return '0h 0m';
    const hours = Math.floor(planData.totalMinutes / 60);
    const minutes = planData.totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };
  
  // Generate a message based on the user's mood
  const getMoodBasedMessage = () => {
    if (!currentMood) return null;
    
    switch(currentMood) {
      case MoodType.TIRED:
        return "Your plan has lighter tasks today to prevent burnout.";
      case MoodType.STRESSED:
      case MoodType.ANXIOUS:
        return "Today focuses on review topics to help build confidence.";
      case MoodType.FOCUSED:
      case MoodType.MOTIVATED:
        return "Great energy today! We've included more challenging concepts.";
      default:
        return null;
    }
  };
  
  const moodMessage = getMoodBasedMessage();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">{formattedDate}</span>
            
            {planData.isCustomized && (
              <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">
                <Sparkles className="h-3 w-3 mr-1" />
                Personalized
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mt-1">Today's Study Plan</h1>
          
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated time: {getTotalTime()}</span>
            <span className="mx-2">•</span>
            <span>{planData.totalTasks || 0} tasks</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md flex">
            <Button 
              variant={activeView === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setActiveView("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button 
              variant={activeView === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setActiveView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ListFilter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </div>
      </div>
      
      {moodMessage && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-blue-700 text-sm">
          <p className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
            <span>{moodMessage}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanHeader;
