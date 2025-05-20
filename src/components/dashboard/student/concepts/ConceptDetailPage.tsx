
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedPageLayout } from '../SharedPageLayout';
import EnhancedConceptDetail from './EnhancedConceptDetail';
import ConceptHeader from './concept-detail/ConceptHeader';
import { useToast } from '@/hooks/use-toast';
import { ConceptCard } from '@/types/user/conceptCard';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
    // In a real app, you would fetch data based on conceptId here
    // For now, we'll use the demo data
    setConceptData(demoConceptData);
    
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setConceptData(demoConceptData);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [conceptId]);
  
  if (!conceptData) {
    return (
      <SharedPageLayout
        title="Loading Concept..."
        subtitle="Please wait while we prepare your learning materials"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading concept details...</p>
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
      description: "Opening interactive formula lab environment...",
    });
    // In a real app, you would navigate to the formula lab page or open a modal
  };
  
  const handleShareConcept = () => {
    // Copy link to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    
    toast({
      title: "Link copied!",
      description: "Concept link has been copied to clipboard",
    });
  };

  const handleMasteryUpdate = (newLevel: number) => {
    setConceptData(prev => prev ? {...prev, masteryLevel: newLevel} : null);
    toast({
      title: "Mastery Updated",
      description: `Your mastery level is now ${newLevel}%`,
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} - ${conceptData.topic || 'General Topic'}`}
      backButtonUrl="/dashboard/student/concepts"
      showBackButton={true}
    >
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header with Actions */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center">
              <Link 
                to="/dashboard/student/concepts"
                className="mr-3 p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{conceptData.title}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800/50 hover:bg-purple-200">
                    {conceptData.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/50 hover:bg-blue-200">
                    {conceptData.topic}
                  </Badge>
                  <Badge variant="outline" className={`
                    ${conceptData.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800/50 hover:bg-green-200' : 
                      conceptData.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50 hover:bg-yellow-200' :
                      'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800/50 hover:bg-red-200'
                    }
                  `}>
                    {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5"
                onClick={handleShareConcept}
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={`flex items-center gap-1.5 ${isBookmarked ? 'text-amber-600 border-amber-300 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/20' : ''}`}
                onClick={handleBookmarkToggle}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="h-4 w-4" />
                    Bookmarked
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    Bookmark
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800/30">
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Estimated Time</div>
              <div className="text-lg font-bold mt-1">{conceptData.estimatedTime} min</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-100 dark:border-green-800/30">
              <div className="text-xs text-green-600 dark:text-green-400 font-medium">Mastery Level</div>
              <div className="text-lg font-bold mt-1">{conceptData.masteryLevel}%</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-100 dark:border-amber-800/30">
              <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">Flashcards</div>
              <div className="text-lg font-bold mt-1">{conceptData.flashcardsCompleted}/{conceptData.flashcardsTotal}</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-100 dark:border-purple-800/30">
              <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">Recall Accuracy</div>
              <div className="text-lg font-bold mt-1">{conceptData.recallAccuracy}%</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
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
        </motion.div>
      </motion.div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
