
import React, { useState, useMemo } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, ArrowRight, ChevronRight, Brain, Plus, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CreateFlashcardDialog from '@/components/dashboard/student/flashcards/CreateFlashcardDialog';

const FlashcardsPage = () => {
  const { flashcards, loading } = useUserStudyPlan();
  const [tab, setTab] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("today");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data
  const subjects = ["Physics", "Chemistry", "Mathematics", "Biology"];
  const dailyChallenges = [
    { id: "fc1", title: "Quantum Mechanics", subject: "Physics", progress: 0 },
    { id: "fc2", title: "Organic Chemistry", subject: "Chemistry", progress: 0 },
  ];

  // Filter flashcards based on selected subject and time range
  const filteredFlashcards = useMemo(() => {
    if (!flashcards) return [];
    
    let filtered = [...flashcards];
    
    if (tab !== "all") {
      filtered = filtered.filter(card => card.subject.toLowerCase() === tab.toLowerCase());
    }
    
    if (timeRange === "today") {
      filtered = filtered.filter(card => card.scheduledFor === "today");
    } else if (timeRange === "week") {
      filtered = filtered.filter(card => card.scheduledFor === "week");
    } else if (timeRange === "month") {
      filtered = filtered.filter(card => card.scheduledFor === "month");
    }
    
    return filtered;
  }, [flashcards, tab, timeRange]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  const handleAnalytics = () => {
    navigate('/dashboard/student/flashcards/analytics');
  };
  
  const handleCreateFlashcard = (data: any) => {
    toast({
      title: "Flashcard Created",
      description: `Your new flashcard for ${data.subject} has been created successfully.`
    });
    setShowCreateDialog(false);
  };
  
  const handleDailyChallengeClick = (id: string) => {
    navigate(`/dashboard/student/flashcards/${id}`);
  };

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Master concepts through active recall and spaced repetition"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAnalytics}
            className="flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setShowCreateDialog(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Create Deck
          </Button>
        </div>
      </div>
      
      {/* Daily Flashcard Challenge */}
      <Card className="mb-6 border-t-4 border-t-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-purple-500" />
            Daily Flash Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Complete these flashcards to maintain your learning streak and reinforce key concepts.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dailyChallenges.map((challenge) => (
              <Card key={challenge.id} className="overflow-hidden group">
                <CardHeader className="p-4 pb-2 bg-purple-50 dark:bg-purple-900/20">
                  <div className="flex justify-between">
                    <Badge variant="outline">{challenge.subject}</Badge>
                    <Badge>Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pb-2">
                  <h4 className="font-semibold mb-2">{challenge.title}</h4>
                  <Progress value={challenge.progress} className="h-1" />
                </CardContent>
                <CardFooter className="p-4 pt-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="ml-auto group-hover:text-purple-600 transition-colors"
                    onClick={() => handleDailyChallengeClick(challenge.id)}
                  >
                    Start Now
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Flashcards by Subject Tabs */}
      <Tabs 
        defaultValue="all" 
        value={tab} 
        onValueChange={setTab}
        className="space-y-4"
      >
        <TabsList className="flex overflow-x-auto pb-px">
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          {subjects.map((subject) => (
            <TabsTrigger key={subject.toLowerCase()} value={subject.toLowerCase()}>
              {subject}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={tab} className="mt-6">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <motion.div key={i} variants={itemVariants} className="h-48 bg-gray-100 animate-pulse rounded-lg" />
              ))
            ) : filteredFlashcards.length > 0 ? (
              filteredFlashcards.map((flashcard) => (
                <motion.div key={flashcard.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col overflow-hidden group hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="p-4 pb-2 bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex justify-between">
                        <Badge variant="outline">{flashcard.subject}</Badge>
                        <Badge variant={flashcard.mastered ? "secondary" : "outline"}>
                          {flashcard.mastered ? "Mastered" : "In Progress"}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4 flex-grow">
                      <h3 className="font-medium text-lg mb-2">{flashcard.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {flashcard.description || "Review and practice this concept with interactive flashcards."}
                      </p>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Mastery</span>
                          <span>{flashcard.progress}%</span>
                        </div>
                        <Progress value={flashcard.progress} className="h-1" />
                      </div>
                    </CardContent>
                    
                    <CardFooter className="px-4 py-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-xs group-hover:text-blue-600 transition-colors"
                        onClick={() => navigate(`/dashboard/student/flashcards/${flashcard.id}`)}
                      >
                        Practice Now
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No flashcards found for the selected filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setShowCreateDialog(true)}
                >
                  Create New Deck
                </Button>
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
      
      {/* Create Flashcard Dialog */}
      <CreateFlashcardDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubmit={handleCreateFlashcard}
      />
    </SharedPageLayout>
  );
};

export default FlashcardsPage;
