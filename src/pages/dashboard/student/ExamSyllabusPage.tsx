import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, BookOpen, Monitor, Calculator, ChevronDown, ChevronUp, 
  Check, Clock, FileText, Info, Brain, Flame, BookOpenCheck, ListChecks, Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data for the syllabus
const examSyllabus = {
  examName: "NEET 2023",
  sections: [
    {
      id: "physics",
      name: "Physics",
      progress: 65,
      totalTopics: 42,
      completedTopics: 27,
      chapters: [
        {
          id: "phy-1",
          name: "Mechanics",
          progress: 80,
          topics: [
            { 
              id: "phy-1-1", 
              name: "Newton's Laws of Motion", 
              completed: true, 
              importance: "high",
              conceptIds: ["newtons-laws", "force-motion"],
              flashcardIds: ["newton-flash-1", "newton-flash-2"],
              examIds: ["mechanics-test-1"],
              progress: 85,
              key_concepts: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law"]
            },
            { 
              id: "phy-1-2", 
              name: "Work, Energy and Power", 
              completed: true, 
              importance: "high",
              conceptIds: ["work-energy"],
              flashcardIds: ["energy-flash-1"],
              examIds: ["energy-test-1"],
              progress: 75,
              key_concepts: ["Conservation of Energy", "Work-Energy Theorem"]
            },
            { 
              id: "phy-1-3", 
              name: "System of Particles & Rotational Motion", 
              completed: true, 
              importance: "medium",
              conceptIds: ["rotational-motion"],
              flashcardIds: ["rotation-flash-1"],
              examIds: ["rotation-test-1"],
              progress: 60,
              key_concepts: ["Torque", "Angular Momentum", "Moment of Inertia"]
            },
            { 
              id: "phy-1-4", 
              name: "Gravitation", 
              completed: false, 
              importance: "high",
              conceptIds: ["gravitation"],
              flashcardIds: ["gravity-flash-1"],
              examIds: ["gravity-test-1"],
              progress: 40,
              key_concepts: ["Newton's Law of Gravitation", "Kepler's Laws", "Gravitational Potential"]
            }
          ]
        },
        {
          id: "phy-2",
          name: "Thermodynamics",
          progress: 60,
          topics: [
            { 
              id: "phy-2-1", 
              name: "Thermal Properties of Matter", 
              completed: true, 
              importance: "medium",
              conceptIds: ["thermal-properties"],
              flashcardIds: ["thermal-flash-1"],
              examIds: ["thermal-test-1"],
              progress: 70,
              key_concepts: ["Temperature", "Heat Capacity", "Thermal Expansion"]
            },
            { 
              id: "phy-2-2", 
              name: "Thermodynamics Laws", 
              completed: false, 
              importance: "high",
              conceptIds: ["thermo-laws"],
              flashcardIds: ["thermo-flash-1"],
              examIds: ["thermo-test-1"],
              progress: 50,
              key_concepts: ["First Law", "Second Law", "Entropy"]
            },
            { 
              id: "phy-2-3", 
              name: "Kinetic Theory of Gases", 
              completed: false, 
              importance: "medium",
              conceptIds: ["kinetic-theory"],
              flashcardIds: ["kinetic-flash-1"],
              examIds: ["kinetic-test-1"],
              progress: 30,
              key_concepts: ["Maxwell's Distribution", "Mean Free Path", "Degrees of Freedom"]
            }
          ]
        },
        {
          id: "phy-3",
          name: "Electrodynamics",
          progress: 40,
          topics: [
            { 
              id: "phy-3-1", 
              name: "Electric Charges & Fields", 
              completed: true, 
              importance: "high",
              conceptIds: ["electric-fields"],
              flashcardIds: ["electric-flash-1"],
              examIds: ["electric-test-1"],
              progress: 75,
              key_concepts: ["Coulomb's Law", "Electric Field", "Gauss's Law"]
            },
            { 
              id: "phy-3-2", 
              name: "Electrostatic Potential & Capacitance", 
              completed: false, 
              importance: "high",
              conceptIds: ["capacitance"],
              flashcardIds: ["capacitance-flash-1"],
              examIds: ["capacitance-test-1"],
              progress: 45,
              key_concepts: ["Electric Potential", "Capacitors", "Dielectrics"]
            },
            { 
              id: "phy-3-3", 
              name: "Current Electricity", 
              completed: false, 
              importance: "high",
              conceptIds: ["current-elec"],
              flashcardIds: ["current-flash-1"],
              examIds: ["current-test-1"],
              progress: 20,
              key_concepts: ["Ohm's Law", "Kirchhoff's Laws", "Electrical Resistivity"]
            }
          ]
        }
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      progress: 45,
      totalTopics: 38,
      completedTopics: 17,
      chapters: [
        {
          id: "chem-1",
          name: "Physical Chemistry",
          progress: 60,
          topics: [
            { 
              id: "chem-1-1", 
              name: "States of Matter", 
              completed: true, 
              importance: "high",
              conceptIds: ["states-matter"],
              flashcardIds: ["matter-flash-1"],
              examIds: ["matter-test-1"],
              progress: 80,
              key_concepts: ["Gas Laws", "Liquid State", "Solid State"]
            },
            { 
              id: "chem-1-2", 
              name: "Atomic Structure", 
              completed: true, 
              importance: "high",
              conceptIds: ["atomic-structure"],
              flashcardIds: ["atom-flash-1"],
              examIds: ["atom-test-1"],
              progress: 90,
              key_concepts: ["Bohr's Model", "Quantum Numbers", "Electronic Configuration"]
            },
            { 
              id: "chem-1-3", 
              name: "Chemical Bonding", 
              completed: false, 
              importance: "high",
              conceptIds: ["chemical-bonding"],
              flashcardIds: ["bond-flash-1"],
              examIds: ["bonding-test-1"],
              progress: 40,
              key_concepts: ["Ionic Bonding", "Covalent Bonding", "Molecular Orbital Theory"]
            }
          ]
        },
        {
          id: "chem-2",
          name: "Organic Chemistry",
          progress: 35,
          topics: [
            { 
              id: "chem-2-1", 
              name: "Hydrocarbons", 
              completed: true, 
              importance: "high",
              conceptIds: ["hydrocarbons"],
              flashcardIds: ["hydrocarbon-flash-1"],
              examIds: ["hydrocarbon-test-1"],
              progress: 65,
              key_concepts: ["Alkanes", "Alkenes", "Alkynes", "Aromatic Compounds"]
            },
            { 
              id: "chem-2-2", 
              name: "Alcohols, Phenols & Ethers", 
              completed: false, 
              importance: "high",
              conceptIds: ["alcohols-phenols"],
              flashcardIds: ["alcohols-flash-1"],
              examIds: ["alcohols-test-1"],
              progress: 35,
              key_concepts: ["Properties of Alcohols", "Reactions of Phenols", "Ethers Synthesis"]
            },
            { 
              id: "chem-2-3", 
              name: "Organic Compounds with Functional Groups", 
              completed: false, 
              importance: "medium",
              conceptIds: ["functional-groups"],
              flashcardIds: ["functional-flash-1"],
              examIds: ["functional-test-1"],
              progress: 20,
              key_concepts: ["Aldehydes & Ketones", "Carboxylic Acids", "Amines"]
            }
          ]
        }
      ]
    },
    {
      id: "biology",
      name: "Biology",
      progress: 70,
      totalTopics: 45,
      completedTopics: 31,
      chapters: [
        {
          id: "bio-1",
          name: "Diversity in Living World",
          progress: 90,
          topics: [
            { 
              id: "bio-1-1", 
              name: "The Living World", 
              completed: true, 
              importance: "medium",
              conceptIds: ["living-world"],
              flashcardIds: ["living-flash-1"],
              examIds: ["living-test-1"],
              progress: 95,
              key_concepts: ["Taxonomy", "Biodiversity", "Classification Systems"]
            },
            { 
              id: "bio-1-2", 
              name: "Biological Classification", 
              completed: true, 
              importance: "high",
              conceptIds: ["bio-classification"],
              flashcardIds: ["classification-flash-1"],
              examIds: ["classification-test-1"],
              progress: 85,
              key_concepts: ["Five Kingdoms", "Viruses", "Bacteria", "Protista"]
            },
            { 
              id: "bio-1-3", 
              name: "Plant Kingdom", 
              completed: true, 
              importance: "high",
              conceptIds: ["plant-kingdom"],
              flashcardIds: ["plant-flash-1"],
              examIds: ["plant-test-1"],
              progress: 80,
              key_concepts: ["Algae", "Bryophytes", "Pteridophytes", "Gymnosperms", "Angiosperms"]
            }
          ]
        },
        {
          id: "bio-2",
          name: "Structural Organisation",
          progress: 75,
          topics: [
            { 
              id: "bio-2-1", 
              name: "Morphology of Flowering Plants", 
              completed: true, 
              importance: "medium",
              conceptIds: ["flower-morphology"],
              flashcardIds: ["morphology-flash-1"],
              examIds: ["morphology-test-1"],
              progress: 90,
              key_concepts: ["Root", "Stem", "Leaf", "Flower", "Fruit", "Seed"]
            },
            { 
              id: "bio-2-2", 
              name: "Anatomy of Flowering Plants", 
              completed: true, 
              importance: "medium",
              conceptIds: ["flower-anatomy"],
              flashcardIds: ["anatomy-flash-1"],
              examIds: ["anatomy-test-1"],
              progress: 75,
              key_concepts: ["Tissues", "Tissue Systems", "Secondary Growth"]
            },
            { 
              id: "bio-2-3", 
              name: "Animal Tissues", 
              completed: false, 
              importance: "high",
              conceptIds: ["animal-tissues"],
              flashcardIds: ["tissues-flash-1"],
              examIds: ["tissues-test-1"],
              progress: 60,
              key_concepts: ["Epithelial Tissue", "Connective Tissue", "Muscular Tissue", "Neural Tissue"]
            }
          ]
        }
      ]
    }
  ],
  recentActivity: [
    { id: 1, topic: "Thermodynamics Laws", date: "Yesterday", progress: 60 },
    { id: 2, topic: "Chemical Bonding", date: "2 days ago", progress: 40 },
    { id: 3, topic: "Cell Biology", date: "3 days ago", progress: 90 }
  ],
  upcomingMilestones: [
    { id: 1, milestone: "Complete Physics Syllabus", deadline: "10 days", progress: 65 },
    { id: 2, milestone: "Chemistry Mid-Term Test", deadline: "15 days", progress: 45 },
    { id: 3, milestone: "Full Biology Revision", deadline: "20 days", progress: 70 }
  ]
};

const ExamSyllabusPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(examSyllabus.sections[0].id);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    [examSyllabus.sections[0].chapters[0].id]: true
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTopic, setCurrentTopic] = useState<any>(null);
  const [showTopicDialog, setShowTopicDialog] = useState(false);
  
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const filteredSection = examSyllabus.sections.find(section => section.id === activeSection);
  
  const filteredChapters = filteredSection?.chapters.filter(chapter => {
    if (!searchTerm) return true;
    
    // Search in chapter name
    if (chapter.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    
    // Search in topics
    return chapter.topics.some(topic => 
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleTopicClick = (topic: any) => {
    setCurrentTopic(topic);
    setShowTopicDialog(true);
  };
  
  const handleMarkCompleted = (topicId: string) => {
    // In a real app, this would update the database
    toast({
      title: "Topic marked as completed",
      description: "Your progress has been updated.",
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{examSyllabus.examName} Syllabus</h1>
          <p className="text-gray-500 mt-1">Track your progress through the entire exam curriculum.</p>
        </div>
        <Button className="mt-4 md:mt-0" variant="default">
          <FileText className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>
      
      <Tabs defaultValue={activeSection} onValueChange={setActiveSection} className="mb-8">
        <TabsList className="w-full justify-start overflow-auto">
          {examSyllabus.sections.map(section => (
            <TabsTrigger 
              key={section.id} 
              value={section.id}
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              {section.name} ({section.completedTopics}/{section.totalTopics})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{filteredSection?.name} Topics</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search topics..."
                    className="pl-9 w-full md:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="font-medium mr-2">Overall Progress:</span>
                <div className="w-full max-w-md flex items-center">
                  <Progress value={filteredSection?.progress} className="h-2 mr-2" />
                  <span className="text-xs font-semibold">{filteredSection?.progress}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredChapters?.map(chapter => (
                  <div key={chapter.id} className="border border-gray-100 rounded-lg">
                    <div 
                      className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleChapter(chapter.id)}
                    >
                      <div className="flex items-center">
                        <div className="mr-2">
                          {expandedChapters[chapter.id] ? 
                            <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          }
                        </div>
                        <h3 className="font-medium">{chapter.name}</h3>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-sm text-gray-500">
                          {chapter.topics.filter(t => t.completed).length}/{chapter.topics.length} topics
                        </div>
                        <div className="w-20 flex items-center">
                          <Progress value={chapter.progress} className="h-2 mr-2" />
                          <span className="text-xs font-semibold">{chapter.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {expandedChapters[chapter.id] && (
                      <div className="p-3 pt-0 pl-10 border-t border-gray-100">
                        <div className="space-y-2">
                          {chapter.topics.map(topic => (
                            <div 
                              key={topic.id} 
                              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                              onClick={() => handleTopicClick(topic)}
                            >
                              <div className="flex items-center">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div>
                                        <Checkbox 
                                          id={topic.id} 
                                          checked={topic.completed} 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleMarkCompleted(topic.id);
                                          }}
                                        />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                      <p>Mark as {topic.completed ? "incomplete" : "completed"}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <label htmlFor={topic.id} className="ml-2 cursor-pointer text-sm flex items-center">
                                  {topic.name}
                                  <div className="ml-2 hidden md:flex flex-wrap gap-1">
                                    {topic.conceptIds && topic.conceptIds.length > 0 && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                                              <BookOpen className="h-3 w-3 mr-1" />
                                              {topic.conceptIds.length}
                                            </Badge>
                                          </TooltipTrigger>
                                          <TooltipContent side="top">
                                            <p>{topic.conceptIds.length} Concept Cards available</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                    {topic.flashcardIds && topic.flashcardIds.length > 0 && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                                              <Brain className="h-3 w-3 mr-1" />
                                              {topic.flashcardIds.length}
                                            </Badge>
                                          </TooltipTrigger>
                                          <TooltipContent side="top">
                                            <p>{topic.flashcardIds.length} Flashcard sets available</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                    {topic.examIds && topic.examIds.length > 0 && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                              <Monitor className="h-3 w-3 mr-1" />
                                              {topic.examIds.length}
                                            </Badge>
                                          </TooltipTrigger>
                                          <TooltipContent side="top">
                                            <p>{topic.examIds.length} Practice exams available</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </div>
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={topic.importance === 'high' ? "destructive" : "outline"}>
                                  {topic.importance === 'high' ? 'High Priority' : 'Medium Priority'}
                                </Badge>
                                <div className="flex items-center space-x-2">
                                  <div className="hidden sm:flex items-center">
                                    <Progress value={topic.progress} className="w-16 h-1.5 mr-1.5" />
                                    <span className="text-xs">{topic.progress}%</span>
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500">
                                    {topic.completed ? 
                                      <Check className="h-4 w-4 text-green-500 mr-1" /> : 
                                      <Clock className="h-4 w-4 text-amber-500 mr-1" />
                                    }
                                    {topic.completed ? 'Completed' : 'Pending'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {filteredChapters?.length === 0 && (
                  <div className="text-center p-8 text-gray-500">
                    No chapters found for the search term "{searchTerm}".
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <Link to="/dashboard/student/concepts">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Concept Cards
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <Link to="/dashboard/student/flashcards">
                  <Brain className="h-4 w-4 mr-2" />
                  Flashcards
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <Link to="/dashboard/student/practice-exam">
                  <Monitor className="h-4 w-4 mr-2" />
                  Practice Tests
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <Link to="/dashboard/student/formula-practice-lab">
                  <Calculator className="h-4 w-4 mr-2" />
                  Formula Lab
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <Link to="/dashboard/student/previous-year">
                  <ListChecks className="h-4 w-4 mr-2" />
                  Previous Year Analysis
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examSyllabus.recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{activity.topic}</h4>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    <div className="w-12 flex items-center">
                      <Progress value={activity.progress} className="h-1.5 mr-1.5" />
                      <span className="text-xs">{activity.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examSyllabus.upcomingMilestones.map(milestone => (
                  <div key={milestone.id} className="border-l-4 border-blue-500 pl-3 py-1">
                    <h4 className="font-medium text-sm">{milestone.milestone}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">Due: {milestone.deadline}</p>
                      <p className="text-xs font-medium">{milestone.progress}% done</p>
                    </div>
                    <Progress value={milestone.progress} className="h-1.5 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-100">
            <CardHeader>
              <CardTitle className="text-lg text-indigo-800">Study Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="text-sm text-indigo-700">
                    Focus on high priority topics first, especially those with lower completion progress.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    <BookOpenCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm text-indigo-700">
                    Combine concept cards with flashcard practice for better retention.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1">
                    <Calculator className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-indigo-700">
                    Practice formulas regularly using the Formula Lab for numeric topics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Topic Detail Dialog */}
      <Dialog open={showTopicDialog} onOpenChange={setShowTopicDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{currentTopic?.name}</DialogTitle>
            <DialogDescription>
              Explore study resources for this topic
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between">
              <Badge variant={currentTopic?.importance === 'high' ? "destructive" : "outline"}>
                {currentTopic?.importance === 'high' ? 'High Priority' : 'Medium Priority'}
              </Badge>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Progress:</span>
                <Progress value={currentTopic?.progress} className="w-24 h-2 mr-2" />
                <span className="text-sm font-medium">{currentTopic?.progress}%</span>
              </div>
            </div>
            
            {currentTopic?.key_concepts && (
              <div>
                <h3 className="text-sm font-medium mb-2">Key Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {currentTopic.key_concepts.map((concept: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-gray-50">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentTopic?.conceptIds && currentTopic.conceptIds.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-1 text-blue-600" />
                    Concept Cards
                  </h3>
                  <div className="space-y-2">
                    {currentTopic.conceptIds.map((id: string, i: number) => (
                      <Button 
                        key={i}
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-left"
                        asChild
                      >
                        <Link to={`/dashboard/student/concepts/${id}`}>
                          <span className="truncate">Concept: {id.split('-').join(' ')}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {currentTopic?.flashcardIds && currentTopic.flashcardIds.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Brain className="h-4 w-4 mr-1 text-purple-600" />
                    Flashcards
                  </h3>
                  <div className="space-y-2">
                    {currentTopic.flashcardIds.map((id: string, i: number) => (
                      <Button 
                        key={i}
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-left"
                        asChild
                      >
                        <Link to={`/dashboard/student/flashcards/${id}`}>
                          <span className="truncate">Flashcards: {id.split('-').join(' ')}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {currentTopic?.examIds && currentTopic.examIds.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <Monitor className="h-4 w-4 mr-1 text-green-600" />
                    Practice Exams
                  </h3>
                  <div className="space-y-2">
                    {currentTopic.examIds.map((id: string, i: number) => (
                      <Button 
                        key={i}
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-left"
                        asChild
                      >
                        <Link to={`/dashboard/student/practice-exam/${id}/start`}>
                          <span className="truncate">Exam: {id.split('-').join(' ')}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">
                Study Plan
              </h3>
              <div className="border rounded-md p-3 bg-gray-50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                      <span>Read concept cards</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/student/concepts/${currentTopic?.conceptIds?.[0] || ''}`}>
                        Start
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calculator className="h-4 w-4 mr-2 text-amber-600" />
                      <span>Practice formulas</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/dashboard/student/formula-practice-lab">
                        Start
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 mr-2 text-purple-600" />
                      <span>Review with flashcards</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/student/flashcards/${currentTopic?.flashcardIds?.[0] || ''}`}>
                        Start
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Monitor className="h-4 w-4 mr-2 text-green-600" />
                      <span>Take practice exam</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/dashboard/student/practice-exam/${currentTopic?.examIds?.[0] || ''}/start`}>
                        Start
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="default"
                onClick={() => {
                  handleMarkCompleted(currentTopic?.id);
                  setShowTopicDialog(false);
                }}
              >
                Mark as {currentTopic?.completed ? "Incomplete" : "Completed"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamSyllabusPage;
