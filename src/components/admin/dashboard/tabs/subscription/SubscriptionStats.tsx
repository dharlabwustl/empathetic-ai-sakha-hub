
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, PieChart, ChartBar, Percent } from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart as ReChartPieChart, Pie, Cell } from "recharts";

const SubscriptionStats = () => {
  // Sample data
  const planDistributionData = [
    { name: "Free", value: 70, color: "#E5E7EB" },
    { name: "Basic", value: 15, color: "#93C5FD" },
    { name: "Pro", value: 10, color: "#4F46E5" },
    { name: "Group", value: 5, color: "#10B981" },
  ];

  const config = {
    free: { label: "Free", color: "#E5E7EB" },
    basic: { label: "Basic", color: "#93C5FD" },
    pro: { label: "Pro", color: "#4F46E5" },
    group: { label: "Group", color: "#10B981" },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Monthly Revenue</h3>
            <Badge className="bg-green-100 text-green-800">+15%</Badge>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">₹127,840</span>
          </div>
          <div className="h-10 bg-green-50 dark:bg-green-900/20 rounded-md mt-3 flex items-end">
            <div className="bg-green-500 h-6 w-8 rounded-sm"></div>
            <div className="bg-green-500 h-4 w-8 rounded-sm"></div>
            <div className="bg-green-500 h-8 w-8 rounded-sm"></div>
            <div className="bg-green-500 h-5 w-8 rounded-sm"></div>
            <div className="bg-green-500 h-7 w-8 rounded-sm"></div>
            <div className="bg-green-500 h-10 w-8 rounded-sm"></div>
            <div className="bg-green-500 h-3 w-8 rounded-sm"></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Active Plans</h3>
            <Badge className="bg-blue-100 text-blue-800">6 Plans</Badge>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">418</span>
            <span className="text-sm text-gray-500">subscribers</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">Free users: 1,932</span>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
              <Users size={12} />
              <span>View All</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Premium Plan Share</h3>
            <Badge className="bg-purple-100 text-purple-800">+5%</Badge>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">42%</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">Of total active plans</span>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
              <PieChart size={12} />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Subscription Types</h3>
          </div>
          <div className="h-40">
            <ChartContainer config={config}>
              <ReChartPieChart>
                <Pie
                  data={planDistributionData}
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {planDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(label) => `${label} Plan`}
                    />
                  }
                />
              </ReChartPieChart>
            </ChartContainer>
          </div>
          <ChartLegend className="mt-2">
            <ChartLegendContent payload={planDistributionData.map(item => ({ 
              value: item.name, 
              color: item.color,
              dataKey: item.name.toLowerCase()
            }))} />
          </ChartLegend>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionStats;
