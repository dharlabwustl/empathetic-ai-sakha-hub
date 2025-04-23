
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Calendar, ChevronRight, Clock, Filter, Search, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';

// Mock concept groups
const mockConceptGroups = [
  {
    id: 'daily',
    title: "Today's Concepts",
    description: "Study plan for today",
    progress: 25,
    conceptsCount: 5,
    completedCount: 1,
    timeRequired: 45,
  },
  {
    id: 'weekly',
    title: "This Week's Concepts",
    description: "Complete these concepts by the end of the week",
    progress: 30,
    conceptsCount: 12,
    completedCount: 4,
    timeRequired: 120,
  },
  {
    id: 'recommended',
    title: "Recommended Concepts",
    description: "Based on your recent test performance",
    progress: 0,
    conceptsCount: 8,
    completedCount: 0,
    timeRequired: 90,
  }
];

// Mock subject areas
const mockSubjects = [
  { id: 'physics', name: 'Physics', count: 12, progress: 25 },
  { id: 'chemistry', name: 'Chemistry', count: 18, progress: 33 },
  { id: 'mathematics', name: 'Mathematics', count: 24, progress: 42 },
  { id: 'biology', name: 'Biology', count: 15, progress: 60 },
];

// Mock recent concepts
const mockRecentConcepts = [
  {
    id: '1',
    title: 'Newton\'s Second Law',
    subject: 'Physics',
    lastStudied: '2 days ago',
    progress: 75
  },
  {
    id: '2',
    title: 'Cell Division',
    subject: 'Biology',
    lastStudied: 'Yesterday',
    progress: 90
  },
  {
    id: '3',
    title: 'Chemical Equilibrium',
    subject: 'Chemistry',
    lastStudied: '3 days ago',
    progress: 50
  }
];

const ConceptsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('study-plans');
  const dashboard = useStudentDashboard();
  
  const handleStartStudying = (planId: string) => {
    navigate(`/dashboard/student/concepts/${planId}`);
  };
  
  const handleOpenSubject = (subjectId: string) => {
    navigate(`/dashboard/student/subjects/${subjectId}`);
  };

  if (!dashboard.userProfile) {
    return <div>Loading...</div>;
  }
  
  return (
    <DashboardLayout
      userProfile={dashboard.userProfile}
      hideSidebar={dashboard.hideSidebar}
      hideTabsNav={dashboard.hideTabsNav}
      activeTab="subjects"
      kpis={dashboard.kpis}
      nudges={dashboard.nudges}
      markNudgeAsRead={dashboard.markNudgeAsRead}
      showWelcomeTour={dashboard.showWelcomeTour}
      onTabChange={dashboard.handleTabChange}
      onViewStudyPlan={dashboard.handleViewStudyPlan}
      onToggleSidebar={dashboard.toggleSidebar}
      onToggleTabsNav={dashboard.toggleTabsNav}
      onSkipTour={dashboard.handleSkipTour}
      onCompleteTour={dashboard.handleCompleteTour}
      showStudyPlan={dashboard.showStudyPlan}
      onCloseStudyPlan={dashboard.handleCloseStudyPlan}
      lastActivity={dashboard.lastActivity}
      suggestedNextAction={dashboard.suggestedNextAction}
      currentMood={dashboard.userProfile.mood}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Concept Cards</h1>
            <p className="text-muted-foreground">
              Master key concepts through spaced repetition and active recall
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search concepts..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="study-plans" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="study-plans">Study Plans</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="study-plans" className="space-y-6">
            {mockConceptGroups.map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <div className={`h-1 ${
                  group.id === 'daily' 
                    ? 'bg-blue-500' 
                    : group.id === 'weekly' 
                      ? 'bg-purple-500' 
                      : 'bg-amber-500'
                }`} />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{group.title}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">{group.completedCount}/{group.conceptsCount} Concepts</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>~{group.timeRequired} mins</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>{group.progress}%</span>
                  </div>
                  <Progress value={group.progress} className="h-2" />
                </CardContent>
                
                <CardFooter className="bg-muted/50 border-t">
                  <div className="flex w-full justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{group.completedCount} of {group.conceptsCount} completed</span>
                    </div>
                    
                    <Button 
                      variant="default"
                      size="sm"
                      className={`${
                        group.id === 'daily' 
                          ? 'bg-blue-500 hover:bg-blue-600' 
                          : group.id === 'weekly' 
                            ? 'bg-purple-500 hover:bg-purple-600' 
                            : 'bg-amber-500 hover:bg-amber-600'
                      }`}
                      onClick={() => handleStartStudying(group.id)}
                    >
                      {group.completedCount === 0 ? 'Start Studying' : 'Continue'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockSubjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{subject.name}</span>
                      <Badge>{subject.count}</Badge>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span>Mastery</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </CardContent>
                  
                  <CardFooter className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleOpenSubject(subject.id)}
                    >
                      View Concepts
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-4">
            <h3 className="text-lg font-medium">Recently Studied</h3>
            
            <div className="divide-y">
              {mockRecentConcepts.map((concept) => (
                <div key={concept.id} className="py-3 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{concept.title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Book className="h-3 w-3 mr-1" />
                      <span>{concept.subject}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{concept.lastStudied}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-16 mr-2">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span>Recall</span>
                        <span>{concept.progress}%</span>
                      </div>
                      <Progress value={concept.progress} className="h-1.5" />
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ConceptsPage;
