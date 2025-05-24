
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Users, 
  Wifi, 
  Volume2, 
  Sun, 
  Moon, 
  Coffee,
  Brain,
  Heart,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';

interface SurroundingInfluencesProps {
  userProfile: UserProfileBase;
  currentMood?: MoodType;
}

interface InfluenceMetric {
  id: string;
  name: string;
  value: number;
  impact: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description: string;
  suggestions: string[];
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesProps> = ({ 
  userProfile, 
  currentMood 
}) => {
  const [influences, setInfluences] = useState<InfluenceMetric[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock influence metrics
  const mockInfluences: InfluenceMetric[] = [
    {
      id: 'environment',
      name: 'Study Environment',
      value: 85,
      impact: 'positive',
      icon: <Home className="h-4 w-4" />,
      description: 'Quiet, well-lit space with minimal distractions',
      suggestions: ['Consider adding plants for better air quality', 'Optimize lighting for evening study']
    },
    {
      id: 'social',
      name: 'Social Factors',
      value: 72,
      impact: 'positive',
      icon: <Users className="h-4 w-4" />,
      description: 'Supportive family and study group interactions',
      suggestions: ['Schedule regular study group sessions', 'Communicate study schedule to family']
    },
    {
      id: 'digital',
      name: 'Digital Distractions',
      value: 45,
      impact: 'negative',
      icon: <Wifi className="h-4 w-4" />,
      description: 'High phone usage and social media engagement during study',
      suggestions: ['Use app blockers during study time', 'Keep phone in another room while studying']
    },
    {
      id: 'noise',
      name: 'Noise Level',
      value: 78,
      impact: 'positive',
      icon: <Volume2 className="h-4 w-4" />,
      description: 'Generally quiet with occasional background music',
      suggestions: ['Try white noise for better concentration', 'Use noise-canceling headphones']
    },
    {
      id: 'circadian',
      name: 'Sleep Pattern',
      value: 60,
      impact: 'neutral',
      icon: <Moon className="h-4 w-4" />,
      description: 'Irregular sleep schedule affecting morning focus',
      suggestions: ['Maintain consistent bedtime', 'Avoid screens 1 hour before sleep']
    },
    {
      id: 'nutrition',
      name: 'Nutrition & Energy',
      value: 68,
      impact: 'positive',
      icon: <Coffee className="h-4 w-4" />,
      description: 'Regular meals but high caffeine dependency',
      suggestions: ['Reduce caffeine after 2 PM', 'Include more protein in breakfast']
    }
  ];

  useEffect(() => {
    analyzeInfluences();
  }, [currentMood, userProfile]);

  const analyzeInfluences = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setInfluences(mockInfluences);
      
      // Calculate overall score
      const totalScore = mockInfluences.reduce((sum, influence) => {
        const weightedScore = influence.impact === 'negative' 
          ? (100 - influence.value) 
          : influence.value;
        return sum + weightedScore;
      }, 0);
      
      setOverallScore(Math.round(totalScore / mockInfluences.length));
      setIsAnalyzing(false);
    }, 2000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <CheckCircle className="h-4 w-4" />;
      case 'negative': return <AlertTriangle className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Analyzing Surrounding Influences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3">AI is analyzing your study environment...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Surrounding Influences Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Environment Score</span>
                <span className="text-2xl font-bold text-blue-600">{overallScore}%</span>
              </div>
              <Progress value={overallScore} className="h-3" />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {overallScore >= 80 ? 'Excellent' : 
                 overallScore >= 60 ? 'Good' : 
                 overallScore >= 40 ? 'Fair' : 'Needs Improvement'}
              </div>
              <div className="text-sm text-gray-500">Environment Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {influences.map((influence) => (
              <Card key={influence.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {influence.icon}
                      <h3 className="font-medium">{influence.name}</h3>
                    </div>
                    <Badge className={getImpactColor(influence.impact)}>
                      {getImpactIcon(influence.impact)}
                      <span className="ml-1 capitalize">{influence.impact}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Impact Score</span>
                      <span className="font-semibold">{influence.value}%</span>
                    </div>
                    <Progress 
                      value={influence.value} 
                      className="h-2"
                    />
                    <p className="text-sm text-gray-600">{influence.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-4">
            {influences.map((influence) => (
              <Card key={influence.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {influence.icon}
                    {influence.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {influence.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Influence Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <p>Trend analysis will be available after collecting more data.</p>
                <p className="text-sm">Continue using the app to see your environment patterns.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Improvements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Start Focus Session
            </Button>
            <Button variant="outline" size="sm">
              <Moon className="h-4 w-4 mr-2" />
              Sleep Tracker
            </Button>
            <Button variant="outline" size="sm">
              <Coffee className="h-4 w-4 mr-2" />
              Nutrition Log
            </Button>
            <Button variant="outline" size="sm" onClick={analyzeInfluences}>
              <Brain className="h-4 w-4 mr-2" />
              Re-analyze
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurroundingInfluencesSection;
