
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
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  FileDown, 
  BookOpen, 
  Brain, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  ArrowLeft,
  Search,
  Filter,
  Flame,
  BarChart,
  GridIcon,
  List
} from 'lucide-react';
import { CustomProgress } from "@/components/ui/custom-progress";
import { StudyPlan } from '@/types/user/studyPlan';
import { ConceptCard } from '@/types/user/conceptCard';

interface Subject {
  id: string;
  name: string;
  progress: number;
  units: Unit[];
  stats: {
    totalTopics: number;
    completedTopics: number;
    timeSpent: number;
    avgExamScore: number;
    avgRecallScore: number;
  }
}

interface Unit {
  id: string;
  name: string;
  topics: Topic[];
  progress: number;
  importance: 'high' | 'medium' | 'low';
}

interface Topic {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'mastered';
  progress: number;
  importance: 'high' | 'medium' | 'low';
  concepts: Concept[];
  lastAccessed?: string;
  timeSpent?: number;
  questionFrequency?: {
    total: number;
    byYear: Record<string, number>;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
}

interface Concept {
  id: string;
  title: string;
  hasFlashcards: boolean;
  hasQuizzes: boolean;
  hasPracticeQuestions: boolean;
}

const SyllabusPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedExam, setSelectedExam] = useState('NEET 2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterImportance, setFilterImportance] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'not-started' | 'in-progress' | 'mastered'>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  // Mock data for the syllabus structure
  const mockSubjects: Subject[] = [
    {
      id: 'physics',
      name: 'Physics',
      progress: 45,
      stats: {
        totalTopics: 100,
        completedTopics: 45,
        timeSpent: 24,
        avgExamScore: 78,
        avgRecallScore: 82
      },
      units: [
        {
          id: 'mechanics',
          name: 'Mechanics',
          progress: 80,
          importance: 'high',
          topics: [
            {
              id: 'newton-laws',
              name: "Newton's Laws of Motion",
              status: 'mastered',
              progress: 100,
              importance: 'high',
              concepts: [
                { id: 'newton1', title: "Newton's First Law", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true },
                { id: 'newton2', title: "Newton's Second Law", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true },
                { id: 'newton3', title: "Newton's Third Law", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true }
              ],
              lastAccessed: '2023-05-01T14:30:00Z',
              timeSpent: 240,
              questionFrequency: {
                total: 45,
                byYear: { '2020': 5, '2021': 4, '2022': 6, '2023': 4, '2024': 5 },
                trend: 'stable'
              }
            },
            {
              id: 'gravitation',
              name: "Gravitation",
              status: 'in-progress',
              progress: 60,
              importance: 'medium',
              concepts: [
                { id: 'grav1', title: "Newton's Law of Universal Gravitation", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true },
                { id: 'grav2', title: "Kepler's Laws", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true }
              ],
              lastAccessed: '2023-05-03T10:15:00Z',
              timeSpent: 180,
              questionFrequency: {
                total: 28,
                byYear: { '2020': 2, '2021': 3, '2022': 4, '2023': 3, '2024': 3 },
                trend: 'increasing'
              }
            }
          ]
        },
        {
          id: 'electromagnetism',
          name: 'Electromagnetism',
          progress: 30,
          importance: 'high',
          topics: [
            {
              id: 'electric-charges',
              name: "Electric Charges and Fields",
              status: 'in-progress',
              progress: 40,
              importance: 'high',
              concepts: [
                { id: 'ec1', title: "Coulomb's Law", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true },
                { id: 'ec2', title: "Electric Field", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true }
              ],
              lastAccessed: '2023-05-05T16:45:00Z',
              timeSpent: 150,
              questionFrequency: {
                total: 38,
                byYear: { '2020': 4, '2021': 4, '2022': 5, '2023': 5, '2024': 6 },
                trend: 'increasing'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      progress: 60,
      stats: {
        totalTopics: 100,
        completedTopics: 60,
        timeSpent: 30,
        avgExamScore: 75,
        avgRecallScore: 80
      },
      units: [
        {
          id: 'organic',
          name: 'Organic Chemistry',
          progress: 75,
          importance: 'high',
          topics: [
            {
              id: 'alkanes',
              name: "Alkanes and Cycloalkanes",
              status: 'mastered',
              progress: 100,
              importance: 'medium',
              concepts: [
                { id: 'alk1', title: "Nomenclature", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true },
                { id: 'alk2', title: "Physical Properties", hasFlashcards: true, hasQuizzes: false, hasPracticeQuestions: true }
              ],
              lastAccessed: '2023-04-28T09:20:00Z',
              timeSpent: 200,
              questionFrequency: {
                total: 32,
                byYear: { '2020': 3, '2021': 4, '2022': 3, '2023': 4, '2024': 3 },
                trend: 'stable'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      progress: 35,
      stats: {
        totalTopics: 100,
        completedTopics: 35,
        timeSpent: 20,
        avgExamScore: 70,
        avgRecallScore: 75
      },
      units: [
        {
          id: 'cell-biology',
          name: 'Cell Biology',
          progress: 50,
          importance: 'high',
          topics: [
            {
              id: 'cell-structure',
              name: "Cell Structure and Function",
              status: 'in-progress',
              progress: 65,
              importance: 'high',
              concepts: [
                { id: 'cell1', title: "Cell Membrane", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true },
                { id: 'cell2', title: "Nucleus", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true },
                { id: 'cell3', title: "Mitochondria", hasFlashcards: true, hasQuizzes: true, hasPracticeQuestions: true }
              ],
              lastAccessed: '2023-05-02T11:30:00Z',
              timeSpent: 185,
              questionFrequency: {
                total: 42,
                byYear: { '2020': 5, '2021': 4, '2022': 4, '2023': 5, '2024': 6 },
                trend: 'increasing'
              }
            }
          ]
        }
      ]
    }
  ];

  // Filter subjects based on search and filters
  const filteredSubjects = mockSubjects.map(subject => ({
    ...subject,
    units: subject.units
      .map(unit => ({
        ...unit,
        topics: unit.topics.filter(topic => {
          // Apply search filter
          const matchesSearch = searchQuery === '' || 
            topic.name.toLowerCase().includes(searchQuery.toLowerCase());
          
          // Apply importance filter
          const matchesImportance = filterImportance === 'all' || 
            topic.importance === filterImportance;
          
          // Apply status filter
          const matchesStatus = filterStatus === 'all' || 
            topic.status === filterStatus;
          
          return matchesSearch && matchesImportance && matchesStatus;
        })
      }))
      .filter(unit => unit.topics.length > 0)
  })).filter(subject => 
    (filterSubject === 'all' || subject.id === filterSubject) && 
    subject.units.length > 0
  );

  // Helper to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'not-started': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return '';
    }
  };

  // Helper to get importance color
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return '';
    }
  };

  // Helper to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decreasing': return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
      case 'stable': return <TrendingUp className="h-4 w-4 text-blue-500 transform rotate-90" />;
      default: return null;
    }
  };

  // Function to navigate to different learning resources
  const navigateToResource = (resourceType: string, resourceId: string) => {
    switch (resourceType) {
      case 'concept':
        navigate(`/dashboard/student/concepts/card/${resourceId}`);
        break;
      case 'flashcard':
        navigate(`/dashboard/student/flashcards/${resourceId}`);
        break;
      case 'practice':
        navigate(`/dashboard/student/practice-exam/${resourceId}/start`);
        break;
      case 'pyq':
        navigate(`/dashboard/student/previous-year-analysis`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold mb-1">{selectedExam} Syllabus</h1>
            <p className="text-gray-500 text-sm">
              Synced with your Study Plan | Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate('/dashboard/student/study-plan')}
          >
            View Study Plan
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Progress Dashboard */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-violet-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
        <h2 className="text-lg font-semibold mb-4">Overall Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockSubjects.map((subject) => (
            <div key={subject.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.name}</span>
                <span className="text-sm text-gray-500">
                  {subject.stats.completedTopics}/{subject.stats.totalTopics} topics
                </span>
              </div>
              <CustomProgress 
                value={subject.progress} 
                className="h-2" 
                indicatorClassName={
                  subject.progress > 75 ? "bg-green-500" : 
                  subject.progress > 40 ? "bg-blue-500" : "bg-amber-500"
                }
              />
              <div className="text-sm text-gray-500">
                Time spent: {subject.stats.timeSpent}h | Avg. Score: {subject.stats.avgExamScore}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search topics or concepts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {mockSubjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterImportance} onValueChange={setFilterImportance}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="mastered">Mastered</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="icon" 
              className="rounded-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="icon" 
              className="rounded-none"
              onClick={() => setViewMode('grid')}
            >
              <GridIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for View Types */}
      <Tabs defaultValue="structure" className="space-y-4">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="structure">Syllabus Structure</TabsTrigger>
          <TabsTrigger value="analysis">10-Year Analysis</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="strategy">Exam Strategy</TabsTrigger>
        </TabsList>

        {/* Syllabus Structure Tab Content */}
        <TabsContent value="structure">
          {viewMode === 'list' ? (
            <Accordion type="multiple" className="space-y-4">
              {filteredSubjects.map((subject) => (
                <AccordionItem key={subject.id} value={subject.id} className="border rounded-lg">
                  <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex justify-between w-full items-center pr-6">
                      <div>
                        <h3 className="font-semibold">{subject.name}</h3>
                        <div className="text-sm text-gray-500">
                          {subject.units.length} units | {subject.stats.completedTopics}/{subject.stats.totalTopics} topics completed
                        </div>
                      </div>
                      <Progress value={subject.progress} className="w-32 h-2" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {subject.units.map((unit) => (
                      <div key={unit.id} className="border-t">
                        <Accordion type="multiple">
                          <AccordionItem value={unit.id}>
                            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <div className="flex justify-between w-full items-center pr-6">
                                <div className="flex items-center">
                                  <h4 className="font-medium">{unit.name}</h4>
                                  {unit.importance === 'high' && (
                                    <Badge className="ml-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                      <Flame className="mr-1 h-3 w-3" />
                                      High Yield
                                    </Badge>
                                  )}
                                </div>
                                <Progress value={unit.progress} className="w-24 h-2" />
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4 p-4">
                                {unit.topics.map((topic) => (
                                  <div key={topic.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between mb-3">
                                      <div>
                                        <div className="flex items-center">
                                          <h5 className="font-medium">{topic.name}</h5>
                                          {topic.importance === 'high' && (
                                            <Badge className="ml-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                              <Flame className="mr-1 h-3 w-3" />
                                              High Yield
                                            </Badge>
                                          )}
                                          <Badge className={`ml-2 ${getStatusColor(topic.status)}`}>
                                            {topic.status === 'mastered' && <CheckCircle className="mr-1 h-3 w-3" />}
                                            {topic.status === 'in-progress' && <TrendingUp className="mr-1 h-3 w-3" />}
                                            {topic.status === 'not-started' && <AlertTriangle className="mr-1 h-3 w-3" />}
                                            {topic.status.replace('-', ' ')}
                                          </Badge>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                          Last studied: {topic.lastAccessed ? new Date(topic.lastAccessed).toLocaleDateString() : 'Never'} | 
                                          Time spent: {topic.timeSpent ? `${topic.timeSpent} min` : '0 min'}
                                        </div>
                                      </div>
                                      <Progress value={topic.progress} className="w-24 h-2" />
                                    </div>
                                    
                                    {/* Exam Frequency Data */}
                                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md mb-3">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                          <BarChart className="h-4 w-4 mr-2" />
                                          <span className="text-sm font-medium">10-Year Question Frequency</span>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-sm mr-2">Trend: </span>
                                          {topic.questionFrequency?.trend && getTrendIcon(topic.questionFrequency.trend)}
                                        </div>
                                      </div>
                                      <div className="text-sm mt-2">
                                        Total Questions: {topic.questionFrequency?.total || 0}
                                      </div>
                                      <div className="flex mt-2 space-x-1">
                                        {topic.questionFrequency?.byYear && Object.entries(topic.questionFrequency.byYear).map(([year, count]) => (
                                          <div key={year} className="flex flex-col items-center">
                                            <div className="text-xs text-gray-500">{year}</div>
                                            <div className="bg-blue-500 w-6" style={{height: `${count * 4}px`}}></div>
                                            <div className="text-xs">{count}</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {/* Concepts List */}
                                    <div className="space-y-2">
                                      <h6 className="font-medium text-sm">Key Concepts</h6>
                                      {topic.concepts.map((concept) => (
                                        <div key={concept.id} className="bg-white dark:bg-gray-800 border rounded-md p-2">
                                          <div className="flex justify-between items-center">
                                            <span>{concept.title}</span>
                                            <div className="flex space-x-1">
                                              {concept.hasFlashcards && (
                                                <Button size="sm" variant="outline" className="h-8 px-2 py-1" 
                                                        onClick={() => navigateToResource('flashcard', concept.id)}>
                                                  <Brain className="h-3.5 w-3.5 mr-1" />
                                                  <span className="text-xs">Flashcards</span>
                                                </Button>
                                              )}
                                              {concept.hasPracticeQuestions && (
                                                <Button size="sm" variant="outline" className="h-8 px-2 py-1"
                                                        onClick={() => navigateToResource('practice', concept.id)}>
                                                  <FileText className="h-3.5 w-3.5 mr-1" />
                                                  <span className="text-xs">Practice</span>
                                                </Button>
                                              )}
                                              <Button size="sm" variant="outline" className="h-8 px-2 py-1"
                                                      onClick={() => navigateToResource('concept', concept.id)}>
                                                <BookOpen className="h-3.5 w-3.5 mr-1" />
                                                <span className="text-xs">Learn</span>
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.flatMap(subject => 
                subject.units.flatMap(unit => 
                  unit.topics.map(topic => (
                    <Card key={topic.id} className="overflow-hidden">
                      <div className="p-4 border-b">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Badge className={getImportanceColor(topic.importance)}>
                              {topic.importance === 'high' ? (
                                <><Flame className="mr-1 h-3 w-3" /> High Importance</>
                              ) : topic.importance === 'medium' ? (
                                <>Medium Importance</>
                              ) : (
                                <>Low Importance</>
                              )}
                            </Badge>
                            <h3 className="font-medium mt-2">{topic.name}</h3>
                            <p className="text-sm text-gray-500">
                              {subject.name} | {unit.name}
                            </p>
                          </div>
                          <Badge className={getStatusColor(topic.status)}>
                            {topic.status === 'mastered' && <CheckCircle className="mr-1 h-3 w-3" />}
                            {topic.status === 'in-progress' && <TrendingUp className="mr-1 h-3 w-3" />}
                            {topic.status === 'not-started' && <AlertTriangle className="mr-1 h-3 w-3" />}
                            {topic.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <Progress value={topic.progress} className="w-full h-2 mt-2" />
                      </div>
                      
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                        <div className="text-sm">
                          <div>Questions: {topic.questionFrequency?.total || 0}</div>
                          <div className="flex items-center">
                            Trend: {topic.questionFrequency?.trend && getTrendIcon(topic.questionFrequency.trend)}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="h-8" 
                                  onClick={() => navigateToResource('flashcard', topic.id)}>
                            <Brain className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8"
                                  onClick={() => navigateToResource('practice', topic.id)}>
                            <FileText className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8"
                                  onClick={() => navigateToResource('concept', topic.id)}>
                            <BookOpen className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )
              )}
            </div>
          )}
        </TabsContent>

        {/* Analysis Tab Content */}
        <TabsContent value="analysis">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4">10-Year Question Frequency Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {mockSubjects.map((subject) => (
                <div key={subject.id} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">{subject.name}</h4>
                  <div className="space-y-4">
                    {subject.units.flatMap(unit => 
                      unit.topics.filter(topic => topic.questionFrequency?.total > 0)
                      .slice(0, 3)
                      .map(topic => (
                        <div key={topic.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{topic.name}</span>
                            <Badge className={getImportanceColor(topic.importance)}>
                              {topic.importance.charAt(0).toUpperCase() + topic.importance.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Total Questions: {topic.questionFrequency?.total}</span>
                            <div className="flex items-center">
                              <span>Trend: </span>
                              {topic.questionFrequency?.trend && getTrendIcon(topic.questionFrequency.trend)}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-2" 
                                  onClick={() => navigateToResource('pyq', topic.id)}>
                            View PYQ Analysis
                          </Button>
                        </div>
                      ))
                    )}
                    <Button variant="link" className="w-full mt-2" 
                            onClick={() => navigateToResource('pyq', subject.id)}>
                      View All {subject.name} Questions
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Heatmap Tab Content */}
        <TabsContent value="heatmap">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4">Topic Heatmap</h3>
            <p className="text-gray-500 mb-4">Visualizing topic importance based on exam frequency and difficulty</p>
            
            <div className="space-y-6">
              {mockSubjects.map((subject) => (
                <div key={subject.id}>
                  <h4 className="font-medium mb-3">{subject.name}</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {subject.units.flatMap(unit => 
                      unit.topics.map(topic => {
                        // Calculate heatmap intensity based on importance and question frequency
                        const freqScore = topic.questionFrequency?.total || 0;
                        const importanceScore = 
                          topic.importance === 'high' ? 3 : 
                          topic.importance === 'medium' ? 2 : 1;
                        const intensity = Math.min(((freqScore / 10) + importanceScore) / 5, 1);
                        
                        return (
                          <div 
                            key={topic.id} 
                            className="aspect-square rounded-md flex items-center justify-center p-2 text-center cursor-pointer"
                            style={{
                              backgroundColor: `rgba(79, 70, 229, ${intensity})`,
                              color: intensity > 0.5 ? 'white' : 'black',
                            }}
                            onClick={() => navigateToResource('concept', topic.id)}
                            title={`${topic.name}: ${freqScore} questions`}
                          >
                            <div className="text-xs leading-tight">
                              {topic.name.length > 20 
                                ? topic.name.substring(0, 18) + '...' 
                                : topic.name}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Strategy Tab Content */}
        <TabsContent value="strategy">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4">Exam Strategy Insights</h3>
            <p className="text-gray-500 mb-4">Personalized recommendations based on your progress and exam trends</p>
            
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Focus Areas Based on Exam Patterns
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Increase focus on <span className="font-medium">Electromagnetism</span> - trending upward in recent papers</li>
                  <li>Allocate more time to <span className="font-medium">Organic Chemistry</span> due to high conceptual overlap</li>
                  <li>Don't neglect <span className="font-medium">Cell Biology</span> - consistently high yield topic</li>
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  Time Allocation Recommendation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  {mockSubjects.map((subject) => (
                    <div key={subject.id} className="bg-white dark:bg-gray-800 p-3 rounded-md">
                      <h5 className="font-medium">{subject.name}</h5>
                      <div className="text-sm mt-2">
                        <div className="flex justify-between">
                          <span>Current allocation:</span>
                          <span>{subject.stats.timeSpent} hours/week</span>
                        </div>
                        <div className="flex justify-between font-medium text-green-600 dark:text-green-400">
                          <span>Recommended:</span>
                          <span>{Math.round(subject.stats.timeSpent * 1.2)} hours/week</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Weak Areas Needing Attention
                </h4>
                <div className="space-y-2 mt-3">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-md flex justify-between items-center">
                    <div>
                      <div className="font-medium">Electric Charges and Fields</div>
                      <div className="text-sm text-gray-500">40% mastery · Physics</div>
                    </div>
                    <Button size="sm" variant="default" 
                            onClick={() => navigateToResource('concept', 'electric-charges')}>
                      Review Now
                    </Button>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-md flex justify-between items-center">
                    <div>
                      <div className="font-medium">Cell Structure and Function</div>
                      <div className="text-sm text-gray-500">65% mastery · Biology</div>
                    </div>
                    <Button size="sm" variant="default"
                            onClick={() => navigateToResource('concept', 'cell-structure')}>
                      Review Now
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button className="flex items-center gap-2" onClick={() => navigate('/dashboard/student/study-plan')}>
                  <BookOpen className="h-4 w-4" />
                  Update Study Plan Based on Insights
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SyllabusPage;
