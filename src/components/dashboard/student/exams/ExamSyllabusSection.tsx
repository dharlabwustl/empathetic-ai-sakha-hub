
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen, Zap, FileText, Trophy, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExamSyllabusSection = () => {
  const [activeSubject, setActiveSubject] = useState('physics');
  const navigate = useNavigate();

  const syllabusData = {
    physics: {
      name: 'Physics',
      totalTopics: 12,
      completedTopics: 8,
      overallProgress: 67,
      topics: [
        {
          id: 'mechanics',
          name: 'Mechanics',
          weightage: 25,
          progress: 85,
          conceptsTotal: 15,
          conceptsMastered: 13,
          concepts: [
            { id: 'kinematics', name: 'Kinematics', mastery: 90, difficulty: 'medium' },
            { id: 'dynamics', name: 'Laws of Motion', mastery: 85, difficulty: 'hard' },
            { id: 'work-energy', name: 'Work, Energy & Power', mastery: 80, difficulty: 'medium' },
            { id: 'rotational', name: 'Rotational Motion', mastery: 75, difficulty: 'hard' },
            { id: 'gravitation', name: 'Gravitation', mastery: 88, difficulty: 'medium' }
          ]
        },
        {
          id: 'thermodynamics',
          name: 'Thermodynamics',
          weightage: 15,
          progress: 60,
          conceptsTotal: 10,
          conceptsMastered: 6,
          concepts: [
            { id: 'thermal-properties', name: 'Thermal Properties', mastery: 70, difficulty: 'easy' },
            { id: 'kinetic-theory', name: 'Kinetic Theory', mastery: 65, difficulty: 'medium' },
            { id: 'laws-thermo', name: 'Laws of Thermodynamics', mastery: 55, difficulty: 'hard' },
            { id: 'heat-engines', name: 'Heat Engines', mastery: 50, difficulty: 'hard' }
          ]
        },
        {
          id: 'optics',
          name: 'Optics',
          weightage: 20,
          progress: 72,
          conceptsTotal: 12,
          conceptsMastered: 9,
          concepts: [
            { id: 'ray-optics', name: 'Ray Optics', mastery: 85, difficulty: 'medium' },
            { id: 'wave-optics', name: 'Wave Optics', mastery: 70, difficulty: 'hard' },
            { id: 'optical-instruments', name: 'Optical Instruments', mastery: 65, difficulty: 'medium' }
          ]
        }
      ]
    },
    chemistry: {
      name: 'Chemistry',
      totalTopics: 15,
      completedTopics: 10,
      overallProgress: 71,
      topics: [
        {
          id: 'organic',
          name: 'Organic Chemistry',
          weightage: 35,
          progress: 78,
          conceptsTotal: 20,
          conceptsMastered: 16,
          concepts: [
            { id: 'hydrocarbons', name: 'Hydrocarbons', mastery: 88, difficulty: 'medium' },
            { id: 'alcohols', name: 'Alcohols & Phenols', mastery: 82, difficulty: 'medium' },
            { id: 'carbonyl', name: 'Carbonyl Compounds', mastery: 75, difficulty: 'hard' },
            { id: 'biomolecules', name: 'Biomolecules', mastery: 70, difficulty: 'hard' }
          ]
        },
        {
          id: 'inorganic',
          name: 'Inorganic Chemistry',
          weightage: 30,
          progress: 65,
          conceptsTotal: 18,
          conceptsMastered: 12,
          concepts: [
            { id: 'periodic-table', name: 'Periodic Classification', mastery: 90, difficulty: 'easy' },
            { id: 'chemical-bonding', name: 'Chemical Bonding', mastery: 75, difficulty: 'medium' },
            { id: 'coordination', name: 'Coordination Compounds', mastery: 60, difficulty: 'hard' }
          ]
        }
      ]
    },
    biology: {
      name: 'Biology',
      totalTopics: 18,
      completedTopics: 12,
      overallProgress: 68,
      topics: [
        {
          id: 'cell-biology',
          name: 'Cell Biology',
          weightage: 20,
          progress: 82,
          conceptsTotal: 14,
          conceptsMastered: 12,
          concepts: [
            { id: 'cell-structure', name: 'Cell Structure & Function', mastery: 88, difficulty: 'medium' },
            { id: 'cell-division', name: 'Cell Division', mastery: 85, difficulty: 'medium' },
            { id: 'biomolecules-bio', name: 'Biomolecules', mastery: 75, difficulty: 'hard' }
          ]
        },
        {
          id: 'genetics',
          name: 'Genetics',
          weightage: 25,
          progress: 70,
          conceptsTotal: 16,
          conceptsMastered: 11,
          concepts: [
            { id: 'mendelian', name: 'Mendelian Genetics', mastery: 80, difficulty: 'medium' },
            { id: 'molecular-genetics', name: 'Molecular Genetics', mastery: 65, difficulty: 'hard' },
            { id: 'evolution', name: 'Evolution', mastery: 70, difficulty: 'medium' }
          ]
        }
      ]
    }
  };

  const handleConceptClick = (conceptId: string, action: 'concept' | 'flashcard' | 'exam') => {
    switch (action) {
      case 'concept':
        navigate(`/dashboard/student/concepts/${conceptId}`);
        break;
      case 'flashcard':
        navigate(`/dashboard/student/flashcards/${conceptId}`);
        break;
      case 'exam':
        navigate(`/dashboard/student/practice-exam/${conceptId}`);
        break;
    }
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-green-600';
    if (mastery >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty as keyof typeof colors] || colors.medium;
  };

  const currentSubject = syllabusData[activeSubject as keyof typeof syllabusData];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">NEET 2026 Exam Syllabus</h1>
            <p className="text-blue-100">Master every concept with structured learning paths</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">68%</div>
            <div className="text-sm text-blue-100">Overall Progress</div>
          </div>
        </div>
      </div>

      {/* Subject Tabs */}
      <Tabs value={activeSubject} onValueChange={setActiveSubject}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="physics" className="flex items-center gap-2">
            <span>Physics</span>
            <Badge variant="outline" className="ml-1">67%</Badge>
          </TabsTrigger>
          <TabsTrigger value="chemistry" className="flex items-center gap-2">
            <span>Chemistry</span>
            <Badge variant="outline" className="ml-1">71%</Badge>
          </TabsTrigger>
          <TabsTrigger value="biology" className="flex items-center gap-2">
            <span>Biology</span>
            <Badge variant="outline" className="ml-1">68%</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Subject Overview */}
        <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{currentSubject.totalTopics}</div>
                <div className="text-sm text-gray-600">Total Topics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{currentSubject.completedTopics}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{currentSubject.overallProgress}%</div>
                <div className="text-sm text-gray-600">Mastery</div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{currentSubject.overallProgress}%</span>
                  </div>
                  <Progress value={currentSubject.overallProgress} className="h-3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topics and Concepts */}
        <TabsContent value={activeSubject} className="space-y-6">
          {currentSubject.topics.map((topic, topicIndex) => (
            <Card key={topic.id} className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{topicIndex + 1}. {topic.name}</CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className="bg-purple-100 text-purple-800">
                          <Target className="h-3 w-3 mr-1" />
                          {topic.weightage}% Weightage
                        </Badge>
                        <Badge variant="outline">
                          {topic.conceptsMastered}/{topic.conceptsTotal} Concepts Mastered
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getMasteryColor(topic.progress)}`}>
                      {topic.progress}%
                    </div>
                    <div className="text-sm text-gray-500">Topic Mastery</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Topic Progress</span>
                    <span>{topic.progress}%</span>
                  </div>
                  <Progress value={topic.progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topic.concepts.map((concept, conceptIndex) => (
                    <Card key={concept.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">
                              {topicIndex + 1}.{conceptIndex + 1} {concept.name}
                            </h4>
                            <Badge className={`text-xs ${getDifficultyBadge(concept.difficulty)}`}>
                              {concept.difficulty}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${getMasteryColor(concept.mastery)}`}>
                              {concept.mastery}%
                            </div>
                            <div className="text-xs text-gray-500">Mastery</div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <Progress value={concept.mastery} className="h-1.5" />
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs h-8"
                            onClick={() => handleConceptClick(concept.id, 'concept')}
                          >
                            <BookOpen className="h-3 w-3 mr-1" />
                            Learn
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs h-8"
                            onClick={() => handleConceptClick(concept.id, 'flashcard')}
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Cards
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-xs h-8"
                            onClick={() => handleConceptClick(concept.id, 'exam')}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Test
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Premium Features Banner */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-900">Unlock Premium Features</h3>
                <p className="text-sm text-amber-700">Get personalized study plans, AI tutoring, and detailed analytics</p>
              </div>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Upgrade Now
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamSyllabusSection;
