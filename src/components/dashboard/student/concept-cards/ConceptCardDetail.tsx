
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Video, 
  FlaskConical, 
  Lightbulb, 
  Sparkles, 
  FileCheck, 
  BookMarked, 
  Volume2, 
  VolumeX, 
  Pencil,
  Star,
  Brain,
  Plus
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { mockConcepts } from '@/data/mockConcepts';

interface ConceptCardDetailProps {}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = () => {
  const { id } = useParams<{id: string}>();
  const [activeTab, setActiveTab] = useState('content');
  const [concept, setConcept] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comprehensionLevel, setComprehensionLevel] = useState(0);
  const [notes, setNotes] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();
  
  // Get concept data
  useEffect(() => {
    // Simulate API call to get concept data
    setTimeout(() => {
      const foundConcept = mockConcepts.find(c => c.id === id) || 
        mockConcepts.find(() => true) || { // Fallback to first concept if ID not found
          id: 'concept-1',
          title: 'Atomic Structure',
          description: 'Understanding the fundamental structure of atoms',
          subject: 'Chemistry',
          difficulty: 'medium',
          estimatedTime: 25,
          content: `
# Atomic Structure

An atom is the basic unit of matter that makes up every physical object. An atom consists of a central nucleus and one or more electrons bound to the nucleus.

## The Nucleus
The nucleus contains protons and neutrons:
- **Protons**: Positively charged particles
- **Neutrons**: Neutral particles (no charge)

## Electrons
Electrons are negatively charged particles that orbit the nucleus in energy levels or shells.

## Atomic Number and Mass
- **Atomic Number (Z)**: Equal to the number of protons in an atom
- **Mass Number (A)**: Equal to the sum of protons and neutrons

## Isotopes
Isotopes are atoms with the same number of protons but different numbers of neutrons.
          `,
          linkedConcepts: ['concept-2', 'concept-3'],
          flashcards: 6,
          videos: 3,
          practiceProblems: 8,
          formulas: [
            { id: 'formula-1', name: 'E = mc²', description: 'Energy-mass equivalence' },
            { id: 'formula-2', name: 'E = hf', description: 'Energy of a photon' }
          ],
          recallStrength: 65
        };
      
      setConcept(foundConcept);
      setLoading(false);
      setComprehensionLevel(foundConcept.recallStrength || 40);
      
      // Load saved notes if any
      const savedNotes = localStorage.getItem(`concept-notes-${foundConcept.id}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
    }, 500);
  }, [id]);
  
  const handleMarkAsUnderstood = () => {
    const newLevel = Math.min(comprehensionLevel + 10, 100);
    setComprehensionLevel(newLevel);
    
    toast({
      title: "Progress updated!",
      description: `Your understanding of this concept is now at ${newLevel}%`
    });
    
    // Save to localStorage for persistence
    localStorage.setItem(`concept-comprehension-${concept.id}`, String(newLevel));
  };
  
  const handleSaveNotes = () => {
    localStorage.setItem(`concept-notes-${concept.id}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully"
    });
  };
  
  const toggleReadAloud = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    // Extract plain text from content (removing markdown)
    const plainText = concept.content
      .replace(/#{1,6}\s?/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\_(.*?)\_/g, '$1'); // Remove italics
    
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };
  
  const getComprehensionColorClass = () => {
    if (comprehensionLevel < 40) return 'text-red-500';
    if (comprehensionLevel < 70) return 'text-yellow-500';
    return 'text-green-500';
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-gray-300 dark:bg-gray-700 mb-4 rounded"></div>
          <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-5xl mx-auto py-6 px-4 space-y-8">
      {/* Header with concept title and stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">{concept.title}</h1>
            <Badge variant="outline" className="ml-2">{concept.subject}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">{concept.description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline" 
            size="sm"
            onClick={handleMarkAsUnderstood}
            className="flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Mark as Understood</span>
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          >
            <FileCheck className="h-4 w-4 mr-2" />
            <span>Take Quiz</span>
          </Button>
        </div>
      </div>
      
      {/* Concept understanding progress bar */}
      <div className="px-4 py-3 bg-secondary/20 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Recall Strength</span>
          <span className={`text-sm font-bold ${getComprehensionColorClass()}`}>{comprehensionLevel}%</span>
        </div>
        <Progress value={comprehensionLevel} className="h-2" />
      </div>
      
      {/* Main content area with tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar with study tools */}
        <div className="md:col-span-1 space-y-4">
          {/* Read aloud card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                Read Aloud
              </CardTitle>
              <CardDescription>Listen to this concept</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                variant={isSpeaking ? "destructive" : "secondary"} 
                className="w-full"
                onClick={toggleReadAloud}
              >
                {isSpeaking ? "Stop Reading" : "Start Reading"} 
              </Button>
            </CardFooter>
          </Card>
          
          {/* Notes card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                My Notes
              </CardTitle>
              <CardDescription>Add your own notes for this concept</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <Textarea 
                placeholder="Type your notes here..." 
                className="min-h-[120px]" 
                value={notes}
                onChange={handleNotesChange}
              />
            </CardContent>
            <CardFooter>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={handleSaveNotes}
              >
                Save Notes
              </Button>
            </CardFooter>
          </Card>
          
          {/* Related concepts card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <BookMarked className="h-4 w-4" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {concept.linkedConcepts && concept.linkedConcepts.length > 0 ? (
                concept.linkedConcepts.map((conceptId: string, index: number) => {
                  // Find related concept title
                  const relatedConcept = mockConcepts.find(c => c.id === conceptId) || {
                    id: conceptId,
                    title: `Related Concept ${index + 1}`
                  };
                  
                  return (
                    <Link 
                      key={conceptId} 
                      to={`/dashboard/student/concepts/card/${conceptId}`} 
                      className="block p-2 rounded-md hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-sm">{relatedConcept.title}</span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">No related concepts found</p>
              )}
            </CardContent>
          </Card>
          
          {/* AI Insights card */}
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-violet-200 dark:border-violet-800/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                AI Study Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Based on your learning patterns, you may want to focus on the relationship 
                between atomic structure and chemical bonding. This concept will appear on approximately 
                18% of exam questions.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" className="w-full">
                <Brain className="h-3 w-3 mr-1" />
                <span>Get Personalized Tips</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-0">
              <Tabs defaultValue="content" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="content" className="text-xs">
                    <FileText className="h-4 w-4 mr-2" /> Content
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="text-xs">
                    <Video className="h-4 w-4 mr-2" /> Videos
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="text-xs">
                    <FileCheck className="h-4 w-4 mr-2" /> Practice
                  </TabsTrigger>
                  <TabsTrigger value="flashcards" className="text-xs">
                    <BookMarked className="h-4 w-4 mr-2" /> Flashcards
                  </TabsTrigger>
                  <TabsTrigger value="formulas" className="text-xs">
                    <FlaskConical className="h-4 w-4 mr-2" /> Formulas
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="pt-6">
              <TabsContent value="content" className="m-0">
                <div className="prose dark:prose-invert max-w-none">
                  {/* Render markdown content */}
                  <div dangerouslySetInnerHTML={{ 
                    __html: concept.content
                      .replace(/#{6}\s?(.*?)\n/g, '<h6>$1</h6>')
                      .replace(/#{5}\s?(.*?)\n/g, '<h5>$1</h5>')
                      .replace(/#{4}\s?(.*?)\n/g, '<h4>$1</h4>')
                      .replace(/#{3}\s?(.*?)\n/g, '<h3>$1</h3>')
                      .replace(/#{2}\s?(.*?)\n/g, '<h2>$1</h2>')
                      .replace(/#{1}\s?(.*?)\n/g, '<h1>$1</h1>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }}></div>
                </div>
              </TabsContent>
              
              <TabsContent value="videos" className="m-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Video Lectures ({concept.videos || 3})</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <Card>
                      <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center">
                        <div className="text-white">Video Preview</div>
                      </div>
                      <CardContent className="pt-4">
                        <h4 className="font-medium">{concept.title} - Core Concepts</h4>
                        <p className="text-sm text-muted-foreground mt-1">12 minutes • Dr. Sarah Johnson</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center">
                        <div className="text-white">Video Preview</div>
                      </div>
                      <CardContent className="pt-4">
                        <h4 className="font-medium">{concept.title} - Advanced Topics</h4>
                        <p className="text-sm text-muted-foreground mt-1">15 minutes • Prof. Michael Chen</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="practice" className="m-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Practice Problems ({concept.practiceProblems || 8})</h3>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Multiple Choice Questions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">15 questions to test your understanding</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="secondary" size="sm">Start Quiz</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Interactive Problems</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">8 interactive problems to solve step-by-step</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="secondary" size="sm">Start Practice</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="flashcards" className="m-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Flashcards ({concept.flashcards || 6})</h3>
                    <Button size="sm" variant="ghost">
                      <Plus className="h-4 w-4 mr-1" /> 
                      <span>Create Flashcard</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <Card className="border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors">
                      <CardContent className="p-6 flex flex-col items-center justify-center">
                        <Star className="h-8 w-8 text-primary/60 mb-2" />
                        <p className="text-center text-sm font-medium">Start Flashcard Practice for {concept.title}</p>
                        <p className="text-center text-xs text-muted-foreground mt-1">6 cards • ~5 minutes</p>
                      </CardContent>
                    </Card>
                    
                    <p className="text-sm text-muted-foreground">
                      Flashcards help improve recall and long-term memory retention through active recall and spaced repetition.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="formulas" className="m-0">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Key Formulas and Equations</h3>
                    <Button size="sm" variant="ghost">
                      <FlaskConical className="h-4 w-4 mr-1" /> 
                      <span>Open Formula Lab</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {concept.formulas && concept.formulas.length > 0 ? (
                      concept.formulas.map((formula: any) => (
                        <Card key={formula.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-md font-mono">{formula.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{formula.description}</p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No formulas available for this concept</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
          
          {/* Practice tools section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-900/30 border-blue-100 dark:border-blue-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Practice Exams</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-xs text-muted-foreground">Related questions appear in:</p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>• NEET Physics Section (8 questions)</li>
                  <li>• AIIMS Chemistry (5 questions)</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="secondary" size="sm" className="w-full">
                  <FileCheck className="h-3 w-3 mr-1" />
                  <span>Take Practice Test</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-900/30 border-purple-100 dark:border-purple-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">AI Tutor Explanation</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-xs text-muted-foreground">
                  Get an alternative explanation from our AI Tutor with interactive
                  Q&A to clarify your doubts.
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="secondary" size="sm" className="w-full">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  <span>Explain This Concept</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
