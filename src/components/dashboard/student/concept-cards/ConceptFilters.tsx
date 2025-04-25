
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Clock, Tag, BookOpen, GraduationCap } from 'lucide-react';
import { ConceptCard } from '@/hooks/useUserStudyPlan';
import { Badge } from '@/components/ui/badge';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ConceptFiltersProps {
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  clearFilters: () => void;
  conceptCards: ConceptCard[];
  selectedExamGoal?: string;
  setSelectedExamGoal?: (value: string) => void;
  selectedTopicTag?: string;
  setSelectedTopicTag?: (value: string) => void;
  selectedTimeRange?: number | null;
  setSelectedTimeRange?: (value: number | null) => void;
}

const ConceptFilters: React.FC<ConceptFiltersProps> = ({
  selectedSubject,
  setSelectedSubject,
  selectedDifficulty,
  setSelectedDifficulty,
  searchQuery,
  setSearchQuery,
  clearFilters,
  conceptCards,
  selectedExamGoal,
  setSelectedExamGoal,
  selectedTopicTag,
  setSelectedTopicTag,
  selectedTimeRange,
  setSelectedTimeRange
}) => {
  const { userProfile } = useUserProfile();
  const subjects = [...new Set(conceptCards.map(card => card.subject))];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  
  // Extract all unique tags from concept cards
  const allTags = conceptCards
    .flatMap(card => card.tags || [])
    .filter((tag, i, arr) => arr.indexOf(tag) === i);
  
  // Get available exam goals
  const examGoals = userProfile?.goals?.map(goal => goal.title) || [];
  
  // Time range options
  const timeRanges = [15, 30, 45, 60, 90, 120];

  return (
    <div className="space-y-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Search concepts, subjects or chapters..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-blue-500" />
              <SelectValue placeholder="Subject" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-orange-500" />
              <SelectValue placeholder="Difficulty" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Difficulties</SelectItem>
            {difficulties.map((diff) => (
              <SelectItem key={diff} value={diff}>{diff}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {setSelectedExamGoal && (
          <Select value={selectedExamGoal} onValueChange={setSelectedExamGoal}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-purple-500" />
                <SelectValue placeholder="Exam Goal" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Exam Goals</SelectItem>
              {examGoals.map((goal) => (
                <SelectItem key={goal} value={goal}>{goal}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {setSelectedTopicTag && allTags.length > 0 && (
          <Select value={selectedTopicTag} onValueChange={setSelectedTopicTag}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-green-500" />
                <SelectValue placeholder="Topic Tag" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Tags</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {setSelectedTimeRange && (
          <Select 
            value={selectedTimeRange?.toString() || ''} 
            onValueChange={(val) => setSelectedTimeRange(val ? parseInt(val) : null)}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-pink-500" />
                <SelectValue placeholder="Time (mins)" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Duration</SelectItem>
              {timeRanges.map((time) => (
                <SelectItem key={time} value={time.toString()}>≤ {time} mins</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      {/* Active filters display */}
      <div className="flex flex-wrap gap-2">
        {selectedSubject && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Subject: {selectedSubject}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-4 w-4 p-0 ml-1" 
              onClick={() => setSelectedSubject('')}
            >
              ✕
            </Button>
          </Badge>
        )}
        
        {selectedDifficulty && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Difficulty: {selectedDifficulty}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-4 w-4 p-0 ml-1" 
              onClick={() => setSelectedDifficulty('')}
            >
              ✕
            </Button>
          </Badge>
        )}
        
        {selectedExamGoal && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Exam: {selectedExamGoal}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-4 w-4 p-0 ml-1" 
              onClick={() => setSelectedExamGoal?.('')}
            >
              ✕
            </Button>
          </Badge>
        )}
        
        {selectedTopicTag && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Tag: {selectedTopicTag}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-4 w-4 p-0 ml-1" 
              onClick={() => setSelectedTopicTag?.('')}
            >
              ✕
            </Button>
          </Badge>
        )}
        
        {selectedTimeRange && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Time: ≤ {selectedTimeRange} mins
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-4 w-4 p-0 ml-1" 
              onClick={() => setSelectedTimeRange?.(null)}
            >
              ✕
            </Button>
          </Badge>
        )}
        
        {(selectedSubject || selectedDifficulty || searchQuery || selectedExamGoal || selectedTopicTag || selectedTimeRange) && (
          <Button 
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConceptFilters;
