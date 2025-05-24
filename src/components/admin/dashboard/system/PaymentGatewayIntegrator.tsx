
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  CreditCard, 
  Key, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface APIKey {
  id: string;
  name: string;
  key: string;
  service: string;
  environment: 'test' | 'production';
  status: 'active' | 'inactive';
  createdAt: string;
  lastUsed?: string;
}

interface PaymentGateway {
  id: string;
  name: string;
  enabled: boolean;
  testMode: boolean;
  configuration: Record<string, any>;
  status: 'connected' | 'disconnected' | 'error';
}

const PaymentGatewayIntegrator: React.FC = () => {
  const { toast } = useToast();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('gateways');

  // Mock data
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      enabled: true,
      testMode: true,
      configuration: {
        publicKey: 'pk_test_...',
        secretKey: 'sk_test_...',
        webhookSecret: 'whsec_...'
      },
      status: 'connected'
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      enabled: false,
      testMode: true,
      configuration: {
        keyId: 'rzp_test_...',
        keySecret: 'secret_...'
      },
      status: 'disconnected'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      enabled: false,
      testMode: true,
      configuration: {},
      status: 'disconnected'
    }
  ]);

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'OpenAI API Key',
      key: 'sk-proj-abcd1234...',
      service: 'AI Model',
      environment: 'production',
      status: 'active',
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20'
    },
    {
      id: '2',
      name: 'Stripe Secret Key',
      key: 'sk_test_51xyz...',
      service: 'Payment Gateway',
      environment: 'test',
      status: 'active',
      createdAt: '2024-01-10',
      lastUsed: '2024-01-20'
    },
    {
      id: '3',
      name: 'Content Management API',
      key: 'cm_live_abc123...',
      service: 'Content Management',
      environment: 'production',
      status: 'active',
      createdAt: '2024-01-05',
      lastUsed: '2024-01-19'
    }
  ]);

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return '••••••••';
    return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
  };

  const handleGatewayToggle = (gatewayId: string) => {
    setPaymentGateways(prev => prev.map(gateway => 
      gateway.id === gatewayId 
        ? { ...gateway, enabled: !gateway.enabled }
        : gateway
    ));
    
    toast({
      title: "Gateway Updated",
      description: "Payment gateway status has been updated"
    });
  };

  const handleTestConnection = (gatewayId: string) => {
    toast({
      title: "Testing Connection",
      description: "Testing payment gateway connection..."
    });
    
    // Simulate connection test
    setTimeout(() => {
      setPaymentGateways(prev => prev.map(gateway => 
        gateway.id === gatewayId 
          ? { ...gateway, status: 'connected' }
          : gateway
      ));
      
      toast({
        title: "Connection Successful",
        description: "Payment gateway is working correctly"
      });
    }, 2000);
  };

  const handleAddAPIKey = () => {
    toast({
      title: "Add API Key",
      description: "API key addition form would open here"
    });
  };

  const handleDeleteAPIKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast({
      title: "API Key Deleted",
      description: "API key has been removed from the system"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Inactive</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Gateway & API Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="gateways" className="space-y-6">
            <div className="space-y-4">
              {paymentGateways.map((gateway) => (
                <Card key={gateway.id} className="border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {gateway.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{gateway.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusIcon(gateway.status)}
                            {getStatusBadge(gateway.status)}
                            {gateway.testMode && (
                              <Badge variant="outline" className="text-xs">Test Mode</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`enable-${gateway.id}`} className="text-sm">
                            Enable
                          </Label>
                          <Switch
                            id={`enable-${gateway.id}`}
                            checked={gateway.enabled}
                            onCheckedChange={() => handleGatewayToggle(gateway.id)}
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTestConnection(gateway.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>

                    {gateway.enabled && Object.keys(gateway.configuration).length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">Configuration</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Object.entries(gateway.configuration).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <code className="text-xs text-gray-600">{typeof value === 'string' ? maskKey(value) : JSON.stringify(value)}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="api-keys" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">API Keys Management</h3>
              <Button onClick={handleAddAPIKey}>
                <Plus className="h-4 w-4 mr-2" />
                Add API Key
              </Button>
            </div>

            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Key className="h-4 w-4 text-blue-500" />
                          <h4 className="font-medium">{apiKey.name}</h4>
                          {getStatusBadge(apiKey.status)}
                          <Badge variant="outline" className="text-xs">
                            {apiKey.environment}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Service: {apiKey.service}</span>
                          <span>Created: {apiKey.createdAt}</span>
                          {apiKey.lastUsed && <span>Last used: {apiKey.lastUsed}</span>}
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                            {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {showKeys[apiKey.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteAPIKey(apiKey.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <select id="currency" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                      <option value="USD">USD - US Dollar</option>
                      <option value="INR">INR - Indian Rupee</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input 
                      id="webhook-url" 
                      placeholder="https://your-domain.com/webhook"
                      defaultValue="https://prepexamly.com/api/webhook"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Test Mode</Label>
                      <p className="text-sm text-gray-500">Use test keys for development</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-retry Failed Payments</Label>
                      <p className="text-sm text-gray-500">Automatically retry failed payment attempts</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Send Payment Notifications</Label>
                      <p className="text-sm text-gray-500">Email notifications for payment events</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Integration Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ai-service-url">AI Model Service URL</Label>
                  <Input 
                    id="ai-service-url" 
                    placeholder="https://api.openai.com/v1"
                    defaultValue="https://api.openai.com/v1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content-service-url">Content Management Service URL</Label>
                  <Input 
                    id="content-service-url" 
                    placeholder="https://your-cms-api.com"
                    defaultValue="https://cms.prepexamly.com/api"
                  />
                </div>
                
                <div>
                  <Label htmlFor="study-plan-service">Study Plan Service URL</Label>
                  <Input 
                    id="study-plan-service" 
                    placeholder="https://study-plan-api.com"
                    defaultValue="https://studyplan.prepexamly.com/api"
                  />
                </div>

                <div>
                  <Label htmlFor="webhook-endpoints">Webhook Endpoints</Label>
                  <Textarea 
                    id="webhook-endpoints"
                    placeholder="Enter webhook endpoints (one per line)"
                    rows={4}
                    defaultValue="https://prepexamly.com/api/webhook/payment
https://prepexamly.com/api/webhook/subscription
https://prepexamly.com/api/webhook/content"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentGatewayIntegrator;
