
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  RefreshCw, 
  Target,
  ExternalLink,
  Filter,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { kpiService, KpiMetric, KpiData } from '@/services/kpiService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedKpiDashboardProps {
  isAdmin?: boolean;
  userId?: string;
}

const EnhancedKpiDashboard: React.FC<EnhancedKpiDashboardProps> = ({ 
  isAdmin = false, 
  userId 
}) => {
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [studentKpis, setStudentKpis] = useState<KpiMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { id: 'all', label: 'All Metrics', icon: '📊' },
    { id: 'user', label: 'Users', icon: '👥' },
    { id: 'engagement', label: 'Engagement', icon: '📈' },
    { id: 'performance', label: 'Performance', icon: '🎯' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'system', label: 'System', icon: '⚙️' }
  ];

  useEffect(() => {
    loadKpiData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(loadKpiData, 30000); // Refresh every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const loadKpiData = async () => {
    setLoading(true);
    try {
      if (isAdmin) {
        const data = await kpiService.getKpiData();
        setKpiData(data);
      } else if (userId) {
        const studentData = await kpiService.getStudentKpis(userId);
        setStudentKpis(studentData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load KPI data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getFilteredMetrics = (): KpiMetric[] => {
    if (!kpiData) return [];
    if (selectedCategory === 'all') return kpiData.metrics;
    return kpiData.metrics.filter(metric => metric.category === selectedCategory);
  };

  const handleMetricClick = (metric: KpiMetric) => {
    if (metric.navigateTo) {
      navigate(metric.navigateTo);
    }
  };

  const handleExportData = () => {
    const data = isAdmin ? kpiData?.metrics : studentKpis;
    if (data) {
      const csvContent = [
        ['Metric', 'Value', 'Unit', 'Change', 'Target', 'Last Updated'].join(','),
        ...data.map(metric => [
          metric.title,
          metric.value,
          metric.unit || '',
          `${metric.change}%`,
          metric.target || '',
          new Date(metric.lastUpdated).toLocaleDateString()
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kpi-data-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      
      toast({
        title: "Export Complete",
        description: "KPI data has been exported to CSV"
      });
    }
  };

  const renderChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'decrease':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  const renderKpiCard = (metric: KpiMetric) => (
    <Card 
      key={metric.id} 
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:scale-105",
        metric.navigateTo && "hover:bg-accent/50"
      )}
      onClick={() => handleMetricClick(metric)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        <div className="flex items-center gap-2">
          {metric.navigateTo && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
          <span className="text-2xl">{metric.icon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {metric.value.toLocaleString()}
          {metric.unit && <span className="text-sm font-normal ml-1">{metric.unit}</span>}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className={cn(
            "flex items-center text-xs font-medium",
            metric.changeType === 'increase' ? "text-green-500" : 
            metric.changeType === 'decrease' ? "text-red-500" : 
            "text-gray-500"
          )}>
            {renderChangeIcon(metric.changeType)}
            <span className="ml-1">{metric.change}%</span>
            <span className="ml-1 text-muted-foreground">vs last period</span>
          </div>
        </div>

        {metric.target && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress to target</span>
              <span>{Math.round((metric.value / metric.target) * 100)}%</span>
            </div>
            <Progress value={(metric.value / metric.target) * 100} className="h-1" />
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
        
        <div className="flex justify-between items-center mt-2">
          <Badge variant="outline" className="text-xs">
            {metric.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(metric.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const metricsToDisplay = isAdmin ? getFilteredMetrics() : studentKpis;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {isAdmin ? 'Admin KPI Dashboard' : 'Your Progress Dashboard'}
          </h2>
          <p className="text-muted-foreground">
            {isAdmin ? 'Monitor platform performance and user metrics' : 'Track your learning progress and achievements'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={cn(autoRefresh && "bg-green-50 border-green-200")}
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", autoRefresh && "animate-spin")} />
            Auto Refresh
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button variant="outline" size="sm" onClick={loadKpiData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Category Filters (Admin only) */}
      {isAdmin && (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-6">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      {/* Summary Cards (Admin only) */}
      {isAdmin && kpiData && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{kpiData.summary.totalUsers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{kpiData.summary.activeUsers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">${kpiData.summary.revenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{kpiData.summary.avgStudyTime}h</div>
            <div className="text-xs text-muted-foreground">Avg Study Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{kpiData.summary.examReadiness}%</div>
            <div className="text-xs text-muted-foreground">Exam Readiness</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">{kpiData.summary.stressReduction}%</div>
            <div className="text-xs text-muted-foreground">Stress Reduction</div>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {metricsToDisplay.map(renderKpiCard)}
      </div>

      {metricsToDisplay.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              No metrics available for the selected category.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedKpiDashboard;
