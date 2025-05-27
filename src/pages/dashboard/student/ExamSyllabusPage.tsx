
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Brain, 
  Calculator, 
  Atom, 
  Dna, 
  ChevronRight,
  Clock,
  Target,
  Award,
  TrendingUp,
  CheckCircle2,
  Circle,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ExamSyllabusPage = () => {
  const [activeSubject, setActiveSubject] = useState('physics');

  const examInfo = {
    name: "NEET 2024",
    totalMarks: 720,
    duration: "3 hours 20 minutes",
    subjects: {
      physics: { marks: 180, questions: 45, color: "bg-blue-500" },
      chemistry: { marks: 180, questions: 45, color: "bg-green-500" },
      biology: { marks: 360, questions: 90, color: "bg-purple-500" }
    }
  };

  const syllabusData = {
    physics: {
      icon: <Calculator className="h-5 w-5" />,
      topics: [
        {
          name: "Mechanics",
          weightage: 25,
          progress: 85,
          mastery: "Advanced",
          expectedMarks: 45,
          concepts: [
            { name: "Newton's Laws of Motion", progress: 90, mastery: "Expert", link: "/dashboard/student/concepts/1" },
            { name: "Work, Energy & Power", progress: 80, mastery: "Advanced", link: "/dashboard/student/concepts/2" },
            { name: "Rotational Motion", progress: 85, mastery: "Advanced", link: "/dashboard/student/concepts/3" }
          ]
        },
        {
          name: "Thermodynamics",
          weightage: 20,
          progress: 70,
          mastery: "Intermediate",
          expectedMarks: 36,
          concepts: [
            { name: "Laws of Thermodynamics", progress: 75, mastery: "Advanced", link: "/dashboard/student/concepts/4" },
            { name: "Heat Engines", progress: 65, mastery: "Intermediate", link: "/dashboard/student/concepts/5" }
          ]
        },
        {
          name: "Optics",
          weightage: 18,
          progress: 60,
          mastery: "Intermediate",
          expectedMarks: 32,
          concepts: [
            { name: "Ray Optics", progress: 70, mastery: "Advanced", link: "/dashboard/student/concepts/6" },
            { name: "Wave Optics", progress: 50, mastery: "Beginner", link: "/dashboard/student/concepts/7" }
          ]
        }
      ]
    },
    chemistry: {
      icon: <Atom className="h-5 w-5" />,
      topics: [
        {
          name: "Organic Chemistry",
          weightage: 35,
          progress: 75,
          mastery: "Advanced",
          expectedMarks: 63,
          concepts: [
            { name: "Hydrocarbons", progress: 80, mastery: "Advanced", link: "/dashboard/student/concepts/8" },
            { name: "Alcohols & Ethers", progress: 70, mastery: "Intermediate", link: "/dashboard/student/concepts/9" }
          ]
        },
        {
          name: "Inorganic Chemistry",
          weightage: 30,
          progress: 65,
          mastery: "Intermediate",
          expectedMarks: 54,
          concepts: [
            { name: "Coordination Compounds", progress: 60, mastery: "Intermediate", link: "/dashboard/student/concepts/10" },
            { name: "d-Block Elements", progress: 70, mastery: "Advanced", link: "/dashboard/student/concepts/11" }
          ]
        }
      ]
    },
    biology: {
      icon: <Dna className="h-5 w-5" />,
      topics: [
        {
          name: "Human Physiology",
          weightage: 40,
          progress: 80,
          mastery: "Advanced",
          expectedMarks: 144,
          concepts: [
            { name: "Circulatory System", progress: 85, mastery: "Advanced", link: "/dashboard/student/concepts/12" },
            { name: "Nervous System", progress: 75, mastery: "Advanced", link: "/dashboard/student/concepts/13" }
          ]
        },
        {
          name: "Plant Biology",
          weightage: 35,
          progress: 70,
          mastery: "Intermediate",
          expectedMarks: 126,
          concepts: [
            { name: "Photosynthesis", progress: 80, mastery: "Advanced", link: "/dashboard/student/concepts/14" },
            { name: "Plant Hormones", progress: 60, mastery: "Intermediate", link: "/dashboard/student/concepts/15" }
          ]
        }
      ]
    }
  };

  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case 'Expert': return 'bg-green-100 text-green-800 border-green-200';
      case 'Advanced': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Beginner': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const currentSubject = syllabusData[activeSubject as keyof typeof syllabusData];
  const currentExamInfo = examInfo.subjects[activeSubject as keyof typeof examInfo.subjects];

  const overallProgress = Math.round(
    Object.values(syllabusData).reduce((acc, subject) => {
      const avgProgress = subject.topics.reduce((sum, topic) => sum + topic.progress, 0) / subject.topics.length;
      return acc + avgProgress;
    }, 0) / Object.keys(syllabusData).length
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {examInfo.name} Syllabus
            </h1>
            <p className="text-muted-foreground mt-1">Complete syllabus breakdown with progress tracking</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-2">
              <Award className="h-3 w-3 mr-1" />
              {overallProgress}% Complete
            </Badge>
            <div className="text-sm text-muted-foreground">
              {examInfo.totalMarks} marks • {examInfo.duration}
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Subject Tabs */}
      <Tabs value={activeSubject} onValueChange={setActiveSubject} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger 
            value="physics" 
            className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <Calculator className="h-4 w-4" />
            Physics
          </TabsTrigger>
          <TabsTrigger 
            value="chemistry"
            className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <Atom className="h-4 w-4" />
            Chemistry
          </TabsTrigger>
          <TabsTrigger 
            value="biology"
            className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
          >
            <Dna className="h-4 w-4" />
            Biology
          </TabsTrigger>
        </TabsList>

        {/* Subject Content */}
        {Object.entries(syllabusData).map(([subject, data]) => (
          <TabsContent key={subject} value={subject} className="space-y-6">
            {/* Subject Overview */}
            <Card className="border-2 border-dashed border-indigo-200 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {data.icon}
                    {subject.charAt(0).toUpperCase() + subject.slice(1)} Overview
                  </CardTitle>
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-lg">{currentExamInfo.marks}</div>
                      <div className="text-muted-foreground">Total Marks</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg">{currentExamInfo.questions}</div>
                      <div className="text-muted-foreground">Questions</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Topics Grid */}
            <div className="space-y-4">
              {data.topics.map((topic, topicIndex) => (
                <Card key={topicIndex} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-indigo-600" />
                        <div>
                          <CardTitle className="text-lg">{topic.name}</CardTitle>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                              {topic.weightage}% weightage
                            </Badge>
                            <Badge variant="outline" className={getMasteryColor(topic.mastery)}>
                              {topic.mastery}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">
                          {topic.expectedMarks} marks
                        </div>
                        <div className="text-sm text-muted-foreground">Expected</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Topic Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Topic Progress</span>
                        <span className="font-medium">{topic.progress}%</span>
                      </div>
                      <Progress 
                        value={topic.progress} 
                        className="h-2"
                        style={{ 
                          background: `linear-gradient(to right, ${getProgressColor(topic.progress)} ${topic.progress}%, #e5e7eb ${topic.progress}%)` 
                        }}
                      />
                    </div>

                    {/* Concepts */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Key Concepts
                      </h4>
                      <div className="grid gap-2">
                        {topic.concepts.map((concept, conceptIndex) => (
                          <Link 
                            key={conceptIndex}
                            to={concept.link}
                            className="block p-3 border border-gray-100 rounded-lg hover:bg-gray-50 hover:border-indigo-200 transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                  {concept.progress === 100 ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium text-sm group-hover:text-indigo-600 transition-colors">
                                    {concept.name}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${getMasteryColor(concept.mastery)}`}
                                    >
                                      {concept.mastery}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {concept.progress}% complete
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={concept.progress} 
                                  className="h-1 w-16"
                                />
                                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Quick Actions for {subject.charAt(0).toUpperCase() + subject.slice(1)}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button asChild variant="outline" className="justify-start h-auto py-3">
                    <Link to="/dashboard/student/practice-exam">
                      <div className="text-left">
                        <div className="font-medium">Practice Tests</div>
                        <div className="text-xs text-muted-foreground">Subject-specific exams</div>
                      </div>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start h-auto py-3">
                    <Link to="/dashboard/student/flashcards">
                      <div className="text-left">
                        <div className="font-medium">Review Flashcards</div>
                        <div className="text-xs text-muted-foreground">Quick revision</div>
                      </div>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start h-auto py-3">
                    <Link to="/dashboard/student/previous-year-analysis">
                      <div className="text-left">
                        <div className="font-medium">Previous Papers</div>
                        <div className="text-xs text-muted-foreground">Analyze patterns</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExamSyllabusPage;
