
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboardingContext } from '../OnboardingContext';
import { motion } from 'framer-motion';
import { Trophy, Search, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GoalSelectionStepProps {
  onNext: () => void;
}

const GoalSelectionStep: React.FC<GoalSelectionStepProps> = ({ onNext }) => {
  const { goalTitle, setGoalTitle, examGoal, setExamGoal, updateFormData } = useOnboardingContext();
  const [searchTerm, setSearchTerm] = useState('');

  const popularExams = [
    { id: 'IIT-JEE', name: 'JEE (Main & Advanced)', type: 'engineering' },
    { id: 'NEET', name: 'NEET-UG', type: 'medical' },
    { id: 'UPSC', name: 'UPSC Civil Services', type: 'government' },
    { id: 'CAT', name: 'CAT MBA Entrance', type: 'management' },
    { id: 'GATE', name: 'GATE', type: 'engineering' },
    { id: 'CBSE-12', name: 'CBSE Class 12', type: 'school' },
    { id: 'CBSE-10', name: 'CBSE Class 10', type: 'school' },
    { id: 'CLAT', name: 'CLAT', type: 'law' }
  ];

  const filteredExams = searchTerm 
    ? popularExams.filter(exam => 
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.type.toLowerCase().includes(searchTerm.toLowerCase()))
    : popularExams;

  const handleSelectExam = (examId: string, examName: string) => {
    setExamGoal(examId);
    setGoalTitle(examName);
    updateFormData({ examGoal: examId, goalTitle: examName });
    onNext();
  };

  const handleCustomGoal = () => {
    if (searchTerm.trim()) {
      setGoalTitle(searchTerm);
      setExamGoal('custom');
      updateFormData({ examGoal: 'custom', goalTitle: searchTerm });
      onNext();
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <p className="text-center text-muted-foreground mb-6">
          Select the exam you're preparing for or enter your learning goal
        </p>
      </motion.div>

      <motion.div 
        variants={item} 
        className="flex items-center space-x-2 border rounded-md p-2 bg-gray-50 dark:bg-gray-800 focus-within:ring-1 focus-within:ring-blue-500"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search exams or enter goal"
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <motion.div variants={item} className="space-y-2">
        <div className="flex items-center">
          <Trophy className="h-4 w-4 text-amber-500 mr-2" />
          <h3 className="text-sm font-medium">Popular Exams</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {filteredExams.map((exam) => (
            <Button
              key={exam.id}
              variant="outline"
              size="sm"
              className="h-auto py-2 justify-start"
              onClick={() => handleSelectExam(exam.id, exam.name)}
            >
              <div className="flex flex-col items-start text-left">
                <span>{exam.name}</span>
                <Badge variant="outline" className="mt-1 text-xs px-1 py-0">
                  {exam.type}
                </Badge>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>

      {searchTerm && !filteredExams.find(e => e.name.toLowerCase() === searchTerm.toLowerCase()) && (
        <motion.div variants={item}>
          <Button 
            onClick={handleCustomGoal} 
            className="w-full flex items-center gap-2"
          >
            <Star className="h-4 w-4" />
            Add "{searchTerm}" as goal
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GoalSelectionStep;
