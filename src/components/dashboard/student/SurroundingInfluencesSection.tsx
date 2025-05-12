
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, Coffee, Clock, Music, Volume2, Sun, Moon, CloudRain, Wind, Activity, BrainCircuit, ArrowRightLeft, Thermometer } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/lib/utils';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (value: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [ambientNoise, setAmbientNoise] = useState<string>('nature');
  const [ambientVolume, setAmbientVolume] = useState<number>(30);
  const [lightingMode, setLightingMode] = useState<string>('natural');
  const [lightingIntensity, setLightingIntensity] = useState<number>(70);
  const [temperatureValue, setTemperatureValue] = useState<number>(22);
  const [manageAllSettings, setManageAllSettings] = useState<boolean>(false);
  const [cognitiveLoad, setCognitiveLoad] = useState<number>(65);
  const [stressLevel, setStressLevel] = useState<number>(40);
  
  // Calculate overall study environment score (0-100)
  const calculateEnvironmentScore = () => {
    // Normalize all factors to 0-100 scale and apply weights
    const noiseScore = ambientNoise === 'off' ? 100 : (100 - Math.abs(ambientVolume - 30));
    const lightingScore = lightingMode === 'natural' ? 90 : (lightingMode === 'warm' ? 85 : 70);
    const tempScore = 100 - (Math.abs(temperatureValue - 22) * 5);
    const cognitiveScore = 100 - cognitiveLoad;
    const stressScore = 100 - stressLevel;
    
    // Weight factors by importance (sum of weights = 1)
    const weightedScore = 
      (noiseScore * 0.2) + 
      (lightingScore * 0.2) + 
      (tempScore * 0.15) + 
      (cognitiveScore * 0.25) + 
      (stressScore * 0.2);
    
    return Math.round(weightedScore);
  };
  
  const environmentScore = calculateEnvironmentScore();
  
  // Get color scheme based on score
  const getScoreColorScheme = (score: number) => {
    if (score >= 85) return "text-green-600 dark:text-green-400";
    if (score >= 70) return "text-blue-600 dark:text-blue-400";
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };
  
  const getScoreMessage = (score: number) => {
    if (score >= 85) return "Optimal";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  return (
    <Card className={cn(
      "transition-all duration-300 overflow-hidden mb-6", 
      influenceMeterCollapsed ? "max-h-24" : "max-h-[1200px]"
    )}>
      {/* Header with toggle */}
      <CardHeader 
        className="pb-0 pt-4 px-4 cursor-pointer flex flex-row items-center justify-between"
        onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
      >
        <div className="flex items-center">
          <BrainCircuit className="h-5 w-5 text-primary mr-2" />
          <CardTitle className="text-lg">Study Environment</CardTitle>
        </div>
        <div className="flex items-center">
          <span className={cn(
            "text-sm font-medium mr-3",
            getScoreColorScheme(environmentScore)
          )}>
            {getScoreMessage(environmentScore)} ({environmentScore}%)
          </span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            {influenceMeterCollapsed ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronUp className="h-4 w-4" />
            }
          </Button>
        </div>
      </CardHeader>
      
      <AnimatePresence>
        {!influenceMeterCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="pt-4 pb-6 px-4">
              {/* Overall score visualization */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Environment Quality</span>
                  <span className={cn(
                    "text-sm font-medium",
                    getScoreColorScheme(environmentScore)
                  )}>
                    {environmentScore}%
                  </span>
                </div>
                <Progress 
                  value={environmentScore} 
                  className="h-2"
                  indicatorClassName={cn(
                    environmentScore >= 85 ? "bg-green-500" :
                    environmentScore >= 70 ? "bg-blue-500" :
                    environmentScore >= 50 ? "bg-yellow-500" :
                    "bg-red-500"
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Ambient Noise Controls */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Volume2 className="h-4 w-4 mr-2 text-primary" />
                        <h3 className="font-medium">Ambient Noise</h3>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {ambientNoise === 'off' ? 'Off' : `${ambientVolume}%`}
                      </span>
                    </div>
                    
                    <ToggleGroup type="single" value={ambientNoise} onValueChange={value => value && setAmbientNoise(value)}>
                      <ToggleGroupItem value="off" className="text-xs h-8">
                        Off
                      </ToggleGroupItem>
                      <ToggleGroupItem value="nature" className="text-xs h-8">
                        Nature
                      </ToggleGroupItem>
                      <ToggleGroupItem value="white-noise" className="text-xs h-8">
                        White Noise
                      </ToggleGroupItem>
                      <ToggleGroupItem value="coffee-shop" className="text-xs h-8">
                        Café
                      </ToggleGroupItem>
                    </ToggleGroup>
                    
                    <div className={ambientNoise === 'off' ? "opacity-50 pointer-events-none" : ""}>
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-3 w-3 text-muted-foreground" />
                        <Slider
                          value={[ambientVolume]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={values => setAmbientVolume(values[0])}
                        />
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Lighting Controls */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Sun className="h-4 w-4 mr-2 text-primary" />
                        <h3 className="font-medium">Lighting</h3>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {lightingMode.charAt(0).toUpperCase() + lightingMode.slice(1)} ({lightingIntensity}%)
                      </span>
                    </div>
                    
                    <ToggleGroup type="single" value={lightingMode} onValueChange={value => value && setLightingMode(value)}>
                      <ToggleGroupItem value="natural" className="text-xs h-8">
                        Natural
                      </ToggleGroupItem>
                      <ToggleGroupItem value="warm" className="text-xs h-8">
                        Warm
                      </ToggleGroupItem>
                      <ToggleGroupItem value="cool" className="text-xs h-8">
                        Cool
                      </ToggleGroupItem>
                      <ToggleGroupItem value="dimmed" className="text-xs h-8">
                        Dimmed
                      </ToggleGroupItem>
                    </ToggleGroup>
                    
                    <div className="flex items-center gap-2">
                      <Moon className="h-3 w-3 text-muted-foreground" />
                      <Slider
                        value={[lightingIntensity]}
                        min={10}
                        max={100}
                        step={1}
                        onValueChange={values => setLightingIntensity(values[0])}
                      />
                      <Sun className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Temperature Controls */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 mr-2 text-primary" />
                        <h3 className="font-medium">Temperature</h3>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {temperatureValue}°C
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-blue-500">18°</span>
                      <Slider
                        value={[temperatureValue]}
                        min={18}
                        max={28}
                        step={0.5}
                        onValueChange={values => setTemperatureValue(values[0])}
                      />
                      <span className="text-xs text-red-500">28°</span>
                    </div>
                  </div>
                  
                  {/* Cognitive Load & Stress Meter */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <BrainCircuit className="h-4 w-4 mr-2 text-primary" />
                          <span className="font-medium text-sm">Cognitive Load</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {cognitiveLoad < 30 ? 'Low' : cognitiveLoad < 70 ? 'Moderate' : 'High'} ({cognitiveLoad}%)
                        </span>
                      </div>
                      <Progress 
                        value={cognitiveLoad} 
                        className="h-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-primary" />
                          <span className="font-medium text-sm">Stress Level</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {stressLevel < 30 ? 'Low' : stressLevel < 70 ? 'Moderate' : 'High'} ({stressLevel}%)
                        </span>
                      </div>
                      <Progress 
                        value={stressLevel} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Smart Settings */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">AI Environment Management</h3>
                    <p className="text-xs text-muted-foreground">Let AI optimize your environment based on mood and cognitive state</p>
                  </div>
                  <Switch 
                    checked={manageAllSettings} 
                    onCheckedChange={setManageAllSettings}
                  />
                </div>
              </div>
              
              {/* Recommendations */}
              {manageAllSettings && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 bg-muted/50 p-3 rounded-md"
                >
                  <div className="flex items-start gap-3">
                    <ArrowRightLeft className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">Environment Recommendations</p>
                      <p className="text-xs text-muted-foreground">Based on your current cognitive load and stress levels, we suggest:</p>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-1 pl-4 list-disc">
                        <li>Reduce ambient noise volume by 10%</li>
                        <li>Switch to natural lighting to improve focus</li>
                        <li>Take a 5-minute break every 25 minutes</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default SurroundingInfluencesSection;
