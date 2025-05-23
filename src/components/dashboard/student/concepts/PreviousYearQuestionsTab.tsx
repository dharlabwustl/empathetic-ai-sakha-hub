
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileQuestion, ChevronRight, Calendar } from 'lucide-react';

interface PreviousYearQuestionsTabProps {
  conceptName: string;
}

const PreviousYearQuestionsTab: React.FC<PreviousYearQuestionsTabProps> = ({ conceptName }) => {
  // Sample previous year questions data
  const previousQuestions = [
    {
      id: "q1",
      year: "2022",
      exam: "NEET",
      question: "If a 6Ω resistor is connected across a 12V battery, what is the current flowing through the circuit?",
      options: ["1A", "2A", "3A", "4A"],
      correctAnswer: "2A",
      explanation: "Using Ohm's law, I = V/R = 12V/6Ω = 2A",
      difficulty: "Easy"
    },
    {
      id: "q2",
      year: "2021",
      exam: "JEE Main",
      question: "A wire of resistance 10Ω is bent to form a square. The equivalent resistance between opposite corners of the square is:",
      options: ["2.5Ω", "5Ω", "10Ω", "20Ω"],
      correctAnswer: "2.5Ω",
      explanation: "Due to symmetry, this becomes a parallel combination of resistances, giving 2.5Ω",
      difficulty: "Medium"
    },
    {
      id: "q3",
      year: "2020",
      exam: "NEET",
      question: "The resistance of a conductor is 5Ω at 50°C and 6Ω at 100°C. The temperature coefficient of resistance is:",
      options: ["0.002/°C", "0.004/°C", "0.006/°C", "0.008/°C"],
      correctAnswer: "0.004/°C",
      explanation: "Using R₂ = R₁[1 + α(T₂-T₁)], we can solve for α = 0.004/°C",
      difficulty: "Hard"
    }
  ];

  const difficultyColors = {
    "Easy": "bg-green-100 text-green-800 border-green-200",
    "Medium": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Hard": "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileQuestion className="h-5 w-5 text-indigo-600" />
          Previous Year Questions on {conceptName}
        </CardTitle>
        <CardDescription>
          Practice with real questions that appeared in competitive exams
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {previousQuestions.map((question, idx) => (
          <Card key={question.id} className="overflow-hidden border border-gray-200">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">{question.year}</span>
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  {question.exam}
                </Badge>
                <Badge variant="outline" className={difficultyColors[question.difficulty]}>
                  {question.difficulty}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                View Full Question <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <CardContent className="p-4">
              <p className="font-medium mb-4">{question.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {question.options.map((option, optIdx) => (
                  <div key={optIdx} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50">
                    <div className="h-5 w-5 rounded-full border flex items-center justify-center text-xs">
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 rounded-md p-3 mt-4">
                <p className="font-medium text-green-800 dark:text-green-400">Correct Answer: {question.correctAnswer}</p>
                <p className="text-sm mt-1 text-green-700 dark:text-green-300">{question.explanation}</p>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="gap-2">
            <FileQuestion className="h-4 w-4" />
            View More Previous Year Questions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviousYearQuestionsTab;
