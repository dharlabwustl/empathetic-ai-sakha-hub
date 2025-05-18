
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import { ConceptsPageLayout } from '@/components/dashboard/student/concept-cards/ConceptsPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { 
  BookOpen, Flag, MessageSquare, Bookmark, Book, Brain, 
  Play, CircleCheck, FileText, Calculator, PenTool, 
  Clock, CheckCircle2, Video, ExternalLink, LightbulbIcon, 
  FlaskConical, Share2, Award, Library
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  const [activeTab, setActiveTab] = useState('content');
  const [userNotes, setUserNotes] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const navigate = useNavigate();
  
  // Load saved user data on component mount
  useEffect(() => {
    if (conceptCard) {
      // Load saved notes
      const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
      if (savedNotes) setUserNotes(savedNotes);
      
      // Load bookmark state
      const bookmarkState = localStorage.getItem(`concept-bookmark-${conceptId}`);
      if (bookmarkState) setBookmarked(bookmarkState === 'true');
      
      // Load flag state
      const flagState = localStorage.getItem(`concept-flag-${conceptId}`);
      if (flagState) setFlagged(flagState === 'true');
    }
  }, [conceptCard, conceptId]);

  // Save notes whenever they change
  useEffect(() => {
    if (conceptId && userNotes.trim()) {
      localStorage.setItem(`concept-notes-${conceptId}`, userNotes);
    }
  }, [userNotes, conceptId]);
  
  // Stop speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (isReading) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isReading]);
  
  if (loading) {
    return <LoadingState message="Loading concept details..." />;
  }
  
  if (!conceptCard) {
    return (
      <ErrorState 
        title="Concept Not Found" 
        message="We couldn't find the requested concept. Please try another one." 
        action={
          <Button onClick={() => navigate('/dashboard/student/concepts')}>
            Go to Concepts
          </Button>
        }
      />
    );
  }
  
  // Toggle bookmark
  const handleBookmarkToggle = () => {
    const newState = !bookmarked;
    setBookmarked(newState);
    localStorage.setItem(`concept-bookmark-${conceptId}`, String(newState));
    toast(newState ? "Concept bookmarked" : "Bookmark removed");
  };
  
  // Toggle flag for revision
  const handleFlagToggle = () => {
    const newState = !flagged;
    setFlagged(newState);
    localStorage.setItem(`concept-flag-${conceptId}`, String(newState));
    toast(newState ? "Flagged for revision" : "Flag removed");
  };
  
  // Toggle text-to-speech reading
  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    // Create content to read based on active tab
    let textToRead = '';
    
    switch(activeTab) {
      case 'content':
        textToRead = conceptCard.content;
        break;
      case 'examples':
        textToRead = conceptCard.examples?.join(". ") || "No examples available.";
        break;
      case 'mistakes':
        textToRead = conceptCard.commonMistakes?.join(". ") || "No common mistakes information available.";
        break;
      case 'examRelevance':
        textToRead = conceptCard.examRelevance || "No exam relevance information available.";
        break;
      default:
        textToRead = conceptCard.content;
    }
    
    // Create and play speech synthesis
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    speechSynthesisRef.current = utterance;
    
    utterance.onend = () => {
      setIsReading(false);
    };
    
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
    toast("Reading content aloud...");
  };

  // Quick recall flashcard function
  const handleQuickRecall = () => {
    toast("Starting quick recall session...");
    // Navigate to flashcard with this concept ID
    // This would be implemented based on your app's flashcard system
    navigate(`/dashboard/student/flashcards/${conceptId}/practice`);
  };

  // Navigate to formula lab
  const handleFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
    toast("Opening Formula Lab...");
  };
  
  return (
    <ConceptsPageLayout
      showBackButton={true}
      title={conceptCard.title}
      subtitle={`${conceptCard.subject} > ${conceptCard.chapter || 'General'}`}
    >
      <div className="space-y-5">
        {/* Enhanced Header Card with Progress */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-900"
        >
          <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-start justify-between'}`}>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={getBadgeStyle(conceptCard.difficulty)}>
                  {conceptCard.difficulty}
                </Badge>
                {conceptCard.completed && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                    <CircleCheck className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                  <Clock className="h-3 w-3 mr-1" />
                  {conceptCard.estimatedTime} mins
                </Badge>
              </div>
              
              {/* Mastery Progress */}
              <div className="space-y-1 max-w-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-medium">Mastery Progress</span>
                  </div>
                  <span className="text-sm font-bold">{conceptCard.progress || 0}%</span>
                </div>
                <Progress 
                  value={conceptCard.progress || 0} 
                  className="h-2 bg-indigo-100 dark:bg-indigo-950"
                  indicatorClassName="bg-gradient-to-r from-indigo-500 to-blue-500" 
                />
              </div>
            </div>
            
            <div className={`flex flex-wrap ${isMobile ? 'gap-2 w-full justify-between' : 'gap-2'}`}>
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                onClick={handleReadAloud}
                className={isReading ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900/20" : ""}
              >
                <Play className={`h-4 w-4 mr-2 ${isReading ? "text-blue-700 dark:text-blue-400" : ""}`} />
                {isReading ? "Stop" : "Read Aloud"}
              </Button>
              
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                onClick={handleBookmarkToggle}
                className={bookmarked ? "bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-900/20" : ""}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${bookmarked ? "text-purple-700 dark:text-purple-400" : ""}`} />
                {bookmarked ? "Saved" : "Save"}
              </Button>
              
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                onClick={handleFlagToggle}
                className={flagged ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-900/20" : ""}
              >
                <Flag className={`h-4 w-4 mr-2 ${flagged ? "text-amber-700 dark:text-amber-400" : ""}`} />
                {flagged ? "Flagged" : "Flag"}
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button 
            variant="secondary" 
            size={isMobile ? "sm" : "default"} 
            className="justify-start"
            onClick={handleQuickRecall}
          >
            <Brain className="h-4 w-4 mr-2 text-purple-600" />
            <span>Quick Recall</span>
          </Button>
          
          <Button 
            variant="secondary" 
            size={isMobile ? "sm" : "default"} 
            className="justify-start"
            onClick={handleFormulaLab}
          >
            <Calculator className="h-4 w-4 mr-2 text-blue-600" />
            <span>Formula Lab</span>
          </Button>
          
          <Button 
            variant="secondary" 
            size={isMobile ? "sm" : "default"} 
            className="justify-start"
            onClick={() => {
              navigate(`/dashboard/student/flashcards/${conceptId}`);
              toast("Opening flashcards...");
            }}
          >
            <Library className="h-4 w-4 mr-2 text-green-600" />
            <span>Flashcards</span>
          </Button>
          
          <Button 
            variant="secondary" 
            size={isMobile ? "sm" : "default"} 
            className="justify-start"
            onClick={() => {
              toast("Taking practice exam...");
              navigate(`/dashboard/student/practice-exam`);
            }}
          >
            <FileText className="h-4 w-4 mr-2 text-red-600" />
            <span>Practice Exam</span>
          </Button>
        </div>
        
        {/* Enhanced Concept Tabs */}
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`${isMobile ? 'grid-cols-2 gap-1 mb-3 overflow-x-auto max-w-full flex flex-wrap' : 'grid w-full grid-cols-5'}`}>
            <TabsTrigger value="content" className={isMobile ? "text-xs py-1.5 px-2" : ""}>Content</TabsTrigger>
            <TabsTrigger value="examples" className={isMobile ? "text-xs py-1.5 px-2" : ""}>Examples</TabsTrigger>
            <TabsTrigger value="mistakes" className={isMobile ? "text-xs py-1.5 px-2" : ""}>Common Mistakes</TabsTrigger>
            <TabsTrigger value="examRelevance" className={isMobile ? "text-xs py-1.5 px-2" : ""}>Exam Relevance</TabsTrigger>
            <TabsTrigger value="notes" className={isMobile ? "text-xs py-1.5 px-2" : ""}>My Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="prose dark:prose-invert max-w-none"
            >
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                <p className="text-base leading-relaxed">{conceptCard.content}</p>
                
                {conceptCard.keyPoints && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <LightbulbIcon className="h-5 w-5 mr-2 text-amber-500" />
                      Key Points
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 mt-3">
                      {Array.isArray(conceptCard.keyPoints) ? 
                        conceptCard.keyPoints.map((point, index) => (
                          <li key={index} className="pl-2">{point}</li>
                        )) : 
                        <li>No key points available</li>
                      }
                    </ul>
                  </div>
                )}
                
                {conceptCard.formulas && (
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-900/50">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <FlaskConical className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Formulas
                    </h3>
                    <div className="grid gap-3 mt-2">
                      {Array.isArray(conceptCard.formulas) ?
                        conceptCard.formulas.map((formula, index) => (
                          <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded border border-blue-100 dark:border-blue-900/30 font-mono text-sm">
                            {formula}
                          </div>
                        )) :
                        <p>No formulas available</p>
                      }
                    </div>
                  </div>
                )}
                
                {/* Video Resources Section */}
                {conceptCard.videos && conceptCard.videos.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Video className="h-5 w-5 mr-2 text-red-500" />
                      Video Lessons
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      {conceptCard.videos.map((video, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                          {video.thumbnail ? (
                            <div className="relative aspect-video">
                              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
                                <Button variant="ghost" className="text-white bg-black bg-opacity-50 rounded-full h-12 w-12 p-0 hover:scale-110 transition-transform">
                                  <Play className="h-6 w-6" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-200 dark:bg-gray-700 aspect-video flex items-center justify-center">
                              <Play className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <div className="p-3">
                            <h4 className="font-medium text-sm line-clamp-1">{video.title}</h4>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-xs text-gray-500">{video.duration}</p>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Watch
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Additional Resources */}
                {conceptCard.resources && conceptCard.resources.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-green-600 dark:text-green-500" />
                      Additional Resources
                    </h3>
                    <div className="grid gap-2 mt-2">
                      {conceptCard.resources.map((resource, index) => (
                        <a 
                          key={index} 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center p-3 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                        >
                          <div className="mr-3 bg-green-50 dark:bg-green-900/30 p-2 rounded-md">
                            <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{resource.title}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{resource.type}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="examples" className="mt-4 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {conceptCard.examples && conceptCard.examples.length > 0 ? (
                <div className="space-y-4">
                  {conceptCard.examples.map((example, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 h-6 w-6 rounded-full flex items-center justify-center mr-2 text-sm font-medium">
                          {index + 1}
                        </div>
                        <h3 className="font-medium">Example {index + 1}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{example}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  <BookOpen className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-500 italic">No examples available for this concept.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="mistakes" className="mt-4 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {conceptCard.commonMistakes && conceptCard.commonMistakes.length > 0 ? (
                <div className="space-y-3">
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-lg mb-4">
                    <h3 className="font-medium text-lg flex items-center text-amber-800 dark:text-amber-300 mb-2">
                      <Flag className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
                      Common Mistakes to Avoid
                    </h3>
                    <p className="text-amber-700 dark:text-amber-400 text-sm">Being aware of these common errors will help you avoid them in exams and assignments.</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                      {conceptCard.commonMistakes.map((mistake, index) => (
                        <li key={index} className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 h-6 w-6 rounded-full flex items-center justify-center mt-0.5 shrink-0 text-sm font-medium">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{mistake}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  <Flag className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-gray-500 italic">No common mistakes listed for this concept.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="examRelevance" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                {conceptCard.examRelevance ? (
                  <div className="space-y-6 p-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30 p-4">
                      <h3 className="font-medium text-lg flex items-center text-blue-800 dark:text-blue-300 mb-2">
                        <Award className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Exam Relevance
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">{conceptCard.examRelevance}</p>
                    </div>
                    
                    {/* Practice Questions Section */}
                    {conceptCard.practiceQuestions && conceptCard.practiceQuestions.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-medium text-lg mb-4 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                          Practice Questions
                        </h3>
                        <div className="space-y-6">
                          {conceptCard.practiceQuestions.map((question, qIndex) => (
                            <div 
                              key={qIndex} 
                              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50"
                            >
                              <h4 className="font-medium mb-3 flex items-start">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 h-6 w-6 rounded-full flex items-center justify-center mr-2 text-sm font-medium shrink-0 mt-0.5">
                                  {qIndex + 1}
                                </div>
                                <span>{question.question}</span>
                              </h4>
                              
                              <div className="space-y-2 mt-4">
                                {question.options.map((option, oIndex) => (
                                  <div 
                                    key={oIndex}
                                    className={`p-3 rounded-md border ${
                                      option === question.correctAnswer 
                                        ? 'border-green-200 bg-green-50 dark:border-green-800/80 dark:bg-green-900/20' 
                                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
                                    } hover:border-gray-300 dark:hover:border-gray-700 transition-colors`}
                                  >
                                    <div className="flex items-center">
                                      <span className="mr-2 font-medium text-gray-700 dark:text-gray-300">
                                        {String.fromCharCode(65 + oIndex)}.
                                      </span>
                                      <p className="text-gray-700 dark:text-gray-300">{option}</p>
                                      {option === question.correctAnswer && (
                                        <CheckCircle2 className="ml-auto h-5 w-5 text-green-600 dark:text-green-500" />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              {question.explanation && (
                                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-900/30">
                                  <h5 className="font-medium mb-1 text-sm text-amber-800 dark:text-amber-300">Explanation:</h5>
                                  <p className="text-amber-700 dark:text-amber-400 text-sm">{question.explanation}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-500 italic">No exam relevance information available for this concept.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                  <h3 className="font-medium text-lg flex items-center mb-4">
                    <PenTool className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    My Notes
                  </h3>
                  <Textarea 
                    placeholder="Add your notes here to help you remember key points..."
                    className="min-h-[200px] resize-y border-gray-300 dark:border-gray-700"
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                  />
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => {
                        localStorage.setItem(`concept-notes-${conceptId}`, userNotes);
                        toast("Notes saved successfully");
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Save Notes
                    </Button>
                  </div>
                </div>
                
                {/* Related Concepts Section */}
                {conceptCard.relatedConcepts && conceptCard.relatedConcepts.length > 0 && (
                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                    <h3 className="font-medium text-lg flex items-center mb-4">
                      <Share2 className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Related Concepts
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {conceptCard.relatedConcepts.map((conceptId, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 transition-colors"
                          onClick={() => navigate(`/dashboard/student/concepts/${conceptId}`)}
                        >
                          <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                          Related Concept {index + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptsPageLayout>
  );
};

// Helper function to get badge style based on difficulty
const getBadgeStyle = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    case 'medium':
      return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800';
    case 'hard':
      return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
  }
};

export default ConceptCardDetailPage;
