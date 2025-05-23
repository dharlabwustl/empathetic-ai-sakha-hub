
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion, CheckCircle, AlertTriangle } from 'lucide-react';

interface PreviousYearsContentProps {
  conceptName: string;
}

const PreviousYearsContent: React.FC<PreviousYearsContentProps> = ({ conceptName }) => {
  // Sample previous year questions
  const previousYearQuestions = [
    {
      id: "py1",
      year: 2023,
      exam: "NEET",
      question: "According to Ohm's law, the current (I) flowing through a conductor is proportional to the potential difference (V) across its ends when the temperature and other physical conditions remain:",
      options: [
        "Variable with time",
        "Unchanged",
        "Dependent on the length of the conductor",
        "Dependent on the material of the conductor"
      ],
      correctAnswer: 1, // Index of the correct answer
      difficulty: "medium",
      attempted: true,
      userAnswer: 1, // Correct
      explanation: "Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points, provided all physical conditions and temperature remain constant."
    },
    {
      id: "py2",
      year: 2022,
      exam: "IIT-JEE",
      question: "A wire of resistance 4Ω is stretched to double its length. The resistance of the stretched wire will be:",
      options: [
        "8Ω",
        "16Ω",
        "2Ω",
        "4Ω"
      ],
      correctAnswer: 1, // Index of the correct answer
      difficulty: "hard",
      attempted: true,
      userAnswer: 0, // Incorrect
      explanation: "When a wire is stretched to double its length, its cross-sectional area reduces to half (as volume remains constant). Since R = ρL/A, the new resistance becomes 4 times the original, i.e., 16Ω."
    },
    {
      id: "py3",
      year: 2021,
      exam: "NEET",
      question: "A potential difference of 2V is applied across a conductor of resistance 10Ω. The current flowing through it will be:",
      options: [
        "0.2 A",
        "0.02 A",
        "20 A",
        "5 A"
      ],
      correctAnswer: 0, // Index of the correct answer
      difficulty: "easy",
      attempted: false,
      explanation: "Using Ohm's law: I = V/R = 2V/10Ω = 0.2A"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileQuestion className="h-5 w-5 text-indigo-600" />
          Previous Years Questions: {conceptName}
        </CardTitle>
        <CardDescription>
          Practice with questions that appeared in past examinations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {previousYearQuestions.map((question, index) => (
            <div 
              key={question.id}
              className={`border rounded-lg p-4 ${
                question.attempted 
                  ? question.userAnswer === question.correctAnswer 
                    ? 'border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900/40' 
                    : 'border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/40'
                  : 'border-gray-200 bg-gray-50 dark:bg-gray-900/30 dark:border-gray-800'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 mr-2">
                    {question.year} {question.exam}
                  </span>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    question.difficulty === 'easy' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' 
                      : question.difficulty === 'medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                  }`}>
                    {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                  </span>
                </div>
                
                {question.attempted && (
                  question.userAnswer === question.correctAnswer ? (
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Correct
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600 dark:text-red-400">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Incorrect
                    </span>
                  )
                )}
              </div>
              
              <p className="font-medium mb-4">{index + 1}. {question.question}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {question.options.map((option, optIndex) => (
                  <div 
                    key={optIndex}
                    className={`p-3 rounded-md border ${
                      question.attempted
                        ? optIndex === question.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                          : optIndex === question.userAnswer
                            ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                            : 'border-gray-200 dark:border-gray-700'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-800 text-sm font-medium">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {question.attempted && (
                <div className={`mt-3 p-3 rounded-md ${
                  question.userAnswer === question.correctAnswer
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
                }`}>
                  <p className="font-medium">Explanation:</p>
                  <p>{question.explanation}</p>
                </div>
              )}
              
              {!question.attempted && (
                <div className="flex justify-end mt-4">
                  <Button>Attempt Question</Button>
                </div>
              )}
            </div>
          ))}
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="mr-2">
              View More Questions
            </Button>
            <Button>
              Practice Test
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviousYearsContent;
