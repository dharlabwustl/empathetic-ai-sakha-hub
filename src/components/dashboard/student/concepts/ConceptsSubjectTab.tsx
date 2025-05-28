
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterSection } from '../shared/FilterSection';
import { StatusTabs } from '../shared/StatusTabs';
import { BookOpen, Clock, Target, Star, TrendingUp, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

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

  // Mock data with enhanced information
  const concepts = [
    {
      id: 1,
      title: "Newton's Laws of Motion",
      status: "completed",
      completion: 100,
      description: "Fundamental principles governing motion and forces",
      studyTime: "25 min",
      examWeightage: "High",
      difficulty: "Medium",
      topic: "Mechanics",
      lastStudied: "2 days ago",
      accuracy: 92,
      isFavorite: true,
      conceptCount: 12,
      practiceQuestions: 45
    },
    {
      id: 2,
      title: "Electromagnetic Induction",
      status: "in-progress",
      completion: 65,
      description: "Faraday's law and induced EMF concepts",
      studyTime: "35 min",
      examWeightage: "High",
      difficulty: "Hard",
      topic: "Electromagnetism",
      lastStudied: "1 day ago",
      accuracy: 78,
      isFavorite: false,
      conceptCount: 18,
      practiceQuestions: 62
    },
    {
      id: 3,
      title: "Thermodynamic Processes",
      status: "pending",
      completion: 0,
      description: "Isothermal, adiabatic, and other processes",
      studyTime: "30 min",
      examWeightage: "Medium",
      difficulty: "Medium",
      topic: "Thermodynamics",
      lastStudied: null,
      accuracy: null,
      isFavorite: false,
      conceptCount: 15,
      practiceQuestions: 38
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'pending', label: 'Pending' }
  ];

  const statusCounts = {
    all: concepts.length,
    completed: concepts.filter(c => c.status === 'completed').length,
    'in-progress': concepts.filter(c => c.status === 'in-progress').length,
    pending: concepts.filter(c => c.status === 'pending').length
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
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWeightageColor = (weightage: string) => {
    switch (weightage) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
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
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {concepts.filter(c => c.status === 'completed').length}/{concepts.length} Mastered
        </Badge>
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
          <Card 
            key={concept.id} 
            className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-blue-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
          >
            <CardContent className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  {concept.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className={getStatusColor(concept.status)}>
                    {concept.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                </div>
              </div>

              {/* Title and Description */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {concept.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {concept.description}
                </p>
              </div>

              {/* Progress Bar (for in-progress concepts) */}
              {concept.status === 'in-progress' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{concept.completion}%</span>
                  </div>
                  <Progress value={concept.completion} className="h-2" />
                </div>
              )}

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{concept.studyTime}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{concept.practiceQuestions} Qs</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                  {concept.difficulty}
                </Badge>
                <Badge variant="outline" className={getWeightageColor(concept.examWeightage)}>
                  {concept.examWeightage} Priority
                </Badge>
                {concept.accuracy && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {concept.accuracy}% accuracy
                  </Badge>
                )}
              </div>

              {/* Additional Info */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{concept.conceptCount} sub-concepts</span>
                  {concept.lastStudied && <span>Studied {concept.lastStudied}</span>}
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full group-hover:bg-blue-600 group-hover:shadow-lg transition-all duration-200" 
                onClick={() => handleViewConcept(concept.id)}
              >
                <Play className="h-4 w-4 mr-2" />
                {concept.status === 'completed' ? 'Review Concept' : 
                 concept.status === 'in-progress' ? 'Continue Learning' : 'Start Learning'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
