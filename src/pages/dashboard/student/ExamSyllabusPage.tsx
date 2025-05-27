
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Circle, Star, Trophy, Target, BookOpen, Clock, Award, Crown, Zap } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';

const ExamSyllabusPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('physics');

  const syllabusData = {
    physics: {
      title: "Physics - NEET 2026",
      totalTopics: 97,
      completedTopics: 45,
      weightage: "25%",
      chapters: [
        {
          id: 1,
          title: "Physical World and Measurement",
          topics: [
            { name: "Physics scope and nature", completed: true, difficulty: "Easy", weightage: "2%" },
            { name: "Units and Dimensions", completed: true, difficulty: "Medium", weightage: "3%" },
            { name: "Errors in Measurement", completed: false, difficulty: "Medium", weightage: "2%" }
          ]
        },
        {
          id: 2,
          title: "Kinematics",
          topics: [
            { name: "Motion in a straight line", completed: true, difficulty: "Medium", weightage: "4%" },
            { name: "Motion in a plane", completed: false, difficulty: "Hard", weightage: "5%" },
            { name: "Projectile Motion", completed: false, difficulty: "Hard", weightage: "4%" }
          ]
        },
        {
          id: 3,
          title: "Laws of Motion",
          topics: [
            { name: "Newton's Laws", completed: true, difficulty: "Medium", weightage: "5%" },
            { name: "Friction", completed: false, difficulty: "Medium", weightage: "3%" },
            { name: "Circular Motion", completed: false, difficulty: "Hard", weightage: "4%" }
          ]
        }
      ]
    },
    chemistry: {
      title: "Chemistry - NEET 2026",
      totalTopics: 105,
      completedTopics: 52,
      weightage: "25%",
      chapters: [
        {
          id: 1,
          title: "Some Basic Concepts of Chemistry",
          topics: [
            { name: "Matter and its Classification", completed: true, difficulty: "Easy", weightage: "2%" },
            { name: "Atomic and Molecular Masses", completed: true, difficulty: "Medium", weightage: "3%" },
            { name: "Mole Concept", completed: false, difficulty: "Hard", weightage: "4%" }
          ]
        },
        {
          id: 2,
          title: "Structure of Atom",
          topics: [
            { name: "Discovery of Electron, Proton and Neutron", completed: true, difficulty: "Easy", weightage: "2%" },
            { name: "Atomic Models", completed: false, difficulty: "Medium", weightage: "4%" },
            { name: "Electronic Configuration", completed: false, difficulty: "Hard", weightage: "5%" }
          ]
        }
      ]
    },
    biology: {
      title: "Biology - NEET 2026",
      totalTopics: 128,
      completedTopics: 67,
      weightage: "50%",
      chapters: [
        {
          id: 1,
          title: "The Living World",
          topics: [
            { name: "What is Living?", completed: true, difficulty: "Easy", weightage: "1%" },
            { name: "Biodiversity", completed: true, difficulty: "Medium", weightage: "2%" },
            { name: "Need for Classification", completed: false, difficulty: "Easy", weightage: "1%" }
          ]
        },
        {
          id: 2,
          title: "Biological Classification",
          topics: [
            { name: "Five Kingdom Classification", completed: true, difficulty: "Medium", weightage: "3%" },
            { name: "Kingdom Monera", completed: false, difficulty: "Hard", weightage: "4%" },
            { name: "Kingdom Protista", completed: false, difficulty: "Medium", weightage: "3%" }
          ]
        }
      ]
    }
  };

  const currentSubject = syllabusData[selectedSubject as keyof typeof syllabusData];
  const completionPercentage = Math.round((currentSubject.completedTopics / currentSubject.totalTopics) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <MainLayout>
      <div className="container py-8 space-y-8">
        {/* Premium Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Crown className="h-8 w-8 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">NEET 2026 Syllabus</h1>
                <p className="text-indigo-100 text-lg">Complete Premium Study Guide</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-green-300" />
                  <span className="text-sm font-medium">Total Progress</span>
                </div>
                <div className="text-2xl font-bold">164/330</div>
                <div className="text-sm text-indigo-200">Topics Completed</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm font-medium">Study Streak</span>
                </div>
                <div className="text-2xl font-bold">15 Days</div>
                <div className="text-sm text-indigo-200">Keep it up!</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-300" />
                  <span className="text-sm font-medium">Time to Exam</span>
                </div>
                <div className="text-2xl font-bold">387 Days</div>
                <div className="text-sm text-indigo-200">Stay focused!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Navigation */}
        <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
          <TabsList className="grid w-full grid-cols-3 p-1 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm">
            <TabsTrigger 
              value="physics" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Physics
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="chemistry"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Chemistry
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="biology"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Biology
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Subject Overview Card */}
          <div className="mt-6">
            <Card className="border-2 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">{currentSubject.title}</CardTitle>
                      <p className="text-muted-foreground">Exam Weightage: {currentSubject.weightage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300">
                      <Star className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-3xl font-bold text-blue-600">{currentSubject.totalTopics}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Total Topics</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-3xl font-bold text-green-600">{currentSubject.completedTopics}</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="text-3xl font-bold text-purple-600">{completionPercentage}%</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Progress</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-muted-foreground">{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-3 bg-gradient-to-r from-gray-200 to-gray-300" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chapter Content */}
          {Object.entries(syllabusData).map(([key, subject]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="space-y-4">
                {subject.chapters.map((chapter) => (
                  <Card key={chapter.id} className="border-l-4 border-l-indigo-500 shadow-md hover:shadow-lg transition-shadow duration-200 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {chapter.id}
                          </div>
                          {chapter.title}
                        </CardTitle>
                        <Button variant="outline" size="sm" className="border-indigo-200 hover:bg-indigo-50">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Study Now
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {chapter.topics.map((topic, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                              {topic.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <Circle className="h-5 w-5 text-gray-400" />
                              )}
                              <span className={`font-medium ${topic.completed ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                                {topic.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs font-medium">
                                {topic.weightage}
                              </Badge>
                              <Badge variant="outline" className={`text-xs ${getDifficultyColor(topic.difficulty)}`}>
                                {topic.difficulty}
                              </Badge>
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

        {/* Premium Features Banner */}
        <Card className="border-2 border-gradient-to-r from-yellow-200 to-orange-200 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Premium NEET 2026 Features</h3>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Get AI-powered study recommendations, detailed analytics, and personalized revision schedules
                </p>
              </div>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                <Star className="h-4 w-4 mr-2" />
                Explore Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ExamSyllabusPage;
