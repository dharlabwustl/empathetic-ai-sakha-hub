
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book, CheckCircle, BookOpen, GraduationCap, Clock, Brain } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { useToast } from '@/hooks/use-toast';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData | null;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ planData }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!planData) return null;
  
  const handleStartConcept = (conceptId: string) => {
    // Navigate to the concept detail page
    navigate(`/dashboard/student/concepts/detail/${conceptId}`);
  };
  
  const handleStartFlashcards = (flashcardId: string) => {
    navigate(`/dashboard/student/flashcards/${flashcardId}`);
  };
  
  const handleStartPracticeExam = (examId: string) => {
    navigate(`/dashboard/student/practice/${examId}`);
  };
  
  const markAsComplete = (id: string, type: string) => {
    toast({
      title: "Task Completed",
      description: "Your progress has been updated",
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Concepts Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
            Concept Cards
          </h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/concepts')}>
            View All Concepts
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planData.concepts?.map(concept => (
            <Card key={concept.id} className={`overflow-hidden ${concept.status === 'completed' ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {concept.subject}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {concept.duration} min
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2">{concept.title}</h3>
                <p className="text-sm text-gray-500">{concept.topic || 'General Topic'}</p>
                
                <div className="mt-4 flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    concept.difficulty === 'Easy' || concept.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    concept.difficulty === 'Medium' || concept.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {concept.difficulty}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => markAsComplete(concept.id, 'concept')}
                  disabled={concept.status === 'completed'}
                  className={concept.status === 'completed' ? 'text-green-600' : ''}
                >
                  <CheckCircle className={`h-4 w-4 mr-1 ${concept.status === 'completed' ? 'fill-green-600' : ''}`} />
                  {concept.status === 'completed' ? 'Completed' : 'Mark Done'}
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleStartConcept(concept.id)}
                >
                  <Brain className="h-4 w-4 mr-1" />
                  Study Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Flashcards Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Book className="mr-2 h-5 w-5 text-amber-600" />
            Flashcards
          </h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/flashcards')}>
            View All Flashcards
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planData.flashcards?.map(flashcard => (
            <Card key={flashcard.id} className={flashcard.status === 'completed' ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    {flashcard.subject}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {flashcard.duration} min
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2">{flashcard.title}</h3>
                <p className="text-sm text-gray-500">{flashcard.cardCount} cards</p>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => markAsComplete(flashcard.id, 'flashcard')}
                  disabled={flashcard.status === 'completed'}
                  className={flashcard.status === 'completed' ? 'text-green-600' : ''}
                >
                  <CheckCircle className={`h-4 w-4 mr-1 ${flashcard.status === 'completed' ? 'fill-green-600' : ''}`} />
                  {flashcard.status === 'completed' ? 'Completed' : 'Mark Done'}
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleStartFlashcards(flashcard.id)}
                >
                  Study Cards
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Practice Exams Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-purple-600" />
            Practice Exams
          </h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/practice-exam')}>
            View All Practice Tests
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planData.practiceExams?.map(exam => (
            <Card key={exam.id} className={exam.status === 'completed' ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    {exam.subject}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {exam.duration} min
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2">{exam.title}</h3>
                <p className="text-sm text-gray-500">{exam.questionCount} questions</p>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => markAsComplete(exam.id, 'practice-exam')}
                  disabled={exam.status === 'completed'}
                  className={exam.status === 'completed' ? 'text-green-600' : ''}
                >
                  <CheckCircle className={`h-4 w-4 mr-1 ${exam.status === 'completed' ? 'fill-green-600' : ''}`} />
                  {exam.status === 'completed' ? 'Completed' : 'Mark Done'}
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleStartPracticeExam(exam.id)}
                >
                  Take Test
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewTodaysPlanView;
