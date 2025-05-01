
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import studentRoutes from '@/routes/student.routes';
import { Toaster } from "@/components/ui/toaster";
import SignUp from '@/pages/SignUp';
import WelcomeScreen from '@/pages/dashboard/WelcomeScreen';
import PostLoginPrompt from '@/pages/dashboard/PostLoginPrompt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/student/overview" replace />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/post-login" element={<PostLoginPrompt />} />
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
