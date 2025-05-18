
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Check, CheckCircle } from 'lucide-react';

interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  lastReviewed: string;
  nextReviewDue: string;
  confidence: number;
}

interface RevisionLoopSectionProps {
  revisionItems?: RevisionItem[];
}

const RevisionLoopSection: React.FC<RevisionLoopSectionProps> = ({ revisionItems = [] }) => {
  // Default items if none provided
  const defaultItems: RevisionItem[] = [
    {
      id: 'revision-1',
      title: 'Cell Structure and Function',
      subject: 'Biology',
      lastReviewed: '3 days ago',
      nextReviewDue: 'Today',
      confidence: 70
    },
    {
      id: 'revision-2',
      title: 'Periodic Table',
      subject: 'Chemistry',
      lastReviewed: '5 days ago',
      nextReviewDue: 'Today',
      confidence: 85
    },
    {
      id: 'revision-3',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      lastReviewed: '2 weeks ago',
      nextReviewDue: 'Tomorrow',
      confidence: 60
    }
  ];
  
  // Use provided items or default ones
  const items = revisionItems.length > 0 ? revisionItems : defaultItems;
  
  // Get color based on confidence level
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500';
    if (confidence >= 50) return 'text-amber-500';
    return 'text-red-500';
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Revision Loop</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Topics scheduled for revision based on spaced repetition.
          </p>
          
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="p-3 border rounded-md hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span>{item.subject}</span>
                      <span className="text-xs">•</span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Last review: {item.lastReviewed}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className={`font-medium ${
                      item.nextReviewDue === 'Today' ? 'text-blue-500' : 'text-gray-500'
                    }`}>
                      {item.nextReviewDue}
                    </span>
                    <span className={`text-sm ${getConfidenceColor(item.confidence)}`}>
                      {item.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <span>See All Revision Items</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevisionLoopSection;
