import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  BookOpen, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  Star,
  Lightbulb,
  Brain,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Award,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import SpeechRecognitionButton from '../SpeechRecognitionButton';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';
import OverviewSection from '../OverviewSection';

// Mock data for concepts
interface ConceptSlide {
  id: number;
  title: string;
  content: string;
  visual: string;
  keyPoints: string[];
}

type Difficulty = 'easy' | 'medium' | 'hard';

interface ConceptData {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: Difficulty;
  duration: string;
  progress: number;
  description: string;
  slides: ConceptSlide[];
  relatedConcepts: string[];
  practiceQuestions: number;
  estimatedTime: string;
}

const ConceptCardDetail: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('learn');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const mockSubjects = [
    { name: 'Physics', completed: 2, total: 4, progress: 50, efficiency: 85, studyTime: 90 },
    { name: 'Chemistry', completed: 1, total: 3, progress: 33, efficiency: 70, studyTime: 60 },
    { name: 'Biology', completed: 3, total: 3, progress: 100, efficiency: 95, studyTime: 75 },
    { name: 'Mathematics', completed: 1, total: 2, progress: 50, efficiency: 80, studyTime: 45 }
  ];

  const mockSuggestions = [
    'You\'re doing great with Biology today! 🎉',
    'Focus on Chemistry next - only 2 tasks remaining',
    'Take a 10-minute break before Physics numericals',
    'Your morning session efficiency is above 80% ⚡'
  ];

  const conceptData = {
    id: conceptId || 'ohms-law',
    title: "Ohm's Law",
    subject: 'Physics',
    chapter: 'Current Electricity',
    difficulty: 'medium' as const,
    duration: '15 min',
    progress: 65,
    description: 'Understanding the fundamental relationship between voltage, current, and resistance in electrical circuits.',
    slides: [
      {
        id: 1,
        title: 'Introduction to Ohm\'s Law',
        content: 'Ohm\'s Law states that the current through a conductor is directly proportional to the voltage across it and inversely proportional to its resistance.',
        visual: '🔌',
        keyPoints: ['Fundamental law of electricity', 'Discovered by Georg Simon Ohm', 'Forms basis of circuit analysis']
      },
      {
        id: 2,
        title: 'Mathematical Formula',
        content: 'The mathematical expression of Ohm\'s Law is V = I × R, where V is voltage (volts), I is current (amperes), and R is resistance (ohms).',
        visual: '📐',
        keyPoints: ['V = I × R', 'Units: Volts, Amperes, Ohms', 'Linear relationship']
      },
      {
        id: 3,
        title: 'Practical Applications',
        content: 'Ohm\'s Law is used in designing electrical circuits, calculating power consumption, and troubleshooting electrical problems.',
        visual: '⚡',
        keyPoints: ['Circuit design', 'Power calculations', 'Troubleshooting electrical issues']
      }
    ],
    relatedConcepts: ['Electrical Circuits', 'Power Calculations', 'Kirchhoff\'s Laws'],
    practiceQuestions: 3,
    estimatedTime: '15 minutes'
  };

  useEffect(() => {
    if (conceptId) {
      // Simulate loading concept data
      setProgress(conceptData.progress);
    }
  }, [conceptId]);

  const handleNextSlide = () => {
    if (currentSlide < conceptData.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setProgress(prev => Math.min(100, prev + 15));
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setProgress(100);
    toast({
      title: "Concept Completed! 🎉",
      description: "Great job! You've mastered this concept.",
    });
    navigate('/dashboard/student/concepts');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Concept Bookmarked",
      description: isBookmarked ? "Removed from your saved concepts" : "Added to your saved concepts",
    });
  };

  const currentSlideData = conceptData.slides[currentSlide];

  return (
    <>
      <Helmet>
        <title>{conceptData.title} - PREPZR</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/dashboard/student/concepts')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Concepts
                </Button>
                
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{conceptData.subject}</span>
                  <span>•</span>
                  <span>{conceptData.chapter}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Voice Assistant and Speech Recognition */}
                <SpeechRecognitionButton 
                  context="dashboard"
                  size="sm"
                  userName="Student"
                />
                
                <Badge variant={conceptData.difficulty === 'easy' ? 'default' : conceptData.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                  {conceptData.difficulty}
                </Badge>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleBookmark}
                  className={isBookmarked ? 'text-yellow-600' : ''}
                >
                  <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6 max-w-4xl">

          {/* Overview Section */}
          <OverviewSection 
            title="Concept Overview"
            subjects={mockSubjects}
            totalStudyTime={270}
            overallProgress={58}
            suggestions={mockSuggestions}
            pageContext="concepts"
          />

          {/* Concept Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {conceptData.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {conceptData.description}
            </p>
            
            {/* Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </motion.div>

          {/* Learning Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="learn">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {currentSlideData.title}
                    </CardTitle>
                    <Badge variant="outline">
                      {currentSlide + 1} / {conceptData.slides.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Visual */}
                    <div className="text-center">
                      <div className="text-6xl mb-4">{currentSlideData.visual}</div>
                    </div>

                    {/* Content */}
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-lg leading-relaxed">{currentSlideData.content}</p>
                    </div>

                    {/* Key Points */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Key Points
                      </h4>
                      <ul className="space-y-2">
                        {currentSlideData.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-blue-800 dark:text-blue-300">
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-4">
                      <Button
                        variant="outline"
                        onClick={handlePrevSlide}
                        disabled={currentSlide === 0}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      <div className="flex gap-2">
                        {conceptData.slides.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentSlide 
                                ? 'bg-blue-600' 
                                : index < currentSlide 
                                  ? 'bg-green-500' 
                                  : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      {currentSlide === conceptData.slides.length - 1 ? (
                        <Button onClick={handleComplete} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Complete
                        </Button>
                      ) : (
                        <Button onClick={handleNextSlide} className="flex items-center gap-2">
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Practice Questions
                  </CardTitle>
                  <CardDescription>
                    Test your understanding with practice questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-lg font-semibold mb-2">Practice Questions Coming Soon</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Interactive practice questions will be available here
                    </p>
                    <Button variant="outline">
                      Start Practice Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Your Notes
                  </CardTitle>
                  <CardDescription>
                    Take notes to remember key concepts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Write your notes here..."
                    className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <Button className="mt-4">Save Notes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Concepts */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {conceptData.relatedConcepts.map((concept, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                    {concept}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voice Assistant for Study Support */}
        <FloatingVoiceButton 
          userName="Student"
          language="en-US"
        />
      </div>
    </>
  );
};

export default ConceptCardDetail;
