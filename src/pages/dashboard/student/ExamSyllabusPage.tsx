
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award, 
  Calendar,
  ChevronRight,
  Star,
  Brain,
  Zap,
  CheckCircle2
} from "lucide-react";
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock data for the syllabus
const syllabusData = {
  physics: {
    name: "Physics",
    totalMarks: 180,
    expectedMarks: 145,
    weightage: 45,
    overallProgress: 68,
    overallMastery: 72,
    units: [
      {
        id: 1,
        name: "Mechanics",
        weightage: 25,
        progress: 75,
        mastery: 80,
        concepts: [
          { 
            id: 1, 
            name: "Newton's Laws of Motion", 
            progress: 85, 
            mastery: 90,
            status: "mastered",
            difficulty: "medium"
          },
          { 
            id: 2, 
            name: "Work Energy Power", 
            progress: 70, 
            mastery: 75,
            status: "good",
            difficulty: "medium"
          },
          { 
            id: 3, 
            name: "Rotational Motion", 
            progress: 45, 
            mastery: 50,
            status: "needs-work",
            difficulty: "hard"
          }
        ]
      },
      {
        id: 2,
        name: "Thermodynamics",
        weightage: 20,
        progress: 60,
        mastery: 65,
        concepts: [
          { 
            id: 4, 
            name: "First Law of Thermodynamics", 
            progress: 80, 
            mastery: 85,
            status: "mastered",
            difficulty: "medium"
          },
          { 
            id: 5, 
            name: "Heat Engines", 
            progress: 40, 
            mastery: 45,
            status: "needs-work",
            difficulty: "hard"
          }
        ]
      }
    ]
  },
  chemistry: {
    name: "Chemistry",
    totalMarks: 180,
    expectedMarks: 140,
    weightage: 45,
    overallProgress: 62,
    overallMastery: 67,
    units: [
      {
        id: 3,
        name: "Organic Chemistry",
        weightage: 35,
        progress: 55,
        mastery: 60,
        concepts: [
          { 
            id: 6, 
            name: "Hydrocarbons", 
            progress: 70, 
            mastery: 75,
            status: "good",
            difficulty: "medium"
          },
          { 
            id: 7, 
            name: "Alcohols and Ethers", 
            progress: 40, 
            mastery: 45,
            status: "needs-work",
            difficulty: "hard"
          }
        ]
      }
    ]
  },
  biology: {
    name: "Biology",
    totalMarks: 360,
    expectedMarks: 290,
    weightage: 50,
    overallProgress: 71,
    overallMastery: 74,
    units: [
      {
        id: 4,
        name: "Human Physiology",
        weightage: 30,
        progress: 80,
        mastery: 85,
        concepts: [
          { 
            id: 8, 
            name: "Circulation", 
            progress: 90, 
            mastery: 95,
            status: "mastered",
            difficulty: "medium"
          },
          { 
            id: 9, 
            name: "Respiration", 
            progress: 70, 
            mastery: 75,
            status: "good",
            difficulty: "medium"
          }
        ]
      }
    ]
  }
};

const getMasteryColor = (mastery: number) => {
  if (mastery >= 80) return "text-green-600 bg-green-50";
  if (mastery >= 60) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};

const getMasteryIcon = (status: string) => {
  switch (status) {
    case "mastered":
      return <Award className="h-4 w-4 text-green-600" />;
    case "good":
      return <CheckCircle2 className="h-4 w-4 text-yellow-600" />;
    default:
      return <Brain className="h-4 w-4 text-red-600" />;
  }
};

