
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  MessageCircle, 
  Flag, 
  Brain, 
  CheckCircle, 
  FlaskConical, 
  RefreshCw, 
  Star,
  Volume2, 
  VolumeX,
  Award,
  LightbulbIcon,
  History,
  MessageSquare,
  ArrowUpRight,
  CheckSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import ConceptContent from './concept-detail/ConceptContent';
import FormulaTabContent from './concept-detail/FormulaTabContent';
import QuickRecallSection from './concept-detail/QuickRecallSection';
import LinkedConceptsSection from './concept-detail/LinkedConceptsSection';
import AskTutorSection from './concept-detail/AskTutorSection';
import RevisionSection from './concept-detail/RevisionSection';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export interface ConceptDetailProps {
  conceptId: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  content: string;
  masteryLevel?: number;
  onMasteryUpdate?: (newLevel: number) => void;
  handleOpenFormulaLab?: () => void;
}

const EnhancedConceptDetail: React.FC<ConceptDetailProps> = ({ 
  conceptId, 
  title, 
  subject, 
  topic, 
  difficulty,
  content,
  masteryLevel = 0,
  onMasteryUpdate,
  handleOpenFormulaLab
}) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isFormulaLabOpen, setIsFormulaLabOpen] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [validationCompleted, setValidationCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const isMobile = useIsMobile();

  const { toast } = useToast();

  // Insight data
  const conceptInsights = {
    importance: 'High',
    frequentlyAsked: true,
    lastRevised: '3 days ago',
    examFrequency: '85%',
    relatedInsights: [
      'This concept appears in at least 1 question every year',
      'Often combined with Conservation of Energy in problems',
      'Visual representations help 78% of students understand better'
    ]
  };

  // Learning analytics
  const learningAnalytics = {
    averageTimeSpent: '15 minutes',
    completionRate: '92%',
    studentsStruggling: '23%',
    topMisconception: 'Confusion between weight and mass'
  };

  // Learn history (mock data)
  const learnHistory = [
    { date: '2023-05-15', activity: 'First viewed', duration: '10m', score: null },
    { date: '2023-05-18', activity: 'Revisited concept', duration: '8m', score: null },
    { date: '2023-05-20', activity: 'Took quiz', duration: '5m', score: '80%' },
    { date: '2023-05-25', activity: 'Revision', duration: '12m', score: null },
    { date: '2023-06-01', activity: 'Practice test', duration: '4m', score: '90%' }
  ];

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved successfully",
      description: "Your notes have been saved for this concept.",
      variant: "default",
    });
  };

  const openFormulaLab = () => {
    if (handleOpenFormulaLab) {
      handleOpenFormulaLab();
    } else {
      setIsFormulaLabOpen(true);
      toast({
        title: "Formula Lab",
        description: "Opening formula lab...",
        variant: "default",
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your saved items",
      variant: "default",
    });
  };

  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Removed from revision" : "Flagged for revision",
      description: isFlagged 
        ? "This concept has been removed from your revision list" 
        : "This concept has been added to your revision list",
      variant: "default",
    });
  };

  // Handle quiz completion and mastery update
  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setValidationCompleted(true);

    // Update mastery level based on quiz performance
    if (onMasteryUpdate) {
      // Calculate new mastery level (this is a simplified example)
      const improvement = score / 100 * 20; // Max 20% improvement based on score
      const newMasteryLevel = Math.min(100, Math.round(masteryLevel + improvement));
      onMasteryUpdate(newMasteryLevel);
    }

    toast({
      title: "Knowledge validation complete",
      description: `You scored ${score}% on the concept quiz.`,
      variant: "default",
    });
  };

  const toggleReadAloud = () => {
    setIsReadingAloud(!isReadingAloud);
    
    if (!isReadingAloud) {
      // Start reading
      const cleanText = content.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsReadingAloud(false);
      speechSynthesis.speak(utterance);
    } else {
      // Stop reading
      speechSynthesis.cancel();
    }
  };

  // Difficulty badge color
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30',
    medium: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30',
    hard: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30'
  };

  // Main content area - Tabs and content display
  return (
    <div className="space-y-6">
      {/* Header info section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="outline" className="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/30">
            {subject}
          </Badge>
          <Badge variant="outline" className="bg-violet-100 dark:bg-violet-900/20 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-800/30">
            {topic}
          </Badge>
          <Badge variant="outline" className={difficultyColor[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
        
        {/* Mastery progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Brain className="h-4 w-4 mr-1.5 text-indigo-500" /> 
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Concept Mastery</span>
            </div>
            <span className="text-sm font-medium">{masteryLevel}%</span>
          </div>
          <Progress 
            value={masteryLevel} 
            className="h-2 bg-gray-100 dark:bg-gray-700"
          />
        </div>
        
        {/* Badges and insights */}
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
            <Award className="h-3.5 w-3.5 mr-1 text-amber-500" />
            <span>Importance: {conceptInsights.importance}</span>
          </div>
          
          {conceptInsights.frequentlyAsked && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
              <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
              <span>Frequently Asked</span>
            </div>
          )}
          
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
            <History className="h-3.5 w-3.5 mr-1 text-blue-500" />
            <span>Last Revised: {conceptInsights.lastRevised}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
            <LightbulbIcon className="h-3.5 w-3.5 mr-1 text-purple-500" />
            <span>Exam Frequency: {conceptInsights.examFrequency}</span>
          </div>
        </div>
      </div>

      {/* Main content and sidebar layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content area */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 p-0 h-auto">
                <TabsTrigger 
                  value="content" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <BookOpen className="h-4 w-4" /> {!isMobile && "Content"}
                </TabsTrigger>
                <TabsTrigger 
                  value="formulas" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <FlaskConical className="h-4 w-4" /> {!isMobile && "Formulas"}
                </TabsTrigger>
                <TabsTrigger 
                  value="recall" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <Brain className="h-4 w-4" /> {!isMobile && "Practice"}
                </TabsTrigger>
                <TabsTrigger 
                  value="linked" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <RefreshCw className="h-4 w-4" /> {!isMobile && "Related"}
                </TabsTrigger>
                <TabsTrigger 
                  value="tutor" 
                  className="flex items-center gap-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                >
                  <MessageCircle className="h-4 w-4" /> {!isMobile && "Ask Tutor"}
                </TabsTrigger>
              </TabsList>
              
              <div className="p-0">
                <TabsContent value="content" className="mt-0">
                  <ConceptContent 
                    content={content}
                    conceptId={conceptId}
                    userNotes={userNotes}
                    setUserNotes={setUserNotes}
                    handleSaveNotes={handleSaveNotes}
                    isReadingAloud={isReadingAloud}
                    setIsReadingAloud={setIsReadingAloud}
                  />
                </TabsContent>
                
                <TabsContent value="formulas" className="mt-0">
                  <FormulaTabContent 
                    conceptId={conceptId} 
                    conceptTitle={title}
                    handleOpenFormulaLab={openFormulaLab}
                  />
                </TabsContent>
                
                <TabsContent value="recall" className="mt-0">
                  <QuickRecallSection 
                    conceptId={conceptId} 
                    title={title} 
                    content={content}
                    onQuizComplete={handleQuizComplete}
                  />
                </TabsContent>
                
                <TabsContent value="linked" className="mt-0">
                  <LinkedConceptsSection 
                    conceptId={conceptId}
                    subject={subject}
                    topic={topic}
                  />
                </TabsContent>
                
                <TabsContent value="tutor" className="mt-0">
                  <AskTutorSection 
                    conceptId={conceptId}
                    title={title}
                    subject={subject}
                    topic={topic}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
        
        {/* Right sidebar */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Quick actions card */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-indigo-500" /> 
                Quick Actions
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start h-9 text-xs"
                  onClick={toggleReadAloud}
                >
                  {isReadingAloud ? <VolumeX className="h-3.5 w-3.5 mr-1.5" /> : <Volume2 className="h-3.5 w-3.5 mr-1.5" />}
                  {isReadingAloud ? "Stop" : "Read Aloud"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`justify-start h-9 text-xs ${isFlagged ? 'border-amber-500 text-amber-600 dark:border-amber-700 dark:text-amber-400' : ''}`}
                  onClick={handleToggleFlag}
                >
                  <Flag className="h-3.5 w-3.5 mr-1.5" />
                  {isFlagged ? "Remove Flag" : "Flag"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start h-9 text-xs"
                  onClick={openFormulaLab}
                >
                  <FlaskConical className="h-3.5 w-3.5 mr-1.5" />
                  Formula Lab
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`justify-start h-9 text-xs ${isBookmarked ? 'border-blue-500 text-blue-600 dark:border-blue-700 dark:text-blue-400' : ''}`}
                  onClick={handleBookmark}
                >
                  <Star className="h-3.5 w-3.5 mr-1.5" />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
              </div>
              
              {validationCompleted && quizScore !== null && (
                <div className="flex items-center justify-between px-2 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mr-2" />
                    <span className="text-xs font-medium text-green-700 dark:text-green-400">
                      Quiz Score
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700 text-xs h-5">
                    {quizScore}%
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Learning Insights */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <LightbulbIcon className="h-4 w-4 text-amber-500" /> 
                Learning Insights
              </div>
              
              <div className="space-y-2 text-sm">
                {conceptInsights.relatedInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                    <p className="text-xs">{insight}</p>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Avg. Time Spent</div>
                  <div className="font-medium">{learningAnalytics.averageTimeSpent}</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Completion Rate</div>
                  <div className="font-medium">{learningAnalytics.completionRate}</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Students Struggling</div>
                  <div className="font-medium">{learningAnalytics.studentsStruggling}</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Top Misconception</div>
                  <div className="font-medium text-red-600 dark:text-red-400 truncate" title={learningAnalytics.topMisconception}>
                    {learningAnalytics.topMisconception}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Learn History Button */}
          <Button 
            variant="outline" 
            className="w-full justify-between"
            onClick={() => setShowHistory(!showHistory)}
          >
            <span className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              Your Learn History
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          
          {/* History dropdown */}
          {showHistory && (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm animate-accordion-down">
              <CardContent className="p-4 space-y-2">
                <div className="text-sm font-medium">Your Activity History</div>
                <div className="space-y-2">
                  {learnHistory.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <div>
                        <div className="font-medium">{item.activity}</div>
                        <div className="text-gray-500">{item.date}</div>
                      </div>
                      <div className="text-right">
                        <div>{item.duration}</div>
                        {item.score && (
                          <div className="font-medium text-green-600 dark:text-green-400">{item.score}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Revision Section */}
          <RevisionSection 
            conceptId={conceptId}
            isFlagged={isFlagged}
            onToggleFlag={handleToggleFlag}
          />
        </motion.div>
      </div>
      
      {/* Style for content */}
      <style jsx global>{`
        .concept-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #4F46E5;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .concept-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #6366F1;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        
        .concept-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        
        .concept-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .concept-content li {
          margin-bottom: 0.5rem;
        }
        
        .dark .concept-content h2 {
          color: #818CF8;
        }
        
        .dark .concept-content h3 {
          color: #A5B4FC;
        }
      `}</style>
    </div>
  );
};

export default EnhancedConceptDetail;
