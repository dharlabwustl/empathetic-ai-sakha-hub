import React from 'react';
import { Badge } from "@/components/ui/badge";

const ExamNamesBadge: React.FC = () => {
  // Only keep UPSC, NEET, IIT-JEE exams
  const examNames = ["UPSC", "NEET", "IIT-JEE"];
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <span className="text-sm font-medium text-gray-500">Trusted by students preparing for:</span>
      {examNames.map(exam => (
        <Badge key={exam} variant="outline" className="bg-white/80 text-gray-700 border-gray-200 px-3 py-1">
          {exam}
        </Badge>
      ))}
    </div>
  );
};

export default ExamNamesBadge;
