
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Brain, 
  FileText,
  Check,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';

interface SyllabusUnit {
  id: string;
  title: string;
  progress: number;
  topics: SyllabusTopic[];
  totalTopics: number;
  completedTopics: number;
}

interface SyllabusTopic {
  id: string;
  title: string;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  weightage: number;
  resources: {
    conceptCards: number;
    flashcards: number;
    practiceTests: number;
  };
}

const SyllabusPage: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile(UserRole.Student);
  const [currentSubject, setCurrentSubject] = useState('biology');
  
  // Mock data for the syllabus
  const subjects = [
    { id: 'biology', name: 'Biology', progress: 65, color: 'bg-green-500' },
    { id: 'chemistry', name: 'Chemistry', progress: 48, color: 'bg-blue-500' },
    { id: 'physics', name: 'Physics', progress: 32, color: 'bg-purple-500' }
  ];
  
  // Mock syllabus units for Biology
  const biologyUnits: SyllabusUnit[] = [
    {
      id: 'bio-unit-1',
      title: 'Cell Structure and Function',
      progress: 85,
      totalTopics: 12,
      completedTopics: 10,
      topics: [
        { id: 'cell-theory', title: 'Cell Theory', completed: true, difficulty: 'easy', weightage: 8, resources: { conceptCards: 4, flashcards: 16, practiceTests: 2 } },
        { id: 'cell-organelles', title: 'Cell Organelles', completed: true, difficulty: 'medium', weightage: 10, resources: { conceptCards: 6, flashcards: 24, practiceTests: 3 } },
        { id: 'cell-membrane', title: 'Cell Membrane and Transport', completed: false, difficulty: 'hard', weightage: 9, resources: { conceptCards: 5, flashcards: 20, practiceTests: 2 } },
        // More topics would be here
      ]
    },
    {
      id: 'bio-unit-2',
      title: 'Genetics and Evolution',
      progress: 70,
      totalTopics: 15,
      completedTopics: 10,
      topics: [
        { id: 'dna-structure', title: 'DNA Structure', completed: true, difficulty: 'medium', weightage: 10, resources: { conceptCards: 5, flashcards: 18, practiceTests: 2 } },
        { id: 'mendelian-genetics', title: 'Mendelian Genetics', completed: true, difficulty: 'medium', weightage: 9, resources: { conceptCards: 4, flashcards: 16, practiceTests: 2 } },
        { id: 'gene-expression', title: 'Gene Expression and Regulation', completed: false, difficulty: 'hard', weightage: 10, resources: { conceptCards: 6, flashcards: 22, practiceTests: 3 } },
        // More topics would be here
      ]
    },
    {
      id: 'bio-unit-3',
      title: 'Human Physiology',
      progress: 45,
      totalTopics: 18,
      completedTopics: 8,
      topics: [
        { id: 'digestive-system', title: 'Digestive System', completed: true, difficulty: 'medium', weightage: 8, resources: { conceptCards: 4, flashcards: 16, practiceTests: 2 } },
        { id: 'circulatory-system', title: 'Circulatory System', completed: false, difficulty: 'hard', weightage: 9, resources: { conceptCards: 5, flashcards: 20, practiceTests: 2 } },
        { id: 'nervous-system', title: 'Nervous System', completed: false, difficulty: 'hard', weightage: 10, resources: { conceptCards: 6, flashcards: 24, practiceTests: 3 } },
        // More topics would be here
      ]
    }
  ];
  
  // Mock syllabus units for Chemistry
  const chemistryUnits: SyllabusUnit[] = [
    {
      id: 'chem-unit-1',
      title: 'Atomic Structure',
      progress: 75,
      totalTopics: 10,
      completedTopics: 7,
      topics: [
        { id: 'atomic-models', title: 'Atomic Models', completed: true, difficulty: 'medium', weightage: 8, resources: { conceptCards: 3, flashcards: 12, practiceTests: 2 } },
        { id: 'quantum-numbers', title: 'Quantum Numbers', completed: true, difficulty: 'hard', weightage: 9, resources: { conceptCards: 4, flashcards: 16, practiceTests: 2 } },
        { id: 'electronic-config', title: 'Electronic Configuration', completed: false, difficulty: 'medium', weightage: 8, resources: { conceptCards: 3, flashcards: 14, practiceTests: 2 } },
      ]
    },
    {
      id: 'chem-unit-2',
      title: 'Chemical Bonding',
      progress: 60,
      totalTopics: 12,
      completedTopics: 7,
      topics: [
        { id: 'ionic-bonding', title: 'Ionic Bonding', completed: true, difficulty: 'easy', weightage: 7, resources: { conceptCards: 3, flashcards: 12, practiceTests: 1 } },
        { id: 'covalent-bonding', title: 'Covalent Bonding', completed: true, difficulty: 'medium', weightage: 8, resources: { conceptCards: 4, flashcards: 16, practiceTests: 2 } },
        { id: 'molecular-orbital', title: 'Molecular Orbital Theory', completed: false, difficulty: 'hard', weightage: 9, resources: { conceptCards: 5, flashcards: 18, practiceTests: 2 } },
      ]
    }
  ];
  
  // Mock syllabus units for Physics
  const physicsUnits: SyllabusUnit[] = [
    {
      id: 'phy-unit-1',
      title: 'Mechanics',
      progress: 50,
      totalTopics: 14,
      completedTopics: 7,
      topics: [
        { id: 'laws-of-motion', title: 'Laws of Motion', completed: true, difficulty: 'medium', weightage: 9, resources: { conceptCards: 4, flashcards: 16, practiceTests: 2 } },
        { id: 'work-energy', title: 'Work, Energy and Power', completed: true, difficulty: 'medium', weightage: 8, resources: { conceptCards: 4, flashcards: 14, practiceTests: 2 } },
        { id: 'rotational-motion', title: 'Rotational Motion', completed: false, difficulty: 'hard', weightage: 8, resources: { conceptCards: 5, flashcards: 18, practiceTests: 2 } },
      ]
    },
    {
      id: 'phy-unit-2',
      title: 'Electrodynamics',
      progress: 30,
      totalTopics: 16,
      completedTopics: 5,
      topics: [
        { id: 'electrostatics', title: 'Electrostatics', completed: true, difficulty: 'medium', weightage: 8, resources: { conceptCards: 4, flashcards: 16, practiceTests: 2 } },
        { id: 'current-electricity', title: 'Current Electricity', completed: false, difficulty: 'medium', weightage: 9, resources: { conceptCards: 5, flashcards: 18, practiceTests: 2 } },
        { id: 'electromagnetic-induction', title: 'Electromagnetic Induction', completed: false, difficulty: 'hard', weightage: 9, resources: { conceptCards: 5, flashcards: 20, practiceTests: 3 } },
      ]
    }
  ];
  
  // Get current syllabus units based on selected subject
  const getCurrentSyllabusUnits = () => {
    switch(currentSubject) {
      case 'biology': return biologyUnits;
      case 'chemistry': return chemistryUnits;
      case 'physics': return physicsUnits;
      default: return [];
    }
  };

  const currentUnits = getCurrentSyllabusUnits();
  
  // Get difficulty badge color
  const getDifficultyBadge = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  // Navigate to concept card
  const navigateToConceptCard = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };
  
  // Navigate to flashcards
  const navigateToFlashcards = (flashcardId: string) => {
    navigate(`/dashboard/student/flashcards/${flashcardId}`);
  };
  
  // Navigate to practice exam
  const navigateToPracticeExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };
  
  return (
    <SharedPageLayout
      title="Exam Syllabus and Progress Tracker"
      subtitle="Complete syllabus mapping with your progress and study resources"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Subject tabs */}
        <Tabs value={currentSubject} onValueChange={setCurrentSubject}>
          <TabsList className="grid grid-cols-3 w-full">
            {subjects.map((subject) => (
              <TabsTrigger key={subject.id} value={subject.id} className="relative">
                <span>{subject.name}</span>
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                  {subject.progress}%
                </span>
                {subject.progress >= 50 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Subject content */}
          {subjects.map((subject) => (
            <TabsContent key={subject.id} value={subject.id} className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{subject.name} Syllabus</h2>
                <div>
                  <Badge variant="secondary" className={`${subject.color} text-white`}>
                    {subject.progress}% Complete
                  </Badge>
                </div>
              </div>
              
              <div className="mb-6">
                <Progress value={subject.progress} className="h-2" />
              </div>
              
              {/* Units for the current subject */}
              <div className="space-y-6">
                {subject.id === currentSubject && currentUnits.map((unit) => (
                  <Card key={unit.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 dark:bg-gray-800">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{unit.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-primary/10">
                            {unit.completedTopics}/{unit.totalTopics} Topics
                          </Badge>
                          <Badge variant="secondary" className={subject.color + " text-white"}>
                            {unit.progress}%
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="mb-4">
                        <Progress value={unit.progress} className={`h-1 ${subject.color}`} />
                      </div>
                      
                      <div className="grid gap-4">
                        {unit.topics.map((topic) => (
                          <div key={topic.id} className="border rounded-lg p-4 transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                {topic.completed && (
                                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-green-600" />
                                  </div>
                                )}
                                <h3 className="font-medium">{topic.title}</h3>
                                <Badge variant="outline" className={getDifficultyBadge(topic.difficulty)}>
                                  {topic.difficulty}
                                </Badge>
                              </div>
                              <Badge variant="secondary">
                                Weightage: {topic.weightage}/10
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={() => navigateToConceptCard(`${topic.id}-concept`)}
                              >
                                <BookOpen className="h-3.5 w-3.5" />
                                {topic.resources.conceptCards} Concept Cards
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={() => navigateToFlashcards(`${topic.id}-flash`)}
                              >
                                <Brain className="h-3.5 w-3.5" />
                                {topic.resources.flashcards} Flashcards
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={() => navigateToPracticeExam(`${topic.id}-exam`)}
                              >
                                <FileText className="h-3.5 w-3.5" />
                                {topic.resources.practiceTests} Practice Tests
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="ghost" className="w-full mt-4 flex items-center justify-center gap-1">
                        View All Topics <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Additional features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-auto p-4 justify-start text-left"
            onClick={() => navigate('/dashboard/student/study-plan')}
          >
            <div className="rounded-full p-2 bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Create Study Plan</p>
              <p className="text-muted-foreground text-sm">Based on syllabus and your current progress</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-auto p-4 justify-start text-left"
            onClick={() => navigate('/dashboard/student/previous-year-analysis')}
          >
            <div className="rounded-full p-2 bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Previous Year Analysis</p>
              <p className="text-muted-foreground text-sm">Understand exam patterns and important topics</p>
            </div>
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default SyllabusPage;
