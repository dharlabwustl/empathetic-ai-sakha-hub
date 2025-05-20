
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedPageLayout } from '../SharedPageLayout';
import EnhancedConceptDetail from './EnhancedConceptDetail';

// Sample concept data (would normally come from an API/database)
const demoConceptData = {
  id: "concept-1",
  title: "Newton's Second Law of Motion",
  subject: "Physics",
  topic: "Classical Mechanics",
  difficulty: "medium" as const,
  content: `
    <h2>Newton's Second Law of Motion</h2>
    <p>Newton's Second Law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
    <p>It can be mathematically expressed as:</p>
    <p class="text-center font-bold text-xl my-4">F = ma</p>
    <p>Where:</p>
    <ul class="list-disc pl-6 my-4">
      <li><strong>F</strong> is the net force applied (measured in newtons, N)</li>
      <li><strong>m</strong> is the mass of the object (measured in kilograms, kg)</li>
      <li><strong>a</strong> is the acceleration (measured in meters per second squared, m/s²)</li>
    </ul>
    <p>This fundamental law forms the backbone of classical mechanics and helps us analyze and predict the motion of objects under the influence of forces.</p>
  `,
  masteryLevel: 65,
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState('content');
  
  // In a real app, you would fetch data based on conceptId
  const concept = demoConceptData;
  
  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} - ${concept.topic}`}
      backButtonUrl="/dashboard/student/concepts"
      showBackButton={true}
    >
      <EnhancedConceptDetail
        conceptId={conceptId || concept.id}
        title={concept.title}
        subject={concept.subject}
        topic={concept.topic}
        difficulty={concept.difficulty}
        content={concept.content}
        masteryLevel={concept.masteryLevel}
      />
    </SharedPageLayout>
  );
};

export default ConceptDetailPage;
