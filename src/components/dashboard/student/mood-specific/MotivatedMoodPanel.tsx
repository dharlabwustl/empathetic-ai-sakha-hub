
import React from "react";
import { Flame } from "lucide-react";

const MotivatedMoodPanel: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg border border-orange-200 dark:border-orange-800">
      <div className="flex items-center mb-4">
        <Flame className="h-5 w-5 text-orange-500 mr-2" />
        <h3 className="font-semibold text-orange-700 dark:text-orange-300">Power Mode Activated!</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">What's your mini goal today?</label>
          <input 
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
            placeholder="I want to complete..."
          />
        </div>
        <div className="animate-pulse">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-200 text-orange-800 dark:bg-orange-800/50 dark:text-orange-200">
            <Flame className="h-3 w-3 mr-1" /> Power Mode Activated
          </span>
        </div>
      </div>
    </div>
  );
};

export default MotivatedMoodPanel;
