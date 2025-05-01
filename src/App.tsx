
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import studentRoutes from '@/routes/student.routes';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/student/overview" replace />} />
        <Route path="/dashboard">
          {studentRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
