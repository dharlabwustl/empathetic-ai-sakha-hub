
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookmarkIcon, Share2, Mic, RefreshCw } from 'lucide-react';
import { FlashcardPracticeData } from '@/types/student/study';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const FlashcardPracticePage = () => {
  const { cardId } = useParams();
  const { toast } = useToast();
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [card, setCard] = useState<FlashcardPracticeData | null>(null);

  useEffect(() => {
    // TODO: Fetch flashcard data using cardId
    // Mock data for now
    setCard({
      id: cardId || '',
      question: "What is Newton's First Law of Motion?",
      answer: "An object at rest stays at rest and an object in motion stays in motion...",
      subject: "Physics",
      topic: "Laws of Motion",
      imageUrl: undefined,
      attempts: [],
      isBookmarked: false,
      relatedCards: []
    });
  }, [cardId]);

  const handleSubmit = () => {
    // TODO: Implement answer submission and accuracy check
    toast({
      title: "Answer Submitted",
      description: "Your answer is being evaluated..."
    });
  };

  const toggleSpeechRecognition = () => {
    setIsListening(!isListening);
    // TODO: Implement speech recognition
    toast({
      title: isListening ? "Speech Recognition Stopped" : "Listening...",
      duration: 2000
    });
  };

  if (!card) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Flashcard Practice</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <BookmarkIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[300px] w-full"
          >
            <Card className={`absolute w-full h-full p-6 ${isFlipped ? 'hidden' : ''}`}>
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

            <Card 
              className={`absolute w-full h-full p-6 [transform:rotateY(180deg)] ${!isFlipped ? 'hidden' : ''}`}
            >
              <div className="text-lg font-medium mb-4">Answer:</div>
              <p className="mb-4">{card.answer}</p>
              <Button onClick={() => setIsFlipped(false)} className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </Card>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardPracticePage;
