
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface StatusTabData {
  id: string;
  name: string;
  count?: number;
  content: React.ReactNode;
}

interface StatusTabsProps {
  tabs: StatusTabData[];
  defaultValue?: string;
  onTabChange?: (value: string) => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({
  tabs,
  defaultValue = 'all',
  onTabChange
}) => {
  return (
    <Tabs 
      defaultValue={defaultValue} 
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="grid grid-cols-4 w-full mb-4">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            className="flex items-center gap-2"
          >
            <span>{tab.name}</span>
            {tab.count !== undefined && (
              <Badge variant="secondary" className="text-xs">
                {tab.count}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default StatusTabs;
