
import React from 'react';
import Enhanced3DDashboardPreview from './Enhanced3DDashboardPreview';

const DashboardPreview = () => {
  return (
    <div className="flex items-center justify-center h-full py-4">
      {/* Double the size of the dashboard preview */}
      <div className="transform scale-150 origin-center">
        <Enhanced3DDashboardPreview />
      </div>
    </div>
  );
};

export default DashboardPreview;
