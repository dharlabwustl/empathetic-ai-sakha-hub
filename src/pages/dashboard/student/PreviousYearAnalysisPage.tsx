
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileDown, BookOpen, Brain, FileText, TrendingUp, ArrowLeft, LineChart, PieChart } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock data - in a real app, this would come from the backend based on exam goal
const MOCK_DATA = {
  examName: "NEET",
  years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
  subjects: ['Physics', 'Chemistry', 'Biology'],
  subjectStats: {
    Physics: { questions: 45, difficulty: 'Medium', successRate: 65 },
    Chemistry: { questions: 45, difficulty: 'Hard', successRate: 55 },
    Biology: { questions: 90, difficulty: 'Medium', successRate: 75 },
  },
  questions: [
    {
      id: 1,
      subject: 'Physics',
      topic: 'Mechanics',
      question: 'A ball is thrown vertically upward with initial velocity...',
      difficulty: 'Medium',
      successRate: 45,
      yearsAppeared: ['2023', '2021', '2019'],
      conceptId: 'concept-123',
      flashcardId: 'flashcard-123',
      practiceExamId: 'exam-123'
    },
    {
      id: 2,
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      question: 'The IUPAC name of the compound CH₃-CH₂-CO-CH₃ is...',
      difficulty: 'Hard',
      successRate: 35,
      yearsAppeared: ['2024', '2022', '2020'],
      conceptId: 'concept-124',
      flashcardId: 'flashcard-124',
      practiceExamId: 'exam-124'
    },
    {
      id: 3,
      subject: 'Biology',
      topic: 'Human Physiology',
      question: 'Which of the following is not a function of the liver?',
      difficulty: 'Easy',
      successRate: 65,
      yearsAppeared: ['2024', '2023', '2021'],
      conceptId: 'concept-125',
      flashcardId: 'flashcard-125',
      practiceExamId: 'exam-125'
    }
  ],
  topicTrends: {
    Physics: [
      { topic: 'Mechanics', frequency: 12, trend: 'increasing' },
      { topic: 'Electromagnetism', frequency: 10, trend: 'stable' },
      { topic: 'Optics', frequency: 8, trend: 'decreasing' }
    ],
    Chemistry: [
      { topic: 'Organic Chemistry', frequency: 15, trend: 'stable' },
      { topic: 'Inorganic Chemistry', frequency: 12, trend: 'increasing' },
      { topic: 'Physical Chemistry', frequency: 10, trend: 'stable' }
    ],
    Biology: [
      { topic: 'Human Physiology', frequency: 20, trend: 'increasing' },
      { topic: 'Genetics', frequency: 18, trend: 'increasing' },
      { topic: 'Ecology', frequency: 8, trend: 'decreasing' }
    ]
  }
};

