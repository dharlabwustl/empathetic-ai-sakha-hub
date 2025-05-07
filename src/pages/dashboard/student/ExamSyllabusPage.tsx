
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, BookOpen, Brain, FileText, FileQuestion, Book } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for syllabus structure
const syllabusData = {
  examName: "NEET 2026",
  subjects: [
    {
      id: "physics",
      name: "Physics",
      progress: 45,
      units: [
        {
          id: "mechanics",
          name: "Mechanics",
          progress: 60,
          topics: [
            {
              id: "newton-laws",
              name: "Newton's Laws of Motion",
              progress: 80,
              importance: "high",
              status: "in-progress",
              conceptCount: 5,
              lastAccessed: "2 days ago",
              timeSpent: "3h 45m",
              frequency: "high",
              questionCount: 26,
              trend: "increasing"
            },
            {
              id: "gravitation",
              name: "Gravitation",
              progress: 40,
              importance: "high",
              status: "in-progress",
              conceptCount: 4,
              lastAccessed: "5 days ago",
              timeSpent: "2h 20m",
              frequency: "medium",
              questionCount: 18,
              trend: "stable"
            }
          ]
        },
        {
          id: "electro",
          name: "Electrodynamics",
          progress: 30,
          topics: [
            {
              id: "current-electricity",
              name: "Current Electricity",
              progress: 30,
              importance: "high",
              status: "not-started",
              conceptCount: 6,
              lastAccessed: "1 week ago",
              timeSpent: "1h 15m",
              frequency: "high",
              questionCount: 24,
              trend: "increasing"
            }
          ]
        }
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      progress: 60,
      units: [
        {
          id: "organic",
          name: "Organic Chemistry",
          progress: 75,
          topics: [
            {
              id: "hydrocarbon",
              name: "Hydrocarbons",
              progress: 90,
              importance: "high",
              status: "mastered",
              conceptCount: 8,
              lastAccessed: "yesterday",
              timeSpent: "5h 30m",
              frequency: "high",
              questionCount: 32,
              trend: "stable"
            }
          ]
        }
      ]
    },
    {
      id: "biology",
      name: "Biology",
      progress: 20,
      units: [
        {
          id: "human-physio",
          name: "Human Physiology",
          progress: 15,
          topics: [
            {
              id: "digestive",
              name: "Digestive System",
              progress: 10,
              importance: "medium",
              status: "not-started",
              conceptCount: 7,
              lastAccessed: "never",
              timeSpent: "0h 0m",
              frequency: "medium",
              questionCount: 16,
              trend: "stable"
            }
          ]
        }
      ]
    }
  ]
};

// Topic status color mapping
const statusColors = {
  "not-started": "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  "mastered": "bg-green-100 text-green-800"
};

// Importance color mapping
const importanceColors = {
  "high": "bg-red-100 text-red-800",
  "medium": "bg-orange-100 text-orange-800",
  "low": "bg-yellow-100 text-yellow-800"
};

const ExamSyllabusPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImportance, setSelectedImportance] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  // Function to get tooltip content for progress bar
  const getProgressTooltip = (topic: any) => {
    return `Last accessed: ${topic.lastAccessed}\nTime spent: ${topic.timeSpent}`;
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header with back button and exam info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Button variant="outline" asChild className="mb-2">
            <Link to="/dashboard/student">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{syllabusData.examName} Syllabus</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/student/study-plan">
                View Study Plan
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/student/previous-year-analysis">
                PYQ Analysis
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search topics..." 
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedImportance} onValueChange={setSelectedImportance}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Importance</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="mastered">Mastered</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Subjects Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all" onClick={() => setSelectedSubject("all")}>All Subjects</TabsTrigger>
          {syllabusData.subjects.map((subject) => (
            <TabsTrigger 
              key={subject.id} 
              value={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
            >
              {subject.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* All Subjects Content */}
        <TabsContent value="all">
          <div className="space-y-8">
            {syllabusData.subjects.map((subject) => (
              <div key={subject.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    {subject.name}
                    <Badge variant={subject.progress > 70 ? "default" : subject.progress > 30 ? "secondary" : "outline"}>
                      {subject.progress}%
                    </Badge>
                  </h2>
                  <div className="w-48">
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                </div>
                
                <div className="pl-4 space-y-6">
                  {subject.units.map((unit) => (
                    <div key={unit.id} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg">{unit.name}</h3>
                        <div className="w-32">
                          <Progress value={unit.progress} className="h-1.5" />
                        </div>
                      </div>
                      
                      <div className={viewMode === "list" ? "" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                        {unit.topics.map((topic) => (
                          viewMode === "list" ? (
                            <div key={topic.id} className="pl-4 py-2 border-l-2 border-gray-200">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div>
                                  <h4 className="font-medium">{topic.name}</h4>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    <Badge variant="outline" className={statusColors[topic.status as keyof typeof statusColors]}>
                                      {topic.status === "not-started" ? "Not Started" : 
                                       topic.status === "in-progress" ? "In Progress" : "Mastered"}
                                    </Badge>
                                    <Badge variant="outline" className={importanceColors[topic.importance as keyof typeof importanceColors]}>
                                      {topic.importance.charAt(0).toUpperCase() + topic.importance.slice(1)} Importance
                                    </Badge>
                                    <Badge variant="outline">{topic.frequency === "high" ? "🔥" : "📊"} {topic.questionCount} questions</Badge>
                                  </div>
                                </div>
                                <div className="mt-2 sm:mt-0 sm:ml-2">
                                  <div className="w-full sm:w-32 mb-1">
                                    <Progress 
                                      value={topic.progress} 
                                      className="h-1.5" 
                                      title={getProgressTooltip(topic)} 
                                    />
                                  </div>
                                  <div className="flex gap-1 mt-2">
                                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                                      <Link to={`/dashboard/student/concepts/card/${topic.id}`}>
                                        <BookOpen className="h-3 w-3 mr-1" /> Concept
                                      </Link>
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                                      <Link to={`/dashboard/student/flashcards/${topic.id}`}>
                                        <Brain className="h-3 w-3 mr-1" /> Flashcards
                                      </Link>
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                                      <Link to={`/dashboard/student/practice-exam/${topic.id}`}>
                                        <FileQuestion className="h-3 w-3 mr-1" /> Practice
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <Card key={topic.id} className="overflow-hidden">
                              <CardContent className="p-4">
                                <h4 className="font-medium">{topic.name}</h4>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  <Badge variant="outline" className={statusColors[topic.status as keyof typeof statusColors]}>
                                    {topic.status === "not-started" ? "Not Started" : 
                                     topic.status === "in-progress" ? "In Progress" : "Mastered"}
                                  </Badge>
                                  <Badge variant="outline" className={importanceColors[topic.importance as keyof typeof importanceColors]}>
                                    {topic.importance.charAt(0).toUpperCase() + topic.importance.slice(1)}
                                  </Badge>
                                </div>
                                
                                <div className="mt-3">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Progress</span>
                                    <span>{topic.progress}%</span>
                                  </div>
                                  <Progress 
                                    value={topic.progress} 
                                    className="h-1.5" 
                                    title={getProgressTooltip(topic)} 
                                  />
                                </div>
                                
                                <div className="mt-3 text-sm text-gray-500 flex items-center justify-between">
                                  <span>Last Accessed: {topic.lastAccessed}</span>
                                  <span>📊 {topic.questionCount} Qs</span>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-1 mt-3">
                                  <Button size="sm" variant="outline" className="h-8 px-2 text-xs" asChild>
                                    <Link to={`/dashboard/student/concepts/card/${topic.id}`}>
                                      <BookOpen className="h-3 w-3 mr-1" /> Concept
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 px-2 text-xs" asChild>
                                    <Link to={`/dashboard/student/flashcards/${topic.id}`}>
                                      <Brain className="h-3 w-3 mr-1" /> Flash
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 px-2 text-xs" asChild>
                                    <Link to={`/dashboard/student/practice-exam/${topic.id}`}>
                                      <FileQuestion className="h-3 w-3 mr-1" /> Quiz
                                    </Link>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Individual Subject Content */}
        {syllabusData.subjects.map((subject) => (
          <TabsContent key={subject.id} value={subject.id}>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{subject.name}</h2>
                <div className="w-48">
                  <Progress value={subject.progress} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-8">
                {subject.units.map((unit) => (
                  <div key={unit.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-lg">{unit.name}</h3>
                      <div className="w-32">
                        <Progress value={unit.progress} className="h-1.5" />
                      </div>
                    </div>
                    
                    <div className={viewMode === "list" ? "" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                      {unit.topics.map((topic) => (
                        viewMode === "list" ? (
                          <div key={topic.id} className="pl-4 py-2 border-l-2 border-gray-200">
                            <div className="flex flex-col sm:flex-row justify-between">
                              <div>
                                <h4 className="font-medium">{topic.name}</h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <Badge variant="outline" className={statusColors[topic.status as keyof typeof statusColors]}>
                                    {topic.status === "not-started" ? "Not Started" : 
                                     topic.status === "in-progress" ? "In Progress" : "Mastered"}
                                  </Badge>
                                  <Badge variant="outline" className={importanceColors[topic.importance as keyof typeof importanceColors]}>
                                    {topic.importance.charAt(0).toUpperCase() + topic.importance.slice(1)} Importance
                                  </Badge>
                                  <Badge variant="outline">{topic.frequency === "high" ? "🔥" : "📊"} {topic.questionCount} questions</Badge>
                                </div>
                              </div>
                              <div className="mt-2 sm:mt-0 sm:ml-2">
                                <div className="w-full sm:w-32 mb-1">
                                  <Progress 
                                    value={topic.progress} 
                                    className="h-1.5" 
                                    title={getProgressTooltip(topic)} 
                                  />
                                </div>
                                <div className="flex gap-1 mt-2">
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                                    <Link to={`/dashboard/student/concepts/card/${topic.id}`}>
                                      <BookOpen className="h-3 w-3 mr-1" /> Concept
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                                    <Link to={`/dashboard/student/flashcards/${topic.id}`}>
                                      <Brain className="h-3 w-3 mr-1" /> Flashcards
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs" asChild>
                                    <Link to={`/dashboard/student/practice-exam/${topic.id}`}>
                                      <FileQuestion className="h-3 w-3 mr-1" /> Practice
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Card key={topic.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <h4 className="font-medium">{topic.name}</h4>
                              <div className="flex flex-wrap gap-1 mt-2">
                                <Badge variant="outline" className={statusColors[topic.status as keyof typeof statusColors]}>
                                  {topic.status === "not-started" ? "Not Started" : 
                                   topic.status === "in-progress" ? "In Progress" : "Mastered"}
                                </Badge>
                                <Badge variant="outline" className={importanceColors[topic.importance as keyof typeof importanceColors]}>
                                  {topic.importance.charAt(0).toUpperCase() + topic.importance.slice(1)}
                                </Badge>
                              </div>
                              
                              <div className="mt-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{topic.progress}%</span>
                                </div>
                                <Progress 
                                  value={topic.progress} 
                                  className="h-1.5" 
                                  title={getProgressTooltip(topic)} 
                                />
                              </div>
                              
                              <div className="mt-3 text-sm text-gray-500 flex items-center justify-between">
                                <span>Last Accessed: {topic.lastAccessed}</span>
                                <span>📊 {topic.questionCount} Qs</span>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-1 mt-3">
                                <Button size="sm" variant="outline" className="h-8 px-2 text-xs" asChild>
                                  <Link to={`/dashboard/student/concepts/card/${topic.id}`}>
                                    <BookOpen className="h-3 w-3 mr-1" /> Concept
                                  </Link>
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 px-2 text-xs" asChild>
                                  <Link to={`/dashboard/student/flashcards/${topic.id}`}>
                                    <Brain className="h-3 w-3 mr-1" /> Flash
                                  </Link>
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 px-2 text-xs" asChild>
                                  <Link to={`/dashboard/student/practice-exam/${topic.id}`}>
                                    <FileQuestion className="h-3 w-3 mr-1" /> Quiz
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExamSyllabusPage;
