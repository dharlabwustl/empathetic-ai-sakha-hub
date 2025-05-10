
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Star, Check, Flag, Brain, Calculator } from 'lucide-react';

const ConceptDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // Start with the "learn" tab active by default
  const [activeTab, setActiveTab] = useState('learn');

  // In a real app, fetch concept details by ID from API
  // For now, we'll use mock data
  const concept = {
    id: parseInt(id || "1"),
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    description: "Understanding the fundamental principles of motion and forces in classical mechanics.",
    status: "in-progress",
    difficulty: "medium",
    timeEstimate: 20,
    mastery: 65,
    priority: 1,
    cardCount: 15,
    isRecommended: true,
    hasFormulas: true, // Flag to indicate if this concept has formulas
    content: {
      summary: "Newton's three laws of motion describe the relationship between the motion of an object and the forces acting on it. These laws are fundamental to classical mechanics.",
      keyPoints: [
        "First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.",
        "Second Law: The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
        "Third Law: For every action, there is an equal and opposite reaction."
      ],
      examples: [
        "A book on a table remains at rest due to balanced forces (First Law).",
        "Pushing a shopping cart - the acceleration depends on the force applied and the mass of the cart (Second Law).",
        "A rocket expels gas backward, propelling itself forward (Third Law)."
      ]
    }
  };

  const handleBackToConcepts = () => {
    navigate('/dashboard/student/concepts');
  };

  const handleOpenFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${id}/formula-lab`);
  };

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} • ${concept.chapter}`}
    >
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 flex items-center gap-1"
          onClick={handleBackToConcepts}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Concepts</span>
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{concept.title}</CardTitle>
                <CardDescription className="mt-1 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                    {concept.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                    {concept.chapter}
                  </Badge>
                  <Badge variant="outline" className={
                    concept.difficulty === "easy"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : concept.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                  }>
                    {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
                  </Badge>
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{concept.timeEstimate} min</span>
                </div>
                {concept.isRecommended && (
                  <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
                    <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                    Recommended
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Progress</h3>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Mastery</span>
                <span>{concept.mastery}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    concept.mastery >= 80 
                      ? "bg-emerald-500" 
                      : concept.mastery >= 40 
                        ? "bg-yellow-500" 
                        : "bg-red-500"
                  }`} 
                  style={{ width: `${concept.mastery}%` }}
                ></div>
              </div>
            </div>
            <p className="text-muted-foreground">{concept.description}</p>
          </CardContent>
        </Card>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="formula" className={concept.hasFormulas ? "" : "hidden"}>
              Formula Lab
            </TabsTrigger>
            <TabsTrigger value="test">Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learn" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{concept.content.summary}</p>
                
                <h3 className="font-medium mt-4 mb-2">Key Points</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {concept.content.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                
                <h3 className="font-medium mt-4 mb-2">Examples</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {concept.content.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Practice Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Solve these practice questions to strengthen your understanding of {concept.title}.</p>
                <div className="space-y-4">
                  <div className="border p-4 rounded-lg">
                    <div className="font-medium mb-2">Question 1</div>
                    <p>A block of mass 2 kg is placed on a horizontal surface with a coefficient of friction μ = 0.5. If a force of 15 N is applied horizontally, what is the acceleration of the block?</p>
                    <Button className="mt-4">View Solution</Button>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <div className="font-medium mb-2">Question 2</div>
                    <p>A rocket of mass 10,000 kg expels gas at a rate of 50 kg/s with a relative velocity of 3000 m/s. Calculate the thrust produced by the rocket engine.</p>
                    <Button className="mt-4">View Solution</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="formula" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Formula Lab</CardTitle>
                <CardDescription>Practice solving numeric problems with interactive formulas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Strengthen your understanding of {concept.title} by practicing with formula-based problems.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-6 rounded-lg border border-blue-100 dark:border-blue-900/50 mb-6">
                  <h3 className="font-medium text-lg mb-3 text-blue-800 dark:text-blue-300">Key Formulas for {concept.title}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                        <span className="font-medium text-lg">F = m×a</span>
                      </div>
                      <span>Force equals mass times acceleration (Newton's Second Law)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                        <span className="font-medium text-lg">a = F/m</span>
                      </div>
                      <span>Acceleration equals force divided by mass</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                        <span className="font-medium text-lg">F₁ = -F₂</span>
                      </div>
                      <span>For every action, there is an equal and opposite reaction (Newton's Third Law)</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleOpenFormulaLab} 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Open Interactive Formula Lab</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="test" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Knowledge Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Test your understanding of {concept.title} with this quick assessment.</p>
                <Button size="lg" className="w-full">Start Assessment</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
