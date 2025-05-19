
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import EnhancedConceptDetail from '@/components/dashboard/student/concepts/EnhancedConceptDetail';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Clock, Brain, ArrowLeft, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{conceptId: string}>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [masteryLevel, setMasteryLevel] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mock concept data - in a real app this would be fetched from an API
  const conceptData = {
    id: conceptId || 'default',
    title: "Understanding Cell Division",
    subject: "Biology",
    topic: "Cell Biology",
    difficulty: "medium" as const,
    masteryLevel: 65, // This would come from user's data
    estimatedTime: 15, // in minutes
    content: `Cell division is the process by which a parent cell divides into two or more daughter cells. 
      Cell division usually occurs as part of a larger cell cycle. In eukaryotes, there are two distinct 
      types of cell division: mitosis and meiosis. Mitosis is for growth and repair, while meiosis is for sexual reproduction.
      
      The cell cycle consists of interphase (G₁, S, and G₂ phases) and the mitotic phase (mitosis and cytokinesis). 
      During interphase, the cell grows and DNA replication occurs. In mitosis, the replicated chromosomes are separated 
      into two nuclei, and cytokinesis divides the cytoplasm, organelles, and cell membrane.`
  };

  // Update mastery level when concept changes
  useEffect(() => {
    setMasteryLevel(conceptData.masteryLevel);
    
    // Simulate loading state
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [conceptId, conceptData.masteryLevel]);

  // Show concept loaded toast
  useEffect(() => {
    if (!isLoading) {
      toast({
        title: "Concept Loaded",
        description: `Viewing details for: ${conceptData.title}`,
        duration: 3000,
      });
    }
  }, [isLoading, toast, conceptData.title]);

  // Handle mastery level updates (this would connect to backend in real app)
  const updateMasteryLevel = (newLevel: number) => {
    setMasteryLevel(newLevel);
    toast({
      title: "Mastery Updated",
      description: `Your mastery level is now ${newLevel}%`,
      duration: 3000,
    });
  };

  const handleGoBack = () => {
    navigate('/dashboard/student/concepts');
  };

  // Loading state with skeleton UI
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="h-8 w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-6">
      {/* Header with background pattern */}
      <div className="absolute top-0 right-0 w-full h-48 overflow-hidden opacity-10">
        <div className="w-full h-full bg-blue-600 dark:bg-blue-900 pattern-dots pattern-blue-500 dark:pattern-blue-700 pattern-bg-white dark:pattern-bg-gray-900 pattern-size-4"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navigation and title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-2 hover:bg-blue-100 dark:hover:bg-blue-900/30"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Concepts
            </Button>
            <motion.h1 
              className="text-2xl md:text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {conceptData.title}
            </motion.h1>
            <motion.p 
              className="text-gray-500 dark:text-gray-400 mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {conceptData.subject} &gt; {conceptData.topic}
            </motion.p>
          </div>
          
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mr-3">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="flex items-baseline">
                <span className="text-lg font-bold">{masteryLevel}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Mastery</span>
              </div>
              <div className="w-36 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    masteryLevel > 80 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                    masteryLevel > 50 ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 
                    masteryLevel > 30 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 
                    'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{ width: `${masteryLevel}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Tags section */}
        <motion.div 
          className="flex flex-wrap gap-2 items-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Badge variant="outline" className={`px-3 py-1 text-sm font-medium ${
            conceptData.difficulty === 'easy' 
              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : 
            conceptData.difficulty === 'medium' 
              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' : 
            'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
          }`}>
            {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)} Difficulty
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
            <BookOpen className="h-3 w-3" /> {conceptData.subject}
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400">
            <Clock className="h-3 w-3" /> {conceptData.estimatedTime} min
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400">
            <Star className="h-3 w-3" /> Popular Concept
          </Badge>
          
          {masteryLevel >= 80 && (
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              <Award className="h-3 w-3" /> Mastered
            </Badge>
          )}
        </motion.div>
        
        {masteryLevel < 30 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400">
              <AlertDescription>
                Your mastery level for this concept is low. Focus on the content and try the practice quizzes to improve your understanding.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <EnhancedConceptDetail 
            conceptId={conceptData.id}
            title={conceptData.title}
            subject={conceptData.subject}
            topic={conceptData.topic}
            difficulty={conceptData.difficulty}
            content={conceptData.content}
            masteryLevel={masteryLevel}
            onMasteryUpdate={updateMasteryLevel}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
