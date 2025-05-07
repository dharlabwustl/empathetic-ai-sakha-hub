
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, BookOpen, Brain, HelpCircle, Book, FileText, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

// Mock data for previous year papers
const pyqData = {
  examName: "NEET",
  currentYear: 2025,
  years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
  subjects: [
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" }
  ],
  topicAnalysis: [
    {
      subject: "Physics",
      topics: [
        {
          id: "mechanics",
          name: "Mechanics",
          totalQuestions: 42,
          yearCounts: { "2024": 4, "2023": 5, "2022": 4, "2021": 5, "2020": 4, "2019": 4, "2018": 5, "2017": 3, "2016": 4, "2015": 4 },
          trend: "stable",
          difficulty: "medium",
          importanceLevel: "high",
          conceptLinks: ["newton-laws", "gravitation", "rotation"]
        },
        {
          id: "electrostatics",
          name: "Electrostatics",
          totalQuestions: 30,
          yearCounts: { "2024": 4, "2023": 3, "2022": 3, "2021": 2, "2020": 3, "2019": 3, "2018": 3, "2017": 3, "2016": 3, "2015": 3 },
          trend: "stable",
          difficulty: "hard",
          importanceLevel: "high",
          conceptLinks: ["coulomb-law", "electric-field", "potential"]
        },
        {
          id: "optics",
          name: "Optics",
          totalQuestions: 25,
          yearCounts: { "2024": 3, "2023": 2, "2022": 2, "2021": 3, "2020": 2, "2019": 3, "2018": 2, "2017": 3, "2016": 2, "2015": 3 },
          trend: "decreasing",
          difficulty: "medium",
          importanceLevel: "medium",
          conceptLinks: ["reflection", "refraction", "wave-optics"]
        }
      ]
    },
    {
      subject: "Chemistry",
      topics: [
        {
          id: "organic",
          name: "Organic Chemistry",
          totalQuestions: 48,
          yearCounts: { "2024": 6, "2023": 5, "2022": 5, "2021": 4, "2020": 5, "2019": 5, "2018": 4, "2017": 5, "2016": 4, "2015": 5 },
          trend: "increasing",
          difficulty: "hard",
          importanceLevel: "high",
          conceptLinks: ["hydrocarbon", "functional-groups", "mechanisms"]
        }
      ]
    },
    {
      subject: "Biology",
      topics: [
        {
          id: "physiology",
          name: "Human Physiology",
          totalQuestions: 50,
          yearCounts: { "2024": 6, "2023": 6, "2022": 5, "2021": 5, "2020": 5, "2019": 5, "2018": 5, "2017": 4, "2016": 5, "2015": 4 },
          trend: "increasing",
          difficulty: "medium",
          importanceLevel: "high",
          conceptLinks: ["digestive", "circulatory", "nervous"]
        }
      ]
    }
  ],
  sampleQuestions: [
    {
      id: "q1",
      year: 2024,
      subject: "Physics",
      topic: "Mechanics",
      question: "A ball is thrown vertically upward with an initial velocity of 20 m/s. What will be its height when its velocity becomes half of the initial velocity? (g = 10 m/s²)",
      options: [
        "7.5 m",
        "15 m",
        "20 m",
        "30 m"
      ],
      correctAnswer: "15 m",
      explanation: "Using v² = u² - 2gh, where v = 10 m/s, u = 20 m/s, g = 10 m/s². We get: (10)² = (20)² - 2(10)h. Solving for h: h = [(20)² - (10)²]/(2×10) = (400 - 100)/20 = 15 m.",
      conceptLink: "newton-laws",
      difficulty: "medium"
    },
    {
      id: "q2",
      year: 2023,
      subject: "Chemistry",
      topic: "Organic Chemistry",
      question: "Which of the following is NOT an example of a nucleophile?",
      options: [
        "NH₃",
        "CN⁻",
        "BF₃",
        "OH⁻"
      ],
      correctAnswer: "BF₃",
      explanation: "BF₃ is an electron-deficient compound and acts as a Lewis acid (electrophile), while the rest are electron-rich and act as nucleophiles.",
      conceptLink: "organic-mechanisms",
      difficulty: "hard"
    }
  ]
};

// Importance color mapping
const importanceColors = {
  "high": "bg-red-100 text-red-800",
  "medium": "bg-orange-100 text-orange-800",
  "low": "bg-yellow-100 text-yellow-800"
};

// Trend icons
const trendIcons = {
  "increasing": "📈",
  "decreasing": "📉",
  "stable": "🔄"
};

const PreviousYearAnalysisPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"analysis" | "questions">("analysis");

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header with back button and exam info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <Button variant="outline" asChild className="mb-2">
            <Link to="/dashboard/student">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{pyqData.examName} Previous Year Analysis</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/student/syllabus">
                View Syllabus
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/student/study-plan">
                Study Plan
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search topics..." 
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {pyqData.subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {pyqData.years.map((year) => (
                <SelectItem key={year.toString()} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* View toggle */}
      <div className="mb-6">
        <Tabs defaultValue="analysis" className="w-full" onValueChange={(value) => setViewMode(value as "analysis" | "questions")}>
          <TabsList>
            <TabsTrigger value="analysis">Topic Analysis</TabsTrigger>
            <TabsTrigger value="questions">Sample Questions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === "analysis" ? (
        /* Topic Analysis View */
        <div className="space-y-8">
          {pyqData.topicAnalysis
            .filter(item => selectedSubject === "all" || item.subject.toLowerCase() === selectedSubject)
            .map((subjectData) => (
              <div key={subjectData.subject} className="space-y-4">
                <h2 className="text-xl font-semibold">{subjectData.subject}</h2>
                
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Qs</th>
                            {pyqData.years.slice(0, 5).map((year) => (
                              <th key={year} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{year}</th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importance</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Study</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {subjectData.topics.map((topic) => (
                            <tr key={topic.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">{topic.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-center font-medium">{topic.totalQuestions}</td>
                              {pyqData.years.slice(0, 5).map((year) => (
                                <td key={year} className="px-3 py-4 whitespace-nowrap text-center">
                                  {topic.yearCounts[year.toString()]}
                                </td>
                              ))}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center">
                                  {trendIcons[topic.trend as keyof typeof trendIcons]} {topic.trend}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant="outline" className={importanceColors[topic.importanceLevel as keyof typeof importanceColors]}>
                                  {topic.importanceLevel.charAt(0).toUpperCase() + topic.importanceLevel.slice(1)}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" className="h-8 px-3 text-xs" asChild>
                                    <Link to={`/dashboard/student/concepts/card/${topic.id}`}>
                                      <BookOpen className="h-3 w-3 mr-1" /> Concept
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 px-3 text-xs" asChild>
                                    <Link to={`/dashboard/student/flashcards/${topic.id}`}>
                                      <Brain className="h-3 w-3 mr-1" /> Cards
                                    </Link>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Topic Frequency Visualization */}
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Topic Frequency Heatmap</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subjectData.topics.map((topic) => (
                      <div key={topic.id} className="bg-gray-50 rounded-md p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{topic.name}</div>
                          <Badge>{topic.totalQuestions} Qs</Badge>
                        </div>
                        <div className="flex items-center h-8 gap-1">
                          {Object.entries(topic.yearCounts).slice(0, 10).map(([year, count]) => (
                            <div 
                              key={year} 
                              className="flex-1 flex flex-col items-center"
                              title={`${year}: ${count} questions`}
                            >
                              <div 
                                className={`w-full ${
                                  count >= 5 ? 'bg-red-500' : 
                                  count >= 4 ? 'bg-orange-400' : 
                                  count >= 3 ? 'bg-yellow-300' : 
                                  count >= 2 ? 'bg-green-300' : 
                                  'bg-blue-200'
                                }`} 
                                style={{ height: `${count * 5}px`, minHeight: '1px' }}
                              ></div>
                              <div className="text-xs mt-1">{year.slice(-2)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
        </div>
      ) : (
        /* Sample Questions View */
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Sample Questions</h2>
          
          <div className="space-y-4">
            {pyqData.sampleQuestions
              .filter(q => selectedSubject === "all" || q.subject.toLowerCase() === selectedSubject)
              .filter(q => selectedYear === "all" || q.year.toString() === selectedYear)
              .map((question) => (
                <Card key={question.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={question.id} className="border-0">
                        <div className="p-4 pb-2">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">{question.year}</Badge>
                            <Badge variant="outline">{question.subject}</Badge>
                            <Badge variant="outline">{question.topic}</Badge>
                            <Badge variant="outline" className={
                              question.difficulty === "hard" ? "bg-red-50 text-red-800 border-red-200" : 
                              question.difficulty === "medium" ? "bg-orange-50 text-orange-800 border-orange-200" : 
                              "bg-green-50 text-green-800 border-green-200"
                            }>
                              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="prose max-w-none dark:prose-invert">
                            <p>{question.question}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                            {question.options.map((option, index) => (
                              <div 
                                key={index} 
                                className={`p-2 rounded border ${
                                  option === question.correctAnswer 
                                    ? "border-green-300 bg-green-50" 
                                    : "border-gray-200"
                                }`}
                              >
                                <span>{String.fromCharCode(65 + index)}. {option}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <AccordionTrigger className="py-2 px-4">
                          <span className="text-sm font-normal">View Explanation</span>
                        </AccordionTrigger>
                        
                        <AccordionContent className="px-4 pb-4">
                          <div className="bg-gray-50 p-3 rounded-md prose-sm max-w-none dark:prose-invert">
                            <h4>Explanation</h4>
                            <p>{question.explanation}</p>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/dashboard/student/concepts/card/${question.conceptLink}`}>
                                <BookOpen className="mr-2 h-4 w-4" /> View Related Concept
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/dashboard/student/practice-exam/${question.topic.toLowerCase()}`}>
                                <FileText className="mr-2 h-4 w-4" /> Practice Similar Questions
                              </Link>
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousYearAnalysisPage;
