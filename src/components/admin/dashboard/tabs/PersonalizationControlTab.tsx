
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Brain, Target, Zap, TrendingUp, Settings, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PersonalizationControlTab = () => {
  const { toast } = useToast();
  const [aiSettings, setAiSettings] = useState({
    adaptationSpeed: 50,
    personalityWeight: 75,
    recommendationStrength: 60,
    learningStyleImpact: 80
  });

  const personalityTypes = [
    { type: 'Analytical', count: 342, percentage: 23, effectiveness: 87 },
    { type: 'Creative', count: 298, percentage: 20, effectiveness: 91 },
    { type: 'Practical', count: 267, percentage: 18, effectiveness: 85 },
    { type: 'Conceptual', count: 234, percentage: 16, effectiveness: 89 },
    { type: 'Social', count: 189, percentage: 13, effectiveness: 82 },
    { type: 'Independent', count: 156, percentage: 10, effectiveness: 88 }
  ];

  const learningStyles = [
    { style: 'Visual', algorithms: 'Image-heavy content, diagrams, mind maps', effectiveness: 89 },
    { style: 'Auditory', algorithms: 'Voice explanations, audio content, discussions', effectiveness: 84 },
    { style: 'Kinesthetic', algorithms: 'Interactive simulations, hands-on practice', effectiveness: 91 },
    { style: 'Reading/Writing', algorithms: 'Text-based content, note-taking, summaries', effectiveness: 86 }
  ];

  const recommendationMetrics = [
    { metric: 'Accuracy Rate', value: '87%', target: '90%' },
    { metric: 'User Engagement', value: '78%', target: '80%' },
    { metric: 'Goal Achievement', value: '73%', target: '75%' },
    { metric: 'Satisfaction Score', value: '8.4/10', target: '8.5/10' }
  ];

  const handleAIOptimization = () => {
    toast({
      title: "AI Optimization Started",
      description: "Personalization algorithms are being optimized based on current data"
    });
  };

  const handleSettingChange = (setting: string, value: number[]) => {
    setAiSettings(prev => ({ ...prev, [setting]: value[0] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Personalization Engine Control</h2>
          <p className="text-muted-foreground">Manage AI algorithms and personalization settings</p>
        </div>
        <Button onClick={handleAIOptimization} className="bg-gradient-to-r from-purple-500 to-blue-600">
          <Brain className="w-4 h-4 mr-2" />
          Optimize AI
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Personalizations</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,486</div>
            <p className="text-xs text-muted-foreground">87% of active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Algorithm Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+3% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Boost</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+34%</div>
            <p className="text-xs text-muted-foreground">vs non-personalized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+28%</div>
            <p className="text-xs text-muted-foreground">improvement rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="personality" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personality">Personality Types</TabsTrigger>
          <TabsTrigger value="learning">Learning Styles</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="algorithms">Algorithm Control</TabsTrigger>
        </TabsList>

        <TabsContent value="personality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Personality Type Classification</CardTitle>
              <CardDescription>Monitor personality type distribution and effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {personalityTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium">{type.type}</div>
                        <div className="text-sm text-muted-foreground">{type.count} users ({type.percentage}%)</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{type.effectiveness}%</div>
                      <div className="text-sm text-muted-foreground">effectiveness</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Style Adaptation Algorithms</CardTitle>
              <CardDescription>Configure how the system adapts to different learning styles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningStyles.map((style, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{style.style} Learners</h4>
                        <p className="text-sm text-muted-foreground">{style.algorithms}</p>
                      </div>
                      <Badge variant="secondary">{style.effectiveness}% effective</Badge>
                    </div>
                    <div className="mt-3">
                      <Button size="sm" variant="outline">Configure Algorithm</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommendation Engine Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendationMetrics.map((metric, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{metric.metric}</div>
                        <div className="text-sm text-muted-foreground">Target: {metric.target}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{metric.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendation Tuning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label>Content Diversity</Label>
                    <Slider defaultValue={[70]} max={100} step={1} className="mt-2" />
                  </div>
                  <div>
                    <Label>Difficulty Progression</Label>
                    <Slider defaultValue={[60]} max={100} step={1} className="mt-2" />
                  </div>
                  <div>
                    <Label>Novelty vs Familiarity</Label>
                    <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
                  </div>
                  <Button>Apply Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="algorithms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Algorithm Control Panel</CardTitle>
              <CardDescription>Fine-tune personalization algorithm parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>Adaptation Speed</Label>
                  <Slider 
                    value={[aiSettings.adaptationSpeed]} 
                    onValueChange={(value) => handleSettingChange('adaptationSpeed', value)}
                    max={100} 
                    step={1} 
                    className="mt-2" 
                  />
                  <div className="text-sm text-muted-foreground mt-1">
                    How quickly the system adapts to user behavior
                  </div>
                </div>

                <div>
                  <Label>Personality Weight</Label>
                  <Slider 
                    value={[aiSettings.personalityWeight]} 
                    onValueChange={(value) => handleSettingChange('personalityWeight', value)}
                    max={100} 
                    step={1} 
                    className="mt-2" 
                  />
                  <div className="text-sm text-muted-foreground mt-1">
                    Influence of personality type on recommendations
                  </div>
                </div>

                <div>
                  <Label>Recommendation Strength</Label>
                  <Slider 
                    value={[aiSettings.recommendationStrength]} 
                    onValueChange={(value) => handleSettingChange('recommendationStrength', value)}
                    max={100} 
                    step={1} 
                    className="mt-2" 
                  />
                  <div className="text-sm text-muted-foreground mt-1">
                    How strongly to push personalized content
                  </div>
                </div>

                <div>
                  <Label>Learning Style Impact</Label>
                  <Slider 
                    value={[aiSettings.learningStyleImpact]} 
                    onValueChange={(value) => handleSettingChange('learningStyleImpact', value)}
                    max={100} 
                    step={1} 
                    className="mt-2" 
                  />
                  <div className="text-sm text-muted-foreground mt-1">
                    Weight of learning style in content delivery
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button>Save Settings</Button>
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button variant="outline" onClick={handleAIOptimization}>Run Optimization</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalizationControlTab;
