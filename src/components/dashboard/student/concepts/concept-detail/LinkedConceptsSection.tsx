
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ArrowRight, BarChart2, Layers, BookOpen, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface LinkedConcept {
  id: string;
  title: string;
  subject: string;
  topic: string;
  masteryLevel: number;
  isAccessible: boolean;
}

interface LinkedConceptsSectionProps {
  conceptId: string;
  subject: string;
  topic: string;
}

const LinkedConceptsSection: React.FC<LinkedConceptsSectionProps> = ({
  conceptId,
  subject,
  topic
}) => {
  const navigate = useNavigate();
  const [linkedConcepts, setLinkedConcepts] = useState<LinkedConcept[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data fetching of linked concepts
  useEffect(() => {
    const fetchLinkedConcepts = async () => {
      setIsLoading(true);
      
      // In a real app, this would be an API call to fetch linked concepts
      setTimeout(() => {
        // Mock data for linked concepts
        const mockLinkedConcepts: LinkedConcept[] = [
          {
            id: 'c1',
            title: 'Newton\'s First Law of Motion',
            subject: 'Physics',
            topic: 'Classical Mechanics',
            masteryLevel: 75,
            isAccessible: true
          },
          {
            id: 'c2',
            title: 'Newton\'s Third Law of Motion',
            subject: 'Physics',
            topic: 'Classical Mechanics',
            masteryLevel: 45,
            isAccessible: true
          },
          {
            id: 'c3',
            title: 'Momentum Conservation',
            subject: 'Physics',
            topic: 'Classical Mechanics',
            masteryLevel: 60,
            isAccessible: true
          },
          {
            id: 'c4',
            title: 'Circular Motion',
            subject: 'Physics',
            topic: 'Classical Mechanics',
            masteryLevel: 30,
            isAccessible: true
          },
          {
            id: 'c5',
            title: 'Advanced Applications in Mechanics',
            subject: 'Physics',
            topic: 'Classical Mechanics',
            masteryLevel: 0,
            isAccessible: false
          }
        ];
        
        setLinkedConcepts(mockLinkedConcepts);
        setIsLoading(false);
      }, 1000);
    };

    fetchLinkedConcepts();
  }, [conceptId]);

  const handleNavigateToLinkedConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
      </div>
    );
  }

  const getMasteryLevelColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-blue-500";
    if (level >= 40) return "bg-yellow-500";
    if (level > 0) return "bg-red-500";
    return "bg-gray-300 dark:bg-gray-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium flex items-center">
          <Layers className="h-5 w-5 mr-2 text-indigo-500" /> Related Concepts
        </h2>
        <Badge variant="outline" className="text-xs">
          {linkedConcepts.length} related concepts found
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {linkedConcepts.map((concept) => (
          <Card 
            key={concept.id}
            className={`overflow-hidden ${concept.isAccessible ? "hover:border-blue-300" : "opacity-80"}`}
          >
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium line-clamp-2">{concept.title}</h3>
                  {!concept.isAccessible && (
                    <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800">
                      <Lock className="h-3 w-3 mr-1" /> Premium
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {concept.subject} • {concept.topic}
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span>Mastery Level</span>
                    <span>{concept.masteryLevel}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getMasteryLevelColor(concept.masteryLevel)}`}
                      style={{ width: `${concept.masteryLevel}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-1"
                    onClick={() => concept.isAccessible && handleNavigateToLinkedConcept(concept.id)}
                    disabled={!concept.isAccessible}
                  >
                    {concept.isAccessible ? (
                      <>
                        <BookOpen className="h-4 w-4 mr-1" />
                        Study Concept
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-1" />
                        Upgrade to Access
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LinkedConceptsSection;
