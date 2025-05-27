
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Target, 
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Star,
  Brain,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ConceptDetail {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  progress: number;
  content: {
    theory: string;
    examples: string[];
    keyPoints: string[];
    formulas?: string[];
  };
  relatedConcepts: string[];
  practiceQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

const ConceptCardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('theory');
  const [studyTime, setStudyTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Mock concept data
  const conceptData: ConceptDetail = {
    id: id || '1',
    title: "Newton's Laws of Motion",
    description: "Fundamental principles that describe the relationship between forces and motion",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "medium",
    estimatedTime: 30,
    progress: 65,
    content: {
      theory: `Newton's Laws of Motion form the foundation of classical mechanics. These three laws describe the relationship between forces acting on a body and its motion due to those forces.

**First Law (Law of Inertia):** An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.

**Second Law:** The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma

**Third Law:** For every action, there is an equal and opposite reaction.`,
      examples: [
        "A ball rolling on a smooth surface continues rolling until friction stops it (First Law)",
        "Pushing a car requires more force than pushing a bicycle for the same acceleration (Second Law)",
        "When you walk, you push backward on the ground, and the ground pushes forward on you (Third Law)"
      ],
      keyPoints: [
        "Inertia is the tendency of objects to resist changes in motion",
        "Force equals mass times acceleration (F = ma)",
        "Forces always occur in pairs",
        "Net force determines acceleration, not velocity"
      ],
      formulas: [
        "F = ma (Force = mass × acceleration)",
        "Σf = ma (Sum of forces = mass × acceleration)",
        "a = F/m (acceleration = Force/mass)"
      ]
    },
    relatedConcepts: ["Force and Acceleration", "Friction", "Momentum"],
    practiceQuestions: [
      {
        id: "q1",
        question: "According to Newton's First Law, what happens to an object in motion when no external force acts on it?",
        options: [
          "It gradually slows down and stops",
          "It continues moving at constant velocity",
          "It accelerates",
          "It changes direction"
        ],
        correctAnswer: 1,
        explanation: "Newton's First Law states that an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force."
      }
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const toggleStudyTimer = () => {
    setIsStudying(!isStudying);
  };

  const resetTimer = () => {
    setStudyTime(0);
    setIsStudying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{conceptData.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{conceptData.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {conceptData.subject}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(conceptData.difficulty)}>
              {conceptData.difficulty}
            </Badge>
          </div>
        </motion.div>

        {/* Study Timer and Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{formatTime(studyTime)}</div>
                  <div className="text-sm text-gray-600 mb-4">Study Time</div>
                  <div className="flex justify-center gap-2">
                    <Button size="sm" onClick={toggleStudyTimer} variant={isStudying ? "destructive" : "default"}>
                      {isStudying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={resetTimer}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{conceptData.progress}%</div>
                  <div className="text-sm text-gray-600 mb-4">Progress</div>
                  <Progress value={conceptData.progress} className="h-2" />
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{conceptData.estimatedTime}</div>
                  <div className="text-sm text-gray-600 mb-4">Est. Time (min)</div>
                  <div className="flex justify-center">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Clock className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
              <TabsTrigger value="theory">
                <BookOpen className="h-4 w-4 mr-2" />
                Theory
              </TabsTrigger>
              <TabsTrigger value="examples">
                <Target className="h-4 w-4 mr-2" />
                Examples
              </TabsTrigger>
              <TabsTrigger value="practice">
                <Brain className="h-4 w-4 mr-2" />
                Practice
              </TabsTrigger>
              <TabsTrigger value="related">
                <FileText className="h-4 w-4 mr-2" />
                Related
              </TabsTrigger>
            </TabsList>

            <TabsContent value="theory">
              <Card>
                <CardHeader>
                  <CardTitle>Theory & Concepts</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                    {conceptData.content.theory}
                  </div>
                  
                  {conceptData.content.formulas && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3">Key Formulas</h4>
                      <div className="space-y-2">
                        {conceptData.content.formulas.map((formula, index) => (
                          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono">
                            {formula}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3">Key Points</h4>
                    <ul className="space-y-2">
                      {conceptData.content.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples">
              <Card>
                <CardHeader>
                  <CardTitle>Real-world Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conceptData.content.examples.map((example, index) => (
                      <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-3">
                          <div className="p-1 bg-blue-500 rounded-full text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{example}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {conceptData.practiceQuestions.map((question, index) => (
                      <div key={question.id} className="p-6 border rounded-lg">
                        <h4 className="font-semibold mb-4">Question {index + 1}</h4>
                        <p className="mb-4">{question.question}</p>
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optIndex) => (
                            <button 
                              key={optIndex}
                              className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </button>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related">
              <Card>
                <CardHeader>
                  <CardTitle>Related Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conceptData.relatedConcepts.map((concept, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            <span className="font-medium">{concept}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      <style>
        {`
          .prose h1, .prose h2, .prose h3, .prose h4 {
            color: inherit;
          }
          .prose strong {
            font-weight: 600;
          }
        `}
      </style>
    </div>
  );
};

export default ConceptCardDetail;
