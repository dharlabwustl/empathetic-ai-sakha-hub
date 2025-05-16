
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileDown, 
  BookOpen, 
  Brain, 
  FileText, 
  TrendingUp, 
  ArrowLeft,
  Search,
  Filter,
  BarChart,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Calendar
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { CustomProgress } from "@/components/ui/custom-progress";

interface QuestionData {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  subject: string;
  topic: string;
  concept: string;
  conceptId: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  year: string;
  successRate: number;
  examType: string;
}

interface SubjectAnalysis {
  subject: string;
  totalQuestions: number;
  avgDifficulty: string;
  successRate: number;
  topTopics: { name: string; count: number; trend: string }[];
  yearwiseQuestions: Record<string, number>;
  questionTrend: 'increasing' | 'decreasing' | 'stable';
}

const PreviousYearAnalysisPage = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const examGoal = "NEET 2026"; // Fetched from user's study plan
  const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  const subjects = ['Physics', 'Chemistry', 'Biology'];
  
  // Mock data for subject analysis
  const subjectAnalysis: SubjectAnalysis[] = [
    {
      subject: 'Physics',
      totalQuestions: 145,
      avgDifficulty: 'Medium',
      successRate: 65,
      topTopics: [
        { name: 'Mechanics', count: 35, trend: 'stable' },
        { name: 'Electromagnetism', count: 42, trend: 'increasing' },
        { name: 'Optics', count: 28, trend: 'decreasing' }
      ],
      yearwiseQuestions: {
        '2025': 15, '2024': 14, '2023': 15, '2022': 14, '2021': 15,
        '2020': 15, '2019': 14, '2018': 15, '2017': 14, '2016': 14
      },
      questionTrend: 'stable'
    },
    {
      subject: 'Chemistry',
      totalQuestions: 155,
      avgDifficulty: 'Medium',
      successRate: 70,
      topTopics: [
        { name: 'Organic Chemistry', count: 45, trend: 'increasing' },
        { name: 'Physical Chemistry', count: 40, trend: 'stable' },
        { name: 'Inorganic Chemistry', count: 38, trend: 'decreasing' }
      ],
      yearwiseQuestions: {
        '2025': 15, '2024': 16, '2023': 16, '2022': 15, '2021': 16,
        '2020': 15, '2019': 16, '2018': 15, '2017': 16, '2016': 15
      },
      questionTrend: 'stable'
    },
    {
      subject: 'Biology',
      totalQuestions: 200,
      avgDifficulty: 'Hard',
      successRate: 60,
      topTopics: [
        { name: 'Human Physiology', count: 48, trend: 'increasing' },
        { name: 'Cell Biology', count: 42, trend: 'increasing' },
        { name: 'Genetics', count: 35, trend: 'stable' }
      ],
      yearwiseQuestions: {
        '2025': 20, '2024': 20, '2023': 20, '2022': 20, '2021': 20,
        '2020': 20, '2019': 20, '2018': 20, '2017': 20, '2016': 20
      },
      questionTrend: 'stable'
    }
  ];

  // Mock data for questions
  const mockQuestions: QuestionData[] = [
    {
      id: 'q1',
      question: "A ball is thrown vertically upward with initial velocity 20 m/s. The maximum height reached by the ball is (g = 10 m/s²)",
      answer: "20 m",
      explanation: "Using the equation h = v²/2g where v is initial velocity and g is gravity, h = (20)²/(2×10) = 400/20 = 20 m",
      subject: 'Physics',
      topic: 'Mechanics',
      concept: "Equations of Motion",
      conceptId: 'mechanics-1',
      difficulty: 'Medium',
      year: '2023',
      successRate: 45,
      examType: 'NEET'
    },
    {
      id: 'q2',
      question: "The oxidation number of iron in Fe₃O₄ is",
      answer: "8/3",
      explanation: "Fe₃O₄ can be written as FeO·Fe₂O₃, where iron exists in both +2 and +3 oxidation states. The average oxidation state is (2+3+3)/3 = 8/3",
      subject: 'Chemistry',
      topic: 'Inorganic Chemistry',
      concept: "Oxidation Numbers",
      conceptId: 'chem-redox-1',
      difficulty: 'Hard',
      year: '2022',
      successRate: 35,
      examType: 'NEET'
    },
    {
      id: 'q3',
      question: "Which of the following organelles is known as the 'powerhouse of the cell'?",
      answer: "Mitochondria",
      explanation: "Mitochondria are called the powerhouse of the cell because they generate most of the cell's supply of ATP, which is used as a source of chemical energy.",
      subject: 'Biology',
      topic: 'Cell Biology',
      concept: "Cell Organelles",
      conceptId: 'bio-cell-1',
      difficulty: 'Easy',
      year: '2024',
      successRate: 75,
      examType: 'NEET'
    },
    {
      id: 'q4',
      question: "In the Young's double slit experiment, the separation between the slits is halved and the distance between the screen and the slits is doubled. The fringe width will",
      answer: "Increase by a factor of 4",
      explanation: "Fringe width β = λD/d where λ is wavelength, D is distance to screen and d is slit separation. If d is halved and D is doubled, β increases by factor of 2×2 = 4",
      subject: 'Physics',
      topic: 'Optics',
      concept: "Wave Optics",
      conceptId: 'physics-optics-1',
      difficulty: 'Hard',
      year: '2022',
      successRate: 30,
      examType: 'NEET'
    },
    {
      id: 'q5',
      question: "The product obtained when propanone reacts with a Grignard reagent followed by hydrolysis is",
      answer: "Tertiary alcohol",
      explanation: "Grignard reagent adds to the carbonyl group of propanone. After hydrolysis, a tertiary alcohol is formed due to the addition of an alkyl group to the carbonyl carbon.",
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      concept: "Grignard Reaction",
      conceptId: 'chem-org-1',
      difficulty: 'Medium',
      year: '2020',
      successRate: 45,
      examType: 'NEET'
    }
  ];

  // Filter questions based on user selection
  const filteredQuestions = mockQuestions.filter(q => {
    const matchesYear = selectedYear === 'all' || q.year === selectedYear;
    const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.concept.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesYear && matchesSubject && matchesDifficulty && matchesSearch;
  });

  // Helper to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decreasing': return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
      case 'stable': return <TrendingUp className="h-4 w-4 text-blue-500 transform rotate-90" />;
      default: return null;
    }
  };

  // Get difficulty badge class
  const getDifficultyBadgeClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Function to navigate to different learning resources
  const navigateToResource = (resourceType: string, resourceId: string) => {
    switch (resourceType) {
      case 'concept':
        navigate(`/dashboard/student/concepts/card/${resourceId}`);
        break;
      case 'flashcard':
        navigate(`/dashboard/student/flashcards/${resourceId}`);
        break;
      case 'practice':
        navigate(`/dashboard/student/practice-exam/${resourceId}/start`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold mb-1">{examGoal} - Previous Year Papers Analysis</h1>
            <p className="text-gray-500">
              Analyzing patterns from {years[years.length - 1]} to {years[0]}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate('/dashboard/student/syllabus')}
          >
            View Complete Syllabus
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Download PYQs
          </Button>
          <Button variant="default">Attempt Full Paper</Button>
        </div>
      </div>
      
      {/* Subject Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {subjectAnalysis.map((analysis) => (
          <Card key={analysis.subject} className="overflow-hidden">
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{analysis.subject}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Questions</span>
                  <span>{analysis.totalQuestions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average Difficulty</span>
                  <span>{analysis.avgDifficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Success Rate</span>
                  <span>{analysis.successRate}%</span>
                </div>
                <div className="mt-3">
                  <span className="text-sm font-medium">Top Topics</span>
                  <div className="mt-1 space-y-1">
                    {analysis.topTopics.map((topic) => (
                      <div key={topic.name} className="flex justify-between items-center text-xs bg-gray-50 dark:bg-gray-800 p-1.5 rounded">
                        <span>{topic.name}</span>
                        <div className="flex items-center gap-1">
                          <span>{topic.count} Qs</span>
                          {getTrendIcon(topic.trend)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Year-wise Question Count</span>
                <div className="flex items-center gap-1 text-xs">
                  <span>Trend:</span>
                  {getTrendIcon(analysis.questionTrend)}
                </div>
              </div>
              
              <div className="flex h-20 items-end gap-1">
                {Object.entries(analysis.yearwiseQuestions).map(([year, count]) => (
                  <div key={year} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${count * 4}px` }}
                    ></div>
                    <span className="text-xs mt-1">{year.substring(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search questions, topics, or concepts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="questions" className="space-y-4">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="topics">Topic Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="heatmap">Difficulty Heatmap</TabsTrigger>
        </TabsList>

        {/* Questions Tab */}
        <TabsContent value="questions">
          <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map(question => (
                <Card key={question.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                          <Calendar className="mr-1 h-3 w-3" />
                          {question.year}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {question.subject}
                        </Badge>
                        <Badge className={getDifficultyBadgeClass(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">Success Rate: {question.successRate}%</div>
                    </div>
                    
                    <h3 className="font-medium mb-3">{question.question}</h3>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md mb-3">
                      <div className="text-sm font-medium">Answer: {question.answer}</div>
                      <div className="text-xs text-gray-500 mt-1">{question.explanation}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm mb-3">
                      <span className="text-gray-500">Topic:</span>
                      <Badge variant="outline">{question.topic}</Badge>
                      <span className="text-gray-500 ml-2">Concept:</span>
                      <Badge variant="outline">{question.concept}</Badge>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex items-center gap-1"
                          onClick={() => navigateToResource('concept', question.conceptId)}
                        >
                          <BookOpen className="h-4 w-4" />
                          View Concept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex items-center gap-1"
                          onClick={() => navigateToResource('flashcard', question.conceptId)}
                        >
                          <Brain className="h-4 w-4" />
                          Flashcards
                        </Button>
                      </div>
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="flex items-center gap-1"
                        onClick={() => navigateToResource('practice', question.conceptId)}
                      >
                        <FileText className="h-4 w-4" />
                        Practice Similar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 border rounded-lg">
                <HelpCircle className="h-10 w-10 mx-auto text-gray-400" />
                <p className="mt-2 text-gray-600 dark:text-gray-400">No questions match your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Topic Analysis Tab */}
        <TabsContent value="topics">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4">Topic-wise Question Distribution</h3>
            
            {selectedSubject === 'all' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjectAnalysis.map(subject => (
                  <Card key={subject.subject} className="overflow-hidden">
                    <div className="p-3 font-medium border-b">{subject.subject}</div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {subject.topTopics.map(topic => (
                          <div key={topic.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span>{topic.name}</span>
                              {getTrendIcon(topic.trend)}
                            </div>
                            <div className="flex items-center">
                              <CustomProgress 
                                value={(topic.count / subject.totalQuestions) * 100}
                                className="w-24 h-2 mr-2"
                                indicatorClassName={
                                  topic.trend === 'increasing' ? "bg-green-500" :
                                  topic.trend === 'decreasing' ? "bg-red-500" : "bg-blue-500"
                                }
                              />
                              <span className="text-sm">{topic.count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div>
                <h4 className="font-medium mb-3">{selectedSubject} Topics</h4>
                <div className="space-y-3">
                  {subjectAnalysis
                    .find(s => s.subject === selectedSubject)?.topTopics
                    .map(topic => (
                      <div key={topic.name} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{topic.name}</span>
                            <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              {topic.count} questions
                            </Badge>
                          </div>
                          <div className="flex items-center">
                            Trend: {getTrendIcon(topic.trend)}
                          </div>
                        </div>
                        <div className="grid grid-cols-10 gap-1 mt-3">
                          {years.map(year => {
                            const count = Math.floor(Math.random() * 5) + 1;
                            return (
                              <div key={year} className="flex flex-col items-center">
                                <div className="text-xs text-gray-500">{year.substring(2)}</div>
                                <div className="bg-blue-500 w-6" style={{height: `${count * 4}px`}}></div>
                                <div className="text-xs">{count}</div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-end mt-3">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            View Related Concepts
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4">Year-over-Year Trends</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subjectAnalysis.map(subject => (
                <div key={subject.subject} className="space-y-4">
                  <h4 className="font-medium">{subject.subject}</h4>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Question Count</span>
                      {getTrendIcon(subject.questionTrend)}
                    </div>
                    <div className="h-40 flex items-end gap-1">
                      {Object.entries(subject.yearwiseQuestions).map(([year, count]) => (
                        <div key={year} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-blue-500 rounded-t"
                            style={{ height: `${count * 2}px` }}
                          ></div>
                          <span className="text-xs mt-1">{year.substring(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <span className="font-medium">Key Insights</span>
                    <ul className="list-disc list-inside text-sm mt-2">
                      <li>Question count has remained {subject.questionTrend}</li>
                      <li>{subject.topTopics[0].name} seeing {subject.topTopics[0].trend} trend</li>
                      {subject.topTopics[1].trend === 'decreasing' && 
                        <li>{subject.topTopics[1].name} showing {subject.topTopics[1].trend} importance</li>
                      }
                      <li>Average success rate: {subject.successRate}%</li>
                    </ul>
                  </div>
                  
                  <div className="flex">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate('/dashboard/student/syllabus')}
                    >
                      Update {subject.subject} Study Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Heatmap Tab */}
        <TabsContent value="heatmap">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4">Difficulty vs. Frequency Heatmap</h3>
            <p className="text-gray-500 mb-6">A strategic view of topic importance and difficulty</p>
            
            <div className="space-y-8">
              {subjectAnalysis.map(subject => (
                <div key={subject.subject} className="space-y-4">
                  <h4 className="font-medium">{subject.subject}</h4>
                  
                  <div className="relative h-64 border rounded-lg p-4">
                    {/* Y-axis label */}
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 transform -rotate-90 text-sm text-gray-500">
                      Difficulty
                    </div>
                    
                    {/* X-axis label */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-gray-500 mt-2">
                      Question Frequency
                    </div>
                    
                    {/* Heatmap items - mock data */}
                    {subject.topTopics.map((topic, i) => {
                      // Generate position based on difficulty and frequency
                      const xPos = 50 + (topic.count / 2);
                      const yPos = 30 + (i * 25);
                      const size = Math.max(topic.count * 0.8, 15);
                      
                      return (
                        <div 
                          key={topic.name}
                          className="absolute rounded-full flex items-center justify-center cursor-pointer"
                          style={{
                            left: `${xPos}%`,
                            top: `${yPos}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: topic.trend === 'increasing' ? 'rgba(34, 197, 94, 0.7)' : 
                                            topic.trend === 'decreasing' ? 'rgba(239, 68, 68, 0.7)' : 
                                            'rgba(59, 130, 246, 0.7)',
                            transform: 'translate(-50%, -50%)'
                          }}
                          title={`${topic.name}: ${topic.count} questions`}
                        >
                          <span className="text-xs text-white font-bold">
                            {topic.count}
                          </span>
                        </div>
                      );
                    })}
                    
                    {/* Legends */}
                    <div className="absolute bottom-2 right-2 text-xs bg-white dark:bg-gray-700 p-1 rounded border">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Increasing</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Decreasing</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Stable</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-700 p-3 rounded-md">
                    <h5 className="font-medium mb-2">Strategic Insights</h5>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li><span className="font-medium">{subject.topTopics[0].name}:</span> High priority, requires focused attention</li>
                      {subject.topTopics[1].trend === 'increasing' && (
                        <li><span className="font-medium">{subject.topTopics[1].name}:</span> Growing importance in recent exams</li>
                      )}
                      <li>Overall difficulty: {subject.avgDifficulty} (Higher success with focused study)</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviousYearAnalysisPage;
