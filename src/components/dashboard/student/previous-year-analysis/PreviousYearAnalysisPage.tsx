
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart, 
  FileText, 
  BookOpen,
  Calendar,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { Progress } from '@/components/ui/progress';

interface ExamPattern {
  year: number;
  totalQuestions: number;
  totalMarks: number;
  sections: {
    name: string;
    questions: number;
    marks: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  importantTopics: {
    name: string;
    frequency: number;
    importance: number;
  }[];
}

interface SubjectDistribution {
  subject: string;
  percentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  keyChapters: {
    name: string;
    questions: number;
    importance: number;
  }[];
}

interface RecommendationStrategy {
  name: string;
  description: string;
  timeAllocation: {
    subject: string;
    percentage: number;
  }[];
  tips: string[];
}

const PreviousYearAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const [activeTab, setActiveTab] = useState('patterns');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [examGoal, setExamGoal] = useState<string>('NEET');
  
  useEffect(() => {
    // Set exam goal from user profile if available
    if (userProfile?.goals?.[0]) {
      setExamGoal(userProfile.goals[0].title);
    }
  }, [userProfile]);

  // Sample data for demo - in production this would come from an API
  const examPatterns: ExamPattern[] = [
    {
      year: 2024,
      totalQuestions: 200,
      totalMarks: 720,
      sections: [
        { name: 'Physics', questions: 50, marks: 180, difficulty: 'medium' },
        { name: 'Chemistry', questions: 50, marks: 180, difficulty: 'medium' },
        { name: 'Biology', questions: 100, marks: 360, difficulty: 'hard' }
      ],
      importantTopics: [
        { name: 'Human Physiology', frequency: 8, importance: 9 },
        { name: 'Genetics', frequency: 7, importance: 9 },
        { name: 'Mechanics', frequency: 6, importance: 8 },
        { name: 'Organic Chemistry', frequency: 9, importance: 10 },
      ]
    },
    {
      year: 2023,
      totalQuestions: 180,
      totalMarks: 720,
      sections: [
        { name: 'Physics', questions: 45, marks: 180, difficulty: 'hard' },
        { name: 'Chemistry', questions: 45, marks: 180, difficulty: 'medium' },
        { name: 'Biology', questions: 90, marks: 360, difficulty: 'medium' }
      ],
      importantTopics: [
        { name: 'Cell Biology', frequency: 9, importance: 10 },
        { name: 'Thermodynamics', frequency: 7, importance: 8 },
        { name: 'Coordination Compounds', frequency: 8, importance: 9 },
        { name: 'Plant Physiology', frequency: 6, importance: 7 },
      ]
    },
    {
      year: 2022,
      totalQuestions: 200,
      totalMarks: 720,
      sections: [
        { name: 'Physics', questions: 50, marks: 180, difficulty: 'medium' },
        { name: 'Chemistry', questions: 50, marks: 180, difficulty: 'easy' },
        { name: 'Biology', questions: 100, marks: 360, difficulty: 'medium' }
      ],
      importantTopics: [
        { name: 'Electrostatics', frequency: 8, importance: 9 },
        { name: 'Chemical Bonding', frequency: 7, importance: 8 },
        { name: 'Human Health & Disease', frequency: 9, importance: 10 },
        { name: 'Ecology', frequency: 6, importance: 7 },
      ]
    },
    {
      year: 2021,
      totalQuestions: 180,
      totalMarks: 720,
      sections: [
        { name: 'Physics', questions: 45, marks: 180, difficulty: 'medium' },
        { name: 'Chemistry', questions: 45, marks: 180, difficulty: 'medium' },
        { name: 'Biology', questions: 90, marks: 360, difficulty: 'hard' }
      ],
      importantTopics: [
        { name: 'Molecular Basis of Inheritance', frequency: 9, importance: 10 },
        { name: 'Electrochemistry', frequency: 7, importance: 8 },
        { name: 'Waves', frequency: 6, importance: 7 },
        { name: 'Biomolecules', frequency: 8, importance: 9 },
      ]
    },
    {
      year: 2020,
      totalQuestions: 180,
      totalMarks: 720,
      sections: [
        { name: 'Physics', questions: 45, marks: 180, difficulty: 'hard' },
        { name: 'Chemistry', questions: 45, marks: 180, difficulty: 'hard' },
        { name: 'Biology', questions: 90, marks: 360, difficulty: 'medium' }
      ],
      importantTopics: [
        { name: 'Genetics & Evolution', frequency: 9, importance: 10 },
        { name: 'Nuclear Physics', frequency: 6, importance: 7 },
        { name: 'Organic Chemistry', frequency: 8, importance: 9 },
        { name: 'Plant Kingdom', frequency: 7, importance: 8 },
      ]
    }
  ];

