
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, TrendingUp, Target, PlayCircle, ArrowLeft, BookOpen, Award, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarLayout from '@/components/dashboard/SidebarLayout';

const PracticeExamLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('all');

  const examCategories = [
    { id: 'all', label: 'All Exams', count: 45 },
    { id: 'neet', label: 'NEET', count: 25 },
    { id: 'jee', label: 'JEE', count: 20 }
  ];

  const mockExams = [
    {
      id: 'neet-mock-1',
      title: 'NEET Full Length Test 1',
      type: 'Full Length',
      duration: '3 hours',
      questions: 180,
      difficulty: 'Medium',
      category: 'neet',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      attempted: false,
      bestScore: null,
      averageScore: 78
    },
    {
      id: 'physics-sectional',
      title: 'Physics Sectional Test',
      type: 'Subject Test',
      duration: '1 hour',
      questions: 45,
      difficulty: 'Hard',
      category: 'neet',
      subjects: ['Physics'],
      attempted: true,
      bestScore: 85,
      averageScore: 72
    },
    {
      id: 'chemistry-mock',
      title: 'Organic Chemistry Practice',
      type: 'Chapter Test',
      duration: '45 min',
      questions: 30,
      difficulty: 'Medium',
      category: 'neet',
      subjects: ['Chemistry'],
      attempted: true,
      bestScore: 92,
      averageScore: 68
    },
    {
      id: 'biology-test',
      title: 'Human Physiology Test',
      type: 'Chapter Test',
      duration: '30 min',
      questions: 25,
      difficulty: 'Easy',
      category: 'neet',
      subjects: ['Biology'],
      attempted: false,
      bestScore: null,
      averageScore: 81
    }
  ];

  const filteredExams = activeTab === 'all' ? mockExams : mockExams.filter(exam => exam.category === activeTab);

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleViewResults = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 border-green-200 bg-green-50';
      case 'Medium': return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'Hard': return 'text-red-600 border-red-200 bg-red-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  return (
    <SidebarLayout>
      <div className={`min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-indigo-900/10 ${isMobile ? 'pb-20' : ''}`}>
        <Helmet>
          <title>Practice Exams - PREPZR</title>
          <meta name="description" content="Take practice exams and mock tests for NEET preparation" />
        </Helmet>

        <div className={`container mx-auto space-y-6 ${isMobile ? 'px-4 py-4' : 'px-4 py-6'}`}>
          {/* Mobile-optimized Header */}
          <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
            {/* Back button for mobile */}
            {isMobile && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard/student')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-3 w-3" />
                Dashboard
              </Button>
            )}

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full ${isMobile ? 'p-2' : ''}`}>
                  <FileText className={`text-white ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
                </div>
                <h1 className={`font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                  Practice Exams
                </h1>
              </div>
              <p className={`text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${isMobile ? 'text-sm px-2' : 'text-xl'}`}>
                Test your knowledge with comprehensive mock tests and practice exams
              </p>
            </div>

            {/* Quick Stats - Mobile Optimized */}
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
              <Card className="text-center">
                <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
                  <Target className={`mx-auto text-blue-500 mb-2 ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                  <div className={`font-bold text-blue-600 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                    {mockExams.filter(e => e.attempted).length}
                  </div>
                  <div className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Completed
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
                  <Award className={`mx-auto text-green-500 mb-2 ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                  <div className={`font-bold text-green-600 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                    89%
                  </div>
                  <div className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Best Score
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
                  <TrendingUp className={`mx-auto text-purple-500 mb-2 ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                  <div className={`font-bold text-purple-600 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                    +12%
                  </div>
                  <div className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {isMobile ? 'Growth' : 'Improvement'}
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
                  <BarChart3 className={`mx-auto text-orange-500 mb-2 ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                  <div className={`font-bold text-orange-600 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                    76%
                  </div>
                  <div className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    Average
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile-optimized Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3 h-auto' : 'grid-cols-3'}`}>
              {examCategories.map((category) => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  className={`${isMobile ? 'text-xs px-2 py-2' : ''} flex items-center gap-2`}
                >
                  <span>{category.label}</span>
                  <Badge variant="secondary" className={`${isMobile ? 'text-xs' : ''}`}>
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {filteredExams.map((exam) => (
                  <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className={`${isMobile ? 'p-4 pb-2' : ''}`}>
                      <div className="flex justify-between items-start">
                        <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} leading-tight`}>
                          {exam.title}
                        </CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`${getDifficultyColor(exam.difficulty)} ${isMobile ? 'text-xs' : ''}`}
                        >
                          {exam.difficulty}
                        </Badge>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary" className={`${isMobile ? 'text-xs' : ''}`}>
                          {exam.type}
                        </Badge>
                        {exam.subjects.map((subject) => (
                          <Badge key={subject} variant="outline" className={`${isMobile ? 'text-xs' : ''}`}>
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent className={`${isMobile ? 'p-4 pt-0' : ''} space-y-4`}>
                      {/* Exam Details */}
                      <div className={`grid grid-cols-2 gap-4 ${isMobile ? 'text-sm' : ''}`}>
                        <div className="flex items-center gap-2">
                          <Clock className={`text-gray-500 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                          <span>{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className={`text-gray-500 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                          <span>{exam.questions} Qs</span>
                        </div>
                      </div>

                      {/* Score Display */}
                      {exam.attempted ? (
                        <div className={`bg-green-50 dark:bg-green-900/20 rounded-lg p-3 ${isMobile ? 'p-2' : ''}`}>
                          <div className="flex justify-between items-center">
                            <span className={`text-green-600 font-medium ${isMobile ? 'text-sm' : ''}`}>
                              Best Score
                            </span>
                            <span className={`font-bold text-green-700 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                              {exam.bestScore}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className={`bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 ${isMobile ? 'p-2' : ''}`}>
                          <div className="flex justify-between items-center">
                            <span className={`text-blue-600 font-medium ${isMobile ? 'text-sm' : ''}`}>
                              Average Score
                            </span>
                            <span className={`font-bold text-blue-700 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                              {exam.averageScore}%
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className={`flex gap-2 ${isMobile ? 'flex-col' : ''}`}>
                        <Button 
                          onClick={() => handleStartExam(exam.id)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                          size={isMobile ? "sm" : "default"}
                        >
                          <PlayCircle className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
                          {exam.attempted ? 'Retake' : 'Start'}
                        </Button>
                        
                        {exam.attempted && (
                          <Button 
                            variant="outline" 
                            onClick={() => handleViewResults(exam.id)}
                            className="flex-1"
                            size={isMobile ? "sm" : "default"}
                          >
                            <BarChart3 className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
                            Results
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default PracticeExamLandingPage;
