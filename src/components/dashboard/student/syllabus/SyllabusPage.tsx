
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Check, FileText, ArrowRight } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const SyllabusPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('physics');
  
  const subjects = [
    { id: 'physics', name: 'Physics', progress: 65, chapters: 16, completed: 10 },
    { id: 'chemistry', name: 'Chemistry', progress: 42, chapters: 18, completed: 8 },
    { id: 'biology', name: 'Biology', progress: 78, chapters: 22, completed: 17 },
  ];
  
  const syllabusData = {
    physics: [
      { 
        id: 'phy-1', 
        title: 'Mechanics', 
        topics: [
          { name: 'Units & Measurements', completed: true },
          { name: 'Motion in One Dimension', completed: true },
          { name: 'Motion in Two & Three Dimensions', completed: true },
          { name: 'Laws of Motion', completed: true },
          { name: 'Work, Energy & Power', completed: true },
          { name: 'Rotational Motion', completed: false },
          { name: 'Gravitation', completed: false },
        ],
        importance: 'High',
        timeRequired: '4-5 weeks'
      },
      { 
        id: 'phy-2', 
        title: 'Thermodynamics', 
        topics: [
          { name: 'Thermal Properties of Matter', completed: true },
          { name: 'Thermodynamics Laws', completed: true },
          { name: 'Kinetic Theory of Gases', completed: false },
          { name: 'Heat Transfer', completed: false },
        ],
        importance: 'Medium',
        timeRequired: '2-3 weeks'
      },
      { 
        id: 'phy-3', 
        title: 'Electrostatics', 
        topics: [
          { name: 'Electric Charges & Fields', completed: true },
          { name: 'Electrostatic Potential & Capacitance', completed: false },
          { name: 'Current Electricity', completed: false },
        ],
        importance: 'High',
        timeRequired: '3-4 weeks'
      },
      { 
        id: 'phy-4', 
        title: 'Magnetism & EMI', 
        topics: [
          { name: 'Moving Charges & Magnetism', completed: false },
          { name: 'Magnetism & Matter', completed: false },
          { name: 'Electromagnetic Induction', completed: false },
          { name: 'Alternating Current', completed: false },
        ],
        importance: 'Medium',
        timeRequired: '3-4 weeks'
      },
      { 
        id: 'phy-5', 
        title: 'Optics', 
        topics: [
          { name: 'Ray Optics', completed: false },
          { name: 'Wave Optics', completed: false },
        ],
        importance: 'Medium',
        timeRequired: '2-3 weeks'
      },
      { 
        id: 'phy-6', 
        title: 'Modern Physics', 
        topics: [
          { name: 'Dual Nature of Matter', completed: false },
          { name: 'Atoms', completed: false },
          { name: 'Nuclei', completed: false },
          { name: 'Semiconductor Devices', completed: false },
        ],
        importance: 'High',
        timeRequired: '3-4 weeks'
      },
    ],
    chemistry: [
      { 
        id: 'chem-1', 
        title: 'Physical Chemistry', 
        topics: [
          { name: 'Basic Concepts', completed: true },
          { name: 'States of Matter', completed: true },
          { name: 'Atomic Structure', completed: true },
          { name: 'Chemical Bonding', completed: false },
          { name: 'Chemical Thermodynamics', completed: false },
          { name: 'Solutions', completed: false },
          { name: 'Equilibrium', completed: false },
          { name: 'Redox Reactions & Electrochemistry', completed: false },
          { name: 'Chemical Kinetics', completed: false },
          { name: 'Surface Chemistry', completed: false },
        ],
        importance: 'High',
        timeRequired: '5-6 weeks'
      },
      // More chemistry chapters would be here
    ],
    biology: [
      { 
        id: 'bio-1', 
        title: 'Diversity in Living World', 
        topics: [
          { name: 'Living World', completed: true },
          { name: 'Biological Classification', completed: true },
          { name: 'Plant Kingdom', completed: true },
          { name: 'Animal Kingdom', completed: true },
        ],
        importance: 'Medium',
        timeRequired: '2-3 weeks'
      },
      { 
        id: 'bio-2', 
        title: 'Cell Structure & Function', 
        topics: [
          { name: 'Cell Theory', completed: true },
          { name: 'Prokaryotic & Eukaryotic Cells', completed: true },
          { name: 'Plant & Animal Cells', completed: true },
          { name: 'Cell Membrane & Cell Wall', completed: true },
          { name: 'Cell Organelles', completed: true },
          { name: 'Biomolecules', completed: true },
          { name: 'Cell Division', completed: false },
        ],
        importance: 'High',
        timeRequired: '3-4 weeks'
      },
      // More biology chapters would be here
    ],
  };
  
  const currentSubjectData = syllabusData[activeTab as keyof typeof syllabusData] || [];
  const currentSubject = subjects.find(sub => sub.id === activeTab) || subjects[0];

  return (
    <SharedPageLayout
      title="Exam Syllabus"
      subtitle="Track your progress through the complete syllabus"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Subject Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjects.map(subject => (
            <Card key={subject.id} className={`overflow-hidden ${activeTab === subject.id ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  {subject.name}
                  <Badge variant={subject.progress >= 75 ? "success" : "outline"}>
                    {subject.progress}% Complete
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={subject.progress} className="h-2 mb-4" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{subject.completed} of {subject.chapters} chapters completed</span>
                </div>
                <Button 
                  variant={activeTab === subject.id ? "default" : "outline"} 
                  className="mt-4 w-full"
                  onClick={() => setActiveTab(subject.id)}
                >
                  {activeTab === subject.id ? 'Currently Viewing' : 'View Syllabus'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Syllabus Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50">
            {subjects.map(subject => (
              <TabsTrigger key={subject.id} value={subject.id} className="data-[state=active]:bg-background">
                {subject.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(syllabusData).map(subjectKey => (
            <TabsContent key={subjectKey} value={subjectKey} className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1)} Syllabus</h2>
                  <p className="text-muted-foreground">
                    {currentSubject.completed} of {currentSubject.chapters} chapters completed ({currentSubject.progress}%)
                  </p>
                </div>
                <Button variant="outline">Download PDF</Button>
              </div>
              
              <div className="space-y-4">
                {syllabusData[subjectKey as keyof typeof syllabusData].map((chapter, index) => (
                  <Card key={chapter.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between">
                        <div className="flex items-center">
                          <span className="mr-2">{index + 1}.</span> {chapter.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={chapter.importance === 'High' ? "destructive" : "secondary"} className="text-xs">
                            {chapter.importance} Priority
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {chapter.timeRequired}
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {chapter.topics.map((topic, idx) => (
                          <div 
                            key={idx} 
                            className={`flex items-center p-2 rounded-md ${
                              topic.completed ? 'bg-green-50 dark:bg-green-950/20' : 'bg-background'
                            }`}
                          >
                            {topic.completed ? (
                              <Check size={16} className="text-green-600 mr-2" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-muted-foreground mr-2" />
                            )}
                            <span className={topic.completed ? 'text-green-800 dark:text-green-300' : ''}>
                              {topic.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <BookOpen size={16} />
                          <span>Study Material</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <FileText size={16} />
                          <span>Practice Questions</span>
                        </Button>
                        <Button size="sm" className="gap-1">
                          <span>Start Learning</span>
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default SyllabusPage;
