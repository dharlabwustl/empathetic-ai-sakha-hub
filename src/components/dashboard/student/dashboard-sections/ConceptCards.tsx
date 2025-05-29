
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConceptCards: React.FC = () => {
  const concepts = [
    { subject: 'Physics', topic: 'Thermodynamics', progress: 80, difficulty: 'Medium' },
    { subject: 'Chemistry', topic: 'Organic Reactions', progress: 45, difficulty: 'Hard' },
    { subject: 'Biology', topic: 'Cell Division', progress: 90, difficulty: 'Easy' }
  ];

  return (
    <Card id="concept-cards">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Concept Cards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {concepts.map((concept, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-sm">{concept.topic}</p>
                <p className="text-xs text-gray-500">{concept.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {concept.difficulty}
              </Badge>
              <span className="text-xs text-gray-500">{concept.progress}%</span>
            </div>
          </div>
        ))}
        
        <Link to="/dashboard/student/concepts">
          <Button variant="outline" className="w-full">
            <BookOpen className="h-4 w-4 mr-2" />
            View All Concepts
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ConceptCards;
