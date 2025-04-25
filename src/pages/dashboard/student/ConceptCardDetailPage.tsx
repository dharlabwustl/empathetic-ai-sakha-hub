import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import ConceptStudyPlanSection from '@/components/dashboard/student/concept-cards/ConceptStudyPlanSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, CheckCircle, Clock, Award, Brain, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const ConceptCardDetailPage = () => {
  // Get the concept ID from URL parameters
  const { conceptId } = useParams<{ conceptId: string }>();
  
  console.log('ConceptCardDetailPage - Concept ID:', conceptId);
  
  // Get student dashboard data
  const {
    userProfile,
    loading,
    hideSidebar,
    hideTabsNav,
    activeTab,
    kpis,
    nudges,
    features,
    markNudgeAsRead,
    handleTabChange,
    toggleSidebar,
    toggleTabsNav,
    showWelcomeTour,
    handleSkipTour,
    handleCompleteTour,
    lastActivity,
    suggestedNextAction,
  } = useStudentDashboard();

  // Mock concept data - in a real app, this would be fetched based on the conceptId
  const conceptData = {
    id: conceptId || '1',
    title: conceptId === '1' ? 'Newton\'s Laws of Motion' : 
           conceptId === '2' ? 'Organic Chemistry Basics' : 
           conceptId === '3' ? 'Calculus Fundamentals' : 'Concept Details',
    subject: conceptId === '1' ? 'Physics' : 
             conceptId === '2' ? 'Chemistry' : 
             conceptId === '3' ? 'Mathematics' : 'Subject',
    difficulty: 'Medium',
    estimatedTime: '45 minutes',
    masteryLevel: 65,
    lastStudied: '3 days ago',
    relatedConcepts: ['Force', 'Acceleration', 'Mass'],
    description: 'Understanding the fundamental laws that govern motion and the relationship between force and acceleration.',
    content: `
      <h3>First Law: Law of Inertia</h3>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
      
      <h3>Second Law: F = ma</h3>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
      
      <h3>Third Law: Action-Reaction</h3>
      <p>For every action, there is an equal and opposite reaction.</p>
    `
  };

  if (loading || !userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={() => {}}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={false}
      onCloseStudyPlan={() => {}}
      lastActivity={lastActivity}
      suggestedNextAction={suggestedNextAction}
    >
      <div className="space-y-6">
        {/* Back navigation */}
        <div>
          <Link to="/dashboard/student/concepts">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Concepts
            </Button>
          </Link>
        </div>
        
        {/* Concept header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{conceptData.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
                {conceptData.subject}
              </Badge>
              <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-100">
                {conceptData.difficulty}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-100">
                <Clock className="h-3 w-3 mr-1" />
                {conceptData.estimatedTime}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark as Complete
            </Button>
            <Button size="sm">
              <Brain className="h-4 w-4 mr-1" />
              Practice Now
            </Button>
          </div>
        </div>
        
        {/* Main content tabs */}
        <Tabs defaultValue="learn" className="space-y-6">
          <TabsList>
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learn">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Concept Explanation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: conceptData.content }} />
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium">Related Concepts</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {conceptData.relatedConcepts.map((concept, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Practice Exercises</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Practice exercises for this concept will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Your Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your saved notes for this concept will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Additional learning resources for this concept will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Study plan section */}
        <ConceptStudyPlanSection conceptTitle={conceptData.title} />
      </div>
    </DashboardLayout>
  );
};

export default ConceptCardDetailPage;
