
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureStats } from "./types";
import { Package, PackagePlus, PackageMinus, Filter } from "lucide-react";

export interface StatsCardsProps {
  stats: FeatureStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, activeTab, setActiveTab }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card 
        className={`cursor-pointer ${activeTab === "all" ? "border-primary" : ""}`} 
        onClick={() => setActiveTab("all")}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Features</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">All platform features</p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer ${activeTab === "premium" ? "border-primary" : ""}`} 
        onClick={() => setActiveTab("premium")}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Premium Features</CardTitle>
          <PackagePlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.premium}</div>
          <p className="text-xs text-muted-foreground">Requires premium access</p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer ${activeTab === "free" ? "border-primary" : ""}`} 
        onClick={() => setActiveTab("free")}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Free Features</CardTitle>
          <PackageMinus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.free}</div>
          <p className="text-xs text-muted-foreground">Available without subscription</p>
        </CardContent>
      </Card>
      
      <Card 
        className={`cursor-pointer ${activeTab === "limited" ? "border-primary" : ""}`} 
        onClick={() => setActiveTab("limited")}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Access Limited</CardTitle>
          <Filter className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.limited}</div>
          <p className="text-xs text-muted-foreground">Features with usage limits</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
