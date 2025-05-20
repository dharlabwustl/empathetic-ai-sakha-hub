
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomProgress } from "@/components/ui/custom-progress";
import { Users, Sliders, Eye, AlertTriangle, ExternalLink, Brain, Activity, Calendar, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PieChart, PieChartData } from '@/components/charts/PieChart';

interface SurroundingInfluenceProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection = ({
  influenceMeterCollapsed = true,
  setInfluenceMeterCollapsed
}: SurroundingInfluenceProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedWeek, setSelectedWeek] = useState('current');
  
  // Weekly data for charts
  const weeklyData = {
    current: {
      peerInfluence: [
        { name: "Positive", value: 68, color: "#3b82f6" },
        { name: "Neutral", value: 22, color: "#94a3b8" },
        { name: "Negative", value: 10, color: "#ef4444" }
      ],
      studyConfidence: [
        { name: "High", value: 75, color: "#22c55e" },
        { name: "Medium", value: 15, color: "#eab308" },
        { name: "Low", value: 10, color: "#ef4444" }
      ],
      proactiveness: [
        { name: "High", value: 62, color: "#8b5cf6" },
        { name: "Medium", value: 28, color: "#94a3b8" },
        { name: "Low", value: 10, color: "#f97316" }
      ],
      environmentalDistraction: [
        { name: "Low", value: 42, color: "#22c55e" },
        { name: "Medium", value: 38, color: "#eab308" },
        { name: "High", value: 20, color: "#ef4444" }
      ],
      goalAlignment: [
        { name: "Aligned", value: 82, color: "#3b82f6" },
        { name: "Partial", value: 15, color: "#94a3b8" },
        { name: "Misaligned", value: 3, color: "#ef4444" }
      ],
      emotionalStability: [
        { name: "Stable", value: 65, color: "#22c55e" },
        { name: "Variable", value: 25, color: "#eab308" },
        { name: "Unstable", value: 10, color: "#ef4444" }
      ],
      sleepRoutine: [
        { name: "Healthy", value: 58, color: "#22c55e" },
        { name: "Inconsistent", value: 32, color: "#eab308" },
        { name: "Poor", value: 10, color: "#ef4444" }
      ]
    },
    previous: {
      peerInfluence: [
        { name: "Positive", value: 60, color: "#3b82f6" },
        { name: "Neutral", value: 25, color: "#94a3b8" },
        { name: "Negative", value: 15, color: "#ef4444" }
      ],
      studyConfidence: [
        { name: "High", value: 70, color: "#22c55e" },
        { name: "Medium", value: 20, color: "#eab308" },
        { name: "Low", value: 10, color: "#ef4444" }
      ],
      proactiveness: [
        { name: "High", value: 55, color: "#8b5cf6" },
        { name: "Medium", value: 35, color: "#94a3b8" },
        { name: "Low", value: 10, color: "#f97316" }
      ],
      environmentalDistraction: [
        { name: "Low", value: 35, color: "#22c55e" },
        { name: "Medium", value: 45, color: "#eab308" },
        { name: "High", value: 20, color: "#ef4444" }
      ],
      goalAlignment: [
        { name: "Aligned", value: 75, color: "#3b82f6" },
        { name: "Partial", value: 20, color: "#94a3b8" },
        { name: "Misaligned", value: 5, color: "#ef4444" }
      ],
      emotionalStability: [
        { name: "Stable", value: 60, color: "#22c55e" },
        { name: "Variable", value: 30, color: "#eab308" },
        { name: "Unstable", value: 10, color: "#ef4444" }
      ],
      sleepRoutine: [
        { name: "Healthy", value: 50, color: "#22c55e" },
        { name: "Inconsistent", value: 40, color: "#eab308" },
        { name: "Poor", value: 10, color: "#ef4444" }
      ]
    },
    twoWeeksAgo: {
      peerInfluence: [
        { name: "Positive", value: 55, color: "#3b82f6" },
        { name: "Neutral", value: 25, color: "#94a3b8" },
        { name: "Negative", value: 20, color: "#ef4444" }
      ],
      studyConfidence: [
        { name: "High", value: 65, color: "#22c55e" },
        { name: "Medium", value: 25, color: "#eab308" },
        { name: "Low", value: 10, color: "#ef4444" }
      ],
      proactiveness: [
        { name: "High", value: 45, color: "#8b5cf6" },
        { name: "Medium", value: 40, color: "#94a3b8" },
        { name: "Low", value: 15, color: "#f97316" }
      ],
      environmentalDistraction: [
        { name: "Low", value: 30, color: "#22c55e" },
        { name: "Medium", value: 45, color: "#eab308" },
        { name: "High", value: 25, color: "#ef4444" }
      ],
      goalAlignment: [
        { name: "Aligned", value: 70, color: "#3b82f6" },
        { name: "Partial", value: 20, color: "#94a3b8" },
        { name: "Misaligned", value: 10, color: "#ef4444" }
      ],
      emotionalStability: [
        { name: "Stable", value: 55, color: "#22c55e" },
        { name: "Variable", value: 30, color: "#eab308" },
        { name: "Unstable", value: 15, color: "#ef4444" }
      ],
      sleepRoutine: [
        { name: "Healthy", value: 45, color: "#22c55e" },
        { name: "Inconsistent", value: 40, color: "#eab308" },
        { name: "Poor", value: 15, color: "#ef4444" }
      ]
    }
  };

  const getActiveData = () => {
    return weeklyData[selectedWeek as keyof typeof weeklyData];
  };
  
  const handleConfigure = () => {
    toast({
      title: "Configure Surrounding Influences",
      description: "Opening configuration interface for influence tracking",
      variant: "default"
    });
  };
  
  const handleViewDashboard = () => {
    toast({
      title: "Visual Dashboard",
      description: "Opening visual analytics for surrounding influences",
      variant: "default"
    });
  };

  if (influenceMeterCollapsed) {
    return (
      <div className="mb-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-between"
          onClick={() => setInfluenceMeterCollapsed(false)}
        >
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-blue-500" />
            <span>Surrounding Influences Meter</span>
          </div>
          <Badge variant="outline" className="text-sm">View</Badge>
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-blue-400" size={20} />
            <span>Surrounding Influence Meter</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleConfigure}>Configure</Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setInfluenceMeterCollapsed(true)}
              className="h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Weekly Analysis</h3>
            <div className="flex gap-2">
              <Button 
                variant={selectedWeek === 'twoWeeksAgo' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedWeek('twoWeeksAgo')}
              >
                2 Weeks Ago
              </Button>
              <Button 
                variant={selectedWeek === 'previous' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedWeek('previous')}
              >
                Last Week
              </Button>
              <Button 
                variant={selectedWeek === 'current' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedWeek('current')}
              >
                This Week
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-7 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="peerInfluence">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span className="hidden sm:inline">Peer</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="confidence">
              <div className="flex items-center gap-1">
                <Brain size={14} />
                <span className="hidden sm:inline">Confidence</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="proactiveness">
              <div className="flex items-center gap-1">
                <Activity size={14} />
                <span className="hidden sm:inline">Proactiveness</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="environment">
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span className="hidden sm:inline">Environment</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="goals">
              <div className="flex items-center gap-1">
                <Sliders size={14} />
                <span className="hidden sm:inline">Goals</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="sleep">
              <div className="flex items-center gap-1">
                <Moon size={14} />
                <span className="hidden sm:inline">Sleep</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 text-center">Peer Influence</h3>
                  <div className="h-32 flex items-center justify-center">
                    <PieChart data={getActiveData().peerInfluence} />
                  </div>
                  <div className="mt-2 text-sm text-center">
                    <span className="font-medium">{getActiveData().peerInfluence[0].value}%</span> positive influence
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 text-center">Study Confidence</h3>
                  <div className="h-32 flex items-center justify-center">
                    <PieChart data={getActiveData().studyConfidence} />
                  </div>
                  <div className="mt-2 text-sm text-center">
                    <span className="font-medium">{getActiveData().studyConfidence[0].value}%</span> high confidence
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 text-center">Proactiveness</h3>
                  <div className="h-32 flex items-center justify-center">
                    <PieChart data={getActiveData().proactiveness} />
                  </div>
                  <div className="mt-2 text-sm text-center">
                    <span className="font-medium">{getActiveData().proactiveness[0].value}%</span> high proactiveness
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3 text-center">Environmental Distractions</h3>
                  <div className="h-32 flex items-center justify-center">
                    <PieChart data={getActiveData().environmentalDistraction} />
                  </div>
                  <div className="mt-2 text-sm text-center">
                    <span className="font-medium">{getActiveData().environmentalDistraction[0].value}%</span> low distractions
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Key Insights</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {selectedWeek === 'current' ? 'This week' : selectedWeek === 'previous' ? 'Last week' : '2 weeks ago'}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/30 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Positive study environment improved by {selectedWeek === 'current' ? '12%' : selectedWeek === 'previous' ? '8%' : '5%'}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/30 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span>Peer distractions are moderate during evenings</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/30 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Noise levels affecting focus during peak hours</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleViewDashboard} 
                className="w-full flex items-center justify-center gap-1"
                variant="outline"
              >
                <Eye size={16} />
                View Full Dashboard
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="peerInfluence">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 text-center">Peer Influence Analysis</h3>
                <div className="h-60 flex items-center justify-center">
                  <PieChart data={getActiveData().peerInfluence} showLabel={true} />
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Peer comparison stress</span>
                      <span className="font-medium">{100 - getActiveData().peerInfluence[0].value}%</span>
                    </div>
                    <CustomProgress 
                      value={100 - getActiveData().peerInfluence[0].value} 
                      className="h-2" 
                      indicatorClassName="bg-red-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Positive peer interactions</span>
                      <span className="font-medium">{getActiveData().peerInfluence[0].value}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().peerInfluence[0].value} 
                      className="h-2" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Peer Influence Factors</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Social media comparison</span>
                    <Badge variant={getActiveData().peerInfluence[0].value > 65 ? "outline" : "secondary"} className="text-xs">
                      {getActiveData().peerInfluence[0].value > 65 ? "Low impact" : "Medium impact"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Competitive study groups</span>
                    <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/30 text-xs">Positive impact</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Comparison with top performers</span>
                    <Badge variant={getActiveData().peerInfluence[2].value > 15 ? "secondary" : "outline"} className="text-xs">
                      {getActiveData().peerInfluence[2].value > 15 ? "High impact" : "Medium impact"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="confidence">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 text-center">Study Confidence Analysis</h3>
                <div className="h-60 flex items-center justify-center">
                  <PieChart data={getActiveData().studyConfidence} showLabel={true} />
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Self-assessed confidence per subject</span>
                      <span className="font-medium">{getActiveData().studyConfidence[0].value}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().studyConfidence[0].value} 
                      className="h-2" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy in self-prediction</span>
                      <span className="font-medium">{getActiveData().studyConfidence[0].value - 5}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().studyConfidence[0].value - 5} 
                      className="h-2" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Subject-wise Confidence</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Physics</span>
                    <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/30 text-xs">High confidence</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Chemistry</span>
                    <Badge variant="outline" className="text-amber-600 bg-amber-50 dark:bg-amber-900/30 text-xs">Medium confidence</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Biology</span>
                    <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/30 text-xs">High confidence</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="proactiveness">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 text-center">Proactiveness Analysis</h3>
                <div className="h-60 flex items-center justify-center">
                  <PieChart data={getActiveData().proactiveness} showLabel={true} />
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Task initiation before reminders</span>
                      <span className="font-medium">{getActiveData().proactiveness[0].value}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().proactiveness[0].value} 
                      className="h-2" 
                      indicatorClassName="bg-purple-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Spontaneous review behavior</span>
                      <span className="font-medium">{getActiveData().proactiveness[0].value - 10}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().proactiveness[0].value - 10} 
                      className="h-2" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Proactive Study Habits</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Non-peak hour study time</span>
                    <Badge variant="outline" className={getActiveData().proactiveness[0].value > 60 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"} className="text-xs">
                      {getActiveData().proactiveness[0].value > 60 ? "Excellent" : "Good"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Self-initiated revision</span>
                    <Badge variant="outline" className={getActiveData().proactiveness[0].value > 55 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"} className="text-xs">
                      {getActiveData().proactiveness[0].value > 55 ? "Excellent" : "Good"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="environment">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 text-center">Environmental Distractions</h3>
                <div className="h-60 flex items-center justify-center">
                  <PieChart data={getActiveData().environmentalDistraction} showLabel={true} />
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Task drop-offs mid-session</span>
                      <span className="font-medium">{getActiveData().environmentalDistraction[2].value}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().environmentalDistraction[2].value} 
                      className="h-2" 
                      indicatorClassName="bg-red-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Focus duration</span>
                      <span className="font-medium">{getActiveData().environmentalDistraction[0].value}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().environmentalDistraction[0].value} 
                      className="h-2" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Environmental Factors</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Noise levels</span>
                    <Badge variant={getActiveData().environmentalDistraction[2].value > 25 ? "secondary" : "outline"} className="text-xs">
                      {getActiveData().environmentalDistraction[2].value > 25 ? "Significant impact" : "Moderate impact"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Digital distractions</span>
                    <Badge variant={getActiveData().environmentalDistraction[2].value > 20 ? "secondary" : "outline"} className="text-xs">
                      {getActiveData().environmentalDistraction[2].value > 20 ? "High impact" : "Medium impact"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="goals">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 text-center">Goal Alignment</h3>
                <div className="h-60 flex items-center justify-center">
                  <PieChart data={getActiveData().goalAlignment} showLabel={true} />
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Clarity in goal-setting</span>
                      <span className="font-medium">{getActiveData().goalAlignment[0].value}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().goalAlignment[0].value} 
                      className="h-2" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress tracking vs. goals</span>
                      <span className="font-medium">{getActiveData().goalAlignment[0].value - 5}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().goalAlignment[0].value - 5} 
                      className="h-2" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Weekly Motivation Check</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Goal consistency</span>
                    <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/30 text-xs">Excellent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Goal achievement rate</span>
                    <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/30 text-xs">
                      {getActiveData().goalAlignment[0].value}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sleep">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 text-center">Sleep & Routine Health</h3>
                <div className="h-60 flex items-center justify-center">
                  <PieChart data={getActiveData().sleepRoutine} showLabel={true} />
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Consistency in study hours</span>
                      <span className="font-medium">{getActiveData().sleepRoutine[0].value}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().sleepRoutine[0].value} 
                      className="h-2" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Late-night study frequency</span>
                      <span className="font-medium">{getActiveData().sleepRoutine[2].value}%</span>
                    </div>
                    <CustomProgress 
                      value={getActiveData().sleepRoutine[2].value} 
                      className="h-2" 
                      indicatorClassName="bg-red-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Sleep Pattern Impact</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Morning productivity</span>
                    <Badge variant="outline" className={getActiveData().sleepRoutine[0].value > 55 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"} className="text-xs">
                      {getActiveData().sleepRoutine[0].value > 55 ? "High" : "Medium"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
                    <span className="text-sm">Study routine consistency</span>
                    <Badge variant="outline" className={getActiveData().sleepRoutine[0].value > 50 ? "text-green-600 bg-green-50 dark:bg-green-900/30" : "text-amber-600 bg-amber-50 dark:bg-amber-900/30"} className="text-xs">
                      {getActiveData().sleepRoutine[0].value > 50 ? "Good" : "Fair"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SurroundingInfluencesSection;
