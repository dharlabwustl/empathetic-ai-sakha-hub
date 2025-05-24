
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronDown, 
  ChevronUp, 
  Wifi, 
  Volume2, 
  Sun, 
  Users, 
  Coffee,
  Smartphone,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [influences] = useState([
    { icon: Wifi, name: 'Internet Connection', status: 'good', impact: 85, color: 'green' },
    { icon: Volume2, name: 'Noise Level', status: 'moderate', impact: 65, color: 'yellow' },
    { icon: Sun, name: 'Lighting', status: 'excellent', impact: 95, color: 'green' },
    { icon: Users, name: 'Social Distractions', status: 'low', impact: 40, color: 'red' },
    { icon: Coffee, name: 'Energy Level', status: 'high', impact: 80, color: 'green' },
    { icon: Smartphone, name: 'Device Distractions', status: 'controlled', impact: 70, color: 'yellow' }
  ]);

  const overallScore = Math.round(influences.reduce((acc, inf) => acc + inf.impact, 0) / influences.length);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
      case 'high':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'moderate':
      case 'controlled':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 80) return 'text-green-600';
    if (impact >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="mb-6">
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Wifi className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Surrounding Influences Meter</CardTitle>
                <p className="text-sm text-muted-foreground">Environment factors affecting your study session</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className={`${getImpactColor(overallScore)} font-semibold`}>
                {overallScore}% Optimal
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
                className="h-8 w-8 p-0"
              >
                {influenceMeterCollapsed ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronUp className="h-4 w-4" />
                }
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <AnimatePresence>
          {!influenceMeterCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {influences.map((influence, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <influence.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm font-medium">{influence.name}</span>
                        </div>
                        {getStatusIcon(influence.status)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Impact</span>
                          <span className={`font-semibold ${getImpactColor(influence.impact)}`}>
                            {influence.impact}%
                          </span>
                        </div>
                        <Progress value={influence.impact} className="h-2" />
                        <div className="text-xs text-muted-foreground capitalize">
                          Status: {influence.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">Overall Environment Score</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {overallScore >= 80 ? 'Excellent study environment!' : 
                         overallScore >= 60 ? 'Good environment with room for improvement' : 
                         'Consider optimizing your study space'}
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {overallScore}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default SurroundingInfluencesSection;
