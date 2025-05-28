
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    difficulty?: {
      value: string;
      options: FilterOption[];
      onChange: (value: string) => void;
    };
    topic?: {
      value: string;
      options: FilterOption[];
      onChange: (value: string) => void;
    };
    weightage?: {
      value: string;
      options: FilterOption[];
      onChange: (value: string) => void;
    };
    duration?: {
      value: string;
      options: FilterOption[];
      onChange: (value: string) => void;
    };
    activity?: {
      value: string;
      options: FilterOption[];
      onChange: (value: string) => void;
    };
  };
  onClearFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onClearFilters
}) => {
  const hasActiveFilters = Object.values(filters).some(filter => filter?.value && filter.value !== 'all');

  return (
    <div className="space-y-4 mb-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        {filters.difficulty && (
          <Select value={filters.difficulty.value} onValueChange={filters.difficulty.onChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {filters.difficulty.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filters.topic && (
          <Select value={filters.topic.value} onValueChange={filters.topic.onChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {filters.topic.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filters.weightage && (
          <Select value={filters.weightage.value} onValueChange={filters.weightage.onChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Weightage" />
            </SelectTrigger>
            <SelectContent>
              {filters.weightage.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filters.duration && (
          <Select value={filters.duration.value} onValueChange={filters.duration.onChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              {filters.duration.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filters.activity && (
          <Select value={filters.activity.value} onValueChange={filters.activity.onChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Recent Activity" />
            </SelectTrigger>
            <SelectContent>
              {filters.activity.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
