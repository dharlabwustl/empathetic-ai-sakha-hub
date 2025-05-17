
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link as RouterLink } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link as LinkIcon, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ConceptCard } from '@/types/user/conceptCard';

interface LinkedConceptsSectionProps {
  conceptId: string;
  relatedConcepts?: string[];
}

export const LinkedConceptsSection: React.FC<LinkedConceptsSectionProps> = ({
  conceptId,
  relatedConcepts
}) => {
  const [linkedConcepts, setLinkedConcepts] = useState<ConceptCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchRelatedConcepts = async () => {
      setLoading(true);
      
      // Simulating API call for fetching related concepts
      setTimeout(() => {
        // Mock data for related concepts
        const mockRelatedConcepts: ConceptCard[] = [
          {
            id: 'c4',
            title: "Newton's First Law of Motion",
            description: "Understanding inertia and its implications in physics",
            subject: "Physics",
            chapter: "Laws of Motion",
            difficulty: "easy",
            progress: 65,
            content: "Newton's First Law states that an object at rest will remain at rest, and an object in motion will remain in motion at constant velocity, unless acted upon by an external force."
          },
          {
            id: 'c7',
            title: "Newton's Third Law of Motion",
            description: "Every action has an equal and opposite reaction",
            subject: "Physics",
            chapter: "Laws of Motion",
            difficulty: "medium",
            progress: 40,
            content: "Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. This means that forces always occur in pairs."
          },
          {
            id: 'c12',
            title: "Conservation of Momentum",
            description: "Understanding how momentum is conserved in physical systems",
            subject: "Physics",
            chapter: "Momentum",
            difficulty: "hard",
            progress: 20,
            content: "The law of conservation of momentum states that the total momentum of an isolated system remains constant if no external forces act upon the objects in the system."
          }
        ];
        
        setLinkedConcepts(mockRelatedConcepts);
        setLoading(false);
      }, 1000);
    };
    
    if (relatedConcepts && relatedConcepts.length > 0) {
      fetchRelatedConcepts();
    } else {
      setLoading(false);
    }
  }, [relatedConcepts]);
  
  const addRelatedConcept = () => {
    toast({
      title: "Feature in Development",
      description: "Adding custom related concepts will be available soon.",
    });
  };
  
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <LinkIcon className="mr-2 h-6 w-6 text-purple-600" />
          Related Concepts
        </h2>
        
        <Button onClick={addRelatedConcept}>
          <Plus className="mr-2 h-4 w-4" />
          Link Concept
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="h-8 w-8 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
        </div>
      ) : linkedConcepts.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Related Concepts</h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">
            This concept doesn't have any linked related concepts yet. 
            Connected concepts help you understand the broader context.
          </p>
          <Button onClick={addRelatedConcept}>
            <Plus className="mr-2 h-4 w-4" />
            Link a Concept
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {linkedConcepts.map(concept => (
            <Card key={concept.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-1 w-full ${
                concept.difficulty === 'easy' ? 'bg-green-500' :
                concept.difficulty === 'medium' ? 'bg-amber-500' : 'bg-red-500'
              }`}></div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className={getDifficultyColor(concept.difficulty)}>
                      {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                    </Badge>
                    <h3 className="font-semibold text-lg mt-2">{concept.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{concept.description}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{concept.progress}%</span>
                  </div>
                  <Progress value={concept.progress || 0} className="h-1" />
                </div>
                
                <div className="mt-4 flex justify-end">
                  <RouterLink to={`/dashboard/student/concepts/${concept.id}`}>
                    <Button variant="outline" size="sm" className="text-sm">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </RouterLink>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
