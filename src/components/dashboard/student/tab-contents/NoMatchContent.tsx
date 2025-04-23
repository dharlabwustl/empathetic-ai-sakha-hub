
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface NoMatchContentProps {
  activeTab: string;
}

const NoMatchContent: React.FC<NoMatchContentProps> = ({ activeTab }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          Tab Not Found
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          The tab "{activeTab}" does not exist or is currently unavailable. 
          Please select a valid tab from the navigation menu.
        </p>
      </CardContent>
    </Card>
  );
};

export default NoMatchContent;
