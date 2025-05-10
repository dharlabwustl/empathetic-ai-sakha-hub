
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, BookOpen, FileText, CheckCircle, ArrowLeft, Clock, Award, BarChart, Calculator, Info, ChevronRight, ArrowRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ConceptCardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample concept cards data (in a real app, this would come from an API)
  const conceptCards = [
    {
      id: '1',
      title: 'Cell Structure and Functions',
      description: 'Learn about cell organelles and their functions in the cell.',
      subject: 'Biology',
      chapter: 'Cell Biology',
      importanceLevel: 'high',
      lastStudied: '2 days ago',
      masteryLevel: 85,
      content: `
        <h2>Cell Structure and Functions</h2>
        <p>A cell is the smallest functional unit of life. All living organisms are made up of cells, from single-celled organisms like bacteria to complex multicellular organisms like humans.</p>
        <h3>Major Components of a Cell</h3>
        <ul>
          <li><strong>Cell Membrane:</strong> A selectively permeable barrier that regulates what enters and leaves the cell.</li>
          <li><strong>Cytoplasm:</strong> A gel-like substance where cellular organelles are suspended and various chemical reactions occur.</li>
          <li><strong>Nucleus:</strong> The control center of the cell that contains genetic material (DNA).</li>
        </ul>
        <h3>Cell Organelles and Their Functions</h3>
        <ul>
          <li><strong>Mitochondria:</strong> The powerhouse of the cell, responsible for cellular respiration and energy production.</li>
          <li><strong>Ribosomes:</strong> Sites of protein synthesis.</li>
          <li><strong>Endoplasmic Reticulum:</strong> Involved in protein and lipid synthesis and transport.</li>
          <li><strong>Golgi Apparatus:</strong> Modifies, packages, and distributes proteins to their final destinations.</li>
          <li><strong>Lysosomes:</strong> Contain digestive enzymes that break down cellular waste and debris.</li>
          <li><strong>Vacuoles:</strong> Storage organelles for various substances.</li>
          <li><strong>Chloroplasts (in plant cells only):</strong> Sites of photosynthesis.</li>
        </ul>
      `,
      keyPoints: [
        'Cells are the basic structural and functional units of all living organisms.',
        'Each cell organelle has a specific function essential for cell survival.',
        'Eukaryotic cells have membrane-bound organelles, while prokaryotic cells don't.',
        'Plant cells have cell walls, chloroplasts and large vacuoles that animal cells lack.'
      ],
      relatedCards: [
        { id: '3', title: 'Cellular Respiration', subject: 'Biology' },
        { id: '7', title: 'Cell Division', subject: 'Biology' }
      ],
      examAppearance: 'High',
      interactiveCards: [
        { id: '2', title: 'Identify Cell Organelles', type: 'Interactive Quiz' },
        { id: '5', title: 'Cell Structure Simulation', type: 'Interactive Model' }
      ],
      examCards: [
        { id: '12', title: 'Cell Theory MCQs', type: 'Multiple Choice Questions' },
        { id: '15', title: 'Cell Organelles Case Studies', type: 'Short Answer Questions' }
      ]
    },
    {
      id: '2',
      title: 'Newton\'s Laws of Motion',
      description: 'Study the three fundamental laws that explain the relationship between an object and the forces acting on it.',
      subject: 'Physics',
      chapter: 'Classical Mechanics',
      importanceLevel: 'high',
      lastStudied: '1 week ago',
      masteryLevel: 70,
      content: `
        <h2>Newton's Laws of Motion</h2>
        <p>Sir Isaac Newton formulated three laws that explain the relationship between an object and the forces acting upon it, and its motion in response to those forces.</p>
        <h3>First Law (Law of Inertia)</h3>
        <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.</p>
        <h3>Second Law (F = ma)</h3>
        <p>The acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass. Mathematically, F = ma.</p>
        <h3>Third Law (Action-Reaction)</h3>
        <p>For every action, there is an equal and opposite reaction. If object A exerts a force on object B, then object B exerts a force of equal magnitude but opposite direction on object A.</p>
        <h3>Applications</h3>
        <ul>
          <li>Rocket propulsion</li>
          <li>Car safety features</li>
          <li>Sports mechanics</li>
          <li>Structural engineering</li>
        </ul>
      `,
      keyPoints: [
        'Newton's First Law describes inertia, the tendency of objects to resist changes in motion.',
        'Newton's Second Law quantifies the relationship between force, mass, and acceleration.',
        'Newton's Third Law explains the reciprocal nature of forces.',
        'These laws form the foundation of classical mechanics.'
      ],
      relatedCards: [
        { id: '6', title: 'Work and Energy', subject: 'Physics' },
        { id: '8', title: 'Momentum and Collisions', subject: 'Physics' }
      ],
      examAppearance: 'Very High',
      interactiveCards: [
        { id: '9', title: 'Newton\'s Cradle Simulation', type: 'Interactive Model' },
        { id: '11', title: 'Forces and Motion Lab', type: 'Virtual Experiment' }
      ],
      examCards: [
        { id: '14', title: 'Newton\'s Laws Problems', type: 'Numerical Problems' },
        { id: '18', title: 'Force Diagrams Analysis', type: 'Short Answer Questions' }
      ],
      formulas: [
        { id: '1', name: 'Second Law of Motion', formula: 'F = ma' },
        { id: '2', name: 'Weight Calculation', formula: 'W = mg' }
      ]
    }
  ];

  // Find the current concept card
  const conceptCard = conceptCards.find(card => card.id === id);

  if (!conceptCard) {
    return (
      <SharedPageLayout title="Concept Not Found" showBackButton={true}>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-center mb-4">The requested concept card could not be found.</p>
          <Button onClick={() => navigate('/dashboard/student/concepts')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Concept Cards
          </Button>
        </div>
      </SharedPageLayout>
    );
  }

  const handleFormulaLabClick = () => {
    navigate('/dashboard/student/formula-practice-lab');
  };

  const handleInteractiveClick = (id: string) => {
    navigate(`/dashboard/student/interactive/${id}`);
  };

  const handleExamCardClick = (id: string) => {
    navigate(`/dashboard/student/exam-card/${id}`);
  };

  const handleRelatedCardClick = (id: string) => {
    navigate(`/dashboard/student/concepts/${id}`);
  };

  return (
    <TooltipProvider>
      <SharedPageLayout
        title={conceptCard.title}
        subtitle={`${conceptCard.subject} | ${conceptCard.chapter}`}
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="space-y-6">
          {/* Top information cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-violet-500" />
                  Mastery Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl font-bold">{conceptCard.masteryLevel}%</span>
                  <Badge 
                    variant={conceptCard.masteryLevel > 80 ? "outline" : "secondary"}
                    className={
                      conceptCard.masteryLevel > 80 ? "bg-green-50 text-green-700 border-green-200" : 
                      conceptCard.masteryLevel > 50 ? "bg-amber-50 text-amber-700 border-amber-200" : 
                      "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {conceptCard.masteryLevel > 80 ? "Mastered" : 
                     conceptCard.masteryLevel > 50 ? "Learning" : 
                     "Needs Work"}
                  </Badge>
                </div>
                <Progress value={conceptCard.masteryLevel} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  Last Review
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-lg">{conceptCard.lastStudied}</span>
                <Button variant="outline" size="sm">Review Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <Award className="h-4 w-4 mr-2 text-amber-500" />
                  Exam Frequency
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-lg">{conceptCard.examAppearance}</span>
                <Badge 
                  variant={
                    conceptCard.examAppearance === 'Very High' || conceptCard.examAppearance === 'High' 
                      ? "destructive" 
                      : "secondary"
                  }
                >
                  {conceptCard.examAppearance === 'Very High' ? "Important" : "Moderate"}
                </Badge>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content tabs */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="overview">
                <Info className="h-4 w-4 mr-2 md:mr-1" />
                <span className="hidden md:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="interactive">
                <Brain className="h-4 w-4 mr-2 md:mr-1" />
                <span className="hidden md:inline">Interactive Cards</span>
              </TabsTrigger>
              <TabsTrigger value="exam-prep">
                <FileText className="h-4 w-4 mr-2 md:mr-1" />
                <span className="hidden md:inline">Exam Cards</span>
              </TabsTrigger>
              <TabsTrigger value="formulas">
                <Calculator className="h-4 w-4 mr-2 md:mr-1" />
                <span className="hidden md:inline">Formulas</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>
                    Study the complete concept or focus on key points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose dark:prose-invert max-w-none" 
                    dangerouslySetInnerHTML={{ __html: conceptCard.content }}
                  />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Key Points */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Key Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {conceptCard.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Related Cards */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-violet-500" />
                      Related Concepts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {conceptCard.relatedCards.map(related => (
                      <Tooltip key={related.id}>
                        <TooltipTrigger asChild>
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleRelatedCardClick(related.id)}
                          >
                            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                              <div>
                                <p className="font-medium">{related.title}</p>
                                <p className="text-xs text-gray-500">{related.subject}</p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">View related concept card</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="interactive" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-blue-500" />
                    Interactive Learning Cards
                  </CardTitle>
                  <CardDescription>
                    Practice with interactive exercises to reinforce your understanding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conceptCard.interactiveCards && conceptCard.interactiveCards.length > 0 ? (
                    conceptCard.interactiveCards.map(card => (
                      <Tooltip key={card.id}>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleInteractiveClick(card.id)}
                          >
                            <Card className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-blue-500">
                              <CardHeader className="py-3">
                                <div className="flex justify-between">
                                  <CardTitle className="text-base">{card.title}</CardTitle>
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {card.type}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardFooter className="pt-0">
                                <Button size="sm" className="ml-auto">
                                  Open <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Open interactive learning card</p>
                        </TooltipContent>
                      </Tooltip>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No interactive cards available for this concept yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exam-prep" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-amber-500" />
                    Exam Preparation Cards
                  </CardTitle>
                  <CardDescription>
                    Practice with exam-style questions related to this concept
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conceptCard.examCards && conceptCard.examCards.length > 0 ? (
                    conceptCard.examCards.map(card => (
                      <Tooltip key={card.id}>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleExamCardClick(card.id)}
                          >
                            <Card className="cursor-pointer hover:shadow-md transition-all border-l-4 border-l-amber-500">
                              <CardHeader className="py-3">
                                <div className="flex justify-between">
                                  <CardTitle className="text-base">{card.title}</CardTitle>
                                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                    {card.type}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardFooter className="pt-0">
                                <Button variant="outline" size="sm" className="ml-auto">
                                  Practice <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Practice with exam questions</p>
                        </TooltipContent>
                      </Tooltip>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No exam cards available for this concept yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="formulas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-green-500" />
                    Related Formulas
                  </CardTitle>
                  <CardDescription>
                    Learn and practice formulas related to this concept
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {conceptCard.formulas ? (
                    <div className="space-y-4">
                      {conceptCard.formulas.map((formula, index) => (
                        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                          <p className="font-medium">{formula.name}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="font-mono text-lg">{formula.formula}</p>
                            <Button variant="outline" size="sm">
                              Practice
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-center mt-6">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button 
                                className="bg-gradient-to-r from-green-600 to-emerald-600"
                                onClick={handleFormulaLabClick}
                              >
                                Open Formula Lab
                                <Calculator className="ml-2 h-4 w-4" />
                              </Button>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Practice with interactive formula problems</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-6">No specific formulas found for this concept.</p>
                      <Button onClick={handleFormulaLabClick}>
                        Browse Formula Lab <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SharedPageLayout>
    </TooltipProvider>
  );
};

export default ConceptCardDetail;
