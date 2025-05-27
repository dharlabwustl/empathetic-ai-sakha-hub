
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FlashcardOverviewSection from './FlashcardOverviewSection';

const FlashcardsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubjectTab, setActiveSubjectTab] = useState('all');

  const mockFlashcards = {
    physics: {
      all: [
        { id: 1, title: "Newton's Laws", status: "completed", difficulty: "medium" },
        { id: 2, title: "Wave Optics", status: "in-progress", difficulty: "hard" },
        { id: 3, title: "Thermodynamics", status: "pending", difficulty: "medium" }
      ],
      pending: [
        { id: 3, title: "Thermodynamics", status: "pending", difficulty: "medium" }
      ],
      inProgress: [
        { id: 2, title: "Wave Optics", status: "in-progress", difficulty: "hard" }
      ],
      completed: [
        { id: 1, title: "Newton's Laws", status: "completed", difficulty: "medium" }
      ]
    },
    chemistry: {
      all: [
        { id: 4, title: "Organic Chemistry", status: "completed", difficulty: "hard" },
        { id: 5, title: "Chemical Bonding", status: "in-progress", difficulty: "medium" }
      ],
      pending: [],
      inProgress: [
        { id: 5, title: "Chemical Bonding", status: "in-progress", difficulty: "medium" }
      ],
      completed: [
        { id: 4, title: "Organic Chemistry", status: "completed", difficulty: "hard" }
      ]
    },
    biology: {
      all: [
        { id: 6, title: "Cell Biology", status: "completed", difficulty: "easy" },
        { id: 7, title: "Genetics", status: "in-progress", difficulty: "hard" }
      ],
      pending: [],
      inProgress: [
        { id: 7, title: "Genetics", status: "in-progress", difficulty: "hard" }
      ],
      completed: [
        { id: 6, title: "Cell Biology", status: "completed", difficulty: "easy" }
      ]
    }
  };

  const renderFlashcardList = (flashcards: any[]) => {
    if (flashcards.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No flashcards found in this category.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((card) => (
          <div key={card.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-medium">{card.title}</h3>
            <div className="mt-2 flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-xs ${
                card.status === 'completed' ? 'bg-green-100 text-green-800' :
                card.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {card.status}
              </span>
              <span className={`px-2 py-1 rounded text-xs ${
                card.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {card.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSubjectContent = (subject: keyof typeof mockFlashcards) => {
    return (
      <Tabs value={activeSubjectTab} onValueChange={setActiveSubjectTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderFlashcardList(mockFlashcards[subject].all)}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {renderFlashcardList(mockFlashcards[subject].pending)}
        </TabsContent>

        <TabsContent value="inProgress" className="mt-6">
          {renderFlashcardList(mockFlashcards[subject].inProgress)}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {renderFlashcardList(mockFlashcards[subject].completed)}
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <FlashcardOverviewSection />
        </TabsContent>

        <TabsContent value="physics">
          {renderSubjectContent('physics')}
        </TabsContent>

        <TabsContent value="chemistry">
          {renderSubjectContent('chemistry')}
        </TabsContent>

        <TabsContent value="biology">
          {renderSubjectContent('biology')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsSection;
