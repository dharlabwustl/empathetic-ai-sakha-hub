
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Search, BookOpen, Filter } from 'lucide-react';
import { ConceptCard } from '@/types/user/progress';
import { useToast } from '@/hooks/use-toast';

// Mock data for concept cards
const mockConceptCards: ConceptCard[] = [
  {
    id: '1',
    title: 'Newton\'s Laws of Motion',
    description: 'Understanding the fundamental laws that govern classical mechanics',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'medium',
    completed: false,
    progress: 0,
    content: 'Newton\'s three laws of motion are physical laws that describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.',
    examples: ['An object at rest stays at rest unless acted upon by a force.', 'F = ma'],
    commonMistakes: ['Confusing Newton\'s First and Third Laws', 'Forgetting that mass affects acceleration'],
    examRelevance: 'High - Appears in 85% of physics exams'
  },
  {
    id: '2',
    title: 'Thermodynamics',
    description: 'The branch of physics that deals with heat, work, and temperature',
    subject: 'Physics',
    topic: 'Thermal Physics',
    difficulty: 'hard',
    completed: false,
    progress: 0,
    content: 'Thermodynamics is the study of heat, temperature, and energy, and the conversion of energy from one form to another.',
    examples: ['The First Law of Thermodynamics: Energy cannot be created or destroyed', 'Heat flows from hot to cold'],
    commonMistakes: ['Confusing heat and temperature', 'Ignoring system boundaries'],
    examRelevance: 'High - Key concept in both physics and chemistry sections'
  },
  {
    id: '3',
    title: 'Periodic Table',
    description: 'Understanding the arrangement of chemical elements',
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry',
    difficulty: 'medium',
    completed: false,
    progress: 0,
    content: 'The periodic table is a tabular arrangement of chemical elements, organized by their atomic number, electron configuration, and recurring chemical properties.',
    examples: ['Elements in the same group have similar properties', 'The noble gases are unreactive'],
    commonMistakes: ['Confusing groups and periods', 'Forgetting the transition metals'],
    examRelevance: 'Very high - Fundamental to all chemistry questions'
  },
  {
    id: '4',
    title: 'Calculus: Differentiation',
    description: 'Finding the rate of change of a function',
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'hard',
    completed: false,
    progress: 0,
    content: 'Differentiation is a process of finding the derivative of a function, which measures the sensitivity to change of the function value with respect to a change in its argument.',
    examples: ['d/dx(x²) = 2x', 'The derivative of sin(x) is cos(x)'],
    commonMistakes: ['Forgetting the chain rule', 'Incorrect application of the product rule'],
    examRelevance: 'Critical - Appears in most calculus problems'
  },
  {
    id: '5',
    title: 'Organic Chemistry: Alcohols',
    description: 'Properties and reactions of alcohols',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    difficulty: 'medium',
    completed: false,
    progress: 0,
    content: 'Alcohols are organic compounds that contain a hydroxyl functional group. They undergo various reactions including oxidation, dehydration, and esterification.',
    examples: ['Ethanol is the alcohol in alcoholic beverages', 'Alcohols can be oxidized to aldehydes or ketones'],
    commonMistakes: ['Confusing primary, secondary, and tertiary alcohols', 'Forgetting reaction mechanisms'],
    examRelevance: 'High - A major topic in organic chemistry'
  }
];

const ConceptCardStudyPage = () => {
  const { subject, topic } = useParams();
  const [cards, setCards] = useState<ConceptCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<ConceptCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<ConceptCard | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState<string>('all');
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setCards(mockConceptCards);
      setFilteredCards(mockConceptCards);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...cards];
    
    // Filter by subject if provided
    if (subject) {
      filtered = filtered.filter(card => card.subject.toLowerCase() === subject.toLowerCase());
    }
    
    // Filter by topic if provided
    if (topic) {
      filtered = filtered.filter(card => card.topic.toLowerCase() === topic.toLowerCase());
    }
    
    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(card => 
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        card.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply difficulty filter
    if (difficulty !== 'all') {
      filtered = filtered.filter(card => card.difficulty === difficulty);
    }
    
    setFilteredCards(filtered);
  }, [cards, subject, topic, searchQuery, difficulty]);

  const handleCardClick = (card: ConceptCard) => {
    setSelectedCard(card);
  };

  const handleCompleteCard = (cardId: string) => {
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, completed: true, progress: 100 } : card
    );
    setCards(updatedCards);
    setSelectedCard(null);
    
    toast({
      title: "Concept marked as completed",
      description: "Your progress has been updated",
    });
  };

  const handleBackToList = () => {
    setSelectedCard(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/dashboard/student">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            Concept Cards
            {subject && ` - ${subject}`}
            {topic && ` > ${topic}`}
          </h1>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Master key concepts through detailed explanations and examples
        </p>
      </div>

      {selectedCard ? (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">{selectedCard.title}</CardTitle>
              <Button variant="outline" onClick={handleBackToList}>
                Back to List
              </Button>
            </div>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>{selectedCard.subject}</span>
              <span>•</span>
              <span>{selectedCard.topic}</span>
              <span>•</span>
              <span className="capitalize">{selectedCard.difficulty} difficulty</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p>{selectedCard.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Content</h3>
              <p>{selectedCard.content}</p>
            </div>
            
            {selectedCard.examples && selectedCard.examples.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Examples</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedCard.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedCard.commonMistakes && selectedCard.commonMistakes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Common Mistakes</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedCard.commonMistakes.map((mistake, index) => (
                    <li key={index}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedCard.examRelevance && (
              <div>
                <h3 className="font-semibold mb-2">Exam Relevance</h3>
                <p>{selectedCard.examRelevance}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => handleCompleteCard(selectedCard.id)}>
              Mark as Completed
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          {/* Filters and search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search concept cards..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Tabs defaultValue="all" value={difficulty} onValueChange={setDifficulty}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="easy">Easy</TabsTrigger>
                  <TabsTrigger value="medium">Medium</TabsTrigger>
                  <TabsTrigger value="hard">Hard</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Card grid */}
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.map(card => (
                <Card 
                  key={card.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleCardClick(card)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen size={16} className="text-primary" />
                      {card.title}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {card.subject} • {card.topic}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm">{card.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        card.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        card.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
                      </span>
                    </div>
                    {card.completed ? (
                      <span className="text-xs text-green-600 font-medium">Completed</span>
                    ) : (
                      <span className="text-xs text-blue-600 font-medium">Study Now</span>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No concept cards found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConceptCardStudyPage;
