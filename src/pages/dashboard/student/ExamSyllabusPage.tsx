
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, BookOpen, Monitor, Calculator, FileText, ChevronDown, ChevronUp, CheckCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

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
            { id: "phy-1-1", name: "Newton's Laws of Motion", completed: true, importance: "high" },
            { id: "phy-1-2", name: "Work, Energy and Power", completed: true, importance: "high" },
            { id: "phy-1-3", name: "System of Particles & Rotational Motion", completed: true, importance: "medium" },
            { id: "phy-1-4", name: "Gravitation", completed: false, importance: "high" }
          ]
        },
        {
          id: "phy-2",
          name: "Thermodynamics",
          progress: 60,
          topics: [
            { id: "phy-2-1", name: "Thermal Properties of Matter", completed: true, importance: "medium" },
            { id: "phy-2-2", name: "Thermodynamics Laws", completed: false, importance: "high" },
            { id: "phy-2-3", name: "Kinetic Theory of Gases", completed: false, importance: "medium" }
          ]
        },
        {
          id: "phy-3",
          name: "Electrodynamics",
          progress: 40,
          topics: [
            { id: "phy-3-1", name: "Electric Charges & Fields", completed: true, importance: "high" },
            { id: "phy-3-2", name: "Electrostatic Potential & Capacitance", completed: false, importance: "high" },
            { id: "phy-3-3", name: "Current Electricity", completed: false, importance: "high" }
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
            { id: "chem-1-1", name: "States of Matter", completed: true, importance: "high" },
            { id: "chem-1-2", name: "Atomic Structure", completed: true, importance: "high" },
            { id: "chem-1-3", name: "Chemical Bonding", completed: false, importance: "high" }
          ]
        },
        {
          id: "chem-2",
          name: "Organic Chemistry",
          progress: 35,
          topics: [
            { id: "chem-2-1", name: "Hydrocarbons", completed: true, importance: "high" },
            { id: "chem-2-2", name: "Alcohols, Phenols & Ethers", completed: false, importance: "high" },
            { id: "chem-2-3", name: "Organic Compounds with Functional Groups", completed: false, importance: "medium" }
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
            { id: "bio-1-1", name: "The Living World", completed: true, importance: "medium" },
            { id: "bio-1-2", name: "Biological Classification", completed: true, importance: "high" },
            { id: "bio-1-3", name: "Plant Kingdom", completed: true, importance: "high" }
          ]
        },
        {
          id: "bio-2",
          name: "Structural Organisation",
          progress: 75,
          topics: [
            { id: "bio-2-1", name: "Morphology of Flowering Plants", completed: true, importance: "medium" },
            { id: "bio-2-2", name: "Anatomy of Flowering Plants", completed: true, importance: "medium" },
            { id: "bio-2-3", name: "Animal Tissues", completed: false, importance: "high" }
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
                            <div key={topic.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                              <div className="flex items-center">
                                <Checkbox id={topic.id} checked={topic.completed} />
                                <label htmlFor={topic.id} className="ml-2 cursor-pointer text-sm">
                                  {topic.name}
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={topic.importance === 'high' ? "destructive" : "outline"}>
                                  {topic.importance === 'high' ? 'High Priority' : 'Medium Priority'}
                                </Badge>
                                <div className="flex items-center text-xs text-gray-500">
                                  {topic.completed ? 
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> : 
                                    <Clock className="h-4 w-4 text-amber-500 mr-1" />
                                  }
                                  {topic.completed ? 'Completed' : 'Pending'}
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
                <a href="/dashboard/student/concepts">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Concept Cards
                </a>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <a href="/dashboard/student/flashcards">
                  <FileText className="h-4 w-4 mr-2" />
                  Flashcards
                </a>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <a href="/dashboard/student/practice-exam">
                  <Monitor className="h-4 w-4 mr-2" />
                  Practice Tests
                </a>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left" asChild>
                <a href="/dashboard/student/formula-practice-lab">
                  <Calculator className="h-4 w-4 mr-2" />
                  Formula Lab
                </a>
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
        </div>
      </div>
    </div>
  );
};

export default ExamSyllabusPage;
