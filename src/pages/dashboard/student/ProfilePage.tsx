
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CreditCard, User, Calendar, CheckCircle, PenSquare, Shield, ArrowLeft, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';

// Simulated user profile data
const mockUserProfile = {
  name: "Aryan Sharma",
  email: "aryan@example.com",
  phoneNumber: "+91 98765 43210",
  profileImage: "",
  type: "Individual",
  personalityType: "Analytical Learner",
  location: "Mumbai, Maharashtra",
  gender: "Male",
  examGoal: "IIT-JEE 2025",
  subscriptionPlan: {
    type: "Pro Plan (Monthly)",
    id: "pro_monthly",
    startDate: "2024-01-15",
    endDate: "2024-06-15", 
    status: "Active", // Active, Expired, Pending
  },
  billingInfo: {
    name: "Aryan Sharma",
    address: "123 Main Street, Mumbai",
    paymentMethods: [
      { 
        type: "Credit Card",
        last4: "4242",
        expiryDate: "06/25",
        isPrimary: true
      },
      {
        type: "UPI",
        id: "aryan@upi",
        isPrimary: false
      }
    ],
    transactions: [
      {
        id: "tr_123456",
        amount: 999,
        date: "2024-04-01",
        description: "Monthly Subscription - Pro Plan",
        status: "Completed"
      },
      {
        id: "tr_123455",
        amount: 179,
        date: "2024-03-20",
        description: "100 Card Credits",
        status: "Completed"
      },
      {
        id: "tr_123454",
        amount: 999,
        date: "2024-03-01",
        description: "Monthly Subscription - Pro Plan",
        status: "Completed"
      }
    ]
  },
  batch: {
    isBatchLeader: false,
    batchName: "",
    members: []
  }
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState(mockUserProfile);
  
  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
  };
  
  const handleUpgradePlan = () => {
    toast({
      title: "Subscription",
      description: "Redirecting to subscription checkout..."
    });
  };
  
  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => navigate('/dashboard/student')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Profile & Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Information Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Profile</CardTitle>
              <Badge variant={profileData.subscriptionPlan.status === "Active" ? "default" : "destructive"}>
                {profileData.subscriptionPlan.status}
              </Badge>
            </div>
            <CardDescription>Your personal information & plan details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Photo & Name */}
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileData.profileImage} />
                <AvatarFallback className="text-xl bg-purple-200 text-purple-800">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-medium">{profileData.name}</h3>
                <p className="text-sm text-muted-foreground">{profileData.email}</p>
              </div>
            </div>
            
            {/* Quick Info List */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Account Type</p>
                  <p className="text-sm text-muted-foreground">{profileData.type}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Exam Goal</p>
                  <p className="text-sm text-muted-foreground">{profileData.examGoal}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Subscription</p>
                  <p className="text-sm text-muted-foreground">
                    {profileData.subscriptionPlan.type}
                    <br />
                    <span className="text-xs">
                      Valid until: {new Date(profileData.subscriptionPlan.endDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button size="sm" className="w-full" onClick={handleUpgradePlan}>
                  {profileData.subscriptionPlan.status === "Active" ? "Manage Subscription" : "Upgrade Plan"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={profileData.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={profileData.email} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={profileData.phoneNumber} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={profileData.location} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input id="gender" value={profileData.gender} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="personality">Personality Type</Label>
                      <Input id="personality" value={profileData.personalityType} disabled />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="examGoal">Exam Goal</Label>
                    <Input id="examGoal" value={profileData.examGoal} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleUpdateProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="mt-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Current Subscription</span>
                    <Badge variant={profileData.subscriptionPlan.status === "Active" ? "outline" : "destructive"}>
                      {profileData.subscriptionPlan.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Manage your subscription plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{profileData.subscriptionPlan.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(profileData.subscriptionPlan.startDate).toLocaleDateString()} to {new Date(profileData.subscriptionPlan.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-green-500">Current Plan</Badge>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-4">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <p className="text-sm">Next billing: {new Date(profileData.subscriptionPlan.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancel Subscription</Button>
                    <Button>Upgrade Plan</Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Available Plans</h2>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You are currently on the <strong>{profileData.subscriptionPlan.type}</strong>. Choose another plan below to upgrade or change your subscription.
                  </AlertDescription>
                </Alert>
                
                <SubscriptionPlans 
                  currentPlanId={profileData.subscriptionPlan.id} 
                  onSelectPlan={(plan) => {
                    toast({
                      title: "Plan Selected",
                      description: `You've selected the ${plan.name}. Redirecting to checkout...`
                    });
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileData.billingInfo.paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                          <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {method.type === 'Credit Card' ? `•••• ${method.last4}` : method.id}
                          </p>
                          {method.type === 'Credit Card' && (
                            <p className="text-xs text-muted-foreground">Expires {method.expiryDate}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isPrimary && <Badge variant="outline">Default</Badge>}
                        <Button size="sm" variant="ghost">
                          <PenSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="mt-2">Add Payment Method</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View your recent transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {profileData.billingInfo.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center p-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{transaction.amount}</p>
                          <Badge variant="outline" className="text-xs">{transaction.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Update your billing details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingName">Billing Name</Label>
                    <Input id="billingName" value={profileData.billingInfo.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <Input id="billingAddress" value={profileData.billingInfo.address} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleUpdateProfile}>Save Billing Info</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Control your privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox id="emails" />
                      <div className="space-y-1">
                        <Label htmlFor="emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new features, promotions, and study tips
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox id="performance" defaultChecked />
                      <div className="space-y-1">
                        <Label htmlFor="performance">Share Performance Data</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow anonymized usage data to improve PREPZR's recommendations
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox id="progress" defaultChecked />
                      <div className="space-y-1">
                        <Label htmlFor="progress">Show Progress to Batchmates</Label>
                        <p className="text-sm text-muted-foreground">
                          Display your study progress to members of your study group
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={() => {
                    toast({
                      title: "Privacy Settings Updated",
                      description: "Your privacy preferences have been saved"
                    });
                  }}>Save Privacy Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Render batch management section if user is a batch leader */}
      {profileData.batch.isBatchLeader && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Batch Management
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle>{profileData.batch.batchName || "Your Batch"}</CardTitle>
              <CardDescription>Manage your batch members and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mb-4">Create New Batch</Button>
              
              {profileData.batch.members.length > 0 ? (
                <div className="border rounded-md divide-y">
                  {profileData.batch.members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div>
                        <Badge variant="outline">{member.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 border rounded-md bg-muted/20">
                  <p>No batch members yet</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Invite Members
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Required Checkbox component since it wasn't defined
const Checkbox = ({ id, defaultChecked }: { id: string; defaultChecked?: boolean }) => {
  return (
    <input 
      type="checkbox" 
      id={id} 
      defaultChecked={defaultChecked}
      className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
    />
  );
};

export default ProfilePage;
