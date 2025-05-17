
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  ChevronDown, FileText, BarChart4, Lightbulb, BookOpen, 
  Check, X, Info, ArrowUpRight, Users, Download, Clock 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

// Mock data for previous year papers
const previousYearPapers = [
  {
    id: '1',
    year: '2024',
    name: 'JEE Advanced 2024 Paper 1',
    subject: 'Physics, Chemistry, Mathematics',
    questionsCount: 60,
    totalMarks: 180,
    difficulty: 'Hard',
    averageScore: 74,
    topicsCovered: [
      'Mechanics', 'Thermodynamics', 'Electrostatics', 'Optics',
      'Organic Chemistry', 'Inorganic Chemistry', 'Calculus', 'Algebra'
    ],
    attemptData: {
      totalAttempts: 4350,
      averageTime: '2h 32m',
      topPerformerAvg: 156,
      passPercentage: 38
    },
    questionTypeDistribution: [
      { type: 'Multiple Choice', percentage: 60 },
      { type: 'Integer Answer', percentage: 25 },
      { type: 'Matrix Match', percentage: 15 }
    ],
    subjectWiseAnalysis: [
      { subject: 'Physics', correct: 42, incorrect: 26, unattempted: 32 },
      { subject: 'Chemistry', correct: 38, incorrect: 24, unattempted: 38 },
      { subject: 'Maths', correct: 35, incorrect: 30, unattempted: 35 }
    ],
    difficultyDistribution: [
      { level: 'Easy', percentage: 25 },
      { level: 'Medium', percentage: 45 },
      { level: 'Hard', percentage: 30 }
    ]
  },
  {
    id: '2',
    year: '2023',
    name: 'JEE Advanced 2023 Paper 1',
    subject: 'Physics, Chemistry, Mathematics',
    questionsCount: 60,
    totalMarks: 180,
    difficulty: 'Hard',
    averageScore: 68,
    topicsCovered: [
      'Mechanics', 'Thermodynamics', 'Electrostatics', 'Organic Chemistry', 
      'Physical Chemistry', 'Calculus', 'Coordinate Geometry'
    ],
    attemptData: {
      totalAttempts: 4820,
      averageTime: '2h 28m',
      topPerformerAvg: 162,
      passPercentage: 36
    },
    questionTypeDistribution: [
      { type: 'Multiple Choice', percentage: 65 },
      { type: 'Integer Answer', percentage: 20 },
      { type: 'Matrix Match', percentage: 15 }
    ],
    subjectWiseAnalysis: [
      { subject: 'Physics', correct: 40, incorrect: 30, unattempted: 30 },
      { subject: 'Chemistry', correct: 42, incorrect: 28, unattempted: 30 },
      { subject: 'Maths', correct: 32, incorrect: 33, unattempted: 35 }
    ],
    difficultyDistribution: [
      { level: 'Easy', percentage: 20 },
      { level: 'Medium', percentage: 50 },
      { level: 'Hard', percentage: 30 }
    ]
  },
  {
    id: '3',
    year: '2022',
    name: 'JEE Advanced 2022 Paper 1',
    subject: 'Physics, Chemistry, Mathematics',
    questionsCount: 60,
    totalMarks: 180,
    difficulty: 'Hard',
    averageScore: 72,
    topicsCovered: [
      'Mechanics', 'Modern Physics', 'Electrochemistry', 'Coordination Compounds',
      'Organic Chemistry', 'Calculus', 'Probability'
    ],
    attemptData: {
      totalAttempts: 5120,
      averageTime: '2h 40m',
      topPerformerAvg: 158,
      passPercentage: 32
    },
    questionTypeDistribution: [
      { type: 'Multiple Choice', percentage: 60 },
      { type: 'Integer Answer', percentage: 25 },
      { type: 'Matrix Match', percentage: 15 }
    ],
    subjectWiseAnalysis: [
      { subject: 'Physics', correct: 38, incorrect: 32, unattempted: 30 },
      { subject: 'Chemistry', correct: 45, incorrect: 25, unattempted: 30 },
      { subject: 'Maths', correct: 36, incorrect: 34, unattempted: 30 }
    ],
    difficultyDistribution: [
      { level: 'Easy', percentage: 22 },
      { level: 'Medium', percentage: 48 },
      { level: 'Hard', percentage: 30 }
    ]
  }
];

// Colors for charts
const COLORS = ['#4f46e5', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7'];
const DIFFICULTY_COLORS = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Hard: '#ef4444'
};

