
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ConceptCard } from '@/types/user/conceptCard';
import { Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ConceptCardDetailProps {
  conceptCard: ConceptCard;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ conceptCard }) => {
  const [innerTab, setInnerTab] = useState('content');
  const { toast } = useToast();
  
  const handleTextToSpeech = () => {
    const text = conceptCard.content;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      
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

  return (
    <div className="p-4">
      <Tabs value={innerTab} onValueChange={setInnerTab} className="w-full mb-6">
        <TabsList className="w-full justify-start mb-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="common-mistakes">Common Mistakes</TabsTrigger>
          <TabsTrigger value="exam-relevance">Exam Relevance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="p-0 mt-0">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="flex justify-end mb-4">
                <Button variant="outline" size="sm" onClick={handleTextToSpeech}>
                  Listen to Content
                </Button>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {conceptCard.content}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="p-0 mt-0">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="space-y-4">
                {conceptCard.examples && conceptCard.examples.length > 0 ? (
                  conceptCard.examples.map((example, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <p className="text-base">{example}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-gray-500">No examples available for this concept.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="common-mistakes" className="p-0 mt-0">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="space-y-4">
                {conceptCard.commonMistakes && conceptCard.commonMistakes.length > 0 ? (
                  conceptCard.commonMistakes.map((mistake, index) => (
                    <div key={index} className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                      <div className="flex items-start gap-3">
                        <span className="text-amber-600 dark:text-amber-400 mt-1">
                          <AlertTriangle size={16} />
                        </span>
                        <p className="text-base">{mistake}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-gray-500">No common mistakes listed for this concept.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="exam-relevance" className="p-0 mt-0">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              {conceptCard.examRelevance ? (
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
                  <h3 className="text-lg font-semibold mb-2 text-purple-800 dark:text-purple-300">Exam Relevance</h3>
                  <p className="text-base leading-relaxed">{conceptCard.examRelevance}</p>
                </div>
              ) : (
                <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
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
