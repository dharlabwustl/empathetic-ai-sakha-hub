
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  BarChart2, 
  Lightbulb, 
  Link as LinkIcon, 
  ArrowRight, 
  ArrowLeft, 
  Volume2,
  CheckCircle
} from 'lucide-react';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(65);
  const [recallStrength, setRecallStrength] = useState(72);
  const { toast } = useToast();
  
  // Speech synthesis for Read Aloud feature
  const speechSynthesis = window.speechSynthesis;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  useEffect(() => {
    console.log("ConceptCardDetailPage - Loaded concept ID:", conceptId);
    
    // Load saved notes (in a real app, these would come from an API)
    const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    // Get available voices for speech synthesis
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [conceptId]);
  
  // Handle saving notes
  const handleSaveNotes = () => {
    localStorage.setItem(`concept-notes-${conceptId}`, notes);
    toast({
      title: "Notes saved",
      description: "Your notes for this concept have been saved",
    });
  };
  
  // Toggle Read Aloud feature
  const toggleReadAloud = () => {
    if (isReadingAloud) {
      speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }
    
    if (conceptCard) {
      const contentToRead = `${conceptCard.title}. ${conceptCard.content}`;
      const utterance = new SpeechSynthesisUtterance(contentToRead);
      
      // Try to find an Indian English or Hindi voice
      const indianVoice = voices.find(voice => 
        voice.lang.includes('en-IN') || voice.lang.includes('hi-IN')
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
      } else {
        // Fallback to any English voice
        const englishVoice = voices.find(voice => voice.lang.includes('en-'));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }
      
      utterance.rate = 0.9; // Slightly slower rate for better comprehension
      utterance.onend = () => setIsReadingAloud(false);
      
      speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };
  
  if (loading || !conceptCard) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading concept details...</p>
        </div>
      </div>
    );
  }
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Mock data for related concepts
  const relatedConcepts = [
    { id: 'concept-2', title: "Newton's Laws of Motion", subject: "Physics", difficulty: "Medium" },
    { id: 'concept-3', title: "Conservation of Energy", subject: "Physics", difficulty: "Hard" },
    { id: 'concept-4', title: "Momentum", subject: "Physics", difficulty: "Medium" }
  ];
  
  // Mock attempt history data
  const attemptHistory = [
    { date: "2023-05-15", score: 75, time: "10:30 AM" },
    { date: "2023-05-10", score: 60, time: "3:45 PM" },
    { date: "2023-05-05", score: 45, time: "2:15 PM" }
  ];

  return (
    <div className="container max-w-7xl py-8">
      {/* Back button and concept info */}
      <div className="flex flex-col space-y-6">
        <Button 
          variant="ghost" 
          className="w-fit flex items-center gap-2 hover:bg-slate-100 mb-4"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={16} />
          <span>Back to Concepts</span>
        </Button>
        
        {/* Concept header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main concept info */}
          <div className="lg:col-span-2">
            <Card className="border-t-4 shadow-md" style={{ borderTopColor: '#6366f1' }}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{conceptCard.title}</CardTitle>
                    <CardDescription className="text-base">{conceptCard.description}</CardDescription>
                  </div>
                  <Button 
                    variant={isReadingAloud ? "destructive" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={toggleReadAloud}
                  >
                    <Volume2 size={16} />
                    {isReadingAloud ? "Stop Reading" : "Read Aloud"}
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                    {conceptCard.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                    {conceptCard.chapter}
                  </Badge>
                  <Badge variant="outline" className={getDifficultyColor(conceptCard.difficulty)}>
                    {conceptCard.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Masterly progress */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mastery Level</span>
                      <span className="text-sm font-medium text-indigo-600">{masteryLevel}%</span>
                    </div>
                    <Progress value={masteryLevel} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Recall Strength</span>
                      <span className="text-sm font-medium text-indigo-600">{recallStrength}%</span>
                    </div>
                    <Progress value={recallStrength} className="h-2" />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  Flashcards
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText size={16} />
                  Practice Exam
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Brain size={16} />
                  Quick Quiz
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* AI Insights */}
          <div>
            <Card className="border-l-4 border-l-amber-400 shadow-md h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Focus Areas</h4>
                  <p className="text-sm text-gray-600">Based on your practice, focus on understanding the relationship between force and acceleration.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Weak Links</h4>
                  <div className="text-sm space-y-1">
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      <span>Mathematical formulation (F = ma)</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>Application in real-world problems</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Recommended Revision</h4>
                  <p className="text-sm text-gray-600">Review this concept again in 3 days to strengthen retention.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Main tabs */}
        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 sm:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="common-mistakes">Common Mistakes</TabsTrigger>
              <TabsTrigger value="exam-relevance">Exam Relevance</TabsTrigger>
              <TabsTrigger value="analytics" className="hidden sm:block">Analytics</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Concept Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <p>{conceptCard.content}</p>
                  </div>
                  
                  {/* Notes Section */}
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-medium mb-2">Personal Notes</h3>
                    <Textarea 
                      placeholder="Add your notes about this concept here..." 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[150px]"
                    />
                    <Button 
                      onClick={handleSaveNotes} 
                      size="sm" 
                      className="mt-2"
                    >
                      Save Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Examples Tab */}
            <TabsContent value="examples" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {conceptCard.examples?.map((example, index) => (
                      <li key={index} className="bg-slate-50 p-4 rounded-md border">
                        <p>{example}</p>
                      </li>
                    )) || (
                      <p className="text-gray-500">No examples available for this concept.</p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Common Mistakes Tab */}
            <TabsContent value="common-mistakes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Common Mistakes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {conceptCard.commonMistakes?.map((mistake, index) => (
                      <li key={index} className="bg-rose-50 p-4 rounded-md border border-rose-100">
                        <p>{mistake}</p>
                      </li>
                    )) || (
                      <p className="text-gray-500">No common mistakes listed for this concept.</p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Exam Relevance Tab */}
            <TabsContent value="exam-relevance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Relevance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>{conceptCard.examRelevance || "No exam relevance information available for this concept."}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Performance Stats */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Performance Stats</h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Quiz Scores</span>
                            <span className="text-sm font-medium text-indigo-600">70%</span>
                          </div>
                          <Progress value={70} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Flashcard Success</span>
                            <span className="text-sm font-medium text-indigo-600">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Time Spent</span>
                            <span className="text-sm font-medium text-indigo-600">45 minutes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Attempt History */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Attempt History</h3>
                      <div className="overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {attemptHistory.map((attempt, index) => (
                              <tr key={index}>
                                <td className="px-2 py-2 text-sm text-gray-900">{attempt.date}</td>
                                <td className="px-2 py-2 text-sm text-gray-900">{attempt.score}%</td>
                                <td className="px-2 py-2 text-sm text-gray-900">{attempt.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Concepts */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <LinkIcon size={18} />
            Related Concepts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedConcepts.map((concept) => (
              <Card key={concept.id} className="hover:shadow-md transition-all cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{concept.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                      {concept.subject}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                      {concept.difficulty}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Study this concept</span>
                    <ArrowRight size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;
