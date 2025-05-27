
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Play, Clock, Target, Star, Users, ChevronRight, Zap, RotateCcw } from 'lucide-react';
import OverviewSection from '../OverviewSection';

const FlashcardsLandingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && (tab === 'overview' || tab === 'all-flashcards')) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const overviewData = {
    type: "Flashcards" as const,
    title: "NEET Flashcards Overview",
    subjects: [
      { name: "Physics", completed: 120, total: 180, progress: 67, efficiency: 85, studyTime: 28 },
      { name: "Chemistry", completed: 95, total: 140, progress: 68, efficiency: 88, studyTime: 25 },
      { name: "Biology", completed: 150, total: 200, progress: 75, efficiency: 82, studyTime: 32 }
    ],
    totalStudyTime: 85,
    overallProgress: 70,
    suggestions: [
      "Review missed Physics formula flashcards daily",
      "Focus on Chemistry reaction mechanism cards", 
      "Strengthen Biology terminology with spaced repetition",
      "Use active recall techniques for better retention"
    ]
  };

  const allFlashcards = [
    {
      id: '1',
      title: 'Physics Formulas & Constants',
      subject: 'Physics',
      difficulty: 'Medium',
      totalCards: 85,
      mastered: 62,
      studyTime: '25 mins',
      rating: 4.8,
      studentsUsed: 2100,
      description: 'Essential physics formulas and important constants',
      topics: ['Mechanics', 'Thermodynamics', 'Optics', 'Modern Physics'],
      lastStudied: '2 days ago',
      streak: 5
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      difficulty: 'Hard',
      totalCards: 120,
      mastered: 78,
      studyTime: '35 mins',
      rating: 4.7,
      studentsUsed: 1850,
      description: 'Major organic reactions and mechanisms',
      topics: ['Alkanes', 'Alkenes', 'Aromatics', 'Functional Groups'],
      lastStudied: '1 day ago',
      streak: 8
    },
    {
      id: '3',
      title: 'Biology Terminology',
      subject: 'Biology',
      difficulty: 'Easy',
      totalCards: 95,
      mastered: 85,
      studyTime: '20 mins',
      rating: 4.9,
      studentsUsed: 2500,
      description: 'Key biological terms and definitions',
      topics: ['Cell Biology', 'Genetics', 'Ecology', 'Evolution'],
      lastStudied: 'Today',
      streak: 12
    },
    {
      id: '4',
      title: 'Inorganic Chemistry',
      subject: 'Chemistry',
      difficulty: 'Medium',
      totalCards: 75,
      mastered: 45,
      studyTime: '30 mins',
      rating: 4.6,
      studentsUsed: 1600,
      description: 'Periodic table trends and inorganic compounds',
      topics: ['Periodic Table', 'Metals', 'Non-metals', 'Coordination'],
      lastStudied: '3 days ago',
      streak: 3
    }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const handleContinueLearning = () => {
    setActiveTab('all-flashcards');
    setSearchParams({ tab: 'all-flashcards' });
  };

  const handleStudyFlashcard = (flashcardId: string) => {
    navigate(`/dashboard/student/flashcards/${flashcardId}/practice`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Chemistry': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Biology': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getMasteryLevel = (mastered: number, total: number) => {
    const percentage = (mastered / total) * 100;
    if (percentage >= 90) return { level: 'Expert', color: 'text-green-600' };
    if (percentage >= 70) return { level: 'Advanced', color: 'text-blue-600' };
    if (percentage >= 50) return { level: 'Intermediate', color: 'text-yellow-600' };
    return { level: 'Beginner', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-flashcards">All Flashcards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewSection 
            {...overviewData} 
            onContinueLearning={handleContinueLearning}
          />
        </TabsContent>

        <TabsContent value="all-flashcards" className="space-y-6 mt-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Flashcards</h1>
              <p className="text-gray-600 dark:text-gray-400">Review and memorize with smart flashcards</p>
            </div>
            <Button variant="outline">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Subject Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overviewData.subjects.map((subject) => (
              <Card key={subject.name} className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-purple-300" onClick={() => handleContinueLearning()}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{subject.name}</h3>
                    <Badge variant="outline" className={getSubjectColor(subject.name)}>
                      {subject.progress}% Mastered
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>{subject.completed}/{subject.total} Cards</span>
                      <span>{subject.studyTime}h practiced</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-2 bg-purple-50 rounded text-center">
                      <p className="text-sm font-bold text-purple-700">{subject.efficiency}%</p>
                      <p className="text-xs text-purple-600">Retention</p>
                    </div>
                    <div className="p-2 bg-blue-50 rounded text-center">
                      <p className="text-sm font-bold text-blue-700">{subject.studyTime}h</p>
                      <p className="text-xs text-blue-600">Study Time</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStudyFlashcard('1');
                    }}
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Study {subject.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Flashcards List */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Flashcard Sets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allFlashcards.map((flashcard) => {
                  const masteryLevel = getMasteryLevel(flashcard.mastered, flashcard.totalCards);
                  const masteryPercentage = (flashcard.mastered / flashcard.totalCards) * 100;
                  
                  return (
                    <Card key={flashcard.id} className="border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => handleStudyFlashcard(flashcard.id)}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-lg">{flashcard.title}</h4>
                              <Badge variant="outline" className={getSubjectColor(flashcard.subject)}>
                                {flashcard.subject}
                              </Badge>
                              <Badge variant="outline" className={getDifficultyColor(flashcard.difficulty)}>
                                {flashcard.difficulty}
                              </Badge>
                              {flashcard.streak > 0 && (
                                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                                  🔥 {flashcard.streak} day streak
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-3">{flashcard.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {flashcard.topics.map((topic, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Brain className="h-4 w-4" />
                                {flashcard.totalCards} cards
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {flashcard.studyTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                {flashcard.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {flashcard.studentsUsed.toLocaleString()} students
                              </span>
                              <span className="text-gray-500">
                                Last studied: {flashcard.lastStudied}
                              </span>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Mastery Level: <span className={masteryLevel.color}>{masteryLevel.level}</span></span>
                                <span>{flashcard.mastered}/{flashcard.totalCards} mastered ({Math.round(masteryPercentage)}%)</span>
                              </div>
                              <Progress value={masteryPercentage} className="h-2" />
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 ml-4">
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStudyFlashcard(flashcard.id);
                              }}
                              className="min-w-[120px]"
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Study Cards
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStudyFlashcard(flashcard.id);
                              }}
                              className="min-w-[120px]"
                            >
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Quick Review
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <h3 className="font-semibold mb-2">Quick Review</h3>
                <p className="text-sm text-gray-600 mb-3">Review cards you struggled with</p>
                <Button size="sm" variant="outline" className="w-full">Start Review</Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold mb-2">Spaced Repetition</h3>
                <p className="text-sm text-gray-600 mb-3">Cards due for review today</p>
                <Button size="sm" variant="outline" className="w-full">Review Now</Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold mb-2">Create Custom Set</h3>
                <p className="text-sm text-gray-600 mb-3">Make your own flashcards</p>
                <Button size="sm" variant="outline" className="w-full">Create Set</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsLandingPage;
