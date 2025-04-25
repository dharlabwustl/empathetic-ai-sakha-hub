
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layouts/MainLayout';
import FlashcardHeader from '@/components/dashboard/student/flashcard-browser/FlashcardHeader';
import FlashcardQuestion from '@/components/dashboard/student/flashcard-browser/FlashcardQuestion';
import AnswerInput from '@/components/dashboard/student/flashcard-browser/AnswerInput';
import ResultsView from '@/components/dashboard/student/flashcard-browser/ResultsView';
import { useFlashcardNavigation } from '@/hooks/useFlashcardNavigation';
import { useAnswerSubmission } from '@/hooks/useAnswerSubmission';

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
  const [currentCard, setCurrentCard] = useState<FlashcardDetail | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const {
    currentQuestionIndex,
    isFlipped,
    handleNext,
    toggleFlip
  } = useFlashcardNavigation({
    totalCards: currentCard?.questions.length || 0
  });

  const {
    userAnswer,
    setUserAnswer,
    answerSubmitted,
    accuracy,
    isRecording,
    handleSpeechToText,
    handleSubmitAnswer,
    handleTryAgain,
    handleBookmark
  } = useAnswerSubmission();

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
              onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
            />

            <FlashcardQuestion 
              topic={currentCard.topic}
              question={currentQuestion.question}
              answer={currentQuestion.answer}
              isFlipped={isFlipped}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={currentCard.questions.length}
              onFlip={toggleFlip}
              onBookmark={handleBookmark}
              onReplayAudio={() => {/* Audio replay logic */}}
              onMarkDone={handleNext}
              onViewConcept={() => {/* View concept logic */}}
              voiceEnabled={voiceEnabled}
            />

            {!isFlipped && !answerSubmitted && (
              <AnswerInput 
                userAnswer={userAnswer}
                isRecording={isRecording}
                onAnswerChange={setUserAnswer}
                onSpeechToText={handleSpeechToText}
                onSubmit={() => handleSubmitAnswer(currentQuestion.answer)}
              />
            )}

            {!isFlipped && answerSubmitted && (
              <ResultsView 
                accuracy={accuracy}
                correctAnswer={currentQuestion.answer}
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
