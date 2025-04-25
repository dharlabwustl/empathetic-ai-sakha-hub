
import React from 'react';
import { Check, Clock, Search, Tag, BookOpen, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ConceptCardType {
  id: string;
  title: string;
  description: string;
  subject: string;
  scheduledFor?: string;
  completed?: boolean;
  progress: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeEstimate: number;
  examGoal?: string;
  tags?: string[];
}

interface EnhancedConceptFiltersProps {
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  completionStatus: string;
  setCompletionStatus: (status: string) => void;
  selectedTimeRange: number | null;
  setSelectedTimeRange: (time: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  conceptCards: ConceptCardType[];
  clearFilters: () => void;
  activeFiltersCount: number;
}

const EnhancedConceptFilters = ({
  selectedSubject,
  setSelectedSubject,
  selectedDifficulty,
  setSelectedDifficulty,
  completionStatus,
  setCompletionStatus,
  selectedTimeRange,
  setSelectedTimeRange,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  conceptCards,
  clearFilters,
  activeFiltersCount
}: EnhancedConceptFiltersProps) => {
  const subjects = [...new Set(conceptCards.map(card => card.subject))];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const completionStatuses = [
    { id: 'all', label: 'All' },
    { id: 'not-started', label: 'Not Started' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' }
  ];
  const timeRanges = [
    { id: null, label: 'Any Time' },
    { id: 15, label: '< 15 min' },
    { id: 30, label: '< 30 min' },
    { id: 45, label: '< 45 min' },
    { id: 60, label: '< 60 min' }
  ];
  const sortOptions = [
    { id: 'newest', label: 'Newest' },
    { id: 'relevant', label: 'Most Relevant' },
    { id: 'study-plan', label: 'Based on Study Plan' },
    { id: 'difficulty-asc', label: 'Difficulty (Low to High)' },
    { id: 'difficulty-desc', label: 'Difficulty (High to Low)' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h3 className="font-medium">Filters</h3>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFiltersCount} active
          </Badge>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters} 
          className="ml-auto text-xs h-8"
          disabled={activeFiltersCount === 0}
        >
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        {/* Subject Filter */}
        <Select
          value={selectedSubject}
          onValueChange={setSelectedSubject}
        >
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <SelectValue placeholder="Subject" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Subjects</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Difficulty Filter */}
        <Select
          value={selectedDifficulty}
          onValueChange={setSelectedDifficulty}
        >
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <SelectValue placeholder="Difficulty" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Difficulty</SelectItem>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Completion Status */}
        <Select
          value={completionStatus}
          onValueChange={setCompletionStatus}
        >
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <SelectValue placeholder="Completion Status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {completionStatuses.map(status => (
              <SelectItem key={status.id} value={status.id}>{status.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Time Estimate */}
        <Select
          value={selectedTimeRange?.toString() || ''}
          onValueChange={(value) => setSelectedTimeRange(value ? Number(value) : null)}
        >
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <SelectValue placeholder="Time Estimate" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map(range => (
              <SelectItem key={range.label} value={range.id?.toString() || ''}>{range.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select
          value={sortOption}
          onValueChange={setSortOption}
        >
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <SelectValue placeholder="Sort By" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EnhancedConceptFilters;
