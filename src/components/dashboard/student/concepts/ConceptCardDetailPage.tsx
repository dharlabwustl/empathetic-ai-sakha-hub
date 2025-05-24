
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Brain, Clock, Star, CheckCircle, Play, Pause, RotateCcw } from 'lucide-react';

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  description: string;
  keyPoints: string[];
  examples: string[];
  relatedTopics: string[];
  progress: number;
  mastered: boolean;
}

const ConceptCardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [isStudying, setIsStudying] = useState(false);

  useEffect(() => {
    // Simulate fetching concept data
    const mockConcept: ConceptCard = {
      id: id || '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      difficulty: 'Intermediate',
      estimatedTime: '45 minutes',
      description: 'Understanding the three fundamental laws that form the foundation of classical mechanics.',
      keyPoints: [
        'First Law: An object at rest stays at rest, an object in motion stays in motion',
        'Second Law: F = ma (Force equals mass times acceleration)',
        'Third Law: For every action, there is an equal and opposite reaction'
      ],
      examples: [
        'A book sitting on a table (First Law)',
        'Pushing a shopping cart (Second Law)',
        'Walking on the ground (Third Law)'
      ],
      relatedTopics: ['Force', 'Momentum', 'Energy'],
      progress: 65,
      mastered: false
    };
    setConcept(mockConcept);
  }, [id]);

  const handleStartStudying = () => {
    setIsStudying(true);
  };

  const handleMarkComplete = () => {
    if (concept) {
      setConcept({ ...concept, progress: 100, mastered: true });
    }
  };

  if (!concept) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/student/concepts')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Concepts
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{concept.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{concept.subject}</Badge>
              <Badge variant={concept.difficulty === 'Beginner' ? 'default' : concept.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                {concept.difficulty}
              </Badge>
              <span className="text-sm text-gray-600 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {concept.estimatedTime}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">{concept.progress}%</span>
            </div>
            <Progress value={concept.progress} className="w-32" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">{concept.description}</p>
              
              <h3 className="font-semibold mb-3">Key Points</h3>
              <ul className="space-y-2 mb-6">
                {concept.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="font-semibold mb-3">Examples</h3>
              <ul className="space-y-2">
                {concept.examples.map((example, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Study Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full" 
                onClick={handleStartStudying}
                disabled={isStudying}
              >
                {isStudying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Studying...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Studying
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleMarkComplete}
                disabled={concept.mastered}
              >
                {concept.mastered ? 'Completed' : 'Mark as Complete'}
              </Button>
              
              <Button variant="outline" className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Review Again
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Related Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {concept.relatedTopics.map((topic, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate(`/dashboard/student/concepts/${topic.toLowerCase()}`)}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;
