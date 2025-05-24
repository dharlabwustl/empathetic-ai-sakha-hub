
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Calendar, Download, Receipt, IndianRupee, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import PaymentMethodSelector from "@/components/subscription/payment/PaymentMethodSelector";
import CreditCardForm from "@/components/subscription/payment/CreditCardForm";
import UPIPayment from "@/components/subscription/payment/UPIPayment";
import NetBankingPayment from "@/components/subscription/payment/NetBankingPayment";

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: 'success' | 'pending' | 'failed';
  method: string;
  transactionId: string;
}

interface BillingInfo {
  currentPlan: string;
  nextBilling: string;
  amount: number;
  autoRenewal: boolean;
}

const PaymentSystem: React.FC = () => {
  const { toast } = useToast();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"credit_card" | "upi" | "net_banking" | "wallet">("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const billingInfo: BillingInfo = {
    currentPlan: 'Premium Monthly',
    nextBilling: '2024-02-15',
    amount: 799,
    autoRenewal: true
  };

  const paymentHistory: PaymentHistory[] = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 799,
      plan: 'Premium Monthly',
      status: 'success',
      method: 'UPI',
      transactionId: 'TXN123456789'
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: 799,
      plan: 'Premium Monthly',
      status: 'success',
      method: 'Credit Card',
      transactionId: 'TXN123456788'
    },
    {
      id: '3',
      date: '2023-11-15',
      amount: 799,
      plan: 'Premium Monthly',
      status: 'success',
      method: 'Net Banking',
      transactionId: 'TXN123456787'
    }
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentDialog(false);
      
      toast({
        title: "Payment Successful",
        description: `Payment of ₹${billingInfo.amount} processed successfully.`,
      });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'credit_card':
        return <CreditCardForm onSubmit={handlePayment} isProcessing={isProcessing} />;
      case 'upi':
        return <UPIPayment onSubmit={handlePayment} isProcessing={isProcessing} />;
      case 'net_banking':
        return <NetBankingPayment onSubmit={handlePayment} isProcessing={isProcessing} />;
      case 'wallet':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Select your preferred wallet to complete the payment.</p>
            <Button onClick={handlePayment} className="w-full" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay with Wallet"}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Current Plan</h3>
              <div className="text-lg font-semibold">{billingInfo.currentPlan}</div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Monthly Amount</h3>
              <div className="text-lg font-semibold flex items-center">
                <IndianRupee className="h-4 w-4" />
                {billingInfo.amount}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Next Billing</h3>
              <div className="text-lg font-semibold flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {billingInfo.nextBilling}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Auto Renewal</h3>
              <Badge className={billingInfo.autoRenewal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {billingInfo.autoRenewal ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
              <DialogTrigger asChild>
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Make Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Payment - ₹{billingInfo.amount}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <PaymentMethodSelector
                    selectedMethod={selectedPaymentMethod}
                    onSelectPaymentMethod={setSelectedPaymentMethod}
                  />
                  {renderPaymentForm()}
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              Update Payment Method
            </Button>
            
            <Button variant="outline">
              {billingInfo.autoRenewal ? 'Disable' : 'Enable'} Auto Renewal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentHistory.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.plan}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        {payment.amount}
                      </div>
                    </TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSystem;
