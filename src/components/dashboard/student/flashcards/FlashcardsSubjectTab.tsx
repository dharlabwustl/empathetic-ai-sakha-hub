
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterSection } from '../shared/FilterSection';
import { StatusTabs } from '../shared/StatusTabs';
import { Brain, Clock, Target, Star } from 'lucide-react';

interface FlashcardsSubjectTabProps {
  subject: string;
}

export const FlashcardsSubjectTab: React.FC<FlashcardsSubjectTabProps> = ({ subject }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Mock data
  const flashcards = [
    {
      id: 1,
      title: "Physics Formulas & Constants",
      status: "strong",
      accuracy: 92,
      topic: "Mechanics",
      difficulty: "Medium",
      totalCards: 45,
      lastReviewed: "2 hours ago"
    },
    {
      id: 2,
      title: "Electromagnetic Theory",
      status: "weak",
      accuracy: 68,
      topic: "Electromagnetism",
      difficulty: "Hard",
      totalCards: 32,
      lastReviewed: "1 day ago"
    },
    {
      id: 3,
      title: "Thermodynamics Concepts",
      status: "unattempted",
      accuracy: 0,
      topic: "Heat",
      difficulty: "Medium",
      totalCards: 28,
      lastReviewed: "Never"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'strong', label: 'Strong' },
    { value: 'weak', label: 'Weak' },
    { value: 'unattempted', label: 'Unattempted' }
  ];

  const statusCounts = {
    all: flashcards.length,
    strong: flashcards.filter(f => f.status === 'strong').length,
    weak: flashcards.filter(f => f.status === 'weak').length,
    unattempted: flashcards.filter(f => f.status === 'unattempted').length
  };

  const filters = [
    {
      label: "Topic",
      options: [
        { value: 'all', label: 'All Topics' },
        { value: 'mechanics', label: 'Mechanics' },
        { value: 'thermodynamics', label: 'Thermodynamics' },
        { value: 'electromagnetism', label: 'Electromagnetism' }
      ],
      value: topicFilter,
      onChange: setTopicFilter
    },
    {
      label: "Difficulty",
      options: [
        { value: 'all', label: 'All Levels' },
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' }
      ],
      value: difficultyFilter,
      onChange: setDifficultyFilter
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong': return 'bg-green-100 text-green-800 border-green-200';
      case 'weak': return 'bg-red-100 text-red-800 border-red-200';
      case 'unattempted': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setTopicFilter('all');
    setDifficultyFilter('all');
  };

  const handleOpenFlashcard = () => {
    navigate('/dashboard/student/flashcards/1/interactive');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{subject} Flashcards</h2>
      </div>

      <StatusTabs
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        statusCounts={statusCounts}
        statusOptions={statusOptions}
      />

      <FilterSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onReset={handleReset}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((flashcard) => (
          <Card key={flashcard.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg line-clamp-2">{flashcard.title}</h3>
                <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 ml-2" />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className={getStatusColor(flashcard.status)}>
                  {flashcard.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  {flashcard.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {flashcard.topic}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span className={flashcard.accuracy >= 80 ? 'text-green-600 font-semibold' : flashcard.accuracy >= 60 ? 'text-yellow-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {flashcard.accuracy}%
                  </span>
                </div>
                {flashcard.accuracy > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${flashcard.accuracy >= 80 ? 'bg-green-500' : flashcard.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${flashcard.accuracy}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>{flashcard.totalCards} cards</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{flashcard.lastReviewed}</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={handleOpenFlashcard}
              >
                <Brain className="h-4 w-4 mr-2" />
                Open Flashcard
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
