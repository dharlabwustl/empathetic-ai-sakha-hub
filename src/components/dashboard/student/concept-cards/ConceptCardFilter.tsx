
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, CheckSquare } from 'lucide-react';

export type TimeFrameType = "today" | "week" | "month" | "all";
export type DifficultyType = "easy" | "medium" | "hard";

export interface ConceptCardFilters {
  timeFrame: TimeFrameType;
  difficulty: DifficultyType[];
  subjects: string[];
  completed: boolean | null;
}

interface ConceptCardFilterProps {
  onFilterChange: (filters: ConceptCardFilters) => void;
  subjects: string[];
  className?: string;
}

const ConceptCardFilter: React.FC<ConceptCardFilterProps> = ({ 
  onFilterChange, 
  subjects,
  className = "" 
}) => {
  const [filters, setFilters] = useState<ConceptCardFilters>({
    timeFrame: "today",
    difficulty: [],
    subjects: [],
    completed: null
  });
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const handleTimeFrameChange = (value: string) => {
    const newFilters = {
      ...filters,
      timeFrame: value as TimeFrameType
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleDifficultyChange = (difficulty: DifficultyType, checked: boolean) => {
    let newDifficulties = [...filters.difficulty];
    
    if (checked) {
      newDifficulties.push(difficulty);
    } else {
      newDifficulties = newDifficulties.filter(d => d !== difficulty);
    }
    
    const newFilters = {
      ...filters,
      difficulty: newDifficulties
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSubjectChange = (subject: string, checked: boolean) => {
    let newSubjects = [...filters.subjects];
    
    if (checked) {
      newSubjects.push(subject);
    } else {
      newSubjects = newSubjects.filter(s => s !== subject);
    }
    
    const newFilters = {
      ...filters,
      subjects: newSubjects
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleCompletionChange = (status: boolean | null) => {
    const newFilters = {
      ...filters,
      completed: status
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const resetFilters = () => {
    const defaultFilters: ConceptCardFilters = {
      timeFrame: "today",
      difficulty: [],
      subjects: [],
      completed: null
    };
    
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-500" />
          <Select 
            value={filters.timeFrame} 
            onValueChange={handleTimeFrameChange}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Time Frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter className="h-4 w-4" />
            Filters
            {(filters.difficulty.length > 0 || filters.subjects.length > 0 || filters.completed !== null) && (
              <span className="ml-1 w-5 h-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center">
                {filters.difficulty.length + filters.subjects.length + (filters.completed !== null ? 1 : 0)}
              </span>
            )}
          </Button>
          
          {(filters.difficulty.length > 0 || filters.subjects.length > 0 || filters.completed !== null) && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={resetFilters}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
      
      {isFiltersOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          {/* Difficulty filters */}
          <div>
            <h3 className="font-medium mb-2">Difficulty</h3>
            <div className="space-y-2">
              {["easy", "medium", "hard"].map((difficulty) => (
                <div key={difficulty} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`difficulty-${difficulty}`} 
                    checked={filters.difficulty.includes(difficulty as DifficultyType)}
                    onCheckedChange={(checked) => 
                      handleDifficultyChange(difficulty as DifficultyType, checked === true)
                    }
                  />
                  <Label htmlFor={`difficulty-${difficulty}`}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Subject filters */}
          <div>
            <h3 className="font-medium mb-2">Subjects</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`subject-${subject}`} 
                    checked={filters.subjects.includes(subject)}
                    onCheckedChange={(checked) => 
                      handleSubjectChange(subject, checked === true)
                    }
                  />
                  <Label htmlFor={`subject-${subject}`}>{subject}</Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Completion status */}
          <div>
            <h3 className="font-medium mb-2">Status</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="status-completed" 
                  checked={filters.completed === true}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleCompletionChange(true);
                    } else if (filters.completed === true) {
                      handleCompletionChange(null);
                    }
                  }}
                />
                <Label htmlFor="status-completed">Completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="status-pending" 
                  checked={filters.completed === false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleCompletionChange(false);
                    } else if (filters.completed === false) {
                      handleCompletionChange(null);
                    }
                  }}
                />
                <Label htmlFor="status-pending">Pending</Label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptCardFilter;
