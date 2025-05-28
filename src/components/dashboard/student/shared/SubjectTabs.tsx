
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface TabData {
  id: string;
  name: string;
  count?: number;
  content: React.ReactNode;
}

interface SubjectTabsProps {
  subjects: TabData[];
  defaultValue?: string;
  onTabChange?: (value: string) => void;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({
  subjects,
  defaultValue = 'all',
  onTabChange
}) => {
  return (
    <Tabs 
      defaultValue={defaultValue} 
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="grid grid-cols-4 w-full mb-6">
        {subjects.map((subject) => (
          <TabsTrigger 
            key={subject.id} 
            value={subject.id}
            className="flex items-center gap-2"
          >
            <span>{subject.name}</span>
            {subject.count !== undefined && (
              <Badge variant="secondary" className="text-xs">
                {subject.count}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {subjects.map((subject) => (
        <TabsContent key={subject.id} value={subject.id}>
          {subject.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SubjectTabs;
