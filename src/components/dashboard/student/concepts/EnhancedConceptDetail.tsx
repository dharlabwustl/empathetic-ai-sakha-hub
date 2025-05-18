
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Volume2, VolumeX, 
  MessageSquare, 
  Brain, 
  FileText, 
  Bookmark, 
  BookmarkPlus, 
  Pencil,
  PenTool,
  Clock,
  CheckCircle,
  ArrowLeft,
  Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EnhancedConceptDetailProps {
  conceptId: string;
}

interface Concept {
  id: string;
  title: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  content: string;
  timeToRead: number;
  relatedTopics: string[];
  keywords: string[];
  formulas?: string[];
  diagrams?: string[];
  exampleQuestions?: {
    question: string;
    answer: string;
    explanation?: string;
  }[];
}

interface ConceptNote {
  id: string;
  conceptId: string;
  content: string;
  createdAt: Date;
}

const mockConcept: Concept = {
  id: 'concept-1',
  title: 'Atomic Structure and Nuclear Physics',
  subject: 'Physics',
  difficulty: 'advanced',
  content: `
# Atomic Structure and Nuclear Physics

Atomic structure refers to the structure of an atom, which consists of a central nucleus containing protons and neutrons, with electrons orbiting around it.

## Rutherford's Model
Ernest Rutherford conducted the famous gold foil experiment which led to the discovery of the nucleus. He bombarded a thin gold foil with alpha particles and observed that:
1. Most of the alpha particles passed straight through the foil
2. Some were deflected at small angles
3. A few were deflected back almost the way they came

This suggested that most of the atom is empty space, with a small, dense, positively-charged nucleus at the center.

## Bohr's Model
Niels Bohr improved on Rutherford's model by proposing that:
- Electrons orbit the nucleus in specific energy levels (shells)
- Electrons can only occupy certain allowed energy states
- When electrons transition between states, they absorb or emit electromagnetic radiation of specific frequencies

## Quantum Mechanical Model
The modern quantum mechanical model describes electrons as standing waves or probability distributions rather than particles with defined orbits. This model introduces four quantum numbers:
- Principal quantum number (n)
- Angular momentum quantum number (l)
- Magnetic quantum number (m)
- Spin quantum number (s)

## Nuclear Physics

The nucleus consists of protons and neutrons, collectively called nucleons. Key concepts include:

### Nuclear Binding Energy
The energy required to separate a nucleus into its constituent nucleons. It is given by the mass defect multiplied by c² (E = Δmc²).

### Radioactive Decay
Radioactive nuclei can undergo various types of decay:
- Alpha decay: Emission of a helium nucleus (²₄He)
- Beta decay: Conversion of a neutron to a proton with emission of an electron and an antineutrino
- Gamma decay: Emission of high-energy photons

### Nuclear Reactions
Nuclear reactions include fusion (light nuclei combining to form heavier nuclei) and fission (heavy nuclei splitting into lighter nuclei). Both processes release enormous amounts of energy.

### Half-Life
The time taken for half of the radioactive nuclei in a sample to decay. It is a measure of the stability of a radioactive isotope.
  `,
  timeToRead: 15,
  relatedTopics: ['Quantum Mechanics', 'Electromagnetic Radiation', 'Particle Physics'],
  keywords: ['atom', 'nucleus', 'electron', 'proton', 'neutron', 'radioactivity', 'half-life', 'nuclear energy'],
  formulas: [
    'E = mc²',
    'E = hf',
    'λ = h/p',
    'N(t) = N₀(1/2)^(t/t₁/₂)'
  ],
  exampleQuestions: [
    {
      question: 'Calculate the binding energy of a helium nucleus if the mass defect is 0.03 u.',
      answer: '27.93 MeV',
      explanation: 'Using E = Δmc², where Δm = 0.03 u = 0.03 × 931.494 MeV/c². Therefore, E = 0.03 × 931.494 MeV = 27.93 MeV'
    },
    {
      question: 'If a radioactive sample has a half-life of 10 days, what fraction of the original sample will remain after 30 days?',
      answer: '1/8',
      explanation: 'After 30 days (3 half-lives), the fraction remaining is (1/2)³ = 1/8'
    }
  ]
};

