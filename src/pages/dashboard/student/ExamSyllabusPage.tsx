
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Award, 
  Clock,
  PlayCircle,
  FileText,
  Brain,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ExamSyllabusPage = () => {
  const navigate = useNavigate();
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  // Mock data for syllabus with progress and marks
  const syllabusData = {
    examName: "NEET 2024",
    totalMarks: 720,
    subjects: [
      {
        id: "physics",
        name: "Physics",
        totalMarks: 180,
        expectedMarks: 135,
        currentMarks: 108,
        progress: 75,
        weightage: 25,
        color: "blue",
        topics: [
          {
            id: "mechanics",
            name: "Mechanics",
            totalMarks: 45,
            expectedMarks: 35,
            currentMarks: 28,
            progress: 80,
            weightage: 12.5,
            concepts: [
              { id: "c1", name: "Newton's Laws", progress: 90, mastery: "expert", marks: 8 },
              { id: "c2", name: "Work & Energy", progress: 75, mastery: "intermediate", marks: 6 },
              { id: "c3", name: "Rotational Motion", progress: 60, mastery: "beginner", marks: 4 }
            ]
          },
          {
            id: "thermodynamics",
            name: "Thermodynamics",
            totalMarks: 35,
            expectedMarks: 28,
            currentMarks: 22,
            progress: 65,
            weightage: 9.7,
            concepts: [
              { id: "c4", name: "Laws of Thermodynamics", progress: 70, mastery: "intermediate", marks: 7 },
              { id: "c5", name: "Heat Engines", progress: 55, mastery: "beginner", marks: 5 }
            ]
          }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        totalMarks: 180,
        expectedMarks: 145,
        currentMarks: 120,
        progress: 82,
        weightage: 25,
        color: "green",
        topics: [
          {
            id: "organic",
            name: "Organic Chemistry",
            totalMarks: 60,
            expectedMarks: 50,
            currentMarks: 42,
            progress: 85,
            weightage: 16.7,
            concepts: [
              { id: "c6", name: "Hydrocarbons", progress: 95, mastery: "expert", marks: 12 },
              { id: "c7", name: "Alcohols & Ethers", progress: 80, mastery: "intermediate", marks: 8 }
            ]
          }
        ]
      },
      {
        id: "biology",
        name: "Biology",
        totalMarks: 360,
        expectedMarks: 290,
        currentMarks: 245,
        progress: 68,
        weightage: 50,
        color: "purple",
        topics: [
          {
            id: "genetics",
            name: "Genetics",
            totalMarks: 45,
            expectedMarks: 38,
            currentMarks: 30,
            progress: 78,
            weightage: 12.5,
            concepts: [
              { id: "c8", name: "Mendelian Genetics", progress: 85, mastery: "expert", marks: 10 },
              { id: "c9", name: "Molecular Basis", progress: 70, mastery: "intermediate", marks: 8 }
            ]
          }
        ]
      }
    ]
  };

  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case 'expert': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'beginner': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSubjectColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900'
    };
    return colors[color] || colors.blue;
  };

  const calculateOverallProgress = () => {
    const totalProgress = syllabusData.subjects.reduce((sum, subject) => sum + subject.progress, 0);
    return Math.round(totalProgress / syllabusData.subjects.length);
  };

  const calculateTotalCurrentMarks = () => {
    return syllabusData.subjects.reduce((sum, subject) => sum + subject.currentMarks, 0);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {syllabusData.examName} Syllabus
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Complete exam syllabus with progress tracking and marks analysis
          </p>
        </div>
        <Button>
          <BarChart3 className="mr-2 h-4 w-4" />
          Performance Analysis
        </Button>
      </div>

      {/* Overall Progress Card */}
      <Card className="border-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-800">
            <Target className="h-5 w-5" />
            Overall Exam Preparation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{calculateOverallProgress()}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
              <Progress value={calculateOverallProgress()} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{calculateTotalCurrentMarks()}</div>
              <div className="text-sm text-gray-600">Current Score</div>
              <div className="text-xs text-gray-500">out of {syllabusData.totalMarks}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">570</div>
              <div className="text-sm text-gray-600">Target Score</div>
              <div className="text-xs text-gray-500">Expected marks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{syllabusData.subjects.length}</div>
              <div className="text-sm text-gray-600">Subjects</div>
              <div className="text-xs text-gray-500">Total coverage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {syllabusData.subjects.map((subject) => (
            <Card key={subject.id} className="overflow-hidden">
              <CardHeader className={`${getSubjectColorClasses(subject.color)} border-b`}>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {subject.currentMarks}/{subject.totalMarks} marks
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Target: {subject.expectedMarks}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {subject.weightage}% weightage
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{subject.progress}%</div>
                    <div className="text-sm opacity-75">Completed</div>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2 mt-3" />
              </CardHeader>
              <CardContent className="p-0">
                {subject.topics.map((topic) => (
                  <Collapsible key={topic.id}>
                    <CollapsibleTrigger
                      className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700"
                      onClick={() => toggleTopic(topic.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-left">
                          <h4 className="font-semibold text-lg">{topic.name}</h4>
                          <div className="flex gap-4 mt-1 text-sm text-gray-600">
                            <span>{topic.currentMarks}/{topic.totalMarks} marks</span>
                            <span>Expected: {topic.expectedMarks}</span>
                            <span>{topic.weightage}% weightage</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-bold text-lg">{topic.progress}%</div>
                            <Progress value={topic.progress} className="h-1.5 w-16" />
                          </div>
                          <ChevronRight 
                            className={`h-4 w-4 transition-transform ${
                              expandedTopics.has(topic.id) ? 'rotate-90' : ''
                            }`} 
                          />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="bg-gray-50 dark:bg-gray-800/50">
                      <div className="p-4 space-y-3">
                        {topic.concepts.map((concept) => (
                          <div 
                            key={concept.id}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-all cursor-pointer"
                            onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                          >
                            <div className="flex items-center gap-3">
                              <Brain className="h-4 w-4 text-indigo-500" />
                              <div>
                                <h5 className="font-medium">{concept.name}</h5>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className={getMasteryColor(concept.mastery)}>
                                    {concept.mastery}
                                  </Badge>
                                  <span className="text-sm text-gray-500">{concept.marks} marks</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="font-semibold">{concept.progress}%</div>
                                <Progress value={concept.progress} className="h-1 w-12" />
                              </div>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline" className="h-7 px-2">
                                  <PlayCircle className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" className="h-7 px-2">
                                  <FileText className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Quick Actions for Topic */}
                        <div className="flex gap-2 pt-2 border-t">
                          <Button size="sm" variant="outline" className="flex-1">
                            <BookOpen className="mr-1 h-3 w-3" />
                            Study Plan
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <FileText className="mr-1 h-3 w-3" />
                            Practice Tests
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Clock className="mr-1 h-3 w-3" />
                            Flashcards
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Individual Subject Tabs */}
        {syllabusData.subjects.map((subject) => (
          <TabsContent key={subject.id} value={subject.id.toLowerCase()}>
            <Card>
              <CardHeader className={`${getSubjectColorClasses(subject.color)}`}>
                <CardTitle className="text-2xl">{subject.name} Detailed Syllabus</CardTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{subject.progress}%</div>
                    <div className="text-sm">Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{subject.currentMarks}</div>
                    <div className="text-sm">Current Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{subject.expectedMarks}</div>
                    <div className="text-sm">Target Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{subject.weightage}%</div>
                    <div className="text-sm">Weightage</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Same topic structure as above but with more detailed view */}
                {subject.topics.map((topic) => (
                  <div key={topic.id} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold">{topic.name}</h3>
                      <div className="text-right">
                        <div className="font-bold">{topic.progress}%</div>
                        <Progress value={topic.progress} className="h-2 w-24" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {topic.concepts.map((concept) => (
                        <Card 
                          key={concept.id} 
                          className="p-4 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-sm">{concept.name}</h5>
                            <span className="text-xs font-semibold">{concept.marks}m</span>
                          </div>
                          <div className="space-y-2">
                            <Progress value={concept.progress} className="h-1.5" />
                            <div className="flex justify-between items-center">
                              <Badge variant="outline" className={getMasteryColor(concept.mastery)}>
                                {concept.mastery}
                              </Badge>
                              <span className="text-xs text-gray-500">{concept.progress}%</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExamSyllabusPage;
