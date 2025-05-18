
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Check, BookOpen, Brain, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TodaysPlanData } from "@/hooks/useTodaysPlan";

interface NewTodaysPlanViewProps {
  planData?: TodaysPlanData;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const NewTodaysPlanView = ({ planData, onConceptClick, isMobile = false }: NewTodaysPlanViewProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  if (!planData || !planData.conceptCards?.length) {
    return (
      <Card className="mt-4">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No study plan data available.</p>
        </CardContent>
      </Card>
    );
  }

  const handleMarkComplete = (taskType: string, taskId: string) => {
    toast({
      title: `${taskType} marked as completed`,
      description: "Your progress has been updated"
    });
  };
  
  const getTaskIcon = (taskType: string) => {
    switch(taskType) {
      case 'concept': return <BookOpen className="h-4 w-4" />;
      case 'flashcard': return <Brain className="h-4 w-4" />;
      case 'quiz': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-5">
      {/* Tasks section */}
      <div className="space-y-3">
        {planData.conceptCards.slice(0, 3).map((card, idx) => (
          <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-3 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    {getTaskIcon('concept')}
                  </div>
                  <div>
                    <h4 className="font-medium text-base" onClick={() => onConceptClick(card.id || 'concept-1')} style={{cursor: 'pointer'}}>
                      {card.title}
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{card.studyTime || '20 min'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Badge variant="outline" className="mb-2 block text-center">
                    {card.subject}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                    onClick={() => handleMarkComplete('Concept', card.id || '')}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Done
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {planData.flashcardSets?.slice(0, 2).map((set, idx) => (
          <Card key={`fc-${idx}`} className="overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-3 bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    {getTaskIcon('flashcard')}
                  </div>
                  <div>
                    <h4 className="font-medium text-base">
                      {set.title} Flashcards
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{set.studyTime || '15 min'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Badge variant="outline" className="mb-2 block text-center">
                    {set.subject || 'Physics'}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                    onClick={() => handleMarkComplete('Flashcards', set.id || '')}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Done
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {planData.quizzes?.slice(0, 1).map((quiz, idx) => (
          <Card key={`quiz-${idx}`} className="overflow-hidden hover:shadow-md transition-shadow border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-3 bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    {getTaskIcon('quiz')}
                  </div>
                  <div>
                    <h4 className="font-medium text-base">
                      {quiz.title}
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{quiz.studyTime || '20 min'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Badge variant="outline" className="mb-2 block text-center">
                    {quiz.subject || 'Chemistry'}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                    onClick={() => handleMarkComplete('Quiz', quiz.id || '')}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Done
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/today')}>
          View Full Plan
        </Button>
        
        <Button variant="default" size="sm" onClick={() => navigate('/dashboard/student/concepts')}>
          Explore Concepts
        </Button>
      </div>
    </div>
  );
};

export default NewTodaysPlanView;
