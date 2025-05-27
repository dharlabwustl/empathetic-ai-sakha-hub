
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentFeedbackButtonProps {
  contentId: string;
  contentType: 'concept' | 'flashcard' | 'exam';
  contentTitle: string;
}

const ContentFeedbackButton: React.FC<ContentFeedbackButtonProps> = ({
  contentId,
  contentType,
  contentTitle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'like' | 'dislike' | null>(null);
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitFeedback = async () => {
    if (!feedbackType) {
      toast({
        title: "Please select feedback type",
        description: "Choose whether you liked or disliked this content",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to the backend
      const feedbackData = {
        contentId,
        contentType,
        contentTitle,
        feedbackType,
        suggestion: suggestion.trim(),
        timestamp: new Date().toISOString(),
        userId: 'current-user-id' // Would come from auth context
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Feedback submitted:', feedbackData);
      
      // Store in localStorage for now (in real app, would go to admin backend)
      const existingFeedback = JSON.parse(localStorage.getItem('contentFeedback') || '[]');
      existingFeedback.push(feedbackData);
      localStorage.setItem('contentFeedback', JSON.stringify(existingFeedback));

      toast({
        title: "Feedback submitted successfully!",
        description: "Thank you for helping us improve our content.",
      });

      setIsOpen(false);
      setFeedbackType(null);
      setSuggestion('');
    } catch (error) {
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Provide Feedback</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Content:</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{contentType}</Badge>
              <span className="font-medium">{contentTitle}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">How was this content?</p>
            <div className="flex gap-3">
              <Button
                variant={feedbackType === 'like' ? 'default' : 'outline'}
                onClick={() => setFeedbackType('like')}
                className="flex-1 gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                Helpful
              </Button>
              <Button
                variant={feedbackType === 'dislike' ? 'default' : 'outline'}
                onClick={() => setFeedbackType('dislike')}
                className="flex-1 gap-2"
              >
                <ThumbsDown className="h-4 w-4" />
                Needs Work
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Suggestions for improvement (optional):</p>
            <Textarea
              placeholder="What could make this content better? Any specific topics to add or clarify?"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitFeedback}
              disabled={isSubmitting}
              className="flex-1 gap-2"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentFeedbackButton;
