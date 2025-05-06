
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDown, BookOpen, Brain, FileText, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface SyllabusProgress {
  totalTopics: number;
  completedTopics: number;
  timeSpent: number;
  avgExamScore: number;
  avgRecallScore: number;
}

const SyllabusPage = () => {
  const [viewMode, setViewMode] = useState<'accordion' | 'grid'>('accordion');
  const [selectedExam, setSelectedExam] = useState('NEET');

  const progress: Record<string, SyllabusProgress> = {
    Physics: {
      totalTopics: 100,
      completedTopics: 45,
      timeSpent: 24,
      avgExamScore: 78,
      avgRecallScore: 82
    },
    Chemistry: {
      totalTopics: 100,
      completedTopics: 60,
      timeSpent: 30,
      avgExamScore: 75,
      avgRecallScore: 80
    },
    Biology: {
      totalTopics: 100,
      completedTopics: 35,
      timeSpent: 20,
      avgExamScore: 70,
      avgRecallScore: 75
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Exam Syllabus</h1>
          <p className="text-gray-500">
            Last synced with your Study Plan | Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FileDown className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Progress Dashboard */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-violet-50 to-blue-50">
        <h2 className="text-lg font-semibold mb-4">Overall Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(progress).map(([subject, data]) => (
            <div key={subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject}</span>
                <span className="text-sm text-gray-500">
                  {data.completedTopics}/{data.totalTopics} topics
                </span>
              </div>
              <Progress value={(data.completedTopics / data.totalTopics) * 100} className="h-2" />
              <div className="text-sm text-gray-500">
                Time spent: {data.timeSpent}h | Avg. Score: {data.avgExamScore}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Syllabus Content */}
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="physics">
          <AccordionTrigger className="text-lg font-semibold">Physics</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-4">
              {/* Sample Topic */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Mechanics</h3>
                  <Badge variant="outline" className="bg-green-100">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </Badge>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Concept Card
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    Flashcards
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Practice
                  </Button>
                  <Badge className="bg-amber-100 text-amber-800">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    High Scoring
                  </Badge>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Add similar AccordionItems for Chemistry and Biology */}
      </Accordion>
    </div>
  );
};

export default SyllabusPage;