const PreviousYearAnalysisPage = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [currentTab, setCurrentTab] = useState('overview');
  const [examName, setExamName] = useState('');
  
  // In a real implementation, this would fetch data from an API
  useEffect(() => {
    // Simulate fetching exam name from study plan
    setExamName(MOCK_DATA.examName);
    
    // Simulate loading data based on the exam goal
    console.log(`Fetching PYQ data for ${MOCK_DATA.examName}, year: ${selectedYear}, subject: ${selectedSubject}`);
  }, [selectedYear, selectedSubject]);

  return (
    <SharedPageLayout
      title="Previous Year Papers Analysis"
      subtitle={`Analyzing patterns from ${MOCK_DATA.years[MOCK_DATA.years.length - 1]} to ${MOCK_DATA.years[0]}`}
    >
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      
      {/* Header Section with Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{examName} Previous Year Papers</h1>
          <p className="text-gray-500">
            10-year comprehensive analysis to boost your preparation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Download PYQs
          </Button>
          <Button variant="default">Attempt Full Paper</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {MOCK_DATA.years.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {MOCK_DATA.subjects.map(subject => (
              <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Tabs for different views */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Subject Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {MOCK_DATA.subjects.map(subject => (
              <Card key={subject} className="p-4">
                <CardHeader className="pb-2 pt-2">
                  <CardTitle className="text-lg">{subject}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Questions</span>
                      <span>{MOCK_DATA.subjectStats[subject].questions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Difficulty</span>
                      <Badge variant={MOCK_DATA.subjectStats[subject].difficulty === 'Hard' ? 'destructive' : 'outline'}>
                        {MOCK_DATA.subjectStats[subject].difficulty}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span>{MOCK_DATA.subjectStats[subject].successRate}%</span>
                    </div>
                    <Progress value={MOCK_DATA.subjectStats[subject].successRate} className="h-2 mt-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Topic Distribution */}
          <Card className="p-6">
            <CardHeader className="pb-2 pt-0">
              <CardTitle className="text-lg">Top Topics by Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MOCK_DATA.subjects.map(subject => (
                  <div key={subject} className="space-y-2">
                    <h3 className="font-medium text-sm text-gray-500">{subject}</h3>
                    <div className="space-y-2">
                      {MOCK_DATA.topicTrends[subject].map(topic => (
                        <div key={topic.topic} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{topic.topic}</span>
                            {topic.trend === 'increasing' && <TrendingUp className="h-3 w-3 text-green-500" />}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{topic.frequency} questions</span>
                            <Badge variant="outline" className="text-xs">
                              {topic.trend === 'increasing' ? 'Trending' : 
                               topic.trend === 'decreasing' ? 'Less Important' : 'Stable'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Questions Tab */}
        <TabsContent value="questions" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Question Analysis</h2>
          {/* Sample Question Cards */}
          {MOCK_DATA.questions.map(question => (
            <Card key={question.id} className="p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm text-gray-500">{question.subject} - {question.topic}</span>
                  <h3 className="font-medium mt-1">{question.question}</h3>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => navigate(`/dashboard/student/concepts/card/${question.conceptId}`)}
                  >
                    <BookOpen className="h-4 w-4" />
                    Concept
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => navigate(`/dashboard/student/flashcards/${question.flashcardId}/practice`)}
                  >
                    <Brain className="h-4 w-4" />
                    Practice
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => navigate(`/dashboard/student/practice-exam/${question.practiceExamId}/start`)}
                  >
                    <FileText className="h-4 w-4" />
                    Similar Q's
                  </Button>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Difficulty: 
                  <Badge variant={question.difficulty === 'Hard' ? 'destructive' : 'outline'} className="ml-1">
                    {question.difficulty}
                  </Badge>
                </span>
                <span>Success Rate: {question.successRate}%</span>
                <span>Appeared in: {question.yearsAppeared.join(', ')}</span>
              </div>
            </Card>
          ))}
        </TabsContent>
        
        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="p-6">
            <CardHeader className="pb-2 pt-0">
              <CardTitle className="text-lg">Exam Pattern Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <PieChart className="h-12 w-12 text-indigo-500" />
                  <div>
                    <h3 className="font-medium">Subject Distribution</h3>
                    <p className="text-gray-500 text-sm">Biology has consistently had the highest weightage (45%), followed by Chemistry (25%) and Physics (25%)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <LineChart className="h-12 w-12 text-indigo-500" />
                  <div>
                    <h3 className="font-medium">Difficulty Trends</h3>
                    <p className="text-gray-500 text-sm">2023-2024 papers showed increased difficulty in Biology section, while Physics remained constant</p>
                  </div>
                </div>
                
                <h3 className="font-medium mt-4">Strategic Insights</h3>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                      <span>Focus on Human Physiology and Genetics in Biology - trending topics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                      <span>Inorganic Chemistry questions have increased by 15% in recent years</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                      <span>Mechanics and Electromagnetism remain steady high-weightage topics in Physics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="p-6">
            <CardHeader className="pb-2 pt-0">
              <CardTitle className="text-lg">Your Preparation Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">Based on {examName} exam trends and your study progress, we recommend:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MOCK_DATA.subjects.map(subject => (
                    <Card key={subject} className="p-4 border-l-4 border-l-indigo-500">
                      <h4 className="font-medium">{subject}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {subject === 'Physics' && 'Focus on Mechanics and Optics'}
                        {subject === 'Chemistry' && 'Strengthen Organic Chemistry'}
                        {subject === 'Biology' && 'Prioritize Human Physiology'}
                      </p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto mt-2"
                        onClick={() => navigate(`/dashboard/student/syllabus?subject=${subject.toLowerCase()}`)}
                      >
                        View in Syllabus →
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default PreviousYearAnalysisPage;