  const subjectDistributions: SubjectDistribution[] = [
    {
      subject: 'Biology',
      percentage: 50,
      trend: 'stable',
      keyChapters: [
        { name: 'Human Physiology', questions: 15, importance: 9 },
        { name: 'Genetics & Evolution', questions: 13, importance: 10 },
        { name: 'Cell Biology', questions: 12, importance: 9 },
        { name: 'Ecology & Environment', questions: 10, importance: 8 },
      ]
    },
    {
      subject: 'Chemistry',
      percentage: 25,
      trend: 'increasing',
      keyChapters: [
        { name: 'Organic Chemistry', questions: 10, importance: 10 },
        { name: 'Physical Chemistry', questions: 8, importance: 9 },
        { name: 'Coordination Compounds', questions: 5, importance: 8 },
        { name: 'Chemical Bonding', questions: 5, importance: 8 },
      ]
    },
    {
      subject: 'Physics',
      percentage: 25,
      trend: 'decreasing',
      keyChapters: [
        { name: 'Mechanics', questions: 8, importance: 9 },
        { name: 'Electrostatics', questions: 7, importance: 8 },
        { name: 'Modern Physics', questions: 6, importance: 9 },
        { name: 'Optics', questions: 5, importance: 7 },
      ]
    },
  ];

  const recommendationStrategies: RecommendationStrategy[] = [
    {
      name: 'Balanced Approach',
      description: 'Allocate time to all subjects equally with slight emphasis on Biology',
      timeAllocation: [
        { subject: 'Biology', percentage: 40 },
        { subject: 'Chemistry', percentage: 30 },
        { subject: 'Physics', percentage: 30 },
      ],
      tips: [
        'Focus on understanding core concepts rather than rote learning',
        'Practice previous years questions regularly',
        'Take regular mock tests to improve time management',
        'Revise high-frequency topics more often'
      ]
    },
    {
      name: 'Biology-Focused',
      description: 'Maximize score in Biology while maintaining competence in other subjects',
      timeAllocation: [
        { subject: 'Biology', percentage: 50 },
        { subject: 'Chemistry', percentage: 30 },
        { subject: 'Physics', percentage: 20 },
      ],
      tips: [
        'Master diagrams and biological processes',
        'Create flashcards for biological terms and definitions',
        'Ensure you can answer application-based questions in Biology',
        'Don't neglect NCERT for Biology'
      ]
    },
    {
      name: 'Weakness-Targeting',
      description: 'Identify your weakest subject and allocate more time to improve it',
      timeAllocation: [
        { subject: 'Weakest Subject', percentage: 40 },
        { subject: 'Medium Subject', percentage: 35 },
        { subject: 'Strongest Subject', percentage: 25 },
      ],
      tips: [
        'Take diagnostic tests to identify weak areas',
        'Create a focused study plan for improvement',
        'Seek expert help for topics you find challenging',
        'Track your progress regularly'
      ]
    },
  ];

  const filteredPatternData = examPatterns.find(pattern => pattern.year === selectedYear);

  const handlePracticeExam = () => {
    navigate('/dashboard/student/practice-exam');
  };

  // Difficulty color mapping
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  // Trend icon and color mapping
  const getTrendIndicator = (trend: string) => {
    switch (trend) {
      case 'increasing': return {
        icon: <TrendingUp className="h-4 w-4 text-green-600" />,
        color: 'text-green-600'
      };
      case 'decreasing': return {
        icon: <TrendingUp className="h-4 w-4 rotate-180 text-red-600" />,
        color: 'text-red-600'
      };
      default: return {
        icon: <TrendingUp className="h-4 w-4 rotate-90 text-blue-600" />,
        color: 'text-blue-600'
      };
    }
  };

