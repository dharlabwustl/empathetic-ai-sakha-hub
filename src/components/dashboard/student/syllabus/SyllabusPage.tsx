import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const SyllabusPage: React.FC = () => {
  return (
    <SharedPageLayout title="Exam Syllabus" subtitle="Complete overview of your exam topics">
      {/* Content goes here - keeping the existing content */}
      <div className="space-y-6">
        {/* Syllabus sections and content will be rendered here */}
        {/* This component uses SharedPageLayout which already includes the sidebar,
            so we don't need an additional sidebar here */}
      </div>
    </SharedPageLayout>
  );
};

export default SyllabusPage;
