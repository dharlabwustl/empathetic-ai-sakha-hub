import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronDown, 
  ChevronUp, 
  Home, 
  Users, 
  Wifi, 
  Volume2, 
  Sun, 
  Coffee,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const influences = [
    {
      category: "Environment",
      icon: <Home className="h-4 w-4" />,
      score: 85,
      status: "optimal",
      factors: [
        { name: "Noise Level", value: 20, optimal: "< 30 dB", status: "good" },
        { name: "Lighting", value: 85, optimal: "400-500 lux", status: "optimal" },
        { name: "Temperature", value: 22, optimal: "20-24°C", status: "optimal" },
        { name: "Air Quality", value: 78, optimal: "> 70", status: "good" }
      ]
    },
    {
      category: "Social",
      icon: <Users className="h-4 w-4" />,
      score: 72,
      status: "good",
      factors: [
        { name: "Family Support", value: 90, optimal: "> 80", status: "optimal" },
        { name: "Peer Influence", value: 65, optimal: "> 70", status: "poor" },
        { name: "Study Group", value: 80, optimal: "> 75", status: "good" },
        { name: "Distractions", value: 55, optimal: "< 30", status: "poor" }
      ]
    },
    {
      category: "Technology",
      icon: <Smartphone className="h-4 w-4" />,
      score: 68,
      status: "good",
      factors: [
        { name: "Internet Speed", value: 95, optimal: "> 50 Mbps", status: "optimal" },
        { name: "Device Performance", value: 88, optimal: "> 80", status: "optimal" },
        { name: "App Usage", value: 45, optimal: "< 2h study time", status: "poor" },
        { name: "Digital Wellness", value: 60, optimal: "> 70", status: "poor" }
      ]
    }
  ];

  const overallScore = Math.round(influences.reduce((sum, cat) => sum + cat.score, 0) / influences.length);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-green-600 bg-green-100";
      case "good": return "text-blue-600 bg-blue-100";
      case "poor": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    return "text-red-600";
  };

  return (
    <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900">
      <CardHeader 
        className="cursor-pointer select-none"
        onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
              <Monitor className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Surrounding Influences</CardTitle>
              <p className="text-sm text-muted-foreground">Environmental factors affecting your study</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}%
              </div>
              <Badge variant="outline" className={getStatusColor(overallScore >= 80 ? "optimal" : overallScore >= 60 ? "good" : "poor")}>
                {overallScore >= 80 ? "optimal" : overallScore >= 60 ? "good" : "poor"}
              </Badge>
            </div>
            {influenceMeterCollapsed ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>

      {!influenceMeterCollapsed && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Category Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {influences.map((category) => (
                <div
                  key={category.category}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedCategory === category.category
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.category ? null : category.category
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span className="font-medium">{category.category}</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(category.status)}>
                      {category.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={category.score} className="flex-1 h-2" />
                    <span className={`text-sm font-medium ${getScoreColor(category.score)}`}>
                      {category.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed View */}
            {selectedCategory && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                {(() => {
                  const category = influences.find(c => c.category === selectedCategory);
                  if (!category) return null;
                  
                  return (
                    <div>
                      <h4 className="font-medium text-lg mb-3 flex items-center gap-2">
                        {category.icon}
                        {category.category} Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.factors.map((factor, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                            <div>
                              <div className="font-medium text-sm">{factor.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Optimal: {factor.optimal}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-medium ${getScoreColor(factor.value)}`}>
                                {factor.value}{typeof factor.value === 'number' && factor.value <= 100 ? '%' : ''}
                              </div>
                              <Badge variant="outline" className={getStatusColor(factor.status)}>
                                {factor.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" size="sm">
                <Sun className="h-4 w-4 mr-2" />
                Optimize Lighting
              </Button>
              <Button variant="outline" size="sm">
                <Volume2 className="h-4 w-4 mr-2" />
                Reduce Noise
              </Button>
              <Button variant="outline" size="sm">
                <Coffee className="h-4 w-4 mr-2" />
                Break Reminder
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SurroundingInfluencesSection;
