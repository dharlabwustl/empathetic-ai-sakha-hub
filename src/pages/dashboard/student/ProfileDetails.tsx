import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, Edit, ExternalLink, Lock, Plus, Save, User, Users } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from 'date-fns';
import { SubscriptionPlans } from '@/components/subscription';
import { SubscriptionType, UserProfileType, UserRole } from '@/types/user/base';
import { StudentProfile } from '@/types/user/student';
import { BatchDetails, BatchMember } from '@/components/subscription/batch/types';
import { batchService } from '@/services/batchService';

const ProfileDetails = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<StudentProfile | null>(null);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [userBatch, setUserBatch] = useState<BatchDetails | null>(null);
  const [batchMembers, setBatchMembers] = useState<BatchMember[]>([]);
  const [isBatchLeader, setIsBatchLeader] = useState(false);
  const [showBatchDetails, setShowBatchDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const {
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();
  
  useEffect(() => {
    if (user) {
      // Set the user profile
      setUserProfile({
        ...user,
        role: UserRole.Student,
      });
      
      // Set the user subscription
      setUserSubscription(user.subscription);
      
      // Fetch batch details if user has a batchId
      if (user.batchId) {
        fetchBatchDetails(user.batchId);
      }
    }
  }, [user]);
  
  const fetchBatchDetails = async (batchId: string) => {
    try {
      const batch = await batchService.getBatchDetails(batchId);
      setUserBatch(batch);
      setBatchMembers(batch.members);
      setIsBatchLeader(batch.owner.id === user?.id);
    } catch (error) {
      console.error("Error fetching batch details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch batch details.",
        variant: "destructive",
      });
    }
  };
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleSaveProfile = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update user profile in AuthContext
      await updateUserProfile({
        ...user,
        name: values.name,
        email: values.email,
        studyHours: values.studyHours,
        studyPace: values.studyPace,
        preferredStudyTime: values.preferredStudyTime,
        schoolName: values.schoolName,
        grade: values.grade,
        parentContact: values.parentContact,
        lastExamScore: values.lastExamScore,
        targetExam: values.targetExam,
        examDate: values.examDate,
        strengths: values.strengths,
        weaknesses: values.weaknesses,
        preferredLearningStyle: values.preferredLearningStyle,
        educationLevel: values.educationLevel,
        subjects: values.subjects
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleUpgradeSubscription = () => {
    navigate('/dashboard/student/subscription');
  };
  
  const handleManageBatch = () => {
    navigate('/dashboard/student/batch');
  };
  
  const handleCopyCode = () => {
    if (userBatch) {
      navigator.clipboard.writeText(userBatch.invitationCode || '');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      toast({
        title: "Code Copied",
        description: "Invitation code copied to clipboard",
      });
    }
  };
  
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    studyHours: z.number().min(0, {
      message: "Study hours must be a non-negative number.",
    }).optional().nullable(),
    studyPace: z.string().optional(),
    preferredStudyTime: z.string().optional(),
    schoolName: z.string().optional(),
    grade: z.string().optional(),
    parentContact: z.string().optional(),
    lastExamScore: z.number().optional().nullable(),
    targetExam: z.string().optional(),
    examDate: z.date().optional().nullable(),
    strengths: z.array(z.string()).optional(),
    weaknesses: z.array(z.string()).optional(),
    preferredLearningStyle: z.string().optional(),
    educationLevel: z.string().optional(),
    subjects: z.array(z.string()).optional()
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      studyHours: user?.studyHours || null,
      studyPace: user?.studyPace || "",
      preferredStudyTime: user?.preferredStudyTime || "",
      schoolName: user?.schoolName || "",
      grade: user?.grade || "",
      parentContact: user?.parentContact || "",
      lastExamScore: user?.lastExamScore || null,
      targetExam: user?.targetExam || "",
      examDate: user?.examDate ? new Date(user.examDate) : null,
      strengths: user?.strengths || [],
      weaknesses: user?.weaknesses || [],
      preferredLearningStyle: user?.preferredLearningStyle || "",
      educationLevel: user?.educationLevel || "",
      subjects: user?.subjects || []
    },
    mode: "onChange",
  });
  
  if (loading || !userProfile) {
    return <DashboardLoading />;
  }
  
  return (
    <DashboardLayout
      userProfile={userProfile}
      hideSidebar={hideSidebar}
      hideTabsNav={hideTabsNav}
      activeTab={activeTab}
      kpis={kpis}
      nudges={nudges}
      markNudgeAsRead={markNudgeAsRead}
      showWelcomeTour={showWelcomeTour}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
    >
      <div className="container max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your profile details and settings
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              View and edit your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSaveProfile)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="yourname@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="studyHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Study Hours</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 2"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="studyPace"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Study Pace</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a pace" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="slow">Slow</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="fast">Fast</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredStudyTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Study Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                            <SelectItem value="evening">Evening</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="schoolName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your School Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Grade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parentContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="Parent Contact" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastExamScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Exam Score</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 85"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetExam"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Exam</FormLabel>
                        <FormControl>
                          <Input placeholder="Target Exam" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="examDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="mr-2">
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  <Button type="button" variant="ghost" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
                  </div>
                  <div>
                    <Label>Study Hours</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.studyHours || 'Not set'}</p>
                  </div>
                  <div>
                    <Label>Study Pace</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.studyPace || 'Not set'}</p>
                  </div>
                  <div>
                    <Label>Preferred Study Time</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.preferredStudyTime || 'Not set'}</p>
                  </div>
                  <div>
                    <Label>School Name</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.schoolName || 'Not set'}</p>
                  </div>
                  <div>
                    <Label>Grade</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.grade || 'Not set'}</p>
                  </div>
                  <div>
                    <Label>Parent Contact</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.parentContact || 'Not set'}</p>
                  </div>
                  <div>
                    <Label>Last Exam Score</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.lastExamScore || 'Not set'}</p>
                  </div>
                  <div>
                    <Label>Target Exam</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.targetExam || 'Not set'}</p>
                  </div>
                  <div>
                    <Label>Exam Date</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.examDate ? format(new Date(user.examDate), 'yyyy-MM-dd') : 'Not set'}</p>
                  </div>
                  <div>
                    <Label>Education Level</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.educationLevel || 'Not set'}</p>
                  </div>
                  <div>
                    <Label>Subjects</Label>
                    <p className="text-gray-600 dark:text-gray-300">{user?.subjects ? user.subjects.join(', ') : 'Not set'}</p>
                  </div>
                </div>
                <Button onClick={handleEditProfile}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Subscription Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
            <CardDescription>
              View your current subscription plan and manage your subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            {userSubscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{userSubscription.planType} Plan</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userSubscription.planId}
                    </p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p>Next Billing Date:</p>
                  <p className="font-medium">July 22, 2024</p>
                </div>
                <Button onClick={handleUpgradeSubscription}>
                  Upgrade Subscription
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  You do not have an active subscription.
                </p>
                <Button onClick={handleUpgradeSubscription}>
                  View Available Plans
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Batch Information */}
        {userBatch && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Batch Details</CardTitle>
                <div>
                  {isBatchLeader ? (
                    <Badge variant="default">
                      <Crown className="mr-2 h-4 w-4" />
                      Batch Leader
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Batch Member</Badge>
                  )}
                </div>
              </div>
              <CardDescription>
                View your batch details and manage your group
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Batch Name</Label>
                  <p className="text-gray-600 dark:text-gray-300">{userBatch.name}</p>
                </div>
                <div>
                  <Label>Batch Code</Label>
                  <div className="flex items-center">
                    <Input
                      type="text"
                      value={userBatch.invitationCode}
                      readOnly
                      className="cursor-not-allowed"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      onClick={handleCopyCode}
                      disabled={copied}
                    >
                      {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <p className="text-gray-600 dark:text-gray-300">{format(new Date(userBatch.createdAt), 'yyyy-MM-dd')}</p>
                </div>
                <div>
                  <Label>Number of Members</Label>
                  <p className="text-gray-600 dark:text-gray-300">{batchMembers.length}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <Button onClick={() => setShowBatchDetails(true)}>
                  View Batch Details
                </Button>
                {isBatchLeader && (
                  <Button onClick={handleManageBatch}>
                    Manage Batch
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Subscription Plans */}
        <SubscriptionPlans 
          currentPlanId={userSubscription?.planId || 'free'} 
          showGroupOption={true}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProfileDetails;
