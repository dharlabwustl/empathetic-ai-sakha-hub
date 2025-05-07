
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, BookOpen, Check, ChevronRight, Download, BookMarked, Brain, FileText, AlertTriangle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

const ExamSyllabusPage = () => {
  const [activeSubject, setActiveSubject] = useState('physics');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState<boolean>(false);
  const [sortType, setSortType] = useState<'default' | 'difficulty' | 'importance'>('default');
  
  // Mock data for display
  const examName = "NEET 2024";
  
  const subjects = [
    { id: 'physics', name: 'Physics', totalTopics: 32, completedTopics: 14, color: 'bg-blue-500', weightage: '25%' },
    { id: 'chemistry', name: 'Chemistry', totalTopics: 28, completedTopics: 8, color: 'bg-purple-500', weightage: '25%' },
    { id: 'biology', name: 'Biology', totalTopics: 40, completedTopics: 22, color: 'bg-green-500', weightage: '50%' }
  ];
  
  const chaptersBySubject = {
    physics: [
      { 
        id: 'physics-1',
        name: 'Mechanics', 
        completionPercentage: 85,
        importance: 'high',
        examWeightage: '30%',
        topics: [
          { id: 'p1-t1', name: 'Newton\'s Laws of Motion', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'p1-t2', name: 'Work, Energy & Power', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'p1-t3', name: 'Rotational Motion', completed: false, difficulty: 'hard', importance: 'medium' },
          { id: 'p1-t4', name: 'Gravitation', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'p1-t5', name: 'Properties of Solids and Liquids', completed: false, difficulty: 'medium', importance: 'medium' },
        ]
      },
      { 
        id: 'physics-2',
        name: 'Electrodynamics', 
        completionPercentage: 60,
        importance: 'high',
        examWeightage: '25%',
        topics: [
          { id: 'p2-t1', name: 'Electric Charges and Fields', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'p2-t2', name: 'Electrostatic Potential and Capacitance', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'p2-t3', name: 'Current Electricity', completed: false, difficulty: 'hard', importance: 'high' },
          { id: 'p2-t4', name: 'Moving Charges and Magnetism', completed: false, difficulty: 'hard', importance: 'medium' },
        ]
      },
      { 
        id: 'physics-3',
        name: 'Optics & Modern Physics', 
        completionPercentage: 30,
        importance: 'medium',
        examWeightage: '20%',
        topics: [
          { id: 'p3-t1', name: 'Wave Optics', completed: false, difficulty: 'hard', importance: 'high' },
          { id: 'p3-t2', name: 'Ray Optics', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'p3-t3', name: 'Dual Nature of Matter', completed: false, difficulty: 'hard', importance: 'medium' },
          { id: 'p3-t4', name: 'Atoms & Nuclei', completed: false, difficulty: 'medium', importance: 'medium' },
        ]
      }
    ],
    chemistry: [
      { 
        id: 'chemistry-1',
        name: 'Physical Chemistry', 
        completionPercentage: 50,
        importance: 'high',
        examWeightage: '30%',
        topics: [
          { id: 'c1-t1', name: 'Basic Concepts', completed: true, difficulty: 'easy', importance: 'high' },
          { id: 'c1-t2', name: 'States of Matter', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'c1-t3', name: 'Atomic Structure', completed: false, difficulty: 'medium', importance: 'high' },
          { id: 'c1-t4', name: 'Chemical Bonding', completed: false, difficulty: 'hard', importance: 'high' },
        ]
      },
      { 
        id: 'chemistry-2',
        name: 'Organic Chemistry', 
        completionPercentage: 20,
        importance: 'high',
        examWeightage: '40%',
        topics: [
          { id: 'c2-t1', name: 'Hydrocarbons', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'c2-t2', name: 'Alcohols and Ethers', completed: false, difficulty: 'medium', importance: 'high' },
          { id: 'c2-t3', name: 'Aldehydes and Ketones', completed: false, difficulty: 'hard', importance: 'high' },
        ]
      }
    ],
    biology: [
      { 
        id: 'biology-1',
        name: 'Diversity in Living World', 
        completionPercentage: 75,
        importance: 'medium',
        examWeightage: '15%',
        topics: [
          { id: 'b1-t1', name: 'The Living World', completed: true, difficulty: 'easy', importance: 'medium' },
          { id: 'b1-t2', name: 'Biological Classification', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'b1-t3', name: 'Plant Kingdom', completed: true, difficulty: 'medium', importance: 'medium' },
          { id: 'b1-t4', name: 'Animal Kingdom', completed: false, difficulty: 'hard', importance: 'high' },
        ]
      },
      { 
        id: 'biology-2',
        name: 'Cell Structure & Function', 
        completionPercentage: 90,
        importance: 'high',
        examWeightage: '20%',
        topics: [
          { id: 'b2-t1', name: 'Cell: The Unit of Life', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'b2-t2', name: 'Biomolecules', completed: true, difficulty: 'hard', importance: 'high' },
          { id: 'b2-t3', name: 'Cell Cycle and Division', completed: true, difficulty: 'hard', importance: 'high' },
        ]
      },
      { 
        id: 'biology-3',
        name: 'Human Physiology', 
        completionPercentage: 60,
        importance: 'high',
        examWeightage: '30%',
        topics: [
          { id: 'b3-t1', name: 'Digestion and Absorption', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'b3-t2', name: 'Breathing and Exchange of Gases', completed: true, difficulty: 'medium', importance: 'high' },
          { id: 'b3-t3', name: 'Body Fluids and Circulation', completed: false, difficulty: 'hard', importance: 'high' },
          { id: 'b3-t4', name: 'Excretory Products', completed: false, difficulty: 'medium', importance: 'medium' },
        ]
      }
    ]
  };
  
  // Calculate overall progress
  const currentSubject = subjects.find(sub => sub.id === activeSubject);
  const totalTopics = currentSubject?.totalTopics || 0;
  const completedTopics = currentSubject?.completedTopics || 0;
  const progressPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  
  // Get active subject chapters
  const activeSubjectChapters = chaptersBySubject[activeSubject as keyof typeof chaptersBySubject] || [];
  
  // Filter and sort topics based on user selection
  const filterAndSortTopics = (chapters: any[]) => {
    return chapters.map(chapter => {
      const filteredTopics = chapter.topics.filter((topic: any) => {
        // Filter by search term
        const matchesSearch = searchTerm.length === 0 || 
          topic.name.toLowerCase().includes(searchTerm.toLowerCase());
          
        // Filter by completion status
        const matchesCompletion = !filterCompleted || topic.completed;
        
        return matchesSearch && matchesCompletion;
      });
      
      // Sort topics based on selection
      let sortedTopics = [...filteredTopics];
      if (sortType === 'difficulty') {
        sortedTopics.sort((a, b) => {
          const difficultyOrder: {[key: string]: number} = {hard: 0, medium: 1, easy: 2};
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
      } else if (sortType === 'importance') {
        sortedTopics.sort((a, b) => {
          const importanceOrder: {[key: string]: number} = {high: 0, medium: 1, low: 2};
          return importanceOrder[a.importance] - importanceOrder[b.importance];
        });
      }
      
      return {...chapter, topics: sortedTopics};
    });
  };
  
  const filteredChapters = filterAndSortTopics(activeSubjectChapters);
  
  return (
    <SharedPageLayout
      title="Exam Syllabus"
      subtitle={`Complete syllabus breakdown for ${examName}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Subject Selection Tabs */}
        <Tabs defaultValue={activeSubject} value={activeSubject} onValueChange={setActiveSubject}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              {subjects.map(subject => (
                <TabsTrigger key={subject.id} value={subject.id} className="px-6">
                  {subject.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Syllabus PDF
            </Button>
          </div>
          
          {/* Subject Overview Cards */}
          {subjects.map(subject => (
            <TabsContent key={subject.id} value={subject.id}>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Subject</span>
                      <span className="text-2xl font-bold">{subject.name}</span>
                      <Badge className={`mt-2 w-fit ${subject.color.replace('bg-', 'bg-opacity-15 text-')}`}>
                        Weightage: {subject.weightage}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Completion</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{Math.round((subject.completedTopics / subject.totalTopics) * 100)}%</span>
                        <span className="text-muted-foreground">({subject.completedTopics}/{subject.totalTopics} topics)</span>
                      </div>
                      <Progress value={(subject.completedTopics / subject.totalTopics) * 100} className="h-2 mt-2" />
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Recommended Focus</span>
                      <span className="text-xl font-medium">Electrodynamics</span>
                      <span className="text-sm text-muted-foreground mt-1">Based on your weak areas</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="default" className="flex-1" asChild>
                        <Link to={`/dashboard/student/concepts?subject=${subject.name}`}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Study
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link to={`/dashboard/student/practice?subject=${subject.name}`}>
                          <FileText className="h-4 w-4 mr-2" />
                          Practice
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Search and Filter Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search topics..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={sortType} onValueChange={(value: any) => setSortType(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="difficulty">Difficulty</SelectItem>
                      <SelectItem value="importance">Importance</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="completed" 
                      checked={filterCompleted} 
                      onCheckedChange={(checked) => setFilterCompleted(!!checked)} 
                    />
                    <label htmlFor="completed" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Show Completed
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Chapters and Topics Section */}
              <div className="space-y-6">
                {filteredChapters.map(chapter => (
                  <Card key={chapter.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{chapter.name}</CardTitle>
                          <CardDescription>
                            Exam weightage: {chapter.examWeightage} • 
                            Importance: <span className={`${chapter.importance === 'high' ? 'text-red-500' : chapter.importance === 'medium' ? 'text-amber-500' : 'text-green-500'}`}>
                              {chapter.importance.charAt(0).toUpperCase() + chapter.importance.slice(1)}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{chapter.completionPercentage}% Complete</div>
                          <Progress value={chapter.completionPercentage} className="h-2 w-[100px] mt-1" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Accordion type="multiple" className="w-full">
                        <AccordionItem value={`topics-${chapter.id}`}>
                          <AccordionTrigger>
                            <span className="text-sm font-medium">Topics ({chapter.topics.length})</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {chapter.topics.length === 0 && (
                                <div className="text-center py-4 text-muted-foreground">
                                  No topics match your filter criteria
                                </div>
                              )}
                              
                              {chapter.topics.map((topic: any) => (
                                <div 
                                  key={topic.id} 
                                  className={`p-3 rounded-md border flex justify-between items-center gap-4 ${
                                    topic.completed ? 'bg-green-50 border-green-100' : 'bg-white border-gray-200'
                                  }`}
                                >
                                  <div className="flex gap-3 items-center">
                                    {topic.completed ? (
                                      <Check className="h-5 w-5 text-green-500" />
                                    ) : (
                                      <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                                    )}
                                    <div>
                                      <div className="font-medium">{topic.name}</div>
                                      <div className="flex gap-2 mt-1">
                                        <Badge variant="outline" className={
                                          topic.difficulty === 'hard' ? 'bg-red-50 text-red-700 border-red-200' :
                                          topic.difficulty === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                          'bg-green-50 text-green-700 border-green-200'
                                        }>
                                          {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                                        </Badge>
                                        <Badge variant="outline" className={
                                          topic.importance === 'high' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                          topic.importance === 'medium' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                          'bg-gray-50 text-gray-700 border-gray-200'
                                        }>
                                          {topic.importance === 'high' ? 'High Priority' : 
                                           topic.importance === 'medium' ? 'Medium Priority' : 'Low Priority'}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" asChild>
                                      <Link to={`/dashboard/student/concepts?topic=${topic.name}`}>
                                        <BookMarked className="h-4 w-4 mr-1" />
                                        <span className="hidden sm:inline">Study</span>
                                      </Link>
                                    </Button>
                                    <Button size="sm" variant="outline" asChild>
                                      <Link to={`/dashboard/student/flashcards?topic=${topic.name}`}>
                                        <Brain className="h-4 w-4 mr-1" />
                                        <span className="hidden sm:inline">Review</span>
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Strategic Study Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Strategic Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-md">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900">Focus on Your Weak Areas</h4>
                  <p className="text-amber-800 text-sm">Our analysis shows you should focus on Current Electricity and Magnetism topics next.</p>
                </div>
              </div>
              
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">Suggested Study Schedule</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>This Week:</span>
                        <span className="font-medium">Current Electricity</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Next Week:</span>
                        <span className="font-medium">Moving Charges and Magnetism</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Week 3:</span>
                        <span className="font-medium">Wave Optics</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">High Impact Topics</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Electrodynamics</span>
                        <span className="font-medium text-red-600">25% weightage</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Modern Physics</span>
                        <span className="font-medium text-amber-600">15% weightage</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Mechanics</span>
                        <span className="font-medium text-green-600">30% weightage</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">Study Resources</h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-between">
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Concept Notes
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-between">
                        <span className="flex items-center">
                          <Brain className="h-4 w-4 mr-2" />
                          Formula Flashcards
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-between">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Practice Questions
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default ExamSyllabusPage;
