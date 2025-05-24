
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { kpiService, KPIMetric } from '@/services/kpiService';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Download,
  ExternalLink,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EnhancedKPIDashboard: React.FC = () => {
  const [kpis, setKpis] = useState({
    overview: [] as KPIMetric[],
    academic: [] as KPIMetric[],
    engagement: [] as KPIMetric[],
    revenue: [] as KPIMetric[],
    wellness: [] as KPIMetric[]
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('overview');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadKPIs();
  }, []);

  const loadKPIs = async () => {
    try {
      const data = await kpiService.getAllKPIs();
      setKpis(data);
    } catch (error) {
      console.error('Error loading KPIs:', error);
    }
  };

  const refreshKPIs = async () => {
    setIsRefreshing(true);
    try {
      await kpiService.refreshKPIs();
      const data = await kpiService.getAllKPIs();
      setKpis(data);
      
      toast({
        title: "KPIs Updated",
        description: "Dashboard metrics have been refreshed with latest data.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh KPI data.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const exportKPIs = () => {
    const data = JSON.stringify(kpis, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kpi-data.json';
    a.click();
    
    toast({
      title: "Export Complete",
      description: "KPI data has been exported successfully.",
    });
  };

  const handleKPIClick = (kpi: KPIMetric) => {
    if (kpi.targetPage) {
      navigate(kpi.targetPage);
    }
  };

  const renderKPICard = (kpi: KPIMetric) => (
    <Card 
      key={kpi.id} 
      className={`hover:shadow-lg transition-all cursor-pointer ${kpi.targetPage ? 'hover:bg-gray-50' : ''}`}
      onClick={() => handleKPIClick(kpi)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{kpi.icon}</span>
          {kpi.targetPage && <ExternalLink className="h-3 w-3 text-gray-400" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {kpi.unit && kpi.unit === '₹' ? `₹${Number(kpi.value).toLocaleString()}` : kpi.value}
          {kpi.unit && kpi.unit !== '₹' && <span className="text-sm ml-1">{kpi.unit}</span>}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge 
            variant={kpi.changeType === 'positive' ? 'default' : kpi.changeType === 'negative' ? 'destructive' : 'secondary'}
            className="flex items-center gap-1"
          >
            {kpi.changeType === 'positive' ? (
              <TrendingUp className="h-3 w-3" />
            ) : kpi.changeType === 'negative' ? (
              <TrendingDown className="h-3 w-3" />
            ) : null}
            {kpi.change > 0 ? '+' : ''}{kpi.change}%
          </Badge>
          <p className="text-xs text-muted-foreground">{kpi.description}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Enhanced KPI Dashboard</h2>
          <p className="text-muted-foreground">Real-time metrics and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportKPIs}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={refreshKPIs} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.overview.map(renderKPICard)}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.academic.map(renderKPICard)}
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.engagement.map(renderKPICard)}
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.revenue.map(renderKPICard)}
          </div>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.wellness.map(renderKPICard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedKPIDashboard;
