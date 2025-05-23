
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle, Users, Star } from 'lucide-react';
import { ConceptCard } from '@/types/user/conceptCard';

export interface ConceptSidebarProps {
  concept: ConceptCard;
}

const ConceptSidebar: React.FC<ConceptSidebarProps> = ({ concept }) => {
  // Calculate estimated time to complete in minutes
  const estimatedTime = concept.estimatedTime || 20;
  
  // Calculate mastery percentage
  const masteryPercentage = concept.masteryPercentage || 0;
  
  // Format number of students
  const studentsCount = concept.studentsCount || 1250;
  const formattedStudentsCount = studentsCount >= 1000 
    ? `${(studentsCount / 1000).toFixed(1)}k` 
    : studentsCount;

  return (
    <div className="space-y-4">
      {/* Mastery Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Concept Mastery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Your Progress</span>
            <span className="text-sm font-medium">{masteryPercentage}%</span>
          </div>
          <Progress value={masteryPercentage} className="h-2" />
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Status
              </span>
              <span className="font-medium">
                {masteryPercentage >= 80 ? 'Mastered' : 
                 masteryPercentage >= 50 ? 'In Progress' : 'Just Started'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <Clock className="h-4 w-4 text-blue-500 mr-2" />
                Est. Time
              </span>
              <span className="font-medium">{estimatedTime} min</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <Users className="h-4 w-4 text-purple-500 mr-2" />
                Students
              </span>
              <span className="font-medium">{formattedStudentsCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <Star className="h-4 w-4 text-amber-500 mr-2" />
                Difficulty
              </span>
              <span className="font-medium">{concept.difficulty || 'Intermediate'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Related Concepts Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Related Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {concept.relatedConcepts ? (
              concept.relatedConcepts.map((related, index) => (
                <li key={index} className="text-sm py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <span className="flex items-center">
                    <BookOpen className="h-3 w-3 text-gray-500 mr-2" />
                    {related}
                  </span>
                </li>
              ))
            ) : (
              ['Force and Acceleration', 'Mass and Inertia', 'Action-Reaction Pairs'].map((related, index) => (
                <li key={index} className="text-sm py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <span className="flex items-center">
                    <BookOpen className="h-3 w-3 text-gray-500 mr-2" />
                    {related}
                  </span>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
      
      {/* Prerequisites Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Prerequisites</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {concept.prerequisites ? (
              concept.prerequisites.map((prereq, index) => (
                <li key={index} className="text-sm py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  {prereq}
                </li>
              ))
            ) : (
              ['Basic Physics', 'Vector Quantities', 'Understanding of Mass'].map((prereq, index) => (
                <li key={index} className="text-sm py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  {prereq}
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptSidebar;
