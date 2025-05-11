
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

// Enhanced KPI data for the dashboard
const updatedKpis = [
  {
    id: "total-students",
    title: "Total Students",
    value: 24650,
    change: 1250,
    changeType: "increase"
  },
  {
    id: "success-rate",
    title: "Success Rate",
    value: 92,
    unit: "%",
    change: 5,
    changeType: "increase"
  },
  {
    id: "study-plans",
    title: "Dynamic Study Plans",
    value: 14520,
    change: 820,
    changeType: "increase"
  },
  {
    id: "stress-reduced",
    title: "Feel Stress Reduced",
    value: 85,
    unit: "%",
    change: 10,
    changeType: "increase"
  }
];

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview kpis={updatedKpis} />} />
      <Route path="/today" element={<TodaysPlanView kpis={updatedKpis} />} />
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
      <Route path="/academic" element={<AcademicAdvisorView />} />
      <Route path="/academic-advisor" element={<AcademicAdvisorView />} />
      <Route path="/formula-practice" element={<FormulaPracticePage />} />
      <Route path="/tutor" element={<DashboardOverview />} />
    </Routes>
  );
};

export default AppRoutes;
