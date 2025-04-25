
import { useState } from 'react';

export const useSubjectFilters = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedExamGoal, setSelectedExamGoal] = useState<string>('');
  const [selectedTopicTag, setSelectedTopicTag] = useState<string>('');
  const [selectedTimeRange, setSelectedTimeRange] = useState<number | null>(null);
  const [completionStatus, setCompletionStatus] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('newest');

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedDifficulty('');
    setSearchQuery('');
    setSelectedExamGoal('');
    setSelectedTopicTag('');
    setSelectedTimeRange(null);
    setCompletionStatus('all');
    setSortOption('newest');
  };
  
  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedSubject) count++;
    if (selectedDifficulty) count++;
    if (searchQuery) count++;
    if (selectedExamGoal) count++;
    if (selectedTopicTag) count++;
    if (selectedTimeRange) count++;
    if (completionStatus && completionStatus !== 'all') count++;
    return count;
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
    completionStatus,
    setCompletionStatus,
    sortOption,
    setSortOption,
    clearFilters,
    activeFiltersCount: getActiveFiltersCount()
  };
};
