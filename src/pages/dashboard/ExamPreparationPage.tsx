
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

const ExamPreparationPage: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exam Preparation</h1>
      
      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          <TabsTrigger value="completed">Completed Exams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="grid gap-6 md:grid-cols-2">
            <ExamCard 
              title="Physics Mid-Term"
              date="2025-05-15"
              timeLeft="8 days"
              topics={["Mechanics", "Thermodynamics", "Waves"]}
              readiness={75}
              actionType="prepare"
            />
            
            <ExamCard 
              title="Chemistry Mock Test"
              date="2025-05-22"
              timeLeft="15 days"
              topics={["Organic Chemistry", "Chemical Bonding", "Periodicity"]}
              readiness={45}
              actionType="prepare"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="practice">
          <div className="grid gap-6 md:grid-cols-2">
            <ExamCard 
              title="JEE Physics Practice Set 1"
              topics={["Mechanics", "Electromagnetism", "Modern Physics"]}
              questionCount={30}
              duration="45 min"
              difficulty="Medium"
              actionType="practice"
            />
            
            <ExamCard 
              title="NEET Biology Practice Set 3"
              topics={["Human Physiology", "Plant Physiology", "Ecology"]}
              questionCount={25}
              duration="30 min"
              difficulty="Hard"
              actionType="practice"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-6 md:grid-cols-2">
            <ExamCard 
              title="Mathematics Mock Test"
              date="2025-04-10"
              topics={["Calculus", "Algebra", "Probability"]}
              score={85}
              percentile={92}
              actionType="review"
            />
            
            <ExamCard 
              title="Chemistry Periodic Test"
              date="2025-04-05"
              topics={["States of Matter", "Chemical Equilibrium", "Solutions"]}
              score={72}
              percentile={68}
              actionType="review"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ExamCardProps {
  title: string;
  date?: string;
  timeLeft?: string;
  topics: string[];
  readiness?: number;
  questionCount?: number;
  duration?: string;
  difficulty?: string;
  score?: number;
  percentile?: number;
  actionType: 'prepare' | 'practice' | 'review';
}

const ExamCard: React.FC<ExamCardProps> = ({
  title,
  date,
  timeLeft,
  topics,
  readiness,
  questionCount,
  duration,
  difficulty,
  score,
  percentile,
  actionType,
}) => {
  const [showExamModal, setShowExamModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleStartExam = () => {
    setShowExamModal(true);
  };

  const handleReviewExam = () => {
    setShowReviewModal(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          {difficulty && (
            <Badge variant={
              difficulty === 'Easy' ? 'success' : 
              difficulty === 'Medium' ? 'default' : 'destructive'
            }>
              {difficulty}
            </Badge>
          )}
        </div>
        <CardDescription>
          {date && (
            <div className="flex items-center mt-1 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
              {timeLeft && <span className="ml-2 text-amber-600 dark:text-amber-400">({timeLeft} remaining)</span>}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
            <div className="flex flex-wrap gap-1">
              {topics.map((topic, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          
          {readiness !== undefined && (
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Readiness Score</span>
                <span className={`font-medium 
                  ${readiness > 80 ? 'text-green-600' : 
                    readiness > 50 ? 'text-amber-600' : 
                    'text-red-600'}`
                }>
                  {readiness}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    readiness > 80 ? 'bg-green-500' : 
                    readiness > 50 ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${readiness}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {(questionCount && duration) && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-sm">{questionCount} Questions</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-sm">{duration}</span>
              </div>
            </div>
          )}
          
          {(score !== undefined && percentile !== undefined) && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Score:</span>
                <span className="font-medium">{score}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Percentile:</span>
                <span className="font-medium">{percentile}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        {actionType === 'prepare' && (
          <Button className="w-full" variant="outline">
            Continue Preparation <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
        
        {actionType === 'practice' && (
          <Button className="w-full" onClick={handleStartExam}>
            Start Exam <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
        
        {actionType === 'review' && (
          <Button className="w-full" variant="secondary" onClick={handleReviewExam}>
            Review Exam <CheckCircle className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardFooter>

      {/* Exam Modal */}
      {showExamModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-xl">{title}</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowExamModal(false)}>
                <X size={18} />
              </Button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Instructions:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>This exam contains {questionCount} questions</li>
                  <li>Time limit: {duration}</li>
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
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Question 2</h3>
                  <p className="mb-4">Which of the following is an example of potential energy?</p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="q2-a" name="q2" className="mr-2" />
                      <label htmlFor="q2-a">A car moving at constant velocity</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q2-b" name="q2" className="mr-2" />
                      <label htmlFor="q2-b">A book held above the ground</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q2-c" name="q2" className="mr-2" />
                      <label htmlFor="q2-c">Sound waves traveling through air</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q2-d" name="q2" className="mr-2" />
                      <label htmlFor="q2-d">A person running</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline">Previous</Button>
                <Button variant="outline">Mark for Review</Button>
                <Button>Next</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-xl">Exam Review: {title}</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowReviewModal(false)}>
                <X size={18} />
              </Button>
            </div>
            <div className="p-6">
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold mb-3">Performance Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Score:</span>
                      <span className="font-medium">{score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Percentile:</span>
                      <span className="font-medium">{percentile}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Questions Attempted:</span>
                      <span className="font-medium">30/30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Correct Answers:</span>
                      <span className="font-medium">24/30</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold mb-3">Strengths</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Excellent understanding of Calculus concepts</li>
                    <li>Strong in problem-solving</li>
                    <li>Good time management</li>
                  </ul>
                </div>
              </div>

              <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <h3 className="font-semibold mb-3">Areas for Improvement</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Review Probability concepts - 4/6 questions incorrect</li>
                  <li>Practice more complex Algebra problems</li>
                  <li>Work on improving accuracy in calculation</li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <h3 className="font-semibold">Question Analysis</h3>
                
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Question 1</h4>
                    <Badge variant="success">Correct</Badge>
                  </div>
                  <p className="mb-2">What is the derivative of f(x) = x²?</p>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="font-medium">Your answer: f'(x) = 2x</span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                    <h5 className="font-medium mb-1">Explanation:</h5>
                    <p>The derivative of x² is 2x, following the power rule: d/dx(x^n) = n·x^(n-1)</p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Question 8</h4>
                    <Badge variant="destructive">Incorrect</Badge>
                  </div>
                  <p className="mb-2">What is the probability of getting at least one head when tossing two fair coins?</p>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>Your answer: 1/2</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="font-medium">Correct answer: 3/4</span>
                    </div>
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

export default ExamPreparationPage;
