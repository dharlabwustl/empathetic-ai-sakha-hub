
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  BookOpen, Brain, AlertTriangle, CheckCircle, XCircle, 
  Clock, Tag, Star, Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample data for charts
const subjectData = [
  { name: 'Physics', correct: 82, incorrect: 18, attempted: 100 },
  { name: 'Chemistry', correct: 65, incorrect: 20, attempted: 85 },
  { name: 'Mathematics', correct: 90, incorrect: 5, attempted: 95 }
];

const conceptData = [
  { name: 'Mechanics', correct: 38, incorrect: 12 },
  { name: 'Electromagnetism', correct: 22, incorrect: 8 },
  { name: 'Thermodynamics', correct: 18, incorrect: 2 },
  { name: 'Quantum Physics', correct: 4, incorrect: 6 },
  { name: 'Organic Chemistry', correct: 25, incorrect: 5 },
  { name: 'Inorganic Chemistry', correct: 18, incorrect: 7 },
  { name: 'Physical Chemistry', correct: 22, incorrect: 8 },
  { name: 'Algebra', correct: 32, incorrect: 3 },
  { name: 'Calculus', correct: 28, incorrect: 2 },
  { name: 'Geometry', correct: 30, incorrect: 0 }
];

const difficultyData = [
  { name: 'Easy', value: 75, color: '#22c55e' },
  { name: 'Medium', value: 60, color: '#f59e0b' },
  { name: 'Hard', value: 42, color: '#ef4444' }
];

