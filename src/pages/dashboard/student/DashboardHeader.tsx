
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { 
  Smile,
  Frown,
  Meh,
  Zap,
  Brain,
  Clock,
  CalendarIcon,
  Calendar
} from 'lucide-react';

interface DashboardHeaderProps {
  userProfile: any;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange
}) => {
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  
  const handleMoodSelect = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    setShowMoodSelector(false);
  };
  
  const getMoodIcon = (mood?: MoodType) => {
    switch (mood) {
      case MoodType.Happy:
      case MoodType.Motivated:
      case MoodType.Focused:
        return <Smile className="h-5 w-5 text-green-500" />;
      case MoodType.Tired:
      case MoodType.Stressed:
      case MoodType.Overwhelmed:
      case MoodType.Anxious:
        return <Frown className="h-5 w-5 text-red-500" />;
      default:
        return <Meh className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  const getMoodText = (mood?: MoodType) => {
    if (!mood) return "How are you feeling?";
    return mood.toString();
  };

  return (
    <div className="w-full">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-wrap justify-between gap-4 items-center">
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-bold">
                Hello, {userProfile.name || 'Student'}!
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Calendar className="mr-1 h-4 w-4" /> {formattedDate}
              </p>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowMoodSelector(!showMoodSelector)}
                  className="flex items-center gap-2"
                >
                  {getMoodIcon(currentMood)}
                  <span className="hidden sm:inline">{getMoodText(currentMood)}</span>
                </Button>
                
                {showMoodSelector && (
                  <Card className="absolute top-full right-0 mt-2 z-50 w-64">
                    <CardContent className="p-3">
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMoodSelect(MoodType.Motivated)}
                          className="flex flex-col gap-1 h-auto py-2"
                        >
                          <Zap className="h-5 w-5 text-yellow-500" />
                          <span className="text-xs">Motivated</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMoodSelect(MoodType.Focused)} 
                          className="flex flex-col gap-1 h-auto py-2"
                        >
                          <Brain className="h-5 w-5 text-blue-500" />
                          <span className="text-xs">Focused</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMoodSelect(MoodType.Happy)}
                          className="flex flex-col gap-1 h-auto py-2"
                        >
                          <Smile className="h-5 w-5 text-green-500" />
                          <span className="text-xs">Happy</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMoodSelect(MoodType.Tired)}
                          className="flex flex-col gap-1 h-auto py-2"
                        >
                          <Clock className="h-5 w-5 text-orange-500" />
                          <span className="text-xs">Tired</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMoodSelect(MoodType.Stressed)}
                          className="flex flex-col gap-1 h-auto py-2"
                        >
                          <Frown className="h-5 w-5 text-red-500" />
                          <span className="text-xs">Stressed</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMoodSelect(MoodType.Overwhelmed)}
                          className="flex flex-col gap-1 h-auto py-2"
                        >
                          <Meh className="h-5 w-5 text-purple-500" />
                          <span className="text-xs">Overwhelmed</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <Button 
                variant="default" 
                size="sm" 
                onClick={onViewStudyPlan}
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
              >
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Study Plan</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHeader;
