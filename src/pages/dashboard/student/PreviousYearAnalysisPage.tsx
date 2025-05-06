
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDown, BookOpen, Brain, FileText, TrendingUp } from 'lucide-react';

const PreviousYearAnalysisPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];
  const subjects = ['Physics', 'Chemistry', 'Biology'];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Previous Year Papers Analysis</h1>
          <p className="text-gray-500">
            Analyzing patterns from {years[years.length - 1]} to {years[0]}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Download PYQs
          </Button>
          <Button variant="default">Attempt Full Paper</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {subjects.map(subject => (
          <Card key={subject} className="p-4">
            <h3 className="font-semibold mb-2">{subject}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Questions</span>
                <span>45</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg. Difficulty</span>
                <span>Medium</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Success Rate</span>
                <span>65%</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Question Analysis */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Question Analysis</h2>
        {/* Sample Question Card */}
        <Card className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-sm text-gray-500">Physics - Mechanics</span>
              <h3 className="font-medium mt-1">
                A ball is thrown vertically upward with initial velocity...
              </h3>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Concept
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                Practice
              </Button>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Difficulty: Medium</span>
            <span>Success Rate: 45%</span>
            <span>Appeared in: 2023, 2021, 2019</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PreviousYearAnalysisPage;
