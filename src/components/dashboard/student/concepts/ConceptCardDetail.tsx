
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Star, ArrowLeft } from 'lucide-react';

interface ConceptCardDetailProps {
  conceptId: string;
  onBack: () => void;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ conceptId, onBack }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock concept data
  const concept = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    difficulty: "Medium",
    duration: 30,
    description: "Understanding the fundamental principles of motion and forces.",
    content: "Newton's three laws of motion form the foundation of classical mechanics..."
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{concept.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Concept Overview
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Star className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline">{concept.subject}</Badge>
              <Badge variant={concept.difficulty === 'Easy' ? 'default' : concept.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                {concept.difficulty}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{concept.duration} min</span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400">{concept.description}</p>
            
            <div className="prose dark:prose-invert max-w-none">
              <p>{concept.content}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptCardDetail;
