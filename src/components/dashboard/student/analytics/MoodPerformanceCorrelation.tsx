
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, ZAxis } from 'recharts';
import { SmilePlus, Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';

// Mock data
const moodPerformanceData = [
  { mood: 'Motivated', testScores: 86, retention: 92, productivity: 95 },
  { mood: 'Focused', testScores: 82, retention: 88, productivity: 90 },
  { mood: 'Curious', testScores: 78, retention: 85, productivity: 82 },
  { mood: 'Happy', testScores: 75, retention: 80, productivity: 78 },
  { mood: 'Calm', testScores: 72, retention: 75, productivity: 70 },
  { mood: 'Neutral', testScores: 68, retention: 72, productivity: 65 },
  { mood: 'Anxious', testScores: 62, retention: 65, productivity: 55 },
  { mood: 'Tired', testScores: 58, retention: 60, productivity: 50 },
  { mood: 'Stressed', testScores: 55, retention: 58, productivity: 45 },
  { mood: 'Overwhelmed', testScores: 50, retention: 52, productivity: 40 },
];

const moodStudyTimeData = [
  { date: '2023-05-01', mood: 'Motivated', hours: 4.5 },
  { date: '2023-05-02', mood: 'Focused', hours: 3.8 },
  { date: '2023-05-03', mood: 'Tired', hours: 2.1 },
  { date: '2023-05-04', mood: 'Anxious', hours: 2.5 },
  { date: '2023-05-05', mood: 'Stressed', hours: 1.7 },
  { date: '2023-05-06', mood: 'Happy', hours: 3.2 },
  { date: '2023-05-07', mood: 'Motivated', hours: 4.7 },
  { date: '2023-05-08', mood: 'Curious', hours: 3.9 },
  { date: '2023-05-09', mood: 'Focused', hours: 4.0 },
  { date: '2023-05-10', mood: 'Overwhelmed', hours: 1.5 },
  { date: '2023-05-11', mood: 'Calm', hours: 3.0 },
  { date: '2023-05-12', mood: 'Neutral', hours: 2.8 },
  { date: '2023-05-13', mood: 'Motivated', hours: 4.3 },
  { date: '2023-05-14', mood: 'Happy', hours: 3.6 },
];

const MoodPerformanceCorrelation: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <SmilePlus className="h-5 w-5 text-indigo-500" />
            Mood Impact Analysis
          </CardTitle>
          <CardDescription>
            How different emotional states affect your academic performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moodPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mood" />
              <YAxis label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="testScores" name="Test Scores" fill="#8884d8" />
              <Bar dataKey="retention" name="Retention" fill="#82ca9d" />
              <Bar dataKey="productivity" name="Productivity" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Key Insights:</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 flex-shrink-0 mt-0.5">•</div>
                  <p>Your test scores are 30% higher when you feel motivated compared to feeling overwhelmed.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 flex-shrink-0 mt-0.5">•</div>
                  <p>Information retention peaks when you're in a motivated or focused state.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 flex-shrink-0 mt-0.5">•</div>
                  <p>Productivity drops significantly when you're feeling stressed or overwhelmed.</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Optimal Study Moods:</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Motivated</span>
                  </div>
                  <span className="text-sm font-medium">95% Effectiveness</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Focused</span>
                  </div>
                  <span className="text-sm font-medium">90% Effectiveness</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Curious</span>
                  </div>
                  <span className="text-sm font-medium">82% Effectiveness</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-500" />
            Study Efficiency by Mood
          </CardTitle>
          <CardDescription>
            Track how your mood affects your study time and efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodStudyTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: 'Study Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value, name) => [`${value} hours`, 'Study Time']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#8884d8" 
                name="Study Hours"
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">AI-Generated Recommendations:</h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Mood Management Strategies</h5>
                <ul className="text-sm space-y-1">
                  <li>• Start study sessions with a 5-minute mindfulness exercise to center yourself</li>
                  <li>• Use the Pomodoro technique (25 min work, 5 min break) when feeling overwhelmed</li>
                  <li>• Listen to instrumental music when feeling anxious to improve focus</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Schedule Optimization</h5>
                <ul className="text-sm space-y-1">
                  <li>• Schedule challenging topics for mornings when you typically feel more motivated</li>
                  <li>• Save review sessions for evenings when your energy might be lower</li>
                  <li>• Take a 30-minute break when noticing signs of stress to reset your mood</li>
                </ul>
              </div>
            </div>
            
            <Button className="mt-4 w-full" variant="outline">
              Get Personalized Mood Management Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodPerformanceCorrelation;
