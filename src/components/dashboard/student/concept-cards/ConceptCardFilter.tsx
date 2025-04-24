
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DateFilterType } from "@/types/user/base";
import { BookOpen, Calendar, Filter } from 'lucide-react';

interface ConceptCardFilterProps {
  subjects: string[];
  onFilterChange: (filters: {
    dateFilter: DateFilterType;
    subject: string;
    difficulty: string;
    completed: boolean | null;
  }) => void;
  className?: string;
}

const ConceptCardFilter: React.FC<ConceptCardFilterProps> = ({
  subjects,
  onFilterChange,
  className = ""
}) => {
  const [dateFilter, setDateFilter] = useState<DateFilterType>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [completedFilter, setCompletedFilter] = useState<boolean | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleDateFilterChange = (value: string) => {
    const newDateFilter = value as DateFilterType;
    setDateFilter(newDateFilter);
    applyFilters(newDateFilter, subjectFilter, difficultyFilter, completedFilter);
  };
  
  const handleSubjectFilterChange = (value: string) => {
    setSubjectFilter(value);
    applyFilters(dateFilter, value, difficultyFilter, completedFilter);
  };
  
  const handleDifficultyFilterChange = (value: string) => {
    setDifficultyFilter(value);
    applyFilters(dateFilter, subjectFilter, value, completedFilter);
  };
  
  const handleCompletedFilterChange = (completed: boolean | null) => {
    setCompletedFilter(completed);
    applyFilters(dateFilter, subjectFilter, difficultyFilter, completed);
  };
  
  const applyFilters = (
    dateFilter: DateFilterType,
    subject: string,
    difficulty: string,
    completed: boolean | null
  ) => {
    onFilterChange({
      dateFilter,
      subject,
      difficulty,
      completed
    });
  };
  
  const resetFilters = () => {
    setDateFilter("all");
    setSubjectFilter("all");
    setDifficultyFilter("all");
    setCompletedFilter(null);
    applyFilters("all", "all", "all", null);
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            <span>Concept Cards</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFilters}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filters
            {(dateFilter !== "all" || subjectFilter !== "all" || 
              difficultyFilter !== "all" || completedFilter !== null) && (
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                {[
                  dateFilter !== "all" ? 1 : 0,
                  subjectFilter !== "all" ? 1 : 0,
                  difficultyFilter !== "all" ? 1 : 0,
                  completedFilter !== null ? 1 : 0
                ].reduce((sum, val) => sum + val, 0)}
              </Badge>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Date filter tabs always visible */}
        <Tabs defaultValue="all" value={dateFilter} onValueChange={handleDateFilterChange} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="today" className="text-xs sm:text-sm">Today</TabsTrigger>
            <TabsTrigger value="week" className="text-xs sm:text-sm">This Week</TabsTrigger>
            <TabsTrigger value="month" className="text-xs sm:text-sm">This Month</TabsTrigger>
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Additional filters */}
        {showFilters && (
          <div className="space-y-3 pt-2 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Subject</label>
                <Select value={subjectFilter} onValueChange={handleSubjectFilterChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={difficultyFilter} onValueChange={handleDifficultyFilterChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant={completedFilter === true ? "default" : "outline"} 
                onClick={() => handleCompletedFilterChange(completedFilter === true ? null : true)}
              >
                Completed
              </Button>
              <Button 
                size="sm" 
                variant={completedFilter === false ? "default" : "outline"}
                onClick={() => handleCompletedFilterChange(completedFilter === false ? null : false)} 
              >
                Not Completed
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={resetFilters}
                className="ml-auto"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptCardFilter;
