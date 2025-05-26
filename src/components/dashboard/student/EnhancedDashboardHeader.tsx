
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfileType, MoodType } from '@/types/user/base';
import { Smile, Sun, Cloud, Zap, Coffee, Target, Calendar, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan?: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents?: Array<{
    title: string;
    time: string;
    type: "exam" | "task" | "revision";
  }>;
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange,
  upcomingEvents = []
}) => {
  const moodIcons = {
    [MoodType.HAPPY]: { icon: <Smile className="h-4 w-4" />, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    [MoodType.MOTIVATED]: { icon: <Zap className="h-4 w-4" />, color: 'text-blue-600', bg: 'bg-blue-50' },
    [MoodType.FOCUSED]: { icon: <Target className="h-4 w-4" />, color: 'text-green-600', bg: 'bg-green-50' },
    [MoodType.RELAXED]: { icon: <Coffee className="h-4 w-4" />, color: 'text-purple-600', bg: 'bg-purple-50' },
    [MoodType.STRESSED]: { icon: <Cloud className="h-4 w-4" />, color: 'text-gray-600', bg: 'bg-gray-50' },
    [MoodType.ENERGETIC]: { icon: <Sun className="h-4 w-4" />, color: 'text-orange-600', bg: 'bg-orange-50' }
  };

  const currentMoodData = currentMood ? moodIcons[currentMood] : moodIcons[MoodType.MOTIVATED];
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Card className="bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30 border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* User Info and Greeting */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
              <AvatarImage src={userProfile.avatar || userProfile.photoURL} alt={userProfile.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold">
                {userProfile.name?.charAt(0) || userProfile.firstName?.charAt(0) || 'S'}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  {getGreeting()}, {userProfile.firstName || userProfile.name?.split(' ')[0] || 'Student'}!
                </h1>
                {currentMood && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`p-2 rounded-full ${currentMoodData.bg}`}
                  >
                    <div className={currentMoodData.color}>
                      {currentMoodData.icon}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formattedTime}</span>
                </div>
              </div>
              
              {/* NEET 2026 Progress Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1">
                  🏆 NEET 2026 Champion Track - 75% Ready
                </Badge>
              </motion.div>
            </div>
          </div>

          {/* Smart Daily Suggestions - Now positioned prominently */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-auto"
          >
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  <h3 className="font-semibold text-indigo-800">Today's Smart Suggestions</h3>
                </div>
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-2 p-2 bg-white rounded border border-indigo-100"
                  >
                    <Zap className="h-3 w-3 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Focus on Physics Thermodynamics - your weakest area</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-2 p-2 bg-white rounded border border-indigo-100"
                  >
                    <Target className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Take mock test - you're ready for Chemistry</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-start gap-2 p-2 bg-white rounded border border-indigo-100"
                  >
                    <Coffee className="h-3 w-3 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Take a 15-min break after 2 hours of study</span>
                  </motion.div>
                </div>
                
                {onViewStudyPlan && (
                  <motion.div
                    className="mt-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={onViewStudyPlan}
                      size="sm" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      View Full Study Plan
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedDashboardHeader;
