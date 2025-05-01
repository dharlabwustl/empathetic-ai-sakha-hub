
import React, { useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ProfilePage = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const [activeTab, setActiveTab] = useState("profile");

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <SharedPageLayout
      title="Profile & Settings"
      subtitle="Manage your account and preferences"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar - Profile Card */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white pb-8">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24 border-4 border-white">
                    <AvatarImage src={userProfile?.avatar || ''} />
                    <AvatarFallback className="text-xl bg-primary/10">
                      {getInitials(userProfile?.name || 'User')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <div className="flex flex-col items-center -mt-12 px-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full">
                  <h2 className="text-xl font-bold text-center">{userProfile?.name}</h2>
                  <p className="text-sm text-muted-foreground text-center">{userProfile?.email}</p>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Exam Goal</span>
                      <Badge variant="outline">{userProfile?.examPreparation || 'Not set'}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Personality</span>
                      <Badge>{userProfile?.personalityType || 'Not set'}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="text-sm">{userProfile?.demographics?.location || 'Not set'}</span>
                    </div>
                    
                    <div className="border-t pt-3 mt-3">
                      <h3 className="font-medium text-sm mb-2">Subscription</h3>
                      <div className="bg-primary/5 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Plan Type</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            Individual
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">Status</span>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">Validity</span>
                          <span className="text-xs">May 1, 2025 - May 1, 2026</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-3">Upgrade Plan</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Right content - Tabs */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="batch">Batch Management</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p>{userProfile?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{userProfile?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>{userProfile?.mobile || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p>{userProfile?.demographics?.gender || 'Not provided'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">No billing history available</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button>Add Payment Method</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="batch" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Create a Batch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Upgrade to a Group Plan or Leader Plan to create and manage batches.
                    </p>
                    <Button>Upgrade to Group Plan</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Change Password</h3>
                        <Button variant="outline">Update Password</Button>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">Privacy Settings</h3>
                        <Button variant="outline">Manage Privacy</Button>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">Notification Preferences</h3>
                        <Button variant="outline">Manage Notifications</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </SharedPageLayout>
  );
};

export default ProfilePage;
