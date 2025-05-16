
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowUpRight, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for weak areas
const weakAreasList = [
  {
    id: 'wa1',
    subject: 'Physics',
    topic: 'Electromagnetism',
    subtopic: 'Electromagnetic Induction',
    masteryLevel: 35,
    priority: 'high',
    lastTestScore: 42,
    recommendation: 'Review Faraday\'s Law and Lenz\'s Law concepts',
    resources: [
      { type: 'video', title: 'Faraday\'s Law Explained', duration: '15 min' },
      { type: 'practice', title: 'Electromagnetic Induction Problems', count: 12 },
    ]
  },
  {
    id: 'wa2',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    subtopic: 'Reaction Mechanisms',
    masteryLevel: 40,
    priority: 'high',
    lastTestScore: 45,
    recommendation: 'Practice more SN1 and SN2 reaction problems',
    resources: [
      { type: 'concept', title: 'Substitution Reactions Overview', count: 1 },
      { type: 'practice', title: 'Mechanism Prediction Quiz', count: 8 },
    ]
  },
  {
    id: 'wa3',
    subject: 'Biology',
    topic: 'Molecular Biology',
    subtopic: 'DNA Replication',
    masteryLevel: 48,
    priority: 'medium',
    lastTestScore: 52,
    recommendation: 'Focus on understanding the enzymes involved in replication',
    resources: [
      { type: 'video', title: 'DNA Replication Animation', duration: '10 min' },
      { type: 'flashcards', title: 'DNA Replication Enzymes', count: 15 },
    ]
  },
  {
    id: 'wa4',
    subject: 'Physics',
    topic: 'Optics',
    subtopic: 'Wave Optics',
    masteryLevel: 45,
    priority: 'medium',
    lastTestScore: 50,
    recommendation: 'Work on diffraction grating problems',
    resources: [
      { type: 'practice', title: 'Wave Optics Problem Set', count: 10 },
      { type: 'concept', title: 'Interference Patterns Explained', count: 1 },
    ]
  }
];

// Previously weak areas with improvement
const improvedAreas = [
  {
    id: 'ia1',
    subject: 'Chemistry',
    topic: 'Thermodynamics',
    initialMastery: 32,
    currentMastery: 78,
    improvement: 46,
    timeSpent: '8.5 hours'
  },
  {
    id: 'ia2',
    subject: 'Biology',
    topic: 'Cell Division',
    initialMastery: 45,
    currentMastery: 82,
    improvement: 37,
    timeSpent: '6 hours'
  }
];

const WeakAreasIdentification: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Priority Improvement Areas
          </CardTitle>
          <CardDescription>
            Topics that need immediate attention based on test scores and mastery levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {weakAreasList.map((area) => (
              <div key={area.id} className="border rounded-lg p-4">
                <div className="flex flex-wrap justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-medium text-lg">{area.subtopic}</h4>
                    <p className="text-sm text-muted-foreground">{area.subject} • {area.topic}</p>
                  </div>
                  <Badge className={
                    area.priority === 'high' 
                      ? "bg-red-100 text-red-800 border-red-200" 
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }>
                    {area.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mastery Level</span>
                    <span className="font-medium">{area.masteryLevel}%</span>
                  </div>
                  <Progress 
                    value={area.masteryLevel} 
                    className="h-2" 
                  />
                </div>
                
                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-muted-foreground">Last Test Score:</span>
                  <span className={`font-medium ${
                    area.lastTestScore < 50 ? 'text-red-500' : 'text-amber-500'
                  }`}>
                    {area.lastTestScore}%
                  </span>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-1">AI Recommendation:</h5>
                  <p className="text-sm">{area.recommendation}</p>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <h5 className="text-sm font-medium mb-2">Suggested Resources:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {area.resources.map((resource, idx) => (
                      <Button key={idx} variant="outline" size="sm" className="justify-start">
                        {resource.type === 'video' && <BookOpen className="h-3 w-3 mr-2" />}
                        {resource.type === 'practice' && <ArrowUpRight className="h-3 w-3 mr-2" />}
                        {resource.type === 'concept' && <BookOpen className="h-3 w-3 mr-2" />}
                        {resource.type === 'flashcards' && <BookOpen className="h-3 w-3 mr-2" />}
                        <span className="truncate">{resource.title}</span>
                        <span className="ml-auto text-xs opacity-70">
                          {resource.duration || `${resource.count} items`}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button className="w-full">
              Generate Personalized Improvement Plan
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-green-500" />
            Progress Tracking
          </CardTitle>
          <CardDescription>
            Areas where you've shown significant improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {improvedAreas.map((area) => (
              <div key={area.id} className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/10">
                <div className="flex flex-wrap justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{area.topic}</h4>
                    <p className="text-sm text-muted-foreground">{area.subject}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    +{area.improvement}% Improvement
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Initial Mastery</span>
                    <span>{area.initialMastery}%</span>
                  </div>
                  <Progress 
                    value={area.initialMastery} 
                    className="h-2 mb-3" 
                  />
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Mastery</span>
                    <span className="font-medium">{area.currentMastery}%</span>
                  </div>
                  <Progress 
                    value={area.currentMastery} 
                    className="h-2 bg-gray-100 dark:bg-gray-700" 
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Total time spent: {area.timeSpent}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeakAreasIdentification;
