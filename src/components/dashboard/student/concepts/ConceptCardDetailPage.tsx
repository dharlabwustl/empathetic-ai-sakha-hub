
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, BookOpen, Clock, FileText, Lightbulb, Calculator, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormulaTabContentProps {
  conceptId: string;
  conceptTitle: string;
  handleOpenFormulaLab: () => void;
}

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for concept card details - this would come from an API in a real app
  const conceptDetails = {
    id: conceptId || 'concept-1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'medium',
    estimatedTime: '25 minutes',
    progress: 65,
    description: 'Understand the fundamental principles governing the motion of objects, including Newton\'s three laws that form the foundation of classical mechanics.',
    content: `
      <h2>Newton's First Law: Law of Inertia</h2>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an external force.</p>
      
      <h2>Newton's Second Law: Law of Acceleration</h2>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma.</p>
      
      <h2>Newton's Third Law: Action and Reaction</h2>
      <p>For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal force in the opposite direction on the first object.</p>
    `,
    examples: [
      {
        id: 'example-1',
        title: 'A Book on a Table',
        description: 'A book resting on a table doesn\'t move because the gravitational force pulling it down is balanced by the normal force from the table pushing up.'
      },
      {
        id: 'example-2',
        title: 'Rocket Propulsion',
        description: 'A rocket moves forward by expelling gas backwards. The forward thrust is a reaction to the backward force of the expelled gas (Third Law).'
      }
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Which of Newton\'s laws explains why a passenger without a seatbelt continues to move forward when a car suddenly stops?',
        options: [
          'First Law (Inertia)',
          'Second Law (F=ma)',
          'Third Law (Action-Reaction)',
          'Law of Conservation of Energy'
        ],
        correctAnswer: 0
      }
    ],
    formulas: [
      {
        id: 'formula-1',
        title: 'Force',
        expression: 'F = ma',
        variables: [
          { symbol: 'F', name: 'Force', unit: 'N (Newtons)' },
          { symbol: 'm', name: 'Mass', unit: 'kg (kilograms)' },
          { symbol: 'a', name: 'Acceleration', unit: 'm/s² (meters per second squared)' }
        ]
      }
    ]
  };

  const handleOpenFormulaLab = () => {
    console.log('Opening formula lab for concept:', conceptId);
    // This would navigate to or open the formula lab in a real app
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button and header */}
      <div className="mb-6">
        <Link to="/dashboard/student/concepts" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Concepts
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              {conceptDetails.title}
            </h1>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-2">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{conceptDetails.subject}</span>
              {conceptDetails.topic && (
                <>
                  <span className="mx-2">•</span>
                  <span>{conceptDetails.topic}</span>
                </>
              )}
              <span className="mx-2">•</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{conceptDetails.estimatedTime}</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Badge variant="outline" className={
              conceptDetails.difficulty === 'easy' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : conceptDetails.difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            }>
              {conceptDetails.difficulty.charAt(0).toUpperCase() + conceptDetails.difficulty.slice(1)}
            </Badge>
            
            <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              <Star className="h-3 w-3 mr-1" /> Important Concept
            </Badge>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Your progress</span>
            <span className="font-medium">{conceptDetails.progress}%</span>
          </div>
          <Progress 
            value={conceptDetails.progress} 
            className="h-2 bg-gray-100 dark:bg-gray-800" 
          />
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mt-8"
      >
        <div className="border-b dark:border-gray-700 mb-6">
          <TabsList className="bg-transparent">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="examples"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
            >
              Examples
            </TabsTrigger>
            <TabsTrigger 
              value="quiz"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
            >
              Quiz
            </TabsTrigger>
            <TabsTrigger 
              value="formulas"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-2"
            >
              Formulas
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="mt-0">
          <Card className="border dark:border-gray-700">
            <CardContent className="pt-6">
              <div 
                className="prose dark:prose-invert max-w-none" 
                dangerouslySetInnerHTML={{ __html: conceptDetails.content }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="mt-0">
          <div className="space-y-6">
            {conceptDetails.examples.map(example => (
              <Card key={example.id} className="border dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                  <p>{example.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-0">
          <div className="space-y-6">
            {conceptDetails.quizQuestions.map((question, index) => (
              <Card key={question.id} className="border dark:border-gray-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Question {index + 1}: {question.question}</h3>
                  <div className="space-y-3">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`p-3 border rounded-lg ${
                          optIndex === question.correctAnswer 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                            : 'border-gray-200 dark:border-gray-700'
                        } hover:border-blue-400 cursor-pointer transition-colors`}
                      >
                        <div className="flex items-center">
                          {optIndex === question.correctAnswer && (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          )}
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="formulas" className="mt-0">
          <FormulaTabContent 
            conceptId={conceptDetails.id} 
            conceptTitle={conceptDetails.title}
            handleOpenFormulaLab={handleOpenFormulaLab} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Formula Tab Content Component
const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ conceptId, conceptTitle, handleOpenFormulaLab }) => {
  return (
    <div className="space-y-6">
      <Card className="border dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Key Formulas</h3>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={handleOpenFormulaLab}
            >
              <Calculator className="h-4 w-4 mr-1" /> Open Formula Lab
            </Button>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-medium">Force</h4>
                <div className="text-xl font-bold my-2">F = ma</div>
              </div>
              
              <Button variant="secondary" size="sm" onClick={handleOpenFormulaLab}>
                <Lightbulb className="h-4 w-4 mr-1" /> Practice
              </Button>
            </div>
            
            <div className="text-sm mt-3 pt-3 border-t dark:border-gray-700">
              <p className="mb-2"><strong>Where:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-mono">F</span> = Force (Newtons)</li>
                <li><span className="font-mono">m</span> = Mass (kilograms)</li>
                <li><span className="font-mono">a</span> = Acceleration (m/s²)</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-center text-sm mt-6">
            <FileText className="h-4 w-4 mr-1 text-blue-500" />
            <span>Access more related formulas in the Formula Lab</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptCardDetailPage;
