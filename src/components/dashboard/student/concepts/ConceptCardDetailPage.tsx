
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ConceptsPageLayout } from '../concept-cards/ConceptsPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useUserNotes } from '@/hooks/useUserNotes';
import { 
  BookOpen, 
  Volume2, 
  FileText, 
  Zap, 
  Link2, 
  Flag, 
  MessageSquare,
  Check,
  ThumbsUp,
  ThumbsDown,
  Save,
  Clock,
  BrainCircuit,
  AlertTriangle,
  PenLine
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import FloatingAvatar from '@/components/shared/FloatingAvatar';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Voice assistant for read-aloud functionality
  const { speakText, isSpeaking } = useVoiceAssistant({ userName: 'Student' });
  
  // States for various features
  const [activeTab, setActiveTab] = useState('overview');
  const [isReading, setIsReading] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [quickQuizAnswered, setQuickQuizAnswered] = useState(false);
  const [quickQuizCorrect, setQuickQuizCorrect] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  
  // Get user notes
  const { saveNote, getNoteForConcept } = useUserNotes();
  
  // Mock concept data (would be fetched from API in a real app)
  const [concept, setConcept] = useState({
    id: conceptId,
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    chapter: 'Classical Mechanics',
    difficulty: 'Medium',
    content: 'Newton\'s laws of motion are three physical laws that describe the relationship between the motion of an object and the forces acting on it. The first law states that an object either remains at rest or continues to move at a constant velocity, unless it is acted upon by an external force. The second law states that the rate of change of momentum of an object is directly proportional to the force applied. The third law states that when one object exerts a force on another object, the second object exerts an equal force in the opposite direction on the first object.',
    formulaContent: 'F = ma (Force equals mass times acceleration)\nΣF = 0 (For an object at equilibrium, the sum of forces is zero)',
    progress: 65,
    estimatedTime: 20,
    relatedConcepts: [
      { id: 'rc1', title: 'Conservation of Momentum', subject: 'Physics' },
      { id: 'rc2', title: 'Friction', subject: 'Physics' },
      { id: 'rc3', title: 'Work and Energy', subject: 'Physics' }
    ],
    quickQuiz: {
      question: "Which of Newton's laws states that every action has an equal and opposite reaction?",
      options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
      correctAnswer: 2 // Third Law (index 2 in array)
    }
  });
  
  // Load saved note on component mount
  useEffect(() => {
    const savedNote = getNoteForConcept(conceptId || '');
    if (savedNote) {
      setUserNote(savedNote);
    }
    
    // Check if concept is flagged for revision
    const flaggedConcepts = JSON.parse(localStorage.getItem('flaggedConcepts') || '[]');
    setIsFlagged(flaggedConcepts.includes(conceptId));
    
    return () => {
      // Clean up when component unmounts
      if (isReading) {
        window.speechSynthesis.cancel();
        setIsReading(false);
      }
    };
  }, [conceptId, getNoteForConcept]);
  
  const handleSaveNote = () => {
    saveNote(conceptId || '', userNote);
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
  };
  
  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    // Use the voice assistant to speak the text
    speakText(concept.content);
    setIsReading(true);
    
    // Set up a way to track when speech ends
    const checkSpeaking = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(checkSpeaking);
        setIsReading(false);
      }
    }, 100);
  };
  
  const handleFlagForRevision = () => {
    const flaggedConcepts = JSON.parse(localStorage.getItem('flaggedConcepts') || '[]');
    
    if (isFlagged) {
      const updatedList = flaggedConcepts.filter((id: string) => id !== conceptId);
      localStorage.setItem('flaggedConcepts', JSON.stringify(updatedList));
      setIsFlagged(false);
      toast({
        title: "Removed from revision",
        description: "This concept has been removed from your revision list.",
      });
    } else {
      flaggedConcepts.push(conceptId);
      localStorage.setItem('flaggedConcepts', JSON.stringify(flaggedConcepts));
      setIsFlagged(true);
      toast({
        title: "Added to revision",
        description: "This concept has been added to your revision list.",
      });
    }
  };
  
  const handleQuickQuizAnswer = (answerIndex: number) => {
    setQuickQuizAnswered(true);
    setQuickQuizCorrect(answerIndex === concept.quickQuiz.correctAnswer);
    
    if (answerIndex === concept.quickQuiz.correctAnswer) {
      toast({
        title: "Correct!",
        description: "Well done! You've got it right.",
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer is: ${concept.quickQuiz.options[concept.quickQuiz.correctAnswer]}`,
        variant: "destructive",
      });
    }
  };
  
  const handleCreateFlashcards = () => {
    toast({
      title: "Flashcards created",
      description: "Flashcards created from this concept. You can find them in your Flashcards section.",
    });
  };
  
  const resetQuickQuiz = () => {
    setQuickQuizAnswered(false);
    setQuickQuizCorrect(false);
  };

  return (
    <ConceptsPageLayout 
      showBackButton={true}
      title={concept.title}
      subtitle={`${concept.subject} > ${concept.chapter}`}
    >
      <div className="space-y-6">
        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Concept Content */}
          <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <div>
                  <Badge className={`${
                    concept.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    concept.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  } mr-2`}>
                    {concept.difficulty}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    <Clock size={14} className="mr-1" />
                    {concept.estimatedTime} min read
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className={isFlagged ? "text-red-600 border-red-600" : ""} 
                    onClick={handleFlagForRevision}
                  >
                    <Flag size={16} className={`mr-1 ${isFlagged ? "fill-red-600" : ""}`} />
                    {isFlagged ? "Flagged" : "Flag for revision"}
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleReadAloud}
                    className={isReading ? "bg-green-50 border-green-500 text-green-700" : ""}
                  >
                    <Volume2 size={16} className={`mr-1 ${isReading ? "text-green-600" : ""}`} />
                    {isReading ? "Stop reading" : "Read aloud"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">{concept.content}</p>
                  
                  {/* Formula content if available */}
                  {concept.formulaContent && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2 flex items-center">
                        <BrainCircuit size={18} className="mr-2 text-purple-600" />
                        Key Formulas
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md font-mono">
                        <pre className="whitespace-pre-wrap">{concept.formulaContent}</pre>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Your progress</h3>
                    <span className="text-sm text-muted-foreground">{concept.progress}%</span>
                  </div>
                  <Progress value={concept.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            {/* Feature Tabs */}
            <Tabs 
              defaultValue="notes" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="notes" className="text-xs sm:text-sm">
                  <PenLine size={16} className="mr-1 hidden sm:inline" />
                  Notes
                </TabsTrigger>
                <TabsTrigger value="quiz" className="text-xs sm:text-sm">
                  <Zap size={16} className="mr-1 hidden sm:inline" />
                  Quick Quiz
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="text-xs sm:text-sm">
                  <FileText size={16} className="mr-1 hidden sm:inline" />
                  Flashcards
                </TabsTrigger>
                <TabsTrigger value="related" className="text-xs sm:text-sm">
                  <Link2 size={16} className="mr-1 hidden sm:inline" />
                  Related
                </TabsTrigger>
              </TabsList>
              
              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-medium">Your Notes</h3>
                    <p className="text-sm text-muted-foreground">
                      Take notes on this concept to help with your revision
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Start typing your notes here..." 
                        className="min-h-[150px]"
                        value={userNote}
                        onChange={(e) => setUserNote(e.target.value)}
                      />
                      <Button onClick={handleSaveNote}>
                        <Save size={16} className="mr-2" />
                        Save Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Quick Quiz Tab */}
              <TabsContent value="quiz" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-medium">Quick Recall Exercise</h3>
                    <p className="text-sm text-muted-foreground">
                      Test your knowledge with a quick question about this concept
                    </p>
                  </CardHeader>
                  <CardContent>
                    {quickQuizAnswered ? (
                      <div className="space-y-4">
                        <div className={`p-4 rounded-md ${quickQuizCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                          <div className="flex items-center mb-2">
                            {quickQuizCorrect ? (
                              <Check size={20} className="text-green-600 mr-2" />
                            ) : (
                              <AlertTriangle size={20} className="text-red-600 mr-2" />
                            )}
                            <h4 className="font-medium">
                              {quickQuizCorrect ? 'Correct Answer!' : 'Not Quite Right'}
                            </h4>
                          </div>
                          <p className="text-sm">
                            {concept.quickQuiz.question}
                          </p>
                          <p className="mt-2 font-medium">
                            The correct answer is: {concept.quickQuiz.options[concept.quickQuiz.correctAnswer]}
                          </p>
                        </div>
                        <Button onClick={resetQuickQuiz} variant="outline">
                          Try again
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="font-medium">{concept.quickQuiz.question}</p>
                        <div className="grid gap-2">
                          {concept.quickQuiz.options.map((option, index) => (
                            <Button 
                              key={index} 
                              variant="outline" 
                              className="justify-start h-auto py-3 px-4"
                              onClick={() => handleQuickQuizAnswer(index)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Flashcards Tab */}
              <TabsContent value="flashcards" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-medium">Convert to Flashcards</h3>
                    <p className="text-sm text-muted-foreground">
                      Create flashcards or practice exams from this concept
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <h4 className="font-medium mb-2 flex items-center">
                        <FileText size={18} className="mr-2 text-blue-600" />
                        Flashcards
                      </h4>
                      <p className="text-sm mb-4">
                        Create a set of flashcards from this concept to help you memorize key points.
                      </p>
                      <Button onClick={handleCreateFlashcards}>
                        Create Flashcards
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <h4 className="font-medium mb-2 flex items-center">
                        <BookOpen size={18} className="mr-2 text-violet-600" />
                        Practice Exam
                      </h4>
                      <p className="text-sm mb-4">
                        Include this concept in your next practice exam.
                      </p>
                      <Button variant="outline">
                        Add to Practice Exam
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Related Concepts Tab */}
              <TabsContent value="related" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-medium">Related Concepts</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore concepts related to {concept.title}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {concept.relatedConcepts.map((related) => (
                        <Button 
                          key={related.id}
                          variant="outline" 
                          className="justify-between h-auto py-3"
                          onClick={() => navigate(`/dashboard/student/concepts/${related.id}`)}
                        >
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{related.title}</span>
                            <span className="text-xs text-muted-foreground">{related.subject}</span>
                          </div>
                          <Link2 size={18} />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - Engagement Features */}
          {!isMobile && (
            <div className="w-full md:w-1/3 space-y-6">
              {/* AI Tutor */}
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-medium flex items-center">
                    <MessageSquare size={18} className="mr-2 text-blue-600" />
                    Ask Sakha AI
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Have questions about this concept? Ask Sakha AI for help!
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => setShowAITutor(!showAITutor)}
                  >
                    {showAITutor ? 'Close AI Tutor' : 'Open AI Tutor'} 
                  </Button>
                </CardContent>
              </Card>
              
              {/* Was this helpful box */}
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-medium">Was this helpful?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Your feedback helps us improve our content.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <ThumbsUp size={16} className="mr-2" />
                      Yes
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ThumbsDown size={16} className="mr-2" />
                      No
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Progress box */}
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-medium">Your Progress</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall completion</span>
                      <span>{concept.progress}%</span>
                    </div>
                    <Progress value={concept.progress} className="h-2" />
                    
                    {/* Progress checklist */}
                    <div className="pt-4 space-y-2">
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${concept.progress > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          <Check size={12} />
                        </div>
                        <span className="text-sm">Started concept</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${userNote ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          <Check size={12} />
                        </div>
                        <span className="text-sm">Added notes</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${quickQuizAnswered && quickQuizCorrect ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          <Check size={12} />
                        </div>
                        <span className="text-sm">Completed quiz</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile AI Tutor */}
      {(isMobile || showAITutor) && <FloatingAvatar />}
    </ConceptsPageLayout>
  );
};

export default ConceptCardDetailPage;
