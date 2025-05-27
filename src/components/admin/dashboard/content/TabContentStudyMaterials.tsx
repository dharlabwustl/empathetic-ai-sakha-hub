
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Tag, BookOpen, Trophy, Target, Star, TrendingUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TabContentStudyMaterialsProps {
  handleUpload: () => void;
  handleContentAction: (action: string, title: string) => void;
}

const TabContentStudyMaterials = ({ 
  handleUpload,
  handleContentAction 
}: TabContentStudyMaterialsProps) => {
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(['physics']);

  const toggleSubject = (subject: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  // Mock data for NEET 2026 Syllabus with enhanced tracking
  const syllabusData = {
    physics: {
      name: "Physics",
      totalMarks: 180,
      expectedMarks: 150,
      overallMastery: 72,
      color: "blue",
      topics: [
        {
          id: "mechanics",
          name: "Mechanics",
          weightage: 25,
          expectedMarks: 45,
          currentMarks: 38,
          mastery: 84,
          concepts: [
            { name: "Newton's Laws", mastery: 90, link: "/concepts/newtons-laws" },
            { name: "Work Energy Theorem", mastery: 85, link: "/concepts/work-energy" },
            { name: "Rotational Motion", mastery: 78, link: "/concepts/rotational-motion" },
            { name: "Simple Harmonic Motion", mastery: 82, link: "/concepts/shm" }
          ]
        },
        {
          id: "thermodynamics",
          name: "Thermodynamics",
          weightage: 15,
          expectedMarks: 27,
          currentMarks: 22,
          mastery: 75,
          concepts: [
            { name: "Laws of Thermodynamics", mastery: 80, link: "/concepts/thermo-laws" },
            { name: "Heat Engines", mastery: 70, link: "/concepts/heat-engines" },
            { name: "Kinetic Theory", mastery: 75, link: "/concepts/kinetic-theory" }
          ]
        },
        {
          id: "electromagnetism",
          name: "Electromagnetism",
          weightage: 30,
          expectedMarks: 54,
          currentMarks: 45,
          mastery: 68,
          concepts: [
            { name: "Electric Field", mastery: 75, link: "/concepts/electric-field" },
            { name: "Magnetic Field", mastery: 65, link: "/concepts/magnetic-field" },
            { name: "Electromagnetic Induction", mastery: 60, link: "/concepts/em-induction" },
            { name: "AC Circuits", mastery: 72, link: "/concepts/ac-circuits" }
          ]
        },
        {
          id: "optics",
          name: "Optics",
          weightage: 15,
          expectedMarks: 27,
          currentMarks: 24,
          mastery: 78,
          concepts: [
            { name: "Ray Optics", mastery: 85, link: "/concepts/ray-optics" },
            { name: "Wave Optics", mastery: 70, link: "/concepts/wave-optics" },
            { name: "Optical Instruments", mastery: 80, link: "/concepts/optical-instruments" }
          ]
        },
        {
          id: "modern-physics",
          name: "Modern Physics",
          weightage: 15,
          expectedMarks: 27,
          currentMarks: 21,
          mastery: 65,
          concepts: [
            { name: "Photoelectric Effect", mastery: 70, link: "/concepts/photoelectric" },
            { name: "Atomic Structure", mastery: 65, link: "/concepts/atomic-structure" },
            { name: "Nuclear Physics", mastery: 60, link: "/concepts/nuclear-physics" }
          ]
        }
      ]
    },
    chemistry: {
      name: "Chemistry",
      totalMarks: 180,
      expectedMarks: 145,
      overallMastery: 68,
      color: "green",
      topics: [
        {
          id: "physical-chemistry",
          name: "Physical Chemistry",
          weightage: 35,
          expectedMarks: 63,
          currentMarks: 52,
          mastery: 70,
          concepts: [
            { name: "Chemical Kinetics", mastery: 75, link: "/concepts/kinetics" },
            { name: "Thermodynamics", mastery: 68, link: "/concepts/chem-thermo" },
            { name: "Equilibrium", mastery: 72, link: "/concepts/equilibrium" },
            { name: "Electrochemistry", mastery: 65, link: "/concepts/electrochemistry" }
          ]
        },
        {
          id: "organic-chemistry",
          name: "Organic Chemistry",
          weightage: 35,
          expectedMarks: 63,
          currentMarks: 58,
          mastery: 75,
          concepts: [
            { name: "Hydrocarbons", mastery: 80, link: "/concepts/hydrocarbons" },
            { name: "Functional Groups", mastery: 75, link: "/concepts/functional-groups" },
            { name: "Biomolecules", mastery: 70, link: "/concepts/biomolecules" },
            { name: "Polymers", mastery: 78, link: "/concepts/polymers" }
          ]
        },
        {
          id: "inorganic-chemistry",
          name: "Inorganic Chemistry",
          weightage: 30,
          expectedMarks: 54,
          currentMarks: 45,
          mastery: 62,
          concepts: [
            { name: "Periodic Table", mastery: 70, link: "/concepts/periodic-table" },
            { name: "Chemical Bonding", mastery: 65, link: "/concepts/bonding" },
            { name: "Coordination Compounds", mastery: 58, link: "/concepts/coordination" },
            { name: "Metallurgy", mastery: 55, link: "/concepts/metallurgy" }
          ]
        }
      ]
    },
    biology: {
      name: "Biology",
      totalMarks: 360,
      expectedMarks: 310,
      overallMastery: 76,
      color: "purple",
      topics: [
        {
          id: "botany",
          name: "Botany",
          weightage: 50,
          expectedMarks: 180,
          currentMarks: 165,
          mastery: 78,
          concepts: [
            { name: "Plant Physiology", mastery: 82, link: "/concepts/plant-physiology" },
            { name: "Plant Reproduction", mastery: 75, link: "/concepts/plant-reproduction" },
            { name: "Plant Anatomy", mastery: 80, link: "/concepts/plant-anatomy" },
            { name: "Photosynthesis", mastery: 85, link: "/concepts/photosynthesis" }
          ]
        },
        {
          id: "zoology",
          name: "Zoology",
          weightage: 50,
          expectedMarks: 180,
          currentMarks: 170,
          mastery: 74,
          concepts: [
            { name: "Human Physiology", mastery: 78, link: "/concepts/human-physiology" },
            { name: "Animal Reproduction", mastery: 72, link: "/concepts/animal-reproduction" },
            { name: "Evolution", mastery: 70, link: "/concepts/evolution" },
            { name: "Genetics", mastery: 76, link: "/concepts/genetics" }
          ]
        }
      ]
    }
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return "text-green-600 bg-green-50";
    if (mastery >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getMasteryIcon = (mastery: number) => {
    if (mastery >= 80) return <Trophy className="h-4 w-4" />;
    if (mastery >= 60) return <Target className="h-4 w-4" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6 max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NEET 2026 - Exam Syllabus & Mastery Tracker
          </h3>
          <p className="text-gray-600 mt-1">Track your progress across all subjects with detailed concept mastery</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleUpload}>
            <Upload size={16} />
            <span>Upload Materials</span>
          </Button>
        </div>
      </div>

      {/* Overall Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(syllabusData).map(([key, subject]) => (
          <Card key={key} className="border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className={`text-${subject.color}-600`}>{subject.name}</span>
                <Badge variant="outline" className={`${getMasteryColor(subject.overallMastery)} border-current`}>
                  {subject.overallMastery}% Mastery
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Current: {subject.currentMarks || subject.topics.reduce((sum, topic) => sum + topic.currentMarks, 0)}</span>
                  <span>Expected: {subject.expectedMarks}</span>
                  <span>Total: {subject.totalMarks}</span>
                </div>
                <Progress value={subject.overallMastery} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Subject Breakdown */}
      <div className="space-y-4">
        {Object.entries(syllabusData).map(([subjectKey, subject]) => (
          <Card key={subjectKey} className="border-2 hover:shadow-lg transition-all duration-300">
            <Collapsible 
              open={expandedSubjects.includes(subjectKey)}
              onOpenChange={() => toggleSubject(subjectKey)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-xl text-${subject.color}-600 flex items-center gap-2`}>
                      <BookOpen className="h-5 w-5" />
                      {subject.name}
                    </CardTitle>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {subject.topics.length} Topics
                      </Badge>
                      <Badge variant="outline" className={`${getMasteryColor(subject.overallMastery)} border-current`}>
                        {subject.overallMastery}% Overall Mastery
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {subject.topics.map((topic) => (
                      <div key={topic.id} className="border rounded-lg p-4 bg-gray-50/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-lg flex items-center gap-2">
                            {getMasteryIcon(topic.mastery)}
                            {topic.name}
                          </h4>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-orange-50 text-orange-700">
                              {topic.weightage}% Weightage
                            </Badge>
                            <Badge variant="outline" className={`${getMasteryColor(topic.mastery)} border-current`}>
                              {topic.mastery}% Mastery
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Topic Progress and Marks */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Current Marks:</span>
                            <span className="font-semibold text-green-600">{topic.currentMarks}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Expected Marks:</span>
                            <span className="font-semibold text-blue-600">{topic.expectedMarks}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Performance:</span>
                            <span className={`font-semibold ${topic.currentMarks >= topic.expectedMarks ? 'text-green-600' : 'text-red-600'}`}>
                              {((topic.currentMarks / topic.expectedMarks) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        
                        <Progress value={topic.mastery} className="h-2 mb-4" />
                        
                        {/* Concepts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          {topic.concepts.map((concept, idx) => (
                            <div key={idx} className="border rounded-md p-3 bg-white hover:shadow-md transition-all duration-200">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-sm">{concept.name}</h5>
                                <Badge variant="outline" className={`text-xs ${getMasteryColor(concept.mastery)} border-current`}>
                                  {concept.mastery}%
                                </Badge>
                              </div>
                              <Progress value={concept.mastery} className="h-1 mb-2" />
                              <div className="flex justify-between text-xs gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 px-2 text-xs"
                                  onClick={() => handleContentAction("Learn", concept.name)}
                                >
                                  Learn
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 px-2 text-xs"
                                  onClick={() => handleContentAction("Flashcards", concept.name)}
                                >
                                  Cards
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 px-2 text-xs"
                                  onClick={() => handleContentAction("Exam", concept.name)}
                                >
                                  Exam
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Legacy Study Materials Table */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Additional Study Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label className="mb-2 block">Filter by Subject</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Filter by Exam Goal</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select exam goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exam Goals</SelectItem>
                  <SelectItem value="neet">NEET</SelectItem>
                  <SelectItem value="jee">JEE</SelectItem>
                  <SelectItem value="upsc">UPSC</SelectItem>
                  <SelectItem value="gate">GATE</SelectItem>
                  <SelectItem value="cat">CAT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block">Material Type</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select material type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="study_material">Study Material</SelectItem>
                  <SelectItem value="syllabus">Syllabus</SelectItem>
                  <SelectItem value="exam_material">Exam Material</SelectItem>
                  <SelectItem value="previous_papers">Previous Year Papers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Exam Goal</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    title: "NEET Physics Formula Sheet",
                    type: "study_material",
                    subject: "Physics",
                    examGoal: "NEET",
                    tags: ["formulas", "quick-reference", "mechanics"]
                  },
                  {
                    title: "NEET Biology Syllabus 2024",
                    type: "syllabus",
                    subject: "Biology",
                    examGoal: "NEET",
                    tags: ["syllabus", "official", "2024"]
                  },
                  {
                    title: "NEET Chemistry Practice Papers",
                    type: "exam_material",
                    subject: "Chemistry",
                    examGoal: "NEET",
                    tags: ["practice", "mock-test", "chemistry"]
                  }
                ].map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {item.type.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.examGoal}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => handleContentAction("View", item.title)}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleContentAction("Tag", item.title)}
                        >
                          <Tag size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TabContentStudyMaterials;
