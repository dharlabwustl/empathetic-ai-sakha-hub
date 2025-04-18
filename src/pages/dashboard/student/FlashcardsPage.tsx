import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Search, Plus, ChevronLeft, ChevronRight, Shuffle,
  BookOpen, BookX, Star, StarOff, Trash2, Pencil,
  Share, Download, PlusCircle, Filter, Clock, Lightbulb
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  starred: boolean;
  subject: string;
  topic: string;
  lastReviewed?: string;
  confidence: 'low' | 'medium' | 'high';
}

interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  subject: string;
  cards: Flashcard[];
  lastAccessed?: string;
  cardCount: number;
}

const FlashcardsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDeckId, setCurrentDeckId] = useState<string | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddDeckDialog, setShowAddDeckDialog] = useState(false);
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [showEditDeckDialog, setShowEditDeckDialog] = useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [currentView, setCurrentView] = useState<'decks' | 'study'>('decks');
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [studyMode, setStudyMode] = useState<'regular' | 'spaced' | 'quiz'>('regular');
  
  // Form states
  const [newDeckForm, setNewDeckForm] = useState({
    title: "",
    description: "",
    subject: "General"
  });
  
  const [newCardForm, setNewCardForm] = useState({
    front: "",
    back: "",
    subject: "General",
    topic: ""
  });
  
  // Mock decks
  const [decks, setDecks] = useState<FlashcardDeck[]>([
    {
      id: "1",
      title: "Physics - Mechanics",
      description: "Fundamentals of Newtonian mechanics and motion",
      subject: "Physics",
      cards: [
        { id: "c1", front: "Newton's First Law", back: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.", starred: true, subject: "Physics", topic: "Mechanics", confidence: "high" },
        { id: "c2", front: "Newton's Second Law", back: "The acceleration of an object is directly proportional to the force applied and inversely proportional to its mass. F = ma", starred: false, subject: "Physics", topic: "Mechanics", confidence: "medium" },
        { id: "c3", front: "Newton's Third Law", back: "For every action, there is an equal and opposite reaction.", starred: false, subject: "Physics", topic: "Mechanics", lastReviewed: "2023-04-15", confidence: "low" },
      ],
      lastAccessed: "2023-04-18",
      cardCount: 3
    },
    {
      id: "2",
      title: "Chemistry - Periodic Table",
      description: "Elements and their properties",
      subject: "Chemistry",
      cards: [
        { id: "c4", front: "What is the atomic number of Oxygen?", back: "8", starred: false, subject: "Chemistry", topic: "Periodic Table", confidence: "high" },
        { id: "c5", front: "Noble gases are characterized by...", back: "Full outer electron shells, making them largely non-reactive.", starred: true, subject: "Chemistry", topic: "Periodic Table", confidence: "medium" },
      ],
      lastAccessed: "2023-04-16",
      cardCount: 2
    },
    {
      id: "3",
      title: "Mathematics - Calculus",
      description: "Derivatives and integrals",
      subject: "Mathematics",
      cards: [
        { id: "c6", front: "The derivative of sin(x) is...", back: "cos(x)", starred: false, subject: "Mathematics", topic: "Calculus", confidence: "medium" },
        { id: "c7", front: "The integral of 1/x is...", back: "ln|x| + C", starred: true, subject: "Mathematics", topic: "Calculus", confidence: "low" },
        { id: "c8", front: "The derivative of e^x is...", back: "e^x", starred: false, subject: "Mathematics", topic: "Calculus", confidence: "high" },
      ],
      lastAccessed: "2023-04-17",
      cardCount: 3
    }
  ]);
  
  // Get current deck
  const currentDeck = currentDeckId ? decks.find(deck => deck.id === currentDeckId) : null;
  // Get current card
  const currentCard = currentDeck && currentDeck.cards.length > 0 ? currentDeck.cards[cardIndex] : null;
  
  // Filter decks by search query and subject
  const filteredDecks = decks.filter(deck => {
    const matchesSearch = deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deck.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === "all" || deck.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });
  
  // Card navigation
  const goToNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentDeck && cardIndex < currentDeck.cards.length - 1) {
        setCardIndex(cardIndex + 1);
      } else {
        setCardIndex(0);
      }
    }, 200);
  };
  
  const goToPrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentDeck && cardIndex > 0) {
        setCardIndex(cardIndex - 1);
      } else if (currentDeck) {
        setCardIndex(currentDeck.cards.length - 1);
      }
    }, 200);
  };
  
  const shuffleCards = () => {
    if (currentDeck) {
      const newDeck = { ...currentDeck };
      // Fisher-Yates shuffle algorithm
      for (let i = newDeck.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck.cards[i], newDeck.cards[j]] = [newDeck.cards[j], newDeck.cards[i]];
      }
      setDecks(decks.map(deck => deck.id === currentDeckId ? newDeck : deck));
      setCardIndex(0);
      setIsFlipped(false);
      toast({
        title: "Cards Shuffled",
        description: "Your flashcards have been randomly shuffled."
      });
    }
  };
  
  const startStudying = (deckId: string) => {
    setCurrentDeckId(deckId);
    setCardIndex(0);
    setIsFlipped(false);
    setCurrentView('study');
    
    // Update last accessed
    setDecks(decks.map(deck => 
      deck.id === deckId 
        ? { ...deck, lastAccessed: new Date().toISOString() } 
        : deck
    ));
  };
  
  const stopStudying = () => {
    setCurrentDeckId(null);
    setCurrentView('decks');
  };
  
  // Star/unstar card
  const toggleStarCard = (cardId: string) => {
    if (currentDeck) {
      const updatedDeck = {
        ...currentDeck,
        cards: currentDeck.cards.map(card => 
          card.id === cardId ? { ...card, starred: !card.starred } : card
        )
      };
      
      setDecks(decks.map(deck => 
        deck.id === currentDeckId ? updatedDeck : deck
      ));
      
      toast({
        title: updatedDeck.cards.find(card => card.id === cardId)?.starred 
          ? "Card Starred" 
          : "Card Unstarred",
        description: "Card has been updated."
      });
    }
  };
  
  // Forms handling
  const handleCreateDeck = () => {
    const newDeck: FlashcardDeck = {
      id: `deck-${Date.now()}`,
      title: newDeckForm.title,
      description: newDeckForm.description,
      subject: newDeckForm.subject,
      cards: [],
      lastAccessed: new Date().toISOString(),
      cardCount: 0
    };
    
    setDecks([...decks, newDeck]);
    setNewDeckForm({ title: "", description: "", subject: "General" });
    setShowAddDeckDialog(false);
    
    toast({
      title: "Deck Created",
      description: `"${newDeckForm.title}" has been created.`
    });
  };
  
  const handleCreateCard = () => {
    if (currentDeckId) {
      const newCard: Flashcard = {
        id: `card-${Date.now()}`,
        front: newCardForm.front,
        back: newCardForm.back,
        starred: false,
        subject: currentDeck?.subject || newCardForm.subject,
        topic: newCardForm.topic,
        confidence: 'medium'
      };
      
      const updatedDeck = {
        ...currentDeck!,
        cards: [...currentDeck!.cards, newCard],
        cardCount: currentDeck!.cardCount + 1
      };
      
      setDecks(decks.map(deck => 
        deck.id === currentDeckId ? updatedDeck : deck
      ));
      
      setNewCardForm({ front: "", back: "", subject: currentDeck?.subject || "General", topic: "" });
      setShowAddCardDialog(false);
      
      toast({
        title: "Card Added",
        description: "New flashcard has been created."
      });
    }
  };
  
  const deleteDeck = () => {
    if (currentDeckId) {
      setDecks(decks.filter(deck => deck.id !== currentDeckId));
      setCurrentDeckId(null);
      setCurrentView('decks');
      setShowDeleteConfirmDialog(false);
      
      toast({
        title: "Deck Deleted",
        description: "The flashcard deck has been removed."
      });
    }
  };
  
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'low':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const subjectOptions = [
    "all",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Computer Science",
    "English",
    "History"
  ];

  // Add new state for written answers and feedback
  const [userAnswer, setUserAnswer] = useState('');
  const [answerFeedback, setAnswerFeedback] = useState<{
    accuracy: number;
    message: string;
    type: 'success' | 'warning' | 'error';
  } | null>(null);

  // Add function to calculate answer similarity/accuracy
  const calculateAnswerAccuracy = (userAnswer: string, correctAnswer: string): number => {
    const userWords = userAnswer.toLowerCase().trim().split(/\s+/);
    const correctWords = correctAnswer.toLowerCase().trim().split(/\s+/);
    
    let matchCount = 0;
    for (const word of userWords) {
      if (word.length > 2 && correctWords.includes(word)) {
        matchCount++;
      }
    }
    
    const accuracy = Math.round((matchCount / correctWords.length) * 100);
    return Math.min(accuracy, 100);
  };

  // Add function to check answer
  const checkAnswer = () => {
    if (!currentCard) return;
    
    const accuracy = calculateAnswerAccuracy(userAnswer, currentCard.back);
    
    let feedbackMessage = '';
    let feedbackType: 'success' | 'warning' | 'error';
    
    if (accuracy >= 90) {
      feedbackMessage = "Excellent! Your answer is spot on!";
      feedbackType = 'success';
    } else if (accuracy >= 70) {
      feedbackMessage = "Good job! You've got the main points.";
      feedbackType = 'success';
    } else if (accuracy >= 50) {
      feedbackMessage = "You're on the right track, but there's room for improvement.";
      feedbackType = 'warning';
    } else {
      feedbackMessage = "Try again. Focus on key concepts in your answer.";
      feedbackType = 'error';
    }

    setAnswerFeedback({
      accuracy,
      message: feedbackMessage,
      type: feedbackType
    });
  };

  // Add function to reset for try again
  const handleTryAgain = () => {
    setUserAnswer('');
    setAnswerFeedback(null);
  };

  // Modify the return JSX to include the answer input and feedback UI
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Flashcards</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create and study flashcards to enhance your learning
          </p>
        </div>
        
        {currentView === 'decks' ? (
          <Dialog open={showAddDeckDialog} onOpenChange={setShowAddDeckDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Deck
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Flashcard Deck</DialogTitle>
                <DialogDescription>
                  Enter the details for your new flashcard deck.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Deck Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Physics - Thermodynamics"
                    value={newDeckForm.title}
                    onChange={e => setNewDeckForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="A brief description of this deck"
                    rows={3}
                    value={newDeckForm.description}
                    onChange={e => setNewDeckForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={newDeckForm.subject} 
                    onValueChange={value => setNewDeckForm(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDeckDialog(false)}>Cancel</Button>
                <Button onClick={handleCreateDeck} disabled={!newDeckForm.title}>Create Deck</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <div className="flex items-center gap-2">
            <Dialog open={showAddCardDialog} onOpenChange={setShowAddCardDialog}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Flashcard</DialogTitle>
                  <DialogDescription>
                    Create a new card for your "{currentDeck?.title}" deck.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="front">Front Side</Label>
                    <Textarea
                      id="front"
                      placeholder="Question or term"
                      rows={3}
                      value={newCardForm.front}
                      onChange={e => setNewCardForm(prev => ({ ...prev, front: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="back">Back Side</Label>
                    <Textarea
                      id="back"
                      placeholder="Answer or definition"
                      rows={3}
                      value={newCardForm.back}
                      onChange={e => setNewCardForm(prev => ({ ...prev, back: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic (optional)</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Kinematics"
                      value={newCardForm.topic}
                      onChange={e => setNewCardForm(prev => ({ ...prev, topic: e.target.value }))}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddCardDialog(false)}>Cancel</Button>
                  <Button onClick={handleCreateCard} disabled={!newCardForm.front || !newCardForm.back}>
                    Add Card
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Deck
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Flashcard Deck</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{currentDeck?.title}"? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteConfirmDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={deleteDeck}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={stopStudying}>
              Back to Decks
            </Button>
          </div>
        )}
      </div>
      
      <AnimatePresence mode="wait">
        {currentView === 'decks' ? (
          <motion.div
            key="decks-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="relative grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="Search for flashcard decks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="w-full sm:w-auto">
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="min-w-[180px]">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <span>Filter by Subject</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject === "all" ? "All Subjects" : subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDecks.map(deck => (
                <motion.div
                  key={deck.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {deck.subject}
                        </Badge>
                        <Badge variant="secondary">{deck.cardCount} cards</Badge>
                      </div>
                      <CardTitle className="mt-2 line-clamp-1">{deck.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{deck.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Last studied: {deck.lastAccessed ? new Date(deck.lastAccessed).toLocaleDateString() : "Never"}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => startStudying(deck.id)}>
                        <BookOpen className="h-4 w-4 mr-1" /> Study
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" /> Edit Deck
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="h-4 w-4 mr-2" /> Share Deck
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" /> Export
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
              
              {/* Empty state */}
              {filteredDecks.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <BookX className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No flashcard decks found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || subjectFilter !== 'all' 
                      ? "Try adjusting your search or filters."
                      : "Create your first flashcard deck to start studying."}
                  </p>
                  
                  <Button onClick={() => setShowAddDeckDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Deck
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="study-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{currentDeck?.title}</h2>
              
              <div className="flex items-center gap-2">
                <Select value={studyMode} onValueChange={(value) => setStudyMode(value as any)}>
                  <SelectTrigger className="min-w-[140px]">
                    <SelectValue placeholder="Study Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="spaced">Spaced Repetition</SelectItem>
                    <SelectItem value="quiz">Quiz Mode</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" onClick={shuffleCards}>
                  <Shuffle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              {/* Progress indicator */}
              <div className="w-full max-w-md mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Card {cardIndex + 1} of {currentDeck?.cards.length}</span>
                  <span>{Math.round(((cardIndex + 1) / (currentDeck?.cards.length || 1)) * 100)}% Complete</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all"
                    style={{ width: `${((cardIndex + 1) / (currentDeck?.cards.length || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="relative min-h-[20rem] w-full max-w-xl mb-6">
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-center">Question</h3>
                    <p className="text-center text-lg mb-6">{currentCard?.front}</p>

                    <div className="space-y-4">
                      <Textarea
                        placeholder="Write your answer here..."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="min-h-[120px] w-full resize-none"
                      />

                      {answerFeedback && (
                        <div className={`p-4 rounded-lg space-y-2 ${
                          answerFeedback.type === 'success' ? 'bg-green-50 border border-green-200' :
                          answerFeedback.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                          'bg-red-50 border border-red-200'
                        }`}>
                          <p className={`font-medium ${
                            answerFeedback.type === 'success' ? 'text-green-700' :
                            answerFeedback.type === 'warning' ? 'text-yellow-700' :
                            'text-red-700'
                          }`}>
                            {answerFeedback.message}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                answerFeedback.accuracy >= 90 ? 'bg-green-500' :
                                answerFeedback.accuracy >= 70 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${answerFeedback.accuracy}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-600">
                            Accuracy: {answerFeedback.accuracy}%
                          </p>
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        {answerFeedback ? (
                          <>
                            <Button variant="outline" onClick={handleTryAgain}>
                              Try Again
                            </Button>
                            <Button onClick={() => setIsFlipped(true)}>
                              View Answer
                            </Button>
                          </>
                        ) : (
                          <Button 
                            onClick={checkAnswer}
                            disabled={!userAnswer.trim()}
                          >
                            Check Answer
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <Button variant="outline" onClick={goToPrevCard}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <Button variant="outline" onClick={() => setIsFlipped(true)}>
                  View Answer
                </Button>
                
                <Button variant="outline" onClick={goToNextCard}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              {/* Confidence rating buttons (shown when card is flipped) */}
              {isFlipped && (
                <div className="mt-6 flex flex-col items-center">
                  <p className="text-sm text-gray-500 mb-2">How well did you know this?</p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    >
                      Not at all
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
                    >
                      Somewhat
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    >
                      Very well
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Study tips */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                    <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Study Tip</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      For better retention, try to actively recall the answer before flipping the card. 
                      This strengthens neural connections and improves long-term memory.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div
