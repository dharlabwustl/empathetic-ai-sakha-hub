
import { Trophy } from "lucide-react";
import { getMotivationalQuote } from "./types";

export function MotivationalQuote() {
  return (
    <div className="bg-gradient-to-r from-sakha-blue/10 to-sakha-purple/10 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Trophy size={16} className="text-sakha-blue" />
        <h3 className="font-medium">Today's Motivation</h3>
      </div>
      <p className="italic text-sm">"{getMotivationalQuote()}"</p>
    </div>
  );
}
