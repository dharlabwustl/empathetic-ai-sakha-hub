
import { Routes, Route } from 'react-router-dom';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';
import ConceptsView from '@/components/dashboard/student/concepts/ConceptsView';
import FlashcardsView from '@/components/dashboard/student/flashcards/FlashcardsView';
import PracticeView from '@/components/dashboard/student/practice/PracticeView';
import BacklogView from '@/components/dashboard/student/backlog/BacklogView';
import StudyPlanView from '@/components/dashboard/student/studyplan/StudyPlanView';

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/studyplan" element={<StudyPlanView />} />
      <Route path="/concepts/:subject?" element={<ConceptsView />} />
      <Route path="/flashcards/:subject?" element={<FlashcardsView />} />
      <Route path="/practice/:subject?" element={<PracticeView />} />
      <Route path="/backlog" element={<BacklogView />} />
    </Routes>
  );
}
