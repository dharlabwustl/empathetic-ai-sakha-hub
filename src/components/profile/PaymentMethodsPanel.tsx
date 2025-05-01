
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaymentMethod, BillingHistory } from "@/types/user/base";
import { CreditCard, Wallet, DownloadIcon, TrashIcon, CheckCircle } from "lucide-react";
import { AddPaymentMethodDialog } from "./AddPaymentMethodDialog";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethodsPanelProps {
  paymentMethods: PaymentMethod[];
  billingHistory: BillingHistory[];
}

export const PaymentMethodsPanel = ({
  paymentMethods = [],
  billingHistory = []
}: PaymentMethodsPanelProps) => {
  const [activeTab, setActiveTab] = useState("methods");
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  const { toast } = useToast();
  
  const handleDeletePaymentMethod = (id: string) => {
    toast({
      title: "Payment Method Removed",
      description: "The payment method has been removed successfully",
    });
  };
  
  const handleSetDefaultMethod = (id: string) => {
    toast({
      title: "Default Payment Method Updated",
      description: "Your default payment method has been updated",
    });
  };
  
  const handleAddPaymentMethod = (data: any) => {
    toast({
      title: "Payment Method Added",
      description: "The new payment method has been added successfully",
    });
    setShowAddPaymentDialog(false);
  };

  const getCardIcon = (type?: string) => {
    return <CreditCard className="h-4 w-4" />;
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>
        
        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Payment Methods</h2>
            <Button onClick={() => setShowAddPaymentDialog(true)}>
              Add Payment Method
            </Button>
          </div>
          
          {paymentMethods.length === 0 ? (
            <Card>
              <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Payment Methods</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't added any payment methods yet
                </p>
                <Button onClick={() => setShowAddPaymentDialog(true)}>
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentMethods.map((method) => (
                    <TableRow key={method.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCardIcon(method.cardType)}
                          <span className="font-medium capitalize">{method.type}</span>
                          {method.isDefault && (
                            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-800">Default</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {method.type === 'card' && (
                          <div>
                            <div className="font-medium">
                              {method.cardType} •••• {method.lastFour}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Expires {method.expiryDate}
                            </div>
                          </div>
                        )}
                        
                        {method.type === 'paypal' && (
                          <div className="font-medium">{method.paypalEmail}</div>
                        )}
                        
                        {method.type === 'upi' && (
                          <div className="font-medium">{method.upiId}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!method.isDefault && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSetDefaultMethod(method.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Set Default
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDeletePaymentMethod(method.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>
        
        {/* Billing History Tab */}
        <TabsContent value="history" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Billing History</h2>
          </div>
          
          {billingHistory.length === 0 ? (
            <Card>
              <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Billing History</h3>
                <p className="text-muted-foreground">
                  Your payment history will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>
                        <div className="font-medium">{item.planName}</div>
                      </TableCell>
                      <TableCell>₹{item.amount}</TableCell>
                      <TableCell>
                        {item.status === 'paid' ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800">Paid</Badge>
                        ) : item.status === 'pending' ? (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800">Failed</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.invoiceUrl && (
                          <Button variant="ghost" size="sm">
                            <DownloadIcon className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <AddPaymentMethodDialog 
        open={showAddPaymentDialog}
        onClose={() => setShowAddPaymentDialog(false)}
        onAddPaymentMethod={handleAddPaymentMethod}
      />
    </div>
  );
};
