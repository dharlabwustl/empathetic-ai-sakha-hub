
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, RefreshCw, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react';
import { DailyPlanItem } from '@/types/user/studyPlan';

export const AdaptivePlanTable = () => {
  const [filterWeek, setFilterWeek] = useState('current');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data for the next 14 days
  const [planItems, setPlanItems] = useState<DailyPlanItem[]>([
    {
      id: '1',
      date: '2024-01-15',
      subject: 'Physics',
      topics: ['Mechanics - Newton\'s Laws', 'Kinematics'],
      studyHours: 3,
      timeOfStudy: '6:00 PM - 9:00 PM',
      focusLevel: 'high',
      status: 'done',
      actualTimeSpent: 2.5
    },
    {
      id: '2',
      date: '2024-01-16',
      subject: 'Chemistry',
      topics: ['Organic Chemistry - Alcohols', 'Aldehydes'],
      studyHours: 2.5,
      timeOfStudy: '6:30 PM - 9:00 PM',
      focusLevel: 'high',
      status: 'done',
      actualTimeSpent: 3
    },
    {
      id: '3',
      date: '2024-01-17',
      subject: 'Biology',
      topics: ['Human Physiology - Circulatory System'],
      studyHours: 2,
      timeOfStudy: '7:00 PM - 9:00 PM',
      focusLevel: 'medium',
      status: 'done',
      actualTimeSpent: 2
    },
    {
      id: '4',
      date: '2024-01-18',
      subject: 'Physics',
      topics: ['Thermodynamics - Laws', 'Heat Transfer'],
      studyHours: 3,
      timeOfStudy: '6:00 PM - 9:00 PM',
      focusLevel: 'high',
      status: 'skipped'
    },
    {
      id: '5',
      date: '2024-01-19',
      subject: 'Chemistry',
      topics: ['Physical Chemistry - Equilibrium'],
      studyHours: 2.5,
      timeOfStudy: '6:30 PM - 9:00 PM',
      focusLevel: 'medium',
      status: 'pending'
    },
    {
      id: '6',
      date: '2024-01-20',
      subject: 'Biology',
      topics: ['Botany - Plant Physiology'],
      studyHours: 2,
      timeOfStudy: '7:00 PM - 9:00 PM',
      focusLevel: 'medium',
      status: 'pending'
    },
    {
      id: '7',
      date: '2024-01-21',
      subject: 'Physics',
      topics: ['Electromagnetism - Electric Field'],
      studyHours: 3,
      timeOfStudy: '6:00 PM - 9:00 PM',
      focusLevel: 'high',
      status: 'pending'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'skipped':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done':
        return <Badge variant="default" className="bg-green-100 text-green-700">Completed</Badge>;
      case 'skipped':
        return <Badge variant="destructive">Skipped</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return null;
    }
  };

  const getFocusLevelBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge variant="destructive">High Focus</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium Focus</Badge>;
      case 'low':
        return <Badge variant="outline">Low Focus</Badge>;
      default:
        return null;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'physics':
        return '#8B5CF6';
      case 'chemistry':
        return '#10B981';
      case 'biology':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const updateStatus = (id: string, newStatus: 'done' | 'skipped' | 'pending') => {
    setPlanItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const regeneratePlan = () => {
    // AI logic would go here
    console.log("Regenerating adaptive plan based on performance...");
  };

  const filteredItems = planItems.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    // Add week filtering logic here if needed
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Adaptive Study Plan
            </CardTitle>
            <Button onClick={regeneratePlan} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Auto-Adjust Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <Select value={filterWeek} onValueChange={setFilterWeek}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Week</SelectItem>
                <SelectItem value="next">Next Week</SelectItem>
                <SelectItem value="all">All Weeks</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="done">Completed</SelectItem>
                <SelectItem value="skipped">Skipped</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Plan Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Topics Planned</TableHead>
                  <TableHead>Study Hours</TableHead>
                  <TableHead>Time of Study</TableHead>
                  <TableHead>Focus Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className="font-medium">
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            weekday: 'short'
                          })}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getSubjectColor(item.subject) }}
                        />
                        <span className="font-medium">{item.subject}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="space-y-1">
                        {item.topics.map((topic, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            {topic}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{item.studyHours}h</span>
                        {item.actualTimeSpent && (
                          <span className="text-xs text-gray-500">
                            (actual: {item.actualTimeSpent}h)
                          </span>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <span className="text-sm">{item.timeOfStudy}</span>
                    </TableCell>
                    
                    <TableCell>
                      {getFocusLevelBadge(item.focusLevel)}
                    </TableCell>
                    
                    <TableCell>
                      {getStatusBadge(item.status)}
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex gap-1">
                        {item.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateStatus(item.id, 'done')}
                              className="h-7 px-2 text-xs"
                            >
                              Done
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateStatus(item.id, 'skipped')}
                              className="h-7 px-2 text-xs"
                            >
                              Skip
                            </Button>
                          </>
                        )}
                        {item.status === 'skipped' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStatus(item.id, 'pending')}
                            className="h-7 px-2 text-xs"
                          >
                            Reschedule
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {planItems.filter(i => i.status === 'done').length}
              </div>
              <div className="text-sm text-green-600">Completed</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {planItems.filter(i => i.status === 'pending').length}
              </div>
              <div className="text-sm text-orange-600">Pending</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {planItems.filter(i => i.status === 'skipped').length}
              </div>
              <div className="text-sm text-red-600">Skipped</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((planItems.filter(i => i.status === 'done').length / planItems.length) * 100)}%
              </div>
              <div className="text-sm text-blue-600">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
