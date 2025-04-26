
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  BookOpen, 
  Brain, 
  AlertTriangle, 
  Clock, 
  FileText,
  LineChart,
  BarChart3,
  PieChart as PieChartIcon,
  Timer
} from 'lucide-react';

interface ExamAnalysisProps {
  exams?: any[]; // Your completed exam data
}

const ExamAnalysisSection: React.FC<ExamAnalysisProps> = ({ exams = [] }) => {
  const [analysisTab, setAnalysisTab] = useState('subject');
  
  // Mock data for demonstration
  const mockExams = [
    { id: 1, title: "Kinematics Test", score: 85, totalQuestions: 20, timeSpent: 35, concepts: ["Motion", "Vectors", "Acceleration"] },
    { id: 2, title: "Chemical Bonding", score: 72, totalQuestions: 25, timeSpent: 40, concepts: ["Covalent Bonds", "Ionic Bonds"] },
    { id: 3, title: "Calculus Basics", score: 90, totalQuestions: 15, timeSpent: 25, concepts: ["Limits", "Derivatives"] },
    { id: 4, title: "Electric Fields", score: 68, totalQuestions: 30, timeSpent: 45, concepts: ["Coulomb's Law", "Field Strength"] },
    { id: 5, title: "Organic Chemistry", score: 78, totalQuestions: 22, timeSpent: 38, concepts: ["Alkanes", "Functional Groups"] },
  ];
  
  // Use provided exams or mock data
  const examData = exams.length > 0 ? exams : mockExams;
  
  // Subject performance data
  const subjectData = [
    { name: 'Physics', score: 82, questions: 75, completed: 5 },
    { name: 'Chemistry', score: 75, questions: 47, completed: 3 },
    { name: 'Mathematics', score: 90, questions: 60, completed: 4 },
    { name: 'Biology', score: 65, questions: 30, completed: 2 },
  ];
  
  // Concept performance data
  const conceptData = [
    { name: 'Motion', score: 92, questions: 25, subject: 'Physics' },
    { name: 'Vectors', score: 78, questions: 18, subject: 'Physics' },
    { name: 'Covalent Bonds', score: 85, questions: 20, subject: 'Chemistry' },
    { name: 'Limits', score: 95, questions: 15, subject: 'Mathematics' },
    { name: 'Derivatives', score: 87, questions: 22, subject: 'Mathematics' },
    { name: 'Coulomb\'s Law', score: 72, questions: 12, subject: 'Physics' },
  ];
  
  // Difficulty analysis data
  const difficultyData = [
    { name: 'Easy', value: 38 },
    { name: 'Medium', value: 45 },
    { name: 'Hard', value: 17 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Time spent data
  const timeData = [
    { name: 'Physics', minutes: 120 },
    { name: 'Chemistry', minutes: 95 },
    { name: 'Mathematics', minutes: 140 },
    { name: 'Biology', minutes: 65 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Exam Performance Analysis</h2>
          <p className="text-gray-500">
            Review your performance across all practice exams
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <h3 className="text-2xl font-bold">
                  {examData.reduce((sum, exam) => sum + exam.score, 0) / examData.length}%
                </h3>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Exams Completed</p>
                <h3 className="text-2xl font-bold">{examData.length}</h3>
              </div>
              <Brain className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Questions</p>
                <h3 className="text-2xl font-bold">
                  {examData.reduce((sum, exam) => sum + exam.totalQuestions, 0)}
                </h3>
              </div>
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Time</p>
                <h3 className="text-2xl font-bold">
                  {examData.reduce((sum, exam) => sum + exam.timeSpent, 0)} mins
                </h3>
              </div>
              <Timer className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={analysisTab} onValueChange={setAnalysisTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="subject" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" /> By Subject
          </TabsTrigger>
          <TabsTrigger value="concept" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> By Concept
          </TabsTrigger>
          <TabsTrigger value="difficulty" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> By Difficulty
          </TabsTrigger>
          <TabsTrigger value="time" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Time Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="subject" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Subject-wise Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Average Score (%)" fill="#8884d8" />
                    <Bar dataKey="questions" name="Questions Answered" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectData.map(subject => (
                  <div key={subject.name} className="border p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{subject.name}</h4>
                      <span className="font-bold text-lg">{subject.score}%</span>
                    </div>
                    <Progress value={subject.score} className="h-2 mb-1" />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{subject.questions} questions</span>
                      <span>{subject.completed} exams</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="concept" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Concept-wise Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={conceptData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" name="Score (%)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 space-y-4">
                <h4 className="font-medium text-lg">Top Performing Concepts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conceptData
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 4)
                    .map(concept => (
                      <div key={concept.name} className="border p-4 rounded-md bg-green-50">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{concept.name}</h4>
                          <span className="font-bold text-lg text-green-600">{concept.score}%</span>
                        </div>
                        <Progress value={concept.score} className="h-2 mb-1 bg-green-200" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{concept.questions} questions</span>
                          <span>Subject: {concept.subject}</span>
                        </div>
                      </div>
                    ))}
                </div>
                
                <h4 className="font-medium text-lg mt-4">Areas for Improvement</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conceptData
                    .sort((a, b) => a.score - b.score)
                    .slice(0, 2)
                    .map(concept => (
                      <div key={concept.name} className="border p-4 rounded-md bg-amber-50">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{concept.name}</h4>
                          <span className="font-bold text-lg text-amber-600">{concept.score}%</span>
                        </div>
                        <Progress value={concept.score} className="h-2 mb-1 bg-amber-200" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{concept.questions} questions</span>
                          <span>Subject: {concept.subject}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="difficulty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChartIcon className="mr-2 h-5 w-5" />
                Difficulty Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={difficultyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {difficultyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                {difficultyData.map((item, index) => (
                  <Card key={item.name} className="overflow-hidden">
                    <div 
                      className="h-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <CardContent className="pt-4">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-2xl font-bold">{item.value}%</p>
                      <p className="text-sm text-gray-500">
                        {item.name === 'Easy' ? 'Strong performance' : 
                         item.name === 'Medium' ? 'Solid understanding' : 
                         'Areas to improve'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="time" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Time Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="minutes" name="Time Spent (minutes)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-lg mb-4">Time Management Tips</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h5 className="font-medium text-blue-800">Physics</h5>
                    <p className="text-blue-700">
                      You're spending more time on Physics questions. Try to practice quick calculation techniques.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-md">
                    <h5 className="font-medium text-green-800">Mathematics</h5>
                    <p className="text-green-700">
                      Your time per question in Mathematics is improving. Keep practicing formula application.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-md">
                    <h5 className="font-medium text-purple-800">Overall Strategy</h5>
                    <p className="text-purple-700">
                      Consider attempting easier questions first to save time for more challenging ones.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center">
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Download Full Analysis Report
        </Button>
      </div>
    </div>
  );
};

export default ExamAnalysisSection;
