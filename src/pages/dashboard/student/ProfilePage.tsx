
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  CreditCard,
  User,
  Settings,
  Users,
  Calendar,
  Clock,
  Building,
  Mail,
  Phone,
  Star,
  Award,
  ChevronRight,
  Plus,
  MapPin,
  Crown,
  Edit,
  Check,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const { toast } = useToast();
  
  // Mock data - in a real app, this would come from API/context
  const userData = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    profilePic: '/lovable-uploads/19303283-7911-484b-9bea-65d7691bbdae.png',
    type: 'Student',
    personalityType: 'Visual Learner',
    location: 'Mumbai, Maharashtra',
    gender: 'Male',
    examGoal: 'IIT-JEE 2026',
    subscription: {
      planType: 'Premium Individual',
      startDate: '2023-10-01',
      endDate: '2024-09-30',
      status: 'Active',
      benefits: ['Unlimited Concept Cards', 'AI Tutor Access', 'Practice Tests', 'Study Analytics']
    },
    billingHistory: [
      { id: 'INV-001', date: '2023-10-01', amount: '₹9,999', status: 'Paid' },
      { id: 'INV-002', date: '2022-10-01', amount: '₹8,499', status: 'Paid' }
    ],
    paymentMethods: [
      { id: 'card-1', type: 'card', last4: '4242', expiry: '05/26' },
      { id: 'upi-1', type: 'upi', id: 'user@ybl' }
    ]
  };
  
  // Batch management mock data
  const batchData = {
    name: 'JEE Toppers 2025',
    examGoal: 'IIT-JEE',
    targetYear: '2025',
    memberLimit: 5,
    members: [
      { name: 'Rahul Sharma', email: 'rahul@example.com', status: 'Leader' },
      { name: 'Priya Patel', email: 'priya@example.com', status: 'Joined' },
      { name: 'Amit Kumar', email: 'amit@example.com', status: 'Pending' }
    ],
    settings: {
      shareProgress: true,
      transferLeadership: false
    }
  };

  const handleCreateBatch = () => {
    // In a real app, this would save the batch data to the backend
    setShowBatchDialog(false);
    toast({
      title: "Batch Created!",
      description: "Your study batch has been created successfully."
    });
  };
  
  const handleUpgradePlan = () => {
    toast({
      title: "Coming Soon!",
      description: "Plan upgrades will be available shortly."
    });
  };
  
  const daysLeft = () => {
    if (!userData.subscription) return 0;
    
    const endDate = new Date(userData.subscription.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <SharedPageLayout
      title="Your Profile"
      subtitle="Manage your account and preferences"
      showBackButton
      backButtonUrl="/dashboard/student"
    >
      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-grid">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="batch" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Batch</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="h-24 w-24 border-2 border-primary">
                    <AvatarImage src={userData.profilePic} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p className="font-medium">{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{userData.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{userData.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">User Type</p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{userData.type}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Personality Type</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-amber-500" />
                        <p className="font-medium">{userData.personalityType}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{userData.location}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Gender</p>
                      <p className="font-medium">{userData.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Exam Goal</p>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-blue-500" />
                        <p className="font-medium">{userData.examGoal}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button>Edit Profile</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Subscription Details</h3>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-amber-500" />
                      <h4 className="font-bold">{userData.subscription.planType}</h4>
                    </div>
                    <Badge className={userData.subscription.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}>
                      {userData.subscription.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Start Date:</span>
                      <span>{new Date(userData.subscription.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">End Date:</span>
                      <span>{new Date(userData.subscription.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {daysLeft() <= 30 && (
                    <div className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-3">
                      {daysLeft()} days left in your subscription
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Plan Benefits:</h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {userData.subscription.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <Button onClick={handleUpgradePlan}>
                      {daysLeft() <= 30 ? 'Renew Plan' : 'Upgrade Plan'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="batch">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Batch Management</span>
                <Button size="sm" onClick={() => setShowBatchDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Create Batch
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {batchData ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 p-4 rounded-lg border border-purple-100 dark:border-purple-900/40">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{batchData.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {batchData.examGoal} • Target {batchData.targetYear}
                        </p>
                      </div>
                      <Badge className="bg-purple-500">{batchData.members.length}/{batchData.memberLimit} Members</Badge>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Members</h4>
                      <div className="space-y-3">
                        {batchData.members.map((member, index) => (
                          <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                              </div>
                            </div>
                            <Badge className={
                              member.status === 'Leader' ? 'bg-blue-500' :
                              member.status === 'Joined' ? 'bg-green-500' : 'bg-amber-500'
                            }>
                              {member.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm">Invite Members</Button>
                        <Button variant="outline" size="sm">Manage Batch</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Batches Created</h3>
                  <p className="text-muted-foreground mb-4">Create a batch to study together with friends</p>
                  <Button onClick={() => setShowBatchDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Create Your First Batch
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {method.type === 'card' ? (
                        <CreditCard className="h-5 w-5 text-blue-500" />
                      ) : (
                        <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          U
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {method.type === 'card' ? `•••• ${method.last4}` : method.id}
                        </p>
                        {method.type === 'card' && (
                          <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                ))}
                
                <Button variant="outline" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.billingHistory.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Security and Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Password</h3>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <Button>Update</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Privacy</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Activity Sharing</p>
                      <p className="text-sm text-muted-foreground">Allow others to see your study activity</p>
                    </div>
                    <Button variant="outline" size="sm">On</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates about your account</p>
                    </div>
                    <Button variant="outline" size="sm">Off</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Create Batch Dialog */}
      <Dialog open={showBatchDialog} onOpenChange={setShowBatchDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Batch</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="batch-name">Batch Name</Label>
              <Input id="batch-name" placeholder="Enter a name for your batch" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exam-goal">Exam Goal</Label>
                <Select defaultValue="iit-jee">
                  <SelectTrigger id="exam-goal">
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iit-jee">IIT-JEE</SelectItem>
                    <SelectItem value="neet">NEET</SelectItem>
                    <SelectItem value="upsc">UPSC</SelectItem>
                    <SelectItem value="cat">CAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target-year">Target Year</Label>
                <Select defaultValue="2025">
                  <SelectTrigger id="target-year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="invite-email">Invite Members</Label>
              <div className="flex gap-2">
                <Input id="invite-email" placeholder="Enter email address" className="flex-1" />
                <Button variant="outline" size="sm">Add</Button>
              </div>
              <p className="text-xs text-muted-foreground">You can add up to 5 members with your current plan</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Batch Permissions</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="share-progress" className="flex-1">Allow members to see progress</Label>
                  <Button variant="outline" size="sm">On</Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="transfer-leadership" className="flex-1">Allow leadership transfer</Label>
                  <Button variant="outline" size="sm">Off</Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBatchDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateBatch}>Create Batch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SharedPageLayout>
  );
};

export default ProfilePage;
