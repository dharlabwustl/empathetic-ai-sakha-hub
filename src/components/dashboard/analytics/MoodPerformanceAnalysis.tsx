
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Brain, Clock, Lightbulb } from 'lucide-react';

// Mock mood-performance data
const moodScoreData = [
  { date: 'Jan 1', happy: 85, anxious: 65, tired: 72, motivated: 90 },
  { date: 'Jan 5', happy: 75, anxious: 68, tired: 60, motivated: 82 },
  { date: 'Jan 10', happy: 90, anxious: 55, tired: 65, motivated: 88 },
  { date: 'Jan 15', happy: 70, anxious: 75, tired: 80, motivated: 65 },
  { date: 'Jan 20', happy: 80, anxious: 60, tired: 75, motivated: 78 },
  { date: 'Jan 25', happy: 88, anxious: 52, tired: 60, motivated: 95 },
  { date: 'Jan 30', happy: 78, anxious: 72, tired: 85, motivated: 68 },
];

const moodEfficiencyData = [
  { mood: 'Motivated', efficiency: 92, duration: 2.5, color: '#10b981' },
  { mood: 'Happy', efficiency: 85, duration: 2.1, color: '#3b82f6' },
  { mood: 'Calm', efficiency: 80, duration: 1.8, color: '#8b5cf6' },
  { mood: 'Neutral', efficiency: 75, duration: 1.7, color: '#6b7280' },
  { mood: 'Tired', efficiency: 65, duration: 1.5, color: '#f59e0b' },
  { mood: 'Anxious', efficiency: 60, duration: 1.2, color: '#ef4444' },
  { mood: 'Stressed', efficiency: 50, duration: 0.8, color: '#dc2626' },
];

const MoodPerformanceAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            Mood Impact on Test Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={moodScoreData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="happy" name="Happy" stroke="#3b82f6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="anxious" name="Anxious" stroke="#ef4444" />
                <Line type="monotone" dataKey="tired" name="Tired" stroke="#f59e0b" />
                <Line type="monotone" dataKey="motivated" name="Motivated" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Mood vs Study Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="category"
                    dataKey="mood" 
                    name="Mood" 
                    label={{ value: 'Mood', position: 'insideBottomRight', offset: 0 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="efficiency" 
                    name="Efficiency" 
                    label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft' }} 
                  />
                  <ZAxis 
                    type="number" 
                    dataKey="duration" 
                    range={[40, 400]} 
                    name="Duration"
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter 
                    name="Study Efficiency" 
                    data={moodEfficiencyData} 
                    fill="#8884d8"
                    shape="circle"
                    legendType="circle"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              Adaptive Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 overflow-auto">
            <div className="space-y-4">
              <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">When Motivated</h3>
                <p className="text-sm mb-2">Your data shows 92% efficiency when motivated - your optimal study state.</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Tackle challenging topics and complex problems</li>
                  <li>Focus on new material and conceptual understanding</li>
                  <li>Schedule practice exams during these periods</li>
                  <li>Try to identify what creates this mood state for you</li>
                </ul>
              </div>

              <div className="p-4 border border-blue-200 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">When Happy</h3>
                <p className="text-sm mb-2">Your efficiency is 85% when happy - great for balanced learning.</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Ideal for group study sessions and discussions</li>
                  <li>Good time for review of material you're comfortable with</li>
                  <li>Balance challenging content with reinforcing existing knowledge</li>
                </ul>
              </div>

              <div className="p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">When Tired</h3>
                <p className="text-sm mb-2">Efficiency drops to 65% when tired - adjust your approach.</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Focus on review rather than learning new concepts</li>
                  <li>Use spaced repetition and flashcards</li>
                  <li>Break study sessions into smaller 25-minute blocks</li>
                  <li>Consider physical activity before studying to boost energy</li>
                </ul>
              </div>

              <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-medium text-red-800 dark:text-red-300 mb-2">When Anxious/Stressed</h3>
                <p className="text-sm mb-2">Efficiency is lowest (50-60%) during anxious states.</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Implement 5-minute mindfulness or breathing exercises first</li>
                  <li>Focus on simple, structured tasks and avoid complex problems</li>
                  <li>Use the Pomodoro technique (25min work, 5min break)</li>
                  <li>Consider skipping study altogether if anxiety is very high and focus on self-care</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodPerformanceAnalysis;
