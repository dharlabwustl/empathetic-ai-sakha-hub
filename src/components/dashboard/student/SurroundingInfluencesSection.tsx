import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Home, Users, Zap, TrendingUp, TrendingDown, 
  AlertCircle, CheckCircle, Clock, Target,
  Heart, Brain, Lightbulb, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

interface EnvironmentFactor {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  impact: 'positive' | 'negative' | 'neutral';
  currentLevel: number;
  recommendations: string[];
}

const SurroundingInfluencesSection = () => {
  const [environmentScore, setEnvironmentScore] = useState(75);
  const [selectedFactor, setSelectedFactor] = useState<EnvironmentFactor | null>(null);
  const [environmentFactors, setEnvironmentFactors] = useState<EnvironmentFactor[]>([
    {
      id: 'home-comfort',
      name: 'Home Comfort',
      description: 'How comfortable and inviting your study space is',
      icon: <Home className="h-4 w-4" />,
      impact: 'positive',
      currentLevel: 8,
      recommendations: [
        'Ensure your chair is ergonomic',
        'Add plants to your study area',
        'Keep the temperature comfortable'
      ]
    },
    {
      id: 'social-circle',
      name: 'Social Circle',
      description: 'The influence of your friends and family on your studies',
      icon: <Users className="h-4 w-4" />,
      impact: 'neutral',
      currentLevel: 6,
      recommendations: [
        'Communicate your study goals to friends',
        'Join study groups',
        'Limit distractions during study times'
      ]
    },
    {
      id: 'study-habits',
      name: 'Study Habits',
      description: 'Your consistency and effectiveness in studying',
      icon: <Zap className="h-4 w-4" />,
      impact: 'positive',
      currentLevel: 7,
      recommendations: [
        'Create a study schedule',
        'Use effective study techniques',
        'Take regular breaks'
      ]
    },
    {
      id: 'screen-time',
      name: 'Screen Time',
      description: 'The amount of time you spend on screens outside of studying',
      icon: <TrendingDown className="h-4 w-4" />,
      impact: 'negative',
      currentLevel: 5,
      recommendations: [
        'Set screen time limits',
        'Use blue light filters',
        'Take breaks from screens'
      ]
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Your Learning Environment</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Understand how your surroundings impact your learning effectiveness
        </p>
      </div>

      {/* Environment Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Overall Environment Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Learning Environment Health</span>
            <span className="text-2xl font-bold text-blue-600">{Math.round(environmentScore)}/100</span>
          </div>
          <Progress value={environmentScore} className="h-3 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {environmentScore >= 80 ? 'Excellent learning environment!' :
             environmentScore >= 60 ? 'Good environment with room for improvement' :
             'Consider optimizing your learning environment'}
          </p>
        </CardContent>
      </Card>

      {/* Environment Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {environmentFactors.map((factor, index) => (
          <motion.div
            key={factor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedFactor?.id === factor.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedFactor(factor)}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-full ${
                    factor.impact === 'positive' ? 'bg-green-100 text-green-600' :
                    factor.impact === 'negative' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {factor.icon}
                  </div>
                  <Badge variant={
                    factor.impact === 'positive' ? 'default' :
                    factor.impact === 'negative' ? 'destructive' :
                    'secondary'
                  }>
                    {factor.impact}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-sm mb-2">{factor.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Current Level</span>
                    <span className="text-sm font-medium">{factor.currentLevel}/10</span>
                  </div>
                  <Progress value={factor.currentLevel * 10} className="h-2" />
                  <p className="text-xs text-gray-500 line-clamp-2">{factor.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed Factor Analysis */}
      {selectedFactor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedFactor.icon}
              {selectedFactor.name} - Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedFactor.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Current Assessment</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Impact Level</span>
                      <Badge variant={
                        selectedFactor.impact === 'positive' ? 'default' :
                        selectedFactor.impact === 'negative' ? 'destructive' :
                        'secondary'
                      }>
                        {selectedFactor.impact}
                      </Badge>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Current Rating</span>
                        <span className="font-medium">{selectedFactor.currentLevel}/10</span>
                      </div>
                      <Slider
                        value={[selectedFactor.currentLevel]}
                        onValueChange={(value) => {
                          const updatedFactors = environmentFactors.map(f =>
                            f.id === selectedFactor.id ? { ...f, currentLevel: value[0] } : f
                          );
                          setEnvironmentFactors(updatedFactors);
                          setSelectedFactor({ ...selectedFactor, currentLevel: value[0] });
                        }}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Recommendations</h4>
                  <div className="space-y-2">
                    {selectedFactor.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Environment Check</h3>
            <p className="text-sm text-gray-600 mb-3">Run a quick assessment of your current learning space</p>
            <Button size="sm" className="w-full">Start Assessment</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Focus Tips</h3>
            <p className="text-sm text-gray-600 mb-3">Get personalized tips to improve concentration</p>
            <Button size="sm" variant="outline" className="w-full">Get Tips</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Wellness Check</h3>
            <p className="text-sm text-gray-600 mb-3">Monitor your physical and mental wellness</p>
            <Button size="sm" variant="outline" className="w-full">Check Wellness</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SurroundingInfluencesSection;
