
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, BookOpen, Brain, FileText, AlertTriangle, TrendingUp, CheckCircle, ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStudyPlan } from '@/hooks/useStudyPlan';

interface SyllabusProgress {
  totalTopics: number;
  completedTopics: number;
  timeSpent: number;
  avgExamScore: number;
  avgRecallScore: number;
}

interface SyllabusTopic {
  id: string;
  name: string;
  importance: 'high' | 'medium' | 'low';
  status: 'completed' | 'in-progress' | 'not-started';
  concepts: { id: string; name: string }[];
  hasFlashcards: boolean;
  hasPracticeQuestions: boolean;
}

interface SyllabusUnit {
  id: string;
  name: string;
  topics: SyllabusTopic[];
}

// Mock data for syllabus structure
const syllabusData = {
  "Physics": [
    {
      id: "physics-unit-1",
      name: "Mechanics",
      topics: [
        {
          id: "phys-topic-1",
          name: "Laws of Motion",
          importance: "high",
          status: "completed",
          concepts: [
            { id: "concept-1-1", name: "Newton's Laws" },
            { id: "concept-1-2", name: "Friction" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: true
        },
        {
          id: "phys-topic-2",
          name: "Work, Energy and Power",
          importance: "high",
          status: "in-progress",
          concepts: [
            { id: "concept-2-1", name: "Work-Energy Theorem" },
            { id: "concept-2-2", name: "Conservation of Energy" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: true
        },
        {
          id: "phys-topic-3",
          name: "Rotational Motion",
          importance: "medium",
          status: "not-started",
          concepts: [
            { id: "concept-3-1", name: "Moment of Inertia" },
            { id: "concept-3-2", name: "Angular Momentum" }
          ],
          hasFlashcards: false,
          hasPracticeQuestions: true
        }
      ]
    },
    {
      id: "physics-unit-2",
      name: "Electromagnetism",
      topics: [
        {
          id: "phys-topic-4",
          name: "Electric Charges and Fields",
          importance: "high",
          status: "completed",
          concepts: [
            { id: "concept-4-1", name: "Coulomb's Law" },
            { id: "concept-4-2", name: "Electric Field" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: true
        },
        {
          id: "phys-topic-5",
          name: "Electromagnetic Induction",
          importance: "medium",
          status: "not-started",
          concepts: [
            { id: "concept-5-1", name: "Faraday's Law" },
            { id: "concept-5-2", name: "Lenz's Law" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: false
        }
      ]
    }
  ],
  "Chemistry": [
    {
      id: "chem-unit-1",
      name: "Organic Chemistry",
      topics: [
        {
          id: "chem-topic-1",
          name: "Hydrocarbons",
          importance: "high",
          status: "in-progress",
          concepts: [
            { id: "chem-concept-1-1", name: "Alkanes" },
            { id: "chem-concept-1-2", name: "Alkenes" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: true
        },
        {
          id: "chem-topic-2",
          name: "Alcohols and Ethers",
          importance: "medium",
          status: "not-started",
          concepts: [
            { id: "chem-concept-2-1", name: "Properties of Alcohols" },
            { id: "chem-concept-2-2", name: "Reactions of Ethers" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: true
        }
      ]
    },
    {
      id: "chem-unit-2",
      name: "Physical Chemistry",
      topics: [
        {
          id: "chem-topic-3",
          name: "Chemical Thermodynamics",
          importance: "high",
          status: "completed",
          concepts: [
            { id: "chem-concept-3-1", name: "First Law of Thermodynamics" },
            { id: "chem-concept-3-2", name: "Entropy" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: true
        },
        {
          id: "chem-topic-4",
          name: "Chemical Kinetics",
          importance: "medium",
          status: "in-progress",
          concepts: [
            { id: "chem-concept-4-1", name: "Rate of Reaction" },
            { id: "chem-concept-4-2", name: "Factors Affecting Reaction Rate" }
          ],
          hasFlashcards: false,
          hasPracticeQuestions: true
        }
      ]
    }
  ],
  "Biology": [
    {
      id: "bio-unit-1",
      name: "Human Physiology",
      topics: [
        {
          id: "bio-topic-1",
          name: "Digestive System",
          importance: "high",
          status: "completed",
          concepts: [
            { id: "bio-concept-1-1", name: "Digestive Enzymes" },
            { id: "bio-concept-1-2", name: "Absorption of Nutrients" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: true
        },
        {
          id: "bio-topic-2",
          name: "Respiratory System",
          importance: "high",
          status: "in-progress",
          concepts: [
            { id: "bio-concept-2-1", name: "Gas Exchange" },
            { id: "bio-concept-2-2", name: "Transport of Gases" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: true
        }
      ]
    },
    {
      id: "bio-unit-2",
      name: "Genetics",
      topics: [
        {
          id: "bio-topic-3",
          name: "Principles of Inheritance",
          importance: "high",
          status: "not-started",
          concepts: [
            { id: "bio-concept-3-1", name: "Mendelian Genetics" },
            { id: "bio-concept-3-2", name: "Chromosomal Theory" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: true
        },
        {
          id: "bio-topic-4",
          name: "Molecular Basis of Inheritance",
          importance: "medium",
          status: "not-started",
          concepts: [
            { id: "bio-concept-4-1", name: "DNA Structure" },
            { id: "bio-concept-4-2", name: "DNA Replication" }
          ],
          hasFlashcards: true,
          hasPracticeQuestions: false
        }
      ]
    }
  ]
};

const SyllabusPage = () => {
  const [viewMode, setViewMode] = useState<'accordion' | 'grid'>('accordion');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'in-progress' | 'not-started' | 'important'>('all');
  const navigate = useNavigate();
  const { studyPlan } = useStudyPlan();

  const examGoal = studyPlan?.examGoal || "NEET";

  const progress: Record<string, SyllabusProgress> = {
    "Physics": {
      totalTopics: 100,
      completedTopics: 45,
      timeSpent: 24,
      avgExamScore: 78,
      avgRecallScore: 82
    },
    "Chemistry": {
      totalTopics: 100,
      completedTopics: 60,
      timeSpent: 30,
      avgExamScore: 75,
      avgRecallScore: 80
    },
    "Biology": {
      totalTopics: 100,
      completedTopics: 35,
      timeSpent: 20,
      avgExamScore: 70,
      avgRecallScore: 75
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard/student');
  };

  // Filter topics based on selected filter
  const getFilteredTopics = (topics: SyllabusTopic[]) => {
    switch (selectedFilter) {
      case 'completed':
        return topics.filter(topic => topic.status === 'completed');
      case 'in-progress':
        return topics.filter(topic => topic.status === 'in-progress');
      case 'not-started':
        return topics.filter(topic => topic.status === 'not-started');
      case 'important':
        return topics.filter(topic => topic.importance === 'high');
      default:
        return topics;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4 flex items-center gap-2" 
        onClick={handleGoBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{examGoal} Syllabus</h1>
          <p className="text-gray-500">
            Last synced with your Study Plan | Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Progress Dashboard */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-violet-50 to-blue-50">
        <h2 className="text-lg font-semibold mb-4">Overall Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(progress).map(([subject, data]) => (
            <div key={subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject}</span>
                <span className="text-sm text-gray-500">
                  {data.completedTopics}/{data.totalTopics} topics
                </span>
              </div>
              <Progress value={(data.completedTopics / data.totalTopics) * 100} className="h-2" />
              <div className="text-sm text-gray-500">
                Time spent: {data.timeSpent}h | Avg. Score: {data.avgExamScore}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* View Mode and Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'accordion' | 'grid')}>
            <TabsList>
              <TabsTrigger value="accordion">List View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={selectedFilter} onValueChange={(value) => setSelectedFilter(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              <SelectItem value="completed">Completed Only</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="important">High Importance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Syllabus Content - Accordion View */}
      {viewMode === 'accordion' && (
        <Accordion type="multiple" className="space-y-4">
          {Object.entries(syllabusData).map(([subject, units]) => (
            <AccordionItem value={subject} key={subject}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  {subject}
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700">
                    {units.reduce((acc, unit) => acc + unit.topics.length, 0)} topics
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 space-y-6">
                  {units.map(unit => (
                    <div key={unit.id} className="border-l-2 border-gray-200 pl-4">
                      <h3 className="font-semibold text-md mb-3">{unit.name}</h3>
                      <div className="space-y-4">
                        {getFilteredTopics(unit.topics).map(topic => (
                          <Card key={topic.id} className="overflow-hidden">
                            <div className="flex items-center justify-between p-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{topic.name}</h4>
                                  {topic.importance === 'high' && (
                                    <Badge variant="outline" className="bg-red-50 text-red-700">
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                      High Importance
                                    </Badge>
                                  )}
                                  {topic.status === 'completed' ? (
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Completed
                                    </Badge>
                                  ) : topic.status === 'in-progress' ? (
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                      In Progress
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-gray-100 text-gray-700">
                                      Not Started
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {topic.concepts.length} concepts
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center gap-1"
                                  onClick={() => navigate(`/dashboard/student/concepts/card/${topic.concepts[0].id}`)}
                                >
                                  <BookOpen className="h-4 w-4" />
                                  Concept Cards
                                </Button>
                                {topic.hasFlashcards && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex items-center gap-1"
                                    onClick={() => navigate(`/dashboard/student/flashcards/${topic.id}`)}
                                  >
                                    <Brain className="h-4 w-4" />
                                    Flashcards
                                  </Button>
                                )}
                                {topic.hasPracticeQuestions && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex items-center gap-1"
                                    onClick={() => navigate(`/dashboard/student/practice-exam/${topic.id}/start`)}
                                  >
                                    <FileText className="h-4 w-4" />
                                    Practice
                                  </Button>
                                )}
                              </div>
                            </div>
                            {topic.concepts.length > 0 && (
                              <div className="bg-gray-50 p-3 border-t">
                                <h5 className="text-sm font-medium mb-2">Key Concepts</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {topic.concepts.map(concept => (
                                    <div 
                                      key={concept.id} 
                                      className="text-sm px-3 py-1 bg-white rounded border cursor-pointer hover:bg-blue-50 transition-colors"
                                      onClick={() => navigate(`/dashboard/student/concepts/card/${concept.id}`)}
                                    >
                                      {concept.name}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Syllabus Content - Grid View */}
      {viewMode === 'grid' && (
        <div className="space-y-8">
          {Object.entries(syllabusData).map(([subject, units]) => (
            <div key={subject} className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">{subject}</h2>
              
              {units.map(unit => (
                <div key={unit.id} className="space-y-3">
                  <h3 className="font-medium text-lg ml-2">{unit.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getFilteredTopics(unit.topics).map(topic => (
                      <Card key={topic.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-md font-medium">{topic.name}</CardTitle>
                            {topic.importance === 'high' && (
                              <Badge variant="outline" className="bg-red-50 text-red-700">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                High Importance
                              </Badge>
                            )}
                          </div>
                          <CardDescription>
                            {topic.concepts.length} concepts | Status: {topic.status.replace('-', ' ')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {topic.concepts.slice(0, 2).map(concept => (
                              <Badge 
                                key={concept.id} 
                                variant="outline" 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => navigate(`/dashboard/student/concepts/card/${concept.id}`)}
                              >
                                {concept.name}
                              </Badge>
                            ))}
                            {topic.concepts.length > 2 && (
                              <Badge variant="outline">+{topic.concepts.length - 2} more</Badge>
                            )}
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs h-7 flex items-center gap-1"
                              onClick={() => navigate(`/dashboard/student/concepts/card/${topic.concepts[0].id}`)}
                            >
                              <BookOpen className="h-3 w-3" />
                              Concepts
                            </Button>
                            {topic.hasFlashcards && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs h-7 flex items-center gap-1"
                                onClick={() => navigate(`/dashboard/student/flashcards/${topic.id}`)}
                              >
                                <Brain className="h-3 w-3" />
                                Flashcards
                              </Button>
                            )}
                            {topic.hasPracticeQuestions && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs h-7 flex items-center gap-1"
                                onClick={() => navigate(`/dashboard/student/practice-exam/${topic.id}/start`)}
                              >
                                <FileText className="h-3 w-3" />
                                Practice
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SyllabusPage;
