
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useUserProfile } from '@/hooks/useUserProfile';
import FlashcardsFeature from '@/components/dashboard/student/FlashcardsFeature';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Search, Filter, BookOpen, Clock, Tag, Check, BookMarked, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

const FlashcardsPage = () => {
  const { conceptCards } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Get completed concepts to determine available flashcards
  const completedConcepts = conceptCards.filter(card => card.completed);
  
  // Generate mock flashcard sets for demo
  const flashcardSets = [
    {
      id: 'f1',
      title: 'Physics: Mechanics Quick Recap',
      cardsCount: 45,
      mastery: 72,
      subject: 'Physics',
      topic: 'Mechanics',
      linkedConcept: 'Newtons Laws',
      status: 'In Progress',
      isBookmarked: true,
      updatedAt: '2d ago'
    },
    {
      id: 'f2',
      title: 'Organic Chemistry Fundamentals',
      cardsCount: 30,
      mastery: 58,
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      linkedConcept: 'Carbon Compounds',
      status: 'Not Started',
      isBookmarked: false,
      updatedAt: '1w ago'
    },
    {
      id: 'f3',
      title: 'Calculus: Derivatives & Integrals',
      cardsCount: 25,
      mastery: 86,
      subject: 'Mathematics',
      topic: 'Calculus',
      linkedConcept: 'Differentiation',
      status: 'Completed',
      isBookmarked: true,
      updatedAt: '3d ago'
    },
    {
      id: 'f4',
      title: 'Modern Physics Concepts',
      cardsCount: 32,
      mastery: 45,
      subject: 'Physics',
      topic: 'Modern Physics',
      linkedConcept: 'Quantum Theory',
      status: 'In Progress',
      isBookmarked: false,
      updatedAt: '5d ago'
    },
    {
      id: 'f5',
      title: 'Chemistry: Periodic Table',
      cardsCount: 20,
      mastery: 65,
      subject: 'Chemistry',
      topic: 'Inorganic Chemistry',
      linkedConcept: 'Elements',
      status: 'In Progress',
      isBookmarked: true,
      updatedAt: '1d ago'
    },
    {
      id: 'f6',
      title: 'Algebra Essentials',
      cardsCount: 40,
      mastery: 75,
      subject: 'Mathematics',
      topic: 'Algebra',
      linkedConcept: 'Equations',
      status: 'Completed',
      isBookmarked: false,
      updatedAt: '2w ago'
    },
    {
      id: 'f7',
      title: 'Thermodynamics Review',
      cardsCount: 28,
      mastery: 60,
      subject: 'Physics',
      topic: 'Thermodynamics',
      linkedConcept: 'Laws of Thermodynamics',
      status: 'In Progress',
      isBookmarked: true,
      updatedAt: '4d ago'
    },
    {
      id: 'f8',
      title: 'Geometry & Trigonometry',
      cardsCount: 35,
      mastery: 55,
      subject: 'Mathematics',
      topic: 'Geometry',
      linkedConcept: 'Triangles',
      status: 'Not Started',
      isBookmarked: false,
      updatedAt: '3w ago'
    },
  ];
  
  const allSubjects = Array.from(new Set(flashcardSets.map(set => set.subject)));
  const allTopics = Array.from(new Set(flashcardSets.map(set => set.topic)));
  
  const toggleSubjectFilter = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };
  
  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };
  
  // Filter flashcard sets
  const filteredSets = flashcardSets.filter(set => {
    // Filter by search query
    if (searchQuery && !set.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by selected subjects
    if (selectedSubjects.length > 0 && !selectedSubjects.includes(set.subject)) {
      return false;
    }
    
    // Filter by tab
    switch (activeTab) {
      case 'bookmarked':
        return set.isBookmarked;
      case 'completed':
        return set.status === 'Completed';
      case 'inprogress':
        return set.status === 'In Progress';
      case 'notstarted':
        return set.status === 'Not Started';
      default:
        return true;
    }
  });
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Link to="/dashboard/student/overview" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Brain className="text-blue-600" />
                  Flashcards
                </h1>
                <p className="text-gray-600 mt-1">
                  Quick Recaps for Your {examGoal} Preparation, Available Anytime
                </p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={toggleVoice}
              >
                {voiceEnabled ? (
                  <>
                    <Volume2 size={16} className="mr-1" />
                    Voice Enabled
                  </>
                ) : (
                  <>
                    <VolumeX size={16} className="mr-1" />
                    Enable Voice
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search flashcard sets..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter size={14} /> Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Clock size={14} /> Recent
                  </Button>
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium">Subjects:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {allSubjects.map(subject => (
                    <Badge
                      key={subject}
                      variant={selectedSubjects.includes(subject) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSubjectFilter(subject)}
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              <TabsTrigger value="all">All Sets</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="inprogress">In Progress</TabsTrigger>
              <TabsTrigger value="notstarted">Not Started</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Flashcard Sets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSets.map(set => (
              <Link key={set.id} to={`/dashboard/student/flashcards/${set.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow duration-200 border-l-4 border-l-blue-500 overflow-hidden group">
                  <CardContent className="p-4 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{set.subject}</Badge>
                      {set.isBookmarked && <BookMarked size={16} className="text-blue-600 fill-blue-600" />}
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">{set.title}</h3>
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200 flex items-center">
                        <BookOpen size={10} className="mr-1" /> {set.topic}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-violet-50 text-violet-700 border-violet-200 flex items-center">
                        <Tag size={10} className="mr-1" /> {set.linkedConcept}
                      </Badge>
                    </div>
                    
                    <div className="mt-auto space-y-3">
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center justify-between">
                          <span>{set.cardsCount} cards</span>
                          <span className={`
                            ${set.status === 'Completed' ? 'text-green-600' : 
                              set.status === 'In Progress' ? 'text-amber-600' : 'text-gray-600'}
                          `}>
                            {set.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-1 mt-1">
                          <span>Mastery:</span>
                          <span>{set.mastery}%</span>
                        </div>
                        <Progress value={set.mastery} className="h-1.5" />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          {voiceEnabled && <Volume2 size={14} className="text-blue-600" />}
                          <span>Updated {set.updatedAt}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          Study Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredSets.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border">
              <Brain size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No flashcard sets found</h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
          
          {/* Main Flashcards Feature */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Continue Your Learning</h2>
            <FlashcardsFeature />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FlashcardsPage;
