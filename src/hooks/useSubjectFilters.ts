
import { useState } from 'react';

export const useSubjectFilters = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
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