const ExamSyllabusPage = () => {
  const [activeSubject, setActiveSubject] = useState('physics');

  const currentSubject = syllabusData[activeSubject as keyof typeof syllabusData];

  return (
    <SharedPageLayout
      title="NEET 2024 Syllabus"
      subtitle="Complete syllabus breakdown with progress tracking and mastery levels"
    >
      <div className="space-y-6">
        {/* Subject Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(syllabusData).map(([key, subject]) => (
            <Card 
              key={key} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                activeSubject === key ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => setActiveSubject(key)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{subject.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {subject.weightage}% weightage
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  {subject.expectedMarks}/{subject.totalMarks} marks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{subject.overallProgress}%</span>
                  </div>
                  <Progress value={subject.overallProgress} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mastery</span>
                    <span className={`font-medium ${getMasteryColor(subject.overallMastery).split(' ')[0]}`}>
                      {subject.overallMastery}%
                    </span>
                  </div>
                  <Progress 
                    value={subject.overallMastery} 
                    className="h-2"
                    indicatorClassName={subject.overallMastery >= 80 ? "bg-green-500" : 
                                     subject.overallMastery >= 60 ? "bg-yellow-500" : "bg-red-500"}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Subject View */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {currentSubject.name} - Detailed Syllabus
                </CardTitle>
                <CardDescription className="mt-1">
                  Track your progress and mastery for each topic and concept
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {currentSubject.overallProgress}% Complete
                </Badge>
                <Badge className={getMasteryColor(currentSubject.overallMastery)}>
                  {currentSubject.overallMastery}% Mastery
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentSubject.units.map((unit) => (
                <div key={unit.id} className="border rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white">
                  {/* Unit Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        {unit.name}
                        <Badge variant="outline" className="text-xs">
                          {unit.weightage}% weightage
                        </Badge>
                      </h3>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-blue-600">{unit.progress}%</div>
                        <div className="text-gray-500">Progress</div>
                      </div>
                      <div className="text-center">
                        <div className={`font-medium ${getMasteryColor(unit.mastery).split(' ')[0]}`}>
                          {unit.mastery}%
                        </div>
                        <div className="text-gray-500">Mastery</div>
                      </div>
                    </div>
                  </div>

                  {/* Unit Progress Bars */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Unit Progress</span>
                        <span className="font-medium">{unit.progress}%</span>
                      </div>
                      <Progress value={unit.progress} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Unit Mastery</span>
                        <span className={`font-medium ${getMasteryColor(unit.mastery).split(' ')[0]}`}>
                          {unit.mastery}%
                        </span>
                      </div>
                      <Progress 
                        value={unit.mastery} 
                        className="h-3"
                        indicatorClassName={unit.mastery >= 80 ? "bg-green-500" : 
                                         unit.mastery >= 60 ? "bg-yellow-500" : "bg-red-500"}
                      />
                    </div>
                  </div>

                  {/* Concepts */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700 mb-3">Concepts:</h4>
                    {unit.concepts.map((concept) => (
                      <div 
                        key={concept.id} 
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {getMasteryIcon(concept.status)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{concept.name}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  concept.difficulty === 'hard' ? 'border-red-200 text-red-700' :
                                  concept.difficulty === 'medium' ? 'border-yellow-200 text-yellow-700' :
                                  'border-green-200 text-green-700'
                                }`}
                              >
                                {concept.difficulty}
                              </Badge>
                            </div>
                            
                            {/* Concept Progress Bars */}
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-500">Progress</span>
                                  <span className="font-medium">{concept.progress}%</span>
                                </div>
                                <Progress value={concept.progress} className="h-1.5" />
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-500">Mastery</span>
                                  <span className={`font-medium ${getMasteryColor(concept.mastery).split(' ')[0]}`}>
                                    {concept.mastery}%
                                  </span>
                                </div>
                                <Progress 
                                  value={concept.mastery} 
                                  className="h-1.5"
                                  indicatorClassName={concept.mastery >= 80 ? "bg-green-500" : 
                                                   concept.mastery >= 60 ? "bg-yellow-500" : "bg-red-500"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/dashboard/student/concepts/${concept.id}`}>
                              <Brain className="h-4 w-4 mr-1" />
                              Study
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/dashboard/student/flashcards/${concept.id}`}>
                              <Zap className="h-4 w-4 mr-1" />
                              Practice
                            </Link>
                          </Button>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Quick Actions for {currentSubject.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                  <Link to={`/dashboard/student/practice-exam`}>
                    <Target className="h-4 w-4 mr-2" />
                    Take Practice Test
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to={`/dashboard/student/concepts`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Study Concepts
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to={`/dashboard/student/previous-year-analysis`}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Previous Year Analysis
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default ExamSyllabusPage;
