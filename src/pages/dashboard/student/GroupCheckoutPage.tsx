
import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CreditCard, 
  Shield, 
  Calendar, 
  ArrowRight, 
  Loader2,
  CheckCircle 
} from 'lucide-react';

interface GroupCheckoutPageProps {
  invitees?: string[];
  inviteCodes?: string[];
}

const GroupCheckoutPage = ({ invitees, inviteCodes }: GroupCheckoutPageProps) => {
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
  } = useStudentDashboard();
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [invited, setInvited] = useState<string[]>(invitees || []);
  const [codes, setCodes] = useState<string[]>(inviteCodes || []);
  
  // Payment form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // Calculate price
  const pricePerUser = 999;
  const totalUsers = 5; // Fixed at 5 for group plan
  const totalPrice = pricePerUser * totalUsers;
  const discount = totalPrice * 0.1; // 10% discount for group
  const finalPrice = totalPrice - discount;
  
  useEffect(() => {
    // Check if we have invitees from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const emailsParam = urlParams.get('emails');
    const codesParam = urlParams.get('codes');
    
    if (emailsParam) {
      setInvited(emailsParam.split(','));
    }
    
    if (codesParam) {
      setCodes(codesParam.split(','));
    }
    
    // If we don't have enough invited users, generate placeholder emails
    if (!invited.length && !invitees?.length) {
      // Generate 4 placeholder emails
      setInvited(Array(4).fill('').map((_, i) => `user${i+1}@example.com`));
    }
    
    // If we don't have codes, generate them
    if (!codes.length && !inviteCodes?.length) {
      setCodes(
        Array(5).fill(0).map(() => 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase())
      );
    }
    
    // For demo purposes only - generate a random card number
    setCardNumber('4111 1111 1111 1111');
  }, [invitees, inviteCodes]);
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    
    return v;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardNumber(value);
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatExpiryDate(e.target.value);
    setCardExpiry(value);
  };
  
  const handleSubmitPayment = () => {
    // Validation
    if (!cardName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the cardholder name",
        variant: "destructive",
      });
      return;
    }
    
    if (cardNumber.replace(/\s/g, '').length < 16) {
      toast({
        title: "Invalid Card",
        description: "Please enter a valid card number",
        variant: "destructive",
      });
      return;
    }
    
    if (cardExpiry.length < 5) {
      toast({
        title: "Invalid Expiry",
        description: "Please enter a valid expiry date (MM/YY)",
        variant: "destructive",
      });
      return;
    }
    
    if (cardCvc.length < 3) {
      toast({
        title: "Invalid CVC",
        description: "Please enter a valid CVC code",
        variant: "destructive",
      });
      return;
    }
    
    // Process payment
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      toast({
        title: "Payment Successful!",
        description: "Your group plan has been activated successfully.",
        variant: "default",
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        // Construct URL with query params
        const queryParams = new URLSearchParams({
          'plan': 'group-activated',
          'codes': codes.join(','),
          'emails': invited.join(','),
        }).toString();
        
        navigate(`/dashboard/student/subscription?${queryParams}`);
      }, 2000);
    }, 2000);
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
          <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Group Pro Plan for 5 Users
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Group Pro Plan</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">5 Users • Monthly</div>
                  </div>
                  <div className="font-medium">₹{totalPrice.toLocaleString()}</div>
                </div>
                
                <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                  <div>Group Discount</div>
                  <div>-₹{discount.toLocaleString()}</div>
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center font-bold">
                  <div>Total</div>
                  <div>₹{finalPrice.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Invitees</CardTitle>
                <CardDescription>
                  These users will receive invitation codes once payment is complete
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {invited.map((email, index) => (
                  <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm flex justify-between items-center">
                    <span>{email}</span>
                    <span className="text-xs text-gray-500 font-mono">
                      {codes[index] || '(Code pending)'}
                    </span>
                  </div>
                ))}
                
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
                  <div className="font-medium">You (Batch Leader)</div>
                  <div className="text-xs mt-1">
                    Your account will be automatically added to this group
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Enter your card details to complete your subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {paymentComplete ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4">
                      <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Payment Successful!</h3>
                    <p className="text-center text-gray-600 dark:text-gray-300 mt-2 max-w-md">
                      Your Group Pro plan has been activated. You will be redirected to manage your batch in a moment.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Smith"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <div className="relative">
                          <Input 
                            id="card-number" 
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                          />
                          <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <div className="relative">
                            <Input 
                              id="expiry" 
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              maxLength={5}
                            />
                            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <div className="relative">
                            <Input 
                              id="cvc" 
                              placeholder="123"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                              maxLength={3}
                            />
                            <Shield className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Billing Country</Label>
                        <Select defaultValue="in">
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm text-gray-600 dark:text-gray-300">
                      <p>
                        By proceeding, you agree to our <a href="/terms" className="underline text-blue-600 dark:text-blue-400">Terms of Service</a> and authorize Sakha to charge your card for the subscription. 
                        You can cancel or change your subscription at any time.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                {!paymentComplete && (
                  <Button 
                    className="w-full bg-gradient-to-r from-sakha-blue to-sakha-purple" 
                    size="lg"
                    onClick={handleSubmitPayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : (
                      <>
                        Complete Payment <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GroupCheckoutPage;
