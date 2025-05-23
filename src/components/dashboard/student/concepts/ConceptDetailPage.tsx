
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import AIInsights from './AIInsights';
import AnalyticsSection from './AnalyticsSection';
import ConceptExamSection from './ConceptExamSection';
import CommonMistakesContent from './CommonMistakesContent';
import { BookOpen, BookText, Calculator, FileText, MessageSquare, Video, Zap, BrainCircuit } from 'lucide-react';

const conceptData = {
  id: "phys-123",
  title: "Newton's Third Law",
  description: "For every action, there is an equal and opposite reaction.",
  subject: "Physics",
  topic: "Classical Mechanics",
  difficulty: "medium" as const,
  completed: false,
  progress: 65,
  masteryLevel: 72,
  examReady: true,
  bookmarked: true,
  content: `Newton's Third Law states that for every action, there is an equal and opposite reaction. This fundamental principle explains the nature of forces between interacting objects.

When one object exerts a force on another object, the second object exerts an equal force in the opposite direction on the first object. These forces always occur in pairs.

For example, when you push against a wall, the wall pushes back with equal force. If it didn't, you would move through the wall! These force pairs are equal in magnitude but opposite in direction.`,
  keyPoints: [
    "Forces always occur in pairs",
    "Action and reaction forces are equal in magnitude",
    "Action and reaction forces act on different objects",
    "Forces are in opposite directions"
  ],
  relatedConcepts: [
    {
      id: "phys-121",
      title: "Newton's First Law",
      masteryLevel: 85
    },
    {
      id: "phys-122",
      title: "Newton's Second Law",
      masteryLevel: 78
    },
    {
      id: "phys-130",
      title: "Conservation of Momentum",
      masteryLevel: 45
    }
  ]
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("content");
  
  // In a real application, you'd fetch this data based on conceptId
  const concept = conceptData;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <ConceptHeader
          title={concept.title}
          subject={concept.subject}
          topic={concept.topic}
          difficulty={concept.difficulty}
          isBookmarked={concept.bookmarked}
          onBookmarkToggle={() => console.log("Toggle bookmark")}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start p-0 bg-transparent border-b rounded-none">
                  <TabsTrigger 
                    value="content" 
                    className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Content</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="practice" 
                    className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Practice</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="videos" 
                    className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    <Video className="h-4 w-4" />
                    <span>Videos</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="discuss" 
                    className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Discuss</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tools" 
                    className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    <Calculator className="h-4 w-4" />
                    <span>Tools</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="p-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-medium">Content</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Zap className="h-4 w-4" />
                          <span>Read Aloud</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p>{concept.content}</p>
                      
                      <h4>Key Points</h4>
                      <ul>
                        {concept.keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Tabs defaultValue="common-mistakes" className="mt-8">
                      <TabsList className="w-full justify-start bg-muted/50">
                        <TabsTrigger value="common-mistakes">Common Mistakes</TabsTrigger>
                        <TabsTrigger value="exam-tips">Exam Tips</TabsTrigger>
                        <TabsTrigger value="real-world">Real World Applications</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="common-mistakes" className="mt-4">
                        <CommonMistakesContent conceptName={concept.title} />
                      </TabsContent>
                      
                      <TabsContent value="exam-tips" className="mt-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-2 text-blue-800 dark:text-blue-300">Exam Success Tips</h3>
                          <p className="text-blue-700 dark:text-blue-400 mb-3">
                            Pay special attention to identifying action-reaction pairs in complex systems.
                          </p>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
                            <li>Always identify both forces in the pair</li>
                            <li>Remember that forces act on different objects</li>
                            <li>Draw free-body diagrams for clarity</li>
                            <li>Don't confuse with Newton's Second Law</li>
                          </ul>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="real-world" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2">Rocket Propulsion</h4>
                            <p className="text-sm text-muted-foreground">
                              Rockets expel gas backwards (action), which propels the rocket forward (reaction).
                            </p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2">Walking</h4>
                            <p className="text-sm text-muted-foreground">
                              Your feet push against the ground (action), and the ground pushes back (reaction), moving you forward.
                            </p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2">Swimming</h4>
                            <p className="text-sm text-muted-foreground">
                              Swimmers push water backward (action), and the water pushes the swimmer forward (reaction).
                            </p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2">Recoil of a Gun</h4>
                            <p className="text-sm text-muted-foreground">
                              The gun exerts a forward force on the bullet (action), and the bullet exerts an equal backward force on the gun (reaction).
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <AIInsights conceptName={concept.title} />
                  
                  <ConceptExamSection conceptName={concept.title} />
                </TabsContent>
                
                <TabsContent value="practice" className="p-6">
                  <h3 className="text-xl font-medium mb-4">Practice Questions</h3>
                  
                  <div className="space-y-6">
                    <Card className="border-indigo-200 dark:border-indigo-800">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Question 1</h4>
                        <p className="mb-4">
                          A book is resting on a table. The book exerts a downward force of 20N on the table due to its weight. According to Newton's Third Law, the table exerts:
                        </p>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left"
                          >
                            A) No force on the book
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left"
                          >
                            B) An upward force of less than 20N on the book
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left" 
                          >
                            C) An upward force of exactly 20N on the book
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left"
                          >
                            D) A downward force of 20N on the ground
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-indigo-200 dark:border-indigo-800">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Question 2</h4>
                        <p className="mb-4">
                          When a person jumps off a small boat, the boat moves in the opposite direction. This is an example of:
                        </p>
                        <div className="space-y-2">
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left"
                          >
                            A) Conservation of energy
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left"
                          >
                            B) Newton's First Law
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left" 
                          >
                            C) Newton's Third Law
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left"
                          >
                            D) Newton's Law of Gravity
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="videos" className="p-6">
                  <h3 className="text-xl font-medium mb-4">Instructional Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-slate-900 rounded-md flex items-center justify-center mb-3">
                          <Video className="h-12 w-12 text-slate-500" />
                        </div>
                        <h4 className="font-medium">Introduction to Newton's Third Law</h4>
                        <p className="text-sm text-muted-foreground">10:24 • Prof. Sarah Johnson</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-slate-900 rounded-md flex items-center justify-center mb-3">
                          <Video className="h-12 w-12 text-slate-500" />
                        </div>
                        <h4 className="font-medium">Problem Solving: Action-Reaction Pairs</h4>
                        <p className="text-sm text-muted-foreground">15:30 • Dr. Michael Chen</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="discuss" className="p-6">
                  <h3 className="text-xl font-medium mb-4">Discussion Forum</h3>
                  <div className="bg-muted/30 p-8 rounded-lg text-center">
                    <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <h4 className="font-medium">Join the conversation</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Discuss this concept with other students and instructors
                    </p>
                    <Button>Start a Discussion</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="tools" className="p-6">
                  <h3 className="text-xl font-medium mb-4">Interactive Tools</h3>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-medium mb-4">Force Calculator</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">Mass (kg)</label>
                        <input
                          type="number"
                          className="w-full border rounded-md px-3 py-2"
                          defaultValue="1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-2">Acceleration (m/s²)</label>
                        <input
                          type="number"
                          className="w-full border rounded-md px-3 py-2"
                          defaultValue="9.8"
                        />
                      </div>
                    </div>
                    <Button className="w-full">Calculate Force (N)</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <AnalyticsSection conceptName={concept.title} />
        </div>
        
        <div className="space-y-6">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
            <CardContent className="p-4">
              <div className="mb-4">
                <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">LEARNING PROGRESS</h3>
                <div className="flex justify-between my-1">
                  <span className="text-sm font-medium">{concept.progress}% Complete</span>
                  <span className="text-sm">{Math.round(concept.masteryLevel)}% Mastery</span>
                </div>
                <Progress value={concept.progress} className="h-2" />
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">MASTERY LEVEL</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {Math.round(concept.masteryLevel)}%
                  </div>
                  <div>
                    <div className="font-medium">Proficient</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Keep practicing to reach mastery</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">STUDY ACTIVITY</h3>
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="font-medium">4</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Study sessions</div>
                  </div>
                  <div>
                    <div className="font-medium">35 min</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total time</div>
                  </div>
                  <div>
                    <div className="font-medium">2 days ago</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Last studied</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <ConceptSidebar 
            masteryLevel={concept.masteryLevel} 
            relatedConcepts={concept.relatedConcepts}
            examReady={concept.examReady} 
          />
          
          <Card className="border-indigo-100 dark:border-indigo-900/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                  <BrainCircuit className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                </div>
                <h3 className="font-medium">Need help with this concept?</h3>
              </div>
              <Button size="sm" className="w-full">Chat with AI Tutor</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
