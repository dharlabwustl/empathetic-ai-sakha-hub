
import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardOverview from "./DashboardOverview";
import TodaysPlanView from "./todays-plan/TodaysPlanView";
import StudyPlanView from "./studyplan/StudyPlanView";
import ConceptsView from "./concepts/ConceptsView";
import ConceptCardDetailPage from "@/components/dashboard/student/concepts/ConceptCardDetailPage";
import FlashcardsView from "./flashcards/FlashcardsView";
import NotificationsView from "./notifications/NotificationsView";
import PracticeExamsView from "./practice-exam/PracticeExamsView";
import FeelGoodCorner from "./feel-good-corner/FeelGoodCorner";
import AcademicAdvisorView from "./academic/AcademicAdvisorView";
import FormulaLabPage from "@/pages/dashboard/student/formula-lab/FormulaLabPage";
import FlashcardPracticePage from "@/pages/dashboard/student/flashcard/FlashcardPracticePage";
import FormulaPracticePage from "@/pages/dashboard/student/FormulaPracticePage";
import AnalyticsDashboard from "@/components/dashboard/student/analytics/AnalyticsDashboard";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import ConceptStudyPage from "@/pages/dashboard/student/ConceptStudyPage";
import { useIsMobile } from "@/hooks/use-mobile";

const AppRoutes: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const isMobile = useIsMobile();
  const kpis = []; // Define your KPIs here or fetch them
  
  // Log routing information for debugging
  console.log("AppRoutes - Mobile view:", isMobile ? "Yes" : "No");
  
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview userProfile={userProfile} kpis={kpis} />} />
      <Route path="/today" element={<TodaysPlanView />} />
      <Route path="/plan" element={<StudyPlanView />} />
      <Route path="/concepts" element={<ConceptsView />} />
      <Route path="/concepts/:conceptId" element={<ConceptCardDetailPage />} />
      <Route path="/concept-study/:conceptId" element={<ConceptStudyPage />} />
      <Route path="/concepts/:conceptId/formula-lab" element={<FormulaLabPage />} />
      <Route path="/flashcards" element={<FlashcardsView />} />
      <Route path="/flashcards/:deckId" element={<FlashcardPracticePage />} />
      <Route path="/notifications" element={<NotificationsView />} />
      <Route path="/practice-exam" element={<PracticeExamsView />} />
      <Route path="/feel-good-corner" element={<FeelGoodCorner />} />
      <Route path="/academic" element={<AcademicAdvisorView userProfile={userProfile} />} />
      <Route path="/academic-advisor" element={<AcademicAdvisorView userProfile={userProfile} />} />
      <Route path="/formula-practice" element={<FormulaPracticePage />} />
      <Route path="/tutor" element={<DashboardOverview userProfile={userProfile} kpis={kpis} />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
