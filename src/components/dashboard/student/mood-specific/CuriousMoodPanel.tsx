
import React from "react";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const CuriousMoodPanel: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center mb-4">
        <Brain className="h-5 w-5 text-blue-500 mr-2" />
        <h3 className="font-semibold text-blue-700 dark:text-blue-300">Today's Wonder Box</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm">
          <p className="text-sm">Curious about quantum physics? Try our quick intro quiz!</p>
        </div>
        <Button variant="outline" className="w-full text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 dark:hover:bg-blue-900/60">
          Ask Sakha Anything
        </Button>
      </div>
    </div>
  );
};

export default CuriousMoodPanel;
