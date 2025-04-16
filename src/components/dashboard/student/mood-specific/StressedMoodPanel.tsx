
import React from "react";
import { HeartPulse } from "lucide-react";

const StressedMoodPanel: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-lavender-100 to-blue-100 dark:from-lavender-900/30 dark:to-blue-900/30 rounded-lg border border-lavender-200 dark:border-lavender-800">
      <div className="flex items-center mb-4">
        <HeartPulse className="h-5 w-5 text-lavender-500 mr-2" />
        <h3 className="font-semibold text-lavender-700 dark:text-lavender-300">Let's Take a Moment</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm">
          <p className="text-sm font-medium mb-2">4-7-8 Breathing:</p>
          <p className="text-xs">Breathe in for 4 seconds, hold for 7, exhale for 8</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Write what's bothering you (private journal)</label>
          <textarea 
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
            placeholder="I feel stressed because..."
            rows={3}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default StressedMoodPanel;
