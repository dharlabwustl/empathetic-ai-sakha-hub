import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import DatabaseExport from './pages/database/DatabaseExport';
import DatabaseSchemaCSVPage from './pages/database/DatabaseSchemaCSVPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/database/export" element={<DatabaseExport />} />
        <Route path="/database/schema" element={<DatabaseSchemaCSVPage />} />
      </Routes>
    </Router>
  );
}

export default App;
