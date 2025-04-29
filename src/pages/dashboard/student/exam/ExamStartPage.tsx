
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ExamStartPage = () => {
  const { examId } = useParams();

  return (
    <SharedPageLayout 
      title="Start Exam" 
      subtitle="Review exam details before you begin"
      showQuickAccess={false}
    >
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Exam #{examId}</h2>
        <p className="text-gray-600 mb-6">
          Please review the exam details below before starting. Once you begin, the timer will start and you cannot pause the exam.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Exam Details</h3>
            <ul className="space-y-2 text-gray-600">
              <li><span className="font-medium">Duration:</span> 60 minutes</li>
              <li><span className="font-medium">Questions:</span> 50</li>
              <li><span className="font-medium">Passing Score:</span> 70%</li>
              <li><span className="font-medium">Topics:</span> Mathematics, Physics</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Instructions</h3>
            <ul className="space-y-1 text-gray-600 list-disc list-inside">
              <li>Timer begins once you start</li>
              <li>You can flag questions for review</li>
              <li>Unanswered questions are marked as incorrect</li>
              <li>You cannot return to the exam once submitted</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link to="/dashboard/student/practice-exam">Cancel</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600">
            <Link to={`/dashboard/student/exams/attempt/${examId}`}>Begin Exam</Link>
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ExamStartPage;
