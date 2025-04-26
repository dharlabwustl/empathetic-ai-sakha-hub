
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, BarChart, Flag, Award } from 'lucide-react';

interface ExamResultsPageProps {}

const ExamResultsPage: React.FC<ExamResultsPageProps> = () => {
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const location = useLocation();
  const results = location.state;
  
  // Guard clause if no results data is available
  if (!results || !results.exam) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto py-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-10">
                <AlertCircle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Results Not Available</h2>
                <p className="text-gray-500 mb-6">The exam results could not be loaded.</p>
                <Button 
                  onClick={() => navigate('/dashboard/student/exams')}
                  className="mx-auto"
                >
                  Back to Exams
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  const { 
    answers, 
    timeSpent, 
    totalQuestions, 
    attempted, 
    correct, 
    exam,
    flaggedQuestions = []
  } = results;
  
  const percentCorrect = Math.round((correct / totalQuestions) * 100);
  const formattedTime = () => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    return `${minutes}m ${seconds}s`;
  };
  
  const getScoreColor = () => {
    if (percentCorrect >= 80) return 'text-green-600';
    if (percentCorrect >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getScoreEmoji = () => {
    if (percentCorrect >= 90) return '🎯';
    if (percentCorrect >= 80) return '🏆';
    if (percentCorrect >= 70) return '👍';
    if (percentCorrect >= 60) return '😊';
    if (percentCorrect >= 50) return '🤔';
    return '📚';
  };
  
  const getScoreMessage = () => {
    if (percentCorrect >= 90) return 'Excellent Work!';
    if (percentCorrect >= 80) return 'Great Job!';
    if (percentCorrect >= 70) return 'Good Work!';
    if (percentCorrect >= 60) return 'Nice Effort!';
    if (percentCorrect >= 50) return 'Keep Practicing!';
    return 'More Review Needed';
  };
  
  const handleReviewExam = () => {
    navigate(`/dashboard/student/exams/${examId}`, {
      state: {
        review: true,
        answers
      }
    });
  };

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard/student/exams')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Exam Results</h1>
            <p className="text-gray-500">{exam.title}</p>
          </div>
        </div>
        
        {/* Score Overview Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 relative">
            <div className="text-center py-6">
              <div className="text-6xl mb-3">{getScoreEmoji()}</div>
              <h2 className="text-lg font-medium mb-2">{getScoreMessage()}</h2>
              <div className="text-5xl font-bold mb-3 flex items-center justify-center gap-2">
                <span className={getScoreColor()}>{percentCorrect}%</span>
                <span className="text-lg font-normal text-gray-500">({correct}/{totalQuestions})</span>
              </div>
              <div className="w-full max-w-md mx-auto mb-2">
                <Progress value={percentCorrect} className="h-3" />
              </div>
              <div className="text-gray-500 text-sm mt-2">
                Completed on {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Time Taken</div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-lg">{formattedTime()}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Questions Attempted</div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-lg">{attempted}/{totalQuestions}</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-1">Flagged Questions</div>
                <div className="flex items-center justify-center gap-2">
                  <Flag className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-lg">{flaggedQuestions.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Question Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Question Summary</CardTitle>
            <CardDescription>Detailed breakdown of your performance</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {exam.questions.map((question, index) => {
                const isCorrect = answers[question.id] === question.correctAnswer;
                const isAnswered = answers[question.id] !== undefined;
                const userAnswer = isAnswered ? question.options[answers[question.id]] : "Unanswered";
                const correctAnswer = question.options[question.correctAnswer];
                
                return (
                  <div 
                    key={question.id} 
                    className={`p-4 rounded-lg border ${
                      isAnswered 
                        ? (isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      <Badge variant={isCorrect ? "success" : (isAnswered ? "destructive" : "outline")}>
                        {isCorrect ? 'Correct' : (isAnswered ? 'Incorrect' : 'Unanswered')}
                      </Badge>
                    </div>
                    
                    <p className="mb-3">{question.text}</p>
                    
                    <div className="mb-2">
                      <div className="text-xs font-medium text-gray-500">Your answer:</div>
                      <div className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {isAnswered ? (
                          <div className="flex items-center gap-2 mt-1">
                            {isCorrect 
                              ? <CheckCircle className="h-4 w-4 text-green-600" />
                              : <AlertCircle className="h-4 w-4 text-red-600" />
                            }
                            {userAnswer}
                          </div>
                        ) : (
                          <span className="italic">Not answered</span>
                        )}
                      </div>
                    </div>
                    
                    {!isCorrect && (
                      <div>
                        <div className="text-xs font-medium text-gray-500">Correct answer:</div>
                        <div className="text-sm text-green-700 flex items-center gap-2 mt-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {correctAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={handleReviewExam} className="min-w-[150px]">
            <BarChart className="h-4 w-4 mr-2" />
            Review Exam
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/dashboard/student/exams')}
            className="min-w-[150px]"
          >
            <Award className="h-4 w-4 mr-2" />
            All Exams
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExamResultsPage;
