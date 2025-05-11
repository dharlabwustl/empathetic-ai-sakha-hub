
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
import FormulaLabPage from "@/pages/dashboard/student/formula-lab/FormulaLabPage";
import FlashcardPracticePage from "@/pages/dashboard/student/flashcard/FlashcardPracticePage";
import FormulaPracticePage from "@/pages/dashboard/student/FormulaPracticePage";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import SignupDatabaseMappingPage from "@/pages/documentation/SignupDatabaseMappingPage";
import PagewiseDatabaseMappingPage from "@/pages/documentation/PagewiseDatabaseMappingPage";
import DocumentationHubPage from "@/pages/documentation/DocumentationHubPage";

const AppRoutes: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const kpis = []; // Define your KPIs here or fetch them
  
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview userProfile={userProfile} kpis={kpis} />} />
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
      <Route path="/tutor" element={<DashboardOverview userProfile={userProfile} kpis={kpis} />} />
      
      {/* Documentation routes */}
      <Route path="/documentation" element={<DocumentationHubPage />} />
      <Route path="/documentation/signup-database-mapping" element={<SignupDatabaseMappingPage />} />
      <Route path="/documentation/pagewise-mapping" element={<PagewiseDatabaseMappingPage />} />
      <Route path="/signup-database-mapping" element={<SignupDatabaseMappingPage />} />
      <Route path="/pagewise-mapping" element={<PagewiseDatabaseMappingPage />} />
      
      {/* Make test.prepzr.com paths accessible */}
      <Route path="/test.prepzr.com/documentation" element={<DocumentationHubPage />} />
      <Route path="/test.prepzr.com/documentation/signup-database-mapping" element={<SignupDatabaseMappingPage />} />
      <Route path="/test.prepzr.com/documentation/pagewise-mapping" element={<PagewiseDatabaseMappingPage />} />
      <Route path="test.prepzr.com/documentation/signup-database-mapping" element={<SignupDatabaseMappingPage />} />
      <Route path="test.prepzr.com/documentation/pagewise-mapping" element={<PagewiseDatabaseMappingPage />} />
    </Routes>
  );
};

export default AppRoutes;
