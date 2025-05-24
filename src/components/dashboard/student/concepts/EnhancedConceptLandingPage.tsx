
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Star, 
  Brain,
  Target,
  TrendingUp,
  Lightbulb,
  Calculator
} from 'lucide-react';

interface FormulaTabContentProps {
  formulaData: {
    formula: string;
    variables: { symbol: string; name: string; unit: string; }[];
  };
}

const FormulaTabContent: React.FC<FormulaTabContentProps> = ({ formulaData }) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Formula:</h4>
        <code className="text-lg font-mono">{formulaData.formula}</code>
      </div>
      <div>
        <h4 className="font-medium mb-2">Variables:</h4>
        <div className="space-y-2">
          {formulaData.variables.map((variable, index) => (
            <div key={index} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
              <code className="font-mono font-bold">{variable.symbol}</code>
              <span className="flex-1">{variable.name}</span>
              <span className="text-sm text-gray-500">{variable.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EnhancedConceptLandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Mock data
  const concepts = [
    {
      id: '1',
      title: 'Quadratic Equations',
      subject: 'Mathematics',
      difficulty: 'Intermediate',
      estimatedTime: '45 min',
      rating: 4.8,
      completions: 1247,
      description: 'Master quadratic equations and their applications',
      topics: ['Standard Form', 'Factoring', 'Quadratic Formula', 'Discriminant'],
      prerequisites: ['Linear Equations', 'Basic Algebra']
    },
    {
      id: '2',
      title: "Newton's Laws of Motion",
      subject: 'Physics',
      difficulty: 'Intermediate',
      estimatedTime: '60 min',
      rating: 4.9,
      completions: 892,
      description: 'Understand the fundamental principles of motion and forces',
      topics: ['First Law', 'Second Law', 'Third Law', 'Applications'],
      prerequisites: ['Basic Mathematics', 'Vector Concepts']
    },
    {
      id: '3',
      title: 'Atomic Structure',
      subject: 'Chemistry',
      difficulty: 'Beginner',
      estimatedTime: '30 min',
      rating: 4.7,
      completions: 1580,
      description: 'Learn about atoms, electrons, protons, and neutrons',
      topics: ['Electron Configuration', 'Atomic Number', 'Mass Number', 'Isotopes'],
      prerequisites: ['Basic Chemistry']
    }
  ];

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredConcepts = concepts.filter(concept => {
    const matchesSearch = concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || concept.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || concept.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Mathematics': return <Calculator className="h-4 w-4" />;
      case 'Physics': return <Brain className="h-4 w-4" />;
      case 'Chemistry': return <Lightbulb className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Concept Cards</h1>
          <p className="text-gray-600 mt-1">Interactive learning modules for deep understanding</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Target className="h-4 w-4 mr-2" />
            My Progress
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search concepts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject.toLowerCase()}>
                    {subject}
                  </option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty.toLowerCase()}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Concept Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredConcepts.map((concept) => (
          <Card key={concept.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getSubjectIcon(concept.subject)}
                  <Badge variant="outline" className="text-xs">
                    {concept.subject}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{concept.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{concept.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{concept.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  {concept.estimatedTime}
                </div>
                <Badge className={getDifficultyColor(concept.difficulty)}>
                  {concept.difficulty}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Topics Covered:</div>
                <div className="flex flex-wrap gap-1">
                  {concept.topics.slice(0, 3).map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {concept.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{concept.topics.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500">
                {concept.completions} students completed
              </div>

              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Formula Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Featured Formula: Quadratic Formula
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="formula">
            <TabsList>
              <TabsTrigger value="formula">Formula</TabsTrigger>
              <TabsTrigger value="example">Example</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
            <TabsContent value="formula">
              <FormulaTabContent 
                formulaData={{
                  formula: "x = (-b ± √(b² - 4ac)) / 2a",
                  variables: [
                    { symbol: "x", name: "Solution/Root", unit: "" },
                    { symbol: "a", name: "Coefficient of x²", unit: "" },
                    { symbol: "b", name: "Coefficient of x", unit: "" },
                    { symbol: "c", name: "Constant term", unit: "" }
                  ]
                }}
              />
            </TabsContent>
            <TabsContent value="example">
              <div className="space-y-4">
                <h4 className="font-medium">Example: Solve 2x² + 5x - 3 = 0</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>Given: a = 2, b = 5, c = -3</p>
                  <p>x = (-5 ± √(5² - 4(2)(-3))) / 2(2)</p>
                  <p>x = (-5 ± √(25 + 24)) / 4</p>
                  <p>x = (-5 ± √49) / 4</p>
                  <p>x = (-5 ± 7) / 4</p>
                  <p>x = 2/4 = 0.5 or x = -12/4 = -3</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="practice">
              <div className="space-y-4">
                <h4 className="font-medium">Practice Problem</h4>
                <p>Solve: x² - 6x + 8 = 0</p>
                <Button>Show Solution</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-500">Total Concepts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">23</div>
            <div className="text-sm text-gray-500">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">12h</div>
            <div className="text-sm text-gray-500">Study Time</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">85%</div>
            <div className="text-sm text-gray-500">Avg Score</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedConceptLandingPage;
