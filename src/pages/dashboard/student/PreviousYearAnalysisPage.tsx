
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, BookOpen, FileText, TrendingUp, CalendarDays, BarChart2, PieChart as PieChartIcon, Target, Clock, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const PreviousYearAnalysisPage = () => {
  const [activeSubject, setActiveSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  
  // Mock data for previous years
  const examYears = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];
  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'biology', name: 'Biology' }
  ];
  
  // Distribution data for charts
  const difficultyDistributionData = [
    { name: 'Easy', value: 30, color: '#4ade80' }, // green
    { name: 'Medium', value: 50, color: '#fb923c' }, // amber
    { name: 'Hard', value: 20, color: '#f87171' }  // red
  ];
  
  // Mock data for past question papers
  const pastPapers = [
    { id: '2025-main', year: '2025', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false },
    { id: '2024-main', year: '2024', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false },
    { id: '2023-main', year: '2023', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: true, score: 143 },
    { id: '2023-advanced', year: '2023', name: 'Advanced Paper', questions: 120, timeMinutes: 180, attempted: false },
    { id: '2022-main', year: '2022', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: true, score: 126 },
    { id: '2022-advanced', year: '2022', name: 'Advanced Paper', questions: 120, timeMinutes: 180, attempted: false },
    { id: '2021-main', year: '2021', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: true, score: 131 },
    { id: '2021-advanced', year: '2021', name: 'Advanced Paper', questions: 120, timeMinutes: 180, attempted: false },
    { id: '2020-main', year: '2020', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false },
    { id: '2019-main', year: '2019', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false },
    { id: '2018-main', year: '2018', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false },
    { id: '2017-main', year: '2017', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false },
    { id: '2016-main', year: '2016', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false },
    { id: '2015-main', year: '2015', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false },
    { id: '2014-main', year: '2014', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false },
  ];
  
  // Topic distribution data
  const topicDistributionData = [
    { name: 'Kinematics', value: 15 },
    { name: 'Thermodynamics', value: 12 },
    { name: 'Mechanics', value: 18 },
    { name: 'Organic Chemistry', value: 25 },
    { name: 'Inorganic Chemistry', value: 15 },
    { name: 'Cell Biology', value: 10 },
    { name: 'Genetics', value: 5 }
  ];
  
  const yearTrendData = [
    { name: '2014', difficulty: 65, questions: 180 },
    { name: '2015', difficulty: 70, questions: 180 },
    { name: '2016', difficulty: 68, questions: 180 },
    { name: '2017', difficulty: 72, questions: 180 },
    { name: '2018', difficulty: 75, questions: 180 },
    { name: '2019', difficulty: 73, questions: 180 },
    { name: '2020', difficulty: 78, questions: 180 },
    { name: '2021', difficulty: 82, questions: 180 },
    { name: '2022', difficulty: 80, questions: 180 },
    { name: '2023', difficulty: 76, questions: 180 },
    { name: '2024', difficulty: 79, questions: 180 },
    { name: '2025', difficulty: 74, questions: 180 }
  ];
  
  const subjectWiseData = [
    { name: 'Physics', easy: 12, medium: 26, hard: 12 },
    { name: 'Chemistry', easy: 15, medium: 22, hard: 13 },
    { name: 'Biology', easy: 18, medium: 25, hard: 17 }
  ];
  
  // Topic trends for each year
  const topTrendingTopics = [
    { name: 'Organic Chemistry', count: 25, change: '+5%', trend: 'up' },
    { name: 'Mechanics', count: 18, change: '+3%', trend: 'up' },
    { name: 'Genetics', count: 15, change: '-2%', trend: 'down' },
    { name: 'Thermodynamics', count: 12, change: 'No change', trend: 'stable' }
  ];
  
  // Example questions
  const importantQuestions = [
    { id: 1, subject: 'physics', topic: 'Mechanics', year: '2023', difficulty: 'hard', question: 'A body of mass m is subjected to two forces F1 and F2 acting perpendicular to each other. If the body moves with an acceleration of √2 m/s², what is the magnitude of each force?' },
    { id: 2, subject: 'chemistry', topic: 'Organic Chemistry', year: '2023', difficulty: 'medium', question: 'The major product formed in the reaction of prop-1-ene with HBr in presence of peroxide is:' },
    { id: 3, subject: 'biology', topic: 'Genetics', year: '2022', difficulty: 'medium', question: 'In a cross between AABBCC × aabbcc, the probability of getting AaBbCc genotype in F2 generation is:' },
    { id: 4, subject: 'physics', topic: 'Thermodynamics', year: '2022', difficulty: 'hard', question: 'A heat engine operates between temperatures T1 and T2, where T1 > T2. It absorbs heat Q1 from the hot reservoir and gives out heat Q2 to the cold reservoir. If the work done by the engine is W, what is the efficiency of the engine?' }
  ];
  
  // Filter data based on selected year and subject
  const getFilteredQuestions = () => {
    let filtered = [...importantQuestions];
    
    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(q => q.year === selectedYear);
    }
    
    // Filter by subject
    if (activeSubject !== 'all') {
      filtered = filtered.filter(q => q.subject.toLowerCase() === activeSubject);
    }
    
    return filtered;
  };

  // Filter papers based on selected year
  const getFilteredPapers = () => {
    if (selectedYear === 'all') {
      return pastPapers;
    }
    return pastPapers.filter(paper => paper.year === selectedYear);
  };
  
  const filteredQuestions = getFilteredQuestions();
  const filteredPapers = getFilteredPapers();

  return (
    <SharedPageLayout
      title="Previous Years Analysis"
      subtitle="Comprehensive analysis of past exam patterns and attempt question papers from the last 10 years"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Main Tabs: Analysis or Practice Papers */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="analysis">Pattern Analysis</TabsTrigger>
              <TabsTrigger value="papers">Practice Papers</TabsTrigger>
            </TabsList>
            
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {examYears.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Analysis Tab Content */}
          <TabsContent value="analysis">
            {/* Year & Subject Filter Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
              <Tabs defaultValue={activeSubject} value={activeSubject} onValueChange={setActiveSubject}>
                <TabsList>
                  {subjects.map(subject => (
                    <TabsTrigger key={subject.id} value={subject.id}>
                      {subject.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Analysis
              </Button>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Total Questions</span>
                      <span className="text-2xl font-bold">180</span>
                    </div>
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Avg. Difficulty</span>
                      <span className="text-2xl font-bold">Medium</span>
                    </div>
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Trending Topic</span>
                      <span className="text-xl font-bold">Organic Chem</span>
                    </div>
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Analyzed Years</span>
                      <span className="text-2xl font-bold">12</span>
                    </div>
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <CalendarDays className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Difficulty Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Difficulty Distribution</CardTitle>
                  <CardDescription>Question difficulty breakdown across years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={difficultyDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {difficultyDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend verticalAlign="bottom" height={36} />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Topic Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Topic Distribution</CardTitle>
                  <CardDescription>Most frequent topics from {selectedYear === 'all' ? 'all years' : selectedYear}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topicDistributionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name="Question Count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Year Trend Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Year-wise Difficulty Trend</CardTitle>
                  <CardDescription>How difficulty has changed over the years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={yearTrendData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="difficulty" name="Difficulty (%)" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Subject-wise Difficulty */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Subject-wise Difficulty</CardTitle>
                  <CardDescription>Difficulty breakdown by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={subjectWiseData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        stackOffset="expand"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="easy" name="Easy" stackId="a" fill="#4ade80" />
                        <Bar dataKey="medium" name="Medium" stackId="a" fill="#fb923c" />
                        <Bar dataKey="hard" name="Hard" stackId="a" fill="#f87171" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Trending Topics Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Trending Topics</CardTitle>
                <CardDescription>Topics showing significant changes in recent years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {topTrendingTopics.map((topic, index) => (
                    <div key={index} className="py-3 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{topic.name}</h4>
                        <p className="text-sm text-muted-foreground">{topic.count} questions</p>
                      </div>
                      <div className={`flex items-center ${
                        topic.trend === 'up' 
                          ? 'text-green-600' 
                          : topic.trend === 'down' 
                            ? 'text-red-600' 
                            : 'text-gray-600'
                      }`}>
                        <span>{topic.change}</span>
                        {topic.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        ) : topic.trend === 'down' ? (
                          <ArrowUpRight className="h-4 w-4 ml-1 rotate-180" />
                        ) : (
                          <ArrowRight className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Important Questions Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Important Questions</CardTitle>
                <CardDescription>Key questions from previous years you should practice</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="w-full">
                  {filteredQuestions.map((question, index) => (
                    <AccordionItem key={index} value={`question-${question.id}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={
                              question.difficulty === 'easy' ? 'outline' :
                              question.difficulty === 'medium' ? 'secondary' : 'destructive'
                            }>
                              {question.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {question.subject.charAt(0).toUpperCase() + question.subject.slice(1)} | {question.topic} | {question.year}
                            </span>
                          </div>
                          <span className="line-clamp-1 text-left">{question.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>{question.question}</p>
                          <div className="flex justify-end">
                            <Button size="sm" variant="outline">
                              View Solution
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">
                  View All Important Questions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Practice Papers Tab Content */}
          <TabsContent value="papers">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Previous Year Papers</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download All Papers
                  </Button>
                </div>
              </div>
              
              {selectedPaper ? (
                <div className="space-y-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedPaper(null)}
                    className="mb-2"
                  >
                    ← Back to Papers List
                  </Button>
                  
                  {/* Selected Paper Details */}
                  {(() => {
                    const paper = pastPapers.find(p => p.id === selectedPaper);
                    if (!paper) return null;
                    
                    return (
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="flex items-center">
                                  {paper.year} {paper.name}
                                </CardTitle>
                                <CardDescription>
                                  Attempt this paper in a real exam environment
                                </CardDescription>
                              </div>
                              <Badge variant={paper.attempted ? "outline" : "default"}>
                                {paper.attempted ? "Attempted" : "Not Attempted"}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <FileText className="h-8 w-8 text-blue-500 mb-2" />
                                <span className="text-xl font-bold">{paper.questions}</span>
                                <span className="text-sm text-gray-500">Questions</span>
                              </div>
                              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <Clock className="h-8 w-8 text-amber-500 mb-2" />
                                <span className="text-xl font-bold">{paper.timeMinutes}</span>
                                <span className="text-sm text-gray-500">Minutes</span>
                              </div>
                              {paper.attempted ? (
                                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <Target className="h-8 w-8 text-green-500 mb-2" />
                                  <span className="text-xl font-bold">{paper.score}</span>
                                  <span className="text-sm text-gray-500">Your Score</span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <BarChart2 className="h-8 w-8 text-purple-500 mb-2" />
                                  <span className="text-xl font-bold">--</span>
                                  <span className="text-sm text-gray-500">Not Attempted</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-lg font-medium mb-2">Exam Instructions</h4>
                                <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                  <CardContent className="p-4 space-y-2">
                                    <p>• You have <strong>{paper.timeMinutes} minutes</strong> to complete this exam.</p>
                                    <p>• There are <strong>{paper.questions} questions</strong> in total.</p>
                                    <p>• The exam contains multiple choice questions with a single correct answer.</p>
                                    <p>• Each correct answer will award 4 marks, while each incorrect answer will deduct 1 mark.</p>
                                    <p>• You can mark questions for review and come back to them later.</p>
                                    <p>• Your progress will be saved automatically.</p>
                                    <p>• Once you submit the exam, you cannot retake it.</p>
                                  </CardContent>
                                </Card>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="flex-1 gap-2">
                                  <BookOpen size={18} />
                                  {paper.attempted ? "Review Attempt" : "Start Exam"}
                                </Button>
                                <Button variant="outline" className="flex-1 gap-2">
                                  <Download size={18} />
                                  Download Paper
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {paper.attempted && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Your Performance</CardTitle>
                              <CardDescription>Summary of your previous attempt</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span>Score: {paper.score} / {paper.questions * 4}</span>
                                  <span className="text-sm">
                                    {Math.round((paper.score / (paper.questions * 4)) * 100)}%
                                  </span>
                                </div>
                                <Progress value={Math.round((paper.score / (paper.questions * 4)) * 100)} />
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Card className="bg-gray-50 dark:bg-gray-800">
                                  <CardContent className="p-4 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-green-600">
                                      {Math.round(paper.score / 4)}
                                    </span>
                                    <span className="text-sm text-gray-500">Correct</span>
                                  </CardContent>
                                </Card>
                                <Card className="bg-gray-50 dark:bg-gray-800">
                                  <CardContent className="p-4 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-red-600">
                                      {Math.round((paper.questions - paper.score / 4) / 2)}
                                    </span>
                                    <span className="text-sm text-gray-500">Incorrect</span>
                                  </CardContent>
                                </Card>
                                <Card className="bg-gray-50 dark:bg-gray-800">
                                  <CardContent className="p-4 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-600">
                                      {Math.round((paper.questions - paper.score / 4) / 2)}
                                    </span>
                                    <span className="text-sm text-gray-500">Skipped</span>
                                  </CardContent>
                                </Card>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" className="w-full">View Detailed Analytics</Button>
                            </CardFooter>
                          </Card>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPapers.map((paper) => (
                    <Card key={paper.id} className="overflow-hidden hover:border-primary transition-colors cursor-pointer" onClick={() => setSelectedPaper(paper.id)}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{paper.year} {paper.name}</CardTitle>
                            <CardDescription>{paper.questions} questions • {paper.timeMinutes} minutes</CardDescription>
                          </div>
                          <Badge variant={paper.attempted ? "outline" : "default"}>
                            {paper.attempted ? "Attempted" : "Not Attempted"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        {paper.attempted ? (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Your Score</span>
                              <span className="font-medium">{paper.score} / {paper.questions * 4}</span>
                            </div>
                            <Progress value={Math.round((paper.score / (paper.questions * 4)) * 100)} className="h-2" />
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock size={14} className="mr-1" />
                            <span>Available for practice</span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0 border-t">
                        <div className="w-full flex justify-between items-center pt-2 text-sm">
                          <span>{paper.attempted ? "Attempted on 12 May, 2023" : "Not attempted yet"}</span>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            {paper.attempted ? "Review" : "Take Exam"} →
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default PreviousYearAnalysisPage;
