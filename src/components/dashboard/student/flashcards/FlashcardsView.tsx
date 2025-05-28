
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowRight, BookOpen, CheckCircle, Clock, FileText, Filter, Calendar, Plus, Search, Star, Target, ChevronDown, ChevronUp, TrendingUp, Brain, Lightbulb } from "lucide-react";
import { SharedPageLayout } from '../SharedPageLayout';
import { motion } from 'framer-motion';

const flashcardSets = [
  {
    id: "1",
    title: "Physics Fundamentals",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "medium",
    totalCards: 45,
    masteredCards: 32,
    accuracy: 87,
    timeEstimate: 25,
    lastStudied: "2 hours ago",
    streak: 5,
    weightage: 25,
    priority: "high",
    status: "in-progress",
    topics: [
      { name: "Newton's Laws", weightage: 8, completed: true, priority: "high" },
      { name: "Energy & Work", weightage: 7, completed: true, priority: "high" },
      { name: "Momentum", weightage: 6, completed: false, priority: "medium" },
      { name: "Rotational Motion", weightage: 4, completed: false, priority: "medium" }
    ]
  },
  {
    id: "2",
    title: "Chemical Bonding",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    difficulty: "hard",
    totalCards: 38,
    masteredCards: 15,
    accuracy: 74,
    timeEstimate: 35,
    lastStudied: "1 day ago",
    streak: 3,
    weightage: 22,
    priority: "high",
    status: "pending",
    topics: [
      { name: "Ionic Bonding", weightage: 6, completed: false, priority: "high" },
      { name: "Covalent Bonding", weightage: 8, completed: false, priority: "high" },
      { name: "Metallic Bonding", weightage: 4, completed: false, priority: "medium" },
      { name: "Intermolecular Forces", weightage: 4, completed: false, priority: "low" }
    ]
  },
  {
    id: "3",
    title: "Cell Biology",
    subject: "Biology",
    topic: "Cell Structure",
    difficulty: "easy",
    totalCards: 52,
    masteredCards: 48,
    accuracy: 94,
    timeEstimate: 20,
    lastStudied: "3 hours ago",
    streak: 8,
    weightage: 20,
    priority: "medium",
    status: "completed",
    topics: [
      { name: "Cell Organelles", weightage: 8, completed: true, priority: "high" },
      { name: "Cell Membrane", weightage: 6, completed: true, priority: "high" },
      { name: "Cell Division", weightage: 4, completed: true, priority: "medium" },
      { name: "Cell Cycle", weightage: 2, completed: true, priority: "low" }
    ]
  },
  {
    id: "4",
    title: "Calculus Basics",
    subject: "Mathematics",
    topic: "Differentiation",
    difficulty: "hard",
    totalCards: 29,
    masteredCards: 12,
    accuracy: 68,
    timeEstimate: 40,
    lastStudied: "5 days ago",
    streak: 1,
    weightage: 18,
    priority: "high",
    status: "overdue",
    topics: [
      { name: "Limits", weightage: 5, completed: false, priority: "high" },
      { name: "Derivatives", weightage: 8, completed: false, priority: "high" },
      { name: "Chain Rule", weightage: 3, completed: false, priority: "medium" },
      { name: "Applications", weightage: 2, completed: false, priority: "low" }
    ]
  }
];

const TopicBreakdownCard = ({ flashcardSet }: { flashcardSet: typeof flashcardSets[0] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{flashcardSet.title}</CardTitle>
                <CardDescription>
                  {flashcardSet.subject} • {flashcardSet.totalCards} cards • {flashcardSet.weightage}% weightage
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${
                  flashcardSet.priority === 'high' ? 'bg-red-100 text-red-700' :
                  flashcardSet.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {flashcardSet.priority} priority
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
                  <div className="text-2xl font-bold text-blue-600">{flashcardSet.accuracy}%</div>
                  <div className="text-sm text-blue-600">Accuracy</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{flashcardSet.masteredCards}/{flashcardSet.totalCards}</div>
                  <div className="text-sm text-green-600">Mastered</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{flashcardSet.streak}</div>
                  <div className="text-sm text-purple-600">Day Streak</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{flashcardSet.timeEstimate}m</div>
                  <div className="text-sm text-orange-600">Est. Time</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Topic Breakdown
                </h4>
                <div className="space-y-2">
                  {flashcardSet.topics.map((topic, index) => (
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
          Weightage Distribution
        </CardTitle>
        <CardDescription>Exam importance by subject and topic</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {flashcardSets.map((set, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{set.subject}</span>
                <span className="text-sm font-medium">{set.weightage}%</span>
              </div>
              <Progress value={set.weightage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Priority: {set.priority} • Status: {set.status}
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
      title: "Focus on Chemical Bonding",
      description: "Complete ionic bonding cards (22% exam weightage)",
      priority: "high",
      estimatedTime: "25 min"
    },
    {
      icon: Target,
      title: "Review Physics Mechanics",
      description: "Strengthen momentum concepts for better retention",
      priority: "medium", 
      estimatedTime: "15 min"
    },
    {
      icon: Lightbulb,
      title: "Quick Math Review",
      description: "Calculus basics need attention - 5 days since last study",
      priority: "high",
      estimatedTime: "30 min"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Daily Smart Suggestions
        </CardTitle>
        <CardDescription>AI-powered study recommendations</CardDescription>
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

const FlashcardsView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("breakdown");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStudySet = (setId: string) => {
    navigate(`/dashboard/student/flashcards/${setId}/interactive`);
  };

  const filteredSets = flashcardSets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || set.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <SharedPageLayout
      title="Flashcards Studio"
      subtitle="Master concepts through spaced repetition and active recall"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search flashcard sets..."
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
              {filteredSets.map((flashcardSet) => (
                <TopicBreakdownCard key={flashcardSet.id} flashcardSet={flashcardSet} />
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

export default FlashcardsView;
