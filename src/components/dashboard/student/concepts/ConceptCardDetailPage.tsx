
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Check, Clock, FileText, Flag, GraduationCap, HelpCircle, LayoutGrid, Lightbulb, MessageSquare, Share2 } from 'lucide-react';
import { ConceptsPageLayout } from './ConceptsPageLayout';
import { motion } from 'framer-motion';

// Mock data - would be replaced by API calls in a real application
const conceptDetails = {
  id: 'concept-1',
  title: 'Chemical Bonding and Molecular Structure',
  description: 'Understanding the nature of chemical bonds, types of bonds, VSEPR theory, and molecular geometry.',
  category: 'Chemistry',
  difficulty: 'Medium',
  completionPercentage: 65,
  timeEstimate: '45 min',
  content: {
    overview: `
      Chemical bonding is one of the most fundamental concepts in chemistry. It explains how atoms combine to form molecules and compounds. The main types of chemical bonds are ionic, covalent, and metallic bonds.
      
      This concept card covers:
      - The nature and types of chemical bonds
      - Valence Shell Electron Pair Repulsion (VSEPR) theory
      - Molecular geometry and its impact on properties
      - Bond polarity and intermolecular forces
    `,
    keyPoints: [
      "Ionic bonds form when electrons are transferred from one atom to another",
      "Covalent bonds involve sharing of electrons between atoms",
      "VSEPR theory predicts molecular geometry based on electron pairs",
      "Electronegativity differences determine bond polarity",
      "Molecular geometry affects physical and chemical properties"
    ],
    formulas: [
      { name: "Bond Energy", formula: "D = ½(D₁ + D₂) - |E|", explanation: "Where D is the bond energy, D₁ and D₂ are the dissociation energies, and E is the electron affinity." },
      { name: "Bond Order", formula: "Bond Order = ½(bonding electrons - antibonding electrons)", explanation: "Higher bond order indicates stronger and shorter bonds." },
      { name: "Dipole Moment", formula: "μ = δ × r", explanation: "Where μ is the dipole moment, δ is the partial charge, and r is the distance between charges." }
    ],
    examples: [
      { title: "Formation of NaCl", description: "Sodium (Na) transfers an electron to Chlorine (Cl), forming Na⁺ and Cl⁻ ions that attract each other." },
      { title: "Water Molecule (H₂O)", description: "Oxygen forms covalent bonds with two hydrogen atoms, resulting in a bent molecular geometry due to VSEPR theory." },
      { title: "Carbon Dioxide (CO₂)", description: "Carbon forms double bonds with two oxygen atoms, resulting in a linear molecular geometry." }
    ]
  },
  questions: [
    {
      id: 'q1',
      question: 'Which theory is used to predict the shapes of molecules?',
      options: ['VSEPR Theory', 'Atomic Theory', 'Molecular Orbital Theory', 'Quantum Theory'],
      correctAnswer: 'VSEPR Theory',
      explanation: 'VSEPR (Valence Shell Electron Pair Repulsion) Theory predicts the shapes of molecules based on the arrangement of electron pairs around the central atom.'
    },
    {
      id: 'q2',
      question: 'What type of bond forms between atoms with a large electronegativity difference?',
      options: ['Ionic bond', 'Covalent bond', 'Hydrogen bond', 'Metallic bond'],
      correctAnswer: 'Ionic bond',
      explanation: 'An ionic bond forms when there is a large electronegativity difference between atoms, typically greater than 1.7 on the Pauling scale.'
    },
    {
      id: 'q3',
      question: 'The shape of a methane (CH₄) molecule is:',
      options: ['Tetrahedral', 'Trigonal planar', 'Linear', 'Octahedral'],
      correctAnswer: 'Tetrahedral',
      explanation: 'According to VSEPR theory, a molecule with four bonds and no lone pairs around the central atom adopts a tetrahedral geometry.'
    }
  ],
  relatedConcepts: [
    { id: 'concept-2', title: 'Periodic Properties of Elements' },
    { id: 'concept-3', title: 'Chemical Thermodynamics' },
    { id: 'concept-4', title: 'Molecular Orbital Theory' }
  ]
};

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllKeyPoints, setShowAllKeyPoints] = useState(false);
  
  // In a real application, you would fetch the concept details based on conceptId
  // For now, we'll use the mock data

  return (
    <ConceptsPageLayout 
      showBackButton 
      title="Concept Details"
      subtitle="Explore and master this concept"
    >
      <div className="space-y-8">
        {/* Concept Header */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{conceptDetails.title}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{conceptDetails.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <BookOpen className="mr-1.5 h-4 w-4" />
                Study Now
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-1.5 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="mr-1.5 h-4 w-4" />
                Report Issue
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 flex items-center space-x-3 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{conceptDetails.category}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
              </div>
            </Card>
            
            <Card className="p-4 flex items-center space-x-3 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900">
                <GraduationCap className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{conceptDetails.difficulty}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Difficulty</p>
              </div>
            </Card>
            
            <Card className="p-4 flex items-center space-x-3 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                <Clock className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{conceptDetails.timeEstimate}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Study Time</p>
              </div>
            </Card>
          </div>

          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Your Progress</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{conceptDetails.completionPercentage}%</p>
            </div>
            <Progress 
              value={conceptDetails.completionPercentage} 
              className="h-2 bg-gray-100 dark:bg-gray-800"
            />
          </div>
        </motion.div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm rounded-md"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="key-points"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm rounded-md"
            >
              Key Points
            </TabsTrigger>
            <TabsTrigger 
              value="formulas"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm rounded-md"
            >
              Formulas
            </TabsTrigger>
            <TabsTrigger 
              value="practice"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm rounded-md"
            >
              Practice
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Concept Overview</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{conceptDetails.content.overview}</p>
              </div>
            </Card>
            
            <Card className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                Examples
              </h2>
              <div className="grid gap-4">
                {conceptDetails.content.examples.map((example, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <h3 className="text-md font-medium mb-1 text-gray-900 dark:text-white">{example.title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{example.description}</p>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                <LayoutGrid className="h-5 w-5 mr-2 text-blue-500" />
                Related Concepts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conceptDetails.relatedConcepts.map((concept) => (
                  <Link 
                    key={concept.id}
                    to={`/dashboard/student/concepts/card/${concept.id}`}
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{concept.title}</span>
                  </Link>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="key-points" className="space-y-6">
            <Card className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Points to Remember</h2>
              <ul className="space-y-3">
                {(showAllKeyPoints ? conceptDetails.content.keyPoints : conceptDetails.content.keyPoints.slice(0, 3)).map((point, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
              {conceptDetails.content.keyPoints.length > 3 && (
                <Button 
                  variant="ghost" 
                  className="mt-4" 
                  onClick={() => setShowAllKeyPoints(!showAllKeyPoints)}
                >
                  {showAllKeyPoints ? 'Show Less' : 'Show More'}
                </Button>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="formulas" className="space-y-6">
            <Card className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Important Formulas</h2>
              <div className="space-y-6">
                {conceptDetails.content.formulas.map((formula, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <h3 className="text-md font-medium mb-2 text-gray-900 dark:text-white">{formula.name}</h3>
                    <div className="bg-white dark:bg-gray-900 p-3 rounded-md mb-3 font-mono text-center text-lg">
                      {formula.formula}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{formula.explanation}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button>
                  Open Formula Lab
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-6">
            <Card className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Practice Questions</h2>
              <div className="space-y-8">
                {conceptDetails.questions.map((question, qIndex) => (
                  <div key={qIndex} className="space-y-4">
                    <div className="flex items-start">
                      <span className="bg-gray-100 dark:bg-gray-800 rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium mr-2 mt-0.5">
                        {qIndex + 1}
                      </span>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white">{question.question}</h3>
                    </div>
                    <div className="ml-8 grid gap-2">
                      {question.options.map((option, oIndex) => (
                        <div 
                          key={oIndex} 
                          className={`p-3 rounded-lg border ${
                            option === question.correctAnswer 
                              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30' 
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs mr-2">
                              {String.fromCharCode(65 + oIndex)}
                            </span>
                            <span>{option}</span>
                            {option === question.correctAnswer && (
                              <Check className="h-4 w-4 text-green-500 ml-auto" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="ml-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="flex items-start">
                        <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI Tutor
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptCardDetailPage;
