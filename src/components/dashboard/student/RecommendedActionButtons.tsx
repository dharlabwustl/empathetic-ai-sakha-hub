
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Calendar, Clock, PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExamPreparation } from '@/types/user/exam-preparation';

interface RecommendedActionButtonsProps {
  name: string;
  examPrep: ExamPreparation | string;
  suggestedNextAction?: string | null;
}

const RecommendedActionButtons: React.FC<RecommendedActionButtonsProps> = ({ name, examPrep, suggestedNextAction }) => {
  const navigate = useNavigate();
  
  // Only access examDate if examPrep is an object
  const examDate = typeof examPrep === 'object' ? examPrep.examDate : null;
  const daysLeft = typeof examPrep === 'object' ? examPrep.daysLeft : null;

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium">Welcome back, {name}</CardTitle>
        <CardDescription>
          {examDate && `Your ${typeof examPrep === 'object' ? examPrep.title : ''} exam is coming up`}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {suggestedNextAction && (
          <p className="text-sm mb-3 text-muted-foreground">{suggestedNextAction}</p>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button 
            variant="outline" 
            className="justify-start h-auto py-2.5 px-3"
            onClick={() => navigate("/dashboard/student/practice-exam/start")}
          >
            <PencilLine className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">Practice Exam</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-2.5 px-3"
            onClick={() => navigate("/dashboard/student/concepts")}
          >
            <Book className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-sm">Study Concepts</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-2.5 px-3"
          >
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            <span className="text-sm">My Schedule</span>
          </Button>
          
          {(typeof examPrep === 'object' && examPrep.daysLeft !== undefined) && (
            <Button 
              variant="outline" 
              className="justify-start h-auto py-2.5 px-3"
            >
              <Clock className="w-4 h-4 mr-2 text-amber-500" />
              <span className="text-sm">{examPrep.daysLeft} Days Left</span>
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-0 pt-3">
      </CardFooter>
    </Card>
  );
};

export default RecommendedActionButtons;
