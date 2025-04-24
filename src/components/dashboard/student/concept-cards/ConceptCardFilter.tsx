
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ConceptCardFilterProps {
  onFilterChange: (filters: ConceptCardFilters) => void;
  subjects: string[];
  className?: string;
}

export interface ConceptCardFilters {
  timeFrame: 'today' | 'week' | 'month' | 'all';
  difficulty: string[];
  subjects: string[];
  completed: boolean | null; // null = show all, true = show completed, false = show incomplete
}

const ConceptCardFilter: React.FC<ConceptCardFilterProps> = ({ 
  onFilterChange, 
  subjects, 
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<ConceptCardFilters>({
    timeFrame: 'today',
    difficulty: [],
    subjects: [],
    completed: null
  });
  
  const handleTimeFrameChange = (value: string) => {
    const newFilters = { ...filters, timeFrame: value as 'today' | 'week' | 'month' | 'all' };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleDifficultyToggle = (difficulty: string) => {
    const newDifficulties = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
      
    const newFilters = { ...filters, difficulty: newDifficulties };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSubjectToggle = (subject: string) => {
    const newSubjects = filters.subjects.includes(subject)
      ? filters.subjects.filter(s => s !== subject)
      : [...filters.subjects, subject];
      
    const newFilters = { ...filters, subjects: newSubjects };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleCompletedChange = (value: string) => {
    let completedValue: boolean | null;
    
    switch(value) {
      case 'all':
        completedValue = null;
        break;
      case 'completed':
        completedValue = true;
        break;
      case 'incomplete':
        completedValue = false;
        break;
      default:
        completedValue = null;
    }
    
    const newFilters = { ...filters, completed: completedValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const countActiveFilters = () => {
    let count = 0;
    if (filters.timeFrame !== 'all') count++;
    if (filters.difficulty.length > 0) count++;
    if (filters.subjects.length > 0) count++;
    if (filters.completed !== null) count++;
    return count;
  };
  
  const resetFilters = () => {
    const newFilters = {
      timeFrame: 'all',
      difficulty: [],
      subjects: [],
      completed: null
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Filter className="h-4 w-4" />
            Filters
            {countActiveFilters() > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {countActiveFilters()}
              </Badge>
            )}
          </Button>
          
          <div className="hidden md:flex gap-2">
            <Badge variant={filters.timeFrame === 'today' ? "default" : "outline"} className="cursor-pointer" onClick={() => handleTimeFrameChange('today')}>
              Today
            </Badge>
            <Badge variant={filters.timeFrame === 'week' ? "default" : "outline"} className="cursor-pointer" onClick={() => handleTimeFrameChange('week')}>
              This Week
            </Badge>
            <Badge variant={filters.timeFrame === 'month' ? "default" : "outline"} className="cursor-pointer" onClick={() => handleTimeFrameChange('month')}>
              This Month
            </Badge>
            <Badge variant={filters.timeFrame === 'all' ? "default" : "outline"} className="cursor-pointer" onClick={() => handleTimeFrameChange('all')}>
              All
            </Badge>
          </div>
        </div>
        
        {countActiveFilters() > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        )}
      </div>
      
      {isExpanded && (
        <Card className="mt-2">
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" /> Time Frame
              </h3>
              <RadioGroup defaultValue={filters.timeFrame} onValueChange={handleTimeFrameChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="today" id="timeframe-today" />
                  <Label htmlFor="timeframe-today">Today</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="week" id="timeframe-week" />
                  <Label htmlFor="timeframe-week">This Week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="month" id="timeframe-month" />
                  <Label htmlFor="timeframe-month">This Month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="timeframe-all" />
                  <Label htmlFor="timeframe-all">All Time</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Difficulty</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="difficulty-easy" 
                    checked={filters.difficulty.includes('easy')}
                    onCheckedChange={() => handleDifficultyToggle('easy')}
                  />
                  <Label htmlFor="difficulty-easy" className="flex items-center">
                    <Badge variant="outline" className="bg-green-100 text-green-800">Easy</Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="difficulty-medium" 
                    checked={filters.difficulty.includes('medium')}
                    onCheckedChange={() => handleDifficultyToggle('medium')}
                  />
                  <Label htmlFor="difficulty-medium" className="flex items-center">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">Medium</Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="difficulty-hard" 
                    checked={filters.difficulty.includes('hard')}
                    onCheckedChange={() => handleDifficultyToggle('hard')}
                  />
                  <Label htmlFor="difficulty-hard" className="flex items-center">
                    <Badge variant="outline" className="bg-rose-100 text-rose-800">Hard</Badge>
                  </Label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Status</h3>
              <RadioGroup 
                defaultValue={filters.completed === null ? 'all' : (filters.completed ? 'completed' : 'incomplete')}
                onValueChange={handleCompletedChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="status-all" />
                  <Label htmlFor="status-all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completed" id="status-completed" />
                  <Label htmlFor="status-completed">Completed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="incomplete" id="status-incomplete" />
                  <Label htmlFor="status-incomplete">Incomplete</Label>
                </div>
              </RadioGroup>
              
              <h3 className="font-medium mb-2 mt-4">Subjects</h3>
              <div className="space-y-2">
                {subjects.map(subject => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`subject-${subject.toLowerCase()}`} 
                      checked={filters.subjects.includes(subject)}
                      onCheckedChange={() => handleSubjectToggle(subject)}
                    />
                    <Label htmlFor={`subject-${subject.toLowerCase()}`}>{subject}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConceptCardFilter;
