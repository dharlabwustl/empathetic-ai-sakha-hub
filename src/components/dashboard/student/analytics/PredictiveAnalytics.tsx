
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowUpRight, TrendingUp, Download, AlertCircle } from 'lucide-react';

// Sample predictive data
const predictiveData = [
  { month: 'Jan', actual: 65, predicted: null },
  { month: 'Feb', actual: 70, predicted: null },
  { month: 'Mar', actual: 75, predicted: null },
  { month: 'Apr', actual: 72, predicted: 72 },
  { month: 'May', actual: null, predicted: 78 },
  { month: 'Jun', actual: null, predicted: 82 },
  { month: 'Jul', actual: null, predicted: 85 },
];

const PredictiveAnalytics = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance Prediction</CardTitle>
            <CardDescription>AI-powered prediction of your future performance</CardDescription>
          </div>
          <div className="flex items-center bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs font-medium">
            <TrendingUp className="h-3 w-3 mr-1" />
            13% Growth
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={predictiveData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#82ca9d"
              strokeDasharray="5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card>
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Current Score</p>
                <p className="text-xl font-bold">72%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Predicted (Jul)</p>
                <p className="text-xl font-bold text-green-600">85%</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 space-y-2">
            <div className="flex">
              <AlertCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">AI Analysis</h4>
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                  Based on your study patterns and progress, we predict a 13% improvement in your performance over the next 3 months. Keep up with your current study schedule to achieve this!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download Full Prediction Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PredictiveAnalytics;
