
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FilterSection } from '../shared/FilterSection';
import { StatusTabs } from '../shared/StatusTabs';
import { Clock, BookOpen, Target, Star } from 'lucide-react';

interface ConceptsSubjectTabProps {
  subject: string;
}

export const ConceptsSubjectTab: React.FC<ConceptsSubjectTabProps> = ({ subject }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [weightageFilter, setWeightageFilter] = useState('all');

  // Mock data
  const concepts = [
    {
      id: 1,
      title: "Newton's Laws of Motion",
      status: "in-progress",
      completion: 65,
      description: "Understanding the three fundamental laws of motion",
      studyTime: "25 min",
      examWeightage: "High",
      difficulty: "Medium",
      topic: "Mechanics"
    },
    {
      id: 2,
      title: "Electromagnetic Induction",
      status: "completed",
      completion: 100,
      description: "Faraday's law and Lenz's law applications",
      studyTime: "30 min",
      examWeightage: "High",
      difficulty: "Hard",
      topic: "Electromagnetism"
    },
    {
      id: 3,
      title: "Thermodynamics",
      status: "pending",
      completion: 0,
      description: "Laws of thermodynamics and heat engines",
      studyTime: "35 min",
      examWeightage: "Medium",
      difficulty: "Hard",
      topic: "Heat"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ];

  const statusCounts = {
    all: concepts.length,
    'in-progress': concepts.filter(c => c.status === 'in-progress').length,
    pending: concepts.filter(c => c.status === 'pending').length,
    completed: concepts.filter(c => c.status === 'completed').length
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
    },
    {
      label: "Exam Weightage",
      options: [
        { value: 'all', label: 'All Weightage' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
      ],
      value: weightageFilter,
      onChange: setWeightageFilter
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setTopicFilter('all');
    setDifficultyFilter('all');
    setWeightageFilter('all');
  };

  const handleViewConcept = (conceptId: number) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{subject} Concepts</h2>
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
        {concepts.map((concept) => (
          <Card key={concept.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg line-clamp-2">{concept.title}</h3>
                <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 ml-2" />
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {concept.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className={getStatusColor(concept.status)}>
                  {concept.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                  {concept.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {concept.examWeightage} Weight
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{concept.completion}%</span>
                </div>
                <Progress value={concept.completion} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{concept.studyTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>{concept.topic}</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={() => handleViewConcept(concept.id)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View Concept Card
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
