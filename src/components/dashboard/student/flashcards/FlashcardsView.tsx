
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Layers, BookOpen, BarChart4 } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StandardGridLayout, GridItem } from '@/components/dashboard/student/common/StandardGridLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data interface
interface Flashcard {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  cardCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  lastStudied?: string;
}

const FlashcardsView = () => {
  const { subject } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>(subject || 'all');
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([]);

  // Fetch flashcards
  useEffect(() => {
    const fetchFlashcards = async () => {
      setLoading(true);
      
      // Simulate API fetch with timeout
      setTimeout(() => {
        const mockFlashcards: Flashcard[] = [
          {
            id: 'fc1',
            title: 'Forces and Motion',
            subject: 'Physics',
            topic: 'Mechanics',
            description: 'Key formulas and concepts for Newton\'s laws and applications',
            cardCount: 24,
            difficulty: 'medium',
            progress: 68,
            lastStudied: 'Yesterday'
          },
          {
            id: 'fc2',
            title: 'Periodic Table Elements',
            subject: 'Chemistry',
            topic: 'Inorganic Chemistry',
            description: 'Properties and characteristics of key elements',
            cardCount: 42,
            difficulty: 'medium',
            progress: 35,
            lastStudied: '3 days ago'
          },
          {
            id: 'fc3',
            title: 'Integration Techniques',
            subject: 'Mathematics',
            topic: 'Calculus',
            description: 'Methods for solving different types of integrals',
            cardCount: 18,
            difficulty: 'hard',
            progress: 45,
            lastStudied: 'Today'
          },
          {
            id: 'fc4',
            title: 'Electromagnetism Formulas',
            subject: 'Physics',
            topic: 'Electricity & Magnetism',
            description: 'Key equations and principles for electromagnetic phenomena',
            cardCount: 32,
            difficulty: 'hard',
            progress: 22,
            lastStudied: '1 week ago'
          },
          {
            id: 'fc5',
            title: 'Organic Reactions',
            subject: 'Chemistry',
            topic: 'Organic Chemistry',
            description: 'Important reaction mechanisms in organic chemistry',
            cardCount: 36,
            difficulty: 'medium',
            progress: 40,
            lastStudied: '2 days ago'
          },
          {
            id: 'fc6',
            title: 'Coordinate Geometry',
            subject: 'Mathematics',
            topic: 'Geometry',
            description: 'Formulas and theorems for coordinate geometry problems',
            cardCount: 20,
            difficulty: 'easy',
            progress: 85,
            lastStudied: 'Yesterday'
          },
        ];
        
        setFlashcards(mockFlashcards);
        setLoading(false);
      }, 800);
    };
    
    fetchFlashcards();
  }, []);

  // Filter flashcards when subject changes
  useEffect(() => {
    if (selectedSubject === 'all') {
      setFilteredFlashcards(flashcards);
    } else {
      setFilteredFlashcards(flashcards.filter(card => card.subject.toLowerCase() === selectedSubject.toLowerCase()));
    }
  }, [selectedSubject, flashcards]);

  // Handle subject change
  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
  };

  // Map flashcards to grid items
  const flashcardGridItems: GridItem[] = filteredFlashcards.map(card => ({
    id: card.id,
    title: card.title,
    description: card.description,
    icon: <Layers className="h-4 w-4 text-indigo-600" />,
    badge: `${card.cardCount} cards`,
    badgeColor: 
      card.difficulty === 'easy' ? 'success' :
      card.difficulty === 'medium' ? 'warning' : 'danger',
    footerText: `${card.progress}% mastered`,
    linkTo: `/dashboard/student/flashcards/practice/${card.id}`,
    linkText: "Practice Now",
    onAction: () => {
      toast({
        title: "Opening flashcards",
        description: `Loading ${card.title}...`,
      });
    }
  }));

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Enhance your memory with interactive flashcards"
      icon={<BookOpen className="h-5 w-5 text-indigo-500" />}
    >
      <div className="space-y-6">
        <Tabs defaultValue={selectedSubject} onValueChange={handleSubjectChange}>
          <TabsList className="w-full border-b rounded-none flex justify-start overflow-auto">
            <TabsTrigger value="all">All Subjects</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {selectedSubject === 'all' ? 'All Flashcard Sets' : `${selectedSubject} Flashcard Sets`}
            </h2>
            <p className="text-muted-foreground text-sm">
              {filteredFlashcards.length} flashcard sets available
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <BarChart4 className="h-3 w-3" /> 
              Accuracy: 72%
            </Badge>
          </div>
        </div>
        
        <StandardGridLayout 
          items={flashcardGridItems}
          emptyMessage={loading ? "Loading flashcards..." : "No flashcard sets found for this subject"}
          className="mt-4"
        />
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsView;
