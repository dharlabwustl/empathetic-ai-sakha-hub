
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/auth/AuthContext';

// Main Pages
import SignUp from '@/pages/SignUp';
import Index from '@/pages/Index';
import Login from '@/pages/auth/Login';

// Dashboard pages
const StudentDashboard = React.lazy(() => import('@/pages/dashboard/student/StudentDashboard'));
const TodayPage = React.lazy(() => import('@/pages/dashboard/student/TodayPage'));
const StudyPlanPage = React.lazy(() => import('@/pages/dashboard/student/StudyPlanPage'));
const AcademicAdvisorView = React.lazy(() => import('@/pages/dashboard/student/AcademicAdvisorView'));
const StudyGroupsPage = React.lazy(() => import('@/pages/dashboard/student/StudyGroupsPage'));
const ProfileSettings = React.lazy(() => import('@/pages/dashboard/student/ProfileSettings'));
const ChatPage = React.lazy(() => import('@/pages/dashboard/student/ChatPage'));
const ExploreContent = React.lazy(() => import('@/pages/dashboard/student/ExploreContent'));
const NotesPage = React.lazy(() => import('@/pages/dashboard/student/NotesPage'));
const SubscriptionPage = React.lazy(() => import('@/pages/dashboard/student/SubscriptionPage'));
const WalletPage = React.lazy(() => import('@/pages/dashboard/student/WalletPage'));
const RewardsPage = React.lazy(() => import('@/pages/dashboard/student/RewardsPage'));
const NotificationsPage = React.lazy(() => import('@/pages/dashboard/student/NotificationsPage'));
const AnalyticsPage = React.lazy(() => import('@/pages/dashboard/student/AnalyticsPage'));

// Admin pages
const AdminDashboard = React.lazy(() => import('@/pages/dashboard/admin/AdminDashboard'));
const ContentManager = React.lazy(() => import('@/pages/dashboard/admin/ContentManager'));
const UserManagement = React.lazy(() => import('@/pages/dashboard/admin/UserManagement'));
const AdminSettings = React.lazy(() => import('@/pages/dashboard/admin/AdminSettings'));

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* Student Dashboard Routes */}
            <Route path="/dashboard/student" element={<Suspense fallback={<div>Loading...</div>}><StudentDashboard /></Suspense>} />
            <Route path="/dashboard/student/today" element={<Suspense fallback={<div>Loading...</div>}><TodayPage /></Suspense>} />
            <Route path="/dashboard/student/study-plan" element={<Suspense fallback={<div>Loading...</div>}><StudyPlanPage /></Suspense>} />
            <Route path="/dashboard/student/academic-advisor" element={<Suspense fallback={<div>Loading...</div>}><AcademicAdvisorView /></Suspense>} />
            <Route path="/dashboard/student/study-groups" element={<Suspense fallback={<div>Loading...</div>}><StudyGroupsPage /></Suspense>} />
            <Route path="/dashboard/student/profile" element={<Suspense fallback={<div>Loading...</div>}><ProfileSettings /></Suspense>} />
            <Route path="/dashboard/student/chat" element={<Suspense fallback={<div>Loading...</div>}><ChatPage /></Suspense>} />
            <Route path="/dashboard/student/explore" element={<Suspense fallback={<div>Loading...</div>}><ExploreContent /></Suspense>} />
            <Route path="/dashboard/student/notes" element={<Suspense fallback={<div>Loading...</div>}><NotesPage /></Suspense>} />
            <Route path="/dashboard/student/subscription" element={<Suspense fallback={<div>Loading...</div>}><SubscriptionPage /></Suspense>} />
            <Route path="/dashboard/student/wallet" element={<Suspense fallback={<div>Loading...</div>}><WalletPage /></Suspense>} />
            <Route path="/dashboard/student/rewards" element={<Suspense fallback={<div>Loading...</div>}><RewardsPage /></Suspense>} />
            <Route path="/dashboard/student/notifications" element={<Suspense fallback={<div>Loading...</div>}><NotificationsPage /></Suspense>} />
            <Route path="/dashboard/student/analytics" element={<Suspense fallback={<div>Loading...</div>}><AnalyticsPage /></Suspense>} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/dashboard/admin" element={<Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense>} />
            <Route path="/dashboard/admin/content" element={<Suspense fallback={<div>Loading...</div>}><ContentManager /></Suspense>} />
            <Route path="/dashboard/admin/users" element={<Suspense fallback={<div>Loading...</div>}><UserManagement /></Suspense>} />
            <Route path="/dashboard/admin/settings" element={<Suspense fallback={<div>Loading...</div>}><AdminSettings /></Suspense>} />
            
            {/* Default and 404 Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
