
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, Star, CalendarCheck, Brain, Check, Award, 
  PlayCircle, FileQuestion, BarChart2, Network, RepeatIcon, 
  ExternalLink, MessageSquare, Lightbulb, Code, 
  Cylinder, Beaker, Video, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import FormulaTabContent from '@/components/dashboard/student/concepts/FormulaTabContent';

// Define mock concept data
interface Concept {
  id: string;
  title: string;
  description: string;
  content: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  mastery: number;
  timeSpent: string;
  lastStudied: string;
  isBookmarked: boolean;
  tags: string[];
  relatedConcepts: RelatedConcept[];
}

interface RelatedConcept {
  id: string;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  relation: string;
}

interface MasteryKPI {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<Concept | null>(null);
  const [activeTab, setActiveTab] = useState('learn');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [masteryKpis, setMasteryKpis] = useState<MasteryKPI[]>([]);

  // Mock data loading effect
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    const mockConcept: Concept = {
      id: conceptId || 'default',
      title: 'Newton\'s Laws of Motion',
      description: 'The three fundamental laws that form the foundation for classical mechanics.',
      content: `
        <h2>Newton's First Law of Motion</h2>
        <p>An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.</p>
        
        <h2>Newton's Second Law of Motion</h2>
        <p>The acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.</p>
        <p>The equation form is: F = ma</p>
        
        <h2>Newton's Third Law of Motion</h2>
        <p>For every action, there is an equal and opposite reaction.</p>
        
        <h3>Applications</h3>
        <p>These laws describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.</p>
      `,
      subject: 'Physics',
      difficulty: 'medium',
      progress: 65,
      mastery: 72,
      timeSpent: '3h 45m',
      lastStudied: '2 days ago',
      isBookmarked: true,
      tags: ['Mechanics', 'Classical Physics', 'NEET', 'JEE'],
      relatedConcepts: [
        {
          id: 'momentum',
          title: 'Momentum and Impulse',
          subject: 'Physics',
          difficulty: 'medium',
          relation: 'Builds on Newton\'s laws'
        },
        {
          id: 'energy',
          title: 'Work, Energy, and Power',
          subject: 'Physics',
          difficulty: 'medium',
          relation: 'Related application'
        },
        {
          id: 'circular-motion',
          title: 'Circular Motion',
          subject: 'Physics',
          difficulty: 'hard',
          relation: 'Advanced application'
        }
      ]
    };
    
    setConcept(mockConcept);
    setIsBookmarked(mockConcept.isBookmarked);
    
