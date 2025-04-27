
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import FeelGoodCorner from '@/components/dashboard/student/feel-good-corner/FeelGoodCorner';

const FeelGoodCornerPage = () => {
  return (
    <SharedPageLayout
      title="Feel Good Corner"
      subtitle="Take a break and recharge your mind"
    >
      <div className="max-w-3xl mx-auto">
        <FeelGoodCorner />
      </div>
    </SharedPageLayout>
  );
};

export default FeelGoodCornerPage;
