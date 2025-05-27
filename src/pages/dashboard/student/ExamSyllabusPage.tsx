
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  ChevronRight, 
  Trophy, 
  Clock,
  Target,
  CheckCircle,
  Star,
  Play,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface ConceptCard {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastered: boolean;
  progress: number;
  flashcardCount: number;
  examQuestions: number;
  estimatedTime: number;
  weightage: number;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  weightage: number;
  totalConcepts: number;
  masteredConcepts: number;
  progress: number;
  concepts: ConceptCard[];
}

interface Subject {
  id: string;
  name: string;
  code: string;
  totalMarks: number;
  topics: Topic[];
  overallProgress: number;
  color: string;
}

const ExamSyllabusPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('physics');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const syllabusData: Subject[] = [
    {
      id: 'physics',
      name: 'Physics',
      code: 'PHY',
      totalMarks: 180,
      overallProgress: 68,
      color: 'bg-blue-500',
      topics: [
        {
          id: 'mechanics',
          name: 'Mechanics',
          description: 'Laws of motion, work, energy and power',
          weightage: 23,
          totalConcepts: 12,
          masteredConcepts: 8,
          progress: 67,
          concepts: [
            {
              id: 'newtons-laws',
              title: "Newton's Laws of Motion",
              description: 'Three fundamental laws governing motion of objects',
              difficulty: 'medium',
              mastered: true,
              progress: 100,
              flashcardCount: 15,
              examQuestions: 8,
              estimatedTime: 45,
              weightage: 8
            },
            {
              id: 'work-energy',
              title: 'Work and Energy',
              description: 'Work-energy theorem and conservation of energy',
              difficulty: 'medium',
              mastered: true,
              progress: 95,
              flashcardCount: 12,
              examQuestions: 6,
              estimatedTime: 40,
              weightage: 7
            },
            {
              id: 'momentum',
              title: 'Momentum and Collisions',
              description: 'Conservation of momentum and collision types',
              difficulty: 'hard',
              mastered: false,
              progress: 45,
              flashcardCount: 18,
              examQuestions: 10,
              estimatedTime: 60,
              weightage: 8
            }
          ]
        },
        {
          id: 'thermodynamics',
          name: 'Thermodynamics',
          description: 'Heat, temperature and laws of thermodynamics',
          weightage: 16,
          totalConcepts: 8,
          masteredConcepts: 5,
          progress: 63,
          concepts: [
            {
              id: 'first-law',
              title: 'First Law of Thermodynamics',
              description: 'Conservation of energy in thermal processes',
              difficulty: 'medium',
              mastered: true,
              progress: 90,
              flashcardCount: 10,
              examQuestions: 5,
              estimatedTime: 35,
              weightage: 6
            },
            {
              id: 'heat-transfer',
              title: 'Heat Transfer',
              description: 'Conduction, convection and radiation',
              difficulty: 'easy',
              mastered: true,
              progress: 100,
              flashcardCount: 8,
              examQuestions: 4,
              estimatedTime: 25,
              weightage: 5
            }
          ]
        }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      code: 'CHM',
      totalMarks: 180,
      overallProgress: 72,
      color: 'bg-purple-500',
      topics: [
        {
          id: 'organic',
          name: 'Organic Chemistry',
          description: 'Hydrocarbons, functional groups and reactions',
          weightage: 30,
          totalConcepts: 15,
          masteredConcepts: 11,
          progress: 73,
          concepts: [
            {
              id: 'hydrocarbons',
              title: 'Hydrocarbons',
              description: 'Alkanes, alkenes, alkynes and their properties',
              difficulty: 'medium',
              mastered: true,
              progress: 95,
              flashcardCount: 20,
              examQuestions: 12,
              estimatedTime: 50,
              weightage: 10
            },
            {
              id: 'alcohols-phenols',
              title: 'Alcohols and Phenols',
              description: 'Properties, preparation and reactions',
              difficulty: 'hard',
              mastered: false,
              progress: 55,
              flashcardCount: 16,
              examQuestions: 8,
              estimatedTime: 45,
              weightage: 8
            }
          ]
        }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      code: 'BIO',
      totalMarks: 180,
      overallProgress: 65,
      color: 'bg-green-500',
      topics: [
        {
          id: 'genetics',
          name: 'Genetics and Evolution',
          description: 'Heredity, variation and evolution',
          weightage: 18,
          totalConcepts: 10,
          masteredConcepts: 6,
          progress: 60,
          concepts: [
            {
              id: 'mendels-laws',
              title: "Mendel's Laws",
              description: 'Laws of inheritance and genetic crosses',
              difficulty: 'medium',
              mastered: true,
              progress: 90,
              flashcardCount: 14,
              examQuestions: 7,
              estimatedTime: 40,
              weightage: 9
            }
          ]
        }
      ]
    }
  ];

  const activeSubjectData = syllabusData.find(s => s.id === activeSubject);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const handleFlashcardClick = (conceptId: string) => {
    navigate(`/dashboard/student/flashcards/${conceptId}/interactive`);
  };

  const handleExamClick = (conceptId: string) => {
    navigate(`/dashboard/student/practice-exam/${conceptId}/start`);
  };

  const toggleTopicExpansion = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <SharedPageLayout
      title="NEET 2026 Exam Syllabus"
      subtitle="Complete syllabus breakdown with concept-wise preparation tracking"
    >
      {/* Premium Header Banner */}
      <div className="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">NEET 2026 Premium Syllabus</h2>
            <p className="text-indigo-100">Complete topic-wise breakdown with 2000+ concepts</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">540</div>
            <div className="text-sm text-indigo-100">Total Marks</div>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="mt-4 bg-white/10 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Overall Progress</span>
            <span className="font-bold">68%</span>
          </div>
          <Progress value={68} className="h-2 bg-white/20" />
        </div>
      </div>

      {/* Subject Tabs */}
      <Tabs value={activeSubject} onValueChange={setActiveSubject} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {syllabusData.map((subject) => (
            <TabsTrigger 
              key={subject.id} 
              value={subject.id}
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-lg py-3"
            >
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                <span className="font-medium">{subject.name}</span>
                <Badge variant="outline" className="ml-1">
                  {subject.totalMarks}
                </Badge>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {syllabusData.map((subject) => (
          <TabsContent key={subject.id} value={subject.id} className="space-y-6">
            {/* Subject Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-900">
                    {subject.topics.reduce((sum, topic) => sum + topic.totalConcepts, 0)}
                  </div>
                  <div className="text-sm text-blue-700">Total Concepts</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-900">
                    {subject.topics.reduce((sum, topic) => sum + topic.masteredConcepts, 0)}
                  </div>
                  <div className="text-sm text-green-700">Mastered</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-900">{subject.overallProgress}%</div>
                  <div className="text-sm text-purple-700">Progress</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold text-orange-900">{subject.totalMarks}</div>
                  <div className="text-sm text-orange-700">Total Marks</div>
                </CardContent>
              </Card>
            </div>

            {/* Topics List */}
            <div className="space-y-4">
              {subject.topics.map((topic) => (
                <Card key={topic.id} className="border-2 hover:border-indigo-200 transition-colors">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleTopicExpansion(topic.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{topic.name}</CardTitle>
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                            {topic.weightage}% weightage
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            {topic.masteredConcepts}/{topic.totalConcepts} mastered
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                        
                        {/* Topic Progress */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span className="font-medium">{topic.progress}%</span>
                            </div>
                            <Progress value={topic.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          expandedTopic === topic.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </CardHeader>

                  {/* Expanded Concepts */}
                  {expandedTopic === topic.id && (
                    <CardContent className="pt-0">
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-4 text-gray-900">Concept Breakdown</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {topic.concepts.map((concept) => (
                            <Card 
                              key={concept.id} 
                              className={`border-l-4 ${
                                concept.mastered ? 'border-l-green-500 bg-green-50/50' : 'border-l-orange-500 bg-orange-50/50'
                              } hover:shadow-md transition-shadow`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-900 mb-1">{concept.title}</h5>
                                    <p className="text-sm text-gray-600 mb-2">{concept.description}</p>
                                    
                                    {/* Concept Badges */}
                                    <div className="flex gap-2 mb-3">
                                      <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                                        {concept.difficulty}
                                      </Badge>
                                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                        {concept.weightage}% marks
                                      </Badge>
                                      {concept.mastered && (
                                        <Badge className="bg-green-500 text-white">
                                          <CheckCircle className="h-3 w-3 mr-1" />
                                          Mastered
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Concept Progress */}
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Understanding</span>
                                    <span className="font-medium">{concept.progress}%</span>
                                  </div>
                                  <Progress value={concept.progress} className="h-1.5" />
                                </div>

                                {/* Concept Stats */}
                                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                                  <div className="text-center bg-blue-50 rounded p-2">
                                    <div className="font-bold text-blue-900">{concept.flashcardCount}</div>
                                    <div className="text-blue-700">Flashcards</div>
                                  </div>
                                  <div className="text-center bg-purple-50 rounded p-2">
                                    <div className="font-bold text-purple-900">{concept.examQuestions}</div>
                                    <div className="text-purple-700">Questions</div>
                                  </div>
                                  <div className="text-center bg-orange-50 rounded p-2">
                                    <div className="font-bold text-orange-900">{concept.estimatedTime}m</div>
                                    <div className="text-orange-700">Est. Time</div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-3 gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleConceptClick(concept.id)}
                                    className="text-xs"
                                  >
                                    <BookOpen className="h-3 w-3 mr-1" />
                                    Study
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleFlashcardClick(concept.id)}
                                    className="text-xs"
                                  >
                                    <Brain className="h-3 w-3 mr-1" />
                                    Cards
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleExamClick(concept.id)}
                                    className="text-xs"
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    Test
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Premium Features Banner */}
      <Card className="mt-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">🚀 Premium NEET 2026 Features</h3>
              <p className="text-violet-100">
                AI-powered study plans • Concept mastery tracking • Adaptive difficulty • Performance analytics
              </p>
            </div>
            <Button variant="secondary" className="bg-white text-violet-600 hover:bg-gray-100">
              <Star className="h-4 w-4 mr-2" />
              Explore Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    </SharedPageLayout>
  );
};

export default ExamSyllabusPage;
