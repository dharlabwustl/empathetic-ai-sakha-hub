
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, SlidersHorizontal, X, Clock, Tag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConceptCard } from '@/hooks/useUserStudyPlan';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

// Extend ConceptCard type if needed
type ExtendedConceptCard = ConceptCard & {
  tags?: string[];
  estimatedTime?: number;
  examGoal?: string;
};

interface ConceptFiltersProps {
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedExamGoal?: string;
  setSelectedExamGoal: (value: string) => void;
  selectedTopicTag?: string;
  setSelectedTopicTag: (value: string) => void;
  selectedTimeRange?: number | null;
  setSelectedTimeRange: (value: number | null) => void;
  clearFilters: () => void;
  conceptCards: ConceptCard[];
}

const ConceptFilters: React.FC<ConceptFiltersProps> = ({
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
  clearFilters,
  conceptCards
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Type assertion to support the expected properties
  const typedCards = conceptCards as ExtendedConceptCard[];

  // Extract unique values for filters
  const subjects = [...new Set(conceptCards.map(card => card.subject))];
  const difficulties = [...new Set(conceptCards.map(card => card.difficulty))];
  const examGoals = [...new Set(typedCards.filter(card => card.examGoal).map(card => card.examGoal as string))];
  
  // Get all tags from all cards, flatten, and get unique values
  const allTags = [...new Set(
    typedCards
      .filter(card => card.tags)
      .flatMap(card => card.tags as string[])
  )];

  // Get max time range from cards
  const maxTimeRange = Math.max(...typedCards.filter(card => card.estimatedTime).map(card => card.estimatedTime || 0));

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(prev => !prev);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Search input */}
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            className="pl-8"
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setSearchQuery('')}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Quick filters dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter size={18} />
              Subject
              {selectedSubject && <Badge variant="secondary" className="ml-1">{selectedSubject}</Badge>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                className={!selectedSubject ? "bg-gray-100" : ""} 
                onClick={() => setSelectedSubject("")}
              >
                All Subjects
              </DropdownMenuItem>
              {subjects.map((subject) => (
                <DropdownMenuItem 
                  key={subject} 
                  className={selectedSubject === subject ? "bg-gray-100" : ""} 
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <SlidersHorizontal size={18} />
              Difficulty
              {selectedDifficulty && <Badge variant="secondary" className="ml-1">{selectedDifficulty}</Badge>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                className={!selectedDifficulty ? "bg-gray-100" : ""} 
                onClick={() => setSelectedDifficulty("")}
              >
                All Difficulties
              </DropdownMenuItem>
              {difficulties.map((difficulty) => (
                <DropdownMenuItem 
                  key={difficulty} 
                  className={selectedDifficulty === difficulty ? "bg-gray-100" : ""} 
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Advanced filters toggle */}
        <Button variant={showAdvancedFilters ? "default" : "outline"} onClick={toggleAdvancedFilters}>
          {showAdvancedFilters ? "Hide Advanced" : "Advanced Filters"}
        </Button>

        {/* Clear filters button */}
        {(selectedSubject || selectedDifficulty || searchQuery || selectedExamGoal || selectedTopicTag || selectedTimeRange) && (
          <Button variant="outline" className="flex items-center gap-1" onClick={handleClearFilters}>
            <X size={18} />
            Clear
          </Button>
        )}
      </div>

      {/* Advanced filters section */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md">
          {/* Exam Goal filter */}
          <div>
            <h4 className="text-sm font-medium mb-2">Exam Goal</h4>
            <div className="space-y-1">
              <div
                className={`px-3 py-1.5 rounded-md cursor-pointer ${!selectedExamGoal ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                onClick={() => setSelectedExamGoal('')}
              >
                All Goals
              </div>
              {examGoals.map((goal) => (
                <div
                  key={goal}
                  className={`px-3 py-1.5 rounded-md cursor-pointer ${selectedExamGoal === goal ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                  onClick={() => setSelectedExamGoal(goal)}
                >
                  {goal}
                </div>
              ))}
            </div>
          </div>

          {/* Topic Tags filter */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Tag size={14} className="mr-1" />
              Topic Tags
            </h4>
            <div className="flex flex-wrap gap-1">
              {allTags.map((tag) => (
                <Badge 
                  key={tag}
                  variant={selectedTopicTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTopicTag(selectedTopicTag === tag ? '' : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Time Range filter */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Clock size={14} className="mr-1" />
              Time (minutes)
            </h4>
            <div className="px-2">
              <Slider 
                defaultValue={[maxTimeRange]}
                max={maxTimeRange} 
                step={5}
                onValueChange={(values) => setSelectedTimeRange(values[0])}
                value={selectedTimeRange ? [selectedTimeRange] : [maxTimeRange]}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 min</span>
                <span>{selectedTimeRange || maxTimeRange} min or less</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptFilters;
