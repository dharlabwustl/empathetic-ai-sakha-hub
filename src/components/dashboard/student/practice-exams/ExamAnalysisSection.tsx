
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ExamAnalysisSection = () => {
  // Mock data for demonstration purposes
  const subjectPerformanceData = [
    { name: 'Physics', correct: 85, total: 100 },
    { name: 'Chemistry', correct: 70, total: 100 },
    { name: 'Mathematics', correct: 90, total: 100 },
    { name: 'Biology', correct: 75, total: 100 }
  ];

  const conceptPerformanceData = [
    { name: 'Mechanics', correct: 90, incorrect: 10 },
    { name: 'Thermodynamics', correct: 75, incorrect: 25 },
    { name: 'Electromagnetism', correct: 60, incorrect: 40 },
    { name: 'Optics', correct: 85, incorrect: 15 },
    { name: 'Modern Physics', correct: 70, incorrect: 30 },
  ];

  const difficultyData = [
    { name: 'Easy', value: 85 },
    { name: 'Medium', value: 70 },
    { name: 'Hard', value: 55 },
    { name: 'Very Hard', value: 40 }
  ];

  const priorityData = [
    { name: 'High', value: 6 },
    { name: 'Medium', value: 3 },
    { name: 'Low', value: 1 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const PRIORITY_COLORS = {
    High: '#FF6B6B',
    Medium: '#FFD166',
    Low: '#06D6A0'
  };

  // Calculate percentages for each subject
  const subjectData = subjectPerformanceData.map(subject => ({
    name: subject.name,
    percentage: Math.round((subject.correct / subject.total) * 100)
  }));

  return (
    <div className="space-y-8">
      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6 grid grid-cols-4">
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
          <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
          <TabsTrigger value="priority">Priority</TabsTrigger>
        </TabsList>
        
        {/* Subject Analysis */}
        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>
                How you perform across different subjects in your practice exams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                    <Legend />
                    <Bar 
                      dataKey="percentage" 
                      name="Success Rate" 
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]} 
                    >
                      {subjectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectPerformanceData.map((subject, index) => (
                  <Card key={subject.name} className="overflow-hidden border-l-4" style={{ borderLeftColor: COLORS[index % COLORS.length] }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{subject.name}</h4>
                          <p className="text-sm text-gray-500">{subject.correct} / {subject.total} correct</p>
                        </div>
                        <div className="text-2xl font-bold">{Math.round((subject.correct / subject.total) * 100)}%</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Concept Analysis */}
        <TabsContent value="concepts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Concept Mastery Analysis</CardTitle>
              <CardDescription>
                Your performance broken down by key concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={conceptPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barGap={0}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="correct" name="Correct" stackId="a" fill="#4ade80" />
                    <Bar dataKey="incorrect" name="Incorrect" stackId="a" fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Concepts Requiring Attention:</h4>
                <div className="space-y-2">
                  {conceptPerformanceData
                    .sort((a, b) => (a.correct / (a.correct + a.incorrect)) - (b.correct / (b.correct + b.incorrect)))
                    .slice(0, 3)
                    .map((concept) => (
                      <div key={concept.name} className="flex items-center justify-between p-3 bg-red-50 rounded-md border border-red-100">
                        <span>{concept.name}</span>
                        <span className="font-medium">
                          {Math.round((concept.correct / (concept.correct + concept.incorrect)) * 100)}% mastery
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Difficulty Analysis */}
        <TabsContent value="difficulty" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Question Difficulty</CardTitle>
              <CardDescription>
                How well you handle questions of different difficulty levels
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={difficultyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {difficultyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Success Rate']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium mb-3">Difficulty Breakdown:</h4>
                <div className="space-y-2">
                  {difficultyData.map((item, index) => (
                    <div key={item.name} className="flex items-center p-2">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <div className="flex-1">{item.name}</div>
                      <div className="font-medium">{item.value}% success rate</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h5 className="font-medium mb-2">Insight:</h5>
                  <p className="text-sm">
                    Your performance drops significantly on harder questions. Focus on 
                    improving your advanced problem-solving skills.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Priority Analysis */}
        <TabsContent value="priority" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Areas that Need Attention</CardTitle>
              <CardDescription>
                Topics that require immediate focus based on performance trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={priorityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          dataKey="value"
                          label={({name}) => `${name}`}
                        >
                          {priorityData.map((entry) => (
                            <Cell 
                              key={entry.name} 
                              fill={PRIORITY_COLORS[entry.name as keyof typeof PRIORITY_COLORS]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Topics']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    {Object.entries(PRIORITY_COLORS).map(([priority, color]) => (
                      <div key={priority} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: color }}
                        ></div>
                        <span>{priority} Priority</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Priority Topics:</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                      <div className="flex items-center mb-1">
                        <div className="w-3 h-3 rounded-full mr-2 bg-red-500"></div>
                        <h5 className="font-medium">High Priority</h5>
                      </div>
                      <ul className="pl-5 list-disc text-sm">
                        <li>Electromagnetism</li>
                        <li>Organic Chemistry</li>
                        <li>Differential Equations</li>
                        <li>Thermodynamics</li>
                        <li>Modern Physics</li>
                        <li>Chemical Bonding</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                      <div className="flex items-center mb-1">
                        <div className="w-3 h-3 rounded-full mr-2 bg-yellow-500"></div>
                        <h5 className="font-medium">Medium Priority</h5>
                      </div>
                      <ul className="pl-5 list-disc text-sm">
                        <li>Mechanics</li>
                        <li>Inorganic Chemistry</li>
                        <li>Algebra</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                      <div className="flex items-center mb-1">
                        <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                        <h5 className="font-medium">Low Priority</h5>
                      </div>
                      <ul className="pl-5 list-disc text-sm">
                        <li>Physical Chemistry</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamAnalysisSection;
