
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, BookOpen, Brain, FileText, CheckCircle } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { SubjectTasksBreakdown } from './SubjectTasksBreakdown';
import { useNavigate } from 'react-router-dom';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData | null;
  onConceptClick?: (conceptId: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ 
  planData, 
  onConceptClick,
  isMobile 
}) => {
  const navigate = useNavigate();
  
  if (!planData) return null;
  
  // Handler for concept click
  const handleConceptClick = (conceptId: string) => {
    console.log("NewTodaysPlanView - Handle concept click with ID:", conceptId);
    if (onConceptClick) {
      onConceptClick(conceptId);
    } else {
      navigate(`/dashboard/student/concepts/${conceptId}`);
    }
  };
  
  const renderConceptCard = (concept: any) => {
    return (
      <Card 
        key={concept.id} 
        className="border-l-4 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        style={{ 
          borderLeftColor: 
            concept.difficulty === 'Easy' ? '#22c55e' : 
            concept.difficulty === 'Medium' ? '#f59e0b' : 
            '#ef4444' 
        }}
        onClick={() => handleConceptClick(concept.id)}
      >
        <CardContent className={`p-4 ${isMobile ? 'p-3' : ''}`}>
          <div className="flex items-start justify-between mb-2">
            <Badge variant={concept.status === 'completed' ? "outline" : "default"} className="mb-2">
              {concept.status === 'completed' ? "Completed" : "Pending"}
            </Badge>
            <Badge variant="outline" className={
              concept.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
              concept.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-red-50 text-red-700 border-red-200'
            }>
              {concept.difficulty}
            </Badge>
          </div>
          
          <h3 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'} mb-1`}>
            {concept.title}
          </h3>
          
          <div className="mt-2 space-y-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Book className="h-4 w-4" />
              <span>{concept.subject}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{concept.topic}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                {concept.duration} min
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Tasks Completed</h3>
              <div className="flex items-end">
                <span className="text-3xl font-bold">{planData.completedTasks}</span>
                <span className="text-gray-500 ml-1">/ {planData.totalTasks}</span>
              </div>
              <Progress 
                value={(planData.completedTasks / planData.totalTasks) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Time Allocation</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span className="text-xs">Concepts: {planData.timeAllocation.concepts}m</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                  <span className="text-xs">Flashcards: {planData.timeAllocation.flashcards}m</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs">Practice: {planData.timeAllocation.practiceExams}m</span>
                </div>
              </div>
              <div className="text-sm mt-1">
                Total: <span className="font-medium">{planData.timeAllocation.total} min</span>
              </div>
            </div>
            
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Streak</h3>
                <div className="flex items-center mt-1">
                  <span className="text-3xl font-bold">{planData.streak}</span>
                  <span className="text-gray-500 ml-1">days</span>
                </div>
              </div>
              <Button className="mt-4 md:mt-0" variant="outline">
                Download Plan as PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Today's Concepts Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planData.concepts && planData.concepts.length > 0 ? (
            planData.concepts.map(renderConceptCard)
          ) : (
            <Card className="col-span-full">
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No concepts scheduled for today</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Subject Tasks Breakdown */}
      <SubjectTasksBreakdown />
    </div>
  );
};

export default NewTodaysPlanView;
