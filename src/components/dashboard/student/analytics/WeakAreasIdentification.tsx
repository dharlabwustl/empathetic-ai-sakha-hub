
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ArrowUp, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for weak areas
const subjectPerformanceData = [
  { subject: 'Physics', mastery: 85, color: '#4ade80' },
  { subject: 'Chemistry', mastery: 72, color: '#facc15' },
  { subject: 'Biology', mastery: 45, color: '#f87171' },
  { subject: 'Mathematics', mastery: 68, color: '#fb923c' },
];

const topicPerformanceData = [
  { name: 'Electromagnetism', score: 40, time: 35, expected: 70, category: 'Physics' },
  { name: 'Organic Chemistry', score: 50, time: 40, expected: 75, category: 'Chemistry' },
  { name: 'Human Physiology', score: 35, time: 45, expected: 70, category: 'Biology' },
  { name: 'Genetics', score: 45, time: 38, expected: 75, category: 'Biology' },
  { name: 'Calculus', score: 55, time: 42, expected: 80, category: 'Mathematics' },
];

// Sort topics by performance gap (expected - actual)
const sortedWeakTopics = [...topicPerformanceData]
  .sort((a, b) => (b.expected - b.score) - (a.expected - a.score))
  .slice(0, 3);

// Calculate improvement over time
const improvementData = [
  { name: 'Electromagnetism', week1: 25, week2: 30, week3: 40 },
  { name: 'Organic Chemistry', week1: 30, week2: 40, week3: 50 },
  { name: 'Human Physiology', week1: 20, week2: 25, week3: 35 },
];

// Get color based on score
const getColorByScore = (score: number) => {
  if (score < 50) return '#f87171'; // red
  if (score < 70) return '#fb923c'; // orange
  if (score < 85) return '#facc15'; // yellow
  return '#4ade80'; // green
};

const WeakAreasIdentification = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Weak Areas Identification</h2>
      <p className="text-muted-foreground">
        Target your study efforts where they'll have the greatest impact
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Subject Mastery Overview</CardTitle>
          <CardDescription>
            Your proficiency level across different subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjectPerformanceData.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{subject.subject}</div>
                  <div 
                    className={`text-sm font-medium ${
                      subject.mastery < 50 ? 'text-red-500' : 
                      subject.mastery < 70 ? 'text-orange-500' : 
                      subject.mastery < 85 ? 'text-yellow-500' : 
                      'text-green-500'
                    }`}
                  >
                    {subject.mastery}%
                  </div>
                </div>
                <Progress 
                  value={subject.mastery} 
                  className="h-2"
                  style={{ 
                    '--progress-background': subject.color,
                  } as React.CSSProperties}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Priority Improvement Areas</CardTitle>
            <CardDescription>
              Topics with the largest gap between current mastery and expected level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topicPerformanceData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={150} />
                  <Tooltip />
                  <Bar dataKey="score" name="Your Score" barSize={20}>
                    {topicPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColorByScore(entry.score)} />
                    ))}
                  </Bar>
                  <Bar dataKey="expected" name="Expected Level" barSize={20} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Improvement Tracking</CardTitle>
            <CardDescription>
              Progress in previously identified weak areas over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={improvementData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="week1" name="Week 1" fill="#f87171" />
                  <Bar dataKey="week2" name="Week 2" fill="#fb923c" />
                  <Bar dataKey="week3" name="Week 3" fill="#facc15" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personalized Improvement Plan</CardTitle>
          <CardDescription>
            Targeted recommendations to address your weakest areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedWeakTopics.map((topic, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{topic.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {topic.category} • Current Score: {topic.score}% • Target: {topic.expected}%
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>Priority {index + 1}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Recommended: 4-5 hours</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-green-500" />
                    <span className="text-sm">6 concept cards available</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">+15% improvement potential</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Recommended Actions:</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Review {topic.name} concept cards with the interactive formula lab</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Practice with targeted questions focusing on common mistake patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Schedule a 2-hour focused study session with AI tutor assistance</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button size="sm">Go to Concept Cards</Button>
                  <Button size="sm" variant="outline">Add to Study Plan</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeakAreasIdentification;
