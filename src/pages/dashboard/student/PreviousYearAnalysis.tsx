
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, BookOpen, FileText, TrendingUp, CalendarDays, BarChart2, Target, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const PreviousYearAnalysis = () => {
  const [activeSubject, setActiveSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [activeTab, setActiveTab] = useState('papers'); // Default to papers tab
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const { toast } = useToast();
  
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
    // 2025 Papers (Future papers)
    { id: '2025-main', year: '2025', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Expected: Medium', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'Expected Pattern' },
    { id: '2025-advanced', year: '2025', name: 'Advanced Paper', questions: 120, timeMinutes: 180, attempted: false, difficulty: 'Expected: Hard', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'Expected Pattern' },
    
    // 2024 Papers (Current/Future papers)
    { id: '2024-main', year: '2024', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Expected: Medium-Hard', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'Expected Pattern' },
    { id: '2024-advanced', year: '2024', name: 'Advanced Paper', questions: 120, timeMinutes: 180, attempted: false, difficulty: 'Expected: Hard', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'Expected Pattern' },
    
    // 2023 Papers
    { id: '2023-main', year: '2023', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: true, score: 143, subjects: ['Physics', 'Chemistry', 'Biology'], difficulty: 'Medium-Hard', category: 'NEET UG' },
    { id: '2023-advanced', year: '2023', name: 'Advanced Paper', questions: 120, timeMinutes: 180, attempted: false, difficulty: 'Hard', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'NEET Advanced' },
    
    // 2022 Papers
    { id: '2022-main', year: '2022', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: true, score: 126, subjects: ['Physics', 'Chemistry', 'Biology'], difficulty: 'Medium', category: 'NEET UG' },
    { id: '2022-advanced', year: '2022', name: 'Advanced Paper', questions: 120, timeMinutes: 180, attempted: false, difficulty: 'Hard', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'NEET Advanced' },
    
    // 2021 Papers
    { id: '2021-main', year: '2021', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: true, score: 131, subjects: ['Physics', 'Chemistry', 'Biology'], difficulty: 'Medium', category: 'NEET UG' },
    { id: '2021-phase2', year: '2021', name: 'Phase II Examination', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Medium', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'NEET UG' },
    
    // 2020 Papers
    { id: '2020-main', year: '2020', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Medium', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'NEET UG' },
    
    // 2019 Papers
    { id: '2019-main', year: '2019', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Medium', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'NEET UG' },
    
    // 2018 Papers
    { id: '2018-main', year: '2018', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Medium-Easy', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'NEET UG' },
    
    // 2017 Papers
    { id: '2017-main', year: '2017', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Medium', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'NEET UG' },
    
    // 2016 Papers
    { id: '2016-main', year: '2016', name: 'Main Examination', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Medium-Hard', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'NEET UG' },
    { id: '2016-phase2', year: '2016', name: 'Phase II Examination', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Medium', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'NEET UG' },
    
    // 2015 Papers
    { id: '2015-main', year: '2015', name: 'Main Examination (AIPMT)', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Medium', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'AIPMT' },
    
    // 2014 Papers
    { id: '2014-main', year: '2014', name: 'Main Examination (AIPMT)', questions: 180, timeMinutes: 180, attempted: false, difficulty: 'Medium', subjects: ['Physics', 'Chemistry', 'Biology'], category: 'AIPMT' },
  ];
  
  // Topic distribution data
  const topicDistributionData = [
    { name: 'Mechanics', value: 15 },
    { name: 'Electromagnetism', value: 10 },
    { name: 'Optics', value: 8 },
    { name: 'Organic Chemistry', value: 18 },
    { name: 'Inorganic Chemistry', value: 12 },
    { name: 'Physical Chemistry', value: 10 },
    { name: 'Human Physiology', value: 14 },
    { name: 'Plant Physiology', value: 9 },
    { name: 'Genetics', value: 10 },
  ];
  
  const yearTrendData = [
    { year: '2016', difficulty: 68 },
    { year: '2017', difficulty: 65 },
    { year: '2018', difficulty: 62 },
    { year: '2019', difficulty: 70 },
    { year: '2020', difficulty: 72 },
    { year: '2021', difficulty: 75 },
    { year: '2022', difficulty: 73 },
    { year: '2023', difficulty: 76 },
  ];
  
  const subjectWiseData = [
    { name: 'Physics', easy: 25, medium: 40, hard: 35 },
    { name: 'Chemistry', easy: 30, medium: 45, hard: 25 },
    { name: 'Biology', easy: 35, medium: 40, hard: 25 },
  ];
  
  // Topic trends for each year
  const topTrendingTopics = [
    { id: 1, name: 'Organic Reactions', trend: 'Increasing', percentage: '23%', subject: 'Chemistry' },
    { id: 2, name: 'Modern Physics', trend: 'Increasing', percentage: '18%', subject: 'Physics' },
    { id: 3, name: 'Human Physiology', trend: 'Stable', percentage: '16%', subject: 'Biology' },
    { id: 4, name: 'Electrochemistry', trend: 'Decreasing', percentage: '14%', subject: 'Chemistry' },
    { id: 5, name: 'Genetics', trend: 'Increasing', percentage: '19%', subject: 'Biology' },
  ];
  
  // Example questions
  const importantQuestions = [
    { id: 1, year: '2023', subject: 'Physics', question: 'A particle moves in a circle of radius 5m with constant speed 10m/s. The magnitude of its acceleration is:', difficulty: 'Medium' },
    { id: 2, year: '2023', subject: 'Chemistry', question: 'Which of the following reagents would be most suitable for converting CH₃CH₂OH to CH₃CHO?', difficulty: 'Hard' },
    { id: 3, year: '2022', subject: 'Biology', question: 'Penicillin acts by inhibiting the synthesis of:', difficulty: 'Medium' },
    { id: 4, year: '2022', subject: 'Physics', question: 'Which of the following is a correct statement about the photoelectric effect?', difficulty: 'Hard' },
    { id: 5, year: '2021', subject: 'Chemistry', question: 'The IUPAC name of the compound CH₃COCH₂COCH₃ is:', difficulty: 'Medium' },
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
  
  // Handle start exam 
  const handleStartExam = (paperId: string) => {
    toast({
      title: "Exam Environment Loading",
      description: "Preparing real exam environment. This will open in fullscreen mode.",
      duration: 3000,
    });
    
    // In a real app, this would navigate to the exam environment
    // For now, we'll just simulate it by selecting the paper
    setTimeout(() => {
      setSelectedPaper(paperId);
    }, 1000);
  };
  
  // Group papers by year for better organization
  const papersByYear = examYears.map(year => ({
    year,
    papers: pastPapers.filter(paper => paper.year === year)
  })).filter(group => group.papers.length > 0);
  
  const filteredQuestions = getFilteredQuestions();
  const filteredPapers = getFilteredPapers();

  return (
    <SharedPageLayout
      title="Previous Years Analysis"
      subtitle="Analyze exam patterns and attempt question papers from the last 10 years in a real exam environment"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Main Tabs: Analysis or Practice Papers */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
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
                      <span className="text-2xl font-bold">10</span>
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
                  <CardTitle>Difficulty Distribution</CardTitle>
                  <CardDescription>Analysis of question difficulty across years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={difficultyDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {difficultyDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Topic Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Topic Distribution</CardTitle>
                  <CardDescription>Most frequent topics across all papers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topicDistributionData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trending Topics Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>
                  Topics that are increasing in frequency or importance in recent years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left px-4 py-2">Topic</th>
                        <th className="text-left px-4 py-2">Subject</th>
                        <th className="text-left px-4 py-2">Trend</th>
                        <th className="text-left px-4 py-2">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topTrendingTopics.map((topic) => (
                        <tr key={topic.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-2">{topic.name}</td>
                          <td className="px-4 py-2">{topic.subject}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              topic.trend === 'Increasing' 
                                ? 'bg-green-100 text-green-800' 
                                : topic.trend === 'Decreasing'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {topic.trend}
                            </span>
                          </td>
                          <td className="px-4 py-2">{topic.percentage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Important Questions Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Important Questions</CardTitle>
                <CardDescription>
                  Frequently appearing or significant questions from previous years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredQuestions.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredQuestions.map((q) => (
                        <AccordionItem key={q.id} value={`question-${q.id}`}>
                          <AccordionTrigger className="text-left">
                            <div className="flex justify-between items-center w-full pr-4">
                              <div className="text-sm md:text-base">{q.question.substring(0, 60)}...</div>
                              <div className="flex gap-2">
                                <Badge>{q.subject}</Badge>
                                <Badge variant={q.difficulty === 'Hard' ? 'destructive' : 'outline'}>
                                  {q.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="p-4 space-y-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Year: {q.year}</p>
                                <p className="mt-2">{q.question}</p>
                              </div>
                              <div className="pt-2">
                                <Button variant="outline" size="sm">
                                  <BookOpen className="mr-2 h-4 w-4" />
                                  View Solution
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center p-6 border rounded-lg">
                      <p className="text-muted-foreground">No questions found for the selected filters.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Practice Papers Tab Content */}
          <TabsContent value="papers">
            {selectedPaper ? (
              <ExamPaperSimulator 
                paperId={selectedPaper} 
                papers={pastPapers} 
                onBack={() => setSelectedPaper(null)} 
              />
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">Previous Year Question Papers</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download All Papers
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {selectedYear === 'all' ? (
                    // Group papers by year when "All Years" is selected
                    papersByYear.map((yearGroup) => (
                      <div key={yearGroup.year} className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2" />
                          {yearGroup.year} Papers
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {yearGroup.papers.map((paper) => (
                            <PaperCard 
                              key={paper.id} 
                              paper={paper} 
                              onStartExam={() => handleStartExam(paper.id)} 
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    // Show papers for the selected year
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredPapers.length > 0 ? (
                        filteredPapers.map((paper) => (
                          <PaperCard 
                            key={paper.id} 
                            paper={paper} 
                            onStartExam={() => handleStartExam(paper.id)} 
                          />
                        ))
                      ) : (
                        <div className="col-span-3 text-center p-8 border rounded-lg">
                          <p className="text-muted-foreground">No papers found for the selected year.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* How to use section */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      How to Use Previous Year Papers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>Previous year question papers are an essential resource for your exam preparation. Here's how to use them effectively:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                          <h4 className="font-medium mb-2">Real Exam Environment</h4>
                          <p className="text-sm text-muted-foreground">Attempt papers in timed conditions to simulate the actual exam environment and build stamina.</p>
                        </div>
                        
                        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                          <h4 className="font-medium mb-2">Pattern Analysis</h4>
                          <p className="text-sm text-muted-foreground">Identify recurring topics and question patterns to focus your preparation on high-yield areas.</p>
                        </div>
                        
                        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                          <h4 className="font-medium mb-2">Performance Tracking</h4>
                          <p className="text-sm text-muted-foreground">Track your performance across different papers to identify strengths and weaknesses.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

// Paper Card Component for displaying each question paper
interface PaperCardProps {
  paper: any;
  onStartExam: () => void;
}

const PaperCard = ({ paper, onStartExam }: PaperCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{paper.name}</CardTitle>
          <Badge variant={paper.attempted ? "outline" : "default"}>
            {paper.attempted ? "Attempted" : "New"}
          </Badge>
        </div>
        <CardDescription>{paper.year} - {paper.category}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm space-y-4 pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Questions</span>
            <span className="font-medium">{paper.questions}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Time</span>
            <span className="font-medium">{paper.timeMinutes} min</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Difficulty</span>
            <span className="font-medium">{paper.difficulty}</span>
          </div>
          <div className="flex flex-col">
            {paper.attempted && (
              <>
                <span className="text-xs text-muted-foreground">Your Score</span>
                <span className="font-medium">{paper.score}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {paper.subjects && paper.subjects.map((subject: string, index: number) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md"
            >
              {subject}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onStartExam} 
          className="w-full"
          variant={paper.year >= '2024' ? 'outline' : 'default'}
        >
          {paper.year >= '2024' ? 'Try Expected Pattern' : 'Start in Exam Mode'} 
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Exam Paper Simulator Component
interface ExamPaperSimulatorProps {
  paperId: string;
  papers: any[];
  onBack: () => void;
}

const ExamPaperSimulator = ({ paperId, papers, onBack }: ExamPaperSimulatorProps) => {
  const paper = papers.find(p => p.id === paperId);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(paper?.timeMinutes * 60 || 10800);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [examMode, setExamMode] = useState<'instructions' | 'exam' | 'review'>('instructions');
  const { toast } = useToast();
  
  // Format time as hh:mm:ss
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hrs, mins, secs]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
  };
  
  // Start exam timer
  useEffect(() => {
    if (examMode === 'exam') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            toast({
              title: "Time's up!",
              description: "Your exam has ended as the allotted time is over.",
              variant: "destructive",
            });
            setExamMode('review');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [examMode, toast]);
  
  // Handle starting the exam
  const handleStartExam = () => {
    setExamMode('exam');
    toast({
      title: "Exam Started",
      description: "Your timer has begun. Good luck!",
    });
  };
  
  // Handle submitting the exam
  const handleSubmitExam = () => {
    setExamMode('review');
    toast({
      title: "Exam Submitted",
      description: "Your answers have been recorded for review.",
    });
  };
  
  // Navigate to the next question
  const goToNextQuestion = () => {
    if (currentQuestion < 180) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  // Navigate to the previous question
  const goToPrevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionNumber: number, option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionNumber]: option
    });
  };
  
  // Mock questions data based on the selected paper
  const generateMockQuestions = () => {
    // In a real app, this would fetch from an API
    // For now, we'll just generate some mock questions
    return {
      physics: Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        question: `Physics Question ${i + 1} from ${paper?.year} ${paper?.name}`,
        options: ['A', 'B', 'C', 'D'],
        subject: 'Physics'
      })),
      chemistry: Array.from({ length: 45 }, (_, i) => ({
        id: i + 46,
        question: `Chemistry Question ${i + 1} from ${paper?.year} ${paper?.name}`,
        options: ['A', 'B', 'C', 'D'],
        subject: 'Chemistry'
      })),
      biology: Array.from({ length: 90 }, (_, i) => ({
        id: i + 91,
        question: `Biology Question ${i + 1} from ${paper?.year} ${paper?.name}`,
        options: ['A', 'B', 'C', 'D'],
        subject: 'Biology'
      }))
    };
  };
  
  const mockQuestions = generateMockQuestions();
  
  // Find the current question
  const findCurrentQuestion = () => {
    if (currentQuestion <= 45) {
      return mockQuestions.physics[currentQuestion - 1];
    } else if (currentQuestion <= 90) {
      return mockQuestions.chemistry[currentQuestion - 46 - 1];
    } else {
      return mockQuestions.biology[currentQuestion - 91 - 1];
    }
  };
  
  const currentQuestionData = findCurrentQuestion();
  
  // Get the subject of the current question
  const getCurrentSubject = () => {
    if (currentQuestion <= 45) return 'Physics';
    if (currentQuestion <= 90) return 'Chemistry';
    return 'Biology';
  };
  
  // Calculate progress
  const calculateProgress = () => {
    return (Object.keys(selectedAnswers).length / 180) * 100;
  };
  
  if (!paper) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p>Paper not found</p>
          <Button className="mt-4" onClick={onBack}>Back to Papers</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {examMode === 'instructions' ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{paper.year} {paper.name}</CardTitle>
                <CardDescription>
                  Read the instructions carefully before starting the exam
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={onBack}>Back to Papers</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <FileText className="h-10 w-10 text-blue-500 mb-2" />
                <span className="text-2xl font-bold">{paper.questions}</span>
                <span className="text-sm text-gray-500">Questions</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Clock className="h-10 w-10 text-amber-500 mb-2" />
                <span className="text-2xl font-bold">{paper.timeMinutes}</span>
                <span className="text-sm text-gray-500">Minutes</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Target className="h-10 w-10 text-green-500 mb-2" />
                <span className="text-2xl font-bold">{paper.difficulty}</span>
                <span className="text-sm text-gray-500">Difficulty</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Examination Instructions</h3>
              <ul className="space-y-3 list-disc pl-5 text-sm">
                <li>This exam consists of {paper.questions} multiple-choice questions divided between Physics, Chemistry, and Biology.</li>
                <li>You have {paper.timeMinutes} minutes to complete the exam.</li>
                <li>Each question has only one correct answer.</li>
                <li>Each correct answer is worth 4 marks. Each incorrect answer will deduct 1 mark.</li>
                <li>You can navigate between questions using the question palette or next/previous buttons.</li>
                <li>You can mark questions for review and return to them later.</li>
                <li>The timer will be displayed at all times. The exam will auto-submit once time is up.</li>
                <li>Click the "Submit" button when you're ready to end the exam.</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Subject-wise Distribution</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Physics</span>
                    <span className="text-sm font-medium">45 Questions</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Chemistry</span>
                    <span className="text-sm font-medium">45 Questions</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Biology</span>
                    <span className="text-sm font-medium">90 Questions</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-lg border border-amber-200 dark:border-amber-900">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-400 mb-2">Important Notice</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This simulated exam is designed to replicate the actual {paper.year} exam experience. 
                The timer will start as soon as you begin, and you won't be able to pause it. 
                Ensure you're ready before clicking "Begin Exam".
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onBack}>Cancel</Button>
            <Button onClick={handleStartExam}>Begin Exam</Button>
          </CardFooter>
        </Card>
      ) : examMode === 'exam' ? (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Exam Header */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold">{paper.year} {paper.name}</h2>
              <p className="text-sm text-muted-foreground">Question {currentQuestion} of {paper.questions}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center">
                <Clock className="h-4 w-4 mr-2 text-red-500" />
                <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
              </div>
              <Button variant="destructive" onClick={handleSubmitExam}>
                Submit Exam
              </Button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{Object.keys(selectedAnswers).length} of {paper.questions} answered</span>
              <span>{calculateProgress().toFixed(0)}% complete</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
          
          {/* Question Card */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex justify-between">
                <Badge>{getCurrentSubject()}</Badge>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Question {currentQuestion}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-6">{currentQuestionData?.question}</p>
              
              <div className="space-y-3">
                {currentQuestionData?.options.map((option: string) => (
                  <div 
                    key={option} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswers[currentQuestion] === option
                        ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestion, option)}
                  >
                    <div className="flex items-start">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 mt-0.5 border ${
                        selectedAnswers[currentQuestion] === option
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedAnswers[currentQuestion] === option && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span>Option {option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={goToPrevQuestion}
                disabled={currentQuestion === 1}
              >
                Previous
              </Button>
              <Button
                onClick={goToNextQuestion}
                disabled={currentQuestion === paper.questions}
              >
                Next
              </Button>
            </CardFooter>
          </Card>
          
          {/* Question Navigation Panel */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Question Navigation</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: paper.questions }, (_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className={`w-10 h-10 p-0 ${
                      currentQuestion === i + 1
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : selectedAnswers[i + 1]
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : ''
                    }`}
                    onClick={() => setCurrentQuestion(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-50 dark:bg-green-900/20 border border-gray-200 dark:border-gray-700 mr-1"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-500 mr-1"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mr-1"></div>
                  <span>Unanswered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Exam Review: {paper.year} {paper.name}</CardTitle>
                  <CardDescription>
                    Your exam has been submitted successfully
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={onBack}>Back to Papers</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold">{Object.keys(selectedAnswers).length}</span>
                  <span className="text-sm text-gray-500">Questions Answered</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="text-2xl font-bold">{paper.timeMinutes - Math.floor(timeLeft / 60)}</span>
                  <span className="text-sm text-gray-500">Minutes Used</span>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold">{Math.floor(Object.keys(selectedAnswers).length * 4 * 0.8)}</span>
                  <span className="text-sm text-gray-500">Estimated Score</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Performance Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Physics</span>
                      <span className="text-sm font-medium">
                        {Object.keys(selectedAnswers).filter(key => Number(key) <= 45).length} / 45 answered
                      </span>
                    </div>
                    <Progress 
                      value={(Object.keys(selectedAnswers).filter(key => Number(key) <= 45).length / 45) * 100} 
                      className="h-2" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Chemistry</span>
                      <span className="text-sm font-medium">
                        {Object.keys(selectedAnswers).filter(key => Number(key) > 45 && Number(key) <= 90).length} / 45 answered
                      </span>
                    </div>
                    <Progress 
                      value={(Object.keys(selectedAnswers).filter(key => Number(key) > 45 && Number(key) <= 90).length / 45) * 100} 
                      className="h-2" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Biology</span>
                      <span className="text-sm font-medium">
                        {Object.keys(selectedAnswers).filter(key => Number(key) > 90).length} / 90 answered
                      </span>
                    </div>
                    <Progress 
                      value={(Object.keys(selectedAnswers).filter(key => Number(key) > 90).length / 90) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-900">
                <h3 className="text-lg font-semibold mb-2">Insights</h3>
                <p className="text-sm mb-4">
                  Based on your performance in this exam, here are some suggestions for your preparation:
                </p>
                <ul className="space-y-2 text-sm list-disc pl-5">
                  <li>
                    You performed better in {
                      Object.keys(selectedAnswers).filter(key => Number(key) <= 45).length > 
                      Object.keys(selectedAnswers).filter(key => Number(key) > 45 && Number(key) <= 90).length ?
                      'Physics' : 'Chemistry'
                    } compared to other subjects.
                  </li>
                  <li>
                    Focus more on {
                      Object.keys(selectedAnswers).filter(key => Number(key) > 90).length < 45 ?
                      'Biology' : 'Chemistry'
                    } as you attempted fewer questions in this area.
                  </li>
                  <li>
                    Your time management was {
                      paper.timeMinutes - Math.floor(timeLeft / 60) > paper.timeMinutes * 0.9 ?
                      'tight - consider practicing more speed tests' : 'good - you completed within the time limit'
                    }.
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={onBack}>
                Back to Papers
              </Button>
              <Button onClick={() => window.open('/dashboard/student/analytics', '_blank')}>
                View Detailed Analytics
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PreviousYearAnalysis;
