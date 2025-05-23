
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Eye, Box, Calculator, HelpCircle, AlertTriangle, MessageSquare, Target, Clock, Users, Brain, Lightbulb } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import BackButton from '../BackButton';
import EnhancedLearnTab from './EnhancedLearnTab';
import Enhanced3DTab from './Enhanced3DTab';
import QuickRecallSection from './concept-detail/QuickRecallSection';

const ConceptDetailPage = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learn');

  // Mock concept data - in real app, this would come from API
  const concept = {
    id: conceptId || 'newtons-second-law',
    title: "Newton's Second Law",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "Medium",
    description: "Understanding the relationship between force, mass, and acceleration",
    progress: 65,
    timeSpent: 45,
    estimatedTime: 60,
    lastStudied: "2 days ago",
    nextReview: "Tomorrow",
    content: `Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. This fundamental principle is expressed mathematically as F = ma, where F represents force measured in Newtons, m represents mass in kilograms, and a represents acceleration in meters per second squared.

This law helps us understand how objects move when forces are applied to them. For example, when you push a shopping cart, the cart accelerates in the direction of your push. If you push harder (increase force), the cart accelerates more. If the cart is loaded with groceries (increase mass), the same push will produce less acceleration.

Key applications include:
- Vehicle dynamics and braking systems
- Rocket propulsion and space travel
- Sports physics and athletic performance
- Engineering design and safety systems

Understanding this law is crucial for solving problems involving motion, forces, and mechanical systems in both theoretical physics and practical engineering applications.`
  };

  const kpiData = [
    {
      label: "Mastery Level",
      value: concept.progress,
      unit: "%",
      icon: <Target className="h-4 w-4" />,
      color: "text-blue-600"
    },
    {
      label: "Time Spent",
      value: concept.timeSpent,
      unit: "min",
      icon: <Clock className="h-4 w-4" />,
      color: "text-green-600"
    },
    {
      label: "Study Streak",
      value: 7,
      unit: "days",
      icon: <Users className="h-4 w-4" />,
      color: "text-purple-600"
    },
    {
      label: "Quiz Score",
      value: 85,
      unit: "%",
      icon: <Brain className="h-4 w-4" />,
      color: "text-orange-600"
    }
  ];

  const learningTools = [
    {
      id: 'quick-recall',
      title: 'Quick Recall Test',
      description: 'Test your understanding with voice or text',
      icon: <Brain className="h-5 w-5" />,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      action: () => setActiveTab('recall')
    },
    {
      id: 'practice-problems',
      title: 'Practice Problems',
      description: 'Solve step-by-step problems',
      icon: <Calculator className="h-5 w-5" />,
      color: 'bg-green-50 border-green-200 text-green-700',
      action: () => navigate('/dashboard/student/practice-exam')
    },
    {
      id: 'flashcards',
      title: 'Smart Flashcards',
      description: 'Review key concepts and formulas',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      action: () => navigate('/dashboard/student/flashcards')
    },
    {
      id: 'ai-tutor',
      title: 'Ask AI Tutor',
      description: 'Get instant help and explanations',
      icon: <MessageSquare className="h-5 w-5" />,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      action: () => setActiveTab('ask-ai')
    }
  ];

  const handleQuizComplete = (score: number) => {
    console.log('Quiz completed with score:', score);
    // Handle quiz completion logic here
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <BackButton />
      
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{concept.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{concept.subject} • {concept.chapter}</span>
              <Badge className={getDifficultyColor(concept.difficulty)}>
                {concept.difficulty}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Last studied: {concept.lastStudied}</div>
              <div className="text-sm text-gray-600">Next review: {concept.nextReview}</div>
            </div>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {concept.description}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{concept.progress}%</span>
            </div>
            <Progress value={concept.progress} className="h-2" />
          </div>
          <div className="text-sm text-gray-600">
            {concept.timeSpent}/{concept.estimatedTime} min
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`${kpi.color}`}>
                  {kpi.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {kpi.value}
                    <span className="text-sm font-normal text-gray-500 ml-1">
                      {kpi.unit}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {kpi.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Tools and Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Learning Tools & Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningTools.map((tool) => (
            <Card 
              key={tool.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${tool.color} border`}
              onClick={tool.action}
            >
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-3">
                  {tool.icon}
                </div>
                <h3 className="font-medium text-sm mb-1">{tool.title}</h3>
                <p className="text-xs opacity-80">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-6">
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learn
          </TabsTrigger>
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visual
          </TabsTrigger>
          <TabsTrigger value="3d" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            3D Models
          </TabsTrigger>
          <TabsTrigger value="formula" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Formula
          </TabsTrigger>
          <TabsTrigger value="recall" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Quick Recall
          </TabsTrigger>
          <TabsTrigger value="mistakes" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Common Mistakes
          </TabsTrigger>
          <TabsTrigger value="ask-ai" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="mt-6">
          <EnhancedLearnTab conceptName={concept.title} />
        </TabsContent>

        <TabsContent value="visual" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                Interactive Visualizations
              </CardTitle>
              <CardDescription>
                Visual representations and interactive diagrams with audio explanations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Force Vector Diagram</h3>
                    <Button variant="outline" size="sm">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Audio Explanation
                    </Button>
                  </div>
                  <div className="aspect-video bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <Eye className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Interactive Force Vector Visualization</p>
                      <p className="text-sm text-gray-400 mt-1">Click to start audio explanation</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Mass vs Acceleration Graph</h3>
                    <Button variant="outline" size="sm">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Audio Explanation
                    </Button>
                  </div>
                  <div className="aspect-video bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <Eye className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Interactive Graph Visualization</p>
                      <p className="text-sm text-gray-400 mt-1">Click to start audio explanation</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3d" className="mt-6">
          <Enhanced3DTab conceptName={concept.title} />
        </TabsContent>

        <TabsContent value="formula" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-purple-600" />
                Formula Analysis
              </CardTitle>
              <CardDescription>
                Mathematical formulas and interactive calculations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Newton's Second Law Formula</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-4 font-mono bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    F = m × a
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">F</div>
                      <div className="text-sm">Force (N)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">m</div>
                      <div className="text-sm">Mass (kg)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">a</div>
                      <div className="text-sm">Acceleration (m/s²)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Calculator className="h-5 w-5 mr-2" />
                  Open Formula Lab
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recall" className="mt-6">
          <QuickRecallSection 
            conceptId={concept.id}
            title={concept.title}
            content={concept.content}
            onQuizComplete={handleQuizComplete}
          />
        </TabsContent>

        <TabsContent value="mistakes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Common Mistakes & Previous Year Questions
              </CardTitle>
              <CardDescription>
                Learn from common errors and practice with real exam questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Frequently Made Mistakes</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-medium text-red-700 dark:text-red-400">Confusing mass and weight</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Remember: mass is measured in kg, weight is force (mg) measured in Newtons
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-medium text-red-700 dark:text-red-400">Ignoring direction in vector calculations</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Force and acceleration are vectors - direction matters in calculations
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  View Previous Year Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ask-ai" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                AI Tutor Chat
              </CardTitle>
              <CardDescription>
                Get instant help and personalized explanations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Suggested Questions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "What's the difference between mass and weight?",
                    "How do I solve problems with multiple forces?",
                    "Can you explain this with a real-world example?",
                    "What if the acceleration is zero?"
                  ].map((question, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="text-left h-auto p-3 text-sm"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2" />
                  <p>AI Tutor Chat Interface</p>
                  <p className="text-sm mt-1">Ask questions and get instant explanations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptDetailPage;
