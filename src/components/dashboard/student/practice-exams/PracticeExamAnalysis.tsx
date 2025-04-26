
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for charts
const subjectPerformance = [
  { subject: 'Physics', correct: 85, total: 100 },
  { subject: 'Chemistry', correct: 70, total: 100 },
  { subject: 'Mathematics', correct: 90, total: 100 },
  { subject: 'Biology', correct: 65, total: 100 },
];

const difficultyDistribution = [
  { name: 'Easy', value: 12, fill: '#10b981' },
  { name: 'Medium', value: 18, fill: '#f59e0b' },
  { name: 'Hard', value: 10, fill: '#ef4444' },
];

const progressOverTime = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 68 },
  { name: 'Week 3', score: 72 },
  { name: 'Week 4', score: 75 },
  { name: 'Week 5', score: 79 },
  { name: 'Week 6', score: 82 },
];

const conceptPerformance = [
  { concept: 'Newton\'s Laws', score: 85, efficiency: 75 },
  { concept: 'Electromagnetism', score: 62, efficiency: 68 },
  { concept: 'Thermodynamics', score: 78, efficiency: 82 },
  { concept: 'Quantum Mechanics', score: 56, efficiency: 60 },
  { concept: 'Fluid Dynamics', score: 70, efficiency: 72 },
];

const PracticeExamAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Exam Performance Analysis</h2>
      
      <Tabs defaultValue="subject">
        <TabsList className="mb-6">
          <TabsTrigger value="subject">By Subject</TabsTrigger>
          <TabsTrigger value="concept">By Concept</TabsTrigger>
          <TabsTrigger value="difficulty">By Difficulty</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subject" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 h-auto">
              <h3 className="text-lg font-medium mb-4">Subject Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="correct" name="Correct Answers %" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-medium mb-2">Subject Breakdown</h3>
              {subjectPerformance.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>{subject.subject}</span>
                    <span className="font-medium">{subject.correct}%</span>
                  </div>
                  <Progress value={subject.correct} />
                </div>
              ))}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="concept" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Concept Mastery</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Concept
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Efficiency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {conceptPerformance.map((concept) => (
                    <tr key={concept.concept}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {concept.concept}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {concept.score}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Progress value={concept.efficiency} className="w-24" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Badge className={
                          concept.score >= 80 ? "bg-green-100 text-green-800" :
                          concept.score >= 60 ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {concept.score >= 80 ? "Mastered" :
                           concept.score >= 60 ? "Learning" :
                           "Needs Work"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="difficulty">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Questions by Difficulty</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={difficultyDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {difficultyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Performance by Difficulty</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span>Easy Questions</span>
                    </div>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2 bg-green-100" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span>Medium Questions</span>
                    </div>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-yellow-100" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <span>Hard Questions</span>
                    </div>
                    <span className="font-medium">58%</span>
                  </div>
                  <Progress value={58} className="h-2 bg-red-100" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Progress Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Performance Insights</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Consistent improvement of 15% over the past 6 weeks</li>
                <li>Strongest growth in physics topics (+22%)</li>
                <li>Focus area for improvement: Quantum Mechanics concepts</li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeExamAnalysis;
