
import React, { useState, useRef, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  RotateCcw,
  Plus,
  Check,
  X,
  Book,
  Brain,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  lastReviewed?: string;
  masteryLevel: number; // 0-100%
}

const sampleFlashcards: Flashcard[] = [
  {
    id: '1',
    question: "What is Newton's First Law of Motion?",
    answer: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.",
    category: "Physics",
    lastReviewed: "2025-04-08",
    masteryLevel: 80
  },
  {
    id: '2',
    question: "What is the process by which plants make their own food?",
    answer: "Photosynthesis. It's the process of converting light energy into chemical energy stored in glucose or other sugars.",
    category: "Biology",
    lastReviewed: "2025-04-10",
    masteryLevel: 90
  },
  {
    id: '3',
    question: "What is the quadratic formula?",
    answer: "x = (-b ± √(b² - 4ac)) / 2a, where ax² + bx + c = 0",
    category: "Mathematics",
    lastReviewed: "2025-04-05",
    masteryLevel: 75
  },
  {
    id: '4',
    question: "What are covalent bonds?",
    answer: "Covalent bonds are formed when atoms share electrons to complete their valence shells.",
    category: "Chemistry",
    lastReviewed: "2025-04-09",
    masteryLevel: 60
  },
  {
    id: '5',
    question: "What was the significance of the Treaty of Versailles?",
    answer: "The Treaty of Versailles was signed at the end of World War I and imposed harsh penalties on Germany, which many historians believe contributed to the rise of Nazi Germany and eventually World War II.",
    category: "History",
    lastReviewed: "2025-04-07",
    masteryLevel: 65
  }
];

const defaultCategories = ["Physics", "Chemistry", "Mathematics", "Biology", "History", "Geography", "Literature", "Computer Science"];

