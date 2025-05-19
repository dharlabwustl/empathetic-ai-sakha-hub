
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { AlertTriangle, BookOpen, TrendingUp, Target, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock weak areas data
const subjectWeakAreas = [
  { 
    subject: 'Physics',
    topics: [
      { name: 'Electromagnetism', score: 55, masteryRequired: 75, impactScore: 8.5, timeToImprove: '3 days' },
      { name: 'Fluid Mechanics', score: 62, masteryRequired: 70, impactScore: 7.8, timeToImprove: '2 days' }
    ]
  },
  { 
    subject: 'Chemistry',
    topics: [
      { name: 'Organic Reactions', score: 48, masteryRequired: 80, impactScore: 9.2, timeToImprove: '4 days' },
      { name: 'Chemical Equilibrium', score: 58, masteryRequired: 75, impactScore: 8.0, timeToImprove: '3 days' }
    ]
  },
  { 
    subject: 'Mathematics',
    topics: [
      { name: 'Calculus - Integration', score: 51, masteryRequired: 80, impactScore: 9.0, timeToImprove: '4 days' },
      { name: 'Probability', score: 60, masteryRequired: 70, impactScore: 7.5, timeToImprove: '2 days' }
    ]
  },
  { 
    subject: 'Biology',
    topics: [
      { name: 'Cell Division', score: 63, masteryRequired: 75, impactScore: 7.8, timeToImprove: '2 days' }
    ]
  }
];

// Flat list of all weak areas for ranking
const allWeakAreas = subjectWeakAreas.flatMap(subject => 
  subject.topics.map(topic => ({
    subject: subject.subject,
    topic: topic.name,
    score: topic.score,
    masteryRequired: topic.masteryRequired,
    impactScore: topic.impactScore,
    timeToImprove: topic.timeToImprove,
    gap: topic.masteryRequired - topic.score
  }))
).sort((a, b) => b.gap - a.gap || b.impactScore - a.impactScore);

// Progress tracking data for previously identified weak areas
const progressTrackingData = [
  { topic: 'Wave Optics', initialScore: 45, currentScore: 68, targetScore: 75, dateIdentified: '2023-05-02', subject: 'Physics' },
  { topic: 'Acid-Base Reactions', initialScore: 52, currentScore: 73, targetScore: 75, dateIdentified: '2023-05-10', subject: 'Chemistry' },
  { topic: 'Vectors', initialScore: 58, currentScore: 71, targetScore: 80, dateIdentified: '2023-05-15', subject: 'Mathematics' }
];

// Common problem patterns data
const problemPatternsData = [
  { 
    pattern: 'Conceptual Understanding',
    frequency: 65,
    examples: ['Confusing vector components', 'Mixing acid-base theories'],
    recommendation: 'Focus on basic principles with visual aids and concrete examples'
  },
  { 
    pattern: 'Formula Application',
    frequency: 52,
    examples: ['Incorrect equation selection', 'Unit conversion errors'],
    recommendation: 'Practice step-by-step problem solving with formula identification'
  },
  { 
    pattern: 'Multi-step Problems',
    frequency: 78,
    examples: ['Missing intermediate steps', 'Solution planning errors'],
    recommendation: 'Break down complex problems into sub-problems and master each component'
  }
];

// Radar chart data for skills assessment
const skillsRadarData = [
  { 
    category: 'Recall',
    physics: 75,
    chemistry: 68,
    mathematics: 82,
    biology: 70,
    fullMark: 100
  },
  { 
    category: 'Concept Application',
    physics: 60,
    chemistry: 52,
    mathematics: 75,
    biology: 80,
    fullMark: 100
  },
  { 
    category: 'Problem Solving',
    physics: 65,
    chemistry: 55,
    mathematics: 70,
    biology: 62,
    fullMark: 100
  },
  { 
    category: 'Analysis',
    physics: 55,
    chemistry: 60,
    mathematics: 72,
    biology: 68,
    fullMark: 100
  },
  { 
    category: 'Evaluation',
    physics: 50,
    chemistry: 48,
    mathematics: 62,
    biology: 58,
    fullMark: 100
  }
];

// Improvement plan data
const improvementPlans = allWeakAreas.map(area => ({
  subject: area.subject,
  topic: area.topic,
  currentScore: area.score,
  targetScore: area.masteryRequired,
  steps: [
    { 
      step: 'Review Core Concepts',
      resources: [`${area.topic} Fundamentals`, 'Concept Map', 'Video Lecture'],
      timeEstimate: '45 mins'
    },
    { 
      step: 'Practice Basic Problems',
      resources: ['Level 1 Practice Set', 'Interactive Exercises'],
      timeEstimate: '60 mins'
    },
    { 
      step: 'Address Knowledge Gaps',
      resources: ['Targeted Flashcards', 'Expert Walkthrough'],
      timeEstimate: '60 mins'
    },
    { 
      step: 'Advanced Practice',
      resources: ['Level 2 Challenge Problems', 'Previous Year Questions'],
      timeEstimate: '90 mins'
    }
  ],
  totalTime: area.timeToImprove
}));

const WeakAreasIdentification = () => {
  const [activeTab, setActiveTab] = useState('priority-areas');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedImprovementPlan, setSelectedImprovementPlan] = useState<number | null>(null);

  // Filter weak areas by selected subject
  const filteredWeakAreas = selectedSubject === 'all' 
    ? allWeakAreas 
    : allWeakAreas.filter(area => area.subject === selectedSubject);
  
  // Get a list of unique subjects for the filter
  const subjects = ['all', ...new Set(allWeakAreas.map(area => area.subject))];

  // Function to get appropriate color based on score gap
  const getScoreColor = (score: number, required: number) => {
    const gap = required - score;
    if (gap > 20) return 'text-red-600 dark:text-red-400';
    if (gap > 10) return 'text-amber-600 dark:text-amber-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  // Function to get progress color
  const getProgressColor = (score: number, required: number) => {
    const gap = required - score;
    if (gap > 20) return 'bg-red-600';
    if (gap > 10) return 'bg-amber-600';
    return 'bg-yellow-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Weak Areas Identification</h2>
          <p className="text-muted-foreground">Pinpoint your knowledge gaps and get targeted improvement plans</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Filter by Subject:</span>
          <select 
            className="border rounded-md text-sm px-2 py-1 bg-white dark:bg-gray-800"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
              Priority Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-2xl font-bold">{allWeakAreas.length}</div>
              <div className="text-sm text-muted-foreground">
                topics identified
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="font-medium text-red-600 dark:text-red-400">Top concern:</span> {allWeakAreas[0]?.topic} ({allWeakAreas[0]?.subject})
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Target className="h-4 w-4 mr-2 text-amber-500" />
              Average Mastery Gap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-2xl font-bold">
                {Math.round(allWeakAreas.reduce((acc, area) => acc + (area.masteryRequired - area.score), 0) / allWeakAreas.length)}%
              </div>
              <div className="text-sm text-muted-foreground">
                below target
              </div>
            </div>
            <Progress 
              value={100 - Math.round(allWeakAreas.reduce((acc, area) => acc + (area.masteryRequired - area.score), 0) / allWeakAreas.length)} 
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-4 w-4 mr-2 text-violet-500" />
              Estimated Improvement Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-baseline">
              <div className="text-2xl font-bold">14 days</div>
              <div className="text-sm text-green-600">
                Achievable goal
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              With focused 2-hour daily study sessions
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="priority-areas" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Priority Areas</span>
          </TabsTrigger>
          <TabsTrigger value="skills-gaps" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Skills Gaps</span>
          </TabsTrigger>
          <TabsTrigger value="improvement" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Improvement Plans</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>Progress Tracking</span>
          </TabsTrigger>
        </TabsList>

        {/* Priority Areas Tab */}
        <TabsContent value="priority-areas">
          <Card>
            <CardHeader>
              <CardTitle>Priority Improvement Areas</CardTitle>
              <CardDescription>
                Topics that need immediate attention for maximum impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-sm">Rank</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Topic</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Subject</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Current Score</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Required</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Gap</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Impact Score</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Time to Improve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWeakAreas.map((area, index) => (
                      <tr key={`${area.subject}-${area.topic}`} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-4 font-medium">{index + 1}</td>
                        <td className="py-3 px-4">{area.topic}</td>
                        <td className="py-3 px-4">{area.subject}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span>{area.score}%</span>
                            <Progress 
                              value={area.score} 
                              className="h-2 w-16" 
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">{area.masteryRequired}%</td>
                        <td className={`py-3 px-4 font-medium ${getScoreColor(area.score, area.masteryRequired)}`}>
                          {area.masteryRequired - area.score}%
                        </td>
                        <td className="py-3 px-4">{area.impactScore}</td>
                        <td className="py-3 px-4">{area.timeToImprove}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-4">Common Problem Patterns</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {problemPatternsData.map((pattern, index) => (
                    <Card key={index} className="border-t-4 border-t-red-500">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{pattern.pattern}</CardTitle>
                          <Badge variant="outline">{pattern.frequency}% of errors</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div>
                          <strong className="text-muted-foreground">Examples:</strong>
                          <ul className="list-disc list-inside pl-2 mt-1">
                            {pattern.examples.map((example, i) => (
                              <li key={i}>{example}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-muted-foreground">Recommendation:</strong>
                          <p className="mt-1">{pattern.recommendation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Gaps Tab */}
        <TabsContent value="skills-gaps">
          <Card>
            <CardHeader>
              <CardTitle>Skills Gap Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of your strengths and weaknesses across different skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={150} data={skillsRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Physics" dataKey="physics" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Chemistry" dataKey="chemistry" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="Mathematics" dataKey="mathematics" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                    <Radar name="Biology" dataKey="biology" stroke="#ff8042" fill="#ff8042" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Skills Summary</h4>
                  <ul className="space-y-4">
                    <li className="border-b pb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Problem Solving</span>
                        <span className="text-amber-600 dark:text-amber-400">Need improvement</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">
                        You struggle with multi-step problems and formula selection
                      </p>
                    </li>
                    <li className="border-b pb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Analysis</span>
                        <span className="text-amber-600 dark:text-amber-400">Need improvement</span>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">
                        You often miss connections between related concepts
                      </p>
                    </li>
                    <li>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Recall</span>
                        <span className="text-green-600 dark:text-green-400">Strong area</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">
                        You excel at memorizing facts and formulas
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">Skill Building Recommendations</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2 border-b pb-3">
                      <div className="mt-1 bg-purple-100 text-purple-700 rounded-full p-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="font-medium">Practice multi-step problems daily</p>
                        <p className="text-muted-foreground">Start with guided examples and gradually move to independent problem solving</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 border-b pb-3">
                      <div className="mt-1 bg-purple-100 text-purple-700 rounded-full p-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="font-medium">Create concept maps for each subject</p>
                        <p className="text-muted-foreground">Connect related ideas visually to strengthen analytical skills</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 bg-purple-100 text-purple-700 rounded-full p-0.5">
                        <CheckCircle className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="font-medium">Regular quiz-based practice</p>
                        <p className="text-muted-foreground">Shift from passive reading to active recall techniques</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Improvement Plans Tab */}
        <TabsContent value="improvement">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Improvement Plans</CardTitle>
              <CardDescription>
                Step-by-step guidance to master your weak areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedImprovementPlan !== null ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-medium">
                        {improvementPlans[selectedImprovementPlan].topic} ({improvementPlans[selectedImprovementPlan].subject})
                      </h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        Current: {improvementPlans[selectedImprovementPlan].currentScore}% | 
                        Target: {improvementPlans[selectedImprovementPlan].targetScore}% | 
                        Estimated time: {improvementPlans[selectedImprovementPlan].totalTime}
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedImprovementPlan(null)}>
                      Back to All Plans
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {improvementPlans[selectedImprovementPlan].steps.map((step, index) => (
                      <div key={index} className="border rounded-lg p-4 flex">
                        <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-lg mb-2">{step.step}</h4>
                          <div className="text-sm text-muted-foreground mb-3">Estimated time: {step.timeEstimate}</div>
                          
                          <div className="space-y-2">
                            <div className="font-medium text-sm">Recommended Resources:</div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {step.resources.map((resource, i) => (
                                <li key={i} className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800/50">
                                  <BookOpen className="h-4 w-4 text-blue-500" />
                                  <span>{resource}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t pt-4 mt-6 flex justify-between">
                      <Button variant="outline">Download Plan as PDF</Button>
                      <Button>Add to Today's Plan</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredWeakAreas.map((area, index) => (
                      <div 
                        key={`${area.subject}-${area.topic}`}
                        className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedImprovementPlan(allWeakAreas.findIndex(a => a.topic === area.topic && a.subject === area.subject))}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`rounded-full h-8 w-8 flex items-center justify-center text-white ${getProgressColor(area.score, area.masteryRequired)}`}>
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{area.topic}</h4>
                              <div className="text-sm text-muted-foreground">{area.subject}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-sm font-medium">Current Score</div>
                              <div className="text-lg">{area.score}%</div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-sm font-medium">Target</div>
                              <div className="text-lg">{area.masteryRequired}%</div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-sm font-medium">Est. Time</div>
                              <div className="text-lg">{area.timeToImprove}</div>
                            </div>
                            
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t">
              <div className="w-full text-center pt-2">
                <p className="text-sm text-muted-foreground">
                  Plans are updated weekly based on your performance data and study patterns
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Progress Tracking Tab */}
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your improvement in previously identified weak areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={progressTrackingData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barGap={0}
                    barCategoryGap={30}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis type="number" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="initialScore" name="Initial Score" fill="#f87171" />
                    <Bar dataKey="currentScore" name="Current Score" fill="#22c55e" />
                    <Bar dataKey="targetScore" name="Target" fill="#94a3b8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Previously Identified Weak Areas</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium">Topic</th>
                        <th className="text-left py-3 px-4 font-medium">Subject</th>
                        <th className="text-left py-3 px-4 font-medium">Initial Score</th>
                        <th className="text-left py-3 px-4 font-medium">Current Score</th>
                        <th className="text-left py-3 px-4 font-medium">Target</th>
                        <th className="text-left py-3 px-4 font-medium">Progress</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {progressTrackingData.map((item) => {
                        const progressPercentage = Math.round(((item.currentScore - item.initialScore) / (item.targetScore - item.initialScore)) * 100);
                        return (
                          <tr key={item.topic} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="py-3 px-4 font-medium">{item.topic}</td>
                            <td className="py-3 px-4">{item.subject}</td>
                            <td className="py-3 px-4">{item.initialScore}%</td>
                            <td className="py-3 px-4">{item.currentScore}%</td>
                            <td className="py-3 px-4">{item.targetScore}%</td>
                            <td className="py-3 px-4 w-40">
                              <div className="flex flex-col">
                                <Progress value={progressPercentage} className="h-2" />
                                <span className="text-xs text-right mt-1">{progressPercentage}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {item.currentScore >= item.targetScore ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                  Target Achieved
                                </Badge>
                              ) : progressPercentage >= 75 ? (
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                  On Track
                                </Badge>
                              ) : progressPercentage >= 50 ? (
                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                                  Making Progress
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                                  Needs Focus
                                </Badge>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 border-t pt-4">
                  <h4 className="text-lg font-medium mb-4">Overall Improvement Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                      <div className="text-sm text-muted-foreground">Average Improvement</div>
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                        {Math.round(progressTrackingData.reduce((acc, item) => acc + (item.currentScore - item.initialScore), 0) / progressTrackingData.length)}%
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Across all previously identified weak areas
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                      <div className="text-sm text-muted-foreground">Achievement Rate</div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                        {Math.round(progressTrackingData.filter(item => item.currentScore >= item.targetScore).length / progressTrackingData.length * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Percentage of targets successfully reached
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
                      <div className="text-sm text-muted-foreground">Time to Mastery</div>
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                        ~3.2 weeks
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Average time to reach mastery targets
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WeakAreasIdentification;
