
import { Routes, Route } from 'react-router-dom';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';
import ConceptsView from '@/components/dashboard/student/concepts/ConceptsView';
import FlashcardsView from '@/components/dashboard/student/flashcards/FlashcardsView';
import PracticeView from '@/components/dashboard/student/practice/PracticeView';
import BacklogView from '@/components/dashboard/student/backlog/BacklogView';
import StudyPlanView from '@/components/dashboard/student/studyplan/StudyPlanView';
import ProfileView from '@/pages/dashboard/student/ProfilePage';
import BatchManagementView from '@/pages/dashboard/student/BatchManagementView';
import SubscriptionView from '@/pages/dashboard/student/SubscriptionPage';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/studyplan" element={<StudyPlanView />} />
      <Route path="/concepts/:subject?" element={<ConceptsView />} />
      <Route path="/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
      <Route path="/flashcards/:subject?" element={<FlashcardsView />} />
      <Route path="/practice/:subject?" element={<PracticeView />} />
      <Route path="/backlog" element={<BacklogView />} />
      <Route path="/profile" element={<ProfileView />} />
      <Route path="/batch" element={<BatchManagementView />} />
      <Route path="/subscription" element={<SubscriptionView />} />
      <Route path="/tutor" element={<div>24/7 AI Tutor</div>} />
      <Route path="/academic" element={<div>Academic Advisor</div>} />
      <Route path="/wellness" element={<div>Feel Good Corner</div>} />
    </Routes>
  );
}
