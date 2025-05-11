
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme/ThemeContext';
import { AuthProvider } from './contexts/auth/AuthContext';
import { Toaster } from './components/ui/toaster';
import router from './routes';
import './App.css';
import '@/styles/tailwind.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
