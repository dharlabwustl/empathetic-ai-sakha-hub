import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { PieChart, LayoutDashboard, BookOpen, Brain, Flame, CheckCircle, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import FlashcardVoiceAssistant from '@/components/voice/FlashcardVoiceAssistant';

const FlashcardsLandingPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState(70);

  useEffect(() => {
    // Mock progress update - replace with actual logic
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleCreateNew = () => {
    navigate('/dashboard/student/flashcards/create');
  };

  const mockStats = [
    { label: 'Total Flashcards', value: 120 },
    { label: 'Mastered', value: 85 },
    { label: 'In Progress', value: 30 },
    { label: 'Not Started', value: 5 }
  ];

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Review and memorize with smart flashcards"
    >
      <Helmet>
        <title>Flashcards - PREPZR</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0">
          <div className="flex flex-col space-y-1">
            <h2 className="text-2xl font-bold">Flashcard Library</h2>
            <p className="text-muted-foreground">
              Manage and review flashcards to boost your memory.
            </p>
          </div>
          <Button onClick={handleCreateNew}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Create New
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search flashcards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Subjects</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              {/* Add more subjects as needed */}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard View
          </Button>
        </div>

        {/* Progress and Stats Section */}
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">
              Overall Progress
            </CardTitle>
            <Button variant="ghost" size="sm">
              View Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Progress Meter */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full">
                    <circle
                      className="stroke-gray-200 dark:stroke-gray-700"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="50"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="stroke-blue-500"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="50"
                      cx="64"
                      cy="64"
                      style={{
                        strokeDasharray: `${progress * 3.14} ${314 - progress * 3.14}`,
                        strokeDashoffset: 75,
                        transition: 'stroke-dasharray 0.3s ease 0s',
                      }}
                    />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-lg font-bold text-gray-900 dark:text-white"
                    >
                      {progress}%
                    </text>
                  </svg>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Mastery Level
                </p>
              </div>

              {/* Key Statistics */}
              <div className="space-y-3">
                {mockStats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {stat.label}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      
      {/* Add voice assistant */}
      <FlashcardVoiceAssistant 
        userName="Student"
        isEnabled={true}
      />

        {/* Flashcard List Section - Placeholder */}
        <Card className="bg-white dark:bg-gray-800 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">
              Recent Flashcards
            </CardTitle>
            <Button variant="ghost" size="sm">
              See All
            </Button>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No flashcards available. Start creating your own!
            </p>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsLandingPage;
