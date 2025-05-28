
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterSection } from '../shared/FilterSection';
import { StatusTabs } from '../shared/StatusTabs';
import { FileText, Clock, Target, Trophy, Play, Eye } from 'lucide-react';

interface PracticeExamsSubjectTabProps {
  subject: string;
}

export const PracticeExamsSubjectTab: React.FC<PracticeExamsSubjectTabProps> = ({ subject }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data
  const exams = [
    {
      id: 1,
      title: "NEET Physics Mock Test 1",
      status: "attempted",
      score: 85,
      duration: 180,
      questions: 45,
      type: "Full-Length",
      topic: "All Topics",
      difficulty: "Medium",
      attemptedAt: "2 days ago"
    },
    {
      id: 2,
      title: "Mechanics Sectional Test",
      status: "not-attempted",
      score: null,
      duration: 60,
      questions: 15,
      type: "Sectional",
      topic: "Mechanics",
      difficulty: "Hard",
      attemptedAt: null
    },
    {
      id: 3,
      title: "Thermodynamics Practice",
      status: "completed",
      score: 92,
      duration: 45,
      questions: 10,
      type: "Sectional",
      topic: "Thermodynamics",
      difficulty: "Medium",
      attemptedAt: "1 week ago"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'attempted', label: 'Attempted' },
    { value: 'not-attempted', label: 'Not Attempted' },
    { value: 'completed', label: 'Completed' }
  ];

  const statusCounts = {
    all: exams.length,
    attempted: exams.filter(e => e.status === 'attempted').length,
    'not-attempted': exams.filter(e => e.status === 'not-attempted').length,
    completed: exams.filter(e => e.status === 'completed').length
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
      label: "Duration",
      options: [
        { value: 'all', label: 'All Durations' },
        { value: 'short', label: 'Short (< 60 min)' },
        { value: 'medium', label: 'Medium (60-120 min)' },
        { value: 'long', label: 'Long (> 120 min)' }
      ],
      value: durationFilter,
      onChange: setDurationFilter
    },
    {
      label: "Type",
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'full-length', label: 'Full-Length' },
        { value: 'sectional', label: 'Sectional' }
      ],
      value: typeFilter,
      onChange: setTypeFilter
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'attempted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not-attempted': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setTopicFilter('all');
    setDurationFilter('all');
    setTypeFilter('all');
  };

  const handleStartExam = (examId: number) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleViewResult = (examId: number) => {
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{subject} Practice Exams</h2>
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
        {exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg line-clamp-2">{exam.title}</h3>
                <FileText className="h-5 w-5 text-blue-400 flex-shrink-0 ml-2" />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className={getStatusColor(exam.status)}>
                  {exam.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {exam.type}
                </Badge>
                {exam.score && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Score: {exam.score}%
                  </Badge>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{exam.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    <span>{exam.questions} questions</span>
                  </div>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Topic: </span>
                  <span className="text-gray-600">{exam.topic}</span>
                </div>

                {exam.attemptedAt && (
                  <div className="text-xs text-gray-500">
                    Last attempted: {exam.attemptedAt}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {exam.status === 'not-attempted' ? (
                  <Button 
                    className="flex-1" 
                    onClick={() => handleStartExam(exam.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Exam
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline"
                      className="flex-1" 
                      onClick={() => handleViewResult(exam.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Result
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={() => handleStartExam(exam.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Retake
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