const PreviousYearAnalysisPage = () => {
  const [selectedPaper, setSelectedPaper] = useState(previousYearPapers[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  const handleStartPractice = (paperId: string) => {
    toast({
      title: "Practice Exam Starting",
      description: `Loading ${selectedPaper.name} for practice mode.`,
    });
  };
  
  const handleDownloadPaper = (paperId: string) => {
    toast({
      title: "Downloading Paper",
      description: `${selectedPaper.name} PDF is being downloaded.`,
    });
  };
  
  const handleChangePaper = (paper: any) => {
    setSelectedPaper(paper);
    // Reset to overview tab when changing papers
    setActiveTab('overview');
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Previous Year Papers Analysis</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Deep analysis of exam patterns, question types, and difficulty distribution
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            View All Papers
          </Button>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Study Recommendations
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Papers List Section */}
        <div className="col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                Available Papers
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <ScrollArea className="h-[calc(100vh-18rem)] pr-4">
                <div className="space-y-4">
                  {previousYearPapers.map((paper) => (
                    <Card 
                      key={paper.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedPaper.id === paper.id 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                          : ''
                      }`}
                      onClick={() => handleChangePaper(paper)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-base">
                              {paper.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{paper.subject}</Badge>
                            </div>
                          </div>
                          {selectedPaper.id === paper.id && (
                            <div className="bg-blue-600 rounded-full p-1">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3 text-sm">
                          <div className="flex items-center text-gray-500">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            <span>{paper.attemptData.totalAttempts.toLocaleString()} attempts</span>
                          </div>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-1.5 ${
                              paper.difficulty === 'Hard' 
                                ? 'bg-red-500' 
                                : paper.difficulty === 'Medium' 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                            }`}></div>
                            <span>{paper.difficulty}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Section */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">{selectedPaper.name}</CardTitle>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {selectedPaper.questionsCount} questions · {selectedPaper.totalMarks} marks
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDownloadPaper(selectedPaper.id)}>
                    <Download className="mr-1 h-4 w-4" />
                    PDF
                  </Button>
                  <Button size="sm" onClick={() => handleStartPractice(selectedPaper.id)}>
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    Start Practice
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2 pb-0">
              <div className="flex flex-wrap gap-4 mt-2 mb-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Avg time: <span className="font-semibold">{selectedPaper.attemptData.averageTime}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Pass rate: <span className="font-semibold">{selectedPaper.attemptData.passPercentage}%</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BarChart4 className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Avg score: <span className="font-semibold">{selectedPaper.averageScore}/{selectedPaper.totalMarks}</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Top performers: <span className="font-semibold">{selectedPaper.attemptData.topPerformerAvg}/{selectedPaper.totalMarks}</span></span>
                </div>
              </div>

              <Tabs 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
                  <TabsTrigger value="topics">Topic Coverage</TabsTrigger>
                  <TabsTrigger value="compare">Compare Years</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <BarChart4 className="mr-2 h-4 w-4 text-blue-600" />
                          Question Type Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={selectedPaper.questionTypeDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="percentage"
                              nameKey="type"
                            >
                              {selectedPaper.questionTypeDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Lightbulb className="mr-2 h-4 w-4 text-amber-600" />
                          Difficulty Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {selectedPaper.difficultyDistribution.map((item) => (
                          <div key={item.level} className="mb-4 last:mb-0">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">{item.level}</span>
                              <span className="text-sm font-semibold">{item.percentage}%</span>
                            </div>
                            <Progress 
                              value={item.percentage} 
                              className="h-2"
                              style={{
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                '--tw-gradient-from': `${DIFFICULTY_COLORS[item.level as keyof typeof DIFFICULTY_COLORS]}`,
                                '--tw-gradient-to': `${DIFFICULTY_COLORS[item.level as keyof typeof DIFFICULTY_COLORS]}`
                              } as React.CSSProperties}
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <BookOpen className="mr-2 h-4 w-4 text-green-600" />
                          Subject-wise Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={selectedPaper.subjectWiseAnalysis}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="correct" name="Correct" stackId="a" fill="#22c55e" />
                            <Bar dataKey="incorrect" name="Incorrect" stackId="a" fill="#ef4444" />
                            <Bar dataKey="unattempted" name="Unattempted" stackId="a" fill="#94a3b8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="mt-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Info className="mr-2 h-4 w-4 text-violet-600" />
                        Key Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="text-base font-medium">
                            How does this paper compare to previous years?
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-700 dark:text-gray-300">
                              This paper shows a 6% increase in difficulty compared to the previous year,
                              with more emphasis on conceptual questions rather than calculation-heavy problems.
                              The Physics section was notably more challenging, with Modern Physics questions
                              receiving more weightage than previous years.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger className="text-base font-medium">
                            Which topics received the most weightage?
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-700 dark:text-gray-300">
                              In Physics, Mechanics and Electrostatics received the highest weightage (35%).
                              In Chemistry, Organic Chemistry dominated with approximately 40% of questions.
                              In Mathematics, Calculus and Coordinate Geometry questions constituted about 45% of the section.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger className="text-base font-medium">
                            What strategies worked best for top performers?
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-700 dark:text-gray-300">
                              Top performers typically attempted questions in a strategic order, focusing first on their strongest subjects.
                              They spent approximately 55 minutes per subject and left the most difficult questions for the end.
                              Time management was crucial - successful candidates limited their time to 2 minutes per easy question,
                              4 minutes for moderate difficulty, and flagged the very difficult ones for later review.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-center">
                      <Button variant="outline" className="w-full">
                        Generate Personalized Study Plan
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Subjects Tab */}
                <TabsContent value="subjects">
                  <div className="mt-4 space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Subject-wise Detailed Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {selectedPaper.subjectWiseAnalysis.map((subject, index) => (
                          <div key={index} className="mb-6 last:mb-0">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold text-lg">{subject.subject}</h3>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {subject.correct}% correct
                                </Badge>
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  {subject.incorrect}% incorrect
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="relative w-full h-8 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                              <div className="absolute h-full bg-green-500" style={{ width: `${subject.correct}%` }}></div>
                              <div className="absolute h-full bg-red-500" style={{ width: `${subject.incorrect}%`, left: `${subject.correct}%` }}></div>
                              <div className="absolute h-full bg-gray-300 dark:bg-gray-600" style={{ width: `${subject.unattempted}%`, left: `${subject.correct + subject.incorrect}%` }}></div>
                            </div>
                            
                            <div className="flex justify-between text-sm mt-1">
                              <span>Correct</span>
                              <span>Incorrect</span>
                              <span>Unattempted</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Topic Distribution by Subject</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Topics Covered</TableHead>
                              <TableHead>Question Count</TableHead>
                              <TableHead>Average Difficulty</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Physics</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline">Mechanics</Badge>
                                  <Badge variant="outline">Thermodynamics</Badge>
                                  <Badge variant="outline">Electrostatics</Badge>
                                  <Badge variant="outline">Optics</Badge>
                                </div>
                              </TableCell>
                              <TableCell>20</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                                  Medium
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Chemistry</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline">Organic Chemistry</Badge>
                                  <Badge variant="outline">Inorganic Chemistry</Badge>
                                  <Badge variant="outline">Physical Chemistry</Badge>
                                </div>
                              </TableCell>
                              <TableCell>20</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                  Hard
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Mathematics</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  <Badge variant="outline">Calculus</Badge>
                                  <Badge variant="outline">Algebra</Badge>
                                  <Badge variant="outline">Coordinate Geometry</Badge>
                                </div>
                              </TableCell>
                              <TableCell>20</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                                  Medium
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Topics Tab Content */}
                <TabsContent value="topics">
                  <div className="mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Important Topics Coverage</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-4 mt-2">
                          {selectedPaper.topicsCovered.map((topic, index) => (
                            <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${index % 3 === 0 ? 'bg-blue-500' : index % 3 === 1 ? 'bg-purple-500' : 'bg-green-500'}`}></div>
                                <span className="font-medium">{topic}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="text-blue-600">
                                Study Guide
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Compare Tab Content */}
                <TabsContent value="compare">
                  <div className="mt-4 space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Year-over-Year Comparison</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={[
                              { year: '2022', avgScore: 72, topScore: 158, pass: 32 },
                              { year: '2023', avgScore: 68, topScore: 162, pass: 36 },
                              { year: '2024', avgScore: 74, topScore: 156, pass: 38 }
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="avgScore" name="Average Score" fill="#3b82f6" />
                            <Bar dataKey="topScore" name="Top Score" fill="#8b5cf6" />
                            <Bar dataKey="pass" name="Pass Rate (%)" fill="#22c55e" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Difficulty Trend Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Year</TableHead>
                              <TableHead>Physics</TableHead>
                              <TableHead>Chemistry</TableHead>
                              <TableHead>Mathematics</TableHead>
                              <TableHead>Overall</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">2022</TableCell>
                              <TableCell>Hard</TableCell>
                              <TableCell>Medium</TableCell>
                              <TableCell>Hard</TableCell>
                              <TableCell>
                                <Badge variant="destructive">Hard</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">2023</TableCell>
                              <TableCell>Medium</TableCell>
                              <TableCell>Hard</TableCell>
                              <TableCell>Hard</TableCell>
                              <TableCell>
                                <Badge variant="destructive">Hard</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">2024</TableCell>
                              <TableCell>Hard</TableCell>
                              <TableCell>Medium</TableCell>
                              <TableCell>Medium</TableCell>
                              <TableCell>
                                <Badge variant="destructive">Hard</Badge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                Study Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300">Focus Areas Based on Analysis</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Strengthen your understanding of <strong>Calculus</strong> and <strong>Coordinate Geometry</strong> which constitute 45% of the Mathematics section.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Practice <strong>Organic Chemistry</strong> problems extensively as they had the highest weightage in the Chemistry section.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Review <strong>Electrostatics</strong> concepts which were more challenging in this paper than previous years.</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button className="w-full">
                    View Recommended Practice Tests
                  </Button>
                  <Button variant="outline" className="w-full">
                    Generate Custom Study Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PreviousYearAnalysisPage;
