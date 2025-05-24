
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Settings, TrendingUp, Users, Zap, Target } from 'lucide-react';

const PersonalizationEngineControl = () => {
  const [aiSettings, setAiSettings] = useState({
    personalityClassification: true,
    learningStyleAdaptation: true,
    recommendationEngine: true,
    adaptiveDifficulty: true
  });

  const personalityTypes = [
    { type: 'Analytical', count: 234, accuracy: 89, description: 'Logical, systematic learners' },
    { type: 'Creative', count: 189, accuracy: 85, description: 'Visual, imaginative learners' },
    { type: 'Practical', count: 156, accuracy: 92, description: 'Hands-on, application-focused' },
    { type: 'Social', count: 123, accuracy: 87, description: 'Collaborative, discussion-based' }
  ];

  const learningStyles = [
    { style: 'Visual', adaptation: 'High', effectiveness: 86, users: 345 },
    { style: 'Auditory', adaptation: 'Medium', effectiveness: 78, users: 289 },
    { style: 'Kinesthetic', adaptation: 'High', effectiveness: 82, users: 167 },
    { style: 'Reading/Writing', adaptation: 'Medium', effectiveness: 79, users: 234 }
  ];

  const recommendationMetrics = [
    { category: 'Content', accuracy: 91, engagement: 78, conversion: 65 },
    { category: 'Study Plans', accuracy: 87, engagement: 82, conversion: 72 },
    { category: 'Practice Tests', accuracy: 89, engagement: 75, conversion: 68 },
    { category: 'Resources', accuracy: 84, engagement: 71, conversion: 58 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.5%</div>
            <p className="text-xs text-green-600">+2.3% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personalization Rate</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Users personalized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Lift</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+32%</div>
            <p className="text-xs text-green-600">vs. non-personalized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Updates</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="personality" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personality">Personality Types</TabsTrigger>
          <TabsTrigger value="learning">Learning Styles</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personality Type Classification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {personalityTypes.map((type, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{type.type}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {type.accuracy}% accuracy
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{type.count} users classified</span>
                      <Button variant="outline" size="sm">Tune Model</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Classification Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button>Retrain Models</Button>
                <Button variant="outline">Export Data</Button>
              </div>
              <div className="text-sm text-gray-600">
                Last training: 2 days ago | Next scheduled: Tomorrow 3:00 AM
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Style Adaptation Algorithms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {learningStyles.map((style, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">{style.style} Learning</h3>
                      <div className="flex gap-2">
                        <Badge 
                          className={style.adaptation === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {style.adaptation} Adaptation
                        </Badge>
                        <Badge variant="outline">{style.users} users</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Effectiveness:</span>
                        <div className="font-medium">{style.effectiveness}%</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Active Users:</span>
                        <div className="font-medium">{style.users}</div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommendation Engine Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {recommendationMetrics.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">{metric.category} Recommendations</h3>
                      <Button variant="outline" size="sm">Optimize</Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Accuracy</div>
                        <div className="text-lg font-semibold text-blue-600">{metric.accuracy}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Engagement</div>
                        <div className="text-lg font-semibold text-green-600">{metric.engagement}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Conversion</div>
                        <div className="text-lg font-semibold text-purple-600">{metric.conversion}%</div>
                      </div>
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Diversity Factor</label>
                  <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
                  <div className="text-xs text-gray-500">Balance between relevance and variety</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Recency Weight</label>
                  <input type="range" min="0" max="100" defaultValue="80" className="w-full" />
                  <div className="text-xs text-gray-500">How much to favor recent interactions</div>
                </div>
              </div>
              <Button>Apply Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Engine Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Personality Classification</label>
                    <p className="text-xs text-gray-500">Auto-classify user personality types</p>
                  </div>
                  <Switch 
                    checked={aiSettings.personalityClassification}
                    onCheckedChange={(checked) => 
                      setAiSettings(prev => ({ ...prev, personalityClassification: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Learning Style Adaptation</label>
                    <p className="text-xs text-gray-500">Adapt content based on learning preferences</p>
                  </div>
                  <Switch 
                    checked={aiSettings.learningStyleAdaptation}
                    onCheckedChange={(checked) => 
                      setAiSettings(prev => ({ ...prev, learningStyleAdaptation: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Recommendation Engine</label>
                    <p className="text-xs text-gray-500">Personalized content recommendations</p>
                  </div>
                  <Switch 
                    checked={aiSettings.recommendationEngine}
                    onCheckedChange={(checked) => 
                      setAiSettings(prev => ({ ...prev, recommendationEngine: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Adaptive Difficulty</label>
                    <p className="text-xs text-gray-500">Automatically adjust content difficulty</p>
                  </div>
                  <Switch 
                    checked={aiSettings.adaptiveDifficulty}
                    onCheckedChange={(checked) => 
                      setAiSettings(prev => ({ ...prev, adaptiveDifficulty: checked }))
                    }
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Model Performance Monitoring</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">View Logs</Button>
                  <Button variant="outline">Performance Report</Button>
                </div>
              </div>

              <Button className="w-full">Save AI Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalizationEngineControl;
