
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import { motion } from "framer-motion";

const GroupCheckoutPage: React.FC = () => {
  const [emails, setEmails] = useState<string[]>(['']);
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Use the student dashboard hook for shared functionality
  const {
    loading: dashboardLoading,
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

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleRemoveEmail = (index: number) => {
    if (emails.length > 1) {
      const newEmails = emails.filter((_, i) => i !== index);
      setEmails(newEmails);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Validate emails
    const validEmails = emails.filter(email => email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    
    if (validEmails.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one valid email",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // In a real application, this would be an API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Group invitation sent to ${validEmails.length} email(s)`,
      });
      setLoading(false);
    }, 1500);
  };

  if (dashboardLoading || !userProfile) {
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
      <Card className="mx-auto max-w-3xl shadow-md">
        <CardHeader>
          <CardTitle>Group Subscription</CardTitle>
          <p className="text-muted-foreground">Invite your friends and save up to 30%</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Group Details</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add the email addresses of friends you'd like to invite.
                Everyone gets a 15% discount for 2 people, 20% for 3, and 30% for 4 or more!
              </p>

              <div className="space-y-3">
                {emails.map((email, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2"
                  >
                    <div className="flex-grow">
                      <Label htmlFor={`email-${index}`} className="sr-only">
                        Email {index + 1}
                      </Label>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        placeholder={`Friend's email address ${index + 1}`}
                        className="w-full"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveEmail(index)}
                      disabled={emails.length === 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}

                <Button
                  variant="outline"
                  onClick={handleAddEmail}
                  className="w-full"
                  type="button"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Another Friend
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="coupon" className="block mb-2">
                Coupon Code (Optional)
              </Label>
              <Input
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full"
              />
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4">Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Price (per person)</span>
                  <span>₹999/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of People</span>
                  <span>{emails.filter(e => e.trim() !== '').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Group Discount</span>
                  <span className="text-green-600">
                    {emails.filter(e => e.trim() !== '').length >= 4 ? '30%' : 
                     emails.filter(e => e.trim() !== '').length === 3 ? '20%' : 
                     emails.filter(e => e.trim() !== '').length === 2 ? '15%' : '0%'}
                  </span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total (per person)</span>
                  <span>
                    {emails.filter(e => e.trim() !== '').length >= 4 ? '₹699' : 
                     emails.filter(e => e.trim() !== '').length === 3 ? '₹799' : 
                     emails.filter(e => e.trim() !== '').length === 2 ? '₹849' : '₹999'}/month
                  </span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending Invitations..." : "Send Invitations"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Your friends will receive an email invitation to join your group subscription.
              You'll only be charged once they accept.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default GroupCheckoutPage;
