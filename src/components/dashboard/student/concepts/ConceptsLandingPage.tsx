
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, BookOpen, Clock, CheckCircle, LucideBarChart, AlertTriangle } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import EnhancedConceptCard, { ConceptCardProps } from './EnhancedConceptCard';

// Mock data for subjects
const subjects = [
  { id: 'all', name: 'All Subjects' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'mathematics', name: 'Mathematics' }
];

// Mock data for difficulty levels
const difficultyLevels = [
  { id: 'all', name: 'All Difficulties' },
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
  { id: 'advanced', name: 'Advanced' }
];

// Mock data for progress filters
const progressFilters = [
  { id: 'all', name: 'All Progress' },
  { id: 'not-started', name: 'Not Started (0%)' },
  { id: 'in-progress', name: 'In Progress (1-99%)' },
  { id: 'completed', name: 'Completed (100%)' }
];

// Mock data for importance filters
const importanceFilters = [
  { id: 'all', name: 'All Importance' },
  { id: 'high', name: 'High Importance' },
  { id: 'medium', name: 'Medium Importance' },
  { id: 'low', name: 'Low Importance' }
];

// Mock data for tags
const tags = [
  'Electromagnetism', 'Organic Chemistry', 'Thermodynamics', 'Mechanics', 
  'Calculus', 'Algebra', 'Genetics', 'Cell Biology', 'Human Physiology',
  'Chemical Bonding', 'Quantum Mechanics', 'Statistics', 'Probability'
];

// Generate mock concept cards
const generateMockConcepts = (count: number): ConceptCardProps[] => {
  const concepts: ConceptCardProps[] = [];
  
  const subjectItems = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
  const chapters = {
    'Physics': ['Mechanics', 'Electromagnetism', 'Thermodynamics', 'Optics', 'Modern Physics'],
    'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
    'Biology': ['Cell Biology', 'Genetics', 'Human Physiology', 'Ecology', 'Molecular Biology'],
    'Mathematics': ['Calculus', 'Algebra', 'Geometry', 'Statistics', 'Trigonometry']
  };
  const difficulties = ['easy', 'medium', 'hard', 'advanced'] as const;
  const importances = ['high', 'medium', 'low'] as const;
  
  for (let i = 1; i <= count; i++) {
    const subjectIndex = Math.floor(Math.random() * subjectItems.length);
    const subject = subjectItems[subjectIndex];
    const chapterIndex = Math.floor(Math.random() * chapters[subject as keyof typeof chapters].length);
    const chapter = chapters[subject as keyof typeof chapters][chapterIndex];
    
    // Generate 2-5 random tags
    const numTags = Math.floor(Math.random() * 4) + 2;
    const conceptTags = [];
    for (let j = 0; j < numTags; j++) {
      const tagIndex = Math.floor(Math.random() * tags.length);
      if (!conceptTags.includes(tags[tagIndex])) {
        conceptTags.push(tags[tagIndex]);
      }
    }
    
    const progress = Math.floor(Math.random() * 101); // 0-100
    const lastStudied = progress > 0 ? `${Math.floor(Math.random() * 14) + 1} days ago` : undefined;
    
    concepts.push({
      id: `concept-${i}`,
      title: `${chapter} Concept ${i}`,
      subject,
      chapter,
      description: `This is a detailed explanation of the ${chapter} concept in ${subject}. It covers fundamental principles and practical applications.`,
      difficultyLevel: difficulties[Math.floor(Math.random() * difficulties.length)],
      tags: conceptTags,
      progress,
      hasFormula: Math.random() > 0.3,
      hasVideo: Math.random() > 0.4,
      has3DModel: Math.random() > 0.6,
      totalExamples: Math.floor(Math.random() * 10) + 1,
      examMistakes: Math.floor(Math.random() * 6),
      lastStudied,
      importance: importances[Math.floor(Math.random() * importances.length)]
    });
  }
  
  return concepts;
};

const mockConcepts = generateMockConcepts(24);

const ConceptsLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedProgress, setSelectedProgress] = useState('all');
  const [selectedImportance, setSelectedImportance] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [concepts, setConcepts] = useState<ConceptCardProps[]>([]);
  
  useEffect(() => {
    // Simulate loading concepts from API
    const loadConcepts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        setConcepts(mockConcepts);
      } finally {
        setLoading(false);
      }
    };
    
    loadConcepts();
  }, []);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Filter concepts based on selected filters
  const filteredConcepts = concepts.filter(concept => {
    // Search query filter
    if (searchQuery && !concept.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !concept.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Subject filter
    if (selectedSubject !== 'all' && concept.subject.toLowerCase() !== selectedSubject) {
      return false;
    }
    
    // Difficulty filter
    if (selectedDifficulty !== 'all' && concept.difficultyLevel !== selectedDifficulty) {
      return false;
    }
    
    // Progress filter
    if (selectedProgress !== 'all') {
      if (selectedProgress === 'not-started' && concept.progress > 0) {
        return false;
      } else if (selectedProgress === 'in-progress' && (concept.progress === 0 || concept.progress === 100)) {
        return false;
      } else if (selectedProgress === 'completed' && concept.progress !== 100) {
        return false;
      }
    }
    
    // Importance filter
    if (selectedImportance !== 'all' && concept.importance !== selectedImportance) {
      return false;
    }
    
    // Tags filter
    if (selectedTags.length > 0 && !selectedTags.some(tag => concept.tags.includes(tag))) {
      return false;
    }
    
    return true;
  });
  
  // Calculate statistics for each tab
  const completedCount = concepts.filter(c => c.progress === 100).length;
  const inProgressCount = concepts.filter(c => c.progress > 0 && c.progress < 100).length;
  const notStartedCount = concepts.filter(c => c.progress === 0).length;
  const highImportanceCount = concepts.filter(c => c.importance === 'high').length;
  
  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts with interactive learning cards"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Search and filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyLevels.map(level => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-2" onClick={() => {
                setSelectedSubject('all');
                setSelectedDifficulty('all');
                setSelectedProgress('all');
                setSelectedImportance('all');
                setSelectedTags([]);
                setSearchQuery('');
              }}>
                <Filter className="h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
          
          {/* Additional filters */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Select value={selectedProgress} onValueChange={setSelectedProgress}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Progress" />
                </SelectTrigger>
                <SelectContent>
                  {progressFilters.map(filter => (
                    <SelectItem key={filter.id} value={filter.id}>
                      {filter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedImportance} onValueChange={setSelectedImportance}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Importance" />
                </SelectTrigger>
                <SelectContent>
                  {importanceFilters.map(filter => (
                    <SelectItem key={filter.id} value={filter.id}>
                      {filter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Tag filters */}
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 10).map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 10 && (
                <Badge variant="outline" className="cursor-pointer">
                  +{tags.length - 10} more
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>All Concepts</span>
              <Badge variant="secondary" className="ml-1">{concepts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>In Progress</span>
              <Badge variant="secondary" className="ml-1">{inProgressCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
              <Badge variant="secondary" className="ml-1">{completedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="not-started" className="flex items-center gap-2">
              <LucideBarChart className="h-4 w-4" />
              <span>Not Started</span>
              <Badge variant="secondary" className="ml-1">{notStartedCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="high-importance" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>High Importance</span>
              <Badge variant="secondary" className="ml-1">{highImportanceCount}</Badge>
            </TabsTrigger>
          </TabsList>
          
          {/* Tab content */}
          <TabsContent value="all">
            <div className="pb-4">
              <RenderConceptCards 
                concepts={filteredConcepts} 
                loading={loading} 
                viewMode={viewMode}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress">
            <div className="pb-4">
              <RenderConceptCards 
                concepts={filteredConcepts.filter(c => c.progress > 0 && c.progress < 100)} 
                loading={loading} 
                viewMode={viewMode}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="pb-4">
              <RenderConceptCards 
                concepts={filteredConcepts.filter(c => c.progress === 100)} 
                loading={loading} 
                viewMode={viewMode}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="not-started">
            <div className="pb-4">
              <RenderConceptCards 
                concepts={filteredConcepts.filter(c => c.progress === 0)} 
                loading={loading} 
                viewMode={viewMode}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="high-importance">
            <div className="pb-4">
              <RenderConceptCards 
                concepts={filteredConcepts.filter(c => c.importance === 'high')} 
                loading={loading} 
                viewMode={viewMode}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

interface RenderConceptCardsProps {
  concepts: ConceptCardProps[];
  loading: boolean;
  viewMode: string;
}

const RenderConceptCards: React.FC<RenderConceptCardsProps> = ({ concepts, loading, viewMode }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-40 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (concepts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
          <Search className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-bold mb-2">No Concepts Found</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          We couldn't find any concepts matching your filters. Try adjusting your search criteria.
        </p>
        <Button variant="outline">
          Clear All Filters
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
      {concepts.map(concept => (
        <EnhancedConceptCard key={concept.id} {...concept} />
      ))}
    </div>
  );
};

export default ConceptsLandingPage;
