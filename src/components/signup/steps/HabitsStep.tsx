
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface HabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const HabitsStep: React.FC<HabitsStepProps> = ({ onSubmit }) => {
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    onSubmit({ comments });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Additional Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Comments or specific learning needs (optional)
          </label>
          <Textarea
            placeholder="Tell us anything specific about your study needs, challenges, or preferences..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5}
            className="resize-none"
          />
        </div>
      </div>
      
      <Button 
        onClick={handleSubmit}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
};

export default HabitsStep;
