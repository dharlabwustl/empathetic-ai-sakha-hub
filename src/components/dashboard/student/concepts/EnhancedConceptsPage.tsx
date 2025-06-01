
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Check, Clock, Star, Filter, Search, TrendingUp, Target, Brain, Zap } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const conceptCards = [
  {
    id: 1,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    status: "in-progress",
    difficulty: "medium",
    timeEstimate: 20,
    mastery: 65,
    priority: 1,
    cardCount: 15,
    isRecommended: true,
    description: "Fundamental principles governing motion and forces",
    completedConcepts: 8,
    totalConcepts: 12,
    lastStudied: "2 hours ago"
  },
  {
    id: 2,
    title: "Chemical Bonding",
    subject: "Chemistry",
    chapter: "Chemical Bonds",
    status: "not-started",
    difficulty: "hard",
    timeEstimate: 30,
    mastery: 0,
    priority: 2,
    cardCount: 22,
    isRecommended: true,
    description: "Understanding molecular structure and bonding",
    completedConcepts: 0,
    totalConcepts: 18,
    lastStudied: "Never"
  },
  {
    id: 3,
    title: "Cell Structure and Function",
    subject: "Biology",
    chapter: "Cell Biology",
    status: "completed",
    difficulty: "medium",
    timeEstimate: 25,
    mastery: 95,
    priority: 0,
    cardCount: 18,
    isRecommended: false,
    description: "Basic unit of life and cellular processes",
    completedConcepts: 16,
    totalConcepts: 16,
    lastStudied: "1 day ago"
  }
];

const EnhancedConceptsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const navigate = useNavigate();

  const subjects = Array.from(new Set(conceptCards.map(card => card.subject)));
  
  const filteredConcepts = conceptCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         card.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || card.subject.toLowerCase() === subjectFilter.toLowerCase();
    const matchesDifficulty = difficultyFilter === 'all' || card.difficulty === difficultyFilter;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Check, text: "Completed" };
      case "in-progress":
        return { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock, text: "In Progress" };
      case "not-started":
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Not Started" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Unknown" };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const ConceptCard = ({ concept }: { concept: typeof conceptCards[0] }) => {
    const statusInfo = getStatusInfo(concept.status);
    const StatusIcon = statusInfo.icon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <CardTitle className="text-lg font-bold text-primary">{concept.title}</CardTitle>
              {concept.isRecommended && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  Recommended
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm text-muted-foreground mb-3">
              {concept.description}
            </CardDescription>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {concept.subject}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {concept.chapter}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow pb-3">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className={statusInfo.color}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusInfo.text}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                </Badge>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Mastery Progress</span>
                  <span className="font-medium text-primary">{concept.mastery}%</span>
                </div>
                <Progress value={concept.mastery} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{concept.completedConcepts}/{concept.totalConcepts} concepts</span>
                  <span>Last: {concept.lastStudied}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{concept.timeEstimate} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{concept.cardCount} cards</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-3">
            <Button 
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
            >
              {concept.status === "completed" 
                ? <><Check className="h-4 w-4 mr-2" /> Review Again</> 
                : concept.status === "in-progress" 
                  ? <><TrendingUp className="h-4 w-4 mr-2" /> Continue Learning</> 
                  : <><Brain className="h-4 w-4 mr-2" /> Start Learning</>
              }
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <SharedPageLayout
      title="Enhanced Concept Cards"
      subtitle="Master NEET concepts with interactive learning cards"
    >
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Concepts</p>
                  <p className="text-2xl font-bold text-blue-700">{conceptCards.length}</p>
                </div>
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-700">
                    {conceptCards.filter(c => c.status === 'completed').length}
                  </p>
                </div>
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {conceptCards.filter(c => c.status === 'in-progress').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Avg. Mastery</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {Math.round(conceptCards.reduce((sum, c) => sum + c.mastery, 0) / conceptCards.length)}%
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search concepts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Concept Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map(concept => (
                <ConceptCard key={concept.id} concept={concept} />
              ))}
            </div>

            {filteredConcepts.length === 0 && (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No concept cards found</p>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          {subjects.map(subject => (
            <TabsContent key={subject} value={subject.toLowerCase()} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {conceptCards
                  .filter(card => card.subject === subject)
                  .map(concept => (
                    <ConceptCard key={concept.id} concept={concept} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedConceptsPage;
