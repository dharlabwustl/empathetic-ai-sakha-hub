
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Target, 
  ChevronRight, 
  Clock, 
  Star,
  Download,
  Share,
  Bookmark
} from 'lucide-react';
import { MoodType } from '@/types/user/base';

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock concept data - in real app, this would come from API
  const concept = {
    id: conceptId,
    title: "Quadratic Equations",
    subject: "Mathematics",
    difficulty: "Intermediate",
    estimatedTime: "45 minutes",
    description: "Master quadratic equations, their solutions, and real-world applications.",
    prerequisites: ["Linear Equations", "Basic Algebra", "Factoring"],
    learningObjectives: [
      "Understand the standard form of quadratic equations",
      "Solve quadratic equations using factoring",
      "Apply the quadratic formula",
      "Analyze discriminant and nature of roots",
      "Graph quadratic functions and identify key features"
    ],
    difficulty_level: 3,
    rating: 4.8,
    completions: 1247,
    mood_compatibility: {
      [MoodType.Focused]: 95,
      [MoodType.Motivated]: 90,
      [MoodType.Neutral]: 75,
      [MoodType.Tired]: 40
    }
  };

  const handleBack = () => {
    navigate('/dashboard/student/concepts');
  };

  const handleStartLearning = () => {
    setActiveTab('content');
    setProgress(10);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Concepts
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{concept.title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="outline">{concept.subject}</Badge>
              <Badge variant="outline">{concept.difficulty}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{concept.rating}</span>
              </div>
              <span className="text-sm text-gray-500">{concept.completions} completions</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleBookmark}>
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Concept</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{concept.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {concept.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {concept.difficulty} Level
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {concept.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {concept.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <BookOpen className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    {progress === 0 ? (
                      <Button className="w-full" onClick={handleStartLearning}>
                        Start Learning
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline">
                        Continue Learning
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mood Compatibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">When Focused</span>
                      <Badge className="bg-green-100 text-green-800">95% match</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">When Motivated</span>
                      <Badge className="bg-blue-100 text-blue-800">90% match</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">When Neutral</span>
                      <Badge className="bg-yellow-100 text-yellow-800">75% match</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">When Tired</span>
                      <Badge className="bg-red-100 text-red-800">40% match</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Learning Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold mb-4">1. Introduction to Quadratic Equations</h3>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      A quadratic equation is a polynomial equation of degree 2. The general form is:
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="text-center">
                        <code className="text-lg font-mono">ax² + bx + c = 0</code>
                      </div>
                      <p className="text-sm mt-2 text-gray-600">
                        Where a, b, and c are constants and a ≠ 0
                      </p>
                    </div>
                    <p>
                      The term "quadratic" comes from the Latin word "quadratus" meaning square, 
                      referring to the x² term which is the highest power in the equation.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">2. Methods of Solving</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Factoring Method</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        When the quadratic can be factored into two binomials
                      </p>
                      <code className="text-sm">x² - 5x + 6 = (x - 2)(x - 3)</code>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Quadratic Formula</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Universal method that works for all quadratics
                      </p>
                      <code className="text-sm">x = (-b ± √(b² - 4ac)) / 2a</code>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-4">3. The Discriminant</h3>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="mb-3">
                      The discriminant (b² - 4ac) tells us about the nature of the roots:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• If discriminant > 0: Two distinct real roots</li>
                      <li>• If discriminant = 0: One repeated real root</li>
                      <li>• If discriminant < 0: Two complex roots</li>
                    </ul>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Practice Problems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Problem 1: Basic Factoring</h4>
                    <Badge className="bg-green-100 text-green-800">Easy</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Solve the quadratic equation by factoring: x² - 7x + 12 = 0
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">Start Problem</Button>
                    <Button size="sm" variant="outline">View Hint</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Problem 2: Quadratic Formula</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Use the quadratic formula to solve: 2x² + 5x - 3 = 0
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">Start Problem</Button>
                    <Button size="sm" variant="outline">View Hint</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium">Problem 3: Word Problem</h4>
                    <Badge className="bg-red-100 text-red-800">Hard</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    A ball is thrown upward with an initial velocity of 20 m/s from a height of 5 meters. 
                    The height h(t) = -5t² + 20t + 5. When will the ball hit the ground?
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">Start Problem</Button>
                    <Button size="sm" variant="outline">View Hint</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Personal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg">
                  <textarea
                    className="w-full h-48 p-4 border-0 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add your notes about quadratic equations here..."
                    defaultValue="Key points to remember:
- The general form is ax² + bx + c = 0
- Always check if a ≠ 0
- Discriminant helps determine the nature of roots
- Practice factoring first, then use quadratic formula for complex cases"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline">Auto-save enabled</Button>
                  <Button>Save Notes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetailPage;
