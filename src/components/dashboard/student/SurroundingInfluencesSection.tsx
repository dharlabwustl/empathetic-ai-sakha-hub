
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronDown, ChevronUp, Home, Users, School, 
  Heart, Volume2, VolumeX, Lightbulb, Target,
  TrendingUp, AlertTriangle, CheckCircle
} from 'lucide-react';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Sample data for surrounding influences
  const influenceData = {
    overall: 73,
    family: {
      score: 85,
      status: 'positive',
      factors: [
        { name: 'Family Support', value: 90, type: 'positive' },
        { name: 'Study Environment', value: 80, type: 'positive' },
        { name: 'Pressure Level', value: 25, type: 'negative' }
      ]
    },
    social: {
      score: 65,
      status: 'moderate',
      factors: [
        { name: 'Peer Support', value: 70, type: 'positive' },
        { name: 'Social Media', value: 35, type: 'negative' },
        { name: 'Friend Circle', value: 80, type: 'positive' }
      ]
    },
    academic: {
      score: 78,
      status: 'positive',
      factors: [
        { name: 'Teacher Support', value: 85, type: 'positive' },
        { name: 'School Environment', value: 75, type: 'positive' },
        { name: 'Academic Pressure', value: 40, type: 'negative' }
      ]
    },
    personal: {
      score: 70,
      status: 'moderate',
      factors: [
        { name: 'Self Confidence', value: 75, type: 'positive' },
        { name: 'Stress Level', value: 45, type: 'negative' },
        { name: 'Physical Health', value: 80, type: 'positive' }
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const playNotificationSound = () => {
    if (isSoundEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Surrounding influences updated");
      utterance.volume = 0.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderFactorCard = (factor: any, category: string) => (
    <div key={factor.name} className="bg-white p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-sm">{factor.name}</h4>
        <Badge 
          variant={factor.type === 'positive' ? 'default' : 'destructive'}
          className="text-xs"
        >
          {factor.type}
        </Badge>
      </div>
      <Progress 
        value={factor.value} 
        className={`h-2 ${factor.type === 'positive' ? 'bg-green-100' : 'bg-red-100'}`}
      />
      <div className="flex items-center justify-between mt-2">
        <span className={`text-sm font-medium ${getScoreColor(factor.value)}`}>
          {factor.value}%
        </span>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={playNotificationSound}
          className="h-6 w-6 p-0"
        >
          <TrendingUp className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader 
        className="cursor-pointer"
        onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Surrounding Influences Meter
            <Badge 
              className={`ml-2 ${getStatusColor(
                influenceData.overall >= 80 ? 'positive' : 
                influenceData.overall >= 60 ? 'moderate' : 'negative'
              )}`}
            >
              {influenceData.overall}% Overall
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsSoundEnabled(!isSoundEnabled);
              }}
              className="h-8 w-8 p-0"
            >
              {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            {influenceMeterCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </div>
        </div>
      </CardHeader>
      
      {!influenceMeterCollapsed && (
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="family" className="text-xs">Family</TabsTrigger>
              <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
              <TabsTrigger value="academic" className="text-xs">Academic</TabsTrigger>
              <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <Home className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className={`text-2xl font-bold ${getScoreColor(influenceData.family.score)}`}>
                    {influenceData.family.score}%
                  </div>
                  <div className="text-sm text-gray-600">Family</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className={`text-2xl font-bold ${getScoreColor(influenceData.social.score)}`}>
                    {influenceData.social.score}%
                  </div>
                  <div className="text-sm text-gray-600">Social</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <School className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <div className={`text-2xl font-bold ${getScoreColor(influenceData.academic.score)}`}>
                    {influenceData.academic.score}%
                  </div>
                  <div className="text-sm text-gray-600">Academic</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <Heart className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <div className={`text-2xl font-bold ${getScoreColor(influenceData.personal.score)}`}>
                    {influenceData.personal.score}%
                  </div>
                  <div className="text-sm text-gray-600">Personal</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-semibold">Quick Insights</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Strong family support is boosting your confidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span>Consider limiting social media during study hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span>Academic environment is very supportive</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="family" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {influenceData.family.factors.map(factor => renderFactorCard(factor, 'family'))}
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Family Influence Summary</h4>
                <p className="text-sm text-green-700">
                  Your family environment is highly supportive with strong encouragement for your studies. 
                  The pressure level is manageable, creating an ideal atmosphere for learning.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {influenceData.social.factors.map(factor => renderFactorCard(factor, 'social'))}
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Social Influence Summary</h4>
                <p className="text-sm text-yellow-700">
                  Your social circle is generally supportive, but social media usage could be optimized. 
                  Consider setting specific times for social media to maintain focus during study hours.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {influenceData.academic.factors.map(factor => renderFactorCard(factor, 'academic'))}
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Academic Influence Summary</h4>
                <p className="text-sm text-blue-700">
                  Your academic environment provides excellent support with dedicated teachers. 
                  The school atmosphere is conducive to learning with moderate pressure levels.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {influenceData.personal.factors.map(factor => renderFactorCard(factor, 'personal'))}
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Personal Influence Summary</h4>
                <p className="text-sm text-purple-700">
                  Your personal well-being shows good self-confidence and physical health. 
                  Managing stress levels through regular breaks and relaxation techniques is recommended.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default SurroundingInfluencesSection;
