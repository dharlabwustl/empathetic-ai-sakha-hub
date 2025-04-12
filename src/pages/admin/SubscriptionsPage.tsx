
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  DollarSign, 
  Users, 
  PieChart, 
  Plus, 
  FileText, 
  Edit, 
  Trash2,
  Download,
  FileSpreadsheet,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const SubscriptionsPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Subscriptions & Monetization</h1>
          <p className="text-gray-500">Manage subscription plans, payments and revenue analytics</p>
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Create New Plan</span>
        </Button>
      </div>
      
      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="customers">Subscribers</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="settings">Payment Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Subscription Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Plan Name</th>
                        <th className="text-left py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Duration</th>
                        <th className="text-left py-3 px-4">Subscribers</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Basic",
                          price: "$9.99",
                          duration: "Monthly",
                          subscribers: 1485,
                          status: "active"
                        },
                        {
                          name: "Standard",
                          price: "$19.99",
                          duration: "Monthly",
                          subscribers: 2742,
                          status: "active"
                        },
                        {
                          name: "Premium",
                          price: "$29.99",
                          duration: "Monthly",
                          subscribers: 843,
                          status: "active"
                        },
                        {
                          name: "Annual Standard",
                          price: "$199.99",
                          duration: "Yearly",
                          subscribers: 654,
                          status: "active"
                        },
                        {
                          name: "Annual Premium",
                          price: "$299.99",
                          duration: "Yearly",
                          subscribers: 312,
                          status: "active"
                        },
                        {
                          name: "Student Special",
                          price: "$5.99",
                          duration: "Monthly",
                          subscribers: 1245,
                          status: "active"
                        },
                        {
                          name: "Summer Promotion",
                          price: "$14.99",
                          duration: "3 Months",
                          subscribers: 87,
                          status: "inactive"
                        }
                      ].map((plan, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-4 font-medium">{plan.name}</td>
                          <td className="py-3 px-4">{plan.price}</td>
                          <td className="py-3 px-4">{plan.duration}</td>
                          <td className="py-3 px-4">{plan.subscribers.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <Badge className={plan.status === "active" ? 
                              "bg-green-100 text-green-800" : 
                              "bg-gray-100 text-gray-800"
                            }>
                              {plan.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 text-red-500 hover:text-red-700">
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Add/Edit Subscription Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="planName">Plan Name</Label>
                      <Input id="planName" placeholder="e.g., Premium Plan" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="planPrice">Price</Label>
                        <div className="relative">
                          <DollarSign size={16} className="absolute left-3 top-3 text-gray-500" />
                          <Input id="planPrice" type="number" step="0.01" className="pl-8" placeholder="29.99" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="planDuration">Duration</Label>
                        <select id="planDuration" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                          <option>Monthly</option>
                          <option>Quarterly</option>
                          <option>Semi-Annual</option>
                          <option>Annual</option>
                          <option>Custom</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="planDescription">Plan Description</Label>
                      <Textarea id="planDescription" placeholder="Describe the plan features and benefits..." />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="planActive" defaultChecked />
                      <Label htmlFor="planActive">Plan Active</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Features</Label>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="feature-ai-personalization">AI Personalization</Label>
                          <Switch id="feature-ai-personalization" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="feature-unlimited-content">Unlimited Content</Label>
                          <Switch id="feature-unlimited-content" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="feature-advanced-analytics">Advanced Analytics</Label>
                          <Switch id="feature-advanced-analytics" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="feature-priority-support">Priority Support</Label>
                          <Switch id="feature-priority-support" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="feature-offline-access">Offline Access</Label>
                          <Switch id="feature-offline-access" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="feature-group-discounts">Group Discounts</Label>
                          <Switch id="feature-group-discounts" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="trialPeriod">Trial Period (Days)</Label>
                      <Input id="trialPeriod" type="number" defaultValue="14" />
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Plan</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Subscribers</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FileSpreadsheet size={16} />
                  <span>Export CSV</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download size={16} />
                  <span>Download Report</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Plan</th>
                      <th className="text-left py-3 px-4">Start Date</th>
                      <th className="text-left py-3 px-4">End Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        user: "John Smith",
                        email: "john.smith@example.com",
                        plan: "Premium",
                        startDate: "2023-01-15",
                        endDate: "2024-01-15",
                        status: "active",
                      },
                      {
                        user: "Emily Johnson",
                        email: "emily.j@example.com",
                        plan: "Standard",
                        startDate: "2023-02-22",
                        endDate: "2023-05-22",
                        status: "active",
                      },
                      {
                        user: "Michael Wong",
                        email: "m.wong@example.com",
                        plan: "Annual Premium",
                        startDate: "2022-11-05",
                        endDate: "2023-11-05",
                        status: "active",
                      },
                      {
                        user: "Sarah Miller",
                        email: "sarah.m@example.com",
                        plan: "Basic",
                        startDate: "2023-03-18",
                        endDate: "2023-04-18",
                        status: "expiring",
                      },
                      {
                        user: "Robert Chen",
                        email: "robert.c@example.com",
                        plan: "Student Special",
                        startDate: "2023-02-10",
                        endDate: "2023-08-10",
                        status: "active",
                      },
                      {
                        user: "Jessica Brown",
                        email: "j.brown@example.com",
                        plan: "Standard",
                        startDate: "2023-01-20",
                        endDate: "2023-04-20",
                        status: "expired",
                      }
                    ].map((subscriber, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{subscriber.user}</p>
                            <p className="text-xs text-gray-500">{subscriber.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{subscriber.plan}</td>
                        <td className="py-3 px-4">{subscriber.startDate}</td>
                        <td className="py-3 px-4">{subscriber.endDate}</td>
                        <td className="py-3 px-4">
                          <Badge className={
                            subscriber.status === "active" ? "bg-green-100 text-green-800" :
                            subscriber.status === "expiring" ? "bg-amber-100 text-amber-800" :
                            "bg-red-100 text-red-800"
                          }>
                            {subscriber.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">Showing 6 of 6,042 subscribers</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  {/* This would be a chart in the actual implementation */}
                  <PieChart size={48} className="text-gray-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-gray-500">Monthly Recurring Revenue</h3>
                    <p className="text-3xl font-bold mt-2">$84,532</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <span>↑</span> 12% from last month
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-gray-500">Annual Recurring Revenue</h3>
                    <p className="text-3xl font-bold mt-2">$1.02M</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <span>↑</span> 8% from last year
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-gray-500">Average Revenue Per User</h3>
                    <p className="text-3xl font-bold mt-2">$18.72</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <span>↑</span> 4% from last month
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-gray-500">Customer Lifetime Value</h3>
                    <p className="text-3xl font-bold mt-2">$245</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <span>↑</span> 6% from last quarter
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Plan Distribution</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Basic</span>
                        <span>23%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Standard</span>
                        <span>42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Premium</span>
                        <span>14%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '14%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Annual Plans</span>
                        <span>21%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '21%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">User</th>
                        <th className="text-left py-3 px-4">Plan</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Payment Method</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          date: "2023-04-12",
                          user: "Alex Johnson",
                          plan: "Premium",
                          amount: "$29.99",
                          paymentMethod: "Credit Card",
                          status: "completed"
                        },
                        {
                          date: "2023-04-11",
                          user: "Maria Garcia",
                          plan: "Annual Standard",
                          amount: "$199.99",
                          paymentMethod: "PayPal",
                          status: "completed"
                        },
                        {
                          date: "2023-04-11",
                          user: "David Lee",
                          plan: "Basic",
                          amount: "$9.99",
                          paymentMethod: "Credit Card",
                          status: "completed"
                        },
                        {
                          date: "2023-04-10",
                          user: "Sarah Williams",
                          plan: "Student Special",
                          amount: "$5.99",
                          paymentMethod: "Credit Card",
                          status: "completed"
                        },
                        {
                          date: "2023-04-10",
                          user: "James Brown",
                          plan: "Premium",
                          amount: "$29.99",
                          paymentMethod: "Credit Card",
                          status: "failed"
                        },
                        {
                          date: "2023-04-09",
                          user: "Emily Davis",
                          plan: "Standard",
                          amount: "$19.99",
                          paymentMethod: "PayPal",
                          status: "completed"
                        }
                      ].map((transaction, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-4">{transaction.date}</td>
                          <td className="py-3 px-4">{transaction.user}</td>
                          <td className="py-3 px-4">{transaction.plan}</td>
                          <td className="py-3 px-4 font-medium">{transaction.amount}</td>
                          <td className="py-3 px-4">{transaction.paymentMethod}</td>
                          <td className="py-3 px-4">
                            {transaction.status === "completed" ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle size={16} />
                                <span>Completed</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-red-600">
                                <XCircle size={16} />
                                <span>Failed</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline">View All Transactions</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentGateway">Default Payment Gateway</Label>
                    <select id="paymentGateway" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="stripe">Stripe</option>
                      <option value="paypal">PayPal</option>
                      <option value="razorpay">Razorpay</option>
                      <option value="custom">Custom Gateway</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input id="apiKey" type="password" value="sk_test_••••••••••••••••••••••••" />
                  </div>
                  
                  <div>
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input id="webhookUrl" value="https://api.sakha-ai.com/webhooks/payments" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Accepted Payment Methods</Label>
                    
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="creditCards" defaultChecked />
                        <Label htmlFor="creditCards">Credit Cards</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="paypal" defaultChecked />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="bankTransfer" />
                        <Label htmlFor="bankTransfer">Bank Transfer</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="upi" />
                        <Label htmlFor="upi">UPI</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Invoice Settings</Label>
                    
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="autoInvoice" defaultChecked />
                        <Label htmlFor="autoInvoice">Automatic Invoice Generation</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="emailInvoice" defaultChecked />
                        <Label htmlFor="emailInvoice">Email Invoice to Customer</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Tax Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="taxType">Tax Type</Label>
                          <select id="taxType" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <option value="vat">VAT</option>
                            <option value="gst">GST</option>
                            <option value="sales">Sales Tax</option>
                          </select>
                        </div>
                        
                        <div>
                          <Label htmlFor="taxRate">Default Tax Rate</Label>
                          <div className="relative">
                            <Input id="taxRate" type="number" step="0.01" defaultValue="18" />
                            <span className="absolute right-3 top-3 text-gray-500">%</span>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                          <Input id="taxId" placeholder="Enter your tax ID" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default SubscriptionsPage;
