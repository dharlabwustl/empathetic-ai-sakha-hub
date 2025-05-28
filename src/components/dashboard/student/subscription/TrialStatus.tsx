
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { TrialInfo } from '@/types/subscription';

interface TrialStatusProps {
  trial: TrialInfo;
}

const TrialStatus: React.FC<TrialStatusProps> = ({ trial }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (!trial.isActive) return 'destructive';
    if (trial.daysRemaining <= 2) return 'warning';
    return 'default';
  };

  const getStatusText = () => {
    if (!trial.isActive) return 'Expired';
    if (trial.daysRemaining === 0) return 'Last Day';
    return `${trial.daysRemaining} days remaining`;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            7-Day Free Trial
          </CardTitle>
          <Badge variant={getStatusColor() as any} className="ml-2">
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Started</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(trial.startDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Ends</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(trial.endDate)}
              </p>
            </div>
          </div>
        </div>
        
        {trial.isActive && (
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Trial Features Unlocked
              </span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Full access to all study materials</li>
              <li>• AI-powered personalized learning</li>
              <li>• Practice exams and assessments</li>
              <li>• Progress tracking and analytics</li>
            </ul>
          </div>
        )}
        
        {!trial.isActive && (
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="text-sm text-red-700">
              Your trial has expired. Upgrade to continue accessing premium features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrialStatus;
