
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Brain,
  FileText,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  BookMarked,
  TrendingUp
} from "lucide-react";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';

type SyllabusUnit = {
  id: string;
  title: string;
  description: string;
  topics: SyllabusTopic[];
  importance: 'high' | 'medium' | 'low';
  progress: number;
};

type SyllabusTopic = {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'not-started';
  importance: 'high' | 'medium' | 'low';
  conceptIds: string[];
  flashcardIds: string[];
  practiceExamIds: string[];
};

const mockSyllabusData: Record<string, SyllabusUnit[]> = {
  "Physics": [
    {
      id: "phys-1",
      title: "Mechanics",
      description: "Study of motion, forces, energy and momentum",
      importance: "high",
      progress: 75,
      topics: [
        {
          id: "phys-1-1",
          title: "Newton's Laws of Motion",
          description: "Fundamental principles that govern the motion of physical objects",
          status: "completed",
          importance: "high",
          conceptIds: ["c-1", "c-2"],
          flashcardIds: ["f-1", "f-2"],
          practiceExamIds: ["pe-1"]
        },
        {
          id: "phys-1-2",
          title: "Work, Energy and Power",
          description: "Understanding energy transformations and conservation principles",
          status: "in-progress",
          importance: "high",
          conceptIds: ["c-3"],
          flashcardIds: ["f-3", "f-4"],
          practiceExamIds: []
        },
        {
          id: "phys-1-3",
          title: "Circular Motion",
          description: "Motion in a circular path and the forces involved",
          status: "not-started",
          importance: "medium",
          conceptIds: ["c-4"],
          flashcardIds: [],
          practiceExamIds: ["pe-2"]
        }
      ]
    },
    {
      id: "phys-2",
      title: "Thermodynamics",
      description: "Study of heat, temperature, and energy transformations",
      importance: "medium",
      progress: 30,
      topics: [
        {
          id: "phys-2-1",
          title: "Laws of Thermodynamics",
          description: "Fundamental principles governing energy transfer and transformation",
          status: "in-progress",
          importance: "high",
          conceptIds: ["c-5"],
          flashcardIds: ["f-5"],
          practiceExamIds: []
        },
        {
          id: "phys-2-2",
          title: "Thermal Properties of Matter",
          description: "Study of properties like specific heat, latent heat, and thermal expansion",
          status: "not-started",
          importance: "medium",
          conceptIds: [],
          flashcardIds: [],
          practiceExamIds: []
        }
      ]
    }
  ],
  "Chemistry": [
    {
      id: "chem-1",
      title: "Atomic Structure",
      description: "Structure of atoms, electronic configuration, and periodic table",
      importance: "high",
      progress: 90,
      topics: [
        {
          id: "chem-1-1",
          title: "Quantum Numbers",
          description: "Parameters that define the properties of electrons in atoms",
          status: "completed",
          importance: "high",
          conceptIds: ["c-6"],
          flashcardIds: ["f-6"],
          practiceExamIds: ["pe-3"]
        },
        {
          id: "chem-1-2",
          title: "Periodic Trends",
          description: "Patterns of properties across the periodic table",
          status: "completed",
          importance: "high",
          conceptIds: ["c-7"],
          flashcardIds: ["f-7"],
          practiceExamIds: []
        }
      ]
    },
    {
      id: "chem-2",
      title: "Organic Chemistry",
      description: "Study of carbon compounds and their reactions",
      importance: "high",
      progress: 60,
      topics: [
        {
          id: "chem-2-1",
          title: "Hydrocarbons",
          description: "Compounds containing only carbon and hydrogen",
          status: "completed",
          importance: "high",
          conceptIds: ["c-10"],
          flashcardIds: ["f-10"],
          practiceExamIds: ["pe-5"]
        },
        {
          id: "chem-2-2",
          title: "Functional Groups",
          description: "Groups of atoms that give characteristic properties to organic molecules",
          status: "in-progress",
          importance: "high",
          conceptIds: ["c-11"],
          flashcardIds: ["f-11"],
          practiceExamIds: []
        }
      ]
    }
  ],
  "Mathematics": [
    {
      id: "math-1",
      title: "Calculus",
      description: "Study of continuous change and its applications",
      importance: "high",
      progress: 60,
      topics: [
        {
          id: "math-1-1",
          title: "Differentiation",
          description: "Finding rates of change and slopes of curves",
          status: "completed",
          importance: "high",
          conceptIds: ["c-8"],
          flashcardIds: ["f-8"],
          practiceExamIds: ["pe-4"]
        },
        {
          id: "math-1-2",
          title: "Integration",
          description: "Finding areas under curves and antiderivatives",
          status: "in-progress",
          importance: "high",
          conceptIds: ["c-9"],
          flashcardIds: ["f-9"],
          practiceExamIds: []
        }
      ]
    },
    {
      id: "math-2",
      title: "Algebra",
      description: "Study of mathematical symbols and the rules for manipulating them",
      importance: "medium",
      progress: 85,
      topics: [
        {
          id: "math-2-1",
          title: "Quadratic Equations",
          description: "Equations involving terms up to the second power",
          status: "completed",
          importance: "medium",
          conceptIds: ["c-12"],
          flashcardIds: ["f-12"],
          practiceExamIds: ["pe-6"]
        },
        {
          id: "math-2-2",
          title: "Complex Numbers",
          description: "Numbers with real and imaginary parts",
          status: "completed",
          importance: "medium",
          conceptIds: ["c-13"],
          flashcardIds: ["f-13"],
          practiceExamIds: []
        }
      ]
    }
  ],
  "Biology": [
    {
      id: "bio-1",
      title: "Cell Biology",
      description: "Study of the structure and function of cells",
      importance: "high",
      progress: 40,
      topics: [
        {
          id: "bio-1-1",
          title: "Cell Organelles",
          description: "Specialized structures that perform specific functions within cells",
          status: "in-progress",
          importance: "high",
          conceptIds: ["c-14"],
          flashcardIds: ["f-14"],
          practiceExamIds: []
        },
        {
          id: "bio-1-2",
          title: "Cell Division",
          description: "Processes by which cells reproduce and grow",
          status: "not-started",
          importance: "medium",
          conceptIds: [],
          flashcardIds: [],
          practiceExamIds: []
        }
      ]
    },
    {
      id: "bio-2",
      title: "Human Physiology",
      description: "Study of normal function in humans and their organ systems",
      importance: "high",
      progress: 65,
      topics: [
        {
          id: "bio-2-1",
          title: "Digestive System",
          description: "System responsible for breaking down food and absorbing nutrients",
          status: "completed",
          importance: "high",
          conceptIds: ["c-15"],
          flashcardIds: ["f-15"],
          practiceExamIds: ["pe-7"]
        },
        {
          id: "bio-2-2",
          title: "Circulatory System",
          description: "System responsible for transporting substances throughout the body",
          status: "in-progress",
          importance: "high",
          conceptIds: ["c-16"],
          flashcardIds: ["f-16"],
          practiceExamIds: []
        }
      ]
    }
  ]
};

const SyllabusPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const { dashboardData } = useStudentDashboardData();
  const [activeSubject, setActiveSubject] = useState<string>("Physics");
  const [studyPlan, setStudyPlan] = useState(dashboardData.studyPlan);
  const [syllabusData, setSyllabusData] = useState(mockSyllabusData);
  const [examGoal, setExamGoal] = useState<string>('NEET');
  
  // Map syllabus to study plan and progress
  useEffect(() => {
    // Set exam goal from user profile if available
    if (userProfile?.goals?.[0]) {
      setExamGoal(userProfile.goals[0].title);
    }
    
    if (dashboardData.studyPlan) {
      setStudyPlan(dashboardData.studyPlan);
      
      // In a real app, we would fetch syllabus data for the specific exam goal
      // For now, we'll use our mock data
      console.log("Mapping syllabus to study plan:", dashboardData.studyPlan.examGoal);
    }
  }, [dashboardData, userProfile]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'not-started':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case 'medium':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case 'low':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "";
    }
  };

  // Calculate overall progress for the selected subject
  const calculateOverallProgress = (): number => {
    if (!syllabusData[activeSubject]) return 0;
    
    const units = syllabusData[activeSubject];
    if (units.length === 0) return 0;
    
    const totalProgress = units.reduce((sum, unit) => sum + unit.progress, 0);
    return Math.round(totalProgress / units.length);
  };

  // Calculate overall progress across all subjects
  const calculateTotalProgress = (): number => {
    if (!syllabusData) return 0;
    
    let totalUnits = 0;
    let totalProgress = 0;
    
    Object.values(syllabusData).forEach(subjects => {
      subjects.forEach(unit => {
        totalProgress += unit.progress;
        totalUnits++;
      });
    });
    
    return totalUnits ? Math.round(totalProgress / totalUnits) : 0;
  };

  // Count total topics and completed topics
  const calculateTopicStats = () => {
    let totalTopics = 0;
    let completedTopics = 0;
    
    Object.values(syllabusData).forEach(subjects => {
      subjects.forEach(unit => {
        unit.topics.forEach(topic => {
          totalTopics++;
          if (topic.status === 'completed') {
            completedTopics++;
          }
        });
      });
    });
    
    return { total: totalTopics, completed: completedTopics };
  };

  const topicStats = calculateTopicStats();

  return (
    <SharedPageLayout
      title={`${examGoal} Syllabus`}
      subtitle="Comprehensive syllabus mapped to your study plan and progress"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Summary card with overall progress */}
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">{examGoal} Syllabus</CardTitle>
                <CardDescription>
                  {studyPlan?.daysLeft ? `${studyPlan.daysLeft} days left until exam` : 'Prepare for your upcoming exam'}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Overall Progress</div>
                <div className="text-2xl font-bold">{calculateTotalProgress()}%</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={calculateTotalProgress()} className="h-2 mt-2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Total Topics</div>
                <div className="text-2xl font-bold">{topicStats.total}</div>
              </div>
              
              <div className="bg-green-100/50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Completed Topics</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {topicStats.completed} ({Math.round((topicStats.completed / topicStats.total) * 100)}%)
                </div>
              </div>
              
              <div className="bg-amber-100/50 dark:bg-amber-900/20 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Remaining Topics</div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {topicStats.total - topicStats.completed}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/dashboard/student/academic')}
                  className="text-xs flex items-center gap-1"
                >
                  <BookMarked className="h-3 w-3" /> Study Plan
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/dashboard/student/previous-year-analysis')}
                  className="text-xs flex items-center gap-1"
                >
                  <TrendingUp className="h-3 w-3" /> Previous Year Analysis
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  <span>Not Started</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject tabs and syllabus content */}
        <Tabs defaultValue={activeSubject} onValueChange={setActiveSubject} className="w-full">
          <TabsList className="mb-4 flex w-full h-auto flex-wrap gap-2">
            {Object.keys(syllabusData).map(subject => (
              <TabsTrigger 
                key={subject} 
                value={subject}
                className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(syllabusData).map(([subject, units]) => (
            <TabsContent key={subject} value={subject} className="mt-0">
              <div className="space-y-6">
                {units.map((unit) => (
                  <Card key={unit.id} className="overflow-hidden">
                    <CardHeader className="bg-slate-50 dark:bg-slate-900/50 pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold flex items-center">
                            {unit.title}
                            <Badge className={`ml-2 text-xs ${getImportanceColor(unit.importance)}`}>
                              {unit.importance} priority
                            </Badge>
                          </CardTitle>
                          <CardDescription>{unit.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{unit.progress}% complete</div>
                          <Progress value={unit.progress} className="h-2 w-32 mt-1" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {unit.topics.map((topic) => (
                          <div key={topic.id} className="border border-gray-100 dark:border-gray-800 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(topic.status)}
                                <h4 className="font-medium">{topic.title}</h4>
                                <Badge className={`text-xs ${getImportanceColor(topic.importance)}`}>
                                  {topic.importance}
                                </Badge>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigate(`/dashboard/student/concepts/card/${topic.conceptIds[0]}`)}
                                disabled={topic.conceptIds.length === 0}
                              >
                                Study Now
                              </Button>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
                            
                            <Separator className="my-3" />
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="flex items-center">
                                    <BookOpen className="h-4 w-4 mr-1 text-blue-500" />
                                    Concept Cards
                                  </span>
                                  <span className="font-medium">{topic.conceptIds.length}</span>
                                </div>
                                {topic.conceptIds.length > 0 && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full text-xs"
                                    onClick={() => navigate(`/dashboard/student/concepts/card/${topic.conceptIds[0]}`)}
                                  >
                                    View Concepts <ArrowRight className="h-3 w-3 ml-1" />
                                  </Button>
                                )}
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="flex items-center">
                                    <Brain className="h-4 w-4 mr-1 text-purple-500" />
                                    Flashcards
                                  </span>
                                  <span className="font-medium">{topic.flashcardIds.length}</span>
                                </div>
                                {topic.flashcardIds.length > 0 && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full text-xs"
                                    onClick={() => navigate(`/dashboard/student/flashcards/${topic.flashcardIds[0]}`)}
                                  >
                                    Review Cards <ArrowRight className="h-3 w-3 ml-1" />
                                  </Button>
                                )}
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="flex items-center">
                                    <FileText className="h-4 w-4 mr-1 text-green-500" />
                                    Practice Exams
                                  </span>
                                  <span className="font-medium">{topic.practiceExamIds.length}</span>
                                </div>
                                {topic.practiceExamIds.length > 0 && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full text-xs"
                                    onClick={() => navigate(`/dashboard/student/practice-exam/${topic.practiceExamIds[0]}/start`)}
                                  >
                                    Take Exam <ArrowRight className="h-3 w-3 ml-1" />
                                  </Button>
                                )}
                              </div>
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

        <div className="mt-4 flex justify-between">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={() => navigate('/dashboard/student')}
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Dashboard
          </Button>

          <Button 
            className="flex items-center gap-2"
            onClick={() => navigate('/dashboard/student/practice-exam')}
          >
            <FileText className="h-4 w-4" />
            Practice Exams
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default SyllabusPage;
