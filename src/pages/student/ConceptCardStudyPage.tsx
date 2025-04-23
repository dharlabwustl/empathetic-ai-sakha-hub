
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Search, Filter, BookOpen, ArrowLeft, Check, Plus, ChevronRight, BookMarked } from "lucide-react";
import { motion } from "framer-motion";

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'not-started' | 'in-progress' | 'completed';
  dueDate?: string;
  tags: string[];
  isNew?: boolean;
  priority?: 'high' | 'medium' | 'low';
  completedAt?: string;
  estimatedTime?: number; // in minutes
}

const ConceptCardStudyPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("");
  
  // Mock data for concept cards
  const [conceptCards, setConceptCards] = useState<ConceptCard[]>([
    {
      id: "card-1",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      chapter: "Classical Mechanics",
      difficulty: "medium",
      status: "not-started",
      dueDate: "2025-04-24",
      tags: ["mechanics", "forces", "motion"],
      isNew: true,
      priority: "high",
      estimatedTime: 30
    },
    {
      id: "card-2",
      title: "Periodic Table Elements",
      subject: "Chemistry",
      chapter: "Chemical Elements",
      difficulty: "medium",
      status: "in-progress",
      dueDate: "2025-04-25",
      tags: ["elements", "periodic table", "classification"],
      priority: "medium",
      estimatedTime: 25
    },
    {
      id: "card-3",
      title: "Cell Structure and Function",
      subject: "Biology",
      chapter: "Cell Biology",
      difficulty: "easy",
      status: "completed",
      dueDate: "2025-04-23",
      completedAt: "2025-04-22",
      tags: ["cells", "organelles", "cytology"],
      priority: "medium",
      estimatedTime: 20
    },
    {
      id: "card-4",
      title: "Quadratic Equations",
      subject: "Mathematics",
      chapter: "Algebra",
      difficulty: "hard",
      status: "not-started",
      dueDate: "2025-04-26",
      tags: ["algebra", "equations", "functions"],
      priority: "high",
      estimatedTime: 45
    },
    {
      id: "card-5",
      title: "Electromagnetic Induction",
      subject: "Physics",
      chapter: "Electromagnetism",
      difficulty: "hard",
      status: "not-started",
      dueDate: "2025-04-27",
      tags: ["electricity", "magnetism", "induction"],
      priority: "medium",
      estimatedTime: 40
    }
  ]);
  
  // Filter cards based on active tab, search query, and filters
  const filteredCards = conceptCards.filter(card => {
    // Filter by tab
    if (activeTab === "today" && new Date(card.dueDate!) > new Date()) {
      return false;
    }
    if (activeTab === "week" && new Date(card.dueDate!) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) {
      return false;
    }
    if (activeTab === "completed" && card.status !== "completed") {
      return false;
    }
    
    // Filter by search
    if (searchQuery && !card.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !card.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !card.chapter.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by subject
    if (filterSubject && card.subject !== filterSubject) {
      return false;
    }
    
    // Filter by difficulty
    if (filterDifficulty && card.difficulty !== filterDifficulty) {
      return false;
    }
    
    return true;
  });
  
  // Get unique subjects for filter
  const subjects = Array.from(new Set(conceptCards.map(card => card.subject)));
  
  const handleCardClick = (cardId: string) => {
    navigate(`/study/concept-card/${cardId}`);
  };
  
  const handleMarkCompleted = (e: React.MouseEvent, cardId: string) => {
    e.stopPropagation();
    setConceptCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId 
          ? { ...card, status: "completed", completedAt: new Date().toISOString() } 
          : card
      )
    );
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Concept Cards</h1>
          </div>
          
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600" onClick={() => navigate("/study/concept-card/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Card
          </Button>
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="today">Today's Plan</TabsTrigger>
              <TabsTrigger value="week">Weekly Plan</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, subject, or tag"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <span>{filterSubject || "Filter Subject"}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <span>{filterDifficulty || "Filter Difficulty"}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Difficulty</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="today" className="mt-0">
              <div className="space-y-4">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <ConceptCardItem
                      key={card.id}
                      card={card}
                      onClick={() => handleCardClick(card.id)}
                      onMarkCompleted={(e) => handleMarkCompleted(e, card.id)}
                      getDifficultyColor={getDifficultyColor}
                      getPriorityColor={getPriorityColor}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No cards for today"
                    description="You have no concept cards scheduled for today. Add new cards or check your weekly plan."
                  />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="week" className="mt-0">
              <div className="space-y-4">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <ConceptCardItem
                      key={card.id}
                      card={card}
                      onClick={() => handleCardClick(card.id)}
                      onMarkCompleted={(e) => handleMarkCompleted(e, card.id)}
                      getDifficultyColor={getDifficultyColor}
                      getPriorityColor={getPriorityColor}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No weekly cards"
                    description="You have no concept cards scheduled for this week. Create new cards to add to your study plan."
                  />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <div className="space-y-4">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <ConceptCardItem
                      key={card.id}
                      card={card}
                      onClick={() => handleCardClick(card.id)}
                      onMarkCompleted={(e) => handleMarkCompleted(e, card.id)}
                      getDifficultyColor={getDifficultyColor}
                      getPriorityColor={getPriorityColor}
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No completed cards"
                    description="You haven't completed any concept cards yet. Keep studying to build your knowledge base."
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

interface ConceptCardItemProps {
  card: ConceptCard;
  onClick: () => void;
  onMarkCompleted: (e: React.MouseEvent) => void;
  getDifficultyColor: (difficulty: string) => string;
  getPriorityColor: (priority: string | undefined) => string;
}

const ConceptCardItem: React.FC<ConceptCardItemProps> = ({
  card,
  onClick,
  onMarkCompleted,
  getDifficultyColor,
  getPriorityColor
}) => {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="border-gray-200 hover:border-indigo-300">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-indigo-500" />
                <h3 className="font-medium">{card.title}</h3>
                {card.isNew && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 text-[10px] px-1.5 py-0">
                    NEW
                  </Badge>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                {card.subject} • {card.chapter}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className={getDifficultyColor(card.difficulty)}>
                  {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
                </Badge>
                
                {card.priority && (
                  <Badge variant="outline" className={getPriorityColor(card.priority)}>
                    {card.priority.charAt(0).toUpperCase() + card.priority.slice(1)} Priority
                  </Badge>
                )}
                
                {card.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                    {tag}
                  </Badge>
                ))}
                
                {card.tags.length > 2 && (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                    +{card.tags.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1 ml-4">
              {card.status !== "completed" ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full p-1 h-8 w-8"
                  onClick={onMarkCompleted}
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Mark Completed</span>
                </Button>
              ) : (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Completed
                </Badge>
              )}
              
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-1" />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Est. {card.estimatedTime} minutes</span>
            </div>
            
            <div>
              {card.status === "completed" ? (
                <span>Completed on {new Date(card.completedAt!).toLocaleDateString()}</span>
              ) : (
                <span>Due by {new Date(card.dueDate!).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">{description}</p>
    </div>
  );
};

export default ConceptCardStudyPage;
