
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Tabs, TabsList, TabsTrigger, TabsContent 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, Brain, FlaskConical, CheckCircle, BarChart, 
  Bookmark, ArrowLeft, GraduationCap
} from "lucide-react";

// Sample concept data (would normally come from an API/database)
const demoConceptData = {
  id: "concept-1",
  title: "Newton's Second Law of Motion",
  subject: "Physics",
  topic: "Classical Mechanics",
  difficulty: "medium" as const,
  content: `
    <h2>Newton's Second Law of Motion</h2>
    <p>Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
    <p>It can be mathematically expressed as:</p>
    <p class="text-center font-bold text-xl my-4">F = ma</p>
    <p>Where:</p>
    <ul class="list-disc pl-6 my-4">
      <li><strong>F</strong> is the net force applied (measured in newtons, N)</li>
      <li><strong>m</strong> is the mass of the object (measured in kilograms, kg)</li>
      <li><strong>a</strong> is the acceleration (measured in meters per second squared, m/s²)</li>
    </ul>
    <p>This fundamental law forms the backbone of classical mechanics and helps us analyze and predict the motion of objects under the influence of forces.</p>
  `,
  masteryLevel: 65,
  recallAccuracy: 70,
  quizScore: 75,
  lastPracticed: "2025-05-10",
  flashcardsTotal: 10,
  flashcardsCompleted: 7,
  examReady: true,
  formulas: [
    { id: "f1", formula: "F = ma", description: "Force equals mass times acceleration" },
    { id: "f2", formula: "a = F/m", description: "Acceleration equals force divided by mass" }
  ],
  relatedConcepts: [
    { id: "c1", title: "Newton's First Law", masteryLevel: 80 },
    { id: "c2", title: "Newton's Third Law", masteryLevel: 45 },
    { id: "c3", title: "Work and Energy", masteryLevel: 60 }
  ]
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState('content');
  
  // In a real app, you would fetch data based on conceptId
  const concept = demoConceptData;
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back button and concept header */}
      <div className="mb-6">
        <Link to="/dashboard/student/concepts">
          <Button variant="ghost" className="mb-4 p-0">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to concepts
          </Button>
        </Link>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  concept.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' :
                  concept.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400'
                }`}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{concept.subject} • {concept.topic}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mt-2">{concept.title}</h1>
            </div>
            
            <Button variant="outline" className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              Bookmark
            </Button>
          </div>
        </div>
      </div>
      
      {/* Content and sidebar layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="content" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Content
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-1">
                <Brain className="h-4 w-4" /> Practice
              </TabsTrigger>
              <TabsTrigger value="flashcards" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" /> Flashcards
              </TabsTrigger>
              <TabsTrigger value="exams" className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" /> Exams
              </TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content" className="border rounded-lg p-6">
              <div dangerouslySetInnerHTML={{ __html: concept.content }} />
              
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FlaskConical className="h-5 w-5 mr-2 text-blue-600" />
                  Key Formulas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {concept.formulas.map(formula => (
                    <Card key={formula.id}>
                      <CardContent className="p-4">
                        <div className="text-center py-2 font-bold text-lg">{formula.formula}</div>
                        <div className="text-sm text-center text-gray-600 dark:text-gray-400">{formula.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Practice Tab */}
            <TabsContent value="practice" className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Practice & Quick Recall
              </h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Recall Accuracy</div>
                  <div className="text-sm font-medium">{concept.recallAccuracy}%</div>
                </div>
                <Progress value={concept.recallAccuracy} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Last Practice Session</h3>
                      <span className="text-sm text-gray-500">
                        {concept.lastPracticed ? new Date(concept.lastPracticed).toLocaleDateString() : 'Never'}
                      </span>
                    </div>
                    <Button className="w-full mt-4">
                      Practice Recall
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Quiz Performance</h3>
                      <span className="text-sm">
                        Score: <span className="font-medium">{concept.quizScore}%</span>
                      </span>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Take Quiz
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Practice Tips</h3>
                <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Review the formula F = ma and practice applying it to different scenarios</li>
                  <li>Try calculating acceleration when different forces are applied</li>
                  <li>Practice identifying all forces acting on an object before applying the formula</li>
                </ul>
              </div>
            </TabsContent>
            
            {/* Flashcards Tab */}
            <TabsContent value="flashcards" className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-green-600" />
                Flashcards
              </h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Progress</div>
                  <div className="text-sm">{concept.flashcardsCompleted} of {concept.flashcardsTotal} cards</div>
                </div>
                <Progress value={(concept.flashcardsCompleted / concept.flashcardsTotal) * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-green-700 dark:text-green-400">{concept.flashcardsTotal}</div>
                    <div className="text-sm text-green-600 dark:text-green-500">Total Cards</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">{concept.flashcardsCompleted}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-500">Mastered</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50 dark:bg-amber-900/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-amber-700 dark:text-amber-400">
                      {concept.flashcardsTotal - concept.flashcardsCompleted}
                    </div>
                    <div className="text-sm text-amber-600 dark:text-amber-500">To Review</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex gap-4">
                <Button className="flex-1">
                  Practice All
                </Button>
                <Button variant="outline" className="flex-1">
                  Add New Card
                </Button>
              </div>
            </TabsContent>
            
            {/* Exams Tab */}
            <TabsContent value="exams" className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
                Exam Readiness
              </h2>
              
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-32 h-32 relative">
                      <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">
                            85%
                          </div>
                          <div className="text-xs text-gray-500">Readiness</div>
                        </div>
                      </div>
                      <svg className="w-32 h-32 absolute top-0 left-0 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50" cy="50" r="45" 
                          className="stroke-gray-200 dark:stroke-gray-700 fill-none"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50" cy="50" r="45" 
                          className="stroke-green-500 fill-none"
                          strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - 85 / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 flex items-center">
                        <span className="text-green-600">Exam Ready</span>
                        <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
                      </h3>
                      
                      <p className="text-muted-foreground mb-4">
                        You've mastered this concept and are ready to apply it in exams. 
                        Consider taking practice tests to reinforce your knowledge.
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Take Practice Test
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Exam Relevance</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">High Importance</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          This concept appears frequently in exams and is often worth significant marks.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Common Question Types</h4>
                        <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                          <li>Numerical problems requiring calculation of force or acceleration</li>
                          <li>Conceptual understanding of the relationship between force and acceleration</li>
                          <li>Application to real-world scenarios</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right sidebar for mastery info */}
        <div className="space-y-6">
          {/* Concept Mastery Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Concept Mastery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Your mastery</span>
                  <span className="font-medium text-blue-600">{concept.masteryLevel}%</span>
                </div>
                
                <Progress value={concept.masteryLevel} className="h-2" />
                
                <div className="pt-2 text-sm text-muted-foreground">
                  {concept.masteryLevel < 30 && "You're just getting started. Continue learning to improve mastery."}
                  {concept.masteryLevel >= 30 && concept.masteryLevel < 50 && "You're making progress. Keep practicing to strengthen your understanding."}
                  {concept.masteryLevel >= 50 && concept.masteryLevel < 80 && "Good understanding! Complete the practice quizzes to validate your knowledge."}
                  {concept.masteryLevel >= 80 && "Excellent mastery! You can now focus on related concepts."}
                </div>
                
                <Button className="w-full">
                  Improve Mastery
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Concepts Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Concepts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {concept.relatedConcepts.map((related) => (
                  <div key={related.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{related.title}</span>
                      <span className="text-sm text-gray-500">{related.masteryLevel}%</span>
                    </div>
                    <Progress value={related.masteryLevel} className="h-1.5" />
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2">
                  View All Related Concepts
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Learning Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Learning Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Time spent</span>
                  <span className="font-medium">45 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last studied</span>
                  <span className="font-medium">Yesterday</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Review count</span>
                  <span className="font-medium">5 sessions</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Scheduled next</span>
                  <span className="font-medium">Tomorrow</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptDetailPage;
