
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const FlashcardReview: React.FC = () => {
  return (
    <Card id="flashcard-review">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-green-600" />
          Flashcard Review
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Today's Review</span>
            <span>12/20 cards</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>8 Mastered</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span>4 Learning</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Next Review:</p>
          <p className="text-xs text-gray-600">Physics - Newton's Laws (3 cards)</p>
          <p className="text-xs text-gray-600">Chemistry - Periodic Table (5 cards)</p>
        </div>
        
        <Link to="/dashboard/student/flashcards">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Continue Review
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FlashcardReview;
