
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { UserProfileType } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import { TrendingUp, Target, Calendar, BookOpen, Award, Zap, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="space-y-8 p-6">
      {/* Premium Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl"
      >
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-yellow-300" />
              Welcome back, {userProfile.name}!
            </h1>
            <p className="text-violet-100 text-lg">Ready to continue your learning journey?</p>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md" />
              <img 
                src={userProfile.avatar || '/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png'}
                alt={userProfile.name}
                className="relative w-20 h-20 rounded-full border-4 border-white/30 object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Premium KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onHoverStart={() => setHoveredCard(kpi.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card className={`relative overflow-hidden border-0 bg-white/60 dark:bg-black/30 backdrop-blur-md shadow-xl transition-all duration-300 ${hoveredCard === kpi.id ? 'scale-105 shadow-2xl' : ''}`}>
              {/* Premium gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-lg" />
              <div className="absolute inset-[1px] bg-white/80 dark:bg-black/40 rounded-lg backdrop-blur-sm" />
              
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl">{kpi.icon}</div>
                  <Badge variant={kpi.changeType === 'positive' ? 'default' : 'secondary'} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{kpi.change}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200">{kpi.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      {kpi.value}
                    </span>
                    {kpi.unit && <span className="text-sm text-gray-500">{kpi.unit}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Premium Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 bg-white/50 dark:bg-black/20 backdrop-blur-md shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="h-6 w-6 text-yellow-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 border-0 shadow-lg transform transition-all duration-200 hover:scale-105">
                <div className="flex flex-col items-center gap-2">
                  <Target className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold">Start Practice</div>
                    <div className="text-sm opacity-90">Continue learning</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-6 bg-white/60 dark:bg-black/30 backdrop-blur-sm border-white/40 hover:bg-white/80 dark:hover:bg-black/50 shadow-lg transform transition-all duration-200 hover:scale-105">
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="h-8 w-8 text-violet-600" />
                  <div className="text-center">
                    <div className="font-semibold">View Schedule</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Today's plan</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-6 bg-white/60 dark:bg-black/30 backdrop-blur-sm border-white/40 hover:bg-white/80 dark:hover:bg-black/50 shadow-lg transform transition-all duration-200 hover:scale-105">
                <div className="flex flex-col items-center gap-2">
                  <BookOpen className="h-8 w-8 text-violet-600" />
                  <div className="text-center">
                    <div className="font-semibold">Study Materials</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Access resources</div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Premium Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="border-0 bg-white/50 dark:bg-black/20 backdrop-blur-md shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Award className="h-6 w-6 text-yellow-500" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Overall Progress</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">68%</span>
              </div>
              <div className="relative">
                <Progress value={68} className="h-3 bg-gray-200 dark:bg-gray-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full opacity-80" style={{ width: '68%' }} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
                <div className="text-2xl font-bold text-emerald-600">24</div>
                <div className="text-sm text-emerald-700 dark:text-emerald-400">Completed Topics</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-blue-700 dark:text-blue-400">Days Streak</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <div className="text-2xl font-bold text-purple-600">85%</div>
                <div className="text-sm text-purple-700 dark:text-purple-400">Avg Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RedesignedDashboardOverview;