  return (
    <SharedPageLayout
      title={`${examGoal} Previous Year Analysis`}
      subtitle="Analyze patterns and optimize your preparation strategy"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Year selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {examPatterns.map((pattern) => (
            <Button
              key={pattern.year}
              variant={selectedYear === pattern.year ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedYear(pattern.year)}
              className="transition-all"
            >
              {pattern.year}
            </Button>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Exam Pattern
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Subject Distribution
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Preparation Strategy
            </TabsTrigger>
          </TabsList>

          {/* Exam Pattern Tab */}
          <TabsContent value="patterns" className="space-y-4">
            {filteredPatternData && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{selectedYear} Exam Pattern Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground">Total Questions</div>
                        <div className="text-2xl font-bold">{filteredPatternData.totalQuestions}</div>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground">Total Marks</div>
                        <div className="text-2xl font-bold">{filteredPatternData.totalMarks}</div>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground">Time (minutes)</div>
                        <div className="text-2xl font-bold">180</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Section-wise Distribution</h3>
                      <div className="space-y-3">
                        {filteredPatternData.sections.map((section, idx) => (
                          <div key={idx} className="flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{section.name}</span>
                                <Badge variant="outline" className={getDifficultyColor(section.difficulty)}>
                                  {section.difficulty}
                                </Badge>
                              </div>
                              <span className="text-sm text-muted-foreground">{section.questions} questions ({section.marks} marks)</span>
                            </div>
                            <Progress value={(section.marks / filteredPatternData.totalMarks) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Important Topics (Year {selectedYear})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredPatternData.importantTopics.map((topic, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{topic.name}</span>
                            <Badge variant="secondary">
                              Frequency: {topic.frequency}/10
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Importance: {topic.importance}/10
                          </div>
                          <Progress value={(topic.importance / 10) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6 flex justify-center">
                  <Button onClick={handlePracticeExam} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Practice {selectedYear} Pattern Exam
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          {/* Subject Distribution Tab */}
          <TabsContent value="distribution" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">5-Year Subject Distribution Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {subjectDistributions.map((subject, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{subject.subject}</span>
                        <span className={`flex items-center gap-1 ${getTrendIndicator(subject.trend).color}`}>
                          {getTrendIndicator(subject.trend).icon}
                          <span className="text-xs capitalize">{subject.trend}</span>
                        </span>
                      </div>
                      <span className="font-medium">{subject.percentage}%</span>
                    </div>
                    <Progress value={subject.percentage} className="h-2 mb-4" />
                    
                    <h4 className="text-sm font-medium mb-2">Key Chapters</h4>
                    <div className="space-y-3">
                      {subject.keyChapters.map((chapter, cidx) => (
                        <div key={cidx} className="flex justify-between items-center text-sm">
                          <span>{chapter.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{chapter.questions} questions</span>
                            <Badge variant="outline" className="bg-primary/10">
                              {chapter.importance}/10
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preparation Strategy Tab */}
          <TabsContent value="strategy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Preparation Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recommendationStrategies.map((strategy, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <h3 className="font-medium text-lg mb-1">{strategy.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
                      
                      <h4 className="text-sm font-medium mb-2">Time Allocation</h4>
                      <div className="space-y-3 mb-4">
                        {strategy.timeAllocation.map((allocation, aidx) => (
                          <div key={aidx} className="flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                              <span>{allocation.subject}</span>
                              <span className="text-sm">{allocation.percentage}%</span>
                            </div>
                            <Progress value={allocation.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="text-sm font-medium mb-2">Tips</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {strategy.tips.map((tip, tidx) => (
                          <li key={tidx} className="text-sm">{tip}</li>
                        ))}
                      </ul>

                      <Button className="mt-4 w-full sm:w-auto" variant="outline">
                        Create Study Plan with this Strategy
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate('/dashboard/student/practice-exam')}>
            <FileText className="h-4 w-4" />
            Take Practice Exam
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default PreviousYearAnalysisPage;
