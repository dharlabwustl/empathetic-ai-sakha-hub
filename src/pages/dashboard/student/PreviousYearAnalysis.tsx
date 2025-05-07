
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, BookOpen, FileText, TrendingUp, CalendarDays, BarChart2, PieChart as PieChartIcon, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const PreviousYearAnalysis = () => {
  const [activeSubject, setActiveSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2023');
  
  // Mock data for previous years
  const examYears = ['2023', '2022', '2021', '2020', '2019'];
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
  
  const topicDistributionData = [
    { name: 'Mechanics', questions: 12, avgDifficulty: 'Medium' },
    { name: 'Electrodynamics', questions: 8, avgDifficulty: 'Hard' },
    { name: 'Thermodynamics', questions: 6, avgDifficulty: 'Medium' },
    { name: 'Optics', questions: 7, avgDifficulty: 'Easy' },
    { name: 'Modern Physics', questions: 5, avgDifficulty: 'Hard' },
    { name: 'Chemical Bonding', questions: 9, avgDifficulty: 'Medium' },
    { name: 'Organic Chemistry', questions: 10, avgDifficulty: 'Hard' },
    { name: 'Human Physiology', questions: 11, avgDifficulty: 'Medium' }
  ];
  
  const yearTrendData = [
    { year: '2019', easy: 35, medium: 45, hard: 20 },
    { year: '2020', easy: 30, medium: 50, hard: 20 },
    { year: '2021', easy: 25, medium: 55, hard: 20 },
    { year: '2022', easy: 20, medium: 55, hard: 25 },
    { year: '2023', easy: 15, medium: 50, hard: 35 },
  ];
  
  const subjectWiseData = [
    { name: 'Physics', easy: 15, medium: 50, hard: 35 },
    { name: 'Chemistry', easy: 20, medium: 45, hard: 35 },
    { name: 'Biology', easy: 25, medium: 50, hard: 25 },
  ];
  
  // Topic trends for each year
  const topTrendingTopics = [
    { id: '1', name: 'Organic Chemistry Mechanisms', trend: '+12%', importance: 'high' },
    { id: '2', name: 'Electrodynamics & Magnetism', trend: '+8%', importance: 'high' },
    { id: '3', name: 'Human Physiology', trend: '+5%', importance: 'medium' },
    { id: '4', name: 'Modern Physics', trend: '+3%', importance: 'high' }
  ];
  
  // Example questions
  const importantQuestions = [
    {
      id: 'q1',
      year: '2023',
      subject: 'Physics',
      topic: 'Electrodynamics',
      difficulty: 'Hard',
      question: 'A straight wire of length 0.5 m moves with a velocity of 2 m/s perpendicular to its length and to a magnetic field of strength 0.3 T. What is the emf induced in the wire?',
      answer: '0.3 V',
      frequency: '3 years'
    },
    {
      id: 'q2',
      year: '2023',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      difficulty: 'Medium',
      question: 'Which of the following alcohols will give a positive iodoform test?',
      answer: 'Ethanol',
      frequency: '4 years'
    },
    {
      id: 'q3',
      year: '2023',
      subject: 'Biology',
      topic: 'Human Physiology',
      difficulty: 'Medium',
      question: 'What is the role of HCl in the stomach?',
      answer: 'Activation of pepsinogen to pepsin and creating acidic environment',
      frequency: '5 years'
    }
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
  
  const filteredQuestions = getFilteredQuestions();
  
  return (
    <SharedPageLayout
      title="Previous Years Analysis"
      subtitle="Comprehensive analysis of past exam patterns and trends"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Year & Subject Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <Tabs defaultValue={activeSubject} value={activeSubject} onValueChange={setActiveSubject}>
            <TabsList>
              {subjects.map(subject => (
                <TabsTrigger key={subject.id} value={subject.id}>
                  {subject.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
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
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Analysis
            </Button>
          </div>
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
                  <span className="text-2xl font-bold">5</span>
                </div>
                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Difficulty Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2" />
                Difficulty Distribution
              </CardTitle>
              <CardDescription>Distribution of questions by difficulty level</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={difficultyDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {difficultyDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => `${value} questions`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Topic Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 mr-2" />
                Topic-wise Distribution
              </CardTitle>
              <CardDescription>Number of questions from each topic</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topicDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="questions" 
                      fill="#4f46e5" 
                      name="Questions" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Year Trend Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Year-wise Difficulty Trend
              </CardTitle>
              <CardDescription>How question difficulty has changed over years</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearTrendData} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="easy" stackId="a" fill="#4ade80" name="Easy" />
                    <Bar dataKey="medium" stackId="a" fill="#fb923c" name="Medium" />
                    <Bar dataKey="hard" stackId="a" fill="#f87171" name="Hard" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Subject-wise Difficulty */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Subject-wise Difficulty Breakdown
              </CardTitle>
              <CardDescription>Difficulty distribution by subject</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectWiseData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="easy" stackId="a" fill="#4ade80" name="Easy" />
                    <Bar dataKey="medium" stackId="a" fill="#fb923c" name="Medium" />
                    <Bar dataKey="hard" stackId="a" fill="#f87171" name="Hard" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Trending Topics Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Top Trending Topics
            </CardTitle>
            <CardDescription>Topics with increased weightage in recent years</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topTrendingTopics.map(topic => (
                <Card key={topic.id} className={`bg-gradient-to-br ${
                  topic.importance === 'high' 
                    ? 'from-red-50 to-orange-50 border-red-100' 
                    : 'from-blue-50 to-purple-50 border-blue-100'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{topic.name}</h3>
                      <Badge variant={topic.importance === 'high' ? 'default' : 'outline'}>
                        {topic.trend}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <Link to={`/dashboard/student/concepts?topic=${encodeURIComponent(topic.name)}`}>
                          Study This Topic
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Important Questions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Questions that appear regularly in exams</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No questions match your filter criteria
                </div>
              ) : (
                filteredQuestions.map((question, index) => (
                  <AccordionItem key={question.id} value={`question-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-col items-start text-left w-full pr-4">
                        <div className="flex items-center gap-2 mb-1 w-full">
                          <Badge variant="outline" className="bg-gray-50">
                            {question.year}
                          </Badge>
                          <Badge variant="outline" className={
                            question.subject === 'Physics' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            question.subject === 'Chemistry' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                            'bg-green-50 text-green-700 border-green-200'
                          }>
                            {question.subject}
                          </Badge>
                          <Badge variant="outline" className={
                            question.difficulty === 'Hard' ? 'bg-red-50 text-red-700 border-red-200' :
                            question.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-green-50 text-green-700 border-green-200'
                          }>
                            {question.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-500 ml-auto">
                            Appeared in {question.frequency}
                          </span>
                        </div>
                        <h4 className="font-medium text-sm md:text-base">{question.question}</h4>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-green-50 p-3 rounded-md mb-3">
                        <p className="font-medium text-green-800">Answer: {question.answer}</p>
                      </div>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/dashboard/student/concepts?topic=${encodeURIComponent(question.topic)}`}>
                            <BookOpen className="h-4 w-4 mr-1" />
                            Study Related Concept
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/dashboard/student/practice?topic=${encodeURIComponent(question.topic)}`}>
                            <FileText className="h-4 w-4 mr-1" />
                            Practice Similar Questions
                          </Link>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </CardContent>
        </Card>
        
        {/* Action Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="w-full" asChild>
            <Link to="/dashboard/student/practice">
              Take Full Practice Exam
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/dashboard/student/syllabus">
              Review Full Syllabus
            </Link>
          </Button>
          <Button variant="outline" className="w-full">
            Download Previous Year Papers
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default PreviousYearAnalysis;
