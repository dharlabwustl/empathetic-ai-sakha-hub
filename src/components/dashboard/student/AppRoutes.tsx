
import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoadingScreen from '@/components/common/LoadingScreen';
import DashboardWrapper from './DashboardWrapper';
import ConceptStudyPage from './concepts/ConceptStudyPage';
import ConceptCardDetailPage from '@/pages/dashboard/student/ConceptCardDetailPage';

// Lazy load routes for better performance
const DashboardOverview = lazy(() => import('@/pages/dashboard/student/DashboardPage'));
const ConceptsPage = lazy(() => import('@/pages/dashboard/student/ConceptsPage'));
const PracticePage = lazy(() => import('@/pages/dashboard/student/PracticeExamPage'));
const StudyPlanPage = lazy(() => import('@/pages/dashboard/student/StudyPlanPage'));
const ProfilePage = lazy(() => import('@/pages/dashboard/student/ProfilePage'));
const AnalyticsPage = lazy(() => import('@/pages/dashboard/student/AnalyticsPage'));
const TodaysPlanPage = lazy(() => import('@/pages/dashboard/student/TodaysPlanPage'));
const FlashcardsPage = lazy(() => import('@/pages/dashboard/student/FlashcardsPage'));
const NotificationsPage = lazy(() => import('@/pages/dashboard/student/NotificationsPage'));
const FeelGoodCornerPage = lazy(() => import('@/pages/dashboard/student/FeelGoodCornerPage'));
const StudyGroups = lazy(() => import('@/pages/dashboard/student/StudyGroupsPage'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardWrapper />}>
        <Route index element={
          <Suspense fallback={<LoadingScreen />}>
            <DashboardOverview />
          </Suspense>
        } />
        <Route path="concepts" element={
          <Suspense fallback={<LoadingScreen />}>
            <ConceptsPage />
          </Suspense>
        } />
        <Route path="concepts/:conceptId" element={<ConceptStudyPage />} />
        <Route path="concepts/card/:conceptId" element={
          <Suspense fallback={<LoadingScreen />}>
            <ConceptCardDetailPage />
          </Suspense>
        } />
        <Route path="practice" element={
          <Suspense fallback={<LoadingScreen />}>
            <PracticePage />
          </Suspense>
        } />
        <Route path="study-plan" element={
          <Suspense fallback={<LoadingScreen />}>
            <StudyPlanPage />
          </Suspense>
        } />
        <Route path="profile" element={
          <Suspense fallback={<LoadingScreen />}>
            <ProfilePage />
          </Suspense>
        } />
        <Route path="analytics" element={
          <Suspense fallback={<LoadingScreen />}>
            <AnalyticsPage />
          </Suspense>
        } />
        <Route path="todays-plan" element={
          <Suspense fallback={<LoadingScreen />}>
            <TodaysPlanPage />
          </Suspense>
        } />
        <Route path="flashcards" element={
          <Suspense fallback={<LoadingScreen />}>
            <FlashcardsPage />
          </Suspense>
        } />
        <Route path="notifications" element={
          <Suspense fallback={<LoadingScreen />}>
            <NotificationsPage />
          </Suspense>
        } />
        <Route path="feel-good-corner" element={
          <Suspense fallback={<LoadingScreen />}>
            <FeelGoodCornerPage />
          </Suspense>
        } />
        <Route path="study-groups" element={
          <Suspense fallback={<LoadingScreen />}>
            <StudyGroups />
          </Suspense>
        } />
        <Route path="*" element={<Navigate to="/dashboard/student" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
