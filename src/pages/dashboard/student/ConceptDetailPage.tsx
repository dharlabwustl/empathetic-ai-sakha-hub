
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Brain, Target, Play, Clock } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import ConceptVoiceAssistant from '@/components/voice/ConceptVoiceAssistant';
import ConceptFlashcards from '@/components/dashboard/student/concepts/concept-detail/ConceptFlashcards';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock concept data - in real app, this would come from an API
  const conceptData = {
    id: conceptId || '1',
    title: "Newton's Laws of Motion",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "Medium",
    duration: "25 min",
    description: "Understand the fundamental principles governing motion and forces in classical mechanics.",
    keyPoints: [
      "First Law: An object at rest stays at rest unless acted upon by a force",
      "Second Law: F = ma (Force equals mass times acceleration)",
      "Third Law: For every action, there is an equal and opposite reaction"
    ],
    examples: [
      "A ball rolling on a frictionless surface (First Law)",
      "Pushing a car with different forces (Second Law)",
      "Walking - pushing ground backward, ground pushes you forward (Third Law)"
    ],
    formulas: [
      { formula: "F = ma", description: "Newton's Second Law" },
      { formula: "ΣF = 0", description: "Equilibrium condition" }
    ],
    relatedConcepts: [
      { id: '2', title: 'Kinematics', subject: 'Physics' },
      { id: '3', title: 'Work and Energy', subject: 'Physics' }
    ]
  };

  const flashcards = [
    {
      id: '1',
      front: "What is Newton's First Law of Motion?",
      back: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force."
    },
    {
      id: '2',
      front: "State Newton's Second Law mathematically",
      back: "F = ma, where F is the net force applied, m is the mass of the object, and a is the acceleration produced."
    },
    {
      id: '3',
      front: "Explain Newton's Third Law with an example",
      back: "For every action, there is an equal and opposite reaction. Example: When you walk, you push the ground backward (action), and the ground pushes you forward (reaction)."
    }
  ];

  const handleBackClick = () => {
    navigate('/dashboard/student/concepts');
  };

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} • ${conceptData.topic}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <Helmet>
        <title>{conceptData.title} - PREPZR</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Voice Assistant */}
        <div className="flex justify-end">
          <ConceptVoiceAssistant 
            conceptData={conceptData}
            userName="Student"
            isEnabled={true}
          />
        </div>

        {/* Concept Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{conceptData.title}</h1>
                  <p className="text-blue-100 mb-4">{conceptData.description}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {conceptData.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-blue-100">
                      <Clock className="h-4 w-4" />
                      {conceptData.duration}
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Concept Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="formulas">Formulas</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Key Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {conceptData.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Related Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {conceptData.relatedConcepts.map((concept) => (
                    <div 
                      key={concept.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                    >
                      <h4 className="font-medium">{concept.title}</h4>
                      <p className="text-sm text-gray-600">{concept.subject}</p>
                    </div>
                  ))}
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
                  {conceptData.examples.map((example, index) => (
                    <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-gray-800">{example}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formulas">
            <Card>
              <CardHeader>
                <CardTitle>Important Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conceptData.formulas.map((formula, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="text-2xl font-mono text-center py-4 bg-gray-50 rounded mb-2">
                        {formula.formula}
                      </div>
                      <p className="text-gray-600 text-center">{formula.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Practice Flashcards</CardTitle>
              </CardHeader>
              <CardContent>
                <ConceptFlashcards flashcards={flashcards} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
