
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, BarChart } from 'lucide-react';

interface ConceptExamSectionProps {
  conceptName: string;
}

const ConceptExamSection: React.FC<ConceptExamSectionProps> = ({ conceptName }) => {
  // Sample exam appearance data
  const examAppearances = [
    {
      exam: "NEET",
      frequency: "High",
      averageMarks: 8,
      totalQuestions: 12,
      years: ["2023", "2022", "2021", "2020", "2019"]
    },
    {
      exam: "JEE Main",
      frequency: "Medium",
      averageMarks: 4,
      totalQuestions: 6,
      years: ["2023", "2022", "2020"]
    },
    {
      exam: "JEE Advanced",
      frequency: "Low",
      averageMarks: 3,
      totalQuestions: 3,
      years: ["2022", "2019"]
    }
  ];

  const frequencyColors = {
    "High": "bg-red-100 text-red-800 border-red-200",
    "Medium": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Low": "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" />
          {conceptName} in Exams
        </CardTitle>
        <CardDescription>
          How this concept appears in competitive exams
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {examAppearances.map((item, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm">
              <div className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{item.exam}</h3>
                  <Badge variant="outline" className={frequencyColors[item.frequency]}>
                    {item.frequency} Frequency
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-center">
                    <p className="text-xs text-gray-500 mb-1">Questions</p>
                    <p className="text-xl font-bold">{item.totalQuestions}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-center">
                    <p className="text-xs text-gray-500 mb-1">Avg. Marks</p>
                    <p className="text-xl font-bold">{item.averageMarks}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Appearing Years</p>
                  <div className="flex flex-wrap gap-1">
                    {item.years.map((year, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{year}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Button variant="ghost" className="w-full" size="sm">
                    View Questions <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="gap-2">
            <BarChart className="h-4 w-4" />
            View Detailed Exam Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptExamSection;
