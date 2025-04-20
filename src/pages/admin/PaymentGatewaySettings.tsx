
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Check, CreditCard, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const PaymentGatewaySettings = () => {
  const { toast } = useToast();
  const [activeGateway, setActiveGateway] = useState<"razorpay" | "stripe">("razorpay");
  
  // Razorpay settings
  const [razorpaySettings, setRazorpaySettings] = useState({
    apiKey: "",
    secretKey: "",
    webhookSecret: "",
    isLive: false
  });
  
  // Stripe settings
  const [stripeSettings, setStripeSettings] = useState({
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
    isLive: false
  });
  
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);
  
  const handleSaveSettings = (gateway: "razorpay" | "stripe") => {
    // Here you would save the settings to your backend
    // For now, we'll just show a toast notification
    toast({
      title: "Settings Saved",
      description: `${gateway === "razorpay" ? "Razorpay" : "Stripe"} settings have been saved successfully.`,
    });
  };
  
  const handleTestConnection = (gateway: "razorpay" | "stripe") => {
    setIsTesting(true);
    setTestResult(null);
    
    // Simulating a connection test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% chance of success
      setTestResult(success ? "success" : "error");
      setIsTesting(false);
      
      toast({
        title: success ? "Connection Successful" : "Connection Failed",
        description: success 
          ? `Successfully connected to ${gateway === "razorpay" ? "Razorpay" : "Stripe"}.` 
          : `Failed to connect to ${gateway === "razorpay" ? "Razorpay" : "Stripe"}. Please check your API keys.`,
        variant: success ? "default" : "destructive",
      });
    }, 2000);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Gateway Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your payment gateway integration for subscription payments
            </p>
          </div>
        </div>
        
        <Tabs value={activeGateway} onValueChange={(value) => setActiveGateway(value as "razorpay" | "stripe")}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
          </TabsList>
          
          {/* Razorpay Settings */}
          <TabsContent value="razorpay" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Razorpay Settings</CardTitle>
                <CardDescription>
                  Configure your Razorpay integration for processing payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert 
                  className={razorpaySettings.isLive ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"}
                >
                  <AlertTriangle 
                    className={razorpaySettings.isLive ? "h-4 w-4 text-yellow-600" : "h-4 w-4 text-blue-600"} 
                  />
                  <AlertTitle className={razorpaySettings.isLive ? "text-yellow-800" : "text-blue-800"}>
                    {razorpaySettings.isLive ? "Live Mode Active" : "Test Mode Active"}
                  </AlertTitle>
                  <AlertDescription className={razorpaySettings.isLive ? "text-yellow-700" : "text-blue-700"}>
                    {razorpaySettings.isLive 
                      ? "You're using Razorpay in live mode. Real transactions will be processed." 
                      : "You're using Razorpay in test mode. No real transactions will be processed."
                    }
                  </AlertDescription>
                </Alert>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="razorpay-mode" 
                    checked={razorpaySettings.isLive}
                    onCheckedChange={(checked) => 
                      setRazorpaySettings({...razorpaySettings, isLive: checked})
                    }
                  />
                  <Label htmlFor="razorpay-mode">
                    {razorpaySettings.isLive ? "Live Mode" : "Test Mode"}
                  </Label>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="razorpay-key-id">API Key ID</Label>
                    <Input
                      id="razorpay-key-id"
                      placeholder="rzp_live_XXXXXXXXXXXXXXX or rzp_test_XXXXXXXXXXXXXXX"
                      value={razorpaySettings.apiKey}
                      onChange={(e) => setRazorpaySettings({...razorpaySettings, apiKey: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="razorpay-key-secret">API Key Secret</Label>
                    <Input
                      id="razorpay-key-secret"
                      type="password"
                      placeholder="••••••••••••••••••••••••••"
                      value={razorpaySettings.secretKey}
                      onChange={(e) => setRazorpaySettings({...razorpaySettings, secretKey: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="razorpay-webhook-secret">Webhook Secret</Label>
                    <Input
                      id="razorpay-webhook-secret"
                      type="password"
                      placeholder="••••••••••••••••••••••••••"
                      value={razorpaySettings.webhookSecret}
                      onChange={(e) => setRazorpaySettings({...razorpaySettings, webhookSecret: e.target.value})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => handleTestConnection("razorpay")}
                    disabled={!razorpaySettings.apiKey || !razorpaySettings.secretKey || isTesting}
                    className="flex items-center gap-2"
                  >
                    {isTesting && activeGateway === "razorpay" ? "Testing..." : "Test Connection"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleSaveSettings("razorpay")}
                    disabled={!razorpaySettings.apiKey || !razorpaySettings.secretKey}
                  >
                    Save Settings
                  </Button>
                </div>
                
                {testResult && activeGateway === "razorpay" && (
                  <div className={`mt-4 p-4 rounded-md flex items-start gap-3 ${
                    testResult === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}>
                    {testResult === "success" ? 
                      <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    }
                    <div>
                      <h4 className="font-semibold">
                        {testResult === "success" ? "Connection Successful" : "Connection Failed"}
                      </h4>
                      <p className="text-sm mt-1">
                        {testResult === "success" 
                          ? "The API keys are valid and Razorpay is properly connected." 
                          : "Could not connect to Razorpay. Please check your API keys and try again."
                        }
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Stripe Settings */}
          <TabsContent value="stripe" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Stripe Settings</CardTitle>
                <CardDescription>
                  Configure your Stripe integration for processing payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert 
                  className={stripeSettings.isLive ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"}
                >
                  <AlertTriangle 
                    className={stripeSettings.isLive ? "h-4 w-4 text-yellow-600" : "h-4 w-4 text-blue-600"} 
                  />
                  <AlertTitle className={stripeSettings.isLive ? "text-yellow-800" : "text-blue-800"}>
                    {stripeSettings.isLive ? "Live Mode Active" : "Test Mode Active"}
                  </AlertTitle>
                  <AlertDescription className={stripeSettings.isLive ? "text-yellow-700" : "text-blue-700"}>
                    {stripeSettings.isLive 
                      ? "You're using Stripe in live mode. Real transactions will be processed." 
                      : "You're using Stripe in test mode. No real transactions will be processed."
                    }
                  </AlertDescription>
                </Alert>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="stripe-mode" 
                    checked={stripeSettings.isLive}
                    onCheckedChange={(checked) => 
                      setStripeSettings({...stripeSettings, isLive: checked})
                    }
                  />
                  <Label htmlFor="stripe-mode">
                    {stripeSettings.isLive ? "Live Mode" : "Test Mode"}
                  </Label>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stripe-publishable-key">Publishable Key</Label>
                    <Input
                      id="stripe-publishable-key"
                      placeholder="pk_live_XXXXXXXXXXXXXXX or pk_test_XXXXXXXXXXXXXXX"
                      value={stripeSettings.publishableKey}
                      onChange={(e) => setStripeSettings({...stripeSettings, publishableKey: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stripe-secret-key">Secret Key</Label>
                    <Input
                      id="stripe-secret-key"
                      type="password"
                      placeholder="••••••••••••••••••••••••••"
                      value={stripeSettings.secretKey}
                      onChange={(e) => setStripeSettings({...stripeSettings, secretKey: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stripe-webhook-secret">Webhook Secret</Label>
                    <Input
                      id="stripe-webhook-secret"
                      type="password"
                      placeholder="••••••••••••••••••••••••••"
                      value={stripeSettings.webhookSecret}
                      onChange={(e) => setStripeSettings({...stripeSettings, webhookSecret: e.target.value})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => handleTestConnection("stripe")}
                    disabled={!stripeSettings.publishableKey || !stripeSettings.secretKey || isTesting}
                    className="flex items-center gap-2"
                  >
                    {isTesting && activeGateway === "stripe" ? "Testing..." : "Test Connection"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => handleSaveSettings("stripe")}
                    disabled={!stripeSettings.publishableKey || !stripeSettings.secretKey}
                  >
                    Save Settings
                  </Button>
                </div>
                
                {testResult && activeGateway === "stripe" && (
                  <div className={`mt-4 p-4 rounded-md flex items-start gap-3 ${
                    testResult === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}>
                    {testResult === "success" ? 
                      <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    }
                    <div>
                      <h4 className="font-semibold">
                        {testResult === "success" ? "Connection Successful" : "Connection Failed"}
                      </h4>
                      <p className="text-sm mt-1">
                        {testResult === "success" 
                          ? "The API keys are valid and Stripe is properly connected." 
                          : "Could not connect to Stripe. Please check your API keys and try again."
                        }
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default PaymentGatewaySettings;
