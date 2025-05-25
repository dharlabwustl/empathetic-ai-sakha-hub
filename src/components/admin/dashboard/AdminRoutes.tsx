
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SystemOverview from './modules/SystemOverview';
import StudentManagement from './modules/StudentManagement';
import ContentManagement from './modules/ContentManagement';
import AIModelsManagement from './modules/AIModelsManagement';
import StudyPlanManagement from './modules/StudyPlanManagement';
import ExamManagement from './modules/ExamManagement';
import MoodAnalytics from './modules/MoodAnalytics';
import FeelGoodCorner from './modules/FeelGoodCorner';
import AITutorManagement from './modules/AITutorManagement';
import NotificationCenter from './modules/NotificationCenter';
import BatchManagement from './modules/BatchManagement';
import SubscriptionManagement from './modules/SubscriptionManagement';
import AnalyticsCenter from './modules/AnalyticsCenter';
import VoiceAssistant from './modules/VoiceAssistant';
import SurroundingInfluence from './modules/SurroundingInfluence';
import ExamReadiness from './modules/ExamReadiness';
import SystemLogs from './modules/SystemLogs';
import SecurityCenter from './modules/SecurityCenter';
import ContentManagementTab from './content/ContentManagementTab';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SystemOverview />} />
      <Route path="/system" element={<SystemOverview />} />
      <Route path="/students" element={<StudentManagement />} />
      <Route path="/content" element={<ContentManagementTab />} />
      <Route path="/ai-models" element={<AIModelsManagement />} />
      <Route path="/study-plans" element={<StudyPlanManagement />} />
      <Route path="/exams" element={<ExamManagement />} />
      <Route path="/mood" element={<MoodAnalytics />} />
      <Route path="/feel-good" element={<FeelGoodCorner />} />
      <Route path="/ai-tutor" element={<AITutorManagement />} />
      <Route path="/notifications" element={<NotificationCenter />} />
      <Route path="/batches" element={<BatchManagement />} />
      <Route path="/subscriptions" element={<SubscriptionManagement />} />
      <Route path="/analytics" element={<AnalyticsCenter />} />
      <Route path="/voice" element={<VoiceAssistant />} />
      <Route path="/surrounding" element={<SurroundingInfluence />} />
      <Route path="/exam-readiness" element={<ExamReadiness />} />
      <Route path="/logs" element={<SystemLogs />} />
      <Route path="/security" element={<SecurityCenter />} />
    </Routes>
  );
};

export default AdminRoutes;
