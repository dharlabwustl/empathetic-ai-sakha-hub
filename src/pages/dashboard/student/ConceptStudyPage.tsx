
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, BookOpen, Bookmark, PlayCircle, Edit, MessageSquare, Star, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EnhancedConceptDetail from '@/components/dashboard/student/concepts/EnhancedConceptDetail';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [conceptData, setConceptData] = useState<any>(null);
  const [readAloudActive, setReadAloudActive] = useState(false);
  const [notes, setNotes] = useState<string>("");
  const [isFlagged, setIsFlagged] = useState(false);
  
  useEffect(() => {
    console.log("Pages/ConceptStudyPage - Loading concept with ID:", conceptId);
    
    if (conceptId) {
      // Show toast notification
      toast({
        title: "Loading concept details",
        description: "Please wait while we prepare your concept study materials",
      });
      
      // In a real app, fetch concept data from API here
      // For now, simulate loading and use mock data
      const timer = setTimeout(() => {
        // Mock concept data for demonstration
        setConceptData({
          id: conceptId,
          title: "Newton's Laws of Motion",
          subject: "Physics",
          chapter: "Classical Mechanics",
          difficulty: "Medium",
          masteryLevel: 75,
          description: "Newton's laws of motion are three physical laws that together laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.",
          keyPoints: [
            "First Law: An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.",
            "Second Law: Force equals mass times acceleration (F = ma).",
            "Third Law: For every action, there is an equal and opposite reaction."
          ],
          examples: [
            "A book lying on a table remains at rest due to the first law.",
            "When kicking a ball, the force applied determines its acceleration (second law).",
            "When rowing a boat, the paddle exerts force on water, and water exerts equal force back (third law)."
          ],
          relatedConcepts: [
            { id: "concept-123", title: "Conservation of Momentum" },
            { id: "concept-456", title: "Friction and Forces" },
            { id: "concept-789", title: "Work and Energy" }
          ],
          relevantFormulas: [
            { id: "formula-1", formula: "F = ma", name: "Newton's Second Law" },
            { id: "formula-2", formula: "p = mv", name: "Linear Momentum" }
          ],
          flashcards: [
            { id: "flashcard-1", question: "What is Newton's First Law?", answer: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force." },
            { id: "flashcard-2", question: "What is the formula for Newton's Second Law?", answer: "F = ma (Force equals mass times acceleration)" }
          ],
          practiceQuestions: [
            {
              id: "question-1",
              text: "A 5 kg object accelerates at 2 m/s² when a force is applied. What is the magnitude of the force?",
              options: [
                "5 N",
                "7 N",
                "10 N",
                "15 N"
              ],
              correctOption: 2
            }
          ]
        });
        setLoading(false);
      }, 1200);
      
      return () => clearTimeout(timer);
    } else {
      console.error("ConceptStudyPage: Missing conceptId parameter");
      navigate('/dashboard/student/concepts', { replace: true });
    }
  }, [conceptId, navigate, toast]);
  
  const handleReadAloud = () => {
    setReadAloudActive(!readAloudActive);
    if (!readAloudActive) {
      // Use browser's text-to-speech API
      const speech = new SpeechSynthesisUtterance();
      speech.text = conceptData?.description + " " + conceptData?.keyPoints.join(". ");
      speech.rate = 0.9;
      speech.pitch = 1.0;
      window.speechSynthesis.speak(speech);
      
      toast({
        title: "Read Aloud Started",
        description: "Listening to concept explanation",
      });
    } else {
      // Stop reading
      window.speechSynthesis.cancel();
      
      toast({
        title: "Read Aloud Stopped",
        description: "Audio playback has been stopped",
      });
    }
  };
  
  const handleSaveNotes = () => {
    // In a real app, save notes to backend
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully",
    });
  };
  
  const handleToggleFlag = () => {
    setIsFlagged(!isFlagged);
    toast({
      title: isFlagged ? "Removed from Revision List" : "Added to Revision List",
      description: isFlagged 
        ? "This concept has been removed from your revision list" 
        : "This concept has been added to your revision list",
    });
  };
  
  const handleAskAI = () => {
    // In a real app, open AI tutor chat with context
    navigate(`/dashboard/student/tutor?conceptId=${conceptId}`);
  };
  
  const handlePracticeRecall = () => {
    // In a real app, navigate to a recall practice page
    toast({
      title: "Starting Recall Practice",
      description: "Testing your knowledge of this concept",
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900/20 dark:to-gray-900">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-semibold text-primary mb-2">Loading Concept</h2>
          <p className="text-muted-foreground mt-2 max-w-md">Please wait while we prepare your study materials...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Enhanced Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 rounded-lg">
        <div>
          <h1 className="text-3xl font-bold mb-2">{conceptData?.title}</h1>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900/50 dark:text-blue-300">
              {conceptData?.subject}
            </span>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-purple-900/50 dark:text-purple-300">
              {conceptData?.chapter}
            </span>
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-amber-900/50 dark:text-amber-300">
              {conceptData?.difficulty}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Mastery Level:</span>
            <Progress value={conceptData?.masteryLevel} className="h-2 w-28" />
            <span className="ml-2 text-sm font-medium">{conceptData?.masteryLevel}%</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant={readAloudActive ? "destructive" : "outline"}
            onClick={handleReadAloud}
            className="flex items-center gap-2"
          >
            <PlayCircle className="h-4 w-4" />
            {readAloudActive ? "Stop Reading" : "Read Aloud"}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleToggleFlag}
            className={`flex items-center gap-2 ${isFlagged ? 'bg-amber-100 text-amber-800 border-amber-300' : ''}`}
          >
            <Bookmark className="h-4 w-4" fill={isFlagged ? "currentColor" : "none"} />
            {isFlagged ? "Flagged" : "Flag for Revision"}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleAskAI}
          >
            <MessageSquare className="h-4 w-4" />
            Ask AI Tutor
          </Button>
          
          <Button 
            size="sm" 
            variant="default"
            className="flex items-center gap-2"
            onClick={handlePracticeRecall}
          >
            <BrainCircuit className="h-4 w-4" />
            Practice Recall
          </Button>
        </div>
      </div>
      
      {/* Enhanced Concept Tab Navigation */}
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto">
          <TabsTrigger value="overview" className="py-3">Overview</TabsTrigger>
          <TabsTrigger value="details" className="py-3">Details</TabsTrigger>
          <TabsTrigger value="practice" className="py-3">Practice</TabsTrigger>
          <TabsTrigger value="notes" className="py-3">Notes</TabsTrigger>
          <TabsTrigger value="related" className="py-3">Related</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Use the existing EnhancedConceptDetail component for the overview tab */}
          <EnhancedConceptDetail conceptId={conceptId || ''} />
        </TabsContent>
        
        <TabsContent value="details" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Concept Description</h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">{conceptData?.description}</p>
              
              <h4 className="text-lg font-semibold mb-2">Key Points</h4>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                {conceptData?.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{point}</li>
                ))}
              </ul>
              
              <h4 className="text-lg font-semibold mb-2">Examples</h4>
              <ul className="list-disc pl-6 space-y-2">
                {conceptData?.examples.map((example: string, index: number) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">{example}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Relevant Formulas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {conceptData?.relevantFormulas.map((formula: any) => (
                  <div key={formula.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-xl font-medium text-center p-2 border-b border-gray-200 dark:border-gray-700">
                      {formula.formula}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-center pt-2">
                      {formula.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Practice Questions</h3>
              {conceptData?.practiceQuestions.map((question: any, index: number) => (
                <div key={question.id} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="text-lg font-medium mb-3">Question {index + 1}</h4>
                  <p className="mb-4">{question.text}</p>
                  <div className="space-y-2">
                    {question.options.map((option: string, optIndex: number) => (
                      <div key={optIndex} className="flex items-center">
                        <input 
                          type="radio" 
                          name={`question-${question.id}`} 
                          id={`opt-${question.id}-${optIndex}`} 
                          className="mr-2"
                        />
                        <label htmlFor={`opt-${question.id}-${optIndex}`}>{option}</label>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-4">Check Answer</Button>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Flashcards</h3>
              <div className="grid grid-cols-1 gap-4">
                {conceptData?.flashcards.map((flashcard: any) => (
                  <div key={flashcard.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="font-medium mb-2">Q: {flashcard.question}</div>
                    <Button variant="outline" className="w-full justify-start text-left" onClick={() => alert(flashcard.answer)}>
                      Show Answer
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Your Study Notes</h3>
              <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none dark:bg-gray-800"
                placeholder="Enter your notes about this concept..."
              />
              <div className="flex justify-end mt-4">
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="related" className="mt-6 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Related Concepts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {conceptData?.relatedConcepts.map((concept: any) => (
                  <div 
                    key={concept.id} 
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/dashboard/student/concept-study/${concept.id}`)}
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      <span>{concept.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptStudyPage;
