
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Play,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ExamSyllabusPage = () => {
  const [activeSubject, setActiveSubject] = useState('physics');

  // Mock data for subjects
  const subjects = {
    physics: {
      name: 'Physics',
      totalTopics: 12,
      completedTopics: 7,
      progress: 58,
      expectedMarks: 180,
      weightage: '25%',
      topics: [
        {
          id: 1,
          name: 'Mechanics',
          progress: 85,
          weightage: '20%',
          expectedMarks: 36,
          concepts: [
            { id: 1, name: 'Laws of Motion', progress: 90, mastery: 'high' },
            { id: 2, name: 'Work, Energy & Power', progress: 80, mastery: 'medium' },
            { id: 3, name: 'Rotational Motion', progress: 85, mastery: 'high' },
          ]
        },
        {
          id: 2,
          name: 'Thermodynamics',
          progress: 72,
          weightage: '15%',
          expectedMarks: 27,
          concepts: [
            { id: 4, name: 'Heat and Temperature', progress: 75, mastery: 'medium' },
            { id: 5, name: 'Laws of Thermodynamics', progress: 70, mastery: 'medium' },
            { id: 6, name: 'Heat Engines', progress: 65, mastery: 'low' },
          ]
        },
        {
          id: 3,
          name: 'Optics',
          progress: 45,
          weightage: '18%',
          expectedMarks: 32,
          concepts: [
            { id: 7, name: 'Ray Optics', progress: 60, mastery: 'medium' },
            { id: 8, name: 'Wave Optics', progress: 30, mastery: 'low' },
            { id: 9, name: 'Optical Instruments', progress: 40, mastery: 'low' },
          ]
        }
      ]
    },
    chemistry: {
      name: 'Chemistry',
      totalTopics: 10,
      completedTopics: 6,
      progress: 60,
      expectedMarks: 180,
      weightage: '25%',
      topics: [
        {
          id: 1,
          name: 'Organic Chemistry',
          progress: 78,
          weightage: '35%',
          expectedMarks: 63,
          concepts: [
            { id: 1, name: 'Hydrocarbons', progress: 85, mastery: 'high' },
            { id: 2, name: 'Alcohols & Ethers', progress: 75, mastery: 'medium' },
            { id: 3, name: 'Carbonyl Compounds', progress: 70, mastery: 'medium' },
          ]
        },
        {
          id: 2,
          name: 'Physical Chemistry',
          progress: 65,
          weightage: '30%',
          expectedMarks: 54,
          concepts: [
            { id: 4, name: 'Chemical Kinetics', progress: 70, mastery: 'medium' },
            { id: 5, name: 'Electrochemistry', progress: 60, mastery: 'medium' },
            { id: 6, name: 'Solutions', progress: 65, mastery: 'medium' },
          ]
        }
      ]
    },
    biology: {
      name: 'Biology',
      totalTopics: 14,
      completedTopics: 8,
      progress: 57,
      expectedMarks: 360,
      weightage: '50%',
      topics: [
        {
          id: 1,
          name: 'Human Physiology',
          progress: 82,
          weightage: '25%',
          expectedMarks: 90,
          concepts: [
            { id: 1, name: 'Circulation', progress: 90, mastery: 'high' },
            { id: 2, name: 'Respiration', progress: 85, mastery: 'high' },
            { id: 3, name: 'Excretion', progress: 70, mastery: 'medium' },
          ]
        },
        {
          id: 2,
          name: 'Plant Biology',
          progress: 55,
          weightage: '20%',
          expectedMarks: 72,
          concepts: [
            { id: 4, name: 'Photosynthesis', progress: 65, mastery: 'medium' },
            { id: 5, name: 'Plant Reproduction', progress: 45, mastery: 'low' },
            { id: 6, name: 'Plant Hormones', progress: 55, mastery: 'medium' },
          ]
        }
      ]
    }
  };

  const getMasteryColor = (mastery) => {
    switch(mastery) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentSubject = subjects[activeSubject];
  const overallProgress = Object.values(subjects).reduce((acc, subject) => acc + subject.progress, 0) / Object.keys(subjects).length;

  return (
    <SharedPageLayout
      title="Exam Syllabus"
      subtitle="Complete curriculum breakdown with progress tracking and weightage"
    >
      <div className="space-y-6">
        {/* Overall Progress Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300">NEET 2024 Syllabus</h2>
                <p className="text-blue-700 dark:text-blue-400 mt-1">Complete curriculum coverage</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-300 mr-2">Overall Progress</span>
                  <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-3 w-[200px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Tabs */}
        <Tabs value={activeSubject} onValueChange={setActiveSubject}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="physics" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Physics
            </TabsTrigger>
            <TabsTrigger value="chemistry" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Chemistry
            </TabsTrigger>
            <TabsTrigger value="biology" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Biology
            </TabsTrigger>
          </TabsList>

          {Object.entries(subjects).map(([key, subject]) => (
            <TabsContent key={key} value={key} className="space-y-4 mt-6">
              {/* Subject Overview */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.completedTopics}/{subject.totalTopics} topics completed
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Weightage: {subject.weightage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Target className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium">Expected Marks</span>
                      </div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">
                        {subject.expectedMarks}
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium">Progress</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-400 mt-1">
                        {subject.progress}%
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="text-sm font-medium">Time Allocation</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-700 dark:text-purple-400 mt-1">
                        {subject.weightage}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subject Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Topics List */}
              <div className="space-y-4">
                {subject.topics.map((topic) => (
                  <Card key={topic.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{topic.name}</CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline" className="text-xs">
                              Weightage: {topic.weightage}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Expected: {topic.expectedMarks} marks
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{topic.progress}%</div>
                          <Progress value={topic.progress} className="h-2 w-20 mt-1" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Concepts List */}
                      <div className="space-y-3">
                        {topic.concepts.map((concept) => (
                          <div key={concept.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <BookOpen className="h-4 w-4 text-gray-500" />
                              <div>
                                <h5 className="font-medium">{concept.name}</h5>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${getMasteryColor(concept.mastery)}`}
                                  >
                                    {concept.mastery} mastery
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-sm font-medium">{concept.progress}%</div>
                                <Progress value={concept.progress} className="h-1 w-16 mt-1" />
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                asChild
                              >
                                <Link to={`/dashboard/student/concepts/${concept.id}`}>
                                  <Play className="h-3 w-3 mr-1" />
                                  Study
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-auto py-4 justify-start text-left">
            <Link to="/dashboard/student/concepts">
              <div>
                <div className="font-medium">Study Concepts</div>
                <div className="text-xs text-gray-500">Learn key topics</div>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 justify-start text-left">
            <Link to="/dashboard/student/flashcards">
              <div>
                <div className="font-medium">Practice Flashcards</div>
                <div className="text-xs text-gray-500">Quick revision</div>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 justify-start text-left">
            <Link to="/dashboard/student/practice-exam">
              <div>
                <div className="font-medium">Practice Tests</div>
                <div className="text-xs text-gray-500">Test knowledge</div>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4 justify-start text-left">
            <Link to="/dashboard/student/previous-year-analysis">
              <div>
                <div className="font-medium">Previous Papers</div>
                <div className="text-xs text-gray-500">Analyze patterns</div>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ExamSyllabusPage;
