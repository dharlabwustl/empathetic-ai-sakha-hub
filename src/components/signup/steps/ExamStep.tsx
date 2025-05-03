
import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamStepProps {
  examGoal: string;
  onExamSelect: (exam: string) => void;
}

const ExamStep: React.FC<ExamStepProps> = ({ examGoal, onExamSelect }) => {
  // Only show NEET as an option
  const examOptions = [
    {
      id: "NEET",
      title: "NEET",
      description: "National Eligibility cum Entrance Test for medical studies",
      imageUrl: "/images/exams/neet.png",
      defaultImageUrl: "https://placehold.co/100x100?text=NEET"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <GraduationCap className="text-indigo-500" size={20} />
          Exam preparing for
        </h3>
        <p className="text-muted-foreground mb-6">Select the exam you're preparing for</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {examOptions.map((exam) => (
            <Button
              key={exam.id}
              type="button"
              variant={examGoal === exam.id ? "default" : "outline"}
              className={cn(
                "h-auto py-6 flex flex-col items-center justify-center gap-3",
                examGoal === exam.id ? "bg-indigo-600 hover:bg-indigo-700" : ""
              )}
              onClick={() => onExamSelect(exam.id)}
            >
              <img
                src={exam.imageUrl || exam.defaultImageUrl}
                alt={exam.title}
                className="w-16 h-16 object-contain mb-2 rounded"
                onError={(e) => {
                  e.currentTarget.src = exam.defaultImageUrl;
                }}
              />
              <div className="text-center">
                <div className="font-semibold">{exam.title}</div>
                <div className="text-xs mt-1 opacity-80">{exam.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamStep;
