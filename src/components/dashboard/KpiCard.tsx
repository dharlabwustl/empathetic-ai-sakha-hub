
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { KpiData } from "@/hooks/useKpiTracking";
import { LucideIcon, ArrowUp, ArrowDown, TrendingUp, Database, Brain, Clock, Target, Award, Star, Users, BookOpen, FileText, BarChart3, Zap, Lightning, Sparkles } from 'lucide-react';

interface KpiCardProps {
  kpi: KpiData;
  delay?: number;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi, delay = 0, className = "" }) => {
  const getIconByType = (): React.ReactNode => {
    // Map kpi.icon to a Lucide icon component
    const iconMap: Record<string, LucideIcon> = {
      "database": Database,
      "brain": Brain,
      "clock": Clock,
      "target": Target,
      "award": Award,
      "star": Star,
      "users": Users,
      "bookOpen": BookOpen,
      "fileText": FileText,
      "barChart3": BarChart3,
      "zap": Zap,
      "lightning": Lightning,
      "sparkles": Sparkles,
      "trendingUp": TrendingUp
    };
    
    const IconComponent = iconMap[kpi.icon] || Database;
    return <IconComponent className="h-6 w-6" />;
  };
  
  const getChangeColor = () => {
    if (!kpi.change) return "text-gray-500";
    
    if (kpi.change.direction === "up") {
      return kpi.change.isPositive ? "text-emerald-500" : "text-red-500";
    } else if (kpi.change.direction === "down") {
      return kpi.change.isPositive ? "text-emerald-500" : "text-red-500";
    }
    
    return "text-gray-500";
  };
  
  const getChangeIcon = () => {
    if (!kpi.change) return null;
    
    if (kpi.change.direction === "up") {
      return <ArrowUp className="h-4 w-4" />;
    } else if (kpi.change.direction === "down") {
      return <ArrowDown className="h-4 w-4" />;
    }
    
    return null;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut"
      }}
    >
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="bg-primary/10 p-2 rounded-full">
              {getIconByType()}
            </div>
            {kpi.change && (
              <div className={`flex items-center gap-0.5 text-sm ${getChangeColor()}`}>
                {getChangeIcon()}
                <span>{kpi.change.value}%</span>
              </div>
            )}
          </div>
          <h3 className="mt-3 font-medium text-base">{kpi.label}</h3>
          <div className="mt-2 flex items-end gap-2">
            <div className="text-2xl font-semibold">{kpi.value}</div>
            {kpi.unit && <div className="text-muted-foreground text-sm mb-1">{kpi.unit}</div>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KpiCard;
