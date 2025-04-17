
import React from "react";

interface ExampleTabProps {
  example: string;
}

export const ExampleTab: React.FC<ExampleTabProps> = ({ example }) => {
  return (
    <div className="space-y-4">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-green-800 mb-2">Real-world Example</h3>
        <p>{example}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-green-800 mb-2">Interactive Example</h3>
        <p>Imagine two skaters standing face to face on frictionless ice. If one skater pushes the other:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>The pushed skater moves backward</li>
          <li>The pushing skater also moves backward (in the opposite direction)</li>
          <li>The forces experienced by both skaters are equal in magnitude</li>
        </ul>
      </div>
    </div>
  );
};
