
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Clock, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

interface Exam {
  id: string;
  title: string;
  subject: string;
  date?: string;
  status: 'upcoming' | 'completed' | 'missed';
  score?: number;
  totalQuestions: number;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const exams: Exam[] = [
  {
    id: '1',
    title: 'Physics Midterm Practice',
    subject: 'Physics',
    date: '2025-04-25',
    status: 'upcoming',
    totalQuestions: 30,
    duration: '45 minutes',
    difficulty: 'Medium'
  },
  {
    id: '2',
    title: 'Math Quiz #3',
    subject: 'Mathematics',
    date: '2025-04-15',
    status: 'completed',
    score: 85,
    totalQuestions: 20,
    duration: '30 minutes',
    difficulty: 'Hard'
  },
  {
    id: '3',
    title: 'Chemistry Chapter 4',
    subject: 'Chemistry',
    date: '2025-04-10',
    status: 'completed',
    score: 72,
    totalQuestions: 25,
    duration: '40 minutes',
    difficulty: 'Medium'
  }
];

const PracticeExamFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [showExamModal, setShowExamModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  
  const upcomingExams = exams.filter(exam => exam.status === 'upcoming');
  const completedExams = exams.filter(exam => exam.status === 'completed');

  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowExamModal(true);
  };

  const handleReviewExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowReviewModal(true);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    // Cast to MouseEvent to avoid TypeScript error
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      setShowExamModal(false);
      setShowReviewModal(false);
    }
  };

  return (
    <Card className="h-full overflow-hidden">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 text-sm font-medium flex-1 ${
            activeTab === 'upcoming' ? 'border-b-2 border-primary' : ''
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex-1 ${
            activeTab === 'completed' ? 'border-b-2 border-primary' : ''
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      <CardContent className="p-4 h-[calc(100%-40px)] overflow-auto">
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            {upcomingExams.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No upcoming exams</p>
            ) : (
              upcomingExams.map(exam => (
                <div key={exam.id} className="border rounded-md p-4 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{exam.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      exam.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                      exam.difficulty === 'Medium' ? 'bg-blue-100 text-blue-800' : 
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {exam.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{exam.subject}</p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <CalendarCheck className="w-4 h-4 mr-1" />
                      {new Date(exam.date || '').toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {exam.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {exam.totalQuestions} questions
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleStartExam(exam)}
                  >
                    Start Exam
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
        
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedExams.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No completed exams</p>
            ) : (
              completedExams.map(exam => (
                <div key={exam.id} className="border rounded-md p-4 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{exam.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      (exam.score || 0) >= 80 ? 'bg-green-100 text-green-800' : 
                      (exam.score || 0) >= 60 ? 'bg-blue-100 text-blue-800' : 
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {exam.score}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{exam.subject}</p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <CalendarCheck className="w-4 h-4 mr-1" />
                      {new Date(exam.date || '').toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {exam.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {exam.totalQuestions} questions
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleReviewExam(exam)}
                  >
                    Review Exam
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>

      {/* Exam Modal */}
      {showExamModal && selectedExam && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 modal-overlay"
          onClick={(e: React.MouseEvent) => handleCloseModal(e)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b">
              <h2 className="font-bold text-xl">{selectedExam.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedExam.subject}</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Instructions:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>This exam contains {selectedExam.totalQuestions} questions</li>
                  <li>Time limit: {selectedExam.duration}</li>
                  <li>Do not refresh the page during the exam</li>
                  <li>You can mark questions for review and return to them later</li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Question 1</h3>
                  <p className="mb-4">What is the principle of conservation of energy?</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="q1-a" name="q1" className="mr-2" />
                      <label htmlFor="q1-a">Energy can be created but not destroyed</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q1-b" name="q1" className="mr-2" />
                      <label htmlFor="q1-b">Energy cannot be created or destroyed, only transformed</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q1-c" name="q1" className="mr-2" />
                      <label htmlFor="q1-c">Energy can be destroyed but not created</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q1-d" name="q1" className="mr-2" />
                      <label htmlFor="q1-d">Energy can be both created and destroyed</label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" disabled>Previous</Button>
                  <Button variant="outline">Mark for Review</Button>
                  <Button>Next</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedExam && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 modal-overlay"
          onClick={(e: React.MouseEvent) => handleCloseModal(e)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b">
              <h2 className="font-bold text-xl">Exam Review: {selectedExam.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedExam.subject}</p>
            </div>
            <div className="p-6">
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold mb-3">Performance Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Score:</span>
                      <span className="font-medium">{selectedExam.score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Questions Attempted:</span>
                      <span className="font-medium">{selectedExam.totalQuestions}/{selectedExam.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Correct Answers:</span>
                      <span className="font-medium">{Math.round((selectedExam.score || 0) * selectedExam.totalQuestions / 100)}/{selectedExam.totalQuestions}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold mb-3">Strengths</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Good understanding of core concepts</li>
                    <li>Strong in problem-solving</li>
                    <li>Effective time management</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <h3 className="font-semibold mb-3">Areas for Improvement</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Review advanced formulas - several calculation errors</li>
                  <li>Practice more complex application problems</li>
                  <li>Focus on improving accuracy in final answer selection</li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <h3 className="font-semibold">Question Analysis</h3>
                
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Question 1</h4>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" /> Correct
                    </span>
                  </div>
                  <p className="mb-2">What is the derivative of f(x) = x²?</p>
                  <div className="mb-4">
                    <div className="font-medium">Your answer: f'(x) = 2x</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                    <h5 className="font-medium mb-1">Explanation:</h5>
                    <p>The derivative of x² is 2x, following the power rule: d/dx(x^n) = n·x^(n-1)</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Question 3</h4>
                    <span className="flex items-center text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" /> Incorrect
                    </span>
                  </div>
                  <p className="mb-2">What is the probability of getting at least one head when tossing two fair coins?</p>
                  <div className="mb-4">
                    <div className="mb-1">Your answer: 1/2</div>
                    <div className="font-medium">Correct answer: 3/4</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                    <h5 className="font-medium mb-1">Explanation:</h5>
                    <p>The possible outcomes are: HH, HT, TH, TT. The probability of getting at least one head is 3/4 as three outcomes have at least one head.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PracticeExamFeature;
