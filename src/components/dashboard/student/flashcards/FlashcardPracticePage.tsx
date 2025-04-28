
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookmarkIcon, Share2, Mic, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  imageUrl?: string;
  attempts: any[];
  isBookmarked: boolean;
  relatedCards: string[];
}

const FlashcardPracticePage = () => {
  const { cardId } = useParams();
  const { toast } = useToast();
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [card, setCard] = useState<FlashcardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCard({
          id: cardId || '1',
          question: "What is Newton's First Law of Motion?",
          answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced external force. This principle is also known as the law of inertia.",
          subject: "Physics",
          topic: "Laws of Motion",
          imageUrl: undefined,
          attempts: [],
          isBookmarked: false,
          relatedCards: []
        });
        setLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [cardId]);

  const handleSubmit = () => {
    // Implement answer submission and accuracy check
    toast({
      title: "Answer Submitted",
      description: "Your answer is being evaluated..."
    });
    
    // Simulate evaluation
    setTimeout(() => {
      setIsFlipped(true);
      toast({
        title: "Evaluation Complete",
        description: "You can now see the correct answer",
      });
    }, 1500);
  };

  const toggleSpeechRecognition = () => {
    setIsListening(!isListening);
    // Simulate speech recognition
    toast({
      title: isListening ? "Speech Recognition Stopped" : "Listening...",
      duration: 2000
    });
    
    if (!isListening) {
      // Simulate speech recognition result after a delay
      setTimeout(() => {
        setAnswer(prevAnswer => prevAnswer + " An object at rest tends to stay at rest unless acted upon by a force.");
        setIsListening(false);
        toast({
          title: "Speech Recognition Complete",
          description: "Your spoken answer has been added to the text field.",
          duration: 3000
        });
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!card) return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-center text-muted-foreground">Flashcard not found</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Flashcard Practice</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => toast({ title: "Bookmark added!", duration: 2000 })}>
                <BookmarkIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => toast({ title: "Link copied!", duration: 2000 })}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative min-h-[300px] w-full">
            {!isFlipped ? (
              <Card className="w-full h-full p-6">
                <div className="text-lg font-medium mb-4">{card.question}</div>
                {card.imageUrl && (
                  <img src={card.imageUrl} alt="Question" className="mb-4 rounded-lg" />
                )}
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    <Button onClick={toggleSpeechRecognition}>
                      <Mic className="h-4 w-4 mr-2" />
                      {isListening ? "Stop" : "Voice Input"}
                    </Button>
                    <Button onClick={() => setIsFlipped(true)} variant="outline">
                      Show Answer
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="w-full h-full p-6">
                <div className="text-lg font-medium mb-4">Answer:</div>
                <p className="mb-4">{card.answer}</p>
                <Button onClick={() => setIsFlipped(false)} className="mt-4">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Topic: {card.topic}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Subject: {card.subject}</p>
          <p className="mt-2">Practice this flashcard regularly to improve your retention of key concepts.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardPracticePage;
