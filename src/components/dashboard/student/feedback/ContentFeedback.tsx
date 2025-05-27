
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentFeedbackProps {
  contentId: string;
  contentType: 'concept' | 'flashcard' | 'exam';
  contentTitle: string;
  onSubmitFeedback?: (feedback: FeedbackData) => void;
}

interface FeedbackData {
  contentId: string;
  contentType: string;
  rating: 'like' | 'dislike' | null;
  suggestion: string;
  timestamp: Date;
}

const ContentFeedback: React.FC<ContentFeedbackProps> = ({
  contentId,
  contentType,
  contentTitle,
  onSubmitFeedback
}) => {
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);
  const [rating, setRating] = useState<'like' | 'dislike' | null>(null);
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!rating && !suggestion.trim()) return;

    setIsSubmitting(true);
    
    const feedbackData: FeedbackData = {
      contentId,
      contentType,
      rating,
      suggestion: suggestion.trim(),
      timestamp: new Date()
    };

    try {
      // Send feedback to backend
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      });

      if (response.ok) {
        console.log('Feedback submitted successfully');
        if (onSubmitFeedback) {
          onSubmitFeedback(feedbackData);
        }
        setShowFeedbackPanel(false);
        setRating(null);
        setSuggestion('');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowFeedbackPanel(!showFeedbackPanel)}
        className="text-gray-500 hover:text-blue-600 p-1"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {showFeedbackPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-8 right-0 z-50"
          >
            <Card className="w-80 shadow-lg border-2">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-semibold text-gray-800">
                    Feedback for {contentTitle}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFeedbackPanel(false)}
                    className="p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-2">How was this content?</p>
                    <div className="flex gap-2">
                      <Button
                        variant={rating === 'like' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRating(rating === 'like' ? null : 'like')}
                        className="flex-1"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button
                        variant={rating === 'dislike' ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => setRating(rating === 'dislike' ? null : 'dislike')}
                        className="flex-1"
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        Dislike
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-2">Suggestions for improvement:</p>
                    <Textarea
                      placeholder="Tell us how we can improve this content..."
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      className="text-sm"
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleSubmitFeedback}
                    disabled={(!rating && !suggestion.trim()) || isSubmitting}
                    className="w-full"
                    size="sm"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentFeedback;
