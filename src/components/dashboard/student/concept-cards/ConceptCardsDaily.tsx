
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import ConceptCardGrid from './ConceptCardGrid';
import { ConceptCardItem } from '@/types/user/base';
import { formatDate } from '@/utils/dateUtils';

const mockDailyConcepts: ConceptCardItem[] = [
  {
    id: "concept1",
    title: "Linear Equations Explained",
    description: "Master the fundamentals of solving linear equations with step-by-step techniques.",
    subject: "Math",
    topic: "Algebra",
    difficulty: "medium",
    priority: "high",
    status: "in-progress",
    timeAllocation: 15,
    hasAudioNarration: true,
    progress: 40
  },
  {
    id: "concept2",
    title: "Photosynthesis Process",
    description: "Understand how plants convert light energy into chemical energy through photosynthesis.",
    subject: "Science",
    topic: "Biology",
    difficulty: "easy",
    priority: "medium",
    status: "completed",
    timeAllocation: 10,
    hasNotes: true,
    isBookmarked: true,
    progress: 100
  },
  {
    id: "concept3",
    title: "1857 Revolt Deep Dive",
    description: "Analyze the causes, events and impact of the 1857 Revolt against British rule in India.",
    subject: "History",
    topic: "Indian Freedom",
    difficulty: "hard",
    priority: "medium",
    status: "pending",
    timeAllocation: 20
  },
  {
    id: "concept4",
    title: "Chemical Bonding Types",
    description: "Learn about different types of chemical bonds and their formation processes.",
    subject: "Chemistry",
    topic: "Bonding",
    difficulty: "medium",
    priority: "high",
    status: "pending",
    timeAllocation: 15,
    hasAudioNarration: true
  }
];

const ConceptCardsDaily: React.FC = () => {
  const today = new Date();
  const formattedDate = formatDate(today);
  
  return (
    <div className="animate-in fade-in-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-4 w-4 text-indigo-600" />
          <span>Today's Concepts – {formattedDate}</span>
        </h3>
        <Button variant="outline" size="sm" className="text-xs">
          View All <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Topic</th>
              <th className="px-4 py-2 text-left">Concept Title</th>
              <th className="px-4 py-2 text-left">Difficulty</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockDailyConcepts.map((concept) => (
              <tr 
                key={concept.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer"
              >
                <td className="px-4 py-2">{concept.subject}</td>
                <td className="px-4 py-2">{concept.topic}</td>
                <td className="px-4 py-2 font-medium">{concept.title}</td>
                <td className="px-4 py-2">
                  <span className={`
                    inline-block px-2 py-1 rounded-full text-xs
                    ${concept.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : ''}
                    ${concept.difficulty === 'medium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' : ''}
                    ${concept.difficulty === 'hard' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' : ''}
                    ${concept.difficulty === 'advanced' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' : ''}
                  `}>
                    {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2">{concept.timeAllocation} mins</td>
                <td className="px-4 py-2">
                  <span className="inline-flex items-center">
                    {concept.status === 'completed' ? (
                      <span className="text-green-500">✅</span>
                    ) : concept.status === 'in-progress' ? (
                      <span className="text-yellow-500">🟡</span>
                    ) : (
                      <span className="text-gray-400">⏳</span>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <ConceptCardGrid concepts={mockDailyConcepts.slice(0, 2)} />
    </div>
  );
};

export default ConceptCardsDaily;
