
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart2,
  Calendar,
  Clock,
  Download,
  Activity,
  Target,
  Users,
  MessageSquare,
} from "lucide-react";

const EngagementTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Lifecycle & Engagement Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar size={16} />
            <span>This Month</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export Data</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Sign-ups Today</h3>
              <Badge className="bg-blue-100 text-blue-800">+8%</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">24</span>
              <span className="text-sm text-gray-500">users</span>
            </div>
            <div className="h-10 bg-blue-50 dark:bg-blue-900/20 rounded-md mt-3 flex items-end">
              <div className="bg-blue-500 h-6 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-4 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-8 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-5 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-7 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-10 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-3 w-8 rounded-sm"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Active Sessions</h3>
              <Badge className="bg-green-100 text-green-800">Live</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">186</span>
              <span className="text-sm text-gray-500">users online</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Peak today: 214 users</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Activity size={12} />
                <span>View Live</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Avg. Time on Platform</h3>
              <Badge className="bg-purple-100 text-purple-800">+12%</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">43</span>
              <span className="text-sm text-gray-500">minutes/day</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Last week: 38 min</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Clock size={12} />
                <span>Time Breakdown</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Goal Achievement</h3>
              <Badge className="bg-amber-100 text-amber-800">72%</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">1,248</span>
              <span className="text-sm text-gray-500">goals completed</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Total goals: 1,738</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Target size={12} />
                <span>View Goals</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Lifecycle Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-full bg-blue-100 dark:bg-blue-900/20 rounded-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[92%] bg-blue-500 rounded-md"></div>
                  <div className="absolute inset-0 flex items-center px-3 text-xs font-medium">
                    <span className="text-white">Sign-ups: 2,350 users (100%)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-full bg-blue-100 dark:bg-blue-900/20 rounded-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[74%] bg-green-500 rounded-md"></div>
                  <div className="absolute inset-0 flex items-center px-3 text-xs font-medium">
                    <span className="text-white">Onboarded: 1,740 users (74%)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-full bg-blue-100 dark:bg-blue-900/20 rounded-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[52%] bg-amber-500 rounded-md"></div>
                  <div className="absolute inset-0 flex items-center px-3 text-xs font-medium">
                    <span className="text-white">Active: 1,222 users (52%)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-full bg-blue-100 dark:bg-blue-900/20 rounded-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-[34%] bg-purple-500 rounded-md"></div>
                  <div className="absolute inset-0 flex items-center px-3 text-xs font-medium">
                    <span className="text-white">Power Users: 799 users (34%)</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <BarChart2 size={14} />
                  <span>View Details</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Users size={14} />
                  <span>Segment Users</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Feedback & Emotional Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Mood Distribution</h3>
                <div className="grid grid-cols-5 gap-2">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md text-center">
                    <div className="text-lg font-bold text-green-800 dark:text-green-400">42%</div>
                    <div className="text-xs text-green-800 dark:text-green-400">Excellent</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md text-center">
                    <div className="text-lg font-bold text-blue-800 dark:text-blue-400">27%</div>
                    <div className="text-xs text-blue-800 dark:text-blue-400">Good</div>
                  </div>
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-md text-center">
                    <div className="text-lg font-bold text-amber-800 dark:text-amber-400">18%</div>
                    <div className="text-xs text-amber-800 dark:text-amber-400">Neutral</div>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-md text-center">
                    <div className="text-lg font-bold text-orange-800 dark:text-orange-400">9%</div>
                    <div className="text-xs text-orange-800 dark:text-orange-400">Anxious</div>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md text-center">
                    <div className="text-lg font-bold text-red-800 dark:text-red-400">4%</div>
                    <div className="text-xs text-red-800 dark:text-red-400">Stressed</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Support Tickets</h3>
                  <Badge className="bg-purple-100 text-purple-800">12 Open</Badge>
                </div>
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-md border flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Quiz submission error</p>
                      <p className="text-xs text-gray-500">Reported by 8 students</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-md border flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Concept card not loading</p>
                      <p className="text-xs text-gray-500">Reported by 3 students</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-md border flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">PDF download issue</p>
                      <p className="text-xs text-gray-500">Reported by 2 students</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Low</Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="flex items-center gap-1">
                  <MessageSquare size={14} />
                  <span>Review Feedback</span>
                </Button>
                <Button className="flex items-center gap-1">
                  <Activity size={14} />
                  <span>Support Dashboard</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementTab;
