
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ConceptsPageLayout } from '../concept-cards/ConceptsPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Eye, 
  Video, 
  Cube, 
  Beaker, 
  AlertTriangle,
  BrainCircuit,
  BarChart,
  RotateCcw,
  MessageSquare,
  StickyNote,
  CheckCircle2,
  Star,
  Clock,
  BarChart3,
  BookMarked,
  Bookmark,
  Share2,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

// Import the specific tab content components
import { FormulaTabContent } from './FormulaTabContent';
import AIInsightsSection from './AIInsightsSection';
import ConceptAnalyticsSection from './ConceptAnalyticsSection';

interface ConceptDetailPageProps {}

const ConceptDetailPage: React.FC<ConceptDetailPageProps> = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeMainTab, setActiveMainTab] = useState('learn');
  const [activeSubTab, setActiveSubTab] = useState('text');
  const [showFormulaLab, setShowFormulaLab] = useState(false);
  
  // Mock concept data - in a real app, you would fetch this from an API
  const concept = {
    id: conceptId || 'concept-1',
    title: 'Newton\'s Laws of Motion',
    description: 'Fundamental principles that describe the relationship between the motion of an object and the forces acting on it.',
    subject: 'Physics',
    chapter: 'Mechanics',
    difficulty: 'medium',
    estimatedTime: '25 min',
    masteryLevel: 65,
    prerequisites: ['Basic Kinematics', 'Vector Analysis'],
    relatedConcepts: [
      { id: 'concept-force', title: 'Force and Pressure' },
      { id: 'concept-momentum', title: 'Momentum and Impulse' },
      { id: 'concept-energy', title: 'Work and Energy' }
    ],
    content: {
      text: `<p>Newton's laws of motion are three physical laws that describe the relationship between the motion of an object and the forces acting on it. These laws laid the foundation for classical mechanics.</p>
             <h3>First Law (Law of Inertia)</h3>
             <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.</p>
             <h3>Second Law (F = ma)</h3>
             <p>The acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass. F = ma</p>
             <h3>Third Law (Action-Reaction)</h3>
             <p>For every action, there is an equal and opposite reaction.</p>`,
      visual: "Diagrams showing examples of each law",
      simulation: "3D simulation of objects demonstrating Newton's laws",
      formulas: [
        { name: "Second Law", formula: "F = m × a", variables: ["F: force", "m: mass", "a: acceleration"] }
      ],
      video: "https://www.youtube.com/embed/example",
      commonMistakes: [
        "Forgetting that Newton's first law applies to objects in motion, not just objects at rest",
        "Confusing mass and weight when applying the second law",
        "Failing to identify action-reaction pairs correctly"
      ]
    }
  };
  
  // Handle formula lab opening
  const handleOpenFormulaLab = () => {
    setShowFormulaLab(true);
  };
  
  // Handle formula lab closing
  const handleCloseFormulaLab = () => {
    setShowFormulaLab(false);
  };
  
  // Handle navigation between concepts
  const handlePrevConcept = () => {
    navigate('/dashboard/student/concepts/concept-prev');
  };
  
  const handleNextConcept = () => {
    navigate('/dashboard/student/concepts/concept-next');
  };

  if (!concept) {
    return (
      <ConceptsPageLayout showBackButton title="Concept not found">
        <div className="flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold mb-2">Concept Not Found</h2>
          <p className="mb-4">The concept you're looking for doesn't exist or has been moved.</p>
          <Button onClick={() => navigate('/dashboard/student/concepts')}>
            Return to Concepts
          </Button>
        </div>
      </ConceptsPageLayout>
    );
  }

  return (
    <ConceptsPageLayout
      showBackButton
      title={concept.title}
      subtitle={`${concept.subject} > ${concept.chapter}`}
    >
      <div className="space-y-6">
        {/* Concept Header with Mastery Tracker */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-800">
                  {concept.subject}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800">
                  {concept.chapter}
                </Badge>
                <Badge className={`
                  ${concept.difficulty === 'easy' 
                    ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800' 
                    : concept.difficulty === 'medium' 
                    ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-800'
                    : 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800'}
                `}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold mt-2">{concept.title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Clock className="h-4 w-4" />
                {concept.estimatedTime}
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Mastery & Recall Tracker */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <Star className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-lg">Mastery & Recall Tracker</h3>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded">
                    <BookMarked className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Study Sessions</div>
                    <div className="font-medium">3 sessions</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 dark:bg-green-900 p-1 rounded">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Correct Answers</div>
                    <div className="font-medium">8 of 12</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 dark:bg-purple-900 p-1 rounded">
                    <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Recall Accuracy</div>
                    <div className="font-medium">75%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Mastery</span>
                  <span className="text-sm font-medium">{concept.masteryLevel}%</span>
                </div>
                <Progress 
                  value={concept.masteryLevel} 
                  className="h-2.5" 
                  style={{ background: '#e5e7eb' }}
                />
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                  <span>Beginner</span>
                  <span>Proficient</span>
                  <span>Master</span>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30">
                <h4 className="font-medium mb-2 text-sm text-blue-800 dark:text-blue-300">Recommended Next Steps</h4>
                <ul className="text-sm space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <div className="mt-0.5 min-w-4">
                      <span className="inline-block w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    </div>
                    Review common mistakes
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="mt-0.5 min-w-4">
                      <span className="inline-block w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                    </div>
                    Practice formula application
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <AIInsightsSection conceptId={concept.id} conceptTitle={concept.title} />
        
        {/* Analytics Section */}
        <ConceptAnalyticsSection conceptId={concept.id} masteryPercent={concept.masteryLevel} />
        
        {/* Main content tabs */}
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
          <div className="border-b">
            <TabsList className="p-0 bg-transparent w-full grid grid-cols-2 sm:grid-cols-4 md:flex md:flex-wrap">
              <TabsTrigger 
                value="learn" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Learn
              </TabsTrigger>
              <TabsTrigger 
                value="visual" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                <Eye className="h-4 w-4 mr-2" />
                Visual
              </TabsTrigger>
              <TabsTrigger 
                value="simulation" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                <Cube className="h-4 w-4 mr-2" />
                3D Simulation
              </TabsTrigger>
              <TabsTrigger 
                value="formula" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                <Beaker className="h-4 w-4 mr-2" />
                Formula Lab
              </TabsTrigger>
              <TabsTrigger 
                value="video" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </TabsTrigger>
              <TabsTrigger 
                value="mistakes" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Common Mistakes
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Learning Content */}
          <TabsContent value="learn" className="mt-4">
            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: concept.content.text }} />
          </TabsContent>
          
          {/* Visual Content */}
          <TabsContent value="visual" className="mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium mb-4">Visual Representation</h3>
              <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Interactive diagrams would be displayed here</p>
              </div>
            </div>
          </TabsContent>
          
          {/* 3D Simulation */}
          <TabsContent value="simulation" className="mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium mb-4">3D Interactive Simulation</h3>
              <div className="aspect-video bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">3D simulation demonstrating Newton's laws</p>
              </div>
              <div className="mt-4 flex justify-center">
                <Button>Start Simulation</Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Formula Lab */}
          <TabsContent value="formula" className="mt-4">
            <FormulaTabContent 
              conceptId={concept.id}
              conceptTitle={concept.title}
              handleOpenFormulaLab={handleOpenFormulaLab}
            />
          </TabsContent>
          
          {/* Video Content */}
          <TabsContent value="video" className="mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium mb-4">Video Explanation</h3>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Video player would be displayed here</p>
              </div>
            </div>
          </TabsContent>
          
          {/* Common Mistakes */}
          <TabsContent value="mistakes" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" /> 
                  Common Misconceptions & Mistakes
                </h3>
                <ul className="space-y-4">
                  {concept.content.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-md">
                      <div className="mt-1">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-gray-800 dark:text-gray-200">{mistake}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Secondary tabs for additional sections */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Additional Learning Resources</h3>
          
          <Tabs defaultValue="recall" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="recall" className="gap-2">
                <BrainCircuit className="h-4 w-4" />
                Recall
              </TabsTrigger>
              <TabsTrigger value="revision" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Revision
              </TabsTrigger>
              <TabsTrigger value="notes" className="gap-2">
                <StickyNote className="h-4 w-4" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="discuss" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Discuss
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recall">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-4">Quick Recall Exercises</h4>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <p className="font-medium mb-2">What does Newton's First Law state?</p>
                      <Button className="mr-2 mt-2">Show Answer</Button>
                      <Button variant="outline" className="mt-2">Next Question</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="revision">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-4">Revision Schedule</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Next revision due</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">May 25, 2023</p>
                        </div>
                      </div>
                      <Button size="sm">Mark Revised</Button>
                    </div>
                    
                    <h5 className="font-medium mt-4">Revision History</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm p-2 border-b">
                        <span>May 15, 2023</span>
                        <Badge variant="outline">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm p-2 border-b">
                        <span>May 10, 2023</span>
                        <Badge variant="outline">Complete</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-4">Your Notes</h4>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 min-h-[200px] bg-white dark:bg-gray-950">
                    <p className="text-gray-500 dark:text-gray-400">You haven't added any notes yet. Click to add notes.</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button>Save Notes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discuss">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-medium mb-4">Discussion Forum</h4>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">A</span>
                        </div>
                        <div>
                          <p className="font-medium">Arun</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
                          <p className="mt-2">Can someone help me understand the practical applications of Newton's Third Law?</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <textarea
                        className="w-full p-3 border border-gray-200 dark:border-gray-800 rounded-md"
                        placeholder="Add your question or comment here..."
                        rows={3}
                      ></textarea>
                      <div className="mt-2 flex justify-end">
                        <Button>Post</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related concepts */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Related Concepts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {concept.relatedConcepts.map((related) => (
              <Card key={related.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                      <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">{related.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Related concept</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" className="gap-2" onClick={handlePrevConcept}>
            <ArrowLeft className="h-4 w-4" />
            Previous Concept
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleNextConcept}>
            Next Concept
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
