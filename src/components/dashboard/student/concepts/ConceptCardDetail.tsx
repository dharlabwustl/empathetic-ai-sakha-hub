
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  TestTube, 
  Star, 
  Clock, 
  Target,
  Lightbulb,
  FileText,
  Video,
  Calculator,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';

interface ConceptDetail {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  duration: number;
  description: string;
  keyPoints: string[];
  examples: string[];
  formulas: Array<{
    name: string;
    formula: string;
    variables: Array<{
      symbol: string;
      name: string;
      unit: string;
    }>;
  }>;
  relatedConcepts: string[];
  practiceQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

const ConceptCardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<ConceptDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Voice assistant for concept explanations
  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
    speakText,
    startListening,
    stopListening,
    processCommand,
    toggleMute,
    toggleEnabled
  } = useVoiceAssistant({
    userName: 'Student',
    initialSettings: { enabled: true }
  });

  useEffect(() => {
    // Simulate fetching concept data
    const fetchConcept = async () => {
      setLoading(true);
      // Mock data for demonstration
      const mockConcept: ConceptDetail = {
        id: id || '1',
        title: 'Newton\'s Laws of Motion',
        subject: 'Physics',
        difficulty: 'Medium',
        duration: 45,
        description: 'Fundamental principles that describe the relationship between forces and motion.',
        keyPoints: [
          'First Law: An object at rest stays at rest, and an object in motion stays in motion',
          'Second Law: Force equals mass times acceleration (F = ma)',
          'Third Law: For every action, there is an equal and opposite reaction'
        ],
        examples: [
          'A car braking demonstrates the first law',
          'Pushing a shopping cart shows the second law',
          'Walking demonstrates the third law'
        ],
        formulas: [
          {
            name: 'Newton\'s Second Law',
            formula: 'F = ma',
            variables: [
              { symbol: 'F', name: 'Force', unit: 'N' },
              { symbol: 'm', name: 'Mass', unit: 'kg' },
              { symbol: 'a', name: 'Acceleration', unit: 'm/s²' }
            ]
          }
        ],
        relatedConcepts: ['Momentum', 'Energy', 'Friction'],
        practiceQuestions: [
          {
            id: '1',
            question: 'What is Newton\'s first law of motion?',
            options: [
              'F = ma',
              'An object at rest stays at rest',
              'Every action has an equal reaction',
              'Energy is conserved'
            ],
            correctAnswer: 1,
            explanation: 'Newton\'s first law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.'
          }
        ]
      };
      
      setConcept(mockConcept);
      setLoading(false);
    };

    fetchConcept();
  }, [id]);

  // Voice commands for concept learning
  const conceptCommands = {
    'explain this concept': () => {
      if (concept) {
        speakText(`Let me explain ${concept.title}. ${concept.description}`);
      }
    },
    'read key points': () => {
      if (concept) {
        const points = concept.keyPoints.join('. ');
        speakText(`Here are the key points: ${points}`);
      }
    },
    'give example': () => {
      if (concept && concept.examples.length > 0) {
        const randomExample = concept.examples[Math.floor(Math.random() * concept.examples.length)];
        speakText(`Here's an example: ${randomExample}`);
      }
    },
    'show formula': () => {
      if (concept && concept.formulas.length > 0) {
        const formula = concept.formulas[0];
        speakText(`The main formula is ${formula.name}: ${formula.formula}`);
      }
    },
    'help me study': () => {
      speakText('I can help you understand this concept better. Try asking me to explain the concept, read key points, give examples, or show formulas.');
    }
  };

  useEffect(() => {
    if (transcript && settings.enabled) {
      const commandProcessed = processCommand(conceptCommands, true);
      if (!commandProcessed) {
        const response = `I heard "${transcript}". I can help you with this concept. Try saying "explain this concept", "read key points", "give example", "show formula", or "help me study".`;
        speakText(response);
      }
    }
  }, [transcript]);

  if (loading) {
    return (
      <SharedPageLayout
        title="Loading Concept..."
        subtitle="Please wait while we load the concept details"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }

  if (!concept) {
    return (
      <SharedPageLayout
        title="Concept Not Found"
        subtitle="The requested concept could not be found"
        showBackButton={true}
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="text-center py-12">
          <p>This concept doesn't exist or has been removed.</p>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} • ${concept.difficulty} • ${concept.duration} minutes`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Concept Voice Assistant */}
        {settings.enabled && (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mic className="h-5 w-5 text-blue-600" />
                Concept Voice Assistant
                {(isListening || isSpeaking) && (
                  <Badge variant="secondary" className={
                    isListening ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }>
                    {isListening ? "Listening..." : "Speaking..."}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {transcript && (
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <p className="text-sm">
                    <span className="font-medium">You said:</span> "{transcript}"
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                  className="flex items-center gap-2"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isListening ? "Stop" : "Ask Me"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMute}
                  className="flex items-center gap-2"
                >
                  {settings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  {settings.muted ? "Unmute" : "Mute"}
                </Button>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p><strong>Try saying:</strong></p>
                <p>• "Explain this concept" - Get detailed explanation</p>
                <p>• "Read key points" - Hear the main points</p>
                <p>• "Give example" - Get real-world examples</p>
                <p>• "Show formula" - Learn the formulas</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Examples
            </TabsTrigger>
            <TabsTrigger value="formulas" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Formulas
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{concept.description}</p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Key Points:</h4>
                  <ul className="space-y-2">
                    {concept.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-World Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {concept.examples.map((example, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p>{example}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formulas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Important Formulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {concept.formulas.map((formula, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">{formula.name}</h4>
                      <div className="text-2xl font-mono mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                        {formula.formula}
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium">Variables:</h5>
                        {formula.variables.map((variable, vIndex) => (
                          <div key={vIndex} className="flex items-center gap-4 text-sm">
                            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {variable.symbol}
                            </span>
                            <span>{variable.name}</span>
                            <span className="text-gray-500">({variable.unit})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Practice Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {concept.practiceQuestions.map((question, index) => (
                    <div key={question.id} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Question {index + 1}</h4>
                      <p className="mb-4">{question.question}</p>
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <span className="text-sm font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                      <details className="mt-4">
                        <summary className="cursor-pointer font-medium text-blue-600">Show Answer</summary>
                        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                          <p><strong>Answer:</strong> {String.fromCharCode(65 + question.correctAnswer)}</p>
                          <p><strong>Explanation:</strong> {question.explanation}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <style>
        {`
          .concept-detail-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
        `}
      </style>
    </SharedPageLayout>
  );
};

export default ConceptCardDetail;
