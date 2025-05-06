
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileDown, BookOpen, Brain, FileText, TrendingUp, ArrowLeft, BarChart, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStudyPlan } from '@/hooks/useStudyPlan';

// Topic-wise question pattern data
const topicQuestions = {
  "Physics": {
    "Mechanics": [
      { year: 2023, count: 8, difficulty: "Medium", successRate: 65 },
      { year: 2022, count: 7, difficulty: "Medium", successRate: 62 },
      { year: 2021, count: 9, difficulty: "Hard", successRate: 55 },
    ],
    "Electromagnetism": [
      { year: 2023, count: 6, difficulty: "Hard", successRate: 50 },
      { year: 2022, count: 5, difficulty: "Medium", successRate: 58 },
      { year: 2021, count: 7, difficulty: "Hard", successRate: 48 },
    ],
    "Optics": [
      { year: 2023, count: 5, difficulty: "Medium", successRate: 70 },
      { year: 2022, count: 6, difficulty: "Easy", successRate: 75 },
      { year: 2021, count: 4, difficulty: "Medium", successRate: 68 },
    ],
  },
  "Chemistry": {
    "Organic Chemistry": [
      { year: 2023, count: 9, difficulty: "Hard", successRate: 48 },
      { year: 2022, count: 8, difficulty: "Medium", successRate: 55 },
      { year: 2021, count: 10, difficulty: "Hard", successRate: 45 },
    ],
    "Inorganic Chemistry": [
      { year: 2023, count: 7, difficulty: "Medium", successRate: 58 },
      { year: 2022, count: 6, difficulty: "Medium", successRate: 62 },
      { year: 2021, count: 8, difficulty: "Medium", successRate: 60 },
    ],
    "Physical Chemistry": [
      { year: 2023, count: 5, difficulty: "Medium", successRate: 65 },
      { year: 2022, count: 7, difficulty: "Hard", successRate: 52 },
      { year: 2021, count: 6, difficulty: "Medium", successRate: 63 },
    ],
  },
  "Biology": {
    "Human Physiology": [
      { year: 2023, count: 10, difficulty: "Medium", successRate: 68 },
      { year: 2022, count: 9, difficulty: "Medium", successRate: 65 },
      { year: 2021, count: 11, difficulty: "Hard", successRate: 60 },
    ],
    "Genetics": [
      { year: 2023, count: 8, difficulty: "Hard", successRate: 52 },
      { year: 2022, count: 7, difficulty: "Medium", successRate: 58 },
      { year: 2021, count: 9, difficulty: "Hard", successRate: 50 },
    ],
    "Ecology": [
      { year: 2023, count: 6, difficulty: "Easy", successRate: 75 },
      { year: 2022, count: 5, difficulty: "Easy", successRate: 78 },
      { year: 2021, count: 7, difficulty: "Medium", successRate: 68 },
    ],
  }
};

// Sample questions data
const sampleQuestions = [
  {
    id: "q1",
    subject: "Physics",
    topic: "Mechanics",
    question: "A ball is thrown vertically upward with initial velocity v0. The maximum height reached by the ball is proportional to:",
    options: ["v0", "v0²", "v0³", "√v0"],
    correctAnswer: "v0²",
    difficulty: "Medium",
    successRate: 45,
    years: [2023, 2021, 2019],
    conceptId: "c123"
  },
  {
    id: "q2",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    question: "Which of the following has the highest boiling point?",
    options: ["CH3CH2OH", "CH3OCH3", "CH3CH2CH3", "CH3CHO"],
    correctAnswer: "CH3CH2OH",
    difficulty: "Medium",
    successRate: 58,
    years: [2022, 2020, 2018],
    conceptId: "c456"
  },
  {
    id: "q3",
    subject: "Biology",
    topic: "Human Physiology",
    question: "Oxygen dissociation curve shifts to the right when:",
    options: ["pH increases", "pCO2 decreases", "temperature decreases", "2,3-BPG decreases"],
    correctAnswer: "pCO2 decreases",
    difficulty: "Hard",
    successRate: 40,
    years: [2023, 2022, 2020, 2017],
    conceptId: "c789"
  }
];

// Trending topics by year
const trendingTopics = {
  "2023": ["Mechanics", "Organic Chemistry", "Human Physiology"],
  "2022": ["Optics", "Inorganic Chemistry", "Genetics"],
  "2021": ["Electromagnetism", "Physical Chemistry", "Ecology"],
  "2020": ["Thermodynamics", "Coordination Compounds", "Cell Biology"],
  "2019": ["Modern Physics", "Solid State", "Molecular Biology"],
};

