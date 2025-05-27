
import React from 'react';
import NewTodaysPlanView from './NewTodaysPlanView';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanContentProps {
  userName?: string;
}

// Mock data for today's plan
const mockTodaysPlanData: TodaysPlanData = {
  streak: 7,
  timeAllocation: {
    concepts: 90,
    flashcards: 60,
    practiceExams: 45,
    total: 195
  },
  concepts: [
    {
      id: '1',
      title: 'Laws of Motion',
      subject: 'Physics',
      duration: 30,
      difficulty: 'Medium',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Thermodynamics',
      subject: 'Physics',
      duration: 35,
      difficulty: 'Hard',
      status: 'pending'
    }
  ],
  flashcards: [
    {
      id: '1',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      duration: 25,
      difficulty: 'Hard',
      status: 'pending'
    }
  ],
  practiceExams: [
    {
      id: '1',
      title: 'Biology Mock Test',
      subject: 'Biology',
      duration: 45,
      difficulty: 'Medium',
      status: 'pending'
    }
  ],
  smartSuggestions: [
    {
      id: '1',
      title: 'Focus on Physics',
      description: 'Complete high-priority Physics concepts to boost understanding'
    },
    {
      id: '2',
      title: 'Review Chemistry',
      description: 'Practice organic chemistry reactions for better retention'
    }
  ],
  tomorrowPreview: {
    totalTasks: 8,
    concepts: 3,
    flashcards: 3,
    practiceExams: 2
  }
};

const TodaysPlanContent: React.FC<TodaysPlanContentProps> = ({ userName }) => {
  const handleConceptClick = (conceptId: string) => {
    console.log('Concept clicked:', conceptId);
    // Navigate to concept detail page
  };

  return (
    <NewTodaysPlanView 
      planData={mockTodaysPlanData}
      onConceptClick={handleConceptClick}
      userName={userName}
    />
  );
};

export default TodaysPlanContent;
