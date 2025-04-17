
import React from "react";

interface RelevanceTabProps {
  examRelevance: string;
}

export const RelevanceTab: React.FC<RelevanceTabProps> = ({ examRelevance }) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-blue-800 mb-2">Exam Relevance</h3>
      <p>{examRelevance}</p>
      
      <div className="mt-4">
        <h4 className="font-medium text-blue-800 mb-1">Exam Question Types:</h4>
        <ul className="list-disc ml-5 space-y-1">
          <li>Numerical problems on rocket propulsion</li>
          <li>Conceptual questions on force pairs</li>
          <li>Application problems in everyday scenarios</li>
          <li>Multiple-choice questions testing common misconceptions</li>
        </ul>
      </div>
    </div>
  );
};
