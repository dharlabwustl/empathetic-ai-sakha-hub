
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowRight, BookOpen, CheckCircle, Clock, FileText, Filter, Calendar, Plus, Search, Star, Target, ChevronDown, ChevronUp, TrendingUp, Brain, Lightbulb, Timer } from "lucide-react";
import { SharedPageLayout } from '../SharedPageLayout';
import { motion } from 'framer-motion';

const practiceExams = [
  {
    id: "1",
    title: "Physics Full Mock Test",
    subject: "Physics",
    examType: "NEET",
    questionsCount: 90,
    timeEstimate: 180,
    difficulty: "hard",
    completed: false,
    progress: 0,
    score: null,
    dueDate: "2023-06-15",
    lastAttempted: null,
    weightage: 33,
    priority: "high",
    status: "pending",
    topics: [
      { name: "Mechanics", weightage: 12, completed: false, priority: "high", questions: 30 },
      { name: "Thermodynamics", weightage: 8, completed: false, priority: "high", questions: 20 },
      { name: "Optics", weightage: 7, completed: false, priority: "medium", questions: 25 },
      { name: "Modern Physics", weightage: 6, completed: false, priority: "medium", questions: 15 }
    ],
    description: "Complete physics mock test covering mechanics, thermodynamics, optics, and modern physics."
  },
  {
    id: "2",
    title: "Organic Chemistry Test",
    subject: "Chemistry",
    examType: "NEET",
    questionsCount: 45,
    timeEstimate: 90,
    difficulty: "medium",
    completed: true,
    progress: 100,
    score: 78,
    dueDate: "2023-06-10",
    lastAttempted: "2023-06-09",
    weightage: 22,
    priority: "medium",
    status: "completed",
    topics: [
      { name: "Hydrocarbons", weightage: 8, completed: true, priority: "high", questions: 15 },
      { name: "Alcohols", weightage: 7, completed: true, priority: "high", questions: 15 },
      { name: "Carbonyl Compounds", weightage: 7, completed: true, priority: "medium", questions: 15 }
    ],
    description: "Test covering organic chemistry reactions, mechanisms, and compounds."
  },
  {
    id: "3",
    title: "Biology Unit Test",
    subject: "Biology",
    examType: "NEET",
    questionsCount: 60,
    timeEstimate: 120,
    difficulty: "medium",
    completed: false,
    progress: 30,
    score: null,
    dueDate: "2023-06-18",
    lastAttempted: "2023-06-08",
    weightage: 25,
    priority: "high",
    status: "in-progress",
    topics: [
      { name: "Human Physiology", weightage: 10, completed: false, priority: "high", questions: 25 },
      { name: "Plant Biology", weightage: 8, completed: true, priority: "medium", questions: 20 },
      { name: "Genetics", weightage: 7, completed: false, priority: "high", questions: 15 }
    ],
    description: "Comprehensive unit test covering human physiology and plant biology."
  },
  {
    id: "4",
    title: "Mathematics Advanced Test",
    subject: "Mathematics",
    examType: "JEE",
    questionsCount: 75,
    timeEstimate: 180,
    difficulty: "hard",
    completed: false,
    progress: 0,
    score: null,
    dueDate: "2023-06-20",
    lastAttempted: null,
    weightage: 20,
    priority: "medium",
    status: "overdue",
    topics: [
      { name: "Calculus", weightage: 8, completed: false, priority: "high", questions: 25 },
      { name: "Algebra", weightage: 6, completed: false, priority: "medium", questions: 25 },
      { name: "Coordinate Geometry", weightage: 6, completed: false, priority: "medium", questions: 25 }
    ],
    description: "Advanced mathematics test covering calculus, algebra, and coordinate geometry."
  }
];

const TopicBreakdownCard = ({ exam }: { exam: typeof practiceExams[0] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{exam.title}</CardTitle>
                <CardDescription>
                  {exam.subject} • {exam.questionsCount} questions • {exam.weightage}% weightage
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${
                  exam.priority === 'high' ? 'bg-red-100 text-red-700' :
                  exam.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {exam.priority} priority
                </Badge>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{exam.score || 0}%</div>
                  <div className="text-sm text-blue-600">Best Score</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{exam.progress}%</div>
                  <div className="text-sm text-green-600">Progress</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{exam.questionsCount}</div>
                  <div className="text-sm text-purple-600">Questions</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{exam.timeEstimate}m</div>
                  <div className="text-sm text-orange-600">Duration</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Topic Breakdown
                </h4>
                <div className="space-y-2">
                  {exam.topics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          topic.priority === 'high' ? 'bg-red-500' :
                          topic.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <span className="font-medium">{topic.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {topic.weightage}% weightage
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {topic.questions} questions
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {topic.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

const WeightageAnalysis = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Exam Weightage Distribution
        </CardTitle>
        <CardDescription>Importance by subject in upcoming exams</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {practiceExams.map((exam, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{exam.subject}</span>
                <span className="text-sm font-medium">{exam.weightage}%</span>
              </div>
              <Progress value={exam.weightage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {exam.questionsCount} questions • {exam.timeEstimate} min • {exam.status}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const DailySmartSuggestions = () => {
  const suggestions = [
    {
      icon: Brain,
      title: "Start Physics Mock Test",
      description: "High weightage (33%) - Focus on mechanics and thermodynamics",
      priority: "high",
      estimatedTime: "180 min"
    },
    {
      icon: Target,
      title: "Complete Biology Unit Test", 
      description: "30% progress - Continue with human physiology",
      priority: "medium",
      estimatedTime: "90 min"
    },
    {
      icon: Lightbulb,
      title: "Review Math Concepts",
      description: "Overdue test - Quick calculus revision recommended",
      priority: "high",
      estimatedTime: "45 min"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Daily Smart Suggestions
        </CardTitle>
        <CardDescription>AI-powered exam recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-lg ${
                suggestion.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}>
                <suggestion.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Timer className="h-3 w-3 mr-1" />
                    {suggestion.estimatedTime}
                  </Badge>
                  <Badge className={`text-xs ${
                    suggestion.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {suggestion.priority} priority
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const PracticeExamsView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("breakdown");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const filteredExams = practiceExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || exam.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Comprehensive exam preparation with detailed analytics"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search practice exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === "in-progress" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("in-progress")}
            >
              In Progress
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("completed")}
            >
              Completed
            </Button>
          </div>
        </div>

        <Tabs defaultValue="breakdown" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="breakdown">Topic Breakdown</TabsTrigger>
            <TabsTrigger value="weightage">Weightage Analysis</TabsTrigger>
            <TabsTrigger value="suggestions">Smart Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="breakdown" className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {filteredExams.map((exam) => (
                <TopicBreakdownCard key={exam.id} exam={exam} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="weightage" className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <WeightageAnalysis />
            </motion.div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <DailySmartSuggestions />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsView;
