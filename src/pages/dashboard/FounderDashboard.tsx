import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, BarChart2, Calendar, Clock, Users } from 'lucide-react';
import { mockFounderDashboardData } from '@/data/mockFounderDashboardData';
import { mockFounderKPIs } from '@/data/mockKPIs';
import { mockNudges } from '@/data/mockNudges';
import { UserRole } from '@/types/user/base';
import { FounderProfile } from '@/types/user/founder';
import { KPI } from '@/types/dashboard/kpi';
import { Nudge } from '@/types/dashboard/nudge';
import { useIsMobile } from '@/hooks/use-mobile';
import FounderMetricsSection from '@/components/dashboard/founder/FounderMetricsSection';
import FounderProjectsSection from '@/components/dashboard/founder/FounderProjectsSection';
import FounderTeamSection from '@/components/dashboard/founder/FounderTeamSection';
import FounderInvestorsSection from '@/components/dashboard/founder/FounderInvestorsSection';
import FounderFinancialsSection from '@/components/dashboard/founder/FounderFinancialsSection';
import FounderResourcesSection from '@/components/dashboard/founder/FounderResourcesSection';
import FounderOnboarding from '@/components/dashboard/founder/FounderOnboarding';
import FounderWelcomeTour from '@/components/dashboard/founder/FounderWelcomeTour';
import FounderStudyPlan from '@/components/dashboard/founder/FounderStudyPlan';

const FounderDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(isMobile);
  
  // Mock data state
  const [kpis, setKpis] = useState<KPI[]>(mockFounderKPIs);
  const [nudges, setNudges] = useState<Nudge[]>(mockNudges);
  const [founderProfile, setFounderProfile] = useState<FounderProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user profile data
    const timer = setTimeout(() => {
      if (user) {
        // In a real app, you would fetch the founder profile from an API
        setFounderProfile({
          ...user,
          role: UserRole.Founder,
          companyName: mockFounderDashboardData.companyName,
          industry: mockFounderDashboardData.industry,
          foundingDate: mockFounderDashboardData.foundingDate,
          teamSize: mockFounderDashboardData.teamSize,
          fundingStage: mockFounderDashboardData.fundingStage,
          totalFunding: mockFounderDashboardData.totalFunding,
          investors: mockFounderDashboardData.investors,
          pitchDeck: mockFounderDashboardData.pitchDeck,
          businessModel: mockFounderDashboardData.businessModel,
          subscription: user.subscription
        });
      }
      setLoading(false);
      
      // Show onboarding for first-time users
      const hasCompletedOnboarding = localStorage.getItem('founderOnboardingCompleted');
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
      
      // Show welcome tour if it's the user's first visit today
      const lastVisit = localStorage.getItem('founderLastVisit');
      const today = new Date().toDateString();
      if (!lastVisit || new Date(lastVisit).toDateString() !== today) {
        setShowWelcomeTour(true);
        localStorage.setItem('founderLastVisit', new Date().toISOString());
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [user]);
  
  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Handle nudge click
  const markNudgeAsRead = (id: string) => {
    setNudges(prev => prev.map(nudge => 
      nudge.id === id ? { ...nudge, read: true } : nudge
    ));
    
    toast({
      title: "Nudge marked as read",
      description: "You can find all notifications in your profile settings.",
    });
  };
  
  // Handle onboarding completion
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('founderOnboardingCompleted', 'true');
    
    toast({
      title: "Onboarding completed!",
      description: "Welcome to your founder dashboard.",
    });
  };
  
  // Handle welcome tour
  const handleSkipTour = () => {
    setShowWelcomeTour(false);
  };
  
  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
    toast({
      title: "Tour completed!",
      description: "You're all set to use your dashboard.",
    });
  };
  
  // Handle study plan
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };
  
  // Handle sidebar toggle
  const toggleSidebar = () => {
    setHideSidebar(prev => !prev);
  };
  
  // Handle tabs navigation toggle
  const toggleTabsNav = () => {
    setHideTabsNav(prev => !prev);
  };
  
  if (loading || !founderProfile) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 container mx-auto p-4 md:p-6">
          <div className="space-y-4">
            <Skeleton className="h-12 w-[250px]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-[180px] rounded-xl" />
              <Skeleton className="h-[180px] rounded-xl" />
              <Skeleton className="h-[180px] rounded-xl" />
            </div>
            <Skeleton className="h-[300px] rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-[250px] rounded-xl" />
              <Skeleton className="h-[250px] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardLayout
        userProfile={{
          ...founderProfile,
          subscription: founderProfile.subscription
        }}
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
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto p-1">
            <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
            <TabsTrigger value="metrics" className="py-2">Metrics</TabsTrigger>
            <TabsTrigger value="projects" className="py-2">Projects</TabsTrigger>
            <TabsTrigger value="team" className="py-2">Team</TabsTrigger>
            <TabsTrigger value="investors" className="py-2">Investors</TabsTrigger>
            <TabsTrigger value="resources" className="py-2">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Team Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">{founderProfile.teamSize}</p>
                      <p className="text-sm text-muted-foreground">Team members</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      +2 this month
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Funding Stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">{founderProfile.fundingStage}</p>
                      <p className="text-sm text-muted-foreground">Current stage</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      ${founderProfile.totalFunding}M raised
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Company Age
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold">
                        {new Date().getFullYear() - new Date(founderProfile.foundingDate).getFullYear()}
                      </p>
                      <p className="text-sm text-muted-foreground">Years in business</p>
                    </div>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      Founded {new Date(founderProfile.foundingDate).getFullYear()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Company Overview</CardTitle>
                <CardDescription>
                  {founderProfile.companyName} - {founderProfile.industry}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Business Model:</span>
                    <span className="font-medium">{founderProfile.businessModel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Funding:</span>
                    <span className="font-medium">${founderProfile.totalFunding}M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Investors:</span>
                    <span className="font-medium">{founderProfile.investors.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Team Size:</span>
                    <span className="font-medium">{founderProfile.teamSize}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Runway</span>
                    <span className="text-sm text-muted-foreground">8 months remaining</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Product Development</span>
                    <span className="text-sm text-muted-foreground">75% complete</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Customer Acquisition</span>
                    <span className="text-sm text-muted-foreground">42% of target</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Recent Team Activity</span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span className="hidden sm:inline">View All</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFounderDashboardData.recentTeamActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={activity.avatar} alt={activity.name} />
                          <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.name}</span>
                            <span className="text-muted-foreground"> {activity.action}</span>
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Upcoming Deadlines</span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <span className="hidden sm:inline">View Calendar</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockFounderDashboardData.upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${
                          deadline.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                          deadline.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' :
                          'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        }`}>
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{deadline.title}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{deadline.date}</span>
                            <Badge variant="outline" className={`text-xs ${
                              deadline.priority === 'high' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                              deadline.priority === 'medium' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                              'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {deadline.priority} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics">
            <FounderMetricsSection data={mockFounderDashboardData} />
          </TabsContent>
          
          <TabsContent value="projects">
            <FounderProjectsSection data={mockFounderDashboardData} />
          </TabsContent>
          
          <TabsContent value="team">
            <FounderTeamSection data={mockFounderDashboardData} />
          </TabsContent>
          
          <TabsContent value="investors">
            <FounderInvestorsSection data={mockFounderDashboardData} />
          </TabsContent>
          
          <TabsContent value="resources">
            <FounderResourcesSection />
          </TabsContent>
        </Tabs>
      </DashboardLayout>
      
      {showOnboarding && (
        <FounderOnboarding 
          onComplete={handleCompleteOnboarding} 
        />
      )}
      
      {showWelcomeTour && !showOnboarding && (
        <FounderWelcomeTour 
          onSkip={handleSkipTour}
          onComplete={handleCompleteTour}
        />
      )}
      
      {showStudyPlan && (
        <FounderStudyPlan 
          onClose={handleCloseStudyPlan}
        />
      )}
    </>
  );
};

export default FounderDashboard;
