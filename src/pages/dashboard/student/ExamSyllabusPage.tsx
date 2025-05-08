
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft, Search, Filter, BookOpen, Brain, FileText, CheckCircle,
  Clock, Flame, AlertCircle, ArrowRight, Info, ChevronRight
} from "lucide-react";

// Mock data for syllabus structure
const examData = {
  name: "NEET",
  totalTopics: 97,
  completedTopics: 42,
  subjects: [
    {
      id: "physics",
      name: "Physics",
      totalTopics: 35,
      completedTopics: 15,
      chapters: [
        {
          id: "mechanics",
          name: "Mechanics",
          totalTopics: 12,
          completedTopics: 7,
          topics: [
            {
              id: "p1",
              name: "Kinematics",
              completed: true,
              importance: "high",
              weightage: 8,
              conceptCards: ["c1", "c2", "c3"],
              flashcards: ["f1", "f2"],
              exams: ["e1"]
            },
            {
              id: "p2",
              name: "Newton's Laws of Motion",
              completed: true,
              importance: "high",
              weightage: 10,
              conceptCards: ["c4", "c5", "c6"],
              flashcards: ["f3", "f4"],
              exams: ["e1", "e2"]
            },
            {
              id: "p3",
              name: "Work, Energy & Power",
              completed: true,
              importance: "high",
              weightage: 9,
              conceptCards: ["c7", "c8"],
              flashcards: ["f5", "f6"],
              exams: ["e3"]
            },
            {
              id: "p4",
              name: "Rotational Motion",
              completed: false,
              importance: "medium",
              weightage: 6,
              conceptCards: ["c9", "c10"],
              flashcards: ["f7"],
              exams: ["e3"]
            },
            {
              id: "p5",
              name: "Gravitation",
              completed: false,
              importance: "medium",
              weightage: 5,
              conceptCards: ["c11"],
              flashcards: ["f8", "f9"],
              exams: ["e2"]
            }
          ]
        },
        {
          id: "thermodynamics",
          name: "Thermodynamics",
          totalTopics: 6,
          completedTopics: 3,
          topics: [
            {
              id: "p6",
              name: "Thermal Properties of Matter",
              completed: true,
              importance: "medium",
              weightage: 4,
              conceptCards: ["c12", "c13"],
              flashcards: ["f10", "f11"],
              exams: ["e4"]
            },
            {
              id: "p7",
              name: "Laws of Thermodynamics",
              completed: true,
              importance: "high",
              weightage: 7,
              conceptCards: ["c14", "c15"],
              flashcards: ["f12"],
              exams: ["e4"]
            },
            {
              id: "p8",
              name: "Heat Transfer",
              completed: true,
              importance: "medium",
              weightage: 4,
              conceptCards: ["c16"],
              flashcards: ["f13", "f14"],
              exams: ["e5"]
            }
          ]
        }
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      totalTopics: 30,
      completedTopics: 13,
      chapters: [
        {
          id: "physical-chemistry",
          name: "Physical Chemistry",
          totalTopics: 10,
          completedTopics: 5,
          topics: [
            {
              id: "c1",
              name: "Chemical Bonding",
              completed: true,
              importance: "high",
              weightage: 8,
              conceptCards: ["c17", "c18"],
              flashcards: ["f15", "f16"],
              exams: ["e6"]
            },
            {
              id: "c2",
              name: "Thermodynamics & Energetics",
              completed: true,
              importance: "high",
              weightage: 7,
              conceptCards: ["c19", "c20"],
              flashcards: ["f17"],
              exams: ["e6"]
            },
            {
              id: "c3",
              name: "Solutions",
              completed: false,
              importance: "medium",
              weightage: 5,
              conceptCards: ["c21"],
              flashcards: ["f18", "f19"],
              exams: ["e7"]
            }
          ]
        },
        {
          id: "organic-chemistry",
          name: "Organic Chemistry",
          totalTopics: 12,
          completedTopics: 5,
          topics: [
            {
              id: "c4",
              name: "Basic Concepts",
              completed: true,
              importance: "high",
              weightage: 9,
              conceptCards: ["c22", "c23"],
              flashcards: ["f20", "f21"],
              exams: ["e8"]
            },
            {
              id: "c5",
              name: "Hydrocarbons",
              completed: true,
              importance: "high",
              weightage: 8,
              conceptCards: ["c24"],
              flashcards: ["f22", "f23"],
              exams: ["e8"]
            },
            {
              id: "c6",
              name: "Alcohols, Phenols & Ethers",
              completed: false,
              importance: "medium",
              weightage: 6,
              conceptCards: ["c25", "c26"],
              flashcards: ["f24"],
              exams: ["e9"]
            }
          ]
        }
      ]
    },
    {
      id: "biology",
      name: "Biology",
      totalTopics: 32,
      completedTopics: 14,
      chapters: [
        {
          id: "botany",
          name: "Botany",
          totalTopics: 16,
          completedTopics: 8,
          topics: [
            {
              id: "b1",
              name: "Cell: Structure and Functions",
              completed: true,
              importance: "high",
              weightage: 10,
              conceptCards: ["c27", "c28"],
              flashcards: ["f25", "f26"],
              exams: ["e10"]
            },
            {
              id: "b2",
              name: "Plant Physiology",
              completed: true,
              importance: "high",
              weightage: 9,
              conceptCards: ["c29", "c30"],
              flashcards: ["f27"],
              exams: ["e10"]
            },
            {
              id: "b3",
              name: "Genetics and Evolution",
              completed: false,
              importance: "high",
              weightage: 8,
              conceptCards: ["c31", "c32"],
              flashcards: ["f28", "f29"],
              exams: ["e11"]
            }
          ]
        },
        {
          id: "zoology",
          name: "Zoology",
          totalTopics: 16,
          completedTopics: 6,
          topics: [
            {
              id: "b4",
              name: "Human Physiology",
              completed: true,
              importance: "high",
              weightage: 10,
              conceptCards: ["c33", "c34"],
              flashcards: ["f30", "f31"],
              exams: ["e12"]
            },
            {
              id: "b5",
              name: "Human Reproduction",
              completed: true,
              importance: "high",
              weightage: 8,
              conceptCards: ["c35"],
              flashcards: ["f32", "f33"],
              exams: ["e12"]
            },
            {
              id: "b6",
              name: "Human Health and Disease",
              completed: false,
              importance: "medium",
              weightage: 7,
              conceptCards: ["c36", "c37"],
              flashcards: ["f34"],
              exams: ["e13"]
            }
          ]
        }
      ]
    }
  ]
};

// Mock concept cards and flashcards data for linking
const conceptCards = {
  c1: { id: "c1", title: "Vector Quantities in Physics", difficulty: "medium" },
  c2: { id: "c2", title: "Uniform Motion", difficulty: "easy" },
  c3: { id: "c3", title: "Non-uniform Motion", difficulty: "medium" },
  c4: { id: "c4", title: "Newton's First Law", difficulty: "easy" },
  c5: { id: "c5", title: "Newton's Second Law", difficulty: "medium" },
  c6: { id: "c6", title: "Newton's Third Law", difficulty: "medium" },
  c7: { id: "c7", title: "Work-Energy Theorem", difficulty: "medium" },
  c8: { id: "c8", title: "Conservation of Energy", difficulty: "hard" },
  // ... more concept cards
};

const flashcards = {
  f1: { id: "f1", title: "Displacement vs. Distance", difficulty: "easy" },
  f2: { id: "f2", title: "Velocity vs. Acceleration", difficulty: "medium" },
  f3: { id: "f3", title: "Action-Reaction Pairs", difficulty: "easy" },
  f4: { id: "f4", title: "Force Diagrams", difficulty: "medium" },
  f5: { id: "f5", title: "Types of Energy", difficulty: "easy" },
  f6: { id: "f6", title: "Power Calculations", difficulty: "medium" },
  // ... more flashcards
};

const exams = {
  e1: { id: "e1", title: "Mechanics Test 1", difficulty: "medium" },
  e2: { id: "e2", title: "Newton's Laws Practice", difficulty: "medium" },
  e3: { id: "e3", title: "Energy & Rotation Quiz", difficulty: "hard" },
  e4: { id: "e4", title: "Thermodynamics Assessment", difficulty: "hard" },
  // ... more exams
};

const ExamSyllabusPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  
  // Filter topics based on search query
  const filteredSubjects = examData.subjects.filter(subject => {
    if (selectedSubject !== "all" && subject.id !== selectedSubject) {
      return false;
    }
    
    if (!searchQuery) return true;
    
    // Check if subject name matches
    if (subject.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    
    // Check if any chapter or topic matches
    return subject.chapters.some(chapter => {
      if (chapter.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
      
      return chapter.topics.some(topic => 
        topic.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  });
  
  // Toggle chapter expansion
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      if (prev.includes(chapterId)) {
        return prev.filter(id => id !== chapterId);
      } else {
        return [...prev, chapterId];
      }
    });
  };
  
  // Calculate overall progress
  const overallProgress = Math.round((examData.completedTopics / examData.totalTopics) * 100);
  
  // Navigate to concept card
  const navigateToConceptCard = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };
  
  // Navigate to flashcard
  const navigateToFlashcard = (flashcardId: string) => {
    navigate(`/dashboard/student/flashcards/${flashcardId}`);
  };
  
  // Navigate to practice exam
  const navigateToPracticeExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };
  
  // Navigate back to dashboard
  const handleBack = () => {
    navigate('/dashboard/student');
  };
  
  // Get importance badge color
  const getImportanceColor = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  // Get card background based on completion status
  const getTopicCardBackground = (completed: boolean) => {
    return completed ? 'bg-green-50 hover:bg-green-100 border-l-green-500' : 'bg-white hover:bg-gray-50 border-l-gray-300';
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2" 
          onClick={handleBack}
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{examData.name} Exam Syllabus</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg mb-4">Overview</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span className="font-medium">{examData.completedTopics}/{examData.totalTopics} topics</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
                <div className="mt-1 text-xs text-gray-500 text-right">{overallProgress}% complete</div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Subjects</h3>
                <div className="space-y-3">
                  <div>
                    <Button
                      variant={selectedSubject === "all" ? "default" : "outline"}
                      className="w-full justify-between"
                      onClick={() => setSelectedSubject("all")}
                    >
                      <span>All Subjects</span>
                      <Badge variant="outline">{examData.totalTopics}</Badge>
                    </Button>
                  </div>
                  
                  {examData.subjects.map((subject) => {
                    const progress = Math.round((subject.completedTopics / subject.totalTopics) * 100);
                    return (
                      <div key={subject.id}>
                        <Button
                          variant={selectedSubject === subject.id ? "default" : "outline"}
                          className="w-full justify-between"
                          onClick={() => setSelectedSubject(subject.id)}
                        >
                          <span>{subject.name}</span>
                          <Badge variant="outline">{subject.totalTopics}</Badge>
                        </Button>
                        <div className="pl-2 pr-2 mt-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{progress}% complete</span>
                            <span>{subject.completedTopics}/{subject.totalTopics}</span>
                          </div>
                          <Progress value={progress} className="h-1.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard/student/practice-exam')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Practice Exams
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard/student/concepts')}
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Concept Cards
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard/student/flashcards')}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Flashcards
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Syllabus Overview</TabsTrigger>
                    <TabsTrigger value="chapters">Chapters & Topics</TabsTrigger>
                    <TabsTrigger value="weightage">Weightage Analysis</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex w-full md:w-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search topics..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="ml-2">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <TabsContent value="overview">
                <div className="space-y-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">{examData.name} Syllabus Overview</h2>
                    <p className="text-gray-600">
                      Complete syllabus for {examData.name} exam with topic-wise breakdown, study materials, 
                      and practice resources. Track your progress and focus on important topics.
                    </p>
                  </div>
                  
                  {filteredSubjects.map((subject) => (
                    <div key={subject.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold">{subject.name}</h3>
                        <Badge variant="outline">
                          {subject.completedTopics}/{subject.totalTopics} topics
                        </Badge>
                      </div>
                      
                      <Progress 
                        value={(subject.completedTopics / subject.totalTopics) * 100} 
                        className="h-2 mb-4"
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subject.chapters.map((chapter) => (
                          <Card key={chapter.id} className="border">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{chapter.name}</h4>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {chapter.completedTopics}/{chapter.totalTopics} topics completed
                                  </p>
                                </div>
                                <Badge className={
                                  chapter.completedTopics === chapter.totalTopics 
                                    ? "bg-green-100 text-green-800" 
                                    : chapter.completedTopics > 0 
                                      ? "bg-yellow-100 text-yellow-800" 
                                      : "bg-gray-100 text-gray-800"
                                }>
                                  {chapter.completedTopics === chapter.totalTopics 
                                    ? "Completed" 
                                    : chapter.completedTopics > 0 
                                      ? "In Progress" 
                                      : "Not Started"}
                                </Badge>
                              </div>
                              
                              <Progress 
                                value={(chapter.completedTopics / chapter.totalTopics) * 100} 
                                className="h-1.5 mt-3"
                              />
                              
                              <Button 
                                variant="ghost" 
                                className="w-full mt-3 text-sm justify-between"
                                onClick={() => {
                                  setActiveTab("chapters");
                                  toggleChapter(chapter.id);
                                }}
                              >
                                <span>View {chapter.totalTopics} Topics</span>
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="chapters">
                <div className="space-y-6">
                  {filteredSubjects.map((subject) => (
                    <div key={subject.id} className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-4">{subject.name}</h3>
                      
                      <Accordion type="multiple" value={expandedChapters}>
                        {subject.chapters.map((chapter) => (
                          <AccordionItem key={chapter.id} value={chapter.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                                <div>
                                  <span className="font-medium">{chapter.name}</span>
                                  <span className="text-sm text-gray-500 ml-2">
                                    ({chapter.completedTopics}/{chapter.totalTopics} completed)
                                  </span>
                                </div>
                                <Progress 
                                  value={(chapter.completedTopics / chapter.totalTopics) * 100} 
                                  className="h-1.5 mt-2 md:mt-0 md:ml-4 md:w-32"
                                />
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3 pt-2">
                                {chapter.topics.map((topic) => (
                                  <div
                                    key={topic.id}
                                    className={`border-l-4 p-3 rounded-md transition-colors ${getTopicCardBackground(topic.completed)}`}
                                  >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                      <div className="flex items-center mb-2 md:mb-0">
                                        {topic.completed ? (
                                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                        ) : (
                                          <Clock className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                        )}
                                        <div>
                                          <h4 className="font-medium">{topic.name}</h4>
                                          <div className="flex items-center mt-1">
                                            <Badge className={getImportanceColor(topic.importance)} variant="outline">
                                              {topic.importance}
                                            </Badge>
                                            <TooltipProvider delayDuration={300}>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <div className="flex items-center ml-2 text-xs text-gray-500">
                                                    <Flame className="h-3 w-3 mr-1 text-amber-500" />
                                                    {topic.weightage}% weightage
                                                    <Info className="h-3 w-3 ml-1 text-gray-400" />
                                                  </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                  <p>Expected weightage in the final exam</p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                                        {/* Link to Concept Cards */}
                                        <TooltipProvider delayDuration={300}>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button 
                                                size="sm" 
                                                variant="outline"
                                                className="flex items-center"
                                                onClick={() => navigateToConceptCard(topic.conceptCards[0])}
                                              >
                                                <Brain className="h-3 w-3 mr-1" />
                                                {topic.conceptCards.length} Concepts
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Study concept cards for {topic.name}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                        
                                        {/* Link to Flashcards */}
                                        <TooltipProvider delayDuration={300}>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button 
                                                size="sm" 
                                                variant="outline"
                                                className="flex items-center"
                                                onClick={() => navigateToFlashcard(topic.flashcards[0])}
                                              >
                                                <BookOpen className="h-3 w-3 mr-1" />
                                                {topic.flashcards.length} Flashcards
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Practice flashcards for {topic.name}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                        
                                        {/* Link to Practice Exams */}
                                        <TooltipProvider delayDuration={300}>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button 
                                                size="sm" 
                                                variant="outline"
                                                className="flex items-center"
                                                onClick={() => navigateToPracticeExam(topic.exams[0])}
                                              >
                                                <FileText className="h-3 w-3 mr-1" />
                                                {topic.exams.length} Tests
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Take practice tests for {topic.name}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </div>
                                    
                                    {/* Detailed Study Resources */}
                                    <div className="mt-3 pt-3 border-t">
                                      <div className="text-sm font-medium mb-2">Study Resources</div>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                        {/* Concept Cards */}
                                        <div className="bg-gray-50 p-2 rounded-md">
                                          <div className="font-medium text-xs">Concept Cards</div>
                                          <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
                                            {topic.conceptCards.map((cardId) => {
                                              const card = conceptCards[cardId as keyof typeof conceptCards];
                                              return card ? (
                                                <Button 
                                                  key={cardId}
                                                  variant="ghost" 
                                                  size="sm" 
                                                  className="w-full justify-start text-xs h-auto py-1"
                                                  onClick={() => navigateToConceptCard(cardId)}
                                                >
                                                  <div className="truncate text-left">
                                                    {card.title}
                                                    <Badge 
                                                      className="ml-1" 
                                                      variant="outline"
                                                      style={{ fontSize: '0.65rem', padding: '0 4px' }}
                                                    >
                                                      {card.difficulty}
                                                    </Badge>
                                                  </div>
                                                </Button>
                                              ) : null;
                                            })}
                                          </div>
                                        </div>
                                        
                                        {/* Flashcards */}
                                        <div className="bg-gray-50 p-2 rounded-md">
                                          <div className="font-medium text-xs">Flashcards</div>
                                          <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
                                            {topic.flashcards.map((cardId) => {
                                              const card = flashcards[cardId as keyof typeof flashcards];
                                              return card ? (
                                                <Button 
                                                  key={cardId}
                                                  variant="ghost" 
                                                  size="sm" 
                                                  className="w-full justify-start text-xs h-auto py-1"
                                                  onClick={() => navigateToFlashcard(cardId)}
                                                >
                                                  <div className="truncate text-left">
                                                    {card.title}
                                                    <Badge 
                                                      className="ml-1" 
                                                      variant="outline"
                                                      style={{ fontSize: '0.65rem', padding: '0 4px' }}
                                                    >
                                                      {card.difficulty}
                                                    </Badge>
                                                  </div>
                                                </Button>
                                              ) : null;
                                            })}
                                          </div>
                                        </div>
                                        
                                        {/* Practice Exams */}
                                        <div className="bg-gray-50 p-2 rounded-md">
                                          <div className="font-medium text-xs">Practice Tests</div>
                                          <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
                                            {topic.exams.map((examId) => {
                                              const exam = exams[examId as keyof typeof exams];
                                              return exam ? (
                                                <Button 
                                                  key={examId}
                                                  variant="ghost" 
                                                  size="sm" 
                                                  className="w-full justify-start text-xs h-auto py-1"
                                                  onClick={() => navigateToPracticeExam(examId)}
                                                >
                                                  <div className="truncate text-left">
                                                    {exam.title}
                                                    <Badge 
                                                      className="ml-1" 
                                                      variant="outline"
                                                      style={{ fontSize: '0.65rem', padding: '0 4px' }}
                                                    >
                                                      {exam.difficulty}
                                                    </Badge>
                                                  </div>
                                                </Button>
                                              ) : null;
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="weightage">
                <div className="space-y-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Topic Weightage Analysis</h2>
                    <p className="text-gray-600">
                      Analyze the importance of each topic based on its historical weightage in the exam.
                      Focus on high-weightage topics to maximize your score.
                    </p>
                  </div>
                  
                  {filteredSubjects.map((subject) => (
                    <div key={subject.id} className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-4">{subject.name}</h3>
                      
                      <div className="space-y-4">
                        {subject.chapters.map((chapter) => (
                          <div key={chapter.id} className="border p-3 rounded-md">
                            <h4 className="font-medium mb-3">{chapter.name}</h4>
                            
                            <div className="space-y-3">
                              {chapter.topics.map((topic) => {
                                return (
                                  <div 
                                    key={topic.id}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 rounded-md bg-gray-50"
                                  >
                                    <div className="flex items-center">
                                      <div 
                                        className={`w-2 h-2 rounded-full mr-2 ${
                                          topic.importance === 'high' ? 'bg-red-500' :
                                          topic.importance === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}
                                      ></div>
                                      <span>{topic.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center mt-2 sm:mt-0">
                                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                                        <div 
                                          className={`h-2 rounded-full ${
                                            topic.importance === 'high' ? 'bg-red-500' :
                                            topic.importance === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                          }`}
                                          style={{ width: `${topic.weightage}0%` }}
                                        ></div>
                                      </div>
                                      <span className="text-sm font-medium">{topic.weightage}%</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Exam Strategy Tip</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Focus on high-weightage topics first. Topics with more than 7% weightage typically account for 
                          more than 60% of the total marks in the exam.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExamSyllabusPage;
