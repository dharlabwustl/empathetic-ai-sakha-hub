
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Brain, 
  Settings, 
  Zap, 
  ChevronRight, 
  BarChart2, 
  Clock, 
  BookOpen, 
  Calendar, 
  PuzzlePiece, 
  Users,
  MessageSquare,
  Smile,
  Activity
} from "lucide-react";

const AIPersonalizationTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Personalization Engine Dashboard</h2>
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          <div className="flex items-center gap-1">
            <Zap size={12} className="animate-pulse" />
            <span>Engine Active</span>
          </div>
        </Badge>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Active Learning Styles</h3>
              <Badge className="bg-blue-100 text-blue-800">4</Badge>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-2 bg-blue-100 flex-grow rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 w-3/4"></div>
              </div>
              <span className="text-xs text-gray-500">75%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Daily Study Plans</h3>
              <Badge className="bg-green-100 text-green-800">1,458</Badge>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-2 bg-green-100 flex-grow rounded-full overflow-hidden">
                <div className="bg-green-500 h-2 w-4/5"></div>
              </div>
              <span className="text-xs text-gray-500">80%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Avg. Personalization Score</h3>
              <Badge className="bg-amber-100 text-amber-800">84%</Badge>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-2 bg-amber-100 flex-grow rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2 w-[84%]"></div>
              </div>
              <span className="text-xs text-gray-500">84%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">AI Response Time</h3>
              <Badge className="bg-purple-100 text-purple-800">845ms</Badge>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-2 bg-purple-100 flex-grow rounded-full overflow-hidden">
                <div className="bg-purple-500 h-2 w-2/3"></div>
              </div>
              <span className="text-xs text-gray-500">67%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="learning-style" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger value="learning-style" className="text-sm">Learning Style Detection</TabsTrigger>
          <TabsTrigger value="reinforcement" className="text-sm">Concept Reinforcement</TabsTrigger>
          <TabsTrigger value="planner" className="text-sm">Goal-Based Planner</TabsTrigger>
          <TabsTrigger value="study-plan" className="text-sm">Smart Study Plan</TabsTrigger>
          <TabsTrigger value="difficulty" className="text-sm">Adaptive Difficulty</TabsTrigger>
          <TabsTrigger value="suggestions" className="text-sm">Smart Suggestions</TabsTrigger>
        </TabsList>
      
        {/* Learning Style Detection Tab */}
        <TabsContent value="learning-style" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Learning Style Detection</CardTitle>
              <p className="text-sm text-gray-500">Control how the AI identifies and adapts to student learning styles through onboarding Q&A</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Learning Style Classification</h4>
                    <span className="text-sm text-gray-500">Adjust how aggressively the system classifies learning styles based on onboarding responses</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">Conservative</span>
                    <Slider defaultValue={[50]} max={100} step={1} className="flex-grow" />
                    <span className="text-sm text-gray-500 ml-3">Aggressive</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Style Re-evaluation Frequency</h4>
                    <span className="text-sm text-gray-500">How often should the system reassess a student's learning style</span>
                  </div>
                  <Select defaultValue="weekly">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Allow manual override</h4>
                    <span className="text-sm text-gray-500">Let students manually select their learning style preference</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Switch id="override" defaultChecked />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Key Learning Styles</h4>
                  <p className="text-sm text-gray-500 mb-3">Configure which learning style dimensions to track</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Visual vs. Verbal</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Active vs. Reflective</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Sequential vs. Global</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Sensing vs. Intuitive</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Concept Reinforcement Tab */}
        <TabsContent value="reinforcement" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Concept Reinforcement Triggers</CardTitle>
              <p className="text-sm text-gray-500">Configure how the system suggests review cycles based on performance</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Review Cycle Frequency</h4>
                  <p className="text-sm text-gray-500 mb-3">How often should the system suggest review of previously learned concepts</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>For Well-Understood Concepts</span>
                      <Select defaultValue="14">
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">Every 7 days</SelectItem>
                          <SelectItem value="10">Every 10 days</SelectItem>
                          <SelectItem value="14">Every 14 days</SelectItem>
                          <SelectItem value="21">Every 21 days</SelectItem>
                          <SelectItem value="28">Every 28 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>For Partially-Understood Concepts</span>
                      <Select defaultValue="7">
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">Every 3 days</SelectItem>
                          <SelectItem value="5">Every 5 days</SelectItem>
                          <SelectItem value="7">Every 7 days</SelectItem>
                          <SelectItem value="10">Every 10 days</SelectItem>
                          <SelectItem value="14">Every 14 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>For Difficult Concepts</span>
                      <Select defaultValue="3">
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Every 1 day</SelectItem>
                          <SelectItem value="2">Every 2 days</SelectItem>
                          <SelectItem value="3">Every 3 days</SelectItem>
                          <SelectItem value="5">Every 5 days</SelectItem>
                          <SelectItem value="7">Every 7 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Performance Thresholds</h4>
                  <p className="text-sm text-gray-500 mb-3">Set mastery thresholds that determine review frequency</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Well-Understood (%)</label>
                      <Input type="number" min="0" max="100" defaultValue="85" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Partially-Understood (%)</label>
                      <Input type="number" min="0" max="100" defaultValue="60" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Trigger Settings</h4>
                  <p className="text-sm text-gray-500 mb-3">Configure when and how reinforcement suggestions appear</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Time-Based Triggers</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Quiz Performance Triggers</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Mistake-Based Triggers</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Notification Style</h4>
                    <span className="text-sm text-gray-500">How should reinforcement suggestions be presented to students</span>
                  </div>
                  <Select defaultValue="subtle">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subtle">Subtle Hints</SelectItem>
                      <SelectItem value="direct">Direct Messages</SelectItem>
                      <SelectItem value="popup">Pop-up Notifications</SelectItem>
                      <SelectItem value="integrated">Integrated in Study Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Activity size={16} />
                    <span>Test Reinforcement Algorithm</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Goal-Based Planner Tab */}
        <TabsContent value="planner" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Goal-Based Personal Planner</CardTitle>
              <p className="text-sm text-gray-500">Configure how the AI builds full exam study plans based on goals, time, and student level</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Planning Algorithm Settings</h4>
                  <p className="text-sm text-gray-500 mb-3">Adjust how the system creates personalized study plans</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <label className="block text-sm mb-1">Minimum Study Session (minutes)</label>
                      <Input type="number" min="10" max="120" defaultValue="30" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Break Frequency (minutes)</label>
                      <Input type="number" min="15" max="60" defaultValue="50" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Default Planning Horizon (days)</label>
                      <Input type="number" min="7" max="90" defaultValue="30" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Topic Weighting Strategy</h4>
                    <span className="text-sm text-gray-500">How to weight different topics based on exam patterns and student performance</span>
                  </div>
                  <Select defaultValue="balanced">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanced (Default)</SelectItem>
                      <SelectItem value="weakness">Focus on Weaknesses</SelectItem>
                      <SelectItem value="exam-patterns">Exam Pattern Weighted</SelectItem>
                      <SelectItem value="custom">Custom Weights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Difficulty Progression</h4>
                  </div>
                  <Select defaultValue="gradual">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gradual">Gradual</SelectItem>
                      <SelectItem value="easy-first">Easy First</SelectItem>
                      <SelectItem value="challenging-first">Challenging First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Plan Structure Controls</h4>
                  <p className="text-sm text-gray-500 mb-3">Configure components included in student study plans</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Include Daily Flashcards</span>
                      <div className="flex items-center">
                        <Switch id="flashcards" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Include Practice Tests</span>
                      <div className="flex items-center">
                        <Switch id="practice-tests" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Include Revision Sessions</span>
                      <div className="flex items-center">
                        <Switch id="revision" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Include Weekends</span>
                      <div className="flex items-center">
                        <Switch id="weekends" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Sample Schedule Preview</h4>
                  <p className="text-sm text-gray-500 mb-3">A sample of the generated study plan</p>
                  
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Day</TableHead>
                          <TableHead>Focus Area</TableHead>
                          <TableHead>Duration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Day 1</TableCell>
                          <TableCell>Core Concepts Introduction</TableCell>
                          <TableCell>45 min</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Day 2</TableCell>
                          <TableCell>Practice & Application</TableCell>
                          <TableCell>60 min</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Day 3</TableCell>
                          <TableCell>Review & Reinforcement</TableCell>
                          <TableCell>30 min</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Save Settings</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Smart Study Plan Tab */}
        <TabsContent value="study-plan" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Daily Smart Study Plan</CardTitle>
              <p className="text-sm text-gray-500">Monitor and configure how the system generates daily cards and exams by subject and topic</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Content Generation Settings</h4>
                  <p className="text-sm text-gray-500 mb-3">Configure the daily content mix for student study plans</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <label className="block text-sm mb-1">Flashcards Per Topic</label>
                      <Select defaultValue="adaptive">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed-5">Fixed (5)</SelectItem>
                          <SelectItem value="fixed-10">Fixed (10)</SelectItem>
                          <SelectItem value="adaptive">Adaptive (Based on Difficulty)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Practice Exams Frequency</label>
                      <Select defaultValue="weekly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Adaptive Content Level</label>
                      <Select defaultValue="moderate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative Adaptation</SelectItem>
                          <SelectItem value="moderate">Moderate Adaptation</SelectItem>
                          <SelectItem value="aggressive">Aggressive Adaptation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Content Mix Controls</h4>
                  <p className="text-sm text-gray-500 mb-3">Toggle different content types in study plans</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p>Include Flashcards</p>
                        <p className="text-xs text-gray-500">Recommended</p>
                      </div>
                      <Switch id="include-flashcards" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p>Include Quiz Questions</p>
                        <p className="text-xs text-gray-500">Recommended</p>
                      </div>
                      <Switch id="include-quiz" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p>Include Concept Summaries</p>
                        <p className="text-xs text-gray-500">Recommended</p>
                      </div>
                      <Switch id="include-summaries" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p>Include Practice Problems</p>
                        <p className="text-xs text-gray-500">Recommended</p>
                      </div>
                      <Switch id="include-practice" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p>Include Memory Techniques</p>
                        <p className="text-xs text-gray-500">Optional</p>
                      </div>
                      <Switch id="include-memory" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Generation Schedule</h4>
                  <p className="text-sm text-gray-500 mb-3">Configure when new study plans are generated</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <label className="block text-sm mb-1">Daily Generation Time</label>
                      <Select defaultValue="morning">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="night">Night (12-6 AM)</SelectItem>
                          <SelectItem value="morning">Morning (6-9 AM)</SelectItem>
                          <SelectItem value="day">Day (9 AM-5 PM)</SelectItem>
                          <SelectItem value="evening">Evening (5-12 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Plan Validity Period</label>
                      <Select defaultValue="24">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 Hours</SelectItem>
                          <SelectItem value="24">24 Hours</SelectItem>
                          <SelectItem value="48">48 Hours</SelectItem>
                          <SelectItem value="72">72 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <div className="mb-2">Allow User-Requested Regeneration</div>
                        <Switch id="allow-regeneration" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3">
                    <div>
                      <div className="mb-2">Adapt to Completion Rate</div>
                      <Switch id="adapt-completion" defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Recent Plan Generation Logs</h4>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student ID</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Topics</TableHead>
                          <TableHead>Cards</TableHead>
                          <TableHead>Exams</TableHead>
                          <TableHead>Generated At</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>ST12345</TableCell>
                          <TableCell>Physics</TableCell>
                          <TableCell>4</TableCell>
                          <TableCell>12</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>2024-04-10 09:15 AM</TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                          <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ST23456</TableCell>
                          <TableCell>Mathematics</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>2024-04-10 08:30 AM</TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                          <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ST34567</TableCell>
                          <TableCell>Chemistry</TableCell>
                          <TableCell>5</TableCell>
                          <TableCell>20</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>2024-04-09 03:45 PM</TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                          <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ST45678</TableCell>
                          <TableCell>Biology</TableCell>
                          <TableCell>6</TableCell>
                          <TableCell>18</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>2024-04-09 02:20 PM</TableCell>
                          <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                          <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ST56789</TableCell>
                          <TableCell>English</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>10</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>2024-04-09 11:10 AM</TableCell>
                          <TableCell><Badge className="bg-blue-100 text-blue-800">Completed</Badge></TableCell>
                          <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Showing 5 of 24 plans</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Previous</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Adaptive Difficulty Tab */}
        <TabsContent value="difficulty" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Adaptive Difficulty Engine</CardTitle>
              <p className="text-sm text-gray-500">Configure how content difficulty automatically adjusts based on student mastery levels</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Difficulty Adaptation Rate</h4>
                  <p className="text-sm text-gray-500 mb-3">How quickly should content difficulty change in response to performance</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>For Increasing Difficulty</span>
                        <span className="text-sm text-gray-500">Moderate</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3">Gradual</span>
                        <Slider defaultValue={[50]} max={100} step={1} className="flex-grow" />
                        <span className="text-sm text-gray-500 ml-3">Aggressive</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>For Decreasing Difficulty</span>
                        <span className="text-sm text-gray-500">Conservative</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3">Gradual</span>
                        <Slider defaultValue={[30]} max={100} step={1} className="flex-grow" />
                        <span className="text-sm text-gray-500 ml-3">Aggressive</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Mastery Thresholds</h4>
                  <p className="text-sm text-gray-500 mb-3">Define performance levels that trigger difficulty changes</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm mb-1">Promotion Threshold (%)</label>
                      <p className="text-xs text-gray-500 mb-1">Performance above this increases difficulty</p>
                      <Input type="number" min="0" max="100" defaultValue="80" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Demotion Threshold (%)</label>
                      <p className="text-xs text-gray-500 mb-1">Performance below this decreases difficulty</p>
                      <Input type="number" min="0" max="100" defaultValue="60" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-1">Required Consecutive Attempts</label>
                    <p className="text-xs text-gray-500 mb-1">Number of consecutive successes/failures to trigger level change</p>
                    <Input type="number" min="1" max="10" defaultValue="3" />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Content Types & Difficulty Levels</h4>
                  <p className="text-sm text-gray-500 mb-3">Configure how many difficulty levels to use for each content type</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Flashcard Difficulty Levels</span>
                      <Select defaultValue="3">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 levels</SelectItem>
                          <SelectItem value="5">5 levels</SelectItem>
                          <SelectItem value="7">7 levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Quiz Question Difficulty Levels</span>
                      <Select defaultValue="5">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 levels</SelectItem>
                          <SelectItem value="5">5 levels</SelectItem>
                          <SelectItem value="7">7 levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Practice Problem Difficulty Levels</span>
                      <Select defaultValue="4">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 levels</SelectItem>
                          <SelectItem value="4">4 levels</SelectItem>
                          <SelectItem value="5">5 levels</SelectItem>
                          <SelectItem value="7">7 levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Additional Settings</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Consider Topic History</span>
                      <div className="flex items-center">
                        <Switch id="topic-history" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Adaptive Hints</span>
                      <div className="flex items-center">
                        <Switch id="adaptive-hints" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Apply Time Pressure</span>
                      <div className="flex items-center">
                        <Switch id="time-pressure" />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Skill-Based Content Routing</span>
                      <div className="flex items-center">
                        <Switch id="skill-routing" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Activity size={16} />
                    <span>Test Difficulty Algorithm</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Smart Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Smart Suggestions</CardTitle>
              <p className="text-sm text-gray-500">Configure how the system makes personalized recommendations based on learning styles and preferences</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Suggestion Sources</h4>
                  <p className="text-sm text-gray-500 mb-3">Select which data points influence content recommendations</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Learning Style</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Priority:</span>
                        <Select defaultValue="high">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Performance History</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Priority:</span>
                        <Select defaultValue="high">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Engagement Patterns</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Priority:</span>
                        <Select defaultValue="medium">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Similar User Behavior</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Priority:</span>
                        <Select defaultValue="medium">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Explicit Feedback</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Priority:</span>
                        <Select defaultValue="high">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Suggestion Freshness</h4>
                  <p className="text-sm text-gray-500 mb-3">Balance between familiar and new content in recommendations</p>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Content Novelty</span>
                      <span className="text-sm text-gray-500">Balanced</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-3">Familiar</span>
                      <Slider defaultValue={[50]} max={100} step={1} className="flex-grow" />
                      <span className="text-sm text-gray-500 ml-3">Novel</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Suggestion Types</h4>
                  <p className="text-sm text-gray-500 mb-3">Configure what types of content can be recommended</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Learning Materials</span>
                      <div className="flex items-center">
                        <Switch id="learning-materials" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Practice Activities</span>
                      <div className="flex items-center">
                        <Switch id="practice-activities" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Learning Strategies</span>
                      <div className="flex items-center">
                        <Switch id="learning-strategies" defaultChecked />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>External Resources</span>
                      <div className="flex items-center">
                        <Switch id="external-resources" />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Peer Connections</span>
                      <div className="flex items-center">
                        <Switch id="peer-connections" />
                        <Button variant="ghost" size="sm" className="ml-2">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Override Controls</h4>
                  <p className="text-sm text-gray-500 mb-3">Manually boost or suppress specific recommendation types</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Visual Learning Materials</span>
                      <div className="flex items-center gap-2">
                        <Slider defaultValue={[75]} max={100} step={1} className="w-32" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Group Study Activities</span>
                      <div className="flex items-center gap-2">
                        <Slider defaultValue={[40]} max={100} step={1} className="w-32" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <span>Video Explanations</span>
                      <div className="flex items-center gap-2">
                        <Slider defaultValue={[60]} max={100} step={1} className="w-32" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button className="flex items-center gap-2">
                      <Settings size={16} />
                      <span>Manage Content Override Rules</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl">Additional AI Personalization Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Smile size={20} className="text-yellow-600" />
                <h3 className="font-medium">Feel-Good Corner</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Humor, puzzles and content based on emotional state</p>
              <p className="text-xs text-gray-500 mb-4">Control how the AI provides mood-boosting content based on emotional analysis</p>
              <Button variant="outline" size="sm" className="w-full">Manage Feel-Good Settings</Button>
            </div>
            
            <div className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Users size={20} className="text-indigo-600" />
                <h3 className="font-medium">Surrounding Influence Meter</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Track confidence, peer influence, and environmental factors</p>
              <p className="text-xs text-gray-500 mb-4">Configure how the system measures external influences on learning</p>
              <Button variant="outline" size="sm" className="w-full">Configure Influence Settings</Button>
            </div>
            
            <div className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={20} className="text-green-600" />
                <h3 className="font-medium">Peer Community Feed Tuner</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Control the social and peer content recommendations</p>
              <p className="text-xs text-gray-500 mb-4">Adjust how the system filters and promotes peer content</p>
              <Button variant="outline" size="sm" className="w-full">Peer Feed Settings</Button>
            </div>
            
            <div className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Activity size={20} className="text-blue-600" />
                <h3 className="font-medium">Learning Pulse Generator</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">30-second mood and readiness summaries</p>
              <p className="text-xs text-gray-500 mb-4">Configure how the system generates daily learning readiness reports</p>
              <Button variant="outline" size="sm" className="w-full">Pulse Settings</Button>
            </div>
            
            <div className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Brain size={20} className="text-purple-600" />
                <h3 className="font-medium">Doubt Auto-Responder</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">AI answers to student doubts from knowledge base</p>
              <p className="text-xs text-gray-500 mb-4">Configure how AI responds to student questions and when to escalate</p>
              <Button variant="outline" size="sm" className="w-full">Auto-Responder Settings</Button>
            </div>
            
            <div className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={20} className="text-pink-600" />
                <h3 className="font-medium">24x7 Tutor Chat</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Conversational AI tutor capabilities</p>
              <p className="text-xs text-gray-500 mb-4">Configure the AI tutor's personality, knowledge, and response style</p>
              <Button variant="outline" size="sm" className="w-full">Tutor Chat Settings</Button>
            </div>
            
            <div className="border p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={20} className="text-amber-600" />
                <h3 className="font-medium">Mood-Based Suggestions</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Content recommendations based on emotional state</p>
              <p className="text-xs text-gray-500 mb-4">Configure how the system adapts content based on detected mood</p>
              <Button variant="outline" size="sm" className="w-full">Mood Engine Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalizationTab;
