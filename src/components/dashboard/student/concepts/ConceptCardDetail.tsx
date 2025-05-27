
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Clock, Star, Target } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ConceptCardDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock concept data
  const concept = {
    id: id || '1',
    title: "Newton's Laws of Motion",
    description: "Understanding the fundamental principles that govern motion and forces",
    subject: "Physics",
    difficulty: "Medium",
    progress: 75,
    content: `
      Newton's Laws of Motion are three fundamental principles that describe the relationship between forces and motion:

      **First Law (Law of Inertia):**
      An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an external force.

      **Second Law:**
      The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma

      **Third Law:**
      For every action, there is an equal and opposite reaction.
    `,
    estimatedTime: 30,
    relatedConcepts: ["Force and Acceleration", "Momentum", "Energy Conservation"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/student/concepts')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Concepts
          </Button>
        </div>

        {/* Main Content */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {concept.title}
                </CardTitle>
                <p className="text-gray-600">{concept.description}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {concept.subject}
                </Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  {concept.difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Progress Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Learning Progress</span>
                <span className="text-blue-600 font-bold">{concept.progress}%</span>
              </div>
              <Progress value={concept.progress} className="h-3" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-blue-700">{concept.estimatedTime}min</div>
                <div className="text-xs text-blue-600">Est. Time</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-green-700">85%</div>
                <div className="text-xs text-green-600">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-purple-700">4.5</div>
                <div className="text-xs text-purple-600">Rating</div>
              </div>
            </div>

            {/* Content */}
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Concept Overview</h3>
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {concept.content}
              </div>
            </div>

            {/* Related Concepts */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Related Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {concept.relatedConcepts.map((related, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {related}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <BookOpen className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
              <Button variant="outline" className="flex-1">
                <Target className="h-4 w-4 mr-2" />
                Practice Problems
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
