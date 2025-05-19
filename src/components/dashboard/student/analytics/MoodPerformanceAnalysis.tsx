
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis, BarChart, Bar } from 'recharts';
import { CheckCircle2 } from 'lucide-react';

const MoodPerformanceAnalysis: React.FC = () => {
  // Mock data for mood impact on test scores
  const moodImpactData = [
    { mood: 'Motivated', averageScore: 85, retention: 90, efficiency: 95 },
    { mood: 'Focused', averageScore: 82, retention: 88, efficiency: 90 },
    { mood: 'Happy', averageScore: 78, retention: 80, efficiency: 85 },
    { mood: 'Calm', averageScore: 76, retention: 78, efficiency: 80 },
    { mood: 'Tired', averageScore: 68, retention: 65, efficiency: 72 },
    { mood: 'Anxious', averageScore: 62, retention: 60, efficiency: 58 },
    { mood: 'Frustrated', averageScore: 58, retention: 55, efficiency: 52 },
  ];

  // Mock data for study efficiency by mood and time of day
  const efficiencyData = [
    { hour: '6 AM', Motivated: 75, Focused: 85, Tired: 40 },
    { hour: '8 AM', Motivated: 85, Focused: 90, Tired: 50 },
    { hour: '10 AM', Motivated: 90, Focused: 95, Tired: 60 },
    { hour: '12 PM', Motivated: 85, Focused: 90, Tired: 65 },
    { hour: '2 PM', Motivated: 75, Focused: 80, Tired: 60 },
    { hour: '4 PM', Motivated: 70, Focused: 75, Tired: 55 },
    { hour: '6 PM', Motivated: 80, Focused: 85, Tired: 60 },
    { hour: '8 PM', Motivated: 85, Focused: 90, Tired: 70 },
    { hour: '10 PM', Motivated: 75, Focused: 80, Tired: 65 },
  ];

  // Mock data for mood distribution
  const moodDistributionData = [
    { mood: 'Motivated', percentage: 35 },
    { mood: 'Focused', percentage: 20 },
    { mood: 'Happy', percentage: 15 },
    { mood: 'Calm', percentage: 10 },
    { mood: 'Tired', percentage: 10 },
    { mood: 'Anxious', percentage: 7 },
    { mood: 'Frustrated', percentage: 3 },
  ];

  // Mock data for recommendations
  const recommendations = [
    {
      title: "Schedule biology study sessions when motivated",
      description: "Your biology test scores are 18% higher when you're motivated.",
      moods: ["motivated", "focused"]
    },
    {
      title: "Use morning hours for complex problem-solving",
      description: "Your problem-solving ability peaks between 9-11 AM when focused.",
      moods: ["focused"]
    },
    {
      title: "Try mindfulness before physics sessions",
      description: "5-minute meditation improves your physics scores by 12% when anxious.",
      moods: ["anxious", "stressed"]
    },
    {
      title: "Use active recall techniques when tired",
      description: "Engagement increases by 25% when using active recall during low-energy periods.",
      moods: ["tired"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Impact Analysis Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Mood Impact on Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moodImpactData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="mood" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="averageScore" name="Test Score %" fill="#8884d8" />
                  <Bar dataKey="retention" name="Retention %" fill="#82ca9d" />
                  <Bar dataKey="efficiency" name="Study Efficiency %" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Your performance is highest when you're feeling motivated and focused. Consider mood management techniques before study sessions.</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Efficiency Metrics Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Study Efficiency by Mood & Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Motivated" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Focused" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Tired" stroke="#ff7300" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>When feeling focused, your efficiency peaks at 10 AM and 8 PM. Plan challenging topics during these windows.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Your Mood Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={moodDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="mood" type="category" tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Frequency']} />
                  <Bar dataKey="percentage" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>You're motivated 35% of the time. Increasing this by focusing on mood management techniques could improve overall performance.</p>
            </div>
          </CardContent>
        </Card>

        {/* Adaptive Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Adaptive Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <div className="mr-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {rec.moods.map(mood => (
                          <span key={mood} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded dark:bg-purple-900/30 dark:text-purple-300">
                            {mood}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodPerformanceAnalysis;
