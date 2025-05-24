
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { UserProfileBase, SubscriptionTypeValue } from '@/types/user/base';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface UsersTabProps {
  users: UserProfileBase[];
}

const UsersTab: React.FC<UsersTabProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSubscriptionDisplay = (subscription: any): string => {
    if (typeof subscription === 'string') {
      return subscription;
    }
    if (subscription && typeof subscription === 'object' && subscription.planType) {
      return subscription.planType;
    }
    return 'Free';
  };

  const getRoleDisplay = (role: string | undefined): string => {
    return role || 'Student';
  };

  const getSubscriptionBadgeColor = (subscription: any): string => {
    const plan = getSubscriptionDisplay(subscription);
    switch (plan.toLowerCase()) {
      case 'premium':
      case 'pro':
        return 'bg-purple-100 text-purple-800';
      case 'basic':
        return 'bg-blue-100 text-blue-800';
      case 'enterprise':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search users..."
            className="px-4 py-2 border rounded-md w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getRoleDisplay(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getSubscriptionBadgeColor(user.subscription)}>
                    {getSubscriptionDisplay(user.subscription)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersTab;
