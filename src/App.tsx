
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import ConceptCardStudyPage from "./pages/student/ConceptCardStudyPage";
import ConceptCardsListPage from "./pages/dashboard/student/ConceptCardsListPage";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="sakha-theme">
      <AuthProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Student Dashboard Routes */}
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/student/:tab" element={<StudentDashboard />} />
              
              {/* Concept Card Routes */}
              <Route path="/dashboard/student/concepts" element={<ConceptCardsListPage />} />
              <Route path="/study/concept-card/:cardId" element={<ConceptCardStudyPage />} />
              
              {/* Fallback routes */}
              <Route path="/dashboard" element={<Navigate to="/dashboard/student" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <Toaster />
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
