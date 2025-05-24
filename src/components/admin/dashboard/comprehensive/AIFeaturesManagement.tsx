
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const AIFeaturesManagement = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          AI Features Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Feel Good Corner & AI Tutor management coming soon.</p>
      </CardContent>
    </Card>
  );
};

export default AIFeaturesManagement;
