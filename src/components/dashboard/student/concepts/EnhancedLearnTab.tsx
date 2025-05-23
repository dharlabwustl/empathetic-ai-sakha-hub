
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, Video, FileText, Lightbulb, Volume2, 
  Play, Users, MessageSquare, Calculator, Target,
  Eye, Brain, Headphones, Mic
} from 'lucide-react';

interface EnhancedLearnTabProps {
  conceptName: string;
}

const EnhancedLearnTab: React.FC<EnhancedLearnTabProps> = ({ conceptName }) => {
  const [activeSubTab, setActiveSubTab] = useState('content');
  const [isReading, setIsReading] = useState(false);

  const playReadAloud = (text: string, title?: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsReading(true);
      
      const fullText = title ? `${title}. ${text}` : text;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.9;
      utterance.volume = 0.8;
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  const conceptContent = {
    definition: `${conceptName} is a fundamental principle in physics that describes the relationship between force, mass, and acceleration. When a force is applied to an object, it causes the object to accelerate in the direction of the force.`,
    
    explanation: `According to Newton's Second Law, the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This can be expressed mathematically as F equals m times a, where F is the net force, m is the mass, and a is the acceleration.`,
    
    applications: `This principle has numerous real-world applications including vehicle design, rocket propulsion, sports biomechanics, and engineering structures. Understanding this concept is crucial for analyzing motion in various scenarios.`,
    
    examples: [
      {
        title: "Car Acceleration",
        description: "When you press the gas pedal, the engine applies force to the wheels, causing the car to accelerate forward.",
        audio: "When you press the gas pedal in a car, the engine applies force to the wheels, causing the car to accelerate forward. The greater the force from the engine, the greater the acceleration, assuming the mass remains constant."
      },
      {
        title: "Throwing a Ball",
        description: "The force applied by your arm determines how fast the ball accelerates when thrown.",
        audio: "When throwing a ball, the force applied by your arm determines how fast the ball accelerates. A lighter ball will accelerate more than a heavier ball with the same applied force."
      },
      {
        title: "Rocket Launch",
        description: "Rockets use massive forces from burning fuel to overcome gravity and accelerate into space.",
        audio: "Rockets use massive forces generated from burning fuel to overcome Earth's gravity and accelerate into space. The thrust must be greater than the rocket's weight to achieve lift-off."
      }
    ]
  };

  const videoContent = [
    {
      title: "Introduction to Forces",
      duration: "5:30",
      description: "Basic concepts and terminology",
      audio: "This introductory video covers the basic concepts and terminology related to forces. You'll learn about different types of forces and how they affect motion."
    },
    {
      title: "Mathematical Relationships",
      duration: "8:15",
      description: "F = ma equation explained",
      audio: "This video explains the mathematical relationship F equals m times a in detail. You'll see how to use this equation to solve various physics problems."
    },
    {
      title: "Real-world Examples",
      duration: "6:45",
      description: "Practical applications demonstrated",
      audio: "This video demonstrates practical applications of Newton's Second Law with real-world examples that you encounter in everyday life."
    }
  ];

  const formulaContent = {
    main: "F = ma",
    variables: [
      { symbol: "F", name: "Force", unit: "Newtons (N)" },
      { symbol: "m", name: "Mass", unit: "Kilograms (kg)" },
      { symbol: "a", name: "Acceleration", unit: "Meters per second squared (m/s²)" }
    ],
    derivations: [
      "a = F/m (acceleration equals force divided by mass)",
      "m = F/a (mass equals force divided by acceleration)"
    ]
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Learn {conceptName}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => playReadAloud(`${conceptContent.definition} ${conceptContent.explanation} ${conceptContent.applications}`, `Learning about ${conceptName}`)}
                    disabled={isReading}
                    className="flex items-center gap-2"
                  >
                    <Volume2 className="h-4 w-4" />
                    Read Aloud
                  </Button>
                  {isReading && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={stopReading}
                      className="flex items-center gap-2"
                    >
                      <Headphones className="h-4 w-4" />
                      Stop
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Definition</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playReadAloud(conceptContent.definition, "Definition")}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300">{conceptContent.definition}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Detailed Explanation</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playReadAloud(conceptContent.explanation, "Detailed Explanation")}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-green-700 dark:text-green-300">{conceptContent.explanation}</p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Applications</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playReadAloud(conceptContent.applications, "Applications")}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-purple-700 dark:text-purple-300">{conceptContent.applications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-red-600" />
                Video Lessons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videoContent.map((video, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{video.title}</h4>
                          <Badge variant="outline">{video.duration}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{video.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => playReadAloud(video.audio, video.title)}
                          className="flex items-center gap-2"
                        >
                          <Volume2 className="h-3 w-3" />
                          Audio
                        </Button>
                        <Button size="sm" className="flex items-center gap-2">
                          <Play className="h-3 w-3" />
                          Watch
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formulas" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-green-600" />
                  Mathematical Formulas
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const formulaText = `The main formula is ${formulaContent.main}. Where ${formulaContent.variables.map(v => `${v.symbol} represents ${v.name} measured in ${v.unit}`).join(', ')}. Alternative forms include ${formulaContent.derivations.join(' and ')}.`;
                    playReadAloud(formulaText, "Mathematical Formulas");
                  }}
                  className="flex items-center gap-2"
                >
                  <Volume2 className="h-4 w-4" />
                  Read Formulas
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
                    {formulaContent.main}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formulaContent.variables.map((variable, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">{variable.symbol}</div>
                      <div className="text-sm font-medium">{variable.name}</div>
                      <div className="text-xs text-gray-500">{variable.unit}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playReadAloud(`${variable.symbol} represents ${variable.name}, measured in ${variable.unit}`)}
                        className="mt-2"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Alternative Forms:</h4>
                  {formulaContent.derivations.map((derivation, index) => (
                    <div key={index} className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg flex items-center justify-between">
                      <span className="font-mono">{derivation}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playReadAloud(derivation)}
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Practical Examples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conceptContent.examples.map((example, index) => (
                  <div key={index} className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                          {example.title}
                        </h4>
                        <p className="text-orange-700 dark:text-orange-300 text-sm">
                          {example.description}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playReadAloud(example.audio, example.title)}
                        className="ml-4 flex items-center gap-2"
                      >
                        <Volume2 className="h-3 w-3" />
                        Listen
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
                Discussion & Q&A
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-indigo-800 dark:text-indigo-200">Ask Questions</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => playReadAloud("You can ask questions about this concept and get detailed explanations. Use the discussion feature to interact with other students and clarify any doubts you may have.", "Discussion Guidelines")}
                      className="flex items-center gap-2"
                    >
                      <Volume2 className="h-3 w-3" />
                      Listen
                    </Button>
                  </div>
                  <p className="text-indigo-700 dark:text-indigo-300 text-sm">
                    Feel free to ask questions about {conceptName}. Our AI tutor and community are here to help.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Common Questions:</h4>
                  {[
                    {
                      question: "How does mass affect acceleration?",
                      answer: "According to Newton's Second Law, acceleration is inversely proportional to mass. This means that for the same applied force, a lighter object will accelerate more than a heavier object."
                    },
                    {
                      question: "What happens when multiple forces act on an object?",
                      answer: "When multiple forces act on an object, we calculate the net force by adding all forces vectorially, considering both magnitude and direction. The net force determines the object's acceleration."
                    }
                  ].map((qa, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">{qa.question}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{qa.answer}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => playReadAloud(`Question: ${qa.question}. Answer: ${qa.answer}`)}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Join Discussion Forum
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedLearnTab;
