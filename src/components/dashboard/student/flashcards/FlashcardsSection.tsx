
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FlashcardOverviewSection from './FlashcardOverviewSection';
import FlashcardInteractive from './FlashcardInteractive';
import { Brain, Plus, Filter, Search, Clock, Target, Star, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const FlashcardsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data for subjects with progress
  const subjects = [
    { name: 'Physics', total: 150, completed: 95, mastered: 67, color: 'blue' },
    { name: 'Chemistry', total: 120, completed: 78, mastered: 45, color: 'purple' },
    { name: 'Biology', total: 180, completed: 142, mastered: 89, color: 'green' },
    { name: 'Mathematics', total: 200, completed: 134, mastered: 78, color: 'orange' }
  ];

  // Mock flashcard sets data
  const flashcardSets = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      totalCards: 25,
      completedCards: 18,
      masteredCards: 12,
      difficulty: 'Medium',
      estimatedTime: 30,
      accuracy: 85,
      daysToGo: 3,
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      totalCards: 40,
      completedCards: 35,
      masteredCards: 28,
      difficulty: 'Hard',
      estimatedTime: 45,
      accuracy: 92,
      daysToGo: 1,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Cell Biology Fundamentals',
      subject: 'Biology',
      totalCards: 30,
      completedCards: 12,
      masteredCards: 8,
      difficulty: 'Easy',
      estimatedTime: 25,
      accuracy: 78,
      daysToGo: 5,
      status: 'pending'
    }
  ];

  const getSubjectColor = (color: string) => {
    const colors = {
      blue: 'from-blue-500/10 to-blue-600/10 border-blue-200',
      purple: 'from-purple-500/10 to-purple-600/10 border-purple-200',
      green: 'from-green-500/10 to-green-600/10 border-green-200',
      orange: 'from-orange-500/10 to-orange-600/10 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSets = selectedSubject === 'all' 
    ? flashcardSets 
    : flashcardSets.filter(set => set.subject === selectedSubject);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
          <p className="text-gray-600 dark:text-gray-400">Master concepts with smart spaced repetition</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Set
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-flashcards">All Flashcards</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="create">Create Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <FlashcardOverviewSection />
        </TabsContent>

        <TabsContent value="all-flashcards">
          <div className="space-y-6">
            {/* Subject filter tabs */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSubject === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSubject('all')}
                className="rounded-full"
              >
                All Subjects
              </Button>
              {subjects.map((subject) => (
                <Button
                  key={subject.name}
                  variant={selectedSubject === subject.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSubject(subject.name)}
                  className="rounded-full"
                >
                  {subject.name}
                </Button>
              ))}
            </div>

            {/* Subject progress cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjects.map((subject) => (
                <Card 
                  key={subject.name} 
                  className={`relative overflow-hidden bg-gradient-to-br ${getSubjectColor(subject.color)} backdrop-blur-sm border hover:shadow-lg transition-all duration-300`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">{subject.completed}/{subject.total} cards</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{Math.round((subject.completed / subject.total) * 100)}%</span>
                      </div>
                      <Progress value={(subject.completed / subject.total) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Mastery</span>
                        <span>{Math.round((subject.mastered / subject.total) * 100)}%</span>
                      </div>
                      <Progress value={(subject.mastered / subject.total) * 100} className="h-2 bg-green-100" />
                    </div>
                    <Button size="sm" className="w-full">
                      Study {subject.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Flashcard sets grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSets.map((set) => (
                <Card key={set.id} className="group relative overflow-hidden border-l-4 border-l-purple-500 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <CardTitle className="text-lg font-semibold">{set.title}</CardTitle>
                      </div>
                      <Star className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                        {set.subject}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(set.difficulty)}>
                        {set.difficulty}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(set.status)}>
                        {set.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 relative z-10">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{set.completedCards}/{set.totalCards}</span>
                      </div>
                      <Progress value={(set.completedCards / set.totalCards) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-sm font-bold text-blue-700">{set.accuracy}%</div>
                        <div className="text-xs text-blue-600">Accuracy</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-sm font-bold text-purple-700">{set.estimatedTime}m</div>
                        <div className="text-xs text-purple-600">Time</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-sm font-bold text-green-700">{set.masteredCards}</div>
                        <div className="text-xs text-green-600">Mastered</div>
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-purple-600 transition-colors duration-300">
                      Study Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="practice">
          <FlashcardInteractive />
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Create New Flashcard Set
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Flashcard creation interface coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsSection;
