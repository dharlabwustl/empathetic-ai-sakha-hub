
import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardOverview from "./DashboardOverview";
import TodaysPlanView from "./todays-plan/TodaysPlanView";
import StudyPlanView from "./studyplan/StudyPlanView";
import ConceptsView from "./concepts/ConceptsView";
import ConceptDetailPage from "@/pages/dashboard/student/ConceptDetailPage";
import FlashcardsView from "./flashcards/FlashcardsView";
import NotificationsView from "./notifications/NotificationsView";
import PracticeExamsView from "./practice-exam/PracticeExamsView";
import FeelGoodCorner from "./feel-good-corner/FeelGoodCorner";
import AcademicAdvisorView from "./academic/AcademicAdvisorView";
import ConceptCardDetail from "./concept-cards/ConceptCardDetail";
import FormulaLabPage from "./formula-lab/FormulaLabPage";
import FlashcardPracticePage from "@/pages/dashboard/student/flashcard/FlashcardPracticePage";
import FormulaPracticePage from "@/pages/dashboard/student/FormulaPracticePage";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";

const AppRoutes: React.FC = () => {
  // Get user profile for required props
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  
  // Mock KPI data for overview
  const mockKpis = [
    { id: "1", title: "Study Hours", value: 12, change: 2, changeType: "positive" },
    { id: "2", title: "Concepts Mastered", value: 48, change: 5, changeType: "positive" },
    { id: "3", title: "Study Plans", value: 3, change: 1, changeType: "positive" },
    { id: "4", title: "Mood Improvement", value: 72, unit: "%", change: 8, changeType: "positive" }
  ];

  if (loading || !userProfile) {
    return <div>Loading routes...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardOverview userProfile={userProfile} kpis={mockKpis} />} />
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/plan" element={<StudyPlanView />} />
      <Route path="/concepts" element={<ConceptsView />} />
      <Route path="/concepts/:id" element={<ConceptDetailPage />} />
      <Route path="/concepts/:conceptId/formula-lab" element={<FormulaLabPage />} />
      <Route path="/concepts/card/:id" element={<ConceptCardDetail />} />
      <Route path="/flashcards" element={<FlashcardsView />} />
      <Route path="/flashcards/:deckId" element={<FlashcardPracticePage />} />
      <Route path="/notifications" element={<NotificationsView />} />
      <Route path="/practice-exam" element={<PracticeExamsView />} />
      <Route path="/feel-good-corner" element={<FeelGoodCorner />} />
      <Route path="/academic" element={<AcademicAdvisorView userProfile={userProfile} />} />
      <Route path="/academic-advisor" element={<AcademicAdvisorView userProfile={userProfile} />} />
      <Route path="/formula-practice" element={<FormulaPracticePage />} />
      <Route path="/tutor" element={<DashboardOverview userProfile={userProfile} kpis={mockKpis} />} />
    </Routes>
  );
};

export default AppRoutes;
