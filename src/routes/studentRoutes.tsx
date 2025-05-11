
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentDashboard from '@/pages/dashboard/student/StudentDashboard';
import TodaysPlanView from '@/pages/dashboard/student/TodaysPlanView';
import AcademicAdvisorView from '@/pages/dashboard/student/AcademicAdvisorView';
import ConceptsPage from '@/pages/dashboard/student/ConceptsPage';
import FlashcardsPage from '@/pages/dashboard/student/FlashcardsPage';
import PracticeExamsList from '@/pages/dashboard/student/PracticeExamsList';
import FeelGoodCornerPage from '@/pages/dashboard/student/FeelGoodCornerPage';
import TutorView from '@/pages/dashboard/student/TutorView';
import StudentProfile from '@/pages/dashboard/student/StudentProfile';
import ExamSyllabusPage from '@/pages/dashboard/student/ExamSyllabusPage';
import PreviousYearAnalysisPage from '@/pages/dashboard/student/PreviousYearAnalysisPage';
import SidebarLayout from '@/components/dashboard/SidebarLayout';
import { DashboardLoading } from '@/pages/dashboard/student/DashboardLoading';
import NotFoundPage from '@/pages/NotFound';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/today" element={
        <SidebarLayout>
          <TodaysPlanView />
        </SidebarLayout>
      } />
      <Route path="/academic" element={
        <SidebarLayout>
          <AcademicAdvisorView />
        </SidebarLayout>
      } />
      <Route path="/concepts" element={
        <SidebarLayout>
          <ConceptsPage />
        </SidebarLayout>
      } />
      <Route path="/flashcards" element={
        <SidebarLayout>
          <FlashcardsPage />
        </SidebarLayout>
      } />
      <Route path="/practice-exam" element={
        <SidebarLayout>
          <PracticeExamsList />
        </SidebarLayout>
      } />
      <Route path="/syllabus" element={
        <SidebarLayout>
          <ExamSyllabusPage />
        </SidebarLayout>
      } />
      <Route path="/previous-year-analysis" element={
        <SidebarLayout>
          <PreviousYearAnalysisPage />
        </SidebarLayout>
      } />
      <Route path="/feel-good-corner" element={
        <SidebarLayout>
          <FeelGoodCornerPage />
        </SidebarLayout>
      } />
      <Route path="/tutor" element={
        <SidebarLayout>
          <TutorView />
        </SidebarLayout>
      } />
      <Route path="/profile" element={
        <SidebarLayout>
          <StudentProfile />
        </SidebarLayout>
      } />
      <Route path="/loading" element={<DashboardLoading />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default StudentRoutes;
