
import React, { useState } from 'react';
import SharedPageLayout from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, Calendar, Brain, CheckCircle, Sparkles, 
  Info, AlertCircle, Edit, Download, BarChart, Clock
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StudyPlanTopic {
  id: string;
  name: string;
  difficulty: string;
  completed: boolean;
  status: string;
  priority: number; // Adding required property
}

const AcademicAdvisor = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Your AI-powered academic guidance system"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab as any} className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="advice">Study Advice</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Study Plan Status</CardTitle>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>
                </div>
                <CardDescription>Your current progress and upcoming activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div className="bg-blue-50 rounded-md p-4">
                    <h4 className="font-medium text-blue-800 flex items-center mb-2">
                      <Info className="h-4 w-4 mr-2" />
                      Priority Focus Areas
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                        <span>Chemical Bonding (Chemistry)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                        <span>Plant Physiology (Biology)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                        <span>Electrostatics (Physics)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Recent Achievements</h4>
                    <div className="bg-green-50 rounded-md p-2 text-sm flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Completed Atomic Structure unit</span>
                    </div>
                    <div className="bg-green-50 rounded-md p-2 text-sm flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>90% accuracy in Biology practice test</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Weekly Focus</CardTitle>
                <CardDescription>AI-recommended topics based on your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-violet-50 rounded-md p-4">
                  <h4 className="font-medium text-violet-800 flex items-center mb-2">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Recommended Topics
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">Thermodynamics</span>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
                      </div>
                      <Progress value={30} className="h-1" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>30% completed</span>
                        <span>Focus: 2 hours</span>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">Cell Division</span>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Easy</Badge>
                      </div>
                      <Progress value={65} className="h-1" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>65% completed</span>
                        <span>Focus: 1 hour</span>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">Electromagnetic Induction</span>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Hard</Badge>
                      </div>
                      <Progress value={15} className="h-1" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>15% completed</span>
                        <span>Focus: 3 hours</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Upcoming Deadlines
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Chemistry Mock Test</span>
                      <span className="text-orange-600">In 2 days</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Biology Unit Completion</span>
                      <span className="text-blue-600">In 5 days</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Study Recommendations</CardTitle>
              <CardDescription>Personalized suggestions based on your learning patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <Brain className="h-4 w-4 mr-2 text-purple-500" />
                    Learning Style Optimization
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Based on your interaction patterns, you learn best through visual content followed by practice problems.
                    We recommend focusing on video lessons and interactive exercises.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Watch concept videos first</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Follow with practice questions</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Review with flashcards</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>End with summary notes</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <h4 className="font-medium flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    Optimal Study Schedule
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Your performance data shows you're most productive in the morning and early evening.
                    We've optimized your study plan around these times.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-md text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="font-medium text-blue-700">Morning</p>
                        <p className="text-blue-600">Physics concepts</p>
                      </div>
                      <div>
                        <p className="font-medium text-blue-700">Afternoon</p>
                        <p className="text-blue-600">Chemistry practice</p>
                      </div>
                      <div>
                        <p className="font-medium text-blue-700">Evening</p>
                        <p className="text-blue-600">Biology revision</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Study Advice Tab */}
        <TabsContent value="advice" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                    <h4 className="font-medium text-amber-800 mb-2">Key NEET Focus Areas</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Spend 40% of your time on high-weightage topics like Organic Chemistry in NEET</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Human Physiology and Genetics have consistent question patterns - ensure thorough understanding</span>
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Physics calculation questions require extra practice - schedule additional time</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Recent Challenging Topics</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Electrochemistry</span>
                          <span>42% accuracy</span>
                        </div>
                        <Progress value={42} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Wave Optics</span>
                          <span>51% accuracy</span>
                        </div>
                        <Progress value={51} className="h-1" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Biomolecules</span>
                          <span>48% accuracy</span>
                        </div>
                        <Progress value={48} className="h-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Study Technique Advisor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-3">Recommended Strategies</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded text-blue-700 mr-3 flex-shrink-0">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Active Recall</p>
                          <p className="text-gray-600">After studying a topic, close your materials and explain the concept aloud</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-1 rounded text-purple-700 mr-3 flex-shrink-0">
                          <Brain className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Spaced Repetition</p>
                          <p className="text-gray-600">Review each topic at increasing intervals: 1 day, 3 days, 1 week, 2 weeks</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-100 p-1 rounded text-green-700 mr-3 flex-shrink-0">
                          <Edit className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Practice Testing</p>
                          <p className="text-gray-600">Regularly test yourself with practice questions from previous years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Custom Study Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>NEET-Specific Exam Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-green-700 mb-2">Biology Strategy</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <div className="text-green-600 mr-2">•</div>
                        <span>Focus on NCERT content first - 90% of questions come directly from here</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-green-600 mr-2">•</div>
                        <span>Prioritize Human Physiology, Genetics and Ecology - high weightage areas</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-green-600 mr-2">•</div>
                        <span>Create diagrams and flowcharts for complex processes like Krebs cycle</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-blue-700 mb-2">Chemistry Strategy</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <div className="text-blue-600 mr-2">•</div>
                        <span>Balance time between Physical, Organic and Inorganic sections</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-blue-600 mr-2">•</div>
                        <span>Memorize important reactions and mechanisms in Organic Chemistry</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-blue-600 mr-2">•</div>
                        <span>Practice numerical problems daily, especially in Physical Chemistry</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-purple-700 mb-2">Physics Strategy</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <div className="text-purple-600 mr-2">•</div>
                        <span>Focus on concept clarity rather than just formula memorization</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-purple-600 mr-2">•</div>
                        <span>Practice calculation-heavy topics like Mechanics and Electrodynamics daily</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-purple-600 mr-2">•</div>
                        <span>Create a formula sheet and revise multiple times a week</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <h4 className="font-medium text-amber-800 mb-2">Time Management During Exam</h4>
                  <div className="text-sm">
                    <p className="mb-3">NEET exam has 180 questions to be solved in 180 minutes (3 hours):</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="text-amber-600 mr-2">•</div>
                        <span>First 60 minutes: Start with your strongest section to build confidence</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-amber-600 mr-2">•</div>
                        <span>Middle 60 minutes: Medium difficulty section at a measured pace</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-amber-600 mr-2">•</div>
                        <span>Final 60 minutes: Weakest section, followed by review of marked questions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-amber-600 mr-2">•</div>
                        <span>Skip challenging questions initially and mark them for review</span>
                      </li>
                      <li className="flex items-start">
                        <div className="text-amber-600 mr-2">•</div>
                        <span>Remember: Each correct answer gives +4 marks, while each incorrect answer deducts -1 mark</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Physics</span>
                      <span>56%</span>
                    </div>
                    <Progress value={56} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Electrodynamics needs attention</span>
                      <Badge variant="outline">11 topics completed</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Chemistry</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Strong in Organic Chemistry</span>
                      <Badge variant="outline">16 topics completed</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Biology</span>
                      <span>81%</span>
                    </div>
                    <Progress value={81} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Your strongest subject</span>
                      <Badge variant="outline">19 topics completed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>NEET Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-32 h-32">
                        <circle
                          className="text-gray-200"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                        <circle
                          className="text-blue-600"
                          strokeWidth="8"
                          strokeDasharray={350.8}
                          strokeDashoffset={350.8 * (1 - 0.68)}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                      </svg>
                      <span className="absolute text-3xl">68%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Overall readiness for NEET</p>
                  </div>
                  
                  <div className="border-t pt-4 mt-2">
                    <h4 className="font-medium mb-2">Readiness Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Content Coverage</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">76%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Test Practice</span>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">62%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Previous Year Questions</span>
                        <Badge variant="outline" className="bg-red-50 text-red-700">45%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Revision Cycles</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">70%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Practice Test Performance</h4>
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 mr-1" />
                      <span className="text-sm">Last 5 tests</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Biology Mock Test 4</span>
                        <span>87%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "87%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Chemistry Mock Test 3</span>
                        <span>72%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "72%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Physics Mock Test 5</span>
                        <span>64%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: "64%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Full NEET Mock 2</span>
                        <span>68%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Biology Section Test</span>
                        <span>81%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "81%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-3">Topic-wise Performance Comparison</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-32 font-medium text-sm">Cell Biology</div>
                      <div className="flex-1">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm">92%</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 font-medium text-sm">Thermodynamics</div>
                      <div className="flex-1">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full rounded-full" style={{ width: "67%" }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm">67%</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 font-medium text-sm">Organic Chemistry</div>
                      <div className="flex-1">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm">78%</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 font-medium text-sm">Mechanics</div>
                      <div className="flex-1">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full" style={{ width: "54%" }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm">54%</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 font-medium text-sm">Human Physiology</div>
                      <div className="flex-1">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: "89%" }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm">89%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default AcademicAdvisor;
