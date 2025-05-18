
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bookmark, BookmarkedIcon, MessageSquare, VolumeUp, VolumeMute, Pencil, Brain, FileQuestion, Flag, ListTodo, Lightbulb, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConceptDetailProps {
  conceptId: string;
}

interface ConceptData {
  id: string;
  title: string;
  subject: string;
  content: string;
  related: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  mastery: number;
  images?: string[];
  formula?: string;
}

// Sample concept data
const getDummyConceptData = (id: string): ConceptData => {
  return {
    id,
    title: 'Cellular Respiration',
    subject: 'Biology',
    content: `# Cellular Respiration

Cellular respiration is a set of metabolic reactions and processes that take place in the cells of organisms to convert biochemical energy from nutrients into ATP, and then release waste products.

## Key Stages of Cellular Respiration

1. **Glycolysis**: The breakdown of glucose into two pyruvate molecules, occurring in the cytoplasm.
2. **The Citric Acid Cycle**: Also known as the Krebs cycle, it completes the breakdown of glucose. Takes place in the mitochondrial matrix.
3. **Electron Transport Chain**: The final stage where the majority of ATP is produced. Located in the inner mitochondrial membrane.

## The Chemical Equation

The overall reaction of cellular respiration is:

C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~38 ATP

## Importance

Cellular respiration is essential for:
- Energy production for cellular processes
- Maintaining body temperature
- Powering muscle contraction
- Supporting cellular growth and repair

## Factors Affecting Cellular Respiration

- Temperature
- pH levels
- Oxygen availability
- Nutrient availability
- Cellular energy demand`,
    related: ['photosynthesis', 'mitochondria', 'atp-synthesis'],
    difficulty: 'medium',
    mastery: 62,
    formula: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ~38 ATP',
    images: [
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    ]
  };
};

