
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  Home, 
  Users, 
  Wifi, 
  Volume2, 
  Lightbulb, 
  Coffee,
  Thermometer,
  Wind,
  Eye,
  Zap,
  Heart,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvironmentalFactor {
  name: string;
  score: number;
  status: 'optimal' | 'good' | 'poor';
  icon: React.ReactNode;
  recommendation?: string;
  impact: 'high' | 'medium' | 'low';
}

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

// Mock data for surrounding influences
const mockInfluenceData = {
  environmental: {
    lighting: { name: 'Lighting', score: 85, status: 'optimal' as const, icon: <Lightbulb className="h-4 w-4" />, impact: 'high' as const },
    noise: { name: 'Noise Level', score: 72, status: 'good' as const, icon: <Volume2 className="h-4 w-4" />, impact: 'high' as const },
    temperature: { name: 'Temperature', score: 68, status: 'good' as const, icon: <Thermometer className="h-4 w-4" />, impact: 'medium' as const },
    airQuality: { name: 'Air Quality', score: 78, status: 'good' as const, icon: <Wind className="h-4 w-4" />, impact: 'medium' as const },
    comfort: { name: 'Seating Comfort', score: 82, status: 'optimal' as const, icon: <Home className="h-4 w-4" />, impact: 'medium' as const },
    distractions: { name: 'Distractions', score: 45, status: 'poor' as const, icon: <Eye className="h-4 w-4" />, impact: 'high' as const }
  },
  social: {
    family: { name: 'Family Support', score: 88, status: 'optimal' as const, icon: <Users className="h-4 w-4" />, impact: 'high' as const },
    peers: { name: 'Study Group', score: 75, status: 'good' as const, icon: <Users className="h-4 w-4" />, impact: 'medium' as const },
    mentorship: { name: 'Mentorship', score: 92, status: 'optimal' as const, icon: <Brain className="h-4 w-4" />, impact: 'high' as const }
  },
  digital: {
    internet: { name: 'Internet Speed', score: 95, status: 'optimal' as const, icon: <Wifi className="h-4 w-4" />, impact: 'medium' as const },
    devices: { name: 'Device Performance', score: 87, status: 'optimal' as const, icon: <Zap className="h-4 w-4" />, impact: 'medium' as const }
  },
  personal: {
    energy: { name: 'Energy Level', score: 65, status: 'good' as const, icon: <Activity className="h-4 w-4" />, impact: 'high' as const },
    motivation: { name: 'Motivation', score: 79, status: 'good' as const, icon: <Target className="h-4 w-4" />, impact: 'high' as const },
    stress: { name: 'Stress Level', score: 58, status: 'good' as const, icon: <Heart className="h-4 w-4" />, impact: 'high' as const }
  }
};

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [influences, setInfluences] = useState(mockInfluenceData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setInfluences(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          energy: {
            ...prev.personal.energy,
            score: Math.max(30, Math.min(100, prev.personal.energy.score + (Math.random() - 0.5) * 10))
          }
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getOverallScore = () => {
    const allFactors = [
      ...Object.values(influences.environmental),
      ...Object.values(influences.social),
      ...Object.values(influences.digital),
      ...Object.values(influences.personal)
    ];
    return Math.round(allFactors.reduce((sum, factor) => sum + factor.score, 0) / allFactors.length);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  const getImprovementSuggestions = () => {
    const allFactors = [
      ...Object.values(influences.environmental),
      ...Object.values(influences.social),
      ...Object.values(influences.digital),
      ...Object.values(influences.personal)
    ];
    
    return allFactors
      .filter(factor => factor.score < 70)
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);
  };

  const filteredFactors = selectedCategory === 'all' 
    ? [
        ...Object.values(influences.environmental),
        ...Object.values(influences.social),
        ...Object.values(influences.digital),
        ...Object.values(influences.personal)
      ]
    : Object.values(influences[selectedCategory as keyof typeof influences]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="border-2 border-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800">
        <CardHeader 
          className="cursor-pointer bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20"
          onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-purple-600" />
              <span>Surrounding Influences Meter</span>
              <Badge variant="outline" className={`${getScoreColor(getOverallScore())}`}>
                {getOverallScore()}/100
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              {getScoreIcon(getOverallScore())}
              {influenceMeterCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {!influenceMeterCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="space-y-6">
                {/* Overall Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Study Environment</span>
                    <span className="text-sm text-muted-foreground">{getOverallScore()}%</span>
                  </div>
                  <Progress value={getOverallScore()} className="h-3" />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {['all', 'environmental', 'social', 'digital', 'personal'].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category === 'all' ? 'All Factors' : category}
                    </Button>
                  ))}
                </div>

                {/* Factors Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredFactors.map((factor, index) => (
                    <motion.div
                      key={factor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {factor.icon}
                        <span className="text-sm font-medium">{factor.name}</span>
                      </div>
                      <div className="space-y-2">
                        <Progress value={factor.score} className="h-2" />
                        <div className="flex justify-between items-center">
                          <span className={`text-xs font-medium ${getScoreColor(factor.score)}`}>
                            {factor.score}%
                          </span>
                          <Badge variant="outline" className={
                            factor.status === 'optimal' ? 'border-green-200 text-green-700' :
                            factor.status === 'good' ? 'border-yellow-200 text-yellow-700' :
                            'border-red-200 text-red-700'
                          }>
                            {factor.status}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Improvement Suggestions */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                      Priority Improvements
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowRecommendations(!showRecommendations)}
                    >
                      {showRecommendations ? 'Hide' : 'Show'} Details
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {getImprovementSuggestions().map((factor, index) => (
                      <div key={factor.name} className="flex items-center gap-3">
                        <span className="text-2xl">{index + 1}.</span>
                        <div className="flex-1">
                          <span className="font-medium">{factor.name}</span>
                          <span className={`ml-2 text-sm ${getScoreColor(factor.score)}`}>
                            {factor.score}%
                          </span>
                        </div>
                        <Badge variant="outline" className={
                          factor.impact === 'high' ? 'border-red-200 text-red-700' :
                          factor.impact === 'medium' ? 'border-yellow-200 text-yellow-700' :
                          'border-green-200 text-green-700'
                        }>
                          {factor.impact} impact
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {showRecommendations && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700"
                    >
                      <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
                        <div>💡 <strong>Quick Wins:</strong> Reduce distractions by turning off notifications during study time</div>
                        <div>🌡️ <strong>Comfort:</strong> Adjust room temperature to 68-72°F for optimal cognitive performance</div>
                        <div>⚡ <strong>Energy:</strong> Take 5-minute breaks every 25 minutes to maintain focus</div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Real-time Updates Info */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Updates every 30 seconds • Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default SurroundingInfluencesSection;
