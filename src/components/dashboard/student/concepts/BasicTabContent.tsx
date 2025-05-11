
import React from 'react';

interface BasicTabContentProps {
  conceptId?: string;
}

const BasicTabContent: React.FC<BasicTabContentProps> = ({ conceptId }) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium mb-4">Basic Concepts</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-lg mb-2">Definition</h4>
          <p className="text-gray-700 dark:text-gray-300">
            This section covers the fundamental principles and definitions related to this concept.
            Understanding these basics is essential before moving to advanced applications.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium text-lg mb-2">Core Principles</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>First principle: The foundational elements of the concept</li>
            <li>Second principle: How the concept relates to other physics topics</li>
            <li>Third principle: Common applications and observations</li>
            <li>Fourth principle: Historical development and key contributors</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-lg mb-2">Learning Objectives</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            After studying this section, you should be able to:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Define and explain the core terminology</li>
            <li>Identify examples of this concept in everyday situations</li>
            <li>Explain the mathematical representation of this concept</li>
            <li>Apply basic principles to solve introductory problems</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default BasicTabContent;
