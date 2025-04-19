
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash, PenLine, Users, CalendarDays, Clock } from 'lucide-react';

const BatchManagementPage: React.FC = () => {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { userProfile: userData, loading: profileLoading } = useUserProfile(UserRole.Student);
  const { toast } = useToast();
  
  // Use the student dashboard hook for shared functionality
  const {
    userProfile,
    activeTab,
    showWelcomeTour,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    features,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockBatches = [
          {
            id: '1',
            name: 'JEE Advanced Physics Group',
            members: 8,
            meetingDays: ['Monday', 'Thursday'],
            time: '7:00 PM - 8:30 PM',
            isOwner: true,
            nextMeeting: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          },
          {
            id: '2',
            name: 'Organic Chemistry Study Circle',
            members: 6,
            meetingDays: ['Wednesday', 'Saturday'],
            time: '6:00 PM - 7:30 PM',
            isOwner: false,
            nextMeeting: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          },
          {
            id: '3',
            name: 'Mathematics Problem Solving',
            members: 12,
            meetingDays: ['Tuesday', 'Friday'],
            time: '8:00 PM - 9:30 PM',
            isOwner: false,
            nextMeeting: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          },
        ];

        setBatches(mockBatches);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load your study batches",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchBatches();
  }, [toast]);

  const handleCreateBatch = () => {
    toast({
      title: "Create Study Batch",
      description: "This feature will be available soon!",
    });
  };

  const handleJoinBatch = () => {
    toast({
      title: "Join Study Batch",
      description: "This feature will be available soon!",
    });
  };

  const handleEditBatch = (batchId: string) => {
    toast({
      title: "Edit Batch",
      description: `Editing batch ${batchId} will be available soon!`,
    });
  };

  const handleDeleteBatch = (batchId: string) => {
    toast({
      title: "Delete Batch",
      description: `Deleting batch ${batchId} will be available soon!`,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading || profileLoading || !userProfile) {
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
      features={features}
      showWelcomeTour={showWelcomeTour}
      currentTime={new Date()}
      onTabChange={handleTabChange}
      onViewStudyPlan={handleViewStudyPlan}
      onToggleSidebar={toggleSidebar}
      onToggleTabsNav={toggleTabsNav}
      onSkipTour={handleSkipTour}
      onCompleteTour={handleCompleteTour}
      showStudyPlan={showStudyPlan}
      onCloseStudyPlan={handleCloseStudyPlan}
      lastActivity={null}
      suggestedNextAction={null}
    >
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">My Study Batches</CardTitle>
            <div className="space-x-2">
              <Button onClick={handleJoinBatch} variant="outline" className="h-9">
                Join Batch
              </Button>
              <Button onClick={handleCreateBatch} className="h-9">
                <Plus className="h-4 w-4 mr-1" /> Create Batch
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {batches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                You haven't created or joined any study batches yet.
              </p>
              <Button onClick={handleCreateBatch} className="mt-4">
                Create Your First Batch
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {batches.map((batch) => (
                <div
                  key={batch.id}
                  className="bg-background rounded-lg border p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">{batch.name}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{batch.members} members</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        <span>{batch.meetingDays.join(', ')}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{batch.time}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      Next meeting:{' '}
                      <span className="font-medium">{formatDate(batch.nextMeeting)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end md:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBatch(batch.id)}
                    >
                      <PenLine className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    {batch.isOwner && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBatch(batch.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default BatchManagementPage;
