
import React from 'react';
import { Link } from 'react-router-dom';
import PracticeExamCard, { PracticeExam } from './PracticeExamCard';

const PracticeExamsSection: React.FC = () => {
  // Mock practice exam data
  const exams: PracticeExam[] = [
    {
      id: "physics-101",
      title: "Physics Fundamentals",
      subject: "Physics",
      topic: "Mechanics",
      questionCount: 25,
      duration: 60,
      difficulty: "medium",
      status: "not-started"
    },
    {
      id: "chemistry-101",
      title: "Chemistry Basics",
      subject: "Chemistry",
      topic: "Periodic Table",
      questionCount: 30,
      duration: 45,
      difficulty: "easy",
      status: "in-progress"
    },
    {
      id: "biology-101",
      title: "Biology Essentials",
      subject: "Biology",
      topic: "Cell Biology",
      questionCount: 40,
      duration: 90,
      difficulty: "hard",
      status: "completed",
      score: 85,
      completedAt: "2023-05-15T14:30:00"
    },
    {
      id: "math-101",
      title: "Mathematics Review",
      subject: "Mathematics",
      topic: "Calculus",
      questionCount: 20,
      duration: 45,
      difficulty: "medium",
      status: "completed",
      score: 72,
      completedAt: "2023-05-10T10:15:00"
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {exams.map((exam) => (
          <PracticeExamCard key={exam.id} exam={exam} />
        ))}
      </div>
      
      {exams.length === 0 && (
        <div className="p-8 text-center bg-gray-100 rounded-lg">
          <p className="text-gray-500">No practice exams available. Check back later!</p>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <Link to="/dashboard/student/exams">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            View All Practice Exams
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PracticeExamsSection;
