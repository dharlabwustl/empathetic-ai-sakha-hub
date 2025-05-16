
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Star, Calculator, Volume2, Video, FileText, BookOpen as BookIcon, Brain, Lightbulb } from 'lucide-react';
import FormulaTabContent from '@/components/dashboard/student/concepts/FormulaTabContent';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const ConceptDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  // Start with the "learn" tab active by default
  const [activeTab, setActiveTab] = useState('learn');
  const [confidenceRating, setConfidenceRating] = useState<number>(0);
  const [readAloudActive, setReadAloudActive] = useState(false);
  
  const { speakMessage, toggleMute, isVoiceSupported } = useVoiceAnnouncer({});

  // In a real app, fetch concept details by ID from API
  // For now, we'll use mock data
  const concept = {
    id: parseInt(id || "1"),
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    description: "Understanding the fundamental principles of motion and forces in classical mechanics.",
    status: "in-progress",
    difficulty: "medium",
    timeEstimate: 20,
    mastery: 65,
    priority: 1,
    cardCount: 15,
    isRecommended: true,
    hasFormulas: true, // Flag to indicate if this concept has formulas
    hasVideo: true,
    has3dModel: true,
    hasExamples: true,
    hasPastExamQuestions: true,
    examMistakes: [
      "Forgetting to include units in the final answer",
      "Confusing the First and Third Laws in application problems",
      "Neglecting friction forces in calculations"
    ],
    content: {
      summary: "Newton's three laws of motion describe the relationship between the motion of an object and the forces acting on it. These laws are fundamental to classical mechanics.",
      keyPoints: [
        "First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.",
        "Second Law: The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
        "Third Law: For every action, there is an equal and opposite reaction."
      ],
      examples: [
        "A book on a table remains at rest due to balanced forces (First Law).",
        "Pushing a shopping cart - the acceleration depends on the force applied and the mass of the cart (Second Law).",
        "A rocket expels gas backward, propelling itself forward (Third Law)."
      ]
    },
    aiInsights: "You seem to understand Newton's First Law well, but your recall of the mathematical forms of the Second Law could use some practice. Consider focusing on force calculation problems.",
    videoUrl: "https://www.youtube.com/embed/mn34mnnDnKU",
    pastExamQuestions: [
      {
        year: 2022,
        question: "A 2 kg object is subjected to a force of 10 N. Calculate its acceleration.",
        answer: "5 m/s²",
        explanation: "Using Newton's Second Law: a = F/m = 10N/2kg = 5 m/s²"
      },
      {
        year: 2021,
        question: "Explain how Newton's Third Law applies when a person is standing on the ground.",
        answer: "The person exerts a downward force on the ground due to their weight, and the ground exerts an equal upward force on the person, which keeps them from sinking into the ground."
      }
    ]
  };

  const handleBackToConcepts = () => {
    navigate('/dashboard/student/concepts');
  };

  const handleOpenFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${id}/formula-lab`);
  };

  // Handle read aloud functionality
  const toggleReadAloud = () => {
    if (!isVoiceSupported) {
      toast({
        title: "Text-to-Speech Not Supported",
        description: "Your browser doesn't support text-to-speech functionality. Please try a different browser.",
        variant: "destructive"
      });
      return;
    }
    
    if (readAloudActive) {
      // Stop reading
      toggleMute(true);
      setReadAloudActive(false);
    } else {
      // Start reading
      setReadAloudActive(true);
      
      // Prepare the text to be read aloud
      let textToRead = `${concept.title}. ${concept.description} ${concept.content.summary} `;
      
      // Add key points
      textToRead += "Key points: ";
      concept.content.keyPoints.forEach((point, index) => {
        textToRead += `Point ${index + 1}: ${point} `;
      });
      
      // Add examples
      textToRead += "Examples: ";
      concept.content.examples.forEach((example, index) => {
        textToRead += `Example ${index + 1}: ${example} `;
      });
      
      speakMessage(textToRead);
      
      // Auto turn off after content is read
      setTimeout(() => {
        setReadAloudActive(false);
      }, textToRead.length * 50); // Rough estimate of reading time
    }
  };

  // Update confidence rating
  const handleConfidenceRating = (rating: number) => {
    setConfidenceRating(rating);
    
    // Provide feedback based on confidence
    let feedbackMessage = "";
    if (rating <= 2) {
      feedbackMessage = "It's okay to find this challenging. Let's focus on reviewing the basics first.";
    } else if (rating <= 4) {
      feedbackMessage = "You're making progress! Continue practicing with examples to build confidence.";
    } else {
      feedbackMessage = "Great confidence level! Try testing your knowledge with practice questions.";
    }
    
    toast({
      title: "Confidence Recorded",
      description: feedbackMessage,
    });
  };

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} • ${concept.chapter}`}
    >
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 flex items-center gap-1"
          onClick={handleBackToConcepts}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Concepts</span>
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{concept.title}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`p-2 rounded-full ${readAloudActive ? 'bg-blue-100 text-blue-700' : ''}`}
                    onClick={toggleReadAloud}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="mt-1 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                    {concept.subject}
                  </Badge>
                  <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                    {concept.chapter}
                  </Badge>
                  <Badge variant="outline" className={
                    concept.difficulty === "easy"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : concept.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                  }>
                    {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
                  </Badge>
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{concept.timeEstimate} min</span>
                </div>
                {concept.isRecommended && (
                  <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
                    <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                    Recommended
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Progress</h3>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Mastery</span>
                <span>{concept.mastery}%</span>
              </div>
              <Progress 
                value={concept.mastery} 
                className="h-2" 
              />
            </div>
            <p className="text-muted-foreground">{concept.description}</p>
          </CardContent>
        </Card>

        {/* Confidence rating section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">How confident are you about this concept?</CardTitle>
            <CardDescription>Rate your confidence level to get personalized study recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={confidenceRating === rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleConfidenceRating(rating)}
                    className="w-10 h-10"
                  >
                    {rating}
                  </Button>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                {confidenceRating === 1 && "Not confident at all"}
                {confidenceRating === 2 && "Slightly confident"}
                {confidenceRating === 3 && "Moderately confident"}
                {confidenceRating === 4 && "Very confident"}
                {confidenceRating === 5 && "Extremely confident"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList className="w-full grid grid-cols-7">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="video" className={concept.hasVideo ? "" : "hidden"}>
              Video
            </TabsTrigger>
            <TabsTrigger value="formula" className={concept.hasFormulas ? "" : "hidden"}>
              Formula Lab
            </TabsTrigger>
            <TabsTrigger value="examples" className={concept.hasExamples ? "" : "hidden"}>
              Examples
            </TabsTrigger>
            <TabsTrigger value="exam-questions" className={concept.hasPastExamQuestions ? "" : "hidden"}>
              Past Exams
            </TabsTrigger>
            <TabsTrigger value="test">Quick Test</TabsTrigger>
          </TabsList>
          
          {/* Learn Tab */}
          <TabsContent value="learn" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{concept.content.summary}</p>
                
                <h3 className="font-medium mt-4 mb-2">Key Points</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {concept.content.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                
                <h3 className="font-medium mt-4 mb-2">Examples</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {concept.content.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Common Mistakes Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Mistakes to Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {concept.examMistakes.map((mistake, index) => (
                    <li key={index} className="text-red-600 dark:text-red-400">{mistake}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* AI Insights Card */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{concept.aiInsights}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Visual Tab */}
          <TabsContent value="visual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Visual Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Interactive diagram placeholder */}
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 h-80 flex items-center justify-center text-center p-4">
                    <div>
                      <h3 className="font-medium mb-2">Interactive Diagram</h3>
                      <p className="text-sm text-gray-500">
                        An interactive visual representation of Newton's Laws would be displayed here.
                      </p>
                    </div>
                  </div>
                  
                  {/* 3D Model Viewer */}
                  {concept.has3dModel && (
                    <div>
                      <h3 className="font-medium mb-2">3D Model</h3>
                      <div className="rounded-lg bg-slate-100 dark:bg-slate-800 h-64 flex items-center justify-center">
                        <div className="text-center">
                          <div className="mx-auto w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-2">
                            <BookIcon className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">3D model visualization would be displayed here</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => toast({
                              title: "3D Model",
                              description: "Loading 3D model viewer...",
                            })}
                          >
                            View 3D Model
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Video Tab */}
          <TabsContent value="video" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Explanation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
                  <iframe
                    src={concept.videoUrl}
                    className="w-full h-full rounded-lg"
                    title={`Video explanation of ${concept.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium">Video Notes</h3>
                  <p className="text-sm text-muted-foreground">
                    This video covers all three of Newton's Laws with helpful visualizations and real-world examples.
                    Key timestamps:
                  </p>
                  <ul className="list-disc pl-5 text-sm">
                    <li>00:14 - Introduction to Newton's Laws</li>
                    <li>01:23 - First Law explained</li>
                    <li>03:45 - Second Law and calculations</li>
                    <li>05:32 - Third Law and examples</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Formula Tab */}
          <TabsContent value="formula" className="space-y-4">
            <FormulaTabContent 
              conceptId={id || '1'} 
              conceptTitle={concept.title} 
              handleOpenFormulaLab={handleOpenFormulaLab}
            />
          </TabsContent>
          
          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detailed Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h3 className="font-medium mb-2">Example 1: Inertia in Daily Life</h3>
                    <p className="mb-3">
                      When a bus suddenly accelerates, passengers feel a force pushing them backward. This is actually their bodies
                      resisting the change in motion - demonstrating Newton's First Law of Inertia.
                    </p>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm font-medium">Analysis:</p>
                      <p className="text-sm">The passengers' bodies want to remain at rest relative to their original position. When the bus accelerates forward, their bodies initially stay in place due to inertia, giving the sensation of being pushed backward.</p>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <h3 className="font-medium mb-2">Example 2: Second Law Calculation</h3>
                    <p className="mb-3">
                      A soccer player kicks a 0.43 kg ball with a force of 25 N. Calculate the acceleration of the ball.
                    </p>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm font-medium">Solution:</p>
                      <p className="text-sm">Using Newton's Second Law: F = ma</p>
                      <p className="text-sm">Rearranging to find acceleration: a = F/m</p>
                      <p className="text-sm">a = 25 N / 0.43 kg = 58.14 m/s²</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Past Exam Questions Tab */}
          <TabsContent value="exam-questions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Previous Years' Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {concept.pastExamQuestions.map((question, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{question.year} Exam Question</h3>
                        <Badge>{question.year}</Badge>
                      </div>
                      <p className="my-3">{question.question}</p>
                      
                      <div className="mt-4">
                        <details className="group">
                          <summary className="flex items-center font-medium cursor-pointer list-none">
                            <span className="flex-1">View Answer</span>
                            <span className="transition group-open:rotate-180">
                              <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </span>
                          </summary>
                          <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                            <p className="font-medium">Answer:</p>
                            <p>{question.answer}</p>
                            {question.explanation && (
                              <div className="mt-2">
                                <p className="font-medium">Explanation:</p>
                                <p>{question.explanation}</p>
                              </div>
                            )}
                          </div>
                        </details>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Quick Test Tab */}
          <TabsContent value="test" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Knowledge Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Test your understanding of {concept.title} with this quick assessment.</p>
                <Button size="lg" className="w-full">Start Quick Test</Button>
                
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-medium mb-2">Recall Practice</h3>
                  <p className="text-sm text-muted-foreground mb-4">Try to recall and write down the key points about this concept before checking your answers.</p>
                  <div className="border rounded-lg p-4">
                    <textarea 
                      className="w-full h-32 p-3 border rounded-lg" 
                      placeholder="Write what you remember about Newton's Laws of Motion..."
                    />
                    <Button className="mt-3">Check My Recall</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
