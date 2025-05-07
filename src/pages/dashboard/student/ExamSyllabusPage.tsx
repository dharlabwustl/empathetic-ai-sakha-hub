
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ExamSyllabusPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('physics');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock exam data
  const examData = {
    name: 'NEET 2026',
    totalTopics: 150,
    completedTopics: 47,
    subjects: [
      { 
        id: 'physics', 
        name: 'Physics', 
        progress: 30, 
        units: [
          { 
            id: 'mechanics', 
            name: 'Mechanics', 
            progress: 45,
            topics: [
              { id: 'laws-of-motion', name: 'Laws of Motion', progress: 80, importance: 'high' },
              { id: 'work-energy', name: 'Work, Energy and Power', progress: 50, importance: 'high' },
              { id: 'rotational-motion', name: 'Rotational Motion', progress: 20, importance: 'medium' }
            ] 
          },
          { 
            id: 'thermodynamics', 
            name: 'Thermodynamics', 
            progress: 20,
            topics: [
              { id: 'heat-transfer', name: 'Heat Transfer', progress: 30, importance: 'medium' },
              { id: 'thermodynamic-processes', name: 'Thermodynamic Processes', progress: 10, importance: 'high' }
            ]
          },
          { 
            id: 'electrostatics', 
            name: 'Electrostatics', 
            progress: 15,
            topics: [
              { id: 'electric-charges', name: 'Electric Charges and Fields', progress: 25, importance: 'high' },
              { id: 'capacitance', name: 'Capacitance', progress: 5, importance: 'medium' }
            ]
          }
        ]
      },
      { 
        id: 'chemistry', 
        name: 'Chemistry', 
        progress: 45,
        units: [
          {
            id: 'organic-chemistry',
            name: 'Organic Chemistry',
            progress: 60,
            topics: [
              { id: 'hydrocarbons', name: 'Hydrocarbons', progress: 75, importance: 'high' },
              { id: 'alcohols', name: 'Alcohols, Phenols and Ethers', progress: 40, importance: 'high' }
            ]
          },
          {
            id: 'inorganic-chemistry',
            name: 'Inorganic Chemistry',
            progress: 30,
            topics: [
              { id: 'periodic-table', name: 'Periodic Table', progress: 50, importance: 'high' },
              { id: 'chemical-bonding', name: 'Chemical Bonding', progress: 20, importance: 'high' }
            ]
          }
        ]
      },
      { 
        id: 'biology', 
        name: 'Biology', 
        progress: 60,
        units: [
          {
            id: 'cell-biology',
            name: 'Cell Biology',
            progress: 70,
            topics: [
              { id: 'cell-structure', name: 'Cell Structure and Function', progress: 85, importance: 'high' },
              { id: 'biomolecules', name: 'Biomolecules', progress: 60, importance: 'high' }
            ]
          },
          {
            id: 'human-physiology',
            name: 'Human Physiology',
            progress: 50,
            topics: [
              { id: 'digestion', name: 'Digestive System', progress: 65, importance: 'high' },
              { id: 'circulation', name: 'Circulatory System', progress: 45, importance: 'medium' }
            ]
          }
        ]
      }
    ]
  };

  const renderTopicCard = (topic: any) => {
    return (
      <Card key={topic.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-base">{topic.name}</CardTitle>
              <CardDescription>
                Importance: <span className={`font-medium ${topic.importance === 'high' ? 'text-red-500' : 'text-amber-500'}`}>
                  {topic.importance === 'high' ? 'High' : 'Medium'}
                </span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => navigate(`/dashboard/student/concepts/landing`)}>
                Concept Cards
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigate(`/dashboard/student/flashcards/landing`)}>
                Flashcards
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigate(`/dashboard/student/practice-exam`)}>
                Practice
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Progress value={topic.progress} className="h-2" />
            <span className="text-xs font-medium">{topic.progress}%</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  const filteredSubjects = examData.subjects.filter(subject => 
    subject.id === activeTab
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{examData.name} Syllabus</h1>
          <p className="text-muted-foreground">
            Overall Progress: {examData.completedTopics} of {examData.totalTopics} topics ({Math.round((examData.completedTopics/examData.totalTopics)*100)}%)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search topics..."
              className="pl-8 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/study-plan')}>
            View Study Plan
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard/student')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="physics" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {examData.subjects.map(subject => (
            <TabsTrigger key={subject.id} value={subject.id}>
              {subject.name} ({subject.progress}%)
            </TabsTrigger>
          ))}
        </TabsList>
        
        {filteredSubjects.map(subject => (
          <TabsContent key={subject.id} value={subject.id}>
            {subject.units.map(unit => (
              <div key={unit.id} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{unit.name}</h2>
                  <div className="flex items-center gap-2">
                    <Progress value={unit.progress} className="w-48 h-2" />
                    <span className="text-sm font-medium">{unit.progress}%</span>
                  </div>
                </div>
                
                {unit.topics.filter(topic => 
                  searchQuery === '' || topic.name.toLowerCase().includes(searchQuery.toLowerCase())
                ).map(topic => renderTopicCard(topic))}
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ExamSyllabusPage;
