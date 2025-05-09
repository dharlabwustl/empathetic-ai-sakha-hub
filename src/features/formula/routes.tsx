
import React from 'react';
import { Route } from 'react-router-dom';
import FormulaPracticeLab from '@/pages/dashboard/student/FormulaPracticeLab';

export const formulaRoutes = (
  <>
    {/* Formula Practice Lab route */}
    <Route path="/dashboard/student/formula-practice-lab" element={<FormulaPracticeLab />} />
  </>
);
