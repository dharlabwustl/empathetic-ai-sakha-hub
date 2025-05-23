
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, XCircle, ArrowRight, CheckCircle } from 'lucide-react';

interface CommonMistakesContentProps {
  conceptName: string;
}

const CommonMistakesContent: React.FC<CommonMistakesContentProps> = ({ conceptName }) => {
  // Sample mistakes data
  const commonMistakes = [
    {
      id: "mistake1",
      title: "Confusing Current and Voltage",
      description: "Many students mix up the concepts of current and voltage in Ohm's Law calculations.",
      incorrect: "Using I = R/V instead of I = V/R",
      correct: "Current (I) is equal to Voltage (V) divided by Resistance (R): I = V/R",
      consequence: "This leads to incorrect circuit calculations and can cause errors in more complex problems.",
      tips: [
        "Remember that current is the flow of electrons through the conductor",
        "Voltage is the 'pressure' or potential difference that drives the current",
        "Resistance opposes the flow of current"
      ]
    },
    {
      id: "mistake2",
      title: "Forgetting Units",
      description: "Students often forget to include or convert units when applying Ohm's Law.",
      incorrect: "Calculating with volts and kilohms without converting to consistent units",
      correct: "Always convert units to a consistent system before applying the formula: V (in volts), I (in amps), R (in ohms)",
      consequence: "Results will be off by orders of magnitude, leading to circuit designs that won't work as expected.",
      tips: [
        "Always write down units alongside your values",
        "Convert all resistance values to ohms (Ω) before calculations",
        "Double-check your final answer's units"
      ]
    },
    {
      id: "mistake3",
      title: "Misapplying Ohm's Law in Complex Circuits",
      description: "Students often try to apply Ohm's Law directly to complex circuits without considering series and parallel arrangements.",
      incorrect: "Using V = IR for the entire circuit when resistors are in parallel",
      correct: "Break down complex circuits into simpler components, apply Ohm's Law to individual elements, and then combine using appropriate rules for series and parallel circuits",
      consequence: "This leads to incorrect total current and voltage drop calculations in circuit analysis.",
      tips: [
        "Always identify whether components are in series or parallel first",
        "For series circuits, current is constant while voltage divides",
        "For parallel circuits, voltage is constant while current divides",
        "Use Kirchhoff's laws alongside Ohm's law for complex circuits"
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Common Mistakes: {conceptName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {commonMistakes.map((mistake, index) => (
            <div key={mistake.id} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-2 flex-shrink-0">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    {index + 1}. {mistake.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {mistake.description}
                  </p>
                  
                  <div className="mt-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-1 rounded-md text-xs font-medium">
                        Common Mistake
                      </span>
                    </div>
                    <p className="mt-2 text-red-700 dark:text-red-300 font-medium">
                      {mistake.incorrect}
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <ArrowRight className="h-5 w-5 text-indigo-600" />
                    <div className="h-px flex-1 bg-indigo-200 dark:bg-indigo-800 ml-2 mr-2"></div>
                    <ArrowRight className="h-5 w-5 text-indigo-600" />
                  </div>
                  
                  <div className="mt-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/40 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-md text-xs font-medium">
                        Correct Approach
                      </span>
                    </div>
                    <p className="mt-2 text-green-700 dark:text-green-300 font-medium">
                      {mistake.correct}
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Consequences of this mistake:
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                      {mistake.consequence}
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Tips to avoid this mistake:
                    </h4>
                    <ul className="mt-1 space-y-1">
                      {mistake.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-green-600 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommonMistakesContent;
