
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedPageLayout } from '../SharedPageLayout';
import EnhancedConceptDetail from './EnhancedConceptDetail';
import ConceptHeader from './concept-detail/ConceptHeader';
import { useToast } from '@/hooks/use-toast';

// Sample concept data (would normally come from an API/database)
const demoConceptData = {
  id: "concept-1",
  title: "Newton's Second Law of Motion",
  subject: "Physics",
  topic: "Classical Mechanics",
  difficulty: "medium" as const,
  content: `
    <h2>Newton's Second Law of Motion</h2>
    <p>Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
    <p>It can be mathematically expressed as:</p>
    <p class="text-center font-bold text-xl my-4">F = ma</p>
    <p>Where:</p>
    <ul class="list-disc pl-6 my-4">
      <li><strong>F</strong> is the net force applied (measured in newtons, N)</li>
      <li><strong>m</strong> is the mass of the object (measured in kilograms, kg)</li>
      <li><strong>a</strong> is the acceleration (measured in meters per second squared, m/s²)</li>
    </ul>
    <p>This fundamental law forms the backbone of classical mechanics and helps us analyze and predict the motion of objects under the influence of forces.</p>
  `,
  masteryLevel: 65,
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();
  
  console.log("ConceptDetailPage - Rendering with conceptId:", conceptId);
  
  useEffect(() => {
    console.log("ConceptDetailPage - useEffect with conceptId:", conceptId);
    // In a real app, you would fetch data based on conceptId here
  }, [conceptId]);
  
  // In a real app, you would fetch data based on conceptId
  const concept = demoConceptData;
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your saved items",
    });
  };

  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening formula lab...",
    });
    // In a real app, you would navigate to the formula lab page
  };

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} - ${concept.topic}`}
      backButtonUrl="/dashboard/student/concepts"
      showBackButton={true}
    >
      <div className="space-y-6">
        <ConceptHeader
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic}
          difficulty={concept.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        <EnhancedConceptDetail
          conceptId={conceptId || concept.id}
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic}
          difficulty={concept.difficulty}
          content={concept.content}
          masteryLevel={concept.masteryLevel}
          handleOpenFormulaLab={handleOpenFormulaLab}
        />
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
