
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ConceptCard } from '@/types/user/conceptCard';
import { 
  Check, 
  AlertTriangle, 
  Volume, 
  Play, 
  Clock, 
  Bookmark,
  BookOpen,
  FileText,
  BrainCircuit,
  ArrowRight,
  Save,
  Download,
  Pencil,
  X,
  BarChart2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import AIInsightsSection from './AIInsightsSection';
import ConceptAnalyticsSection from './ConceptAnalyticsSection';

interface ConceptCardDetailProps {
  conceptCard: ConceptCard;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ conceptCard }) => {
  const [innerTab, setInnerTab] = useState('content');
  const [analyticsTab, setAnalyticsTab] = useState('stats');
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(conceptCard.notes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState('');
  const notesRef = useRef<HTMLDivElement>(null);
  
  // Manage side panel state
  const [showSidePanel, setShowSidePanel] = useState(true);
  
  // Auto-save notes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isEditingNotes && tempNotes !== notes) {
        handleSaveNotes();
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [tempNotes, isEditingNotes]);
  
  // Scroll to notes when opened
  useEffect(() => {
    if (showNotes && notesRef.current) {
      notesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showNotes]);

  const handleTextToSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const text = conceptCard.content;
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech first
      window.speechSynthesis.cancel();
      
      // Create utterance with proper PREPZR pronunciation
      const correctedText = text
        .replace(/PREPZR/gi, 'Prep-zer')
        .replace(/prepzr/gi, 'Prep-zer')
        .replace(/Prepzr/g, 'Prep-zer');
      
      const utterance = new SpeechSynthesisUtterance(correctedText);
      
      // Try to find an appropriate voice
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;
      
      // Try to find a Hindi voice first
      selectedVoice = voices.find(v => v.lang === 'hi-IN');
      
      // If no Hindi voice found, try for Indian English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang === 'en-IN');
      }
      
      // If still no match, use any available voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      toast({
        title: "Text-to-Speech Activated",
        description: "Listening to concept content",
      });
    } else {
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in your browser",
        variant: "destructive",
      });
    }
  };

  // Estimate reading time based on content length
  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const words = conceptCard.content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes < 1 ? 1 : minutes;
  };

  // Handle notes editing
  const handleEditNotes = () => {
    setTempNotes(notes);
    setIsEditingNotes(true);
  };

  // Save notes
  const handleSaveNotes = () => {
    setNotes(tempNotes);
    setIsEditingNotes(false);
    
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully",
    });
  };

  // Cancel notes editing
  const handleCancelEdit = () => {
    setIsEditingNotes(false);
  };

  // Download notes as text file
  const handleDownloadNotes = () => {
    const element = document.createElement("a");
    const file = new Blob([notes], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${conceptCard.title.replace(/\s+/g, '_')}_notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Notes Downloaded",
      description: "Your notes have been downloaded as a text file",
    });
  };
  
  // Related concepts navigation
  const handleOpenRelatedConcept = (conceptId: string) => {
    console.log("Opening related concept:", conceptId);
    // In a real app, this would navigate to the concept detail page
    toast({
      title: "Opening Related Concept",
      description: `Navigating to concept: ${conceptId}`,
    });
  };
  
  // Handle practice flashcards button
  const handlePracticeFlashcards = () => {
    console.log("Practice flashcards for concept:", conceptCard.id);
    toast({
      title: "Flashcards",
      description: "Opening flashcards for this concept",
    });
  };
  
  // Handle practice exam button
  const handlePracticeExam = () => {
    console.log("Practice exam for concept:", conceptCard.id);
    toast({
      title: "Practice Exam",
      description: "Starting practice exam for this concept",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 min-h-screen">
      {/* Main Content Area */}
      <div className="w-full lg:w-3/4 pb-6">
        {/* Header section */}
        <div className="bg-white dark:bg-gray-900 shadow-sm p-6 rounded-lg mb-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {conceptCard.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {conceptCard.subject}
                </Badge>
                {conceptCard.chapter && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {conceptCard.chapter}
                  </Badge>
                )}
                <Badge variant={conceptCard.difficulty === 'easy' ? "outline" : 
                              conceptCard.difficulty === 'medium' ? "secondary" : "destructive"}>
                  {conceptCard.difficulty === 'easy' ? 'Easy' : 
                   conceptCard.difficulty === 'medium' ? 'Medium' : 'Hard'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-start">
              <Button 
                onClick={handleTextToSpeech}
                variant="outline" 
                className="flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <Volume className="h-4 w-4 text-blue-600 animate-pulse" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Read Aloud
                  </>
                )}
              </Button>
              
              <Button 
                onClick={() => setShowSidePanel(!showSidePanel)}
                variant="outline"
                size="icon"
                className="lg:hidden"
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
            <Button onClick={handlePracticeFlashcards} className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Practice Flashcards
            </Button>
            
            <Button onClick={handlePracticeExam} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Practice Exam
            </Button>
            
            <Button 
              onClick={() => setShowNotes(!showNotes)} 
              variant={showNotes ? "secondary" : "outline"} 
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              {showNotes ? "Hide Notes" : "Show Notes"}
            </Button>
          </div>
        </div>

        {/* Notes Section - Collapsible */}
        {showNotes && (
          <div ref={notesRef} className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 mb-6 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Pencil className="h-5 w-5 text-blue-600" />
                Personal Notes
              </h2>
              
              <div className="flex items-center gap-2">
                {isEditingNotes ? (
                  <>
                    <Button size="sm" variant="ghost" onClick={handleCancelEdit} className="h-8">
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveNotes} className="h-8">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={handleDownloadNotes} className="h-8">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" onClick={handleEditNotes} className="h-8">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {isEditingNotes ? (
              <Textarea 
                value={tempNotes} 
                onChange={(e) => setTempNotes(e.target.value)}
                placeholder="Type your notes here..."
                className="min-h-[200px] p-4 bg-gray-50 dark:bg-gray-800"
              />
            ) : (
              <div className="p-4 min-h-[100px] bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                {notes ? (
                  <div className="prose dark:prose-invert max-w-none">
                    {notes.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No notes yet. Click Edit to add your notes.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tabbed Content */}
        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg">
          <Tabs value={innerTab} onValueChange={setInnerTab} className="w-full">
            <div className="px-6 pt-6">
              <TabsList className="w-full justify-start bg-gray-100/70 dark:bg-gray-800/50 p-1 rounded-lg mb-6">
                <TabsTrigger value="content" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Content</TabsTrigger>
                <TabsTrigger value="examples" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Examples</TabsTrigger>
                <TabsTrigger value="common-mistakes" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Common Mistakes</TabsTrigger>
                <TabsTrigger value="exam-relevance" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Exam Relevance</TabsTrigger>
                <TabsTrigger value="analytics" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Analytics</TabsTrigger>
                <TabsTrigger value="insights" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">AI Insights</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="content" className="p-0 mt-0 animate-in fade-in-50 duration-200">
              <Card className="border-none shadow-none">
                <CardContent className="p-6">
                  <div className="flex flex-wrap md:flex-row justify-between items-center mb-4">
                    <div className="flex items-center gap-3 text-muted-foreground text-sm mb-2 md:mb-0">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{getReadingTime()} min read</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50/50 dark:bg-blue-900/5 rounded-lg p-5 border border-blue-100 dark:border-blue-900/20">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-base leading-relaxed whitespace-pre-line">
                        {conceptCard.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="examples" className="p-0 mt-0 animate-in fade-in-50 duration-200">
              <Card className="border-none shadow-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {conceptCard.examples && conceptCard.examples.length > 0 ? (
                      conceptCard.examples.map((example, index) => (
                        <div key={index} className="bg-green-50/70 dark:bg-green-900/10 p-5 rounded-lg border border-green-100 dark:border-green-800/30">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-100 dark:bg-green-800/50 text-green-800 dark:text-green-200 rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Example {index + 1}</h4>
                              <p className="text-base">{example}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500">No examples available for this concept.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="common-mistakes" className="p-0 mt-0 animate-in fade-in-50 duration-200">
              <Card className="border-none shadow-none">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {conceptCard.commonMistakes && conceptCard.commonMistakes.length > 0 ? (
                      conceptCard.commonMistakes.map((mistake, index) => (
                        <div key={index} className="bg-amber-50/70 dark:bg-amber-900/10 p-5 rounded-lg border border-amber-100 dark:border-amber-800/30">
                          <div className="flex items-start gap-4">
                            <div className="text-amber-600 dark:text-amber-400 mt-1 bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full shrink-0">
                              <AlertTriangle size={18} />
                            </div>
                            <div>
                              <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Common Mistake {index + 1}</h4>
                              <p className="text-base">{mistake}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                        <p className="text-gray-500">No common mistakes listed for this concept.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exam-relevance" className="p-0 mt-0 animate-in fade-in-50 duration-200">
              <Card className="border-none shadow-none">
                <CardContent className="p-6">
                  {conceptCard.examRelevance ? (
                    <div className="bg-purple-50/70 dark:bg-purple-900/10 p-6 rounded-lg border border-purple-100 dark:border-purple-800/30">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-full shrink-0">
                          <Bookmark className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-300">Exam Relevance</h3>
                          <p className="text-base leading-relaxed">{conceptCard.examRelevance}</p>
                          
                          {/* Exam importance indicator */}
                          <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800/30">
                            <h4 className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-2">Importance Level</h4>
                            <div className="flex items-center">
                              <div className="w-full bg-purple-200 dark:bg-purple-800/30 rounded-full h-2.5">
                                <div className="bg-purple-600 dark:bg-purple-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <span className="text-sm ml-2 text-purple-700 dark:text-purple-400 font-medium">High</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                      <p className="text-gray-500">No exam relevance information available.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="p-0 mt-0 animate-in fade-in-50 duration-200">
              <ConceptAnalyticsSection 
                conceptId={conceptCard.id}
                masteryPercent={conceptCard.progress}
                recallAccuracy={conceptCard.recallAccuracy}
                quizScore={conceptCard.quizScore}
                practiceAttempts={5}
              />
            </TabsContent>
            
            <TabsContent value="insights" className="p-0 mt-0 animate-in fade-in-50 duration-200">
              <AIInsightsSection 
                conceptId={conceptCard.id}
                conceptTitle={conceptCard.title}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Side Panel - Related Concepts, Progress Stats, etc. */}
      <div className={`w-full lg:w-1/4 lg:block ${showSidePanel ? 'block' : 'hidden'} space-y-6 p-6 lg:p-0`}>
        {/* Progress Card */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-600" />
              Your Progress
            </h3>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Overall Mastery</span>
                  <span>{conceptCard.progress || 0}%</span>
                </div>
                <Progress value={conceptCard.progress || 0} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Recall Accuracy</span>
                  <span>{conceptCard.recallAccuracy || 0}%</span>
                </div>
                <Progress value={conceptCard.recallAccuracy || 0} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Quiz Score</span>
                  <span>{conceptCard.quizScore || 0}%</span>
                </div>
                <Progress value={conceptCard.quizScore || 0} className="h-2" />
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last studied</span>
                <span className="font-medium">2 days ago</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Time spent</span>
                <span className="font-medium">45 minutes</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Practice sessions</span>
                <span className="font-medium">5 sessions</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Related Concepts */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <h3 className="font-semibold text-lg">Related Concepts</h3>
          </CardHeader>
          <CardContent className="pt-0">
            {conceptCard.relatedConcepts && conceptCard.relatedConcepts.length > 0 ? (
              <div className="space-y-3">
                {conceptCard.relatedConcepts.map((concept, index) => (
                  <div 
                    key={index}
                    onClick={() => handleOpenRelatedConcept(concept)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer group transition-colors"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1.5 text-blue-700 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-grow">
                      {concept}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-sm text-gray-500">
                No related concepts found
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Revision Schedule */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <h3 className="font-semibold text-lg">Revision Schedule</h3>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/10 rounded-md border border-green-100 dark:border-green-800/30">
                <div className="bg-green-100 dark:bg-green-800/50 rounded-full p-1.5 text-green-700 dark:text-green-300">
                  <Check className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Last revised</p>
                  <p className="text-xs text-green-600 dark:text-green-400">2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/10 rounded-md border border-blue-100 dark:border-blue-800/30">
                <div className="bg-blue-100 dark:bg-blue-800/50 rounded-full p-1.5 text-blue-700 dark:text-blue-300">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Next revision due</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Tomorrow</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
