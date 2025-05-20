
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EnhancedConceptDetail from './EnhancedConceptDetail';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from '@/hooks/use-toast';
import ConceptHeader from './concept-detail/ConceptHeader';
import useUserNotes from '@/hooks/useUserNotes';
import { Helmet } from 'react-helmet';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { saveNote, getNoteForConcept } = useUserNotes();
  const [userNotes, setUserNotes] = useState('');
  const [conceptData, setConceptData] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(35);

  // Mock concept data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockConcept = {
        id: conceptId || 'concept-1',
        title: 'Newton\'s Laws of Motion',
        subject: 'Physics',
        topic: 'Mechanics',
        difficulty: 'medium' as 'easy' | 'medium' | 'hard',
        content: `
          <h2>Newton's First Law of Motion</h2>
          <p>An object at rest will remain at rest, and an object in motion will remain in motion at constant velocity and in a straight line, unless acted upon by an unbalanced force.</p>
          <h3>Key Points</h3>
          <ul>
            <li>Objects naturally keep doing what they're already doing (rest or constant motion)</li>
            <li>This tendency is called "inertia"</li>
            <li>Unbalanced forces change this natural state</li>
          </ul>
          
          <h2>Newton's Second Law of Motion</h2>
          <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This can be represented by the equation F = ma.</p>
          <h3>Key Points</h3>
          <ul>
            <li>More force = more acceleration</li>
            <li>More mass = less acceleration</li>
            <li>Units: force in newtons (N), mass in kg, acceleration in m/s²</li>
          </ul>
          
          <h2>Newton's Third Law of Motion</h2>
          <p>For every action, there is an equal and opposite reaction. This means that forces always occur in pairs, with one object exerting a force on another, and the second object exerting an equal and opposite force on the first.</p>
          <h3>Examples</h3>
          <ul>
            <li>When you push against a wall, the wall pushes back with equal force</li>
            <li>Rocket propulsion: gases push out, rocket moves forward</li>
            <li>Walking: you push backward on the ground, ground pushes you forward</li>
          </ul>
          
          <h2>Applications</h2>
          <p>Newton's laws of motion are fundamental to classical mechanics and have widespread applications in engineering, sports, transportation, and everyday life. They form the basis for understanding how forces influence the motion of objects in our physical world.</p>
        `,
      };
      
      setConceptData(mockConcept);
      
      // Get saved notes for this concept
      const savedNotes = getNoteForConcept(mockConcept.id);
      setUserNotes(savedNotes);
      
    }, 500);
  }, [conceptId]);

  // Handle saving notes
  const handleSaveNotes = () => {
    if (conceptId) {
      saveNote(conceptId, userNotes);
      toast({
        title: "Notes saved successfully",
        description: "Your notes have been saved for this concept.",
      });
    }
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your saved items",
    });
  };

  // Handle mastery update
  const handleMasteryUpdate = (newLevel: number) => {
    setMasteryLevel(newLevel);
    toast({
      title: "Mastery level updated",
      description: `Your mastery of this concept is now ${newLevel}%`,
    });
  };

  // Handle formula lab open
  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening formula lab...",
    });
    // In a real app, you would navigate to the formula lab page
  };

  if (!conceptData) {
    return (
      <SharedPageLayout
        title="Loading Concept"
        subtitle="Please wait while we load the concept details"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} > ${conceptData.topic}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <Helmet>
        <title>{conceptData.title} - Concept Study</title>
      </Helmet>
      
      <div className="space-y-4 sm:space-y-6">
        <ConceptHeader 
          title={conceptData.title}
          subject={conceptData.subject}
          topic={conceptData.topic}
          difficulty={conceptData.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        <EnhancedConceptDetail
          conceptId={conceptData.id}
          title={conceptData.title}
          subject={conceptData.subject}
          topic={conceptData.topic}
          difficulty={conceptData.difficulty}
          content={conceptData.content}
          masteryLevel={masteryLevel}
          onMasteryUpdate={handleMasteryUpdate}
          handleOpenFormulaLab={handleOpenFormulaLab}
        />
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
