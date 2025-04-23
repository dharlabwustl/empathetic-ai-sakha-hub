
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
import { motion } from "framer-motion";

interface KpiCardProps {
  kpi: KpiData;
  delay?: number;
}

export default function KpiCard({ kpi, delay = 0 }: KpiCardProps) {
  // Map icon string to Lucide component
  const IconComponent = () => {
    switch (kpi.icon) {
      case "Clock": return <Clock className="text-sky-500" size={24} />;
      case "BookOpen": return <BookOpen className="text-violet-500" size={24} />;
      case "Brain": return <Brain className="text-indigo-500" size={24} />;
      case "Smile": return <Smile className="text-amber-500" size={24} />;
      case "LineChart": return <LineChart className="text-emerald-500" size={24} />;
      case "CheckSquare": return <CheckSquare className="text-teal-500" size={24} />;
      case "Heart": return <Heart className="text-rose-500" size={24} />;
      case "TrendingUp": return <TrendingUp className="text-blue-500" size={24} />;
      case "FileText": return <FileText className="text-purple-500" size={24} />;
      case "Code": return <Code className="text-fuchsia-500" size={24} />;
      case "PieChart": return <PieChart className="text-cyan-500" size={24} />;
      case "Users": return <Users className="text-red-500" size={24} />;
      case "Battery": return <Battery className="text-green-500" size={24} />;
      default: return <Clock className="text-sky-500" size={24} />;
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

  // Get gradient based on KPI type
  const getGradient = () => {
    if (kpi.id.includes("progress")) return "from-sky-500/10 to-indigo-500/10";
    if (kpi.id.includes("streak") || kpi.id.includes("completion")) return "from-emerald-500/10 to-teal-500/10";
    if (kpi.id.includes("score") || kpi.id.includes("performance")) return "from-violet-500/10 to-purple-500/10";
    if (kpi.id.includes("mood") || kpi.id.includes("wellness")) return "from-amber-500/10 to-orange-500/10";
    if (kpi.id.includes("time")) return "from-blue-500/10 to-sky-500/10";
    return "from-violet-500/5 to-sky-500/5";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card className={`overflow-hidden bg-gradient-to-br ${getGradient()} hover:shadow-lg transition-all`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {kpi.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <motion.span 
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay * 0.1 + 0.2 }}
            >
              {kpi.value}
              {kpi.unit && <span className="text-lg ml-1">{kpi.unit}</span>}
            </motion.span>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260,
                damping: 20, 
                delay: delay * 0.1 + 0.3 
              }}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm"
            >
              <IconComponent />
            </motion.div>
          </div>
          <motion.p 
            className={`text-xs mt-2 flex items-center ${getTrendColor()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: delay * 0.1 + 0.4 }}
          >
            {kpi.trend === "up" && <ArrowUpIcon className="h-3 w-3 mr-1" />}
            {kpi.trend === "down" && <ArrowDownIcon className="h-3 w-3 mr-1" />}
            {kpi.change !== 0 && (
              <>
                {kpi.change > 0 ? "+" : ""}
                {kpi.change}% from {kpi.id === "mood" ? "yesterday" : "last week"}
              </>
            )}
            {kpi.change === 0 && "No change"}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
