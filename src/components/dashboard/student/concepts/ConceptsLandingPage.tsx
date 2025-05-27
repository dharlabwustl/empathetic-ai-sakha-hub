
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Star, TrendingUp, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Mock data for concepts with status
  const conceptsData = {
    today: [
      { id: 'newton-laws', title: "Newton's Laws of Motion", subject: 'Physics', topic: 'Mechanics', difficulty: 'Medium', duration: 30, status: 'pending' },
      { id: 'chemical-bonds', title: 'Chemical Bonds', subject: 'Chemistry', topic: 'Bonding', difficulty: 'Easy', duration: 25, status: 'pending' },
      { id: 'algebra-basics', title: 'Algebraic Expressions', subject: 'Mathematics', topic: 'Algebra', difficulty: 'Easy', duration: 20, status: 'pending' }
    ],
    upcoming: [
      { id: 'thermodynamics', title: 'Laws of Thermodynamics', subject: 'Physics', topic: 'Heat', difficulty: 'Hard', duration: 45, status: 'scheduled' },
      { id: 'organic-chemistry', title: 'Organic Reactions', subject: 'Chemistry', topic: 'Organic', difficulty: 'Hard', duration: 40, status: 'scheduled' },
      { id: 'calculus-intro', title: 'Introduction to Calculus', subject: 'Mathematics', topic: 'Calculus', difficulty: 'Medium', duration: 35, status: 'scheduled' }
    ],
    completed: [
      { id: 'kinematics', title: 'Kinematics', subject: 'Physics', topic: 'Motion', difficulty: 'Medium', duration: 30, status: 'completed' },
      { id: 'periodic-table', title: 'Periodic Table', subject: 'Chemistry', topic: 'Elements', difficulty: 'Easy', duration: 25, status: 'completed' }
    ]
  };

  const subjects = ['all', 'Physics', 'Chemistry', 'Mathematics'];

  const getFilteredConcepts = (concepts: any[]) => {
    if (selectedSubject === 'all') return concepts;
    return concepts.filter(concept => concept.subject === selectedSubject);
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Easy</Badge>;
      case 'Medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'Hard':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Hard</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200">Study Now</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">Scheduled</Badge>;
      default:
        return null;
    }
  };

  const renderConceptCard = (concept: any) => (
    <Card 
      key={concept.id} 
      className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-200 cursor-pointer bg-gradient-to-r from-white to-blue-50/30"
      onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            {getStatusBadge(concept.status)}
          </div>
          {getDifficultyBadge(concept.difficulty)}
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{concept.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">{concept.subject}</span>
            <span>•</span>
            <span>{concept.topic}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{concept.duration} min</span>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              Start Learning
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getTabCount = (tabData: any[]) => {
    return getFilteredConcepts(tabData).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Concept Cards
          </h1>
          <p className="text-gray-600 mt-1">Master key concepts with our interactive learning cards</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="today" className="flex items-center gap-2">
            Today 
            <Badge variant="secondary" className="text-xs">{getTabCount(conceptsData.today)}</Badge>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            Upcoming
            <Badge variant="secondary" className="text-xs">{getTabCount(conceptsData.upcoming)}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="text-xs">{getTabCount(conceptsData.completed)}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredConcepts(conceptsData.today).map(renderConceptCard)}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredConcepts(conceptsData.upcoming).map(renderConceptCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredConcepts(conceptsData.completed).map(renderConceptCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptsLandingPage;
