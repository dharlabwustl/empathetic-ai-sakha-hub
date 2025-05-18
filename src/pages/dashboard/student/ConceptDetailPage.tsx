
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  CheckCircle,
  Star,
  Clock
} from 'lucide-react';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { motion } from 'framer-motion';
import { ConceptCard } from '@/types/user/conceptCard';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { conceptCards, loading } = useUserStudyPlan();
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [masteryLevel, setMasteryLevel] = useState(65);
  const [recallStrength, setRecallStrength] = useState(72);
  const { toast } = useToast();
  
  // Speech synthesis for Read Aloud feature
  const speechSynthesis = window.speechSynthesis;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Find the current concept card
  const conceptCard = conceptCards.find(card => card.id === conceptId) as ConceptCard | undefined;
  
  useEffect(() => {
    console.log("ConceptDetailPage - Loaded concept ID:", conceptId);
    
    // Load saved notes
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
    
    // Cleanup speech synthesis when component unmounts
    return () => {
      if (isReadingAloud) {
        speechSynthesis.cancel();
      }
    };
  }, [conceptId, isReadingAloud]);
  
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
  
  // Handle practice quiz
  const handleStartQuiz = () => {
    toast({
      title: "Quiz started",
      description: "Test your knowledge of this concept",
    });
    // Navigate to quiz or show modal
  };
  
  // Handle flashcard practice
  const handleFlashcards = () => {
    if (conceptCard) {
      navigate(`/dashboard/student/flashcards/${conceptId}`);
    }
  };
  
  if (loading || !conceptCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-600 rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Concept...</h2>
        <p className="text-gray-600">Please wait while we prepare your study materials</p>
      </div>
    );
  }

  // Helper functions for styling
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getMasteryClass = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-amber-600';
    if (level >= 40) return 'text-blue-600';
    return 'text-gray-600';
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl py-8 px-4 sm:px-6"
    >
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
                    <CardDescription className="text-base">{conceptCard.description || "Master this concept to improve your understanding of the subject."}</CardDescription>
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
                  {conceptCard.chapter && (
                    <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                      {conceptCard.chapter}
                    </Badge>
                  )}
                  <Badge variant="outline" className={getDifficultyColor(conceptCard.difficulty)}>
                    {conceptCard.difficulty}
                  </Badge>
                  {conceptCard.completed && (
                    <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                      <CheckCircle size={12} /> Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Masterly progress */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mastery Level</span>
                      <span className={`text-sm font-medium ${getMasteryClass(masteryLevel)}`}>{masteryLevel}%</span>
                    </div>
                    <Progress value={masteryLevel} className="h-2 bg-gray-100" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Recall Strength</span>
                      <span className={`text-sm font-medium ${getMasteryClass(recallStrength)}`}>{recallStrength}%</span>
                    </div>
                    <Progress value={recallStrength} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-6 flex flex-wrap gap-2 justify-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleFlashcards}
                  >
                    <BookOpen size={16} />
                    Flashcards
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleStartQuiz}
                  >
                    <FileText size={16} />
                    Practice Quiz
                  </Button>
                </div>
                <Button 
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                >
                  <Brain size={16} />
                  Master This Concept
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
                  <p className="text-sm text-gray-600">Based on your practice, focus on understanding the relationship between {conceptCard.title.toLowerCase()} and related concepts.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Weak Points</h4>
                  <div className="text-sm space-y-1">
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      <span>Mathematical application</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>Real-world examples</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Recommended Review</h4>
                  <p className="text-sm text-gray-600">Schedule a review session in 3 days to strengthen your understanding.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Learning Method</h4>
                  <p className="text-sm text-gray-600">You learn best through visual examples and practice problems.</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Get Detailed Analysis
                  </Button>
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
                      <li key={index} className="bg-slate-50 p-4 rounded-md border border-slate-200">
                        <p>{example}</p>
                      </li>
                    )) || (
                      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                        <h4 className="font-medium mb-2">Example 1: Application of {conceptCard.title}</h4>
                        <p>This is where a detailed example of the concept would appear, showing how it works in practice.</p>
                      </div>
                    )}
                    {!conceptCard.examples && (
                      <div className="bg-purple-50 p-4 rounded-md border border-purple-100 mt-4">
                        <h4 className="font-medium mb-2">Example 2: Real-world scenario</h4>
                        <p>This example would show how this concept applies in everyday situations or professional contexts.</p>
                      </div>
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
                      <div>
                        <div className="bg-rose-50 p-4 rounded-md border border-rose-100">
                          <h4 className="font-medium mb-2">Mistake 1: Misconception</h4>
                          <p>Students often confuse this concept with related ideas, leading to incorrect application.</p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-md border border-amber-100 mt-4">
                          <h4 className="font-medium mb-2">Mistake 2: Calculation Error</h4>
                          <p>A common error when working with this concept is misapplying the formulas or equations.</p>
                        </div>
                      </div>
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
                    <p>{conceptCard.examRelevance || "This concept is frequently tested in exams and typically accounts for approximately 10-15% of the questions in the subject area. Understanding this concept thoroughly is essential for success."}</p>
                    
                    <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                      <h4 className="text-lg font-medium mb-2">Exam Tips</h4>
                      <ul className="pl-5 list-disc space-y-2">
                        <li>Pay special attention to the application of this concept in different scenarios</li>
                        <li>Practice solving problems within time constraints</li>
                        <li>Review the examples and common mistakes sections thoroughly</li>
                        <li>Connect this concept with related topics for a deeper understanding</li>
                      </ul>
                    </div>
                    
                    <div className="mt-6 bg-green-50 p-4 rounded-md border border-green-100">
                      <h4 className="text-lg font-medium mb-2">Previous Year Questions</h4>
                      <p>This concept appeared in the following recent exams:</p>
                      <ul className="pl-5 list-disc space-y-1 mt-2">
                        <li>2023 - 3 questions (10 marks)</li>
                        <li>2022 - 2 questions (7 marks)</li>
                        <li>2021 - 4 questions (12 marks)</li>
                      </ul>
                    </div>
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
                            <span className="text-sm font-medium">Retention Rate</span>
                            <span className="text-sm font-medium text-indigo-600">62%</span>
                          </div>
                          <Progress value={62} className="h-2" />
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
                      
                      <div className="mt-6">
                        <Button size="sm" variant="outline" className="w-full">
                          <BarChart2 className="mr-2 h-4 w-4" />
                          View Detailed Analytics
                        </Button>
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
              <motion.div
                key={concept.id}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Card className="h-full border border-gray-200 transition-all">
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
                  <CardFooter className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      onClick={() => navigate(`/dashboard/student/concepts/${concept.id}`)}
                    >
                      <span>Study this concept</span>
                      <ArrowRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Additional Resources */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 hover:bg-blue-100 transition-colors">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FileText size={20} className="text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Practice Worksheet</h4>
                      <p className="text-xs text-gray-600">10 problems • PDF</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 hover:bg-green-100 transition-colors">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <BookOpen size={20} className="text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Video Tutorial</h4>
                      <p className="text-xs text-gray-600">15 min • English</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50 hover:bg-amber-100 transition-colors">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Brain size={20} className="text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Interactive Simulation</h4>
                      <p className="text-xs text-gray-600">Self-paced • Visual learning</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ConceptDetailPage;
