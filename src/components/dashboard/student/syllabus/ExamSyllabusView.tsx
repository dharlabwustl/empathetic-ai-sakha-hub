
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, ClipboardList, ChevronRight, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExamSyllabusView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('physics');

  // Mock data for NEET 2026 syllabus with progress and weightage
  const syllabusData = {
    physics: {
      name: "Physics",
      totalWeightage: 45,
      overallProgress: 68,
      topics: [
        {
          id: 1,
          name: "Mechanics",
          weightage: 15,
          progress: 75,
          conceptsCompleted: 8,
          totalConcepts: 12,
          concepts: [
            { id: 1, name: "Laws of Motion", mastery: 85, completed: true },
            { id: 2, name: "Work, Energy and Power", mastery: 92, completed: true },
            { id: 3, name: "Rotational Motion", mastery: 60, completed: false },
            { id: 4, name: "Gravitation", mastery: 78, completed: true }
          ]
        },
        {
          id: 2,
          name: "Thermodynamics",
          weightage: 8,
          progress: 45,
          conceptsCompleted: 3,
          totalConcepts: 8,
          concepts: [
            { id: 5, name: "Kinetic Theory", mastery: 70, completed: true },
            { id: 6, name: "Thermodynamic Processes", mastery: 40, completed: false },
            { id: 7, name: "Heat Engines", mastery: 25, completed: false }
          ]
        },
        {
          id: 3,
          name: "Optics",
          weightage: 12,
          progress: 80,
          conceptsCompleted: 6,
          totalConcepts: 8,
          concepts: [
            { id: 8, name: "Ray Optics", mastery: 88, completed: true },
            { id: 9, name: "Wave Optics", mastery: 72, completed: true },
            { id: 10, name: "Optical Instruments", mastery: 65, completed: false }
          ]
        },
        {
          id: 4,
          name: "Modern Physics",
          weightage: 10,
          progress: 55,
          conceptsCompleted: 4,
          totalConcepts: 9,
          concepts: [
            { id: 11, name: "Photoelectric Effect", mastery: 90, completed: true },
            { id: 12, name: "Atomic Structure", mastery: 45, completed: false },
            { id: 13, name: "Nuclear Physics", mastery: 30, completed: false }
          ]
        }
      ]
    },
    chemistry: {
      name: "Chemistry",
      totalWeightage: 45,
      overallProgress: 72,
      topics: [
        {
          id: 5,
          name: "Organic Chemistry",
          weightage: 20,
          progress: 65,
          conceptsCompleted: 12,
          totalConcepts: 18,
          concepts: [
            { id: 14, name: "Hydrocarbons", mastery: 85, completed: true },
            { id: 15, name: "Alcohols and Ethers", mastery: 70, completed: true },
            { id: 16, name: "Aldehydes and Ketones", mastery: 55, completed: false }
          ]
        },
        {
          id: 6,
          name: "Inorganic Chemistry",
          weightage: 15,
          progress: 78,
          conceptsCompleted: 10,
          totalConcepts: 14,
          concepts: [
            { id: 17, name: "Periodic Table", mastery: 95, completed: true },
            { id: 18, name: "Chemical Bonding", mastery: 82, completed: true },
            { id: 19, name: "Coordination Compounds", mastery: 60, completed: false }
          ]
        },
        {
          id: 7,
          name: "Physical Chemistry",
          weightage: 10,
          progress: 82,
          conceptsCompleted: 8,
          totalConcepts: 10,
          concepts: [
            { id: 20, name: "Chemical Kinetics", mastery: 88, completed: true },
            { id: 21, name: "Electrochemistry", mastery: 76, completed: true },
            { id: 22, name: "Surface Chemistry", mastery: 65, completed: false }
          ]
        }
      ]
    },
    biology: {
      name: "Biology",
      totalWeightage: 90,
      overallProgress: 58,
      topics: [
        {
          id: 8,
          name: "Cell Biology",
          weightage: 15,
          progress: 70,
          conceptsCompleted: 7,
          totalConcepts: 10,
          concepts: [
            { id: 23, name: "Cell Structure", mastery: 85, completed: true },
            { id: 24, name: "Cell Division", mastery: 75, completed: true },
            { id: 25, name: "Biomolecules", mastery: 50, completed: false }
          ]
        },
        {
          id: 9,
          name: "Genetics",
          weightage: 20,
          progress: 45,
          conceptsCompleted: 6,
          totalConcepts: 15,
          concepts: [
            { id: 26, name: "Mendel's Laws", mastery: 80, completed: true },
            { id: 27, name: "Molecular Genetics", mastery: 35, completed: false },
            { id: 28, name: "Biotechnology", mastery: 25, completed: false }
          ]
        },
        {
          id: 10,
          name: "Plant Physiology",
          weightage: 25,
          progress: 62,
          conceptsCompleted: 10,
          totalConcepts: 16,
          concepts: [
            { id: 29, name: "Photosynthesis", mastery: 90, completed: true },
            { id: 30, name: "Respiration", mastery: 78, completed: true },
            { id: 31, name: "Plant Hormones", mastery: 40, completed: false }
          ]
        },
        {
          id: 11,
          name: "Human Physiology",
          weightage: 30,
          progress: 55,
          conceptsCompleted: 12,
          totalConcepts: 22,
          concepts: [
            { id: 32, name: "Digestive System", mastery: 82, completed: true },
            { id: 33, name: "Circulatory System", mastery: 68, completed: true },
            { id: 34, name: "Nervous System", mastery: 45, completed: false }
          ]
        }
      ]
    }
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return "text-green-600";
    if (mastery >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getMasteryBadgeColor = (mastery: number) => {
    if (mastery >= 80) return "bg-green-100 text-green-800";
    if (mastery >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const currentSubject = syllabusData[selectedSubject as keyof typeof syllabusData];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">NEET 2026 Exam Syllabus</h1>
          <p className="text-muted-foreground">Complete syllabus breakdown with concept mastery tracking</p>
        </div>

        {/* Overall Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(syllabusData).map(([key, subject]) => (
            <Card key={key} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{subject.name}</h3>
                  <Badge variant="outline">{subject.totalWeightage} marks</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{subject.overallProgress}%</span>
                  </div>
                  <Progress value={subject.overallProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Subject Tabs */}
      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedSubject} className="space-y-6">
          {/* Subject Header */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Target className="h-6 w-6 text-blue-600" />
                    {currentSubject.name}
                  </h2>
                  <p className="text-muted-foreground">Total Weightage: {currentSubject.totalWeightage} marks</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Overall Mastery</span>
                    <span className="text-sm font-bold">{currentSubject.overallProgress}%</span>
                  </div>
                  <Progress value={currentSubject.overallProgress} className="h-3 w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Topics */}
          <div className="space-y-6">
            {currentSubject.topics.map((topic, topicIndex) => (
              <Card key={topic.id} className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          {topicIndex + 1}. {topic.name}
                        </span>
                        <Badge variant="secondary">{topic.weightage} marks</Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {topic.conceptsCompleted} of {topic.totalConcepts} concepts mastered
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">Topic Progress</span>
                        <span className="text-sm font-bold">{topic.progress}%</span>
                      </div>
                      <Progress value={topic.progress} className="h-2 w-[150px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {topic.concepts.map((concept, conceptIndex) => (
                      <div key={concept.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-sm">
                            {topicIndex + 1}.{conceptIndex + 1} {concept.name}
                          </h4>
                          <Badge 
                            className={`text-xs ${getMasteryBadgeColor(concept.mastery)}`}
                            variant="secondary"
                          >
                            {concept.mastery}% mastery
                          </Badge>
                        </div>
                        
                        <Progress value={concept.mastery} className="h-1.5 mb-3" />
                        
                        <div className="flex flex-wrap gap-2">
                          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                            <Link to={`/dashboard/student/concepts/${concept.id}`}>
                              <BookOpen className="h-3 w-3 mr-1" />
                              Learn
                            </Link>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                            <Link to={`/dashboard/student/flashcards?concept=${concept.id}`}>
                              <Brain className="h-3 w-3 mr-1" />
                              Cards
                            </Link>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                            <Link to={`/dashboard/student/practice-exam?concept=${concept.id}`}>
                              <ClipboardList className="h-3 w-3 mr-1" />
                              Test
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
      </Tabs>
    </div>
  );
};

export default ExamSyllabusView;
