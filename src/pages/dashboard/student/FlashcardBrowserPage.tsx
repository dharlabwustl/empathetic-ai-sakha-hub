import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import FlashcardHeader from '@/components/dashboard/student/flashcard-browser/FlashcardHeader';
import FlashcardQuestion from '@/components/dashboard/student/flashcard-browser/FlashcardQuestion';
import AnswerInput from '@/components/dashboard/student/flashcard-browser/AnswerInput';
import ResultsView from '@/components/dashboard/student/flashcard-browser/ResultsView';

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
              question={currentCard.question}
            />

            {!answerSubmitted && (
              <AnswerInput 
                userAnswer={userAnswer}
                isRecording={isRecording}
                onAnswerChange={setUserAnswer}
                onSpeechToText={handleSpeechToText}
                onSubmit={handleSubmitAnswer}
              />
            )}

            {answerSubmitted && (
              <ResultsView 
                accuracy={accuracy}
                correctAnswer={currentCard.answer}
                onTryAgain={handleTryAgain}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FlashcardBrowserPage;
