
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ArrowDown, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data for weak areas
const subjectWeaknessData = [
  { subject: 'Physics', mastery: 85, gap: 15 },
  { subject: 'Chemistry', mastery: 78, gap: 22 },
  { subject: 'Biology', mastery: 62, gap: 38 },
  { subject: 'Mathematics', mastery: 70, gap: 30 },
];

const topicWeaknessData = [
  { topic: 'Cell Division', subject: 'Biology', accuracy: 45, attempts: 32, urgency: 'high' },
  { topic: 'Organic Chemistry', subject: 'Chemistry', accuracy: 52, attempts: 28, urgency: 'high' },
  { topic: 'Thermodynamics', subject: 'Physics', accuracy: 58, attempts: 40, urgency: 'medium' },
  { topic: 'Calculus', subject: 'Mathematics', accuracy: 60, attempts: 35, urgency: 'medium' },
  { topic: 'Mechanics', subject: 'Physics', accuracy: 67, attempts: 42, urgency: 'low' },
];

const skillRadarData = [
  { skill: 'Conceptual Understanding', score: 70 },
  { skill: 'Problem Solving', score: 65 },
  { skill: 'Memory Recall', score: 80 },
  { skill: 'Numerical Calculation', score: 60 },
  { skill: 'Visual Analysis', score: 75 },
  { skill: 'Pattern Recognition', score: 55 },
];

// Helper function for urgency badge
const getUrgencyBadge = (urgency: string) => {
  switch (urgency) {
    case 'high':
      return <Badge variant="destructive">High Priority</Badge>;
    case 'medium':
      return <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">Medium Priority</Badge>;
    default:
      return <Badge variant="outline">Low Priority</Badge>;
  }
};

const WeakAreasAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ArrowDown className="h-4 w-4 text-red-500" />
              Subject Performance Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectWeaknessData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="subject" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="mastery" name="Current Mastery %" fill="#3b82f6" />
                  <Bar dataKey="gap" name="Improvement Gap" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              Skills Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Your Skills"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Focus on improving <span className="font-medium">Pattern Recognition</span> and <span className="font-medium">Numerical Calculation</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            Priority Improvement Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topicWeaknessData.map((topic, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{topic.topic}</h3>
                    <p className="text-sm text-muted-foreground">{topic.subject}</p>
                  </div>
                  {getUrgencyBadge(topic.urgency)}
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Accuracy Rate</span>
                    <span>{topic.accuracy}%</span>
                  </div>
                  <Progress value={topic.accuracy} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{topic.attempts}</span> questions attempted
                  </div>
                  <Button size="sm" className="flex items-center gap-1">
                    Focus Study
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">Personalized Improvement Plan</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white text-xs mr-2 mt-0.5">1</span>
                <span>Focus on <span className="font-medium">Cell Division</span> topics with dedicated 30-minute daily sessions for the next week.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white text-xs mr-2 mt-0.5">2</span>
                <span>Revisit <span className="font-medium">Organic Chemistry</span> fundamentals before attempting advanced problems.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white text-xs mr-2 mt-0.5">3</span>
                <span>Practice more numerical calculation problems to strengthen your quantitative skills across subjects.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeakAreasAnalysis;
