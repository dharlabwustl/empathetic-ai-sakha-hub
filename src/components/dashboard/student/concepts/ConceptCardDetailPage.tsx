
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
import { BookOpen, Flag, MessageSquare, Bookmark, Book, Brain, Play, CircleCheck } from 'lucide-react';
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
  
  return (
    <ConceptsPageLayout
      showBackButton={true}
      title={conceptCard.title}
      subtitle={`${conceptCard.subject} > ${conceptCard.chapter}`}
    >
      <div className="space-y-6">
        {/* Concept Header with Progress */}
        <div className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-between'}`}>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getBadgeStyle(conceptCard.difficulty)}>
                {conceptCard.difficulty}
              </Badge>
              {conceptCard.completed && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CircleCheck className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            <div className={`flex items-center gap-4 ${isMobile ? 'mt-2' : ''}`}>
              <div className="flex items-center gap-1">
                <Book className="h-4 w-4 text-purple-500" />
                <span className="text-sm">{conceptCard.estimatedTime} mins</span>
              </div>
              <div className="flex items-center gap-1">
                <Brain className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Mastery: {conceptCard.progress || 0}%</span>
              </div>
            </div>
          </div>
          
          <div className={`flex items-center gap-2 ${isMobile ? 'mt-2' : ''}`}>
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={handleReadAloud}
              className={isReading ? "bg-blue-50 text-blue-700 border-blue-300" : ""}
            >
              <Play className={`h-4 w-4 mr-2 ${isReading ? "text-blue-700" : ""}`} />
              {isReading ? "Stop Reading" : "Read Aloud"}
            </Button>
            
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={handleBookmarkToggle}
              className={bookmarked ? "bg-purple-50 text-purple-700 border-purple-300" : ""}
            >
              <Bookmark className={`h-4 w-4 mr-2 ${bookmarked ? "text-purple-700" : ""}`} />
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              onClick={handleFlagToggle}
              className={flagged ? "bg-amber-50 text-amber-700 border-amber-300" : ""}
            >
              <Flag className={`h-4 w-4 mr-2 ${flagged ? "text-amber-700" : ""}`} />
              {flagged ? "Flagged" : "Flag"}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mastery Progress</span>
            <span className="text-sm">{conceptCard.progress || 0}%</span>
          </div>
          <Progress value={conceptCard.progress || 0} className="h-2" />
        </div>
        
        {/* Concept Tabs */}
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid ${isMobile ? 'grid-cols-2 gap-2 mb-4' : 'w-full grid-cols-5'}`}>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
            <TabsTrigger value="examRelevance">Exam Relevance</TabsTrigger>
            <TabsTrigger value="notes">My Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-4">
            <div className="prose dark:prose-invert max-w-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-base leading-relaxed">{conceptCard.content}</p>
                
                {conceptCard.keyPoints && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Key Points</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {Array.isArray(conceptCard.keyPoints) ? 
                        conceptCard.keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        )) : 
                        <li>No key points available</li>
                      }
                    </ul>
                  </div>
                )}
                
                {conceptCard.formulas && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Formulas</h3>
                    <div className="space-y-2">
                      {Array.isArray(conceptCard.formulas) ?
                        conceptCard.formulas.map((formula, index) => (
                          <div key={index} className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
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
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Video Lessons</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {conceptCard.videos.map((video, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                          {video.thumbnail ? (
                            <div className="relative aspect-video">
                              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <Button variant="ghost" className="text-white bg-black bg-opacity-50 rounded-full h-12 w-12 p-0">
                                  <Play className="h-6 w-6" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-200 dark:bg-gray-800 aspect-video flex items-center justify-center">
                              <Play className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                          <div className="p-3">
                            <h4 className="font-medium text-sm line-clamp-1">{video.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Additional Resources */}
                {conceptCard.resources && conceptCard.resources.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Additional Resources</h3>
                    <div className="space-y-2">
                      {conceptCard.resources.map((resource, index) => (
                        <a 
                          key={index} 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center p-3 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900"
                        >
                          <div className="mr-3">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-xs text-gray-500">{resource.type}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
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
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800">
                      <h3 className="font-medium mb-2">Example {index + 1}</h3>
                      <p>{example}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No examples available for this concept.</p>
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
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Common Mistakes to Avoid</h3>
                  <ul className="space-y-3">
                    {conceptCard.commonMistakes.map((mistake, index) => (
                      <li key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800/30">
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-red-600 dark:text-red-400 mt-0.5">•</span>
                          <p>{mistake}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 italic">No common mistakes listed for this concept.</p>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="examRelevance" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {conceptCard.examRelevance ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Exam Relevance</h3>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800/30">
                    <p>{conceptCard.examRelevance}</p>
                  </div>
                  
                  {/* Practice Questions Section */}
                  {conceptCard.practiceQuestions && conceptCard.practiceQuestions.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-medium text-lg mb-4">Practice Questions</h3>
                      <div className="space-y-6">
                        {conceptCard.practiceQuestions.map((question, qIndex) => (
                          <div 
                            key={qIndex} 
                            className="p-4 border border-gray-200 dark:border-gray-800 rounded-md"
                          >
                            <h4 className="font-medium mb-3">Question {qIndex + 1}</h4>
                            <p className="mb-4">{question.question}</p>
                            
                            <div className="space-y-2">
                              {question.options.map((option, oIndex) => (
                                <div 
                                  key={oIndex}
                                  className={`p-3 rounded-md border ${
                                    option === question.correctAnswer 
                                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                                      : 'border-gray-200 dark:border-gray-800'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <span className="mr-2 font-medium">{String.fromCharCode(65 + oIndex)}.</span>
                                    <p>{option}</p>
                                    {option === question.correctAnswer && (
                                      <CircleCheck className="ml-auto h-5 w-5 text-green-600" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {question.explanation && (
                              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800/30">
                                <h5 className="font-medium mb-1">Explanation:</h5>
                                <p>{question.explanation}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 italic">No exam relevance information available for this concept.</p>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <h3 className="font-medium text-lg">My Notes</h3>
                <Textarea 
                  placeholder="Add your notes here..."
                  className="min-h-[200px] resize-y"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={() => {
                      localStorage.setItem(`concept-notes-${conceptId}`, userNotes);
                      toast("Notes saved successfully");
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Save Notes
                  </Button>
                </div>
              </div>
              
              {/* Related Concepts Section */}
              {conceptCard.relatedConcepts && conceptCard.relatedConcepts.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-4">Related Concepts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {conceptCard.relatedConcepts.map((conceptId, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start"
                        onClick={() => navigate(`/dashboard/student/concepts/${conceptId}`)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Related Concept {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
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
      return 'bg-green-50 text-green-700 border-green-200';
    case 'medium':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'hard':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export default ConceptCardDetailPage;
