import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthCheck } from "./AuthCheck";
import { AdminCheck } from "./AdminCheck";
import { OnboardingCheck } from "./OnboardingCheck";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Logout from "./pages/Logout";
import CareersPage from "./pages/CareersPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import Team from "./pages/Team";
import PricingOld from "./pages/PricingOld";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import ProductComparison from "./pages/ProductComparison";
import GuideContainer from "./pages/guide/GuideContainer";
import BlogLayout from "./pages/guide/BlogLayout";
import LiveCoursesLayout from "./pages/guide/LiveCoursesLayout";
import ProgramPage from "./pages/ProgramPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminKPIs from "./pages/admin/AdminKPIs";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminExperiments from "./pages/admin/AdminExperiments";
import AdminSystemStatus from "./pages/admin/AdminSystemStatus";
import AdminExamData from "./pages/admin/AdminExamData";
import AdminCourseBuilder from "./pages/admin/AdminCourseBuilder";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StudentTodayPlan from "./pages/dashboard/student/StudentTodayPlan";
import StudentAcademic from "./pages/dashboard/student/StudentAcademic";
import StudentTutor from "./pages/dashboard/student/StudentTutor";
import StudentProgress from "./pages/dashboard/student/StudentProgress";
import StudentWellness from "./pages/dashboard/student/StudentWellness";
import StudentProfile from "./pages/dashboard/student/StudentProfile";
import StudentNotifications from "./pages/dashboard/student/StudentNotifications";
import StudentSyllabus from "./pages/dashboard/student/StudentSyllabus";
import StudentPreviousYearAnalysis from "./pages/dashboard/student/StudentPreviousYearAnalysis";
import StudentExams from "./pages/dashboard/student/StudentExams";
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import EmployeeAdvisor from "./pages/dashboard/employee/EmployeeAdvisor";
import EmployeeProductivity from "./pages/dashboard/employee/EmployeeProductivity";
import EmployeeTraining from "./pages/dashboard/employee/EmployeeTraining";
import EmployeeCareer from "./pages/dashboard/employee/EmployeeCareer";
import EmployeeMotivation from "./pages/dashboard/employee/EmployeeMotivation";
import EmployeeProfile from "./pages/dashboard/employee/EmployeeProfile";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import DoctorResearch from "./pages/dashboard/doctor/DoctorResearch";
import DoctorThesis from "./pages/dashboard/doctor/DoctorThesis";
import DoctorPublications from "./pages/dashboard/doctor/DoctorPublications";
import DoctorProfile from "./pages/dashboard/doctor/DoctorProfile";
import FounderDashboard from "./pages/dashboard/FounderDashboard";
import FounderAdvisor from "./pages/dashboard/founder/FounderAdvisor";
import FounderMVP from "./pages/dashboard/founder/FounderMVP";
import FounderMetrics from "./pages/dashboard/founder/FounderMetrics";
import FounderProfile from "./pages/dashboard/founder/FounderProfile";
import DashboardRedirect from "./pages/dashboard/DashboardRedirect";
import OtpVerification from "./pages/OtpVerification";
import FlashcardsPage from "./pages/dashboard/student/FlashcardsPage";
import ConceptCardsContainer from "./components/dashboard/student/concept-cards/ConceptCardsContainer";
import ConceptCardDetail from "./components/dashboard/student/concept-cards/ConceptCardDetail";
import ConceptStudyPage from "./components/dashboard/student/concept-cards/ConceptStudyPage";
import FormulaLabPage from "./pages/dashboard/student/FormulaLabPage";
import StudentForums from "./pages/dashboard/student/StudentForums";
import StudentVideos from "./pages/dashboard/student/StudentVideos";
import FeelGoodCorner from "./pages/dashboard/student/FeelGoodCorner";
import StudentMaterials from "./pages/dashboard/student/StudentMaterials";
import StudentForum from "./pages/dashboard/student/StudentForum";
import StudentForumTopic from "./pages/dashboard/student/StudentForumTopic";
import StudentProgressOverview from "./pages/dashboard/student/progress/StudentProgressOverview";
import StudentProgressSubjects from "./pages/dashboard/student/progress/StudentProgressSubjects";
import StudentProgressWeakAreas from "./pages/dashboard/student/progress/StudentProgressWeakAreas";
import StudentProgressExamReadiness from "./pages/dashboard/student/progress/StudentProgressExamReadiness";
import StudentProgressMockTests from "./pages/dashboard/student/progress/StudentProgressMockTests";
import AbilityTest from "./pages/dashboard/student/AbilityTest";
import StudentSettings from "./pages/dashboard/student/StudentSettings";
import FormulaMasteryPage from "./pages/dashboard/student/formula-mastery/FormulaMasteryPage";

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    // Log the current route
    console.log("Current Route:", location.pathname);
  }, [location]);
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />

      {/* Otp Verification Route */}
      <Route path="/otp-verification" element={<OtpVerification />} />
      
      <Route path="/team" element={<Team />} />
      <Route path="/pricing-old" element={<PricingOld />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/comparison" element={<ProductComparison />} />
      <Route path="/guide" element={<GuideContainer />} />
      <Route path="/guide/blog" element={<BlogLayout />} />
      <Route path="/guide/live-courses" element={<LiveCoursesLayout />} />

      {/* Program Routes */}
      <Route path="/programs/:programName" element={<ProgramPage />} />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard/*"
        element={<OnboardingCheck><DashboardRouter /></OnboardingCheck>}
      />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminCheck><AdminDashboard /></AdminCheck>} />
      <Route path="/admin/users" element={<AdminCheck><AdminUsers /></AdminCheck>} />
      <Route path="/admin/kpis" element={<AdminCheck><AdminKPIs /></AdminCheck>} />
      <Route path="/admin/feedback" element={<AdminCheck><AdminFeedback /></AdminCheck>} />
      <Route path="/admin/experiments" element={<AdminCheck><AdminExperiments /></AdminCheck>} />
      <Route path="/admin/system-status" element={<AdminCheck><AdminSystemStatus /></AdminCheck>} />
      <Route path="/admin/exam-data" element={<AdminCheck><AdminExamData /></AdminCheck>} />
      <Route path="/admin/course-builder" element={<AdminCheck><AdminCourseBuilder /></AdminCheck>} />

      {/* Student/User Routes */}
      <Route path="/profile" element={<AuthCheck><UserProfile /></AuthCheck>} />
      <Route path="/settings" element={<AuthCheck><Settings /></AuthCheck>} />
      <Route path="/notifications" element={<AuthCheck><Notifications /></AuthCheck>} />
      
      {/* 404 - Not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function DashboardRouter() {
  return (
    <Routes>
      {/* Student Dashboard */}
      <Route path="student" element={<StudentDashboard />} />
      <Route path="student/today" element={<StudentTodayPlan />} />
      <Route path="student/academic" element={<StudentAcademic />} />
      <Route path="student/tutor" element={<StudentTutor />} />
      <Route path="student/progress" element={<StudentProgress />} />
      <Route path="student/wellness" element={<StudentWellness />} />
      <Route path="student/profile" element={<StudentProfile />} />
      <Route path="student/notifications" element={<StudentNotifications />} />
      <Route path="student/syllabus" element={<StudentSyllabus />} />
      <Route path="student/previous-year-analysis" element={<StudentPreviousYearAnalysis />} />
      <Route path="student/exams" element={<StudentExams />} />
      <Route path="student/flashcards" element={<FlashcardsPage />} />
      <Route path="student/concepts" element={<ConceptCardsContainer />} />
      <Route path="student/concepts/:id" element={<ConceptCardDetail />} />
      <Route path="student/concepts/:id/study" element={<ConceptStudyPage />} />
      <Route path="student/formula-practice-lab" element={<FormulaLabPage />} />
      <Route path="student/formula-mastery" element={<FormulaMasteryPage />} />
      <Route path="student/forums" element={<StudentForums />} />
      <Route path="student/videos" element={<StudentVideos />} />
      <Route path="student/feel-good-corner" element={<FeelGoodCorner />} />
      <Route path="student/materials" element={<StudentMaterials />} />
      <Route path="student/forum" element={<StudentForum />} />
      <Route path="student/forum/:id" element={<StudentForumTopic />} />
      <Route path="student/progress/overview" element={<StudentProgressOverview />} />
      <Route path="student/progress/subjects" element={<StudentProgressSubjects />} />
      <Route path="student/progress/weak-areas" element={<StudentProgressWeakAreas />} />
      <Route path="student/progress/exam-readiness" element={<StudentProgressExamReadiness />} />
      <Route path="student/progress/mock-tests" element={<StudentProgressMockTests />} />
      <Route path="student/ability-test" element={<AbilityTest />} />
      <Route path="student/settings" element={<StudentSettings />} />

      {/* Employee Dashboard */}
      <Route path="employee" element={<EmployeeDashboard />} />
      <Route path="employee/advisor" element={<EmployeeAdvisor />} />
      <Route path="employee/productivity" element={<EmployeeProductivity />} />
      <Route path="employee/training" element={<EmployeeTraining />} />
      <Route path="employee/career" element={<EmployeeCareer />} />
      <Route path="employee/motivation" element={<EmployeeMotivation />} />
      <Route path="employee/profile" element={<EmployeeProfile />} />

      {/* Doctor Dashboard */}
      <Route path="doctor" element={<DoctorDashboard />} />
      <Route path="doctor/research" element={<DoctorResearch />} />
      <Route path="doctor/thesis" element={<DoctorThesis />} />
      <Route path="doctor/publications" element={<DoctorPublications />} />
      <Route path="doctor/profile" element={<DoctorProfile />} />

      {/* Founder Dashboard */}
      <Route path="founder" element={<FounderDashboard />} />
      <Route path="founder/advisor" element={<FounderAdvisor />} />
      <Route path="founder/mvp" element={<FounderMVP />} />
      <Route path="founder/metrics" element={<FounderMetrics />} />
      <Route path="founder/profile" element={<FounderProfile />} />

      {/* Default - redirect to appropriate dashboard */}
      <Route index element={<DashboardRedirect />} />
    </Routes>
  );
}

function DashboardRedirect() {
  const userType = localStorage.getItem("userType");

    switch (userType) {
        case "student":
            return <Navigate to="/dashboard/student" replace />;
        case "employee":
            return <Navigate to="/dashboard/employee" replace />;
        case "doctor":
            return <Navigate to="/dashboard/doctor" replace />;
        case "founder":
            return <Navigate to="/dashboard/founder" replace />;
        default:
            return <Navigate to="/login" replace />;
    }
}

function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
