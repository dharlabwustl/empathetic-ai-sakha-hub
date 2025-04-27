
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, BarChart4 } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StandardGridLayout, GridItem } from '@/components/dashboard/student/common/StandardGridLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data interface
interface Concept {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  recommendedFor?: string[];
  lastStudied?: string;
}

const ConceptsView = () => {
  const { subject } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>(subject || 'all');
  const [filteredConcepts, setFilteredConcepts] = useState<Concept[]>([]);

  // Fetch concepts
  useEffect(() => {
    const fetchConcepts = async () => {
      setLoading(true);
      
      // Simulate API fetch with timeout
      setTimeout(() => {
        const mockConcepts: Concept[] = [
          {
            id: '1',
            title: 'Newton\'s Laws of Motion',
            subject: 'Physics',
            chapter: 'Classical Mechanics',
            description: 'The fundamental principles describing the relationship between force and motion.',
            difficulty: 'medium',
            progress: 75,
            lastStudied: 'Yesterday'
          },
          {
            id: '2',
            title: 'Chemical Bonding',
            subject: 'Chemistry',
            chapter: 'Atomic Structure',
            description: 'The various ways atoms combine to form molecules through electronic interactions.',
            difficulty: 'hard',
            progress: 40,
            lastStudied: '3 days ago'
          },
          {
            id: '3',
            title: 'Calculus: Derivatives',
            subject: 'Mathematics',
            chapter: 'Differential Calculus',
            description: 'Rate of change of a function with respect to a variable.',
            difficulty: 'hard',
            progress: 60,
            lastStudied: 'Today'
          },
          {
            id: '4',
            title: 'Electromagnetic Induction',
            subject: 'Physics',
            chapter: 'Electromagnetism',
            description: 'Production of an electromotive force in a conductor exposed to a changing magnetic field.',
            difficulty: 'hard',
            progress: 30,
            recommendedFor: ['JEE Advanced', 'NEET'],
            lastStudied: '1 week ago'
          },
          {
            id: '5',
            title: 'Organic Chemistry: Alcohols',
            subject: 'Chemistry',
            chapter: 'Organic Chemistry',
            description: 'Study of compounds containing hydroxyl functional group bonded to a carbon atom.',
            difficulty: 'medium',
            progress: 50,
            lastStudied: '2 days ago'
          },
          {
            id: '6',
            title: 'Trigonometric Functions',
            subject: 'Mathematics',
            chapter: 'Trigonometry',
            description: 'Functions of angles used to relate angles of a triangle to the lengths of its sides.',
            difficulty: 'easy',
            progress: 90,
            lastStudied: 'Yesterday'
          },
        ];
        
        setConcepts(mockConcepts);
        setLoading(false);
      }, 800);
    };
    
    fetchConcepts();
  }, []);

  // Filter concepts when subject changes
  useEffect(() => {
    if (selectedSubject === 'all') {
      setFilteredConcepts(concepts);
    } else {
      setFilteredConcepts(concepts.filter(concept => concept.subject.toLowerCase() === selectedSubject.toLowerCase()));
    }
  }, [selectedSubject, concepts]);

  // Handle subject change
  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
  };

  // Map concepts to grid items
  const conceptGridItems: GridItem[] = filteredConcepts.map(concept => ({
    id: concept.id,
    title: concept.title,
    description: concept.description,
    icon: <Brain className="h-4 w-4 text-purple-600" />,
    badge: concept.difficulty,
    badgeColor: 
      concept.difficulty === 'easy' ? 'success' :
      concept.difficulty === 'medium' ? 'warning' : 'danger',
    footerText: `${concept.progress}% mastered`,
    linkTo: `/dashboard/student/concepts/study/${concept.id}`,
    linkText: "Study Now",
    onAction: () => {
      toast({
        title: "Opening concept",
        description: `Loading ${concept.title}...`,
      });
    }
  }));

  return (
    <SharedPageLayout
      title="Concept Library"
      subtitle="Master crucial concepts for your exam preparation"
      icon={<BookOpen className="h-5 w-5 text-purple-500" />}
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
              {selectedSubject === 'all' ? 'All Concepts' : `${selectedSubject} Concepts`}
            </h2>
            <p className="text-muted-foreground text-sm">
              {filteredConcepts.length} concepts available
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <BarChart4 className="h-3 w-3" /> 
              Mastery: 64%
            </Badge>
          </div>
        </div>
        
        <StandardGridLayout 
          items={conceptGridItems}
          emptyMessage={loading ? "Loading concepts..." : "No concepts found for this subject"}
          className="mt-4"
        />
      </div>
    </SharedPageLayout>
  );
};

export default ConceptsView;
