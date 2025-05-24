
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Settings, Calendar, Target } from 'lucide-react';

const BatchManagement = () => {
  const [showCreateBatch, setShowCreateBatch] = useState(false);

  const mockBatches = [
    {
      id: 'B001',
      name: 'JEE Advanced 2025',
      studyPlan: 'JEE Advanced Intensive',
      studentCount: 45,
      maxCapacity: 50,
      subscriptionTier: 'Pro',
      startDate: '2024-02-01',
      endDate: '2025-04-30',
      status: 'active',
      progress: 68
    },
    {
      id: 'B002',
      name: 'NEET Foundation',
      studyPlan: 'NEET Preparation',
      studentCount: 32,
      maxCapacity: 40,
      subscriptionTier: 'Basic',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      status: 'active',
      progress: 45
    }
  ];

  const subscriptionLimits = {
    free: { maxBatches: 0, maxStudentsPerBatch: 0 },
    basic: { maxBatches: 2, maxStudentsPerBatch: 20 },
    pro: { maxBatches: 5, maxStudentsPerBatch: 50 },
    enterprise: { maxBatches: 'unlimited', maxStudentsPerBatch: 'unlimited' }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Batch Management System</h2>
          <p className="text-muted-foreground">Create and manage student batches with subscription-based limits</p>
        </div>
        <Button onClick={() => setShowCreateBatch(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Batch
        </Button>
      </div>

      <Tabs defaultValue="batches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="batches">Active Batches</TabsTrigger>
          <TabsTrigger value="create">Create Batch</TabsTrigger>
          <TabsTrigger value="limits">Subscription Limits</TabsTrigger>
          <TabsTrigger value="analytics">Batch Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="batches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Active Batches Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Study Plan</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBatches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-medium">{batch.id}</TableCell>
                      <TableCell>{batch.name}</TableCell>
                      <TableCell>{batch.studyPlan}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{batch.studentCount}/{batch.maxCapacity}</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(batch.studentCount / batch.maxCapacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={batch.subscriptionTier === 'Pro' ? 'default' : 'secondary'}>
                          {batch.subscriptionTier}
                        </Badge>
                      </TableCell>
                      <TableCell>{batch.progress}%</TableCell>
                      <TableCell>
                        <Badge variant={batch.status === 'active' ? 'default' : 'secondary'}>
                          {batch.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Manage</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Batch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Batch Name</label>
                  <Input placeholder="Enter batch name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Study Plan</label>
                  <select className="w-full p-2 border rounded">
                    <option>Select study plan</option>
                    <option>JEE Advanced Intensive</option>
                    <option>NEET Preparation</option>
                    <option>Foundation Course</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Capacity</label>
                  <Input type="number" placeholder="50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subscription Tier</label>
                  <select className="w-full p-2 border rounded">
                    <option>Basic</option>
                    <option>Pro</option>
                    <option>Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button>Create Batch</Button>
                <Button variant="outline">Save as Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription-Based Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(subscriptionLimits).map(([tier, limits]) => (
                  <div key={tier} className="p-4 border rounded-lg">
                    <h3 className="font-medium capitalize mb-2">{tier}</h3>
                    <div className="space-y-2 text-sm">
                      <div>Max Batches: {limits.maxBatches}</div>
                      <div>Max Students/Batch: {limits.maxStudentsPerBatch}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline">Configure Limits</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Batch Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Average Completion</span>
                    <span className="font-bold">73%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Student Retention</span>
                    <span className="font-bold">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="font-bold">82%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Capacity Used</span>
                    <span className="font-bold">77/90</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Batches</span>
                    <span className="font-bold">2/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency</span>
                    <span className="font-bold">86%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Daily Active</span>
                    <span className="font-bold">68/77</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Study Time/Day</span>
                    <span className="font-bold">4.2hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collaboration</span>
                    <span className="font-bold">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BatchManagement;
