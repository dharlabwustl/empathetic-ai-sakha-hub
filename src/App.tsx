import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Pricing from "@/pages/Pricing";
import CheckoutPage from "@/pages/CheckoutPage";
import PaymentPage from "@/pages/PaymentPage";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Features from "@/pages/Features";
import AuthPage from "@/pages/AuthPage";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import AdminRoutes from "@/routes/AdminRoutes";
import StudentDashboardRoutes from "@/routes/StudentDashboardRoutes";
import TeacherDashboardRoutes from "@/routes/TeacherDashboardRoutes";
import SchoolDashboardRoutes from "@/routes/SchoolDashboardRoutes";
import CorporateDashboardRoutes from "@/routes/CorporateDashboardRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/dashboard/student/*" element={<StudentDashboardRoutes />} />
        <Route path="/dashboard/teacher/*" element={<TeacherDashboardRoutes />} />
        <Route path="/dashboard/school/*" element={<SchoolDashboardRoutes />} />
        <Route path="/dashboard/corporate/*" element={<CorporateDashboardRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
