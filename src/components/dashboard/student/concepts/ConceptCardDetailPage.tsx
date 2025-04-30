import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import MainLayout from '@/components/layouts/MainLayout';
import { ArrowLeft, BookOpen, Book, Clock, Tag, MessageSquare, Volume, Volume2, VolumeX, Loader2, Brain, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  const [detailLevel, setDetailLevel] = useState<'basic' | 'detailed' | 'simplified' | 'advanced'>('basic');
  const [isReading, setIsReading] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setIsSpeechSupported(true);
    }

    // Stop speech when component unmounts
    return () => {
      if (speechSynthesisRef.current && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!isSpeechSupported) {
      toast({
        title: "Speech synthesis not supported",
        description: "Your browser doesn't support the speech synthesis API.",
        variant: "destructive"
      });
      return;
    }

    if (isReading) {
      // Stop reading
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsReading(false);
      }
    } else {
      // Start reading
      if (!conceptCard) return;

      // Get text based on active tab
      let textToRead = "";
      const activeTab = document.querySelector('[role="tabpanel"]:not([hidden])');
      
      if (activeTab) {
        textToRead = activeTab.textContent || "";
      } else {
        textToRead = `${conceptCard.title}. ${getContentByDetailLevel(detailLevel)}`;
      }

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // Slightly slower than default
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => {
        setIsReading(false);
        toast({
          title: "Error occurred",
          description: "There was a problem with the speech synthesis.",
          variant: "destructive"
        });
      };
      
      speechSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  // Helper function to get content based on detail level
  const getContentByDetailLevel = (level: string) => {
    if (!conceptCard?.content) return "";
    switch (level) {
      case 'basic':
        return conceptCard.content.split('.').slice(0, 2).join('.') + '.';
      case 'detailed':
        return conceptCard.content;
      case 'simplified':
        return `Simplified explanation: ${conceptCard.content.split('.').slice(0, 1).join('.')}. This is the core idea.`;
      case 'advanced':
        return `Advanced explanation: ${conceptCard.content}. Additionally, this concept extends to more complex scenarios and has numerous applications in the field.`;
      default:
        return conceptCard.content;
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!conceptCard) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center h-64">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h1 className="text-xl font-semibold mb-2">Concept not found</h1>
            <p className="text-gray-600 mb-4">The concept you're looking for doesn't exist or has been removed.</p>
            <Link to="/dashboard/student/concepts/all">
              <Button>Back to all concepts</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="space-y-6">
          {/* Navigation */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <Link to="/dashboard/student/concepts/all" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-1">
                <ArrowLeft size={16} className="mr-1" /> Back to all concepts
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{conceptCard.title}</h1>
                <Badge 
                  variant={conceptCard.completed ? "outline" : "default"}
                  className="ml-2"
                >
                  {conceptCard.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className={isReading ? "bg-blue-50" : ""}
                onClick={toggleSpeech}
              >
                {isReading ? (
                  <>
                    <VolumeX className="mr-1 h-4 w-4" /> Stop Reading
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-1 h-4 w-4" /> Read Aloud
                  </>
                )}
              </Button>
              
              <Button 
                variant="default"
                size="sm" 
                onClick={() => {
                  toast({
                    title: "Concept marked as completed",
                    description: "Your progress has been updated!",
                    variant: "default"
                  });
                }}
              >
                {conceptCard.completed ? (
                  <>
                    <CheckCircle2 className="mr-1 h-4 w-4" /> Completed
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-1 h-4 w-4" /> Mark as Complete
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Metadata Card */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Book className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Subject</p>
                    <p className="font-medium">{conceptCard.subject}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Chapter</p>
                    <p className="font-medium">{conceptCard.chapter}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Est. Time</p>
                    <p className="font-medium">{conceptCard.estimatedTime} minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${
                    conceptCard.difficulty.toLowerCase() === 'easy' ? 'bg-green-100' :
                    conceptCard.difficulty.toLowerCase() === 'medium' ? 'bg-amber-100' : 'bg-red-100'
                  }`}>
                    <Tag className={`h-4 w-4 ${
                      conceptCard.difficulty.toLowerCase() === 'easy' ? 'text-green-600' :
                      conceptCard.difficulty.toLowerCase() === 'medium' ? 'text-amber-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Difficulty</p>
                    <p className="font-medium">{conceptCard.difficulty}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="explanation">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="explanation">Explanation</TabsTrigger>
              <TabsTrigger value="examples">Real World Examples</TabsTrigger>
              <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
              <TabsTrigger value="exam-relevance">Exam Relevance</TabsTrigger>
            </TabsList>
            
            {/* Explanation Tab */}
            <TabsContent value="explanation" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Explanation</CardTitle>
                    <Tabs value={detailLevel} onValueChange={(v) => setDetailLevel(v as any)}>
                      <TabsList>
                        <TabsTrigger value="basic">Basic</TabsTrigger>
                        <TabsTrigger value="detailed">Detailed</TabsTrigger>
                        <TabsTrigger value="simplified">Simplified</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p>{getContentByDetailLevel(detailLevel)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Real World Examples Tab */}
            <TabsContent value="examples" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Real World Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {conceptCard.examples && conceptCard.examples.length > 0 ? (
                      <ul className="space-y-4">
                        {conceptCard.examples.map((example, index) => (
                          <li key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex gap-3">
                              <div className="bg-blue-100 p-2 h-8 w-8 rounded-full flex items-center justify-center">
                                <span className="font-medium text-blue-700">{index + 1}</span>
                              </div>
                              <p>{example}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center py-6">No examples available for this concept.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Common Mistakes Tab */}
            <TabsContent value="mistakes" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Common Mistakes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {conceptCard.commonMistakes && conceptCard.commonMistakes.length > 0 ? (
                      <ul className="space-y-4">
                        {conceptCard.commonMistakes.map((mistake, index) => (
                          <li key={index} className="bg-red-50 p-4 rounded-lg border border-red-100">
                            <div className="flex gap-3">
                              <div className="bg-red-100 p-2 h-8 w-8 rounded-full flex items-center justify-center">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                              </div>
                              <p>{mistake}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-center py-6">No common mistakes listed for this concept.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Exam Relevance Tab */}
            <TabsContent value="exam-relevance" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Exam Relevance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {conceptCard.examRelevance ? (
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="flex gap-3">
                          <div className="bg-purple-100 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                            <Brain className="h-4 w-4 text-purple-600" />
                          </div>
                          <p>{conceptCard.examRelevance}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-6">No exam relevance information available.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Related Concepts Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Related Concepts</h2>
            {conceptCard.relatedConcepts && conceptCard.relatedConcepts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {conceptCard.relatedConcepts.map((relatedId) => (
                  <Link key={relatedId} to={`/dashboard/student/concepts/${relatedId}`}>
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-100 p-2 rounded-full">
                            <Lightbulb className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {relatedId === 'c1' ? "Newton's Third Law of Motion" : 
                               relatedId === 'c4' ? "Integration by Parts" : 
                               relatedId === 'c7' ? "Organic Chemistry Nomenclature" : 
                               "Related Concept"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {relatedId === 'c1' ? "Physics" : 
                               relatedId === 'c4' ? "Mathematics" : 
                               relatedId === 'c7' ? "Chemistry" : 
                               "Subject"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">No related concepts available.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConceptCardDetailPage;
