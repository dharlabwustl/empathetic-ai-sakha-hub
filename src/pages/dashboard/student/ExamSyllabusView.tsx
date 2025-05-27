
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award,
  Brain,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Concept {
  id: string;
  name: string;
  mastery: number;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  expectedMarks: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface Topic {
  id: string;
  name: string;
  weightage: number;
  expectedMarks: number;
  overallMastery: number;
  concepts: Concept[];
}

interface Subject {
  id: string;
  name: string;
  totalMarks: number;
  expectedMarks: number;
  overallMastery: number;
  topics: Topic[];
}

const ExamSyllabusView: React.FC = () => {
  const navigate = useNavigate();
  const [activeSubject, setActiveSubject] = useState('physics');

  const syllabusData: Subject[] = [
    {
      id: 'physics',
      name: 'Physics',
      totalMarks: 180,
      expectedMarks: 145,
      overallMastery: 72,
      topics: [
        {
          id: 'mechanics',
          name: 'Mechanics',
          weightage: 25,
          expectedMarks: 36,
          overallMastery: 78,
          concepts: [
            {
              id: 'newtons-laws',
              name: "Newton's Laws of Motion",
              mastery: 85,
              timeSpent: 120,
              difficulty: 'medium',
              expectedMarks: 8,
              status: 'completed'
            },
            {
              id: 'work-energy',
              name: 'Work and Energy',
              mastery: 70,
              timeSpent: 90,
              difficulty: 'medium',
              expectedMarks: 10,
              status: 'in-progress'
            },
            {
              id: 'rotational-motion',
              name: 'Rotational Motion',
              mastery: 45,
              timeSpent: 60,
              difficulty: 'hard',
              expectedMarks: 12,
              status: 'in-progress'
            }
          ]
        },
        {
          id: 'thermodynamics',
          name: 'Thermodynamics',
          weightage: 20,
          expectedMarks: 29,
          overallMastery: 65,
          concepts: [
            {
              id: 'heat-temperature',
              name: 'Heat and Temperature',
              mastery: 80,
              timeSpent: 75,
              difficulty: 'easy',
              expectedMarks: 6,
              status: 'completed'
            },
            {
              id: 'laws-thermodynamics',
              name: 'Laws of Thermodynamics',
              mastery: 55,
              timeSpent: 85,
              difficulty: 'hard',
              expectedMarks: 15,
              status: 'in-progress'
            }
          ]
        },
        {
          id: 'optics',
          name: 'Optics',
          weightage: 15,
          expectedMarks: 22,
          overallMastery: 40,
          concepts: [
            {
              id: 'ray-optics',
              name: 'Ray Optics',
              mastery: 30,
              timeSpent: 45,
              difficulty: 'medium',
              expectedMarks: 8,
              status: 'not-started'
            },
            {
              id: 'wave-optics',
              name: 'Wave Optics',
              mastery: 50,
              timeSpent: 70,
              difficulty: 'hard',
              expectedMarks: 14,
              status: 'in-progress'
            }
          ]
        }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      totalMarks: 180,
      expectedMarks: 135,
      overallMastery: 68,
      topics: [
        {
          id: 'organic',
          name: 'Organic Chemistry',
          weightage: 30,
          expectedMarks: 40,
          overallMastery: 75,
          concepts: [
            {
              id: 'hydrocarbons',
              name: 'Hydrocarbons',
              mastery: 80,
              timeSpent: 100,
              difficulty: 'medium',
              expectedMarks: 12,
              status: 'completed'
            },
            {
              id: 'functional-groups',
              name: 'Functional Groups',
              mastery: 70,
              timeSpent: 95,
              difficulty: 'hard',
              expectedMarks: 15,
              status: 'in-progress'
            }
          ]
        }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      totalMarks: 180,
      expectedMarks: 155,
      overallMastery: 80,
      topics: [
        {
          id: 'cell-biology',
          name: 'Cell Biology',
          weightage: 25,
          expectedMarks: 39,
          overallMastery: 85,
          concepts: [
            {
              id: 'cell-structure',
              name: 'Cell Structure and Function',
              mastery: 90,
              timeSpent: 80,
              difficulty: 'medium',
              expectedMarks: 10,
              status: 'completed'
            },
            {
              id: 'cell-division',
              name: 'Cell Division',
              mastery: 80,
              timeSpent: 70,
              difficulty: 'medium',
              expectedMarks: 8,
              status: 'completed'
            }
          ]
        }
      ]
    }
  ];

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-green-600';
    if (mastery >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMasteryBgColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-green-500';
    if (mastery >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="outline" className="text-green-600 border-green-200">Easy</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Medium</Badge>;
      case 'hard':
        return <Badge variant="outline" className="text-red-600 border-red-200">Hard</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">NEET Exam Syllabus</h1>
          <p className="text-muted-foreground">Track your progress across all subjects and topics</p>
        </div>

        {/* Subject Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {syllabusData.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Marks</span>
                  <span className="font-semibold">{subject.totalMarks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expected Marks</span>
                  <span className="font-semibold text-green-600">{subject.expectedMarks}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Overall Mastery</span>
                    <span className={`font-semibold ${getMasteryColor(subject.overallMastery)}`}>
                      {subject.overallMastery}%
                    </span>
                  </div>
                  <Progress value={subject.overallMastery} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Subject View */}
        <Tabs value={activeSubject} onValueChange={setActiveSubject}>
          <TabsList className="grid w-full grid-cols-3">
            {syllabusData.map((subject) => (
              <TabsTrigger key={subject.id} value={subject.id}>
                {subject.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {syllabusData.map((subject) => (
            <TabsContent key={subject.id} value={subject.id} className="space-y-6">
              {subject.topics.map((topic) => (
                <Card key={topic.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{topic.name}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            <span>Weightage: {topic.weightage}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>Expected: {topic.expectedMarks} marks</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className={`text-2xl font-bold ${getMasteryColor(topic.overallMastery)}`}>
                          {topic.overallMastery}%
                        </div>
                        <Progress value={topic.overallMastery} className="w-24" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {topic.concepts.map((concept) => (
                        <div
                          key={concept.id}
                          className="p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer group"
                          onClick={() => handleConceptClick(concept.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium group-hover:text-blue-600 transition-colors">
                                  {concept.name}
                                </h4>
                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                              </div>
                              
                              <div className="flex items-center gap-4 flex-wrap">
                                {getStatusBadge(concept.status)}
                                {getDifficultyBadge(concept.difficulty)}
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{concept.timeSpent}min</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Star className="h-4 w-4" />
                                  <span>{concept.expectedMarks} marks</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-muted-foreground">Concept Mastery</span>
                                  <span className={`font-semibold ${getMasteryColor(concept.mastery)}`}>
                                    {concept.mastery}%
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress value={concept.mastery} className="flex-1 h-2" />
                                  <div className="flex items-center gap-1">
                                    <Brain className="h-4 w-4 text-purple-500" />
                                    <span className="text-xs font-medium">
                                      {concept.mastery >= 80 ? 'Expert' : 
                                       concept.mastery >= 60 ? 'Good' : 
                                       concept.mastery >= 40 ? 'Learning' : 'Beginner'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Topic Progress</span>
                        <div className="flex items-center gap-2">
                          <Progress value={topic.overallMastery} className="w-32" />
                          <span className={`font-semibold ${getMasteryColor(topic.overallMastery)}`}>
                            {topic.overallMastery}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ExamSyllabusView;
