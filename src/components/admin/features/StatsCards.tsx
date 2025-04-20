
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureStats } from "./types";

interface StatsCardsProps {
  stats: FeatureStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Features</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-xl">🧩</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Premium Features</p>
            <p className="text-2xl font-bold">{stats.premium}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
            <span className="text-xl">✨</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Free Features</p>
            <p className="text-2xl font-bold">{stats.free}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <span className="text-xl">🎁</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Limited Access</p>
            <p className="text-2xl font-bold">{stats.limited}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <span className="text-xl">⏱️</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
