
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface LinkedConceptsSectionProps {
  conceptId: string;
}

const LinkedConceptsSection: React.FC<LinkedConceptsSectionProps> = ({ conceptId }) => {
  // Sample linked concepts data
  const linkedConcepts = [
    {
      id: "kirchoffs-law",
      title: "Kirchoff's Laws",
      description: "Laws that deal with the conservation of charge and energy in electrical circuits.",
      masteryLevel: 68,
      relationship: "prerequisite"
    },
    {
      id: "series-parallel-circuits",
      title: "Series & Parallel Circuits",
      description: "Understanding how resistors work when connected in series and parallel arrangements.",
      masteryLevel: 45,
      relationship: "application"
    },
    {
      id: "resistivity",
      title: "Resistivity",
      description: "Material property that quantifies how strongly a given material opposes the flow of electric current.",
      masteryLevel: 35,
      relationship: "prerequisite"
    },
    {
      id: "power-in-circuits",
      title: "Power in Electrical Circuits",
      description: "Understanding how electrical power is dissipated in circuits using Ohm's Law.",
      masteryLevel: 52,
      relationship: "application"
    }
  ];

  const getRelationshipBadgeClass = (relationship: string) => {
    switch(relationship) {
      case 'prerequisite':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
      case 'application':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300';
      case 'extension':
        return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-300';
    }
  };

  const getMasteryColorClass = (level: number) => {
    if (level > 80) return 'bg-green-500';
    if (level > 60) return 'bg-blue-500';
    if (level > 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-indigo-600" />
          Linked Concepts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {linkedConcepts.map((concept) => (
            <Link 
              key={concept.id}
              to={`/dashboard/student/concepts/${concept.id}`}
              className="block"
            >
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-md group">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {concept.title}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 dark:text-gray-500 dark:group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                
                <span className={`inline-block text-xs px-2 py-0.5 rounded mt-1 mb-2 ${getRelationshipBadgeClass(concept.relationship)}`}>
                  {concept.relationship.charAt(0).toUpperCase() + concept.relationship.slice(1)}
                </span>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {concept.description}
                </p>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Mastery</span>
                    <span className="font-medium">{concept.masteryLevel}%</span>
                  </div>
                  <Progress 
                    value={concept.masteryLevel} 
                    className="h-1.5 bg-gray-200 dark:bg-gray-700" 
                    indicatorClassName={getMasteryColorClass(concept.masteryLevel)}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedConceptsSection;
