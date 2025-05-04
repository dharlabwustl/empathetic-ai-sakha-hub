
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ConceptCardList from './concept-cards/ConceptCardList';
import BackButton from '@/components/ui/back-button';
import { EnhancedTooltip } from '@/components/ui/enhanced-tooltip';

interface ConceptsViewProps {
  userProfile?: any;
}

const ConceptsView: React.FC<ConceptsViewProps> = ({ userProfile }) => {
  return (
    <div className="space-y-6">
      {/* Back button */}
      <EnhancedTooltip content="Return to dashboard">
        <div>
          <BackButton to="/dashboard/student" label="Back to Dashboard" />
        </div>
      </EnhancedTooltip>
      
      {/* Search and filter */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search concept cards..."
            className="pl-10 w-full"
          />
        </div>
        <EnhancedTooltip content="Filter concept cards">
          <Button variant="outline">Filter</Button>
        </EnhancedTooltip>
        <EnhancedTooltip content="Create new concept card">
          <Button>New Card</Button>
        </EnhancedTooltip>
      </div>

      {/* Concept cards */}
      <ConceptCardList />
    </div>
  );
};

export default ConceptsView;
