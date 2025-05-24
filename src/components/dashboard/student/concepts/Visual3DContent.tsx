
import React from 'react';
import Enhanced3DTab from './Enhanced3DTab';

interface Visual3DContentProps {
  conceptName: string;
}

const Visual3DContent: React.FC<Visual3DContentProps> = ({ conceptName }) => {
  return (
    <Enhanced3DTab 
      conceptName={conceptName}
      subject="Physics" // Default subject, can be made dynamic
    />
  );
};

export default Visual3DContent;
