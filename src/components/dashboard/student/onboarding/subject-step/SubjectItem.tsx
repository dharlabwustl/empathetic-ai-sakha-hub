
import React from 'react';
import { Badge } from "@/components/ui/badge";
import ProficiencySelector from './ProficiencySelector';

interface SubjectItemProps {
  name: string;
  topics: string[];
  isProficiencySelected: (proficiency: 'weak' | 'moderate' | 'strong') => boolean;
  onProficiencySelect: (proficiency: 'weak' | 'moderate' | 'strong') => void;
}

const SubjectItem: React.FC<SubjectItemProps> = ({
  name,
  topics,
  isProficiencySelected,
  onProficiencySelect
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3">
        <div className="flex flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <ProficiencySelector
            isSelected={isProficiencySelected('weak')}
            onClick={() => onProficiencySelect('weak')}
            label="Weak"
            variant="weak"
          />
          
          <div className="mx-1" /> {/* Spacer */}
          
          <ProficiencySelector
            isSelected={isProficiencySelected('moderate')}
            onClick={() => onProficiencySelect('moderate')}
            label="Moderate"
            variant="moderate"
          />
          
          <div className="mx-1" /> {/* Spacer */}
          
          <ProficiencySelector
            isSelected={isProficiencySelected('strong')}
            onClick={() => onProficiencySelect('strong')}
            label="Strong"
            variant="strong"
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectItem;
