import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';
import DashboardLayout from './DashboardLayout';
import { useDoctorDashboard } from '@/hooks/useDoctorDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DoctorDashboard() {
  const { user } = useAuth();
  const {
    loading,
    userProfile,
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
  } = useDoctorDashboard();

  useEffect(() => {
    if (user) {
      // Additional data fetching or processing can be done here
      console.log('User authenticated:', user);
    }
  }, [user]);

  if (loading || !user) {
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
          <h1 className="text-3xl font-bold mb-2">
            Welcome, {user.firstName} {user.lastName}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Here's your dashboard overview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Profile Overview</CardTitle>
              <CardDescription>Your account details and settings</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.firstName} />
                  <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-md font-medium">{user.firstName} {user.lastName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Role:</span> Doctor
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Specialization:</span> {user.specialization || 'General'}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Last Active:</span> {currentTime}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Appointments Card */}
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Today's Appointments</CardTitle>
              <CardDescription>Your schedule for today</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[200px] w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Time</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">9:00 AM</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell className="text-right">Confirmed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">10:30 AM</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell className="text-right">Confirmed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">2:00 PM</TableCell>
                      <TableCell>Alice Johnson</TableCell>
                      <TableCell className="text-right">Pending</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Calendar Card */}
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Upcoming Availability</CardTitle>
              <CardDescription>Set your availability for appointments</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !currentTime && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {currentTime ? format(currentTime, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center" side="bottom">
                  <Calendar
                    mode="single"
                    selected={currentTime}
                    onSelect={() => { }}
                    disabled={(date) =>
                      date > new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Feedback Card */}
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Patient Feedback</CardTitle>
              <CardDescription>Recent feedback from your patients</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Emily Davis" />
                    <AvatarFallback>ED</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium">Emily Davis</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      "Dr. Smith was very attentive and helpful. I felt heard and understood."
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="David Lee" />
                    <AvatarFallback>DL</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium">David Lee</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      "The consultation was thorough and I received clear explanations."
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <CardDescription>Manage your profile and settings</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">Edit Profile</Button>
                <Button variant="outline">View Appointments</Button>
                <Button variant="outline">Manage Availability</Button>
                <Button variant="outline">Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consultation Notes Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Consultation Notes</h2>
          <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">Add New Note</CardTitle>
              <CardDescription>Record your observations and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input type="text" id="patientName" placeholder="Enter patient name" />
                </div>
                <div>
                  <Label htmlFor="consultationDate">Consultation Date</Label>
                  <Input type="date" id="consultationDate" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter your notes here" className="min-h-[100px]" />
                </div>
                <Button>Save Note</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
