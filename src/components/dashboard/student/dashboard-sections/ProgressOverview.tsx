
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Clock } from 'lucide-react';

const ProgressOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Progress Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>68%</span>
          </div>
          <Progress value={68} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Physics</span>
            <span>72%</span>
          </div>
          <Progress value={72} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Chemistry</span>
            <span>65%</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Biology</span>
            <span>70%</span>
          </div>
          <Progress value={70} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
