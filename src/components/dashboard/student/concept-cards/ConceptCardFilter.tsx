
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DateFilterType } from "@/types/user/base";
import { BookOpen, Filter } from 'lucide-react';

interface ConceptCardFilterProps {
  subjects: string[];
  onFilterChange: (filters: {
    dateFilter: DateFilterType;
    subject: string;
    difficulty: string;
    completed: boolean | null;
    learningStyle?: string;
  }) => void;
  learningStyles?: string[];
  userLearningStyle?: string[];
  className?: string;
}

const ConceptCardFilter: React.FC<ConceptCardFilterProps> = ({
  subjects,
  onFilterChange,
  learningStyles = [],
  userLearningStyle = [],
  className = ""
}) => {
  const [dateFilter, setDateFilter] = useState<DateFilterType>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [completedFilter, setCompletedFilter] = useState<boolean | null>(null);
  const [learningStyleFilter, setLearningStyleFilter] = useState<string>(userLearningStyle[0] || "all");
  const [showFilters, setShowFilters] = useState(false);
  
  const handleDateFilterChange = (value: string) => {
    const newDateFilter = value as DateFilterType;
    setDateFilter(newDateFilter);
    applyFilters(newDateFilter, subjectFilter, difficultyFilter, completedFilter, learningStyleFilter);
  };
  
  const handleSubjectFilterChange = (value: string) => {
    setSubjectFilter(value);
    applyFilters(dateFilter, value, difficultyFilter, completedFilter, learningStyleFilter);
  };
  
  const handleDifficultyFilterChange = (value: string) => {
    setDifficultyFilter(value);
    applyFilters(dateFilter, subjectFilter, value, completedFilter, learningStyleFilter);
  };
  
  const handleLearningStyleFilterChange = (value: string) => {
    setLearningStyleFilter(value);
    applyFilters(dateFilter, subjectFilter, difficultyFilter, completedFilter, value);
  };
  
  const handleCompletedFilterChange = (completed: boolean | null) => {
    setCompletedFilter(completed);
    applyFilters(dateFilter, subjectFilter, difficultyFilter, completed, learningStyleFilter);
  };
  
  const applyFilters = (
    dateFilter: DateFilterType,
    subject: string,
    difficulty: string,
    completed: boolean | null,
    learningStyle: string
  ) => {
    onFilterChange({
      dateFilter,
      subject,
      difficulty,
      completed,
      learningStyle
    });
  };
  
  const resetFilters = () => {
    setDateFilter("all");
    setSubjectFilter("all");
    setDifficultyFilter("all");
    setCompletedFilter(null);
    setLearningStyleFilter(userLearningStyle[0] || "all");
    applyFilters("all", "all", "all", null, userLearningStyle[0] || "all");
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Count active filters for badge
  const getActiveFilterCount = () => {
    let count = 0;
    if (dateFilter !== "all") count++;
    if (subjectFilter !== "all") count++;
    if (difficultyFilter !== "all") count++;
    if (completedFilter !== null) count++;
    if (learningStyleFilter !== "all" && learningStyleFilter !== userLearningStyle[0]) count++;
    return count;
  };
  
  // Get display name for learning style
  const getLearningStyleDisplay = (style: string) => {
    return style.charAt(0).toUpperCase() + style.slice(1) + " Learner";
  };
  
  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            <span>Filter Options</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFilters}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filters
            {getActiveFilterCount() > 0 && (
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Date filter tabs always visible */}
        <Tabs defaultValue={dateFilter} value={dateFilter} onValueChange={handleDateFilterChange} className="w-full">
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
            <div className="space-y-3">
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
              
              {learningStyles.length > 0 && (
                <div className="space-y-1">
                  <label className="text-sm font-medium">Learning Style</label>
                  <Select value={learningStyleFilter} onValueChange={handleLearningStyleFilterChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select learning style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Learning Styles</SelectItem>
                      {userLearningStyle.map(style => (
                        <SelectItem key={style} value={style} className="font-medium">
                          {getLearningStyleDisplay(style)} (Recommended)
                        </SelectItem>
                      ))}
                      {learningStyles
                        .filter(style => !userLearningStyle.includes(style))
                        .map(style => (
                          <SelectItem key={style} value={style}>
                            {getLearningStyleDisplay(style)}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
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
