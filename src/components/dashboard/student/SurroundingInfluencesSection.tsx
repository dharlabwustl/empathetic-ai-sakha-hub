
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronDown, 
  ChevronUp, 
  Home, 
  Users, 
  Wifi, 
  Volume2, 
  Sun, 
  Thermometer,
  Coffee,
  BookOpen,
  Music
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
    { 
      id: 'environment', 
      name: 'Study Environment', 
      score: 85, 
      icon: Home, 
      color: 'bg-green-500',
      factors: ['Quiet space', 'Good lighting', 'Organized desk']
    },
    { 
      id: 'social', 
      name: 'Social Support', 
      score: 72, 
      icon: Users, 
      color: 'bg-blue-500',
      factors: ['Family support', 'Study group', 'Peer motivation']
    },
    { 
      id: 'digital', 
      name: 'Digital Wellness', 
      score: 68, 
      icon: Wifi, 
      color: 'bg-purple-500',
      factors: ['Screen time balance', 'App usage', 'Digital breaks']
    },
    { 
      id: 'physical', 
      name: 'Physical Comfort', 
      score: 90, 
      icon: Thermometer, 
      color: 'bg-orange-500',
      factors: ['Room temperature', 'Seating comfort', 'Air quality']
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const averageScore = Math.round(influences.reduce((acc, inf) => acc + inf.score, 0) / influences.length);

  return (
    <Card className="mb-6 border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Surrounding Influences Meter</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
          >
            {influenceMeterCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Always show summary score */}
        <div className="flex items-center gap-4">
          <div className={`rounded-full px-3 py-1 ${getScoreBgColor(averageScore)}`}>
            <span className={`text-sm font-medium ${getScoreColor(averageScore)}`}>
              Overall: {averageScore}%
            </span>
          </div>
          <div className="flex-1">
            <Progress value={averageScore} className="h-2" />
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {!influenceMeterCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {influences.map((influence) => (
                  <div key={influence.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${influence.color.replace('bg-', 'bg-opacity-20 bg-')}`}>
                        <influence.icon className={`h-4 w-4 ${influence.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{influence.name}</div>
                        <div className={`text-xs ${getScoreColor(influence.score)}`}>
                          {influence.score}%
                        </div>
                      </div>
                    </div>
                    <Progress value={influence.score} className="h-1.5" />
                    <div className="space-y-1">
                      {influence.factors.slice(0, 2).map((factor, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs py-0 px-1 h-5"
                        >
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="border-t pt-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Music className="h-3 w-3 mr-1" />
                    Focus Music
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Noise Control
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Coffee className="h-3 w-3 mr-1" />
                    Break Timer
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Sun className="h-3 w-3 mr-1" />
                    Lighting
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default SurroundingInfluencesSection;
