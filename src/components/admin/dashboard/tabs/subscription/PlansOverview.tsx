
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';

const PlansOverview: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for subscription plan distribution
  const planDistributionData = [
    { name: 'Free', value: 120, color: '#94a3b8' },
    { name: 'Basic', value: 78, color: '#60a5fa' },
    { name: 'Premium', value: 45, color: '#8b5cf6' },
    { name: 'Ultimate', value: 23, color: '#f97316' },
    { name: 'Enterprise', value: 2, color: '#f43f5e' }
  ];
  
  const handleManagePlans = () => {
    // Navigate to the plans management tab
    navigate('/dashboard/admin/subscriptions');
  };
  
  const totalSubscribers = planDistributionData.reduce((sum, plan) => sum + plan.value, 0);
  const paidSubscribers = planDistributionData
    .filter(plan => plan.name !== 'Free')
    .reduce((sum, plan) => sum + plan.value, 0);
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return percent * 100 > 5 ? (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {name}
      </text>
    ) : null;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Subscription Plans Overview</CardTitle>
          <Button variant="outline" onClick={handleManagePlans}>Manage Plans</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-xl font-medium mb-1">Plan Distribution</div>
                <div className="text-sm text-muted-foreground mb-2">
                  {paidSubscribers} paid out of {totalSubscribers} total users
                </div>
              </div>
              
              <div className="aspect-square w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius="80%"
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {planDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} subscribers`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="text-xl font-medium">Plan Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {planDistributionData.map((plan) => (
                  <Card key={plan.name} className="overflow-hidden border border-gray-200 dark:border-gray-800">
                    <div className="h-2" style={{ backgroundColor: plan.color }}></div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-2xl font-bold">{plan.value}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {((plan.value / totalSubscribers) * 100).toFixed(1)}% of total
                      </div>
                      {plan.name === 'Free' ? (
                        <div className="text-xs text-muted-foreground mt-1">
                          Conversion opportunity: {plan.value} users
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground mt-1">
                          {plan.name === 'Enterprise' ? 'Custom pricing' : 'Standard pricing'}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlansOverview;
