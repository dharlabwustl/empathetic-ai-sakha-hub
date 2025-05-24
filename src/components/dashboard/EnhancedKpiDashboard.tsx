
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  TrendingUp, 
  Users, 
  Brain, 
  BookOpen,
  Clock,
  DollarSign,
  Heart,
  Target,
  ExternalLink
} from 'lucide-react';
import { enhancedKpiService, EnhancedKpiData } from '@/services/enhancedKpiService';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  kpi: EnhancedKpiData;
  onClick?: () => void;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi, onClick }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    if (kpi.pageLink) {
      navigate(kpi.pageLink);
    } else if (onClick) {
      onClick();
    }
  };

  const progressValue = kpi.target ? Math.min(100, (Number(kpi.value.toString().replace(/[^0-9.]/g, '')) / kpi.target) * 100) : 0;

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105",
        kpi.isConnected ? "border-green-200 dark:border-green-800" : "border-gray-200"
      )}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {kpi.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {kpi.isConnected && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                Live
              </Badge>
            )}
            {kpi.pageLink && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">{kpi.value}</span>
            {kpi.unit && <span className="ml-1 text-sm text-muted-foreground">{kpi.unit}</span>}
          </div>
          <div className="text-2xl">{kpi.icon}</div>
        </div>
        
        <div className={cn(
          "flex items-center text-xs font-medium mb-2",
          kpi.changeType === 'increase' ? "text-green-600" : 
          kpi.changeType === 'decrease' ? "text-red-600" : 
          "text-gray-600"
        )}>
          {kpi.changeType === 'increase' ? (
            <ArrowUp className="h-3 w-3 mr-1" />
          ) : kpi.changeType === 'decrease' ? (
            <ArrowDown className="h-3 w-3 mr-1" />
          ) : (
            <Minus className="h-3 w-3 mr-1" />
          )}
          <span>{kpi.change}%</span>
          <span className="ml-1 text-muted-foreground">vs last period</span>
        </div>

        {kpi.target && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress to target</span>
              <span>{Math.round(progressValue)}%</span>
            </div>
            <Progress value={progressValue} className="h-1.5" />
          </div>
        )}
        
        <p className="text-xs text-muted-foreground mt-2">{kpi.description}</p>
      </CardContent>
    </Card>
  );
};

const EnhancedKpiDashboard: React.FC = () => {
  const [kpis, setKpis] = useState<EnhancedKpiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const data = await enhancedKpiService.getEnhancedKpis();
        setKpis(data);
      } catch (error) {
        console.error('Error fetching KPIs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKpis();
  }, []);

  const categories = [
    { id: 'all', label: 'All Metrics', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
    { id: 'engagement', label: 'Engagement', icon: <Brain className="h-4 w-4" /> },
    { id: 'performance', label: 'Performance', icon: <Target className="h-4 w-4" /> },
    { id: 'satisfaction', label: 'Well-being', icon: <Heart className="h-4 w-4" /> },
    { id: 'revenue', label: 'Revenue', icon: <DollarSign className="h-4 w-4" /> }
  ];

  const filteredKpis = activeCategory === 'all' 
    ? kpis 
    : kpis.filter(kpi => kpi.category === activeCategory);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced KPI Dashboard</h2>
          <p className="text-muted-foreground">Real-time insights into platform performance</p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-6">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {category.icon}
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredKpis.map(kpi => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Platform Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {kpis.filter(kpi => kpi.changeType === 'increase').length}
              </div>
              <div className="text-sm text-muted-foreground">Improving Metrics</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {kpis.filter(kpi => kpi.isConnected).length}
              </div>
              <div className="text-sm text-muted-foreground">Live Connected</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {kpis.filter(kpi => kpi.target).length}
              </div>
              <div className="text-sm text-muted-foreground">Target-Based</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(kpis.reduce((sum, kpi) => sum + kpi.change, 0) / kpis.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Growth</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedKpiDashboard;
