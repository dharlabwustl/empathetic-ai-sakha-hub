
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EnhancedConceptDetail from '@/components/dashboard/student/concepts/EnhancedConceptDetail';

const mockConceptData = {
  conceptId: 'concept-1',
  conceptTitle: 'Newton\'s Laws of Motion',
  conceptContent: `Newton's First Law of Motion states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This is also known as the law of inertia.\n\nNewton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. This is expressed as F = ma, where F is force, m is mass, and a is acceleration.\n\nNewton's Third Law of Motion states that for every action, there is an equal and opposite reaction. This means that when one object exerts a force on a second object, the second object exerts an equal force in the opposite direction on the first object.`,
  subject: 'Physics',
  chapter: 'Classical Mechanics',
  linkedConcepts: [
    { id: 'concept-2', title: 'Conservation of Momentum' },
    { id: 'concept-3', title: 'Work and Energy' }
  ],
  relatedFlashcards: [
    { id: 'flash-1', front: 'What is Newton\'s First Law?', back: 'An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.' },
    { id: 'flash-2', front: 'What is the formula for Newton\'s Second Law?', back: 'F = ma (Force equals mass times acceleration)' }
  ],
  relatedExams: [
    { id: 'exam-1', title: 'Physics Mechanics Exam' },
    { id: 'exam-2', title: 'NEET Physics' }
  ]
};

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [conceptData, setConceptData] = useState(mockConceptData);
  
  useEffect(() => {
    console.log("Pages/ConceptStudyPage - Loading concept with ID:", conceptId);
    
    if (conceptId) {
      // Show toast notification
      toast({
        title: "Loading concept details",
        description: "Please wait while we prepare your concept study materials",
      });
      
      // In a real app, fetch concept data from API here
      // For now, simulate loading and use mock data
      const timer = setTimeout(() => {
        setLoading(false);
        setConceptData({
          ...mockConceptData,
          conceptId: conceptId
        });
      }, 1200);
      
      return () => clearTimeout(timer);
    } else {
      console.error("ConceptStudyPage: Missing conceptId parameter");
      navigate('/dashboard/student/concepts', { replace: true });
    }
  }, [conceptId, navigate, toast]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900/20 dark:to-gray-900">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-semibold text-primary mb-2">Loading Concept</h2>
          <p className="text-muted-foreground mt-2 max-w-md">Please wait while we prepare your study materials...</p>
        </div>
      </div>
    );
  }
  
  // Use the EnhancedConceptDetail component with all the props it needs
  return (
    <EnhancedConceptDetail 
      conceptId={conceptData.conceptId} 
      conceptTitle={conceptData.conceptTitle}
      conceptContent={conceptData.conceptContent}
      subject={conceptData.subject}
      chapter={conceptData.chapter}
      linkedConcepts={conceptData.linkedConcepts}
      relatedFlashcards={conceptData.relatedFlashcards}
      relatedExams={conceptData.relatedExams}
    />
  );
};

export default ConceptStudyPage;
