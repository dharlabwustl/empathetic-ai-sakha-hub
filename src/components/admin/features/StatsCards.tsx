
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, LayoutGrid, Lock, Star, Users } from "lucide-react";

export interface StatsCardsProps {
  stats: {
    totalFeatures: number;
    premiumFeatures: number;
    freeFeatures: number;
    mostUsedFeature: {
      id: string;
      title: string;
      usageCount: number;
    };
  };
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, activeTab, setActiveTab }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className={activeTab === 'all' ? 'border-primary' : ''} 
            onClick={() => setActiveTab?.('all')}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Features
          </CardTitle>
          <Box className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalFeatures}</div>
        </CardContent>
      </Card>
      
      <Card className={activeTab === 'premium' ? 'border-primary' : ''}
            onClick={() => setActiveTab?.('premium')}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Premium Features
          </CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.premiumFeatures}</div>
        </CardContent>
      </Card>
      
      <Card className={activeTab === 'free' ? 'border-primary' : ''}
            onClick={() => setActiveTab?.('free')}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Free Features
          </CardTitle>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.freeFeatures}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Most Used
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.mostUsedFeature.title}</div>
          <p className="text-xs text-muted-foreground">
            {stats.mostUsedFeature.usageCount.toLocaleString()} uses
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
