
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCheck, UserX, Search, Filter, Download } from 'lucide-react';

const UserProfileManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockUsers = [
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      signupDate: '2024-01-15', 
      lastActive: '2024-01-20',
      subscription: 'Pro',
      status: 'active',
      studyPlan: 'JEE Advanced',
      progress: 68
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      signupDate: '2024-01-10',
      lastActive: '2024-01-19',
      subscription: 'Free',
      status: 'active',
      studyPlan: 'NEET',
      progress: 45
    }
  ];

  const syncStatus = {
    lastSync: '2024-01-20 14:30:00',
    totalUsers: 1247,
    newSignups: 23,
    activeUsers: 892,
    syncErrors: 0
  };

  return (
    <div className="space-y-6">
      {/* Sync Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Student-Admin Synchronization Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{syncStatus.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{syncStatus.newSignups}</div>
              <div className="text-sm text-muted-foreground">New Signups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{syncStatus.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{syncStatus.syncErrors}</div>
              <div className="text-sm text-muted-foreground">Sync Errors</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">Last Sync</div>
              <div className="text-xs text-muted-foreground">{syncStatus.lastSync}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm">Force Sync Now</Button>
            <Button size="sm" variant="outline">View Sync Logs</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profiles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profiles">User Profiles</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding Data</TabsTrigger>
          <TabsTrigger value="academic">Academic Background</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Profile Management</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button size="sm">Add User</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Study Plan</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.subscription === 'Pro' ? 'default' : 'secondary'}>
                          {user.subscription}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.studyPlan}</TableCell>
                      <TableCell>{user.progress}%</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold">89%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold">4.2min</div>
                    <div className="text-sm text-muted-foreground">Avg Time</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-sm text-muted-foreground">Drop-offs</div>
                  </div>
                </div>
                <Button>View Detailed Onboarding Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Academic Background Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded">
                    <div className="text-xl font-bold">456</div>
                    <div className="text-sm text-muted-foreground">JEE Students</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-xl font-bold">324</div>
                    <div className="text-sm text-muted-foreground">NEET Students</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-xl font-bold">298</div>
                    <div className="text-sm text-muted-foreground">Foundation</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-xl font-bold">169</div>
                    <div className="text-sm text-muted-foreground">Other Exams</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Updates Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded bg-green-50">
                  <div className="font-medium">Sync Status: Active</div>
                  <div className="text-sm text-muted-foreground">All student inputs syncing to admin panel in real-time</div>
                </div>
                <Button>Configure Update Frequency</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileManagement;
