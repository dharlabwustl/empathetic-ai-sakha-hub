import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Clock, 
  Target,
  Award,
  Gift,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TestContainerProps {
  currentTest: string | null;
  selectedExam: string;
  setSelectedExam: (exam: string) => void;
  loading: boolean;
  progress: number;
  testCompleted: boolean;
  results: any;
  examTypes: any[];
  simulateReadinessTest: () => void;
  simulateScholarTest: () => void;
  simulateConceptTest: () => void;
  handleStartTest: (testType: string) => void;
  handleStartOver: () => void;
  handleReadinessTestComplete: () => void;
  handleScholarTestComplete: () => void;
  handleConceptTestComplete: () => void;
  handleNavigation: (route: string) => void;
}

const TestContainer: React.FC<TestContainerProps> = ({
  currentTest,
  selectedExam,
  setSelectedExam,
  loading,
  progress,
  testCompleted,
  results,
  examTypes,
  handleStartTest,
  handleStartOver,
  handleReadinessTestComplete,
  handleScholarTestComplete,
  handleConceptTestComplete,
  handleNavigation
}) => {
  React.useEffect(() => {
    if (progress >= 100 && !testCompleted) {
      if (currentTest === 'readiness') {
        handleReadinessTestComplete();
      } else if (currentTest === 'scholar') {
        handleScholarTestComplete();
      } else if (currentTest === 'concept') {
        handleConceptTestComplete();
      }
    }
  }, [progress, testCompleted, currentTest]);

  if (!currentTest) {
    return (
      <div className="space-y-6">
        {/* Test Type Selection */}
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-blue-200 hover:border-blue-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Exam Readiness</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Assess your overall preparation level and get personalized recommendations
                  </p>
                </div>
                <Button 
                  onClick={() => handleStartTest('readiness')}
                  className="w-full"
                  variant="outline"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-green-200 hover:border-green-300 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500 text-white">FREE ACCESS</Badge>
              </div>
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Scholar Test</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Score 90%+ and get 1 month free premium access to our platform!
                  </p>
                </div>
                <Button 
                  onClick={() => handleStartTest('scholar')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Take Scholar Test
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Concept Test</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Test your understanding of key concepts across all subjects
                  </p>
                </div>
                <Button 
                  onClick={() => handleStartTest('concept')}
                  className="w-full"
                  variant="outline"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Test Concepts
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Exam Selection for Readiness Test */}
        {(currentTest === 'readiness' || currentTest === 'concept') && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Your Target Exam</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {examTypes.map((exam) => (
                <Button
                  key={exam.id}
                  variant={selectedExam === exam.id ? "default" : "outline"}
                  onClick={() => setSelectedExam(exam.id)}
                  className="h-auto p-4 text-left"
                >
                  <div>
                    <div className="font-medium">{exam.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {exam.questionCount} questions • {exam.duration} min
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (loading || progress < 100) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            {currentTest === 'scholar' ? 'Taking Scholar Test...' : 
             currentTest === 'readiness' ? 'Analyzing Your Readiness...' : 
             'Testing Your Concepts...'}
          </h3>
          <Progress value={progress} className="w-full h-3" />
          <p className="text-gray-600">
            {progress < 25 ? 'Initializing test...' :
             progress < 50 ? 'Processing your answers...' :
             progress < 75 ? 'Analyzing performance...' :
             'Generating results...'}
          </p>
        </div>
      </div>
    );
  }

  if (testCompleted && results) {
    return (
      <div className="space-y-6">
        {currentTest === 'scholar' ? (
          <div className="text-center space-y-6">
            <div className={`p-6 rounded-lg ${results.qualified ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
              <div className="space-y-4">
                {results.qualified ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                ) : (
                  <Target className="w-16 h-16 text-orange-500 mx-auto" />
                )}
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">Your Score: {results.score}%</h3>
                  <p className={`text-lg ${results.qualified ? 'text-green-700' : 'text-orange-700'}`}>
                    {results.message}
                  </p>
                </div>

                {results.qualified && (
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-lg border border-green-300">
                      <h4 className="font-semibold text-green-800 mb-2">🎉 Premium Benefits Unlocked:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Access to all premium study materials</li>
                        <li>• Unlimited practice tests</li>
                        <li>• Advanced analytics and insights</li>
                        <li>• Priority customer support</li>
                      </ul>
                    </div>
                    <Button 
                      onClick={() => handleNavigation('/signup')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Claim Your Free Access
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(results.subjects).map(([subject, score]) => (
                <Card key={subject}>
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium capitalize">{subject}</h4>
                    <div className="text-2xl font-bold text-blue-600 mt-2">{score}%</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Existing results display for other tests
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                {currentTest === 'readiness' ? 'Your Readiness Report' : 'Concept Test Results'}
              </h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {results.overall || results.score}%
              </div>
              <p className="text-gray-600">Overall Performance</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(results.subjects).map(([subject, score]) => (
                <Card key={subject}>
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium capitalize">{subject}</h4>
                    <div className="text-2xl font-bold text-blue-600 mt-2">{score}%</div>
                    <Progress value={score} className="mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {results.recommendations && (
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">📋 Personalized Recommendations</h4>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={handleStartOver} variant="outline">
            Take Another Test
          </Button>
          <Button onClick={() => handleNavigation('/signup')}>
            Start Learning Journey
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default TestContainer;
