
import { useState } from 'react';

export const useSubjectFilters = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedDifficulty('');
    setSearchQuery('');
  };

  return {
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    searchQuery,
    setSearchQuery,
    clearFilters
  };
};
