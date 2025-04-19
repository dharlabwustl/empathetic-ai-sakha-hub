
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "499",
    duration: "month",
    isMostPopular: false,
    description: "Perfect for starters",
    features: [
      "All subject access",
      "Basic doubt solving",
      "Limited daily questions",
      "Weekly mock tests"
    ],
    buttonLabel: "Get Started"
  },
  {
    id: "pro",
    name: "Pro",
    price: "999",
    duration: "month",
    isMostPopular: true,
    description: "Best for serious students",
    features: [
      "All subject access",
      "Priority doubt solving",
      "Unlimited daily questions",
      "Daily mock tests",
      "Performance analytics",
      "Peer group access"
    ],
    buttonLabel: "Upgrade Now"
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: "1499",
    duration: "month",
    isMostPopular: false,
    description: "For maximum results",
    features: [
      "All Pro features",
      "1-on-1 mentoring",
      "Personalized study plan",
      "Unlimited mock tests",
      "Advanced analytics",
      "Parent dashboard",
      "Result guarantee"
    ],
    buttonLabel: "Go Ultimate"
  }
];

const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const { toast } = useToast();
  
  // Use the student dashboard hook for shared functionality
  const {
    loading,
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

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Plan Selected",
      description: `You've selected the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.`,
    });
  };

  const handleSubscribe = (planId: string) => {
    navigate(`/subscription/checkout?plan=${planId}`);
  };

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
          <CardTitle className="text-2xl text-center">Choose Your Study Plan</CardTitle>
          <p className="text-center text-muted-foreground">
            Select the plan that works best for your exam preparation needs.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex"
              >
                <Card
                  className={`flex flex-col h-full shadow-sm cursor-pointer border-2 ${
                    selectedPlan === plan.id
                      ? "border-blue-500 dark:border-blue-600"
                      : "border-transparent"
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <p className="text-muted-foreground text-sm mt-1">
                          {plan.description}
                        </p>
                      </div>
                      {plan.isMostPopular && (
                        <Badge className="bg-blue-600">Popular</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-6">
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.duration}</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${
                        plan.isMostPopular
                          ? "bg-blue-600 hover:bg-blue-700"
                          : ""
                      }`}
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      {plan.buttonLabel}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
