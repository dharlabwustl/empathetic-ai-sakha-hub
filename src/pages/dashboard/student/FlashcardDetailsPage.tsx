
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const FlashcardDetailsPage = () => {
  const { cardId } = useParams();
  const [flipped, setFlipped] = React.useState(false);

  return (
    <SharedPageLayout 
      title="Flashcard Details" 
      subtitle="Practice with interactive flashcards"
      showQuickAccess={false}
    >
      <div className="max-w-3xl mx-auto">
        <div 
          className={`relative w-full h-[400px] transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''} preserve-3d`}
          onClick={() => setFlipped(!flipped)}
        >
          {/* Front of card */}
          <Card className={`absolute inset-0 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center ${flipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Topic: Mathematics</p>
              <h3 className="text-2xl font-bold mb-6">What is the Pythagorean theorem?</h3>
              <div className="mt-4 text-center text-gray-600">
                <p className="italic">Click to reveal answer</p>
              </div>
            </div>
          </Card>
          
          {/* Back of card */}
          <Card className={`absolute inset-0 p-8 rounded-xl shadow-lg flex flex-col items-center justify-center ${flipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Answer:</h3>
              <p className="text-lg mb-4">
                The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides.
              </p>
              <div className="my-4 text-center">
                <p className="text-xl font-mono">a² + b² = c²</p>
              </div>
              <div className="mt-4 text-center text-gray-600">
                <p className="italic">Click to see question</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline">Previous Card</Button>
          <Button variant="outline" onClick={() => setFlipped(!flipped)}>Flip Card</Button>
          <Button variant="outline">Next Card</Button>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">How well did you know this?</h3>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-red-200 hover:bg-red-50 text-red-600">Not at all</Button>
            <Button variant="outline" className="flex-1 border-yellow-200 hover:bg-yellow-50 text-yellow-600">Somewhat</Button>
            <Button variant="outline" className="flex-1 border-green-200 hover:bg-green-50 text-green-600">Very well</Button>
            <Button variant="outline" className="flex-1 border-blue-200 hover:bg-blue-50 text-blue-600">Perfect</Button>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardDetailsPage;
