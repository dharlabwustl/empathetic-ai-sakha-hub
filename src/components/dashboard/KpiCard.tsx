
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { KpiData } from "@/hooks/useKpiTracking";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  Battery, 
  BookOpen, 
  Brain, 
  CheckSquare, 
  Clock, 
  Code, 
  FileText, 
  Heart, 
  LineChart, 
  PieChart, 
  Smile, 
  TrendingUp, 
  Users 
} from "lucide-react";

interface KpiCardProps {
  kpi: KpiData;
}

export default function KpiCard({ kpi }: KpiCardProps) {
  // Map icon string to Lucide component
  const IconComponent = () => {
    switch (kpi.icon) {
      case "Clock": return <Clock className="text-sakha-blue" size={24} />;
      case "BookOpen": return <BookOpen className="text-sakha-blue" size={24} />;
      case "Brain": return <Brain className="text-sakha-blue" size={24} />;
      case "Smile": return <Smile className="text-sakha-blue" size={24} />;
      case "LineChart": return <LineChart className="text-sakha-blue" size={24} />;
      case "CheckSquare": return <CheckSquare className="text-sakha-blue" size={24} />;
      case "Heart": return <Heart className="text-sakha-blue" size={24} />;
      case "TrendingUp": return <TrendingUp className="text-sakha-blue" size={24} />;
      case "FileText": return <FileText className="text-sakha-blue" size={24} />;
      case "Code": return <Code className="text-sakha-blue" size={24} />;
      case "PieChart": return <PieChart className="text-sakha-blue" size={24} />;
      case "Users": return <Users className="text-sakha-blue" size={24} />;
      case "Battery": return <Battery className="text-sakha-blue" size={24} />;
      default: return <Clock className="text-sakha-blue" size={24} />;
    }
  };
  
  const getTrendColor = () => {
    if (kpi.trend === "up") {
      return kpi.id.includes("burnout") || kpi.id.includes("risk") ? 
        "text-red-600" : "text-green-600";
    } else if (kpi.trend === "down") {
      return kpi.id.includes("burnout") || kpi.id.includes("risk") ? 
        "text-green-600" : "text-red-600";
    }
    return "text-gray-600";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{kpi.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            {kpi.value}
            {kpi.unit && <span className="text-lg ml-1">{kpi.unit}</span>}
          </span>
          <IconComponent />
        </div>
        <p className={`text-xs mt-2 flex items-center ${getTrendColor()}`}>
          {kpi.trend === "up" && <ArrowUpIcon className="h-3 w-3 mr-1" />}
          {kpi.trend === "down" && <ArrowDownIcon className="h-3 w-3 mr-1" />}
          {kpi.change !== 0 && (
            <>
              {kpi.change > 0 ? "+" : ""}
              {kpi.change}% from {kpi.id === "mood" ? "yesterday" : "last week"}
            </>
          )}
          {kpi.change === 0 && "No change"}
        </p>
      </CardContent>
    </Card>
  );
}
