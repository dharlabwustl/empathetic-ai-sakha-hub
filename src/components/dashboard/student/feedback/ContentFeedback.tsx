
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleSubmitFeedback = async () => {
    if (!rating && !suggestion.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide a rating or suggestion before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const feedbackData: FeedbackData = {
      contentId,
      contentType,
      rating,
      suggestion: suggestion.trim(),
      timestamp: new Date()
    };

    try {
      // Send feedback to backend API
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Add auth if needed
        },
        body: JSON.stringify(feedbackData)
      });

      if (response.ok) {
        toast({
          title: "Feedback Submitted",
          description: "Thank you for your feedback! It helps us improve PREPZR.",
        });
        
        if (onSubmitFeedback) {
          onSubmitFeedback(feedbackData);
        }
        
        // Reset form
        setShowFeedbackPanel(false);
        setRating(null);
        setSuggestion('');
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      
      // Store feedback locally as fallback
      const existingFeedback = JSON.parse(localStorage.getItem('pendingFeedback') || '[]');
      existingFeedback.push(feedbackData);
      localStorage.setItem('pendingFeedback', JSON.stringify(existingFeedback));
      
      toast({
        title: "Feedback Saved",
        description: "Your feedback has been saved locally and will be submitted when connection is restored.",
      });
      
      setShowFeedbackPanel(false);
      setRating(null);
      setSuggestion('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContentTypeIcon = () => {
    switch (contentType) {
      case 'concept':
        return '📚';
      case 'flashcard':
        return '🧠';
      case 'exam':
        return '📝';
      default:
        return '💭';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowFeedbackPanel(!showFeedbackPanel)}
        className="text-gray-500 hover:text-blue-600 p-2 h-8 w-8"
        title="Provide feedback"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {showFeedbackPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-10 right-0 z-50"
          >
            <Card className="w-80 shadow-xl border-2 border-blue-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      {getContentTypeIcon()} Feedback for {contentType}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      "{contentTitle}"
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFeedbackPanel(false)}
                    className="p-1 h-6 w-6 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Rating Section */}
                  <div>
                    <p className="text-xs text-gray-600 mb-2 font-medium">How was this content?</p>
                    <div className="flex gap-2">
                      <Button
                        variant={rating === 'like' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRating(rating === 'like' ? null : 'like')}
                        className={`flex-1 ${rating === 'like' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50 hover:border-green-300'}`}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button
                        variant={rating === 'dislike' ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => setRating(rating === 'dislike' ? null : 'dislike')}
                        className={`flex-1 ${rating === 'dislike' ? '' : 'hover:bg-red-50 hover:border-red-300'}`}
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        Dislike
                      </Button>
                    </div>
                  </div>

                  {/* Suggestion Section */}
                  <div>
                    <p className="text-xs text-gray-600 mb-2 font-medium">Suggestions for improvement:</p>
                    <Textarea
                      placeholder="Tell us how we can improve this content..."
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      className="text-sm resize-none"
                      rows={3}
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {suggestion.length}/500
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmitFeedback}
                    disabled={(!rating && !suggestion.trim()) || isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Your feedback helps improve PREPZR for everyone! 🙏
                  </p>
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
