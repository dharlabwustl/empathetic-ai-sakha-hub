
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Calendar } from 'lucide-react';
import { TrialSubscription } from '@/types/subscription';

interface TrialStatusProps {
  trial: TrialSubscription;
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
    if (trial.daysRemaining > 3) return 'bg-green-500';
    if (trial.daysRemaining > 1) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-2 border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-blue-700">
            7-Day Free Trial
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Days Remaining</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-white font-bold ${getStatusColor()}`}>
            {trial.daysRemaining} days
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Started:</span>
            <span className="font-medium">{formatDate(trial.startDate)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Ends:</span>
            <span className="font-medium">{formatDate(trial.endDate)}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-3 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Trial Benefits</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Access to all premium features</li>
            <li>• Unlimited practice tests</li>
            <li>• AI-powered study recommendations</li>
            <li>• Personalized learning analytics</li>
          </ul>
        </div>
        
        {trial.daysRemaining <= 3 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-700">
              Your trial expires soon! Consider upgrading to continue enjoying premium features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrialStatus;
