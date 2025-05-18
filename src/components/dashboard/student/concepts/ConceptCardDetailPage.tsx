
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import EnhancedConceptDetail from './EnhancedConceptDetail';

// Mock concept data
const MOCK_CONCEPTS = [
  {
    id: '1',
    title: 'Chemical Bonding',
    description: 'Understanding how atoms form bonds and molecules, including ionic, covalent, and metallic bonds',
    subject: 'Chemistry',
    difficulty: 'medium',
    completionPercentage: 68,
    bookmarked: true,
    liked: false,
    mastered: false,
  },
  {
    id: '2',
    title: 'Newton\'s Laws of Motion',
    description: 'Study of the three fundamental laws that form the foundation for classical mechanics',
    subject: 'Physics',
    difficulty: 'hard',
    completionPercentage: 85,
    bookmarked: false,
    liked: true,
    mastered: true,
  },
  {
    id: '3',
    title: 'Cell Structure and Function',
    description: 'Exploration of cell components and their roles in maintaining life processes',
    subject: 'Biology',
    difficulty: 'easy',
    completionPercentage: 92,
    bookmarked: true,
    liked: true,
    mastered: true,
  }
];

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [loading, setLoading] = useState(true);
  const [concept, setConcept] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call to fetch concept details
    const fetchConcept = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const foundConcept = MOCK_CONCEPTS.find(c => c.id === conceptId);
          
          if (foundConcept) {
            setConcept(foundConcept);
          } else {
            setError('Concept not found');
          }
          
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching concept:', err);
        setError('Failed to load concept');
        setLoading(false);
      }
    };
    
    fetchConcept();
  }, [conceptId]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading concept details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-4">
          <p className="font-medium">{error}</p>
          <p className="text-sm mt-2">Please try again or select a different concept</p>
        </div>
      </div>
    );
  }
  
  if (!concept) {
    return null;
  }
  
  return (
    <div className="container mx-auto py-6 px-4">
      <EnhancedConceptDetail 
        conceptId={concept.id}
        title={concept.title}
        description={concept.description}
        subject={concept.subject}
        difficulty={concept.difficulty}
        completionPercentage={concept.completionPercentage}
        bookmarked={concept.bookmarked}
        liked={concept.liked}
        mastered={concept.mastered}
      />
    </div>
  );
};

export default ConceptCardDetailPage;
