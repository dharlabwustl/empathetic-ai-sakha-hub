
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  DollarSign, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  Key,
  Globe,
  Smartphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'wallet' | 'bank' | 'crypto';
  enabled: boolean;
  countries: string[];
  fees: {
    percentage: number;
    fixed: number;
  };
  status: 'active' | 'inactive' | 'maintenance';
}

const PaymentIntegration: React.FC = () => {
  const { toast } = useToast();

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'card',
      name: 'Credit/Debit Cards',
      type: 'card',
      enabled: true,
      countries: ['US', 'IN', 'GB', 'CA'],
      fees: { percentage: 2.9, fixed: 0.30 },
      status: 'active'
    },
    {
      id: 'upi',
      name: 'UPI (India)',
      type: 'wallet',
      enabled: true,
      countries: ['IN'],
      fees: { percentage: 0, fixed: 0 },
      status: 'active'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'wallet',
      enabled: false,
      countries: ['US', 'GB', 'CA', 'AU'],
      fees: { percentage: 3.4, fixed: 0.35 },
      status: 'inactive'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      type: 'wallet',
      enabled: false,
      countries: ['US', 'GB', 'CA'],
      fees: { percentage: 2.9, fixed: 0.30 },
      status: 'inactive'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      type: 'wallet',
      enabled: true,
      countries: ['US', 'IN', 'GB'],
      fees: { percentage: 2.9, fixed: 0.30 },
      status: 'active'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      type: 'bank',
      enabled: false,
      countries: ['US', 'GB', 'IN'],
      fees: { percentage: 0.8, fixed: 0 },
      status: 'inactive'
    }
  ]);

  const togglePaymentMethod = (methodId: string) => {
    setPaymentMethods(prev => prev.map(method =>
      method.id === methodId
        ? { ...method, enabled: !method.enabled }
        : method
    ));

    toast({
      title: "Payment Method Updated",
      description: "Payment method status has been changed"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="h-5 w-5" />;
      case 'wallet':
        return <Smartphone className="h-5 w-5" />;
      case 'bank':
        return <DollarSign className="h-5 w-5" />;
      case 'crypto':
        return <Globe className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Integration Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="methods">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="gateways">Gateways</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="methods" className="space-y-4">
              <div className="grid gap-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            {getTypeIcon(method.type)}
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{method.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              {getStatusIcon(method.status)}
                              {getStatusBadge(method.status)}
                              <Badge variant="outline" className="text-xs">
                                {method.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              Fee: {method.fees.percentage}% + ${method.fees.fixed}
                            </div>
                            <div className="text-xs text-gray-500">
                              {method.countries.length} countries
                            </div>
                          </div>
                          <Switch
                            checked={method.enabled}
                            onCheckedChange={() => togglePaymentMethod(method.id)}
                          />
                        </div>
                      </div>

                      {method.enabled && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Supported Countries</Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {method.countries.map((country) => (
                                  <Badge key={country} variant="outline" className="text-xs">
                                    {country}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Processing Fee</Label>
                              <div className="text-sm text-gray-600 mt-1">
                                {method.fees.percentage}% + ${method.fees.fixed} per transaction
                              </div>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Settlement</Label>
                              <div className="text-sm text-gray-600 mt-1">
                                {method.type === 'card' ? '2-3 business days' :
                                 method.type === 'wallet' ? 'Instant' :
                                 method.type === 'bank' ? '1-2 business days' : 'Varies'}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="gateways" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Stripe Integration</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stripe-public">Publishable Key</Label>
                        <Input 
                          id="stripe-public"
                          type="password"
                          placeholder="pk_test_..."
                          defaultValue="pk_test_51234567890"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stripe-secret">Secret Key</Label>
                        <Input 
                          id="stripe-secret"
                          type="password"
                          placeholder="sk_test_..."
                          defaultValue="sk_test_51234567890"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                      <Input 
                        id="stripe-webhook"
                        type="password"
                        placeholder="whsec_..."
                        defaultValue="whsec_1234567890"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Test Mode</Label>
                        <p className="text-sm text-gray-500">Use test keys for development</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Razorpay Integration</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Not Connected</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="razorpay-key">Key ID</Label>
                        <Input 
                          id="razorpay-key"
                          placeholder="rzp_test_..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="razorpay-secret">Key Secret</Label>
                        <Input 
                          id="razorpay-secret"
                          type="password"
                          placeholder="Secret key..."
                        />
                      </div>
                    </div>
                    <Button variant="outline">Connect Razorpay</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>PayPal Integration</span>
                      <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="paypal-client">Client ID</Label>
                        <Input 
                          id="paypal-client"
                          placeholder="Client ID..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="paypal-secret">Client Secret</Label>
                        <Input 
                          id="paypal-secret"
                          type="password"
                          placeholder="Client secret..."
                        />
                      </div>
                    </div>
                    <Button variant="outline">Setup PayPal</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Payment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="default-currency">Default Currency</Label>
                      <select 
                        id="default-currency" 
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                        defaultValue="USD"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="INR">INR - Indian Rupee</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="payment-timeout">Payment Timeout (minutes)</Label>
                      <Input 
                        id="payment-timeout"
                        type="number"
                        defaultValue="15"
                        min="5"
                        max="60"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-capture Payments</Label>
                        <p className="text-sm text-gray-500">Automatically capture authorized payments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Send Receipt Emails</Label>
                        <p className="text-sm text-gray-500">Email receipts to customers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Save Payment Methods</Label>
                        <p className="text-sm text-gray-500">Allow customers to save payment methods</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable 3D Secure</Label>
                        <p className="text-sm text-gray-500">Additional authentication for card payments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Fraud Detection</Label>
                        <p className="text-sm text-gray-500">Automatically detect suspicious transactions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>IP Geolocation</Label>
                        <p className="text-sm text-gray-500">Block payments from restricted countries</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button>Save All Settings</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentIntegration;
