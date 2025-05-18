
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, BookOpen, Clock, Filter, GraduationCap, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConceptCard } from '@/types/user/conceptCard';

interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
}

interface EnhancedConceptLandingPageProps {
  concepts?: ConceptCard[];
  isLoading?: boolean;
}

const EnhancedConceptLandingPage: React.FC<EnhancedConceptLandingPageProps> = ({
  concepts = [],
  isLoading = false
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [sortOption, setSortOption] = useState('relevance');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  
  // Define mock concepts if none provided
  const mockConcepts: ConceptCard[] = [
    {
      id: "concept-1",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      chapter: "Mechanics",
      difficulty: "Medium",
      description: "The fundamental principles describing the relationship between forces and motion of objects.",
      content: "Newton's laws of motion are three laws that describe the relationship between the motion of an object and the forces acting on it.",
      estimatedTime: 45,
      progress: 60
    },
    {
      id: "concept-2",
      title: "Chemical Equilibrium",
      subject: "Chemistry",
      chapter: "Chemical Kinetics",
      difficulty: "Hard",
      description: "The state where the forward reaction rate equals the backward reaction rate.",
      content: "Chemical equilibrium occurs when the rate of the forward reaction equals the rate of the backward reaction.",
      estimatedTime: 50,
      progress: 30
    },
    {
      id: "concept-3",
      title: "Cell Theory",
      subject: "Biology",
      chapter: "Cell Biology",
      difficulty: "Easy",
      description: "The fundamental principles about the nature of cells as the basic unit of structure and function in living organisms.",
      content: "Cell theory states that all organisms are composed of cells, cells are the basic units of structure and function, and all cells come from preexisting cells.",
      estimatedTime: 35,
      progress: 80
    }
  ];
  
  // Use provided concepts or fallback to mock data
  const conceptsData = concepts.length > 0 ? concepts : mockConcepts;
  
  // Filter and sort concepts based on user selections
  const filteredConcepts = conceptsData.filter(concept => {
    // Filter by search query
    if (searchQuery && !concept.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !concept.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by subject
    if (subjectFilter !== 'all' && concept.subject.toLowerCase() !== subjectFilter.toLowerCase()) {
      return false;
    }
    
    // Filter by difficulty
    if (difficultyFilter !== 'all' && concept.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) {
      return false;
    }
    
    // Filter by tab selection
    if (activeTab === 'completed' && (!concept.progress || concept.progress < 100)) {
      return false;
    }
    if (activeTab === 'in-progress' && (!concept.progress || concept.progress === 0 || concept.progress === 100)) {
      return false;
    }
    if (activeTab === 'not-started' && concept.progress && concept.progress > 0) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort based on selected option
    if (sortOption === 'title-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'title-desc') {
      return b.title.localeCompare(a.title);
    } else if (sortOption === 'difficulty-asc') {
      const difficultyOrder: Record<string, number> = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return difficultyOrder[a.difficulty.toLowerCase()] - difficultyOrder[b.difficulty.toLowerCase()];
    } else if (sortOption === 'difficulty-desc') {
      const difficultyOrder: Record<string, number> = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return difficultyOrder[b.difficulty.toLowerCase()] - difficultyOrder[a.difficulty.toLowerCase()];
    }
    
    // Default: sort by relevance
    return 0;
  });
  
  // Navigate to concept detail view
  const handleViewConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };
  
  // Simulate formula practice for non-implemented concepts
  const handleOpenFormulaLab = () => {
    // This would normally navigate to a specific formula lab page
    navigate(`/dashboard/student/formula-practice`);
  };
  
  // Render skeleton loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search concepts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[140px]">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Subject
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[140px]">
              <span className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Difficulty
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[140px]">
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Sort By
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              <SelectItem value="difficulty-asc">Difficulty (Easy-Hard)</SelectItem>
              <SelectItem value="difficulty-desc">Difficulty (Hard-Easy)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Tab navigation */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all" className="flex gap-1">
            <BookOpen className="h-4 w-4" />
            All Concepts
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex gap-1">
            <Clock className="h-4 w-4" />
            In Progress
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex gap-1">
            <Check className="h-4 w-4" />
            Completed
          </TabsTrigger>
          <TabsTrigger value="not-started" className="flex gap-1">
            <BookOpen className="h-4 w-4" />
            Not Started
          </TabsTrigger>
        </TabsList>
        
        {/* Content for all tabs is the same, filtered differently */}
        <TabsContent value="all" className="mt-6">
          <ConceptsGrid concepts={filteredConcepts} onViewConcept={handleViewConcept} />
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-6">
          <ConceptsGrid concepts={filteredConcepts} onViewConcept={handleViewConcept} />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <ConceptsGrid concepts={filteredConcepts} onViewConcept={handleViewConcept} />
        </TabsContent>
        
        <TabsContent value="not-started" className="mt-6">
          <ConceptsGrid concepts={filteredConcepts} onViewConcept={handleViewConcept} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Concepts grid component
interface ConceptsGridProps {
  concepts: ConceptCard[];
  onViewConcept: (conceptId: string) => void;
}

const ConceptsGrid: React.FC<ConceptsGridProps> = ({ concepts, onViewConcept }) => {
  if (concepts.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <h3 className="font-semibold text-lg mb-2">No concepts found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button variant="outline">Clear Filters</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {concepts.map((concept) => (
        <Card 
          key={concept.id}
          className="overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
          onClick={() => onViewConcept(concept.id)}
        >
          <CardHeader className={`pb-3 border-l-4 ${
            concept.difficulty.toLowerCase() === 'easy' ? 'border-green-500 bg-green-50/50' :
            concept.difficulty.toLowerCase() === 'medium' ? 'border-amber-500 bg-amber-50/50' :
            'border-red-500 bg-red-50/50'
          }`}>
            <CardTitle className="text-lg">{concept.title}</CardTitle>
            <CardDescription>{concept.subject} · {concept.chapter}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-6">
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {concept.description}
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{concept.estimatedTime || 30} min</span>
              </div>
              
              {concept.progress !== undefined && (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600" 
                      style={{ width: `${concept.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{concept.progress}%</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Formula practice tab content
const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ conceptId, conceptTitle, handleOpenFormulaLab }) => {
  return (
    <div className="text-center py-8">
      <h3 className="text-xl font-semibold mb-2">Practice Formulas: {conceptTitle}</h3>
      <p className="text-muted-foreground mb-6">
        Test your knowledge of formulas related to this concept.
      </p>
      <Button onClick={handleOpenFormulaLab}>Open Formula Practice Lab</Button>
    </div>
  );
};

export default EnhancedConceptLandingPage;
