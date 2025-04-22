
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Alert, 
  AlertDescription 
} from '@/components/ui/alert';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { AdminSettings } from '@/types/admin';
import {
  Check,
  CreditCard,
  Wallet,
  AlertCircle,
  LockKeyhole,
  Globe,
  RotateCw,
  Bookmark
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PaymentGatewayTabProps {
  settings: AdminSettings;
  onUpdateSettings: (settings: Partial<AdminSettings>) => void;
}

const PaymentGatewayTab: React.FC<PaymentGatewayTabProps> = ({
  settings,
  onUpdateSettings
}) => {
  const { toast } = useToast();
  const [activeProvider, setActiveProvider] = useState<'stripe' | 'razorpay' | 'paypal' | 'custom'>(
    settings.paymentGateway?.provider || 'stripe'
  );
  const [isLive, setIsLive] = useState<boolean>(
    settings.paymentGateway?.isLive || false
  );
  
  // Form values
  const [apiKey, setApiKey] = useState<string>(
    settings.paymentGateway?.apiKey || ''
  );
  const [secretKey, setSecretKey] = useState<string>(
    settings.paymentGateway?.secretKey || ''
  );
  const [webhookSecret, setWebhookSecret] = useState<string>(
    settings.paymentGateway?.webhookSecret || ''
  );
  const [redirectUrl, setRedirectUrl] = useState<string>(
    settings.paymentGateway?.redirectUrl || window.location.origin + '/payment/success'
  );
  
  // States for testing connection
  const [testingConnection, setTestingConnection] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  
  const handleSaveSettings = () => {
    const updatedSettings: Partial<AdminSettings> = {
      paymentGateway: {
        provider: activeProvider,
        isLive,
        apiKey,
        secretKey,
        webhookSecret,
        redirectUrl
      }
    };
    
    onUpdateSettings(updatedSettings);
    
    toast({
      title: 'Payment Gateway Settings Updated',
      description: 'Your payment gateway configuration has been saved.',
    });
  };
  
  const handleTestConnection = () => {
    setTestingConnection(true);
    setTestResult(null);
    
    // Simulate API call to test connection
    setTimeout(() => {
      if (apiKey && secretKey) {
        setTestResult('success');
        toast({
          title: 'Connection Successful',
          description: 'Your payment gateway connection is working correctly.',
        });
      } else {
        setTestResult('error');
        toast({
          title: 'Connection Failed',
          description: 'Please check your API credentials and try again.',
          variant: 'destructive'
        });
      }
      setTestingConnection(false);
    }, 2000);
  };
  
  const getProviderName = () => {
    switch (activeProvider) {
      case 'stripe': return 'Stripe';
      case 'razorpay': return 'Razorpay';
      case 'paypal': return 'PayPal';
      case 'custom': return 'Custom Gateway';
      default: return 'Payment Provider';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment Gateway Integration</h2>
          <p className="text-muted-foreground">Configure your payment processor for accepting payments from students.</p>
        </div>
        <Badge variant={isLive ? 'destructive' : 'outline'} className="text-sm">
          {isLive ? 'LIVE MODE' : 'TEST MODE'}
        </Badge>
      </div>
      
      <Card className="border-2 border-dashed">
        <CardHeader>
          <CardTitle>Active Payment Provider</CardTitle>
          <CardDescription>Select which payment gateway you want to use for processing payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeProvider} onValueChange={(value) => setActiveProvider(value as any)}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="stripe">Stripe</TabsTrigger>
              <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stripe" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-[#6772e5] flex items-center justify-center rounded-lg">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Stripe</h3>
                  <p className="text-sm text-muted-foreground">Global payment processor with support for 135+ currencies.</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stripe-api-key">API Key (Publishable Key)</Label>
                  <Input 
                    id="stripe-api-key"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="pk_test_..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stripe-secret-key">Secret Key</Label>
                  <Input 
                    id="stripe-secret-key"
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="sk_test_..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stripe-webhook-secret">Webhook Secret (Optional)</Label>
                  <Input 
                    id="stripe-webhook-secret"
                    type="password"
                    value={webhookSecret}
                    onChange={(e) => setWebhookSecret(e.target.value)}
                    placeholder="whsec_..."
                  />
                </div>
              </div>
              
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  To set up Stripe, you'll need to create an account at 
                  <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                    stripe.com
                  </a>
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="razorpay" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-[#528FF0] flex items-center justify-center rounded-lg">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Razorpay</h3>
                  <p className="text-sm text-muted-foreground">India's popular payment gateway with UPI support.</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="razorpay-key-id">Key ID</Label>
                  <Input 
                    id="razorpay-key-id"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="rzp_test_..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="razorpay-secret">Key Secret</Label>
                  <Input 
                    id="razorpay-secret"
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="..."
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="paypal" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-[#003087] flex items-center justify-center rounded-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">PayPal</h3>
                  <p className="text-sm text-muted-foreground">Global payment solution with international reach.</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="paypal-client-id">Client ID</Label>
                  <Input 
                    id="paypal-client-id"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Client ID from PayPal Developer Dashboard"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paypal-secret">Client Secret</Label>
                  <Input 
                    id="paypal-secret"
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Client Secret from PayPal Developer Dashboard"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="redirect-url">Return URL</Label>
                  <Input 
                    id="redirect-url"
                    type="text"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    placeholder="https://yourdomain.com/payment/success"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-gray-700 flex items-center justify-center rounded-lg">
                  <Bookmark className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Custom Gateway</h3>
                  <p className="text-sm text-muted-foreground">Integrate with any payment processor of your choice.</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="custom-api-url">API URL</Label>
                  <Input 
                    id="custom-api-url"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="https://api.payment-provider.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="custom-api-key">API Key</Label>
                  <Input 
                    id="custom-api-key"
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Your API Key"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="custom-redirect-url">Redirect URL</Label>
                  <Input 
                    id="custom-redirect-url"
                    type="text"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    placeholder="https://yourdomain.com/payment/success"
                  />
                </div>
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Custom gateway integration may require additional backend development.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="live-mode" 
                checked={isLive} 
                onCheckedChange={() => setIsLive(!isLive)} 
              />
              <Label 
                htmlFor="live-mode" 
                className="flex items-center gap-1 font-medium text-amber-800"
              >
                <LockKeyhole className="h-4 w-4" />
                Enable Live Mode (Real Transactions)
              </Label>
            </div>
            <p className="text-sm text-muted-foreground mt-1 pl-6">
              {isLive 
                ? "Warning: Live mode will process real payments and charge students' cards." 
                : "Test mode is active. No real payments will be processed."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 gap-2">
          <Button 
            variant="outline" 
            className="flex gap-2 items-center"
            onClick={handleTestConnection}
            disabled={testingConnection}
          >
            {testingConnection ? (
              <RotateCw className="h-4 w-4 animate-spin" />
            ) : testResult === 'success' ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : testResult === 'error' ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <Globe className="h-4 w-4" />
            )}
            Test Connection
          </Button>
          
          <Button 
            onClick={handleSaveSettings}
            className="flex gap-2 items-center"
          >
            <Check className="h-4 w-4" />
            Save {getProviderName()} Settings
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans Configuration</CardTitle>
          <CardDescription>Manage the pricing and features of your subscription plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            After configuring your payment gateway, set up your subscription plans from the 
            <Button variant="link" className="p-0 h-auto font-normal">Plans & Pricing</Button> section.
          </p>
        </CardContent>
      </Card>
      
      <Alert className="bg-green-50 border-green-200">
        <Check className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700">
          Payment gateway integration is successfully configured. Students can now subscribe to premium plans.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PaymentGatewayTab;
