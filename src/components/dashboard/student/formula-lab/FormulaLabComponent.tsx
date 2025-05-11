
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HelpCircle, Calculator, Upload, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScientificCalculator from './ScientificCalculator';

interface FormulaLabComponentProps {
  conceptId?: string;
  formulaName?: string;
}

const FormulaLabComponent: React.FC<FormulaLabComponentProps> = ({ conceptId, formulaName = 'General Physics' }) => {
  // State variables
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [answersSubmitted, setAnswersSubmitted] = useState<boolean>(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Mock questions based on difficulty level
  const generateQuestions = (difficulty: string, count: number) => {
    const questionDifficulties = {
      easy: [
        { 
          question: 'Calculate the kinetic energy of a 2 kg object moving at 3 m/s.', 
          solution: '9 J',
          hint: 'Use the formula KE = (1/2) × m × v²',
          steps: ['Identify the mass (m) = 2 kg', 'Identify the velocity (v) = 3 m/s', 'Apply the formula KE = (1/2) × m × v²', 'KE = 0.5 × 2 × 3²', 'KE = 0.5 × 2 × 9', 'KE = 9 J']
        },
        { 
          question: 'Find the displacement when an object moves from position x₁ = 5 m to position x₂ = 12 m.', 
          solution: '7 m',
          hint: 'Displacement is calculated as the difference between final and initial positions',
          steps: ['Identify initial position x₁ = 5 m', 'Identify final position x₂ = 12 m', 'Calculate displacement as x₂ - x₁', 'Displacement = 12 m - 5 m', 'Displacement = 7 m']
        }
      ],
      medium: [
        { 
          question: 'Calculate the gravitational potential energy of a 5 kg object at a height of 10 m (g = 9.8 m/s²).', 
          solution: '490 J',
          hint: 'Use the formula PE = m × g × h',
          steps: ['Identify mass (m) = 5 kg', 'Identify height (h) = 10 m', 'Use g = 9.8 m/s²', 'Apply formula PE = m × g × h', 'PE = 5 × 9.8 × 10', 'PE = 490 J']
        },
        { 
          question: 'A force of 20 N acts on an object over a distance of 5 m. Calculate the work done.', 
          solution: '100 J',
          hint: 'Use the formula Work = Force × Distance',
          steps: ['Identify force (F) = 20 N', 'Identify distance (d) = 5 m', 'Apply formula Work = F × d', 'Work = 20 × 5', 'Work = 100 J']
        }
      ],
      hard: [
        { 
          question: 'An object with mass 3 kg moves along the x-axis with a potential energy function U(x) = 2x² + 3x - 5. Calculate the force at x = 2 m.', 
          solution: '-11 N',
          hint: 'Force is the negative derivative of potential energy: F = -dU/dx',
          steps: ['The potential energy function is U(x) = 2x² + 3x - 5', 'Calculate the derivative dU/dx = 4x + 3', 'Evaluate at x = 2: dU/dx = 4(2) + 3 = 11', 'Force is the negative of this: F = -dU/dx = -11 N']
        },
        { 
          question: 'A 5 kg object oscillates according to the equation x(t) = 0.3 sin(2πt) where x is in meters and t in seconds. Find the maximum kinetic energy of the object.', 
          solution: '5.92 J',
          hint: 'Find the maximum velocity using the derivative of position, then use KE = (1/2)mv²',
          steps: [
            'The position is x(t) = 0.3 sin(2πt)',
            'The velocity is v(t) = dx/dt = 0.3 × 2π × cos(2πt)',
            'The maximum velocity occurs when cos(2πt) = 1',
            'So maximum velocity = 0.3 × 2π = 1.884 m/s',
            'The mass is m = 5 kg',
            'Maximum kinetic energy = (1/2)mv² = 0.5 × 5 × 1.884² = 5.92 J'
          ]
        }
      ]
    };

    // Select questions based on difficulty level
    const selectedQuestions = questionDifficulties[difficulty as keyof typeof questionDifficulties] || [];
    
    // Generate the requested number of questions (with repetition if necessary)
    const result = [];
    for (let i = 0; i < count; i++) {
      const question = selectedQuestions[i % selectedQuestions.length];
      result.push({ ...question });
    }
    
    return result;
  };

  // Generate questions based on current settings
  const [questions, setQuestions] = useState(() => 
    generateQuestions(difficultyLevel, numberOfQuestions)
  );

  // Regenerate questions when settings change
  useEffect(() => {
    setQuestions(generateQuestions(difficultyLevel, numberOfQuestions));
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(numberOfQuestions).fill(''));
    setAnswersSubmitted(false);
    setShowSolutions(false);
    setShowHint(false);
  }, [difficultyLevel, numberOfQuestions]);

  // Handle answer input change
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(newAnswers);
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHint(false);
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowHint(false);
    }
  };

  // Submit answers for checking
  const handleSubmitAnswers = () => {
    setAnswersSubmitted(true);
  };

  // Reset the lab
  const handleReset = () => {
    setQuestions(generateQuestions(difficultyLevel, numberOfQuestions));
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(numberOfQuestions).fill(''));
    setAnswersSubmitted(false);
    setShowSolutions(false);
    setShowHint(false);
  };

  // Check if the given answer is correct
  const isAnswerCorrect = (userAnswer: string, correctSolution: string) => {
    if (!userAnswer) return false;
    
    // Remove all whitespace and make lowercase for comparison
    const normalizedUserAnswer = userAnswer.replace(/\s+/g, '').toLowerCase();
    const normalizedCorrectAnswer = correctSolution.replace(/\s+/g, '').toLowerCase();
    
    return normalizedUserAnswer === normalizedCorrectAnswer;
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Process file upload
  const handleFileUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Reset after "upload"
    setTimeout(() => {
      setFile(null);
      setUploadProgress(0);
      setIsUploading(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Formula Lab Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center sm:text-left">
            Formula Practice Lab: {formulaName}
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Practice solving problems and master formulas through hands-on exercises
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Settings Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Practice Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select 
                value={difficultyLevel} 
                onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficultyLevel(value)}
              >
                <SelectTrigger id="difficulty" className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="questionCount">Number of Questions</Label>
              <Select 
                value={numberOfQuestions.toString()} 
                onValueChange={(value) => setNumberOfQuestions(parseInt(value))}
              >
                <SelectTrigger id="questionCount" className="w-full">
                  <SelectValue placeholder="Select count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Questions</SelectItem>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button onClick={handleReset}>
              Generate New Problems
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Question and Answer Panel */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1"
              >
                <HelpCircle className="w-4 h-4" /> 
                Hint
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowCalculator(!showCalculator)}
                className="flex items-center gap-1"
              >
                <Calculator className="w-4 h-4" /> 
                Calculator
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Question Display */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
            <p className="font-medium">{questions[currentQuestionIndex]?.question}</p>
          </div>
          
          {/* Hint Display */}
          {showHint && (
            <div className="p-4 bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <span className="font-semibold">Hint:</span> {questions[currentQuestionIndex]?.hint}
              </p>
            </div>
          )}
          
          {/* Calculator */}
          {showCalculator && (
            <div className="border rounded-md p-4">
              <ScientificCalculator />
            </div>
          )}
          
          {/* Answer Input */}
          <div className="space-y-2">
            <Label htmlFor="answer">Your Answer:</Label>
            <Input 
              id="answer"
              value={userAnswers[currentQuestionIndex] || ''}
              onChange={handleAnswerChange}
              placeholder="Enter your answer here"
              disabled={answersSubmitted}
            />
          </div>
          
          {/* Solution Display (when submitted) */}
          {answersSubmitted || showSolutions ? (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md space-y-4">
              <div className="flex items-center gap-2">
                {isAnswerCorrect(userAnswers[currentQuestionIndex], questions[currentQuestionIndex]?.solution) ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    <span>Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span>Incorrect. The correct answer is {questions[currentQuestionIndex]?.solution}</span>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Solution Steps:</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  {questions[currentQuestionIndex]?.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ) : null}
          
          {/* File Upload Section */}
          <div className="mt-6 p-4 border border-dashed rounded-md">
            <h4 className="font-medium mb-2">Upload Your Solution</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Input 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.png,.jpeg,.doc,.docx"
                  disabled={isUploading}
                />
                {uploadProgress > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Button 
                  onClick={handleFileUpload}
                  disabled={!file || isUploading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Upload
                </Button>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <div className="space-x-2">
              {!answersSubmitted && (
                <Button
                  variant="outline"
                  onClick={() => setShowSolutions(!showSolutions)}
                >
                  {showSolutions ? "Hide Solution" : "Show Solution"}
                </Button>
              )}
              
              <Button
                onClick={handleSubmitAnswers}
                disabled={answersSubmitted}
                variant="default"
              >
                Submit Answer
              </Button>
            </div>
            
            <Button
              variant="default"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="flex items-center"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaLabComponent;
