
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { AlertTriangle, BookOpen, Target, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data for weak areas
const subjectWeaknessData = [
  { subject: 'Physics', score: 65, benchmark: 75, gap: 10 },
  { subject: 'Organic Chemistry', score: 58, benchmark: 75, gap: 17 },
  { subject: 'Inorganic Chemistry', score: 72, benchmark: 75, gap: 3 },
  { subject: 'Physical Chemistry', score: 69, benchmark: 75, gap: 6 },
  { subject: 'Botany', score: 78, benchmark: 75, gap: -3 },
  { subject: 'Zoology', score: 73, benchmark: 75, gap: 2 },
];

const topicWeaknessData = [
  { topic: 'Mechanics', score: 60, importance: 'high' },
  { topic: 'Thermodynamics', score: 68, importance: 'medium' },
  { topic: 'Optics', score: 55, importance: 'high' },
  { topic: 'Electrostatics', score: 72, importance: 'high' },
  { topic: 'Organic Compounds', score: 58, importance: 'high' },
  { topic: 'Reactions', score: 62, importance: 'medium' },
];

const progressData = [
  { area: 'Optics', pastScore: 45, currentScore: 55, targetScore: 75 },
  { area: 'Organic Chemistry', pastScore: 52, currentScore: 58, targetScore: 75 },
  { area: 'Mechanics', pastScore: 55, currentScore: 60, targetScore: 75 },
];

// Skills radar data
const skillsData = [
  { subject: 'Problem Solving', fullMark: 100, score: 65 },
  { subject: 'Memorization', fullMark: 100, score: 75 },
  { subject: 'Formula Application', fullMark: 100, score: 60 },
  { subject: 'Concept Understanding', fullMark: 100, score: 70 },
  { subject: 'Time Management', fullMark: 100, score: 55 },
  { subject: 'Exam Strategy', fullMark: 100, score: 50 },
];

const WeakAreasAnalysis: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
          Weak Areas Identification
        </CardTitle>
        <CardDescription>
          Priority improvement areas based on your performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="subjects" className="w-full">
          <TabsList className="grid grid-cols-3 gap-2 mb-4">
            <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
            <TabsTrigger value="topics">Topic Weaknesses</TabsTrigger>
            <TabsTrigger value="progress">Improvement Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subjects" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectWeaknessData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8884d8" name="Your Score" />
                  <Bar dataKey="benchmark" fill="#82ca9d" name="Target Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3 mt-4">
              <h4 className="font-medium text-md">Priority Areas:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {subjectWeaknessData
                  .filter(item => item.gap > 0)
                  .sort((a, b) => b.gap - a.gap)
                  .slice(0, 3)
                  .map((area, index) => (
                    <div key={index} className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{area.subject}</span>
                        <Badge variant={area.gap > 10 ? "destructive" : "secondary"}>
                          Gap: {area.gap}%
                        </Badge>
                      </div>
                      <Progress value={area.score} className="h-2 mb-1" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Current: {area.score}%</span>
                        <span>Target: {area.benchmark}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button className="gap-2">
                Generate Improvement Plan <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-md">Critical Topic Weaknesses</h4>
                <div className="space-y-3">
                  {topicWeaknessData
                    .sort((a, b) => {
                      // Sort by importance first, then by score
                      if (a.importance === 'high' && b.importance !== 'high') return -1;
                      if (a.importance !== 'high' && b.importance === 'high') return 1;
                      return a.score - b.score;
                    })
                    .map((topic, index) => (
                      <div key={index} className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="font-medium text-sm">{topic.topic}</span>
                            {topic.importance === 'high' && (
                              <Badge className="ml-2 bg-red-100 text-red-800 border-red-200">
                                High Priority
                              </Badge>
                            )}
                          </div>
                          <span className={`text-sm ${topic.score < 60 ? 'text-red-600' : topic.score < 70 ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {topic.score}%
                          </span>
                        </div>
                        <Progress 
                          value={topic.score} 
                          className={`h-2 ${
                            topic.score < 60 ? 'bg-red-100' : 
                            topic.score < 70 ? 'bg-amber-100' : 
                            'bg-emerald-100'
                          }`}
                        />
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Skills" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
                <p className="text-xs text-center text-muted-foreground mt-2">Your Skills Analysis</p>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 flex items-center">
                <Target className="mr-2 h-4 w-4" />
                Action Required
              </h4>
              <p className="text-sm mt-2">Your exam strategy and time management skills need immediate attention as they directly impact performance across all topics. We recommend focusing on Optics and Organic Chemistry first due to their high importance in the NEET exam.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium text-md">Improvement Progress Tracking</h4>
              
              {progressData.map((item, index) => (
                <div key={index} className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="font-medium">{item.area}</h5>
                      <div className="text-xs text-muted-foreground">
                        {item.currentScore - item.pastScore > 0 ? (
                          <span className="text-emerald-600 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            Improved by {item.currentScore - item.pastScore}% since last assessment
                          </span>
                        ) : (
                          <span className="text-amber-600">No improvement since last assessment</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{item.currentScore}%</span>
                      <div className="text-xs text-muted-foreground">
                        Target: {item.targetScore}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                      <div style={{ width: `${item.pastScore}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-300"></div>
                      <div style={{ width: `${item.currentScore - item.pastScore}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                      <div style={{ width: `${item.targetScore - item.currentScore}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-gray-300"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Past: {item.pastScore}%</span>
                      <span>Current: {item.currentScore}%</span>
                      <span>Target: {item.targetScore}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" className="text-xs">
                      <BookOpen className="h-3 w-3 mr-1" /> Review Material
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-4">
                <Button className="gap-2">
                  Generate Updated Study Plan <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeakAreasAnalysis;
