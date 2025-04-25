
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import FlashcardHeader from '@/components/dashboard/student/flashcard-browser/FlashcardHeader';
import FlashcardQuestion from '@/components/dashboard/student/flashcard-browser/FlashcardQuestion';
import AnswerInput from '@/components/dashboard/student/flashcard-browser/AnswerInput';
import ResultsView from '@/components/dashboard/student/flashcard-browser/ResultsView';
import { useToast } from "@/components/ui/use-toast";

interface FlashcardQuestion {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardDetail {
  id: string;
  subject: string;
  topic: string;
  conceptId: string;
  questions: FlashcardQuestion[];
}

const FlashcardBrowserPage = () => {
  const { toast } = useToast();
  const [currentCard, setCurrentCard] = useState<FlashcardDetail | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Simulated data - in real app, this would come from API
    setCurrentCard({
      id: '1',
      subject: "Physics",
      topic: "Laws of Motion",
      conceptId: "newtons-laws",
      questions: [
        {
          id: '1a',
          question: "What is Newton's First Law of Motion?",
          answer: "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
        },
        {
          id: '1b',
          question: "How does Newton's First Law explain the concept of inertia?",
          answer: "Newton's First Law directly defines inertia as the tendency of an object to resist changes in its state of motion, whether at rest or moving at constant velocity.",
        },
        {
          id: '1c',
          question: "Give a real-world example of Newton's First Law in action.",
          answer: "When a car suddenly stops, passengers continue moving forward due to their inertia - demonstrating an object's tendency to maintain its state of motion.",
        }
      ]
    });
  }, []);

  const handleSpeechToText = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setUserAnswer(prev => prev + " " + currentCard?.questions[currentQuestionIndex].answer.split(' ').slice(0, 3).join(' ') + "...");
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
    
    const accuracyScore = calculateAccuracy(
      userAnswer, 
      currentCard.questions[currentQuestionIndex].answer
    );
    setAccuracy(accuracyScore);
    setAnswerSubmitted(true);
  };

  const handleTryAgain = () => {
    setUserAnswer('');
    setAnswerSubmitted(false);
    setAccuracy(0);
    setIsFlipped(false);
  };

  const handleBookmark = () => {
    toast({
      title: "Flashcard Bookmarked",
      description: "This card has been added to your bookmarks.",
    });
  };

  const handleNextQuestion = () => {
    if (!currentCard) return;
    if (currentQuestionIndex < currentCard.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      handleTryAgain();
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };

  if (!currentCard) {
    return <div>Loading...</div>;
  }

  const currentQuestion = currentCard.questions[currentQuestionIndex];

  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto py-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <FlashcardHeader 
              subject={currentCard.subject}
              voiceEnabled={voiceEnabled}
              onToggleVoice={toggleVoice}
            />

            <FlashcardQuestion 
              topic={currentCard.topic}
              question={currentQuestion.question}
              answer={currentQuestion.answer}
              isFlipped={isFlipped}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={currentCard.questions.length}
              onFlip={() => setIsFlipped(!isFlipped)}
              onBookmark={handleBookmark}
              onReplayAudio={() => {/* Implement audio replay */}}
              onMarkDone={handleNextQuestion}
              onViewConcept={() => {/* Implement concept view navigation */}}
              voiceEnabled={voiceEnabled}
            />

            {!isFlipped && !answerSubmitted && (
              <AnswerInput 
                userAnswer={userAnswer}
                isRecording={isRecording}
                onAnswerChange={setUserAnswer}
                onSpeechToText={handleSpeechToText}
                onSubmit={handleSubmitAnswer}
              />
            )}

            {!isFlipped && answerSubmitted && (
              <ResultsView 
                accuracy={accuracy}
                correctAnswer={currentQuestion.answer}
                onTryAgain={handleTryAgain}
              />
            )}

            {answerSubmitted && currentQuestionIndex < currentCard.questions.length - 1 && (
              <Button 
                onClick={handleNextQuestion}
                className="w-full mt-4"
              >
                Next Question
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FlashcardBrowserPage;