const FlashcardsFeature = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('study');
  const [flashcards, setFlashcards] = useState<Flashcard[]>(sampleFlashcards);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>(sampleFlashcards);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [editCardId, setEditCardId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [assessedCards, setAssessedCards] = useState<string[]>([]);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [studyMode, setStudyMode] = useState<'flip' | 'write'>('flip');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize from local storage
  useEffect(() => {
    const savedFlashcards = localStorage.getItem('flashcards');
    const savedCategories = localStorage.getItem('flashcardCategories');
    
    if (savedFlashcards) {
      setFlashcards(JSON.parse(savedFlashcards));
      setFilteredCards(JSON.parse(savedFlashcards));
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Save to local storage when flashcards or categories change
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    localStorage.setItem('flashcardCategories', JSON.stringify(categories));
  }, [flashcards, categories]);

  // Filter cards when category or search changes
  useEffect(() => {
    let filtered = [...flashcards];
    
    if (currentCategory !== 'all') {
      filtered = filtered.filter(card => card.category === currentCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        card => 
          card.question.toLowerCase().includes(query) || 
          card.answer.toLowerCase().includes(query) ||
          card.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredCards(filtered);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [currentCategory, searchQuery, flashcards]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // Loop back to the beginning
      setCurrentCardIndex(0);
      setIsFlipped(false);
      
      toast({
        title: "End of deck",
        description: "Looping back to the first card.",
      });
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    } else {
      // Loop to the end
      setCurrentCardIndex(filteredCards.length - 1);
      setIsFlipped(false);
    }
  };

  const handleAddFlashcard = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast({
        title: "Error",
        description: "Question and answer cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const category = newCategory.trim() || "Uncategorized";
    
    const newCard: Flashcard = {
      id: Date.now().toString(),
      question: newQuestion,
      answer: newAnswer,
      category,
      lastReviewed: new Date().toISOString().split('T')[0],
      masteryLevel: 0
    };

    setFlashcards([...flashcards, newCard]);
    
    // Add category if it's new
    if (!categories.includes(category) && category !== "Uncategorized") {
      setCategories([...categories, category]);
    }
    
    setNewQuestion('');
    setNewAnswer('');
    setNewCategory('');
    
    toast({
      title: "Success",
      description: "Flashcard added successfully"
    });
    
    // Close dialog if open
    setIsDialogOpen(false);
  };

  const handleEditFlashcard = (id: string) => {
    const cardToEdit = flashcards.find(card => card.id === id);
    
    if (cardToEdit) {
      setEditCardId(id);
      setEditQuestion(cardToEdit.question);
      setEditAnswer(cardToEdit.answer);
      setEditCategory(cardToEdit.category);
    }
  };

  const handleSaveEdit = () => {
    if (!editCardId || !editQuestion.trim() || !editAnswer.trim()) return;
    
    const updatedFlashcards = flashcards.map(card => {
      if (card.id === editCardId) {
        return {
          ...card,
          question: editQuestion,
          answer: editAnswer,
          category: editCategory || card.category
        };
      }
      return card;
    });
    
    setFlashcards(updatedFlashcards);
    
    // Add new category if needed
    if (editCategory && !categories.includes(editCategory)) {
      setCategories([...categories, editCategory]);
    }
    
    setEditCardId(null);
    
    toast({
      title: "Success",
      description: "Flashcard updated successfully"
    });
  };

  const handleDeleteFlashcard = (id: string) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
    
    toast({
      title: "Deleted",
      description: "Flashcard has been removed"
    });
  };

  const handleAssessAnswer = () => {
    const currentCard = filteredCards[currentCardIndex];
    
    // Simple similarity check - this could be improved with more sophisticated matching
    const userResponseLower = userResponse.trim().toLowerCase();
    const actualAnswerLower = currentCard.answer.toLowerCase();
    
    const isCorrect = actualAnswerLower.includes(userResponseLower) || 
                     userResponseLower.includes(actualAnswerLower.substring(0, 15));
    
    // Update flashcard mastery level based on correctness
    const updatedFlashcards = flashcards.map(card => {
      if (card.id === currentCard.id) {
        const newMasteryLevel = isCorrect 
          ? Math.min(card.masteryLevel + 10, 100) 
          : Math.max(card.masteryLevel - 5, 0);
        
        return {
          ...card,
          masteryLevel: newMasteryLevel,
          lastReviewed: new Date().toISOString().split('T')[0]
        };
      }
      return card;
    });
    
    setFlashcards(updatedFlashcards);
    
    // Mark as assessed
    setAssessedCards([...assessedCards, currentCard.id]);
    
    if (isCorrect) {
      setTotalCorrect(totalCorrect + 1);
    }
    
    // Toast for feedback
    toast({
      title: isCorrect ? "Correct!" : "Not quite right",
      description: isCorrect 
        ? "Your answer matches. Great job!" 
        : `The correct answer was: ${currentCard.answer.substring(0, 40)}...`,
      variant: isCorrect ? "default" : "destructive"
    });
    
    // Move to next card or show results
    if (currentCardIndex < filteredCards.length - 1) {
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setUserResponse('');
        setIsFlipped(false);
      }, 1000);
    } else {
      // End of deck
      setTimeout(() => {
        setShowResults(true);
      }, 1000);
    }
  };

  const resetStudySession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserResponse('');
    setAssessedCards([]);
    setTotalCorrect(0);
    setShowResults(false);
  };

  // Filter unique categories from flashcards
  const uniqueCategories = Array.from(new Set(flashcards.map(card => card.category)));
  
  // Calculate accuracy
  const accuracy = assessedCards.length > 0 
    ? Math.round((totalCorrect / assessedCards.length) * 100) 
    : 0;

  return (
    <Card className="border-t-4 border-t-indigo-500">
      <CardHeader className="pb-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Book className="text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg gradient-text">Flashcards & Revision</CardTitle>
              <CardDescription>Create, study, and master concepts</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-200">
            {filteredCards.length} Cards
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="study" className="flex-1 gap-1 rounded-none">
              <Brain size={14} /> Study
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex-1 gap-1 rounded-none">
              <FileText size={14} /> Manage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="study" className="p-4">
            <AnimatePresence mode="wait">
              {showResults ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center space-y-2">
                    <h3 className="font-bold text-xl">Study Results</h3>
                    <div className="flex justify-center">
                      <Badge className={`text-lg py-2 px-4 ${
                        accuracy >= 80 ? 'bg-green-100 text-green-800' : 
                        accuracy >= 60 ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {accuracy}% Accuracy
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      You answered {totalCorrect} out of {assessedCards.length} cards correctly
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Performance by Category</h4>
                    {uniqueCategories.map(category => {
                      const categoryCards = flashcards.filter(card => 
                        card.category === category && assessedCards.includes(card.id)
                      );
                      
                      const correctInCategory = categoryCards.filter(card => 
                        assessedCards.includes(card.id) && 
                        flashcards.find(f => f.id === card.id)?.masteryLevel >= 70
                      ).length;
                      
                      const categoryAccuracy = categoryCards.length > 0 
                        ? Math.round((correctInCategory / categoryCards.length) * 100) 
                        : 0;
                        
                      return categoryCards.length > 0 ? (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm">{category}</span>
                          <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  categoryAccuracy >= 80 ? 'bg-green-500' : 
                                  categoryAccuracy >= 60 ? 'bg-amber-500' : 
                                  'bg-red-500'
                                }`}
                                style={{ width: `${categoryAccuracy}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{categoryAccuracy}%</span>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                  
                  <Button 
                    onClick={resetStudySession} 
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    <RotateCcw size={14} className="mr-2" /> Study Again
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="study"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
                    <div className="flex gap-2">
                      <select
                        value={currentCategory}
                        onChange={e => setCurrentCategory(e.target.value)}
                        className="text-sm p-2 border rounded-md"
                      >
                        <option value="all">All Categories</option>
                        {uniqueCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>

                      <select
                        value={studyMode}
                        onChange={e => setStudyMode(e.target.value as 'flip' | 'write')}
                        className="text-sm p-2 border rounded-md"
                      >
                        <option value="flip">Flip Mode</option>
                        <option value="write">Write Answer</option>
                      </select>
                    </div>
                    
                    <Input
                      placeholder="Search flashcards..."
                      className="text-sm"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {filteredCards.length === 0 ? (
                    <div className="text-center p-8">
                      <p className="text-gray-500">No flashcards found</p>
                      <Button 
                        onClick={() => {
                          setActiveTab('manage');
                          setIsDialogOpen(true);
                        }}
                        className="mt-4 bg-indigo-600"
                      >
                        <Plus size={14} className="mr-2" /> Create Flashcards
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-full max-w-md">
                        <div className="relative flex justify-center mb-4">
                          <Badge className="absolute top-0 right-0">
                            {currentCardIndex + 1} / {filteredCards.length}
                          </Badge>
                          
                          <motion.div
                            className="w-full h-64 relative perspective"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div 
                              className={`
                                w-full h-full bg-white rounded-lg shadow-md p-6
                                absolute backface-hidden flex flex-col justify-between 
                                ${isFlipped ? 'hidden' : ''}
                              `}
                            >
                              <div>
                                <h3 className="font-bold text-lg text-center">Question</h3>
                                <p className="mt-4 text-center">
                                  {filteredCards[currentCardIndex]?.question}
                                </p>
                              </div>
                              <Badge className="self-center bg-indigo-100 text-indigo-700 border-indigo-200">
                                {filteredCards[currentCardIndex]?.category}
                              </Badge>
                            </div>
                            
                            <div 
                              className={`
                                w-full h-full bg-white rounded-lg shadow-md p-6
                                absolute backface-hidden flex flex-col justify-between
                                ${!isFlipped ? 'hidden' : ''}
                              `}
                            >
                              <div>
                                <h3 className="font-bold text-lg text-center">Answer</h3>
                                <p className="mt-4 text-center">
                                  {filteredCards[currentCardIndex]?.answer}
                                </p>
                              </div>
                              <div className="flex justify-center">
                                <Badge className="mr-2 bg-green-100 text-green-700 border-green-200">
                                  Mastery: {filteredCards[currentCardIndex]?.masteryLevel}%
                                </Badge>
                                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                  Last: {filteredCards[currentCardIndex]?.lastReviewed || 'Never'}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        
                        {studyMode === 'flip' ? (
                          <div className="flex justify-center space-x-4">
                            <Button variant="outline" onClick={prevCard}>
                              <ChevronLeft size={14} className="mr-1" /> Previous
                            </Button>
                            <Button 
                              className="bg-indigo-600 hover:bg-indigo-700" 
                              onClick={flipCard}
                            >
                              <RotateCcw size={14} className="mr-1" /> Flip
                            </Button>
                            <Button variant="outline" onClick={nextCard}>
                              Next <ChevronRight size={14} className="ml-1" />
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Textarea
                              placeholder="Write your answer here..."
                              value={userResponse}
                              onChange={e => setUserResponse(e.target.value)}
                              className="min-h-[80px]"
                            />
                            <div className="flex justify-between">
                              <Button variant="outline" onClick={() => setIsFlipped(true)}>
                                <RotateCcw size={14} className="mr-1" /> Show Answer
                              </Button>
                              <Button 
                                className="bg-indigo-600 hover:bg-indigo-700"
                                onClick={handleAssessAnswer}
                                disabled={!userResponse.trim()}
                              >
                                <Check size={14} className="mr-1" /> Check Answer
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="manage" className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Your Flashcards</h3>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-indigo-600">
                      <Plus size={14} className="mr-1" /> Add Card
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Flashcard</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="question" className="text-sm font-medium">Question</label>
                        <Textarea
                          id="question"
                          value={newQuestion}
                          onChange={e => setNewQuestion(e.target.value)}
                          placeholder="Enter the question"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="answer" className="text-sm font-medium">Answer</label>
                        <Textarea
                          id="answer"
                          value={newAnswer}
                          onChange={e => setNewAnswer(e.target.value)}
                          placeholder="Enter the answer"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">Category</label>
                        <div className="flex gap-2">
                          <select
                            className="flex-1 p-2 text-sm border rounded-md"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                          >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          <Input
                            placeholder="Or enter new..."
                            className="flex-1 text-sm"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddFlashcard} className="bg-indigo-600">
                        Save Card
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex gap-2 overflow-x-auto py-2 pb-3">
                <Button 
                  variant={currentCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentCategory('all')}
                >
                  All
                </Button>
                {uniqueCategories.map(cat => (
                  <Button 
                    key={cat}
                    variant={currentCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              
              <ScrollArea className="h-[340px] rounded border p-2">
                {filteredCards.length === 0 ? (
                  <div className="text-center p-8">
                    <p className="text-gray-500">No flashcards found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredCards.map(card => (
                      <div key={card.id} className="bg-white rounded-lg p-4 shadow-sm border">
                        {editCardId === card.id ? (
                          <div className="space-y-2">
                            <input
                              value={editQuestion}
                              onChange={e => setEditQuestion(e.target.value)}
                              className="w-full p-2 border rounded-md text-sm"
                              placeholder="Question"
                            />
                            <textarea
                              value={editAnswer}
                              onChange={e => setEditAnswer(e.target.value)}
                              className="w-full p-2 border rounded-md text-sm min-h-[80px]"
                              placeholder="Answer"
                            />
                            <div className="flex gap-2">
                              <input
                                value={editCategory}
                                onChange={e => setEditCategory(e.target.value)}
                                className="flex-1 p-2 border rounded-md text-sm"
                                placeholder="Category"
                                list="categories"
                              />
                              <datalist id="categories">
                                {categories.map(cat => (
                                  <option key={cat} value={cat} />
                                ))}
                              </datalist>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setEditCardId(null)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                className="bg-indigo-600" 
                                size="sm" 
                                onClick={handleSaveEdit}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium">{card.question}</h4>
                                <p className="text-gray-600 text-sm mt-1">{card.answer}</p>
                              </div>
                              <div className="flex">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  onClick={() => handleEditFlashcard(card.id)}
                                >
                                  <Edit size={14} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-red-500" 
                                  onClick={() => handleDeleteFlashcard(card.id)}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-2 text-xs">
                              <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">
                                {card.category}
                              </Badge>
                              <div className="flex items-center">
                                <div className="w-24 h-1.5 bg-gray-200 rounded-full mr-2">
                                  <div 
                                    className={`h-1.5 rounded-full ${
                                      card.masteryLevel >= 80 ? 'bg-green-500' : 
                                      card.masteryLevel >= 50 ? 'bg-amber-500' : 
                                      'bg-red-500'
                                    }`} 
                                    style={{ width: `${card.masteryLevel}%` }}>
                                  </div>
                                </div>
                                <span>{card.masteryLevel}%</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border-t px-3 py-2">
        <p className="text-xs text-gray-500 w-full text-center">
          Regular review with flashcards can increase retention by up to 70%
        </p>
      </CardFooter>
    </Card>
  );
};

export default FlashcardsFeature;
