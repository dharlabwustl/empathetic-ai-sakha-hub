
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, BarChart, Clock, Lock, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { SubscriptionType } from '@/types/user/subscription';
import CreateExamCardDialog from './CreateExamCardDialog';
import { useIsMobile } from '@/hooks/use-mobile';

interface PracticeExam {
  id: string;
  title: string;
  description: string;
  questions: number;
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  subject: string;
  completionRate?: number;
  lastAttempt?: string;
  isLocked: boolean;
}

interface PracticeExamsSectionProps {
  exams: PracticeExam[];
  userSubscription: SubscriptionType | { planType: string };
  remainingFreeExams: number;
}

const DifficultyColorMap = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-orange-100 text-orange-800',
  Expert: 'bg-red-100 text-red-800',
};

export const PracticeExamsSection: React.FC<PracticeExamsSectionProps> = ({ 
  exams,
  userSubscription,
  remainingFreeExams 
}) => {
  const navigate = useNavigate();
  const [showCreateExamDialog, setShowCreateExamDialog] = useState(false);
  const isMobile = useIsMobile();
  
  // Check if user is on free plan
  const isFreePlan = userSubscription === SubscriptionType.FREE || 
    (typeof userSubscription === 'object' && userSubscription.planType === SubscriptionType.FREE);
    
  // Check if user is on pro plan to show premium features
  const isProPlan = userSubscription === SubscriptionType.PRO || 
    (typeof userSubscription === 'object' && userSubscription.planType === SubscriptionType.PRO);
  
  const handleExamClick = (exam: PracticeExam) => {
    if (exam.isLocked && isFreePlan) {
      // Show upgrade prompt
      navigate('/dashboard/student/subscription');
    } else {
      // Navigate to exam
      navigate(`/dashboard/student/practice-exam/${exam.id}`);
    }
  };
  
  const handleCreateExam = (data: any) => {
    console.log('Creating exam with data:', data);
    // In a real app, you would send this data to your backend
    // and then update the exams list
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold flex items-center`}>Practice Exams</h2>
          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mt-1`}>
            Test yourself with subject-specific practice exams
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateExamDialog(true)}
          size={isMobile ? "sm" : "default"}
          className="flex items-center"
        >
          <Plus className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
          <span className={isMobile ? "text-xs" : ""}>Create Exam</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map((exam) => (
          <Card 
            key={exam.id} 
            className={`hover:shadow-md transition-shadow ${exam.isLocked ? 'opacity-80' : ''}`}
          >
            <CardHeader className={`${isMobile ? 'p-4 pb-2' : 'pb-2'}`}>
              <div className="flex justify-between items-start">
                <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>{exam.title}</CardTitle>
                <Badge className={`${DifficultyColorMap[exam.difficulty]} ${isMobile ? 'text-[10px] px-1.5 py-0.5' : ''}`}>
                  {exam.difficulty}
                </Badge>
              </div>
              <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
                {exam.description}
              </CardDescription>
            </CardHeader>
            <CardContent className={`${isMobile ? 'p-4 pt-1 pb-2' : 'pt-1 pb-2'}`}>
              <div className="grid grid-cols-2 gap-2">
                <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <User className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} text-gray-500`} />
                  <span>{exam.subject}</span>
                </div>
                <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <Calendar className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} text-gray-500`} />
                  <span>{exam.questions} questions</span>
                </div>
                <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <Clock className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} text-gray-500`} />
                  <span>{exam.estimatedTime}</span>
                </div>
                <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <BarChart className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} text-gray-500`} />
                  <span>{exam.completionRate ? `${exam.completionRate}% complete` : 'Not started'}</span>
                </div>
              </div>
              
              {exam.completionRate && (
                <div className="mt-3">
                  <Progress value={exam.completionRate} className={`h-1.5 ${isMobile ? 'mt-1' : 'mt-2'}`} />
                </div>
              )}
              
              {exam.lastAttempt && (
                <p className={`mt-2 text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  Last attempted: {exam.lastAttempt}
                </p>
              )}
            </CardContent>
            <CardFooter className={`${isMobile ? 'p-4 pt-1' : 'pt-1'}`}>
              <Button 
                className="w-full"
                variant={exam.isLocked ? "outline" : "default"} 
                onClick={() => handleExamClick(exam)}
                size={isMobile ? "sm" : "default"}
              >
                {exam.isLocked ? (
                  <>
                    <Lock className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} /> 
                    <span className={isMobile ? "text-xs" : ""}>Upgrade to Access</span>
                  </>
                ) : (
                  <span className={isMobile ? "text-xs" : ""}>
                    {exam.completionRate ? 'Continue Exam' : 'Start Exam'}
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <CreateExamCardDialog 
        open={showCreateExamDialog}
        onClose={() => setShowCreateExamDialog(false)}
        onCreateExam={handleCreateExam}
        userSubscription={userSubscription}
        remainingExams={remainingFreeExams}
      />
    </div>
  );
};

export default PracticeExamsSection;
