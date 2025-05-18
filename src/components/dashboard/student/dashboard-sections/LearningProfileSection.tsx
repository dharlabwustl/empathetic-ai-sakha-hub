
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileBase } from '@/types/user/base';
import { Progress } from '@/components/ui/progress';
import { Info, Users, BookOpen, Clock, Award } from 'lucide-react';

interface LearningProfileSectionProps {
  userProfile: UserProfileBase;
  examScore: number;
  previousScore?: number;
  studyHours: number;
  testsCompleted: number;
  conceptsMastered: number;
  totalConcepts: number;
}

const LearningProfileSection: React.FC<LearningProfileSectionProps> = ({
  userProfile,
  examScore,
  previousScore,
  studyHours,
  testsCompleted,
  conceptsMastered,
  totalConcepts
}) => {
  // Calculate difference between current and previous score
  const scoreDifference = previousScore ? examScore - previousScore : 0;
  
  // Calculate percentage of concepts mastered
  const conceptsMasteryPercentage = Math.round((conceptsMastered / totalConcepts) * 100);

  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Learning Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-4">
          {/* User avatar and name */}
          <div className="col-span-12 md:col-span-5 flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                {userProfile?.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name || 'User'} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  userProfile?.name?.charAt(0) || 'S'
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-medium">{userProfile?.name || 'Student'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {userProfile?.goals?.[0]?.title || 'NEET'} Aspirant
              </p>
            </div>
          </div>

          {/* Exam readiness score */}
          <div className="col-span-12 md:col-span-7">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  Exam Readiness Score
                </span>
                <span className="text-sm font-medium flex items-center">
                  {examScore}%
                  {scoreDifference > 0 && (
                    <span className="ml-1 text-green-600 text-xs">+{scoreDifference}%</span>
                  )}
                  {scoreDifference < 0 && (
                    <span className="ml-1 text-red-600 text-xs">{scoreDifference}%</span>
                  )}
                </span>
              </div>
              <Progress value={examScore} className="h-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your exam readiness has {scoreDifference >= 0 ? 'improved' : 'decreased'} by {Math.abs(scoreDifference)}% since last assessment
              </p>
            </div>
          </div>

          {/* Learning metrics */}
          <div className="col-span-4 flex flex-col items-center justify-center text-center border-r border-gray-200 dark:border-gray-700 px-1">
            <Clock className="h-4 w-4 mb-1 text-blue-600" />
            <div className="text-lg font-semibold">{studyHours}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Study Hours</div>
          </div>
          <div className="col-span-4 flex flex-col items-center justify-center text-center border-r border-gray-200 dark:border-gray-700 px-1">
            <BookOpen className="h-4 w-4 mb-1 text-purple-600" />
            <div className="text-lg font-semibold">{conceptsMastered}/{totalConcepts}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Concepts</div>
          </div>
          <div className="col-span-4 flex flex-col items-center justify-center text-center px-1">
            <Users className="h-4 w-4 mb-1 text-green-600" />
            <div className="text-lg font-semibold">{testsCompleted}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Tests</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProfileSection;
