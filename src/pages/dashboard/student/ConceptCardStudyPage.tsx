
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ChevronLeft, 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag,
  Filter,
  SortAsc
} from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { ConceptCard as ConceptCardType } from "@/types/user/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ConceptCard from "@/components/dashboard/student/ConceptCard";
import ConceptCardView from "@/components/dashboard/student/concept-cards/ConceptCardView";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "./DashboardLayout";

const ConceptCardStudyPage: React.FC = () => {
  const { subject, topic } = useParams<{ subject?: string; topic?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>(topic || "all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [selectedConcept, setSelectedConcept] = useState<ConceptCardType | null>(null);
  const [conceptCards, setConceptCards] = useState<ConceptCardType[]>([]);
  const [todayCards, setTodayCards] = useState<ConceptCardType[]>([]);
  const [weeklyCards, setWeeklyCards] = useState<ConceptCardType[]>([]);
  const { userProfile, loading } = useUserProfile(UserRole.Student);

  useEffect(() => {
    if (!loading && userProfile) {
      // Fetch concept cards from user profile subjects
      const allCards: ConceptCardType[] = [];
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      
      userProfile.subjects?.forEach(subj => {
        if (subj.conceptCards && (!subject || subj.name === subject)) {
          const filteredCards = subject 
            ? subj.conceptCards.filter(card => !topic || card.topic === topic)
            : subj.conceptCards;
          
          allCards.push(...filteredCards);
        }
      });

      // Sort and filter for today's and weekly cards
      const todayItems = allCards.filter(card => card.dueDate === todayString);
      const weeklyItems = allCards.filter(card => {
        if (card.dueDate) {
          const cardDate = new Date(card.dueDate);
          return cardDate > today && cardDate <= oneWeekLater;
        }
        return false;
      });

      setConceptCards(allCards);
      setTodayCards(todayItems);
      setWeeklyCards(weeklyItems);
    }
  }, [loading, userProfile, subject, topic]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    // Update completion status
    setConceptCards(prev => prev.map(card => 
      card.id === id ? {...card, completed} : card
    ));
    
    // Also update in today's and weekly cards
    setTodayCards(prev => prev.map(card => 
      card.id === id ? {...card, completed} : card
    ));
    
    setWeeklyCards(prev => prev.map(card => 
      card.id === id ? {...card, completed} : card
    ));
    
    toast({
      title: completed ? "Concept completed!" : "Concept marked as incomplete",
      description: "Your progress has been updated",
    });
  };
  
  const handleViewConcept = (id: string) => {
    const concept = conceptCards.find(card => card.id === id);
    if (concept) {
      setSelectedConcept(concept);
    }
  };

  const handleCloseConceptView = () => {
    setSelectedConcept(null);
  };
  
  const getFilteredCards = (cards: ConceptCardType[]) => {
    // Apply difficulty filter
    const difficultyFiltered = filterDifficulty === "all" 
      ? cards 
      : cards.filter(card => card.difficulty === filterDifficulty);
    
    // Apply sort
    return [...difficultyFiltered].sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return (a.dueDate || "") > (b.dueDate || "") ? 1 : -1;
        case "difficulty":
          const difficultyOrder = { easy: 1, medium: 2, hard: 3, advanced: 4 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "progress":
          return (b.progress || 0) - (a.progress || 0);
        default:
          return 0;
      }
    });
  };

  const filteredTodayCards = getFilteredCards(todayCards);
  const filteredWeeklyCards = getFilteredCards(weeklyCards);
  const filteredAllCards = getFilteredCards(conceptCards);

  // If viewing a specific concept
  if (selectedConcept) {
    return (
      <DashboardLayout
        userProfile={userProfile}
        hideSidebar={false}
        hideTabsNav={false}
        activeTab="subjects"
        kpis={[]}
        nudges={[]}
        markNudgeAsRead={() => {}}
        showWelcomeTour={false}
        onTabChange={() => {}}
        onViewStudyPlan={() => {}}
        onToggleSidebar={() => {}}
        onToggleTabsNav={() => {}}
        onSkipTour={() => {}}
        onCompleteTour={() => {}}
        showStudyPlan={false}
        onCloseStudyPlan={() => {}}
      >
        <div className="p-4">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={handleCloseConceptView} className="mr-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Concepts
            </Button>
            <h2 className="text-2xl font-bold">{selectedConcept.title}</h2>
          </div>
          
          <ConceptCardView 
            title={selectedConcept.title} 
            subject={selectedConcept.subject} 
            chapter={selectedConcept.topic} 
          />
          
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => handleToggleComplete(selectedConcept.id, !selectedConcept.completed)}
              variant={selectedConcept.completed ? "outline" : "default"}
              className={`${selectedConcept.completed ? "border-green-500 text-green-600" : "bg-green-600"}`}
            >
              {selectedConcept.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={false}
      hideTabsNav={false}
      activeTab="subjects"
      kpis={[]}
      nudges={[]}
      markNudgeAsRead={() => {}}
      showWelcomeTour={false}
      onTabChange={() => {}}
      onViewStudyPlan={() => {}}
      onToggleSidebar={() => {}}
      onToggleTabsNav={() => {}}
      onSkipTour={() => {}}
      onCompleteTour={() => {}}
      showStudyPlan={false}
      onCloseStudyPlan={() => {}}
    >
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <Button variant="ghost" onClick={handleBackClick} className="mr-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Concept Cards</h1>
              <p className="text-muted-foreground">
                {subject ? `${subject}${topic ? ` - ${topic}` : ''}` : 'All Subjects'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="dueDate">Due Date</SelectItem>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="today" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="today" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Today ({filteredTodayCards.length})
            </TabsTrigger>
            <TabsTrigger value="week" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              This Week ({filteredWeeklyCards.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              All Concepts ({filteredAllCards.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-0">
            {filteredTodayCards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTodayCards.map(card => (
                  <ConceptCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    subject={card.subject}
                    difficulty={card.difficulty}
                    completed={card.completed}
                    progress={card.progress}
                    isLocked={card.isLocked}
                    isPremium={card.isPremium}
                    onToggleComplete={handleToggleComplete}
                    onView={() => handleViewConcept(card.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-1">No concepts due today</h3>
                  <p className="text-muted-foreground">Check back tomorrow or view other tabs.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="week" className="mt-0">
            {filteredWeeklyCards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWeeklyCards.map(card => (
                  <ConceptCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    subject={card.subject}
                    difficulty={card.difficulty}
                    completed={card.completed}
                    progress={card.progress}
                    isLocked={card.isLocked}
                    isPremium={card.isPremium}
                    onToggleComplete={handleToggleComplete}
                    onView={() => handleViewConcept(card.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-1">No concepts due this week</h3>
                  <p className="text-muted-foreground">View all concepts tab to see everything.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="mt-0">
            {filteredAllCards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAllCards.map(card => (
                  <ConceptCard
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    subject={card.subject}
                    difficulty={card.difficulty}
                    completed={card.completed}
                    progress={card.progress}
                    isLocked={card.isLocked}
                    isPremium={card.isPremium}
                    onToggleComplete={handleToggleComplete}
                    onView={() => handleViewConcept(card.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Tag className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-1">No concepts found</h3>
                  <p className="text-muted-foreground">Try changing your filters or check back later.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ConceptCardStudyPage;
