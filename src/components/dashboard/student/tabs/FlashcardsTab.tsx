
import React from 'react';
import { UserProfileType } from '@/types/user';

interface FlashcardsTabProps {
  userProfile: UserProfileType;
}

const FlashcardsTab: React.FC<FlashcardsTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Flashcards</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Practice with your personalized flashcards.
      </p>
      
      {/* Implement flashcards content here */}
    </div>
  );
};

export default FlashcardsTab;
