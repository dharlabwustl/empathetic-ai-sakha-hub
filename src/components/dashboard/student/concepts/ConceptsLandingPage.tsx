import React, { useState } from 'react';
import ConceptOverviewSection from './ConceptOverviewSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, Clock, ArrowRight, Bookmark, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

const ConceptsLandingPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'concepts'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Difficulties' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ];

  const conceptCategories = [
    { id: 'all', name: 'All Concepts' },
    { id: 'recommended', name: 'Recommended' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Recently Added' },
    { id: 'bookmarked', name: 'Bookmarked' }
  ];

  const mockConcepts = [
    {
      id: 'c1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      topic: 'Mechanics',
      difficulty: 'Medium',
      duration: 25,
      completed: false,
      description: 'Learn about the three fundamental laws that form the foundation of classical mechanics.',
      popularity: 95
    },
    {
      id: 'c2',
      title: 'Periodic Table & Elements',
      subject: 'Chemistry',
      topic: 'Inorganic Chemistry',
      difficulty: 'Easy',
      duration: 20,
      completed: true,
      description: 'Explore the organization of elements in the periodic table and their properties.',
      popularity: 92
    },
    {
      id: 'c3',
      title: 'Cell Structure & Function',
      subject: 'Biology',
      topic: 'Cell Biology',
      difficulty: 'Medium',
      duration: 30,
      completed: false,
      description: 'Understand the structure of cells and how different organelles function.',
      popularity: 98
    },
    {
      id: 'c4',
      title: 'Thermodynamics',
      subject: 'Physics',
      topic: 'Heat & Energy',
      difficulty: 'Hard',
      duration: 35,
      completed: false,
      description: 'Study the relationships between heat, energy, and work in physical systems.',
      popularity: 88
    },
    {
      id: 'c5',
      title: 'Organic Compounds',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      difficulty: 'Hard',
      duration: 40,
      completed: false,
      description: 'Learn about carbon-based compounds and their reactions.',
      popularity: 85
    },
    {
      id: 'c6',
      title: 'Human Physiology',
      subject: 'Biology',
      topic: 'Anatomy',
      difficulty: 'Medium',
      duration: 30,
      completed: true,
      description: 'Explore the functions of different systems in the human body.',
      popularity: 94
    }
  ];

  const filteredConcepts = mockConcepts.filter(concept => {
    // Filter by search query
    if (searchQuery && !concept.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by subject
    if (selectedSubject !== 'all' && concept.subject.toLowerCase() !== selectedSubject) {
      return false;
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== 'all' && concept.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
      return false;
    }
    
    // Filter by completion status
    if (!showCompleted && concept.completed) {
      return false;
    }
    
    // Filter by tab category
    if (activeTab === 'recommended') {
      return concept.popularity > 90;
    } else if (activeTab === 'popular') {
      return concept.popularity > 85;
    } else if (activeTab === 'bookmarked') {
      // Mock bookmarked items
      return ['c1', 'c3', 'c6'].includes(concept.id);
    }
    
    return true;
  });

  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveView('overview')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'overview'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveView('concepts')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'concepts'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          All Concepts
        </button>
      </div>

      {/* Content based on active view */}
      {activeView === 'overview' ? (
        <ConceptOverviewSection />
      ) : (
        <div className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search concepts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-completed" 
                  checked={showCompleted} 
                  onCheckedChange={(checked) => setShowCompleted(checked as boolean)}
                />
                <Label htmlFor="show-completed">Show Completed</Label>
              </div>
            </div>
          </div>
          
          {/* Concept Categories Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              {conceptCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Concepts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConcepts.map((concept) => (
                <Card 
                  key={concept.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    concept.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : ''
                  }`}
                  onClick={() => handleConceptClick(concept.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        variant="outline" 
                        className={
                          concept.subject === 'Physics' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          concept.subject === 'Chemistry' ? 'bg-green-50 text-green-700 border-green-200' :
                          'bg-purple-50 text-purple-700 border-purple-200'
                        }
                      >
                        {concept.subject}
                      </Badge>
                      {concept.completed ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      ) : (
                        <Badge 
                          variant="outline" 
                          className={
                            concept.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                            concept.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-red-50 text-red-700 border-red-200'
                          }
                        >
                          {concept.difficulty}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-medium text-lg mb-2">{concept.title}</h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {concept.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{concept.duration} min</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{concept.topic}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredConcepts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No concepts match your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ConceptsLandingPage;
