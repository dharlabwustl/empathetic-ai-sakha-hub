
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, Search, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PracticeExamCard, { PracticeExam } from './PracticeExamCard';

// Sample data - in production this would come from an API
const mockExams: PracticeExam[] = [
  {
    id: '1',
    title: 'Algebra Level 1 Mini Test',
    subject: 'Mathematics',
    topic: 'Algebra',
    linkedConcept: 'Quadratic Equations',
    questionCount: 15,
    duration: 30,
    difficulty: 'easy',
    status: 'not-started'
  },
  {
    id: '2',
    title: 'Newton\'s Laws Test',
    subject: 'Physics',
    topic: 'Mechanics',
    linkedConcept: 'Force and Motion',
    questionCount: 20,
    duration: 45,
    difficulty: 'medium',
    status: 'completed',
    score: 85,
    completedAt: '2025-04-20'
  },
  {
    id: '3',
    title: 'Organic Chemistry Quiz',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    linkedConcept: 'Functional Groups',
    questionCount: 25,
    duration: 60,
    difficulty: 'hard',
    status: 'in-progress'
  }
];

const PracticeExamsSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'today' | 'week' | 'month'>('today');
  
  // Filter exams based on the selected tab
  // In a real implementation, this would use dates to filter properly
  const getFilteredExams = () => {
    switch(selectedTab) {
      case 'today':
        return mockExams.slice(0, 2);
      case 'week':
        return mockExams.slice(0, 3);
      case 'month':
        return mockExams;
      default:
        return mockExams;
    }
  };
  
  const filteredExams = getFilteredExams();
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Brain className="mr-2 h-5 w-5 text-blue-600" />
          Practice Tests – Sharpen Your Skills
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs 
          value={selectedTab} 
          onValueChange={(value) => setSelectedTab(value as 'today' | 'week' | 'month')}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PracticeExamCard exam={exam} />
                </motion.div>
              ))}
            </div>
            
            {filteredExams.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No practice tests scheduled for this period</p>
              </div>
            )}
            
            <div className="mt-6 flex justify-center">
              <Link to="/dashboard/student/exams">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  View All Practice Tests
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PracticeExamsSection;
