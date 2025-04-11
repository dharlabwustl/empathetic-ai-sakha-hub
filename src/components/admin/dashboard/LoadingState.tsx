
import React from "react";

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-medium">Loading dashboard data...</h2>
      </div>
    </div>
  );
};

export default LoadingState;
