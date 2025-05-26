
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import {
  BookOpen,
  Brain,
  Clock,
  Target,
  CheckCircle,
  Play,
  Volume2,
  Eye,
  Video,
  FileText,
  Lightbulb,
  Star,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [completed, setCompleted] = useState(false);

  // Mock concept data
  const conceptData = {
    id: conceptId,
    title: "Organic Chemistry: Reaction Mechanisms",
    subject: "Chemistry",
    difficulty: "Advanced",
    estimatedTime: 45,
    progress: 65,
    description: "Master the fundamental principles of organic reaction mechanisms, including electron movement, intermediate formation, and product prediction.",
    learningObjectives: [
      "Understand electron movement in organic reactions",
      "Identify reaction intermediates and transition states",
      "Predict major and minor products",
      "Apply mechanism knowledge to synthesis problems"
    ],
    techniques: [
      {
        id: '3d',
        name: '3D Molecular Models',
        icon: <Eye className="h-4 w-4" />,
        description: 'Interactive 3D visualization of molecular structures and electron movement',
        completed: true
      },
      {
        id: 'visual',
        name: 'Visual Diagrams',
        icon: <Target className="h-4 w-4" />,
        description: 'Step-by-step reaction mechanism diagrams with electron arrows',
        completed: true
      },
      {
        id: 'video',
        name: 'Video Lectures',
        icon: <Video className="h-4 w-4" />,
        description: 'Expert explanations with real-time mechanism drawing',
        completed: false
      },
      {
        id: 'summary',
        name: 'Summary Notes',
        icon: <FileText className="h-4 w-4" />,
        description: 'Concise notes with key patterns and memory aids',
        completed: false
      }
    ],
    relatedConcepts: [
      { id: 'stereochemistry', title: 'Stereochemistry', subject: 'Chemistry' },
      { id: 'functional-groups', title: 'Functional Groups', subject: 'Chemistry' },
      { id: 'thermodynamics', title: 'Chemical Thermodynamics', subject: 'Chemistry' }
    ],
    practiceProblems: [
      { id: 1, title: 'SN1 vs SN2 Mechanisms', difficulty: 'Medium', completed: true },
      { id: 2, title: 'Elimination Reactions', difficulty: 'Hard', completed: false },
      { id: 3, title: 'Carbocation Rearrangements', difficulty: 'Hard', completed: false }
    ]
  };

  const handleStartLearning = () => {
    setCompleted(true);
    // Here you would typically navigate to the actual learning content
  };

  const handleTechniqueClick = (technique: any) => {
    // Navigate to specific learning technique
    console.log(`Opening ${technique.name} for ${conceptData.title}`);
  };

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} • ${conceptData.difficulty} Level`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500 rounded-full text-white">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">{conceptData.subject}</Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {conceptData.estimatedTime} minutes
                        <span>•</span>
                        <Target className="h-4 w-4" />
                        {conceptData.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {conceptData.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{conceptData.progress}%</span>
                      </div>
                      <Progress value={conceptData.progress} className="h-2" />
                    </div>
                    <Button 
                      onClick={handleStartLearning}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {conceptData.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="techniques">Learning Techniques</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      Learning Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {conceptData.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Your Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Concept Understanding</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Practice Problems</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Memory Retention</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="techniques" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {conceptData.techniques.map((technique) => (
                  <motion.div
                    key={technique.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleTechniqueClick(technique)}
                  >
                    <Card className={`cursor-pointer transition-all ${
                      technique.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-full ${
                            technique.completed 
                              ? 'bg-green-500 text-white' 
                              : 'bg-blue-500 text-white'
                          }`}>
                            {technique.completed ? <CheckCircle className="h-5 w-5" /> : technique.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{technique.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">{technique.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant={technique.completed ? "default" : "outline"}>
                                {technique.completed ? "Completed" : "Available"}
                              </Badge>
                              <ArrowRight className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practice" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    Practice Problems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conceptData.practiceProblems.map((problem) => (
                      <div
                        key={problem.id}
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          problem.completed ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            problem.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                          }`}>
                            {problem.completed ? <CheckCircle className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{problem.title}</h4>
                            <Badge variant="outline" className="mt-1">
                              {problem.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {problem.completed ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-500" />
                    Related Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {conceptData.relatedConcepts.map((concept) => (
                      <div
                        key={concept.id}
                        onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div>
                          <h4 className="font-medium">{concept.title}</h4>
                          <Badge variant="outline" className="mt-1">
                            {concept.subject}
                          </Badge>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Voice Assistant */}
      <FloatingVoiceButton 
        userName="Student"
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
      />
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
