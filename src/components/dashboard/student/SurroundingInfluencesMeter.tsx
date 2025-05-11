
import React from 'react';

const SurroundingInfluencesMeter = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
      <h3 className="text-lg font-medium mb-4">Surrounding Influences</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
          <h4 className="font-medium">Environment</h4>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
          <h4 className="font-medium">Time Management</h4>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg">
          <h4 className="font-medium">Family Support</h4>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
          <h4 className="font-medium">Peer Pressure</h4>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
        
        <div className="bg-pink-50 dark:bg-pink-900/30 p-3 rounded-lg">
          <h4 className="font-medium">Personal Health</h4>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-full bg-pink-500 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
        
        <div className="bg-cyan-50 dark:bg-cyan-900/30 p-3 rounded-lg">
          <h4 className="font-medium">Study Resources</h4>
          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-full bg-cyan-500 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        These factors can significantly impact your study performance. Monitoring them helps you optimize your learning environment with Prepzr.
      </div>
    </div>
  );
};

export default SurroundingInfluencesMeter;
