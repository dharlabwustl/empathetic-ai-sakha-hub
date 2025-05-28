
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface StatusTabsProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
  statusCounts: Record<string, number>;
  statusOptions: { value: string; label: string }[];
}

export const StatusTabs: React.FC<StatusTabsProps> = ({
  activeStatus,
  onStatusChange,
  statusCounts,
  statusOptions
}) => {
  return (
    <Tabs value={activeStatus} onValueChange={onStatusChange} className="mb-6">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${statusOptions.length}, minmax(0, 1fr))` }}>
        {statusOptions.map((status) => (
          <TabsTrigger key={status.value} value={status.value} className="flex items-center gap-2">
            {status.label}
            <Badge variant="secondary" className="ml-1">
              {statusCounts[status.value] || 0}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
