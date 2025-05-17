
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Link, ExternalLink, ArrowRightLeft } from 'lucide-react';

interface LinkedConceptsSectionProps {
  conceptId: string;
  relatedConcepts?: string[];
}

interface RelatedConcept {
  id: string;
  title: string;
  subject: string;
  relationship: 'prerequisite' | 'extension' | 'similar' | 'application';
  description?: string;
}

export const LinkedConceptsSection: React.FC<LinkedConceptsSectionProps> = ({ 
  conceptId,
  relatedConcepts = []
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // For now, generate mock related concepts based on the IDs provided
  const mockRelatedConcepts: RelatedConcept[] = relatedConcepts?.map((id, index) => {
    // Generate mock data for each related concept
    const relationships = ['prerequisite', 'extension', 'similar', 'application'];
    const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
    
    return {
      id,
      title: `Related Concept ${index + 1}`,
      subject: subjects[index % subjects.length],
      relationship: relationships[index % relationships.length] as 'prerequisite' | 'extension' | 'similar' | 'application',
      description: `This concept relates to the main concept through ${relationships[index % relationships.length]} relationship.`
    };
  }) || [];
  
  // Add some additional mock data if none provided
  if (mockRelatedConcepts.length === 0) {
    mockRelatedConcepts.push(
      {
        id: 'related-1',
        title: 'Conservation of Energy',
        subject: 'Physics',
        relationship: 'similar',
        description: 'Understanding energy conservation is closely related to Newton\'s laws.'
      },
      {
        id: 'related-2',
        title: 'Momentum and Impulse',
        subject: 'Physics',
        relationship: 'extension',
        description: 'Extends the concepts of force and motion into collisions and interactions.'
      }
    );
  }
  
  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'prerequisite': 
        return <ArrowRightLeft className="h-4 w-4 text-blue-600" />;
      case 'extension': 
        return <ExternalLink className="h-4 w-4 text-purple-600" />;
      case 'similar': 
        return <Link className="h-4 w-4 text-green-600" />;
      case 'application': 
        return <Link className="h-4 w-4 text-amber-600" />;
      default:
        return <Link className="h-4 w-4 text-gray-600" />;
    }
  };
  
  const getRelationshipClass = (relationship: string) => {
    switch (relationship) {
      case 'prerequisite': return 'bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800';
      case 'extension': return 'bg-purple-50 border-purple-100 dark:bg-purple-900/20 dark:border-purple-800';
      case 'similar': return 'bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800';
      case 'application': return 'bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800';
      default: return 'bg-gray-50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-700';
    }
  };
  
  const navigateToConcept = (id: string) => {
    navigate(`/dashboard/student/concepts/detail/${id}`);
    toast({
      title: "Navigating to related concept",
      description: "Loading concept details",
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Link className="mr-2 h-6 w-6 text-blue-600" />
          Related Concepts
        </h2>
      </div>
      
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Explore concepts that are related to the current topic to deepen your understanding 
          and see how different ideas connect to each other.
        </p>
        
        {mockRelatedConcepts.length === 0 ? (
          <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
            <Link className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Related Concepts</h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              There are no concepts linked to this one yet. 
              Understanding connections between concepts helps create a deeper knowledge network.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRelatedConcepts.map(concept => (
              <Card 
                key={concept.id} 
                className={`border ${getRelationshipClass(concept.relationship)} hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {getRelationshipIcon(concept.relationship)}
                    </div>
                    <div>
                      <h3 className="font-medium">{concept.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{concept.subject}</p>
                      {concept.description && <p className="text-sm mb-3">{concept.description}</p>}
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigateToConcept(concept.id)}
                        >
                          Explore Concept
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
