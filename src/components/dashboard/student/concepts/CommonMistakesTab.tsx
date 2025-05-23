
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ExternalLink, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommonMistakesContent from './CommonMistakesContent';
import PreviousYearQuestionsTab from './PreviousYearQuestionsTab';

interface CommonMistakesTabProps {
  conceptName: string;
}

const CommonMistakesTab: React.FC<CommonMistakesTabProps> = ({ conceptName }) => {
  const navigate = useNavigate();

  const handleViewPreviousYears = () => {
    navigate('/dashboard/student/previous-year-analysis');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Common Mistakes & Previous Year Questions</h2>
        <Button
          variant="outline"
          onClick={handleViewPreviousYears}
          className="flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          View All Previous Years
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Common Mistakes
              </CardTitle>
              <CardDescription>
                Learn from typical errors students make with {conceptName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CommonMistakesContent conceptName={conceptName} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Previous Year Questions
              </CardTitle>
              <CardDescription>
                Practice with real exam questions on {conceptName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PreviousYearQuestionsTab conceptName={conceptName} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CommonMistakesTab;
