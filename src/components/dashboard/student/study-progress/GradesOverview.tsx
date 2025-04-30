
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GradesOverviewProps {
  studentId?: string;
}

const GradesOverview: React.FC<GradesOverviewProps> = ({ studentId }) => {
  // Mock grade data
  const gradeData = [
    { date: 'Jan', physics: 78, chemistry: 82, mathematics: 75 },
    { date: 'Feb', physics: 76, chemistry: 83, mathematics: 78 },
    { date: 'Mar', physics: 80, chemistry: 85, mathematics: 79 },
    { date: 'Apr', physics: 82, chemistry: 87, mathematics: 82 },
    { date: 'May', physics: 84, chemistry: 85, mathematics: 84 },
    { date: 'Jun', physics: 87, chemistry: 88, mathematics: 86 },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Performance Growth</CardTitle>
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={gradeData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis 
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                domain={[50, 100]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`]}
                contentStyle={{
                  borderRadius: "4px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
                }}
              />
              <Line 
                type="monotone"
                dataKey="physics"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone"
                dataKey="chemistry"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone"
                dataKey="mathematics"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center mt-4 space-x-6">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
            <span className="text-sm">Physics</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-amber-500 mr-2" />
            <span className="text-sm">Chemistry</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-green-500 mr-2" />
            <span className="text-sm">Mathematics</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradesOverview;
