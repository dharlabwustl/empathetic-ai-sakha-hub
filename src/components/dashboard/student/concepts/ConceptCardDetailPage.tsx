
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, BookOpen, Check, CheckCircle, Clock, Edit, 
  MessageSquare, Play, PlayCircle, Puzzle, Star 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import ConceptCardLinks from './ConceptCardLinks';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for concept cards
const getMockConceptCard = (conceptId: string) => {
  return {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    difficulty: "Medium",
    estimatedTime: 15,
    completion: 75,
    recallAccuracy: 85,
    lastReviewed: "2 days ago",
    content: "Newton's three laws of motion describe the relationship between the motion of an object and the forces acting on it.",
    details: [
      {
        subtitle: "First Law (Law of Inertia)",
        content: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.",
        examples: [
          "A book sitting on a table remains at rest unless a force moves it.",
          "Passengers in a car tend to continue moving forward when the car suddenly stops."
        ],
        applicationQuestions: [
          "Why do you jerk forward when a car suddenly stops?",
          "How does a seat belt protect you during a collision?"
        ]
      },
      {
        subtitle: "Second Law (F = ma)",
        content: "The acceleration of an object depends on the mass of the object and the amount of force applied. F = ma where F is force, m is mass, and a is acceleration.",
        examples: [
          "A small force applied to a light object produces the same acceleration as a large force applied to a heavy object.",
          "It requires more force to accelerate a truck than a car at the same rate."
        ],
        applicationQuestions: [
          "Why is it harder to push a heavy shopping cart than an empty one?",
          "How does the mass of a rocket affect the amount of fuel needed for liftoff?"
        ]
      },
      {
        subtitle: "Third Law (Action-Reaction)",
        content: "For every action, there is an equal and opposite reaction. Forces always occur in pairs.",
        examples: [
          "When you push against a wall, the wall pushes back with equal force.",
          "Rockets propel forward by expelling gas backwards."
        ],
        applicationQuestions: [
          "How does a rocket move forward in the vacuum of space?",
          "Why does a rowboat move when you paddle water backwards?"
        ]
      }
    ],
    keyPoints: [
      "Force is required to change an object's state of motion.",
      "Greater force produces greater acceleration for the same mass.",
      "Forces always occur in equal and opposite pairs."
    ],
    practiceQuestions: [
      {
        question: "A book is at rest on a table. Which of Newton's laws explains why it doesn't fall through the table?",
        options: [
          "First law",
          "Second law",
          "Third law",
          "None of the above"
        ],
        correctAnswer: "Third law"
      },
      {
        question: "According to Newton's second law, if the mass of an object is doubled while the force remains constant, the acceleration will:",
        options: [
          "Double",
          "Remain the same",
          "Halve",
          "Become zero"
        ],
        correctAnswer: "Halve"
      }
    ],
    relatedConcepts: [
      "Force and Motion",
      "Momentum",
      "Work and Energy"
    ]
  };
};

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: conceptCard, isLoading } = useQuery({
    queryKey: ['conceptCard', conceptId],
    queryFn: () => Promise.resolve(getMockConceptCard(conceptId || '1')),
  });
  
  if (isLoading || !conceptCard) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/dashboard/student/concepts">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Concepts
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Return to all concept cards</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Add Notes
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Add your personal notes to this concept</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  Study Now
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Start studying this concept</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{conceptCard.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {conceptCard.subject} • Chapter: {conceptCard.chapter} • 
                    <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                      {conceptCard.difficulty}
                    </Badge>
                  </CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Star className="h-4 w-4 text-yellow-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Add to favorites</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="space-y-6">
                    <p className="text-gray-700 dark:text-gray-300">{conceptCard.content}</p>
                    
                    <h3 className="text-lg font-medium">Key Points</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {conceptCard.keyPoints.map((point, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{point}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="space-y-8">
                    {conceptCard.details.map((detail, index) => (
                      <div key={index} className="space-y-3">
                        <h3 className="text-lg font-medium">{detail.subtitle}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{detail.content}</p>
                        
                        <h4 className="text-md font-medium">Examples:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {detail.examples.map((example, i) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300">{example}</li>
                          ))}
                        </ul>
                        
                        <h4 className="text-md font-medium">Application Questions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {detail.applicationQuestions.map((question, i) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300">{question}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="practice">
                  <div className="space-y-6">
                    {conceptCard.practiceQuestions.map((qa, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <p className="font-medium mb-3">Q{index + 1}: {qa.question}</p>
                        <div className="space-y-2 ml-4">
                          {qa.options.map((option, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${option === qa.correctAnswer ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                {option === qa.correctAnswer && <Check className="h-3 w-3" />}
                              </div>
                              <span>{option}</span>
                              {option === qa.correctAnswer && <span className="text-green-500 text-sm">(Correct)</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="related">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Related Concepts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {conceptCard.relatedConcepts.map((concept, index) => (
                        <Button key={index} variant="outline" className="justify-start">
                          <BookOpen className="mr-2 h-4 w-4 text-blue-500" />
                          {concept}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Add the ConceptCardLinks component */}
          <ConceptCardLinks conceptId={conceptId || '1'} conceptTitle={conceptCard.title} />
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Completion</span>
                  <span className="text-sm font-medium">{conceptCard.completion}%</span>
                </div>
                <Progress value={conceptCard.completion} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Recall Accuracy</span>
                  <span className="text-sm font-medium">{conceptCard.recallAccuracy}%</span>
                </div>
                <Progress value={conceptCard.recallAccuracy} className="h-2" />
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4" />
                <span>Estimated study time: {conceptCard.estimatedTime} minutes</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Last reviewed: {conceptCard.lastReviewed}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <PlayCircle className="mr-2 h-4 w-4 text-red-500" />
                <span>Watch Video Tutorial</span>
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Puzzle className="mr-2 h-4 w-4 text-green-500" />
                <span>Interactive Simulation</span>
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4 text-violet-500" />
                <span>Ask AI Tutor</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;
