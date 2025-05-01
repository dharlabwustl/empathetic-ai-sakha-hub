
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { ArrowLeft, Calendar, CreditCard, Edit, LogOut, Mail, Phone, Plus, Settings, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';

const ProfilePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [createBatchDialogOpen, setCreateBatchDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  
  // Mock user data
  const userData = {
    name: "Student User",
    email: "student@example.com",
    phone: "+91 98765 43210",
    photoUrl: "https://github.com/shadcn.png", // Sample avatar
    type: "Individual",
    personalityType: "INTJ", // Myers-Briggs personality type
    location: "Delhi, India",
    gender: "Male",
    examGoal: "IIT JEE 2025",
    subscription: {
      planType: "Standard",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      status: "Active",
      benefits: ["Unlimited concept cards", "AI tutor access", "Weekly assessments"]
    },
    billingHistory: [
      { id: "INV-001", date: "2025-01-01", amount: 8999, status: "Paid" },
      { id: "INV-002", date: "2024-01-01", amount: 7999, status: "Paid" }
    ],
    savedPaymentMethods: [
      { type: "CARD", last4: "4242", expiry: "12/27", isDefault: true },
      { type: "UPI", id: "user@upi", isDefault: false }
    ]
  };
  
  // Mock batch data (only visible for group plan users)
  const batchData = {
    name: "Physics Champions",
    goal: "IIT JEE",
    targetYear: "2025",
    members: [
      { name: "Arjun Kumar", email: "arjun@example.com", status: "Joined", isLeader: true },
      { name: "Priya Singh", email: "priya@example.com", status: "Joined", isLeader: false },
      { name: "Rajesh Verma", email: "rajesh@example.com", status: "Pending", isLeader: false },
    ],
    settings: {
      shareProgress: true,
      allowLeadershipTransfer: false
    }
  };
  
  const handleCreateBatch = (data: any) => {
    toast({
      title: "Batch Created",
      description: `${data.name} batch has been created successfully.`
    });
    setCreateBatchDialogOpen(false);
  };
  
  const handleSendInvites = (emails: string) => {
    toast({
      title: "Invites Sent",
      description: `Invitations sent to ${emails.split(',').length} email addresses.`
    });
    setInviteDialogOpen(false);
  };
  
  const handleUpgradePlan = () => {
    toast({
      title: "Upgrade Options",
      description: "You'll be redirected to subscription options."
    });
    // In a real app, redirect to subscription page
  };
  
  const handleUpdatePassword = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully."
    });
  };
  
  const handleAddPaymentMethod = () => {
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been saved."
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate("/login");
  };

  return (
    <SharedPageLayout
      title="Profile"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="mb-4">
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/dashboard/student')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="batch">Batch</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          {activeTab === "profile" && (
            <Button variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
          
          {activeTab === "batch" && (
            <Button size="sm" onClick={() => setCreateBatchDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Batch
            </Button>
          )}
        </div>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-2">
                      <AvatarImage src={userData.photoUrl} alt={userData.name} />
                      <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Photo
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-medium">{userData.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Mail className="mr-1 h-4 w-4" />
                        {userData.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Phone className="mr-1 h-4 w-4" />
                        {userData.phone}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Account Type</p>
                        <p className="text-sm text-muted-foreground">{userData.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{userData.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Personality Type</p>
                        <p className="text-sm text-muted-foreground">{userData.personalityType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Gender</p>
                        <p className="text-sm text-muted-foreground">{userData.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Exam Goal Card */}
            <Card>
              <CardHeader>
                <CardTitle>Exam Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">{userData.examGoal}</h3>
                    <div className="flex items-center mt-2 text-blue-600 dark:text-blue-400 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      Target: {userData.examGoal.split(" ")[2]}
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Change Exam Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Subscription Card */}
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Subscription</CardTitle>
                  <Badge variant={userData.subscription.status === "Active" ? "default" : "destructive"}>
                    {userData.subscription.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium">Plan Details</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {userData.subscription.planType} Plan
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Valid from {userData.subscription.startDate} to {userData.subscription.endDate}
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="font-medium mb-2">Plan Benefits</h3>
                    <ul className="space-y-1">
                      {userData.subscription.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600 dark:text-green-400">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  {userData.subscription.status === "Active" ? (
                    <Button onClick={handleUpgradePlan}>
                      Upgrade Plan
                    </Button>
                  ) : (
                    <Button onClick={handleUpgradePlan} variant="default">
                      Renew Subscription
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Batch Tab */}
        <TabsContent value="batch">
          {userData.type === "Individual" ? (
            <Card>
              <CardHeader>
                <CardTitle>Batch Creation</CardTitle>
                <CardDescription>
                  Upgrade to a Group Plan to create and manage batches with other students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-6 text-center border rounded-lg bg-slate-50 dark:bg-slate-900">
                    <Users className="h-12 w-12 mx-auto text-slate-400" />
                    <h3 className="mt-4 text-lg font-medium">No Batch Access</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You're currently on an Individual Plan which doesn't include batch features.
                      Upgrade to a Group Plan to create study batches and invite friends.
                    </p>
                    <Button className="mt-4" onClick={handleUpgradePlan}>
                      Upgrade to Group Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Batch Members</CardTitle>
                  <CardDescription>
                    Manage members in your "{batchData.name}" batch
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {batchData.members.map((member, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                            {member.isLeader && (
                              <Badge variant="outline" className="ml-2">Leader</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={member.status === "Joined" ? "default" : "secondary"}>
                              {member.status}
                            </Badge>
                            {!member.isLeader && (
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                {member.status === "Pending" ? "Remind" : "Remove"}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" onClick={() => setInviteDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Invite New Members
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Batch Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="share-progress">Share Progress</Label>
                        <Switch 
                          id="share-progress" 
                          checked={batchData.settings.shareProgress} 
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Allow members to see each other's progress
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="leadership-transfer">Leadership Transfer</Label>
                        <Switch 
                          id="leadership-transfer" 
                          checked={batchData.settings.allowLeadershipTransfer} 
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Allow transfer of batch leadership to other members
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Batch Information</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex">
                          <dt className="w-1/3 text-muted-foreground">Name:</dt>
                          <dd>{batchData.name}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-1/3 text-muted-foreground">Exam Goal:</dt>
                          <dd>{batchData.goal}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-1/3 text-muted-foreground">Target Year:</dt>
                          <dd>{batchData.targetYear}</dd>
                        </div>
                        <div className="flex">
                          <dt className="w-1/3 text-muted-foreground">Members:</dt>
                          <dd>{batchData.members.length}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={userData.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={userData.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={userData.location} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdatePassword}>Update Password</Button>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <Switch id="email-notifications" defaultChecked={true} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about your account via email
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="study-reminders">Study Reminders</Label>
                      <Switch id="study-reminders" defaultChecked={true} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get daily reminders for your study schedule
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <Switch id="marketing-emails" defaultChecked={false} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <Switch id="dark-mode" defaultChecked={false} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {userData.billingHistory.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{invoice.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{invoice.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">₹{invoice.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={invoice.status === "Paid" ? "success" : "destructive"}>
                              {invoice.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.savedPaymentMethods.map((method, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
                          {method.type === "CARD" ? (
                            <CreditCard className="h-5 w-5" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                              <path d="M5.5 8.5l3-3 3 3 3-3 3 3" />
                              <path d="M18.5 8.5v7a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4v-7" />
                            </svg>
                          )}
                        </div>
                        <div>
                          {method.type === "CARD" ? (
                            <>
                              <p className="font-medium text-sm">•••• {method.last4}</p>
                              <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-medium text-sm">UPI</p>
                              <p className="text-xs text-muted-foreground">{method.id}</p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {method.isDefault && (
                        <Badge variant="outline" className="ml-auto mr-2">Default</Badge>
                      )}
                      
                      <Button variant="ghost" size="sm" className="h-8 px-2 ml-2">
                        <div className="sr-only">Remove</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full" onClick={handleAddPaymentMethod}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Create Batch Dialog */}
      <Dialog open={createBatchDialogOpen} onOpenChange={setCreateBatchDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create a New Batch</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new study batch
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData);
            handleCreateBatch(data);
          }}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="batch-name">Batch Name</Label>
                <Input id="batch-name" name="name" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-goal">Exam Goal</Label>
                  <Select defaultValue="iit-jee" name="goal">
                    <SelectTrigger id="exam-goal">
                      <SelectValue placeholder="Select Exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iit-jee">IIT JEE</SelectItem>
                      <SelectItem value="neet">NEET</SelectItem>
                      <SelectItem value="upsc">UPSC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="target-year">Target Year</Label>
                  <Select defaultValue="2025" name="targetYear">
                    <SelectTrigger id="target-year">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subscription-limit">Subscription Limit</Label>
                <p className="text-sm text-muted-foreground">
                  Your plan allows up to 5 members
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Batch Permissions</Label>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Switch id="share-progress" name="shareProgress" defaultChecked />
                    <Label htmlFor="share-progress" className="text-sm">
                      Allow batchmates to see progress
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="transfer-leadership" name="transferLeadership" />
                    <Label htmlFor="transfer-leadership" className="text-sm">
                      Allow transfer of leadership
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateBatchDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Batch</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Invite Members Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Members</DialogTitle>
            <DialogDescription>
              Invite new members to join your batch
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSendInvites(formData.get('emails')?.toString() || '');
          }}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="invite-emails">Email Addresses</Label>
                <Input
                  id="invite-emails"
                  name="emails"
                  placeholder="Enter email addresses separated by commas"
                  className="h-20"
                />
                <p className="text-sm text-muted-foreground">
                  You can invite up to 5 members with your current plan
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input name="invite-link" readOnly value="https://prepzr.app/join/ABC123" />
                  <Button type="button" variant="outline" onClick={() => {
                    navigator.clipboard.writeText('https://prepzr.app/join/ABC123');
                    toast({
                      title: "Copied!",
                      description: "Invite link copied to clipboard"
                    });
                  }}>
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Or share this unique invite link with your batchmates
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Invites</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SharedPageLayout>
  );
};

export default ProfilePage;
