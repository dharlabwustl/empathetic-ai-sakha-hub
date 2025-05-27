
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PracticeExamOverviewSection from './PracticeExamOverviewSection';

const PracticeExamsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubjectTab, setActiveSubjectTab] = useState('all');

  const mockExams = {
    physics: {
      all: [
        { id: 1, title: "Mechanics Mock Test", status: "completed", difficulty: "medium", score: 85 },
        { id: 2, title: "Optics Practice Exam", status: "in-progress", difficulty: "hard", score: null },
        { id: 3, title: "Thermodynamics Test", status: "pending", difficulty: "medium", score: null }
      ],
      pending: [
        { id: 3, title: "Thermodynamics Test", status: "pending", difficulty: "medium", score: null }
      ],
      inProgress: [
        { id: 2, title: "Optics Practice Exam", status: "in-progress", difficulty: "hard", score: null }
      ],
      completed: [
        { id: 1, title: "Mechanics Mock Test", status: "completed", difficulty: "medium", score: 85 }
      ]
    },
    chemistry: {
      all: [
        { id: 4, title: "Organic Chemistry Exam", status: "completed", difficulty: "hard", score: 78 },
        { id: 5, title: "Chemical Bonding Test", status: "in-progress", difficulty: "medium", score: null }
      ],
      pending: [],
      inProgress: [
        { id: 5, title: "Chemical Bonding Test", status: "in-progress", difficulty: "medium", score: null }
      ],
      completed: [
        { id: 4, title: "Organic Chemistry Exam", status: "completed", difficulty: "hard", score: 78 }
      ]
    },
    biology: {
      all: [
        { id: 6, title: "Cell Biology Mock", status: "completed", difficulty: "easy", score: 92 },
        { id: 7, title: "Genetics Practice Test", status: "in-progress", difficulty: "hard", score: null }
      ],
      pending: [],
      inProgress: [
        { id: 7, title: "Genetics Practice Test", status: "in-progress", difficulty: "hard", score: null }
      ],
      completed: [
        { id: 6, title: "Cell Biology Mock", status: "completed", difficulty: "easy", score: 92 }
      ]
    }
  };

  const renderExamList = (exams: any[]) => {
    if (exams.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No practice exams found in this category.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map((exam) => (
          <div key={exam.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-medium">{exam.title}</h3>
            <div className="mt-2 flex justify-between items-center">
              <span className={`px-2 py-1 rounded text-xs ${
                exam.status === 'completed' ? 'bg-green-100 text-green-800' :
                exam.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {exam.status}
              </span>
              <div className="flex gap-2">
                {exam.score && (
                  <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                    Score: {exam.score}%
                  </span>
                )}
                <span className={`px-2 py-1 rounded text-xs ${
                  exam.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                  exam.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {exam.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSubjectContent = (subject: keyof typeof mockExams) => {
    return (
      <Tabs value={activeSubjectTab} onValueChange={setActiveSubjectTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderExamList(mockExams[subject].all)}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          {renderExamList(mockExams[subject].pending)}
        </TabsContent>

        <TabsContent value="inProgress" className="mt-6">
          {renderExamList(mockExams[subject].inProgress)}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {renderExamList(mockExams[subject].completed)}
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PracticeExamOverviewSection />
        </TabsContent>

        <TabsContent value="physics">
          {renderSubjectContent('physics')}
        </TabsContent>

        <TabsContent value="chemistry">
          {renderSubjectContent('chemistry')}
        </TabsContent>

        <TabsContent value="biology">
          {renderSubjectContent('biology')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeExamsSection;
