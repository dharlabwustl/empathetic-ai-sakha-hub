
import React from "react";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

const TiredMoodPanel: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 rounded-lg border border-sky-200 dark:border-sky-800">
      <div className="flex items-center mb-4">
        <Coffee className="h-5 w-5 text-sky-500 mr-2" />
        <h3 className="font-semibold text-sky-700 dark:text-sky-300">Rest and Recharge</h3>
      </div>
      <div className="space-y-4">
        <Button variant="outline" className="w-full text-sm bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/40 dark:hover:bg-sky-900/60">
          2-min Relaxation Break
        </Button>
        <div>
          <label className="text-sm font-medium">Light task option (optional)</label>
          <select className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80">
            <option>Browse a light concept refresher</option>
            <option>Review completed flashcards</option>
            <option>Skip for today - that's okay too!</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TiredMoodPanel;
