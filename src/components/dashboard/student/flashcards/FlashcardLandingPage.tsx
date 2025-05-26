
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Brain, 
  Clock, 
  Target, 
  Play, 
  RotateCcw,
  Star,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EnhancedVoiceAssistant from '@/components/voice/EnhancedVoiceAssistant';
import OverviewSection from '../shared/OverviewSection';

// Mock flashcard decks data
const mockFlashcardDecks = [
  {
    id: "1",
    title: "Physics Formulas",
    subject: "Physics",
    cardCount: 45,
    completedCount: 32,
    difficulty: "Medium",
    lastStudied: "2 hours ago",
    accuracy: 78,
    status: "in-progress",
    description: "Essential physics formulas for mechanics and thermodynamics"
  },
  {
    id: "2",
    title: "Chemical Elements",
    subject: "Chemistry", 
    cardCount: 60,
    completedCount: 60,
    difficulty: "Easy",
    lastStudied: "1 day ago",
    accuracy: 95,
    status: "completed",
    description: "Periodic table elements with properties and uses"
  },
  {
    id: "3",
    title: "Mathematical Theorems",
    subject: "Mathematics",
    cardCount: 30,
    completedCount: 8,
    difficulty: "Hard",
    lastStudied: "Never",
    accuracy: 0,
    status: "not-started",
    description: "Important mathematical theorems and proofs"
  },
  {
    id: "4",
    title: "Biology Terms",
    subject: "Biology",
    cardCount: 55,
    completedCount: 22,
    difficulty: "Medium",
    lastStudied: "3 hours ago", 
    accuracy: 65,
    status: "in-progress",
    description: "Essential biology terminology and concepts"
  }
];

const FlashcardLandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const navigate = useNavigate();

  const filteredDecks = mockFlashcardDecks.filter(deck => {
    const matchesSearch = deck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deck.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || deck.subject === selectedSubject;
    
    return matchesSearch && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'not-started': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const handleDeckClick = (deckId: string) => {
    navigate(`/dashboard/student/flashcards/${deckId}`);
  };

  const handleSuggestionClick = (action: string) => {
    console.log('Suggestion action:', action);
  };

  // Mock data for overview section
  const subjectProgress = [
    { subject: 'Physics', completed: 32, total: 45, percentage: 71, difficulty: 'medium' as const },
    { subject: 'Chemistry', completed: 60, total: 60, percentage: 100, difficulty: 'easy' as const },
    { subject: 'Mathematics', completed: 8, total: 30, percentage: 27, difficulty: 'hard' as const },
    { subject: 'Biology', completed: 22, total: 55, percentage: 40, difficulty: 'medium' as const }
  ];

  const smartSuggestions = [
    {
      title: "Complete Physics Formulas",
      description: "You're 71% done with physics formulas. Finish the remaining 13 cards.",
      action: "complete-physics",
      priority: 'high' as const
    },
    {
      title: "Start Math Theorems",
      description: "Begin with basic mathematical theorems to build foundation.",
      action: "start-math",
      priority: 'medium' as const
    },
    {
      title: "Review Chemistry",
      description: "Perfect score! Review to maintain your chemistry knowledge.",
      action: "review-chemistry",
      priority: 'low' as const
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Overview Section */}
      <OverviewSection
        pageType="flashcards"
        subjectProgress={subjectProgress}
        smartSuggestions={smartSuggestions}
        overallProgress={59}
        onSuggestionClick={handleSuggestionClick}
      />

      {/* Flashcard Decks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-purple-600" />
            Flashcard Decks
            <Badge variant="outline" className="ml-auto">
              {filteredDecks.length} decks
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search flashcard decks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs value={selectedSubject} onValueChange={setSelectedSubject} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All Subjects</TabsTrigger>
                <TabsTrigger value="Physics">Physics</TabsTrigger>
                <TabsTrigger value="Chemistry">Chemistry</TabsTrigger>
                <TabsTrigger value="Mathematics">Mathematics</TabsTrigger>
                <TabsTrigger value="Biology">Biology</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Deck Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDecks.map((deck, index) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500"
                  onClick={() => handleDeckClick(deck.id)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <Badge variant="outline" className={getDifficultyColor(deck.difficulty)}>
                          {deck.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {deck.subject}
                        </Badge>
                      </div>

                      {/* Title and Description */}
                      <div>
                        <h3 className="font-bold text-lg mb-2">{deck.title}</h3>
                        <p className="text-sm text-gray-600">{deck.description}</p>
                      </div>

                      {/* Progress Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-semibold text-lg text-blue-600">{deck.completedCount}/{deck.cardCount}</div>
                          <div className="text-gray-600">Cards Done</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-semibold text-lg text-green-600">{deck.accuracy}%</div>
                          <div className="text-gray-600">Accuracy</div>
                        </div>
                      </div>

                      {/* Status and Last Studied */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className={`font-medium ${getStatusColor(deck.status)}`}>
                            {deck.status === 'completed' ? 'Completed' : 
                             deck.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                          </span>
                          {deck.status === 'completed' && (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>Last studied: {deck.lastStudied}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        className="w-full" 
                        variant={deck.status === 'completed' ? 'outline' : 'default'}
                      >
                        {deck.status === 'completed' ? (
                          <>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Review
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            {deck.status === 'not-started' ? 'Start' : 'Continue'}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredDecks.length === 0 && (
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No flashcard decks found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Voice Assistant */}
      <EnhancedVoiceAssistant 
        userName="Student"
        context="flashcards"
        onNavigationCommand={(route) => navigate(route)}
      />
    </div>
  );
};

export default FlashcardLandingPage;
