
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Target, 
  CheckCircle, 
  Play,
  Pause,
  RotateCcw,
  Lightbulb,
  Brain,
  Zap,
  Mic
} from 'lucide-react';
import SpeechRecognitionButton from '@/components/dashboard/student/SpeechRecognitionButton';
import InteractiveVoiceAssistant from '@/components/voice/InteractiveVoiceAssistant';

const ConceptDetailPage = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const [isStudying, setIsStudying] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock concept data
  const conceptData = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    difficulty: "Medium",
    estimatedTime: "45 minutes",
    description: "Understanding the fundamental principles that govern motion and forces",
    objectives: [
      "Understand Newton's First Law (Law of Inertia)",
      "Master Newton's Second Law (F = ma)",
      "Apply Newton's Third Law (Action-Reaction)",
      "Solve problems involving forces and acceleration"
    ],
    content: {
      theory: "Newton's laws of motion are three fundamental laws that form the foundation of classical mechanics...",
      examples: [
        "A ball rolling on a frictionless surface continues moving at constant velocity",
        "Force applied to accelerate a car depends on its mass",
        "When you push a wall, it pushes back with equal force"
      ],
      formulas: [
        "F = ma (Newton's Second Law)",
        "F₁₂ = -F₂₁ (Newton's Third Law)"
      ]
    },
    relatedConcepts: [
      { id: "forces", title: "Types of Forces" },
      { id: "motion", title: "Kinematics" },
      { id: "momentum", title: "Conservation of Momentum" }
    ]
  };

  // Study timer effect
  useEffect(() => {
    let interval: number;
    if (isStudying) {
      interval = window.setInterval(() => {
        setStudyTime(prev => prev + 1);
        setProgress(prev => Math.min(prev + 0.5, 100));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStudy = () => {
    setIsStudying(true);
  };

  const handlePauseStudy = () => {
    setIsStudying(false);
  };

  const handleCompleteStudy = () => {
    setIsStudying(false);
    setIsCompleted(true);
    setProgress(100);
  };

  const handleResetStudy = () => {
    setIsStudying(false);
    setStudyTime(0);
    setProgress(0);
    setIsCompleted(false);
  };

  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {conceptData.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{conceptData.subject}</Badge>
                <Badge variant="secondary">{conceptData.difficulty}</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {conceptData.estimatedTime}
                </span>
              </div>
            </div>
          </div>

          {/* Voice Assistant Controls */}
          <div className="flex items-center gap-3">
            <SpeechRecognitionButton 
              context="concept-detail"
              size="md"
              userName="Student"
              className="shadow-lg"
            />
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Study Helper
            </Button>
          </div>
        </motion.div>

        {/* Study Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Study Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatTime(studyTime)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Progress: {Math.round(progress)}%
                    </div>
                    <Progress value={progress} className="w-32" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!isStudying && !isCompleted && (
                    <Button onClick={handleStartStudy} className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Start Study
                    </Button>
                  )}
                  {isStudying && (
                    <>
                      <Button onClick={handlePauseStudy} variant="outline" className="flex items-center gap-2">
                        <Pause className="w-4 h-4" />
                        Pause
                      </Button>
                      <Button onClick={handleCompleteStudy} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Complete
                      </Button>
                    </>
                  )}
                  {(isCompleted || progress > 0) && (
                    <Button onClick={handleResetStudy} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center"
                >
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 dark:text-green-200">
                    Concept Mastered!
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                    Great job! You've completed this concept study session.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {conceptData.objectives.map((objective, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          progress >= (index + 1) * 25 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {progress >= (index + 1) * 25 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                        </div>
                        <span className={`${
                          progress >= (index + 1) * 25 
                            ? 'text-green-700 dark:text-green-300 line-through' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {objective}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Theory Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Theory & Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {conceptData.content.theory}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                      Key Examples
                    </h4>
                    <ul className="space-y-2">
                      {conceptData.content.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-600" />
                      Key Formulas
                    </h4>
                    <div className="space-y-2">
                      {conceptData.content.formulas.map((formula, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg font-mono text-center">
                          {formula}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Concepts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Concepts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {conceptData.relatedConcepts.map((concept, index) => (
                    <Button
                      key={concept.id}
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                    >
                      <div>
                        <div className="font-medium">{concept.title}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Practice Questions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Create Flashcards
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    AI Quiz
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Voice Assistant for Concept Study */}
      <InteractiveVoiceAssistant 
        userName="Student"
        language="en-US"
        onNavigationCommand={handleNavigationCommand}
        position="bottom-right"
        context={`concept-study-${conceptData.title}`}
      />
    </div>
  );
};

export default ConceptDetailPage;
