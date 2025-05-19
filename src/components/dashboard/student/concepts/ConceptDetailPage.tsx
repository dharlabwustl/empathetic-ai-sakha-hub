
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  BookOpen, Brain, ArrowLeft, Star, ChevronDown, BookText, FileText, Award
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';

// Import our components
import EnhancedConceptDetail from '@/components/dashboard/student/concepts/EnhancedConceptDetail';
import { ConceptMasterySection } from '@/components/dashboard/student/concepts/ConceptMasterySection';
import { ConceptExamSection } from '@/components/dashboard/student/concepts/ConceptExamSection';
import { ConceptFlashcardsSection } from '@/components/dashboard/student/concepts/ConceptFlashcardsSection';
import RelatedFlashcards from '@/components/dashboard/student/concepts/RelatedFlashcards';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{conceptId: string}>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [masteryLevel, setMasteryLevel] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Mock concept data - in a real app this would be fetched from an API
  const conceptData = {
    id: conceptId || 'default',
    title: "Understanding Cell Division",
    subject: "Biology",
    topic: "Cell Biology",
    difficulty: "medium" as const,
    masteryLevel: 65, // This would come from user's data
    estimatedTime: 15, // in minutes
    content: `Cell division is the process by which a parent cell divides into two or more daughter cells. 
      Cell division usually occurs as part of a larger cell cycle. In eukaryotes, there are two distinct 
      types of cell division: mitosis and meiosis. Mitosis is for growth and repair, while meiosis is for sexual reproduction.
      
      The cell cycle consists of interphase (G₁, S, and G₂ phases) and the mitotic phase (mitosis and cytokinesis). 
      During interphase, the cell grows and DNA replication occurs. In mitosis, the replicated chromosomes are separated 
      into two nuclei, and cytokinesis divides the cytoplasm, organelles, and cell membrane.`
  };

  // Flashcards for this concept
  const flashcards = [
    {
      id: '1',
      front: 'What are the two main types of cell division in eukaryotes?',
      back: 'Mitosis and meiosis'
    },
    {
      id: '2',
      front: 'What is the purpose of mitosis?',
      back: 'Growth and repair of the organism'
    },
    {
      id: '3',
      front: 'What is the purpose of meiosis?',
      back: 'Sexual reproduction'
    }
  ];

  // Update mastery level when concept changes
  useEffect(() => {
    setMasteryLevel(conceptData.masteryLevel);
    
    // Simulate loading state
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [conceptId, conceptData.masteryLevel]);

  // Show concept loaded toast
  useEffect(() => {
    if (!isLoading) {
      toast({
        title: "Concept Loaded",
        description: `Viewing details for: ${conceptData.title}`,
        duration: 3000,
      });
    }
  }, [isLoading, toast, conceptData.title]);

  // Handle mastery level updates (this would connect to backend in real app)
  const updateMasteryLevel = (newLevel: number) => {
    setMasteryLevel(newLevel);
    toast({
      title: "Mastery Updated",
      description: `Your mastery level is now ${newLevel}%`,
      duration: 3000,
    });
  };

  const handleGoBack = () => {
    navigate('/dashboard/student/concepts');
  };

  // Loading state with skeleton UI
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        <div className="h-8 w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 pb-10">
      {/* Header - Background with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2 text-white hover:bg-white/10"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Concepts
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.h1 
                className="text-2xl md:text-3xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {conceptData.title}
              </motion.h1>
              <motion.p 
                className="text-indigo-100 mt-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {conceptData.subject} &gt; {conceptData.topic}
              </motion.p>
            </div>
            
            {/* Mastery badge - prominent display */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="p-2 rounded-full bg-white/10 mr-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold">{masteryLevel}%</span>
                  <span className="text-xs text-indigo-100 ml-1">Mastery</span>
                </div>
                <div className="w-36 h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      masteryLevel > 80 ? 'bg-gradient-to-r from-green-400 to-green-300' : 
                      masteryLevel > 50 ? 'bg-gradient-to-r from-blue-400 to-blue-300' : 
                      masteryLevel > 30 ? 'bg-gradient-to-r from-amber-400 to-amber-300' : 
                      'bg-gradient-to-r from-red-400 to-red-300'
                    }`}
                    style={{ width: `${masteryLevel}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Tags section */}
        <motion.div 
          className="flex flex-wrap gap-2 items-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Badge variant="outline" className={`px-3 py-1 text-sm font-medium ${
            conceptData.difficulty === "easy" 
              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' : 
            conceptData.difficulty === "medium" 
              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' : 
            'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
          }`}>
            {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)} Difficulty
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
            <BookOpen className="h-3 w-3" /> {conceptData.subject}
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400">
            <Star className="h-3 w-3" /> Popular Concept
          </Badge>
          
          {masteryLevel >= 80 && (
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              <Award className="h-3 w-3" /> Mastered
            </Badge>
          )}
        </motion.div>
        
        {masteryLevel < 30 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400">
              <AlertDescription>
                Your mastery level for this concept is low. Focus on the content and try the practice quizzes to improve your understanding.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Main Layout with Mastery Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main concept tabs */}
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
              <Tabs 
                defaultValue="content" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 mb-2 p-1 bg-gray-100 dark:bg-gray-800/50">
                  <TabsTrigger value="content" className="flex items-center gap-1">
                    <BookText className="h-4 w-4" /> Content
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="flex items-center gap-1">
                    <Brain className="h-4 w-4" /> Practice
                  </TabsTrigger>
                  <TabsTrigger value="flashcards" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> Flashcards
                  </TabsTrigger>
                  <TabsTrigger value="exams" className="flex items-center gap-1">
                    <Award className="h-4 w-4" /> Exam Prep
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="p-4">
                  <EnhancedConceptDetail 
                    conceptId={conceptData.id}
                    title={conceptData.title}
                    subject={conceptData.subject}
                    topic={conceptData.topic}
                    difficulty={conceptData.difficulty}
                    content={conceptData.content}
                    masteryLevel={masteryLevel}
                    onMasteryUpdate={updateMasteryLevel}
                  />
                </TabsContent>

                <TabsContent value="practice" className="p-0">
                  <ConceptMasterySection 
                    conceptId={conceptData.id} 
                    recallAccuracy={masteryLevel}
                    quizScore={72}
                    lastPracticed="2025-05-15"
                  />
                </TabsContent>

                <TabsContent value="flashcards" className="p-0">
                  <ConceptFlashcardsSection 
                    conceptId={conceptData.id}
                    conceptTitle={conceptData.title}
                    flashcardsTotal={8}
                    flashcardsCompleted={3}
                  />
                </TabsContent>

                <TabsContent value="exams" className="p-0">
                  <ConceptExamSection 
                    conceptId={conceptData.id}
                    conceptTitle={conceptData.title}
                    examReady={masteryLevel > 70}
                  />
                </TabsContent>
              </Tabs>
            </Card>
            
            {/* Advanced sections - toggleable */}
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-center gap-2 border-dashed"
              >
                {showAdvanced ? "Hide" : "Show"} Advanced Learning Tools
                <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </Button>
              
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Advanced sections go here */}
                  <Card className="border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-4">Related Flashcards</h3>
                    <RelatedFlashcards 
                      flashcards={flashcards}
                      conceptTitle={conceptData.title}
                    />
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Sidebar - 1/3 width on desktop */}
          <div className="space-y-6">
            {/* Mastery Overview Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <div className="p-6">
                <h2 className="text-xl font-bold flex items-center mb-4">
                  <Brain className="h-5 w-5 mr-2" />
                  Mastery Progress
                </h2>
                
                <div className="space-y-6">
                  {/* Circular progress indicator */}
                  <div className="flex justify-center">
                    <div className="relative h-36 w-36">
                      {/* Background circle */}
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="8"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(255,255,255,0.9)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - masteryLevel / 100)}`}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      {/* Percentage in the middle */}
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold">{masteryLevel}%</span>
                        <span className="text-xs opacity-80">Mastery</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-2xl font-bold">72%</div>
                      <div className="text-xs opacity-80">Quiz Scores</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-2xl font-bold">3/8</div>
                      <div className="text-xs opacity-80">Flashcards</div>
                    </div>
                  </div>
                  
                  {/* Next steps based on mastery level */}
                  <div>
                    <h3 className="font-medium mb-2">Recommended Next Steps:</h3>
                    <ul className="space-y-2 text-sm">
                      {masteryLevel < 50 && (
                        <>
                          <li className="flex items-start">
                            <div className="mt-0.5 mr-2 h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-xs">1</div>
                            <span>Review the concept content thoroughly</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-0.5 mr-2 h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-xs">2</div>
                            <span>Create flashcards for key terms</span>
                          </li>
                        </>
                      )}
                      {masteryLevel >= 50 && masteryLevel < 80 && (
                        <>
                          <li className="flex items-start">
                            <div className="mt-0.5 mr-2 h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-xs">1</div>
                            <span>Practice with the remaining flashcards</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-0.5 mr-2 h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-xs">2</div>
                            <span>Take the practice exam to test your knowledge</span>
                          </li>
                        </>
                      )}
                      {masteryLevel >= 80 && (
                        <>
                          <li className="flex items-start">
                            <div className="mt-0.5 mr-2 h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-xs">1</div>
                            <span>Explore related concepts</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-0.5 mr-2 h-4 w-4 rounded-full bg-white/20 flex items-center justify-center text-xs">2</div>
                            <span>Help others by creating quality flashcards</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  {/* Action button */}
                  <Button 
                    className="w-full bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                    onClick={() => setActiveTab('practice')}
                  >
                    {masteryLevel < 50 ? 'Start Learning' : 
                     masteryLevel < 80 ? 'Continue Practice' : 
                     'Reinforce Knowledge'}
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Linked Learning */}
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="p-4">
                <h2 className="text-lg font-medium mb-3">Connected Concepts</h2>
                <div className="space-y-3">
                  {['Cell Cycle', 'DNA Replication', 'Chromosomes'].map((item, i) => (
                    <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full ${
                          i === 0 ? 'bg-green-500' : 
                          i === 1 ? 'bg-amber-500' : 'bg-red-500'
                        } mr-2`}></div>
                        <span>{item}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {i === 0 ? '90%' : i === 1 ? '45%' : '10%'}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full text-sm" size="sm">
                    View Learning Path
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Exam Integration */}
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="p-4">
                <h2 className="text-lg font-medium mb-3">Exam Application</h2>
                <div className="space-y-2 text-sm">
                  <p>This concept appears in:</p>
                  <div className="space-y-2 mt-3">
                    <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Biology Midterm</div>
                        <div className="text-xs text-muted-foreground">15% weight</div>
                      </div>
                      <Badge className="bg-blue-500">High</Badge>
                    </div>
                    <div className="p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Final Exam</div>
                        <div className="text-xs text-muted-foreground">8% weight</div>
                      </div>
                      <Badge variant="outline">Medium</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full text-sm mt-3" size="sm">
                    View All Exams
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
