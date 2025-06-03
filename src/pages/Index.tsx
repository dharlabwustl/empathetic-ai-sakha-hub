
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

// Lazy load components
import Home from "./Home";

const StudentRoutes = React.lazy(() => import("@/routes/studentRoutes"));

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Language selector for home page */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector variant="buttons" />
      </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/dashboard/student/*" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <StudentRoutes />
            </Suspense>
          } 
        />
      </Routes>
    </div>
  );
};

export default Index;
