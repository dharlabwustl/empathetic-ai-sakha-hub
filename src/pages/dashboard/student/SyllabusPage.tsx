
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  Grid,
  List
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock data - in a real app, this would come from the backend based on exam goal
const MOCK_DATA = {
  examName: "NEET",
  lastUpdated: new Date().toLocaleDateString(),
  subjects: [
    {
      name: "Physics",
      totalTopics: 100,
      completedTopics: 45,
      timeSpent: 24,
      avgExamScore: 78,
      avgRecallScore: 82,
      color: "blue",
      units: [
        {
          name: "Mechanics",
          topics: [
            { 
              id: "topic-1", 
              name: "Laws of Motion", 
              status: "completed", 
              importance: "high",
              conceptId: "concept-101",
              flashcardId: "flashcard-101",
              practiceExamId: "exam-101" 
            },
            { 
              id: "topic-2", 
              name: "Work, Energy and Power", 
              status: "in-progress", 
              importance: "high",
              conceptId: "concept-102",
              flashcardId: "flashcard-102",
              practiceExamId: "exam-102" 
            },
            { 
              id: "topic-3", 
              name: "Rotational Motion", 
              status: "pending", 
              importance: "medium",
              conceptId: "concept-103",
              flashcardId: "flashcard-103",
              practiceExamId: "exam-103" 
            },
          ]
        },
        {
          name: "Electromagnetism",
          topics: [
            { 
              id: "topic-4", 
              name: "Electric Charges and Fields", 
              status: "completed", 
              importance: "high",
              conceptId: "concept-104",
              flashcardId: "flashcard-104",
              practiceExamId: "exam-104" 
            },
            { 
              id: "topic-5", 
              name: "Magnetic Effects of Current", 
              status: "in-progress", 
              importance: "high",
              conceptId: "concept-105",
              flashcardId: "flashcard-105",
              practiceExamId: "exam-105" 
            },
          ]
        }
      ]
    },
    {
      name: "Chemistry",
      totalTopics: 100,
      completedTopics: 60,
      timeSpent: 30,
      avgExamScore: 75,
      avgRecallScore: 80,
      color: "green",
      units: [
        {
          name: "Organic Chemistry",
          topics: [
            { 
              id: "topic-6", 
              name: "Hydrocarbons", 
              status: "completed", 
              importance: "high",
              conceptId: "concept-106",
              flashcardId: "flashcard-106",
              practiceExamId: "exam-106" 
            },
            { 
              id: "topic-7", 
              name: "Alcohols, Phenols and Ethers", 
              status: "in-progress", 
              importance: "high",
              conceptId: "concept-107",
              flashcardId: "flashcard-107",
              practiceExamId: "exam-107" 
            },
          ]
        }
      ]
    },
    {
      name: "Biology",
      totalTopics: 100,
      completedTopics: 35,
      timeSpent: 20,
      avgExamScore: 70,
      avgRecallScore: 75,
      color: "purple",
      units: [
        {
          name: "Human Physiology",
          topics: [
            { 
              id: "topic-8", 
              name: "Digestion and Absorption", 
              status: "completed", 
              importance: "high",
              conceptId: "concept-108",
              flashcardId: "flashcard-108",
              practiceExamId: "exam-108" 
            },
            { 
              id: "topic-9", 
              name: "Breathing and Exchange of Gases", 
              status: "in-progress", 
              importance: "high",
              conceptId: "concept-109",
              flashcardId: "flashcard-109",
              practiceExamId: "exam-109" 
            },
            { 
              id: "topic-10", 
              name: "Body Fluids and Circulation", 
              status: "pending", 
              importance: "medium",
              conceptId: "concept-110",
              flashcardId: "flashcard-110",
              practiceExamId: "exam-110" 
            },
          ]
        }
      ]
    }
  ]
};

interface Topic {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  importance: 'high' | 'medium' | 'low';
  conceptId: string;
  flashcardId: string;
  practiceExamId: string;
}

interface Unit {
  name: string;
  topics: Topic[];
}

interface Subject {
  name: string;
  totalTopics: number;
  completedTopics: number;
  timeSpent: number;
  avgExamScore: number;
  avgRecallScore: number;
  color: string;
  units: Unit[];
}

const SyllabusPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'accordion' | 'grid'>('accordion');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterImportance, setFilterImportance] = useState<string>('all');
  const [examName, setExamName] = useState<string>('');
  
  useEffect(() => {
    // Get subject from URL if provided
    const subjectParam = searchParams.get('subject');
    if (subjectParam) {
      setSelectedSubject(subjectParam);
    }
    
    // Simulate fetching exam name from study plan
    setExamName(MOCK_DATA.examName);
    
    // Simulate loading syllabus data based on the exam goal
    console.log(`Fetching syllabus data for ${MOCK_DATA.examName}`);
  }, [searchParams]);

  // Filter subjects based on selection
  const filteredSubjects = selectedSubject 
    ? MOCK_DATA.subjects.filter(subject => subject.name.toLowerCase() === selectedSubject.toLowerCase())
    : MOCK_DATA.subjects;

  // Apply search and filters to all subjects
  const getFilteredTopics = (subjects: Subject[]) => {
    return subjects.map(subject => ({
      ...subject,
      units: subject.units.map(unit => ({
        ...unit,
        topics: unit.topics.filter(topic => {
          const matchesSearch = searchTerm 
            ? topic.name.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
          
          const matchesStatus = filterStatus === 'all' || topic.status === filterStatus;
          const matchesImportance = filterImportance === 'all' || topic.importance === filterImportance;
          
          return matchesSearch && matchesStatus && matchesImportance;
        })
      })).filter(unit => unit.topics.length > 0)
    })).filter(subject => subject.units.length > 0);
  };

  const displaySubjects = getFilteredTopics(filteredSubjects);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <TrendingUp className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'high':
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <TrendingUp className="h-3 w-3 mr-1" />
            High Scoring
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <SharedPageLayout
      title="Exam Syllabus"
      subtitle={`Last synced with your Study Plan | Updated: ${MOCK_DATA.lastUpdated}`}
    >
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      
      {/* Header Section with Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{examName} Syllabus</h1>
          <p className="text-gray-500">
            Complete syllabus mapped to your study plan
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Progress Dashboard */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20">
        <h2 className="text-lg font-semibold mb-4">Overall Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_DATA.subjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.name}</span>
                <span className="text-sm text-gray-500">
                  {subject.completedTopics}/{subject.totalTopics} topics
                </span>
              </div>
              <Progress value={(subject.completedTopics / subject.totalTopics) * 100} className="h-2" />
              <div className="text-sm text-gray-500">
                Time spent: {subject.timeSpent}h | Avg. Score: {subject.avgExamScore}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search topics..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Subjects</SelectItem>
              {MOCK_DATA.subjects.map(subject => (
                <SelectItem key={subject.name} value={subject.name.toLowerCase()}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Not Started</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterImportance} onValueChange={setFilterImportance}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Importance</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex bg-white dark:bg-gray-800 border rounded-md">
            <Button
              variant={viewMode === 'accordion' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('accordion')}
              className="rounded-r-none"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="rounded-l-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Syllabus Content */}
      {displaySubjects.length > 0 ? (
        viewMode === 'accordion' ? (
          <Accordion type="multiple" className="space-y-4">
            {displaySubjects.map((subject) => (
              <AccordionItem key={subject.name} value={subject.name} className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full bg-${subject.color}-500 mr-2`}></div>
                    <span className="text-lg font-semibold">{subject.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 px-6">
                  {subject.units.map((unit) => (
                    <div key={unit.name} className="mb-6">
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">{unit.name}</h3>
                      <div className="space-y-4">
                        {unit.topics.map((topic) => (
                          <Card key={topic.id} className="p-4 border-l-4" style={{ borderLeftColor: topic.status === 'completed' ? '#22c55e' : topic.status === 'in-progress' ? '#3b82f6' : '#e5e7eb' }}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{topic.name}</h4>
                              {getStatusBadge(topic.status)}
                            </div>
                            <div className="flex gap-2 flex-wrap mt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={() => navigate(`/dashboard/student/concepts/card/${topic.conceptId}`)}
                              >
                                <BookOpen className="h-4 w-4" />
                                Concept Card
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={() => navigate(`/dashboard/student/flashcards/${topic.flashcardId}/practice`)}
                              >
                                <Brain className="h-4 w-4" />
                                Flashcards
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={() => navigate(`/dashboard/student/practice-exam/${topic.practiceExamId}/start`)}
                              >
                                <FileText className="h-4 w-4" />
                                Practice
                              </Button>
                              {getImportanceBadge(topic.importance)}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displaySubjects.flatMap(subject => 
              subject.units.flatMap(unit => 
                unit.topics.map(topic => (
                  <Card key={topic.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm text-gray-500">{subject.name} - {unit.name}</span>
                          <CardTitle className="text-base mt-1">{topic.name}</CardTitle>
                        </div>
                        {getStatusBadge(topic.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 flex-wrap">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => navigate(`/dashboard/student/concepts/card/${topic.conceptId}`)}
                        >
                          <BookOpen className="h-4 w-4" />
                          Concept
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => navigate(`/dashboard/student/flashcards/${topic.flashcardId}/practice`)}
                        >
                          <Brain className="h-4 w-4" />
                          Flashcards
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => navigate(`/dashboard/student/practice-exam/${topic.practiceExamId}/start`)}
                        >
                          <FileText className="h-4 w-4" />
                          Practice
                        </Button>
                        {getImportanceBadge(topic.importance)}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )
            )}
          </div>
        )
      ) : (
        <Card className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-amber-500" />
          <h3 className="text-lg font-medium mb-2">No topics found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
          <Button onClick={() => {
            setSearchTerm('');
            setFilterStatus('all');
            setFilterImportance('all');
            setSelectedSubject('');
          }}>
            Clear Filters
          </Button>
        </Card>
      )}
    </SharedPageLayout>
  );
};

export default SyllabusPage;
