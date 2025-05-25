
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Clock, Lightbulb, Target, TrendingUp } from 'lucide-react';

const PredictiveAnalytics: React.FC = () => {
  // Mock data for exam readiness forecast
  const examReadinessData = [
    { week: '4 Weeks Ago', readiness: 62, predicted: false },
    { week: '3 Weeks Ago', readiness: 68, predicted: false },
    { week: '2 Weeks Ago', readiness: 73, predicted: false },
    { week: 'Last Week', readiness: 78, predicted: false },
    { week: 'Current', readiness: 82, predicted: false },
    { week: 'Next Week', readiness: 87, predicted: true },
    { week: 'Week 2', readiness: 91, predicted: true },
    { week: 'Week 3', readiness: 94, predicted: true },
    { week: 'Week 4', readiness: 96, predicted: true },
  ];

  // Mock data for subject-wise predictions
  const subjectPredictionsData = [
    { subject: 'Physics', score: 85, potential: 92 },
    { subject: 'Chemistry', score: 78, potential: 88 },
    { subject: 'Biology', score: 90, potential: 95 },
    { subject: 'Mathematics', score: 82, potential: 90 },
  ];

  // Mock data for radar chart
  const radarChartData = [
    { subject: 'Physics', current: 85, potential: 92 },
    { subject: 'Chemistry', current: 78, potential: 88 },
    { subject: 'Mathematics', current: 82, potential: 90 },
    { subject: 'Biology', current: 90, potential: 95 },
    { subject: 'English', current: 88, potential: 92 },
  ];

  // Mock optimization recommendations
  const optimizationRecommendations = [
    {
      title: "Focus on Organic Chemistry",
      description: "Increasing your Organic Chemistry score by 10% could improve your overall Chemistry score by 8%.",
      potentialGain: 8
    },
    {
      title: "Practice more Electrostatics problems",
      description: "Currently your weakest Physics topic - improving this could raise your Physics score by 7%.",
      potentialGain: 7
    },
    {
      title: "Increase Study Time for Cell Biology",
      description: "Your understanding of cell biology concepts is crucial for upcoming topics.",
      potentialGain: 5
    },
    {
      title: "Take more practice exams",
      description: "Students who take 2+ weekly practice exams score 12% higher on average.",
      potentialGain: 12
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Readiness Forecast Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Exam Readiness Forecast</CardTitle>
            <CardDescription>
              Projected exam readiness based on your current learning trajectory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={examReadinessData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Readiness']} />
                  <Line 
                    type="monotone" 
                    dataKey="readiness" 
                    stroke="#8884d8" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    strokeDasharray={(d: any) => d.predicted ? "5 5" : "0"}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>You're projected to reach 96% exam readiness in 4 weeks, assuming current study rate continues.</p>
            </div>
            <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <div className="flex items-start">
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">Target Exam Date Analysis</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on your progress, you're on track to be fully prepared 6 days before your target exam date.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Subject-wise Predictions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Subject-wise Predictions</CardTitle>
            <CardDescription>
              Projected scores and improvement potential for each subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Current Score" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Radar name="Potential Score" dataKey="potential" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Your Biology scores are excellent! Chemistry shows the highest potential for improvement.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Score Optimization Recommendations</CardTitle>
          <CardDescription>
            Strategic focus areas to maximize your score improvement potential
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optimizationRecommendations.map((rec, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {index === 0 && <Target className="h-5 w-5 text-primary" />}
                      {index === 1 && <TrendingUp className="h-5 w-5 text-primary" />}
                      {index === 2 && <Clock className="h-5 w-5 text-primary" />}
                      {index === 3 && <Lightbulb className="h-5 w-5 text-primary" />}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm flex items-center">
                      {rec.title}
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">
                        +{rec.potentialGain}%
                      </span>
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="default" className="w-full">
              Generate Personalized Improvement Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Current vs Potential */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Subject Score Potential</CardTitle>
          <CardDescription>
            Current projected scores vs. optimized potential scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {subjectPredictionsData.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.subject}</span>
                  <span className="text-sm text-muted-foreground">
                    Current: {subject.score}% / Potential: {subject.potential}%
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100 dark:bg-gray-700">
                    <div style={{ width: `${subject.score}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                    <div style={{ width: `${subject.potential - subject.score}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary/30"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm">AI Analysis</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  You have the potential to increase your overall score by 8.5% in the next 30 days by focusing on your Chemistry weak areas and maintaining your Biology performance.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictiveAnalytics;
