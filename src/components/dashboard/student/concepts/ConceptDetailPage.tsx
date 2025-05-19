
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import EnhancedConceptDetail from '@/components/dashboard/student/concepts/EnhancedConceptDetail';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Clock, Brain } from 'lucide-react';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{conceptId: string}>();
  const { toast } = useToast();
  const [masteryLevel, setMasteryLevel] = useState<number>(0);

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
  }, [conceptId, conceptData.masteryLevel]);

  // Show concept loaded toast
  useEffect(() => {
    toast({
      title: "Concept Loaded",
      description: `Viewing details for: ${conceptData.title}`,
      duration: 3000,
    });
  }, [conceptId, toast, conceptData.title]);

  // Handle mastery level updates (this would connect to backend in real app)
  const updateMasteryLevel = (newLevel: number) => {
    setMasteryLevel(newLevel);
    toast({
      title: "Mastery Updated",
      description: `Your mastery level is now ${newLevel}%`,
      duration: 3000,
    });
  };

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} > ${conceptData.topic}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant={
            conceptData.difficulty === 'easy' ? 'outline' :
            conceptData.difficulty === 'medium' ? 'secondary' :
            'destructive'
          } className="px-3 py-1 text-sm">
            {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)} Difficulty
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
            <BookOpen className="h-3 w-3" /> {conceptData.subject}
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400">
            <Clock className="h-3 w-3" /> {conceptData.estimatedTime} min
          </Badge>
        </div>
        
        <div className="flex items-center">
          <Brain className="h-5 w-5 text-blue-600 mr-2" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Mastery Level</span>
            <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  masteryLevel > 80 ? 'bg-green-500' : 
                  masteryLevel > 50 ? 'bg-blue-500' : 
                  masteryLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${masteryLevel}%` }}
              />
            </div>
            <span className="text-xs text-right mt-1">{masteryLevel}%</span>
          </div>
        </div>
      </div>
      
      {masteryLevel < 30 && (
        <Alert className="mb-6 bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400">
          <AlertDescription>
            Your mastery level for this concept is low. Focus on the content and try the practice quizzes to improve your understanding.
          </AlertDescription>
        </Alert>
      )}

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
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
