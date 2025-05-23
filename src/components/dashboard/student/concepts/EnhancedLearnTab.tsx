
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Brain, Target, Clock, TrendingUp, CheckCircle, 
  AlertCircle, Lightbulb, FileText, Users, Star
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
         BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface EnhancedLearnTabProps {
  conceptName: string;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ conceptName }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const learningProgress = [
    { week: 'Week 1', understanding: 20, retention: 15, application: 10 },
    { week: 'Week 2', understanding: 40, retention: 35, application: 25 },
    { week: 'Week 3', understanding: 65, retention: 60, application: 50 },
    { week: 'Week 4', understanding: 80, retention: 75, application: 70 },
  ];

  const topicMastery = [
    { topic: 'Basic Concept', mastery: 85, timeSpent: 45 },
    { topic: 'Mathematical Application', mastery: 70, timeSpent: 60 },
    { topic: 'Real-world Examples', mastery: 60, timeSpent: 30 },
    { topic: 'Problem Solving', mastery: 45, timeSpent: 25 },
  ];

  const difficultyDistribution = [
    { name: 'Easy', value: 35, color: '#10B981' },
    { name: 'Medium', value: 45, color: '#F59E0B' },
    { name: 'Hard', value: 20, color: '#EF4444' },
  ];

  const studyMethods = [
    { method: 'Reading', effectiveness: 75, timeUsed: 40 },
    { method: 'Videos', effectiveness: 85, timeUsed: 30 },
    { method: 'Practice', effectiveness: 90, timeUsed: 20 },
    { method: 'Discussion', effectiveness: 65, timeUsed: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Learning Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Understanding</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">85%</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <Progress value={85} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Retention</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">75%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <Progress value={75} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Application</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">70%</p>
              </div>
              <Lightbulb className="h-8 w-8 text-purple-600" />
            </div>
            <Progress value={70} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 dark:text-orange-400">Study Time</p>
                <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">4.5h</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-xs text-orange-600 mt-1">+15% this week</div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Concept Explanation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Concept Overview: {conceptName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Newton's Second Law of Motion is one of the fundamental principles in classical mechanics. 
                  It establishes the relationship between the net force acting on an object, its mass, and 
                  the resulting acceleration. The law is mathematically expressed as F = ma, where F represents 
                  the net force, m is the mass of the object, and a is the acceleration.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-l-4 border-blue-500 my-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Key Principle</h4>
                  <p className="text-blue-700 dark:text-blue-300">
                    The acceleration of an object is directly proportional to the net force acting on it 
                    and inversely proportional to its mass.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Prerequisites</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Vector basics</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Newton's First Law</li>
                    <li className="flex items-center"><AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />Basic calculus</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Applications</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Vehicle dynamics</li>
                    <li>• Projectile motion</li>
                    <li>• Engineering design</li>
                    <li>• Sports physics</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Common Mistakes</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Confusing mass and weight</li>
                    <li>• Ignoring friction forces</li>
                    <li>• Wrong direction of forces</li>
                    <li>• Unit inconsistencies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {/* Learning Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Learning Progress Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={learningProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="understanding" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="retention" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="application" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-600" />
                  Topic Mastery Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topicMastery}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="mastery" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Topic Progress Detail */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Topic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicMastery.map((topic, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{topic.topic}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{topic.timeSpent}m studied</span>
                        <Badge variant={topic.mastery >= 80 ? "default" : topic.mastery >= 60 ? "secondary" : "destructive"}>
                          {topic.mastery}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={topic.mastery} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Difficulty Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-600" />
                  Difficulty Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={difficultyDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {difficultyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {difficultyDistribution.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Method Effectiveness */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  Study Method Effectiveness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={studyMethods} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="method" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="effectiveness" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">8.5/10</div>
                  <div className="text-sm text-gray-500">Comprehension Score</div>
                  <Progress value={85} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-gray-500">Problem Accuracy</div>
                  <Progress value={92} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">7 days</div>
                  <div className="text-sm text-gray-500">Study Streak</div>
                  <div className="mt-2 text-xs text-purple-600">Keep it up!</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* AI-Generated Insights */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-indigo-600" />
                AI-Powered Learning Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">✓ Strength Identified</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  You excel at understanding theoretical concepts. Your comprehension of the fundamental 
                  principles is above average.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">⚠ Area for Improvement</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Focus more on problem-solving applications. Consider spending additional time on 
                  practice problems to improve application skills.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Recommendation</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Based on your learning pattern, visual methods and interactive simulations 
                  would be most effective for mastering this concept.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Study Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-gray-600" />
                Personalized Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Review Formula Derivation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Spend 15 minutes understanding how F=ma is derived from Newton's laws</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">Practice Problem Set</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Complete 5 problems involving force calculations in different scenarios</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Interactive Simulation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Use the 3D simulation to visualize force vectors and acceleration</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Peer Learning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Peer Learning Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium">Study Group: Physics Fundamentals</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">5 members • Currently discussing Newton's Laws</p>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h4 className="font-medium">Q&A Session: Force and Motion</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tomorrow 3:00 PM • Hosted by Top Performer</p>
                  </div>
                  <Button size="sm" variant="outline">Reserve</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedLearnTab;
