import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StudyPlanBreakdown } from '@/components/dashboard/student/study-plan/StudyPlanBreakdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Download, Calendar, Clock, BookOpen, Target, TrendingUp, Lightbulb, Star } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

// Enhanced mock data with topic-wise weightage
const mockStudyPlan = {
  examName: "JEE Advanced",
  examDate: "2023-12-15",
  weeklyHours: 35,
  subjects: [
    {
      id: "physics",
      name: "Physics",
      color: "#8B5CF6",
      hoursPerWeek: 12,
      priority: "high" as const,
      proficiency: "medium" as const,
      weightage: 30,
      expectedMarks: 90,
      currentLevel: 65,
      topics: [
        { 
          id: "p1", 
          name: "Mechanics", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          weightage: 25,
          timeSpent: 45,
          estimatedTime: 50,
          subtopics: ["Kinematics", "Dynamics", "Work & Energy", "Rotational Motion"]
        },
        { 
          id: "p2", 
          name: "Thermodynamics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          weightage: 15,
          timeSpent: 20,
          estimatedTime: 35,
          subtopics: ["Laws of Thermodynamics", "Heat Engines", "Entropy"]
        },
        { 
          id: "p3", 
          name: "Electromagnetism", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 35,
          timeSpent: 0,
          estimatedTime: 60,
          subtopics: ["Electric Fields", "Magnetic Fields", "Electromagnetic Induction", "AC Circuits"]
        },
        { 
          id: "p4", 
          name: "Modern Physics", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 20,
          timeSpent: 0,
          estimatedTime: 40,
          subtopics: ["Photoelectric Effect", "Atomic Models", "Nuclear Physics"]
        },
        { 
          id: "p5", 
          name: "Optics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 5,
          timeSpent: 0,
          estimatedTime: 25,
          subtopics: ["Geometric Optics", "Wave Optics"]
        },
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      color: "#10B981",
      hoursPerWeek: 10,
      priority: "medium" as const,
      proficiency: "weak" as const,
      weightage: 25,
      expectedMarks: 75,
      currentLevel: 45,
      topics: [
        { 
          id: "c1", 
          name: "Physical Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "in-progress" as const,
          weightage: 40,
          timeSpent: 30,
          estimatedTime: 55,
          subtopics: ["Chemical Kinetics", "Thermochemistry", "Electrochemistry", "Solutions"]
        },
        { 
          id: "c2", 
          name: "Organic Chemistry", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 35,
          timeSpent: 0,
          estimatedTime: 50,
          subtopics: ["Hydrocarbons", "Functional Groups", "Biomolecules", "Polymers"]
        },
        { 
          id: "c3", 
          name: "Inorganic Chemistry", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 20,
          timeSpent: 10,
          estimatedTime: 35,
          subtopics: ["Coordination Compounds", "d-Block Elements", "p-Block Elements"]
        },
        { 
          id: "c4", 
          name: "Analytical Chemistry", 
          difficulty: "easy" as const, 
          completed: true, 
          status: "completed" as const,
          weightage: 5,
          timeSpent: 25,
          estimatedTime: 25,
          subtopics: ["Qualitative Analysis", "Quantitative Analysis"]
        },
      ]
    },
    {
      id: "mathematics",
      name: "Mathematics",
      color: "#F59E0B",
      hoursPerWeek: 13,
      priority: "high" as const,
      proficiency: "strong" as const,
      weightage: 45,
      expectedMarks: 120,
      currentLevel: 85,
      topics: [
        { 
          id: "m1", 
          name: "Calculus", 
          difficulty: "medium" as const, 
          completed: true, 
          status: "completed" as const,
          weightage: 30,
          timeSpent: 55,
          estimatedTime: 55,
          subtopics: ["Limits", "Derivatives", "Integrals", "Differential Equations"]
        },
        { 
          id: "m2", 
          name: "Algebra", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "in-progress" as const,
          weightage: 25,
          timeSpent: 40,
          estimatedTime: 50,
          subtopics: ["Complex Numbers", "Matrices", "Determinants", "Probability"]
        },
        { 
          id: "m3", 
          name: "Coordinate Geometry", 
          difficulty: "easy" as const, 
          completed: true, 
          status: "completed" as const,
          weightage: 20,
          timeSpent: 35,
          estimatedTime: 35,
          subtopics: ["2D Geometry", "3D Geometry", "Conic Sections"]
        },
        { 
          id: "m4", 
          name: "Trigonometry", 
          difficulty: "easy" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 15,
          timeSpent: 0,
          estimatedTime: 30,
          subtopics: ["Trigonometric Functions", "Inverse Functions", "Equations"]
        },
        { 
          id: "m5", 
          name: "Statistics", 
          difficulty: "medium" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 5,
          timeSpent: 0,
          estimatedTime: 20,
          subtopics: ["Mean, Median, Mode", "Standard Deviation", "Correlation"]
        },
        { 
          id: "m6", 
          name: "Vectors", 
          difficulty: "hard" as const, 
          completed: false, 
          status: "pending" as const,
          weightage: 5,
          timeSpent: 0,
          estimatedTime: 25,
          subtopics: ["Vector Operations", "Scalar Triple Product", "Vector Triple Product"]
        },
      ]
    }
  ]
};

const StudyPlanView = () => {
  const [studyPlan, setStudyPlan] = useState<{
    examName: string;
    examDate: string;
    weeklyHours: number;
    subjects: any[];
  }>(mockStudyPlan);
  
  // Daily Smart Suggestions
  const smartSuggestions = [
    {
      icon: <Target className="h-5 w-5 text-blue-600" />,
      title: "Focus on High-Weightage Topics",
      description: "Electromagnetism (35% weightage) in Physics needs attention",
      action: "Start Now",
      priority: "high"
    },
    {
      icon: <Clock className="h-5 w-5 text-amber-600" />,
      title: "Time Management Alert",
      description: "You're behind schedule in Physical Chemistry by 25 minutes",
      action: "Catch Up",
      priority: "medium"
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      title: "Strength Building",
      description: "Mathematics showing great progress - consider advanced problems",
      action: "Level Up",
      priority: "low"
    },
    {
      icon: <BookOpen className="h-5 w-5 text-purple-600" />,
      title: "Revision Recommended",
      description: "Review completed Mechanics topics for better retention",
      action: "Review",
      priority: "medium"
    }
  ];

  // Calculate overall statistics
  const totalTopics = studyPlan.subjects.reduce((total, subject) => {
    return total + (subject.topics?.length || 0);
  }, 0);

  const completedTopics = studyPlan.subjects.reduce((total, subject) => {
    return total + (subject.topics?.filter((topic: any) => topic.completed).length || 0);
  }, 0);

  const overallProgress = Math.round((completedTopics / totalTopics) * 100);

  // In a real implementation, you would fetch the study plan from an API or context
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.examPreparation) {
          setStudyPlan(prev => ({
            ...prev, 
            examName: parsedData.examPreparation || mockStudyPlan.examName
          }));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <SharedPageLayout 
      title="Study Plan" 
      subtitle="Your personalized exam preparation roadmap"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Sync Calendar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Plan
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Update Plan
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Exam Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Exam Goal</h3>
            <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">{studyPlan.examName}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200">
            <h3 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Overall Progress</h3>
            <p className="text-lg font-semibold text-green-900 dark:text-green-100">{overallProgress}%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200">
            <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">Topics Completed</h3>
            <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">{completedTopics}/{totalTopics}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-lg border border-amber-200">
            <h3 className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">Weekly Hours</h3>
            <p className="text-lg font-semibold text-amber-900 dark:text-amber-100">{studyPlan.weeklyHours} hours</p>
          </div>
        </div>

        {/* Enhanced Subject Breakdown with Topic Details */}
        <div className="space-y-6">
          {studyPlan.subjects.map((subject) => (
            <Card key={subject.id} className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: subject.color }}
                    />
                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {subject.proficiency}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Weightage</p>
                      <p className="text-lg font-bold" style={{ color: subject.color }}>
                        {subject.weightage}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Expected</p>
                      <p className="text-lg font-bold text-green-600">
                        {subject.expectedMarks} marks
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Current Level</p>
                      <p className="text-lg font-bold text-blue-600">
                        {subject.currentLevel}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {subject.topics.map((topic: any) => (
                    <div key={topic.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-lg">{topic.name}</h4>
                          <Badge 
                            variant={topic.completed ? "default" : "outline"}
                            className={topic.completed ? "bg-green-100 text-green-800 border-green-200" : ""}
                          >
                            {topic.status.replace('-', ' ')}
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={
                              topic.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' :
                              topic.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-red-50 text-red-700 border-red-200'
                            }
                          >
                            {topic.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Weightage</p>
                            <p className="font-semibold">{topic.weightage}%</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Time Progress</p>
                            <p className="font-semibold">{topic.timeSpent}/{topic.estimatedTime}h</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{Math.round((topic.timeSpent / topic.estimatedTime) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(topic.timeSpent / topic.estimatedTime) * 100} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Subtopics:</p>
                        <div className="flex flex-wrap gap-2">
                          {topic.subtopics.map((subtopic: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {subtopic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Smart Suggestions */}
        <Card className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 border-2 border-yellow-200 dark:border-yellow-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <Lightbulb className="h-6 w-6" />
              Daily Smart Suggestions
              <Badge variant="outline" className="ml-2 bg-white border-orange-300 text-orange-700">
                AI Powered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smartSuggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-2 bg-white dark:bg-gray-800 transition-all hover:shadow-md ${
                    suggestion.priority === 'high' ? 'border-red-200 hover:border-red-300' :
                    suggestion.priority === 'medium' ? 'border-amber-200 hover:border-amber-300' :
                    'border-green-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {suggestion.icon}
                      <Badge 
                        variant="outline" 
                        className={
                          suggestion.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                          suggestion.priority === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-green-50 text-green-700 border-green-200'
                        }
                      >
                        {suggestion.priority} priority
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      {suggestion.action}
                    </Button>
                  </div>
                  <h4 className="font-medium mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Study Plan Breakdown Component */}
        <StudyPlanBreakdown 
          subjects={studyPlan.subjects}
          examDate={studyPlan.examDate}
          examName={studyPlan.examName}
          weeklyHours={studyPlan.weeklyHours}
        />
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanView;
