
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/admin/Dashboard";
import StudentManagement from "@/pages/admin/StudentManagement";
import ContentManagement from "@/pages/admin/ContentManagement";
import Settings from "@/pages/admin/Settings";
import FlaskMySQLGuide from "@/components/admin/documentation/FlaskMySQLGuide";
import NotFound from "@/pages/NotFound";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<StudentManagement />} />
      <Route path="/content" element={<ContentManagement />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/flask-guide" element={<FlaskMySQLGuide />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
