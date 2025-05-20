
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Book, ArrowRight, CheckCircle } from "lucide-react";
import { TodaysPlanData, ConceptCard } from "@/types/student/dashboard";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({
  planData,
  onConceptClick,
  isMobile = false
}) => {
  if (!planData) {
    return (
      <Card className="border border-gray-200 dark:border-gray-800">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No plan data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overall Progress Section */}
      <Card className="border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Today's Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {planData.completedTasks} of {planData.totalTasks} tasks completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {planData.estimatedTimeRemaining} remaining
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress 
              value={(planData.completedTasks / planData.totalTasks) * 100}
              className="h-2 bg-gray-200 dark:bg-gray-700"
              indicatorClassName="bg-gradient-to-r from-indigo-600 to-purple-600"
            />
          </div>
        </div>
      </Card>
      
      {/* Learning Sessions */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 px-1">Learning Sessions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planData.learningSessions?.map((session, index) => (
            <Card key={index} className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300">
              <CardContent className="p-0">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{session.title}</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                          <Clock className="h-3 w-3 mr-1" />
                          {session.duration}
                        </Badge>
                        <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                          <Book className="h-3 w-3 mr-1" />
                          {session.subject}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={session.completed ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"}>
                      {session.completed ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{session.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {session.scheduledTime}
                    </span>
                    <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200">
                      Start Session
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Concept Cards Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 px-1">Concept Cards</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {planData.conceptCards?.map((concept, index) => (
            <ConceptCardItem 
              key={index} 
              concept={concept} 
              onClick={() => onConceptClick(concept.id)} 
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ConceptCardItemProps {
  concept: ConceptCard;
  onClick: () => void;
  isMobile?: boolean;
}

const ConceptCardItem: React.FC<ConceptCardItemProps> = ({ concept, onClick, isMobile }) => {
  return (
    <Card 
      className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-300"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 flex items-center justify-between">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            {concept.title}
          </h4>
          <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
            {concept.difficulty}
          </Badge>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {concept.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {concept.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {concept.timeEstimate} • {concept.subject}
            </span>
            <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 p-0">
              <span className="sr-only">View concept</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewTodaysPlanView;
