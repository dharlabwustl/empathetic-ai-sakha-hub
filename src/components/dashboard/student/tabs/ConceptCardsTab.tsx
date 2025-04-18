
import React from 'react';
import { UserProfileType } from '@/types/user';

interface ConceptCardsTabProps {
  userProfile: UserProfileType;
}

const ConceptCardsTab: React.FC<ConceptCardsTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Concept Cards</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Explore key concepts with our interactive concept cards.
      </p>
      
      {/* Implement concept cards content here */}
    </div>
  );
};

export default ConceptCardsTab;
