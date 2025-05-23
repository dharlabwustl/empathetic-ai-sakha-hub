
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

interface CommonMistakesContentProps {
  conceptName: string;
}

const CommonMistakesContent: React.FC<CommonMistakesContentProps> = ({ conceptName }) => {
  // Sample common mistakes for Ohm's Law
  const commonMistakes = [
    {
      title: "Confusing Current and Voltage",
      description: "Many students mix up current (I) and voltage (V) in calculations, leading to incorrect answers.",
      correctExample: "When calculating current, use I = V/R. For a circuit with 12V and 3Ω resistance, the current is I = 12V/3Ω = 4A.",
      incorrectExample: "Incorrectly using R = V/I as the formula for current.",
      tips: [
        "Remember that current is what flows through a circuit",
        "Voltage is the electrical pressure causing the current",
        "Use dimensional analysis to verify your calculations"
      ]
    },
    {
      title: "Forgetting to Convert Units",
      description: "When values are given in different units (e.g., kΩ, mA), failing to convert to consistent units before applying Ohm's Law.",
      correctExample: "If resistance is 2.2kΩ (2200Ω) and current is 0.5mA (0.0005A), then V = IR = 0.0005A × 2200Ω = 1.1V",
      incorrectExample: "Calculating V = 0.5 × 2.2 = 1.1V (incorrect because units weren't converted)",
      tips: [
        "Always convert to base units before calculations",
        "Write down the units with each value",
        "Double-check your unit conversions"
      ]
    },
    {
      title: "Misapplying the Law in Complex Circuits",
      description: "Applying Ohm's Law incorrectly in circuits with components in series or parallel.",
      correctExample: "For resistors in series, total resistance is R = R₁ + R₂ + R₃. For parallel circuits, 1/R = 1/R₁ + 1/R₂ + 1/R₃.",
      incorrectExample: "Adding resistances in parallel or treating a complex circuit as a simple one.",
      tips: [
        "Draw the circuit diagram first",
        "Identify series and parallel components",
        "Calculate equivalent resistances before applying Ohm's Law"
      ]
    },
    {
      title: "Ignoring Direction in Circuit Analysis",
      description: "Not considering the direction of current flow when analyzing circuits with multiple voltage sources.",
      correctExample: "When analyzing a circuit with multiple voltage sources, use Kirchhoff's laws along with Ohm's Law.",
      incorrectExample: "Simply adding voltages without considering their directions and relationships in the circuit.",
      tips: [
        "Use arrow notation to mark current direction",
        "Apply Kirchhoff's voltage law around complete loops",
        "Be consistent with sign conventions"
      ]
    }
  ];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Common Mistakes with {conceptName}
          </CardTitle>
          <CardDescription>
            Understanding these common errors will help you avoid them in exams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-lg p-4">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm">
                <span className="font-medium">Mistake Prevention:</span> By recognizing and understanding these common mistakes, you can significantly improve your accuracy when applying {conceptName} in tests and exams. Review this section before attempting practice problems.
              </p>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {commonMistakes.map((mistake, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 [&[data-state=open]>div]:bg-slate-50 dark:[&[data-state=open]>div]:bg-slate-900/50">
                  <div className="flex items-center gap-2 w-full">
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                    <span className="font-medium">{mistake.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
                  <p className="text-muted-foreground">{mistake.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium">Correct Approach</h4>
                      </div>
                      <p className="text-sm">{mistake.correctExample}</p>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <h4 className="font-medium">Incorrect Approach</h4>
                      </div>
                      <p className="text-sm">{mistake.incorrectExample}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Prevention Tips</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {mistake.tips.map((tip, i) => (
                        <li key={i} className="text-sm">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonMistakesContent;
