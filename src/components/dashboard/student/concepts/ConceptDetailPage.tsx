
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet';
import { Book, BookOpen, FileText, Brain, Clock, Calculator, Play, ArrowLeft, Bookmark, Share, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ConceptExplanationContent from '../concept-cards/ConceptExplanationContent';
import RelatedFlashcards from './RelatedFlashcards';
import FormulaTabContent from './FormulaTabContent';
import { ConceptMasterySection } from './ConceptMasterySection';
import LinkedConceptsSection from './LinkedConceptsSection';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [conceptData, setConceptData] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [masteryLevel, setMasteryLevel] = useState(35);

  // Mock flashcards data
  const mockFlashcards = [
    {
      id: 'card1',
      front: "What is Newton's First Law of Motion?",
      back: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force."
    },
    {
      id: 'card2',
      front: "What is inertia?",
      back: "Inertia is the resistance of an object to any change in its motion."
    },
    {
      id: 'card3',
      front: "State Newton's Second Law of Motion",
      back: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma."
    },
    {
      id: 'card4',
      front: "State Newton's Third Law of Motion",
      back: "For every action, there is an equal and opposite reaction."
    },
    {
      id: 'card5',
      front: "How does a rocket work according to Newton's Third Law?",
      back: "A rocket expels gas backward (action), which propels the rocket forward (reaction)."
    }
  ];

  // Mock concept data
  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      const mockConcept = {
        id: conceptId || 'concept-1',
        title: 'Newton\'s Laws of Motion',
        subject: 'Physics',
        topic: 'Mechanics',
        chapter: 'Classical Mechanics',
        difficulty: 'medium' as 'easy' | 'medium' | 'hard',
        estimatedTime: 25,
        prerequisiteIds: ['concept-gravity', 'concept-forces'],
        relatedConceptIds: ['concept-momentum', 'concept-energy'],
        hasInteractiveElements: true,
        lastUpdated: '2023-09-15',
      };
      
      setConceptData(mockConcept);
      setLoading(false);
    }, 500);
  }, [conceptId]);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your saved items",
    });
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };

  const handleOpenFormulaLab = () => {
    toast({
      title: "Formula Lab",
      description: "Opening formula lab for interactive practice",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Concept link copied to clipboard",
    });
  };

  if (loading) {
    return (
      <SharedPageLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </SharedPageLayout>
    );
  }

  if (!conceptData) {
    return (
      <SharedPageLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-2">Concept not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The concept you're looking for doesn't exist or has been moved.</p>
          <Button onClick={() => navigate('/dashboard/student')}>Return to Dashboard</Button>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout>
      <Helmet>
        <title>{conceptData.title} | PREPZR</title>
      </Helmet>

      {/* Back button and actions row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/dashboard/student')}
          className="w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Concepts
        </Button>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBookmarkToggle}
            className={isBookmarked ? "text-yellow-600 border-yellow-300 bg-yellow-50" : ""}
          >
            <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-yellow-600" : ""}`} />
            {isBookmarked ? "Saved" : "Save"}
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <Play className="mr-2 h-4 w-4" />
            Practice
          </Button>
        </div>
      </div>

      {/* Concept Header Card */}
      <Card className="mb-6 overflow-hidden border-t-4" style={{borderTopColor: '#4f46e5'}}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{conceptData.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400">
                  <Book className="mr-1 h-3.5 w-3.5" />
                  {conceptData.subject}
                </Badge>
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400">
                  <BookOpen className="mr-1 h-3.5 w-3.5" />
                  {conceptData.chapter}
                </Badge>
                <Badge variant={conceptData.difficulty === 'easy' ? 'outline' : conceptData.difficulty === 'medium' ? 'outline' : 'outline'} 
                  className={
                    conceptData.difficulty === 'easy' 
                      ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400'
                      : conceptData.difficulty === 'medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400'
                        : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400'
                  }
                >
                  {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="mr-1.5 h-4 w-4" />
                <span>{conceptData.estimatedTime} minutes</span>
                <span className="mx-2">•</span>
                <span>Last updated: {conceptData.lastUpdated}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg min-w-[120px]">
              <div className="text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1">Mastery Level</div>
              <div className="relative w-16 h-16">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="stroke-current text-gray-200 dark:text-gray-700"
                    fill="none"
                    strokeWidth="3"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`stroke-current ${
                      masteryLevel >= 70 ? 'text-green-500' :
                      masteryLevel >= 40 ? 'text-blue-500' : 'text-amber-500'
                    }`}
                    fill="none"
                    strokeWidth="3"
                    strokeDasharray={`${masteryLevel}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.5" textAnchor="middle" className="text-lg font-semibold fill-current">
                    {masteryLevel}%
                  </text>
                </svg>
              </div>
              <div className="mt-1 flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} 
                    className={`h-3 w-3 ${
                      i < Math.round(masteryLevel / 20) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-white dark:bg-gray-900 border-b sticky top-0 z-10 pt-2 pb-0">
          <TabsList className="w-full justify-start overflow-auto pb-0">
            <TabsTrigger value="content" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="gap-2">
              <FileText className="h-4 w-4" />
              <span>Flashcards</span>
            </TabsTrigger>
            <TabsTrigger value="formulas" className="gap-2">
              <Calculator className="h-4 w-4" />
              <span>Formulas</span>
            </TabsTrigger>
            <TabsTrigger value="mastery" className="gap-2">
              <Brain className="h-4 w-4" />
              <span>Mastery</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="content" className="mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ConceptExplanationContent conceptTitle={conceptData.title} />
            <div className="mt-6">
              <LinkedConceptsSection conceptId={conceptData.id} subject={conceptData.subject} topic={conceptData.topic} />
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="flashcards" className="mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <RelatedFlashcards flashcards={mockFlashcards} conceptTitle={conceptData.title} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="formulas" className="mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FormulaTabContent 
              conceptId={conceptData.id}
              conceptTitle={conceptData.title}
              handleOpenFormulaLab={handleOpenFormulaLab}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="mastery" className="mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Mastery Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <ConceptMasterySection conceptId={conceptData.id} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
