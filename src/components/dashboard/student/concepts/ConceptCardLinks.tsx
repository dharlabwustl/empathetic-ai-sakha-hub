
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WithTooltip from '@/components/dashboard/student/utils/TooltipUtils';
import { Brain, Calculator, BookOpen, FileText } from 'lucide-react';

interface ConceptCardLinksProps {
  conceptId: string;
  conceptTitle: string;
}

const ConceptCardLinks: React.FC<ConceptCardLinksProps> = ({ conceptId, conceptTitle }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Related Resources</CardTitle>
        <CardDescription>Practice and deepen your understanding of {conceptTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <WithTooltip content="Interactive study page for this concept">
            <Link to={`/dashboard/student/concepts/${conceptId}/study`}>
              <Button className="w-full flex items-center justify-center gap-2 h-auto py-4" variant="outline">
                <BookOpen className="h-5 w-5 text-violet-500" />
                <span>Study Mode</span>
              </Button>
            </Link>
          </WithTooltip>
          
          <WithTooltip content="Practice with flashcards for this concept">
            <Link to={`/dashboard/student/flashcards/${conceptId}/interactive`}>
              <Button className="w-full flex items-center justify-center gap-2 h-auto py-4" variant="outline">
                <Brain className="h-5 w-5 text-sky-500" />
                <span>Interactive Cards</span>
              </Button>
            </Link>
          </WithTooltip>
          
          <WithTooltip content="Test your knowledge with a practice exam">
            <Link to={`/dashboard/student/practice-exam/${conceptId}`}>
              <Button className="w-full flex items-center justify-center gap-2 h-auto py-4" variant="outline">
                <FileText className="h-5 w-5 text-green-500" />
                <span>Practice Exam</span>
              </Button>
            </Link>
          </WithTooltip>
          
          <WithTooltip content="Practice formulas related to this concept">
            <Link to={`/dashboard/student/formula-practice-lab?concept=${conceptId}`}>
              <Button className="w-full flex items-center justify-center gap-2 h-auto py-4" variant="outline">
                <Calculator className="h-5 w-5 text-orange-500" />
                <span>Formula Lab</span>
              </Button>
            </Link>
          </WithTooltip>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptCardLinks;
