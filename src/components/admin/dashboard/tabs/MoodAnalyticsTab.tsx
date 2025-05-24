
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  TrendingUp, 
  Activity, 
  Clock, 
  Target,
  Users,
  BarChart3,
  Zap,
  AlertCircle,
  CheckCircle,
  Brain,
  Settings
} from 'lucide-react';

const MoodAnalyticsTab = () => {
  const [selectedMood, setSelectedMood] = useState("stressed");

  const moodDistribution = [
    { mood: "Happy", count: 892, percentage: 31.3, color: "bg-green-500", trend: "+5.2%" },
    { mood: "Focused", count: 674, percentage: 23.7, color: "bg-blue-500", trend: "+2.1%" },
    { mood: "Stressed", count: 456, percentage: 16.0, color: "bg-red-500", trend: "-3.4%" },
    { mood: "Motivated", count: 398, percentage: 14.0, color: "bg-purple-500", trend: "+7.8%" },
    { mood: "Tired", count: 289, percentage: 10.1, color: "bg-yellow-500", trend: "+1.2%" },
    { mood: "Anxious", count: 138, percentage: 4.9, color: "bg-orange-500", trend: "-2.1%" }
  ];

  const moodAdaptationStrategies = {
    stressed: {
      strategies: [
        "Reduce daily study hours by 25%",
        "Include relaxation exercises",
        "Focus on easier concepts",
        "Add more breaks between sessions",
        "Activate Feel Good Corner content"
      ],
      effectiveness: 78,
      students: 456,
      avgImprovement: 34
    },
    motivated: {
      strategies: [
        "Increase challenging content by 30%",
        "Extend study sessions",
        "Add bonus learning materials",
        "Enable peer teaching opportunities",
        "Unlock advanced topics early"
      ],
      effectiveness: 92,
      students: 398,
      avgImprovement: 67
    },
    tired: {
      strategies: [
        "Switch to interactive visual content",
        "Reduce session length to 25 minutes",
        "Add energizing activities",
        "Use voice-based learning",
        "Schedule optimal study times"
      ],
      effectiveness: 65,
      students: 289,
      avgImprovement: 23
    },
    anxious: {
      strategies: [
        "Provide confidence-building exercises",
        "Simplify complex topics",
        "Add progress celebrations",
        "Enable study buddy matching",
        "Include mindfulness content"
      ],
      effectiveness: 71,
      students: 138,
      avgImprovement: 41
    }
  };

  const surroundingInfluences = [
    {
      factor: "Family Support",
      positiveImpact: 87,
      students: 2456,
      correlation: 0.73,
      recommendation: "Continue family engagement programs"
    },
    {
      factor: "Peer Pressure",
      positiveImpact: 34,
      students: 1892,
      correlation: -0.45,
      recommendation: "Implement healthy competition strategies"
    },
    {
      factor: "Social Media",
      positiveImpact: 23,
      students: 2134,
      correlation: -0.62,
      recommendation: "Add digital wellness coaching"
    },
    {
      factor: "Academic Environment",
      positiveImpact: 79,
      students: 2847,
      correlation: 0.68,
      recommendation: "Maintain current environment standards"
    },
    {
      factor: "Financial Stress",
      positiveImpact: 12,
      students: 567,
      correlation: -0.78,
      recommendation: "Provide scholarship information and support"
    }
  ];

  const moodTrends = [
    { time: "Morning (6-9 AM)", happy: 45, focused: 38, stressed: 12, tired: 5 },
    { time: "Late Morning (9-12 PM)", happy: 52, focused: 41, stressed: 15, tired: 8 },
    { time: "Afternoon (12-3 PM)", happy: 38, focused: 35, stressed: 22, tired: 15 },
    { time: "Evening (3-6 PM)", happy: 41, focused: 42, stressed: 18, tired: 12 },
    { time: "Night (6-9 PM)", happy: 48, focused: 39, stressed: 16, tired: 9 },
    { time: "Late Night (9+ PM)", happy: 35, focused: 28, stressed: 25, tired: 22 }
  ];

  const moodBasedOutcomes = [
    {
      mood: "Happy Students",
      studyTime: "4.2 hrs/day",
      retention: "89%",
      examScore: "+15%",
      completion: "94%"
    },
    {
      mood: "Focused Students", 
      studyTime: "4.8 hrs/day",
      retention: "92%",
      examScore: "+22%",
      completion: "97%"
    },
    {
      mood: "Stressed Students",
      studyTime: "2.1 hrs/day",
      retention: "67%",
      examScore: "-8%",
      completion: "72%"
    },
    {
      mood: "Motivated Students",
      studyTime: "5.2 hrs/day",
      retention: "95%",
      examScore: "+28%",
      completion: "98%"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Mood Distribution Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moodDistribution.map((mood, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{mood.mood} Students</CardTitle>
              <Heart className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mood.count.toLocaleString()}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">{mood.percentage}% of total</span>
                <span className={`text-sm ${mood.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {mood.trend}
                </span>
              </div>
              <div className="mt-3">
                <div className={`h-2 rounded-full ${mood.color}`} style={{ width: `${mood.percentage * 3}%` }}></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mood-Based Adaptation Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            AI-Powered Mood Adaptation Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Select Mood for Strategy Details:</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(moodAdaptationStrategies).map((mood) => (
                  <Button
                    key={mood}
                    variant={selectedMood === mood ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMood(mood)}
                    className="capitalize"
                  >
                    {mood}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3 capitalize">{selectedMood} Student Adaptations</h4>
              <div className="space-y-2 mb-4">
                {moodAdaptationStrategies[selectedMood as keyof typeof moodAdaptationStrategies]?.strategies.map((strategy, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                    {strategy}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Effectiveness:</span>
                  <div className="font-bold text-lg">
                    {moodAdaptationStrategies[selectedMood as keyof typeof moodAdaptationStrategies]?.effectiveness}%
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Improvement:</span>
                  <div className="font-bold text-lg text-green-600">
                    +{moodAdaptationStrategies[selectedMood as keyof typeof moodAdaptationStrategies]?.avgImprovement}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Surrounding Influences Impact Meter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Surrounding Influences Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {surroundingInfluences.map((influence, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{influence.factor}</h4>
                  <Badge variant={influence.positiveImpact > 50 ? "default" : "destructive"}>
                    {influence.positiveImpact > 50 ? "Positive" : "Negative"} Impact
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <span className="text-xs text-muted-foreground">Impact Score</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={influence.positiveImpact} className="flex-1" />
                      <span className="text-sm font-medium">{influence.positiveImpact}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Affected Students</span>
                    <div className="font-medium">{influence.students.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Correlation</span>
                    <div className={`font-medium ${influence.correlation > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {influence.correlation > 0 ? '+' : ''}{influence.correlation}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Action</span>
                    <div className="text-sm">{influence.recommendation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mood-Based Learning Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Mood-Based Learning Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodBasedOutcomes.map((outcome, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">{outcome.mood}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>Study Time:</span>
                      <span className="font-medium">{outcome.studyTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retention:</span>
                      <span className="font-medium">{outcome.retention}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Exam Score:</span>
                      <span className={`font-medium ${outcome.examScore.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {outcome.examScore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completion:</span>
                      <span className="font-medium">{outcome.completion}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Daily Mood Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {moodTrends.map((trend, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-2">{trend.time}</h4>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-green-600 font-medium">{trend.happy}%</div>
                      <div className="text-muted-foreground">Happy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-600 font-medium">{trend.focused}%</div>
                      <div className="text-muted-foreground">Focused</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-600 font-medium">{trend.stressed}%</div>
                      <div className="text-muted-foreground">Stressed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-600 font-medium">{trend.tired}%</div>
                      <div className="text-muted-foreground">Tired</div>
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

export default MoodAnalyticsTab;