const priorityData = [
  { name: 'High', value: 65, color: '#ef4444' },
  { name: 'Medium', value: 78, color: '#f59e0b' },
  { name: 'Low', value: 90, color: '#22c55e' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PracticeExamAnalysis = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Target className="text-blue-600" />
          Performance Analysis
        </h2>
        
        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="subjects">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="subjects" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> Subjects
          </TabsTrigger>
          <TabsTrigger value="concepts" className="flex items-center gap-1">
            <Brain className="h-4 w-4" /> Concepts
          </TabsTrigger>
          <TabsTrigger value="difficulty" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" /> Difficulty
          </TabsTrigger>
          <TabsTrigger value="priority" className="flex items-center gap-1">
            <Star className="h-4 w-4" /> Priority
          </TabsTrigger>
        </TabsList>
        
        {/* Subject Analysis */}
        <TabsContent value="subjects">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance by Subject</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="correct" name="Correct" stackId="a" fill="#22c55e" />
                      <Bar dataKey="incorrect" name="Incorrect" stackId="a" fill="#ef4444" />
                      <Bar dataKey="attempted" name="Total Questions" stackId="b" fill="transparent" stroke="#1e40af" strokeWidth={2} strokeDasharray="5 5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subject Proficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjectData.map(subject => (
                    <div key={subject.name}>
                      <div className="flex justify-between mb-1 items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-600">
                            {subject.name}
                          </Badge>
                          <span className="text-sm">
                            {Math.round((subject.correct / subject.attempted) * 100)}%
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {subject.correct}/{subject.attempted} questions
                        </span>
                      </div>
                      <Progress value={(subject.correct / subject.attempted) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-3 text-gray-700">Recommendations</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <AlertTriangle size={16} className="text-amber-500 mt-0.5" />
                      <span>Focus on improving Chemistry concepts as it shows the lowest proficiency.</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500 mt-0.5" />
                      <span>Your Mathematics performance is excellent. Consider attempting harder problems.</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Concept Analysis */}
        <TabsContent value="concepts">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance by Concept</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={conceptData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 'dataMax + 10']} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="correct" name="Correct" fill="#22c55e" />
                      <Bar dataKey="incorrect" name="Incorrect" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {conceptData
                    .sort((a, b) => (a.correct / (a.correct + a.incorrect)) - (b.correct / (b.correct + b.incorrect)))
                    .slice(0, 5)
                    .map(concept => (
                      <div key={concept.name}>
                        <div className="flex justify-between mb-1 items-center">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-3 w-3 text-gray-500" />
                            <span className="font-medium">{concept.name}</span>
                          </div>
                          <span className="text-xs">
                            {Math.round((concept.correct / (concept.correct + concept.incorrect)) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(concept.correct / (concept.correct + concept.incorrect)) * 100}
                          className="h-2" 
                        />
                      </div>
                    ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-3 text-gray-700">Recommendations</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-2 bg-amber-50 rounded-md border border-amber-200">
                      <div className="p-1.5 bg-amber-100 rounded-full">
                        <Brain size={16} className="text-amber-700" />
                      </div>
                      <div className="text-sm text-amber-800">
                        Review Quantum Physics concepts as accuracy is below 50%
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-md border border-blue-200">
                      <div className="p-1.5 bg-blue-100 rounded-full">
                        <Tag size={16} className="text-blue-700" />
                      </div>
                      <div className="text-sm text-blue-800">
                        Spend more time on Electromagnetism to improve understanding
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Difficulty Analysis */}
        <TabsContent value="difficulty">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Performance by Difficulty</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[300px] w-[300px]">
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
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {difficultyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Difficulty Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {difficultyData.map(item => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-2 items-center">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`
                              ${item.name === 'Easy' ? 'bg-green-50 text-green-600 border-green-200' : ''}
                              ${item.name === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                              ${item.name === 'Hard' ? 'bg-red-50 text-red-600 border-red-200' : ''}
                            `}
                          >
                            {item.name}
                          </Badge>
                        </div>
                        <span className="text-sm">{item.value}% accuracy</span>
                      </div>
                      <Progress 
                        value={item.value} 
                        className={`h-2 ${
                          item.name === 'Easy' ? 'bg-green-100' : 
                          item.name === 'Medium' ? 'bg-amber-100' : 'bg-red-100'
                        }`} 
                      />
                      
                      <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
                        {item.name === 'Easy' && (
                          <>
                            <Badge variant="outline" className="bg-blue-50">Algebra</Badge>
                            <Badge variant="outline" className="bg-blue-50">Basic Mechanics</Badge>
                            <Badge variant="outline" className="bg-blue-50">Stoichiometry</Badge>
                          </>
                        )}
                        {item.name === 'Medium' && (
                          <>
                            <Badge variant="outline" className="bg-blue-50">Thermodynamics</Badge>
                            <Badge variant="outline" className="bg-blue-50">Calculus</Badge>
                            <Badge variant="outline" className="bg-blue-50">Organic Chemistry</Badge>
                          </>
                        )}
                        {item.name === 'Hard' && (
                          <>
                            <Badge variant="outline" className="bg-blue-50">Quantum Physics</Badge>
                            <Badge variant="outline" className="bg-blue-50">Complex Analysis</Badge>
                            <Badge variant="outline" className="bg-blue-50">Electrochemistry</Badge>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium mb-2 text-blue-800">Difficulty Strategy</h3>
                  <p className="text-sm text-blue-700">
                    You're performing well on easy questions but struggling with harder topics. 
                    Consider allocating more study time to difficult concepts like Quantum Physics 
                    and Complex Analysis to improve your overall performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Priority Analysis */}
        <TabsContent value="priority">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Performance by Priority</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[300px] w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Priority-Based Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {priorityData.map(item => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-2 items-center">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={`
                              ${item.name === 'High' ? 'bg-red-50 text-red-600 border-red-200' : ''}
                              ${item.name === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                              ${item.name === 'Low' ? 'bg-green-50 text-green-600 border-green-200' : ''}
                            `}
                          >
                            <Star size={10} className="mr-1" />
                            {item.name} Priority
                          </Badge>
                        </div>
                        <span className="text-sm">{item.value}% accuracy</span>
                      </div>
                      <Progress 
                        value={item.value} 
                        className={`h-2 ${
                          item.name === 'Low' ? 'bg-green-100' : 
                          item.name === 'Medium' ? 'bg-amber-100' : 'bg-red-100'
                        }`} 
                      />
                      
                      <div className="mt-2 text-sm text-gray-500">
                        {item.name === 'High' && 'Key concepts most likely to appear in your exams'}
                        {item.name === 'Medium' && 'Important concepts that may appear in your exams'}
                        {item.name === 'Low' && 'Supplementary concepts that rarely appear in exams'}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Card className="border-red-200 bg-red-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-red-800 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Attention Required
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-red-700">
                      <p>
                        Your performance on high-priority topics is significantly lower than other areas. 
                        These topics make up approximately 60% of your exam questions. 
                        Focus on improving these areas for maximum impact on your scores.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeExamAnalysis;
