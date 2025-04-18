
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
  const proficiencyLevels = [
    { value: 'weak', label: 'Weak', variant: 'destructive' },
    { value: 'moderate', label: 'Moderate', variant: 'outline' },
    { value: 'strong', label: 'Strong', variant: 'default' }
  ];

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

      <div className="mt-3">
        <ToggleGroup 
          type="single" 
          value={proficiencyLevels.find(p => isProficiencySelected(p.value as 'weak' | 'moderate' | 'strong'))?.value} 
          onValueChange={(value: string) => onProficiencySelect(value as 'weak' | 'moderate' | 'strong')}
          className="grid grid-cols-3 gap-2"
        >
          {proficiencyLevels.map((level) => (
            <ToggleGroupItem 
              key={level.value} 
              value={level.value} 
              variant="outline"
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {level.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default SubjectItem;