const EnhancedConceptDetail: React.FC<EnhancedConceptDetailProps> = ({ conceptId }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [concept, setConcept] = useState<Concept | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [notes, setNotes] = useState<string>('');
  const [savedNotes, setSavedNotes] = useState<ConceptNote[]>([]);
  const [isFlagged, setIsFlagged] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [completionPercent, setCompletionPercent] = useState(0);
  
  // Speech synthesis
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  
  useEffect(() => {
    // Simulate API call to get concept
    setLoading(true);
    
    setTimeout(() => {
      setConcept(mockConcept);
      
      // Simulate loading saved notes from local storage
      const storedNotes = localStorage.getItem(`concept_notes_${conceptId}`);
      if (storedNotes) {
        try {
          const parsedNotes = JSON.parse(storedNotes);
          setNotes(parsedNotes[0]?.content || '');
          setSavedNotes(parsedNotes);
        } catch (e) {
          console.error('Error parsing stored notes', e);
        }
      }
      
      // Simulate loading saved state
      const isSavedStored = localStorage.getItem(`concept_saved_${conceptId}`) === 'true';
      const isFlaggedStored = localStorage.getItem(`concept_flagged_${conceptId}`) === 'true';
      const completionPercentStored = localStorage.getItem(`concept_completion_${conceptId}`);
      
      setIsSaved(isSavedStored);
      setIsFlagged(isFlaggedStored);
      setCompletionPercent(completionPercentStored ? parseInt(completionPercentStored, 10) : 0);
      
      setLoading(false);
    }, 1000);
    
    // Speech synthesis cleanup
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [conceptId]);
  
  const toggleReading = () => {
    if (!concept) return;
    
    if (isReading) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsReading(false);
      toast({
        title: "Reading stopped",
        description: "Text-to-speech has been stopped"
      });
    } else {
      if (!window.speechSynthesis) {
        toast({
          title: "Not supported",
          description: "Text-to-speech is not supported in your browser",
          variant: "destructive"
        });
        return;
      }
      
      const speechText = concept.content.replace(/[#*_]/g, ''); // Remove markdown formatting
      const newUtterance = new SpeechSynthesisUtterance(speechText);
      
      // Try to find a good voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.name.includes('English') || 
        v.lang.includes('en-US') || 
        v.lang.includes('en-GB')
      );
      
      if (preferredVoice) {
        newUtterance.voice = preferredVoice;
      }
      
      newUtterance.rate = 1.0;
      newUtterance.pitch = 1.0;
      
      newUtterance.onend = () => {
        setIsReading(false);
        // Increase completion percentage when finished reading
        const newCompletion = Math.min(completionPercent + 25, 100);
        setCompletionPercent(newCompletion);
        localStorage.setItem(`concept_completion_${conceptId}`, newCompletion.toString());
        
        toast({
          title: "Reading completed",
          description: "Text-to-speech has finished reading the content"
        });
      };
      
      newUtterance.onerror = (event) => {
        console.error('Speech synthesis error', event);
        setIsReading(false);
        toast({
          title: "Error",
          description: "There was an error with text-to-speech",
          variant: "destructive"
        });
      };
      
      setUtterance(newUtterance);
      window.speechSynthesis.speak(newUtterance);
      setIsReading(true);
      
      toast({
        title: "Reading started",
        description: "Text-to-speech is now reading the content"
      });
    }
  };
  
  const saveNotes = () => {
    if (!notes.trim()) {
      toast({
        title: "Empty notes",
        description: "Please enter some notes to save",
        variant: "destructive"
      });
      return;
    }
    
    const newNote: ConceptNote = {
      id: `note-${Date.now()}`,
      conceptId,
      content: notes,
      createdAt: new Date()
    };
    
    const updatedNotes = [newNote, ...savedNotes];
    setSavedNotes(updatedNotes);
    
    // Store in localStorage
    localStorage.setItem(`concept_notes_${conceptId}`, JSON.stringify(updatedNotes));
    
    // Increase completion percentage
    const newCompletion = Math.min(completionPercent + 15, 100);
    setCompletionPercent(newCompletion);
    localStorage.setItem(`concept_completion_${conceptId}`, newCompletion.toString());
    
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully"
    });
  };
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
    localStorage.setItem(`concept_saved_${conceptId}`, (!isSaved).toString());
    
    toast({
      title: isSaved ? "Removed from saved" : "Added to saved",
      description: isSaved ? "The concept has been removed from your saved items" : "The concept has been added to your saved items"
    });
  };
  
  const toggleFlag = () => {
    setIsFlagged(!isFlagged);
    localStorage.setItem(`concept_flagged_${conceptId}`, (!isFlagged).toString());
    
    toast({
      title: isFlagged ? "Unflagged" : "Flagged for revision",
      description: isFlagged ? "The concept has been unflagged" : "The concept has been flagged for revision"
    });
  };
  
  const goToFlashcards = () => {
    // Increase completion percentage
    const newCompletion = Math.min(completionPercent + 10, 100);
    setCompletionPercent(newCompletion);
    localStorage.setItem(`concept_completion_${conceptId}`, newCompletion.toString());
    
    navigate('/dashboard/student/flashcards');
  };
  
  const goToPracticeQuestions = () => {
    // Increase completion percentage
    const newCompletion = Math.min(completionPercent + 20, 100);
    setCompletionPercent(newCompletion);
    localStorage.setItem(`concept_completion_${conceptId}`, newCompletion.toString());
    
    navigate('/dashboard/student/practice-exam');
  };
  
  const askAI = () => {
    toast({
      title: "AI Tutor",
      description: "Opening AI tutor chat with this concept context..."
    });
    
    // In a real implementation, this would open the AI tutor chat with context
    // For now, just simulate it
    setTimeout(() => {
      toast({
        title: "AI Tutor Ready",
        description: "Ask any questions about Atomic Structure and Nuclear Physics"
      });
    }, 1000);
  };
  
  const formatMarkdown = (text: string) => {
    // Very simple markdown formatter for the demo
    // In a real app, use a full markdown parser
    const formattedText = text
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n{2,}/g, '<br /><br />');
    
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };
  
  const markAsCompleted = () => {
    setCompletionPercent(100);
    localStorage.setItem(`concept_completion_${conceptId}`, '100');
    
    toast({
      title: "Concept Completed",
      description: "This concept has been marked as completed. Well done!"
    });
  };
  
  if (loading || !concept) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2"
          onClick={() => navigate('/dashboard/student/concepts')}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Concepts</span>
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{concept.timeToRead} min read</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className={isFlagged ? "text-red-600 border-red-200 hover:border-red-300" : "text-gray-500"}
            onClick={toggleFlag}
          >
            <Flag className={`h-4 w-4 mr-1 ${isFlagged ? "fill-red-100" : ""}`} />
            {isFlagged ? "Flagged" : "Flag"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className={isSaved ? "text-blue-600 border-blue-200 hover:border-blue-300" : "text-gray-500"}
            onClick={toggleSave}
          >
            {isSaved ? (
              <>
                <Bookmark className="h-4 w-4 mr-1 fill-blue-100" />
                Saved
              </>
            ) : (
              <>
                <BookmarkPlus className="h-4 w-4 mr-1" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{concept.title}</h1>
        <div className="flex items-center flex-wrap gap-2">
          <Badge variant="secondary">{concept.subject}</Badge>
          <Badge variant="outline" className={
            concept.difficulty === 'beginner' ? 'border-green-200 text-green-700 dark:border-green-800 dark:text-green-400' : 
            concept.difficulty === 'intermediate' ? 'border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400' : 
            concept.difficulty === 'advanced' ? 'border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-400' : 
            'border-red-200 text-red-700 dark:border-red-800 dark:text-red-400'
          }>
            {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
          </Badge>
          
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Completion:</span>
            <div className="w-32 flex items-center gap-2">
              <Progress value={completionPercent} className="h-2" />
              <span className="text-sm text-muted-foreground">{completionPercent}%</span>
            </div>
            {completionPercent === 100 && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center">
                <span>Study Material</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleReading} 
                  className="flex items-center gap-2"
                >
                  {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  {isReading ? "Stop Reading" : "Read Aloud"}
                </Button>
              </CardTitle>
              <CardDescription>
                Read through the material carefully. Use the Read Aloud feature if you prefer auditory learning.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <ScrollArea className="h-[60vh] pr-4">
                {formatMarkdown(concept.content)}
                
                {concept.formulas && concept.formulas.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Key Formulas</h3>
                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                      {concept.formulas.map((formula, idx) => (
                        <div key={idx} className="my-2 font-mono">{formula}</div>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex flex-wrap gap-2">
                {concept.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer">
                    {keyword}
                  </Badge>
                ))}
              </div>
              <Button variant="default" onClick={markAsCompleted}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Your Notes</CardTitle>
              <CardDescription>
                Take notes as you study to help remember key concepts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Type your notes here..." 
                className="min-h-[200px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              
              {savedNotes.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Previously Saved Notes</h4>
                  <div className="space-y-3">
                    {savedNotes.map((note, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-3 rounded border">
                        <div className="text-sm text-muted-foreground mb-1">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </div>
                        <p className="whitespace-pre-wrap">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={saveNotes}>
                <Pencil className="h-4 w-4 mr-2" />
                Save Notes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="flashcards">
          <Card>
            <CardHeader>
              <CardTitle>Related Flashcards</CardTitle>
              <CardDescription>
                Practice key concepts and formulas with these flashcards.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="aspect-video bg-slate-50 dark:bg-slate-900 rounded-lg border p-4 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Brain className="h-10 w-10 mx-auto text-primary opacity-70" />
                  <h3 className="text-lg font-medium">Atomic Structure Flashcards</h3>
                  <p className="text-sm text-muted-foreground">15 cards • Last reviewed 3 days ago</p>
                  <Button onClick={goToFlashcards}>Start Review</Button>
                </div>
              </div>
              
              <div className="aspect-video bg-slate-50 dark:bg-slate-900 rounded-lg border p-4 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Brain className="h-10 w-10 mx-auto text-primary opacity-70" />
                  <h3 className="text-lg font-medium">Nuclear Physics Formulas</h3>
                  <p className="text-sm text-muted-foreground">8 cards • New set</p>
                  <Button onClick={goToFlashcards}>Start Review</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle>Practice Questions</CardTitle>
              <CardDescription>
                Test your understanding with these practice questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {concept.exampleQuestions && concept.exampleQuestions.length > 0 ? (
                <div className="space-y-6">
                  {concept.exampleQuestions.map((q, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border">
                      <h4 className="font-medium mb-2">Question {idx + 1}:</h4>
                      <p className="mb-4">{q.question}</p>
                      
                      <div className="mb-2">
                        <Button variant="outline" size="sm" className="mr-2">
                          Show Answer
                        </Button>
                        
                        <Button variant="outline" size="sm">
                          Show Explanation
                        </Button>
                      </div>
                      
                      <div className="mt-4 text-sm border-t pt-3">
                        <strong>Answer:</strong> {q.answer}
                        {q.explanation && (
                          <div className="mt-2">
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <FileText className="h-10 w-10 mx-auto text-muted-foreground opacity-70" />
                  <h3 className="mt-4 font-medium">Practice Questions</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    Test your knowledge with a set of questions based on this concept
                  </p>
                  <Button onClick={goToPracticeQuestions}>
                    Go to Practice Questions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Related Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              {concept.relatedTopics.map((topic, idx) => (
                <li key={idx} className="text-sm hover:text-primary cursor-pointer">{topic}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Having trouble understanding this concept? Chat with our AI tutor for personalized explanations.
            </p>
            <Button onClick={askAI} className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask AI Tutor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedConceptDetail;
