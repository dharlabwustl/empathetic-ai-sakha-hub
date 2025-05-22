
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Star, BookOpen, Brain, Activity, 
  Link as LinkIcon, RefreshCcw, FileText, Volume2, 
  Zap, BookMarked, MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useUserNotes from '@/hooks/useUserNotes';

const ConceptDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("learn");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userNotes, setUserNotes] = useState("");
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const { toast } = useToast();
  const { saveNote, getNoteForConcept } = useUserNotes();
  
  // Mock data - in a real app, this would come from an API
  const conceptData = {
    id: conceptId || '1',
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    topic: "Mechanics",
    content: `
      <h2 id="introduction">Introduction to Newton's Second Law</h2>
      <p>Newton's Second Law of Motion describes the relationship between an object's mass, its acceleration, and the force applied to it. It is one of the fundamental laws of classical mechanics.</p>
      
      <h2 id="formula">The Formula</h2>
      <p>The mathematical representation of Newton's Second Law is:</p>
      <p><strong>F = ma</strong></p>
      <p>Where:</p>
      <ul>
        <li>F is the net force acting on the object (measured in Newtons, N)</li>
        <li>m is the mass of the object (measured in kilograms, kg)</li>
        <li>a is the acceleration of the object (measured in meters per second squared, m/s²)</li>
      </ul>
      
      <h2 id="implications">Implications of the Law</h2>
      <p>This law implies that:</p>
      <ol>
        <li>The acceleration of an object is directly proportional to the net force acting on it</li>
        <li>The acceleration of an object is inversely proportional to its mass</li>
        <li>The direction of acceleration is in the direction of the net force</li>
      </ol>
    `,
    difficulty: "medium" as 'easy' | 'medium' | 'hard',
    masteryLevel: 65,
    lastPracticed: "2023-06-15T10:30:00Z",
    quizScore: 78
  };
  
  const relatedConcepts = [
    {
      id: "c1",
      title: "Newton's First Law of Motion",
      masteryLevel: 85
    },
    {
      id: "c2",
      title: "Newton's Third Law of Motion",
      masteryLevel: 72
    },
    {
      id: "c3",
      title: "Conservation of Momentum",
      masteryLevel: 45
    }
  ];
  
  const formulas = [
    {
      id: "f1",
      name: "Newton's Second Law",
      latex: "F = ma",
      description: "Force equals mass times acceleration"
    },
    {
      id: "f2",
      name: "Weight Formula",
      latex: "W = mg",
      description: "Weight equals mass times gravitational acceleration"
    }
  ];
  
  const analyticsData = {
    masteryTrend: [
      { date: "Jan", value: 25 },
      { date: "Feb", value: 30 },
      { date: "Mar", value: 45 },
      { date: "Apr", value: 55 },
      { date: "May", value: 65 }
    ],
    timeSpent: 143, // minutes
    practiceCount: 12,
    revisionsCompleted: 8,
    questionsAttempted: 24,
    questionsCorrect: 18
  };
  
  // Load user notes when component mounts
  useEffect(() => {
    if (conceptId) {
      const loadedNotes = getNoteForConcept(conceptId);
      setUserNotes(loadedNotes);
    }
  }, [conceptId, getNoteForConcept]);

  const handleSaveNotes = () => {
    if (conceptId) {
      saveNote(conceptId, userNotes);
      toast({
        title: "Notes saved",
        description: "Your notes have been saved successfully"
      });
    }
  };
  
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Concept removed from your saved items" : "Concept added to your saved items"
    });
  };
  
  const toggleReadAloud = () => {
    setIsReadingAloud(!isReadingAloud);
    
    if (!isReadingAloud) {
      // Start reading the content aloud
      const textToRead = conceptData.content.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } else {
      // Stop reading
      window.speechSynthesis.cancel();
    }
  };
  
  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {/* Back Button & Title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/dashboard/student/concepts">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Concepts</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-4 hidden md:block">{conceptData.title}</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleToggleBookmark}
          className="ml-auto"
        >
          <Star 
            className={`h-5 w-5 ${isBookmarked 
              ? 'text-yellow-500 fill-yellow-500' 
              : 'text-gray-400'}`} 
          />
        </Button>
      </div>
      
      {/* Mobile Title */}
      <h1 className="text-2xl font-bold mb-4 md:hidden">{conceptData.title}</h1>
      
      {/* Concept Header Card */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400">
            {conceptData.subject}
          </Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-400">
            {conceptData.topic}
          </Badge>
          <Badge variant="outline" className={
            conceptData.difficulty === "easy" 
              ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400"
              : conceptData.difficulty === "medium" 
              ? "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-400"
              : "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400"
          }>
            {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)} Difficulty
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Mastery Level</div>
            <div className="flex items-center">
              <Progress 
                value={conceptData.masteryLevel} 
                className="h-2 w-24 md:w-40 mr-2"
                indicatorClassName={
                  conceptData.masteryLevel > 80 ? 'bg-green-500' : 
                  conceptData.masteryLevel > 50 ? 'bg-blue-500' : 
                  'bg-yellow-500'
                }
              />
              <span className="text-sm font-medium">{conceptData.masteryLevel}%</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              onClick={toggleReadAloud}
              variant={isReadingAloud ? "default" : "outline"}
              size="sm" 
              className="flex items-center gap-1"
            >
              <Volume2 className="h-4 w-4" />
              {isReadingAloud ? "Stop Reading" : "Read Aloud"}
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Main Content with Tabs */}
      <Tabs defaultValue="learn" className="w-full">
        <TabsList className="flex w-full overflow-x-auto hide-scrollbar p-1 bg-muted mb-4">
          <TabsTrigger value="learn" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> Learn
          </TabsTrigger>
          <TabsTrigger value="recall" className="flex items-center gap-1">
            <Brain className="h-4 w-4" /> Recall
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <Activity className="h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="connected" className="flex items-center gap-1">
            <LinkIcon className="h-4 w-4" /> Connected
          </TabsTrigger>
          <TabsTrigger value="revision" className="flex items-center gap-1">
            <RefreshCcw className="h-4 w-4" /> Revision
          </TabsTrigger>
          <TabsTrigger value="exam" className="flex items-center gap-1">
            <FileText className="h-4 w-4" /> Exam
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <BookMarked className="h-4 w-4" /> Notes
          </TabsTrigger>
          <TabsTrigger value="discuss" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> Discuss
          </TabsTrigger>
        </TabsList>
        
        {/* Learn Tab Content */}
        <TabsContent value="learn" className="space-y-4">
          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: conceptData.content }} />
              
              <h2>Key Formulas</h2>
              {formulas.map((formula) => (
                <div key={formula.id} className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md mb-3">
                  <div className="font-semibold mb-1">{formula.name}</div>
                  <div className="text-lg font-mono bg-white dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-800">
                    {formula.latex}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{formula.description}</div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        {/* Recall Tab Content */}
        <TabsContent value="recall" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-600" /> 
              Quick Recall Practice
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30">
                <h3 className="font-medium mb-2">What does Newton's Second Law state?</h3>
                <Button className="w-full mb-2">Show Answer</Button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Hint: It's about force, mass, and acceleration.
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30">
                <h3 className="font-medium mb-2">Write the formula for Newton's Second Law</h3>
                <Button className="w-full mb-2">Show Answer</Button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Hint: It involves force, mass, and acceleration variables.
                </div>
              </div>
              
              <Button className="w-full">Generate More Recall Questions</Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab Content */}
        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-600" /> 
              Learning Analytics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Mastery Progress</h3>
                  <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-end justify-between p-4">
                    {analyticsData.masteryTrend.map((point, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-blue-500 w-8 rounded-t-sm" 
                          style={{ height: `${point.value}%` }}
                        ></div>
                        <div className="text-xs mt-1">{point.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Time Spent Learning</h3>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {analyticsData.timeSpent} <span className="text-lg font-normal text-gray-600 dark:text-gray-400">minutes</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Practice Sessions</div>
                  <div className="text-2xl font-bold">{analyticsData.practiceCount}</div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Revisions</div>
                  <div className="text-2xl font-bold">{analyticsData.revisionsCompleted}</div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Questions Attempted</div>
                  <div className="text-2xl font-bold">{analyticsData.questionsAttempted}</div>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Questions Correct</div>
                  <div className="text-2xl font-bold">{analyticsData.questionsCorrect}</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Connected Tab Content */}
        <TabsContent value="connected" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <LinkIcon className="h-5 w-5 mr-2 text-indigo-600" /> 
              Connected Concepts
            </h2>
            
            <div className="space-y-4">
              {relatedConcepts.map(concept => (
                <div key={concept.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{concept.title}</h3>
                    <Badge className={
                      concept.masteryLevel > 80 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : 
                      concept.masteryLevel > 50 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : 
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }>
                      {concept.masteryLevel}% Mastery
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={concept.masteryLevel} 
                    className="h-1 mt-2"
                    indicatorClassName={
                      concept.masteryLevel > 80 ? 'bg-green-500' : 
                      concept.masteryLevel > 50 ? 'bg-blue-500' : 
                      'bg-yellow-500'
                    }
                  />
                  
                  <div className="flex justify-end mt-3">
                    <Link to={`/dashboard/student/concepts/${concept.id}`}>
                      <Button variant="outline" size="sm">Go to Concept</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        {/* Revision Tab Content */}
        <TabsContent value="revision" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <RefreshCcw className="h-5 w-5 mr-2 text-green-600" /> 
              Revision Plan
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/30">
                <h3 className="font-medium mb-2">Spaced Repetition Schedule</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                    <span>First review</span>
                    <Badge variant="outline" className="bg-gray-100">Completed</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                    <span>Second review (3 days)</span>
                    <Badge variant="outline" className="bg-gray-100">Tomorrow</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                    <span>Third review (7 days)</span>
                    <Badge variant="outline" className="bg-gray-100">In 6 days</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Quick Revision Notes</h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>F = ma is the mathematical form of Newton's Second Law</li>
                    <li>The acceleration of an object is directly proportional to the net force acting on it</li>
                    <li>The acceleration of an object is inversely proportional to its mass</li>
                    <li>The direction of acceleration is in the direction of the net force</li>
                  </ul>
                </div>
              </div>
              
              <Button className="w-full">
                <Zap className="h-4 w-4 mr-2" /> Start Quick Revision Session
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Exam Tab Content */}
        <TabsContent value="exam" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-red-600" /> 
              Exam Practice
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Previous Year Questions</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="font-medium mb-1">NEET 2022</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A particle of mass 'm' is projected with a velocity v = kv<sub>e</sub> (where v<sub>e</sub> is the escape velocity and k is a constant). The maximum height above the surface of earth attained by the particle is...
                    </p>
                    <Button variant="outline" size="sm">View Solution</Button>
                  </div>
                  
                  <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="font-medium mb-1">NEET 2021</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A block of mass m is placed on a smooth inclined wedge of inclination θ. The wedge is given an acceleration 'a' such that the block remains stationary relative to the wedge. The force of reaction on the block will be...
                    </p>
                    <Button variant="outline" size="sm">View Solution</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Practice Tests</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline">
                    Basic Level Test (5 Questions)
                  </Button>
                  <Button variant="outline">
                    Advanced Level Test (10 Questions)
                  </Button>
                </div>
              </div>
              
              <Button className="w-full">
                Generate New Practice Questions
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Notes Tab Content */}
        <TabsContent value="notes" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BookMarked className="h-5 w-5 mr-2 text-amber-600" /> 
              Your Notes
            </h2>
            
            <div className="space-y-4">
              <div className="mb-4">
                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Type your notes here..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveNotes}>
                  Save Notes
                </Button>
              </div>
              
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30">
                <h3 className="font-medium mb-2">Note Taking Tips</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>Focus on key concepts and formulas</li>
                  <li>Use your own words to improve understanding</li>
                  <li>Create connections with other concepts</li>
                  <li>Note common problem patterns and solutions</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Discuss Tab Content */}
        <TabsContent value="discuss" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-violet-600" /> 
              Discuss With AI Tutor
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-100 dark:border-violet-800/30">
                <h3 className="font-medium mb-2">Ask Questions About This Concept</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Not sure about something? Ask our AI tutor any questions about Newton's Second Law.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your question here..."
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-800"
                  />
                  <Button>Ask</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Suggested Questions:</div>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    How does Newton's Second Law relate to momentum?
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    Can you explain Newton's Second Law with everyday examples?
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    What are common misconceptions about Newton's Second Law?
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ConceptDetailPage;
