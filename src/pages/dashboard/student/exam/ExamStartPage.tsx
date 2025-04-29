
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, FileText, BookOpen, BarChart, 
  CheckCircle, AlertTriangle, ChevronLeft,
  Calendar, BookOpenCheck,
} from 'lucide-react';
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";

// Mock exam data
const mockExam = {
  id: "e1",
  title: "Physics Mid-Term Practice",
  description: "Comprehensive practice test covering mechanics, thermodynamics, and waves with emphasis on problem-solving skills and numerical calculations.",
  subject: "Physics",
  chapters: ["Mechanics", "Thermodynamics", "Waves"],
  difficulty: "Medium",
  totalQuestions: 30,
  timeLimit: 60, // in minutes
  sections: [
    { name: "Multiple Choice", questions: 15, marks: 30 },
    { name: "Numerical Problems", questions: 10, marks: 40 },
    { name: "Short Answer", questions: 5, marks: 30 }
  ],
  topics: ["Kinematics", "Newton's Laws", "Work & Energy", "Heat Transfer", "Sound Waves"],
  previousAttempts: 2,
  bestScore: 76,
  averageScore: 72,
  lastAttemptDate: "2025-04-22",
  recommendedPreparation: [
    { id: "c1", title: "Newton's Third Law of Motion", type: "concept" },
    { id: "f1", title: "Thermodynamics Principles", type: "flashcard" }
  ]
};

const ExamStartPage = () => {
  const { examId } = useParams<{examId: string}>();
  const [exam, setExam] = useState(mockExam);
  const navigate = useNavigate();
  
  // Function to start the exam
  const handleStartExam = () => {
    navigate(`/dashboard/student/exams/attempt/${examId}`);
  };
  
  // Function to continue a previously started exam
  const handleContinueExam = () => {
    navigate(`/dashboard/student/exams/attempt/${examId}?continue=true`);
  };
  
  // Calculate time per question
  const timePerQuestion = Math.round(exam.timeLimit / exam.totalQuestions);
  
  // Calculate total marks
  const totalMarks = exam.sections.reduce((sum, section) => sum + section.marks, 0);

  return (
    <SharedPageLayout
      title="Exam Practice"
      subtitle="Test your knowledge and track your progress"
      showBackLink={true}
      backLinkText="Back to Practice Exams"
      backLinkUrl="/dashboard/student/practice"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <Link to="/dashboard/student/practice" className="text-sm text-blue-600 hover:underline inline-flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Back to Practice Exams
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              {exam.subject}
            </Badge>
            <Badge className={`${
              exam.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
              exam.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {exam.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
              {exam.timeLimit} minutes
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-t-4 border-violet-500">
              <CardHeader>
                <CardTitle className="text-2xl">{exam.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{exam.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg flex items-center gap-3">
                    <div className="bg-violet-100 dark:bg-violet-800/50 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm text-violet-700 dark:text-violet-300">Questions</p>
                      <p className="font-bold text-violet-900 dark:text-violet-100">{exam.totalQuestions}</p>
                    </div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-center gap-3">
                    <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-amber-700 dark:text-amber-300">Time Limit</p>
                      <p className="font-bold text-amber-900 dark:text-amber-100">{exam.timeLimit} min</p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg flex items-center gap-3">
                    <div className="bg-emerald-100 dark:bg-emerald-800/50 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">Total Marks</p>
                      <p className="font-bold text-emerald-900 dark:text-emerald-100">{totalMarks}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium text-lg mb-3">Exam Sections</h3>
                  <div className="space-y-3">
                    {exam.sections.map((section, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{section.name}</p>
                          <p className="text-sm text-muted-foreground">{section.questions} questions</p>
                        </div>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
                          {section.marks} marks
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium text-lg mb-3">Covered Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {exam.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="text-amber-600 h-5 w-5" />
                  <span className="text-sm">Approx. time per question: <strong>{timePerQuestion} min</strong></span>
                </div>
                <Button className="bg-violet-600 hover:bg-violet-700 sm:w-auto w-full" onClick={handleStartExam}>
                  Start Exam
                </Button>
              </CardFooter>
            </Card>
            
            {exam.recommendedPreparation.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpenCheck className="h-5 w-5 text-blue-500" />
                    Recommended Preparation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {exam.recommendedPreparation.map((item) => (
                      <Link 
                        key={item.id} 
                        to={item.type === 'concept' 
                          ? `/dashboard/student/concepts/study/${item.id}` 
                          : `/dashboard/student/flashcards/practice/${item.id}`
                        }
                        className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {item.type === 'concept' ? (
                            <BookOpen className="h-5 w-5 text-blue-500" />
                          ) : (
                            <FileText className="h-5 w-5 text-amber-500" />
                          )}
                          <span>{item.title}</span>
                        </div>
                        <Badge variant="outline">
                          {item.type === 'concept' ? 'Concept Card' : 'Flashcard'}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-indigo-500" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {exam.previousAttempts > 0 ? (
                  <>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Best Score</span>
                        <span className="font-medium">{exam.bestScore}%</span>
                      </div>
                      <Progress value={exam.bestScore} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Attempts</p>
                        <p className="font-medium">{exam.previousAttempts}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Score</p>
                        <p className="font-medium">{exam.averageScore}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Attempt</p>
                        <p className="font-medium">{new Date(exam.lastAttemptDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    {exam.previousAttempts > 0 && (
                      <Button variant="outline" className="w-full gap-2" onClick={() => navigate(`/dashboard/student/exams/review/${examId}`)}>
                        <CheckCircle size={16} />
                        View Previous Results
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <AlertTriangle className="text-amber-500 h-6 w-6" />
                    </div>
                    <p className="text-muted-foreground">No previous attempts</p>
                    <p className="text-sm text-muted-foreground mt-1">This will be your first attempt!</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Find a quiet place without distractions</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Keep a calculator, scratch paper, and pens ready</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>You can pause and resume the exam if needed</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Flag difficult questions to review later</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>Don't spend too much time on any single question</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ExamStartPage;
