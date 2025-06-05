
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, Filter, Star, Clock, Target } from 'lucide-react';

const ConceptsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const concepts = [
    {
      id: 'newtons-second-law',
      title: "Newton's Second Law",
      subject: 'Physics',
      difficulty: 'medium',
      description: 'The relationship between force, mass, and acceleration',
      estimatedTime: 30,
      completed: false,
      progress: 65
    },
    {
      id: 'organic-reactions',
      title: 'Organic Reactions',
      subject: 'Chemistry',
      difficulty: 'hard',
      description: 'Key organic chemistry reaction mechanisms',
      estimatedTime: 45,
      completed: true,
      progress: 100
    },
    {
      id: 'cell-division',
      title: 'Cell Division',
      subject: 'Biology',
      difficulty: 'easy',
      description: 'Mitosis and meiosis processes',
      estimatedTime: 25,
      completed: false,
      progress: 30
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const filteredConcepts = concepts.filter(concept => {
    const matchesSearch = concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concept.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || concept.subject.toLowerCase() === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts with interactive learning cards"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search concepts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Subject Tabs */}
        <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
          <TabsList>
            <TabsTrigger value="all">All Subjects</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedSubject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map((concept) => (
                <Card key={concept.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleConceptClick(concept.id)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <Badge variant="outline" className="text-xs">
                          {concept.subject}
                        </Badge>
                      </div>
                      <Badge className={getDifficultyColor(concept.difficulty)}>
                        {concept.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{concept.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{concept.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{concept.estimatedTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{concept.progress}%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        {concept.completed ? 'Review' : 'Study Now'}
                      </Button>
                      {concept.completed && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-xs">Completed</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptsPage;
