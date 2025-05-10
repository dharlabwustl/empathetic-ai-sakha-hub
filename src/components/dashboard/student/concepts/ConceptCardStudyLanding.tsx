
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, FileText, Calculator, Brain, ArrowRight, BadgeCheck, Award, ChevronRight } from 'lucide-react';
import { SharedPageLayout } from '../../student/SharedPageLayout';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ConceptCardStudyLanding = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedImportance, setSelectedImportance] = useState('all');

  const handleCardClick = (id: string) => {
    navigate(`/dashboard/student/concepts/${id}`);
  };

  const handleFormulaLabClick = () => {
    navigate('/dashboard/student/formula-practice-lab');
  };

  // Sample concept cards data (in a real app, this would come from an API)
  const conceptCards = [
    {
      id: '1',
      title: 'Cell Structure and Functions',
      description: 'Learn about cell organelles and their functions in the cell.',
      subject: 'Biology',
      chapter: 'Cell Biology',
      importanceLevel: 'high',
      lastStudied: '2 days ago',
      masteryLevel: 85,
      relatedCards: ['3', '7'],
      examAppearance: 'High',
      interactiveCards: ['2', '5'],
      examCards: ['12', '15']
    },
    {
      id: '2',
      title: 'Newton\'s Laws of Motion',
      description: 'Study the three fundamental laws that explain the relationship between an object and the forces acting on it.',
      subject: 'Physics',
      chapter: 'Classical Mechanics',
      importanceLevel: 'high',
      lastStudied: '1 week ago',
      masteryLevel: 70,
      relatedCards: ['6', '8'],
      examAppearance: 'Very High',
      interactiveCards: ['9', '11'],
      examCards: ['14', '18']
    },
    {
      id: '3',
      title: 'Periodic Table',
      description: 'Understand the organization and trends in the periodic table of elements.',
      subject: 'Chemistry',
      chapter: 'Atomic Structure',
      importanceLevel: 'high',
      lastStudied: '3 days ago',
      masteryLevel: 65,
      relatedCards: ['4', '5'],
      examAppearance: 'Medium',
      interactiveCards: ['7', '8'],
      examCards: ['13', '16']
    },
    {
      id: '4',
      title: 'DNA Replication',
      description: 'The process by which DNA makes a copy of itself during cell division.',
      subject: 'Biology',
      chapter: 'Molecular Biology',
      importanceLevel: 'medium',
      lastStudied: '5 days ago',
      masteryLevel: 55,
      relatedCards: ['1', '9'],
      examAppearance: 'Medium',
      interactiveCards: ['3', '6'],
      examCards: ['11', '17']
    },
    {
      id: '5',
      title: 'Chemical Bonding',
      description: 'Learn about ionic, covalent, and other types of chemical bonds.',
      subject: 'Chemistry',
      chapter: 'Chemical Bonding',
      importanceLevel: 'high',
      lastStudied: 'Never',
      masteryLevel: 0,
      relatedCards: ['3', '10'],
      examAppearance: 'High',
      interactiveCards: ['1', '4'],
      examCards: ['10', '19']
    },
    {
      id: '6',
      title: 'Thermodynamics Laws',
      description: 'The fundamental laws governing energy transfer and transformation.',
      subject: 'Physics',
      chapter: 'Thermodynamics',
      importanceLevel: 'medium',
      lastStudied: '2 weeks ago',
      masteryLevel: 40,
      relatedCards: ['2', '12'],
      examAppearance: 'Medium',
      interactiveCards: ['10', '12'],
      examCards: ['20', '21']
    }
  ];

  // Filter concept cards based on search query and filters
  const filteredCards = conceptCards.filter(card => {
    const matchesQuery = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        card.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        card.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedSubject === 'all' || card.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    const matchesImportance = selectedImportance === 'all' || card.importanceLevel === selectedImportance;
    
    return matchesQuery && matchesSubject && matchesImportance;
  });

  return (
    <TooltipProvider>
      <SharedPageLayout
        title="Concept Cards"
        subtitle="Master key concepts through interactive learning"
        showBackButton={true}
      >
        <div className="space-y-6">
          {/* Tabs for different sections */}
          <Tabs defaultValue="concept-cards">
            <TabsList className="grid w-full grid-cols-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="concept-cards">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Concept Cards</span>
                    <span className="sm:hidden">Concepts</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Browse key concept cards</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="interactive">
                    <Brain className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Interactive Cards</span>
                    <span className="sm:hidden">Interactive</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Practice with interactive exercises</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="formula-lab">
                    <Calculator className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Formula Lab</span>
                    <span className="sm:hidden">Formulas</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Practice formulas with step-by-step solutions</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>

            {/* Content for Concept Cards tab */}
            <TabsContent value="concept-cards" className="space-y-4 pt-4">
              {/* Search and filters section */}
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search concepts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                  >
                    <SelectTrigger className="w-32 md:w-40">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={selectedImportance}
                    onValueChange={setSelectedImportance}
                  >
                    <SelectTrigger className="w-32 md:w-40">
                      <SelectValue placeholder="Importance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Concept Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="cursor-pointer hover:shadow-md transition-all border-l-4"
                      style={{
                        borderLeftColor: card.importanceLevel === 'high' ? '#ef4444' : 
                                        card.importanceLevel === 'medium' ? '#f59e0b' : '#22c55e'
                      }}
                      onClick={() => handleCardClick(card.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">{card.title}</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="text-xs">
                                {card.subject}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Subject: {card.subject}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <CardDescription className="text-xs">{card.chapter}</CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-sm line-clamp-2">{card.description}</p>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Mastery Level:</span>
                            <span className="font-medium">{card.masteryLevel}%</span>
                          </div>
                          
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-violet-500 h-2 rounded-full" 
                              style={{ width: `${card.masteryLevel}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 text-xs">
                          <div className="flex justify-between py-1">
                            <span className="text-gray-500 dark:text-gray-400">Last Studied:</span>
                            <span>{card.lastStudied}</span>
                          </div>
                          <div className="flex justify-between py-1 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-gray-500 dark:text-gray-400">Exam Frequency:</span>
                            <span className="font-medium">{card.examAppearance}</span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-0 flex justify-between">
                        <div className="text-xs text-gray-500 flex items-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center mr-2">
                                <FileText className="h-3 w-3 mr-1" />
                                <span>Exam: {card.examCards.length}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Related exam questions</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <Brain className="h-3 w-3 mr-1" />
                                <span>Interactive: {card.interactiveCards.length}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Interactive practice available</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">View concept details</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Content for Interactive Cards tab */}
            <TabsContent value="interactive" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-violet-600" />
                    Interactive Learning Cards
                  </CardTitle>
                  <CardDescription>
                    Enhance your understanding with interactive exercises and quizzes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Interactive learning cards will be displayed here. These cards contain exercises, quizzes, and other interactive elements to help you master the concepts.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content for Formula Lab tab */}
            <TabsContent value="formula-lab" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-violet-600" />
                    Formula Practice Lab
                  </CardTitle>
                  <CardDescription>
                    Master important formulas with interactive problem solving
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4 border border-violet-100 dark:border-violet-800/40">
                    <h3 className="text-lg font-medium text-violet-800 dark:text-violet-300 mb-2 flex items-center">
                      <BadgeCheck className="h-5 w-5 mr-2 text-violet-600 dark:text-violet-400" />
                      Why Practice Formulas?
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-violet-600 dark:text-violet-400 mr-2">•</span>
                        <span>Strengthen your problem-solving skills</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-violet-600 dark:text-violet-400 mr-2">•</span>
                        <span>See step-by-step solutions to understand the process</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-violet-600 dark:text-violet-400 mr-2">•</span>
                        <span>Practice with varying difficulty levels to build confidence</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-blue-800 dark:text-blue-300">Physics</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">Master key physics formulas:</p>
                        <ul className="text-xs space-y-1 text-blue-700 dark:text-blue-300">
                          <li>• Kinematics equations</li>
                          <li>• Newton's laws</li>
                          <li>• Work and energy</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-green-800 dark:text-green-300">Chemistry</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-green-600 dark:text-green-400 mb-2">Practice chemical equations:</p>
                        <ul className="text-xs space-y-1 text-green-700 dark:text-green-300">
                          <li>• Molarity calculations</li>
                          <li>• pH calculations</li>
                          <li>• Gas laws</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800/40">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base text-amber-800 dark:text-amber-300">Mathematics</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">Learn mathematical formulas:</p>
                        <ul className="text-xs space-y-1 text-amber-700 dark:text-amber-300">
                          <li>• Algebra equations</li>
                          <li>• Trigonometry</li>
                          <li>• Calculus basics</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            className="bg-gradient-to-r from-violet-600 to-indigo-600"
                            size="lg"
                            onClick={handleFormulaLabClick}
                          >
                            Open Formula Lab
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Practice with interactive formula problems</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SharedPageLayout>
    </TooltipProvider>
  );
};

export default ConceptCardStudyLanding;
