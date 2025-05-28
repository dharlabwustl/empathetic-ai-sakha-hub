
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Gift } from 'lucide-react';
import { TrialInfo } from '@/types/subscription';

interface TrialStatusProps {
  trialInfo: TrialInfo;
}

const TrialStatus: React.FC<TrialStatusProps> = ({ trialInfo }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!trialInfo.isTrialActive) {
    return null;
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Gift className="h-5 w-5" />
          7-Day Free Trial Active
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {trialInfo.trialDaysLeft} days left
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-green-700">
          <Calendar className="h-4 w-4" />
          <span>Started: {formatDate(trialInfo.trialStartDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-700">
          <Clock className="h-4 w-4" />
          <span>Ends: {formatDate(trialInfo.trialEndDate)}</span>
        </div>
        <div className="text-sm text-green-600 mt-2">
          Enjoy full access to all premium features during your trial period!
        </div>
      </CardContent>
    </Card>
  );
};

export default TrialStatus;
