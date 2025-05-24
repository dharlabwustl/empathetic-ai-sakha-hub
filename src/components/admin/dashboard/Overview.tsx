
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, BookOpen, TrendingUp, Activity, DollarSign, UserCheck, Clock } from 'lucide-react';
import EnhancedKPIDashboard from './EnhancedKPIDashboard';

const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced KPI Dashboard */}
      <EnhancedKPIDashboard />

      {/* Recent Activity & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Student Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Aryan Sharma", action: "Completed Physics Chapter 5", time: "2 minutes ago" },
                { name: "Priya Patel", action: "Started NEET Mock Test", time: "5 minutes ago" },
                { name: "Rahul Kumar", action: "Joined Chemistry Study Group", time: "10 minutes ago" },
                { name: "Ananya Desai", action: "Completed Math Assignment", time: "15 minutes ago" },
                { name: "Vikram Singh", action: "Updated Study Plan", time: "20 minutes ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Study Time</span>
                <span className="text-sm font-bold">4.2 hrs/day</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Exam Success Rate</span>
                <span className="text-sm font-bold">89%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Content Engagement</span>
                <span className="text-sm font-bold">76%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '76%' }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Retention Rate</span>
                <span className="text-sm font-bold">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <span className="text-sm font-medium">Add Student</span>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <span className="text-sm font-medium">Create Content</span>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <span className="text-sm font-medium">View Reports</span>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <span className="text-sm font-medium">Analytics</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
