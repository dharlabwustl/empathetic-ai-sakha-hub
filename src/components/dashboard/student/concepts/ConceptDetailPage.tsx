
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Brain, 
  Eye, 
  Video, 
  Calculator, 
  AlertTriangle, 
  RotateCcw, 
  BarChart3, 
  StickyNote, 
  MessageSquare,
  Star,
  Volume2,
  VolumeX,
  Box,
  FileQuestion,
  Lightbulb,
  Target,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../BackButton';
import ConceptHeader from './concept-detail/ConceptHeader';
import FormulaTabContent from './concept-detail/FormulaTabContent';
import CommonMistakesContent from './CommonMistakesContent';
import ConceptExplanationContent from '../../concept-cards/ConceptExplanationContent';

// Sample concept data
const mockConcept = {
  id: 'ohms-law',
  title: "Ohm's Law",
  subject: 'Physics',
  topic: 'Electricity',
  difficulty: 'medium' as const,
  description: 'Understanding the relationship between voltage, current, and resistance in electrical circuits.',
  masteryLevel: 75,
  recallAccuracy: 82,
  lastPracticed: '2 days ago',
  timeToMaster: '3 hours',
  bookmarked: false,
  keyPoints: [
    'V = I × R (Voltage = Current × Resistance)',
    'Current flows from high to low potential',
    'Resistance opposes current flow',
    'Power can be calculated using P = V × I'
  ],
  linkedConcepts: ['Electrical Circuits', 'Power Calculations', 'Kirchhoff\'s Laws'],
  studyProgress: {
    conceptsStudied: 15,
    totalConcepts: 25,
    averageScore: 78
  }
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learn');
  const [isBookmarked, setIsBookmarked] = useState(mockConcept.bookmarked);
  const [isReading, setIsReading] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Read aloud functionality
  const toggleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const textToRead = getTabContentText(activeTab);
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsReading(false);
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const getTabContentText = (tab: string) => {
    switch (tab) {
      case 'learn':
        return `${mockConcept.title}. ${mockConcept.description}. Key points: ${mockConcept.keyPoints.join('. ')}.`;
      case 'visual':
        return `Visual representation of ${mockConcept.title}. This tab contains diagrams and graphical content.`;
      case 'simulation':
        return `3D simulation of ${mockConcept.title}. Interactive models help visualize the concept.`;
      case 'formula':
        return `Formula practice for ${mockConcept.title}. Learn and practice mathematical relationships.`;
      case 'video':
        return `Video tutorials about ${mockConcept.title}. Watch explanatory content.`;
      case 'mistakes':
        return `Common mistakes when learning ${mockConcept.title}. Avoid these frequent errors.`;
      default:
        return `Content for ${mockConcept.title}.`;
    }
  };

  const handleOpenFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl">
      <BackButton to="/dashboard/student/concepts" />
      
      {/* Masthead */}
      <ConceptHeader
        title={mockConcept.title}
        subject={mockConcept.subject}
        topic={mockConcept.topic}
        difficulty={mockConcept.difficulty}
        isBookmarked={isBookmarked}
        onBookmarkToggle={() => setIsBookmarked(!isBookmarked)}
      />

      {/* Mastery & Recall Tracker */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Mastery & Recall Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mastery Level</span>
                <span className="font-medium">{mockConcept.masteryLevel}%</span>
              </div>
              <Progress value={mockConcept.masteryLevel} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Recall Accuracy</span>
                <span className="font-medium">{mockConcept.recallAccuracy}%</span>
              </div>
              <Progress value={mockConcept.recallAccuracy} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Last practiced: {mockConcept.lastPracticed}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Time to master: {mockConcept.timeToMaster}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Personalized Learning Path</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Based on your performance, focus on formula applications. You've mastered the theory but need more practice with calculations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Strength</span>
                </div>
                <p className="text-xs">Excellent theoretical understanding</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">Focus Area</span>
                </div>
                <p className="text-xs">Practice more complex circuits</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <TabsList className="grid w-full lg:w-auto grid-cols-3 md:grid-cols-6 gap-1 h-auto p-1">
            <TabsTrigger value="learn" className="flex items-center gap-2 text-xs">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center gap-2 text-xs">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Visual</span>
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-2 text-xs">
              <Box className="h-4 w-4" />
              <span className="hidden sm:inline">3D</span>
            </TabsTrigger>
            <TabsTrigger value="formula" className="flex items-center gap-2 text-xs">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Formula</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2 text-xs">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="flex items-center gap-2 text-xs">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Mistakes</span>
            </TabsTrigger>
          </TabsList>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleReadAloud}
            className="flex items-center gap-2"
          >
            {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {isReading ? 'Stop Reading' : 'Read Aloud'}
          </Button>
        </div>

        {/* Primary Tab Content */}
        <TabsContent value="learn">
          <ConceptExplanationContent conceptTitle={mockConcept.title} />
        </TabsContent>

        <TabsContent value="visual">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                Visual Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-slate-500 dark:text-slate-400">Interactive diagrams and visual representations</p>
                  <p className="text-sm text-slate-400 mt-2">Circuit diagrams, voltage flow animations, resistance visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="h-5 w-5 text-blue-600" />
                3D Simulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-slate-500 dark:text-slate-400">Interactive 3D models and simulations</p>
                  <p className="text-sm text-slate-400 mt-2">3D circuit builder, electron flow visualization, interactive components</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formula">
          <FormulaTabContent 
            conceptId={conceptId || ''}
            conceptTitle={mockConcept.title}
            handleOpenFormulaLab={handleOpenFormulaLab}
          />
        </TabsContent>

        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-red-600" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-slate-500 dark:text-slate-400">Video player would be displayed here</p>
                    <p className="text-sm text-slate-400 mt-2">Educational videos about Ohm's Law</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <h4 className="font-medium text-sm">Video {i}: Ohm's Law Basics</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">5:30</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mistakes">
          <CommonMistakesContent conceptName={mockConcept.title} />
        </TabsContent>
      </Tabs>

      {/* Secondary Learning Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recall" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
              <TabsTrigger value="recall" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Recall</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="revision" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Revision</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <StickyNote className="h-4 w-4" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
              <TabsTrigger value="discuss" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Discuss</span>
              </TabsTrigger>
              <TabsTrigger value="previous" className="flex items-center gap-2">
                <FileQuestion className="h-4 w-4" />
                <span className="hidden sm:inline">PYQs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recall" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Recall Test</h3>
                <p className="text-gray-600 dark:text-gray-400">Test your active memory of key concepts</p>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">Question: What is the formula for Ohm's Law?</p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">V = I × R</Button>
                    <Button variant="outline" className="w-full justify-start">P = V × I</Button>
                    <Button variant="outline" className="w-full justify-start">F = ma</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Study Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Concepts Studied</span>
                        <span>{mockConcept.studyProgress.conceptsStudied}/{mockConcept.studyProgress.totalConcepts}</span>
                      </div>
                      <Progress value={(mockConcept.studyProgress.conceptsStudied / mockConcept.studyProgress.totalConcepts) * 100} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{mockConcept.studyProgress.averageScore}%</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revision" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Revision Schedule</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Review today</span>
                    <Badge variant="secondary">Due</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Review in 3 days</span>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Notes</h3>
                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm">Remember: Voltage is like water pressure, current is like flow rate, resistance is like pipe width.</p>
                </div>
                <Button variant="outline" className="w-full">Add New Note</Button>
              </div>
            </TabsContent>

            <TabsContent value="discuss" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Community Discussion</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-sm"><strong>Student A:</strong> Can someone explain why resistance is measured in ohms?</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-sm"><strong>Student B:</strong> Great explanation on voltage drops across resistors!</p>
                    <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Join Discussion</Button>
              </div>
            </TabsContent>

            <TabsContent value="previous" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Previous Year Questions</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-sm font-medium">JEE 2023: Calculate current in a 12V circuit with 4Ω resistance</p>
                    <Badge variant="outline" className="mt-1">Medium</Badge>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-sm font-medium">NEET 2022: Which law relates voltage, current, and resistance?</p>
                    <Badge variant="outline" className="mt-1">Easy</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View All Questions</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Linked Concepts */}
      <Card>
        <CardHeader>
          <CardTitle>Related Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockConcept.linkedConcepts.map((concept, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {concept}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptDetailPage;
