
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileType } from '@/types/user/base';
import { Brain, Edit, Clock, Focus, Sparkles, Calendar, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface LearningProfileSectionProps {
  userProfile: UserProfileType;
}

const LearningProfileSection: React.FC<LearningProfileSectionProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  // Extract learning preferences
  const personalityType = userProfile.personalityType || 'Analytical learner';
  const studyPace = userProfile.studyPreferences?.pace || 'Moderate';
  const hoursPerDay = userProfile.studyPreferences?.hoursPerDay || 4;
  const preferredStartTime = userProfile.studyPreferences?.preferredTimeStart || '18:00';
  const preferredEndTime = userProfile.studyPreferences?.preferredTimeEnd || '22:00';
  const preferredStudyType = userProfile.studyPreferences?.preferenceType || 'Solo';
  
  const calculateStudyHoursPerWeek = () => {
    const dailyHours = hoursPerDay || 3;
    return dailyHours * 5; // Assuming 5 study days per week
  };
  
  const calculateTotalStudyHours = () => {
    const avgDailyHours = hoursPerDay || 3;
    const studyDaysPerWeek = 5;
    const weeksStudying = 12; // Mock value - in a real app would come from actual tracking
    return avgDailyHours * studyDaysPerWeek * weeksStudying;
  };
  
  const weeklyHours = calculateStudyHoursPerWeek();
  const totalHours = calculateTotalStudyHours();
  
  const handleEditProfile = () => {
    navigate('/dashboard/student/academic');
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-500" />
            <span>Learning Profile</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={handleEditProfile}
          >
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30 overflow-hidden">
          {/* Primary learning style banner */}
          <div className="p-4 border-b border-indigo-100 dark:border-indigo-800/30">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 mb-2">
                  Primary Style
                </Badge>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  {personalityType}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  AI-personalized study plan based on your learning preferences
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{totalHours}</div>
                <div className="text-xs text-gray-500">Total Hours</div>
              </div>
            </div>
          </div>
          
          {/* Learning preferences grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 p-4 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Daily Hours
              </div>
              <div className="font-medium">{hoursPerDay} hours/day</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Weekly Hours
              </div>
              <div className="font-medium">{weeklyHours} hours/week</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Focus className="h-3 w-3" /> Study Pace
              </div>
              <div className="font-medium">{studyPace}</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Preferred Time
              </div>
              <div className="font-medium">{preferredStartTime} - {preferredEndTime}</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Book className="h-3 w-3" /> Study Type
              </div>
              <div className="font-medium">{preferredStudyType}</div>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <Button 
          className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          onClick={() => navigate('/dashboard/student/academic')}
        >
          Update Learning Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default LearningProfileSection;