    // Set KPIs
    setMasteryKpis([
      {
        label: 'Recall Accuracy',
        value: 78,
        icon: <Brain className="h-4 w-4" />,
        color: 'bg-blue-500'
      },
      {
        label: 'Practice Score',
        value: 72,
        icon: <FileQuestion className="h-4 w-4" />,
        color: 'bg-green-500'
      },
      {
        label: 'Revision Consistency',
        value: 65,
        icon: <RepeatIcon className="h-4 w-4" />,
        color: 'bg-purple-500'
      },
      {
        label: 'Content Coverage',
        value: 85,
        icon: <BookOpen className="h-4 w-4" />,
        color: 'bg-amber-500'
      }
    ]);
  }, [conceptId]);

  // Get difficulty color
  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch(difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Get mastery color
  const getMasteryColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    if (value >= 40) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  // Toggle bookmark
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Handle formula lab click
  const handleOpenFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };

  if (!concept) {
    return (
      <ConceptsPageLayout showBackButton={true}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-xl">Loading concept...</div>
        </div>
      </ConceptsPageLayout>
    );
  }

  return (
    <ConceptsPageLayout
      showBackButton={true}
      title={concept.title}
      subtitle={`${concept.subject} - ${concept.tags.join(', ')}`}
    >
      <div className="space-y-6">
        {/* Header with meta information */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={`${getDifficultyColor(concept.difficulty)} px-2 py-1`}>
                {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
              </Badge>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200">
                {concept.subject}
              </Badge>
              {concept.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <CalendarCheck className="h-4 w-4 mr-1" />
                Last studied {concept.lastStudied}
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {concept.timeSpent} total study time
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`${isBookmarked ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700/30' : ''}`}
              onClick={handleToggleBookmark}
            >
              <Star className={`h-4 w-4 mr-1.5 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button size="sm">
              <BookOpen className="h-4 w-4 mr-1.5" />
              Start Learning
            </Button>
          </div>
        </div>

        {/* Mastery & Progress Tracker */}
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-indigo-100 dark:border-indigo-800/30 overflow-hidden">
          <CardContent className="p-5">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Overall Mastery */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-indigo-600" />
                  Mastery Progress
                </h3>
                
                <div className="flex justify-between mb-2 items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Mastery</span>
                  <span className="text-2xl font-bold text-indigo-600">{concept.mastery}%</span>
                </div>
                
                <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${concept.mastery}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${getMasteryColor(concept.mastery)} rounded-full`}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {masteryKpis.map((kpi, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className={`p-1.5 rounded-full ${kpi.color.replace('bg-', 'bg-').replace('500', '100')} ${kpi.color.replace('bg-', 'text-')}`}>
                            {kpi.icon}
                          </div>
                          <span className="ml-2 text-sm font-medium">{kpi.label}</span>
                        </div>
                        <span className="text-lg font-bold">{kpi.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${kpi.value}%` }}
                          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                          className={`h-full ${kpi.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI Insights */}
              <div className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                  AI Learning Insights
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">You're making excellent progress on understanding Newton's First Law examples.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">You might need more practice with force calculations in Second Law problems.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Try connecting Third Law concepts with real-world applications to improve recall.</p>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full mt-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20"
                  >
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main content with tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-auto flex flex-wrap justify-start bg-gray-100/50 dark:bg-gray-800/50 p-1">
            <TabsTrigger value="learn" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="visual" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <Code className="h-4 w-4 mr-2" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="simulation" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <Cylinder className="h-4 w-4 mr-2" />
              3D Simulation
            </TabsTrigger>
            <TabsTrigger value="formula" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <Beaker className="h-4 w-4 mr-2" />
              Formula Lab
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <Video className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Common Mistakes
            </TabsTrigger>
            <TabsTrigger value="recall" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <Brain className="h-4 w-4 mr-2" />
              Recall
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <BarChart2 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="connected" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <Network className="h-4 w-4 mr-2" />
              Connected
            </TabsTrigger>
            <TabsTrigger value="revision" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <RepeatIcon className="h-4 w-4 mr-2" />
              Revision
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <FileQuestion className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="discuss" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <MessageSquare className="h-4 w-4 mr-2" />
              Discuss
            </TabsTrigger>
          </TabsList>

          {/* Learn Tab Content */}
          <TabsContent value="learn" className="border rounded-md mt-6">
            <div className="p-6">
              <div 
                className="prose dark:prose-invert max-w-none" 
                dangerouslySetInnerHTML={{ __html: concept.content }}
              />
              <div className="mt-6 flex justify-end">
                <Button>
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Learned
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Visual Tab Content */}
          <TabsContent value="visual" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Visual Learning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Code className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive visualization content will appear here.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Visual Explanation</h3>
                  <p>Visual diagrams and illustrations help understand key concepts by providing clear representations of physical phenomena and relationships.</p>
                  <Button variant="outline" className="w-full">
                    Launch Interactive Visualizer
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* 3D Simulation Tab Content */}
          <TabsContent value="simulation" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">3D Simulation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Cylinder className="h-12 w-12 mx-auto mb-2" />
                    <p>3D simulation content will appear here.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Interactive 3D Models</h3>
                  <p>Manipulate 3D models to better understand physical principles and see concepts in action from multiple perspectives.</p>
                  <Button variant="outline" className="w-full">
                    Launch 3D Simulator
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Formula Lab Tab Content */}
          <TabsContent value="formula" className="border rounded-md mt-6">
            <FormulaTabContent 
              conceptId={conceptId || ''}
              conceptTitle={concept.title}
              handleOpenFormulaLab={handleOpenFormulaLab}
            />
          </TabsContent>
          
          {/* Video Tab Content */}
          <TabsContent value="video" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Video Explanations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <PlayCircle className="h-12 w-12 mx-auto mb-2" />
                    <p>Video content will appear here.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Video Lectures</h3>
                  <p>Watch expert educators explain complex topics in clear, concise video lessons with demonstrations and examples.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Full Screen
                    </Button>
                    <Button className="w-full">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Play Video
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Common Mistakes Tab Content */}
          <TabsContent value="mistakes" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-amber-500" />
                Common Mistakes
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Confusing Mass and Weight</h3>
                    <p className="text-muted-foreground mb-4">Students often confuse mass (a measure of inertia) with weight (the force of gravity).</p>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 p-3 rounded-md">
                      <h4 className="font-medium text-amber-800 dark:text-amber-300">Correct Understanding:</h4>
                      <p className="text-sm mt-1">Mass is measured in kilograms (kg) and is constant, while weight is measured in Newtons (N) and varies with gravitational field strength.</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Misapplying Newton's Third Law</h3>
                    <p className="text-muted-foreground mb-4">Students often incorrectly think the action-reaction pair acts on the same object.</p>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 p-3 rounded-md">
                      <h4 className="font-medium text-amber-800 dark:text-amber-300">Correct Understanding:</h4>
                      <p className="text-sm mt-1">Newton's Third Law pairs always act on different objects. The force the Earth exerts on you (your weight) acts on you, while the equal and opposite force you exert acts on the Earth.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Placeholder content for other tabs */}
          <TabsContent value="recall" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Recall Practice</h2>
              <p className="text-gray-500 dark:text-gray-400">Testing your recall with active questioning helps cement your understanding.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Your Learning Analytics</h2>
              <p className="text-gray-500 dark:text-gray-400">Detailed analytics on your learning progress will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="connected" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Connected Concepts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {concept.relatedConcepts.map((related, index) => (
                  <Card key={index} className="cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <CardContent className="p-4">
                      <Badge variant="outline" className={`${getDifficultyColor(related.difficulty)} mb-2`}>
                        {related.difficulty}
                      </Badge>
                      <h3 className="font-semibold mb-1">{related.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{related.subject}</p>
                      <p className="text-xs bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded">{related.relation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="revision" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Revision Plan</h2>
              <p className="text-gray-500 dark:text-gray-400">Your personalized revision schedule will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
              <p className="text-gray-500 dark:text-gray-400">Your saved notes will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="discuss" className="border rounded-md mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Discuss with AI Tutor</h2>
              <p className="text-gray-500 dark:text-gray-400">Chat with our AI tutor to get answers to your questions.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
