
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { UserProfileType } from "@/types/user/base";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard, Download, ArrowRight, Crown, AlertTriangle } from "lucide-react";

interface ProfileBillingSectionProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileBillingSection: React.FC<ProfileBillingSectionProps> = ({
  userProfile,
  onUpdateProfile
}) => {
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "Free",
      features: [
        "Access to basic study materials",
        "Limited practice questions",
        "Basic progress tracking"
      ],
      current: userProfile.subscription?.plan === "basic"
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹999/month",
      features: [
        "Full access to all study materials",
        "Unlimited practice questions",
        "Advanced progress tracking",
        "24/7 AI tutor assistance",
        "Personalized study plans"
      ],
      current: userProfile.subscription?.plan === "premium"
    },
    {
      id: "elite",
      name: "Elite",
      price: "₹1,999/month",
      features: [
        "Everything in Premium",
        "1-on-1 expert sessions",
        "Mock tests with detailed analysis",
        "Priority support",
        "Guaranteed improvement"
      ],
      current: userProfile.subscription?.plan === "elite"
    }
  ];
  
  const invoices = [
    { id: "INV-001", date: "Apr 01, 2025", amount: "₹999", status: "Paid", plan: "Premium" },
    { id: "INV-002", date: "Mar 01, 2025", amount: "₹999", status: "Paid", plan: "Premium" },
    { id: "INV-003", date: "Feb 01, 2025", amount: "₹999", status: "Paid", plan: "Premium" }
  ];
  
  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setShowUpgradeDialog(true);
  };
  
  const handleConfirmUpgrade = () => {
    // In a real app, this would redirect to a payment gateway
    toast({
      title: "Plan upgraded",
      description: `You have successfully upgraded to the ${selectedPlan} plan.`
    });
    
    // Update the user profile
    onUpdateProfile({
      subscription: {
        ...userProfile.subscription!,
        plan: selectedPlan,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    });
    
    setShowUpgradeDialog(false);
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice downloaded",
      description: `Invoice ${invoiceId} has been downloaded.`
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Billing & Plans</h2>
      
      {/* Current Subscription */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between">
            <div>
              <div className="text-lg font-medium flex items-center">
                <Crown className="h-5 w-5 mr-1 text-amber-500" />
                {userProfile.subscription?.plan?.charAt(0).toUpperCase() + 
                 userProfile.subscription?.plan?.slice(1)} Plan
              </div>
              <p className="text-sm text-muted-foreground">
                {userProfile.subscription?.status === "active" 
                  ? `Expires on ${new Date(userProfile.subscription?.expiresAt).toLocaleDateString()}`
                  : "Not active"
                }
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button onClick={() => setShowUpgradeDialog(true)}>
                Upgrade Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Plan Comparison */}
      <div>
        <h3 className="text-lg font-medium mb-4">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={plan.current ? "border-primary" : ""}
            >
              <CardHeader className={plan.current ? "bg-primary-foreground" : ""}>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.price}</CardDescription>
                {plan.current && (
                  <Badge className="absolute top-2 right-2 bg-primary">Current</Badge>
                )}
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={plan.current ? "outline" : "default"} 
                  className="w-full"
                  disabled={plan.current}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Billing History */}
      <div>
        <h3 className="text-lg font-medium mb-4">Billing History</h3>
        <Card>
          <CardContent className="p-0">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3">Invoice</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Plan</th>
                    <th scope="col" className="px-6 py-3">Amount</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium">{invoice.id}</td>
                      <td className="px-6 py-4">{invoice.date}</td>
                      <td className="px-6 py-4">{invoice.plan}</td>
                      <td className="px-6 py-4">{invoice.amount}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">XXXX XXXX XXXX 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade to {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan</DialogTitle>
            <DialogDescription>
              Upgrade your plan to access more features and get a better learning experience.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
              <p className="font-medium">Selected Plan:</p>
              <p className="text-xl font-bold mt-1">
                {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
              </p>
              
              <p className="mt-2 font-medium">Price:</p>
              <p className="text-xl font-bold text-primary">
                {selectedPlan === "basic" ? "Free" : 
                 selectedPlan === "premium" ? "₹999/month" :
                 selectedPlan === "elite" ? "₹1,999/month" : "Custom"}
              </p>
            </div>
            
            <Alert>
              <AlertDescription className="flex items-start text-sm">
                <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                By proceeding, you agree to our terms of service and that you'll be charged the plan amount.
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmUpgrade} className="flex items-center">
              Proceed to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileBillingSection;
