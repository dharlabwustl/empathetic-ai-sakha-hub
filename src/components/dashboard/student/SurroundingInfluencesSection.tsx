
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  Users, 
  Home, 
  Smartphone, 
  Wifi,
  Volume2,
  Sun,
  Moon,
  Battery,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  BarChart3
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
  const [influences, setInfluences] = useState({
    family: 85,
    friends: 70,
    environment: 60,
    technology: 45,
    health: 80
  });

  const getInfluenceColor = (value: number) => {
    if (value >= 80) return 'text-green-600 bg-green-100';
    if (value >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getInfluenceIcon = (type: string) => {
    switch (type) {
      case 'family': return <Heart className="h-4 w-4" />;
      case 'friends': return <Users className="h-4 w-4" />;
      case 'environment': return <Home className="h-4 w-4" />;
      case 'technology': return <Smartphone className="h-4 w-4" />;
      case 'health': return <Heart className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const updateInfluence = (type: string, value: number[]) => {
    setInfluences(prev => ({
      ...prev,
      [type]: value[0]
    }));
  };

  const averageInfluence = Math.round(
    Object.values(influences).reduce((sum, val) => sum + val, 0) / Object.values(influences).length
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Surrounding Influences Meter
              <Badge variant="outline" className={getInfluenceColor(averageInfluence)}>
                {averageInfluence}% Positive
              </Badge>
            </CardTitle>
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
        </CardHeader>
        
        <AnimatePresence>
          {!influenceMeterCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="space-y-4">
                {Object.entries(influences).map(([type, value]) => (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getInfluenceIcon(type)}
                        <span className="font-medium capitalize">{type}</span>
                      </div>
                      <Badge variant="outline" className={getInfluenceColor(value)}>
                        {value}%
                      </Badge>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={(newValue) => updateInfluence(type, newValue)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                ))}
                
                <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Influence</span>
                    <div className="flex items-center gap-2">
                      {averageInfluence >= 80 ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : averageInfluence >= 60 ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`font-bold ${
                        averageInfluence >= 80 ? 'text-green-600' :
                        averageInfluence >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {averageInfluence}%
                      </span>
                    </div>
                  </div>
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
