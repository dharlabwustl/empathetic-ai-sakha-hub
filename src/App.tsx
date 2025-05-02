
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/auth/AuthContext';

// Main Pages
import SignUp from '@/pages/SignUp';
import Index from '@/pages/Index';
import Login from '@/pages/auth/Login';

// Dashboard pages - Using placeholder components for now
const StudentDashboard = () => <div>Student Dashboard</div>;
const TodayPage = () => <div>Today Page</div>;
const StudyPlanPage = () => <div>Study Plan Page</div>;
const AcademicAdvisorView = () => <div>Academic Advisor View</div>;
const StudyGroupsPage = () => <div>Study Groups Page</div>;
const ProfileSettings = () => <div>Profile Settings</div>;
const ChatPage = () => <div>Chat Page</div>;
const ExploreContent = () => <div>Explore Content</div>;
const NotesPage = () => <div>Notes Page</div>;
const SubscriptionPage = () => <div>Subscription Page</div>;
const WalletPage = () => <div>Wallet Page</div>;
const RewardsPage = () => <div>Rewards Page</div>;
const NotificationsPage = () => <div>Notifications Page</div>;
const AnalyticsPage = () => <div>Analytics Page</div>;

// Admin pages - Using placeholder components for now
const AdminDashboard = () => <div>Admin Dashboard</div>;
const ContentManager = () => <div>Content Manager</div>;
const UserManagement = () => <div>User Management</div>;
const AdminSettings = () => <div>Admin Settings</div>;

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
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/student/today" element={<TodayPage />} />
            <Route path="/dashboard/student/study-plan" element={<StudyPlanPage />} />
            <Route path="/dashboard/student/academic-advisor" element={<AcademicAdvisorView />} />
            <Route path="/dashboard/student/study-groups" element={<StudyGroupsPage />} />
            <Route path="/dashboard/student/profile" element={<ProfileSettings />} />
            <Route path="/dashboard/student/chat" element={<ChatPage />} />
            <Route path="/dashboard/student/explore" element={<ExploreContent />} />
            <Route path="/dashboard/student/notes" element={<NotesPage />} />
            <Route path="/dashboard/student/subscription" element={<SubscriptionPage />} />
            <Route path="/dashboard/student/wallet" element={<WalletPage />} />
            <Route path="/dashboard/student/rewards" element={<RewardsPage />} />
            <Route path="/dashboard/student/notifications" element={<NotificationsPage />} />
            <Route path="/dashboard/student/analytics" element={<AnalyticsPage />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/content" element={<ContentManager />} />
            <Route path="/dashboard/admin/users" element={<UserManagement />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettings />} />
            
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
