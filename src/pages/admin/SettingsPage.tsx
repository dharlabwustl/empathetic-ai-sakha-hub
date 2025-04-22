import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRight, RefreshCcw, Save, Upload, Trash2, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

const initialSettings: AdminSettings = {
  siteName: "Sakha AI Learning Platform",
  siteDescription: "AI-powered personalized learning platform for students",
  contactEmail: "admin@sakha-ai.com",
  enableRegistration: true,
  enableGuestCheckout: false,
  maintenanceMode: false,
  theme: "light",
  features: {
    tutorChat: true,
    feelGood: true,
    moodTracking: true,
    surroundingInfluences: true
  },
  flaskApiUrl: "https://api.sakha-ai.com",
  apiKey: "sk_test_sample_key_123456",
  aiModels: ["gpt-3.5-turbo", "gpt-4"],
  notificationSettings: {
    newUserSignup: true,
    paymentReceived: true,
    systemAlerts: true
  },
  contentApprovalRequired: false
};

const SettingsPage = () => {
  const { adminUser } = useAdminAuth();
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentProviders, setPaymentProviders] = useState([
    { id: "stripe", name: "Stripe", configured: false, testMode: true },
    { id: "razorpay", name: "Razorpay", configured: false, testMode: true },
    { id: "paypal", name: "PayPal", configured: false, testMode: true }
  ]);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleConfigurePayment = (providerId: string) => {
    // Find provider and toggle configured state
    setPaymentProviders(providers => providers.map(p => 
      p.id === providerId ? { ...p, configured: !p.configured } : p
    ));
    
    toast({
      title: "Payment Provider Updated",
      description: `Configuration ${providerId === 'stripe' ? 'saved' : 'updated'} successfully.`,
    });
  };

  const handleTestModeToggle = (providerId: string) => {
    setPaymentProviders(providers => providers.map(p => 
      p.id === providerId ? { ...p, testMode: !p.testMode } : p
    ));
  };

  if (!adminUser) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>
              You must be logged in as an administrator to view this page.
            </AlertDescription>
          </Alert>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Platform Settings</h1>
          <Button 
            onClick={handleSaveSettings} 
            disabled={isSaving}
            className={showSuccess ? "bg-green-600" : ""}
          >
            {isSaving ? (
              "Saving..."
            ) : showSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Saved
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>

        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full border-b rounded-none grid grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="api">API Settings</TabsTrigger>
              <TabsTrigger value="payments">Payment Gateways</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="p-6">
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input 
                      id="siteName" 
                      value={settings.siteName}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input 
                      id="siteDescription" 
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input 
                      id="contactEmail" 
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableRegistration">Enable User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new users to register for accounts</p>
                    </div>
                    <Switch 
                      id="enableRegistration"
                      checked={settings.enableRegistration}
                      onCheckedChange={(checked) => setSettings({...settings, enableRegistration: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableGuestCheckout">Enable Guest Checkout</Label>
                      <p className="text-sm text-muted-foreground">Allow users to checkout without an account</p>
                    </div>
                    <Switch 
                      id="enableGuestCheckout"
                      checked={settings.enableGuestCheckout}
                      onCheckedChange={(checked) => setSettings({...settings, enableGuestCheckout: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Take the site offline for maintenance</p>
                    </div>
                    <Switch 
                      id="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Site Theme</Label>
                    <Select 
                      value={settings.theme} 
                      onValueChange={(value) => setSettings({...settings, theme: value as "light" | "dark" | "system"})}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Feature Controls</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featureTutorChat">AI Tutor Chat</Label>
                      <p className="text-sm text-muted-foreground">Enable 24/7 AI tutoring feature</p>
                    </div>
                    <Switch 
                      id="featureTutorChat"
                      checked={settings.features.tutorChat}
                      onCheckedChange={(checked) => 
                        setSettings({
                          ...settings, 
                          features: {...settings.features, tutorChat: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featureFeelGood">Feel Good Corner</Label>
                      <p className="text-sm text-muted-foreground">Enable feel good corner for mental wellbeing</p>
                    </div>
                    <Switch 
                      id="featureFeelGood"
                      checked={settings.features.feelGood}
                      onCheckedChange={(checked) => 
                        setSettings({
                          ...settings, 
                          features: {...settings.features, feelGood: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featureMoodTracking">Mood Tracking</Label>
                      <p className="text-sm text-muted-foreground">Enable mood tracking and analysis</p>
                    </div>
                    <Switch 
                      id="featureMoodTracking"
                      checked={settings.features.moodTracking}
                      onCheckedChange={(checked) => 
                        setSettings({
                          ...settings, 
                          features: {...settings.features, moodTracking: checked}
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featureSurroundingInfluences">Surrounding Influences</Label>
                      <p className="text-sm text-muted-foreground">Enable surrounding influences tracking</p>
                    </div>
                    <Switch 
                      id="featureSurroundingInfluences"
                      checked={settings.features.surroundingInfluences}
                      onCheckedChange={(checked) => 
                        setSettings({
                          ...settings, 
                          features: {...settings.features, surroundingInfluences: checked}
                        })
                      }
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Content Controls</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="contentApprovalRequired">Content Approval Required</Label>
                      <p className="text-sm text-muted-foreground">Require approval for user-generated content</p>
                    </div>
                    <Switch 
                      id="contentApprovalRequired"
                      checked={settings.contentApprovalRequired}
                      onCheckedChange={(checked) => 
                        setSettings({
                          ...settings, 
                          contentApprovalRequired: checked
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="p-6">
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="flaskApiUrl">API Endpoint URL</Label>
                    <Input 
                      id="flaskApiUrl" 
                      value={settings.flaskApiUrl}
                      onChange={(e) => setSettings({...settings, flaskApiUrl: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input 
                      id="apiKey"
                      type="password"
                      value={settings.apiKey}
                      onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>AI Models</Label>
                    <div className="flex flex-wrap gap-2">
                      {settings.aiModels?.map((model, index) => (
                        <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                          {model}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    API keys are sensitive. Make sure they are stored securely and not exposed in client-side code.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
            
            <TabsContent value="payments" className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Payment Gateway Integration</h3>
                <p className="text-muted-foreground">
                  Configure payment gateways to process subscriptions and payments.
                </p>
                
                <div className="space-y-6">
                  {paymentProviders.map(provider => (
                    <Card key={provider.id} className={`p-4 border ${provider.configured ? 'border-green-200' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h4 className="text-lg font-medium flex items-center">
                            {provider.name}
                            {provider.configured && (
                              <Badge className="ml-2 bg-green-100 text-green-700 border-green-200">
                                <Check className="h-3.5 w-3.5 mr-1" />
                                Configured
                              </Badge>
                            )}
                          </h4>
                          
                          {provider.configured ? (
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">
                                Integration is active and ready to process payments.
                              </p>
                              
                              <div className="flex items-center mt-2">
                                <Label htmlFor={`${provider.id}-test-mode`} className="text-sm mr-2">
                                  Test Mode
                                </Label>
                                <Switch
                                  id={`${provider.id}-test-mode`}
                                  checked={provider.testMode}
                                  onCheckedChange={() => handleTestModeToggle(provider.id)}
                                />
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Configure {provider.name} to enable payments.
                            </p>
                          )}
                        </div>
                        
                        <Button 
                          variant={provider.configured ? "outline" : "default"}
                          onClick={() => handleConfigurePayment(provider.id)}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          {provider.configured ? "Edit Configuration" : "Configure"}
                        </Button>
                      </div>
                      
                      {provider.configured && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-md">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs">API Key</Label>
                              <div className="bg-white border rounded-md px-2 py-1 text-sm mt-1">
                                •••••••••••••••••
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">Webhook URL</Label>
                              <div className="bg-white border rounded-md px-2 py-1 text-sm mt-1 font-mono text-xs">
                                https://sakha-ai.com/api/webhooks/{provider.id}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
                
                <Alert>
                  <AlertDescription>
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p>Make sure to complete the payment gateway configuration in both test and live modes.</p>
                        <p className="text-sm mt-1">Webhook endpoints need to be configured at the payment provider's dashboard as well.</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Notification Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifyNewUsers">New User Signup</Label>
                      <p className="text-sm text-muted-foreground">Notify when new users register</p>
                    </div>
                    <Switch 
                      id="notifyNewUsers"
                      checked={settings.notificationSettings?.newUserSignup || false}
                      onCheckedChange={(checked) => 
                        setSettings({
                          ...settings, 
                          notificationSettings: {
                            ...settings.notificationSettings!,
                            newUserSignup: checked
                          }
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifyPaymentReceived">Payment Received</Label>
                      <p className="text-sm text-muted-foreground">Notify when payments are processed</p>
                    </div>
                    <Switch 
                      id="notifyPaymentReceived"
                      checked={settings.notificationSettings?.paymentReceived || false}
                      onCheckedChange={(checked) => 
                        setSettings({
                          ...settings, 
                          notificationSettings: {
                            ...settings.notificationSettings!,
                            paymentReceived: checked
                          }
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifySystemAlerts">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notify for system errors and warnings</p>
                    </div>
                    <Switch 
                      id="notifySystemAlerts"
                      checked={settings.notificationSettings?.systemAlerts || false}
                      onCheckedChange={(checked) => 
                        setSettings({
                          ...settings, 
                          notificationSettings: {
                            ...settings.notificationSettings!,
                            systemAlerts: checked
                          }
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
