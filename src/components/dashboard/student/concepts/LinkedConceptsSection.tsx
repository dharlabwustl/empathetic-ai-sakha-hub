
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkIcon, ArrowRight } from 'lucide-react';

interface LinkedConceptsSectionProps {
  conceptName: string;
  relatedConcepts: string[];
}

const LinkedConceptsSection: React.FC<LinkedConceptsSectionProps> = ({ conceptName, relatedConcepts }) => {
  return (
    <Card className="border-l-4 border-l-blue-500 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-blue-500" />
          Linked Concepts
        </CardTitle>
        <CardDescription>
          Explore concepts related to {conceptName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {relatedConcepts.map((concept, index) => (
            <Card key={index} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{concept}</h4>
                  <p className="text-sm text-muted-foreground">
                    Understanding this concept will strengthen your knowledge of {conceptName}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          <LinkIcon className="h-4 w-4 mr-2" />
          Explore Concept Web
        </Button>
      </CardContent>
    </Card>
  );
};

export default LinkedConceptsSection;