const PreviousYearAnalysisPage = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { studyPlan } = useStudyPlan();

  const examGoal = studyPlan?.examGoal || "NEET";

  // Generate years array for the past 10 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
  
  const subjects = ['Physics', 'Chemistry', 'Biology'];

  const handleGoBack = () => {
    navigate('/dashboard/student');
  };

  // Subject-wise statistics
  const subjectStats = {
    "Physics": {
      questions: 45,
      avgDifficulty: "Medium",
      successRate: 65,
      importantTopics: ["Mechanics", "Electromagnetism", "Optics"],
      recommendedFocus: "High"
    },
    "Chemistry": {
      questions: 45,
      avgDifficulty: "Medium",
      successRate: 60,
      importantTopics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
      recommendedFocus: "High"
    },
    "Biology": {
      questions: 90,
      avgDifficulty: "Medium-Hard",
      successRate: 70,
      importantTopics: ["Human Physiology", "Genetics", "Ecology"],
      recommendedFocus: "Very High"
    }
  };

  // Filter questions based on selected subject
  const filteredQuestions = selectedSubject === 'all' 
    ? sampleQuestions 
    : sampleQuestions.filter(q => q.subject.toLowerCase() === selectedSubject);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4 flex items-center gap-2" 
        onClick={handleGoBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {examGoal} Previous Year Papers Analysis
          </h1>
          <p className="text-gray-500">
            Analyzing patterns from {years[years.length - 1]} to {years[0]}
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
            {years.map(year => (
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
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          {/* Subject Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {subjects.map(subject => (
              <Card key={subject} className="p-4">
                <h3 className="font-semibold mb-3 text-lg">{subject}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Questions</span>
                    <span>{subjectStats[subject].questions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Difficulty</span>
                    <span>{subjectStats[subject].avgDifficulty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span>{subjectStats[subject].successRate}%</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Recommended Focus</span>
                      <span className="font-medium text-violet-600">{subjectStats[subject].recommendedFocus}</span>
                    </div>
                    <Progress value={
                      subjectStats[subject].recommendedFocus === "Very High" ? 90 :
                      subjectStats[subject].recommendedFocus === "High" ? 75 :
                      subjectStats[subject].recommendedFocus === "Medium" ? 50 : 30
                    } className="h-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Topic Distribution Chart */}
          <Card className="p-6 mb-8">
            <h3 className="font-semibold mb-4 text-lg">Topic Distribution in {selectedYear}</h3>
            <p className="text-sm text-gray-500 mb-6">Most frequently tested topics across all subjects</p>
            <div className="h-64 flex items-center justify-center border-b pb-6">
              <div className="text-center flex flex-col items-center">
                <BarChart className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-sm text-gray-500">Interactive topic distribution chart will load from backend data</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {trendingTopics[selectedYear].map((topic, index) => (
                <div key={index} className="border rounded-lg p-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{topic}</p>
                    <p className="text-sm text-gray-500">{6 - index} questions</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Difficulty Trend */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-lg">Difficulty Trend (2015-{currentYear})</h3>
            <div className="h-64 flex items-center justify-center border-b pb-6">
              <div className="text-center flex flex-col items-center">
                <LineChart className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-sm text-gray-500">Interactive difficulty trend chart will load from backend data</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Prediction for {currentYear + 1}</h4>
              <p className="text-sm text-gray-600">
                Based on analysis of past year trends, the {examGoal} exam for {currentYear + 1} is expected to have 
                a <span className="font-medium">Medium to Hard</span> difficulty level with increased focus on 
                application-based questions in <span className="font-medium">Physics (Mechanics)</span> and 
                <span className="font-medium"> Biology (Genetics)</span>.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Questions Tab */}
        <TabsContent value="questions">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Previous Year Questions</h2>
            <p className="text-gray-500">
              Showing {filteredQuestions.length} questions from {selectedYear} {selectedSubject !== 'all' ? `(${selectedSubject})` : ''}
            </p>
            
            {/* Question Cards */}
            {filteredQuestions.map(question => (
              <Card key={question.id} className="p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm text-gray-500">{question.subject} - {question.topic}</span>
                    <h3 className="font-medium mt-1">
                      {question.question}
                    </h3>
                    <div className="mt-3 space-y-1">
                      {question.options.map((option, index) => (
                        <div key={index} className={`py-1 px-2 rounded ${option === question.correctAnswer ? 'bg-green-100 text-green-800' : ''}`}>
                          <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                          {option} {option === question.correctAnswer && ' ✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => navigate(`/dashboard/student/concepts/card/${question.conceptId}`)}>
                      <BookOpen className="h-4 w-4" />
                      Concept
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => navigate(`/dashboard/student/flashcards/${question.conceptId}`)}>
                      <Brain className="h-4 w-4" />
                      Practice
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Difficulty: {question.difficulty}</span>
                  <span>Success Rate: {question.successRate}%</span>
                  <span>Appeared in: {question.years.join(', ')}</span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trends & Insights Tab */}
        <TabsContent value="trends">
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-lg">Recurring Topics</h3>
              <p className="text-sm text-gray-500 mb-4">Topics that frequently appear in the {examGoal} exam</p>
              
              <div className="space-y-4">
                {subjects.map(subject => (
                  <div key={subject} className="border-b pb-4 last:border-0">
                    <h4 className="font-medium mb-3">{subject}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.keys(topicQuestions[subject]).map(topic => (
                        <div key={topic} className="border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{topic}</span>
                            <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              High Frequency
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex justify-between">
                              <span>Appears</span>
                              <span className="font-medium">{topicQuestions[subject][topic].length} years</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Avg. Questions</span>
                              <span className="font-medium">{Math.round(topicQuestions[subject][topic].reduce((acc, item) => acc + item.count, 0) / topicQuestions[subject][topic].length)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Success Rate</span>
                              <span className="font-medium">{Math.round(topicQuestions[subject][topic].reduce((acc, item) => acc + item.successRate, 0) / topicQuestions[subject][topic].length)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-lg">Strategic Insights</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-medium text-green-700">Preparation Focus</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    For {examGoal}, Biology carries the highest weightage (45%). Within Biology, Human Physiology and Genetics 
                    consistently have high representation. Allocate study time accordingly.
                  </p>
                </div>
                
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h4 className="font-medium text-amber-700">Common Mistakes</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Analysis of student performance shows that conceptual questions in Organic Chemistry and 
                    application-based problems in Mechanics are frequently answered incorrectly.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-medium text-blue-700">Scoring Opportunities</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Questions from Ecology in Biology and Optics in Physics typically have higher success rates. 
                    These can be your scoring areas with focused preparation.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviousYearAnalysisPage;