const EnhancedConceptDetail: React.FC<ConceptDetailProps> = ({ conceptId }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [concept, setConcept] = useState<ConceptData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [flaggedForRevision, setFlaggedForRevision] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('content');
  const [relatedConcepts, setRelatedConcepts] = useState<ConceptData[]>([]);
  
  // Load concept data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const conceptData = getDummyConceptData(conceptId);
      setConcept(conceptData);
      
      // Load saved notes from localStorage if available
      const savedNotes = localStorage.getItem(`concept_notes_${conceptId}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
      
      // Check if concept is bookmarked
      const bookmarked = localStorage.getItem(`concept_bookmarked_${conceptId}`) === 'true';
      setBookmarked(bookmarked);
      
      // Check if concept is flagged for revision
      const flagged = localStorage.getItem(`concept_flagged_${conceptId}`) === 'true';
      setFlaggedForRevision(flagged);
      
      // Load related concepts
      const related = conceptData.related.map((id) => getDummyConceptData(id));
      setRelatedConcepts(related);
      
      setLoading(false);
    }, 1000);
    
    // Clean up speech when component unmounts
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [conceptId]);
  
  // Handle saving notes
  const handleSaveNotes = () => {
    localStorage.setItem(`concept_notes_${conceptId}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully"
    });
  };
  
  // Toggle read aloud function
  const toggleReadAloud = () => {
    if (!concept) return;
    
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(concept.content.replace(/#/g, '').replace(/\*/g, ''));
      utterance.onend = () => setIsReadingAloud(false);
      utterance.onerror = () => setIsReadingAloud(false);
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };
  
  // Toggle bookmark
  const toggleBookmark = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    localStorage.setItem(`concept_bookmarked_${conceptId}`, newBookmarked.toString());
    
    toast({
      title: newBookmarked ? "Concept bookmarked" : "Bookmark removed",
      description: newBookmarked ? "Added to your bookmarks" : "Removed from your bookmarks"
    });
  };
  
  // Toggle flag for revision
  const toggleFlag = () => {
    const newFlagged = !flaggedForRevision;
    setFlaggedForRevision(newFlagged);
    localStorage.setItem(`concept_flagged_${conceptId}`, newFlagged.toString());
    
    toast({
      title: newFlagged ? "Flagged for revision" : "Flag removed",
      description: newFlagged ? "Added to your revision list" : "Removed from your revision list"
    });
  };
  
  // Open AI tutor dialog
  const openAITutor = () => {
    toast({
      title: "AI Tutor",
      description: "Opening chat with your AI tutor to discuss this concept"
    });
    // Here you would typically open a chat interface with the AI tutor
    // For now, we'll just show a toast
  };
  
  // Navigate to flashcards for this concept
  const goToFlashcards = () => {
    toast({
      title: "Flashcards",
      description: "Opening flashcards related to this concept"
    });
    navigate('/dashboard/student/flashcards');
  };
  
  // Navigate to practice questions for this concept
  const goToPracticeQuestions = () => {
    toast({
      title: "Practice Questions",
      description: "Opening practice questions related to this concept"
    });
    navigate('/dashboard/student/practice-exam');
  };
  
  // Quick recall practice
  const startQuickRecall = () => {
    toast({
      title: "Quick Recall",
      description: "Starting quick recall practice for this concept"
    });
    // Implementation would go here
  };
  
  if (loading || !concept) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with title, subject, and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{concept.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{concept.subject}</Badge>
            <Badge variant={concept.difficulty === 'easy' ? 'default' : concept.difficulty === 'medium' ? 'secondary' : 'destructive'}>
              {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={isReadingAloud ? "destructive" : "outline"} 
            size="sm" 
            onClick={toggleReadAloud}
          >
            {isReadingAloud ? (
              <><VolumeMute className="h-4 w-4 mr-2" /> Stop Reading</>
            ) : (
              <><VolumeUp className="h-4 w-4 mr-2" /> Read Aloud</>
            )}
          </Button>
          
          <Button 
            variant={bookmarked ? "default" : "outline"} 
            size="sm" 
            onClick={toggleBookmark}
          >
            {bookmarked ? (
              <><BookmarkedIcon className="h-4 w-4 mr-2" /> Bookmarked</>
            ) : (
              <><Bookmark className="h-4 w-4 mr-2" /> Bookmark</>
            )}
          </Button>
          
          <Button 
            variant={flaggedForRevision ? "default" : "outline"} 
            size="sm" 
            onClick={toggleFlag}
          >
            <Flag className={`h-4 w-4 mr-2 ${flaggedForRevision ? 'text-red-500' : ''}`} /> 
            {flaggedForRevision ? 'Flagged' : 'Flag for Revision'}
          </Button>
        </div>
      </div>
      
      {/* Mastery progress */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Mastery Level</h3>
          <span>{concept.mastery}%</span>
        </div>
        <Progress value={concept.mastery} className="h-2" />
      </div>
      
      {/* Main content tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="notes">My Notes</TabsTrigger>
          <TabsTrigger value="related">Related Concepts</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>
        
        {/* Content tab */}
        <TabsContent value="content" className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="prose dark:prose-invert max-w-none">
            {/* Use a markdown renderer here ideally. For simplicity, using pre tag */}
            <pre className="whitespace-pre-wrap">{concept.content}</pre>
            
            {concept.images && concept.images.length > 0 && (
              <div className="mt-6">
                {concept.images.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`Figure ${index + 1} for ${concept.title}`} 
                    className="max-w-full rounded-lg shadow-md my-4"
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Notes tab */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pencil className="h-4 w-4" /> My Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Write your notes here..." 
                className="min-h-[200px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button 
                onClick={handleSaveNotes} 
                className="mt-4"
              >
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Related Concepts tab */}
        <TabsContent value="related">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedConcepts.map((related) => (
              <Card key={related.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{related.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {related.content.replace(/#/g, '').replace(/\*/g, '').split('\n\n')[0]}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-4"
                    onClick={() => navigate(`/dashboard/student/concepts/study/${related.id}`)}
                  >
                    View Concept
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Practice tab */}
        <TabsContent value="practice">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Recall */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" /> Quick Recall
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Test your understanding with quick recall questions about key points from this concept.
                </p>
                <Button onClick={startQuickRecall}>
                  <Play className="h-4 w-4 mr-2" /> Start Quick Recall
                </Button>
              </CardContent>
            </Card>
            
            {/* Flashcards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListTodo className="h-5 w-5 text-indigo-500" /> Flashcards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Review flashcards related to this concept to reinforce your memory.
                </p>
                <Button onClick={goToFlashcards}>
                  <Play className="h-4 w-4 mr-2" /> Study Flashcards
                </Button>
              </CardContent>
            </Card>
            
            {/* Practice Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="h-5 w-5 text-green-500" /> Practice Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Test your knowledge with practice questions and get instant feedback.
                </p>
                <Button onClick={goToPracticeQuestions}>
                  <Play className="h-4 w-4 mr-2" /> Start Practice
                </Button>
              </CardContent>
            </Card>
            
            {/* AI Tutor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" /> AI Tutor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Having trouble understanding something? Ask your AI tutor for help.
                </p>
                <Button onClick={openAITutor}>
                  <MessageSquare className="h-4 w-4 mr-2" /> Ask AI Tutor
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Bottom action buttons */}
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back to Concepts
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              toast({
                title: "Study Timer",
                description: "Starting 25-minute focused study session"
              });
            }}
          >
            <Clock className="h-4 w-4 mr-2" /> Start Study Timer
          </Button>
          
          <Button onClick={openAITutor}>
            <Lightbulb className="h-4 w-4 mr-2" /> Ask Questions
          </Button>
        </div>
      </div>
    </div>
  );
};

// Import missing components
import { Clock } from 'lucide-react';

export default EnhancedConceptDetail;
