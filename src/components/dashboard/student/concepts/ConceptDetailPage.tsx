
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedPageLayout } from '../SharedPageLayout';
import EnhancedConceptDetail from './EnhancedConceptDetail';
import ConceptHeader from './concept-detail/ConceptHeader';
import { useToast } from '@/hooks/use-toast';
import { ConceptCard } from '@/types/user/conceptCard';

// Sample concept data (would normally come from an API/database)
const demoConceptData: ConceptCard = {
  id: "concept-1",
  title: "Newton's Second Law of Motion",
  subject: "Physics",
  topic: "Classical Mechanics",
  difficulty: "medium",
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
  estimatedTime: 25,
  flashcardsTotal: 10,
  flashcardsCompleted: 4,
  recallAccuracy: 75,
  lastPracticed: "2023-07-15",
  quizScore: 70,
  keyPoints: [
    "Force is directly proportional to acceleration",
    "Force is inversely proportional to mass",
    "F = ma is the mathematical representation"
  ],
  formulas: ["F = ma", "a = F/m", "m = F/a"],
  description: "Fundamental law describing the relationship between force, mass, and acceleration."
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [conceptData, setConceptData] = useState<ConceptCard | null>(null);
  const { toast } = useToast();
  
  console.log("ConceptDetailPage - Rendering with conceptId:", conceptId);
  
  useEffect(() => {
    console.log("ConceptDetailPage - useEffect with conceptId:", conceptId);
    // In a real app, you would fetch data based on conceptId here
    // For now, we'll use the demo data
    setConceptData(demoConceptData);
  }, [conceptId]);
  
  if (!conceptData) {
    return (
      <SharedPageLayout
        title="Loading..."
        subtitle="Please wait"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
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

  const handleMasteryUpdate = (newLevel: number) => {
    setConceptData(prev => prev ? {...prev, masteryLevel: newLevel} : null);
    toast({
      title: "Mastery Updated",
      description: `Your mastery level is now ${newLevel}%`,
    });
  };

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} - ${conceptData.topic || 'General Topic'}`}
      backButtonUrl="/dashboard/student/concepts"
      showBackButton={true}
    >
      <div className="space-y-6">
        <ConceptHeader
          title={conceptData.title}
          subject={conceptData.subject}
          topic={conceptData.topic || 'General Topic'}
          difficulty={conceptData.difficulty}
          isBookmarked={isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        <EnhancedConceptDetail
          conceptId={conceptId || conceptData.id}
          title={conceptData.title}
          subject={conceptData.subject}
          topic={conceptData.topic || 'General Topic'}
          difficulty={conceptData.difficulty}
          content={conceptData.content}
          masteryLevel={conceptData.masteryLevel}
          onMasteryUpdate={handleMasteryUpdate}
          handleOpenFormulaLab={handleOpenFormulaLab}
        />
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
