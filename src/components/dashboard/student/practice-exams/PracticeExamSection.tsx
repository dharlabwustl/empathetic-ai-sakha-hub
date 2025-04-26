
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Clock, ChevronRight, AlertTriangle, Play, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PracticeExamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  
  // Sample data for practice tests
  const practiceTests = [
    {
      id: 'test-1',
      title: 'Algebra Level 1 Mini Test',
      subject: 'Math',
      topic: 'Algebra',
      linkedConcept: 'Linear Equations',
      questionCount: 20,
      priority: 'High',
      duration: 30,
      status: 'Not Started',
      timeframe: 'today'
    },
    {
      id: 'test-2',
      title: 'Physics Mechanics Quiz',
      subject: 'Physics',
      topic: 'Mechanics',
      linkedConcept: 'Newton\'s Laws',
      questionCount: 15,
      priority: 'Medium',
      duration: 25,
      status: 'Completed',
      timeframe: 'today'
    },
    {
      id: 'test-3',
      title: 'Chemistry Periodic Table Assessment',
      subject: 'Chemistry',
      topic: 'General Chemistry',
      linkedConcept: 'Element Properties',
      questionCount: 18,
      priority: 'Low',
      duration: 20,
      status: 'In Progress',
      timeframe: 'week'
    },
    {
      id: 'test-4',
      title: 'World War II Events Quiz',
      subject: 'History',
      topic: 'Modern History',
      linkedConcept: 'World War II Causes',
      questionCount: 25,
      priority: 'Medium',
      duration: 35,
      status: 'Not Started',
      timeframe: 'week'
    },
    {
      id: 'test-5',
      title: 'Biology Cell Functions Assessment',
      subject: 'Biology',
      topic: 'Cell Biology',
      linkedConcept: 'Cell Structure',
      questionCount: 22,
      priority: 'High',
      duration: 45,
      status: 'Not Started',
      timeframe: 'month'
    }
  ];
  
  // Filter tests based on selected timeframe
  const filteredTests = practiceTests.filter(test => {
    if (activeTab === 'all') return true;
    return test.timeframe === activeTab;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <FileText className="h-5 w-5 mr-2 text-purple-600" />
            Practice Tests – Sharpen Your Skills
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Test your knowledge and track your progress with our adaptive practice exams
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="bg-white">8 Tests Available</Badge>
          <Badge variant="outline" className="bg-white">73% Average Score</Badge>
        </div>
      </div>
      
      {/* Time Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>🔹 Today</span>
          </TabsTrigger>
          <TabsTrigger value="week" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>🔹 This Week</span>
          </TabsTrigger>
          <TabsTrigger value="month" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>🔹 This Month</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Tab Contents */}
        <TabsContent value="today" className="mt-6">
          <PracticeTestGrid tests={filteredTests} />
        </TabsContent>
        
        <TabsContent value="week" className="mt-6">
          <PracticeTestGrid tests={filteredTests} />
        </TabsContent>
        
        <TabsContent value="month" className="mt-6">
          <PracticeTestGrid tests={filteredTests} />
        </TabsContent>
      </Tabs>
      
      {/* View All Button */}
      <div className="flex justify-end">
        <Link to="/dashboard/student/practice-exam">
          <Button variant="outline" className="flex items-center gap-2">
            🔍 View All Practice Tests
            <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface PracticeTestGridProps {
  tests: any[];
}

const PracticeTestGrid: React.FC<PracticeTestGridProps> = ({ tests }) => {
  if (tests.length === 0) {
    return (
      <Card className="p-6 text-center">
        <CardContent>
          <p className="text-muted-foreground">No practice tests available for this time period.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tests.map((test) => (
        <PracticeTestCard key={test.id} test={test} />
      ))}
    </div>
  );
};

interface PracticeTestCardProps {
  test: any;
}

const PracticeTestCard: React.FC<PracticeTestCardProps> = ({ test }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2">
            <Badge 
              variant="outline" 
              className={getPriorityClass(test.priority)}
            >
              {test.priority} Priority
            </Badge>
            <Badge 
              variant={getStatusVariant(test.status)} 
              className={test.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
            >
              {test.status}
            </Badge>
          </div>
          <CardTitle className="text-lg">{test.title}</CardTitle>
          <CardDescription>{test.subject} - {test.topic}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-3 pb-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <FileText size={14} />
              <span>Questions: {test.questionCount}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock size={14} />
              <span>Duration: {test.duration} min</span>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md text-xs">
            <span className="font-medium text-blue-700 dark:text-blue-400">🧠 Linked Concept:</span>
            <span className="text-blue-600 dark:text-blue-300 ml-1">{test.linkedConcept}</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2">
          <Link to={`/dashboard/student/practice-exam/${test.id}`} className="w-full">
            <Button 
              variant="default" 
              className="w-full flex items-center justify-center gap-2"
              disabled={test.status === 'Completed'}
            >
              {test.status === 'Completed' ? (
                <>
                  <BarChart2 size={16} /> View Result
                </>
              ) : (
                <>
                  <Play size={16} /> Start Test
                </>
              )}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Helper functions
function getStatusVariant(status: string): "default" | "destructive" | "outline" {
  switch (status) {
    case 'Completed': return 'outline';
    case 'In Progress': return 'default';
    case 'Not Started': return 'outline';
    default: return 'outline';
  }
}

function getPriorityClass(priority: string): string {
  switch (priority) {
    case 'High': return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400';
    case 'Medium': return 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
    case 'Low': return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    default: return '';
  }
}

export default PracticeExamSection;
