
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useAnswerSubmission = () => {
  const { toast } = useToast();
  const [userAnswer, setUserAnswer] = useState('');
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

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

  const handleSpeechToText = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setUserAnswer(prev => prev + " [Speech input placeholder]");
    }, 2000);
  };

  const handleSubmitAnswer = (correctAnswer: string) => {
    const accuracyScore = calculateAccuracy(userAnswer, correctAnswer);
    setAccuracy(accuracyScore);
    setAnswerSubmitted(true);
  };

  const handleTryAgain = () => {
    setUserAnswer('');
    setAnswerSubmitted(false);
    setAccuracy(0);
  };

  const handleBookmark = () => {
    toast({
      title: "Flashcard Bookmarked",
      description: "This card has been added to your bookmarks.",
    });
  };

  return {
    userAnswer,
    setUserAnswer,
    answerSubmitted,
    accuracy,
    isRecording,
    handleSpeechToText,
    handleSubmitAnswer,
    handleTryAgain,
    handleBookmark
  };
};
