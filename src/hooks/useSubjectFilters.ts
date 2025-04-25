
import { useState } from 'react';

export interface FilterOptions {
  subject: string;
  difficulty: string;
  searchQuery: string;
  examGoal?: string;
  topicTag?: string;
  estimatedTime?: number;
}

export const useSubjectFilters = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamGoal, setSelectedExamGoal] = useState<string>('');
  const [selectedTopicTag, setSelectedTopicTag] = useState<string>('');
  const [selectedTimeRange, setSelectedTimeRange] = useState<number | null>(null);

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedDifficulty('');
    setSearchQuery('');
    setSelectedExamGoal('');
    setSelectedTopicTag('');
    setSelectedTimeRange(null);
  };

  return {
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    searchQuery,
    setSearchQuery,
    selectedExamGoal,
    setSelectedExamGoal,
    selectedTopicTag,
    setSelectedTopicTag,
    selectedTimeRange,
    setSelectedTimeRange,
    clearFilters
  };
};
