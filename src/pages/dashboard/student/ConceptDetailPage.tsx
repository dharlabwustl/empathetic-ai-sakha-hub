
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import { Loader2, VolumeUp, BookOpen, FileText, BookText, ArrowRight, Plus, Star, StarOff, ArrowDown, Settings, BarChart2, Activity, Link } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SharedPageLayout from '@/components/dashboard/student/SharedPageLayout';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isReading, setIsReading] = useState(false);
  const [notes, setNotes] = useState<string>('');
  const [mastery, setMastery] = useState<number>(0);
  const [recallStrength, setRecallStrength] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [saveStatus, setSaveStatus] = useState('');

  // Load notes from localStorage on component mount
  useEffect(() => {
    if (conceptId) {
      const savedNotes = localStorage.getItem(`concept_notes_${conceptId}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
      
      // Load analytics data
      const savedMastery = localStorage.getItem(`concept_mastery_${conceptId}`);
      const savedRecall = localStorage.getItem(`concept_recall_${conceptId}`);
      const savedAttempts = localStorage.getItem(`concept_attempts_${conceptId}`);
      
      setMastery(savedMastery ? parseInt(savedMastery) : Math.floor(Math.random() * 100));
      setRecallStrength(savedRecall ? parseInt(savedRecall) : Math.floor(Math.random() * 100));
      setAttempts(savedAttempts ? parseInt(savedAttempts) : Math.floor(Math.random() * 10));
    }
  }, [conceptId]);

  // Save notes to localStorage
  const handleSaveNotes = () => {
    if (conceptId) {
      localStorage.setItem(`concept_notes_${conceptId}`, notes);
      setSaveStatus('Saved');
      setTimeout(() => setSaveStatus(''), 2000);
      
      toast({
        title: "Notes Saved",
        description: "Your notes have been saved successfully",
      });
    }
  };

  const handleReadAloud = () => {
    setIsReading(!isReading);
    
    if (!isReading) {
      // Text-to-speech functionality
      const textToRead = conceptCard?.content || "No content available to read";
      
      // Using the browser's built-in speech synthesis
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // Slightly slower for educational content
      utterance.pitch = 1;
      
      // Stop previous speech if any
      window.speechSynthesis.cancel();
      
      // Start reading
      window.speechSynthesis.speak(utterance);
      
      // When speech ends, update the button
      utterance.onend = () => {
        setIsReading(false);
      };
      
      toast({
        title: "Reading Aloud",
        description: "Text-to-speech has started",
      });
    } else {
      // Stop reading
      window.speechSynthesis.cancel();
      toast({
        title: "Reading Stopped",
        description: "Text-to-speech has been stopped",
      });
    }
  };

  const handleOpenFlashcards = () => {
    toast({
      title: "Opening Flashcards",
      description: "Preparing flashcards for this concept",
    });
    navigate(`/dashboard/student/flashcards/${conceptId}`);
  };

  const handleOpenPracticeExam = () => {
    toast({
      title: "Opening Practice Exam",
      description: "Preparing practice questions for this concept",
    });
    navigate(`/dashboard/student/practice-exam`);
  };

  const handleOpenFormulaLab = () => {
    toast({
      title: "Opening Formula Lab",
      description: "Loading formula practice for this concept",
    });
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };
  
  const handleDownloadNotes = () => {
    const notesText = notes || "No notes yet.";
    const conceptTitle = conceptCard?.title || "Concept";
    
    // Create a blob with the notes content
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger it
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conceptTitle.replace(/\s+/g, '_')}_Notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Notes Downloaded",
      description: "Your notes have been downloaded as a text file",
    });
  };
  
  const getDifficultyColor = (difficulty?: string): string => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  if (loading || !conceptCard) {
    return (
      <SharedPageLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h3 className="text-xl font-medium">Loading concept details...</h3>
          </div>
        </div>
      </SharedPageLayout>
    );
  }

  // Dummy related concepts (in a real app, these would be determined by algorithm)
  const relatedConcepts = conceptCard.relatedConcepts || [];
  
  // Dummy revision schedule (in a real app, this would be based on learning science)
  const revisionSchedule = [
    { day: 'Today', status: 'current', time: 'Study for 25 min' },
    { day: 'Tomorrow', status: 'upcoming', time: '15 min review' },
    { day: 'In 3 days', status: 'upcoming', time: '10 min quiz' },
    { day: 'In 7 days', status: 'upcoming', time: '5 min recall' },
    { day: 'In 14 days', status: 'upcoming', time: '15 min final review' }
  ];

  return (
    <SharedPageLayout>
      <div className="container py-6">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard/student/concepts')}
            className="flex items-center gap-1"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to Concepts</span>
          </Button>
          
          <span className="text-muted-foreground">/</span>
          
          <Badge variant="outline" className={getDifficultyColor(conceptCard.difficulty)}>
            {conceptCard.difficulty}
          </Badge>
        </div>
        
        {/* Main content area - 2 column layout on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - takes up 2/3 of the space on larger screens */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-t-4" style={{ borderTopColor: 'var(--theme-primary)' }}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{conceptCard.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                        {conceptCard.subject}
                      </Badge>
                      <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
                        {conceptCard.chapter}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant={isReading ? "destructive" : "outline"}
                    className="flex items-center gap-1"
                    onClick={handleReadAloud}
                  >
                    <VolumeUp className="h-4 w-4" />
                    {isReading ? 'Stop Reading' : 'Read Aloud'}
                  </Button>
                </div>
                
                <p className="text-muted-foreground mb-4">{conceptCard.description}</p>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
                    <TabsTrigger value="exam">Exam Relevance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-0">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p>{conceptCard.content}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="examples" className="mt-0">
                    <ul className="space-y-4">
                      {conceptCard.examples?.map((example, index) => (
                        <li key={index} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                          <div className="flex items-start gap-2">
                            <Badge className="mt-1">{index + 1}</Badge>
                            <p>{example}</p>
                          </div>
                        </li>
                      )) || <p>No examples available.</p>}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="mistakes" className="mt-0">
                    <ul className="space-y-4">
                      {conceptCard.commonMistakes?.map((mistake, index) => (
                        <li key={index} className="p-3 bg-red-50 dark:bg-red-950/20 rounded-md">
                          <div className="flex items-start gap-2">
                            <Badge variant="destructive" className="mt-1">⚠️</Badge>
                            <p>{mistake}</p>
                          </div>
                        </li>
                      )) || <p>No common mistakes listed.</p>}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="exam" className="mt-0">
                    <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-950/20">
                      <h4 className="font-semibold mb-2">Exam Relevance</h4>
                      <p>{conceptCard.examRelevance || "No exam relevance information available."}</p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Notes section */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Notes</h3>
                    <span className="text-xs text-green-600">{saveStatus}</span>
                  </div>
                  <Textarea 
                    placeholder="Take notes on this concept..." 
                    className="min-h-[150px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={handleDownloadNotes}>
                      Download Notes
                    </Button>
                    <Button size="sm" onClick={handleSaveNotes}>
                      Save Notes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Mastery Analytics */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Concept Mastery Analytics</h3>
                
                <div className="space-y-6">
                  {/* Mastery Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall Mastery</span>
                      <span className="font-medium">{mastery}%</span>
                    </div>
                    <Progress value={mastery} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {mastery < 30 ? "Just starting out. Keep practicing!" : 
                       mastery < 70 ? "Making good progress!" : 
                       "Excellent mastery of this concept!"}
                    </p>
                  </div>
                  
                  {/* Recall Strength */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Recall Strength</span>
                      <span className="font-medium">{recallStrength}%</span>
                    </div>
                    <Progress value={recallStrength} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Based on your flashcard performance and quizzes
                    </p>
                  </div>
                  
                  {/* Practice History */}
                  <div>
                    <div className="flex justify-between">
                      <span>Practice History</span>
                      <span className="font-medium">{attempts} attempts</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {attempts === 0 ? "No practice attempts yet" :
                       attempts < 3 ? "Just getting started with practice" :
                       attempts < 7 ? "Good practice frequency" :
                       "Excellent practice consistency!"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* AI Insights */}
            <Card className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-950/30 dark:to-blue-950/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>AI Learning Insights</span>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">BETA</Badge>
                  </h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="weakareas">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span>Knowledge Gaps Identified</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 ml-6">
                        <p className="text-sm">Based on your quiz responses, you might need to focus on:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li className="text-sm">Understanding the applications in real-world scenarios</li>
                          <li className="text-sm">Memorizing key formulas and relationships</li>
                          <li className="text-sm">Practicing with more complex examples</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="study">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4" />
                        <span>Study Recommendation</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 ml-6">
                        <p className="text-sm">Try this personalized study approach:</p>
                        <ol className="list-decimal pl-4 space-y-1">
                          <li className="text-sm">Review core principles (10 min)</li>
                          <li className="text-sm">Work through 3-4 practice problems (15 min)</li>
                          <li className="text-sm">Create summary flashcards for quick revision (5 min)</li>
                          <li className="text-sm">Teach the concept to someone else or explain it aloud (10 min)</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="links">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4" />
                        <span>Connected Concepts</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 ml-6">
                        <p className="text-sm">This concept connects to:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          {relatedConcepts.map(id => (
                            <li key={id} className="text-sm">
                              <a href={`/dashboard/student/concepts/${id}`} className="text-blue-600 hover:underline">
                                {getRelatedConceptName(id)}
                              </a>
                            </li>
                          ))}
                          {relatedConcepts.length === 0 && <li className="text-sm">No related concepts found</li>}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar content - takes up 1/3 of space on larger screens */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Study Resources</h3>
                <div className="grid gap-3">
                  <Button 
                    variant="secondary" 
                    className="justify-start"
                    onClick={handleOpenFlashcards}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Interactive Flashcards
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    className="justify-start"
                    onClick={handleOpenPracticeExam}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Practice Questions
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    className="justify-start"
                    onClick={handleOpenFormulaLab}
                  >
                    <BookText className="h-4 w-4 mr-2" />
                    Formula Practice Lab
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Related Cards */}
            {relatedConcepts.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Related Concepts</h3>
                  <div className="space-y-3">
                    {relatedConcepts.map(id => (
                      <Button 
                        key={id}
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => navigate(`/dashboard/student/concepts/${id}`)}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        {getRelatedConceptName(id)}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Revision Schedule */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Spaced Repetition Schedule</h3>
                <div className="space-y-3">
                  {revisionSchedule.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-md border flex items-center justify-between ${
                        item.status === 'current' 
                          ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
                          : 'bg-gray-50 border-gray-200 dark:bg-gray-800/20 dark:border-gray-700'
                      }`}
                    >
                      <div>
                        <p className="font-medium text-sm">{item.day}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                      
                      {item.status === 'current' ? (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          Current
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Upcoming
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

// Helper function to get concept names (in a real app, this would fetch from API)
function getRelatedConceptName(id: string): string {
  const conceptMap: Record<string, string> = {
    'c1': "Newton's First Law",
    'c2': 'Cell Membrane Structure',
    'c3': 'Periodic Table Groups',
    'c4': 'Derivatives in Calculus',
    'c5': 'Second Law of Thermodynamics',
    'c6': 'Covalent Bonding',
    'c7': 'Organic Functional Groups',
    'c8': 'Polynomial Functions',
    'c9': 'Electronegativity',
    'c10': 'Integral Applications',
    'c11': 'Electron Configuration',
    'c12': "Newton's Third Law",
    'c13': 'Entropy and Disorder',
    'c14': 'Differential Equations',
    'c15': 'Heat Transfer Methods',
    'c16': 'Energy Conversion',
    'c17': 'Complex Integration',
    'c18': 'Alkanes and Alkenes',
    'c19': 'Aromatic Compounds',
    'c20': 'Reaction Mechanisms',
    'c21': 'Quadratic Optimization',
  };
  
  return conceptMap[id] || `Related Concept ${id}`;
}

export default ConceptDetailPage;
