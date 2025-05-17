
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ConceptCard } from '@/types/user/conceptCard';
import { Check, AlertTriangle, Volume, Play, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ConceptCardDetailProps {
  conceptCard: ConceptCard;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ conceptCard }) => {
  const [innerTab, setInnerTab] = useState('content');
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  
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
      
      // Use voices API to find an appropriate Hindi/Indian voice
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

  return (
    <div className="p-6">
      <Tabs value={innerTab} onValueChange={setInnerTab} className="w-full">
        <TabsList className="w-full justify-start bg-gray-100/70 dark:bg-gray-800/50 p-1 rounded-lg mb-6">
          <TabsTrigger value="content" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Content</TabsTrigger>
          <TabsTrigger value="examples" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Examples</TabsTrigger>
          <TabsTrigger value="common-mistakes" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Common Mistakes</TabsTrigger>
          <TabsTrigger value="exam-relevance" className="px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Exam Relevance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="p-0 mt-0 animate-in fade-in-50 duration-200">
          <Card className="border-none shadow-none">
            <CardContent className="p-1">
              <div className="flex flex-wrap md:flex-row justify-between items-center mb-4">
                <div className="flex items-center gap-3 text-muted-foreground text-sm mb-2 md:mb-0">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{getReadingTime()} min read</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleTextToSpeech} className="flex items-center gap-2">
                    {isPlaying ? (
                      <>
                        <Volume className="h-4 w-4 text-primary animate-pulse" />
                        Stop Listening
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Listen to Content
                      </>
                    )}
                  </Button>
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
            <CardContent className="p-1">
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
            <CardContent className="p-1">
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
            <CardContent className="p-1">
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
      </Tabs>
    </div>
  );
};

export default ConceptCardDetail;
