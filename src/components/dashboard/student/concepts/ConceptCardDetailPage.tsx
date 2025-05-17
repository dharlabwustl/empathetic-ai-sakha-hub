
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';
import {
  BookOpen,
  ArrowRight,
  Star,
  Clock,
  BrainCircuit,
  Tag,
  CheckCircle,
  FileText,
  Brain,
  Link,
  Volume2,
  Layers,
  BarChart3
} from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoodType } from '@/types/user/base';

interface ConceptCardDetailPageProps {}

const ConceptCardDetailPage: React.FC<ConceptCardDetailPageProps> = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { speakMessage, isSpeaking } = useVoiceAnnouncer();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Mock concept data - in a real app, you would fetch this from your API
  const conceptData = {
    id: conceptId || 'default',
    title: 'Newton\'s Third Law of Motion',
    description: 'Newton\'s third law of motion states that for every action, there is an equal and opposite reaction. This means that if object A exerts a force on object B, then object B exerts an equal but opposite force on object A. These forces act simultaneously and are equal in magnitude but opposite in direction. This principle is fundamental to understanding interaction forces between objects and is the basis for many phenomena we observe in daily life, from walking to rocket propulsion. The mathematical expression is often written as F_AB = -F_BA, where F_AB is the force exerted by object A on object B, and F_BA is the force exerted by object B on object A.',
    subject: 'Physics',
    chapter: 'Laws of Motion',
    topic: 'Newton\'s Laws',
    difficulty: 'medium',
    completed: true,
    progress: 85,
    mastery: 72,
    timeEstimate: '25 min',
    tags: ['forces', 'mechanics', 'fundamental'],
    isBookmarked: true,
    relatedConcepts: [
      { id: 'concept1', title: 'Newton\'s First Law' },
      { id: 'concept2', title: 'Newton\'s Second Law' },
      { id: 'concept3', title: 'Conservation of Momentum' },
    ],
    content: `
      <h2>What is Newton's Third Law?</h2>
      <p>Newton's third law states that for every action force, there exists an equal and opposite reaction force.</p>
      
      <h3>Mathematical Representation</h3>
      <p>F_AB = -F_BA</p>
      
      <h3>Key Points</h3>
      <ul>
        <li>Forces always occur in pairs</li>
        <li>The forces are equal in magnitude</li>
        <li>The forces act in opposite directions</li>
        <li>The forces act on different objects</li>
      </ul>
      
      <h3>Examples</h3>
      <p>When you push against a wall, the wall pushes back with the same force. This is why you don't pass through the wall, and this is also why the wall doesn't move (assuming it's fixed firmly to the ground).</p>
      <p>Rocket propulsion: The rocket expels gas backward (action), and the gas pushes the rocket forward (reaction).</p>
    `,
    examples: [
      'Walking: You push the ground backward, the ground pushes you forward.',
      'Swimming: You push water backward, water pushes you forward.',
      'Rocket propulsion: Gases are expelled backward, rocket moves forward.',
    ],
    commonMistakes: [
      'Thinking that the "reaction" force acts on the same object as the "action" force.',
      'Assuming the forces "cancel each other out" (they act on different bodies).',
      'Confusing Newton's Third Law with Newton's First Law (inertia).',
    ],
    examRelevance: 'High - Frequently appears in multiple-choice and problem-solving questions. Often combined with Free Body Diagrams.',
    recallAccuracy: 72,
    quizScore: 3.5,
    lastPracticed: '2023-04-12',
    timeSuggestion: 30,
    flashcardsTotal: 12,
    flashcardsCompleted: 8,
    examReady: false,
    formulas: [
      { id: 'f1', name: 'F_AB = -F_BA', description: 'Force of A on B equals negative of force of B on A' },
      { id: 'f2', name: 'p = mv', description: 'Momentum equals mass times velocity' },
    ],
    notes: [
      {
        id: 'note1',
        title: 'Action-Reaction Pairs',
        content: 'Remember that action-reaction pairs always act on different objects! This is crucial for solving problems.'
      },
      {
        id: 'note2',
        title: 'Free Body Diagrams',
        content: 'When drawing FBDs, include all forces acting ON the object, not forces that the object exerts on other objects.'
      }
    ]
  };
  
  const attemptHistory = [
    { date: '2023-02-15', score: 65 },
    { date: '2023-03-01', score: 70 },
    { date: '2023-03-15', score: 68 },
    { date: '2023-04-01', score: 75 },
    { date: '2023-04-15', score: 72 },
  ];
  
  // Read aloud functionality
  const handleReadAloud = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    } else {
      speakMessage(text);
    }
    
    toast({
      title: isSpeaking ? "Stopped reading" : "Reading aloud",
      description: isSpeaking ? "Text-to-speech has been stopped" : "Now reading the concept content",
    });
  };

  // Handle navigation to related content
  const handleNavigateToFlashcards = () => {
    navigate(`/dashboard/student/flashcard/${conceptId}`);
    toast({
      title: "Flashcards opened",
      description: "Loading interactive flashcards for this concept",
    });
  };

  const handleNavigateToExam = () => {
    navigate(`/dashboard/student/practice-exam/${conceptId}`);
    toast({
      title: "Practice exam loaded",
      description: "Preparing practice questions for this concept",
    });
  };
  
  const handleNavigateToRelatedConcept = (id: string) => {
    navigate(`/dashboard/student/concepts/${id}`);
    toast({
      title: "Loading related concept",
      description: "Navigating to linked concept",
    });
  };

  const handleAddNote = () => {
    toast({
      title: "Note added",
      description: "Your note has been saved to this concept",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-gradient-to-r from-emerald-500 to-green-600';
    if (mastery >= 60) return 'bg-gradient-to-r from-yellow-400 to-amber-500';
    if (mastery >= 40) return 'bg-gradient-to-r from-blue-400 to-blue-600';
    return 'bg-gradient-to-r from-gray-400 to-gray-500';
  };
  
  return (
    <SharedPageLayout
      title="Concept Detail"
      subtitle="Master and practice this concept"
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - takes 2/3 of the page on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Concept header */}
          <Card className="border border-gray-200 dark:border-gray-800 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className={`${getDifficultyColor(conceptData.difficulty)} capitalize px-3 py-1 rounded-full text-xs font-semibold`}>
                  {conceptData.difficulty}
                </Badge>
                {conceptData.isBookmarked && (
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                )}
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <CardTitle className="text-2xl font-bold">{conceptData.title}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleReadAloud(conceptData.description)}
                >
                  <Volume2 className="h-4 w-4" />
                  {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 font-normal rounded-md">
                  {conceptData.subject}
                </Badge>
                <Badge variant="outline" className="font-normal rounded-md bg-gray-50 dark:bg-gray-800">
                  {conceptData.chapter}
                </Badge>
                <Badge variant="outline" className="font-normal rounded-md bg-gray-50 dark:bg-gray-800">
                  {conceptData.topic}
                </Badge>
                {conceptData.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="font-normal rounded-md flex items-center gap-1 bg-gray-50 dark:bg-gray-800">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="pt-4">
              <p className={`text-gray-700 dark:text-gray-300 ${!showFullDescription ? 'line-clamp-3' : ''}`}>
                {conceptData.description}
              </p>
              {conceptData.description.length > 150 && (
                <Button 
                  variant="link" 
                  onClick={() => setShowFullDescription(!showFullDescription)} 
                  className="p-0 h-auto text-indigo-600 dark:text-indigo-400"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </Button>
              )}
            </CardContent>
            
            <CardFooter className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-4">
              <Button 
                variant="default" 
                className="flex justify-between items-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                onClick={handleNavigateToFlashcards}
              >
                <FileText className="h-4 w-4" />
                <span className="font-medium">Flashcards</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="flex justify-between items-center"
                onClick={handleNavigateToExam}
              >
                <Brain className="h-4 w-4" />
                <span className="font-medium">Practice Exam</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="flex justify-between items-center"
                onClick={handleAddNote}
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Add Note</span>
                <CheckCircle className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="secondary"
                className="flex justify-between items-center bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800"
              >
                <BrainCircuit className="h-4 w-4" />
                <span className="font-medium">Self Test</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Tabs for different content */}
          <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Study Content</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Concept Summary</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: conceptData.content }} />
                  
                  <h3 className="text-lg font-semibold mt-4">Key Examples</h3>
                  <ul className="space-y-2">
                    {conceptData.examples.map((example, i) => (
                      <li key={i} className="text-gray-700 dark:text-gray-300">{example}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-4">Common Mistakes</h3>
                  <ul className="space-y-2">
                    {conceptData.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-gray-700 dark:text-gray-300">{mistake}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-4">Exam Relevance</h3>
                  <p className="text-gray-700 dark:text-gray-300">{conceptData.examRelevance}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detailed Content</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: conceptData.content }} />
                  
                  <h3 className="text-lg font-semibold mt-4">Formulas</h3>
                  <div className="space-y-3">
                    {conceptData.formulas.map((formula) => (
                      <div key={formula.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <div className="font-mono text-lg">{formula.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{formula.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" onClick={() => handleReadAloud(conceptData.content)}>
                    <Volume2 className="mr-2 h-4 w-4" />
                    {isSpeaking ? 'Stop Reading' : 'Read Aloud Content'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">Personal Notes</CardTitle>
                  <Button size="sm" variant="outline" onClick={handleAddNote}>
                    Add Note
                  </Button>
                </CardHeader>
                <CardContent>
                  {conceptData.notes.length > 0 ? (
                    <div className="space-y-4">
                      {conceptData.notes.map(note => (
                        <div key={note.id} className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800/50">
                          <h4 className="font-semibold">{note.title}</h4>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">{note.content}</p>
                          <div className="mt-2 flex justify-end gap-2">
                            <Button size="sm" variant="ghost">Edit</Button>
                            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">Delete</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p>You haven't added any notes for this concept yet.</p>
                      <Button variant="link" onClick={handleAddNote}>Add your first note</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="practice" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Interactive Flashcards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">Practice with {conceptData.flashcardsCompleted}/{conceptData.flashcardsTotal} flashcards for this concept.</p>
                    <Progress 
                      value={(conceptData.flashcardsCompleted / conceptData.flashcardsTotal) * 100} 
                      className="h-2 mt-4" 
                    />
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleNavigateToFlashcards} className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Start Flashcards
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Practice Exam</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Test your knowledge with targeted questions about this concept.
                    </p>
                    <div className="mt-4 text-sm">
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Brain className="h-3.5 w-3.5" /> Mastery
                        </span>
                        <span className="text-indigo-600 dark:text-indigo-400">{conceptData.mastery}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getMasteryColor(conceptData.mastery)} rounded-full`}
                          style={{ width: `${conceptData.mastery}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleNavigateToExam} className="w-full">
                      <Brain className="mr-2 h-4 w-4" />
                      Start Practice Test
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar - takes 1/3 of the page on large screens */}
        <div className="space-y-6">
          {/* Mastery and Performance Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mastery & Recall Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{conceptData.quizScore}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Exam Score (out of 5)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{conceptData.recallAccuracy}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Recall Strength</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">45</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Avg. Time per MCQ (sec)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Next Revision (days)</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Attempt History</h4>
                <div className="h-40 bg-gray-50 dark:bg-gray-800/50 rounded-md flex items-center justify-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Performance graph would appear here
                  </div>
                </div>
                <p className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">
                  Showing quiz attempts over time
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Confidence Check</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  How confident are you with this concept?
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Not at all</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Very confident</span>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button variant="outline" size="sm">Save Rating</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-indigo-500" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Weak Link Detector</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex-shrink-0 flex items-center justify-center text-xs mt-0.5">!</span>
                    <span>Understanding of balanced forces in real-world scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-4 w-4 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 flex-shrink-0 flex items-center justify-center text-xs mt-0.5">!</span>
                    <span>Application of the concept in rotational motion</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Suggested Revision Plan</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Review the concept of balanced forces using everyday examples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Practice more problems involving objects on inclined planes</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Topic-Level Analytics</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Understanding of Core Concept</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Application in Complex Problems</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Memory Recall</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-1.5" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-center font-medium text-indigo-600 dark:text-indigo-400">
                    You're in the top 30% for this concept!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Concepts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Link className="h-5 w-5 text-indigo-500" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conceptData.relatedConcepts.map((concept) => (
                  <Button 
                    key={concept.id}
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleNavigateToRelatedConcept(concept.id)}
                  >
                    <div>
                      <div className="font-medium">{concept.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {conceptData.subject} • {conceptData.chapter}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;
