
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Star, Calculator } from 'lucide-react';
import FormulaTabContent from '@/components/dashboard/student/concepts/FormulaTabContent';

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
          className="mb-4 flex items-center gap-1 shadow-sm hover:shadow"
          onClick={handleBackToConcepts}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Concepts</span>
        </Button>

        <Card className="mb-6 border border-gray-100 dark:border-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">{concept.title}</CardTitle>
                <CardDescription className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {concept.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {concept.chapter}
                  </Badge>
                  <Badge variant="outline" className={
                    concept.difficulty === "easy"
                      ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                      : concept.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
                        : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
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
                  <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800 flex items-center">
                    <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                    Recommended
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Progress</h3>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                <span>Mastery</span>
                <span>{concept.mastery}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    concept.mastery >= 80 
                      ? "bg-emerald-500 dark:bg-emerald-400" 
                      : concept.mastery >= 40 
                        ? "bg-yellow-500 dark:bg-yellow-400" 
                        : "bg-red-500 dark:bg-red-400"
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
          <TabsList className="w-full grid grid-cols-4 p-1 bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg">
            <TabsTrigger value="learn" className="rounded-md py-2.5 text-sm font-medium">Learn</TabsTrigger>
            <TabsTrigger value="practice" className="rounded-md py-2.5 text-sm font-medium">Practice</TabsTrigger>
            <TabsTrigger value="formula" className={concept.hasFormulas ? "rounded-md py-2.5 text-sm font-medium" : "hidden"}>
              Formula Lab
            </TabsTrigger>
            <TabsTrigger value="test" className="rounded-md py-2.5 text-sm font-medium">Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learn" className="space-y-4 pt-2">
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow transition-all">
              <CardHeader className="pb-2 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
                <CardTitle className="text-lg font-bold">Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-700 dark:text-gray-300">{concept.content.summary}</p>
                
                <h3 className="font-medium mt-6 mb-3 text-gray-800 dark:text-gray-200">Key Points</h3>
                <ul className="list-disc pl-5 space-y-2.5 text-gray-700 dark:text-gray-300">
                  {concept.content.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                
                <h3 className="font-medium mt-6 mb-3 text-gray-800 dark:text-gray-200">Examples</h3>
                <ul className="list-disc pl-5 space-y-2.5 text-gray-700 dark:text-gray-300">
                  {concept.content.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-4 pt-2">
            <Card>
              <CardHeader className="pb-2 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
                <CardTitle className="text-lg font-bold">Practice Questions</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">Solve these practice questions to strengthen your understanding of {concept.title}.</p>
                <div className="space-y-4">
                  <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-lg shadow-sm">
                    <div className="font-medium mb-2 text-gray-800 dark:text-gray-200">Question 1</div>
                    <p className="text-gray-700 dark:text-gray-300">A block of mass 2 kg is placed on a horizontal surface with a coefficient of friction μ = 0.5. If a force of 15 N is applied horizontally, what is the acceleration of the block?</p>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">View Solution</Button>
                  </div>
                  <div className="border border-gray-100 dark:border-gray-800 p-4 rounded-lg shadow-sm">
                    <div className="font-medium mb-2 text-gray-800 dark:text-gray-200">Question 2</div>
                    <p className="text-gray-700 dark:text-gray-300">A rocket of mass 10,000 kg expels gas at a rate of 50 kg/s with a relative velocity of 3000 m/s. Calculate the thrust produced by the rocket engine.</p>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">View Solution</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="formula" className="space-y-4 pt-2">
            <FormulaTabContent 
              conceptId={id || '1'} 
              conceptTitle={concept.title} 
              handleOpenFormulaLab={handleOpenFormulaLab}
            />
          </TabsContent>
          
          <TabsContent value="test" className="space-y-4 pt-2">
            <Card>
              <CardHeader className="pb-2 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50">
                <CardTitle className="text-lg font-bold">Knowledge Assessment</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">Test your understanding of {concept.title} with this quick assessment.</p>
                <Button size="lg" className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white">Start Assessment</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
