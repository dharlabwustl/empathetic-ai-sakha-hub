
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Check, Mic, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';

interface FlashcardDetail {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  conceptId: string;
}

const FlashcardBrowserPage = () => {
  const [currentCard, setCurrentCard] = useState<FlashcardDetail | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Mock flashcard data for demo
  useEffect(() => {
    setCurrentCard({
      id: '1',
      question: "What is Newton's First Law of Motion?",
      answer: "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
      subject: "Physics",
      topic: "Laws of Motion",
      conceptId: "newtons-laws"
    });
  }, []);

  const handleSpeechToText = () => {
    setIsRecording(true);
    // In a real implementation, this would use the Web Speech API
    setTimeout(() => {
      setIsRecording(false);
      setUserAnswer(prev => prev + " " + currentCard?.answer.split(' ').slice(0, 3).join(' ') + "...");
    }, 2000);
  };

  const calculateAccuracy = (userAns: string, correctAns: string): number => {
    if (!userAns || !correctAns) return 0;
    
    const userWords = userAns.toLowerCase().split(' ');
    const correctWords = correctAns.toLowerCase().split(' ');
    let matches = 0;
    
    userWords.forEach(word => {
      if (word.length > 3 && correctWords.includes(word)) {
        matches++;
      }
    });
    
    return Math.min(100, Math.round((matches / Math.max(1, correctWords.length)) * 100));
  };

  const handleSubmitAnswer = () => {
    if (!currentCard) return;
    
    const accuracyScore = calculateAccuracy(userAnswer, currentCard.answer);
    setAccuracy(accuracyScore);
    setAnswerSubmitted(true);
  };

  const handleTryAgain = () => {
    setUserAnswer('');
    setAnswerSubmitted(false);
    setAccuracy(0);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  if (!currentCard) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <Badge variant="outline">{currentCard.subject}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoice}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>

            {/* Question */}
            <div className="text-center space-y-4">
              <Badge variant="secondary">{currentCard.topic}</Badge>
              <h2 className="text-2xl font-semibold">{currentCard.question}</h2>
            </div>

            {/* Answer Input */}
            {!answerSubmitted && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Your Answer</label>
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    onClick={handleSpeechToText}
                    className="flex items-center gap-2"
                  >
                    <Mic className="h-4 w-4" />
                    {isRecording ? "Recording..." : "Voice Input"}
                  </Button>
                </div>
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[100px]"
                  disabled={isRecording}
                />
                <Button 
                  className="w-full"
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Submit Answer
                </Button>
              </div>
            )}

            {/* Results */}
            {answerSubmitted && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <h3 className="font-medium mb-2">Answer Accuracy</h3>
                  <Progress value={accuracy} className="h-2 mb-2" />
                  <p className="text-lg font-bold mb-4">{accuracy}% Match</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Correct Answer:</h4>
                  <p className="p-3 bg-white rounded border">{currentCard.answer}</p>
                </div>

                <div className="flex justify-center gap-2">
                  <Button variant="outline" onClick={handleTryAgain}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FlashcardBrowserPage;
