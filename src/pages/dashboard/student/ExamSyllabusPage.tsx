
import React from 'react';
import SidebarLayout from '@/components/dashboard/SidebarLayout';
import ExamSyllabusView from '@/components/dashboard/student/syllabus/ExamSyllabusView';

const ExamSyllabusPage: React.FC = () => {
  return (
    <SidebarLayout>
      <div className="flex-1 p-4 md:p-6">
        <ExamSyllabusView />
      </div>
    </SidebarLayout>
  );
};

export default ExamSyllabusPage;
