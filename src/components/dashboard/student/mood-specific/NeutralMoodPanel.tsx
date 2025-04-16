
import React from "react";
import { BookOpen } from "lucide-react";

const NeutralMoodPanel: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex items-center mb-4">
        <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Small Steps Count</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Pick 1 small task to complete today</label>
          <select className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80">
            <option>Review chapter 3 notes</option>
            <option>Watch one concept explanation video</option>
            <option>Try 5 practice problems</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">What's one nice thing that happened recently?</label>
          <input 
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
            placeholder="I'm grateful for..."
          />
        </div>
      </div>
    </div>
  );
};

export default NeutralMoodPanel;
