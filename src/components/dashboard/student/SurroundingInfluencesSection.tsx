
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Activity, Moon, Sun, Thermometer, Calendar, Settings } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTodaysStudyFocus } from '@/hooks/useTodaysStudyFocus';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  // Get current time
  const now = new Date();
  const currentHour = now.getHours();
  
  // Default values for meters
  const [timeOfDay, setTimeOfDay] = useState(currentHour);
  const [activityLevel, setActivityLevel] = useState(calculateActivityLevel(currentHour));
  const [restedness, setRestedness] = useState(70);
  const [temperature, setTemperature] = useState(72);
  const [studyFocus, setStudyFocus] = useState('Physics');

  // Get today's focus from custom hook
  const { 
    studyFocusToday, 
    secondaryFocus,
    percentageCompleted, 
    topicSuggestions,
    loading 
  } = useTodaysStudyFocus(studyFocus);
  
  const handleToggleCollapse = () => {
    setInfluenceMeterCollapsed(!influenceMeterCollapsed);
  };

  return (
    <Card className="mb-6 overflow-hidden transition-all duration-300">
      <CardHeader className="py-3 cursor-pointer" onClick={handleToggleCollapse}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-blue-600" />
            <CardTitle className="text-sm font-medium">Surrounding Influences</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
            {influenceMeterCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </Button>
        </div>
        {!influenceMeterCollapsed && (
          <CardDescription>
            Environmental factors that may impact your study performance today
          </CardDescription>
        )}
      </CardHeader>
      
      {!influenceMeterCollapsed && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Time of Day Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="text-sm font-medium">Time of Day</span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Settings size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Adjust your study schedule</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="h-32 relative bg-gradient-to-b from-blue-200 via-orange-200 to-indigo-200 rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {getTimeOfDayEmoji(timeOfDay)}
                    <div className="text-xs mt-1 font-medium">{getTimeOfDayLabel(timeOfDay)}</div>
                  </div>
                </div>
                
                <div 
                  className="absolute w-full h-1 bg-blue-500 transition-all duration-300"
                  style={{ 
                    top: `${(timeOfDay / 24) * 100}%`,
                    opacity: 0.7
                  }}
                ></div>
              </div>
              
              <div>
                <p className="text-xs text-center text-muted-foreground">
                  {getTimeOfDayTip(timeOfDay)}
                </p>
              </div>
            </div>
            
            {/* Activity Level Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Activity size={16} className="text-green-600" />
                  <span className="text-sm font-medium">Activity Level</span>
                </div>
              </div>
              
              <div className="h-32 relative bg-gradient-to-b from-red-50 via-yellow-50 to-green-50 rounded-md overflow-hidden border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {getActivityEmoji(activityLevel)}
                    <div className="text-xs mt-1 font-medium">{getActivityLabel(activityLevel)}</div>
                  </div>
                </div>
                
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-green-300 transition-all duration-300"
                  style={{ height: `${activityLevel}%`, opacity: 0.7 }}
                ></div>
              </div>
              
              <div className="pt-1">
                <Slider
                  value={[activityLevel]} 
                  min={0} 
                  max={100} 
                  step={10}
                  onValueChange={(value) => setActivityLevel(value[0])} 
                  className="py-2"
                />
                <p className="text-xs text-center text-muted-foreground">
                  {getActivityTip(activityLevel)}
                </p>
              </div>
            </div>
            
            {/* Restedness Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Moon size={16} className="text-indigo-600" />
                  <span className="text-sm font-medium">Restedness</span>
                </div>
              </div>
              
              <div className="h-32 relative bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-50 rounded-md overflow-hidden border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {getRestednessEmoji(restedness)}
                    <div className="text-xs mt-1 font-medium">{getRestednessLabel(restedness)}</div>
                  </div>
                </div>
                
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-500 to-blue-300 transition-all duration-300"
                  style={{ height: `${restedness}%`, opacity: 0.7 }}
                ></div>
              </div>
              
              <div className="pt-1">
                <Slider
                  value={[restedness]} 
                  min={0} 
                  max={100} 
                  step={10}
                  onValueChange={(value) => setRestedness(value[0])} 
                  className="py-2"
                />
                <p className="text-xs text-center text-muted-foreground">
                  {getRestedness(restedness)}
                </p>
              </div>
            </div>
            
            {/* Temperature Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Thermometer size={16} className="text-orange-600" />
                  <span className="text-sm font-medium">Environment</span>
                </div>
              </div>
              
              <div className="h-32 relative bg-gradient-to-b from-blue-50 via-green-50 to-red-50 rounded-md overflow-hidden border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {getTemperatureEmoji(temperature)}
                    <div className="text-xs mt-1 font-medium">{temperature}°F</div>
                  </div>
                </div>
                
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 via-green-500 to-blue-500 transition-all duration-300"
                  style={{ 
                    height: `${((temperature - 60) / (80 - 60)) * 100}%`, 
                    opacity: 0.7
                  }}
                ></div>
              </div>
              
              <div className="pt-1">
                <Slider
                  value={[temperature]} 
                  min={60} 
                  max={80} 
                  step={1}
                  onValueChange={(value) => setTemperature(value[0])} 
                  className="py-2"
                />
                <p className="text-xs text-center text-muted-foreground">
                  {getTemperatureTip(temperature)}
                </p>
              </div>
            </div>
            
            {/* Today's Focus */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Sun size={16} className="text-amber-600" />
                  <span className="text-sm font-medium">Today's Focus</span>
                </div>
              </div>
              
              <div className="h-32 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-md overflow-hidden border flex flex-col justify-center items-center p-4">
                <div className="text-center">
                  <span className="text-2xl" role="img" aria-label="focus">
                    {getFocusEmoji(studyFocusToday || studyFocus)}
                  </span>
                  <div className="text-base font-medium mt-1">
                    {studyFocusToday || studyFocus}
                  </div>
                  {secondaryFocus && (
                    <div className="text-xs mt-1 text-muted-foreground">
                      Also: {secondaryFocus}
                    </div>
                  )}
                  <div className="text-xs mt-2">
                    <span className="font-medium">{percentageCompleted}%</span> completed
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-center text-muted-foreground">
                  {getFocusTip(studyFocusToday || studyFocus)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

// Helper functions for time of day
function calculateActivityLevel(hour: number): number {
  // Activity level is highest midday and afternoon, lowest in early morning and late night
  if (hour >= 8 && hour < 12) return 70; // Morning
  if (hour >= 12 && hour < 16) return 80; // Afternoon
  if (hour >= 16 && hour < 20) return 60; // Evening
  if (hour >= 20 && hour < 23) return 40; // Night
  return 20; // Late night/early morning
}

function getTimeOfDayEmoji(hour: number): JSX.Element {
  if (hour >= 5 && hour < 8) return <span className="text-2xl">🌅</span>;
  if (hour >= 8 && hour < 12) return <span className="text-2xl">🌞</span>;
  if (hour >= 12 && hour < 16) return <span className="text-2xl">☀️</span>;
  if (hour >= 16 && hour < 19) return <span className="text-2xl">🌇</span>;
  if (hour >= 19 && hour < 23) return <span className="text-2xl">🌙</span>;
  return <span className="text-2xl">🌚</span>;
}

function getTimeOfDayLabel(hour: number): string {
  if (hour >= 5 && hour < 8) return "Early Morning";
  if (hour >= 8 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 16) return "Afternoon";
  if (hour >= 16 && hour < 19) return "Evening";
  if (hour >= 19 && hour < 23) return "Night";
  return "Late Night";
}

function getTimeOfDayTip(hour: number): string {
  if (hour >= 5 && hour < 8) return "Great for memory tasks";
  if (hour >= 8 && hour < 12) return "Peak focus time";
  if (hour >= 12 && hour < 16) return "Good for complex problem solving";
  if (hour >= 16 && hour < 19) return "Ideal for creative work";
  if (hour >= 19 && hour < 23) return "Best for review sessions";
  return "Consider getting some rest";
}

// Helper functions for activity level
function getActivityEmoji(level: number): JSX.Element {
  if (level < 30) return <span className="text-2xl">🧘</span>;
  if (level < 60) return <span className="text-2xl">🚶</span>;
  if (level < 80) return <span className="text-2xl">🏃</span>;
  return <span className="text-2xl">⚡</span>;
}

function getActivityLabel(level: number): string {
  if (level < 30) return "Relaxed";
  if (level < 60) return "Moderate";
  if (level < 80) return "Active";
  return "High Energy";
}

function getActivityTip(level: number): string {
  if (level < 30) return "Good for focused deep work";
  if (level < 60) return "Balanced energy for studying";
  if (level < 80) return "Channel energy into active learning";
  return "Take short, frequent breaks";
}

// Helper functions for restedness
function getRestednessEmoji(level: number): JSX.Element {
  if (level < 30) return <span className="text-2xl">😴</span>;
  if (level < 60) return <span className="text-2xl">😌</span>;
  if (level < 80) return <span className="text-2xl">😊</span>;
  return <span className="text-2xl">😃</span>;
}

function getRestednessLabel(level: number): string {
  if (level < 30) return "Tired";
  if (level < 60) return "Ok";
  if (level < 80) return "Rested";
  return "Well Rested";
}

function getRestedness(level: number): string {
  if (level < 30) return "Consider a power nap";
  if (level < 60) return "Try some light exercise";
  if (level < 80) return "Good energy for studying";
  return "Perfect for challenging topics";
}

// Helper functions for temperature
function getTemperatureEmoji(temp: number): JSX.Element {
  if (temp < 65) return <span className="text-2xl">❄️</span>;
  if (temp > 75) return <span className="text-2xl">🔥</span>;
  return <span className="text-2xl">✨</span>;
}

function getTemperatureTip(temp: number): string {
  if (temp < 65) return "Consider warming up your space";
  if (temp > 75) return "Cool environment may help focus";
  return "Ideal temperature for studying";
}

// Helper functions for focus subject
function getFocusEmoji(subject: string): string {
  switch (subject.toLowerCase()) {
    case 'physics': return '⚛️';
    case 'chemistry': return '🧪';
    case 'biology': return '🧬';
    case 'mathematics': return '📊';
    case 'english': return '📝';
    case 'history': return '📜';
    case 'geography': return '🌍';
    default: return '📚';
  }
}

function getFocusTip(subject: string): string {
  switch (subject.toLowerCase()) {
    case 'physics': return "Focus on practice problems today";
    case 'chemistry': return "Don't forget to review formulas";
    case 'biology': return "Use diagrams to strengthen memory";
    case 'mathematics': return "Work through examples step by step";
    default: return "Break concepts into manageable parts";
  }
}

export default SurroundingInfluencesSection;
