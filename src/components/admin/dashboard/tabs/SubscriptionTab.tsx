
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DollarSign,
  CreditCard,
  Users,
  Tag,
  PieChart,
  Download,
  Copy,
  Edit,
  Check,
  X,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";

const SubscriptionTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Subscription & Monetization</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export Data</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Tag size={16} />
            <span>Create Coupon</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Monthly Revenue</h3>
              <Badge className="bg-green-100 text-green-800">+15%</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">₹127,840</span>
            </div>
            <div className="h-10 bg-green-50 dark:bg-green-900/20 rounded-md mt-3 flex items-end">
              <div className="bg-green-500 h-6 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-4 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-8 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-5 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-7 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-10 w-8 rounded-sm"></div>
              <div className="bg-green-500 h-3 w-8 rounded-sm"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Paid Subscribers</h3>
              <Badge className="bg-blue-100 text-blue-800">+8%</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">418</span>
              <span className="text-sm text-gray-500">users</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Free users: 1,932</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Users size={12} />
                <span>View All</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Conversion Rate</h3>
              <Badge className="bg-purple-100 text-purple-800">+2%</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">17.8%</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Prev. month: 15.6%</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <PieChart size={12} />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Active Coupons</h3>
              <Badge className="bg-amber-100 text-amber-800">8 Active</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">12.4%</span>
              <span className="text-sm text-gray-500">usage</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Best: STUDENT50 (24%)</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Tag size={12} />
                <span>Manage</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      id: 'INV-0012', 
                      customer: 'Ananya Singh', 
                      plan: 'Premium Yearly',
                      date: new Date(2023, 5, 15), 
                      amount: '₹9,999',
                      status: 'completed'
                    },
                    { 
                      id: 'INV-0011', 
                      customer: 'Rahul Patel', 
                      plan: 'Standard Monthly',
                      date: new Date(2023, 5, 14), 
                      amount: '₹499',
                      status: 'completed'
                    },
                    { 
                      id: 'INV-0010', 
                      customer: 'Priya Sharma', 
                      plan: 'Premium Monthly',
                      date: new Date(2023, 5, 14), 
                      amount: '₹999',
                      status: 'refunded'
                    },
                    { 
                      id: 'INV-0009', 
                      customer: 'Amit Kumar', 
                      plan: 'Standard Yearly',
                      date: new Date(2023, 5, 13), 
                      amount: '₹4,999',
                      status: 'failed'
                    },
                  ].map((transaction, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono">{transaction.id}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.plan}</TableCell>
                      <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{transaction.amount}</TableCell>
                      <TableCell>
                        {transaction.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        )}
                        {transaction.status === 'refunded' && (
                          <Badge className="bg-amber-100 text-amber-800">Refunded</Badge>
                        )}
                        {transaction.status === 'failed' && (
                          <Badge className="bg-red-100 text-red-800">Failed</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Coupon Code Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Create Coupon</h3>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input placeholder="Enter coupon code..." />
                  <Button variant="ghost" size="sm" className="absolute right-2 top-1">
                    <Copy size={14} />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Discount %..." className="w-1/2" />
                  <Input placeholder="Max uses..." className="w-1/2" />
                </div>
                <Button className="w-full mt-2 flex items-center gap-2">
                  <Plus size={16} />
                  <span>Create Coupon</span>
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Active Coupons</h3>
              </div>
              <div className="space-y-2 max-h-[180px] overflow-y-auto">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">STUDENT50</p>
                    <p className="text-xs text-gray-500">50% off • 32/50 used</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                      <X size={14} />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">WELCOME25</p>
                    <p className="text-xs text-gray-500">25% off • 187/200 used</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                      <X size={14} />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">FLASH30</p>
                    <p className="text-xs text-gray-500">30% off • 43/100 used</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subscription Plans Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Free Plan</h3>
                <Badge className="bg-gray-100 text-gray-800">Active</Badge>
              </div>
              <div className="text-2xl font-bold mb-2">₹0</div>
              <div className="space-y-1 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Limited content access</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Basic personalization</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <X size={16} className="text-red-600" />
                  <span>No advanced features</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">Edit Plan</Button>
            </div>
            <div className="border p-4 rounded-md bg-blue-50 dark:bg-blue-900/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Standard Plan</h3>
                <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
              </div>
              <div className="text-2xl font-bold mb-2">₹499/mo</div>
              <div className="space-y-1 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Full content library</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>AI personalization</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Performance tracking</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">Edit Plan</Button>
            </div>
            <div className="border p-4 rounded-md bg-purple-50 dark:bg-purple-900/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Premium Plan</h3>
                <Badge className="bg-purple-100 text-purple-800">Best Value</Badge>
              </div>
              <div className="text-2xl font-bold mb-2">₹999/mo</div>
              <div className="space-y-1 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Everything in Standard</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Live tutor sessions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-green-600" />
                  <span>Priority support</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">Edit Plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionTab;
