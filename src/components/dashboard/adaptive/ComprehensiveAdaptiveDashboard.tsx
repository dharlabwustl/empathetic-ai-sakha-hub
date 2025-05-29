
import React from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageSquare, Heart, Target, BookOpen, Lightbulb } from 'lucide-react';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      {/* Right Sidebar - NEET Strategy Cards */}
      <div className="lg:col-start-3 space-y-4">
        {/* NEET Strategy Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              NEET Strategy Card
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Adaptive Plan
              </Button>
              <Badge className="w-full justify-center bg-blue-100 text-blue-800">
                Personalized Strategy
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* AI Coach */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Coach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Get Guidance
              </Button>
              <Badge className="w-full justify-center bg-purple-100 text-purple-800">
                24/7 Available
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Mood-based Learning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Mood-based Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Lightbulb className="h-4 w-4 mr-2" />
                Adaptive Content
              </Button>
              <Badge className="w-full justify-center bg-pink-100 text-pink-800">
                Current: {currentMood || 'Motivated'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
