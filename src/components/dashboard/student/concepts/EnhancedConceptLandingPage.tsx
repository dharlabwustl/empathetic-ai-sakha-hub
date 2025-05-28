
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Target, TrendingUp, Play, ChevronRight, Brain, Star } from 'lucide-react';

const EnhancedConceptLandingPage = () => {
  const navigate = useNavigate();

  // Enhanced NEET subject data with more detailed metrics
  const subjectProgress = [
    {
      subject: 'Physics',
      totalConcepts: 120,
      masteredConcepts: 85,
      inProgressConcepts: 20,
      newConcepts: 15,
      studyTime: '32h 45m',
      efficiency: 82,
      improvement: '+18%',
      color: 'bg-blue-500',
      chapters: [
        { name: 'Mechanics', progress: 90, concepts: 25 },
        { name: 'Thermodynamics', progress: 75, concepts: 18 },
        { name: 'Electromagnetism', progress: 65, concepts: 22 }
      ]
    },
    {
      subject: 'Chemistry', 
      totalConcepts: 150,
      masteredConcepts: 110,
      inProgressConcepts: 25,
      newConcepts: 15,
      studyTime: '41h 20m',
      efficiency: 88,
      improvement: '+22%',
      color: 'bg-green-500',
      chapters: [
        { name: 'Organic Chemistry', progress: 85, concepts: 45 },
        { name: 'Inorganic Chemistry', progress: 70, concepts: 35 },
        { name: 'Physical Chemistry', progress: 80, concepts: 30 }
      ]
    },
    {
      subject: 'Biology',
      totalConcepts: 180,
      masteredConcepts: 125,
      inProgressConcepts: 35,
      newConcepts: 20,
      studyTime: '48h 15m',
      efficiency: 79,
      improvement: '+15%',
      color: 'bg-purple-500',
      chapters: [
        { name: 'Cell Biology', progress: 95, concepts: 30 },
        { name: 'Genetics', progress: 70, concepts: 25 },
        { name: 'Ecology', progress: 60, concepts: 20 }
      ]
    }
  ];

  const recentConcepts = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      chapter: 'Mechanics',
      difficulty: 'Medium',
      progress: 85,
      timeSpent: '45m',
      status: 'mastered',
      lastStudied: '2 hours ago',
      tags: ['Fundamental', 'Important']
    },
    {
      id: '2',
      title: 'Organic Reaction Mechanisms',
      subject: 'Chemistry',
      chapter: 'Organic Chemistry',
      difficulty: 'Hard',
      progress: 60,
      timeSpent: '1h 20m',
      status: 'in-progress',
      lastStudied: '1 day ago',
      tags: ['Complex', 'NEET Important']
    },
    {
      id: '3',
      title: 'Photosynthesis Process',
      subject: 'Biology',
      chapter: 'Plant Physiology',
      difficulty: 'Easy',
      progress: 95,
      timeSpent: '30m',
      status: 'mastered',
      lastStudied: '3 days ago',
      tags: ['Fundamental', 'Easy']
    }
  ];

  const aiSuggestions = [
    "Focus on Physics Electromagnetism - this topic needs more attention",
    "Great progress in Chemistry! Keep reviewing organic mechanisms",
    "Biology genetics concepts are improving - schedule daily practice",
    "Consider reviewing mastered concepts weekly for better retention"
  ];

  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Concept Cards</h1>
          <p className="text-gray-600 dark:text-gray-400">Master NEET concepts with personalized learning paths</p>
        </div>
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Create Custom Concept
        </Button>
      </div>

      {/* Enhanced NEET Subject Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subjectProgress.map((subject) => (
          <Card key={subject.subject} className="border-2 hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">{subject.subject}</CardTitle>
                <div className={`w-4 h-4 rounded-full ${subject.color}`}></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Overall Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Overall Progress</span>
                  <span>{Math.round((subject.masteredConcepts / subject.totalConcepts) * 100)}%</span>
                </div>
                <Progress value={(subject.masteredConcepts / subject.totalConcepts) * 100} className="h-3" />
              </div>
              
              {/* Concept Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-green-50 rounded-lg text-center border border-green-200">
                  <p className="text-lg font-bold text-green-700">{subject.masteredConcepts}</p>
                  <p className="text-xs text-green-600 font-medium">Mastered</p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg text-center border border-yellow-200">
                  <p className="text-lg font-bold text-yellow-700">{subject.inProgressConcepts}</p>
                  <p className="text-xs text-yellow-600 font-medium">Learning</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg text-center border border-blue-200">
                  <p className="text-lg font-bold text-blue-700">{subject.newConcepts}</p>
                  <p className="text-xs text-blue-600 font-medium">New</p>
                </div>
              </div>

              {/* Chapter Progress */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Chapter Progress</h4>
                {subject.chapters.slice(0, 2).map((chapter) => (
                  <div key={chapter.name} className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">{chapter.name}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={chapter.progress} className="h-1 w-16" />
                      <span className="text-xs font-medium">{chapter.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div className="flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span className="text-gray-600">{subject.studyTime}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 font-medium">{subject.improvement}</span>
                </div>
              </div>

              <Button className="w-full" variant="outline" size="sm">
                <Play className="mr-2 h-4 w-4" />
                Continue {subject.subject}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Suggestions */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-800">
            <Brain className="h-5 w-5" />
            AI Learning Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-indigo-200 shadow-sm">
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recent Concepts */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Concept Cards</CardTitle>
            <Button variant="ghost" size="sm">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentConcepts.map((concept) => (
              <div 
                key={concept.id} 
                className="p-4 border-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-200"
                onClick={() => handleConceptClick(concept.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{concept.title}</h4>
                      <div className="flex gap-1">
                        {concept.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-xs">{concept.subject}</Badge>
                      <Badge variant="outline" className="text-xs">{concept.chapter}</Badge>
                      <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                        {concept.difficulty}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(concept.status)}>
                        {concept.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{concept.progress}%</div>
                    <div className="text-xs text-gray-500">Progress</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{concept.timeSpent}</span>
                    </div>
                    <span>Last studied: {concept.lastStudied}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={concept.progress} className="h-2 w-20" />
                    <Button size="sm" variant={concept.status === 'mastered' ? 'outline' : 'default'}>
                      <Play className="h-3 w-3 mr-1" />
                      {concept.status === 'mastered' ? 'Review' : 'Continue'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-800">450</p>
            <p className="text-sm text-blue-600 font-medium">Total Concepts</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-800">320</p>
            <p className="text-sm text-green-600 font-medium">Mastered</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-800">122h</p>
            <p className="text-sm text-purple-600 font-medium">Study Time</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold text-orange-800">83%</p>
            <p className="text-sm text-orange-600 font-medium">Avg Efficiency</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedConceptLandingPage;
