
import React from "react";
import { CommonMistakeType } from "./types";

interface MistakesTabProps {
  commonMistakes: CommonMistakeType[];
}

export const MistakesTab: React.FC<MistakesTabProps> = ({ commonMistakes }) => {
  return (
    <div className="space-y-4">
      {commonMistakes.map((mistake, index) => (
        <div key={index} className="bg-amber-50 p-4 rounded-lg">
          <h3 className="text-md font-medium text-amber-800 mb-2">Common Mistake #{index + 1}</h3>
          <div className="border-l-4 border-amber-400 pl-3 mb-3">
            <p className="text-amber-900 italic">{mistake.mistake}</p>
          </div>
          <div className="border-l-4 border-green-400 pl-3">
            <p className="text-green-900">{mistake.correction}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
