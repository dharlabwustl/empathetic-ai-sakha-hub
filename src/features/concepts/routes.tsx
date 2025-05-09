
import React from 'react';
import { Route } from 'react-router-dom';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';
import ConceptDetailPage from '@/pages/dashboard/student/ConceptDetailPage';
import ConceptCardStudyPage from '@/pages/dashboard/student/concept/ConceptCardStudyPage';
import ConceptStudyLandingPage from '@/pages/dashboard/student/concept/ConceptStudyLandingPage';

export const conceptRoutes = (
  <>
    {/* Concepts routes */}
    <Route path="/dashboard/student/concepts/card/:conceptId" element={<ConceptCardDetailPage />} />
    <Route path="/dashboard/student/concepts/:conceptId" element={<ConceptDetailPage />} />
    <Route path="/dashboard/student/concepts/study/:conceptId" element={<ConceptCardStudyPage />} />
    <Route path="/dashboard/student/concepts/:conceptId/study" element={<ConceptCardStudyPage />} />
    <Route path="/dashboard/student/concepts/study-landing/:conceptId" element={<ConceptStudyLandingPage />} />
    <Route path="/dashboard/student/concepts/landing" element={<ConceptsLandingPage />} />
    <Route path="/dashboard/student/concepts" element={<ConceptsLandingPage />} />
  </>
);
