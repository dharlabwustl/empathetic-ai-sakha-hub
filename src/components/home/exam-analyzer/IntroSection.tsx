
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Target, Brain } from 'lucide-react';
import { ExamType } from './types';

interface IntroSectionProps {
  selectedExam: string;
  setSelectedExam: (value: string) => void;
  examTypes: ExamType[];
}

const IntroSection: React.FC<IntroSectionProps> = ({ 
  selectedExam, 
  setSelectedExam, 
  examTypes 
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Your Target Exam</h3>
        <Select value={selectedExam} onValueChange={setSelectedExam}>
          <SelectTrigger className="bg-white dark:bg-gray-800 border-2 border-violet-100 dark:border-violet-900">
            <SelectValue placeholder="Choose exam type" />
          </SelectTrigger>
          <SelectContent>
            {examTypes.map(exam => (
              <SelectItem key={exam.value} value={exam.value}>
                {exam.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Test Components</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
            <Clock className="mt-0.5 text-blue-500 flex-shrink-0" size={18} />
            <div>
              <span className="font-medium">Stress Level Test</span>
              <p className="text-sm text-muted-foreground">Measures your cognitive performance under pressure</p>
            </div>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800">
            <Target className="mt-0.5 text-violet-500 flex-shrink-0" size={18} />
            <div>
              <span className="font-medium">Readiness Score Test</span>
              <p className="text-sm text-muted-foreground">Evaluates your current preparation level</p>
            </div>
          </li>
          <li className="flex items-start gap-2 p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800">
            <Brain className="mt-0.5 text-pink-500 flex-shrink-0" size={18} />
            <div>
              <span className="font-medium">Concept Mastery & Confidence Mapping</span>
              <p className="text-sm text-muted-foreground">Identifies gaps in knowledge and confidence</p>
            </div>
          </li>
        </ul>
      </div>

      <p className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
        This test takes approximately 5-7 minutes to complete and provides personalized insights to boost your exam performance.
      </p>
    </div>
  );
};

export default IntroSection;
