
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  BarChart3,
  Settings,
  Repeat,
  Calendar,
  CheckCircle,
  Clock,
  LineChart,
  RefreshCcw,
  Lightbulb,
  MessageSquare,
  UserCog,
  BookOpen,
  Sparkles,
  Heart,
  Users,
  MessagesSquare,
  Gauge,
  HelpCircle,
  BotMessageSquare,
  Smile
} from "lucide-react";

const AIPersonalizationTab = () => {
  // State for sliders and toggles
  const [learningStyleClassification, setLearningStyleClassification] = useState(50);
  const [difficultyIncreaseRate, setDifficultyIncreaseRate] = useState(50);
  const [difficultyDecreaseRate, setDifficultyDecreaseRate] = useState(30);
  const [promotionThreshold, setPromotionThreshold] = useState(85);
  const [demotionThreshold, setDemotionThreshold] = useState(60);
  const [contentNovelty, setContentNovelty] = useState(50);
  const [manualOverride, setManualOverride] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Personalization Engine Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Active Learning Styles</h3>
              <Badge className="bg-violet-100 text-violet-800">4</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">4</span>
              <span className="text-sm text-gray-500">styles</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Visual, Auditory, Reading, Kinesthetic</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Daily Study Plans</h3>
              <Badge className="bg-blue-100 text-blue-800">+5% this week</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">1,458</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Generated in last 30 days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Avg. Personalization Score</h3>
              <Badge className="bg-green-100 text-green-800">+2% this month</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">84%</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Based on user ratings</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">AI Response Time</h3>
              <Badge className="bg-amber-100 text-amber-800">-15ms from last week</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">845ms</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Average response time</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <BarChart3 size={12} />
                <span>Details</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="learning-styles" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger value="learning-styles" className="text-sm">Learning Styles</TabsTrigger>
          <TabsTrigger value="reinforcement" className="text-sm">Concept Reinforcement</TabsTrigger>
          <TabsTrigger value="planner" className="text-sm">Study Planner</TabsTrigger>
          <TabsTrigger value="daily-plan" className="text-sm">Daily Study Plan</TabsTrigger>
          <TabsTrigger value="difficulty" className="text-sm">Adaptive Difficulty</TabsTrigger>
          <TabsTrigger value="suggestions" className="text-sm">Smart Suggestions</TabsTrigger>
        </TabsList>

        {/* Learning Styles Tab */}
        <TabsContent value="learning-styles">
          <Card>
            <CardHeader>
              <CardTitle>Learning Style Detection</CardTitle>
              <CardDescription>Control how the AI identifies and adapts to student learning styles through onboarding Q&A</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Learning Style Classification</label>
                    <span className="text-sm text-gray-500">
                      {learningStyleClassification < 33 ? "Conservative" : 
                       learningStyleClassification < 66 ? "Balanced" : "Aggressive"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Conservative</span>
                    <Slider
                      value={[learningStyleClassification]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setLearningStyleClassification(value[0])}
                      className="flex-1"
                    />
                    <span className="text-sm">Aggressive</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Adjust how aggressively the system classifies learning styles based on onboarding responses</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Style Re-evaluation Frequency</label>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">How often should the system reassess a student's learning style</p>
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="override" checked={manualOverride} onCheckedChange={setManualOverride} />
                  <div>
                    <label htmlFor="override" className="text-sm font-medium">Allow manual override</label>
                    <p className="text-xs text-gray-500">Let students manually select their learning style preference</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-3">Key Learning Styles</h4>
                  <p className="text-xs text-gray-500 mb-3">Configure which learning style dimensions to track</p>
                  
                  <div className="space-y-2">
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Visual vs. Verbal</p>
                        <p className="text-xs text-gray-500">Preference for visual or textual information</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Active vs. Reflective</p>
                        <p className="text-xs text-gray-500">Preference for active experimentation or reflective observation</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Sequential vs. Global</p>
                        <p className="text-xs text-gray-500">Preference for sequential steps or global understanding</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Sensing vs. Intuitive</p>
                        <p className="text-xs text-gray-500">Preference for concrete information or abstract concepts</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Concept Reinforcement Tab */}
        <TabsContent value="reinforcement">
          <Card>
            <CardHeader>
              <CardTitle>Concept Reinforcement Triggers</CardTitle>
              <CardDescription>Configure how the system suggests review cycles based on performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Review Cycle Frequency</h4>
                  <p className="text-xs text-gray-500 mb-3">How often should the system suggest review of previously learned concepts</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm mb-1 block">For Well-Understood Concepts</label>
                      <Select defaultValue="14days">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7days">Every 7 days</SelectItem>
                          <SelectItem value="14days">Every 14 days</SelectItem>
                          <SelectItem value="21days">Every 21 days</SelectItem>
                          <SelectItem value="30days">Every 30 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm mb-1 block">For Partially-Understood Concepts</label>
                      <Select defaultValue="7days">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3days">Every 3 days</SelectItem>
                          <SelectItem value="5days">Every 5 days</SelectItem>
                          <SelectItem value="7days">Every 7 days</SelectItem>
                          <SelectItem value="10days">Every 10 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm mb-1 block">For Difficult Concepts</label>
                      <Select defaultValue="3days">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1day">Every day</SelectItem>
                          <SelectItem value="2days">Every 2 days</SelectItem>
                          <SelectItem value="3days">Every 3 days</SelectItem>
                          <SelectItem value="5days">Every 5 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Performance Thresholds</h4>
                  <p className="text-xs text-gray-500 mb-3">Set mastery thresholds that determine review frequency</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm">Well-Understood (%)</label>
                        <span className="text-sm">{promotionThreshold}%</span>
                      </div>
                      <Slider
                        value={[promotionThreshold]}
                        min={70}
                        max={100}
                        step={1}
                        onValueChange={(value) => setPromotionThreshold(value[0])}
                      />
                      <p className="text-xs text-gray-500">Score needed to consider a concept well-understood</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm">Partially-Understood (%)</label>
                        <span className="text-sm">{demotionThreshold}%</span>
                      </div>
                      <Slider
                        value={[demotionThreshold]}
                        min={40}
                        max={80}
                        step={1}
                        onValueChange={(value) => setDemotionThreshold(value[0])}
                      />
                      <p className="text-xs text-gray-500">Score needed to consider a concept partially-understood</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Trigger Settings</h4>
                  <p className="text-xs text-gray-500 mb-3">Configure when and how reinforcement suggestions appear</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Time-Based Triggers</p>
                        <p className="text-xs text-gray-500">Daily spaced repetition reminders</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Quiz Performance Triggers</p>
                        <p className="text-xs text-gray-500">Based on assessment results</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Mistake-Based Triggers</p>
                        <p className="text-xs text-gray-500">Direct response to quiz errors</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Notification Style</h4>
                  <p className="text-xs text-gray-500 mb-2">How should reinforcement suggestions be presented to students</p>
                  
                  <Select defaultValue="subtle">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subtle">Subtle Hints</SelectItem>
                      <SelectItem value="direct">Direct Suggestions</SelectItem>
                      <SelectItem value="notification">Full Notifications</SelectItem>
                      <SelectItem value="system">System Messages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end pt-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <RefreshCcw size={16} />
                    <span>Test Reinforcement Algorithm</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Planner Tab */}
        <TabsContent value="planner">
          <Card>
            <CardHeader>
              <CardTitle>Goal-Based Personal Planner</CardTitle>
              <CardDescription>Configure how the AI builds full exam study plans based on goals, time, and student level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Planning Algorithm Settings</h4>
                  <p className="text-xs text-gray-500 mb-3">Adjust how the system creates personalized study plans</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Minimum Study Session (minutes)</label>
                      <Input type="number" placeholder="30" defaultValue="30" />
                      <p className="text-xs text-gray-500">Shortest recommended study session</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Break Frequency (minutes)</label>
                      <Input type="number" placeholder="45" defaultValue="45" />
                      <p className="text-xs text-gray-500">Time between breaks</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Default Planning Horizon (days)</label>
                      <Input type="number" placeholder="28" defaultValue="28" />
                      <p className="text-xs text-gray-500">Days to plan ahead</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Topic Weighting Strategy</h4>
                  <p className="text-xs text-gray-500 mb-3">How to weight different topics based on exam patterns and student performance</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="balanced" name="weighting" defaultChecked />
                        <div>
                          <label htmlFor="balanced" className="text-sm font-medium">Balanced (Default)</label>
                          <p className="text-xs text-gray-500">Equal focus on all required topics</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="weaknessFirst" name="weighting" />
                        <div>
                          <label htmlFor="weaknessFirst" className="text-sm font-medium">Focus on Weaknesses</label>
                          <p className="text-xs text-gray-500">Prioritize topics with lower scores</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-1">Difficulty Progression</h4>
                    <Select defaultValue="gradual">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gradual">Gradual</SelectItem>
                        <SelectItem value="easy-first">Easy First</SelectItem>
                        <SelectItem value="challenging-first">Challenging First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Plan Structure Controls</h4>
                  <p className="text-xs text-gray-500 mb-3">Configure components included in student study plans</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch id="flashcards" defaultChecked />
                        <div>
                          <label htmlFor="flashcards" className="text-sm font-medium">Include Daily Flashcards</label>
                          <p className="text-xs text-gray-500">Quick knowledge checks</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch id="practice-tests" defaultChecked />
                        <div>
                          <label htmlFor="practice-tests" className="text-sm font-medium">Include Practice Tests</label>
                          <p className="text-xs text-gray-500">Timed exam simulations</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch id="revision-sessions" defaultChecked />
                        <div>
                          <label htmlFor="revision-sessions" className="text-sm font-medium">Include Revision Sessions</label>
                          <p className="text-xs text-gray-500">Review of past material</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch id="include-weekends" />
                        <div>
                          <label htmlFor="include-weekends" className="text-sm font-medium">Include Weekends</label>
                          <p className="text-xs text-gray-500">Schedule weekend study sessions</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Sample Schedule Preview</h4>
                  <p className="text-xs text-gray-500 mb-3">A sample of the generated study plan</p>
                  
                  <div className="border rounded-md">
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

                <div className="flex justify-end pt-3">
                  <Button className="flex items-center">
                    <span>Save Settings</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily Smart Study Plan Tab */}
        <TabsContent value="daily-plan">
          <Card>
            <CardHeader>
              <CardTitle>Daily Smart Study Plan</CardTitle>
              <CardDescription>Monitor and configure how the system generates daily cards and exams by subject and topic</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Content Generation Settings</h4>
                  <p className="text-xs text-gray-500 mb-3">Configure the daily content mix for student study plans</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Flashcards Per Topic</label>
                      <Select defaultValue="adaptive">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed-5">5 (Fixed)</SelectItem>
                          <SelectItem value="fixed-10">10 (Fixed)</SelectItem>
                          <SelectItem value="adaptive">Adaptive (Based on Difficulty)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Practice Exams Frequency</label>
                      <Select defaultValue="weekly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Adaptive Content Level</label>
                      <Select defaultValue="moderate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal Adaptation</SelectItem>
                          <SelectItem value="moderate">Moderate Adaptation</SelectItem>
                          <SelectItem value="aggressive">Aggressive Adaptation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Content Mix Controls</h4>
                  <p className="text-xs text-gray-500 mb-3">Toggle different content types in study plans</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch id="include-flashcards" defaultChecked />
                          <label htmlFor="include-flashcards" className="text-sm font-medium">Include Flashcards</label>
                        </div>
                        <Badge>Recommended</Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch id="include-quizzes" defaultChecked />
                          <label htmlFor="include-quizzes" className="text-sm font-medium">Include Quiz Questions</label>
                        </div>
                        <Badge>Recommended</Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch id="include-concepts" defaultChecked />
                          <label htmlFor="include-concepts" className="text-sm font-medium">Include Concept Summaries</label>
                        </div>
                        <Badge>Recommended</Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch id="include-problems" defaultChecked />
                          <label htmlFor="include-problems" className="text-sm font-medium">Include Practice Problems</label>
                        </div>
                        <Badge>Recommended</Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch id="include-memory" />
                          <label htmlFor="include-memory" className="text-sm font-medium">Include Memory Techniques</label>
                        </div>
                        <Badge>Optional</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Generation Schedule</h4>
                  <p className="text-xs text-gray-500 mb-3">Configure when new study plans are generated</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm mb-1 block">Daily Generation Time</label>
                      <Select defaultValue="morning">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="early-morning">Early Morning (4-6 AM)</SelectItem>
                          <SelectItem value="morning">Morning (6-9 AM)</SelectItem>
                          <SelectItem value="evening">Evening (6-9 PM)</SelectItem>
                          <SelectItem value="night">Night (9-12 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm mb-1 block">Plan Validity Period</label>
                      <Select defaultValue="24h">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12 Hours</SelectItem>
                          <SelectItem value="24h">24 Hours</SelectItem>
                          <SelectItem value="48h">48 Hours</SelectItem>
                          <SelectItem value="72h">72 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="user-regeneration" defaultChecked />
                      <div>
                        <label htmlFor="user-regeneration" className="text-sm font-medium">Allow User-Requested Regeneration</label>
                        <p className="text-xs text-gray-500">Adapt to Completion Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Recent Plan Generation Logs</h4>
                    <div className="flex gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <span>Export</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md">
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
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ST23456</TableCell>
                          <TableCell>Mathematics</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>2024-04-10 08:30 AM</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ST34567</TableCell>
                          <TableCell>Chemistry</TableCell>
                          <TableCell>5</TableCell>
                          <TableCell>20</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>2024-04-09 03:45 PM</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ST45678</TableCell>
                          <TableCell>Biology</TableCell>
                          <TableCell>6</TableCell>
                          <TableCell>18</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>2024-04-09 02:20 PM</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ST56789</TableCell>
                          <TableCell>English</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>10</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>2024-04-09 11:10 AM</TableCell>
                          <TableCell>
                            <Badge>Completed</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 text-sm">
                    <span className="text-gray-500">Showing 5 of 24 plans</span>
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
        <TabsContent value="difficulty">
          <Card>
            <CardHeader>
              <CardTitle>Adaptive Difficulty Engine</CardTitle>
              <CardDescription>Configure how content difficulty automatically adjusts based on student mastery levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Difficulty Adaptation Rate</h4>
                  <p className="text-xs text-gray-500 mb-3">How quickly should content difficulty change in response to performance</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">For Increasing Difficulty</label>
                        <span className="text-sm text-gray-500">
                          {difficultyIncreaseRate < 33 ? "Conservative" : 
                          difficultyIncreaseRate < 66 ? "Moderate" : "Aggressive"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">Gradual</span>
                        <Slider
                          value={[difficultyIncreaseRate]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => setDifficultyIncreaseRate(value[0])}
                          className="flex-1"
                        />
                        <span className="text-sm">Aggressive</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm">For Decreasing Difficulty</label>
                        <span className="text-sm text-gray-500">
                          {difficultyDecreaseRate < 33 ? "Conservative" : 
                          difficultyDecreaseRate < 66 ? "Moderate" : "Aggressive"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">Gradual</span>
                        <Slider
                          value={[difficultyDecreaseRate]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => setDifficultyDecreaseRate(value[0])}
                          className="flex-1"
                        />
                        <span className="text-sm">Aggressive</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Mastery Thresholds</h4>
                  <p className="text-xs text-gray-500 mb-3">Define performance levels that trigger difficulty changes</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm">Promotion Threshold (%)</label>
                      <Input type="number" min="60" max="100" defaultValue="85" />
                      <p className="text-xs text-gray-500">Performance above this increases difficulty</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Demotion Threshold (%)</label>
                      <Input type="number" min="0" max="70" defaultValue="60" />
                      <p className="text-xs text-gray-500">Performance below this decreases difficulty</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Required Consecutive Attempts</label>
                      <Input type="number" min="1" max="5" defaultValue="2" />
                      <p className="text-xs text-gray-500">Number of consecutive successes/failures to trigger level change</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Content Types & Difficulty Levels</h4>
                  <p className="text-xs text-gray-500 mb-3">Configure how many difficulty levels to use for each content type</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3">
                      <p className="font-medium">Flashcard Difficulty Levels</p>
                      <div className="flex mt-1 gap-2 items-center">
                        <Select defaultValue="3">
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm">levels</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <p className="font-medium">Quiz Question Difficulty Levels</p>
                      <div className="flex mt-1 gap-2 items-center">
                        <Select defaultValue="5">
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm">levels</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <p className="font-medium">Practice Problem Difficulty Levels</p>
                      <div className="flex mt-1 gap-2 items-center">
                        <Select defaultValue="4">
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm">levels</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Additional Settings</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch id="topic-history" defaultChecked />
                        <div>
                          <label htmlFor="topic-history" className="text-sm font-medium">Consider Topic History</label>
                          <p className="text-xs text-gray-500">Factor past performance into difficulty</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch id="adaptive-hints" defaultChecked />
                        <div>
                          <label htmlFor="adaptive-hints" className="text-sm font-medium">Adaptive Hints</label>
                          <p className="text-xs text-gray-500">Adjust hint detail based on performance</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch id="time-pressure" />
                        <div>
                          <label htmlFor="time-pressure" className="text-sm font-medium">Apply Time Pressure</label>
                          <p className="text-xs text-gray-500">Add time elements for advanced students</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Switch id="skill-routing" defaultChecked />
                        <div>
                          <label htmlFor="skill-routing" className="text-sm font-medium">Skill-Based Content Routing</label>
                          <p className="text-xs text-gray-500">Route to content based on specific skills</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <LineChart size={16} />
                    <span>Test Difficulty Algorithm</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smart Suggestions Tab */}
        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Smart Suggestions</CardTitle>
              <CardDescription>Configure how the system makes personalized recommendations based on learning styles and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Suggestion Sources</h4>
                  <p className="text-xs text-gray-500 mb-3">Select which data points influence content recommendations</p>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-3">
                        <p className="font-medium mb-2">Learning Style</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">How much weight to give learning style</p>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-32">
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
                      
                      <div className="border rounded-md p-3">
                        <p className="font-medium mb-2">Performance History</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">How much weight to give past results</p>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-32">
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
                      
                      <div className="border rounded-md p-3">
                        <p className="font-medium mb-2">Engagement Patterns</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">How much weight to give usage patterns</p>
                          <Select defaultValue="medium">
                            <SelectTrigger className="w-32">
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
                      
                      <div className="border rounded-md p-3">
                        <p className="font-medium mb-2">Similar User Behavior</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">How much weight to give peer data</p>
                          <Select defaultValue="medium">
                            <SelectTrigger className="w-32">
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
                      
                      <div className="border rounded-md p-3">
                        <p className="font-medium mb-2">Explicit Feedback</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">How much weight to give user ratings</p>
                          <Select defaultValue="high">
                            <SelectTrigger className="w-32">
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
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Suggestion Freshness</h4>
                  <p className="text-xs text-gray-500 mb-3">Balance between familiar and new content in recommendations</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm">Content Novelty</label>
                      <span className="text-sm text-gray-500">Balanced</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Familiar</span>
                      <Slider
                        value={[contentNovelty]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setContentNovelty(value[0])}
                        className="flex-1"
                      />
                      <span className="text-sm">Novel</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Suggestion Types</h4>
                  <p className="text-xs text-gray-500 mb-3">Configure what types of content can be recommended</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Learning Materials</p>
                        <p className="text-xs text-gray-500">Notes, flashcards, etc.</p>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Practice Activities</p>
                        <p className="text-xs text-gray-500">Quizzes, problems, etc.</p>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Learning Strategies</p>
                        <p className="text-xs text-gray-500">Study methods and approaches</p>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">External Resources</p>
                        <p className="text-xs text-gray-500">Videos, articles, websites</p>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                    
                    <div className="border rounded-md p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Peer Connections</p>
                        <p className="text-xs text-gray-500">Study buddies and groups</p>
                      </div>
                      <Button variant="ghost" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-3">Override Controls</h4>
                  <p className="text-xs text-gray-500 mb-3">Manually boost or suppress specific recommendation types</p>
                  
                  <div className="space-y-3">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Visual Learning Materials</p>
                        <Badge className="bg-green-100 text-green-800">Boosted</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">Showing more often in recommendations</p>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Group Study Activities</p>
                        <Badge className="bg-red-100 text-red-800">Suppressed</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">Showing less often in recommendations</p>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Video Explanations</p>
                        <Badge className="bg-green-100 text-green-800">Boosted</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">Showing more often in recommendations</p>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline">Manage Content Override Rules</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional AI Personalization Features */}
      <Card>
        <CardHeader>
          <CardTitle>Additional AI Personalization Features</CardTitle>
          <CardDescription>Configure specialized AI systems that enhance the learning experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feel-Good Corner */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Smile className="h-5 w-5 text-pink-500" />
                  <CardTitle className="text-base">Feel-Good Corner</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Humor, puzzles and content based on emotional state
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm">
                <p className="mb-3">
                  Control how the AI provides mood-boosting content based on emotional analysis
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Manage Feel-Good Settings
                </Button>
              </CardContent>
            </Card>

            {/* Surrounding Influence Meter */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-indigo-500" />
                  <CardTitle className="text-base">Surrounding Influence Meter</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Track confidence, peer influence, and environmental factors
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm">
                <p className="mb-3">
                  Configure how the system measures external influences on learning
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Configure Influence Settings
                </Button>
              </CardContent>
            </Card>

            {/* Peer Community Feed Tuner */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base">Peer Community Feed Tuner</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Control the social and peer content recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm">
                <p className="mb-3">
                  Adjust how the system filters and promotes peer content
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Peer Feed Settings
                </Button>
              </CardContent>
            </Card>

            {/* Learning Pulse Generator */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-base">Learning Pulse Generator</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  30-second mood and readiness summaries
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm">
                <p className="mb-3">
                  Configure how the system generates daily learning readiness reports
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Pulse Settings
                </Button>
              </CardContent>
            </Card>

            {/* Doubt Auto-Responder */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-base">Doubt Auto-Responder</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  AI answers to student doubts from knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm">
                <p className="mb-3">
                  Configure how AI responds to student questions and when to escalate
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Auto-Responder Settings
                </Button>
              </CardContent>
            </Card>

            {/* 24x7 Tutor Chat */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <BotMessageSquare className="h-5 w-5 text-violet-500" />
                  <CardTitle className="text-base">24x7 Tutor Chat</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Conversational AI tutor capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm">
                <p className="mb-3">
                  Configure the AI tutor's personality, knowledge, and response style
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Tutor Chat Settings
                </Button>
              </CardContent>
            </Card>

            {/* Mood-Based Suggestions */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-base">Mood-Based Suggestions</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Content recommendations based on emotional state
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm">
                <p className="mb-3">
                  Configure how the system adapts content based on detected mood
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Mood Engine Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPersonalizationTab;
