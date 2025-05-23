
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  FileText, 
  FlaskConical, 
  MessageSquare, 
  Atom,
  Calculator,
  Clock,
  Target,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import Enhanced3DTab from '@/components/dashboard/student/concepts/Enhanced3DTab';
import CommonMistakesTab from '@/components/dashboard/student/concepts/CommonMistakesTab';
import QuickRecallSection from '@/components/dashboard/student/concepts/concept-detail/QuickRecallSection';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';

// Enhanced Learn Tab Content Component
const EnhancedLearnTabContent = ({ conceptName }: { conceptName: string }) => {
  const [activeSubTab, setActiveSubTab] = useState('basic');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <div className="space-y-6">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="detailed">Detailed with Examples</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Basic Understanding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>What is {conceptName}?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {conceptName} is one of the fundamental concepts in Physics that describes the relationship between force, mass, and acceleration.
                </p>
                
                <h4>Key Points:</h4>
                <ul className="space-y-2">
                  <li>Force equals mass times acceleration (F = ma)</li>
                  <li>The direction of force determines the direction of acceleration</li>
                  <li>Greater force produces greater acceleration</li>
                  <li>Greater mass produces less acceleration for the same force</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Detailed Explanation with Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Mathematical Representation</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <p className="text-lg font-mono text-center">F = ma</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                    Where F = Force (N), m = mass (kg), a = acceleration (m/s²)
                  </p>
                </div>

                <h4>Real-world Examples:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h5 className="font-semibold">Car Acceleration</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      When you press the gas pedal, the engine applies force to move the car. A heavier car needs more force to accelerate at the same rate.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h5 className="font-semibold">Pushing Objects</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      It's easier to push an empty shopping cart than a full one because less force is needed for the same acceleration.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Advanced Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Vector Nature of Newton's Second Law</h3>
                <p>Newton's Second Law is fundamentally a vector equation, meaning both force and acceleration have magnitude and direction.</p>
                
                <h4>Advanced Applications:</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-semibold">Inclined Planes</h5>
                    <p className="text-sm">Analysis of forces along and perpendicular to inclined surfaces.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-semibold">Circular Motion</h5>
                    <p className="text-sm">Application to centripetal force and circular dynamics.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h5 className="font-semibold">System of Particles</h5>
                    <p className="text-sm">Extension to multiple interacting objects.</p>
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

// Ask AI Tab Component
const AskAITab = ({ conceptName }: { conceptName: string }) => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    `What are the real-world applications of ${conceptName}?`,
    `How does ${conceptName} relate to other physics concepts?`,
    `What are common misconceptions about ${conceptName}?`,
    `Can you explain ${conceptName} with a simple analogy?`,
  ];

  const handleAskQuestion = async (questionText: string) => {
    setIsLoading(true);
    setConversation(prev => [...prev, { type: 'user', message: questionText }]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `Great question about ${conceptName}! Based on the fundamental principles, here's what you need to know: ${conceptName} demonstrates how forces directly influence the motion of objects. This concept is crucial for understanding everything from simple everyday motions to complex engineering applications.`;
      
      setConversation(prev => [...prev, { type: 'ai', message: aiResponse }]);
      setIsLoading(false);
    }, 1500);
    
    setQuestion('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Ask AI About {conceptName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Ask any question about {conceptName}:</label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={`Ask anything about ${conceptName}...`}
                  className="flex-1 px-3 py-2 border rounded-md"
                  onKeyPress={(e) => e.key === 'Enter' && question.trim() && handleAskQuestion(question)}
                />
                <Button 
                  onClick={() => handleAskQuestion(question)}
                  disabled={!question.trim() || isLoading}
                >
                  Ask
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Suggested questions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAskQuestion(q)}
                    className="text-left justify-start h-auto py-2 px-3"
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>

            {conversation.length > 0 && (
              <div className="border rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                {conversation.map((item, idx) => (
                  <div key={idx} className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      item.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <p className="text-sm">{item.message}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm">AI is thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { conceptCards } = useUserStudyPlan();
  const [activeTab, setActiveTab] = useState('learn');
  const [isStudyGroupsVisible, setIsStudyGroupsVisible] = useState(false);

  // Find the concept data
  const concept = conceptCards.find(c => c.id === conceptId) || {
    id: conceptId || 'default',
    title: "Newton's Second Law of Motion",
    description: "Understanding the relationship between force, mass, and acceleration",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "medium",
    progress: 65,
    estimatedTime: 45,
    completed: false,
    relatedConcepts: ["Newton's First Law", "Newton's Third Law", "Force and Motion"]
  };

  // Check if concept is physics, chemistry, or biology for 3D features
  const has3DFeatures = ['Physics', 'Chemistry', 'Biology'].includes(concept.subject);

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz completed with score: ${score}%`);
  };

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} • ${concept.chapter}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>{concept.title} - PREPZR</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* KPI Cards - Moved above learning tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="text-2xl font-bold">{concept.progress}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Time Est.</p>
                  <p className="text-2xl font-bold">{concept.estimatedTime}m</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <p className="text-2xl font-bold capitalize">{concept.difficulty}</p>
                </div>
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Learning Progress</span>
              <span className="text-sm text-gray-500">{concept.progress}% Complete</span>
            </div>
            <Progress value={concept.progress} className="w-full" />
          </CardContent>
        </Card>

        {/* Learning Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b">
                <TabsList className="w-full justify-start h-auto p-1 bg-transparent">
                  <TabsTrigger value="learn" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Learn
                  </TabsTrigger>
                  <TabsTrigger value="recall" className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Quick Recall
                  </TabsTrigger>
                  {has3DFeatures && (
                    <TabsTrigger value="3d" className="flex items-center gap-2">
                      <Atom className="h-4 w-4" />
                      3D & Visual
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="formula" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Formula
                  </TabsTrigger>
                  <TabsTrigger value="mistakes" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Common Mistakes
                  </TabsTrigger>
                  <TabsTrigger value="ask-ai" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Ask AI
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="learn" className="mt-0">
                  <EnhancedLearnTabContent conceptName={concept.title} />
                </TabsContent>

                <TabsContent value="recall" className="mt-0">
                  <QuickRecallSection
                    conceptId={concept.id}
                    title={concept.title}
                    content={concept.description}
                    onQuizComplete={handleQuizComplete}
                  />
                </TabsContent>

                {has3DFeatures && (
                  <TabsContent value="3d" className="mt-0">
                    <Enhanced3DTab conceptName={concept.title} />
                  </TabsContent>
                )}

                <TabsContent value="formula" className="mt-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calculator className="h-5 w-5" />
                          Formula Reference
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg text-center">
                          <p className="text-2xl font-mono font-bold">F = ma</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Force = mass × acceleration
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 border rounded-lg">
                            <p className="font-bold">F</p>
                            <p className="text-sm">Force (Newtons)</p>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <p className="font-bold">m</p>
                            <p className="text-sm">Mass (kg)</p>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <p className="font-bold">a</p>
                            <p className="text-sm">Acceleration (m/s²)</p>
                          </div>
                        </div>

                        <div className="flex justify-center pt-4">
                          <Button 
                            className="flex items-center gap-2"
                            onClick={() => navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`)}
                          >
                            <FlaskConical className="h-4 w-4" />
                            Formula Lab - Advanced Practice
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="mistakes" className="mt-0">
                  <CommonMistakesTab conceptName={concept.title} />
                </TabsContent>

                <TabsContent value="ask-ai" className="mt-0">
                  <AskAITab conceptName={concept.title} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="flex items-center gap-2"
            onClick={() => navigate('/dashboard/student/flashcards')}
          >
            <Brain className="h-4 w-4" />
            Practice Flashcards
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/dashboard/student/practice-exam')}
          >
            <FileText className="h-4 w-4" />
            Take Quiz
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsStudyGroupsVisible(!isStudyGroupsVisible)}
            disabled
          >
            <Users className="h-4 w-4" />
            Study Groups (Pro)
          </Button>
        </div>

        {/* Related Concepts */}
        {concept.relatedConcepts && concept.relatedConcepts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Related Concepts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {concept.relatedConcepts.map((related, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate(`/dashboard/student/concepts/${related.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    {related}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
