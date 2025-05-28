
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Crown, Zap } from 'lucide-react';
import { SubscriptionType, TrialInfo } from '@/types/subscription';

interface TrialStatusProps {
  subscriptionType: SubscriptionType;
  trialInfo?: TrialInfo;
  onUpgrade?: () => void;
}

const TrialStatus: React.FC<TrialStatusProps> = ({
  subscriptionType,
  trialInfo,
  onUpgrade
}) => {
  if (subscriptionType !== SubscriptionType.TRIAL || !trialInfo) {
    return null;
  }

  const { daysRemaining, isActive, endDate } = trialInfo;
  const endDateFormatted = new Date(endDate).toLocaleDateString();

  return (
    <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg text-orange-800">
              7-Day Free Trial
            </CardTitle>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            <Clock className="h-3 w-3 mr-1" />
            {daysRemaining} days left
          </Badge>
        </div>
        <CardDescription className="text-orange-700">
          Trial ends on {endDateFormatted}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-orange-700">
            <Zap className="h-4 w-4" />
            <span>Full access to all premium features</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-orange-700">
            <Zap className="h-4 w-4" />
            <span>Unlimited practice tests and flashcards</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-orange-700">
            <Zap className="h-4 w-4" />
            <span>AI-powered personalized study plans</span>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={onUpgrade}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              Upgrade Now to Continue Premium Access
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrialStatus;
