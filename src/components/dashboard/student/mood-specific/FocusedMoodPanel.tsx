
import React from "react";
import { Target } from "lucide-react";

const FocusedMoodPanel: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center mb-4">
        <Target className="h-5 w-5 text-emerald-500 mr-2" />
        <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Deep Focus Mode</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm">
          <p className="text-sm">Current focus streak: 25 minutes</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-2.5 rounded-full w-3/4"></div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">I'm currently focusing on:</label>
          <input 
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
            placeholder="What are you working on?"
          />
        </div>
      </div>
    </div>
  );
};

export default FocusedMoodPanel;
