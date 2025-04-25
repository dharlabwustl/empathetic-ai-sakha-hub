
import React from 'react';
import ConceptCardView from '@/components/dashboard/student/concept-cards/ConceptCardView';

export const MicroConceptView = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Concept Cards</h2>
      <p className="text-gray-500">
        Understand concepts deeply with comprehensive explanations and examples.
      </p>
      
      <ConceptCardView 
        title="Newton's Laws of Motion" 
        subject="Physics" 
        chapter="Laws of Motion" 
      />
    </div>
  );
};

export const FlashcardsView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Flashcards</h2>
      <p className="text-gray-600 mb-4">
        Study and memorize key concepts with interactive flashcards.
      </p>
      
      {/* Flashcards content would go here */}
      <div className="p-8 text-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a flashcard deck to begin studying.</p>
      </div>
    </div>
  );
};

export const PracticeExamsView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Practice Exams</h2>
      <p className="text-gray-600 mb-4">
        Test your knowledge with practice exams and quizzes.
      </p>
      
      {/* Practice exams content would go here */}
      <div className="p-8 text-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a practice exam to begin testing.</p>
      </div>
    </div>
  );
};
